
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/admin-header";
import { SidebarProvider } from "@/components/ui/sidebar";

type AdminLayoutProps = {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps ) {

    return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 overflow-auto p-6 bg-muted/30"> {children} </main>
        </div>
      </div>
    </SidebarProvider>
    );
}