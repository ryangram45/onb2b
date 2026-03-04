"use client";
import React, { useEffect, useState } from "react";
import { RiInformation2Line } from "react-icons/ri";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const CreditCardHistory = () => {
  const [showAccountNumber, setShowAccountNumber] = useState(false);
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/string-utils";

const CreditCardHistory = () => {
  const [visibleTransactions, setVisibleTransactions] = useState(10);
  const [card, setCard] = useState<{
    cardName: string;
    cardNumber: string;
    balance: number;
    limit: number;
    expiryDate?: string;
  } | null>(null);
  const [transactions, setTransactions] = useState<Array<{
    date: string | null;
    amount: number;
    type?: string;
    currentBalance: number;
    merchant?: string;
  }>>([]);

  useEffect(() => {
    async function load() {
      const [cardRes, txRes] = await Promise.all([
        fetch("/api/me/credit-card"),
        fetch("/api/me/card-transactions?limit=200"),
      ]);
      if (cardRes.ok) {
        setCard(await cardRes.json());
      }
      if (txRes.ok) {
        setTransactions(await txRes.json());
      }
    }
    load();
  }, []);

  // const formatCurrency = (amount: number) =>
  //   new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  const limit = card?.limit ?? 0;
  const usedAmount = Math.max(0, Math.abs(card?.balance ?? 0));
  const availableCredit = Math.max(0, limit - usedAmount);
  const usedPct = limit > 0 ? Math.min(100, Math.round((usedAmount / limit) * 100)) : 0;
  const hasNegativeBalance = (card?.balance ?? 0) < 0;

  const loadMoreTransactions = () => {
    setVisibleTransactions(
      (prevVisibleTransactions) => prevVisibleTransactions + 10,
    );
  };
  return (
    <div className="pt-42 pb-15 w-full max-w-3xl mx-auto">
      <h1 className="text-[0.67rem] font-semibold flex justify-end px-8 pb-1">
        Provided by Bank of America
      </h1>
      <div className="bg-gray-100 h-full w-full pb-6 flex flex-col justify-center gap-7">
        <div className="flex justify-between px-8 sm:px-17 text-[1.04rem] items-center">
          <h1 className="w-full max-w-[12rem] font-semibold mt-6 text-[1.188rem]">
            {card?.cardName ?? "—"}
          </h1>
          <Button  className="text-blue-800 cursor-pointer bg-transparent hover:bg-transparent">EDIT</Button>
        </div>
        <h1 className="flex flex-col items-center font-semibold text-[1.788rem]">
          {card ? formatCurrency(card.balance) : "—"}{" "}
          <span className="text-[0.7rem] font-normal flex items-center justify-center gap-1">
            Current balance{" "}
            <RiInformation2Line size={19} color="#1e40af" cursor="pointer" />
          </span>
        </h1>
        {hasNegativeBalance && (
          <div className="flex justify-center mt-1">
            <Button
              type="button"
              aria-label="Pay current balance"
              className="rounded-full px-6 py-2 font-semibold shadow-sm bg-onb2b-blue-950 hover:bg-onb2b-blue-950 cursor-pointer text-white"
            >
              PAY
            </Button>
          </div>
        )}

        <div className="w-full h-full max-w-[25rem] sm:max-w-[38rem] lg:max-w-[43rem] place-self-center flex flex-col rounded-lg px-4 pb-3">
          {hasNegativeBalance && (
            <p className="text-center text-[0.85rem] text-black mb-3 tracking-wide">
              Help stay on track{" "}
              <span className="text-onb2b-blue-800 cursor-pointer">Set up recurring payments</span>
            </p>
          )}

        <p className="text-muted-foreground mt-4">Total Available Credit - {formatCurrency(availableCredit)}</p>
          <div className="mt-4 flex items-center justify-between text-gray-700 text-[0.92rem]">
            <span className="flex items-center gap-1 text-muted-foreground ml-auto">
              {formatCurrency(limit)}
              <Triangle className="h-3 w-3 text-gray-500 rotate-180" />
            </span>
          </div>

          <div className="mt-2">
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-onb2b-blue-600"
                style={{ width: `${usedPct}%` }}
              />
            </div>
          </div>

          <div className="mt-10 shadow-xs shadow-gray-200/50 flex items-center justify-between bg-white rounded-xl px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 grid place-items-center rounded-md">
                <Lock className="h-6 w-6 text-green-600" />
              </span>
              <span className="text-[0.98rem]">Manage Lock Status</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>

          {hasNegativeBalance && (
            <div className="mt-3 rounded-xl bg-white shadow-xs sahdow-gray-200/50">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[0.98rem]">Remaining Min Payment Due</span>
                <div className="text-right">
                  <p className="text-[0.98rem]">{formatCurrency(0)}</p>
                  <p className="text-[0.78rem] text-gray-500">due Aug 18</p>
                </div>
              </div>
              <div className="border-t border-gray-200" />
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[0.98rem]">Remaining Statement Balance</span>
                <span className="text-[0.98rem] font-semibold">
                  {card ? formatCurrency(card.balance) : "—"}
                </span>
              </div>
            </div>
          )}
        {/* history */}
        <div className="mt-14 bg-white flex flex-col rounded-lg px-1">
          <h1 className="flex items-center justify-between px-4 py-2 text-gray-600 text-[0.918rem] font-medium">
            RECENT TRANSACTIONS
          </h1>
          {transactions
            .slice(0, visibleTransactions)
            .map((transaction, index) => (
              <div
                key={index}
                className="flex justify-between px-4 py-2 border-b border-gray-300"
              >
                <div className="flex flex-col">
                  <h1 className="text-[0.778rem] text-gray-700">
                    {transaction.date}
                  </h1>
                  <h1 className="w-full max-w-[13.799rem] text-[1.043rem]">
                    {transaction.merchant || transaction.type}
                  </h1>
                </div>
                <div className="text-center py-2">
                  <h1 className="text-blue-800 font-semibold text-[1.097rem] text-end">
                    {formatCurrency(transaction.amount)}
                  </h1>
                  <h1 className="text-gray-700 text-[0.802rem] text-end">
                    {formatCurrency(transaction.currentBalance)}
                  </h1>
                </div>
              </div>
            ))}
          {visibleTransactions < transactions.length && (
            <button
              className="w-full py-2 text-center text-blue-800 cursor-pointer active:text-blue-900"
              onClick={loadMoreTransactions}
            >
              Load More Transactions
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardHistory;
