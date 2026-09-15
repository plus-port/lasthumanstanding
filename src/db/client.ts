import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const url = import.meta.env.DATABASE_URL ?? 'file:./data/northstar.db';

export const db = drizzle(createClient({ url }), { schema });
