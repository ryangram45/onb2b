"use client";
import React from "react";

export default function HeaderBanner() {
  return (
    <header className="w-full bg-gray-100 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-1.5 text-gray-900 dark:text-gray-200">
        <div className="lg:hidden">
          <p className="text-center italic text-[0.68rem]">
            Bank of America deposit products:
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="font-bold not-italic text-onb2b-blue-1000 dark:text-onb2b-blue-400 text-[1rem] -mt-1">
              FDIC
            </span>
            <span className="italic text-[0.68rem]">
              FDIC-Insured - Backed by the full faith and credit of the U.S. Government
            </span>
          </div>
        </div>
        <div className="hidden lg:block text-center text-[0.813rem] italic">
          Bank of America deposit products:{" "}
          <span className="font-bold not-italic text-[1.125rem] text-onb2b-blue-1000 dark:text-onb2b-blue-400">
            FDIC{" "}
          </span>
          FDIC-Insured - Backed by the full faith and credit of the U.S. Government
        </div>
      </div>
    </header>
  );
}
