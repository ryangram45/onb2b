"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type AccountTypeOption = "Personal" | "Business";
type ReceiverAccountOption = "My account" | "Someone else's account";

export default function AccountTypeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCountryName = useMemo(() => searchParams.get("country") || "", [searchParams]);
  const selectedCurrencyCode = useMemo(() => searchParams.get("currency") || "", [searchParams]);

  const [selectedAccountType, setSelectedAccountType] = useState<AccountTypeOption | undefined>(undefined);
  const [selectedReceiverAccount, setSelectedReceiverAccount] = useState<ReceiverAccountOption | undefined>(undefined);

  const isNextEnabled = Boolean(selectedAccountType && selectedReceiverAccount);

  const handleCancelClick = () => {
    const query = selectedCountryName ? `?country=${encodeURIComponent(selectedCountryName)}` : "";
    router.push(`/home/make-pass/wire/currency${query}`);
  };

  const handleNextClick = () => {
    if (!isNextEnabled) return;
    const params = new URLSearchParams();
    if (selectedCountryName) params.set("country", selectedCountryName);
    if (selectedCurrencyCode) params.set("currency", selectedCurrencyCode);
    params.set("accountType", selectedAccountType!);
    params.set("receiverAccount", selectedReceiverAccount!);
    router.push(`/home/make-pass/wire/add-person?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-screen-md px-4 pb-28 pt-20">
      <div className="bg-white rounded-lg p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900 tracking-wide mb-4">
          What type of account are you sending to?
        </h2>

        <div className="flex flex-col gap-3 mb-6">
          {(["Personal", "Business"] as AccountTypeOption[]).map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer"
              onClick={() => setSelectedAccountType(option)}
            >
              <Checkbox checked={selectedAccountType === option} onCheckedChange={() => setSelectedAccountType(option)} className="sr-only" />
              <span className={`flex items-center justify-center size-6 rounded-full border-2 ${selectedAccountType === option ? "border-onb2b-blue-950" : "border-blue-900"}`}>
                <span className={`size-3.5 rounded-full ${selectedAccountType === option ? "bg-onb2b-blue-950" : "bg-transparent"}`} />
              </span>
              <span className="text-[0.98rem] text-gray-900">{option}</span>
            </label>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-gray-900 tracking-wide mb-4">
          Whose account is it?
        </h2>

        <div className="flex flex-col gap-3">
          {(["My account", "Someone else's account"] as ReceiverAccountOption[]).map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer"
              onClick={() => setSelectedReceiverAccount(option)}
            >
              <Checkbox checked={selectedReceiverAccount === option} onCheckedChange={() => setSelectedReceiverAccount(option)} className="sr-only" />
              <span className={`flex items-center justify-center size-6 rounded-full border-2 ${selectedReceiverAccount === option ? "border-onb2b-blue-950" : "border-blue-900"}`}>
                <span className={`size-3.5 rounded-full ${selectedReceiverAccount === option ? "bg-onb2b-blue-950" : "bg-transparent"}`} />
              </span>
              <span className="text-[0.98rem] text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 mx-auto border-t border-gray-200 flex items-center justify-between py-2 px-4 sm:px-6 max-w-screen-md z-50 bg-white/50">
        <Button variant="whiteGhost" onClick={handleCancelClick} className="flex-1 rounded-full text-onb2b-blue-950 no-underline bg-white font-semibold tracking-wide cursor-pointer">
          CANCEL
        </Button>
        <Button disabled={!isNextEnabled} onClick={handleNextClick} className="flex-1 rounded-full bg-onb2b-blue-950 font-semibold tracking-wide hover:bg-onb2b-blue-1000 cursor-pointer">
          NEXT
        </Button>
      </div>
    </div>
  );
}