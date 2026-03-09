 import { Suspense } from "react";
 import BankDetailsClient from "./client";
 
 export default function BankDetailsPage() {
   return (
     <Suspense fallback={<div />} >
       <BankDetailsClient />
     </Suspense>
   );
 }
