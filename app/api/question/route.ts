import { qa } from "@/lib/ai";
import { getUserIdFromKindeId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { question } = await req.json();

  const { id: userId } = await getUserIdFromKindeId();

  const records = await prisma.journalRecord.findMany({
    where: { userId },
    select: { id: true, content: true, createdAt: true },
  });

  const answer = await qa(question, records);

  return NextResponse.json({ data: answer });
};
