import { supabase } from "@/utils/supabase/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.user_uid = token.sub ?? "";
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: "secret",
});

export { handler as GET, handler as POST };
