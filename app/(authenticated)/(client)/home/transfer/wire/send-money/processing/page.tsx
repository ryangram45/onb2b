"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatCurrency,
  generateConfirmationNumber,
} from "@/utils/string-utils";
 

type Recipient = {
  id: string;
  country: string;
  currency: string;
  firstName: string;
  lastName: string;
  recipientAddress?: string;
  city?: string;
  zipPostalCode?: string;
};

export default function WireProcessingPage() {
  const router = useRouter();
  const searchParameters = useSearchParams();

  const recipientId = searchParameters.get("recipientId") || "";
 
  const accountLabel = searchParameters.get("accountLabel") || "";
  const amountParam = searchParameters.get("amount") || "0";
 

  const amountNumber = useMemo(() => {
    const n = parseFloat(String(amountParam));
    return isNaN(n) ? 0 : n;
  }, [amountParam]);

  const [recipient, setRecipient] = useState<Recipient | null>(null);

  const confirmationNumber = useMemo(() => {
    const fromQuery = searchParameters.get("confirmationNumber") || "";
    return fromQuery || generateConfirmationNumber(10, 20);
  }, [searchParameters]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (recipientId) {
          const res = await fetch("/api/me/recipients");
          if (res.ok) {
            const list: Recipient[] = await res.json();
            const found = list.find((r) => r.id === recipientId) || null;
            if (mounted) setRecipient(found);
          }
        }
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, [recipientId]);

  const today = new Date();
  const dateSent = today.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });
  const dateAvailableDate = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
  const dateAvailable = dateAvailableDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });
 

  const fullName = recipient
    ? `${recipient.firstName} ${recipient.lastName}`.trim()
    : "";
  const addressLines = [
    recipient?.recipientAddress,
    recipient?.city,
    recipient?.zipPostalCode,
    recipient?.country,
  ].filter(Boolean);

  const handleShareClick = async () => {
    try {
      const shareData = {
        title: "Wire Transfer",
        text: `Wire of ${formatCurrency(amountNumber)} to ${fullName || "recipient"} is processing.`,
      };

      if (typeof navigator !== "undefined" && "share" in navigator) {
        await navigator.share(shareData);
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="mx-auto max-w-screen-md px-4 pb-28 pt-10">
      <div className="bg-white rounded-lg p-5 sm:p-6">
        <div className="flex flex-col items-center mt-4">
          <div className="flex items-center justify-center size-10 rounded-full border-2 border-green-600">
            <Check className="text-green-600 size-6" />
          </div>
          <p className="mt-3 text-lg font-semibold text-gray-900">
            Your wire is processing
          </p>
          <button
            className="mt-3 text-sm px-4 py-0.5 rounded-full bg-gray-200/60 text-onb2b-blue-950 font-semibold cursor-pointer"
            onClick={handleShareClick}
          >
            SHARE
          </button>
        </div>

        <div className="mt-4 border-y border-gray-200 divide-y divide-gray-200">
          <div className="flex items-center justify-between py-3">
            <span className="text-[0.95rem] text-gray-700">Date sent</span>
            <span className="text-[0.95rem] text-gray-900">{dateSent}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-[0.95rem] text-gray-700">Date available</span>
            <div className="text-right">
              <span className="text-[0.95rem] text-gray-900 block">
                {dateAvailable}
              </span>
              <span className="text-xs text-gray-500">
                May be available earlier
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-[0.95rem] text-gray-700">Confirmation #</span>
            <span className="text-[0.95rem] text-gray-900">
              {confirmationNumber || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-[0.95rem] text-gray-700">To</span>
            <span className="text-[0.95rem] text-gray-900">
              {fullName || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-[0.95rem] text-gray-700 block mb-1">
              Recipient address
            </span>
            <p className="text-[0.95rem] text-gray-900 text-right leading-snug">
              {addressLines.length ? (
                <>
                  {addressLines.map((line, index) => (
                    <span key={index} className="block">
                      {line}
                    </span>
                  ))}
                </>
              ) : (
                "—"
              )}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-[0.95rem] font-semibold text-gray-900">
            Your total transfer cost
          </h3>
          <div className="mt-2">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-[0.95rem] text-gray-700">You send</span>
              <span className="flex flex-col items-end">
                <span className="text-gray-900 font-medium">
                  {formatCurrency(amountNumber)} USD
                </span>
                {accountLabel && (
                  <span className="text-xs text-gray-600">{accountLabel}</span>
                )}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-[0.95rem] text-gray-700">
                Transfer fees
              </span>
              <span className="text-gray-900">+ {formatCurrency(30)} USD</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-[0.95rem] font-semibold text-gray-900">
                Total cost
              </span>
              <span className="text-gray-900 font-semibold">
                {formatCurrency(amountNumber + 30)} USD
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 mx-auto border-t border-gray-200 flex items-center justify-center py-2 px-4 sm:px-6 max-w-screen-md z-50 bg-white/50">
        <Button
          className="rounded-full bg-onb2b-blue-950 font-semibold tracking-wide hover:bg-onb2b-blue-1000 cursor-pointer px-7"
          onClick={() => router.push("/home/account")}
        >
          DONE
        </Button>
      </div>
    </div>
  );
}
