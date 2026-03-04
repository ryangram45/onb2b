 "use client";
 
 import { Suspense } from "react";
 import ReviewDetailsClient from "./client";
 
 export default function ReviewDetailsPage() {
   return (
     <Suspense fallback={<div />}>
       <ReviewDetailsClient />
     </Suspense>
   );
 }
