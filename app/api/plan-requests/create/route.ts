// プランを出していない人に出してもらうためのリクエスト
import sendDirectMessage from "../../../lib/discord/sendDirectMessage";

export async function POST(request: Request, response: Response) {
  const { userId, content } = await request.json();
  const result = await sendDirectMessage(userId, content);
  if (result?.success) {
    return Response.json("ok");
  } else {
    return new Response("error: Failed to send message", {
      status: 400,
    });
  }
}
