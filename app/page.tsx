// "use client";

import nextAuth, { getServerSession } from "next-auth";
import Card from "./components/Card";
import { nextAuthOptions } from "./lib/next-auth/options";
import { CardType, User } from "./types/types";
import { headers } from "next/headers";

export default async function Home() {
  // use session はサーバーサイドでしか使えないので、ここで使うことはできない
  // getServerSessionは、user情報をグローバルに管理しているので、親子コンポーネントそれぞれで使っても、同じuser情報を参照する
  // ↑ usecontextと同じ
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;
  // as User は、session.userがnullの場合にエラーが出るのを防ぐためにつける
  // as は、型アサーションというもので、型を強制的に変換するもの
  const response = await fetch(
    `http://localhost:3000/api/plans?userId=clsfu93mw000880omtlmr9o9r`,
    {
      cache: "no-store",
      // middlewareでheaderにtokenがセットされていないと、blockされるのでセットする
      headers: Object.fromEntries(headers()),
    }
  );

  const contents = await response.json();

  return (
    <>
      <main className="md:mt-32 mt-20 lg:mx-80">
        <h2 className="text-center w-full font-bold text-3xl mb-2">OB訪問</h2>
        <div className="columns-2 md:columns-3">
          {contents.map((card: CardType) => (
            <div key={card.id} className="break-inside-avoid mx-3 mb-6">
              <Card
                card={card}
                // book内で毎回user情報を取得するのは、パフォーマンスが悪いので、ここで一度取得して、propsで渡す
                user={user}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
