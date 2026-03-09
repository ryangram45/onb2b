    
"use client";
import React from 'react'
import HomeTabBar from './home-tab-bar'
import HomeNavBar from './home-navbar'
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Dashboardlayout( { children }: {children: React.ReactNode} ) {
  const pathname = usePathname();
  const isMakePassChildPath = (pathname || "").startsWith("/home/make-pass/");
  return (
    <SessionProvider>
      <section className="w-full h-full">
        {!isMakePassChildPath && <HomeNavBar />}
        {children}
        {!isMakePassChildPath && <HomeTabBar />}
      </section>
    </SessionProvider>
  )
}
