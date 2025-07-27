import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icons } from "./Icons";
import Nav from "./Nav";
import ModeToggle from "./ModeToggle";
import MobileNav from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
      <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-28">
        <Nav />
        <div className="flex items-center space-x-2">
          <nav className="flex items-center">
            <Link
              href={siteConfig.link.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 px-0 hidden sm:inline-flex"
                )}
              >
                <Icons.github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ModeToggle />
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
