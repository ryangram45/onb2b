"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import HeaderBanner from "@/app/(public)/_components/header-banner"


export default function OtpPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
      return;
    }
    if (!(session as any)?.otpPending) {
      router.push("/home/account");
    }
  }, [session, status, router]);

  async function handleSubmit() {
    if (!code.trim() || code.length < 5) {
      toast.error("Please enter a valid code");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Invalid code");
        return;
      }

      // Clear otp pending flag
      // await update?.({ otpPending: false } as any);  // if you still use update
      // toast.success("Verification successful");
      router.push("/home/account");
    } catch (err) {
      console.error("OTP verification error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleCancel = () => {
    router.push("/login/sign-in");
  };

  if (status === "loading") {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <section className="flex flex-col container mx-auto inset-x-0 md:max-w-[60rem]">
    <HeaderBanner/>
    <AuthWrapper bannerText="Verify Your Identity">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl tracking-tight">
            Enter Authorization Code
          </h1>
          <p className="mt-2 text-black text-sm">
            To verify your identity, we need to provide you an authorization code.
          </p>
          <p className="mt-2.5 text-black text-sm">
            Call <span className="text-onb2b-blue-900">800,933,6262</span> to get the code.
          </p>
        </div>

        <div className="space-y-2 max-w-[12rem]">
          <Label htmlFor="otp">Authorization Code</Label>
          <Input
            id="otp"
            value={code}
            onChange={(e) => setCode(e.target.value.trim())}
            placeholder="XXXXXX"
            maxLength={6}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary shadow-none h-8 px-1.5 rounded-sm [&::placeholder]:text-muted-foreground [&::placeholder]:opacity-100"
            disabled={loading}
          />
        </div>

        <div className="flex gap-4 md:mb-16 max-w-[12rem]">
          <Button
            size="xi"
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-gradient-to-b from-onb2b-blue-900 to-onb2b-blue-950 shadow-none cursor-pointer font-bold tracking-wider"
          >
            {/* {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
            SUBMIT
          </Button>

          <Button
            size="xi"
            variant="outline"
            className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100 shadow-none cursor-pointer font-bold text-gray-700 tracking-wider"
            onClick={handleCancel}
            disabled={loading}
          >
            CANCEL
          </Button>
        </div>
      </div>
    </AuthWrapper>
    </section>
  );
}
