import { LuciaError } from "lucia";
import { auth } from "../utils/lucia";

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<{
    username: unknown;
    password: unknown;
  }>(event);

  if (
    typeof username !== "string" ||
    username.length < 1 ||
    username.length > 31
  ) {
    throw createError({
      message: "Invalid username",
      statusCode: 400,
    });
  }

  if (
    typeof password !== "string" ||
    password.length < 1 ||
    password.length > 255
  ) {
    throw createError({
      message: "Invalid password",
      statusCode: 400,
    });
  }

  try {
    const key = await auth.useKey("username", username.toLowerCase(), password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(event);
    authRequest.setSession(session);
    return sendRedirect(event, "/");
  } catch (error: unknown) {
    console.error(error);
    if (
      error instanceof LuciaError &&
      (error.message === "AUTH_INVALID_KEY_ID" ||
        error.message === "AUTH_INVALID_PASSWORD")
    ) {
      throw createError({
        message: "Invalid username or password",
        statusCode: 400,
      });
    }
    throw createError({
      message: "An unknown error occured",
      statusCode: 500,
    });
  }
});
