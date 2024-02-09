// フォルダ名[...nextauth]の意味は、このフォルダは任意のパスを受け付けるという意味
// 例えば、/api/auth/google というパスにアクセスがあった場合、このファイルが呼び出される

import { nextAuthOptions } from "@/app/lib/next-auth/options"
import NextAuth from "next-auth"

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
