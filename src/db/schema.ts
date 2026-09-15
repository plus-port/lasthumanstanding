import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

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
