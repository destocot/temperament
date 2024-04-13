import { RecordCard } from "@/components/record-card";
import { getUserIdFromKindeId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const RecordList = async () => {
  const { id: userId } = await getUserIdFromKindeId();

  const records = await prisma.journalRecord.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return records.map((record) => (
    <Link key={record.id} href={`/journal/${record.id}`}>
      <RecordCard record={record} />
    </Link>
  ));
};
