"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getLastDigits } from "@/utils/string-utils";
import SecureFooter from "@/components/common/secure-footer";
import { countryFlagByName } from "@/app/(authenticated)/(client)/home/make-pass/wire/data";

export default function ReviewDetailsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const country = useMemo(
    () => searchParams.get("country") || "",
    [searchParams],
  );
  const currency = useMemo(
    () => searchParams.get("currency") || "",
    [searchParams],
  );
  const firstName = useMemo(
    () => searchParams.get("firstName") || "",
    [searchParams],
  );
  const lastName = useMemo(
    () => searchParams.get("lastName") || "",
    [searchParams],
  );
  const nickName = useMemo(
    () => searchParams.get("nickName") || "",
    [searchParams],
  );
  const recipientAddress = useMemo(
    () => searchParams.get("recipientAddress") || "",
    [searchParams],
  );
  const city = useMemo(() => searchParams.get("city") || "", [searchParams]);
  const state = useMemo(() => searchParams.get("state") || "", [searchParams]);
  const zipPostalCode = useMemo(
    () => searchParams.get("zipPostalCode") || "",
    [searchParams],
  );
  const routingNumber = useMemo(
    () => searchParams.get("routingNumber") || "",
    [searchParams],
  );
  const accountNumber = useMemo(
    () =>
      searchParams.get("accountNumber") ||
      searchParams.get("recipientAccountNumber") ||
      "",
    [searchParams],
  );
  const swiftBic = useMemo(
    () => searchParams.get("swiftBic") || "",
    [searchParams],
  );

  const recipientFullName = [firstName, lastName].filter(Boolean).join(" ");
  const maskedAccount = accountNumber
    ? `*****${getLastDigits(accountNumber, 4)}`
    : "—";

  const handleEditClick = () => {
    const params = new URLSearchParams();
    if (country) params.set("country", country);
    if (currency) params.set("currency", currency);
    if (firstName) params.set("firstName", firstName);
    if (lastName) params.set("lastName", lastName);
    if (nickName) params.set("nickName", nickName);
    if (recipientAddress) params.set("recipientAddress", recipientAddress);
    if (city) params.set("city", city);
    if (state) params.set("state", state);
    if (zipPostalCode) params.set("zipPostalCode", zipPostalCode);
    if (routingNumber) params.set("routingNumber", routingNumber);
    if (accountNumber) params.set("accountNumber", accountNumber);
    if (swiftBic) params.set("swiftBic", swiftBic);
    const path =
      country === "United States"
        ? "/home/make-pass/wire/domestic-details"
        : "/home/make-pass/wire/details";
    router.push(`${path}?${params.toString()}`);
  };

  const handleAddClick = async () => {
    const payload: any = {
      country,
      currency,
      accountType: searchParams.get("accountType") || "Personal",
      receiverAccount:
        searchParams.get("receiverAccount") || "Someone else's account",
      firstName,
      lastName,
      nickName,
      recipientAddress,
      state,
      city,
      zipPostalCode,
      recipientAccountNumber: accountNumber,
    };
    if (country === "United States") {
      payload.routingNumber = routingNumber;
    } else {
      payload.swiftBic = swiftBic;
    }
    const res = await fetch("/api/me/recipients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => undefined);
    let recipientId = "";
    if (res && res.ok) {
      try {
        const json = await res.json();
        recipientId = json?.id || "";
      } catch {}
    }
    const params = new URLSearchParams();
    if (recipientId) params.set("recipientId", recipientId);
    if (country) params.set("country", country);
    if (currency) params.set("currency", currency);
    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    if (fullName) params.set("recipientName", fullName);
    router.push(
      `/home/make-pass/wire/send/choose-account?${params.toString()}`,
    );
  };

  return (
    <div className="mx-auto max-w-screen-md px-4 pb-28 pt-20">
      <div className="bg-white rounded-lg p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900 tracking-wide mb-4">
          Does everything look okay?
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-[0.95rem] font-semibold text-gray-900">
              Recipient Details
            </h3>
            <div className="mt-2 divide-y divide-gray-200">
              <div className="flex items-center justify-between py-2">
                <span className="text-[0.95rem] text-gray-700">Send to</span>
                <span className="flex items-center gap-2 text-[0.95rem] font-medium text-gray-900">
                  <span>{country || "—"}</span>
                  {country && (
                    <span className="text-xl leading-none">
                      {countryFlagByName[country] || ""}
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[0.95rem] text-gray-700">Recipient</span>
                <span className="text-[0.95rem] font-medium text-gray-900">
                  {recipientFullName || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[0.95rem] text-gray-700">
                  Nickname (optional)
                </span>
                <span className="text-[0.95rem] font-medium text-gray-900">
                  {nickName || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[0.95rem] text-gray-700">
                  Recipient address
                </span>
                <span className="text-[0.95rem] font-medium text-gray-900">
                  {recipientAddress || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[0.95rem] text-gray-700">City</span>
                <span className="text-[0.95rem] font-medium text-gray-900">
                  {city || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[0.95rem] text-gray-700">State</span>
                <span className="text-[0.95rem] font-medium text-gray-900">
                  {state || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[0.95rem] text-gray-700">ZIP code</span>
                <span className="text-[0.95rem] font-medium text-gray-900">
                  {zipPostalCode || "—"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[0.95rem] font-semibold text-gray-900">
              Bank Details
            </h3>
            <div className="mt-2 divide-y divide-gray-200">
              {country === "United States" ? (
                <>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[0.95rem] text-gray-700">
                      Routing number
                    </span>
                    <span className="text-[0.95rem] font-medium text-gray-900">
                      {routingNumber || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[0.95rem] text-gray-700">
                      Account number
                    </span>
                    <span className="text-[0.95rem] font-medium text-gray-900">
                      {maskedAccount}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[0.95rem] text-gray-700">
                      SWIFT/BIC code
                    </span>
                    <span className="text-[0.95rem] font-medium text-gray-900">
                      {swiftBic || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[0.95rem] text-gray-700">
                      Account number
                    </span>
                    <span className="text-[0.95rem] font-medium text-gray-900">
                      {maskedAccount}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 grid place-items-center">
          <Button
            variant="outline"
            onClick={handleEditClick}
            className="rounded-full px-6 cursor-pointer"
          >
            EDIT
          </Button>
        </div>
      </div>

      <SecureFooter />

      <div className="fixed bottom-0 left-0 right-0 mx-auto border-t border-gray-200 flex items-center justify-center py-2 px-4 sm:px-6 max-w-screen-md z-50 bg-white/50">
        <Button
          onClick={handleAddClick}
          className="rounded-full bg-onb2b-blue-950 font-semibold tracking-wide hover:bg-onb2b-blue-1000 cursor-pointer px-6"
        >
          ADD
        </Button>
      </div>
    </div>
  );
}
