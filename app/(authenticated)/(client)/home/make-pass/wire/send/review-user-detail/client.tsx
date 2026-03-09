"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InfoNote from "@/components/common/info-note";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/utils/string-utils";
import { countryFlagByName } from "@/app/(authenticated)/(client)/home/make-pass/wire/data";

type Recipient = {
  id: string;
  country: string;
  currency: string;
  accountType: string;
  receiverAccount: string;
  firstName: string;
  lastName: string;
  nickName?: string;
  recipientAddress?: string;
  city?: string;
  zipPostalCode?: string;
  swiftBic?: string;
  recipientAccountNumber?: string;
};

export default function ReviewWireDetailClient() {
  const router = useRouter();
  const searchParameters = useSearchParams();

  const recipientId = searchParameters.get("recipientId") || "";
  const country = searchParameters.get("country") || "";
  const currency = searchParameters.get("currency") || "USD";
  const accountId = searchParameters.get("accountId") || "";
  const accountLabelFromQuery = searchParameters.get("accountLabel") || "";
  const note = searchParameters.get("note") || "";
  const amountParam = searchParameters.get("amount") || "0";

  const amountNumber = useMemo(() => {
    const numeric = parseFloat(String(amountParam));
    return isNaN(numeric) ? 0 : numeric;
  }, [amountParam]);

  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [accountLabel, setAccountLabel] = useState<string>(
    accountLabelFromQuery,
  );
  const [authorizationAccepted, setAuthorizationAccepted] =
    useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (recipientId) {
          const res = await fetch("/api/me/recipients");
          if (res.ok) {
            const recipientList: Recipient[] = await res.json();
            const foundRecipient =
              recipientList.find((candidate) => candidate.id === recipientId) ||
              null;
            if (mounted) setRecipient(foundRecipient);
          }
        }
        if (!accountLabel && accountId) {
          const accountsResponse = await fetch("/api/me/accounts");
          if (accountsResponse.ok) {
            const accountsPayload = await accountsResponse.json();
            const retrievedAccount = (accountsPayload?.accounts || []).find(
              (acc: any) => acc.id === accountId,
            );
            if (mounted && retrievedAccount)
              setAccountLabel(
                retrievedAccount.product === "AdvPlus Banking"
                  ? "My Checking"
                  : "My Saving",
              );
          }
        }
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, [recipientId, accountId, accountLabel]);

  const today = new Date();
  const reqDate = today.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });
  const totalCost = amountNumber + 30;

  const fullName = recipient
    ? `${recipient.firstName} ${recipient.lastName}`.trim()
    : "";
  const addressLines = [
    recipient?.recipientAddress,
    recipient?.city,
    recipient?.zipPostalCode,
    recipient?.country,
  ].filter(Boolean);

  const handleSendButtonClick = () => {
    const params = new URLSearchParams();
    if (recipientId) params.set("recipientId", recipientId);
    if (country) params.set("country", country);
    if (currency) params.set("currency", currency);
    if (accountId) params.set("accountId", accountId);
    params.set("amount", String(amountNumber));
    if (accountLabel) params.set("accountLabel", accountLabel);
    if (note) params.set("note", note);
    router.push(`/home/make-pass/wire/send/otp?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-screen-md px-4 pb-28 pt-20">
      <div className="bg-white rounded-lg p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900 tracking-wide">
          Review wire details
        </h2>

        <InfoNote>
          <p>
            Any wire sent after 5 p.m. ET will be processed the next business
            day.
          </p>
        </InfoNote>

        <div className="mt-4 border-y border-gray-200 divide-y divide-gray-200">
          <div className="flex items-center justify-between py-3">
            <span className="text-[0.95rem] text-gray-700">
              Transfer request date
            </span>
            <span className="text-[0.95rem] text-gray-900">{reqDate}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-[0.95rem] text-gray-700">Send to</span>
            <span className="flex items-center gap-2 text-[0.95rem] font-medium text-gray-900">
              <span>{(country || "").toUpperCase()}</span>
              {country && (
                <span className="text-xl leading-none">
                  {countryFlagByName[country] || ""}
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-[0.95rem] text-gray-700">Recipient</span>
            <span className="text-[0.95rem] font-medium text-onb2b-blue-950">
              {fullName || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-[0.95rem] text-gray-700 block mb-1">
              Recipient address
            </span>
            <p className="text-[0.95rem] text-gray-900 leading-snug text-right">
              {addressLines.length ? (
                <>
                  {addressLines.map((line, i) => (
                    <span key={i} className="block">
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
              <span className="text-[0.95rem] text-gray-700">
                Transfer amount
              </span>
              <span className="flex flex-col items-end">
                <span className="text-onb2b-blue-950 font-medium">
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
                {formatCurrency(totalCost)} USD
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 px-4">
        <label className="flex items-start gap-3">
          <Checkbox
            checked={authorizationAccepted}
            onCheckedChange={(val) => setAuthorizationAccepted(Boolean(val))}
            className="size-6 rounded-full border-2 data-[state=checked]:bg-onb2b-blue-900 data-[state=checked]:border-onb2b-blue-900 shadow-none cursor-pointer"
            aria-label="Authorize transfer terms"
          />
          <span className="text-sm text-gray-700 leading-snug">
            I authorize this payment & have read and agree to the transfer
            terms, including exchange rate, fees & taxes.
          </span>
        </label>
      </div>

      <div className="fixed bottom-0 left-0 right-0 mx-auto border-t border-gray-200 flex items-center justify-between py-2 px-4 sm:px-6 max-w-screen-md z-50 bg-white/50">
        <Button
          variant="whiteGhost"
          onClick={() => router.back()}
          className="flex-1 rounded-full text-onb2b-blue-950 no-underline bg-white font-semibold tracking-wide cursor-pointer"
        >
          CANCEL
        </Button>
        <Button
          disabled={!authorizationAccepted}
          onClick={handleSendButtonClick}
          className="flex-1 rounded-full bg-onb2b-blue-950 font-semibold tracking-wide hover:bg-onb2b-blue-1000 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          SEND
        </Button>
      </div>
    </div>
  );
}
