"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PageBackHeader({ title }: { title?: string }) {
  const router = useRouter();
  return (
    <div className="mb-4 flex items-center gap-3">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full cursor-pointer hover:bg-transparent"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-5 w-5 text-onb2b-blue-900" />
      </Button>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
