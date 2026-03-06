"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/string-utils";

type TxItem = {
  id: string;
  date: string | null;
  description?: string;
  amount: number;
  balance: number;
  kind: "Bank" | "Card";
};

export default function AllTransactionsTable({
  userId,
  fetchUrl,
  itemKind,
  initialItems,
  initialHasMore,
}: {
  userId: string;
  fetchUrl: string;
  itemKind: "Bank" | "Card";
  initialItems: TxItem[];
  initialHasMore: boolean;
}) {
  const router = useRouter();
  const [items, setItems] = useState<TxItem[]>(initialItems);
  const [hasMore, setHasMore] = useState<boolean>(initialHasMore);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    if (loading || !hasMore) return;
    try {
      setLoading(true);
      const res = await fetch(`${fetchUrl}?limit=16&offset=${items.length}`);
      if (!res.ok) return;
      const data = await res.json();
      // data is an array for both bank and card endpoints
      const mapped: TxItem[] = (data as any[]).map((t) => ({
        id: t.id,
        date: t.date ?? null,
        description: itemKind === "Bank" ? t.description : t.merchant,
        amount: t.amount,
        balance: t.balance,
        kind: itemKind,
      }));
      const page = mapped.slice(0, 15);
      setItems((prev) => [...prev, ...page]);
      setHasMore(mapped.length === 16);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setItems(initialItems);
    setHasMore(initialHasMore);
  }, [fetchUrl, itemKind, initialItems, initialHasMore]);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader className="bg-onb2b-blue-50 dark:bg-onb2b-blue-950/20">
          <TableRow>
            <TableHead className="text-onb2b-blue-900 dark:text-onb2b-blue-300 font-semibold">
              Date
            </TableHead>
            <TableHead className="text-onb2b-blue-900 dark:text-onb2b-blue-300 font-semibold">
              Description
            </TableHead>
            <TableHead className="text-onb2b-blue-900 dark:text-onb2b-blue-300 font-semibold">
              Amount
            </TableHead>
            <TableHead className="text-onb2b-blue-900 dark:text-onb2b-blue-300 font-semibold">
              Current Balance
            </TableHead>
            <TableHead className="text-onb2b-blue-900 dark:text-onb2b-blue-300 font-semibold">
              Type
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((tx) => (
            <TableRow
              key={tx.id}
              className="hover:bg-onb2b-blue-50/50 dark:hover:bg-onb2b-blue-950/20 transition-colors cursor-pointer"
              onClick={() => router.push(`/admin/users/${userId}/transaction/${tx.id}`)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/admin/users/${userId}/transaction/${tx.id}`);
                }
              }}
            >
              <TableCell className="whitespace-nowrap">{tx.date ?? "—"}</TableCell>
              <TableCell className="max-w-[420px] truncate">{tx.description ?? "—"}</TableCell>
              <TableCell
                className={cn(
                  tx.amount >= 0 ? "text-emerald-600" : "text-red-600",
                  "font-medium"
                )}
              >
                {formatCurrency(tx.amount)}
              </TableCell>
              <TableCell>{formatCurrency(tx.balance)}</TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    tx.kind === "Bank"
                      ? "bg-onb2b-blue-100 text-onb2b-blue-800 dark:bg-onb2b-blue-900 dark:text-onb2b-blue-300"
                      : "bg-onb2b-red-100 text-onb2b-red-800 dark:bg-onb2b-red-900 dark:text-onb2b-red-300"
                  )}
                >
                  {tx.kind}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center">
        {hasMore ? (
          <Button
            onClick={loadMore}
            disabled={loading}
            className="bg-onb2b-blue-800 hover:bg-onb2b-blue-800/90 text-white cursor-pointer"
          >
            {loading ? "Loading..." : "Show More"}
          </Button>
        ) : (
          <Button variant="ghost" disabled className="cursor-default">
            No More Transactions
          </Button>
        )}
      </div>
    </div>
  );
}
