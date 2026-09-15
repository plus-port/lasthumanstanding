# Stories

A story is the unit of work that travels through the pipeline in `CLAUDE.md` section 2. Each story is a folder, and each pipeline step writes one file in it. The folder is the issue: there is no tracker outside the repo.

```
docs/stories/
  0000-template/          copy this folder to start a story
  0001-<slug>/
    1-story.md            step 1 · Product Owner
    2-design.md           step 2 · Designer — notes and Done when list
    2-design.html         step 2 · Designer — the mockup: plain HTML, open in a browser
    3-refinement.md       step 3 · Product Owner with the Development team
    4-implementation.md   step 4 · Development team
    5-review.md           step 5 · Product Owner
```

## Rules

- **Numbering.** Four digits, next free number, then a short kebab-case slug: `0007-gap-follow-up-list`.
- **One file per step.** A step is finished when its file exists and every box in its _Done when_ list is ticked. Ticking is the owner's sign-off. Step 2 also owns `2-design.html`, the mockup its notes refer to; no design tool outside the repo.
- **Position is computed.** A story is at the first step whose file is missing or whose _Done when_ list has an open box. Nothing else records status.
- **Input is the previous file.** Each step reads the file before it, never the chat. If the input is missing or its list is open, the step does not start.
- **Domain language.** Use the terms in `docs/domain.md` verbatim. A new term goes into the glossary before it appears in a story file.
- **Sent back.** When review returns a story to step 3, the reviewer lists what is missing in `5-review.md`; steps 3 and 4 update their files in place and tick again.

## Working one step with the agent

Name the story and the step: _"Work step 2 for story 0007."_ The agent reads the step's input, drafts the step's file from the template, and stops. The step's owner ticks the list.
