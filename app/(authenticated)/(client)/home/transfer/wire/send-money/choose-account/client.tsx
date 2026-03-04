 "use client";
 
 import { useEffect, useMemo, useRef, useState } from "react";
 import { useRouter, useSearchParams } from "next/navigation";
 import SecureFooter from "@/components/common/secure-footer";
 import { Button } from "@/components/ui/button";
 import { countryFlagByName } from "@/app/(authenticated)/(client)/home/transfer/wire/data";
 import { Input } from "@/components/ui/input";
 import AccountsSelector, { Account } from "@/components/wire/accounts-selector";
 import InfoNote from "@/components/common/info-note";
 import { formatCurrency } from "@/utils/string-utils";
 
 export default function ChooseAccountClient() {
   const router = useRouter();
   const searchParams = useSearchParams();
 
   const recipientName = useMemo(() => searchParams.get("recipientName") || "", [searchParams]);
   const country = useMemo(() => searchParams.get("country") || "", [searchParams]);
   const currency = useMemo(() => searchParams.get("currency") || "", [searchParams]);
   const recipientId = useMemo(() => searchParams.get("recipientId") || "", [searchParams]);
   const [showAccounts, setShowAccounts] = useState(false);
   const [selectedAccountId, setSelectedAccountId] = useState<string>("");
   const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
   const [phase, setPhase] = useState<"choose" | "amount" | "summary">("choose");
   const [amount, setAmount] = useState<string>("");
   const amountInputRef = useRef<HTMLInputElement>(null);
   const [desiredCaret, setDesiredCaret] = useState<number | null>(null);
   const [additionalInfo, setAdditionalInfo] = useState<string>("");
 
   const numericAmount = useMemo(() => {
     const v = parseFloat(amount.replace(/[^\d.]/g, "").trim());
     return isNaN(v) ? 0 : v;
   }, [amount]);
 
   const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const inputValue = e.target.value;
     const caretPos = e.target.selectionStart ?? inputValue.length;
     const digitsBeforeCaret = inputValue.slice(0, caretPos).replace(/[^\d]/g, "").length;
 
     const cleaned = inputValue.replace(/[^\d.]/g, "").replace(/(\..*?)\..*/g, "$1");
     const [wholeRaw = "", fracRaw = ""] = cleaned.split(".");
     const wholeWithCommas = (wholeRaw || "0").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     const formatted =
       "$" + wholeWithCommas + (cleaned.includes(".") ? "." + fracRaw : "");
 
     let newCaretIndex = formatted.length;
     let digitCount = 0;
     for (let i = 0; i < formatted.length; i++) {
       if (/\d/.test(formatted[i])) {
         digitCount++;
       }
       if (digitCount >= digitsBeforeCaret) {
         newCaretIndex = i + 1;
         break;
       }
     }
 
     if (cleaned === "") {
       setAmount("");
       setDesiredCaret(0);
       return;
     }
     setAmount(formatted);
     setDesiredCaret(newCaretIndex);
   };
 
   const onAmountBlur = () => {
     if (!amount) return;
     const val = parseFloat(amount.replace(/[^\d.]/g, ""));
     if (isNaN(val)) return;
     setAmount(formatCurrency(val));
   };
 
   useEffect(() => {
     if (desiredCaret !== null && amountInputRef.current) {
       try {
         amountInputRef.current.setSelectionRange(desiredCaret, desiredCaret);
       } catch {}
     }
   }, [desiredCaret, amount]);
 
   useEffect(() => {
     if (desiredCaret !== null) {
       queueMicrotask(() => {
         setDesiredCaret(null);
       });
     }
   }, [desiredCaret]);
 
   const handleCancelClick = () => {
     router.push("/home/transfer/wire/send-money");
   };
 
   const handleNextClick = () => {
     if (showAccounts) {
       if (!selectedAccountId) return;
       setShowAccounts(false);
       setPhase("amount");
       return;
     }
     if (phase === "amount") {
       if (!selectedAccountId || numericAmount <= 0) return;
       setPhase("summary");
       return;
     }
     if (phase === "summary") {
       if (!selectedAccountId || numericAmount <= 0 || !additionalInfo.trim()) return;
       const params = new URLSearchParams();
       if (recipientId) params.set("recipientId", recipientId);
       if (country) params.set("country", country);
       if (currency) params.set("currency", currency);
       params.set("accountId", selectedAccountId);
       params.set("amount", String(numericAmount));
       if (selectedAccount?.label) params.set("accountLabel", selectedAccount.label);
       params.set("note", additionalInfo.trim());
       router.push(`/home/transfer/wire/send-money/review-wire-detail?${params.toString()}`);
       return;
     }
   };
 
   const isNextDisabled = showAccounts
     ? !selectedAccountId
     : phase === "amount"
     ? numericAmount <= 0
     : phase === "summary"
     ? !additionalInfo.trim()
     : true;
 
   return (
     <div className="mx-auto max-w-screen-md px-4 pb-28 pt-20">
       <div className="bg-white rounded-lg p-5 sm:p-6">
         {showAccounts ? (
           <AccountsSelector
             onSelected={(account) => {
               setSelectedAccountId(account.id);
               setSelectedAccount(account);
             }}
           />
         ) : (
           <>
             <h2 className="text-xl font-semibold text-gray-900 tracking-wide">Wire details</h2>
             <div className="mt-4 border-y border-gray-200 divide-y divide-gray-200">
               <div className="flex items-center justify-between py-3">
                 <span className="text-[0.95rem] text-gray-700">Recipient</span>
                 <span className="text-[0.95rem] font-medium text-gray-900">
                   {recipientName || "—"}
                 </span>
               </div>
               <div className="flex items-center justify-between py-3">
                 <span className="text-[0.95rem] text-gray-700">Send to</span>
                 <span className="flex items-center gap-2 text-[0.95rem] font-medium text-gray-900">
                   <span>{country || "—"}</span>
                   {country && <span className="text-xl leading-none">{countryFlagByName[country] || ""}</span>}
                 </span>
               </div>
               <div className="flex items-center justify-between py-3">
                 <span className="text-[0.95rem] text-gray-700">From</span>
                 {selectedAccount ? (
                   <button
                     className="px-3 py-1 rounded-md text-onb2b-blue-950 font-medium cursor-pointer"
                     onClick={() => setShowAccounts(true)}
                   >
                     {selectedAccount.label}
                   </button>
                 ) : (
                   <button
                     className="px-3 py-1 rounded-md text-onb2b-blue-950 font-medium cursor-pointer"
                     onClick={() => setShowAccounts(true)}
                   >
                     Choose account
                   </button>
                 )}
               </div>
             </div>
             {phase === "amount" && (
               <div className="mt-8">
                 <h3 className="text-[0.95rem] font-semibold text-gray-900">How much?</h3>
                 <div className="mt-2 border-y border-gray-200 divide-y divide-gray-200">
                   <div className="flex items-center justify-between py-3">
                     <span className="text-[0.95rem] text-gray-700">Transfer amount</span>
                     <div className="w-40">
                       <Input
                         ref={amountInputRef}
                         inputMode="decimal"
                         placeholder="0.00"
                         value={amount}
                         onChange={onAmountChange}
                         onBlur={onAmountBlur}
                         className="w-full text-right border-none rounded-none shadow-none outline-none focus-visible:ring-0 focus-visible:border-b focus-visible:border-onb2b-blue-950 bg-transparent placeholder:text-onb2b-blue-950 placeholder:font-medium text-onb2b-blue-950 caret-onb2b-blue-950 px-0.5 h-auto py-1"
                       />
                     </div>
                   </div>
                 </div>
                 <InfoNote>
                   <p>
                     Wire limits: You can send higher dollar amounts when enrolled in Secured Transfer
                   </p>
                 </InfoNote>
               </div>
             )}
             {phase === "summary" && (
               <div className="mt-4">
                 <div>
                   <div className="flex items-center justify-between py-3 border-b border-gray-200">
                     <span className="text-[0.95rem] text-gray-700">Transfer amount</span>
                     <span className="text-onb2b-blue-950 font-medium">
                       {formatCurrency(numericAmount)}
                     </span>
                   </div>
                   <div className="flex items-center justify-between py-3 border-b border-gray-200">
                     <span className="text-[0.95rem] text-gray-700">Transfer fees</span>
                     <span className="text-gray-900">$30.00</span>
                   </div>
                   <div className="flex items-center justify-between py-3 border-b border-gray-200">
                     <span className="text-[0.95rem] text-gray-700">Transfer amount</span>
                     <span className="text-gray-900">
                       {formatCurrency(numericAmount)} USD
                     </span>
                   </div>
                   <div className="flex items-center justify-between py-3">
                     <span className="text-[0.95rem] font-semibold text-gray-900">Total cost</span>
                     <span className="text-gray-900 font-semibold">
                       {formatCurrency(numericAmount + 30)}
                     </span>
                   </div>
                 </div>
                 <div className="mt-6">
                   <h3 className="text-[0.95rem] font-semibold text-gray-900">Add any additional information?</h3>
                   <div className="mt-2 border-y border-gray-200 py-2">
                     <p className="text-xs text-gray-600">Instructions for recipient bank (optional)</p>
                     <div className="">
                       <Input
                         placeholder="Home closing"
                         value={additionalInfo}
                         onChange={(e) => setAdditionalInfo(e.target.value)}
                         className="w-full border-none rounded-none shadow-none outline-none focus-visible:ring-0 focus-visible:border-b focus-visible:border-onb2b-blue-950 bg-transparent placeholder:text-onb2b-blue-950 placeholder:font-medium text-gray-900 px-0 py-1"
                       />
                     </div>
                   </div>
                 </div>
               </div>
             )}
           </>
         )}
       </div>
 
       <SecureFooter />
 
       <div className="fixed bottom-0 left-0 right-0 mx-auto border-t border-gray-200 flex items-center justify-between py-2 px-4 sm:px-6 max-w-screen-md z-50 bg-white/50">
         <Button variant="whiteGhost" onClick={handleCancelClick} className="flex-1 rounded-full text-onb2b-blue-950 no-underline bg-white font-semibold tracking-wide cursor-pointer">
           CANCEL
         </Button>
         <Button disabled={isNextDisabled} onClick={handleNextClick} className="flex-1 rounded-full bg-onb2b-blue-950 font-semibold tracking-wide hover:bg-onb2b-blue-1000 cursor-pointer">
           NEXT
         </Button>
       </div>
     </div>
   );
 }
