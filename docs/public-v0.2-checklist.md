# Public v0.2 Checklist

Use this checklist before tagging or announcing `v0.2.0`.

## Dataset

- [ ] Schema validation passes.
- [ ] Generated index is current.
- [ ] Dataset contains 223 mechanics.
- [ ] No duplicate mechanic IDs.
- [ ] No broken local documentation links.

## Graph

- [ ] Graph checker passes.
- [ ] Unresolved references: 0.
- [ ] Duplicate typed relationships: 0.
- [ ] Self-references: 0.
- [ ] Scope profile errors: 0.

## Quality

- [ ] Generic lint reports 0 warnings.
- [ ] Quality report shows 0 advisory warnings.
- [ ] Generic subcategory flags: none.

## Mixer

- [ ] `node --check site/mixer-analysis.js` passes.
- [ ] `node --check site/app.js` passes.
- [ ] Mixer unit tests pass.
- [ ] Mixer scenario tests pass.
- [ ] Mixer scenario QA report is regenerated.

## Public-Facing

- [ ] README reflects v0.2.0.
- [ ] CHANGELOG includes v0.2.0.
- [ ] Release notes are added.
- [ ] Mixer guide is added.
- [ ] Reports index is added.
- [ ] GitHub Pages/browser link is visible.

## Optional Before Tagging

- [ ] Create the GitHub release.
- [ ] Add repository topics.
- [ ] Verify GitHub Pages deploy publicly.
- [ ] Add one screenshot or GIF later if a stable asset is available.
