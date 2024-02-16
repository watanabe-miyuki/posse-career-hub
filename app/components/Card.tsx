"use client";

import Image from "next/image";
import { CardType, User } from "../types/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

type CardProps = {
  card: CardType;
  user: User;
};

/**
 * SSR: リアルタイムで最新のデータを反映したページを提供するが、サーバー負荷が高くなり得る。
 * ISR: 静的ページの利点（高速ロード、サーバー負荷軽減）と動的ページの利点（内容の最新化）を組み合わせた方法。
 * 一定の間隔でページが更新されるため、リアルタイム性には多少の妥協が必要。
 */

// eslint-disable-next-line react/display-name
const Card = ({ card, user }: CardProps) => {
  // プランを出していない人にリクエストを送る
  const [isRequested, setIsRequested] = useState(card.status === "requested");

  // console.log(isPurchased);
  const router = useRouter();

  const handlePlanRequestClick = async () => {
    const content = `${user.name}さんからプランリクエストが届いています。\nさっそくプランの投稿をしよう！ [こちらから](${process.env.NEXT_PUBLIC_BASE_URL}/plans/${card.id})`;

    const response = await fetch("/api/plan-requests/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, card, content }),
    });

    if (response.ok) {
      console.log("Message sent successfully!");
      setIsRequested(true);
    } else {
      console.error("Failed to send messageだよ");
    }
  };

  return (
    <>
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
                  <p className="text-lg font-semibold">{card.author}</p>
                  <p>{card.company}</p>
                </div>
              </Link>
            </div>
            <p className="m-2 text-lg text-slate-600">
              {card.description?.length > 100
                ? card.description.slice(0, 100) + "..."
                : card.description}
            </p>
            <p className="m-2 text-md text-slate-700 text-center">
              ★★★★★ 5.0 (7)
            </p>
            {/* プランがない場合 */}
            {!card.plans.length && (
              <div className="flex justify-center ">
                {isRequested ? (
                  <button
                    className="bg-gray-500 text-white font-bold py-2 mx-4 w-full rounded text-center mb-4"
                    disabled={true}
                  >
                    リクエスト済み
                  </button>
                ) : (
                  <button
                    className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 mx-4 w-full rounded text-center mb-4"
                    onClick={handlePlanRequestClick}
                  >
                    プランをリクエスト
                  </button>
                )}
              </div>
            )}
          </div>
          <a
            onClick={handlePlanRequestClick}
            href="#"
            // className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
          >
            {card.plans.map((plan) => (
              <div
                key={plan.id}
                className="relative w-full h-[200px] items-center"
              >
                <Image
                  priority
                  src={plan.thumbnail}
                  alt={plan.title}
                  layout="fill"
                  objectFit="cover"
                  className="object-cover mosaic"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-[#5a4b3e99]"></div>
                <div className="absolute my-5 mx-2 text-white text-lg font-bold">
                  {plan.title}
                </div>
                <div className="absolute bottom-4 w-full ">
                  <div className="rounded mx-2 bg-primary-600 py-2 text-white font-bold text-center">
                    もっと詳しく
                  </div>
                </div>
              </div>
            ))}
          </a>
        </div>
      </div>
    </>
  );
};

export default Card;
