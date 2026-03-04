 "use client";
 
 import React from "react";
 import Image from "next/image";
 import { usePathname, useRouter } from "next/navigation";
 import { ChevronLeft } from "lucide-react";
 import { toTitleCase } from "@/utils/string-utils";
 
 export default function TransferLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentPathname = usePathname();
  const pathSegments = (currentPathname || "").split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1] ?? "transfer";
  const isChildRoute = (currentPathname || "").startsWith("/home/transfer/");
  const isSendMoneyRoute = (currentPathname || "").startsWith("/home/transfer/wire/send-money");
  const isWireProcessingRoute = (currentPathname || "").startsWith("/home/transfer/wire/send-money/processing");
  const isAddRecipientRoute =
    (currentPathname || "").startsWith("/home/transfer/wire/country") ||
    (currentPathname || "").startsWith("/home/transfer/wire/currency") ||
    (currentPathname || "").startsWith("/home/transfer/wire/account-type") ||
    (currentPathname || "").startsWith("/home/transfer/wire/add-person") ||
    (currentPathname || "").startsWith("/home/transfer/wire/bank-details") ||
    (currentPathname || "").startsWith("/home/transfer/wire/domestic-transfer-details") ||
    (currentPathname || "").startsWith("/home/transfer/wire/review-details");
 const computedTitle = isAddRecipientRoute
   ? "Add Person or Business"
   : isWireProcessingRoute
   ? "Success"
   : isSendMoneyRoute
   ? "Send Money"
   : toTitleCase(lastSegment.replaceAll("-", " "));
 
   return (
     <section className="w-full h-full">
       {isChildRoute ? (
         <>
           <nav className="fixed top-0 left-0 right-0 mx-auto bg-white flex items-center justify-between py-2 px-4 sm:px-6 max-w-screen-md z-50 shadow-b-2xl">
             {isWireProcessingRoute ? (
               <span className="w-10" />
             ) : (
               <button
                 aria-label="Go back"
                 className="p-2 rounded-full active:bg-gray-200 cursor-pointer"
                 onClick={() => router.push("/home/transfer")}
               >
                 <ChevronLeft className="size-6 text-gray-600/70" />
               </button>
             )}
 
            <h1 className="text-[1.125rem] font-medium text-gray-900">{computedTitle}</h1>
 
             <div className="relative w-8 h-8">
               <Image
                 src="/images/logo.svg"
                 alt="Logo"
                 fill
                 className="object-contain"
                 sizes="32px"
               />
             </div>
           </nav>
 
           <div>{children}</div>
         </>
       ) : (
         <>{children}</>
       )}
     </section>
   );
 }
