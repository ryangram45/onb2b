import { Skeleton } from "@/components/ui/skeleton";

export function HistorySkeleton() {
  return (
    <div className="pt-42 pb-15 w-full max-w-3xl mx-auto">
      <Skeleton className="h-4 w-48 ml-auto mr-8 mb-1" />
      <div className="bg-gray-100 h-full w-full pb-6 flex flex-col justify-center gap-7">
        {/* Header */}
        <div className="flex justify-between px-8 sm:px-17 items-center">
          <Skeleton className="h-6 w-48 mt-6" />
          <Skeleton className="h-5 w-12" />
        </div>

        {/* Balance */}
        <div className="flex flex-col items-center">
          <Skeleton className="h-10 w-32" />
          <div className="flex items-center gap-1 mt-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>

        {/* Account & Routing Card */}
        <div className="w-full h-full max-w-100 sm:max-w-152 lg:max-w-172 place-self-center bg-white flex flex-col rounded-lg drop-shadow-lg px-4 py-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3 mt-2" />
          </div>
        </div>

        {/* Transactions Card */}
        <div className="w-full h-full max-w-100 sm:max-w-152 lg:max-w-172 place-self-center bg-white flex flex-col rounded-lg drop-shadow-lg px-[0.300rem]">
          <div className="flex items-center justify-between px-4 py-2">
            <Skeleton className="h-5 w-40" />
          </div>
          
          {/* Transaction rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex justify-between px-4 py-3 border-b border-gray-300">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-48" />
              </div>
              <div className="text-right flex flex-col gap-1">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-3 w-16 ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}