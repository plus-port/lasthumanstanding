# Architecture

Astro 7, server-rendered, one deployable. Six features, one team, one repo.

## Shape

```
src/
  domain/       pure rules and types in the language of docs/domain.md — no I/O, fully unit tested
  db/           Drizzle schema and client; migrations generated into drizzle/
  actions/      Astro Actions: form and mutation entry points, thin, call domain + db
  pages/        routes; render, no business rules
  components/   Astro components; islands only where interaction demands it
```

Dependency direction: `pages` → `actions` → `domain` + `db`. `domain` imports nothing from the other folders.

## Why this shape

- **Readiness is computed.** It lives in `domain/` as a pure function over Roles, Qualifications and Certificates, so it is testable without a database and identical wherever it is called.
- **One boundary for legacy input.** Spreadsheet and email-certificate imports land in `actions/import*` and are translated to domain types there. Nothing downstream knows a spreadsheet existed.
- **Feature seam stays visible.** The Certificate shape in `docs/contracts/` is the internal boundary between the learning chain and the readiness chain. If a feature later moves to another team's repo, that contract is what travels.

## Runtime

- Node standalone adapter; `pnpm build` produces `dist/server/entry.mjs`.
- libSQL (SQLite file locally, Turso-compatible URL when deployed) through Drizzle. 600 employees and 8 sites fit comfortably; a Postgres move is a driver swap and a decision record.
