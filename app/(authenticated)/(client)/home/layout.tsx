    
"use client";
import React from 'react'
import HomeTabBar from './home-tab-bar'
import HomeNavBar from './home-navbar'
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Dashboardlayout( { children }: {children: React.ReactNode} ) {
  const pathname = usePathname();
  const isTransferChildPath = (pathname || "").startsWith("/home/transfer/");
  return (
    <SessionProvider>
      <section className="w-full h-full">
        {!isTransferChildPath && <HomeNavBar />}
        {children}
        {!isTransferChildPath && <HomeTabBar />}
      </section>
    </SessionProvider>
  )
}
