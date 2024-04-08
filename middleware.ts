import { NextFetchEvent, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  // event: NextFetchEvent
  // 로그인 했을 경우에만 토큰 존재
  const session = await getToken({ req, secret, raw: true });
  const { pathname } = req.nextUrl;
  // console.log("JSON Web Token===>", session);

  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (pathname.startsWith("/mypage")) {
    //pathname.startsWith("/goods"
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return await updateSession(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/login",
    "/signup",
  ],
};
