"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UserRole } from "@/lib/constants/roles";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
 
type UserDto = {
  id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt?: string | Date;
};

export default function EditUserModal({
  open,
  onOpenChange,
  user,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserDto | null;
}) {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: UserRole.CLIENT as string,
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
 
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        role: user.role ?? UserRole.CLIENT,
        isActive: Boolean(user.isActive),
      });
      setEditMode(false);
    }
  }, [user]);
 
  async function onSave() {
    if (!user) return;
    try {
      setSaving(true);
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Failed to update user");
        return;
      }
      toast.success("User updated");
      onOpenChange(false);
      router.refresh();
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  }
 
  if (!user) return null;
 
  const inputBase =
    "border border-gray-200 rounded-md focus:outline-none focus:border-2 focus:border-onb2b-blue-800 disabled:opacity-70";
 
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">User Details</DialogTitle>
        </DialogHeader>
 
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>User ID</Label>
              <Input value={user.userId ?? "—"} disabled />
            </div>
            <div className="space-y-1.5">
              <Label>Date Created</Label>
              <Input
                value={
                  user.createdAt
                    ? new Date(user.createdAt).toLocaleString()
                    : "—"
                }
                disabled
              />
            </div>
          </div>
 
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>First Name</Label>
              <Input
                value={form.firstName}
                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                disabled={!editMode}
                className={cn(inputBase)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Last Name</Label>
              <Input
                value={form.lastName}
                onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                disabled={!editMode}
                className={cn(inputBase)}
              />
            </div>
          </div>
 
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input value={user.fullName ?? `${form.firstName} ${form.lastName}`.trim()} disabled />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                disabled={!editMode}
                className={cn(inputBase)}
              />
            </div>
          </div>
 
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Select
                value={form.role}
                onValueChange={(val) => setForm((f) => ({ ...f, role: val }))}
                disabled={!editMode}
              >
                <SelectTrigger className="border border-gray-200 rounded-md">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserRole.CLIENT}>Client</SelectItem>
                  <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Active</Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, isActive: Boolean(v) }))}
                  disabled={!editMode}
                />
                <span className="text-sm text-muted-foreground">
                  {form.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </div>
 
        <DialogFooter className="mt-4 flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditMode((e) => !e)}
            className="cursor-pointer"
          >
            {editMode ? "Cancel" : "Edit"}
          </Button>
          <Button
            type="button"
            onClick={onSave}
            disabled={!editMode || saving}
            className="bg-onb2b-blue-800 text-white cursor-pointer"
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
