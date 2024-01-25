"use client";

import Image from "next/image";
import { BookType, User } from "../types/types";
import { useState } from "react";
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
  const [showModal, setShowModal] = useState(false);
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
  const handleCancel = () => {
    setShowModal(false);
    console.log("cancel");
  };

  const handlePurchaseClick = () => {
    if (isPurchased) {
      alert("すでに購入済みです");
    } else {
      setShowModal(true);
    }

    console.log("purchase");
  };

  const handlePurchaseConfirm = () => {
    if (!user) {
      setShowModal(false);
      // ログインページへリダイレクト
      router.push("/api/auth/signin");
    } else {
      // 購入処理
    }
    console.log("confirm");
    startCheckout();
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
          <div className="bg-slate-100">
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
          </div>
          <a
            onClick={handlePurchaseClick}
            // className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
          >
            {book.plans.map((plan) => (
              <div key={plan.id} className="relative w-full h-[200px]">
                <Image
                  priority
                  src={book.thumbnail}
                  alt={book.title}
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                />
              </div>
            ))}
          </a>
        </div>

        {/* プランのリクエストを送るならモーダル必要 */}

        {showModal && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50 flex justify-center items-center modal">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl mb-4">プランをリクエストしますか</h3>
              <button
                onClick={handlePurchaseConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                リクエストする
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Book;
