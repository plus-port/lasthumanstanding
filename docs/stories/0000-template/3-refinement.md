# <Story title> — refinement

Step: 3 · Refinement
Owner: Product Owner with the Development team
Input: `1-story.md` and `2-design.md`, both with their Done when lists ticked

## Design approval

Approved by <Product Owner> on <YYYY-MM-DD>, or: changes requested, listed below and taken back to `2-design.md`.

## Answers to open questions

One line per question from `2-design.md`. A question that changes the story is also applied to `1-story.md`.

## Vertical slices

Thin end-to-end paths, in build order. Each slice names the criteria it covers and the check that proves it.

| Slice | Covers criteria | Test or observable outcome | Notes |
| ----- | --------------- | -------------------------- | ----- |
| 1     |                 |                            |       |
| 2     |                 |                            |       |

## Decisions expected

Anything the slices will force: a schema migration, a new dependency, a new contract version, a new configuration value. Each becomes a record in `docs/decisions/` during step 4.

## Done when

- [ ] The Product Owner has approved the design above.
- [ ] Every open question from `2-design.md` has an answer.
- [ ] Every slice has a test or observable outcome, and every `must-ship` criterion is covered by some slice.
