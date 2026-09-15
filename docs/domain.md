# Northstar Logistics — domain model

The ubiquitous language for every repo in this challenge. Use these words in code, tests, commits and docs. When a term is missing or wrong, change it here first, then in code.

## The question the system answers

**Is this employee ready for this work, and if not, what is missing?**

Everything below exists to make that answer visible to a manager without a spreadsheet.

## Terms

| Term                    | Meaning                                                                                                                                                                                                       | Owning feature                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Site**                | One of the 8 physical locations. Every Employee belongs to exactly one Site.                                                                                                                                  | People & roles                                              |
| **Employee**            | A person employed by Northstar. Holds one or more Roles.                                                                                                                                                      | People & roles                                              |
| **Role**                | A job function such as forklift operator or shift lead. A Role lists its **Required Qualifications**.                                                                                                         | People & roles                                              |
| **Qualification**       | A competency that must be proven, such as a forklift licence or a safety briefing. Proven by a valid Certificate.                                                                                             | People & roles (defined), Certificates (proven)             |
| **Course**              | An item in the training catalogue. Completing a Course grants one or more Qualifications.                                                                                                                     | Training catalogue                                          |
| **Course Version**      | The concrete content of a Course at a point in time. Completion is always recorded against a Version.                                                                                                         | Training catalogue                                          |
| **Learning Assignment** | A Course assigned to an Employee with a deadline. Tracks progress: not started, in progress, completed, overdue.                                                                                              | Learning assignments                                        |
| **Knowledge Check**     | A quiz attached to a Course Version with a passing score and retry rules. Passing produces evidence for a Certificate.                                                                                        | Knowledge checks                                            |
| **Certificate**         | Evidence that an Employee holds a Qualification. Has issue date, optional expiry date and an evidence attachment. Origin is either a passed Knowledge Check or an external document, today arriving by email. | Certificates & renewals                                     |
| **Renewal**             | A Certificate within its renewal window or past expiry. Triggers a new Learning Assignment or an external re-certification.                                                                                   | Certificates & renewals                                     |
| **Readiness**           | An Employee is **ready** for a Role when every Required Qualification is covered by a valid Certificate. Otherwise they have a **Gap**.                                                                       | Manager overview (computed), Certificates (source of truth) |
| **Gap**                 | A Required Qualification with no Certificate, or only an expired one. Every Gap has a **follow-up**: an Assignment, a Renewal or a manual action.                                                             | Manager overview                                            |

## Invariants

- A Certificate is **valid** on a date when issued on or before that date and either has no expiry or expires after it.
- Readiness is computed, never stored. It is derived from Roles, Required Qualifications and Certificates on the date asked.
- A Course Version is immutable once any Employee has an Assignment against it. New content means a new Version.
- Passing a Knowledge Check issues a Certificate; it never edits Readiness directly.

## Feature map

Six features, two natural chains:

- **Readiness chain** — People & roles → Certificates & renewals → Manager overview. Answers the stated pain directly.
- **Learning chain** — Training catalogue → Learning assignments → Knowledge checks. Produces the Certificates the readiness chain consumes.

The seam between the chains is the **Certificate**: the learning chain issues them, the readiness chain reads them. Whichever chain a team builds, the Certificate shape in `docs/contracts/` is the shared contract.
