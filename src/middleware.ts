import { NextRequest, NextResponse } from "next/server";
import { getUserRole } from "@/lib/middleware";
import { UserRole } from "@/types/user-role.enum";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const userRole = await getUserRole(accessToken);

  if (userRole === null)
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    userRole !== UserRole.ADMIN
  ) {
    return NextResponse.error();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/games/:path*"],
};
