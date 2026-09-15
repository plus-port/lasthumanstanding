// Drizzle queries for People & roles. Reads return plain objects in docs/domain.md terms;
// writes are called only from src/actions/.

import { and, asc, eq, inArray } from 'drizzle-orm';
import { db } from './client';
import {
  employeeRoles,
  employees,
  qualifications,
  roleRequiredQualifications,
  roles,
  sites,
} from './schema';
import type { Role } from '../domain/role';

export interface Site {
  id: string;
  name: string;
}

export interface Qualification {
  id: string;
  name: string;
}

export interface EmployeeRow {
  id: string;
  fullName: string;
  site: Site;
  roleNames: string[];
}

export interface EmployeeDetail {
  id: string;
  fullName: string;
  site: Site;
  roles: Role[];
}

export function listSites(): Promise<Site[]> {
  return db.select().from(sites).orderBy(asc(sites.name));
}

export function listQualifications(): Promise<Qualification[]> {
  return db.select().from(qualifications).orderBy(asc(qualifications.name));
}

/** Every Role with its Required Qualifications, by Role name. */
export async function listRoles(): Promise<Role[]> {
  const roleRows = await db.select().from(roles).orderBy(asc(roles.name));
  const requirements = await db.select().from(roleRequiredQualifications);
  return roleRows.map((role) => ({
    id: role.id,
    name: role.name,
    requiredQualificationIds: requirements
      .filter((r) => r.roleId === role.id)
      .map((r) => r.qualificationId),
  }));
}

export async function findRole(id: string): Promise<Role | null> {
  const all = await listRoles();
  return all.find((role) => role.id === id) ?? null;
}

/** Employees, optionally at one Site, with the names of the Roles they hold. */
export async function listEmployees(siteId?: string): Promise<EmployeeRow[]> {
  const rows = await db
    .select({
      id: employees.id,
      fullName: employees.fullName,
      siteId: sites.id,
      siteName: sites.name,
    })
    .from(employees)
    .innerJoin(sites, eq(employees.siteId, sites.id))
    .where(siteId ? eq(employees.siteId, siteId) : undefined)
    .orderBy(asc(employees.fullName));
  if (rows.length === 0) return [];

  const held = await db
    .select({ employeeId: employeeRoles.employeeId, roleName: roles.name })
    .from(employeeRoles)
    .innerJoin(roles, eq(employeeRoles.roleId, roles.id))
    .where(
      inArray(
        employeeRoles.employeeId,
        rows.map((r) => r.id),
      ),
    )
    .orderBy(asc(roles.name));

  return rows.map((row) => ({
    id: row.id,
    fullName: row.fullName,
    site: { id: row.siteId, name: row.siteName },
    roleNames: held.filter((h) => h.employeeId === row.id).map((h) => h.roleName),
  }));
}

export async function findEmployee(id: string): Promise<EmployeeDetail | null> {
  const [row] = await db
    .select({
      id: employees.id,
      fullName: employees.fullName,
      siteId: sites.id,
      siteName: sites.name,
    })
    .from(employees)
    .innerJoin(sites, eq(employees.siteId, sites.id))
    .where(eq(employees.id, id));
  if (!row) return null;

  const heldIds = (
    await db
      .select({ roleId: employeeRoles.roleId })
      .from(employeeRoles)
      .where(eq(employeeRoles.employeeId, id))
  ).map((h) => h.roleId);
  const allRoles = await listRoles();

  return {
    id: row.id,
    fullName: row.fullName,
    site: { id: row.siteId, name: row.siteName },
    roles: allRoles.filter((role) => heldIds.includes(role.id)),
  };
}

// ---- writes -------------------------------------------------------------------------------

export async function insertEmployee(input: { fullName: string; siteId: string }): Promise<string> {
  const id = crypto.randomUUID();
  await db.insert(employees).values({ id, ...input, createdAt: new Date() });
  return id;
}

export async function insertQualification(name: string): Promise<string> {
  const id = crypto.randomUUID();
  await db.insert(qualifications).values({ id, name });
  return id;
}

export async function insertRole(input: {
  name: string;
  requiredQualificationIds: string[];
}): Promise<string> {
  const id = crypto.randomUUID();
  await db.insert(roles).values({ id, name: input.name });
  if (input.requiredQualificationIds.length > 0) {
    await db
      .insert(roleRequiredQualifications)
      .values(
        input.requiredQualificationIds.map((qualificationId) => ({ roleId: id, qualificationId })),
      );
  }
  return id;
}

export async function giveRole(employeeId: string, roleId: string): Promise<void> {
  await db.insert(employeeRoles).values({ employeeId, roleId }).onConflictDoNothing();
}

export async function removeRole(employeeId: string, roleId: string): Promise<void> {
  await db
    .delete(employeeRoles)
    .where(and(eq(employeeRoles.employeeId, employeeId), eq(employeeRoles.roleId, roleId)));
}

export async function nameExists(
  table: typeof roles | typeof qualifications,
  name: string,
): Promise<boolean> {
  const [row] = await db.select({ id: table.id }).from(table).where(eq(table.name, name));
  return row !== undefined;
}
