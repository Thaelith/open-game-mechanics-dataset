#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""Print coverage counts for mechanic dataset dimensions."""

from __future__ import annotations

import argparse
import json
from collections import Counter
from pathlib import Path
from typing import Any, Iterable


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def mechanic_files(root: Path) -> list[Path]:
    return sorted((root / "data").glob("*/*.json"))


def increment_many(counter: Counter[str], values: Iterable[str]) -> None:
    for value in values:
        counter[value] += 1


def collect_counts(root: Path) -> dict[str, Counter[str]]:
    counts: dict[str, Counter[str]] = {
        "category": Counter(),
        "subcategory": Counter(),
        "dimension": Counter(),
        "difficulty.design": Counter(),
        "difficulty.implementation": Counter(),
        "difficulty.tuning": Counter(),
        "genre": Counter(),
        "status": Counter(),
        "source_confidence": Counter(),
    }

    for path in mechanic_files(root):
        data = load_json(path)
        counts["category"][data["category"]] += 1
        counts["subcategory"][data["subcategory"]] += 1
        increment_many(counts["dimension"], data["dimensions"])
        counts["difficulty.design"][data["difficulty"]["design"]] += 1
        counts["difficulty.implementation"][data["difficulty"]["implementation"]] += 1
        counts["difficulty.tuning"][data["difficulty"]["tuning"]] += 1
        increment_many(counts["genre"], data["genres"])
        counts["status"][data["status"]] += 1
        counts["source_confidence"][data["source_confidence"]] += 1
    return counts


def as_plain_dict(counts: dict[str, Counter[str]]) -> dict[str, dict[str, int]]:
    return {
        section: dict(sorted(counter.items(), key=lambda item: (-item[1], item[0])))
        for section, counter in counts.items()
    }


def print_section(name: str, counter: Counter[str]) -> None:
    print(f"\n{name}")
    print("-" * len(name))
    for key, count in sorted(counter.items(), key=lambda item: (-item[1], item[0])):
        print(f"{key}: {count}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Report dataset coverage counts.")
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--json", action="store_true", help="Print machine-readable JSON")
    args = parser.parse_args()

    root = args.root.resolve()
    counts = collect_counts(root)
    total = sum(counts["category"].values())

    if args.json:
        payload = {"total_mechanics": total, "counts": as_plain_dict(counts)}
        print(json.dumps(payload, indent=2))
        return 0

    print(f"Total mechanics: {total}")
    for name, counter in counts.items():
        print_section(name, counter)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
