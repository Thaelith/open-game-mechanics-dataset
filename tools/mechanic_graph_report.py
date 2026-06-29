#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""Report typed mechanic graph coverage for backfill planning."""

from __future__ import annotations

import argparse
import json
from collections import Counter
from pathlib import Path
from typing import Any

import check_mechanic_graph


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def percent(part: int, whole: int) -> float:
    return round((part / whole * 100.0) if whole else 0.0, 2)


def build_report(root: Path) -> dict[str, Any]:
    graph = check_mechanic_graph.analyze_graph(root)
    summary = graph["summary"]
    mechanic_ids = graph["mechanic_ids"]
    incoming = graph["incoming_relationships"]
    outgoing = graph["outgoing_relationships"]
    relationship_counts = Counter(summary["relationship_count_by_type"])
    category_counts = graph["category_counts"]
    category_relationship_coverage = graph["category_relationship_coverage"]
    category_scope_coverage = graph["category_scope_coverage"]

    top_outgoing = sorted(
        (
            {"id": mechanic_id, "count": len(edges)}
            for mechanic_id, edges in outgoing.items()
        ),
        key=lambda item: (-item["count"], item["id"]),
    )[:20]

    mechanics_with_no_incoming = sorted(
        mechanic_id for mechanic_id in mechanic_ids if not incoming.get(mechanic_id)
    )
    mechanics_with_no_outgoing = sorted(
        mechanic_id for mechanic_id in mechanic_ids if not outgoing.get(mechanic_id)
    )

    category_relationship_rows = []
    category_scope_rows = []
    for category, count in sorted(category_counts.items()):
        relationship_count = category_relationship_coverage.get(category, 0)
        scope_count = category_scope_coverage.get(category, 0)
        category_relationship_rows.append(
            {
                "category": category,
                "mechanic_count": count,
                "with_relationships": relationship_count,
                "coverage_percent": percent(relationship_count, count),
            }
        )
        category_scope_rows.append(
            {
                "category": category,
                "mechanic_count": count,
                "with_scope_profile": scope_count,
                "coverage_percent": percent(scope_count, count),
            }
        )

    return {
        "summary": {
            "mechanic_count": summary["mechanic_count"],
            "mechanics_with_relationships": summary["mechanics_with_relationships"],
            "relationships_coverage_percent": percent(
                summary["mechanics_with_relationships"],
                summary["mechanic_count"],
            ),
            "mechanics_with_scope_profile": summary["mechanics_with_scope_profile"],
            "scope_profile_coverage_percent": percent(
                summary["mechanics_with_scope_profile"],
                summary["mechanic_count"],
            ),
            "typed_relationship_count": summary["typed_relationship_count"],
        },
        "top_outgoing_relationships": top_outgoing,
        "most_common_relationship_types": [
            {"type": relation_type, "count": count}
            for relation_type, count in sorted(relationship_counts.items(), key=lambda item: (-item[1], item[0]))
        ],
        "mechanics_with_no_incoming_relationships": mechanics_with_no_incoming,
        "mechanics_with_no_outgoing_relationships": mechanics_with_no_outgoing,
        "category_relationship_coverage": category_relationship_rows,
        "category_scope_profile_coverage": category_scope_rows,
    }


def markdown_table(headers: list[str], rows: list[list[Any]]) -> str:
    lines = [
        "| " + " | ".join(headers) + " |",
        "| " + " | ".join("---" for _ in headers) + " |",
    ]
    for row in rows:
        lines.append("| " + " | ".join(str(value) for value in row) + " |")
    return "\n".join(lines)


def render_markdown(report: dict[str, Any]) -> str:
    summary = report["summary"]
    lines = [
        "# Mechanic Graph Coverage Report",
        "",
        "## Summary",
        "",
        markdown_table(
            ["Metric", "Value"],
            [
                ["Mechanics", summary["mechanic_count"]],
                ["Mechanics with relationships", summary["mechanics_with_relationships"]],
                ["Relationship coverage", f"{summary['relationships_coverage_percent']:.2f}%"],
                ["Mechanics with scope_profile", summary["mechanics_with_scope_profile"]],
                ["Scope profile coverage", f"{summary['scope_profile_coverage_percent']:.2f}%"],
                ["Typed relationships", summary["typed_relationship_count"]],
            ],
        ),
        "",
        "## Most Common Relationship Types",
        "",
        markdown_table(
            ["Type", "Count"],
            [[item["type"], item["count"]] for item in report["most_common_relationship_types"]] or [["none", 0]],
        ),
        "",
        "## Top Outgoing Relationship Counts",
        "",
        markdown_table(
            ["Mechanic", "Outgoing typed relationships"],
            [[item["id"], item["count"]] for item in report["top_outgoing_relationships"]] or [["none", 0]],
        ),
        "",
        "## Category Relationship Coverage",
        "",
        markdown_table(
            ["Category", "Mechanics", "With relationships", "Coverage"],
            [
                [
                    item["category"],
                    item["mechanic_count"],
                    item["with_relationships"],
                    f"{item['coverage_percent']:.2f}%",
                ]
                for item in report["category_relationship_coverage"]
            ],
        ),
        "",
        "## Category Scope Profile Coverage",
        "",
        markdown_table(
            ["Category", "Mechanics", "With scope_profile", "Coverage"],
            [
                [
                    item["category"],
                    item["mechanic_count"],
                    item["with_scope_profile"],
                    f"{item['coverage_percent']:.2f}%",
                ]
                for item in report["category_scope_profile_coverage"]
            ],
        ),
        "",
        "## No Incoming Typed Relationships",
        "",
        ", ".join(report["mechanics_with_no_incoming_relationships"]) or "None",
        "",
        "## No Outgoing Typed Relationships",
        "",
        ", ".join(report["mechanics_with_no_outgoing_relationships"]) or "None",
        "",
    ]
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Report typed mechanic graph coverage.")
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--json", action="store_true", help="Print machine-readable JSON")
    parser.add_argument("--output", type=Path, help="Optional output path for the report")
    args = parser.parse_args()

    report = build_report(args.root.resolve())
    if args.json:
        rendered = json.dumps(report, indent=2, ensure_ascii=False) + "\n"
    else:
        rendered = render_markdown(report)

    if args.output:
        output_path = args.output
        if not output_path.is_absolute():
            output_path = args.root.resolve() / output_path
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(rendered, encoding="utf-8", newline="\n")
        mode = "JSON" if args.json else "Markdown"
        print(f"Wrote {mode} mechanic graph report to {output_path}")
    else:
        print(rendered, end="" if rendered.endswith("\n") else "\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
