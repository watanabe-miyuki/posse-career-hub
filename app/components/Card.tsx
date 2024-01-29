"use client";

import Image from "next/image";
import { BookType, User } from "../types/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

type BookProps = {
  book: BookType;
  isPurchased: boolean;
  user: User;
};

/**
 * SSR: リアルタイムで最新のデータを反映したページを提供するが、サーバー負荷が高くなり得る。
 * ISR: 静的ページの利点（高速ロード、サーバー負荷軽減）と動的ページの利点（内容の最新化）を組み合わせた方法。
 * 一定の間隔でページが更新されるため、リアルタイム性には多少の妥協が必要。
 */

// eslint-disable-next-line react/display-name
const Book = ({ book, isPurchased, user }: BookProps) => {
  // console.log(isPurchased);
  const router = useRouter();

  const startCheckout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: book.title,
            price: book.price,
            userId: user?.id,
            bookId: book.id,
          }),
        }
      );
      const responseData = await response.json();
      // console.log(responseData);
      if (responseData) {
        router.push(responseData.checkout_url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useStateをつかときはuse clientをつける

  const handlePlanRequestClick = () => {
    if (isPurchased) {
      alert("すでに購入済みです");
    } else {
      alert("プランをリクエストしますか？");
    }

    console.log("purchase");
  };

  return (
    <>
      {/* アニメーションスタイル */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="shadow-2xl">
        <div>
          <div>
            <div className="flex">
              <p className="bg-[#f4868b] grow text-center">IT・通信</p>
              <p className="bg-[#89b1dd] grow text-center">内定者</p>
              <p className="bg-[#D5D338] grow text-center">②2.5期</p>
            </div>
            <div>
              <Link className="flex " href={"hoge"}>
                <Image
                  width={50}
                  height={50}
                  alt="profile_icon"
                  src={"/default_icon.png"}
                  className="m-4"
                />
                <div className="m-2">
                  <p className="text-lg font-semibold">渡邊美由貴</p>
                  <p>アンチパターン株式会社</p>
                </div>
              </Link>
            </div>
            <p className="m-2 text-lg text-slate-600">
              25卒です。気軽に申請して...
            </p>
            <p className="m-2 text-md text-slate-700 text-center">
              ★★★★★ 5.0 (7)
            </p>
            {/* プランがない場合 */}
            {!book.plans.length && (
              <div className="flex justify-center ">
                <button
                  className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 mx-4 w-full rounded text-center mb-4"
                  onClick={handlePlanRequestClick}
                >
                  プランをリクエスト
                </button>
              </div>
            )}
          </div>
          <a
            onClick={handlePlanRequestClick}
            href="#"
            // className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
          >
            {book.plans.map((plan) => (
              <div
                key={plan.id}
                className="relative w-full h-[200px] items-center"
              >
                <Image
                  priority
                  src={plan.thumbnail}
                  alt={plan.name}
                  layout="fill"
                  objectFit="cover"
                  className="object-cover mosaic"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-[#5a4b3e99]"></div>
                {/* <div className="absolute mx-4 my-6 flex flex-col bg-red-50 h-full"> */}
                <div className="absolute my-5 text-white text-lg font-bold">
                  {plan.title}
                </div>
                <div className="absolute bottom-4  w-full ">
                  <div className="rounded mx-2 bg-primary-600 py-2 text-white font-bold text-center">
                    もっと詳しく
                  </div>
                </div>
                {/* </div> */}
              </div>
            ))}
          </a>
        </div>
      </div>
    </>
  );
};

export default Book;
