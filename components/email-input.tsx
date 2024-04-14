"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export const EmailInput = () => {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const loginLink = document.getElementById("login-link");
        if (loginLink) {
          loginLink.click();
        }
      }}
      className="flex w-full flex-col gap-3"
    >
      <input
        type="email"
        placeholder="i.e. temperament@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded bg-white/[0.02] p-3"
      />
      <Button variant="secondary" type="submit" asChild>
        <LoginLink
          id="login-link"
          authUrlParams={{
            connection_id:
              process.env.NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_PASSWORD ?? "",
            login_hint: email,
          }}
        >
          Login
        </LoginLink>
      </Button>
    </form>
  );
};
