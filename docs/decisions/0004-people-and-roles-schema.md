# 0004 — People & roles schema and local seed

Date: 2026-09-15
Status: accepted

## Context

Story 0001 needs Roles with Required Qualifications and Employees who hold Roles, on top of the existing `sites` and `employees` tables. Readiness will later be computed from exactly these rows plus Certificates, so the shape must be the one the readiness chain keys on. A demo also needs the 8 Sites and a few Roles present before anyone opens the app.

## Decision

Four tables are added in migration `drizzle/0001_unusual_maelstrom.sql`:

- `qualifications` (`id`, `name` unique) — the identifier every Certificate and Role refers to.
- `roles` (`id`, `name` unique) — Role names are unique company-wide; Roles are not Site-scoped.
- `role_required_qualifications` (`role_id`, `qualification_id`, composite primary key) — a Role's Required Qualifications.
- `employee_roles` (`employee_id`, `role_id`, composite primary key) — the Roles an Employee holds.

Identifiers are opaque text as elsewhere. Readiness is not stored anywhere.

A local seed script `scripts/seed.ts`, run as `pnpm db:seed`, inserts the 8 Sites and a starter set of Qualifications and Roles with stable ids (`site-1` … `site-8`, `qual-*`, `role-*`) and skips rows that already exist. Node 22 runs the TypeScript file directly, so no dependency is added. It seeds no Employees.

`.gitattributes` pins every text file to LF on checkout so the local `pnpm gate` matches CI on Linux; before this, Windows checkouts failed Prettier on every file.

## Alternatives rejected

- Required Qualifications as a JSON column on `roles` — cannot be joined or counted in SQL and hides the Qualification identifier the contract exposes.
- Roles scoped per Site — the story's answer to open question 2 is company-wide Roles; a Site-specific Role can be a differently named Role.
- Seeding through a migration — mixes reference data with schema history and would run against production databases.
- A dedicated TypeScript runner (tsx, ts-node) for the seed — a dependency for one script Node already runs.

## Consequences

The readiness chain can compute Readiness from `employee_roles` → `role_required_qualifications` → Certificates without a schema change. Renaming a Qualification or Role is a data edit, never an identifier change. Deleting a Qualification that a Role requires is blocked by the foreign key until the requirement is removed; a delete flow is a later story. The seed ids are the demo fixtures every later story can rely on.
