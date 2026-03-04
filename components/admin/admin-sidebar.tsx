"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { adminNav } from "./admin-nav";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNav.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.url}>
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-[0.99rem]",
                        isActive
                          ? "bg-onb2b-blue-900 text-white hover:bg-onb2b-blue-800"
                          : "hover:bg-muted"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5",
                          isActive && "text-white"
                        )}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <Link href="/admin/dashboard" className="block">
          <Image
            src="/images/fullLogo.svg"
            alt="ONB2B"
            width={120}
            height={40}
            className="object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
        </Link>
        <p className="text-xs text-muted-foreground mt-2">
          v1.0.0 • Admin Panel
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}