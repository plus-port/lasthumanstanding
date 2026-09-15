# Employees, Roles and Required Qualifications — refinement

Step: 3 · Refinement
Owner: Product Owner with the Development team
Input: `1-story.md` and `2-design.md`, both with their Done when lists ticked

## Design approval

Approved by the Product Owner on 2026-09-15 (workshop run: the Product Owner delegated steps 1–3 to the agent and asked for the feature to ship; feature detail is not the point of the exercise).

## Answers to open questions

1. An Employee with zero Roles is allowed. Roles are given after hiring.
2. Role names are unique across the company. Roles are not Site-scoped.
3. A Qualification nobody requires is allowed. Certificates can still be recorded against it later.

## Vertical slices

| Slice | Covers criteria | Test or observable outcome                                                                                                                                            | Notes                                                                                                                        |
| ----- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1     | 1, 4            | `/employees` lists seeded Employees; `?site=<id>` narrows the list; posting the Add Employee form adds a row under the chosen Site.                                   | Seed the 8 Sites with `pnpm db:seed`. Layout and Notice components appear here.                                              |
| 2     | 5, 2            | `/qualifications` adds a Qualification; `/roles` adds a Role with checked Required Qualifications; `/roles/<id>` lists exactly those.                                 | Schema: `qualifications`, `roles`, `role_required_qualifications`. One migration.                                            |
| 3     | 3, 6            | `/employees/<id>` gives a Role, lists it with its Required Qualifications, and shows the deduplicated union. Remove drops the Role. Unit test on the pure union rule. | Schema: `employee_roles`. Pure rule `requiredQualificationsFor(roles)` in `src/domain/role.ts`, consumed later by Readiness. |

Slices 2 and 3 share one migration, generated once after all schema edits, so `drizzle/` receives a single new file.

## Decisions expected

- Schema migration adding `qualifications`, `roles`, `role_required_qualifications`, `employee_roles` → `docs/decisions/0004-people-and-roles-schema.md`.
- Local seed script `pnpm db:seed` for the 8 Sites and a starter set of Qualifications and Roles → covered by the same record (new script surface, no new dependency: Node 22 runs the TypeScript file directly).
- Contract `docs/contracts/employee-role.md` and `docs/contracts/qualification.md`, version 1, since People & roles owns the shapes other chains key on.

## Done when

- [x] The Product Owner has approved the design above.
- [x] Every open question from `2-design.md` has an answer.
- [x] Every slice has a test or observable outcome, and every `must-ship` criterion is covered by some slice.
