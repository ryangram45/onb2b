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
    `${baseUrl}/api/admin/users/${id}/bank-transactions?limit=16&offset=0`,
    {
      cache: "no-store",
      headers: { cookie },
    }
  );

  let initialItems: any[] = [];
  let initialHasMore = false;
  if (res.ok) {
    const data = await res.json();
    const mapped = (data as any[]).map((t) => ({
      id: t.id,
      date: t.date ?? null,
      description: t.description,
      amount: t.amount,
      balance: t.balance,
      kind: "Bank" as const,
    }));
    initialHasMore = mapped.length === 16;
    initialItems = mapped.slice(0, 15);
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">All Transactions</h1>
      <AllTransactionsTable
        userId={id}
        fetchUrl={`/api/admin/users/${id}/bank-transactions`}
        itemKind="Bank"
        initialItems={initialItems}
        initialHasMore={initialHasMore}
      />
    </div>
  );
}
