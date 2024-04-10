import { supabase } from "@/utils/supabase/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import { v4 as uuidv4 } from "uuid";

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
  ],
  callbacks: {
    async session({ session, token }) {
      console.log("session >>>", session);
      console.log("토큰 >>>", token);

      const isSocialLogin = token.name ? true : false;
      // console.log("세션uid=>>", session.user.user_uid);
      // 소셜 로그인일 때만 사용자 정보 업데이트
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
              email: token.email,
              display_name: session.user.name,
              profile_img: session.user.image,
            })
            .select("id");
          // 이걸 session.user.user_uid에 넣어주기
          session.user.user_uid = data![0].id;
          console.log("소셜로그인정보 인서트 후 로직");
          console.log("data==>>", data);
          console.log("error", error);
          console.log("세션유저정보-->>", session.user);
        }

        session.user.user_uid = existingUser![0].id;
        return session;
      }

      // console.log(typeof token.sub);

      // 데이터에있는 uid를 세션유저 user_uid
      session.user.user_uid = token.sub ?? "";
      session.user.email = token.email ?? "";
      // console.log(session.user.user_uid);
      // 토큰의 sub가아니라 users테이블의 생성된 id(uuid)를 넣어야됨
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
