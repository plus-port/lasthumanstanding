# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Harness agreement — <team> · Northstar Logistics

This is the contract between the team and the agent. The few slots marked `TODO(project)` need a human answer; everything else is in force now. Keep the file to one screen per section: when a section grows, push detail into `docs/` and leave a one-line pointer here.

**Mission.** Northstar Logistics: 600 employees across 8 sites, a new contract in 6 weeks. Training lives in spreadsheets and certificates arrive by email, so managers cannot see who is ready for which work. The system answers one question: _is this employee ready for this work, and if not, what is missing?_ Three teams each build three connected features in separate repos. This harness is the reusable part; it travels with each repo.

**Domain language** is in `docs/domain.md`. Read it before touching any model, and use its terms verbatim in code, tests and commits.

**Features this repo owns:** all six — People & roles, Training catalogue, Learning assignments, Knowledge checks, Certificates & renewals, Manager overview. The seam between the learning chain and the readiness chain is kept explicit in `docs/contracts/` so any feature can move to another team's repo later without redesign.

### 1 Systems

What the system is, technically, in one screen.

**Shape.** One deployable: an Astro 7 application that renders every page on the server (`output: 'server'`) through the `@astrojs/node` standalone adapter. `pnpm build` emits `dist/server/entry.mjs`, a plain Node HTTP server, plus static assets in `dist/client/`. Requires Node 22.12 or newer. The dev server listens on `http://localhost:4321`. Astro sessions use filesystem storage by default with this adapter; that is where a login session will live.

**Request path.** Browser → page in `src/pages/` → Astro Action in `src/actions/` for any mutation → pure rules in `src/domain/` → Drizzle queries in `src/db/`. Domain code performs no I/O. Readiness is computed per request from Roles, Required Qualifications and Certificates on the date asked, and is never stored.

**Data.** libSQL through Drizzle ORM. Locally a single SQLite file at `data/northstar.db`, chosen by `DATABASE_URL` (default `file:./data/northstar.db`); when deployed, a libSQL or Turso URL with the same schema. The schema is TypeScript in `src/db/schema.ts`; drizzle-kit generates SQL migrations into `drizzle/` and applies them with `pnpm db:migrate`. Primary keys are opaque text identifiers, timestamps are integer epoch seconds. Tables today: `sites`, `employees`, `qualifications`, `roles`, `role_required_qualifications`, `employee_roles`. SQLite is single-writer; at 600 employees and 8 sites this is not a constraint, and a move to Postgres is a driver swap plus a decision record.

**Inputs.** Today's source of truth is spreadsheets and emailed certificate documents. They will enter through import adapters in `src/actions/` that translate rows and files into domain types. Nothing downstream of an adapter knows a spreadsheet existed.

**Tooling.** TypeScript 6 in strict mode checked by `astro check`, ESLint 10 with `eslint-plugin-astro`, Prettier 3 with the Astro plugin, Vitest 5 for unit tests. `pnpm gate` runs them in sequence. GitLab CI runs the identical command in a `node:22` image on every push and merge request. Deploy target: `TODO(project)`.

**Ownership.** Everything above is owned by this team and changeable within sections 4–5, with three exceptions:

- Schema changes ship with a generated migration and a decision record.
- Infrastructure and deploy configuration are proposed by the agent, applied by a human.
- Other teams' repos are sibling builds of the same challenge. Share this file and `docs/` freely; share code only through a contract in `docs/contracts/`, keyed by stable identifiers, never names.

### 2 Current pipeline

How a story travels from idea to shipped. Each step is a separate task with one owner, one input file and one output file in the story folder `docs/stories/NNNN-<slug>/`, so steps run at different times and by different people. To work one step, name the story and the step: the agent reads the step's input file, writes the step's file from its template, and stops; the owner ticks its _Done when_ list before the next step starts. The agent works in step 4 by default and drafts any other step when asked.

| Step             | Owner                                   | Starts when                 | Produces                                                                                                                                      | Done when                                                           |
| ---------------- | --------------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1 Story          | Product Owner                           | an idea is worth building   | `1-story.md`: user story, manager question and numbered acceptance criteria in the language of `docs/domain.md`                               | every acceptance criterion reads as a test                          |
| 2 Design         | Designer                                | `1-story.md` is ticked      | `2-design.md` notes and `2-design.html` mockup: a screen or "no UI" note per criterion, states, copy, as a plain HTML page in the folder      | every acceptance criterion has a screen or an explicit "no UI" note |
| 3 Refinement     | Product Owner with the Development team | `2-design.md` is ticked     | `3-refinement.md`: PO approval of the design, open questions answered, the story split into vertical slices                                   | each slice has a test or observable outcome attached                |
| 4 Implementation | Development team                        | `3-refinement.md` is ticked | `4-implementation.md` and a merge request naming the story folder, built one slice at a time: orient, thin end-to-end slice, run, widen, gate | the gate is green and every section 3 artifact exists               |
| 5 Review         | Product Owner                           | the merge request is green  | `5-review.md`: criteria walk, design check and verdict; open rows return the story to step 3                                                  | the PO has accepted the merge request                               |

The gate. `pnpm gate` runs every row below in order and is what CI runs; the scripts in `package.json` are the source of truth.

| Gate                | Command                                                                     | Use it when                      |
| ------------------- | --------------------------------------------------------------------------- | -------------------------------- |
| whole gate          | `pnpm gate`                                                                 | before every handoff             |
| type check          | `pnpm check`                                                                | after touching `.astro` or `.ts` |
| lint                | `pnpm lint`                                                                 | after any code change            |
| format              | `pnpm format` to fix, `pnpm format:check` to verify                         | before committing                |
| unit tests          | `pnpm test`                                                                 | after any domain change          |
| single test file    | `pnpm vitest run src/domain/certificate.test.ts`                            | iterating on one failure         |
| single test by name | `pnpm vitest run -t "never expires"`                                        | iterating on one case            |
| build               | `pnpm build`                                                                | last step of the gate            |
| migration           | `pnpm db:generate` after editing `src/db/schema.ts`, then `pnpm db:migrate` | every schema change              |

Pipeline runs on GitLab CI for every push and merge request. Review approvals required: `TODO(project)`.

### 3 Handoff artifacts

Every step ends in one file in the story folder, copied from `docs/stories/0000-template/`; the folder is the issue, and `docs/stories/README.md` holds the rules. A step is finished when its file exists and every box in its _Done when_ list is ticked by the step's owner. Nothing here is optional: a missing file is an **Ask** (section 5), never a guess.

| Step | File                  | Carries                                                                                                    |
| ---- | --------------------- | ---------------------------------------------------------------------------------------------------------- |
| 1    | `1-story.md`          | user story, manager question, numbered acceptance criteria tagged must-ship, out of scope                  |
| 2    | `2-design.md`         | screen per criterion, states, copy, components, open questions; the screens themselves are `2-design.html` |
| 3    | `3-refinement.md`     | design approval, answers, vertical slices with their checks, decisions expected                            |
| 4    | `4-implementation.md` | slice log, change summary, demo path, records produced, the gate command quoted                            |
| 5    | `5-review.md`         | criteria walk, design check, verdict                                                                       |

Step 4 also owes, outside the story folder:

- **Decision record** in `docs/decisions/` (copy `0000-template.md`) whenever the work chose between architectures, introduced a dependency, changed a schema, or altered a public interface. One file per decision, dated, with context, decision, consequences.
- **Contract revision** in `docs/contracts/` whenever a shape another team consumes changed, with the version bumped and an example payload.
- **Docs kept true** — any README, runbook, or this file that described the old behaviour now describes the new one.
- **Commit trailer** — every commit ends with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

### 4 Simplify

The architectural stance. These decide ties.

- **Boring wins.** Choose the solution a new team member could read cold. Cleverness needs a comment explaining why it was necessary.
- **Rule of three.** Duplicate twice; abstract on the third occurrence, once the shape is known.
- **Deep modules, narrow interfaces.** Put complexity behind a small surface. A module that exposes as much as it hides is a candidate for merging.
- **Delete over deprecate.** Dead code, unused flags, and stale config leave in the same change that makes them dead.
- **Configuration is code.** A new flag or environment variable is a public interface and gets a decision record.
- **Dependencies are decisions.** Adding one requires a decision record naming what it replaces and what it costs.
- **Prefer the vertical slice.** A thin end-to-end path beats a complete layer with nothing above it.
- **Readiness is computed.** Derive it from Roles, Qualifications and Certificates on the date asked. Storing it invites drift between repos.
- **Six weeks.** Choose what ships a working slice to a manager this week over what might scale next year.

### 5 Responsibility

Who decides what. When in doubt, the row below moves one tier up.

| Tier       | The agent…                                          | Examples                                                                                                                                                                      |
| ---------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Act**    | does it and reports it                              | code within owned systems, tests, refactors that keep behaviour, doc fixes, local tooling                                                                                     |
| **Decide** | does it, and writes a decision record for review    | new dependency, schema migration, public interface change, new config surface, removing a feature                                                                             |
| **Ask**    | stops and states the question with a recommendation | anything touching production data or infrastructure, deleting user-facing functionality, changes to another team's contract, changes outside this repo, cost-bearing services |
| **Never**  |                                                     | reads or writes customer data, places secrets in code, chat, or logs, force-pushes shared branches, disables a failing gate to get green                                      |

Review accountability: `TODO(project)` — name the reviewer per area of the tree if it differs.

### 6 Repo

Conventions the tree cannot state for itself. Layout is discoverable; read the tree rather than this section for structure.

- **Branches** — `TODO(project)` (default: `<type>/<ticket>-<short-slug>`).
- **Commits** — `TODO(project)` (default: conventional commits, imperative subject under 72 chars, body explains why).
- **PR size** — one concern per PR. Split rather than stack unrelated changes.
- **Stories** — `docs/stories/NNNN-<slug>/`, one file per pipeline step, template folder at `0000-template/`.
- **Decision records** — `docs/decisions/NNNN-<slug>.md`, template at `0000`.
- **Contracts** — `docs/contracts/<shape>.md`, one file per cross-repo shape.
- **Runbooks and design notes** — `docs/`.
- **Dev server** — start with `pnpm astro dev --background`; manage with `astro dev stop`, `astro dev status`, `astro dev logs`. Local URL is `http://localhost:4321`.
- **No-touch zones** — `dist/`, `.astro/`, `pnpm-lock.yaml` by hand, and any migration in `drizzle/` that has been applied anywhere. A schema fix is a new migration.
- **Local configuration** — `.env` stays untracked; `.env.example` documents every variable with a placeholder value. Today that is only `DATABASE_URL`.
- **Agent files** — `CLAUDE.md` is the single harness; `AGENTS.md` only points here.

Pointers to disclosed material, reached only when the task needs them:

- Domain glossary and feature map → `docs/domain.md`. Read before modelling anything.
- Story folder rules and step templates → `docs/stories/README.md`. Read before starting or continuing a story.
- Cross-repo shapes → `docs/contracts/`. Read before calling or exposing anything another team owns.
- Module shape and dependency direction → `docs/architecture.md`. Read before adding a folder or crossing one.
- Stack decision and its rejected alternatives → `docs/decisions/0001-astro-ssr-drizzle-libsql.md`.
