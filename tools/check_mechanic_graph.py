#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""Validate typed mechanic relationships and scope profiles.

This checker complements schema validation with cross-file graph checks. It is
intended to fail CI only on invalid references, malformed typed relationships,
duplicate typed edges, self-references, or invalid scope profile values.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any


RELATIONSHIP_TYPES = {
    "requires",
    "supports",
    "enhances",
    "extends",
    "is_variant_of",
    "conflicts_with",
    "soft_conflicts_with",
    "balances",
    "feeds",
    "consumes",
    "unlocks",
}

RELATIONSHIP_STRENGTHS = {"weak", "medium", "strong"}

SCOPE_FIELDS: dict[str, tuple[int, int]] = {
    "implementation_cost": (1, 5),
    "design_cost": (1, 5),
    "tuning_cost": (1, 5),
    "content_cost": (1, 5),
    "networking_risk": (0, 5),
    "save_load_risk": (0, 5),
    "ui_risk": (0, 5),
}

MVP_ROLES = {"core", "support", "optional", "polish", "unknown"}
REFERENCE_RE = re.compile(
    r"^(?:(?:external|future)\.[a-z0-9_]+(?:\.[a-z0-9_]+)*|[a-z][a-z0-9_]*\.[a-z0-9_]+(?:\.[a-z0-9_]+)*)$"
)
EXTERNAL_PREFIXES = ("external.", "future.")


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        value = json.load(handle)
    return value if isinstance(value, dict) else {}


def mechanic_files(root: Path) -> list[Path]:
    return sorted((root / "data").glob("*/*.json"))


def relative(path: Path, root: Path) -> str:
    return path.relative_to(root).as_posix()


def is_external_reference(value: str) -> bool:
    return value.startswith(EXTERNAL_PREFIXES)


def is_valid_reference(value: Any) -> bool:
    return isinstance(value, str) and bool(REFERENCE_RE.fullmatch(value))


def format_issue(path: Path, root: Path, message: str) -> str:
    return f"{relative(path, root)}: {message}"


def load_mechanics(root: Path) -> tuple[dict[str, tuple[Path, dict[str, Any]]], list[str]]:
    mechanics: dict[str, tuple[Path, dict[str, Any]]] = {}
    errors: list[str] = []

    for path in mechanic_files(root):
        try:
            data = load_json(path)
        except json.JSONDecodeError as exc:
            errors.append(format_issue(path, root, f"invalid JSON at line {exc.lineno}, column {exc.colno}: {exc.msg}"))
            continue

        mechanic_id = data.get("id")
        if not isinstance(mechanic_id, str):
            errors.append(format_issue(path, root, "missing string id"))
            continue

        if mechanic_id in mechanics:
            first_path, _ = mechanics[mechanic_id]
            errors.append(format_issue(path, root, f"duplicate id '{mechanic_id}' already used by {relative(first_path, root)}"))
            continue

        mechanics[mechanic_id] = (path, data)

    return dict(sorted(mechanics.items())), errors


def analyze_graph(root: Path) -> dict[str, Any]:
    mechanics, errors = load_mechanics(root)
    known_ids = set(mechanics)
    warnings: list[str] = []
    unresolved_targets: list[dict[str, str]] = []
    duplicate_relationships: list[dict[str, str]] = []
    self_references: list[dict[str, str]] = []
    scope_profile_errors: list[str] = []
    relationship_count_by_type: Counter[str] = Counter()
    outgoing_relationships: dict[str, list[dict[str, str]]] = defaultdict(list)
    incoming_relationships: dict[str, list[str]] = defaultdict(list)
    category_relationship_coverage: Counter[str] = Counter()
    category_scope_coverage: Counter[str] = Counter()
    category_counts: Counter[str] = Counter()

    for mechanic_id, (path, data) in mechanics.items():
        category = str(data.get("category", "unknown"))
        category_counts[category] += 1

        legacy_targets_by_field: dict[str, list[str]] = {
            "related_mechanics": [],
            "combines_well_with": [],
            "relationships": [],
        }

        for field in ("related_mechanics", "combines_well_with"):
            refs = data.get(field, [])
            if not isinstance(refs, list):
                errors.append(format_issue(path, root, f"{field} must be an array when present"))
                continue
            for ref in refs:
                if not is_valid_reference(ref):
                    errors.append(format_issue(path, root, f"{field} has invalid reference '{ref}'"))
                    continue
                legacy_targets_by_field[field].append(ref)
                if not is_external_reference(ref) and ref not in known_ids:
                    unresolved_targets.append({"id": mechanic_id, "field": field, "target": ref})
                    errors.append(format_issue(path, root, f"{field} references unknown mechanic id '{ref}'"))

        relationships = data.get("relationships", [])
        if relationships:
            category_relationship_coverage[category] += 1
        if not isinstance(relationships, list):
            errors.append(format_issue(path, root, "relationships must be an array when present"))
            relationships = []

        seen_typed_edges: set[tuple[str, str]] = set()
        for index, relationship in enumerate(relationships):
            location = f"relationships[{index}]"
            if not isinstance(relationship, dict):
                errors.append(format_issue(path, root, f"{location} must be an object"))
                continue

            target = relationship.get("target")
            relation_type = relationship.get("type")
            strength = relationship.get("strength")
            reason = relationship.get("reason")

            if not is_valid_reference(target):
                errors.append(format_issue(path, root, f"{location}.target has invalid reference '{target}'"))
                continue

            legacy_targets_by_field["relationships"].append(target)

            if target == mechanic_id:
                self_references.append({"id": mechanic_id, "target": target, "type": str(relation_type)})
                errors.append(format_issue(path, root, f"{location} targets itself"))

            if not is_external_reference(target) and target not in known_ids:
                unresolved_targets.append({"id": mechanic_id, "field": location, "target": target})
                errors.append(format_issue(path, root, f"{location}.target references unknown mechanic id '{target}'"))

            if relation_type not in RELATIONSHIP_TYPES:
                errors.append(format_issue(path, root, f"{location}.type is invalid: '{relation_type}'"))
                continue

            if strength not in RELATIONSHIP_STRENGTHS:
                errors.append(format_issue(path, root, f"{location}.strength is invalid: '{strength}'"))

            if not isinstance(reason, str) or len(reason.strip()) < 20:
                errors.append(format_issue(path, root, f"{location}.reason must be at least 20 characters"))

            typed_key = (target, relation_type)
            if typed_key in seen_typed_edges:
                duplicate_relationships.append({"id": mechanic_id, "target": target, "type": relation_type})
                errors.append(format_issue(path, root, f"duplicate typed relationship target/type: {target} / {relation_type}"))
            seen_typed_edges.add(typed_key)

            relationship_count_by_type[relation_type] += 1
            outgoing_relationships[mechanic_id].append(
                {
                    "target": target,
                    "type": relation_type,
                    "strength": str(strength),
                }
            )
            if not is_external_reference(target):
                incoming_relationships[target].append(mechanic_id)

        for target in sorted(set().union(*[set(values) for values in legacy_targets_by_field.values()])):
            fields = [field for field, values in legacy_targets_by_field.items() if target in values]
            if len(fields) > 1:
                warnings.append(
                    format_issue(
                        path,
                        root,
                        f"target '{target}' appears across multiple relationship fields: {', '.join(fields)}",
                    )
                )

        scope_profile = data.get("scope_profile")
        if scope_profile is not None:
            category_scope_coverage[category] += 1
            if not isinstance(scope_profile, dict):
                message = format_issue(path, root, "scope_profile must be an object")
                scope_profile_errors.append(message)
                errors.append(message)
            else:
                role = scope_profile.get("mvp_role")
                if role not in MVP_ROLES:
                    message = format_issue(path, root, f"scope_profile.mvp_role is invalid: '{role}'")
                    scope_profile_errors.append(message)
                    errors.append(message)
                for field, (minimum, maximum) in SCOPE_FIELDS.items():
                    value = scope_profile.get(field)
                    if not isinstance(value, int) or not minimum <= value <= maximum:
                        message = format_issue(
                            path,
                            root,
                            f"scope_profile.{field} must be an integer from {minimum} to {maximum}",
                        )
                        scope_profile_errors.append(message)
                        errors.append(message)

    typed_relationship_total = sum(len(edges) for edges in outgoing_relationships.values())
    mechanics_with_relationships = sorted(mechanic_id for mechanic_id, edges in outgoing_relationships.items() if edges)
    mechanics_with_scope_profile = sorted(
        mechanic_id for mechanic_id, (_, data) in mechanics.items() if isinstance(data.get("scope_profile"), dict)
    )

    return {
        "summary": {
            "mechanic_count": len(mechanics),
            "mechanics_with_relationships": len(mechanics_with_relationships),
            "mechanics_with_scope_profile": len(mechanics_with_scope_profile),
            "typed_relationship_count": typed_relationship_total,
            "relationship_count_by_type": dict(sorted(relationship_count_by_type.items())),
            "unresolved_target_count": len(unresolved_targets),
            "duplicate_relationship_count": len(duplicate_relationships),
            "self_reference_count": len(self_references),
            "scope_profile_error_count": len(scope_profile_errors),
            "warning_count": len(warnings),
            "error_count": len(errors),
        },
        "mechanic_ids": sorted(mechanics),
        "mechanics_with_relationships": mechanics_with_relationships,
        "mechanics_with_scope_profile": mechanics_with_scope_profile,
        "outgoing_relationships": {key: value for key, value in sorted(outgoing_relationships.items())},
        "incoming_relationships": {key: sorted(value) for key, value in sorted(incoming_relationships.items())},
        "category_counts": dict(sorted(category_counts.items())),
        "category_relationship_coverage": dict(sorted(category_relationship_coverage.items())),
        "category_scope_coverage": dict(sorted(category_scope_coverage.items())),
        "unresolved_targets": unresolved_targets,
        "duplicate_relationships": duplicate_relationships,
        "self_references": self_references,
        "scope_profile_errors": scope_profile_errors,
        "warnings": warnings,
        "errors": errors,
    }


def print_text_report(report: dict[str, Any]) -> None:
    summary = report["summary"]
    print("Mechanic graph validation")
    print(f"- Mechanics: {summary['mechanic_count']}")
    print(f"- Mechanics with relationships: {summary['mechanics_with_relationships']}")
    print(f"- Mechanics with scope_profile: {summary['mechanics_with_scope_profile']}")
    print(f"- Typed relationships: {summary['typed_relationship_count']}")
    print("- Relationship count by type:")
    if summary["relationship_count_by_type"]:
        for relation_type, count in summary["relationship_count_by_type"].items():
            print(f"  - {relation_type}: {count}")
    else:
        print("  - none")
    print(f"- Unresolved targets: {summary['unresolved_target_count']}")
    print(f"- Duplicate typed relationships: {summary['duplicate_relationship_count']}")
    print(f"- Self-references: {summary['self_reference_count']}")
    print(f"- Scope profile errors: {summary['scope_profile_error_count']}")
    print(f"- Warnings: {summary['warning_count']}")
    print(f"- Errors: {summary['error_count']}")

    if report["warnings"]:
        print("\nWarnings:")
        for warning in report["warnings"][:20]:
            print(f"- {warning}")
        hidden_count = len(report["warnings"]) - 20
        if hidden_count > 0:
            print(f"- ... {hidden_count} additional warning(s) hidden; run with --json for full details")

    if report["errors"]:
        print("\nErrors:", file=sys.stderr)
        for error in report["errors"]:
            print(f"- {error}", file=sys.stderr)


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate typed mechanic graph relationships.")
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--json", action="store_true", help="Print machine-readable JSON")
    args = parser.parse_args()

    root = args.root.resolve()
    report = analyze_graph(root)

    if args.json:
        print(json.dumps(report, indent=2, ensure_ascii=False))
    else:
        print_text_report(report)

    return 1 if report["errors"] else 0


if __name__ == "__main__":
    raise SystemExit(main())
