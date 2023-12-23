import { users } from "~/drizzle/schema";
import db from "../db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.dir(body);

  return db.insert(users).values({ name: body.name });
});
