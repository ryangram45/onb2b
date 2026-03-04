"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn, getSession } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { loginFormSchema } from "@/lib/dto/zod-schemas";
import { UserRole } from "@/lib/constants/roles";

type FormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      userId:
        typeof window !== "undefined"
          ? localStorage.getItem("savedUserId") || ""
          : "",
      password: "",
      rememberUserId: !!(
        typeof window !== "undefined" &&
        localStorage.getItem("savedUserId")
      ),
    },
  });

  const onSubmit = async (data: FormValues) => {
    const response = await signIn("credentials", {
      redirect: false,
      userId: data.userId,
      password: data.password,
    });

    if (!response || response.error) {
      toast("Incorrect user ID or password");
      return;
    }

    if (data.rememberUserId) {
      localStorage.setItem("savedUserId", data.userId);
    } else {
      localStorage.removeItem("savedUserId");
    }

    const session = await getSession();

    // OTP required
    if ((session as any)?.otpPending) {
      router.push("/otp");
      return;
    }

    if (session?.user?.role === UserRole.ADMIN) {
      router.push("/admin/dashboard");
    } else {
      router.push("/home/account");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-4", className)}
    >
      <div className="space-y-2">
        <Label htmlFor="userId">User ID</Label>
        <Input
          id="userId"
          {...register("userId")}
          className="border-onb2b-blue-700 focus-visible:ring-onb2b-blue-700"
        />
        {errors.userId && (
          <p className="text-sm text-onb2b-red-700">
            {errors.userId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          className="border-onb2b-blue-700 focus-visible:ring-onb2b-blue-700"
        />
        {errors.password && (
          <p className="text-sm text-onb2b-red-700">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="rememberUserId" {...register("rememberUserId")} />
        <Label htmlFor="rememberUserId" className="text-sm font-normal">
          Save user ID
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-onb2b-blue-950 hover:bg-onb2b-blue-900 text-white font-medium cursor-pointer rounded-full h-0 py-5.5 px-3"
      >
        Log in
      </Button>

      <div className="flex flex-col text-sm text-onb2b-blue-800 hover:text-onb2b-blue-700 space-y-1 text-center">
        <a href="#" className="underline">
          Forgot user ID/password
        </a>
        <div className="flex gap-4 items-center justify-center">
          <a href="#" className="underline">
            Security & Help
          </a>
          <a href="#" className="underline">
            Enroll
          </a>
        </div>
      </div>
    </form>
  );
}