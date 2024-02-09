// "use client";

import nextAuth, { getServerSession } from "next-auth";
import Card from "./components/Card";
import { nextAuthOptions } from "./lib/next-auth/options";
import { Purchase, User } from "./types/types";

//https://zenn.dev/arsaga/articles/3f5bce7c904ebe#%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E6%83%85%E5%A0%B1
// 疑似データ
let contents = [
  {
    id: 1,
    author: "渡邊美由貴",
    company: "株式会社ポッセ",
    description: "25卒です。気軽に申請してください。このアプリの開発者です。",
    profession: "エンジニア",
    posseGeneration: "①2.5期生",
    plans: [
      {
        id: 1,
        profileIcon: "https://source.unsplash.com/random/2",
        title: "【25卒向け】即日対応 模擬面接しましょう！",
        thumbnail: "/thumbnails/friends.jpg",
        status: "pending", // 申請中 or "open","approved", "rejected",
      },
      {
        id: 2,
        profileIcon: "https://source.unsplash.com/random/3",
        title: "【25卒向け】模擬面接",
        thumbnail: "/thumbnails/group.jpg",
        status: "open",
      },
    ],
    content: "Content 1",
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  },
  // 他の本のデータ...
];

contents.push(...contents, ...contents, ...contents, ...contents);

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  // const { contents } = await getAllBooks(); // ISR
  // console.log(contents);

  let purchaseBookIds: string[];

  // use session はサーバーサイドでしか使えないので、ここで使うことはできない
  // getServerSessionは、user情報をグローバルに管理しているので、親子コンポーネントそれぞれで使っても、同じuser情報を参照する
  // ↑ usecontextと同じ
  const session = await getServerSession(nextAuthOptions);
  // as User は、session.userがnullの場合にエラーが出るのを防ぐためにつける
  // as は、型アサーションというもので、型を強制的に変換するもの
  const user = session?.user as User;
  // if (user) {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/plans/${user.id}`,
  //     { cache: "no-store" } // SSRでキャッシュを使わないようにする つけなくても、デフォルトでキャッシュを使わないようになっている
  //     // clintだと、useeffectは初回読み込みが遅くなる。
  //   );

  //   const purshasesData = await response.json();
  //   // console.log(purshasesData);
  //   // console.log(contents);

  //   purchaseBookIds = purshasesData.map((purchase: Purchase) => {
  //     return purchase.bookId;
  //   });
  //   // console.log(purchaseBookIds);
  // }

  return (
    <>
      <main className="md:mt-32 mt-20 lg:mx-80">
        <h2 className="text-center w-full font-bold text-3xl mb-2">OB訪問</h2>
        <div className="columns-2 md:columns-3">
          {contents.map((book) => (
            <div key={book.id} className="break-inside-avoid mx-3 mb-6">
              <Card
                card={book}
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
