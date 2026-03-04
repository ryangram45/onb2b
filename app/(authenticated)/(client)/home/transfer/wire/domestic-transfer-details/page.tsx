 "use client";
 
 import { Suspense } from "react";
 import DomesticTransferDetailsClient from "./client";
 
 export default function DomesticTransferDetailsPage() {
   return (
     <Suspense fallback={<div />}>
       <DomesticTransferDetailsClient />
     </Suspense>
   );
 }
