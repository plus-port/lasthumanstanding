# <Story title> — review

Step: 5 · Review
Owner: Product Owner
Input: `4-implementation.md` with its Done when list ticked, and the merge request it names
Reviewed on: <YYYY-MM-DD> at commit <sha>

## Criteria walk

Walk the demo path against every acceptance criterion in `1-story.md`.

| Criterion | Met or open | Note |
| --------- | ----------- | ---- |
| 1         |             |      |
| 2         |             |      |

## Findings

Deviations from `2-design.md` and any other issue found during review. If this story touches a sensitive surface (auth, secrets, input parsing, or an import adapter for spreadsheets or certificates), include a security row even when nothing is wrong.

| Location (file:line or screen) | Finding | Expected | Violates | Status |
| ------------------------------- | ------- | -------- | -------- | ------------------ |
|                                  |         |          |          | accepted / to-fix  |

## Verdict

Accepted, or: back to step 3 with the open rows above as the list of what is missing.

## Done when

- [ ] Every `must-ship` criterion is marked met.
- [ ] Every finding is marked accepted or to-fix, and no to-fix remains.
- [ ] If this story touches a sensitive surface, a security row is present in Findings.
- [ ] The verdict is written and the merge request is approved by the Product Owner.
