"use server";

import AllTransactionsTable from "@/components/admin/all-transactions-table";
import PageBackHeader from "@/components/admin/page-back-header";
import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function AllCardTransactionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hdrs = await headers();
  const cookie = hdrs.get("cookie") ?? "";

  const res = await fetch(
    `${baseUrl}/api/admin/users/${id}/card-transactions?limit=16&offset=0`,
    { cache: "no-store", headers: { cookie } }
  );

  let initialItems: any[] = [];
  let initialHasMore = false;
  if (res.ok) {
    const data = await res.json();
    const mapped = (data as any[]).map((t) => ({
      id: t.id,
      date: t.date ?? null,
      description: t.merchant,
      amount: t.amount,
      balance: t.balance,
      kind: "Card" as const,
    }));
    initialHasMore = mapped.length === 16;
    initialItems = mapped.slice(0, 15);
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <PageBackHeader title="All Card Transactions" />
      <AllTransactionsTable
        userId={id}
        fetchUrl={`/api/admin/users/${id}/card-transactions`}
        itemKind="Card"
        initialItems={initialItems}
        initialHasMore={initialHasMore}
      />
    </div>
  );
}
