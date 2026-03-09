"use client";

import { Suspense } from "react";
import WireOtpClient from "./client";

export default function WireOtpPage() {
  return (
    <Suspense fallback={<div />}>
      <WireOtpClient />
    </Suspense>
  );
}
