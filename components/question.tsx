"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { askQuestion } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";
import { toast } from "sonner";

export const Question = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await askQuestion(value);
      setAnswer(res);
      setOpen(true);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Ask a question"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="max-w-[645px] grow rounded border-b border-orange-500/50 bg-gray-950 px-4 py-2 text-lg focus:border-orange-500 focus:ring-0"
          />
          <Button type="submit" variant="primary" size="lg" disabled={loading}>
            {loading ? "Asking..." : "Ask"}
          </Button>
        </div>
      </form>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-gray-500 bg-gray-950">
          <DialogHeader>
            <DialogDescription className="text-white ">
              {answer}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
