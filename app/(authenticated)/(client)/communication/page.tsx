"use client";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import Agreement from "@/components/agreement";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { buttonListOne, buttonListTwo, notifications, text } from "./data";

const Communication = () => {
  const router = useRouter();

  return (
    <motion.nav className="flex flex-col gap-2 container mx-auto max-w-200 justify-center bg-white overflow-x-hidden">
      <button
        onClick={() => router.back()}
        className="flex items-center justify- w-full relative py-4 px-4.5"
      >
        <MdKeyboardArrowLeft size={40} className="shrink-0 cursor-pointer" />
        <h1 className="text-[1.4rem] absolute left-1/2 transform -translate-x-1/2 -mt-1">
          Communications
        </h1>
      </button>
      <div className="w-full bg-gray-100 flex items-center p-1.5 rounded container mx-auto border-none gap-2 max-w-[20.8rem] sm:max-w-[32rem] z-30 mb-3">
        <IoSearch className="mt-1 text-gray-400" />
        <input
          type="text"
          placeholder="Hi, I'm Erica. How can I help?"
          className="w-full outline-none placeholder:text-gray-500"
        />
      </div>
      <h1 className="text-[0.67rem] font-semibold flex justify-end px-8 pb-1">
        Provided by Bank of America
      </h1>
      <div className="w-full h-full bg-gray-100 py-5 px-7 flex flex-col gap-6">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="text-[0.682rem] sm:text-[0.912rem] w-full h-full py-3 px-7 flex flex-col items-start gap-3 border-b border-gray-200"
          >
            {index < notifications.length - 1 ? (
              <h1 className="font-bold text-[1.058rem]">
                {notification.title}
              </h1>
            ) : (
              <h1 className="font-medium text-[1.058rem]">
                {notification.title}
              </h1>
            )}
            <h1 className="-mt-2 text-balance sm:text-wrap">
              {notification.discription}
            </h1>
            <button className="text-blue-800 cursor-pointer text-[0.945rem] sm:text-[1.013rem]">
              {notification.button}
            </button>
            <h1 className="text-gray-700">{notification.date}</h1>
          </div>
        ))}
      </div>
      <p className="flex items-center justify-between py-2 border-b border-gray-200"></p>
      {/* text */}
      <div>
        {/* row 1 */}
        <div className="w-full h-full py-5 px-7 flex flex-col gap-2 border-b border-gray-200">
          <p className="text-[0.682rem] sm:text-[0.912rem] mb-3">
            Investment, insurance and annuity products:
          </p>
          {text.map((item, index) => (
            <li
              key={index}
              className="text-[0.682rem] sm:text-[0.912rem] font-semibold"
            >
              {item}
            </li>
          ))}
        </div>
        {/* row 2 */}
        <Agreement />

        {/* row 3 */}
        <div>
          {/* list-One */}
          <div className="grid grid-cols-2 w-full h-full py-5 px-20 sm:px-17 gap-3 text-[0.622rem] sm:text-[0.912rem]">
            {buttonListOne.map((item, index) => (
              <button key={index} className="text-blue-800 cursor-pointer">
                {item}
              </button>
            ))}
          </div>
          {/* list-two */}
          <div className="grid grid-cols-2 w-full h-full py-1.5 px-14 sm:px-17 gap-3 text-[0.622rem] sm:text-[0.912rem] -mt-2.5">
            {buttonListTwo.map((item, index) => (
              <button key={index} className="text-blue-800 cursor-pointer">
                {item}
              </button>
            ))}
          </div>
        </div>
        <h1 className="w-full text-[0.622rem] sm:text-[0.912rem] text-center py-5 px-7 text-gray-800">
          Bank of America, N.A. Member FDIC. &copy; 2026 Bank of America
          Corporation
        </h1>
      </div>
    </motion.nav>
  );
};

export default Communication;
