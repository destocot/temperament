import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export const UserBtn = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("User not found");

  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-4">
      {user.picture ? (
        <Image
          src={user.picture}
          alt="user profile avatar"
          width={250}
          height={250}
          className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gray-50 text-center text-black"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gray-50 text-center text-black">
          {user.given_name?.[0]}
          {user.family_name?.[0]}
        </div>
      )}
      <div>
        <p className="font-semibold">
          {user.given_name} {user.family_name}
        </p>
        <LogoutLink
          className="text-sm text-gray-500 transition hover:text-gray-700"
          postLogoutRedirectURL="/"
        >
          Log out
        </LogoutLink>
      </div>
    </div>
  );
};
