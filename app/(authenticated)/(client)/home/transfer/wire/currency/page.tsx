 "use client";
 
 import { useState, useMemo } from "react";
 import { useRouter, useSearchParams } from "next/navigation";
 import { Button } from "@/components/ui/button";
 import { Checkbox } from "@/components/ui/checkbox";
 
 type CurrencyCode = "INR" | "EUR" | "USD";
 
 type CurrencyOption = {
   code: CurrencyCode;
   label: string;
   feeDisplay: string;
 };
 
 const currencyOptions: CurrencyOption[] = [
   { code: "INR", label: "Indian Rupee (INR)", feeDisplay: "No fee" },
   { code: "EUR", label: "Euro (EUR)", feeDisplay: "No fee" },
   { code: "USD", label: "US Dollar (USD)", feeDisplay: "$45.00 fee" },
 ];
 
 export default function CurrencySelectionPage() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const selectedCountryName = useMemo(() => searchParams.get("country") || "", [searchParams]);
 
   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<CurrencyCode | undefined>(undefined);
 
   const handleCheckboxChange = (currencyCode: CurrencyCode) => {
     setSelectedCurrencyCode(currencyCode);
   };
 
   const isNextEnabled = Boolean(selectedCurrencyCode);
 
   const handleCancelClick = () => {
     router.push("/home/transfer/wire/country");
   };
 
  const handleNextClick = () => {
    if (!selectedCurrencyCode) return;
    const params = new URLSearchParams();
    if (selectedCountryName) params.set("country", selectedCountryName);
    params.set("currency", selectedCurrencyCode);
    router.push(`/home/transfer/wire/account-type?${params.toString()}`);
  };
 
   return (
     <div className="mx-auto max-w-screen-md px-4 pb-28 pt-20">
       <div className="bg-white rounded-lg p-5 sm:p-6">
         <h2 className="text-xl font-semibold text-gray-900 tracking-wide mb-4">
           What currency do you want to send?
         </h2>
 
         <div className="flex flex-col gap-3">
           {currencyOptions.map((option) => (
            <label
               key={option.code}
               className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer"
               onClick={() => handleCheckboxChange(option.code)}
             >
              <Checkbox
                checked={selectedCurrencyCode === option.code}
                onCheckedChange={() => handleCheckboxChange(option.code)}
                className="sr-only"
              />
              <span
                className={`flex items-center justify-center size-6 rounded-full border-2 ${
                  selectedCurrencyCode === option.code ? "border-onb2b-blue-950" : "border-blue-900"
                }`}
              >
                <span
                  className={`size-3.5 rounded-full ${
                    selectedCurrencyCode === option.code ? "bg-onb2b-blue-950" : "bg-transparent"
                  }`}
                />
              </span>
               <span className="text-[0.98rem] text-gray-900">
                 {option.label}{" "}
                 <span className="text-gray-900">- {option.feeDisplay}</span>
               </span>
             </label>
           ))}
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
