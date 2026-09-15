# Employees, Roles and Required Qualifications — design

Step: 2 · Design
Owner: Designer
Input: `1-story.md` with its Done when list ticked
Design: `2-design.html` in this folder, a plain HTML page opened in a browser

## Screens per criterion

| Criterion | Screen id or "no UI"              | Route in `src/pages/`                   |
| --------- | --------------------------------- | --------------------------------------- |
| 1         | `screen-employees`                | `employees/index.astro`                 |
| 2         | `screen-roles`, `screen-role`     | `roles/index.astro`, `roles/[id].astro` |
| 3         | `screen-employee`                 | `employees/[id].astro`                  |
| 4         | `screen-employees` (Site filter)  | `employees/index.astro?site=<id>`       |
| 5         | `screen-qualifications`           | `qualifications/index.astro`            |
| 6         | `screen-employee` (Remove button) | `employees/[id].astro`                  |

Every screen shares a header with links to Employees, Roles and Qualifications. The home page `/` redirects to `/employees`.

## States

- **Employees** — default table; empty ("No Employees at this Site yet"); loading ("Loading Employees…"); error ("Employees could not be loaded"). Add form validation error shown above the form. No Readiness column: Readiness is out of scope for this story and would be a lie until Certificates ship.
- **Employee** — default with Roles held and Required Qualifications; empty Roles ("No Roles yet. Give a Role below."); not found ("Employee not found"); error.
- **Roles** — default table; empty; loading; error; add form with Required Qualification checkboxes.
- **Role** — default with Required Qualifications; empty ("No Required Qualifications; every Employee is ready for this Role by default"); not found; error.
- **Qualifications** — default table; empty; loading; error; add form.

## Copy

All labels are `docs/domain.md` terms: Site, Employee, Role, Required Qualification, Qualification. No new terms needed. Button labels: "Add Employee", "Add Role", "Add Qualification", "Give Role", "Remove".

## Components

New in `src/components/`:

- `Layout.astro` — page shell with the header navigation. States: none.
- `Notice.astro` — one inline message for empty, error and validation states. Props: `kind` (`empty` | `error`), text as slot.

Tables and forms are plain HTML in the pages; abstract on the third occurrence (rule of three).

## Open questions for the Product Owner

1. Should an Employee be allowed with zero Roles? Recommendation: yes, Roles are given after hiring.
2. Should Role names be unique? Recommendation: yes per whole company, Roles are not Site-scoped.
3. Is a Qualification with no Role that requires it allowed? Recommendation: yes, Certificates can still be recorded against it.

## Done when

- [x] Every acceptance criterion has a screen or an explicit "no UI" note.
- [x] Every screen id in the table exists as a section in `2-design.html`, and the page opens in a browser with no external files.
- [x] Every screen shows its empty, loading and error states; Readiness screens show ready and Gap.
- [x] Every label is a glossary term or is listed under Copy for the glossary.
