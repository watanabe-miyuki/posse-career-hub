import { BookType } from "@/app/types/types";
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMEIN!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});

export const getAllBooks = async () => {
  const allBooks = await client.getList<BookType>({
    endpoint: "bookcommerce", // ISRに使うエンドポイント
    customRequestInit: {
      next: {
        revalidate: 3600, // 1時間ごとに再生成
      },
    },
  });
  return allBooks;
};

export const getDetailBook = async (contentId: string) => {
  const detailBook = await client.getListDetail<BookType>({
    endpoint: "bookcommerce",
    contentId,
    customRequestInit: {
      // 購入直後に反映させたいからSSR
      cache: "no-cache",
    },
  });
  return detailBook;
};
