# v0.3 Release Candidate Checklist

Date: 2026-07-09

This checklist is for deciding whether the repository is ready to present as a v0.3 preview or release candidate. It does not mark v0.3 as released, and it does not change mechanic status, source confidence, schema, or dataset version.

## Public Positioning Check

- Status: pass
- The README describes the project as an engine-agnostic, machine-readable dataset for developers, students, researchers, technical designers, and AI-assisted workflows.
- The project is framed as a structured planning and study resource, not an authoritative encyclopedia, complete game database, code library, production estimator, or proof of proprietary implementations.
- v0.2.0 remains the current dataset/schema foundation. v0.3 is framed as public preparation, review, browser, Games view, playable examples, and workflow polish.

## README Check

- Status: pass
- The README explains the project, main workflows, status table, trust limits, and public review links near the top.
- "Try It" links cover GitHub Pages, playable examples, local browser entry, public usage guide, Mixer docs, demo mixes, AI-agent docs, release notes, reports, and local validation.
- The README is link-heavy but still grouped by purpose. No release-blocking README issue was found.

## Site / Browser Check

- Status: pass
- The static browser copy explains the four public workflows: mechanics browsing, game anchors, playable examples, and Mixer analysis.
- The footer continues to state that the browser is static and dependency-free.
- No site logic changes are required for this release-candidate pass.
- Browser smoke passed for main site load, mechanic browsing, Games search, game-to-Mixer add, Mixer analysis rendering, playable examples page load, and `movement.dash` demo load, with zero app console/page errors.

## Dataset Validation Check

- Status: pass
- Required validation gates:
  - `python tools/validate_dataset.py`
  - `python tools/generate_index.py --check`
  - `python tools/generic_lint.py --limit 50`
  - `python tools/quality_report.py`
  - `python tools/quality_report.py --json`
- All validation gates passed during this readiness pass.

## Generated Reports Check

- Status: pass
- Generated/status tooling should remain current:
  - `python tools/game_examples_index.py`
  - `python tools/game_examples_index.py --json`
  - `python tools/example_games_report.py`
  - `python tools/example_games_report.py --json`
  - `python tools/game_anchor_audit.py`
  - `python tools/game_anchor_audit.py --json`
  - `python tools/check_mechanic_graph.py`
  - `python tools/check_mechanic_graph.py --json`
  - `python tools/mechanic_graph_report.py --json`
- All generated/status report commands passed and did not leave generated report diffs.

## Game Examples / Games View Check

- Status: pass
- Current public framing is conservative: game examples are lightweight study anchors, not complete game profiles, citations, or proof of exact implementation.
- The Games view is derived from mechanic-level `example_games`.
- Game-anchor title and note rules are documented in `docs/game-anchor-policy-v0.3.md`.
- No additional enrichment should happen before v0.3 without a fresh audit or a narrow policy-guided reason.
- Browser smoke verified Games search and adding a game's mechanics to the Mixer.

## Playable Examples Check

- Status: pass
- Current MVP includes five original canvas demos:
  - `movement.dash`
  - `platforming.coyote_time`
  - `platforming.jump_buffering`
  - `combat.reload`
  - `ui_ux.cooldown_indicator`
- Demos are framed as simplified original teaching aids, not commercial footage, replicas, engine templates, or production-ready implementations.
- Browser smoke verified the playable examples page and `movement.dash` demo.

## Mixer Check

- Status: pass
- Mixer is framed as a deterministic planning aid, not a balance simulator, fun predictor, production estimator, or proof that mechanics combine cleanly.
- Existing unit and scenario QA tests must pass before release-candidate tagging.
- Mixer unit tests, Mixer scenario QA tests, and browser smoke all passed.

## Known Limitations Check

- Status: pass
- Current public docs state the important limits:
  - Most mechanics remain `draft`.
  - `source_confidence` has not been upgraded during v0.3 preparation.
  - The schema remains `0.2.0`.
  - The Games view is derived from mechanic entries, not a separate game database.
  - Some title consistency and broad mapping review remains future work.
  - Playable examples cover only five mechanics.
  - Mixer suggestions depend on relationship quality and can still be noisy.

## Release-Blocking Issues

- None found during public-facing inspection.
- Final validation and browser smoke passed.

## Non-Blocking Polish Items

- README remains dense because it links many public artifacts; acceptable for now, but a future documentation index could reduce top-level link volume.
- A screenshot or short original GIF could improve first impression later, but should not block v0.3.
- A curated `games/` or `game_tags/` layer remains future work and should not be introduced in v0.3.
- More playable examples should wait for user feedback on the first five demos.
- Relationship suggestion noise should continue to be reviewed after public feedback.

## Go / No-Go Recommendation

Recommendation: go for a v0.3 preview or release-candidate presentation.

Do not present this as a final authoritative taxonomy or reviewed/high-confidence dataset. The safest positioning is:

- v0.2.0 remains the stable dataset/schema foundation.
- v0.3 is a public-facing preparation milestone focused on usability, reviewability, Games discovery, playable examples, and clearer contribution/review workflows.
- Reviewed status and source-confidence upgrades should wait for the reviewed-core confidence workflow.
