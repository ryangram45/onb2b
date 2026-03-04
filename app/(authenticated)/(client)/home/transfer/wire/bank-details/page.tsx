 "use client";
 
 import { useMemo, useState } from "react";
 import { useRouter, useSearchParams } from "next/navigation";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { GoLightBulb } from "react-icons/go";
import SecureFooter from "@/components/common/secure-footer";
 
 export default function BankDetailsPage() {
   const router = useRouter();
   const searchParams = useSearchParams();
 
   const selectedCountryName = useMemo(() => searchParams.get("country") || "", [searchParams]);
   const selectedCurrencyCode = useMemo(() => searchParams.get("currency") || "", [searchParams]);
   const selectedAccountType = useMemo(() => searchParams.get("accountType") || "", [searchParams]);
   const selectedReceiverAccount = useMemo(() => searchParams.get("receiverAccount") || "", [searchParams]);
   const enteredFirstName = useMemo(() => searchParams.get("firstName") || "", [searchParams]);
   const enteredLastName = useMemo(() => searchParams.get("lastName") || "", [searchParams]);
   const enteredNickname = useMemo(() => searchParams.get("nickName") || "", [searchParams]);
   const enteredRecipientAddress = useMemo(() => searchParams.get("recipientAddress") || "", [searchParams]);
  const enteredStateName = useMemo(() => searchParams.get("state") || "", [searchParams]);
   const enteredCityName = useMemo(() => searchParams.get("city") || "", [searchParams]);
   const enteredZipPostalCode = useMemo(() => searchParams.get("zipPostalCode") || "", [searchParams]);
 
   const [enteredSwiftBicCode, setEnteredSwiftBicCode] = useState("");
   const [enteredRecipientAccountNumber, setEnteredRecipientAccountNumber] = useState("");
 
  const isSwiftLengthValid = enteredSwiftBicCode.length === 11;
  const isAccountNumberLengthValid =
    enteredRecipientAccountNumber.length >= 1 && enteredRecipientAccountNumber.length <= 34;
   const isNextEnabled = Boolean(isSwiftLengthValid && isAccountNumberLengthValid);
 
   const handleCancelClick = () => {
     const params = new URLSearchParams();
     if (selectedCountryName) params.set("country", selectedCountryName);
     if (selectedCurrencyCode) params.set("currency", selectedCurrencyCode);
     if (selectedAccountType) params.set("accountType", selectedAccountType);
     if (selectedReceiverAccount) params.set("receiverAccount", selectedReceiverAccount);
     if (enteredFirstName) params.set("firstName", enteredFirstName);
     if (enteredLastName) params.set("lastName", enteredLastName);
     if (enteredNickname) params.set("nickName", enteredNickname);
     if (enteredRecipientAddress) params.set("recipientAddress", enteredRecipientAddress);
    if (enteredStateName) params.set("state", enteredStateName);
     if (enteredCityName) params.set("city", enteredCityName);
     if (enteredZipPostalCode) params.set("zipPostalCode", enteredZipPostalCode);
     router.push(`/home/transfer/wire/add-person?${params.toString()}`);
   };
 
   const handleNextClick = () => {
     if (!isNextEnabled) return;
     const params = new URLSearchParams();
     if (selectedCountryName) params.set("country", selectedCountryName);
     if (selectedCurrencyCode) params.set("currency", selectedCurrencyCode);
     if (selectedAccountType) params.set("accountType", selectedAccountType);
     if (selectedReceiverAccount) params.set("receiverAccount", selectedReceiverAccount);
     if (enteredFirstName) params.set("firstName", enteredFirstName);
     if (enteredLastName) params.set("lastName", enteredLastName);
     if (enteredNickname) params.set("nickName", enteredNickname);
     if (enteredRecipientAddress) params.set("recipientAddress", enteredRecipientAddress);
    if (enteredStateName) params.set("state", enteredStateName);
     if (enteredCityName) params.set("city", enteredCityName);
     if (enteredZipPostalCode) params.set("zipPostalCode", enteredZipPostalCode);
     params.set("swiftBic", enteredSwiftBicCode);
     params.set("recipientAccountNumber", enteredRecipientAccountNumber);
     router.push(`/home/transfer/wire/send-money?${params.toString()}`);
   };
 
   return (
     <div className="mx-auto max-w-screen-md px-4 pb-28 pt-20">
       <div className="bg-white rounded-lg p-4 sm:p-5 shadow-md shadow-gray-200/60">
         <div className="flex items-start gap-3 bg-white rounded-lg p-3">
           <div className="flex items-center justify-center size-7 p-1 rounded-full border border-onb2b-blue-950">
             <GoLightBulb className="text-onb2b-blue-950" size={18} />
           </div>
           <p className="text-[0.9rem] text-gray-800">
             A SWIFT code is a standard format for Business Identifier Codes (BIC). It&apos;s used to identify banks and
             financial institutions globally, and they&apos;re used when transferring money between banks.
           </p>
         </div>
       </div>
 
      <SecureFooter />

       <div className="bg-white rounded-lg p-5 sm:p-6 mt-4">
         <div className="space-y-6">
           <div>
             <label className="text-[0.85rem] text-gray-800">SWIFT/BIC code</label>
             <Input
               value={enteredSwiftBicCode}
               onChange={(e) => {
                 const sanitized = e.target.value.replace(/\s+/g, "").slice(0, 11);
                 setEnteredSwiftBicCode(sanitized);
               }}
               placeholder="Enter characters"
               className="w-full text-left border-0 border-b border-gray-300 rounded-none shadow-none outline-none focus-visible:ring-0 focus-visible:border-b focus-visible:border-onb2b-blue-950 bg-transparent placeholder:text-onb2b-blue-950 placeholder:font-medium caret-onb2b-blue-950 transition-colors px-0.5"
               maxLength={11}
               autoComplete="off"
               autoCapitalize="none"
               spellCheck={false}
             />
             <div className="flex items-center justify-between text-[0.78rem] mt-1">
               <span className="text-gray-600">11 characters</span>
               <button className="text-onb2b-blue-950 font-medium">Look up a SWIFT/BIC by bank</button>
             </div>
           </div>
 
           <div>
             <label className="text-[0.85rem] text-gray-800">Account number</label>
             <Input
               value={enteredRecipientAccountNumber}
               onChange={(e) => {
                 const sanitized = e.target.value.replace(/\s+/g, "").slice(0, 34);
                 setEnteredRecipientAccountNumber(sanitized);
               }}
               placeholder="Enter characters"
               className="w-full text-left border-0 border-b border-gray-300 rounded-none shadow-none outline-none focus-visible:ring-0 focus-visible:border-b focus-visible:border-onb2b-blue-950 bg-transparent placeholder:text-onb2b-blue-950 placeholder:font-medium caret-onb2b-blue-950 transition-colors px-0.5"
               maxLength={34}
               autoComplete="off"
               autoCapitalize="none"
               spellCheck={false}
             />
             <div className="flex items-center justify-between text-[0.78rem] mt-1">
               <span className="text-gray-600">1 - 34 characters</span>
             </div>
           </div>
         </div>
       </div>
 
       <div className="fixed bottom-0 left-0 right-0 mx-auto border-t border-gray-200 flex items-center justify-between py-2 px-4 sm:px-6 max-w-screen-md z-50 bg-white/50">
         <Button
           variant="whiteGhost"
           onClick={handleCancelClick}
           className="flex-1 rounded-full text-onb2b-blue-950 no-underline bg-white font-semibold tracking-wide cursor-pointer"
         >
           CANCEL
         </Button>
         <Button
           disabled={!isNextEnabled}
           onClick={handleNextClick}
           className="flex-1 rounded-full bg-onb2b-blue-950 font-semibold tracking-wide hover:bg-onb2b-blue-1000 cursor-pointer"
         >
           NEXT
         </Button>
       </div>
     </div>
   );
 }
