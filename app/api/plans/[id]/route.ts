import prisma from "@/app/lib/next-auth/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  try {
    const plan = await prisma.plan.findFirst({
      where: {
        id: params.id!,
      },
      include: {
        user: {
          include: { company: true, accounts: true},
        },
        applications: {
          where: {
            userId: userId!,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    console.log("planだよね", plan);

    const formattedData = {
      id: plan!.id,
      userId: plan!.user?.id,
      providerAccountId: plan!.user?.accounts?.[0]?.providerAccountId,
      title: plan!.title,
      thumbnail: plan!.image,
      description: plan!.description,
      status: plan!.applications[0]?.status,
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
