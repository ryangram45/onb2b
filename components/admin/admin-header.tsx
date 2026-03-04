"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Bell, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AdminHeader() {
  return (
    <header className="h-16 border-b bg-white dark:bg-gray-950 px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Left side - Logo for mobile */}
      <div className="">
        <Link href="/admin/dashboard">
          <Image
            src="/images/fullLogo.svg"
            alt="ONB2B"
            width={210}
            height={60}
            className="object-contain"
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-onb2b-red-450" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarFallback className="bg-onb2b-blue-100 text-onb2b-blue-800">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 focus:text-red-600"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}