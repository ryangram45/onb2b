 "use client";
 
 import { PiHouseLineBold } from "react-icons/pi";
 import { IoLockClosedSharp } from "react-icons/io5";

 
 export default function SecureFooter() {
   return (
     <div className="mt-16 left-0 right-0 mx-auto max-w-screen-md px-4 py-3 text-center text-xs text-gray-500">
       <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
         <span className="inline-flex items-center gap-1.5">
           <IoLockClosedSharp className="size-4 text-gray-700" /> Secure Area
         </span>
         <span className="text-blue-700 cursor-pointer">Privacy</span>
         <span className="text-blue-700 cursor-pointer">Security</span>
         <span className="text-blue-700 cursor-pointer">Advertising Practices</span>
       </div>
       <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-2 mb-2">
         <span className="text-blue-700 cursor-pointer">Legal Info & Disclosures</span>
         <span className="inline-flex items-center gap-1.5 text-blue-700 cursor-pointer">
           Equal Housing Lender <PiHouseLineBold className="size-4 text-gray-700" />
         </span>
       </div>
       <p>Bank of America. N.A. Member FDIC . &copy; 2026 Bank of America Corporation.</p>
     </div>
   );
 }
