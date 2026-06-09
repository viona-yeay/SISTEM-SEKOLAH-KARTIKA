import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const isDashboardUser = nextUrl.pathname.startsWith("/dashboard/user");
  const isDashboardAdmin = nextUrl.pathname.startsWith("/dashboard/admin");

  if (isDashboardUser || isDashboardAdmin) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }

    const role = req.auth?.user?.role;
    if (isDashboardAdmin && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/user", nextUrl));
    }

    if (isDashboardUser && role === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
