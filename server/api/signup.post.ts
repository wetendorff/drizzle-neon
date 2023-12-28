import { auth } from "../utils/lucia";

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<{
    username: unknown;
    password: unknown;
  }>(event);

  if (
    typeof username !== "string" ||
    username.length < 4 ||
    username.length > 31
  ) {
    throw createError({
      message: "Invalid username",
      statusCode: 400,
    });
  }

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    throw createError({
      message: "Invalid password",
      statusCode: 400,
    });
  }

  try {
    const user = await auth.createUser({
      key: {
        providerId: "username",
        providerUserId: username.toLocaleLowerCase(),
        password,
      },
      attributes: {
        username,
      },
    });

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest(event);
    authRequest.setSession(session);

    return sendRedirect(event, "/");
  } catch (error) {
    console.error(error);
    throw createError({
      message: "An unknown error occured",
      statusCode: 500,
    });
  }
});
