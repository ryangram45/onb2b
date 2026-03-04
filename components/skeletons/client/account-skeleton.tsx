import { Skeleton } from "@/components/ui/skeleton";

export function AccountSkeleton() {
  return (
    <div className="pt-42 pb-20 w-full max-w-3xl mx-auto flex flex-col gap-5 px-1 sm:px-0">
      {/* Search Bar Skeleton */}
      <Skeleton className="w-full h-12 bg-gray-200 rounded container mx-auto max-w-104 sm:max-w-[32.9rem]" />

      {/* Warning Banner Skeleton */}
      <Skeleton className="w-full h-24 bg-[#ffefbc] container mx-auto sm:max-w-[32.9rem] mt-0.5 rounded" />

      {/* Profile Cards Skeleton */}
      <div className="w-full h-full bg-white py-5 flex flex-col gap-2 container mx-auto max-w-[24rem] sm:max-w-[32.9rem] mt-3 rounded drop-shadow-lg">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-col w-full px-4 py-2 gap-1 border-b border-gray-200">
            <Skeleton className="h-5 w-32" />
            {index < 2 && <Skeleton className="h-4 w-48 mt-1" />}
          </div>
        ))}
      </div>

      {/* Accounts Skeleton */}
      <div className="flex flex-col gap-4 w-full items-center bg-gray-200 mt-4 py-5 px-3 sm:px-11">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="w-full h-full max-w-132 rounded pt-2">
            <div className="flex flex-col gap-3 bg-white w-full h-full shadow-lg rounded-b pb-4">
              <div className="flex justify-between px-4 py-2 border-b border-gray-300">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <div className="flex flex-col px-4 gap-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex justify-between px-4">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manage Accounts Card Skeleton */}
      <Skeleton className="h-32 w-full bg-white rounded drop-shadow-lg mx-auto max-w-100 sm:max-w-[32.9rem]" />

      {/* Legal Footer Skeleton */}
      <div className="bg-gray-50 py-6 px-2 sm:px-23">
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}