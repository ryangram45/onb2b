import { MetricCard } from "@/components/cards/metrics/metric-card";
import { RecentUsersCard } from "@/components/admin/recent-users-card";
import { ActivityChart } from "@/components/admin/activity-chart";
import { getAdminMetrics } from "@/services/admin-metrics";
import { getUsers } from "@/services/get-users";
import { Users, UserCheck, UserPlus, DollarSign, } from "lucide-react";
import AdminDashboardClient from "@/components/admin/dashboard-client";

export const dynamic = 'force-dynamic';
export const revalidate = 0;


export default async function AdminDashboard() {
    const [metrics, users] = await Promise.all([
    getAdminMetrics(),
    getUsers(),
  ]);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-onb2b-blue-900 bg-clip-text ">
            Welcome back, Admin
          </h2>
          {/* <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your platform today.
          </p> */}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={metrics.totalUsers}
          icon={<Users className="h-4 w-4" />}
          trend={12}
        />
        <MetricCard
          title="Active Users"
          value={metrics.activeUsers}
          icon={<UserCheck className="h-4 w-4" />}
          trend={8}
        />
        <MetricCard
          title="Recent Signups"
          value={metrics.recentSignups}
          icon={<UserPlus className="h-4 w-4" />}
          trend={-3}
          trendLabel="from last week"
        />
        <MetricCard
          title="Total Transactions"
          value={1234}
          icon={<DollarSign className="h-4 w-4" />}
          trend={23}
        />
      </div>

      {/* Charts and Recent Users */}
      <div className="grid gap-4 md:grid-row-2">
        <ActivityChart />
      </div>

      <div className="flex flex-col xl:flex-row gap-6 xl:gap-7">
      {/* Your Recent Users Card */}
      <RecentUsersCard users={users} />
      <AdminDashboardClient  metrics={metrics} users={users} />
      </div>
    </div>
  );
}
