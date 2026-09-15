# Employees, Roles and Required Qualifications

Step: 1 · Story
Owner: Product Owner
Input: an idea worth building
Feature: People & roles

## User story

As a Site manager, I want every Employee at my Site recorded with the Roles they hold, and every Role to list its Required Qualifications, so that the system knows what each Employee must prove before it can tell me whether they are ready.

## Manager question

After this ships a manager can answer: _which Roles does this Employee hold, and which Qualifications does each Role require?_ That is the "what is needed" half of _is this employee ready for this work, and if not, what is missing?_ Certificates & renewals adds the "what is proven" half and Manager overview computes the Readiness and Gaps from the two.

## Acceptance criteria

1. `must-ship` — Given the 8 Sites exist, when HR adds an Employee with a full name and a Site, then the Employee appears in the Employee list under that Site.
2. `must-ship` — Given Qualifications exist, when HR adds a Role with a name and picks its Required Qualifications, then the Role detail lists exactly those Required Qualifications.
3. `must-ship` — Given an Employee and a Role exist, when a Site manager gives the Role to the Employee, then the Employee detail lists the Role and the union of Required Qualifications across all Roles the Employee holds, each Qualification once.
4. `must-ship` — Given Employees at several Sites, when a Site manager filters the Employee list by Site, then only Employees of that Site are shown and the filter is visible.
5. `must-ship` — Given no Qualifications exist, when HR adds a Qualification with a name, then it can be picked as a Required Qualification when adding a Role.
6. `nice-to-have` — Given an Employee holds a Role, when a Site manager removes that Role, then the Employee detail no longer lists it or the Required Qualifications only it contributed.

## Out of scope

- Certificates, Readiness and Gaps: computed later by Manager overview from Certificates & renewals.
- Editing or deleting Sites; the 8 Sites are seeded.
- Spreadsheet import of Employees; the import adapter is its own story.
- Login and permissions; every visitor acts as HR and Site manager for now.

## Done when

- [x] Every acceptance criterion reads as a test: a given, an action and an observable result.
- [x] Every domain term used here exists in `docs/domain.md`.
- [x] The manager question names the Readiness, Gap, Certificate or Assignment it makes visible.
