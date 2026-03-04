"use client";

import clsx from "clsx";
import Image from "next/image";
import Agreement from "@/components/agreement";
import { useRouter } from "next/navigation";
import {
  buttonListOne,
  buttonListTwo,
  disclaimers,
  paidTransaction,
  paymentMethods,
} from "../data";

const Transfer = () => {
  const router = useRouter();
  return (
    <div className="pt-42 pb-20 w-full max-w-3xl mx-auto flex flex-col gap-5">
      {/* Payment Methods Grid */}
      <div className="grid grid-cols-2 w-full h-full max-w-100 sm:max-w-152 lg:max-w-172 place-self-center bg-white rounded-lg drop-shadow-lg px-4 py-7">
        {paymentMethods.map((paymentMethod, index) => (
          <div
            key={index}
            className={clsx(
              "flex flex-col text-center items-center gap-1 p-6 cursor-pointer",
              {
                "border-r border-b border-gray-200": index === 0,
                "border-b border-gray-200": index === 1,
                "border-r border-gray-200": index === 2,
              },
            )}
            onClick={() => {
              if (paymentMethod.title === "Wire") {
                router.push("/home/transfer/wire");
              }
            }}
          >
            <h1>
              {typeof paymentMethod.logo === "string" ? (
                <Image
                  src={paymentMethod.logo}
                  alt={paymentMethod.title}
                  width={44}
                  height={44}
                  className="w-11 object-contain"
                />
              ) : (
                <paymentMethod.logo
                  size={paymentMethod.title === "Zelle®" ? 32 : 38}
                  color={
                    paymentMethod.title === "Zelle®" ? "#6A1B9A" : "#1e40af"
                  }
                />
              )}
            </h1>
            <h2 className="text-onb2b-800 text-[1.083rem]">
              {paymentMethod.title}
            </h2>
            <p className="text-[0.682rem] sm:text-[0.912rem] text-gray-500">
              {paymentMethod.description}
            </p>
          </div>
        ))}
      </div>

      <h1 className="w-full h-full max-w-100 sm:max-w-152 lg:max-w-172 flex place-self-center px-2 font-semibold text-[1.032rem]">
        Activity
      </h1>

      {/* Activity Section - original classes only */}
      <div className="w-full h-full max-w-100 sm:max-w-152 lg:max-w-172 place-self-center bg-white flex flex-col rounded-lg drop-shadow-lg px-[0.300rem]">
        <h1 className="flex items-center justify-between px-4 py-2 text-gray-600 text-[0.918rem] font-medium">
          ACTION NEEDED
        </h1>

        {paidTransaction.map((transaction, index) => (
          <div
            key={index}
            className="flex justify-between px-4 py-5 border-b border-gray-200"
          >
            <div className="flex flex-row gap-3">
              <Image
                src={transaction.logo}
                alt={transaction.title}
                width={40}
                height={40}
                className="border rounded-full w-10 h-10 py-3 px-1 border-gray-300 object-contain"
              />
              <div>
                <h1 className="text-[0.918rem] w-full max-w-44 sm:max-w-[20rem] font-normal">
                  {transaction.title}
                </h1>
                <h1 className="text-[0.778rem] text-gray-600">
                  {transaction.type}
                </h1>
                <p className="text-[0.778rem] text-gray-600">
                  {transaction.date}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 items-end mt-4 sm:mt-0">
              <button className="text-center bg-gray-100 rounded-full text-[0.878rem] font-bold w-15 py-0.5 text-blue-950 cursor-pointer">
                {transaction.isPaid}
              </button>
              <h1 className="text-[0.858rem] text-blue-800">
                {transaction.approve}
              </h1>
            </div>
          </div>
        ))}

        <button className="w-full py-2 text-center text-blue-800 cursor-pointer active:text-blue-900">
          MORE ACTIVITY
        </button>
      </div>

      {/* Footer Legal Section */}
      <div className="bg-gray-50 py-6 sm:px-12">
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

        <div className="-ml-4 sm:ml-0">
          <Agreement />
        </div>

        <div>
          <div className="grid grid-cols-2 w-full h-full py-5 px-20 sm:px-17 gap-3 text-[0.622rem] sm:text-[0.912rem]">
            {buttonListOne.map((item, index) => (
              <button key={index} className="text-blue-800 cursor-pointer">
                {item}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 w-full h-full py-1.5 px-14 sm:px-17 gap-3 text-[0.622rem] sm:text-[0.912rem] -mt-2.5">
            {buttonListTwo.map((item, index) => (
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

export default Transfer;
