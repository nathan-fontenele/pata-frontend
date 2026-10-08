import { Auth0Client } from "@auth0/nextjs-auth0/server";

export function isAuth0Configured() {
  return Boolean(
    process.env.AUTH0_DOMAIN &&
      process.env.AUTH0_CLIENT_ID &&
      process.env.AUTH0_SECRET &&
      process.env.AUTH0_CLIENT_SECRET,
  );
}

let auth0Client: Auth0Client | undefined;

export function getAuth0Audience() {
  return process.env.AUTH0_AUDIENCE || process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;
}

export function getAuth0Client() {
  if (!isAuth0Configured()) return null;

  auth0Client ??= new Auth0Client({
    routes: {
      callback: "/callback",
    },
    authorizationParameters: {
      scope: "openid profile email",
      ...(getAuth0Audience()
        ? { audience: getAuth0Audience() }
        : {}),
    },
  });

  return auth0Client;
}
