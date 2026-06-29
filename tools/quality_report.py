#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""Generate an advisory quality report for the mechanic dataset.

The report is intentionally non-blocking. It helps maintainers spot broad
quality patterns before deciding which checks should become CI failures.
"""

from __future__ import annotations

import argparse
import json
import os
import re
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import generic_lint


IMPLEMENTATION_FIELDS = ("unity", "godot", "unreal", "web")
GENERIC_SUBCATEGORIES = {"", "general", "misc", "mechanic", "system"}


@dataclass(frozen=True)
class MechanicRecord:
    """Loaded mechanic JSON with stable repo-relative path metadata."""

    path: Path
    relative_path: str
    data: dict[str, Any]

    @property
    def mechanic_id(self) -> str:
        return str(self.data.get("id", self.relative_path))

    @property
    def category(self) -> str:
        return str(self.data.get("category", "unknown"))

    @property
    def subcategory(self) -> str:
        return str(self.data.get("subcategory", "") or "")


@dataclass(frozen=True)
class LintFinding:
    """Structured advisory quality finding."""

    mechanic_id: str
    category: str
    relative_path: str
    message: str
    term: str | None = None


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        value = json.load(handle)
    return value if isinstance(value, dict) else {}


def mechanic_files(root: Path) -> list[Path]:
    return sorted((root / "data").rglob("*.json"))


def relative(path: Path, root: Path) -> str:
    return path.relative_to(root).as_posix()


def as_list(value: Any) -> list[Any]:
    return value if isinstance(value, list) else []


def non_empty_list(value: Any) -> bool:
    return isinstance(value, list) and len(value) > 0


def is_non_empty_text(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def normalize_text(value: str) -> str:
    return " ".join(value.split()).strip().lower()


def generated_timestamp() -> str:
    """Return a stable-format UTC timestamp, honoring SOURCE_DATE_EPOCH."""

    source_epoch = os.environ.get("SOURCE_DATE_EPOCH")
    if source_epoch:
        try:
            return datetime.fromtimestamp(int(source_epoch), timezone.utc).replace(microsecond=0).isoformat()
        except ValueError:
            pass
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def load_mechanics(root: Path) -> list[MechanicRecord]:
    records: list[MechanicRecord] = []
    for path in mechanic_files(root):
        data = load_json(path)
        records.append(MechanicRecord(path=path, relative_path=relative(path, root), data=data))
    return sorted(records, key=lambda record: record.mechanic_id)


def load_dataset_metadata(root: Path) -> dict[str, Any]:
    path = root / "dataset.json"
    if not path.exists():
        return {}
    return load_json(path)


def add_finding(
    findings: list[LintFinding],
    record: MechanicRecord,
    message: str,
    term: str | None = None,
) -> None:
    findings.append(
        LintFinding(
            mechanic_id=record.mechanic_id,
            category=record.category,
            relative_path=record.relative_path,
            message=message,
            term=term,
        )
    )


def collect_generic_lint(records: list[MechanicRecord]) -> list[LintFinding]:
    """Mirror tools/generic_lint.py with structured output for aggregation."""

    findings: list[LintFinding] = []
    design_notes_by_text: dict[str, list[MechanicRecord]] = defaultdict(list)
    implementation_by_text: dict[str, list[MechanicRecord]] = defaultdict(list)

    for record in records:
        data = record.data

        design_notes = data.get("design_notes")
        if isinstance(design_notes, str):
            normalized = normalize_text(design_notes)
            if normalized:
                design_notes_by_text[normalized].append(record)
            for phrase in generic_lint.find_generic_phrases(design_notes):
                add_finding(record=record, findings=findings, message=f"generic design_notes phrase: '{phrase}'", term=phrase.lower())

        for index, parameter in enumerate(as_list(data.get("parameters"))):
            if not isinstance(parameter, dict):
                continue
            name = str(parameter.get("name", ""))
            description = str(parameter.get("description", ""))
            name_parts = set(name.split("_"))
            weak_hits = sorted(generic_lint.WEAK_PARAMETER_NAMES.intersection(name_parts | {name}))
            if weak_hits:
                add_finding(
                    record=record,
                    findings=findings,
                    message=f"weak parameter name at parameters[{index}]: '{name}'",
                    term=weak_hits[0],
                )
            description_hits = generic_lint.broad_term_hits(description)
            if description_hits and len(description.split()) < 14:
                joined = ", ".join(description_hits)
                add_finding(
                    record=record,
                    findings=findings,
                    message=f"broad parameter description terms at parameters[{index}] ({joined}): '{description}'",
                    term=description_hits[0],
                )

        implementation_notes = data.get("implementation_notes")
        if isinstance(implementation_notes, dict):
            for field, note in implementation_notes.items():
                if field not in IMPLEMENTATION_FIELDS or not isinstance(note, str):
                    continue
                normalized = normalize_text(note)
                if normalized:
                    implementation_by_text[f"{field}:{normalized}"].append(record)
                for phrase in generic_lint.find_generic_phrases(note):
                    add_finding(
                        record=record,
                        findings=findings,
                        message=f"generic {field} implementation phrase: '{phrase}'",
                        term=phrase.lower(),
                    )
                if "physics" in note.lower() and re.search(r"\bengine physics\b", note, re.IGNORECASE):
                    add_finding(
                        record=record,
                        findings=findings,
                        message=f"{field} implementation says 'engine physics' without a concrete API or boundary",
                        term="engine physics",
                    )

        searchable_values = [
            data.get("description", ""),
            data.get("player_fantasy", ""),
            " ".join(str(item) for item in as_list(data.get("design_purpose"))),
            " ".join(str(item) for item in as_list(data.get("edge_cases"))),
            " ".join(str(item) for item in as_list(data.get("common_bugs"))),
            " ".join(str(item) for item in as_list(data.get("balancing_notes"))),
            " ".join(str(item) for item in as_list(data.get("accessibility_notes"))),
        ]
        generic_hits = generic_lint.find_generic_phrases(" ".join(str(value) for value in searchable_values))
        for phrase in sorted({hit.lower(): hit for hit in generic_hits}.values()):
            add_finding(record=record, findings=findings, message=f"generic wording phrase: '{phrase}'", term=phrase.lower())

    for text, repeated_records in design_notes_by_text.items():
        if len(repeated_records) < 2:
            continue
        snippet = text[:100]
        for record in repeated_records:
            add_finding(
                record=record,
                findings=findings,
                message=f"repeated design_notes in {len(repeated_records)} files: {snippet}",
                term="repeated design_notes",
            )

    for text, repeated_records in implementation_by_text.items():
        if len(repeated_records) < 5:
            continue
        field = text.split(":", 1)[0]
        for record in repeated_records:
            add_finding(
                record=record,
                findings=findings,
                message=f"repeated {field} implementation note in {len(repeated_records)} files",
                term=f"repeated {field} implementation",
            )

    return sorted(findings, key=lambda finding: (finding.category, finding.mechanic_id, finding.message))


def has_weak_implementation_notes(record: MechanicRecord) -> bool:
    notes = record.data.get("implementation_notes")
    if not isinstance(notes, dict):
        return True
    for field in IMPLEMENTATION_FIELDS:
        note = notes.get(field)
        if not is_non_empty_text(note):
            return True
        if generic_lint.find_generic_phrases(note):
            return True
        if re.search(r"\buse engine physics\b", note, re.IGNORECASE):
            return True
    return False


def collect_completeness(records: list[MechanicRecord]) -> dict[str, Any]:
    missing_impl_by_engine = {
        engine: sorted(
            record.mechanic_id
            for record in records
            if not is_non_empty_text(record.data.get("implementation_notes", {}).get(engine))
        )
        for engine in IMPLEMENTATION_FIELDS
    }

    checks = {
        "empty_example_games": sorted(record.mechanic_id for record in records if not non_empty_list(record.data.get("example_games"))),
        "empty_related_mechanics": sorted(record.mechanic_id for record in records if not non_empty_list(record.data.get("related_mechanics"))),
        "empty_combines_well_with": sorted(record.mechanic_id for record in records if not non_empty_list(record.data.get("combines_well_with"))),
        "fewer_than_3_parameters": sorted(record.mechanic_id for record in records if len(as_list(record.data.get("parameters"))) < 3),
        "fewer_than_2_edge_cases": sorted(record.mechanic_id for record in records if len(as_list(record.data.get("edge_cases"))) < 2),
        "fewer_than_2_common_bugs": sorted(record.mechanic_id for record in records if len(as_list(record.data.get("common_bugs"))) < 2),
        "fewer_than_2_balancing_notes": sorted(record.mechanic_id for record in records if len(as_list(record.data.get("balancing_notes"))) < 2),
        "fewer_than_1_accessibility_note": sorted(record.mechanic_id for record in records if len(as_list(record.data.get("accessibility_notes"))) < 1),
        "weak_implementation_notes": sorted(record.mechanic_id for record in records if has_weak_implementation_notes(record)),
    }

    return {
        "counts": {key: len(value) for key, value in checks.items()},
        "missing_implementation_notes": {
            engine: {"count": len(ids), "mechanics": ids}
            for engine, ids in missing_impl_by_engine.items()
        },
        "mechanics": checks,
    }


def collect_category_quality(
    records: list[MechanicRecord],
    findings: list[LintFinding],
    completeness: dict[str, Any],
) -> dict[str, dict[str, Any]]:
    by_category: dict[str, list[MechanicRecord]] = defaultdict(list)
    for record in records:
        by_category[record.category].append(record)

    warning_counts = Counter(finding.category for finding in findings)
    missing_examples = set(completeness["mechanics"]["empty_example_games"])
    weak_impl = set(completeness["mechanics"]["weak_implementation_notes"])
    low_params = set(completeness["mechanics"]["fewer_than_3_parameters"])
    low_edges = set(completeness["mechanics"]["fewer_than_2_edge_cases"])
    low_bugs = set(completeness["mechanics"]["fewer_than_2_common_bugs"])

    quality: dict[str, dict[str, Any]] = {}
    for category, category_records in sorted(by_category.items()):
        ids = {record.mechanic_id for record in category_records}
        count = len(category_records)
        warning_count = warning_counts[category]
        quality[category] = {
            "mechanic_count": count,
            "generic_warning_count": warning_count,
            "average_warnings_per_mechanic": round(warning_count / count, 2) if count else 0,
            "missing_examples_count": len(ids & missing_examples),
            "weak_implementation_notes_count": len(ids & weak_impl),
            "low_parameter_count": len(ids & low_params),
            "low_edge_case_count": len(ids & low_edges),
            "low_common_bug_count": len(ids & low_bugs),
        }
    return quality


def collect_subcategories(records: list[MechanicRecord]) -> dict[str, Any]:
    distribution: dict[str, Counter[str]] = defaultdict(Counter)
    generic_flags: list[dict[str, Any]] = []

    for record in records:
        subcategory = record.subcategory
        shown = subcategory if subcategory else "(missing)"
        distribution[record.category][shown] += 1

    for category, counter in sorted(distribution.items()):
        for subcategory, count in sorted(counter.items(), key=lambda item: (-item[1], item[0])):
            normalized = "" if subcategory == "(missing)" else subcategory.strip().lower()
            if normalized == category.lower() or normalized in GENERIC_SUBCATEGORIES:
                generic_flags.append(
                    {
                        "category": category,
                        "subcategory": subcategory,
                        "count": count,
                    }
                )

    return {
        "distribution": {
            category: dict(sorted(counter.items(), key=lambda item: (-item[1], item[0])))
            for category, counter in sorted(distribution.items())
        },
        "generic_subcategories": sorted(generic_flags, key=lambda item: (-item["count"], item["category"], item["subcategory"])),
    }


def iter_links(record: MechanicRecord) -> list[str]:
    links: list[str] = []
    for field in ("related_mechanics", "combines_well_with"):
        for target in as_list(record.data.get(field)):
            if isinstance(target, str) and target.strip():
                links.append(target.strip())
    return links


def collect_link_graph(records: list[MechanicRecord]) -> dict[str, Any]:
    id_to_record = {record.mechanic_id: record for record in records}
    outgoing: dict[str, list[str]] = {}
    incoming: Counter[str] = Counter()
    broken: list[dict[str, str]] = []

    for record in records:
        links = iter_links(record)
        outgoing[record.mechanic_id] = links
        for target in links:
            if target in id_to_record:
                incoming[target] += 1
            elif not target.startswith("future."):
                broken.append({"source": record.mechanic_id, "target": target})

    zero_outgoing = sorted(mechanic_id for mechanic_id, links in outgoing.items() if not links)
    zero_incoming = sorted(record.mechanic_id for record in records if incoming[record.mechanic_id] == 0)

    category_outgoing: dict[str, list[int]] = defaultdict(list)
    for record in records:
        category_outgoing[record.category].append(len(outgoing[record.mechanic_id]))

    lowest_category_outgoing = []
    for category, counts in sorted(category_outgoing.items()):
        average = sum(counts) / len(counts) if counts else 0
        lowest_category_outgoing.append(
            {
                "category": category,
                "average_outgoing_links": round(average, 2),
                "mechanic_count": len(counts),
            }
        )

    top_linked = [
        {"id": mechanic_id, "incoming_links": count}
        for mechanic_id, count in sorted(incoming.items(), key=lambda item: (-item[1], item[0]))[:20]
    ]

    return {
        "total_directed_links": sum(len(links) for links in outgoing.values()),
        "broken_internal_references": sorted(broken, key=lambda item: (item["source"], item["target"])),
        "zero_outgoing_links": zero_outgoing,
        "zero_incoming_links": zero_incoming,
        "top_most_linked_mechanics": top_linked,
        "categories_lowest_average_outgoing_links": sorted(
            lowest_category_outgoing,
            key=lambda item: (item["average_outgoing_links"], item["category"]),
        ),
        "incoming_counts": dict(sorted(incoming.items())),
        "outgoing_counts": {mechanic_id: len(links) for mechanic_id, links in sorted(outgoing.items())},
    }


def collect_example_usage(records: list[MechanicRecord]) -> dict[str, Any]:
    no_examples = sorted(record.mechanic_id for record in records if not non_empty_list(record.data.get("example_games")))
    title_counts: Counter[str] = Counter()
    missing_by_category: Counter[str] = Counter()

    for record in records:
        examples = as_list(record.data.get("example_games"))
        if not examples:
            missing_by_category[record.category] += 1
        for example in examples:
            if not isinstance(example, dict):
                continue
            title = str(example.get("title", "")).strip()
            if title:
                title_counts[title] += 1

    return {
        "mechanics_with_no_example_games": no_examples,
        "most_frequent_example_titles": [
            {"title": title, "count": count}
            for title, count in sorted(title_counts.items(), key=lambda item: (-item[1], item[0]))[:30]
        ],
        "categories_with_missing_examples": [
            {"category": category, "missing_examples": count}
            for category, count in sorted(missing_by_category.items(), key=lambda item: (-item[1], item[0]))
        ],
    }


def collect_recommendations(
    category_quality: dict[str, dict[str, Any]],
    subcategories: dict[str, Any],
    link_graph: dict[str, Any],
    findings: list[LintFinding],
) -> list[str]:
    recommendations: list[str] = []

    if category_quality:
        highest_avg = sorted(
            category_quality.items(),
            key=lambda item: (-item[1]["average_warnings_per_mechanic"], item[0]),
        )[0]
        recommendations.append(
            f"Run a wording pass on `{highest_avg[0]}`; it has the highest average advisory warning rate "
            f"({highest_avg[1]['average_warnings_per_mechanic']:.2f} per mechanic)."
        )

        missing_impl = sorted(
            category_quality.items(),
            key=lambda item: (-item[1]["weak_implementation_notes_count"], item[0]),
        )[0]
        if missing_impl[1]["weak_implementation_notes_count"]:
            recommendations.append(
                f"Review implementation notes in `{missing_impl[0]}`; "
                f"{missing_impl[1]['weak_implementation_notes_count']} mechanics have missing or weak notes."
            )

    generic_subcategory_counts = Counter(item["category"] for item in subcategories["generic_subcategories"])
    if generic_subcategory_counts:
        category, count = sorted(generic_subcategory_counts.items(), key=lambda item: (-item[1], item[0]))[0]
        recommendations.append(
            f"Plan a focused subcategory cleanup for `{category}`; {count} generic subcategory bucket(s) are present."
        )

    findings_by_id = Counter(finding.mechanic_id for finding in findings)
    centrality_candidates = []
    incoming_counts = link_graph["incoming_counts"]
    for mechanic_id, warning_count in findings_by_id.items():
        centrality_candidates.append(
            (
                warning_count,
                int(incoming_counts.get(mechanic_id, 0)),
                mechanic_id,
            )
        )
    if centrality_candidates:
        warning_count, incoming_count, mechanic_id = sorted(
            centrality_candidates,
            key=lambda item: (-item[0], -item[1], item[2]),
        )[0]
        recommendations.append(
            f"Hand-review `{mechanic_id}` first among individual entries; it has {warning_count} warning(s) "
            f"and {incoming_count} incoming link(s)."
        )

    lowest_links = link_graph["categories_lowest_average_outgoing_links"][:1]
    if lowest_links:
        item = lowest_links[0]
        recommendations.append(
            f"Improve relationship coverage in `{item['category']}`; it averages "
            f"{item['average_outgoing_links']:.2f} outgoing link(s) per mechanic."
        )

    return recommendations


def build_report(root: Path) -> dict[str, Any]:
    records = load_mechanics(root)
    metadata = load_dataset_metadata(root)
    findings = collect_generic_lint(records)
    completeness = collect_completeness(records)
    category_quality = collect_category_quality(records, findings, completeness)
    subcategories = collect_subcategories(records)
    link_graph = collect_link_graph(records)
    example_usage = collect_example_usage(records)

    category_counts = Counter(record.category for record in records)
    warning_counts_by_category = Counter(finding.category for finding in findings)
    all_warning_counts_by_category = {
        category: warning_counts_by_category[category]
        for category in sorted(category_counts)
    }
    warning_counts_by_mechanic = Counter(finding.mechanic_id for finding in findings)
    term_counts = Counter(finding.term for finding in findings if finding.term)

    recommendations = collect_recommendations(category_quality, subcategories, link_graph, findings)

    return {
        "summary": {
            "generated_at": generated_timestamp(),
            "total_mechanics": len(records),
            "total_categories": len(category_counts),
            "schema_version": metadata.get("schema_version", "unknown"),
            "mechanics_by_category": dict(sorted(category_counts.items(), key=lambda item: (-item[1], item[0]))),
        },
        "generic_lint_summary": {
            "total_advisory_warnings": len(findings),
            "warning_count_by_category": dict(sorted(all_warning_counts_by_category.items(), key=lambda item: (-item[1], item[0]))),
            "top_mechanics_by_warning_count": [
                {"id": mechanic_id, "warnings": count}
                for mechanic_id, count in sorted(warning_counts_by_mechanic.items(), key=lambda item: (-item[1], item[0]))[:20]
            ],
            "top_repeated_weak_terms": [
                {"term": term, "count": count}
                for term, count in sorted(term_counts.items(), key=lambda item: (-item[1], item[0]))[:20]
            ],
        },
        "field_completeness": completeness,
        "category_quality": dict(
            sorted(
                category_quality.items(),
                key=lambda item: (-item[1]["average_warnings_per_mechanic"], item[0]),
            )
        ),
        "subcategory_distribution": subcategories,
        "link_graph_health": link_graph,
        "example_game_usage": example_usage,
        "recommended_next_passes": recommendations,
    }


def markdown_escape(value: Any) -> str:
    text = str(value)
    return text.replace("|", "\\|").replace("\n", " ")


def markdown_table(headers: list[str], rows: list[list[Any]]) -> str:
    if not rows:
        return "_None._\n"
    header_line = "| " + " | ".join(markdown_escape(header) for header in headers) + " |"
    divider = "| " + " | ".join("---" for _ in headers) + " |"
    row_lines = [
        "| " + " | ".join(markdown_escape(cell) for cell in row) + " |"
        for row in rows
    ]
    return "\n".join([header_line, divider, *row_lines]) + "\n"


def render_markdown(report: dict[str, Any]) -> str:
    summary = report["summary"]
    lint_summary = report["generic_lint_summary"]
    completeness = report["field_completeness"]
    category_quality = report["category_quality"]
    subcategories = report["subcategory_distribution"]
    link_graph = report["link_graph_health"]
    example_usage = report["example_game_usage"]

    lines: list[str] = [
        "# Dataset Quality Report v0.1",
        "",
        "This advisory report summarizes dataset quality signals for maintainers. Warning counts are discovery signals, not CI failures.",
        "",
        "## Summary",
        "",
        markdown_table(
            ["Metric", "Value"],
            [
                ["Generated at", summary["generated_at"]],
                ["Schema version", summary["schema_version"]],
                ["Total mechanics", summary["total_mechanics"]],
                ["Total categories", summary["total_categories"]],
            ],
        ),
        "### Mechanics by Category",
        "",
        markdown_table(
            ["Category", "Mechanics"],
            [[category, count] for category, count in summary["mechanics_by_category"].items()],
        ),
        "## Generic Lint Summary",
        "",
        markdown_table([ "Metric", "Value" ], [["Total advisory warnings", lint_summary["total_advisory_warnings"]]]),
        "### Warning Count by Category",
        "",
        markdown_table(
            ["Category", "Warnings"],
            [[category, count] for category, count in lint_summary["warning_count_by_category"].items()],
        ),
        "### Top 20 Mechanics by Warning Count",
        "",
        markdown_table(
            ["Mechanic", "Warnings"],
            [[item["id"], item["warnings"]] for item in lint_summary["top_mechanics_by_warning_count"]],
        ),
        "### Top Repeated Weak or Generic Terms",
        "",
        markdown_table(
            ["Term", "Count"],
            [[item["term"], item["count"]] for item in lint_summary["top_repeated_weak_terms"]],
        ),
        "## Field Completeness",
        "",
        markdown_table(
            ["Check", "Count"],
            [
                ["Mechanics with empty example_games", completeness["counts"]["empty_example_games"]],
                ["Mechanics with empty related_mechanics", completeness["counts"]["empty_related_mechanics"]],
                ["Mechanics with empty combines_well_with", completeness["counts"]["empty_combines_well_with"]],
                ["Mechanics with fewer than 3 parameters", completeness["counts"]["fewer_than_3_parameters"]],
                ["Mechanics with fewer than 2 edge cases", completeness["counts"]["fewer_than_2_edge_cases"]],
                ["Mechanics with fewer than 2 common bugs", completeness["counts"]["fewer_than_2_common_bugs"]],
                ["Mechanics with fewer than 2 balancing notes", completeness["counts"]["fewer_than_2_balancing_notes"]],
                ["Mechanics with fewer than 1 accessibility note", completeness["counts"]["fewer_than_1_accessibility_note"]],
            ],
        ),
        "### Missing Implementation Notes by Engine",
        "",
        markdown_table(
            ["Engine", "Missing or Empty"],
            [[engine.title(), completeness["missing_implementation_notes"][engine]["count"]] for engine in IMPLEMENTATION_FIELDS],
        ),
        "## Category Quality Table",
        "",
        markdown_table(
            [
                "Category",
                "Mechanics",
                "Generic Warnings",
                "Avg Warnings",
                "Missing Examples",
                "Weak Impl Notes",
                "Low Params",
                "Low Edge Cases",
                "Low Bugs",
            ],
            [
                [
                    category,
                    metrics["mechanic_count"],
                    metrics["generic_warning_count"],
                    f"{metrics['average_warnings_per_mechanic']:.2f}",
                    metrics["missing_examples_count"],
                    metrics["weak_implementation_notes_count"],
                    metrics["low_parameter_count"],
                    metrics["low_edge_case_count"],
                    metrics["low_common_bug_count"],
                ]
                for category, metrics in category_quality.items()
            ],
        ),
        "## Subcategory Distribution",
        "",
        "### Generic Subcategory Flags",
        "",
        markdown_table(
            ["Category", "Subcategory", "Mechanics"],
            [
                [item["category"], item["subcategory"], item["count"]]
                for item in subcategories["generic_subcategories"]
            ],
        ),
    ]

    for category, counts in subcategories["distribution"].items():
        lines.extend(
            [
                f"### `{category}`",
                "",
                markdown_table(
                    ["Subcategory", "Mechanics"],
                    [[subcategory, count] for subcategory, count in counts.items()],
                ),
            ]
        )

    lines.extend(
        [
            "## Link Graph Health",
            "",
            markdown_table(
                ["Metric", "Value"],
                [
                    ["Total directed links", link_graph["total_directed_links"]],
                    ["Broken internal references", len(link_graph["broken_internal_references"])],
                    ["Mechanics with zero outgoing links", len(link_graph["zero_outgoing_links"])],
                    ["Mechanics with zero incoming links", len(link_graph["zero_incoming_links"])],
                ],
            ),
            "### Top 20 Most-Linked Mechanics",
            "",
            markdown_table(
                ["Mechanic", "Incoming Links"],
                [[item["id"], item["incoming_links"]] for item in link_graph["top_most_linked_mechanics"]],
            ),
            "### Categories with Lowest Average Outgoing Links",
            "",
            markdown_table(
                ["Category", "Average Outgoing Links", "Mechanics"],
                [
                    [item["category"], f"{item['average_outgoing_links']:.2f}", item["mechanic_count"]]
                    for item in link_graph["categories_lowest_average_outgoing_links"]
                ],
            ),
            "### Broken Internal References",
            "",
            markdown_table(
                ["Source", "Target"],
                [
                    [item["source"], item["target"]]
                    for item in link_graph["broken_internal_references"][:20]
                ],
            ),
            "### Mechanics with Zero Outgoing Links",
            "",
            markdown_table(
                ["Mechanic"],
                [[mechanic_id] for mechanic_id in link_graph["zero_outgoing_links"][:20]],
            ),
            "### Mechanics with Zero Incoming Links",
            "",
            markdown_table(
                ["Mechanic"],
                [[mechanic_id] for mechanic_id in link_graph["zero_incoming_links"][:20]],
            ),
            "## Example Game Usage",
            "",
            markdown_table(
                ["Metric", "Value"],
                [["Mechanics with no example games", len(example_usage["mechanics_with_no_example_games"])]],
            ),
            "### Mechanics with No Example Games",
            "",
            markdown_table(
                ["Mechanic"],
                [[mechanic_id] for mechanic_id in example_usage["mechanics_with_no_example_games"][:30]],
            ),
            "### Most Frequently Referenced Example Game Titles",
            "",
            markdown_table(
                ["Title", "Count"],
                [[item["title"], item["count"]] for item in example_usage["most_frequent_example_titles"]],
            ),
            "### Categories with Many Missing Examples",
            "",
            markdown_table(
                ["Category", "Missing Examples"],
                [[item["category"], item["missing_examples"]] for item in example_usage["categories_with_missing_examples"]],
            ),
            "## Recommended Next Passes",
            "",
        ]
    )

    if report["recommended_next_passes"]:
        lines.extend(f"- {recommendation}" for recommendation in report["recommended_next_passes"])
    else:
        lines.append("_No recommended passes generated._")

    lines.append("")
    return "\n".join(lines)


def write_output(content: str, output_path: Path | None) -> None:
    if output_path is None:
        print(content, end="" if content.endswith("\n") else "\n")
        return
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(content, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate an advisory dataset quality report.")
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--json", action="store_true", help="Print machine-readable JSON")
    parser.add_argument("--output", type=Path, help="Optional output file path")
    args = parser.parse_args()

    root = args.root.resolve()
    report = build_report(root)

    if args.json:
        content = json.dumps(report, indent=2, sort_keys=True) + "\n"
    else:
        content = render_markdown(report)

    output_path = args.output
    if output_path is not None and not output_path.is_absolute():
        output_path = root / output_path
    write_output(content, output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
