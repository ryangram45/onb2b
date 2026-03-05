"use client";
import DashboardNote from "@/app/(authenticated)/(client)/home/dashboard/_components/dashboard-note";
import Agreement from "@/components/agreement";
import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaCertificate } from "react-icons/fa";
import {
  buttonListOne,
  buttonListTwo,
  investmentRiskDisclaimers,
} from "../data";
import Image from "next/image";
import { getLastDigits, formatCurrency } from "@/utils/string-utils";
import { DashboardSkeleton } from "@/components/skeletons/client/dashboard-skeleton";

const Dashboard = () => {
  type Tile = {
    logo: string | ((props: { size?: number; color?: string; className?: string }) => React.ReactNode);
    title: string;
    balance?: string;
    description?: string;
  };

  const [tiles, setTiles] = useState<Tile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function buildTiles() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/me/bank-account");
        const bank = res.ok ? await res.json() : null;
        const last4 = bank?.advPlusAccountNumber ? getLastDigits(bank.advPlusAccountNumber) : "—";
        const balance = bank ? formatCurrency(bank.balance ?? 0) : "$0.00";

        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        const formattedDate = twoDaysAgo.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });

        const items: Tile[] = [
          {
            logo: "/images/Adv Plus Banking.svg",
            title: `Adv Plus Banking - ${last4}`,
            balance,
            description: "Available balance",
          },
          {
            logo: "/images/AverageSpend.svg",
            title: "On Average You Spend",
            balance: "$1,523",
            description: "More Than You Deposit",
          },
          {
            logo: "/images/FICOscore.svg",
            title: "My FICO® Score",
            balance: "$760",
            description: `As of ${formattedDate}`,
          },
          {
            logo: "/images/bank-ameri.svg",
            title: "BankAmeriDeals®",
            balance: "$20",
            description: "65 Days Left",
          },
          {
            logo: IoIosNotifications,
            title: "Alerts",
            balance: "0",
            description: "Unread",
          },
          {
            logo: FaCertificate,
            title: "My Rewards",
            description: "All your rewards in one place",
          },
        ];
        setTiles(items);
      } catch (e) {
        console.error("Failed loading dashboard tiles", e);
        setTiles([
          {
            logo: "/images/Adv Plus Banking.svg",
            title: "Adv Plus Banking - —",
            balance: "$0.00",
            description: "Available balance",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
    buildTiles();
  }, []);

  function renderLogoElement(logo: Tile["logo"], index: number, title: string) {
    if (typeof logo === "function") {
      return index === 4
        ? logo({ size: 40, color: "gray" })
        : logo({ size: 35, color: "#1E40AF", className: "-mt-5" });
    }
    if (index === 3) {
      return (
        <Image
          src={logo}
          alt={title}
          width={120}
          height={90}
          className="ml-5 sm:ml-10 p-2 mt-3"
        />
      );
    }
    return <Image src={logo} alt={title} width={14} height={14} className="p-2 w-14 h-14" />;
  }

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="pt-42 pb-20 w-full max-w-3xl mx-auto flex flex-col gap-5 sm:px-0">
      <div className="grid grid-cols-2 gap-4 mb-5 justify-items-center py-3 px-4">
        {tiles.map((item, index) => (
          <div
            key={index}
            className="drop-shadow-lg bg-white w-full py-6 px-6 flex flex-col items-center justify-center text-center content-center gap-2 cursor-pointer text-[0.853rem] text-gray-500"
          >
            <div>
              {renderLogoElement(item.logo, index, item.title)}
            </div>
            <h1 className="text-gray-900">{item.title}</h1>
            <h1 className="text-[1.309rem] text-black">
              {index === 3 ? (
                <p className="text-[0.960rem] text-gray-600">{item.balance}</p>
              ) : (
                item.balance
              )}
            </h1>
            <h1>{item.description}</h1>
          </div>
        ))}
        {/* Centered Button */}
        <div className="col-span-2 flex justify-center items-center mt-5">
          <button className="px-5 py-2 rounded-full bg-blue-950 text-white text-[0.850rem] font-semibold">
            CUSTOMIZE MY DASHBOARD
          </button>
        </div>
      </div>
      <div className="bg-gray-50 py-6 sm:px-12">
        {/* row 1 */}
        <div className="-ml-4 sm:ml-0">
          <DashboardNote />
        </div>
        {/* row 2 */}
        <div className="w-full h-full py-5 px-3 sm:px-7 flex flex-col gap-2 border-y border-gray-200">
          <p className="text-[0.682rem] sm:text-[0.912rem] mb-3">
            Investment, insurance and annuity products:
          </p>
          {investmentRiskDisclaimers.map((item, index) => (
            <li
              key={index}
              className="text-[0.682rem] sm:text-[0.912rem] font-semibold"
            >
              {item}
            </li>
          ))}
        </div>
        {/* row 3 */}
        <div className="-ml-4 sm:ml-0">
          <Agreement />
        </div>

        {/* row 4 */}
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
        <h1 className="w-full text-[0.522rem] sm:text-[0.912rem] text-center py-5 px-6 text-gray-800">
          Bank of America, N.A. Member FDIC. &copy; 2026 Bank of America
          Corporation
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;