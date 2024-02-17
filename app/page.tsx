// "use client";

import nextAuth, { getServerSession } from "next-auth";
import Card from "./components/Card";
import { nextAuthOptions } from "./lib/next-auth/options";
import { CardType, User } from "./types/types";
import { headers } from "next/headers";
import Image from "next/image";

export default async function Home() {
  // use session はサーバーサイドでしか使えないので、ここで使うことはできない
  // getServerSessionは、user情報をグローバルに管理しているので、親子コンポーネントそれぞれで使っても、同じuser情報を参照する
  // ↑ usecontextと同じ
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;
  // as User は、session.userがnullの場合にエラーが出るのを防ぐためにつける
  // as は、型アサーションというもので、型を強制的に変換するもの
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/plans?userId=${user.id}`,
    {
      cache: "no-store",
      // サーバーコンポーネントではmiddlewareでheaderにtokenがセットされていないと、blockされるのでセットする
      headers: Object.fromEntries(headers()),
    }
  );

  const contents = await response.json();

  const heroImage = [
    "/thumbnails/friends.jpg",
    "/thumbnails/group.jpg",
    "/thumbnails/study.jpg",
    "/thumbnails/friends.jpg",
    "/thumbnails/group.jpg",
  ];

  return (
    <>
      <div className="relative flex w-full overflow-hidden items-center justify-center">
        {heroImage.map((image, index) => (
          <Image key={index} src={image} alt="hero" width={400} height={100} />
        ))}
        <div className="absolute top-0 left-0 w-full h-full bg-[#13100d99]"></div>
        <div className="absolute text-white text-3xl font-bold flex flex-col items-center">
          OBOGと繋がる in POSSE
          <p className="text-lg font-normal">POSSE よろず相談所</p>
        </div>
      </div>
      <main className="md:mt-20 mt-10 lg:mx-80">
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
