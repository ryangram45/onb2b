"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/string-utils";

interface TransactionListClientProps {
  userId: string;
  type: "bank" | "card";
  transactions: {
    id: string;
    date: string | null;
    amount: number;
    description?: string;
    merchant?: string;
    balance: number;
  }[];
}

export default function TransactionListClient({
  userId,
  type,
  transactions,
}: TransactionListClientProps) {
  const router = useRouter();

  return (
    <div className="space-y-3">
      {transactions.map((tx, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
          onClick={() => router.push(`/admin/users/${userId}/transaction/${tx.id}`)}
        >
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {type === "bank" ? tx.description : tx.merchant}
            </p>
            <p className="text-xs text-muted-foreground">{tx.date}</p>
          </div>
          <div className="text-right">
            <p
              className={cn(
                "font-semibold",
                type === "bank" && tx.amount > 0 ? "text-green-600" : "text-onb2b-red-450"
              )}
            >
              {type === "bank" && tx.amount > 0 ? "+" : ""}{formatCurrency(tx.amount)}
            </p>
            <p className="text-xs text-muted-foreground">
              Balance: {formatCurrency(tx.balance)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
