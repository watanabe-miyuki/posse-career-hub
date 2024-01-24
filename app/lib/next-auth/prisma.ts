import { PrismaClient } from "@prisma/client";

// これでは何度もインスタンス化されてしまう
// let prisma;

// prisma = new PrismaClient();

let prisma: PrismaClient;

// global オブジェクトを使えば prisma は一度しかインスタンス化されない
// global オブジェクトは Node.js でグローバルにアクセスできるオブジェクト
// これがシングルトンという書き方

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}

prisma = globalForPrisma.prisma;

export default prisma;
