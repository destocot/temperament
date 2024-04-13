import "server-only";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getUserIdFromKindeId() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser) redirect("/login");

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      kindeId: kindeUser?.id,
    },
    select: { id: true },
  });

  if (!user) redirect("/login/redirect");

  return user;
}
