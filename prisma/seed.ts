import { Account, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function upsertAccount(account: Account) {
  const existingAccount = await prisma.account.findFirst({
    where: {
      provider: account.provider,
      providerAccountId: account.providerAccountId,
    },
  });

  if (existingAccount) {
    return await prisma.account.update({
      where: {
        id: existingAccount.id,
      },
      data: account,
    });
  } else {
    return await prisma.account.create({
      data: account,
    });
  }
}

async function main() {
  const users = [
    {
      id: "clsfu890m000580omel41ezwy",
      name: "keiostudent",
      email: "watanabemiyuki@keio.jp",
      image: "https://cdn.discordapp.com/embed/avatars/0.png",
      companyId: "clsmmbdl60001egdbp5njkjpy",
    },
    {
      id: "clsfu93mw000880omtlmr9o9r",
      name: "2.5watanabemiyuki",
      email: "kirin.myk2018@gmail.com",
      image:
        "https://cdn.discordapp.com/avatars/1005010589753540648/e25993ef29f19d265e6e3ba26eaf8f7d.png",
      companyId: "clsmmbc820000egdb9aczsjg8",
    },
    {
      id: "clsfua2gw000b80omh0l70qu7",
      name: "posseintern",
      email: "miyuki.watanabe@posse-ap.com",
      image: "https://cdn.discordapp.com/embed/avatars/0.png",
      companyId: "clsmmbf6n0002egdbhq1vfsw5",
    },
  ];

  const accounts = [
    {
      id: "clsfu89qc000780omvbwhhg1s",
      userId: "clsfu890m000580omel41ezwy",
      type: "oauth",
      provider: "discord",
      providerAccountId: "1205793522406653952",
      refresh_token: "xpv03pgemZ7RzcqmVZotKRsc5sSpH6",
      access_token: "0LE1uJm3hUoYcucjnj2dBIc8J3qcd0",
      expires_at: 1708159913,
      token_type: "Bearer",
      scope: "identify email",
    },
    {
      id: "clsfu94dn000a80omy9olw3c2",
      userId: "clsfu93mw000880omtlmr9o9r",
      type: "oauth",
      provider: "discord",
      providerAccountId: "1005010589753540648",
      refresh_token: "ox66DBKAkjtKoTsO1zdkWnAqb8F7kg",
      access_token: "t6RSQqEDEufzjXfygQkAsd3ECMOxiI",
      expires_at: 1708159953,
      token_type: "Bearer",
      scope: "identify email",
    },
    {
      id: "clsfua38f000d80ompdr5hzs8",
      userId: "clsfua2gw000b80omh0l70qu7",
      type: "oauth",
      provider: "discord",
      providerAccountId: "1205792405236748341",
      refresh_token: "k4yEW4OCv4Fl3db8X5a9K9CcL93aH4",
      access_token: "jCZdXzGQAJFgBzwK59W2lRg67s8QFK",
      expires_at: 1708159997,
      token_type: "Bearer",
      scope: "email identify",
    },
  ];

  const companyData = [
    {
      id: "clsmmbc820000egdb9aczsjg8",
      name: "株式会社ポッセ",
    },
    {
      id: "clsmmbdl60001egdbp5njkjpy",
      name: "慶應義塾大学",
    },
    {
      id: "clsmmbf6n0002egdbhq1vfsw5",
      name: "株式会社アンチパターン",
    },
  ];

  const plans = [
    {
      id: "clsfu8b9g000980om7m4h9q5o",
      userId: "clsfu93mw000880omtlmr9o9r",
      title: "【教授指導】即日対応 模擬面接しましょう！",
      description: "教授による模擬面接です。気軽に申請してください。",
      image: "/thumbnails/friends.jpg",
      status: "pending",
    },
    {
      id: "clsfu8c2x000a80om1j3r8w9y",
      userId: "clsfu93mw000880omtlmr9o9r",
      title: "【教授指導】模擬面接",
      description: "教授による模擬面接です。気軽に申請してください。",
      image: "/thumbnails/group.jpg",
      status: "open",
    },
    {
      id: "clsfu8d0g000c80om1z3r8w9y",
      userId: "clsfua2gw000b80omh0l70qu7",
      title: "【インターン生】即日対応 模擬面接しましょう！",
      description: "インターン生による模擬面接です。気軽に申請してください。",
      image: "/thumbnails/friends.jpg",
      status: "pending",
    },
    {
      id: "clsfu8d7g000d80om1z3r8w9y",
      userId: "clsfua2gw000b80omh0l70qu7",
      title: "【インターン生】模擬面接",
      description: "インターン生による模擬面接です。気軽に申請してください。",
      image: "/thumbnails/group.jpg",
      status: "open",
    },
  ];

  const applications = [
    {
      id: "clsfu8e4g000e80om1z3r8w9y",
      userId: "clsfu93mw000880omtlmr9o9r",
      recipientId: "clsfua2gw000b80omh0l70qu7",
      status: "requested",
      planId: null,
    },
    {
      id: "clsfu8f1g000f80om1z3r8w9y",
      userId: "clsfua2gw000b80omh0l70qu7",
      recipientId: "clsfu93mw000880omtlmr9o9r",
      status: "requested",
      planId: null,
    },
  ];

  for (const company of companyData) {
    await prisma.company.upsert({
      where: { name: company.name },
      update: {},
      create: company,
    });
  }

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: null,
        image: user.image,
        companyId: user.companyId,
        description: null,
        profession: null,
        posseGeneration: null,
      },
    });
  }

  for (const account of accounts) {
    await upsertAccount({
      id: account.id,
      userId: account.userId,
      type: account.type,
      provider: account.provider,
      providerAccountId: account.providerAccountId,
      refresh_token: account.refresh_token,
      access_token: account.access_token,
      expires_at: account.expires_at,
      token_type: account.token_type,
      scope: account.scope,
      id_token: null,
      session_state: null,
    });
  }

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { id: plan.id },
      update: {},
      create: {
        id: plan.id,
        userId: plan.userId,
        title: plan.title,
        description: plan.description,
        image: plan.image,
        isPublic: true,
      },
    });
  }

  for (const application of applications) {
    await prisma.application.upsert({
      where: { id: application.id },
      update: {},
      create: application,
    });
  }

  console.log("Seeder completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
