import { NextRequest, NextResponse } from "next/server";

const PROTECTED = ["/booking"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));

  if (isProtected) {
    // Token lives in localStorage (client-side only) so we check a cookie fallback.
    // The client also handles redirect via useAuth — this is a belt-and-suspenders guard
    // for direct navigation. We skip /booking/confirmation since it's a terminal page.
    if (pathname === "/booking/confirmation") return NextResponse.next();

    const token = request.cookies.get("kangtent_token")?.value;
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
  matcher: ["/booking/:path*"],
};
