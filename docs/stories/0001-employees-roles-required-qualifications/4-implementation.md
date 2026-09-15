# Employees, Roles and Required Qualifications — implementation

Step: 4 · Implementation
Owner: Development team
Input: `3-refinement.md` with its Done when list ticked
Branch: `feat/0001-employees-roles-required-qualifications`
Merge request: https://github.com/plus-port/lasthumanstanding/pull/1

## Slice log

| Slice | Check run                                                                                                                                                                                                                             | Result | Commit    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | --------- |
| 1     | Built server: `GET /` 302 → `/employees`; empty state shown; `POST addEmployee` with blank name renders "Full name is required."; valid post 302 → `/employees?site=site-1` and the row appears; `?site=` filter narrows the list.    | pass   | `6a656bd` |
| 2     | `POST addQualification` adds "Crane licence"; duplicate name renders "already exists."; `POST addRole` with two checked Required Qualifications 302 → `/roles/<id>` listing exactly those two; a Role with none shows the empty note. | pass   | `6a656bd` |
| 3     | `pnpm vitest run src/domain/role.test.ts` 4 tests pass; `POST giveRole` twice shows both Roles and the union "Forklift licence, Safety briefing, First aid" once each; `POST removeRole` drops "First aid"; unknown ids return 404.   | pass   | `6a656bd` |

## Change summary

- _What changed_
  - `src/db/schema.ts` — tables `qualifications`, `roles`, `role_required_qualifications`, `employee_roles`; migration `drizzle/0001_unusual_maelstrom.sql`.
  - `src/domain/role.ts` (+ test) — `Role` type and the pure rule `requiredQualificationsFor`, the "what is needed" half of Readiness.
  - `src/db/people.ts` — Drizzle reads (Sites, Qualifications, Roles, Employees with Roles) and writes used by the Actions.
  - `src/actions/index.ts` — Actions `addEmployee`, `addQualification`, `addRole`, `giveRole`, `removeRole`; `src/actions/message.ts` turns an Action error into one sentence.
  - `src/components/Layout.astro`, `Notice.astro` — page shell with navigation; one inline message for empty, error and validation states.
  - `src/pages/employees/index.astro`, `employees/[id].astro`, `roles/index.astro`, `roles/[id].astro`, `qualifications/index.astro`; `/` redirects to `/employees`.
  - `scripts/seed.ts` and `pnpm db:seed` — the 8 Sites plus starter Qualifications and Roles, idempotent, no Employees.
  - `.gitattributes` — LF on checkout so the local gate matches CI (separate commit `b841987`).
- _Why_ — story 0001, slices 1–3 as refined. Plain HTML forms posting to Astro Actions were chosen over client-side islands: nothing here needs interaction beyond a submit, and server rendering keeps the gate small. Required Qualifications are a join table rather than a JSON column so the contract exposes Qualification ids and SQL can count them (decision 0004). No dependency was added; Node 22 runs the seed script directly.
- _How verified_ — `pnpm gate` exit code 0 on the final state (`astro check` 0 errors, ESLint clean, Prettier clean, 8 unit tests pass, build complete). Every slice check above was run with `curl` against the built server (`node dist/server/entry.mjs`) with an `Origin` header, since Astro rejects cross-origin form posts.
- _Left open_
  - Criterion 6 (remove a Role) is `nice-to-have` and shipped in slice 3.
  - Employee list role names are loaded with a second query per page rather than a join; fine at 600 Employees.
  - Deleting Qualifications and Roles, and editing names, are later stories.
  - Merging the pull request is the Product Owner's step 5 verdict.

## Demo path

1. `pnpm db:migrate && pnpm db:seed` (idempotent) then `pnpm astro dev --background`.
2. `http://localhost:4321/qualifications` — see the four seeded Qualifications; add one (criterion 5).
3. `http://localhost:4321/roles` — add a Role and tick two Required Qualifications; land on its detail page listing them (criterion 2).
4. `http://localhost:4321/employees` — add an Employee at a Site; it appears under that Site (criterion 1). Switch the Site filter to another Site; the row disappears (criterion 4).
5. Open the Employee; give "Forklift operator" then "Shift lead"; the table lists both Roles with their Required Qualifications and the line below shows each Qualification once (criterion 3). Remove one (criterion 6).

## Records produced

- Decision records in `docs/decisions/`: [0004-people-and-roles-schema.md](../../decisions/0004-people-and-roles-schema.md)
- Contract revisions in `docs/contracts/`: [employee-role.md](../../contracts/employee-role.md) v1, [qualification.md](../../contracts/qualification.md) v1
- Docs updated: `CLAUDE.md` (tables today), this file

## Done when

- [x] `pnpm gate` is green on the final state and quoted above.
- [x] Every slice in `3-refinement.md` has a row in the slice log with a passing check.
- [x] Every record the slices forced exists and is linked above.
- [x] Every commit ends with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
