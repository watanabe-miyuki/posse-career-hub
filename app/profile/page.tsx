"use client";
import { User, UserDetail } from "@/app/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../loading";

// フォルダ名を[id]にすると、動的ルーティングになる
// そのため、paramsの中身は{ id: string }になる

//TODO loading実装
function Myprofile() {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserDetail | null>(null);
  
  const { data: session } = useSession();
  const user = session?.user as User;

  useEffect(() => {
    if (user?.id) {
      const fetchData = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`,
          {
            cache: "no-store",
          }
        );
        const profile = await response.json();
        setProfile(profile);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [user?.id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="shadow-2xl">
        <div>
          <div className="bg-primary-100 p-4">基本情報</div>
          <div className="flex p-4">
            <Image
              src={profile?.image as string}
              alt="plan-image"
              className="rounded-full border-4 border-primary-500"
              width={200}
              height={200}
            />
            <div className="pl-4">
              <h2 className="text-xl font-bold">{profile?.name}</h2>
              <p>{profile?.company}</p>
              <p>{profile?.profession ?? "未記入"}</p>
              <p>{profile?.posseGeneration ?? "未記入"}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-primary-100 p-4">プロフィール</div>
          <div className="p-4">
            <div className="">{profile?.description ?? "未記入"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myprofile;
