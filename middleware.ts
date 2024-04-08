import { updateSession } from "@/utils/supabase/middleware";
import { getSession } from "next-auth/react";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
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

  return await updateSession(request);
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
  ],
};
