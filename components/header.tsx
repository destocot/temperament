import Link from "next/link";
import { UserBtn } from "./user-btn";

export const Header = () => {
  return (
    <div className="h-[150px] border-b border-orange-500/50 sm:h-[100px]">
      <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-between p-5 sm:flex-row">
        <Link
          href="/journal"
          className="text-4xl font-bold uppercase tracking-tight lg:text-5xl"
        >
          t•em•per•ament
        </Link>
        <div className="mt-5 sm:mt-0">
          <UserBtn />
        </div>
      </div>
    </div>
  );
};
