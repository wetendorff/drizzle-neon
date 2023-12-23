import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id")
    .default(sql`uuid_generate_v7()`)
    .primaryKey()
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
});
