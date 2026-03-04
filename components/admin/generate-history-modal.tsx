"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  endpoint: string;
  title: string;
  userName: string;
  type: "bank" | "card";
}

interface FormValues {
  startDate: string;
  endDate: string;
}

export default function GenerateHistoryModal({
  open,
  onClose,
  endpoint,
  title,
  userName,
  type,
}: Props) {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        toast.error("Failed to generate history");
        return;
      }

      toast.success("History generated");
      router.refresh();
      reset();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const historyType = type === "bank" ? "bank transactions" : "credit card transactions";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Select date range to generate {historyType} for {userName}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="date"
            {...register("startDate")}
            required
            disabled={loading}
          />

          <Input
            type="date"
            {...register("endDate")}
            required
            disabled={loading}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading} className="bg-onb2b-blue-800">
              {loading ? "Generating..." : "Generate"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
