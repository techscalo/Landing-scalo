import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // Vercel must connect BOTH domains to this project (no domain-level redirect).
  // A service-worker update cannot follow the apex -> www redirect.
  if (request.nextUrl.hostname === "scalo.tech" && request.nextUrl.pathname !== "/sw.js") {
    const url = request.nextUrl.clone();
    url.hostname = "www.scalo.tech";
    url.protocol = "https:";
    url.port = "";
    const response = NextResponse.redirect(url, 307);
    response.headers.set("Cache-Control", "no-store");
    return response;
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image).*)"] };
