"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import GenerateHistoryModal from "@/components/admin/generate-history-modal";
import { CreditCard, Lock } from "lucide-react";

type UserHistoryActionsProps = {
  userId: string;
  userDisplayName: string;
  align?: "start" | "end";
};

export default function UserHistoryActions({
  userId,
  userDisplayName,
  align = "end",
}: UserHistoryActionsProps) {
  const [isBankHistoryModalOpen, setIsBankHistoryModalOpen] = useState(false);
  const [isCardHistoryModalOpen, setIsCardHistoryModalOpen] = useState(false);

  const bankHistoryEndpoint = `/api/admin/users/${userId}/generate-bank-history`;
  const cardHistoryEndpoint = `/api/admin/users/${userId}/generate-card-history`;

  return (
    <>
      <div className={`flex gap-2 ${align === "end" ? "self-end" : ""}`}>
        <Button
          className="bg-onb2b-blue-600 hover:bg-onb2b-blue-700 text-white cursor-pointer"
          onClick={() => setIsBankHistoryModalOpen(true)}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Generate Bank History
        </Button>
        <Button
          variant="outline"
          className="border-onb2b-red-450 text-onb2b-red-450 hover:bg-onb2b-red-50 hover:text-onb2b-red-450 cursor-pointer"
          onClick={() => setIsCardHistoryModalOpen(true)}
        >
          <Lock className="h-4 w-4 mr-2" />
          Generate Card History
        </Button>
      </div>

      <GenerateHistoryModal
        open={isBankHistoryModalOpen}
        onClose={() => setIsBankHistoryModalOpen(false)}
        endpoint={bankHistoryEndpoint}
        title="Generate Bank History"
        userName={userDisplayName}
        type="bank"
      />

      <GenerateHistoryModal
        open={isCardHistoryModalOpen}
        onClose={() => setIsCardHistoryModalOpen(false)}
        endpoint={cardHistoryEndpoint}
        title="Generate Card History"
        userName={userDisplayName}
        type="card"
      />
    </>
  );
}
