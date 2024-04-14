import { EmailInput } from "@/components/email-input";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function LoginPage() {
  return (
    <main className="grid h-screen place-items-center">
      <div className="flex w-[375px] flex-col items-center gap-8 rounded-lg border bg-white/[0.02] p-5">
        <div className="flex items-center gap-5">
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img src="../favicon.ico" alt="" className="h-10 w-10" />
          <h2 className="text-3xl font-bold">Hi. Welcome back.</h2>
        </div>
        <EmailInput />
        <Button
          className="flex w-full items-center gap-3 bg-[#4285F4] transition hover:bg-[#4276f4]"
          asChild
        >
          <LoginLink
            authUrlParams={{
              connection_id:
                process.env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE ?? "",
            }}
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="white"
            >
              <title>Google</title>
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            <p>Sign in with Google</p>
          </LoginLink>
        </Button>
        <div className="flex items-center gap-3">
          <p>Don&apos;t have an account?</p>
          <Button variant="secondary" size="sm" asChild>
            <RegisterLink>Create account</RegisterLink>
          </Button>
        </div>
      </div>
    </main>
  );
}
