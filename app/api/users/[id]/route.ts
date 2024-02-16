import prisma from "@/app/lib/next-auth/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: params.id!,
      },
      include: {
        company: true, // companyのデータも取得
      },
    });

    console.log("usersだよね", user);

    // データの成形
    const formattedData = {
      id: user!.id,
      name: user!.name,
      image: user!.image,
      company: user!.company?.name,
      description: user!.description,
      profession: user!.profession,
      posseGeneration: user!.posseGeneration,
    };

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
