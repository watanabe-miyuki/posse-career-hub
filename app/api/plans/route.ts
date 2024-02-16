import prisma from "@/app/lib/next-auth/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  try {
    const users = await prisma.user.findMany({
      include: {
        accounts: true, // accountのデータも取得
        company: true, // companyのデータも取得
        receivedApplications: {
          where: {
            userId: userId!, // userIdが自分であるapplicationのデータを取得
            planId: null, // planIdがnullであるapplicationのデータを取得
          },
          orderBy: {
            createdAt: "desc", // 作成日時の降順で取得
          },
          take: 1, // 1つだけ取得
        },
        plans: {
          include: {
            applications: {
              where: {
                userId: userId!, // userIdが自分であるapplicationのデータを取得
              },
              orderBy: {
                createdAt: "desc", // 作成日時の降順で取得
              },
              take: 1, // 1つだけ取得
            },
          },
        },
      },
    });

    // データの成形
    const formattedData = users.map((user) => ({
      id: user.id,
      providerAccountId: user.accounts?.[0]?.providerAccountId, // 最初のaccountのproviderAccountIdを使用
      author: user.name,
      icon: user.image,
      company: user.company?.name,
      description: user.description,
      profession: user.profession,
      posseGeneration: user.posseGeneration,
      plans: user.plans.map((plan) => ({
        id: plan.id,
        profileIcon: user.image, // ユーザーの画像をプランのプロフィールアイコンとして使用
        title: plan.title,
        thumbnail: plan.image, // プランに関連付けられた画像
        status: plan.applications[0]?.status ?? "open", // isPublicに基づいてステータスを決定
      })),
      status: user.receivedApplications[0]?.status ?? null, // isPublicに基づいてステータスを決定
    }));

    return NextResponse.json(formattedData);
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
