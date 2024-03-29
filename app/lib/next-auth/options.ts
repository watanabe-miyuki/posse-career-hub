import { useRouter } from "next/navigation";
import { NextAuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import DiscordProvider from "next-auth/providers/discord";
const BASE_DISCORD_URL = process.env.BASE_DISCORD_URL;
const guildId = process.env.DISCORD_GUILD_ID;

async function isJoinGuild(accessToken: string) {
  const res: Response = await fetch(
    `${BASE_DISCORD_URL}/api/users/@me/guilds`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (res.ok) {
    const guilds = await res.json();

    return guilds.some((guild: any) => guild.id == guildId);
  }
  return false;
}

export const nextAuthOptions: NextAuthOptions = {
  debug: true,
  session: { strategy: "jwt" },
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID!,
      clientSecret: process.env.DISCORD_SECRET!,
      authorization: {
        params: {
          scope: "identify email guilds",
        },
      },
    }),
  ],
  // githubで認証したあとprismaのユーザーに保存される
  adapter: PrismaAdapter(prisma),
  callbacks: {
    /**
     * jwtにaccessTokenと、profile.idを追加
     */
    jwt: async ({ token, account, profile }) => {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      if (profile as any) {
        token.providerAccountId = (profile as any).id;

        // Discord ID から内部の User テーブルの id を検索
        const account = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: "discord",
              providerAccountId: (profile as any).id,
            },
          },
        });
        if (account) {
          token.userId = account.userId;
        }
      }

      return token;
    },

    /**
     * sessionにaccessTokenと、user.idを追加
     */
    session: async ({ session, token }) => {
      (session as any).accessToken = token.accessToken;
      if (session.user && token.userId) {
        (session as any).user.id = token.userId; // User テーブルの id をセッションに格納
      }
      return session;
    },

    /**
     * ログインボタンを押した際に発火される
     */
    signIn: async ({ account }) => {
      if (account == null || account.access_token == null) return false;
      const result = await isJoinGuild(account.access_token);
      return result;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
