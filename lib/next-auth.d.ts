import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      user_uid: string;
      image: string;
      name: string;
    };
  }
}
