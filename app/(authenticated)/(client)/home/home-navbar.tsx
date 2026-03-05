"use client";
import React, { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Menu from "@/components/menu/menu";
import { Button } from "@/components/ui/button"
import { createPortal } from "react-dom";
import { signOut } from "next-auth/react";

const HomeNavBar = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);
  const router = useRouter();
  const pathname = usePathname();


  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <div className="fixed inset-x-0 mx-auto w-full max-w-3xl flex flex-col gap-2 bg-white shadow-lg z-50">
        <div className="flex justify-around gap-18 sm:gap-24 py-2">
          <button
            className="logo-menuBar flex items-center mt-5"
            onClick={() => setShowDropDown(true)}
          >
            <p className="flex flex-col items-center cursor-pointer outline-none">
              <HiOutlineBars3 size={36} />
              <span className="text-[0.62rem] text-gray-800 -mt-1.5">Menu</span>
            </p>
          </button>

          <div className="flex gap-6 text-[1.68rem] items-center mt-6">
            <Link
              href="/communication"
              className="flex flex-col items-center cursor-pointer outline-none"
            >
              <AiOutlineMail size={29} />
              <span className="text-[0.62rem] text-gray-800">Inbox</span>
            </Link>

            <button className="flex flex-col items-center cursor-pointer outline-none">
              <BsCart3 size={29} />
              <span className="text-[0.62rem] text-gray-800">Products</span>
            </button>

            <button
              className="flex flex-col items-center cursor-pointer outline-none active:text-red-500"
              onClick={() => setShowLogoutPrompt(true)}
            >
              <MdOutlineLogout size={29} />
              <span className="text-[0.62rem] text-gray-800">Log out</span>
            </button>
          </div>
        </div>

        {/* Bottom navigation links with active state */}
        <div className="flex justify-around gap-15 w-full py-4 px-10">
          <Link
            href="/home/account"
            className={`relative text-lg font-medium transition-colors ${
              pathname === "/home/account" ||
              pathname.startsWith("/home/account/")
                ? "text-red-700"
                : "text-gray-500"
            }`}
          >
            Accounts
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-red-700 transition-all duration-300 ${
                pathname === "/home/account" ||
                pathname.startsWith("/home/account/")
                  ? "w-full"
                  : "w-0"
              }`}
            />
          </Link>

          <Link
            href="/home/dashboard"
            className={`relative text-lg font-medium transition-colors ${
              pathname === "/home/dashboard" ||
              pathname.startsWith("/home/dashboard/")
                ? "text-red-700"
                : "text-gray-500"
            }`}
          >
            Dashboard
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-red-700 transition-all duration-300 ${
                pathname === "/home/dashboard" ||
                pathname.startsWith("/home/dashboard/")
                  ? "w-full"
                  : "w-0"
              }`}
            />
          </Link>
        </div>

        {/* Menu dropdown */}
        <AnimatePresence>
          {showDropDown && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.1 }}
              className="fixed top-0 left-0 right-0 bottom-0 overflow-y-auto z-50 transform transition-all duration-300 ease-in-out"
            >
              <Menu setShowDropDown={setShowDropDown} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Logout confirmation modal */}
      {showLogoutPrompt && createPortal(
        <div className="fixed inset-0 z-80 flex items-center justify-center">
          <div className="absolute w-full h-full bg-black opacity-65" />
          <div className="bg-white p-6 rounded-sm shadow-lg max-w-xs w-full mx-4 relative z-10">
            <p className="mb-4 text-gray-800 text-center">
              Are you sure you want to Log Out?
            </p>
            <div className="flex gap-4 justify-end">
              <Button
                onClick={() => setShowLogoutPrompt(false)}
                className="px-8 py-2 bg-gray-200 rounded-sm hover:bg-gray-300 transition-colors cursor-pointer text-black"
              >
                No
              </Button>
              <Button
                onClick={handleLogout}
                className="px-8 py-2 bg-onb2b-blue-900 text-white rounded-sm hover:bg-onb2b-blue-950 transition-colors cursor-pointer"
              >
                Yes
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default HomeNavBar;