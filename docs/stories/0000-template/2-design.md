# <Story title> — design

Step: 2 · Design
Owner: Designer
Input: `1-story.md` with its Done when list ticked
Design: `2-design.html` in this folder, a plain HTML page opened in a browser

## Screens per criterion

One row per acceptance criterion in `1-story.md`. Each screen is a `<section class="screen">` in `2-design.html` with the id given here. A criterion with no user interface gets an explicit note, never a blank.

| Criterion | Screen id or "no UI" | Route in `src/pages/` |
| --------- | -------------------- | --------------------- |
| 1         | `screen-1`           |                       |
| 2         |                      |                       |

## States

For every screen: empty, loading, error, and where Readiness is shown, the ready state and the Gap state with its follow-up.

## Copy

Labels use `docs/domain.md` terms verbatim. List any wording that needed a new or changed term, so the Product Owner can update the glossary first.

## Components

Which `src/components/` are reused, which are new, and the states each new one needs.

## Open questions for the Product Owner

Anything the story left unclear. Answered in `3-refinement.md`.

## Done when

- [ ] Every acceptance criterion has a screen or an explicit "no UI" note.
- [ ] Every screen id in the table exists as a section in `2-design.html`, and the page opens in a browser with no external files.
- [ ] Every screen shows its empty, loading and error states; Readiness screens show ready and Gap.
- [ ] Every label is a glossary term or is listed under Copy for the glossary.
