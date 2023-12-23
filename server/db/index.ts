import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "~/drizzle/schema";

const config = useRuntimeConfig();
if (!config.databaseUrl) {
  throw new Error("Missing connection string");
}

const connection = postgres(config.databaseUrl);
const db = drizzle(connection, { schema });

export default db;
