 "use client";
 
 import Image from "next/image";
 import { Button } from "@/components/ui/button";
 import { Info } from "lucide-react";
 import { useRouter } from "next/navigation";
 
 const countries = [
   { name: "India", code: "INR", flag: "🇮🇳" },
   { name: "Great Britain", code: "GBP", flag: "🇬🇧" },
   { name: "Mexico", code: "MXN", flag: "🇲🇽" },
   { name: "Canada", code: "CAD", flag: "🇨🇦" },
 ];
 
 export default function WirePage() {
   const router = useRouter();
   return (
     <div className="mx-auto max-w-screen-md px-4 pb-24 pt-4">
       <section className="bg-white rounded-lg drop-shadow-lg overflow-hidden">
         <div className="relative h-36 sm:h-44 w-full bg-gray-50">
           <Image
             src="/images/asset-connect-phone.svg"
             alt="Wire hero"
             fill
             className="object-cover opacity-90"
             sizes="(max-width: 768px) 100vw, 768px"
           />
         </div>
 
         <div className="px-5 sm:px-7 py-6 flex flex-col gap-4">
           <h2 className="text-center text-[1.1rem] sm:text-[1.25rem] font-medium text-gray-900">
             Send money globally with a wire
           </h2>
 
           <div className="flex justify-center">
             <Button onClick={() => router.push("/home/transfer/wire/send-money")} className="rounded-full px-6 py-5 text-sm font-bold bg-blue-900 hover:bg-blue-950 text-white cursor-pointer">
               START A WIRE
             </Button>
           </div>
 
           <div className="flex items-start gap-2 text-gray-700 text-sm">
             <Info className="mt-0.5 size-4 text-gray-600" />
             <p>
               Check out what you&apos;ll need to know before sending a wire.{" "}
               <span className="text-blue-800 cursor-pointer">More</span>
             </p>
           </div>
         </div>
       </section>
 
       <section className="mt-6 bg-transparent rounded-lg p-5 sm:p-6">
         <h3 className="text-[1.05rem] sm:text-[1.15rem] font-semibold text-gray-900 mb-4">
           Check our exchange rates and fees
         </h3>
 
         <div className="grid grid-cols-2 gap-3 drop-shadow-xs">
           {countries.map((country) => (
             <div
               key={country.code}
               className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl py-3 px-3"
             >
               <span className="text-2xl leading-none">{country.flag}</span>
               <div>
                 <div className="text-[0.98rem] font-medium text-gray-900">
                   {country.name}
                 </div>
                 <div className="text-[0.78rem] text-gray-500">{country.code}</div>
               </div>
             </div>
           ))}
         </div>
 
         <div className="mt-4 text-center">
           <button className="text-blue-800 text-sm font-medium">Search currencies</button>
         </div>
       </section>
 
       <section className="mt-6 text-xs text-gray-700 leading-relaxed">
         Investing involves risk. There is always the potential of losing money when you invest in securities. Asset allocation,
         diversification, and rebalancing do not ensure a profit or protect against losses in declining markets.
       </section>
     </div>
   );
 }
