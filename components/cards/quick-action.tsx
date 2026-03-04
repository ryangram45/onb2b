"use client";

import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

type ColorType = "blue" | "red" | "gray" | "purple";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: ColorType;
  onClick?: () => void;
  href?: string;
}

export default function QuickActionCard({
  title,
  description,
  icon,
  color,
  onClick,
  href,
}: QuickActionCardProps) {
  const colors = {
    blue: "bg-onb2b-blue-50 text-onb2b-blue-600 dark:bg-onb2b-blue-950 dark:text-onb2b-blue-400",
    red: "bg-onb2b-red-50 text-onb2b-red-450 dark:bg-onb2b-red-950 dark:text-onb2b-red-400",
    gray: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  };

  const content = (
    <Card
      onClick={onClick}
      className={cn(
        "h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 shadow-red-100/20 border-none cursor-pointer",
      )}
    >
      <CardContent className="p-6 h-full flex flex-col">
        <div
          className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center mb-4",
            colors[color]
          )}
        >
          {icon}
        </div>
        <div className="flex flex-col flex-1">
          <h3 className="font-semibold flex-shrink-0">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 flex-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );

  // If href exists, wrap in Link
  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}