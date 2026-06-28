#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""Generate dataset.json from mechanic files."""

from __future__ import annotations

import argparse
import json
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_json(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def sorted_group_map(group: dict[str, list[str]]) -> dict[str, list[str]]:
    return {key: sorted(values) for key, values in sorted(group.items())}


def build_index(root: Path) -> dict:
    files = sorted((root / "data").glob("*/*.json"))
    mechanics = []
    by_category: dict[str, list[str]] = defaultdict(list)
    by_dimension: dict[str, list[str]] = defaultdict(list)
    by_genre: dict[str, list[str]] = defaultdict(list)
    by_tags: dict[str, list[str]] = defaultdict(list)
    by_status: dict[str, list[str]] = defaultdict(list)
    by_difficulty = {
        "design": defaultdict(list),
        "implementation": defaultdict(list),
        "tuning": defaultdict(list),
    }

    for path in files:
        data = load_json(path)
        mechanic_id = data["id"]
        rel_path = path.relative_to(root).as_posix()
        mechanics.append({
            "id": mechanic_id,
            "name": data["name"],
            "category": data["category"],
            "subcategory": data["subcategory"],
            "status": data["status"],
            "dimensions": data["dimensions"],
            "genres": data["genres"],
            "tags": data["tags"],
            "path": rel_path,
        })
        by_category[data["category"]].append(mechanic_id)
        by_status[data["status"]].append(mechanic_id)
        for dimension in data["dimensions"]:
            by_dimension[dimension].append(mechanic_id)
        for genre in data["genres"]:
            by_genre[genre].append(mechanic_id)
        for tag in data["tags"]:
            by_tags[tag].append(mechanic_id)
        for kind in by_difficulty:
            by_difficulty[kind][data["difficulty"][kind]].append(mechanic_id)

    mechanics.sort(key=lambda item: item["id"])
    return {
        "name": "Open Game Mechanics Dataset",
        "schema_version": "0.1.0",
        "license": "CC0-1.0",
        "tool_license": "MIT",
        "total_mechanics": len(mechanics),
        "last_generated": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "mechanics": mechanics,
        "groups": {
            "category": sorted_group_map(by_category),
            "dimension": sorted_group_map(by_dimension),
            "difficulty": {
                key: sorted_group_map(value)
                for key, value in by_difficulty.items()
            },
            "genre": sorted_group_map(by_genre),
            "status": sorted_group_map(by_status),
            "tags": sorted_group_map(by_tags),
        },
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate dataset.json index.")
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--check", action="store_true", help="Fail if dataset.json is not up to date")
    args = parser.parse_args()

    root = args.root.resolve()
    output_path = root / "dataset.json"
    index = build_index(root)

    if args.check:
        if not output_path.exists():
            print("dataset.json does not exist. Run tools/generate_index.py.", file=sys.stderr)
            return 1
        existing = output_path.read_text(encoding="utf-8")
        existing_index = json.loads(existing)
        index["last_generated"] = existing_index.get("last_generated", index["last_generated"])
        rendered = json.dumps(index, indent=2, ensure_ascii=False) + "\n"
        if existing != rendered:
            print("dataset.json is out of date. Run tools/generate_index.py and commit the result.", file=sys.stderr)
            return 1
        print("dataset.json is up to date.")
        return 0

    rendered = json.dumps(index, indent=2, ensure_ascii=False) + "\n"
    output_path.write_text(rendered, encoding="utf-8", newline="\n")
    print(f"Wrote {output_path} with {index['total_mechanics']} mechanics.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
