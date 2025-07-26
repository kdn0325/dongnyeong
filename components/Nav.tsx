"use client";

import React from "react";
import { Icons } from "./Icons";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo />
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
      <Link
        href={"/blog"}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline",
          pathname === "/blog" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Blog
      </Link>
      <Link
        href={"/about"}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline",
          pathname === "/about" ? "text-foreground" : "text-foreground/60"
        )}
      >
        About
      </Link>
    </nav>
  );
}
