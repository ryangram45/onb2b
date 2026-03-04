import type React from "react";
import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Onb2b",
  description:
    "What would you like the power to do? At onb2b, our purpose is to help make financial lives better through the power of every connection.",
  keywords: [
    "bank",
    "banks",
    "banking",
    "finance",
    "finances",
    "financial",
    "financial institution",
    "financial planning",
    "personal finance",
    "personal finances",
    "financial management",
  ],
  icons: {
    icon: [
      {
        url: "/favicon-light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} ${_quicksand.variable} font-sans antialiased`}>
          <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
