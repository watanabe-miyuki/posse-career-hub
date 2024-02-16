// プランを申し込むリクエスト
import prisma from "@/app/lib/next-auth/prisma";
import sendDirectMessage from "../../../lib/discord/sendDirectMessage";

export async function POST(request: Request) {
  try {
    const { user, plan, content }  = await request.json();

    // ダイレクトメッセージの送信
    const result = await sendDirectMessage(plan.providerAccountId, content);
    if (!result?.success) {
      throw new Error("Failed to send message");
    }

    // ダイレクトメッセージが成功した場合、Applicationを作成する
    await prisma.application.create({
      data: {
        userId: user.id, // 応募したユーザーID
        recipientId: plan.userId as string, // 応募先のユーザーID
        status: "pending", // 応募の状態
        planId: plan.id,
      },
    });

    // 成功レスポンス
    return new Response(JSON.stringify("ok"), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    // エラーレスポンス
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
