# 0002 — Stories live as markdown folders in the repo

Date: 2026-09-15
Status: accepted

## Context

The pipeline in `CLAUDE.md` section 2 has five steps owned by three roles, and each step must be workable on its own, by a person or by the agent, at a different time. That needs a place where every step's input and output persists and is readable by all of them. GitLab issues would need API access for the agent and would split the story from the code that implements it.

## Decision

Every story is a folder `docs/stories/NNNN-<slug>/` with one markdown file per pipeline step, copied from `docs/stories/0000-template/`. The folder is the issue. A step is done when its file's _Done when_ list is ticked; a story's position in the pipeline is computed from those lists, never stored elsewhere. GitLab is used for code review and CI only.

## Alternatives rejected

- GitLab issues with issue templates — the agent cannot read them without an API token, and the story would live apart from the merge request that ships it.
- One brief per story holding every step — one owner's edits overwrite another's, and a step cannot be handed over as a single file.
- A status field in the story file — duplicates what the checklists already say and drifts.

## Consequences

Stories are versioned, reviewed in merge requests and readable by the agent with no extra access. Non-developers need to edit markdown in the repo, through the GitLab web editor or an editor of their choice. Search and filtering across stories is by file, not by a tracker; if that hurts at more than a few dozen stories, revisit with a generated index.
