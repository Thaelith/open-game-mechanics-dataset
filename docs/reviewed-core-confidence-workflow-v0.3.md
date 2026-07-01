# Reviewed Core Confidence Workflow v0.3

This is a workflow proposal for v0.3 review work. It does not change the schema, mark any mechanic as reviewed, or raise any `source_confidence` value.

## Purpose

Reviewed status should not be based on schema validity alone.

A schema-valid mechanic can still have weak prerequisites, unclear state ownership, generic edge cases, vague common bugs, noisy relationships, or unresolved architecture risks. The reviewed-core workflow exists to make status and confidence changes conservative, explainable, and easy to audit.

## Reviewed Status Criteria

A mechanic should only move from `status: "draft"` to `status: "reviewed"` when it has:

- Clear prerequisites and required systems.
- Explicit state ownership.
- Explicit input, timing, resource, save/load, networking, or UI assumptions where relevant.
- Concrete `edge_cases` that help catch prototype-breaking problems.
- Concrete `common_bugs` that identify likely implementation failure modes.
- Implementation notes that are engine-specific enough to be useful.
- Relationship directions checked against [`relationship-semantics-and-direction.md`](relationship-semantics-and-direction.md).
- `scope_profile` values checked as plausible relative planning signals.
- At least one maintainer review.
- No obvious duplicate, variant, or parameter ambiguity.
- No unresolved architecture gate if the mechanic is high-risk.

## Source Confidence Criteria

`source_confidence` is a practical confidence signal, not a formal citation system.

`low` means the entry is speculative, sparse, weakly grounded, or needs significant review before it should guide planning.

`medium` means the entry is plausible and useful, but not deeply validated. Most current mechanics should remain here until reviewed-core workflow evidence exists.

`high` should require careful review against examples, implementation risks, failure modes, relationship context, and maintainer or community agreement. It should not be used only because an entry sounds convincing.

## Confidence Rationale Without Schema Changes

The current schema does not include a structured confidence-rationale field.

Until a future schema version adds one, confidence rationale should live in review docs or reports. A future schema may add structured fields such as:

- `review_status`
- `confidence_rationale`
- `reviewed_by`
- `reviewed_at`
- `source_notes`
- `example_review_notes`

Do not add these fields to mechanic JSON until the schema explicitly supports them.

## Candidate First Mechanics

The first reviewed-status candidates should come from the lower-risk Batch 1 mechanics:

- `movement.dash`
- `platforming.jump_buffering`
- `combat.reload`
- `ui_ux.cooldown_indicator`

These are candidates for later reviewed status, not reviewed mechanics yet.

They are good first candidates because they have already received stronger edge cases, common bugs, implementation notes, relationship review, and scope metadata. They still need a final explicit confidence rationale and focused maintainer decision.

`time.time_rewind` should remain separate. It is architecture-gated and should not be one of the first reviewed-status candidates until its snapshot, persistence, reward, physics, AI, and multiplayer risks are resolved.

## Minimal Review Template

Use this template for a focused reviewed-core decision:

```text
Mechanic:
Current status:
Current source_confidence:
Prerequisites checked:
State/input assumptions checked:
Edge cases checked:
Common bugs checked:
Relationships checked:
Scope profile checked:
Example games reviewed:
Remaining concerns:
Decision:
Rationale:
```

Recommended decisions:

- `keep_draft`
- `ready_for_reviewed_status`
- `needs_minor_followup`
- `needs_architecture_review`
- `not_ready`

Recommended confidence decisions:

- `keep_low`
- `keep_medium`
- `raise_to_high_later`

Do not combine a reviewed-status change with unrelated data rewrites. Keep each status/confidence decision small, reviewable, and backed by rationale.
