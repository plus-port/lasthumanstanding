# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Harness agreement — <team> · <project>

This is the contract between the team and the agent. Slots marked `TODO(project)` are filled once the project lands; everything else is in force now. Keep the file to one screen per section: when a section grows, push detail into `docs/` and leave a one-line pointer here.

### 1 Systems

The map of what this repo touches and how far the agent may reach into each.

| System | Role | Ownership | Change policy |
|---|---|---|---|
| `TODO(project)` runtime + framework | the application itself | owned | change freely within sections 4–5 |
| `TODO(project)` primary data store | persistence | owned | schema changes go through a migration and a **decision** (section 5) |
| `TODO(project)` external services | consumed APIs, auth, messaging | consumed | contract-only: change our client, treat their behaviour as fixed |
| `TODO(project)` deploy target | where it runs | shared | infra changes are proposed, never applied, by the agent |

Rules that hold regardless of stack:

- **Owned** means the agent may change internals and interfaces, with tests proving the change.
- **Consumed** means the agent adapts to the contract as documented or observed. When the contract is unclear, the agent records the assumption in the handoff (section 3) rather than guessing silently.
- **Shared** means humans apply the change; the agent produces the diff or runbook.

### 2 Current pipeline

The loop the agent runs on every task. Each step ends on a checkable state.

1. **Orient** — read the task, the touched modules, and the nearest tests. Done when the agent can name the files that will change and the behaviour that proves the change.
2. **Plan** — for anything beyond a one-file fix, write the plan as a numbered list of vertical slices before editing. Done when each slice has a test or observable outcome attached.
3. **Build in tracer bullets** — implement one thin end-to-end slice, run it, then widen. Done when the slice passes its own check.
4. **Verify with the real gate** — run the same commands CI runs, locally, before declaring anything finished. Done when the gate is green or the failure is reported verbatim.
5. **Hand off** — produce the artifacts in section 3.

CI gate (`TODO(project)` — the exact commands live in the project's manifest; this table caches only what the manifest cannot say):

| Gate | Command | Must pass before |
|---|---|---|
| build | `TODO(project)` | every handoff |
| unit tests | `TODO(project)` | every handoff |
| single test | `TODO(project)` | iterating on one failure |
| lint + format | `TODO(project)` | every handoff |
| type check | `TODO(project)` | every handoff |

Where the pipeline runs: `TODO(project)` (GitHub Actions / Azure DevOps / other). Review approvals required: `TODO(project)`.

### 3 Handoff artifacts

Work is finished when every item below exists. Nothing here is optional.

- **Green working tree** — the gate in section 2 passed on the final state, and the agent quotes the command it ran.
- **Change summary** in this shape, in the PR description or final message:
  - *What changed* — files and behaviour, one line each.
  - *Why* — the task and the decision path, including alternatives rejected.
  - *How verified* — commands run and their result.
  - *Left open* — anything skipped, assumed, or needing a human, stated explicitly.
- **Decision record** in `docs/decisions/` whenever the work chose between architectures, introduced a dependency, changed a schema, or altered a public interface. One file per decision, dated, with context, decision, consequences.
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

### 5 Responsibility

Who decides what. When in doubt, the row below moves one tier up.

| Tier | The agent… | Examples |
|---|---|---|
| **Act** | does it and reports it | code within owned systems, tests, refactors that keep behaviour, doc fixes, local tooling |
| **Decide** | does it, and writes a decision record for review | new dependency, schema migration, public interface change, new config surface, removing a feature |
| **Ask** | stops and states the question with a recommendation | anything touching production data or infrastructure, deleting user-facing functionality, changes outside this repo, cost-bearing services |
| **Never** | | reads or writes customer data, places secrets in code, chat, or logs, force-pushes shared branches, disables a failing gate to get green |

Review accountability: `TODO(project)` — name the reviewer per area of the tree if it differs.

### 6 Repo

Conventions the tree cannot state for itself. Layout is discoverable; read the tree rather than this section for structure.

- **Branches** — `TODO(project)` (default: `<type>/<ticket>-<short-slug>`).
- **Commits** — `TODO(project)` (default: conventional commits, imperative subject under 72 chars, body explains why).
- **PR size** — one concern per PR. Split rather than stack unrelated changes.
- **Decision records** — `docs/decisions/NNNN-<slug>.md`.
- **Runbooks and design notes** — `docs/`.
- **No-touch zones** — `TODO(project)` (generated code, vendored dependencies, migration history already applied).
- **Local configuration** — `.env.local` and equivalents stay untracked; `.env.example` documents every variable with a placeholder value.

Pointers to disclosed material, reached only when the task needs them:

- Architecture overview → `docs/architecture.md` (`TODO(project)`).
- Domain glossary → `docs/domain.md` (`TODO(project)`).
