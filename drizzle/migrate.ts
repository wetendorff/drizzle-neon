import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from "~/drizzle/schema";

const connection = postgres(process.env.NUXT_CONNECTION_STRING!, { max: 1 });
const db = drizzle(connection, { schema });

await migrate(db, { migrationsFolder: "drizzle" });
await connection.end();
