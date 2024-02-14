// api側に置くか、lib側に置くかは要相談 cmsのサンプル見てみる

async function sendDirectMessage(userId: string, content: string) {
  const DISCORD_SECRET_BOT_TOKEN = process.env.DISCORD_SECRET_BOT_TOKEN;
  const BASE_DISCORD_URL = process.env.BASE_DISCORD_URL;

  // DMチャンネルを作成するDiscord APIのエンドポイント
  const endpoint = `${BASE_DISCORD_URL}/api/users/@me/channels`;

  try {
    // DMチャンネルを開く
    const channelResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bot ${DISCORD_SECRET_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipient_id: userId }),
    });
    const channelData = await channelResponse.json();

    // メッセージを送信
    if (channelData.id) {
      const messageResponse = await fetch(
        `${BASE_DISCORD_URL}/api/channels/${channelData.id}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bot ${DISCORD_SECRET_BOT_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }
      );

      if (!messageResponse.ok) {
        // メッセージ送信が失敗した場合
        return { success: false, error: "Failed to send message." };
      }

      return { success: true };
    }
  } catch (error) {
    return { success: false, error };
  }
}

export default sendDirectMessage;
