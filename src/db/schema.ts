import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Table names follow docs/domain.md. Add tables per feature; one migration per change.

export const sites = sqliteTable('sites', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
});

export const employees = sqliteTable('employees', {
  id: text('id').primaryKey(),
  siteId: text('site_id')
    .notNull()
    .references(() => sites.id),
  fullName: text('full_name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// People & roles — see docs/stories/0001-employees-roles-required-qualifications.

export const qualifications = sqliteTable('qualifications', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
});

export const roles = sqliteTable('roles', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
});

/** A Role lists its Required Qualifications. */
export const roleRequiredQualifications = sqliteTable(
  'role_required_qualifications',
  {
    roleId: text('role_id')
      .notNull()
      .references(() => roles.id),
    qualificationId: text('qualification_id')
      .notNull()
      .references(() => qualifications.id),
  },
  (t) => [primaryKey({ columns: [t.roleId, t.qualificationId] })],
);

/** An Employee holds one or more Roles. */
export const employeeRoles = sqliteTable(
  'employee_roles',
  {
    employeeId: text('employee_id')
      .notNull()
      .references(() => employees.id),
    roleId: text('role_id')
      .notNull()
      .references(() => roles.id),
  },
  (t) => [primaryKey({ columns: [t.employeeId, t.roleId] })],
);
