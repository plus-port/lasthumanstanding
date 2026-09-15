// Local seed: the 8 Sites plus a starter set of Qualifications and Roles.
// Run with `pnpm db:seed` after `pnpm db:migrate`. Idempotent: existing rows are left alone.
// Node 22 runs this TypeScript file directly; no build step and no extra dependency.

import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { qualifications, roleRequiredQualifications, roles, sites } from '../src/db/schema.ts';

const db = drizzle(createClient({ url: process.env.DATABASE_URL ?? 'file:./data/northstar.db' }));

const siteRows = [
  'Vilnius North',
  'Vilnius South',
  'Kaunas Hub',
  'Klaipėda Port',
  'Šiauliai',
  'Panevėžys',
  'Alytus',
  'Marijampolė',
].map((name, i) => ({ id: `site-${i + 1}`, name }));

const qualificationRows = [
  { id: 'qual-forklift-licence', name: 'Forklift licence' },
  { id: 'qual-safety-briefing', name: 'Safety briefing' },
  { id: 'qual-first-aid', name: 'First aid' },
  { id: 'qual-dangerous-goods', name: 'Dangerous goods handling' },
];

const roleRows = [
  { id: 'role-forklift-operator', name: 'Forklift operator' },
  { id: 'role-shift-lead', name: 'Shift lead' },
  { id: 'role-warehouse-picker', name: 'Warehouse picker' },
];

const requirementRows = [
  { roleId: 'role-forklift-operator', qualificationId: 'qual-forklift-licence' },
  { roleId: 'role-forklift-operator', qualificationId: 'qual-safety-briefing' },
  { roleId: 'role-shift-lead', qualificationId: 'qual-safety-briefing' },
  { roleId: 'role-shift-lead', qualificationId: 'qual-first-aid' },
  { roleId: 'role-warehouse-picker', qualificationId: 'qual-safety-briefing' },
];

await db.insert(sites).values(siteRows).onConflictDoNothing();
await db.insert(qualifications).values(qualificationRows).onConflictDoNothing();
await db.insert(roles).values(roleRows).onConflictDoNothing();
await db.insert(roleRequiredQualifications).values(requirementRows).onConflictDoNothing();

console.log(
  `Seeded ${siteRows.length} Sites, ${qualificationRows.length} Qualifications, ${roleRows.length} Roles.`,
);
