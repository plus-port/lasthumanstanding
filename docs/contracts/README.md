# Cross-repo contracts

Three teams build connected features in separate repos. This folder holds the shapes that cross a repo boundary. A contract changes by a decision record in the owning repo and a copy of the new version here.

Each contract file states: owner repo, consumers, the schema, and a versioned example payload.

Contracts expected for this project:

- `certificate.md` — issued by the learning chain, read by the readiness chain. The primary seam.
- `employee-role.md` — Employees, Sites, Roles and Required Qualifications, owned by People & roles.
- `qualification.md` — the identifier every Certificate and Role refers to.

Identity rule: every cross-repo reference uses a stable, opaque identifier owned by the defining repo. Names are display data and never keys.
