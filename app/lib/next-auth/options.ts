import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";

export const nextAuthOptions: NextAuthOptions = {
  debug: false,
  session: { strategy: "jwt" },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  // githubで認証したあとprismaのユーザーに保存される
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session }) => {
      return {
        ...session,
      };
    },
    //TODO githubで特定のauganaizationに所属しているユーザーのみ認証を許可する
  },
  secret: process.env.NEXTAUTH_SECRET,
};
