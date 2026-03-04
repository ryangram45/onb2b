"use client";

import { Suspense } from "react";
import WireProcessingClient from "./client";

export default function WireProcessingPage() {
  return (
    <Suspense fallback={<div />}>
      <WireProcessingClient />
    </Suspense>
  );
}
