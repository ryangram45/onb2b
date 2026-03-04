 "use client";
 
 import { useEffect, useState } from "react";
 import Image from "next/image";
 import { Checkbox } from "@/components/ui/checkbox";
 
 export type Account = {
   id: string;
   product: "AdvPlus Banking" | "Savings";
   label: string;
   availableBalance: number;
 };
 
 function formatCurrency(amount: number) {
   return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
 }
 
 export default function AccountsSelector({
   onSelected,
   initialSelectedId,
 }: {
   onSelected: (account: Account) => void;
   initialSelectedId?: string;
 }) {
   const [accounts, setAccounts] = useState<Account[]>([]);
   const [selectedAccountId, setSelectedAccountId] = useState<string>(initialSelectedId || "");
 
   useEffect(() => {
     let mounted = true;
     (async () => {
       try {
         const res = await fetch("/api/me/accounts", { method: "GET" });
         if (res.ok) {
           const data = await res.json();
           const normalized: Account[] = (data?.accounts || []).map((a: any) => ({
             id: a.id,
             product: a.product,
             label: a.product === "AdvPlus Banking" ? "My Checking" : "My Saving",
             availableBalance: a.availableBalance,
           }));
           if (mounted) {
             setAccounts(normalized);
             const firstId = initialSelectedId ?? normalized[0]?.id ?? "";
             setSelectedAccountId(firstId);
             if (firstId) {
               const found = normalized.find(a => a.id === firstId);
               if (found) onSelected(found);
             }
           }
           return;
         }
       } catch {}
       const fallback: Account[] = [
         { id: "acc-1", product: "AdvPlus Banking", label: "My Checking", availableBalance: 54000 },
         { id: "acc-2", product: "Savings", label: "My Saving", availableBalance: 7680.9 },
       ];
       if (mounted) {
         setAccounts(fallback);
         const firstId = initialSelectedId ?? fallback[0].id;
         setSelectedAccountId(firstId);
         const found = fallback.find(a => a.id === firstId) ?? fallback[0];
         onSelected(found);
       }
     })();
     return () => {
       mounted = false;
     };
   }, [initialSelectedId, onSelected]);
 
   const choose = (id: string) => {
     setSelectedAccountId(id);
     const found = accounts.find(a => a.id === id);
     if (found) onSelected(found);
   };
 
   return (
     <div>
      <h2 className="text-xl font-semibold text-gray-900 tracking-wide mb-8">Wire money from</h2>
       <div className="flex items-center gap-2">
         <Image src="/images/logo.svg" alt="BofA" width={20} height={20} />
         <span className="text-[0.95rem] font-semibold text-gray-900">BofA Accounts</span>
       </div>
 
       <div className="mt-3 flex flex-col gap-3">
         {accounts.map((account) => (
           <label
             key={account.id}
             className="flex items-start gap-3 rounded-lg px-3 py-2 cursor-pointer"
             onClick={() => choose(account.id)}
           >
             <Checkbox checked={selectedAccountId === account.id} onCheckedChange={() => choose(account.id)} className="sr-only" />
             <span className={`flex items-center justify-center size-6 rounded-full border-2 ${selectedAccountId === account.id ? "border-onb2b-blue-950" : "border-blue-900"}`}>
               <span className={`size-3.5 rounded-full ${selectedAccountId === account.id ? "bg-onb2b-blue-950" : "bg-transparent"}`} />
             </span>
             <div className="flex-1">
               <div className="text-[0.95rem] text-gray-900">{account.label}</div>
               <div className="text-[0.9rem] text-gray-600">Available balance {formatCurrency(account.availableBalance)}</div>
             </div>
           </label>
         ))}
       </div>
 
       <div className="bg-white rounded-lg p-4 sm:p-5 mt-4 shadow-md shadow-gray-200/60">
         <p className="text-[0.9rem] text-gray-800">
           Make sure your account has sufficient funds before sending a wire. Your account must have the amount of the
           wire plus any applicable transfer fees.
         </p>
       </div>
     </div>
   );
 }
