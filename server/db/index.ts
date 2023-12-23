import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "~/drizzle/schema";

const config = useRuntimeConfig();
if (!config.connectionString) {
  throw new Error("Missing connection string");
}

const connection = postgres(config.connectionString);
const db = drizzle(connection, { schema });

export default db;
