 "use client";
 
 import { Suspense } from "react";
 import AddPersonClient from "./client";
 
 export default function AddPersonPage() {
   return (
     <Suspense fallback={<div />}>
       <AddPersonClient />
     </Suspense>
   );
 }
