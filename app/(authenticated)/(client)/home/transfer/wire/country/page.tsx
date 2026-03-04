 "use client";
 
 import { useState } from "react";
 import { useRouter } from "next/navigation";
 import { Button } from "@/components/ui/button";
 
 type Country = { name: string; flag: string };
 
 const topCountry: Country = { name: "United States", flag: "🇺🇸" };
 const countries: Country[] = [
   { name: "India", flag: "🇮🇳" },
   { name: "Mexico", flag: "🇲🇽" },
   { name: "Canada", flag: "🇨🇦" },
   { name: "Great Britain", flag: "🇬🇧" },
   { name: "China", flag: "🇨🇳" },
   { name: "Spain", flag: "🇪🇸" },
   { name: "Germany", flag: "🇩🇪" },
   { name: "France", flag: "🇫🇷" },
   { name: "Korea", flag: "🇰🇷" },
   { name: "Philippines", flag: "🇵🇭" },
   { name: "Italy", flag: "🇮🇹" },
   { name: "Colombia", flag: "🇨🇴" },
 ];
 
 export default function CountryPage() {
   const router = useRouter();
   const [selected, setSelected] = useState<string>("");
 
   return (
     <div className="mx-auto max-w-screen-md px-4 pb-28 pt-20">
       <div className="bg-white rounded-lg p-5 sm:p-6">
         <div
           className={`flex items-center justify-between shadow-md shadow-gray-200/70 rounded-lg p-3 cursor-pointer ${selected === topCountry.name ? "ring-2 ring-onb2b-blue-950" : ""}`}
           onClick={() => setSelected(topCountry.name)}
         >
           <div className="flex items-center gap-5">
             <span className="text-2xl leading-none">{topCountry.flag}</span>
             <span className="text-[0.98rem] font-medium text-gray-900">{topCountry.name}</span>
           </div>
         </div>
 
         <div className="grid grid-cols-2 gap-3 mt-4">
           {countries.map((c) => (
             <div
               key={c.name}
               className={`flex items-center justify-between shadow-md shadow-gray-200/70 rounded-lg p-3 cursor-pointer ${selected === c.name ? "ring-2 ring-onb2b-blue-950" : ""}`}
               onClick={() => setSelected(c.name)}
             >
               <div className="flex items-center gap-3">
                 <span className="text-2xl leading-none">{c.flag}</span>
                 <span className="text-[0.98rem] font-medium text-gray-900">{c.name}</span>
               </div>
             </div>
           ))}
         </div>
       </div>
 
       <div className="fixed bottom-0 left-0 right-0 mx-auto border-t border-gray-200 flex items-center justify-between py-2 px-4 sm:px-6 max-w-screen-md z-50 bg-white/50">
         <Button
           variant="whiteGhost"
           onClick={() => router.push("/home/transfer/wire/send-money")}
           className="flex-1 rounded-full text-onb2b-blue-950 no-underline bg-white font-semibold tracking-wide cursor-pointer"
         >
           CANCEL
         </Button>
        <Button
          disabled={!selected}
          onClick={() => router.push(`/home/transfer/wire/currency?country=${encodeURIComponent(selected)}`)}
           className="flex-1 rounded-full bg-onb2b-blue-950 font-semibold tracking-wide hover:bg-onb2b-blue-1000 cursor-pointer"
         >
           NEXT
         </Button>
       </div>
     </div>
   );
 }
