#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""Audit derived game anchors for enrichment quality review signals.

This tool does not validate or fail the dataset. It summarizes signals that help
maintainers decide where game-example anchors may need title cleanup, boundary
review, or more careful future enrichment.
"""

from __future__ import annotations

import argparse
import json
import re
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

from game_examples_index import build_report


DEFAULT_TOP_LIMIT = 20
RISKY_NOTE_TERMS = (
    "probably",
    "proprietary",
    "internal",
    "exact implementation",
    "implementation detail",
)
TITLE_CLUSTER_STOPWORDS = {
    "a",
    "an",
    "and",
    "edition",
    "game",
    "of",
    "remake",
    "remastered",
    "the",
}


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def title_tokens(title: str) -> list[str]:
    normalized = re.sub(r"[^a-z0-9]+", " ", title.casefold())
    return [token for token in normalized.split() if token and token not in TITLE_CLUSTER_STOPWORDS]


def title_series_key(title: str) -> str:
    tokens = title_tokens(title)
    if not tokens:
        return ""
    if len(tokens) == 1:
        return tokens[0]
    return " ".join(tokens[:2])


def title_variant_groups(games: list[dict[str, Any]]) -> list[dict[str, Any]]:
    groups: dict[str, list[str]] = defaultdict(list)
    for game in games:
        key = title_series_key(str(game["title"]))
        if key:
            groups[key].append(str(game["title"]))

    candidates = []
    for key, titles in sorted(groups.items()):
        unique_titles = sorted(set(titles), key=str.casefold)
        if len(unique_titles) < 2:
            continue
        candidates.append({"series_key": key, "titles": unique_titles})
    return candidates


def risky_notes(games: list[dict[str, Any]]) -> list[dict[str, Any]]:
    findings: list[dict[str, Any]] = []
    for game in games:
        for mechanic in game["mechanics"]:
            note = str(mechanic.get("example_note", ""))
            matched = [term for term in RISKY_NOTE_TERMS if term in note.casefold()]
            if matched:
                findings.append(
                    {
                        "title": game["title"],
                        "mechanic_id": mechanic["id"],
                        "matched_terms": matched,
                        "example_note": note,
                    }
                )
    return sorted(findings, key=lambda item: (item["title"].casefold(), item["mechanic_id"]))


def mechanics_with_many_examples(games: list[dict[str, Any]], limit: int) -> list[dict[str, Any]]:
    counts: Counter[str] = Counter()
    categories: dict[str, str] = {}
    for game in games:
        for mechanic in game["mechanics"]:
            counts[str(mechanic["id"])] += 1
            categories[str(mechanic["id"])] = str(mechanic.get("category", "unknown"))
    return [
        {"mechanic_id": mechanic_id, "category": categories.get(mechanic_id, "unknown"), "game_count": count}
        for mechanic_id, count in sorted(counts.items(), key=lambda item: (-item[1], item[0]))[:limit]
    ]


def category_concentration(report: dict[str, Any]) -> list[dict[str, Any]]:
    rows = []
    for category in report["category_to_game_coverage"]:
        top_games = category["top_games"]
        top_reference_count = sum(game["references"] for game in top_games[:3])
        total_references = category["example_references"]
        rows.append(
            {
                "category": category["category"],
                "unique_games": category["unique_games"],
                "example_references": total_references,
                "top_three_reference_share": round(top_reference_count / total_references, 3) if total_references else 0,
                "top_games": top_games[:3],
            }
        )
    return sorted(rows, key=lambda item: (-item["top_three_reference_share"], item["category"]))


def build_audit(root: Path, limit: int = DEFAULT_TOP_LIMIT) -> dict[str, Any]:
    report = build_report(root)
    games = report["games"]
    one_mechanic = sorted(
        (game for game in games if game["mechanic_count"] == 1),
        key=lambda game: game["title"].casefold(),
    )
    two_to_four = sorted(
        (game for game in games if 2 <= game["mechanic_count"] <= 4),
        key=lambda game: (game["mechanic_count"], game["title"].casefold()),
    )
    saturated = sorted(
        (game for game in games if game["mechanic_count"] >= 15),
        key=lambda game: (-game["mechanic_count"], game["title"].casefold()),
    )

    return {
        "summary": report["summary"],
        "saturated_anchors": [
            {"title": game["title"], "mechanic_count": game["mechanic_count"]}
            for game in saturated
        ],
        "top_games": [
            {"title": game["title"], "mechanic_count": game["mechanic_count"], "category_count": game["category_count"]}
            for game in games[:limit]
        ],
        "underdeveloped_1_mechanic_sample": [
            {"title": game["title"], "mechanic": game["mechanics"][0]["id"]}
            for game in one_mechanic[:limit]
        ],
        "underdeveloped_2_to_4_sample": [
            {"title": game["title"], "mechanic_count": game["mechanic_count"]}
            for game in two_to_four[:limit]
        ],
        "possible_title_clusters": title_variant_groups(games),
        "category_concentration": category_concentration(report),
        "mechanics_with_many_examples": mechanics_with_many_examples(games, limit),
        "risky_note_matches": risky_notes(games),
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
    return str(value).replace("|", "\\|").replace("\n", " ")


def format_top_games(values: list[dict[str, Any]]) -> str:
    if not values:
        return "none"
    return ", ".join(f"{item['title']} ({item['references']})" for item in values)


def render_markdown(audit: dict[str, Any]) -> str:
    summary = audit["summary"]
    lines = [
        "# Game Anchor Audit Signals",
        "",
        "This output summarizes quantitative signals for reviewing the derived game-to-mechanics index. It is advisory and does not change mechanic data.",
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
        "## Saturated Anchors",
        "",
        markdown_table(
            ["Game", "Mechanic count"],
            [[item["title"], item["mechanic_count"]] for item in audit["saturated_anchors"]],
        ),
        "",
        "## Possible Title Clusters",
        "",
        markdown_table(
            ["Series key", "Titles"],
            [[item["series_key"], ", ".join(item["titles"])] for item in audit["possible_title_clusters"][:20]],
        ),
        "",
        "## Category Concentration",
        "",
        markdown_table(
            ["Category", "Unique games", "References", "Top-three share", "Top games"],
            [
                [
                    item["category"],
                    item["unique_games"],
                    item["example_references"],
                    item["top_three_reference_share"],
                    format_top_games(item["top_games"]),
                ]
                for item in audit["category_concentration"][:20]
            ],
        ),
        "",
        "## Mechanics With Many Game Examples",
        "",
        markdown_table(
            ["Mechanic", "Category", "Game count"],
            [[item["mechanic_id"], item["category"], item["game_count"]] for item in audit["mechanics_with_many_examples"]],
        ),
        "",
        "## Risky Note Term Matches",
        "",
    ]
    if audit["risky_note_matches"]:
        lines.append(
            markdown_table(
                ["Game", "Mechanic", "Matched terms", "Note"],
                [
                    [item["title"], item["mechanic_id"], ", ".join(item["matched_terms"]), item["example_note"]]
                    for item in audit["risky_note_matches"][:20]
                ],
            )
        )
    else:
        lines.append("No risky note terms matched.")
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit derived game anchors for quality review signals.")
    parser.add_argument("--json", action="store_true", help="Print JSON output.")
    parser.add_argument("--output", type=Path, help="Write Markdown output to a file.")
    parser.add_argument("--limit", type=int, default=DEFAULT_TOP_LIMIT, help="Number of top/sample rows to include.")
    args = parser.parse_args()

    audit = build_audit(repo_root(), limit=max(1, args.limit))
    if args.json:
        print(json.dumps(audit, indent=2, sort_keys=True))
        return 0

    markdown = render_markdown(audit)
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(markdown, encoding="utf-8")
    else:
        print(markdown)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
