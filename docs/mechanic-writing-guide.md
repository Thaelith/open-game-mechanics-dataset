# Mechanic Writing Guide

Good entries are useful to both humans and tools. Write as if a developer is deciding whether to prototype the mechanic tomorrow.

## Descriptions

Use a short, clear `description`. It should say what the mechanic is, not why it is exciting. Avoid vague words such as "fun", "immersive", or "dynamic" unless the sentence explains the concrete effect.

## Design vs. Implementation

Keep player-facing design separate from engine notes. Use `design_notes`, `design_purpose`, and `player_fantasy` for why the mechanic exists. Use `implementation_notes` for Unity, Godot, Unreal, Web/JavaScript, or other practical approaches.

## Parameters

Include tunable parameters a developer can actually adjust: distance, duration, cooldown, cost, range, threshold, decay, curve, spawn weight, or count. Give typical ranges as guidance, not universal truth.

## Edge Cases and Bugs

Edge cases should describe boundary conditions such as interruption, overlapping states, save/load, level transitions, multiplayer latency, or extreme frame rates. Common bugs should identify likely implementation pitfalls.

## Examples

Example games are allowed as short factual references. Do not copy explanations from wikis, articles, store pages, subtitles, or design documents. Do not include assets or proprietary implementation details.

## Original Wording

All descriptions, notes, and examples must be written in your own words. If an entry cannot be written without copying a source, do not submit it.
