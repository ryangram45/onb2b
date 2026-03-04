"use client";

import { Suspense } from "react";
import ReviewWireDetailClient from "./client";

export default function ReviewWireDetailPage() {
  return (
    <Suspense fallback={<div />}>
      <ReviewWireDetailClient />
    </Suspense>
  );
}
