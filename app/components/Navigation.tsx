// components/Nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Navigation = () => {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    clsx(
      "px-4 py-2 rounded hover:bg-blue-400 transition text-xl",
      pathname === path ? "bg-blue-300 font-bold text-black" : "text-blue-800 font-bold"
    );

  return (
    <nav className="flex gap-4 mb-6">
      {pathname !== "/" && (
        <Link href="/" className={linkClasses("/")}>
          Home
        </Link>
      )}
      <Link href="/add" className={linkClasses("/add")}>
        Add
      </Link>
      <Link href="/delete" className={linkClasses("/delete")}>
        Delete
      </Link>
      <Link href="/manage" className={linkClasses("/manage")}>
        Manage
      </Link>
    </nav>
  );
};

export default Navigation;
