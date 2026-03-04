"use client";

import { Suspense } from "react";
import ChooseAccountClient from "./client";

export default function ChooseAccountPage() {
  return (
    <Suspense fallback={<div />}>
      <ChooseAccountClient />
    </Suspense>
  );
}
