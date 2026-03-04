"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useSession } from "next-auth/react";

import { IoSearch, IoWarning, IoCloseSharp } from "react-icons/io5";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardArrowRight,
} from "react-icons/md";
import Agreement from "@/components/agreement";
import {
  disclaimers,
  legalButtonsGroupOne,
  legalButtonsGroupTwo,
  type ActiveAccount,
  type ProfileUpdateItem,
} from "../data";
import { formatCurrency, getLastDigits } from "@/utils/string-utils";
import { AccountSkeleton } from "@/components/skeletons/client/account-skeleton";

const Account = () => {
  const { data: session } = useSession();
  const [accounts, setAccounts] = useState<ActiveAccount[]>([]);
  const [showWarning, setShowWarning] = useState(true);
  const [expandedAccounts, setExpandedAccounts] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  const userDisplayName = useMemo(() => {
    return session?.user?.firstName ?? "there";
  }, [session]);

  useEffect(() => {
    async function loadAccounts() {
      setIsLoading(true);
      try {
        const [bankRes, cardRes] = await Promise.all([
          fetch("/api/me/bank-account"),
          fetch("/api/me/credit-card"),
        ]);

        const bankData = bankRes.ok ? await bankRes.json() : null;
        const cardData = cardRes.ok ? await cardRes.json() : null;

        const dynamicAccounts: ActiveAccount[] = [];

        if (bankData) {
          const bankLast4 = getLastDigits(bankData.advPlusAccountNumber ?? "");
          dynamicAccounts.push({
            name: "Banking",
            logo: "/images/logo.svg",
            text: "FDIC-Insured - Backed by the full faith and credit of the U.S Government",
            type: `Adv Plus Banking - ${bankLast4 || "—"}`,
            balance: formatCurrency(bankData.balance ?? 0),
            page: "/home/account/histories",
          });
        }

        if (cardData) {
          const cardLast4 = getLastDigits(cardData.cardNumber ?? "");
          dynamicAccounts.push({
            name: "Credit Cards",
            logo: "/images/logo.svg",
            type: `${cardData.cardName ?? "Doc"} - ${cardLast4 || "—"}`,
            balance: formatCurrency(cardData.balance ?? 0),
            page: "/home/account/credit-card/histories",
          });
        }

        setAccounts(dynamicAccounts);
        setExpandedAccounts(dynamicAccounts.reduce<Record<number, boolean>>((acc, _, index) => {
          acc[index] = true;
          return acc;
        }, {}));
      } catch (e) {
        console.error("Failed to load accounts", e);
        setAccounts([]);
        setExpandedAccounts({});
      } finally {
        setIsLoading(false);
      }
    }
    loadAccounts();
  }, []);

  const toggleAccount = (index: number) => {
    setExpandedAccounts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const profileItems: ProfileUpdateItem[] = useMemo(() => [
    { title: `Hello, ${userDisplayName}`, description: "Preferred Rewards Platinum Member" },
    { title: "Bank of American Life Plan®", description: "Your next steps are ready. Let's go!" },
    { title: "My Rewards" },
  ], [userDisplayName]);

  if (isLoading) {
    return <AccountSkeleton />;
  }

  return (
    <div className="pt-42 pb-20 w-full max-w-3xl mx-auto flex flex-col gap-5 px-1 sm:px-0">
      {/* Search Bar */}
      <div className="w-full bg-gray-200 flex items-center p-1.5 rounded container mx-auto border-none gap-2 text-black max-w-104 sm:max-w-[32.9rem] z-30">
        <IoSearch className="mt-1" color="gray" />
        <input
          type="text"
          placeholder="Hi, I'm Erica. How can I help?"
          className="w-full outline-none placeholder:text-gray-500"
        />
      </div>

      {/* Warning Banner */}
      {showWarning && (
        <div className="w-full h-full bg-[#ffefbc] flex justify-around py-5 px-4 sm:px-9 container mx-auto sm:max-w-[32.9rem] mt-0.5 rounded">
          <div className="flex gap-2 max-w-[17rem] text-[1.02rem] font-semibold">
            <IoWarning size={50} color="#FF8C42" />
            <div>
              <p>
                Did you overlook something?{" "}
                <span className="text-sm font-normal">
                  we noticed your Doc is past due.
                </span>
              </p>
              <button className="text-[0.869rem] text-blue-700 cursor-pointer">
                View Payment Details
              </button>
            </div>
          </div>
          <IoCloseSharp
            size={25}
            color="gray"
            onClick={() => setShowWarning(false)}
            className="cursor-pointer active:text-gray-600"
          />
        </div>
      )}

      {/* Profile / Rewards Cards */}
      <div className="w-full h-full bg-white py-5 flex flex-col gap-2 container mx-auto max-w-[24rem] sm:max-w-[32.9rem] mt-3 rounded drop-shadow-lg">
        {profileItems.map((profileItem, index) => (
          <div
            key={`${profileItem.title}-${index}`}
            className={clsx(
              "flex flex-col w-full max-w-132 px-4 sm:px-4 py-2 gap-1 font-semibold text-[1.069rem] font-sans cursor-pointer",
              { "border-b border-gray-200": index < 2 },
            )}
          >
            {profileItem.title === "My Rewards" ? (
              <h1 className="font-normal">{profileItem.title}</h1>
            ) : (
              <h1>{profileItem.title}</h1>
            )}
            {profileItem.description && (
              <p className="text-[0.778rem] text-gray-600">{profileItem.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Expandable Accounts */}
      <div className="flex flex-col gap-4 w-full items-center bg-gray-200 mt-4 py-5 px-3 sm:px-11 insert-x-0 mx-auto max-w-3xl grow">
        {accounts.map((account, index) => {
          const isExpanded = expandedAccounts[index];

          return (
            <div
              key={index}
              className="w-full h-full max-w-132 rounded pt-2"
              style={{
                background: "linear-gradient(135deg, #8B0000 55%, #00008B 45%)",
              }}
            >
              <div className="flex flex-col gap-3 bg-white w-full h-full shadow-lg rounded-b pb-4">
                <h1 className="flex justify-between px-4 py-2 font-bold text-[1.169rem] font-sans border-b border-gray-300">
                  <p>{account.name}</p>
                  <div className="cursor-pointer">
                    {isExpanded ? (
                      <MdKeyboardArrowUp
                        size={24}
                        onClick={() => toggleAccount(index)}
                      />
                    ) : (
                      <MdKeyboardArrowDown
                        size={24}
                        onClick={() => toggleAccount(index)}
                      />
                    )}
                  </div>
                </h1>

                {/* logo & text */}
                <div className="flex flex-col px-4 font-semibold text-[0.999rem]">
                  <div className="flex gap-2">
                    <p className="-mt-1">Bank of America</p>
                    <Image
                      src={account.logo}
                      alt="complete-logo"
                      width={24}
                      height={24}
                      className="w-6 object-contain"
                    />
                  </div>
                  {isExpanded && account.text && (
                    <p className="italic text-[0.573rem] font-semibold">
                      <span className="text-blue-950 font-extrabold not-italic text-[0.955rem]">
                        FDIC
                      </span>{" "}
                      {account.text}
                    </p>
                  )}
                </div>

                {isExpanded && (
                  <div className="flex justify-between px-4 font-medium">
                    <h1 className="max-w-36">{account.type}</h1>
                    <Link href={account.page} className="font-bold text-[1.22rem] flex items-center cursor-pointer">
                      <p>{account.balance}</p>
                      <MdKeyboardArrowRight size={24} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Manage Accounts Card */}
      <div className="flex flex-col gap-5 w-full bg-white py-3 rounded drop-shadow-lg mx-auto max-w-100 sm:max-w-[32.9rem]">
        <div className="flex gap-3 py-2 border-b border-gray-200 px-3">
          <Image
            src="/images/books.svg"
            alt=""
            width={48}
            height={48}
            className="object-contain"
          />
          <h1 className="text- font-semibold">
            <p>Manage Accounts</p>
            <p className="text-[0.765rem] sm:text-[0.965rem] font-light">
              Open, link and manage accounts
            </p>
          </h1>
        </div>
        <button className="bg-blue-950 text-white mx-auto px-5 py-2 rounded-full cursor-pointer text-[0.765rem] sm:text-[1rem]">
          OPEN A NEW ACCOUNT
        </button>
      </div>

      {/* Legal Footer - original classes */}
      <div className="bg-gray-50 py-6 px-2 sm:px-23">
        <div className="w-full h-full py-5 px-3 sm:px-7 flex flex-col gap-2 border-y border-gray-200">
          <p className="text-[0.682rem] sm:text-[0.912rem] mb-3">
            Investment, insurance and annuity products:
          </p>
          {disclaimers.map((item, index) => (
            <li
              key={index}
              className="text-[0.682rem] sm:text-[0.912rem] font-semibold"
            >
              {item}
            </li>
          ))}
        </div>

        <div className="-ml-4 sm:-ml-0">
          <Agreement />
        </div>

        <div>
          <div className="grid grid-cols-2 w-full h-full py-5 px-20 sm:px-17 gap-3 text-[0.622rem] sm:text-[0.912rem]">
            {legalButtonsGroupOne.map((item, index) => (
              <button key={index} className="text-blue-800 cursor-pointer">
                {item}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 w-full h-full py-1.5 px-14 sm:px-17 gap-3 text-[0.622rem] sm:text-[0.912rem] -mt-2.5">
            {legalButtonsGroupTwo.map((item, index) => (
              <button key={index} className="text-blue-800 cursor-pointer">
                {item}
              </button>
            ))}
          </div>
        </div>

        <h1 className="w-full text-[0.522rem] sm:text-[0.912rem] text-center py-5 px-7 text-gray-800">
          Bank of America, N.A. Member FDIC. &copy; 2026 Bank of America
          Corporation
        </h1>
      </div>
    </div>
  );
};

export default Account;