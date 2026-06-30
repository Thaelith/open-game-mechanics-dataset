# Changelog

All notable changes to this project will be documented in this file.

The format follows Keep a Changelog conventions, and this project uses semantic versioning for schema/tooling changes where practical.

## v0.2.0 — Graph-Aware Dataset + Mechanic Mixer MVP

Release date: 2026-06-30

### Added

- Optional typed `relationships` field for machine-readable dependency, support, conflict, flow, unlock, and variant edges.
- Optional `scope_profile` field for rough planning signals such as MVP role, implementation cost, tuning cost, content cost, networking risk, save/load risk, and UI risk.
- Graph validation with `tools/check_mechanic_graph.py`.
- Graph coverage reporting with `tools/mechanic_graph_report.py`.
- Saved graph coverage report at `docs/reports/mechanic-graph-report-v0.2.md`.
- Static browser detail-panel rendering for typed relationships and scope profiles.
- Mechanic Mixer MVP in the static browser.
- Shared deterministic Mixer analysis module at `site/mixer-analysis.js`.
- Mixer unit tests in `tools/test_mixer_analysis.mjs`.
- Mixer scenario QA fixtures and tests covering 10 realistic concept mixes.
- Saved Mixer scenario QA report at `docs/reports/mechanic-mixer-scenario-qa-v0.2.md`.

### Changed

- The dataset now reports `schema_version: "0.2.0"`.
- 223 mechanics remain schema-valid.
- Graph coverage reached 175 mechanics with typed relationships and scope profiles.
- Typed relationship count reached 526.
- CI now covers dataset validation, generated index checks, local link checks, advisory generic lint, graph validation, JavaScript syntax checks, Mixer unit tests, and Mixer scenario tests.
- The quality report remains at 0 advisory warnings.

### Mechanic Mixer MVP

The Mixer is a deterministic client-side planning helper. It supports selected mechanics, required-system aggregation, missing dependency and support suggestions, conflict warnings, scope pressure, MVP trim suggestions, related additions, AI planning prompt generation, export/import, and `?mix=` URL sharing.

### Not Included Yet

- No AI backend.
- No full graph visualization.
- No production-hour estimates.
- No claim of complete mechanic coverage.
- No generated game concepts beyond deterministic planning assistance.

## [0.1.0] - 2026-06-29

### Added

- Initial repository structure.
- Strict mechanic JSON Schema.
- Python validation, index generation, link checking, and template generation tools.
- GitHub Actions validation workflow.
- Seed dataset covering 223 schema-valid mechanics across 26 categories.
- Contributor documentation and AI-agent usage guide.
- v0.1.0 release notes, release status summary, recommended GitHub topics, and next quality-pass roadmap.
