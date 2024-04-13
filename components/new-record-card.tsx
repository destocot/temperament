"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createNewRecord } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const NewRecordCard = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);
    const data = await createNewRecord();
    setLoading(false);
    router.push(`/journal/${data.id}`);
  };

  return (
    <Card
      className={cn(
        "cursor-pointer border-orange-500 transition hover:border-orange-700",
        {
          "opacity-50": loading,
        },
      )}
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle>New Record</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      {/* <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
};
