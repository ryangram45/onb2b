"use client";

import { MdLock } from "react-icons/md";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AuthWrapperProps {
  children: React.ReactNode;
  bannerText?: string;
  showLoginHeader?: boolean;
}

export function AuthWrapper({
  children,
  bannerText = "Log In",
  showLoginHeader = true,
}: AuthWrapperProps) {
  return (
    <section className="flex flex-col container mx-auto inset-x-0 md:max-w-[60rem]">
      {/* Header */}
      {showLoginHeader && (
        <div className="container mx-auto py-4 px-5 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/images/fullLogo.svg"
              alt="Bank of America"
              width={180}
              height={50}
              className="object-contain"
              priority
            />
            <span className="text-lg font-medium text-gray-700">Log In</span>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <div className="flex items-center gap-1.5 font-medium border-r-2 border-dotted">
              <MdLock className="text-lg" />
              Secure Area
            </div>
            <span className="text-sm text-gray-500 hidden sm:block">
              En español
            </span>
          </div>
        </div>
      )}

      {/* Red Banner */}
      <div
        className={cn(
          "bg-onb2b-red-450 text-white py-3 px-6 sm:px-19 lg:px-6 sm:text-[1.089rem] lg:text-[1.2rem]",
        )}
      >
        {bannerText}
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-start justify-left py-10 px-5">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Footer */}
      <footer className="bg-[#f3efea] py-8 px-6 md:px-12 lg:px-16 text-xs md:text-sm text-gray-700 border-t">
        <div className="max-w-5xl mx-auto space-y-3">
          <p className="flex items-center gap-2 font-bold text-base text-gray-800/90">
            <MdLock />
            Secure Area
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-1 text-onb2b-blue-800/70">
            {["Privacy", "Security", "Your Privacy Choices"].map((item, index, arr) => (
              <div key={item} className="flex items-center gap-3">
                <span className="hover:underline cursor-pointer">{item}</span>
                {index < arr.length - 1 && (
                  <span className="h-3.5 border-r border-onb2b-blue-800/40" />
                )}
              </div>
            ))}
          </div>

          <p>
            Bank of America, N.A. Member FDIC.{" "}
            <span className="text-onb2b-blue-800/60">Equal Housing Lender</span>
          </p>

          <p className="text-gray-600">© 2026 Bank of America Corporation</p>
        </div>
      </footer>
    </section>
  );
}
