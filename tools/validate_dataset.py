#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""Validate all mechanic JSON files in the Open Game Mechanics Dataset."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from jsonschema import Draft202012Validator, FormatChecker


EXTERNAL_PREFIXES = ("external.", "future.")


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_json(path: Path) -> object:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def mechanic_files(root: Path) -> list[Path]:
    return sorted((root / "data").glob("*/*.json"))


def format_error(path: Path, message: str) -> str:
    return f"{path.as_posix()}: {message}"


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate mechanic JSON files.")
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    args = parser.parse_args()

    root = args.root.resolve()
    schema_path = root / "schema" / "mechanic.schema.json"
    try:
        schema = load_json(schema_path)
    except FileNotFoundError:
        print(f"Schema not found: {schema_path}", file=sys.stderr)
        return 2

    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    files = mechanic_files(root)
    errors: list[str] = []
    mechanics: dict[str, tuple[Path, dict]] = {}

    if not files:
        errors.append("No mechanic files found under data/*/*.json")

    for path in files:
        try:
            data = load_json(path)
        except json.JSONDecodeError as exc:
            errors.append(format_error(path, f"invalid JSON at line {exc.lineno}, column {exc.colno}: {exc.msg}"))
            continue

        for error in sorted(validator.iter_errors(data), key=lambda item: list(item.path)):
            location = ".".join(str(part) for part in error.path) or "<root>"
            errors.append(format_error(path, f"schema error at {location}: {error.message}"))

        if not isinstance(data, dict):
            continue

        mechanic_id = data.get("id")
        if not isinstance(mechanic_id, str):
            continue

        if mechanic_id in mechanics:
            first_path, _ = mechanics[mechanic_id]
            errors.append(format_error(path, f"duplicate id '{mechanic_id}' already used by {first_path.as_posix()}"))
        else:
            mechanics[mechanic_id] = (path, data)

        expected_category = path.parent.name
        if data.get("category") != expected_category:
            errors.append(format_error(path, f"category '{data.get('category')}' does not match folder '{expected_category}'"))

        expected_stem = mechanic_id.split(".")[-1]
        if path.stem != expected_stem:
            errors.append(format_error(path, f"filename should be '{expected_stem}.json' to match id '{mechanic_id}'"))

        implementation_notes = data.get("implementation_notes", {})
        if isinstance(implementation_notes, dict) and len([v for v in implementation_notes.values() if v]) < 2:
            errors.append(format_error(path, "implementation_notes must include at least two non-empty engine/platform notes"))

    known_ids = set(mechanics)
    for mechanic_id, (path, data) in mechanics.items():
        for field in ("related_mechanics", "combines_well_with"):
            refs = data.get(field, [])
            if not isinstance(refs, list):
                continue
            for ref in refs:
                if isinstance(ref, str) and ref.startswith(EXTERNAL_PREFIXES):
                    continue
                if ref not in known_ids:
                    errors.append(format_error(path, f"{field} references unknown mechanic id '{ref}'"))

    if errors:
        print("Dataset validation failed:\n", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(f"Validated {len(mechanics)} mechanics from {len(files)} files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
