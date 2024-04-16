"use client";

import { updateRecord } from "@/lib/api";
import { JournalRecord } from "@prisma/client";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import { LoadingSpinner } from "./loading-spinner";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type EditorProps = { record: JournalRecord };

export const Editor = ({ record }: EditorProps) => {
  const [value, setValue] = useState(record.content.trim());
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const res = await updateRecord(record.id, _value);
      if (typeof res === "string") toast.info(res);
      router.refresh();
      setIsLoading(false);
    },
  });

  return (
    <div className="relative w-full grow">
      <textarea
        className="scrollbar h-full min-h-[400px] w-full resize-none rounded border-none bg-gray-100/[0.02] px-10 py-5 text-lg
          opacity-80 outline-none focus:ring-orange-500 sm:text-xl"
        value={value}
        autoFocus
        onChange={(e) => setValue(e.target.value)}
        onFocus={(e) =>
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length,
          )
        }
      ></textarea>
      {isLoading && (
        <LoadingSpinner className="absolute right-4 top-4 h-5 w-5 opacity-80" />
      )}
    </div>
  );
};
