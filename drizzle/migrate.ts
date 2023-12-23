import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
// import * as schema from "~/drizzle/schema";

const connection = postgres(process.env.NUXT_DATABASE_URL!, {
  max: 1,
  ssl: "require",
});
const db = drizzle(connection);

await migrate(db, { migrationsFolder: "drizzle" });
await connection.end();
