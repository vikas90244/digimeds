import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  const path = req.nextUrl.pathname;

  const isAuthPage = path.startsWith("/login") || path.startsWith("/register") || path.startsWith("/verify");

  const isProtectedRoute = path.startsWith("/dashboard");
  const isLandingPage = path==="/";

  if ((isAuthPage ||isLandingPage) && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*", 
    "/login", 
    "/register", 
    "/verify"
  ],
};