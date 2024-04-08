import { NextFetchEvent, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { getSession } from "next-auth/react";
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

  const session = await getSession();
  console.log("-----------------");
  console.log(session);
  console.log("-----------------");

  // 로그인이 필요한 페이지 리스트
  const LOGIN_REQUIRED_PAGES = [
    `/mypage`,
    `/community`,
    `/individualAction`,
    `/goods`,
  ];
  const LOGIN_NOT_REQUIRED_PAGES = [`/login`, `/signup`];

  // 로그인이 필요한 페이지 리스트
  LOGIN_REQUIRED_PAGES.forEach((page) => {
    if (request.nextUrl.pathname === page) {
      if (!session) {
        return {
          status: 302,
          headers: {
            location: `/login`,
          },
        };
      }
    }
  });

  LOGIN_NOT_REQUIRED_PAGES.forEach((page) => {
    if (request.nextUrl.pathname === page) {
      if (session) {
        return {
          status: 302,
          headers: {
            location: `/`,
          },
        };
      }
    }
  });

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
