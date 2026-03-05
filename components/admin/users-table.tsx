"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserStatusToggle } from "@/components/admin/users-status-toggle";
import GenerateHistoryModal from "@/components/admin/generate-history-modal";
import UserRowLink from "@/components/admin/user-row-link";
import { cn } from "@/lib/utils";


type User = {
  id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  role: string;
  isActive: boolean;
};

export default function UsersTable({ users }: { users: User[] }) {
  const [bankModalOpen, setBankModalOpen] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  function openBankModal(user: User) {
    setSelectedUser(user);
    setBankModalOpen(true);
  }

  function openCardModal(user: User) {
    setSelectedUser(user);
    setCardModalOpen(true);
  }

  const getUserDisplayName = (user: User): string => {
    return user.fullName || `${user.firstName} ${user.lastName}`;
  };

  return (
    <>
        <Table>
          <TableHeader className="bg-onb2b-blue-50 dark:bg-onb2b-blue-950/20">
            <TableRow>
              <TableHead className="text-onb2b-blue-900 dark:text-onb2b-blue-300 font-semibold">#</TableHead>
              <TableHead className="text-onb2b-blue-900 dark:text-onb2b-blue-300 font-semibold">First Name</TableHead>
              <TableHead className="text-onb2b-blue-900 dark:text-onb2b-blue-300 font-semibold">Last Name</TableHead>
              <TableHead className="text-onb2b-blue-900 dark:text-onb2b-blue-300 font-semibold">Email</TableHead>
              <TableHead className="text-onb2b-blue-900 dark:text-onb2b-blue-300 font-semibold">Role</TableHead>
              <TableHead className="text-onb2b-blue-900 dark:text-onb2b-blue-300 font-semibold">Active</TableHead>
              <TableHead colSpan={2} className="text-onb2b-blue-900 dark:text-onb2b-blue-300 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user, index) => (
              <TableRow 
                key={user.id}
                className="hover:bg-onb2b-blue-50/50 dark:hover:bg-onb2b-blue-950/20 transition-colors"
              >
                <TableCell>
                  <UserRowLink id={user.id} index={index} />
                </TableCell>
                <TableCell className="">{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>

                <TableCell>
                  <Badge
                    className={cn(
                      "capitalize",
                      user.role === "admin" 
                        ? "bg-onb2b-blue-100 text-onb2b-blue-800 dark:bg-onb2b-blue-900 dark:text-onb2b-blue-300" 
                        : "bg-transparent border-onb2b-blue-100 text-onb2b-blue-700"
                    )}
                  >
                    {user.role}
                  </Badge>
                </TableCell>

                <TableCell>
                  <UserStatusToggle
                    userId={user.id}
                    initialStatus={user.isActive}
                  />
                </TableCell>

                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => openBankModal(user)}
                    className="bg-onb2b-blue-800 hover:bg-onb2b-blue-800/90 text-white dark:bg-onb2b-blue-700 dark:hover:bg-onb2b-blue-800 cursor-pointer"
                  >
                    Bank History
                  </Button>
                </TableCell>

                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openCardModal(user)}
                    className="border-onb2b-blue-100 text-onb2b-blue-700 shadow-none hover:bg-onb2b-blue-50 hover:text-onb2b-blue-700 cursor-pointer"
                  >
                    Card History
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      {/* Bank History Modal */}
      {selectedUser && (
        <>
          <GenerateHistoryModal
            open={bankModalOpen}
            onClose={() => setBankModalOpen(false)}
            endpoint={`/api/admin/users/${selectedUser.id}/generate-bank-history`}
            title="Generate Bank History"
            userName={getUserDisplayName(selectedUser)}
            type="bank"
          />

          {/* Card History Modal */}
          <GenerateHistoryModal
            open={cardModalOpen}
            onClose={() => setCardModalOpen(false)}
            endpoint={`/api/admin/users/${selectedUser.id}/generate-card-history`}
            title="Generate Card History"
            userName={getUserDisplayName(selectedUser)}
            type="card"
          />
        </>
      )}
    </>
  );
}