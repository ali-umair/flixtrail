import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

@Module({
  providers: [
    {
      provide: 'DRIZZLE_CLIENT',
      useFactory: async () => {
        const pool = new Pool({
          connectionString: process.env.DATABASE_URL, // Your PostgreSQL connection string
        });
        return drizzle(pool, { schema });
      },
    },
  ],
  exports: ['DRIZZLE_CLIENT'],
})
export class DrizzleModule {}