 "use client";
 
 import { useEffect, useState } from "react";
 import { useRouter } from "next/navigation";
 import { Button } from "@/components/ui/button";
 import { RecipientList } from "@/components/wire/recipient-list";
 
 type Recipient = {
   id: string;
   country: string;
   firstName: string;
   lastName: string;
 };
 
 export default function SendMoneyPage() {
   const router = useRouter();
   const [recipients, setRecipients] = useState<Recipient[]>([]);
   const [selectedId, setSelectedId] = useState<string>("");
 
   useEffect(() => {
     const load = async () => {
       try {
         const res = await fetch("/api/me/recipients", { cache: "no-store" });
         if (res.ok) {
           const data = await res.json();
           setRecipients(data || []);
         }
       } catch {}
     };
     load();
   }, []);
 
   const canProceed = Boolean(selectedId);
 
   return (
     <div className="mx-auto max-w-screen-md px-4 pb-28 pt-14">
       <div className="bg-white rounded-lg py-5 px-4 sm:p-6">
         <h2 className="text-xl font-semibold text-gray-900 tracking-wide mb-4">Wire details</h2>
         <RecipientList recipients={recipients} selectedId={selectedId} onSelectId={setSelectedId} />
       </div>
 
       <div className="fixed bottom-0 left-0 right-0 mx-auto flex items-center justify-between py-2 px-4 sm:px-6 max-w-screen-md z-50 bg-white/50">
         <Button variant="whiteGhost" onClick={() => router.push("/home/transfer/wire")} className="flex-1 rounded-full text-onb2b-blue-950 no-underline bg-white font-semibold tracking-wide">CANCEL</Button>
         <Button disabled={!canProceed} className="flex-1 rounded-full bg-onb2b-blue-950 font-semibold tracking-wide">NEXT</Button>
       </div>
     </div>
   );
 }
