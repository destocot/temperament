"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <div className="h-[50px] border-b border-orange-500/50">
      <ul className="mx-auto flex h-full items-center justify-center gap-7">
        <li
          className={cn({
            "opacity-50": pathname === "/journal",
            "transition hover:text-orange-500": pathname !== "/journal",
          })}
        >
          <Link href="/journal">Journal</Link>
        </li>
        <li
          className={cn({
            "opacity-50": pathname === "/history",
            "transition hover:text-orange-500": pathname !== "/history",
          })}
        >
          <Link href="/history">History</Link>
        </li>
      </ul>
    </div>
  );
};
