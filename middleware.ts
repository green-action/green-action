import { updateSession } from "@/utils/supabase/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  // event: NextFetchEvent
  // 로그인 했을 경우에만 토큰 존재
  const session = await getToken({ req, secret, raw: true });
  const { pathname } = req.nextUrl;

  // 로그인이 필요한 페이지 리스트
  const LOGIN_REQUIRED_PAGES = [`/mypage`, `/individualAction/add`];
  const LOGIN_NOT_REQUIRED_PAGES = [`/login`, `/signup`];

  // 로그인이 필요한 페이지 리스트
  if (LOGIN_REQUIRED_PAGES.includes(pathname) && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (LOGIN_NOT_REQUIRED_PAGES.includes(pathname) && session) {
    return NextResponse.redirect(new URL("/", req.url));
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
