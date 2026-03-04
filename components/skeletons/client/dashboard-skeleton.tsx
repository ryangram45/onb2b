import { DashboardTileSkeleton } from "./dashboard-tile-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="pt-42 pb-20 w-full max-w-3xl mx-auto flex flex-col gap-5 sm:px-0">
      <div className="grid grid-cols-2 gap-4 mb-5 justify-items-center py-3 px-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <DashboardTileSkeleton key={index} />
        ))}
        <div className="col-span-2 flex justify-center items-center mt-5">
          <Skeleton className="h-10 w-48 rounded-full" />
        </div>
      </div>
      
      <div className="bg-gray-50 py-6 sm:px-12">
        <Skeleton className="h-24 w-full" />
        <div className="w-full h-full py-5 px-3 sm:px-7 flex flex-col gap-2">
          <Skeleton className="h-4 w-64" />
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>
        <Skeleton className="h-16 w-full mt-4" />
        <div className="grid grid-cols-2 gap-3 px-14 mt-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-6 w-24" />
          ))}
        </div>
      </div>
    </div>
  );
}