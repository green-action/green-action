import { supabase } from "@/utils/supabase/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "id-password-credential",
      name: "Credentials",
      type: "credentials",
      credentials: {
        id: {
          label: "아이디",
          type: "text",
          placeholder: "아이디를 입력해주세요.",
        },
        password: {
          label: "비밀번호",
          type: "password",
          placeholder: "비밀번호를 입력해주세요.",
        },
      },

      async authorize(credentials, req) {
        if (!credentials || !credentials.id || !credentials.password) {
          throw new Error("유효하지 않은 자격 증명입니다.");
        }
        try {
          const response = await supabase.auth.signInWithPassword({
            email: credentials.id,
            password: credentials.password,
          });

          // console.log("로그인 토큰:", response.data.session);
          if (response) {
            return response.data.user;
          }

          return null;
        } catch (error) {
          console.error("Supabase sign in error:", error);
          return null;
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.NEXT_KAKAO_CLIENT_ID!,
      clientSecret: process.env.NEXT_KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.user_uid = token.sub || "";

      const isSocialLogin = token.name ? true : false;

      // 최초 소셜 로그인 시 데이터베이스에서 사용자 정보 가져오기
      if (isSocialLogin) {
        const { data: existingUser, error: existingUserError } = await supabase
          .from("users")
          .select("id")
          .eq("email", session.user.email);

        // 사용자 정보가 없는 경우에만 업데이트 (빈배열일때)
        if (!existingUser || existingUser.length === 0) {
          const { data, error } = await supabase
            .from("users")
            .insert({
              email: session.user.email,
              display_name: session.user.name,
              profile_img: session.user.image,
            })
            .select("*");

          console.log("소셜로그인정보 인서트 후 로직");
          console.log("data==>>", data);
          console.log("error", error);
          console.log("세션유저정보-->>", session.user);

          // 생성된 data uuid를 session.user.user_uid에 넣어주기
          session.user.user_uid = data![0].id;
        } else {
          session.user.user_uid = existingUser[0].id;
        }
      } else {
        // 소셜 로그인이 최초가 아닌 경우 세션에서 사용자 식별자 가져오기
        const userUid = session.user.user_uid;
        const { data: existingUser, error: existingUserError } = await supabase
          .from("users")
          .select("id")
          .eq("id", userUid);

        if (!existingUser || existingUser.length === 0) {
          throw new Error("User not found in database.");
        }
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
