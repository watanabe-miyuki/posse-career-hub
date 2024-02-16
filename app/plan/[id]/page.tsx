import PlanSubmitButton from "@/app/components/PlanSubmitButton";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { PlanDetail, User } from "@/app/types/types";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

// フォルダ名を[id]にすると、動的ルーティングになる
// そのため、paramsの中身は{ id: string }になる

const DetailPlan = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/plans/${params.id}?userId=${user.id}`,
    {
      cache: "no-store",
      headers: Object.fromEntries(headers()),
    }
  );
  const plan :PlanDetail = await response.json();

  console.log("userだよ", user);
  return (
    <div className="container mx-auto p-4">
      <div className="full-width bg-primary-500 rounded flex mb-4 border-solid border-primary-500 border-2">
        <div className=" flex-grow text-center text-white py-2">
          プランについて
        </div>
        <div className="bg-white flex-grow text-center text-primary-500 py-2">
          この人について
        </div>
      </div>
      <div className="shadow-2xl">
        <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src={plan.thumbnail}
            alt="plan-image"
            className="w-full h-80 object-cover object-center"
            width={700}
            height={700}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[#5a4b3e99]"></div>
          <h2 className="absolute text-2xl font-bold text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {plan.title}
          </h2>
        </div>
        <div className="p-4">
          <div className="">{plan.description}</div>
        </div>
        <div className="pt-5 mx-10 border-t-2 border-gray-200">
          <PlanSubmitButton
            plan={plan}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailPlan;
