# 0003 — Design mockups are static HTML pages in the story folder

Date: 2026-09-15
Status: accepted

## Context

Step 2 of the pipeline produces the screens a story needs. The first draft of the templates linked an external design tool, left as a `TODO(project)` slot. Every other step artifact lives in the story folder and is readable by the whole team and by the agent without extra access, and the design should not be the exception.

## Decision

The design for a story is `2-design.html` in its story folder: one self-contained HTML page with plain CSS, no build step and no external files, copied from `docs/stories/0000-template/2-design.html`. It holds one section per screen and one block per state. `2-design.md` in the same folder carries the notes, the criterion-to-screen table and the Done when list, and refers to screens by their section id.

## Alternatives rejected

- Figma or another design tool linked from the notes — needs accounts and a tool choice, cannot be diffed or reviewed in the merge request, and the agent cannot read it.
- Astro pages under `src/pages/` as the mockup — mixes unshipped design with the application and drags the gate into design work.
- Images or PDFs exported into the folder — not editable in place, not diffable, and copy cannot be checked against the glossary by search.

## Consequences

Designs are versioned with the story, reviewed in the same merge request, and open in any browser straight from the checkout or the GitLab file view. Fidelity is what HTML and CSS give by hand, which fits a six-week schedule and server-rendered pages. The `TODO(project)` design tool slot is gone.
