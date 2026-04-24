import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

const PROTECTED = ["/booking"];
const ADMIN_PREFIX = "/admin";

type JwtPayload = {
  id?: string | number;
  role?: { id?: string | number } | null;
  exp?: number;
};

function readRoleId(token: string | undefined): number | null {
  if (!token) return null;
  try {
    const payload = jwtDecode<JwtPayload>(token);
    const id = payload.role?.id;
    if (id === undefined || id === null) return null;
    return Number(id);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("kangtent_token")?.value;

  if (pathname.startsWith(ADMIN_PREFIX)) {
    const roleId = readRoleId(token);
    if (roleId !== 1 && roleId !== 2) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  if (isProtected) {
    if (pathname === "/booking/confirmation") return NextResponse.next();
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/booking/:path*", "/admin/:path*"],
};
