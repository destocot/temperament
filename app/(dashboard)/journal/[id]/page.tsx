import { Editor } from "@/components/editor";
import { getUserIdFromKindeId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Evaluation } from "@/components/evaluation";
import { DeleteRecordBtn } from "@/components/delete-recod-btn";

const getRecord = async (id: string) => {
  const { id: userId } = await getUserIdFromKindeId();

  const record = await prisma.journalRecord.findUnique({
    where: { id_userId: { id, userId } },
    include: { evaluation: true },
  });
  return record;
};

export default async function JournalRecordPage({ params }: any) {
  const record = await getRecord(params.id);
  if (!record) notFound();

  return (
    <main className="flex max-w-7xl grow flex-col space-y-5 p-5">
      <Evaluation evaluation={record.evaluation} />

      <div className="flex grow flex-col gap-2 sm:flex-row">
        <Button size="icon" asChild className="transition hover:scale-105">
          <Link href="/journal">
            <ArrowBigLeft />
          </Link>
        </Button>

        <Editor record={record} />
      </div>
      <DeleteRecordBtn recordId={record.id} />
    </main>
  );
}
