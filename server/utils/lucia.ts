import { lucia } from "lucia";
import { pg } from "@lucia-auth/adapter-postgresql";
import postgres from "pg";
import { h3 } from "lucia/middleware";

const pool = new postgres.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = lucia({
  env: process.dev ? "DEV" : "PROD",
  middleware: h3(),
  adapter: pg(pool, {
    user: "auth_user",
    key: "user_key",
    session: "user_session",
  }),

  getUserAttributes: (data) => {
    return {
      username: data.username,
    };
  },
});

export type Auth = typeof auth;
