import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

type DeleteRecordBtnProps = {
  recordId: string;
};

export const DeleteRecordBtn = ({ recordId }: DeleteRecordBtnProps) => {
  const deleteRecord = async (recordId: string) => {
    "use server";
    await prisma.journalRecord.delete({
      where: { id: recordId },
    });
    redirect("/journal");
  };

  return (
    <form action={deleteRecord.bind(null, recordId)}>
      <Button className="ml-auto flex items-center gap-3" variant="destructive">
        <Trash />
        <span>Delete Record</span>
      </Button>
    </form>
  );
};
