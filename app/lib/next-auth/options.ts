import { NextAuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import DiscordProvider from "next-auth/providers/discord";

export const nextAuthOptions: NextAuthOptions = {
  debug: true,
  session: { strategy: "jwt" },
  providers: [
    // 同じめ
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID!,
      clientSecret: process.env.DISCORD_SECRET!,
    }),
  ],
  // githubで認証したあとprismaのユーザーに保存される
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session }) => {
        console.log('is session', session); 
      return {
        ...session,
      };
    },
    //TODO githubで特定のauganaizationに所属しているユーザーのみ認証を許可する
  },
  secret: process.env.NEXTAUTH_SECRET,
};
