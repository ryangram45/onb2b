 "use client";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/admin-header";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { useCallback } from "react";

type AdminLayoutProps = {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps ) {

    return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AdminSidebar />
        <ContentArea>{children}</ContentArea>
      </div>
    </SidebarProvider>
    );
}

function ContentArea({ children }: { children: React.ReactNode }) {
  const { openMobile, setOpenMobile, isMobile } = useSidebar();
  const onContentClick = useCallback(() => {
    if (isMobile && openMobile) setOpenMobile(false);
  }, [isMobile, openMobile, setOpenMobile]);

  return (
    <div
      className={`flex-1 flex flex-col transition-transform duration-200 ${isMobile && openMobile ? "translate-x-64" : ""}`}
      onClick={onContentClick}
    >
      <AdminHeader />
      <main className="flex-1 overflow-auto p-6 bg-muted/30">{children}</main>
    </div>
  );
}
