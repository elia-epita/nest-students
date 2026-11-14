import { StudentRefactor1794644897262 } from 'src/migrations/1794644897262-StudentRefactor';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5444,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [],
  migrations: [StudentRefactor1794644897262],
});

/** RUNNING MIGRATIONS */

// to create a migration
// npx typeorm migration:create src/migrations/StudentRefactor

/**
 * You must BUILD your Nest project (so that everything is output to the dist/ folder)
 * before a migration can run, it needs compiled files
 */

// Compile project first
// npm run build

// Run migrations
// npx typeorm migration:run -d dist/typeorm-cli.config

// Revert migration
// npx typeorm migration:revert -d dist/typeorm-cli.config

// Let TypeORM generate migrations for you (you need to add your entities to the list above first)
// npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config
