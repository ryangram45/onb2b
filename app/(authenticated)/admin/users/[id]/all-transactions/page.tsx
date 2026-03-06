"use server";

import AllTransactionsTable from "@/components/admin/all-transactions-table";
import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function AllTransactionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hdrs = await headers();
  const cookie = hdrs.get("cookie") ?? "";

  const res = await fetch(
    `${baseUrl}/api/admin/users/${id}/all-transactions?limit=15&offset=0`,
    {
      cache: "no-store",
      headers: { cookie },
    }
  );

  let initialItems: any[] = [];
  let initialHasMore = false;
  if (res.ok) {
    const data = await res.json();
    initialItems = data.items ?? [];
    initialHasMore = Boolean(data.hasMore);
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">All Transactions</h1>
      <AllTransactionsTable
        userId={id}
        initialItems={initialItems}
        initialHasMore={initialHasMore}
      />
    </div>
  );
}
