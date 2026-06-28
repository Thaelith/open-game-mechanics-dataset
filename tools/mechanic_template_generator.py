#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""Generate a starter mechanic JSON document."""

from __future__ import annotations

import argparse
import json
import re
from datetime import date
from pathlib import Path


CATEGORIES = [
    "movement", "combat", "camera", "physics", "platforming", "traversal",
    "puzzle", "stealth", "survival", "crafting", "economy", "progression",
    "ai", "multiplayer", "narrative", "ui_ux", "accessibility", "meta",
    "procedural_generation", "vehicles", "rhythm", "time", "horror",
    "roguelike", "strategy", "simulation",
]


def title_from_id(mechanic_id: str) -> str:
    return mechanic_id.split(".")[-1].replace("_", " ").title()


def validate_id(mechanic_id: str) -> None:
    if not re.fullmatch(r"[a-z][a-z0-9_]*\.[a-z0-9_]+(\.[a-z0-9_]+)*", mechanic_id):
        raise SystemExit("id must be dot-separated lowercase with snake_case segments, for example movement.dash")


def make_template(mechanic_id: str, category: str) -> dict:
    name = title_from_id(mechanic_id)
    return {
        "id": mechanic_id,
        "name": name,
        "aliases": [],
        "category": category,
        "subcategory": "replace_me",
        "status": "draft",
        "dimensions": ["2D", "2.5D", "3D"],
        "difficulty": {"design": "medium", "implementation": "medium", "tuning": "medium"},
        "genres": [],
        "description": f"One clear sentence describing {name}.",
        "design_notes": "Explain the player-facing rule, tradeoffs, failure states, and why this mechanic belongs in a game.",
        "design_purpose": [
            "Explain the primary player-facing purpose.",
            "Explain how it creates decisions, mastery, pacing, or expression.",
        ],
        "player_fantasy": "Describe what the player feels able to do.",
        "required_systems": [],
        "parameters": [
            {"name": "replace_me", "type": "float", "typical_range": "replace_me", "description": "Replace with a tunable value."},
            {"name": "replace_me_2", "type": "float", "typical_range": "replace_me", "description": "Replace with a tunable value."},
            {"name": "replace_me_3", "type": "float", "typical_range": "replace_me", "description": "Replace with a tunable value."},
        ],
        "common_variants": [],
        "edge_cases": [
            "Describe an interruption or boundary case.",
            "Describe an interaction with another mechanic.",
            "Describe a platform, timing, save/load, or networking edge case.",
        ],
        "common_bugs": [
            "Describe one likely implementation pitfall.",
            "Describe one likely feedback or state reset issue.",
            "Describe one likely frame-rate, platform, or sync issue.",
        ],
        "balancing_notes": [
            "Explain what makes the mechanic too weak.",
            "Explain what makes the mechanic too dominant.",
        ],
        "accessibility_notes": [
            "Explain how players receive clear feedback or alternate input support."
        ],
        "implementation_notes": {
            "unity": "Describe a Unity approach without making the mechanic Unity-only.",
            "godot": "Describe a Godot approach without making the mechanic Godot-only.",
            "unreal": "Describe an Unreal approach without making the mechanic Unreal-only.",
            "web": "Describe a JavaScript, Phaser, Three.js, or custom loop approach.",
        },
        "related_mechanics": [],
        "combines_well_with": [],
        "example_games": [],
        "tags": [],
        "source_confidence": "low",
        "last_updated": date.today().isoformat(),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate a starter mechanic JSON file.")
    parser.add_argument("id", help="Mechanic id, for example movement.dash")
    parser.add_argument("--output", type=Path, help="Output path. Defaults to stdout.")
    args = parser.parse_args()

    validate_id(args.id)
    category = args.id.split(".", 1)[0]
    if category not in CATEGORIES:
        raise SystemExit(f"unknown category '{category}'. Expected one of: {', '.join(CATEGORIES)}")

    rendered = json.dumps(make_template(args.id, category), indent=2) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(rendered, encoding="utf-8", newline="\n")
    else:
        print(rendered, end="")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
