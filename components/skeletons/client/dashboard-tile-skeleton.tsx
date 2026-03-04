import { Skeleton } from "@/components/ui/skeleton";

export function DashboardTileSkeleton() {
  return (
    <div className="drop-shadow-lg bg-white w-full py-6 px-6 flex flex-col items-center justify-center text-center content-center gap-2">
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="h-4 w-32 mt-2" />
      <Skeleton className="h-8 w-24 mt-1" />
      <Skeleton className="h-3 w-28" />
    </div>
  );
}