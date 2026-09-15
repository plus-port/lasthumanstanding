# Contract: employee-role

Version: 1
Owner repo: this repo (People & roles)
Consumers: Certificates & renewals, Manager overview (readiness chain); Learning assignments (to know whom to assign)

## Shape

An Employee, the Site they belong to, and the Roles they hold. Each Role carries the identifiers of its Required Qualifications; see `qualification.md` for that identifier.

```ts
interface Site {
  id: string; // opaque, stable
  name: string; // display only
}

interface Role {
  id: string; // opaque, stable
  name: string; // display only, unique company-wide
  requiredQualificationIds: string[]; // Qualification ids, see qualification.md
}

interface Employee {
  id: string; // opaque, stable
  fullName: string; // display only
  site: Site;
  roles: Role[];
}
```

The union of `requiredQualificationIds` across an Employee's Roles, each once, is what Readiness checks against valid Certificates. It is computed by `requiredQualificationsFor` in `src/domain/role.ts` and never stored.

## Example payload

```json
{
  "id": "a3f0eb60-7c29-445e-af38-c131558aaed8",
  "fullName": "Example Employee",
  "site": { "id": "site-3", "name": "Kaunas Hub" },
  "roles": [
    {
      "id": "role-forklift-operator",
      "name": "Forklift operator",
      "requiredQualificationIds": ["qual-forklift-licence", "qual-safety-briefing"]
    },
    {
      "id": "role-shift-lead",
      "name": "Shift lead",
      "requiredQualificationIds": ["qual-safety-briefing", "qual-first-aid"]
    }
  ]
}
```

## Rules

- Consumers key on `id` fields only. Names may change without notice.
- An Employee may hold zero Roles. A Role may require zero Qualifications.
- A Role's `requiredQualificationIds` has no duplicates and no order guarantee.

## History

- v1 (2026-09-15) — first version, story 0001.
