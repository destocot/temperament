import { NextResponse } from "next/server";
import { evaluate } from "@/lib/ai";
import { getUserIdFromKindeId } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id: userId } = await getUserIdFromKindeId();

  const { content } = await req.json();

  const updatedRecord = await prisma.journalRecord.update({
    where: { id_userId: { id: params.id, userId } },
    data: { content },
  });

  const evaluation = await evaluate(updatedRecord.content);

  if (evaluation) {
    await prisma.evaluation.upsert({
      where: { recordId: updatedRecord.id },
      update: evaluation,
      create: { ...evaluation, recordId: updatedRecord.id },
    });
  }
  return NextResponse.json({ data: updatedRecord });
}
