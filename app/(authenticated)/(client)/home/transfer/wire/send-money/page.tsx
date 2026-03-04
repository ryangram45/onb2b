 "use client";
 
 import { useEffect, useState } from "react";
 import { useRouter } from "next/navigation";
 import { Button } from "@/components/ui/button";
 import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 import { Plus } from "lucide-react";
 
 type Recipient = {
   id: string;
   country: string;
   currency: "INR" | "EUR" | "USD";
   accountType: "Personal" | "Business";
   receiverAccount: "My account" | "Someone else's account";
   firstName: string;
   lastName: string;
   nickName?: string;
   recipientAddress: string;
   city: string;
   zipPostalCode: string;
   swiftBic: string;
   recipientAccountNumber: string;
 };
 
 export default function SendMoneyPage() {
   const router = useRouter();
   const [recipients, setRecipients] = useState<Recipient[]>([]);
   const [selectedId, setSelectedId] = useState<string>("");
   const [open, setOpen] = useState(false);
   const [saving, setSaving] = useState(false);
 
   const [country, setCountry] = useState("");
   const [currency, setCurrency] = useState<"INR" | "EUR" | "USD" | undefined>();
   const [accountType, setAccountType] = useState<"Personal" | "Business" | undefined>();
   const [receiverAccount, setReceiverAccount] = useState<"My account" | "Someone else's account" | undefined>();
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [nickName, setNickName] = useState("");
   const [recipientAddress, setRecipientAddress] = useState("");
   const [city, setCity] = useState("");
   const [zipPostalCode, setZipPostalCode] = useState("");
   const [swiftBic, setSwiftBic] = useState("");
   const [recipientAccountNumber, setRecipientAccountNumber] = useState("");
 
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
 
   const saveRecipient = async () => {
     setSaving(true);
     try {
       const res = await fetch("/api/me/recipients", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           country,
           currency,
           accountType,
           receiverAccount,
           firstName,
           lastName,
           nickName: nickName || undefined,
           recipientAddress,
           city,
           zipPostalCode,
           swiftBic,
           recipientAccountNumber,
         }),
       });
       if (res.ok) {
         const { id } = await res.json();
         const newItem: Recipient = {
           id,
           country,
           currency: currency!,
           accountType: accountType!,
           receiverAccount: receiverAccount!,
           firstName,
           lastName,
           nickName: nickName || undefined,
           recipientAddress,
           city,
           zipPostalCode,
           swiftBic,
           recipientAccountNumber,
         };
         setRecipients((prev) => [newItem, ...prev]);
         setSelectedId(id);
         setOpen(false);
       }
     } finally {
       setSaving(false);
     }
   };
 
   return (
     <div className="mx-auto max-w-screen-md px-4 pb-28 pt-14">
       <div className="bg-white rounded-lg py-5 px-4 sm:p-6">
         <h2 className="text-xl font-semibold text-gray-900 tracking-wide">Wire details</h2>
 
         <div className="mt-4 flex items-center justify-between">
           <div className="text-base font-semibold text-gray-900">Recipient</div>
          <Button
            variant="whiteGhost"
            className="no-underline font-semibold text-base cursor-pointer"
            onClick={() => router.push("/home/transfer/wire/country")}
          >
            Add new recipient
            <span className="bg-onb2b-blue-800 rounded-full p-0.5">
              <Plus className="text-white" />
            </span>
          </Button>
         </div>
 
         <div className="mt-6 space-y-2">
           {recipients.length === 0 ? (
             <div className="h-36 grid place-content-center text-sm text-gray-500">
               No recipients yet
             </div>
           ) : (
             recipients.map((r) => (
               <label key={r.id} className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2">
                 <div className="flex flex-col">
                   <span className="text-[0.95rem] font-medium">{r.firstName} {r.lastName}{r.nickName ? ` (${r.nickName})` : ""}</span>
                   <span className="text-[0.8rem] text-gray-600">{r.country} • {r.currency} • {r.accountType}</span>
                 </div>
                 <input
                   type="radio"
                   name="recipient"
                   checked={selectedId === r.id}
                   onChange={() => setSelectedId(r.id)}
                   className="size-4"
                 />
               </label>
             ))
           )}
         </div>
       </div>
 
       <div className="fixed bottom-0 left-0 right-0 mx-auto border-t border-gray-200 flex items-center justify-between py-2 px-4 sm:px-6 max-w-screen-md z-50 bg-white/50">
         <Button variant="whiteGhost" onClick={() => router.push("/home/transfer/wire")} className="flex-1 rounded-full text-onb2b-blue-950 no-underline bg-white font-semibold tracking-wide">CANCEL</Button>
         <Button disabled={!canProceed} className="flex-1 rounded-full bg-onb2b-blue-950 font-semibold tracking-wide">NEXT</Button>
       </div>
     </div>
   );
 }
