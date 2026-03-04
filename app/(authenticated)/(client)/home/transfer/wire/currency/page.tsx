 "use client";
 
 import { Suspense } from "react";
 import CurrencySelectionClient from "./client";
 
 export default function CurrencySelectionPage() {
   return (
     <Suspense fallback={<div />}>
       <CurrencySelectionClient />
     </Suspense>
   );
 }
