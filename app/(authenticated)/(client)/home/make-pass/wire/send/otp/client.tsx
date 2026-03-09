"use client";

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import InfoNote from "@/components/common/info-note";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { maskEmail } from "@/utils/string-utils";
import { toast } from "sonner";

export default function WireOtpClient() {
  const router = useRouter();
  const searchParameters = useSearchParams();
  const { data: session } = useSession();

  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resendCooldownSeconds, setResendCooldownSeconds] = useState<number>(60);
  const inputRef = useRef<HTMLInputElement>(null);

  const recipientId = searchParameters.get("recipientId") || "";
  const country = searchParameters.get("country") || "";
  const currency = searchParameters.get("currency") || "USD";
  const accountId = searchParameters.get("accountId") || "";
  const amountParam = searchParameters.get("amount") || "0";
  const accountLabel = searchParameters.get("accountLabel") || "";
  const note = searchParameters.get("note") || "";

  const maskedEmail = useMemo(() => maskEmail(session?.user?.email || ""), [session?.user?.email]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    let timer: any;
    if (resendCooldownSeconds > 0) {
      timer = setInterval(() => {
        setResendCooldownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldownSeconds]);

  useEffect(() => {
    // Send code on first render
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/me/send-wire-otp", { method: "POST" });
        if (!res.ok) throw new Error("Failed sending OTP");
      } catch {
        // Silent for now
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleResend = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/me/send-wire-otp", { method: "POST" });
      if (!res.ok) throw new Error("Failed sending OTP");
      setResendCooldownSeconds(60);
      toast.success("A new authorization code has been sent to your email");
    } catch {
      toast.error("We couldn't resend the code right now. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmCode = async () => {
    if (code.length !== 6) return;
    try {
      setLoading(true);
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!response.ok) {
        toast.error("Invalid or expired code");
        return;
      }
      const createActivityResponse = await fetch("/api/me/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Gift_Goal",
          amount: Number(amountParam),
          currency,
          recipientId,
          recipientName: "",
          accountId,
          accountLabel,
          note,
        }),
      });
      if (!createActivityResponse.ok) {
        toast.error("Could not record transfer activity");
        return;
      }
      const { confirmationNumber } = await createActivityResponse.json();

      const params = new URLSearchParams();
      if (recipientId) params.set("recipientId", recipientId);
      if (country) params.set("country", country);
      if (currency) params.set("currency", currency);
      if (accountId) params.set("accountId", accountId);
      if (amountParam) params.set("amount", amountParam);
      if (accountLabel) params.set("accountLabel", accountLabel);
      if (note) params.set("note", note);
      if (confirmationNumber) params.set("confirmationNumber", confirmationNumber);
      router.push(`/home/make-pass/wire/send/processing?${params.toString()}`);
    } catch {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const text = event.clipboardData.getData("text").replace(/\s/g, "");
    if (/^\d{6}$/.test(text)) {
      event.preventDefault();
      setCode(text);
    }
  };

  return (
    <div className="mx-auto max-w-screen-md px-4 pb-28 pt-14">
      <div className="bg-white rounded-lg p-5 sm:p-6">
        <div>
          <h1 className="text-xl tracking-tight">
            Authorize Transfer
          </h1>
          <p className="mt-3 text-black text-sm font-medium">
            Enter the authorization code sent to <span className="text-onb2b-blue-900 tracking-wider">{maskedEmail}</span>.
          </p>
        </div>

        <div className="mt-14">
          <div className="space-y-2 max-w-[12rem]">
            <Label htmlFor="otp">Authorization Code</Label>
            <Input
              id="otp"
              ref={inputRef}
              value={code}
              onChange={(e) => setCode(e.target.value.trim())}
              onPaste={handlePaste}
              placeholder="XXXXXX"
              maxLength={6}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary shadow-none h-8 px-1.5 rounded-sm [&::placeholder]:text-muted-foreground [&::placeholder]:opacity-100"
              disabled={loading}
            />
          </div>

          <div className="mt-4 mb-8">
            {resendCooldownSeconds > 0 ? (
              <span className="text-xs text-gray-600">Resend available in {resendCooldownSeconds}s</span>
            ) : (
              <button
                onClick={handleResend}
                disabled={loading}
                className="text-onb2b-blue-900 hover:underline hover:underline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
              >
                Resend code
              </button>
            )}
          </div>
        </div>

        <InfoNote>
          <p>This extra step adds an important layer of security to protect your account from unauthorized transfers. We require this for higher value or certain transactions to help prevent fraud and unauthorized access.</p>
        </InfoNote>
        <div className="fixed bottom-0 left-0 right-0 mx-auto border-t border-gray-200 flex items-center justify-between py-2 px-4 sm:px-6 max-w-screen-md z-50 bg-white/50">
          <Button
            variant="whiteGhost"
            onClick={() => router.back()}
            className="flex-1 rounded-full text-onb2b-blue-950 no-underline bg-white font-semibold tracking-wide cursor-pointer"
          >
            CANCEL
          </Button>
          <Button
            disabled={code.length !== 6}
            className="flex-1 rounded-full bg-onb2b-blue-950 font-semibold tracking-wide hover:bg-onb2b-blue-1000 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleConfirmCode}
          >
            CONFIRM
          </Button>
        </div>
      </div>
    </div>
  );
}