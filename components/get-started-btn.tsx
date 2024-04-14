"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const GetStartedBtn = () => {
  const { isAuthenticated } = useKindeBrowserClient();

  return (
    <Button variant="secondary" size="lg" asChild>
      <Link href={isAuthenticated ? "/journal" : "/login"}>Get Started</Link>
    </Button>
  );
};
