import { SQL } from 'bun';
import * as schema from './schema.js';
import { drizzle } from 'drizzle-orm/bun-sql';
import { config } from 'dotenv';

config({ path: '../../.env' });

const client = new SQL(process.env.DATABASE_URL!);

export const db = drizzle({ client, schema });
