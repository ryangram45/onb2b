"use client";

import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { adminCreateUserSchema, AdminCreateUserValues } from "@/lib/dto/zod-schemas";
import { Label } from "@/components/ui/label";
import { UserRole, UserRoleType } from "@/lib/constants/roles";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { X, CreditCard, Mail, User, KeyRound, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateUserModal({ open, onOpenChange }: CreateUserModalProps) {
  const router = useRouter();
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue,
    reset
  } = useForm<AdminCreateUserValues>({
    resolver: zodResolver(adminCreateUserSchema) as Resolver<AdminCreateUserValues>,
    defaultValues: {
      role: UserRole.CLIENT,
      isActive: true,
    },
  });

  const onSubmit = async (data: AdminCreateUserValues) => {
    const response = await fetch("/api/admin/create-user", {
      method: "POST",
      headers: {"content-Type": "application/json"},
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.error, {
        className: "border-onb2b-red-450 text-onb2b-red-700",
      });
      return;
    }

    toast.success("User created successfully", {
      className: "border-green-500 text-green-600",
    });
    reset();
    onOpenChange(false);
    router.refresh();
  };

  const inputBase = "border border-gray-200 rounded-md focus:outline-none focus:border-2 focus:border-onb2b-blue-800";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="pt-2 rounded-xl w-full bg-[linear-gradient(105deg,var(--onb2b-red-900)_55%,var(--onb2b-blue-1000)_45%)]" />    
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            Create New User
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the user&apos;s information below to register them in the system
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6">
          <div className="grid gap-4 py-4">
            {/* User ID & Email */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userId" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-onb2b-blue-600" />
                  User ID
                </Label>
                <Input
                  id="userId"
                  placeholder="johndoe123"
                  {...register("userId")}
                  className={cn(
                    inputBase,
                    errors.userId && "border-2 border-onb2b-red-450"
                  )}
                />
                {errors.userId && (
                  <p className="text-xs text-onb2b-red-450 flex items-center gap-1">
                    <X className="h-3 w-3" /> {errors.userId.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-onb2b-blue-600" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                  className={cn(
                    inputBase,
                    errors.email && "border-2 border-onb2b-red-450"
                  )}
                />
                {errors.email && (
                  <p className="text-xs text-onb2b-red-450 flex items-center gap-1">
                    <X className="h-3 w-3" /> {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  {...register("firstName")}
                  className={cn(
                    inputBase,
                    errors.firstName && "border-2 border-onb2b-red-450"
                  )}
                />
                {errors.firstName && (
                  <p className="text-xs text-onb2b-red-450">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register("lastName")}
                  className={cn(
                    inputBase,
                    errors.lastName && "border-2 border-onb2b-red-450"
                  )}
                />
                {errors.lastName && (
                  <p className="text-xs text-onb2b-red-450">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-onb2b-blue-600" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={cn(
                  inputBase,
                  errors.password && "border-2 border-onb2b-red-450"
                )}
              />
              {errors.password && (
                <p className="text-xs text-onb2b-red-450">{errors.password.message}</p>
              )}
            </div>

            {/* Credit Card Display Name */}
            <div className="space-y-2">
              <Label htmlFor="creditCard.cardName" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-onb2b-blue-600" />
                Credit Card Display Name
              </Label>
              <Input
                id="creditCard.cardName"
                placeholder="e.g. Visa Personal"
                {...register("creditCard.cardName")}
                className={cn(
                  inputBase,
                  errors.creditCard?.cardName && "border-2 border-onb2b-red-450"
                )}
              />
              {errors.creditCard?.cardName && (
                <p className="text-xs text-onb2b-red-450">{errors.creditCard.cardName.message}</p>
              )}
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role" className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-onb2b-blue-600" />
                Role
              </Label>
              <Select 
                onValueChange={(value) => setValue("role", value as UserRoleType)}
                defaultValue={UserRole.CLIENT}
              >
                <SelectTrigger className="border border-gray-200 rounded-md focus:outline-none focus:border-2 focus:border-onb2b-blue-800">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserRole.CLIENT}>Client</SelectItem>
                  <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-2 pt-2">
              <Checkbox 
                id="isActive" 
                defaultChecked 
                onCheckedChange={(checked) => setValue("isActive", checked === true)}
                className="border border-gray-300 data-[state=checked]:bg-onb2b-blue-600 data-[state=checked]:border-onb2b-blue-600"
              />
              <Label htmlFor="isActive" className="text-sm font-normal cursor-pointer">
                Activate account upon creation
              </Label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border border-gray-200 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-onb2b-blue-900 hover:bg-onb2b-blue-800 cursor-pointer text-white"
            >
              Create User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
