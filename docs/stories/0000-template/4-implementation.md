# <Story title> — implementation

Step: 4 · Implementation
Owner: Development team
Input: `3-refinement.md` with its Done when list ticked
Branch: <branch name>
Merge request: <link>

## Slice log

One row per slice from `3-refinement.md`, in build order. Fill it as each slice passes its own check.

| Slice | Check run | Result | Commit |
| ----- | --------- | ------ | ------ |
| 1     |           |        |        |

## Change summary

- _What changed_ — files and behaviour, one line each.
- _Why_ — the task and the decision path, including alternatives rejected.
- _How verified_ — commands run and their result. Quote the gate command verbatim.
- _Left open_ — anything skipped, assumed, or needing a human.

## Demo path

A URL on `http://localhost:4321` and the seed data needed, so the Product Owner can review without reading code.

## Records produced

- Decision records in `docs/decisions/`: <links, or "none: no architecture, dependency, schema or interface choice">
- Contract revisions in `docs/contracts/`: <links, or "none: no cross-repo shape changed">
- Docs updated: <README, runbooks, `CLAUDE.md`, or "none needed">

## Done when

- [ ] `pnpm gate` is green on the final state and quoted above.
- [ ] Every slice in `3-refinement.md` has a row in the slice log with a passing check.
- [ ] Every record the slices forced exists and is linked above.
- [ ] Every commit ends with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
