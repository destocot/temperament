import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function LoginRedirectPage() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser) redirect("/api/auth/login");

  const user = await prisma.user.findUnique({
    where: { kindeId: kindeUser.id },
  });

  if (!user) {
    await prisma.user.create({
      data: {
        kindeId: kindeUser.id,
        email: kindeUser.email!,
      },
    });
  }

  redirect("/journal");
}
