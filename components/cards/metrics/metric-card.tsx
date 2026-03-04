import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  trend?: number;
  trendLabel?: string;
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendLabel,
  className 
}: MetricCardProps) {
  const trendIsPositive = trend && trend > 0;
  
  return (
    <Card className={cn("overflow-hidden shadow-sm shadow-gray-100/90 border-none", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-onb2b-blue-50 dark:bg-onb2b-blue-950/20 flex items-center justify-center text-onb2b-blue-600 dark:text-onb2b-blue-400">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        
        {trend !== undefined && (
          <div className="flex items-center mt-1 text-xs">
            <span className={cn(
              "mr-1",
              trendIsPositive ? "text-green-600" : "text-red-600"
            )}>
              {trendIsPositive ? "↑" : "↓"} {Math.abs(trend)}%
            </span>
            <span className="text-muted-foreground">
              {trendLabel || "from last month"}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}