"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { navbarMainItems, navbarUtilityItems } from "../data";


export default function Navbar() {
  const pathname = usePathname();

  const isPersonalActive = pathname === "/" || pathname === "/personal" || !pathname.startsWith("/");

  const mobileTopLinks = [
    { label: "Enroll", href: "/enroll" },
    { label: "Schedule an appointment", href: "/schedule-appointment" },
    { label: "Get the app", href: "/get-the-app" },
    { label: "Help with home loan payments", href: "/home-loan-help" },
  ];

  return (
    <nav className="xl:border-b-3 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-gray-300">
      {/* Mobile bar */}
      <div className="xl:hidden">
        <div className="mx-auto px-4 py-2 flex items-center justify-between">
          {/* Left: menu + logo */}
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="group p-2 border border-transparent hover:border-onb2b-blue-800 transition-colors cursor-pointer text-muted-foreground"
                >
                  <Menu className="group-hover:text-onb2b-blue-900 h-6 w-6 " />
                </button>
              </SheetTrigger>
              <SheetContent side="left" showCloseButton={false} className="w-[75vw] sm:max-w-sm">
                <SheetHeader className="px-2 pt-4">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="px-2 py-2 space-y-6">
                  {/* Top quick links */}
                  <div className="space-y-3">
                    {mobileTopLinks.map((item) => (
                      <Link key={item.href} href={item.href} className="block px-2 py-1.5 text-onb2b-blue-800">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  {/* Business / Wealth Management*/}
                  <div className="space-y-3 border-t">
                    <Link href="/business" className="block px-2 py-1.5 text-onb2b-blue-800">
                      Business
                    </Link>
                    <div className="" />
                    <Link href="/wealth-management" className="block px-2 py-1.5 text-onb2b-blue-800">
                      Wealth Management
                    </Link>
                  </div>
                  {/* Bottom utility links */}
                  <div className="border-t" />
                  <div className="space-y-3">
                    <Link href="/security" className="block px-2 py-1.5 text-onb2b-blue-800">
                      Privacy &amp; Security
                    </Link>
                    <Link href="/about-us" className="block px-2 py-1.5 text-onb2b-blue-800">
                      About Us
                    </Link>
                    <Link href="/en-espanol" className="block px-2 py-1.5 text-onb2b-blue-800">
                      En español
                    </Link>
                    <Link href="/contact-us" className="block px-2 py-1.5 text-onb2b-blue-800">
                      Contact Us
                    </Link>
                    <Link href="/help" className="block px-2 py-1.5 text-onb2b-blue-800">
                      Help
                    </Link>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <SheetClose asChild>
                    <button
                      aria-label="Close menu"
                      className="group p-2 border border-transparent hover:border-onb2b-blue-900 active:border-onb2b-blue-900 text-muted-foreground hover:text-onb2b-blue-900 active:text-onb2b-blue-900 transition-colors cursor-pointer"
                    >
                      <X className="group-hover:text-onb2b-blue-900 h-5 w-5" />
                    </button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="inline-flex items-center">
              <span className="sr-only">Home</span>
              <Image
                src="/images/fullLogo.svg"
                alt="Bank of America"
                width={100}
                height={28}
                className="h-7 w-43"
              />
            </Link>
          </div>

          {/* Right: login + search */}
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="rounded-full h-8 px-4 border-onb2b-blue-900 shadow-none text-onb2b-blue-900 hover:text-onb2b2-blue-900 bg-transparent hover:bg-onb2b-blue-900 hover:text-white">
              <Link href="/login/sign-in">Log in</Link>
            </Button>
            <button
              aria-label="Search"
              className="group p-2 border border-transparent hover:border-onb2b-blue-800 transition-colors cursor-pointer"
            >
              <Search className="group-hover:text-onb2b-blue-800 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop nav */}
      <div className="hidden xl:block">
        <div className="mx-auto px-4 sm:px-6 lg:px-12 py-1">
          <div className="flex items-center justify-between">
            <NavigationMenu className="flex">
              <NavigationMenuList className="gap-1 lg:gap-8">
                {navbarMainItems.map((item) => {
                  const isActive =
                    (item.label === "Personal" && isPersonalActive) ||
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");

                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent",
                          "data-active:bg-transparent data-[state=open]:bg-transparent",
                          "rounded-none",
                          "group relative px-0 py-2 text-md font-light transition-colors",
                          "text-muted-foreground hover:text-onb2b-blue-800 hover:bg-transparent",
                          isActive && "text-onb2b-blue-900 font-light",
                          "after:absolute after:-bottom-1.5 after:left-1/2 after:right-1/2 after:h-0.5 after:bg-onb2b-blue-900 after:transition-all after:duration-300 after:origin-center",
                          isActive
                            ? "after:left-0 after:right-0 after:scale-x-100"
                            : "hover:after:left-0 hover:after:right-0 hover:after:scale-x-100"
                        )}
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu className="flex">
              <NavigationMenuList className="gap-1 lg:gap-8">
                {navbarUtilityItems.map((item, index) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent",
                          "data-active:bg-transparent data-[state=open]:bg-transparent",
                          "rounded-none",
                          "relative px-0 py-2 text-md font-light transition-colors",
                          "text-muted-foreground hover:text-onb2b-blue-600 hover:bg-transparent",
                          isActive && "text-onb2b-blue-900 font-light",
                          "after:absolute after:-bottom-1.5 after:left-1/2 after:right-1/2 after:h-0.5  after:bg-onb2b-blue-900 after:transition-all after:duration-300 after:origin-center",
                          isActive
                            ? "after:left-0 after:right-0 after:scale-x-100"
                            : "hover:after:left-0 hover:after:right-0 hover:after:scale-x-100",
                          index === 2 && "border-r-2 border-l-2 rounded-0 px-2"
                        )}
                      >
                        <Link href={item.href}>
                          <div className="flex items-center gap-3">
                            {item.icon && <item.icon size={20} className="" />}
                            {item.label}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
