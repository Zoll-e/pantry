import { SQL } from 'bun';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/singlestore/driver';

const client = new SQL(process.env.DATABASE_URL!);

export const db = drizzle(client, { schema });
