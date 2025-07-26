import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { Icons } from "./Icons";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Nav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Link
              href={siteConfig.link.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 px-0"
                )}
              >
                <Icons.github className="h-4 w-4" />
                <span className="sr-only">Github</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
