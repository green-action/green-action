import { supabase } from "@/utils/supabase/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

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
          if (response.error) {
            throw new Error("sign in error");
          }
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
      session.user.user_uid = token.sub as string;

      const isSocialLogin = token.name ? true : false;

      if (isSocialLogin) {
        const { data: existingUser, error: existingUserError } = await supabase
          .from("users")
          .select("id")
          .eq("email", session.user.email);

        if (!existingUser || existingUser.length === 0) {
          const { data, error } = await supabase
            .from("users")
            .insert({
              email: session.user.email,
              display_name: session.user.name,
              profile_img: session.user.image,
            })
            .select("id");

          session.user.user_uid = data![0].id;
        } else {
          session.user.user_uid = existingUser[0].id;
        }
      } else {
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
