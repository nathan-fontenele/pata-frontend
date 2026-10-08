import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth0Client, isAuth0Configured } from "./lib/auth0";

export async function proxy(request: NextRequest) {
  if (!isAuth0Configured()) {
    if (request.nextUrl.pathname.startsWith("/auth/")) {
      return NextResponse.json(
        { message: "Configure o Auth0 no arquivo .env.local para autenticar." },
        { status: 503 },
      );
    }
    return NextResponse.next();
  }

  return getAuth0Client()!.middleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
