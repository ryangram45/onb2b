"use client";

import Link from "next/link";
import { CiDollar } from "react-icons/ci";
import { PieChart } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const HomeTabBar = () => {
  const [activeTab, setActiveTab] = useState("accounts");

  const tabBarItems = [
    { name: "Accounts", icon: <CiDollar size={28} />, path: "/home/account" },
    { name: "Pay & Transfer", icon: <CiDollar size={28} />, path: "/home/make-pass" },
    { name: "Deposit Checks", img: "/images/checks2.svg", path: "/home/deposit" },
    { name: "Invest", icon: <PieChart size={25} />, path: "/home/invest" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto bg-white border-t border-gray-200 flex justify-around items-center py-2 px-6 sm:px-20 max-w-screen-md drop-shadow-xl z-50">
      {tabBarItems.map((item, index) => {
        const isActive = activeTab === item.name.toLowerCase();

        return (
          <Link
            key={index}
            href={item.path}
            onClick={() => setActiveTab(item.name.toLowerCase())}
            className={`flex flex-col items-center transition-colors ${
              isActive ? "text-black font-medium" : "text-[#413e3e] hover:text-gray-800"
            }`}
          >
            {!item.img ? (
              item.icon
            ) : (
              <div className="relative w-[1.785rem] h-[1.785rem] sm:w-[1.885rem] sm:h-[1.885rem]">
                <Image
                  src={item.img}
                  alt={`${item.name} icon`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 28px, 30px"
                />
              </div>
            )}
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};
export default HomeTabBar;