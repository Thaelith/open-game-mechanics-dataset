#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""Search the Open Game Mechanics Dataset from the command line."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def mechanic_files(root: Path) -> list[Path]:
    return sorted((root / "data").glob("*/*.json"))


def searchable_text(mechanic: dict[str, Any]) -> str:
    parts: list[str] = []
    for field in (
        "id",
        "name",
        "description",
        "design_notes",
        "player_fantasy",
        "category",
        "subcategory",
    ):
        value = mechanic.get(field)
        if isinstance(value, str):
            parts.append(value)
    for field in (
        "aliases",
        "genres",
        "design_purpose",
        "required_systems",
        "common_variants",
        "edge_cases",
        "common_bugs",
        "balancing_notes",
        "accessibility_notes",
        "related_mechanics",
        "combines_well_with",
        "tags",
    ):
        value = mechanic.get(field)
        if isinstance(value, list):
            parts.extend(str(item) for item in value)
    return " ".join(parts).lower()


def matches(mechanic: dict[str, Any], args: argparse.Namespace) -> bool:
    if args.id and args.id.lower() not in mechanic["id"].lower():
        return False
    if args.category and mechanic["category"] != args.category:
        return False
    if args.genre and args.genre not in mechanic.get("genres", []):
        return False
    if args.tag and args.tag not in mechanic.get("tags", []):
        return False
    if args.query and args.query.lower() not in searchable_text(mechanic):
        return False
    return True


def main() -> int:
    parser = argparse.ArgumentParser(description="Search mechanic JSON files.")
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--id", help="Substring match on mechanic id")
    parser.add_argument("--category", help="Exact category match")
    parser.add_argument("--genre", help="Exact genre match")
    parser.add_argument("--tag", help="Exact tag match")
    parser.add_argument("--query", "-q", help="Case-insensitive text search")
    parser.add_argument("--json", action="store_true", help="Print full matching summaries as JSON")
    parser.add_argument("--limit", type=int, default=50, help="Maximum results to print")
    args = parser.parse_args()

    root = args.root.resolve()
    results = []
    for path in mechanic_files(root):
        mechanic = load_json(path)
        if matches(mechanic, args):
            results.append({
                "id": mechanic["id"],
                "name": mechanic["name"],
                "category": mechanic["category"],
                "subcategory": mechanic["subcategory"],
                "status": mechanic["status"],
                "genres": mechanic["genres"],
                "tags": mechanic["tags"],
                "path": path.relative_to(root).as_posix(),
                "description": mechanic["description"],
            })

    results.sort(key=lambda item: item["id"])
    shown = results[: args.limit]
    if args.json:
        print(json.dumps({"count": len(results), "results": shown}, indent=2))
        return 0

    print(f"{len(results)} result(s)")
    for item in shown:
        print(f"{item['id']} | {item['name']} | {item['path']}")
        print(f"  {item['description']}")
    if len(results) > len(shown):
        print(f"... {len(results) - len(shown)} additional result(s) hidden by --limit")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
