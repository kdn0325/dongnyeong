"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { Icons } from "./Icons";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">토글 테마</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="px-4">
        <SheetTitle className="sr-only">모바일 내비게이션</SheetTitle>
        <MobileLink
          href="/"
          onOpenChange={setOpen}
          className="flex items-center"
        >
          <Icons.logo className="mr-2 h-4 m-4" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>

        <div className="flex flex-col gap-3 mt-3">
          <MobileLink onOpenChange={setOpen} href="/blog">
            Blog
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/about">
            About
          </MobileLink>
          <Link target="_blank" rel="noreferrer" href={siteConfig.link.github}>
            Github
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        onOpenChange?.(false);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
