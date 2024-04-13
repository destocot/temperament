import { evaluate } from "@/lib/ai";
import { getUserIdFromKindeId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  const { id: userId } = await getUserIdFromKindeId();

  const record = await prisma.journalRecord.create({
    data: {
      userId,
      content: "Take a record...",
    },
  });

  const evaluation = await evaluate(record.content);

  if (evaluation) {
    await prisma.evaluation.upsert({
      where: { recordId: record.id },
      update: evaluation,
      create: { ...evaluation, recordId: record.id },
    });
  }

  return NextResponse.json({ data: record });
}
