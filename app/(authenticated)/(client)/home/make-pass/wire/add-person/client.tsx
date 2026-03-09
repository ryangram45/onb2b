 "use client";
 
 import { useMemo, useState } from "react";
 import { useRouter, useSearchParams } from "next/navigation";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 
 export default function AddPersonClient() {
   const router = useRouter();
   const searchParams = useSearchParams();
 
   const selectedCountryName = useMemo(() => searchParams.get("country") || "", [searchParams]);
   const selectedCurrencyCode = useMemo(() => searchParams.get("currency") || "", [searchParams]);
   const selectedAccountType = useMemo(() => searchParams.get("accountType") || "", [searchParams]);
   const selectedReceiverAccount = useMemo(() => searchParams.get("receiverAccount") || "", [searchParams]);
 
   const [enteredFirstName, setEnteredFirstName] = useState("");
   const [enteredLastName, setEnteredLastName] = useState("");
   const [enteredNickname, setEnteredNickname] = useState("");
   const [enteredRecipientAddress, setEnteredRecipientAddress] = useState("");
   const [enteredStateName, setEnteredStateName] = useState("");
   const [enteredCityName, setEnteredCityName] = useState("");
   const [enteredZipPostalCode, setEnteredZipPostalCode] = useState("");
 
   const isNextEnabled =
     Boolean(enteredFirstName && enteredLastName && enteredRecipientAddress && enteredCityName && enteredZipPostalCode);
 
   const handleCancelClick = () => {
     const params = new URLSearchParams();
     if (selectedCountryName) params.set("country", selectedCountryName);
     if (selectedCurrencyCode) params.set("currency", selectedCurrencyCode);
     router.push(`/home/make-pass/wire/account-type?${params.toString()}`);
   };
 
   const handleNextClick = () => {
     if (!isNextEnabled) return;
     const params = new URLSearchParams();
     if (selectedCountryName) params.set("country", selectedCountryName);
     if (selectedCurrencyCode) params.set("currency", selectedCurrencyCode);
     if (selectedAccountType) params.set("accountType", selectedAccountType);
     if (selectedReceiverAccount) params.set("receiverAccount", selectedReceiverAccount);
     params.set("firstName", enteredFirstName);
     params.set("lastName", enteredLastName);
     if (enteredNickname) params.set("nickName", enteredNickname);
     params.set("recipientAddress", enteredRecipientAddress);
     if (enteredStateName) params.set("state", enteredStateName);
     params.set("city", enteredCityName);
     params.set("zipPostalCode", enteredZipPostalCode);
     const nextPath =
       selectedCountryName === "United States"
         ? "/home/make-pass/wire/domestic-details"
         : "/home/make-pass/wire/details";
     router.push(`${nextPath}?${params.toString()}`);
   };
 
   return (
     <div className="mx-auto max-w-screen-md px-4 pb-28 pt-20">
       <div className="bg-white rounded-lg p-5 sm:p-6">
         <h2 className="text-xl font-semibold text-gray-900 tracking-wide">Who do you want to add?</h2>
         <p className="text-[0.9rem] text-gray-700 mt-1 mb-4">
           Required fields may vary based on recipient&apos;s country.
         </p>
 
         <div className="divide-y divide-gray-200">
           <div className="flex items-center justify-between py-3">
             <span className="text-[0.98rem] text-gray-900">First name</span>
             <Input
               value={enteredFirstName}
               onChange={(e) => setEnteredFirstName(e.target.value)}
               placeholder="Enter first name"
               className="w-52 text-right border-0 rounded-none shadow-none outline-none focus-visible:ring-0 focus-visible:border-0 bg-transparent placeholder:text-onb2b-blue-950 placeholder:font-medium caret-onb2b-blue-950"
             />
           </div>
           <div className="flex items-center justify-between py-3">
             <span className="text-[0.98rem] text-gray-900">Last name</span>
             <Input
               value={enteredLastName}
               onChange={(e) => setEnteredLastName(e.target.value)}
               placeholder="Enter last name"
               className="w-52 text-right border-0 rounded-none shadow-none outline-none focus-visible:ring-0 focus-visible:border-0 bg-transparent placeholder:text-onb2b-blue-950 placeholder:font-medium caret-onb2b-blue-950"
             />
           </div>
           <div className="flex items-center justify-between py-3">
             <span className="text-[0.98rem] text-gray-900">Nickname (optional)</span>
             <Input
               value={enteredNickname}
               onChange={(e) => setEnteredNickname(e.target.value)}
               placeholder="Enter nickname"
               className="w-52 text-right border-0 rounded-none shadow-none outline-none focus-visible:ring-0 focus-visible:border-0 bg-transparent placeholder:text-onb2b-blue-950 placeholder:font-medium caret-onb2b-blue-950"
             />
           </div>
           <div className="flex items-center justify-between py-3">
             <span className="text-[0.98rem] text-gray-900">Country</span>
             <span className="text-[0.98rem] font-medium text-onb2b-blue-950">{selectedCountryName || "—"}</span>
           </div>
           <div className="flex items-center justify-between py-3">
             <span className="text-[0.98rem] text-gray-900">Recipient address</span>
             <Input
               value={enteredRecipientAddress}
               onChange={(e) => setEnteredRecipientAddress(e.target.value)}
               placeholder="Enter street"
               className="w-52 text-right border-0 rounded-none shadow-none outline-none focus-visible:ring-0 focus-visible:border-0 bg-transparent placeholder:text-onb2b-blue-950 placeholder:font-medium caret-onb2b-blue-950"
             />
           </div>
           <div className="flex items-center justify-between py-3">
             <span className="text-[0.98rem] text-gray-900">State</span>
             <Input
               value={enteredStateName}
               onChange={(e) => setEnteredStateName(e.target.value)}
               placeholder="Enter state"
               className="w-52 text-right border-0 rounded-none shadow-none outline-none focus-visible:ring-0 focus-visible:border-0 bg-transparent placeholder:text-onb2b-blue-950 placeholder:font-medium caret-onb2b-blue-950"
             />
           </div>
           <div className="flex items-center justify-between py-3">
             <span className="text-[0.98rem] text-gray-900">City</span>
             <Input
               value={enteredCityName}
               onChange={(e) => setEnteredCityName(e.target.value)}
               placeholder="Enter city"
               className="w-52 text-right border-0 rounded-none shadow-none outline-none focus-visible:ring-0 focus-visible:border-0 bg-transparent placeholder:text-onb2b-blue-950 placeholder:font-medium caret-onb2b-blue-950"
             />
           </div>
           <div className="flex items-center justify-between py-3">
             <span className="text-[0.98rem] text-gray-900">ZIP/Postal code</span>
             <Input
               value={enteredZipPostalCode}
               onChange={(e) => setEnteredZipPostalCode(e.target.value)}
               placeholder="Enter code"
               className="w-52 text-right border-0 rounded-none shadow-none outline-none focus-visible:ring-0 focus-visible:border-0 bg-transparent placeholder:text-onb2b-blue-950 placeholder:font-medium caret-onb2b-blue-950"
             />
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
