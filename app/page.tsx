// "use client";

import nextAuth, { getServerSession } from "next-auth";
import Book from "./components/Card";
import { getAllBooks } from "./lib/microcms/client";
import { nextAuthOptions } from "./lib/next-auth/options";
import { Purchase, User } from "./types/types";

//https://zenn.dev/arsaga/articles/3f5bce7c904ebe#%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E6%83%85%E5%A0%B1
// 疑似データ
let contents = [
  {
    id: 1,
    title: "Book 1",
    plans: [
      {
        id: 1,
        name: "Author 1",
        description: "Author 1 description",
        profile_icon: "https://source.unsplash.com/random/2",
        title: "【25卒向け】即日対応 模擬面接しましょう！",
        thumbnail: "/thumbnails/friends.jpg",
      },
      {
        id: 2,
        name: "Author 2",
        description: "Author 2 description",
        profile_icon: "https://source.unsplash.com/random/3",
        title: "【25卒向け】模擬面接",
        thumbnail: "/thumbnails/group.jpg",
      },
    ],
    content: "Content 1",
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
  {
    id: 2,
    title: "Book 2",
    plans: [
      {
        id: 2,
        name: "Author 2",
        description: "Author 2 description",
        profile_icon: "https://source.unsplash.com/random/3",
        title: "【25卒向け】模擬面接",
        thumbnail: "/thumbnails/group.jpg",
      },
    ],
    content: "Content 2",
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
  {
    id: 3,
    title: "Book 3",
    plans: [
      {
        id: 3,
        name: "Author 3",
        description: "Author 3 description",
        title: "【25卒向け】模擬面接",
        profile_icon: "https://source.unsplash.com/random/4",
        thumbnail: "/thumbnails/study.jpg",
      },
    ],
    content: "Content 3",
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
  {
    id: 4,
    title: "Book 4",
    plans: [],
    content: "Content 4",
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
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
  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      { cache: "no-store" } // SSRでキャッシュを使わないようにする つけなくても、デフォルトでキャッシュを使わないようになっている
      // clintだと、useeffectは初回読み込みが遅くなる。
    );
    const purshasesData = await response.json();
    // console.log(purshasesData);
    // console.log(contents);

    purchaseBookIds = purshasesData.map((purchase: Purchase) => {
      return purchase.bookId;
    });
    // console.log(purchaseBookIds);
  }

  return (
    <>
      <main className="md:mt-32 mt-20 lg:mx-80">
        <h2 className="text-center w-full font-bold text-3xl mb-2">OB訪問</h2>
        <div className="columns-2 md:columns-3">
          {contents.map((book) => (
            <div key={book.id} className="break-inside-avoid mx-3 mb-6">
              <Book
                book={book}
                isPurchased={purchaseBookIds?.includes(book.id)}
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
