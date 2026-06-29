#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""Warn about generic wording patterns in mechanic JSON files.

This linter is intentionally non-blocking. It prints warnings and exits 0 so the
project can use it for quality discovery before deciding which checks should
become CI failures.
"""

from __future__ import annotations

import argparse
import json
import re
from collections import defaultdict
from pathlib import Path
from typing import Any


WEAK_PARAMETER_NAMES = {
    "speed",
    "time",
    "force",
    "value",
    "amount",
    "duration",
    "cooldown",
    "range",
    "feedback",
}

GENERIC_PHRASES = [
    re.compile(r"\bclear player promise\b", re.IGNORECASE),
    re.compile(r"\breadable trigger\b", re.IGNORECASE),
    re.compile(r"\bpredictable result\b", re.IGNORECASE),
    re.compile(r"\bhigh-priority state\b", re.IGNORECASE),
    re.compile(r"\bscene transition, pause, respawn\b", re.IGNORECASE),
    re.compile(r"\bgeneric feedback\b", re.IGNORECASE),
    re.compile(r"\buse engine physics\b", re.IGNORECASE),
    re.compile(r"\bengine-agnostic state first\b", re.IGNORECASE),
    re.compile(r"\bstrong enough to justify attention\b", re.IGNORECASE),
]

BROAD_TERMS = {
    "speed",
    "time",
    "force",
    "value",
    "amount",
}

IMPLEMENTATION_FIELDS = ("unity", "godot", "unreal", "web")


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def mechanic_files(root: Path) -> list[Path]:
    return sorted((root / "data").glob("*/*.json"))


def relative(path: Path, root: Path) -> str:
    return path.relative_to(root).as_posix()


def warn(warnings: list[str], path: Path, root: Path, message: str) -> None:
    warnings.append(f"{relative(path, root)}: {message}")


def find_generic_phrases(text: str) -> list[str]:
    matches = []
    for pattern in GENERIC_PHRASES:
        match = pattern.search(text)
        if match:
            matches.append(match.group(0))
    return matches


def broad_term_hits(text: str) -> list[str]:
    lowered = text.lower()
    hits = []
    for term in BROAD_TERMS:
        if re.search(rf"\b{re.escape(term)}\b", lowered):
            hits.append(term)
    return sorted(hits)


def repeated_text_warnings(
    grouped_text: dict[str, list[Path]],
    root: Path,
    label: str,
    minimum_count: int,
) -> list[str]:
    warnings = []
    for text, paths in grouped_text.items():
        if len(paths) < minimum_count:
            continue
        shown = ", ".join(relative(path, root) for path in paths[:5])
        if len(paths) > 5:
            shown += f", ... +{len(paths) - 5} more"
        snippet = " ".join(text.split())[:100]
        warnings.append(f"repeated {label} in {len(paths)} files: {shown} :: {snippet}")
    return warnings


def lint(root: Path) -> list[str]:
    warnings: list[str] = []
    design_notes_by_text: dict[str, list[Path]] = defaultdict(list)
    implementation_by_text: dict[str, list[Path]] = defaultdict(list)

    for path in mechanic_files(root):
        data = load_json(path)

        design_notes = data.get("design_notes")
        if isinstance(design_notes, str):
            design_notes_by_text[design_notes].append(path)
            for phrase in find_generic_phrases(design_notes):
                warn(warnings, path, root, f"generic design_notes phrase: '{phrase}'")

        for index, parameter in enumerate(data.get("parameters", [])):
            if not isinstance(parameter, dict):
                continue
            name = str(parameter.get("name", ""))
            description = str(parameter.get("description", ""))
            name_parts = set(name.split("_"))
            weak_hits = sorted(WEAK_PARAMETER_NAMES.intersection(name_parts | {name}))
            if weak_hits:
                warn(warnings, path, root, f"weak parameter name at parameters[{index}]: '{name}'")
            description_hits = broad_term_hits(description)
            if description_hits and len(description.split()) < 14:
                joined = ", ".join(description_hits)
                warn(warnings, path, root, f"broad parameter description terms at parameters[{index}] ({joined}): '{description}'")

        for field, note in data.get("implementation_notes", {}).items():
            if field not in IMPLEMENTATION_FIELDS or not isinstance(note, str):
                continue
            implementation_by_text[f"{field}:{note}"].append(path)
            for phrase in find_generic_phrases(note):
                warn(warnings, path, root, f"generic {field} implementation phrase: '{phrase}'")
            if "physics" in note.lower() and re.search(r"\bengine physics\b", note, re.IGNORECASE):
                warn(warnings, path, root, f"{field} implementation says 'engine physics' without a concrete API or boundary")

        searchable_fields = [
            data.get("description", ""),
            data.get("player_fantasy", ""),
            " ".join(data.get("design_purpose", [])),
            " ".join(data.get("edge_cases", [])),
            " ".join(data.get("common_bugs", [])),
            " ".join(data.get("balancing_notes", [])),
            " ".join(data.get("accessibility_notes", [])),
        ]
        generic_hits = find_generic_phrases(" ".join(str(value) for value in searchable_fields))
        for phrase in sorted(set(generic_hits)):
            warn(warnings, path, root, f"generic wording phrase: '{phrase}'")

    warnings.extend(repeated_text_warnings(design_notes_by_text, root, "design_notes", minimum_count=2))
    warnings.extend(repeated_text_warnings(implementation_by_text, root, "implementation note", minimum_count=5))
    return warnings


def main() -> int:
    parser = argparse.ArgumentParser(description="Warn about generic mechanic wording.")
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--limit", type=int, default=0, help="Maximum warnings to print; 0 prints all")
    args = parser.parse_args()

    root = args.root.resolve()
    warnings = lint(root)
    shown = warnings if args.limit <= 0 else warnings[: args.limit]

    if not warnings:
        print("generic_lint: no warnings found.")
        return 0

    print(f"generic_lint: {len(warnings)} warning(s). This tool is advisory and exits 0.")
    for warning in shown:
        print(f"WARNING: {warning}")
    if args.limit > 0 and len(warnings) > args.limit:
        print(f"... {len(warnings) - args.limit} additional warning(s) hidden by --limit")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
