"use client"
import { FaFacebook, FaInstagram, FaLinkedinIn, FaPinterest, FaYoutube } from "react-icons/fa"
import { RiTwitterXFill } from "react-icons/ri"
import { footerTopNavItems } from "@/app/(public)/data"


export default function Footer() {
  return (
    <footer className="w-full text-white px-4 sm:px-6 lg:px-12">
      <div className="px-4 sm:px-6 lg:px-12 py-10 md:py-12 lg:py-16 bg-onb2b-blue-1000">
        {/* Top Navigation */}
        <nav aria-label="Footer navigation" className="mb-10 md:mb-12">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
            {footerTopNavItems.map((item, index) => (
              <li key={item} className="inline-flex items-center">
                <a
                  href="#"
                  className="hover:underline"
                >
                  {item}
                </a>
                {index < footerTopNavItems.length - 1 && (
                  <span className="text-white/50 mx-2">|</span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Connect with Us */}
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold mb-3">
            Connect with us
          </h3>

          <ul className="flex justify-center gap-6 md:gap-8">
            <li>
              <a href="#" aria-label="Facebook">
                <FaFacebook className="h-7 w-7" />
              </a>
            </li>
            <li>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="h-7 w-7" />
              </a>
            </li>
            <li>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn className="h-7 w-7" />
              </a>
            </li>
            <li>
              <a href="#" aria-label="Pinterest">
                <FaPinterest className="h-7 w-7" />
              </a>
            </li>
            <li>
              <a href="#" aria-label="X">
                <RiTwitterXFill className="h-7 w-7" />
              </a>
            </li>
            <li>
              <a href="#" aria-label="YouTube">
                <FaYoutube className="h-7 w-7" />
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Text */}
        <div className="text-center text-sm text-white/90 space-y-2">
          <p>
            Bank of America, N.A. Member FDIC.{" "}
            <span className="underline">Equal Housing Lender</span>.
          </p>
          <p>
            © 2026 Bank of America Corporation. All rights reserved.
          </p>
          <p>
            Patent:{" "}
            <a href="#" className="underline hover:text-white/90">
              patents.bankofamerica.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}