import * as React from "react"
import { GoLightBulb } from "react-icons/go"
import { cn } from "@/lib/utils"

export default function InfoNote({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("bg-white rounded-lg p-4 sm:p-5 mt-4 shadow-md shadow-gray-200/60", className)}>
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center size-7 p-1 rounded-full border border-onb2b-blue-950">
          <GoLightBulb className="text-onb2b-blue-950" size={18} />
        </div>
        <div className="text-[0.9rem] text-gray-800">
          {children}
        </div>
      </div>
    </div>
  )
}