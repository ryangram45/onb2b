import AccountTypeContent from "@/components/wire/account-type-content";
import { Suspense } from "react";

export default function AccountTypePage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-screen-md px-4 pb-28 pt-20">
        <div className="bg-white rounded-lg p-5 sm:p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="space-y-4 mb-8">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <AccountTypeContent />
    </Suspense>
  );
}