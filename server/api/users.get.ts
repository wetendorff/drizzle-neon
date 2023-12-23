import { users } from "~/drizzle/schema";
import db from "../db";

export default defineEventHandler(async (event) => {
  return db.select().from(users);
});
