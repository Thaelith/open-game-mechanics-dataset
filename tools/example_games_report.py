#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""Generate an advisory example-game coverage report.

This report is intentionally non-blocking. Example games are lightweight
study references, not formal citations or evidence of exact implementation.
"""

from __future__ import annotations

import argparse
import json
from collections import Counter, defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Any


DEFAULT_OUTPUT = Path("docs/reports/example-games-coverage-report-v0.3.md")


@dataclass(frozen=True)
class MechanicRecord:
    path: Path
    relative_path: str
    data: dict[str, Any]

    @property
    def mechanic_id(self) -> str:
        return str(self.data.get("id", self.relative_path))

    @property
    def category(self) -> str:
        return str(self.data.get("category", "unknown") or "unknown")

    @property
    def example_games(self) -> list[dict[str, str]]:
        games = self.data.get("example_games")
        if not isinstance(games, list):
            return []
        normalized: list[dict[str, str]] = []
        for item in games:
            if not isinstance(item, dict):
                continue
            title = str(item.get("title", "")).strip()
            note = str(item.get("note", "")).strip()
            if title:
                normalized.append({"title": title, "note": note})
        return normalized


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


def percent(part: int, whole: int) -> float:
    return round((part / whole * 100.0) if whole else 0.0, 2)


def normalize_title(title: str) -> str:
    return " ".join(title.split()).strip()


def build_report(root: Path) -> dict[str, Any]:
    records = load_mechanics(root)
    title_counts: Counter[str] = Counter()
    category_totals: dict[str, int] = defaultdict(int)
    category_with_examples: dict[str, int] = defaultdict(int)
    category_reference_counts: dict[str, int] = defaultdict(int)
    mechanics_missing_examples: list[dict[str, str]] = []

    for record in records:
        category_totals[record.category] += 1
        examples = record.example_games
        if examples:
            category_with_examples[record.category] += 1
        else:
            mechanics_missing_examples.append(
                {
                    "id": record.mechanic_id,
                    "category": record.category,
                    "path": record.relative_path,
                }
            )
        for example in examples:
            title = normalize_title(example["title"])
            if title:
                title_counts[title] += 1
                category_reference_counts[record.category] += 1

    total_mechanics = len(records)
    mechanics_with_examples = total_mechanics - len(mechanics_missing_examples)
    total_references = sum(title_counts.values())
    category_rows = []
    for category in sorted(category_totals):
        total = category_totals[category]
        with_examples = category_with_examples[category]
        category_rows.append(
            {
                "category": category,
                "mechanics": total,
                "with_example_games": with_examples,
                "missing_example_games": total - with_examples,
                "coverage_percent": percent(with_examples, total),
                "example_game_references": category_reference_counts[category],
            }
        )

    return {
        "summary": {
            "total_mechanics": total_mechanics,
            "mechanics_with_example_games": mechanics_with_examples,
            "mechanics_missing_example_games": len(mechanics_missing_examples),
            "example_game_coverage_percent": percent(mechanics_with_examples, total_mechanics),
            "total_example_game_references": total_references,
            "unique_game_titles": len(title_counts),
        },
        "most_referenced_games": [
            {"title": title, "references": count}
            for title, count in sorted(title_counts.items(), key=lambda item: (-item[1], item[0]))[:25]
        ],
        "category_coverage": category_rows,
        "mechanics_missing_example_games": sorted(mechanics_missing_examples, key=lambda item: item["id"]),
    }


def markdown_table(headers: list[str], rows: list[list[Any]]) -> str:
    lines = [
        "| " + " | ".join(headers) + " |",
        "| " + " | ".join("---" for _ in headers) + " |",
    ]
    for row in rows:
        lines.append("| " + " | ".join(escape_cell(value) for value in row) + " |")
    return "\n".join(lines)


def escape_cell(value: Any) -> str:
    return str(value).replace("|", "\\|")


def render_markdown(report: dict[str, Any]) -> str:
    summary = report["summary"]
    lines = [
        "# Example Games Coverage Report v0.3",
        "",
        "This advisory report tracks how many mechanics include lightweight `example_games` study references.",
        "",
        "Example games are not exhaustive and do not prove exact implementation details. They are meant to help readers find recognizable games to study for mechanic behavior.",
        "",
        "## Summary",
        "",
        markdown_table(
            ["Metric", "Value"],
            [
                ["Total mechanics", summary["total_mechanics"]],
                ["Mechanics with example_games", summary["mechanics_with_example_games"]],
                ["Mechanics missing example_games", summary["mechanics_missing_example_games"]],
                ["Example-game coverage", f"{summary['example_game_coverage_percent']:.2f}%"],
                ["Total example-game references", summary["total_example_game_references"]],
                ["Unique game titles", summary["unique_game_titles"]],
            ],
        ),
        "",
        "## Top Referenced Game Titles",
        "",
        markdown_table(
            ["Game title", "References"],
            [[item["title"], item["references"]] for item in report["most_referenced_games"]] or [["none", 0]],
        ),
        "",
        "## Category Coverage",
        "",
        markdown_table(
            ["Category", "Mechanics", "With examples", "Missing examples", "Coverage", "References"],
            [
                [
                    item["category"],
                    item["mechanics"],
                    item["with_example_games"],
                    item["missing_example_games"],
                    f"{item['coverage_percent']:.2f}%",
                    item["example_game_references"],
                ]
                for item in report["category_coverage"]
            ],
        ),
        "",
        "## Mechanics Missing Example Games",
        "",
        markdown_table(
            ["Mechanic", "Category", "Path"],
            [
                [item["id"], item["category"], item["path"]]
                for item in report["mechanics_missing_example_games"]
            ]
            or [["none", "none", "none"]],
        ),
        "",
        "## Interpretation Notes",
        "",
        "- Missing examples are advisory coverage gaps, not validation failures.",
        "- Repeated game titles can indicate useful study anchors, but also reveal where examples may be over-concentrated.",
        "- Future game-tagging work should prefer consistent, reviewable examples over large noisy tag lists.",
        "",
    ]
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Report example-game coverage for mechanic entries.")
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
        print(f"Wrote {mode} example-games report to {output_path}")
    else:
        print(rendered, end="" if rendered.endswith("\n") else "\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
