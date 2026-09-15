# Employees, Roles and Required Qualifications — review

Step: 5 · Review
Owner: Product Owner
Input: `4-implementation.md` with its Done when list ticked, and the merge request it names
Reviewed on: <YYYY-MM-DD> at commit `6a656bd`

Draft prepared by the agent from the slice checks in `4-implementation.md`. The Product Owner walks the demo path, edits the rows, and writes the verdict.

## Criteria walk

| Criterion | Met or open | Note                                                                                       |
| --------- | ----------- | ------------------------------------------------------------------------------------------ |
| 1         | met (agent) | Employee added at a Site appears in the list under that Site.                              |
| 2         | met (agent) | Role detail lists exactly the Required Qualifications ticked when adding it.               |
| 3         | met (agent) | Employee detail lists held Roles and the union of Required Qualifications, each once.      |
| 4         | met (agent) | `?site=` narrows the list; the Site select shows the active filter.                        |
| 5         | met (agent) | A new Qualification appears as a checkbox on the Add Role form.                            |
| 6         | met (agent) | Remove drops the Role and the Required Qualifications only it contributed. `nice-to-have`. |

## Design check

- Loading states from `2-design.md` are not rendered: pages are server-rendered in one pass, so there is no client-side loading moment. Proposed: accepted.
- The Site filter submits on change and offers a Filter button only without JavaScript. Proposed: accepted.
- The Employee list has no Readiness column, as the design notes. Proposed: accepted.

## Verdict

<Accepted, or: back to step 3 with the open rows above as the list of what is missing.>

## Done when

- [ ] Every `must-ship` criterion is marked met.
- [ ] Every deviation from the design is marked accepted or to-fix, and no to-fix remains.
- [ ] The verdict is written and the merge request is approved by the Product Owner.
