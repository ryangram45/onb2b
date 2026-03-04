 "use client";
 
 import { useMemo, useState } from "react";
 import { useRouter, useSearchParams } from "next/navigation";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { GoLightBulb } from "react-icons/go";
 
 export default function DomesticTransferDetailsPage() {
   const router = useRouter();
   const searchParams = useSearchParams();
 
   const selectedCountryName = useMemo(() => searchParams.get("country") || "", [searchParams]);
  const selectedCurrencyCode = useMemo(() => searchParams.get("currency") || "", [searchParams]);
  const selectedStateName = useMemo(() => searchParams.get("state") || "", [searchParams]);
   const selectedAccountType = useMemo(() => searchParams.get("accountType") || "", [searchParams]);
   const selectedReceiverAccount = useMemo(() => searchParams.get("receiverAccount") || "", [searchParams]);
   const enteredFirstName = useMemo(() => searchParams.get("firstName") || "", [searchParams]);
   const enteredLastName = useMemo(() => searchParams.get("lastName") || "", [searchParams]);
   const enteredNickname = useMemo(() => searchParams.get("nickName") || "", [searchParams]);
   const enteredRecipientAddress = useMemo(() => searchParams.get("recipientAddress") || "", [searchParams]);
   const enteredCityName = useMemo(() => searchParams.get("city") || "", [searchParams]);
   const enteredZipPostalCode = useMemo(() => searchParams.get("zipPostalCode") || "", [searchParams]);
 
   const [enteredRoutingNumber, setEnteredRoutingNumber] = useState("");
   const [enteredAccountNumber, setEnteredAccountNumber] = useState("");
   const [enteredConfirmedAccountNumber, setEnteredConfirmedAccountNumber] = useState("");
 
   const isRoutingValid = enteredRoutingNumber.length === 9;
   const isAccountValid = enteredAccountNumber.length >= 1 && enteredAccountNumber.length <= 34;
   const isConfirmMatches = enteredConfirmedAccountNumber === enteredAccountNumber;
   const isNextEnabled = Boolean(isRoutingValid && isAccountValid && isConfirmMatches);
 
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
    if (selectedStateName) params.set("state", selectedStateName);
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
    if (selectedStateName) params.set("state", selectedStateName);
     if (enteredCityName) params.set("city", enteredCityName);
     if (enteredZipPostalCode) params.set("zipPostalCode", enteredZipPostalCode);
     params.set("routingNumber", enteredRoutingNumber);
     params.set("accountNumber", enteredAccountNumber);
    router.push(`/home/transfer/wire/review-details?${params.toString()}`);
   };
 
   return (
     <div className="mx-auto max-w-screen-md px-4 pb-28 pt-20">
       <div className="bg-white rounded-lg p-5 sm:p-6">
         <h2 className="text-xl font-semibold text-gray-900 tracking-wide">Add their account info</h2>
 
         <div className="mt-4 space-y-6">
           <div>
             {/* <label className="text-[0.95rem] text-gray-900">Routing number</label> */}
             <Input
               value={enteredRoutingNumber}
               onChange={(e) => {
                 const sanitized = e.target.value.replace(/\s+/g, "").slice(0, 9);
                 setEnteredRoutingNumber(sanitized);
               }}
               placeholder="Routing number"
               className="w-full text-left border-0 border-b border-gray-300 rounded-none shadow-none outline-none focus-visible:ring-0 focus-visible:border-b focus-visible:border-onb2b-blue-950 bg-transparent placeholder:text-onb2b-blue-950 placeholder:font-medium caret-onb2b-blue-950 transition-colors px-0.5"
               maxLength={9}
               autoComplete="off"
               autoCapitalize="none"
               spellCheck={false}
             />
           </div>
 
           <div>
             {/* <label className="text-[0.95rem] text-gray-900">Account number</label> */}
             <Input
               value={enteredAccountNumber}
               onChange={(e) => {
                 const sanitized = e.target.value.replace(/\s+/g, "").slice(0, 34);
                 setEnteredAccountNumber(sanitized);
               }}
               placeholder="Account number"
               className="w-full text-left border-0 border-b border-gray-300 rounded-none shadow-none outline-none focus-visible:ring-0 focus-visible:border-b focus-visible:border-onb2b-blue-950 bg-transparent placeholder:text-onb2b-blue-950 placeholder:font-medium caret-onb2b-blue-950 transition-colors px-0.5"
               maxLength={34}
               autoComplete="off"
               autoCapitalize="none"
               spellCheck={false}
             />
           </div>
 
           <div>
             {/* <label className="text-[0.95rem] text-gray-900">Confirm account</label> */}
             <Input
               value={enteredConfirmedAccountNumber}
               onChange={(e) => {
                 const sanitized = e.target.value.replace(/\s+/g, "").slice(0, 34);
                 setEnteredConfirmedAccountNumber(sanitized);
               }}
               placeholder="Confirm account"
               className="w-full text-left border-0 border-b border-gray-300 rounded-none shadow-none outline-none focus-visible:ring-0 focus-visible:border-b focus-visible:border-onb2b-blue-950 bg-transparent placeholder:text-onb2b-blue-950 placeholder:font-medium caret-onb2b-blue-950 transition-colors px-0.5"
               maxLength={34}
               autoComplete="off"
               autoCapitalize="none"
               spellCheck={false}
             />
           </div>
         </div>
       </div>
 
       <div className="bg-white rounded-lg p-4 sm:p-5 mt-4 shadow-md shadow-gray-200/60">
         <div className="flex items-start gap-3">
           <div className="flex items-center justify-center size-7 p-1 rounded-full border border-onb2b-blue-950">
             <GoLightBulb className="text-onb2b-blue-950" size={18} />
           </div>
           <p className="text-[0.9rem] text-gray-800">
             Make sure you use the recipient bank&apos;s wire routing number. Banks use different routing numbers for
             different types of transactions. Using the wrong routing number can lead to delays in processing the
             transfer or being rejected and returned. If you&apos;re not sure which routing number you&apos;ll need for a wire
             transfer, check with the recipient before sending.
           </p>
         </div>
       </div>
 
      {/* <SecureFooter /> */}

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
