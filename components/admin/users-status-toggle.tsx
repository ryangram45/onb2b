"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface UserStatusToggleProps {
  userId: string;
  initialStatus: boolean;
}

export function UserStatusToggle({ userId, initialStatus }: UserStatusToggleProps) {
  const [isActive, setIsActive] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    const newStatus = !isActive;

    try {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setIsActive(newStatus);
      toast.success(
        <span className={newStatus ? "text-green-600" : "text-onb2b-red-450"}>
          User {newStatus ? "activated" : "deactivated"} successfully
        </span>
      );
    } catch (error) {
      toast.error("Failed to update user status", {
        className: "border-onb2b-red-450 text-onb2b-red-700",
      });
      console.error(error);
      setIsActive(initialStatus);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={isActive}
        onCheckedChange={handleToggle}
        disabled={isLoading}
        className={cn(
          "data-[state=checked]:bg-onb2b-blue-800 data-[state=unchecked]:bg-gray-300",
          "dark:data-[state=checked]:bg-onb2b-blue-700 dark:data-[state=unchecked]:bg-gray-600"
        )}
        aria-label="Toggle user active status"
      />
      <span className={cn(
        "text-sm text-muted-foreground"
      )}>
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
}