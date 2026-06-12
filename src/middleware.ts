import { type NextRequest, NextResponse } from "next/server";

/**
 * Exposes the request pathname to Server Components via the `x-pathname` header,
 * so the root layout can drop the public site chrome (navbar/footer) on /admin.
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
