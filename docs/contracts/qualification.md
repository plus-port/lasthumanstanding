# Contract: qualification

Version: 1
Owner repo: this repo (People & roles)
Consumers: every feature. Roles list Required Qualifications by this id; Certificates prove a Qualification by this id; Courses grant Qualifications by this id.

## Shape

```ts
interface Qualification {
  id: string; // opaque, stable; the only field other repos may key on
  name: string; // display only, unique company-wide
}
```

## Example payload

```json
{ "id": "qual-forklift-licence", "name": "Forklift licence" }
```

## Rules

- A Qualification is never deleted while any Role requires it or any Certificate proves it.
- A Qualification that no Role requires is allowed; Certificates may still be recorded against it.
- Renaming keeps the id.

## History

- v1 (2026-09-15) — first version, story 0001.
