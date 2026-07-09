#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""Generate a derived game-to-mechanics index from mechanic example_games.

This is a discovery aid built from mechanic-level examples. It is not a game
database and does not prove exact implementation details.
"""

from __future__ import annotations

import argparse
import json
from collections import Counter, defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Any


DEFAULT_OUTPUT = Path("docs/reports/game-examples-index-report-v0.3.md")
MAX_GAMES_IN_MARKDOWN = 50


@dataclass(frozen=True)
class MechanicRecord:
    path: Path
    relative_path: str
    data: dict[str, Any]

    @property
    def mechanic_id(self) -> str:
        return str(self.data.get("id", self.relative_path))

    @property
    def name(self) -> str:
        value = self.data.get("name")
        if isinstance(value, str) and value.strip():
            return value.strip()
        return " ".join(part.capitalize() for part in self.mechanic_id.split(".")[-1].split("_"))

    @property
    def category(self) -> str:
        return str(self.data.get("category", "unknown") or "unknown")

    @property
    def subcategory(self) -> str:
        return str(self.data.get("subcategory", "") or "")

    @property
    def tags(self) -> list[str]:
        value = self.data.get("tags")
        return sorted(str(item) for item in value if isinstance(item, str)) if isinstance(value, list) else []

    @property
    def example_games(self) -> list[dict[str, str]]:
        value = self.data.get("example_games")
        if not isinstance(value, list):
            return []
        examples: list[dict[str, str]] = []
        for item in value:
            if not isinstance(item, dict):
                continue
            title = normalize_display_title(str(item.get("title", "")))
            note = " ".join(str(item.get("note", "")).split()).strip()
            if title:
                examples.append({"title": title, "note": note})
        return examples


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        value = json.load(handle)
    return value if isinstance(value, dict) else {}


def relative(path: Path, root: Path) -> str:
    return path.relative_to(root).as_posix()


def load_mechanics(root: Path) -> list[MechanicRecord]:
    records: list[MechanicRecord] = []
    for path in sorted((root / "data").rglob("*.json")):
        records.append(MechanicRecord(path=path, relative_path=relative(path, root), data=load_json(path)))
    return sorted(records, key=lambda record: record.mechanic_id)


def normalize_display_title(title: str) -> str:
    return " ".join(title.split()).strip()


def title_key(title: str) -> str:
    return normalize_display_title(title).casefold()


def markdown_table(headers: list[str], rows: list[list[Any]]) -> str:
    lines = [
        "| " + " | ".join(headers) + " |",
        "| " + " | ".join("---" for _ in headers) + " |",
    ]
    for row in rows:
        lines.append("| " + " | ".join(escape_cell(value) for value in row) + " |")
    return "\n".join(lines)


def escape_cell(value: Any) -> str:
    return str(value).replace("|", "\\|").replace("\n", " ")


def format_list(values: list[str], limit: int | None = None) -> str:
    shown = values[:limit] if limit else values
    suffix = "" if limit is None or len(values) <= limit else f", +{len(values) - limit} more"
    return ", ".join(shown) + suffix if shown else "none"


def build_report(root: Path) -> dict[str, Any]:
    mechanics = load_mechanics(root)
    game_entries: dict[str, dict[str, Any]] = {}
    title_variants: dict[str, Counter[str]] = defaultdict(Counter)
    category_game_counts: dict[str, Counter[str]] = defaultdict(Counter)
    category_reference_counts: Counter[str] = Counter()
    total_references = 0

    for mechanic in mechanics:
        seen_game_keys_for_mechanic: set[str] = set()
        for example in mechanic.example_games:
            key = title_key(example["title"])
            if not key:
                continue
            total_references += 1
            title_variants[key][example["title"]] += 1
            category_reference_counts[mechanic.category] += 1
            category_game_counts[mechanic.category][key] += 1

            entry = game_entries.setdefault(
                key,
                {
                    "title_key": key,
                    "title": example["title"],
                    "mechanics_by_id": {},
                    "tags": set(),
                },
            )
            entry["tags"].update(mechanic.tags)
            if key in seen_game_keys_for_mechanic:
                continue
            seen_game_keys_for_mechanic.add(key)
            entry["mechanics_by_id"].setdefault(
                mechanic.mechanic_id,
                {
                    "id": mechanic.mechanic_id,
                    "name": mechanic.name,
                    "category": mechanic.category,
                    "subcategory": mechanic.subcategory,
                    "path": mechanic.relative_path,
                    "example_note": example["note"],
                },
            )

    games = []
    for key, entry in game_entries.items():
        variant_counts = title_variants[key]
        display_title = sorted(variant_counts.items(), key=lambda item: (-item[1], item[0]))[0][0]
        mechanics_for_game = sorted(entry["mechanics_by_id"].values(), key=lambda item: item["id"])
        category_counts = Counter(item["category"] for item in mechanics_for_game)
        categories = [
            {"category": category, "count": count}
            for category, count in sorted(category_counts.items(), key=lambda item: (-item[1], item[0]))
        ]
        games.append(
            {
                "title": display_title,
                "mechanic_count": len(mechanics_for_game),
                "category_count": len(category_counts),
                "categories": categories,
                "representative_mechanics": [item["id"] for item in mechanics_for_game[:10]],
                "tags": sorted(entry["tags"]),
                "mechanics": mechanics_for_game,
            }
        )

    games = sorted(games, key=lambda item: (-item["mechanic_count"], item["title"].casefold()))
    category_rows = []
    for category in sorted(category_reference_counts):
        games_for_category = category_game_counts[category]
        top_games = [
            {"title": game_entries[key]["title"], "references": count}
            for key, count in sorted(games_for_category.items(), key=lambda item: (-item[1], game_entries[item[0]]["title"].casefold()))[:5]
        ]
        category_rows.append(
            {
                "category": category,
                "unique_games": len(games_for_category),
                "example_references": category_reference_counts[category],
                "top_games": top_games,
            }
        )

    mechanic_counts = [game["mechanic_count"] for game in games]
    return {
        "summary": {
            "total_mechanics": len(mechanics),
            "total_example_game_references": total_references,
            "unique_game_titles": len(games),
            "games_with_1_mechanic": sum(1 for count in mechanic_counts if count == 1),
            "games_with_2_mechanics": sum(1 for count in mechanic_counts if count == 2),
            "games_with_3_mechanics": sum(1 for count in mechanic_counts if count == 3),
            "games_with_4_mechanics": sum(1 for count in mechanic_counts if count == 4),
            "games_with_2_to_4_mechanics": sum(1 for count in mechanic_counts if 2 <= count <= 4),
            "games_with_5_or_more_mechanics": sum(1 for count in mechanic_counts if count >= 5),
            "max_mechanics_on_one_game": max(mechanic_counts, default=0),
        },
        "top_games_by_referenced_mechanics": games[:25],
        "category_to_game_coverage": category_rows,
        "games": games,
    }


def render_markdown(report: dict[str, Any]) -> str:
    summary = report["summary"]
    games = report["games"]
    shown_games = games[:MAX_GAMES_IN_MARKDOWN]
    lines = [
        "# Game Examples Index Report v0.3",
        "",
        "This is a derived index from mechanic-level `example_games`. It is a study and discovery aid, not proof of exact implementation details.",
        "",
        "## Summary",
        "",
        markdown_table(
            ["Metric", "Value"],
            [
                ["Total mechanics", summary["total_mechanics"]],
                ["Total example-game references", summary["total_example_game_references"]],
                ["Unique game titles", summary["unique_game_titles"]],
                ["Games with 1 mechanic", summary["games_with_1_mechanic"]],
                ["Games with 2 mechanics", summary["games_with_2_mechanics"]],
                ["Games with 3 mechanics", summary["games_with_3_mechanics"]],
                ["Games with 4 mechanics", summary["games_with_4_mechanics"]],
                ["Games with 2-4 mechanics", summary["games_with_2_to_4_mechanics"]],
                ["Games with 5+ mechanics", summary["games_with_5_or_more_mechanics"]],
                ["Max mechanics on one game", summary["max_mechanics_on_one_game"]],
            ],
        ),
        "",
        "## Top Games By Referenced Mechanics",
        "",
        markdown_table(
            ["Game title", "Mechanic count", "Categories represented", "Representative mechanics"],
            [
                [
                    game["title"],
                    game["mechanic_count"],
                    format_list([item["category"] for item in game["categories"]], 6),
                    format_list(game["representative_mechanics"], 6),
                ]
                for game in report["top_games_by_referenced_mechanics"][:15]
            ],
        ),
        "",
        "## Category-To-Game Coverage",
        "",
        markdown_table(
            ["Category", "Unique games", "Example references", "Top games in category"],
            [
                [
                    row["category"],
                    row["unique_games"],
                    row["example_references"],
                    format_list([f"{item['title']} ({item['references']})" for item in row["top_games"]], 5),
                ]
                for row in report["category_to_game_coverage"]
            ],
        ),
        "",
        "## Games Index",
        "",
        f"Showing the top {len(shown_games)} games by referenced mechanics. JSON output contains all {len(games)} games.",
        "",
    ]
    for game in shown_games:
        lines.extend(
            [
                f"### {game['title']}",
                "",
                f"- Mechanic count: {game['mechanic_count']}",
                f"- Categories: {format_list([item['category'] for item in game['categories']])}",
                "",
                markdown_table(
                    ["Mechanic", "Category", "Example note"],
                    [
                        [item["id"], item["category"], item["example_note"]]
                        for item in game["mechanics"]
                    ],
                ),
                "",
            ]
        )

    lines.extend(
        [
            "## Interpretation Notes",
            "",
            "- A game appearing many times means it is a useful study anchor, not that it contains only those mechanics.",
            "- A game appearing once may still be useful for a specific mechanic.",
            "- This report is not a full game-tagging database.",
            "- Future work may add curated game tags, browser filtering, or game-to-Mixer workflows after this derived index proves useful.",
            "",
        ]
    )
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate a game-to-mechanics index from mechanic example_games.")
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--json", action="store_true", help="Print machine-readable JSON instead of Markdown")
    parser.add_argument(
        "--output",
        type=Path,
        default=None,
        help=f"Output path. Markdown defaults to {DEFAULT_OUTPUT}; JSON defaults to stdout.",
    )
    args = parser.parse_args()

    root = args.root.resolve()
    report = build_report(root)
    rendered = json.dumps(report, indent=2, ensure_ascii=False) + "\n" if args.json else render_markdown(report)

    output_path = args.output
    if output_path is None and not args.json:
        output_path = DEFAULT_OUTPUT

    if output_path is not None:
        if not output_path.is_absolute():
            output_path = root / output_path
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(rendered, encoding="utf-8", newline="\n")
        mode = "JSON" if args.json else "Markdown"
        print(f"Wrote {mode} game examples index report to {output_path}")
    else:
        print(rendered, end="" if rendered.endswith("\n") else "\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
