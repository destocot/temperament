"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const GetStartedBtn = () => {
  const { isAuthenticated } = useKindeBrowserClient();

  return (
    <Button variant="secondary" size="lg" asChild>
      {isAuthenticated ? (
        <Link href="/journal">Get Started</Link>
      ) : (
        <LoginLink postLoginRedirectURL="/login/redirect">
          Get Started
        </LoginLink>
      )}
    </Button>
  );
};
