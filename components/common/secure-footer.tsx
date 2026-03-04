 "use client";
 
 import { Lock, Home } from "lucide-react";
 
 export default function SecureFooter() {
   return (
     <div className="mx-auto max-w-screen-md px-4 py-3 text-[0.75rem] text-gray-600">
       <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
         <span className="inline-flex items-center gap-1">
           <Lock className="size-3.5" /> Secure Area
         </span>
         <span>Privacy</span>
         <span>Security</span>
         <span>Advertising Practices</span>
         <span>Legal Info & Disclosures</span>
         <span className="inline-flex items-center gap-1">
           Equal Housing Lender <Home className="size-3.5" />
         </span>
       </div>
     </div>
   );
 }
