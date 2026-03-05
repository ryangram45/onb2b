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
import { adminCreateUserSchema, AdminCreateUserValues } from "@/lib/dto/zod-schemas";
import { Label } from "@/components/ui/label";
import { UserRole, UserRoleType } from "@/lib/constants/roles";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function CreateUserPage() {
  const router = useRouter();
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue,
    // watch 
  } = useForm<AdminCreateUserValues>({
    resolver: zodResolver(adminCreateUserSchema) as Resolver<AdminCreateUserValues>,
  });

  const onSubmit = async (data: AdminCreateUserValues) => {
    const response = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        toast(result.error);
        return;
    }

    toast.success("User created successfully")
    router.push("/admin/users")
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <Input placeholder="User ID" {...register("userId")} />
        {errors.userId && <p className="text-red-500 text-sm">{errors.userId.message}</p>}
      </div>

      <div>
        <Input placeholder="First Name" {...register("firstName")} />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
      </div>

      <div>
        <Input placeholder="Last Name" {...register("lastName")} />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
      </div>

      <div>
        <Input placeholder="Email" {...register("email")} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <Input type="password" placeholder="Password" {...register("password")} />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div>
        <Label htmlFor="creditCard.cardName">Credit Card Display Name </Label>
        <Input
          id="creditCard.cardName"
          placeholder="e.g. Doc, Unlimited Cash Rewards"
          {...register("creditCard.cardName")}
        />
        {errors.creditCard?.cardName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.creditCard.cardName.message}
          </p>
        )}
      </div>

      <div>
        <Select 
          onValueChange={(value) => setValue("role", value as UserRoleType)}
          defaultValue={UserRole.CLIENT}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={UserRole.CLIENT}>Client</SelectItem>
            <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox 
          id="isActive" 
          defaultChecked 
          onCheckedChange={(checked) => setValue("isActive", checked === true)}
        />
        <Label htmlFor="isActive">Active</Label>
      </div>

      <Button type="submit">Create User</Button>
    </form>
  );
}