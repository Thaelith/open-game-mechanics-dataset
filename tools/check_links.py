#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""Simple local Markdown link checker for repository-relative links."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+)\)")


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def main() -> int:
    parser = argparse.ArgumentParser(description="Check local Markdown links.")
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    args = parser.parse_args()
    root = args.root.resolve()
    errors: list[str] = []

    for path in sorted(root.rglob("*.md")):
        text = path.read_text(encoding="utf-8")
        for match in LINK_RE.finditer(text):
            target = match.group(1).strip()
            if target.startswith(("http://", "https://", "mailto:", "#")):
                continue
            target_path = (path.parent / target.split("#", 1)[0]).resolve()
            if not str(target_path).startswith(str(root)):
                errors.append(f"{path.relative_to(root)}: link escapes repository: {target}")
            elif not target_path.exists():
                errors.append(f"{path.relative_to(root)}: missing link target: {target}")

    if errors:
        print("Broken local Markdown links:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1
    print("Local Markdown links look valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
