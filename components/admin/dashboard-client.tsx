"use client";

import { useState } from "react";
import QuickActionCard from "@/components/cards/quick-action";
import CreateUserModal from "@/components/admin/modal/create-user";
import { Users, UserPlus, Activity, Settings } from "lucide-react";
interface AdminDashboardClientProps {
  metrics: any;
  users: any[];
}

export default function AdminDashboardClient({ metrics, users }: AdminDashboardClientProps) {
  const [createUserOpen, setCreateUserOpen] = useState(false);

  return (
    <>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <QuickActionCard
          title="Create User"
          description="Add a new user to the platform"
          icon={<UserPlus />}
          color="blue"
          onClick={() => setCreateUserOpen(true)}
        />
        <QuickActionCard
          title="View Reports"
          description="Analytics and insights"
          href="/admin/reports"
          icon={<Activity />}
          color="red"
        />
        <QuickActionCard
          title="System Settings"
          description="Configure platform settings"
          href="/admin/settings"
          icon={<Settings />}
          color="gray"
        />
        <QuickActionCard
          title="User Management"
          description="Manage existing users"
          href="/admin/users"
          icon={<Users />}
          color="purple"
        />
      </div>

      {/* Modal */}
      <CreateUserModal
        open={createUserOpen}
        onOpenChange={setCreateUserOpen}
      />
    </>
  );
}