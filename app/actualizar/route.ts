import { NextRequest, NextResponse } from "next/server";

// Recovery URL for visitors with old HTML or a cached error page.
// No cookies, localStorage or sessionStorage are cleared.
export function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("pagina") === "landing" ? "/b" : "/a-leadmagnet";
  const destination = new URL(path, request.url);
  destination.searchParams.set("actualizado", Date.now().toString(36));
  const response = NextResponse.redirect(destination, 307);
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  response.headers.set("Clear-Site-Data", '"cache"');
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
