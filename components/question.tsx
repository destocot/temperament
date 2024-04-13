"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { askQuestion } from "@/lib/api";

export const Question = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await askQuestion(value);
    setAnswer(res);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Ask a question"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="max-w-[645px] grow border-b border-orange-500/50 bg-gray-950 px-4 py-2 text-lg focus:border-orange-500 focus:outline-none"
        />
        <Button type="submit" variant="primary" size="lg" disabled={loading}>
          {loading ? "Asking..." : "Ask"}
        </Button>
      </div>
      <div className="h-10 text-sm">{answer}</div>
    </form>
  );
};
