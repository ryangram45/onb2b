"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LoginForm } from "./login-form";
import { CreditCardPromo } from "@/components/cards/credit-cards-promo";
import { CircleDollarSign, Search, ChevronDown } from "lucide-react";
import Image from "next/image";

const navItems = [
  "Checking",
  "Savings & CDs",
  "Credit Cards",
  "Home Loans",
  "Auto Loans",
  "Merrill Investing",
  "Better Money Habits®",
];

export default function HeroSection() {
  return (
    <div className="bg-white">
      {/* Header (desktop only) */}
      <header className="hidden xl:block px-4 sm:px-6 lg:px-12 w-full">
        <div className="w-full flex justify-between items-center py-4">
          {/* Logo  */}
          <div className="flex items-center">
            <Image
              src="/images/fullLogo.svg"
              alt="Bank of America"
              width={230}
              height={40}
              priority
              className="h-10"
            />
          </div>

          {/* Search */}
          <div className="relative w-64 max-w-xs">
            <Input
              placeholder="Search"
              className="pr-10 rounded-sm bg-white"
            />
            <Search className="border-l absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Navigation*/}
        <nav className="container py-3">
          <ul className="flex flex-wrap gap-6 lg:gap-8 text-lg font-normal items-center tracking-wide">
            {navItems.map((item) => (
              <li key={item}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="inline-flex items-center gap-1 text-muted-foreground hover:text-onb2b-blue-700 transition-colors">
                      {item}
                      <ChevronDown className="h-4 w-4 opacity-70" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Option 1 for {item}</DropdownMenuItem>
                    <DropdownMenuItem>Option 2 for {item}</DropdownMenuItem>
                    <DropdownMenuItem>Option 3 for {item}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <div className="hidden xl:block w-full border-2"></div>
      {/* Desktop hero */}
      <section className="hidden xl:block px-4 sm:px-6 lg:px-12 w-full">
        <div
          className={cn(
            "p-4 py-12 bg-gradient-to-br from-onb2b-blue-1000 via-onb2b-blue-1000 to-onb2b-blue-700 text-white ",
          )}
        >
          <div className="">
            <div className="flex gap-12">
              {/* Left: Login */}
              <div className="w-[35%] text-black justify-center items-center flex flex-col">
                <div className="pt-2 rounded-xl w-full bg-[linear-gradient(105deg,var(--onb2b-red-900)_55%,var(--onb2b-blue-1000)_45%)]">
                  <LoginForm className="bg-white backdrop-blur-sm py-10 px-5 rounded-md text-black" />
                </div>

                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white/20 mt-6 h-0 py-6 px-4 rounded-md text-black/70 justify-start items-center hover:bg-white/95 cursor-pointer max-w-xs"
                >
                  <CircleDollarSign className="w-12 h-12 shrink-0" />
                  <span> Open an account</span>
                </Button>
              </div>

              {/* Right: Cards */}
              <div className="w-full">
                <h1 className="text-4xl font-semibold mb-8 text-center md:text-left tracking-wide">
                  Choose the card that works for you
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                  <CreditCardPromo
                    percentage="6%"
                    offerText="cash back offer"
                    feeText="No annual fee."
                    title="Customized Cash Rewards"
                    imageSrc="/images/cash-reward.png"
                    buttonTopText="$200"
                    buttonBottomText="online bonus offer"
                    href="#"
                  />

                  <CreditCardPromo
                    percentage="2%"
                    offerText="cash back offer"
                    feeText="No annual fee."
                    title="Unlimited Cash Rewards"
                    imageSrc="/images/unlimeted_cash_rewaed.png"
                    buttonTopText="$200"
                    buttonBottomText="online bonus offer"
                    href="#"
                  />

                  <CreditCardPromo
                    percentage="1.5"
                    offerText="points for every $1"
                    feeText="No annual fee."
                    title="Travel Rewards"
                    imageSrc="/images/travel_reward.png"
                    buttonTopText="25,000 online"
                    buttonBottomText="bonus points offer"
                    href="#"
                  />

                  <CreditCardPromo
                    percentage="0%"
                    offerText="intro APR offer"
                    feeText="No annual fee."
                    title="BankAmericard®"
                    imageSrc="/images/credit_card_reward.png"
                    buttonTopText="Intro APR offer for"
                    buttonBottomText="18 billing cycles"
                    href="#"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden md:block xl:hidden px-4 sm:px-6 lg:px-12 w-full">
        <div
          className={cn(
            "p-6 py-10 bg-gradient-to-b from-onb2b-blue-1000 to-onb2b-blue-700 text-white",
          )}
        >
          <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-left tracking-wide">
            Choose the card that works for you
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
            <div>
              <div className="text-6xl font-semibold">6%</div>
              <div className="mt-1 text-sm">cash back offer</div>
              <div className="text-sm">No annual fee.</div>
            </div>
            <div>
              <div className="text-6xl font-semibold">2%</div>
              <div className="mt-1 text-sm">cash back offer</div>
              <div className="text-sm">No annual fee.</div>
            </div>
            <div>
              <div className="text-6xl font-semibold">1.5</div>
              <div className="mt-1 text-sm">points for every $1</div>
              <div className="text-sm">No annual fee.</div>
            </div>
            <div>
              <div className="text-6xl font-semibold">0%</div>
              <div className="mt-1 text-sm">intro APR offer</div>
              <div className="text-sm">No annual fee.</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-start justify-items-center">
            <Image
              src="/images/cash-reward.png"
              alt="Customized Cash Rewards card"
              width={360}
              height={220}
              className="w-full max-w-[360px] h-auto rounded-lg border border-white/40"
            />
            <Image
              src="/images/unlimeted_cash_rewaed.png"
              alt="Unlimited Cash Rewards card"
              width={360}
              height={220}
              className="w-full max-w-[360px] h-auto rounded-lg border border-white/40"
            />
            <Image
              src="/images/travel_reward.png"
              alt="Travel Rewards card"
              width={360}
              height={220}
              className="w-full max-w-[360px] h-auto rounded-lg border border-white/40"
            />
            <Image
              src="/images/credit_card_reward.png"
              alt="BankAmericard card"
              width={360}
              height={220}
              className="w-full max-w-[360px] h-auto rounded-lg border border-white/40"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 text-center">
            <p>Customized Cash Rewards</p>
            <p>Unlimited Cash Rewards</p>
            <p>Travel Rewards</p>
            <p>BankAmericard®</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            <Button asChild variant="whiteGhost" className="w-full h-auto py-2 rounded-xl">
              <a href="#" className="text-onb2b-blue-900 font-bold">
                $200 online bonus offer
              </a>
            </Button>
            <Button asChild variant="whiteGhost" className="w-full h-auto py-2 rounded-xl">
              <a href="#" className="text-onb2b-blue-900 font-bold">
                $200 online bonus offer
              </a>
            </Button>
            <Button asChild variant="whiteGhost" className="w-full h-auto py-2 rounded-xl">
              <a href="#" className="text-onb2b-blue-900 font-bold">
                25,000 online bonus points offer
              </a>
            </Button>
            <Button asChild variant="whiteGhost" className="w-full h-auto py-2 rounded-xl">
              <a href="#" className="text-onb2b-blue-900 font-bold">
                Intro APR offer for 18 billing cycles
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile hero */}
      <section className="md:hidden px-4 w-full">
        <div className="py-6 bg-gradient-to-b from-onb2b-blue-1000 to-onb2b-blue-700 text-white px-4">
          <h1 className="text-xl font-semibold mb-3 tracking-wide">
            Choose the card that works for you
          </h1>
          <div className="mt-2 space-y-4">
            {/* Row 1 */}
            <div className="flex items-center gap-3">
              <div className="w-[52%] shrink-0">
                <Image
                  src="/images/cash-reward.png"
                  alt="Customized Cash Rewards card"
                  width={480}
                  height={300}
                  className="w-full h-auto rounded-lg border border-white/40"
                />
              </div>
              <a
                href="#"
                className="flex-1 text-white underline decoration-2 underline-offset-4 text-lg leading-snug font-semibold"
              >
                <span>6% </span>
                <span className="font-semibold">choice category</span>
                <br />
                <span className="font-semibold">cash back offer</span>
              </a>
            </div>
            {/* Row 2 */}
            <div className="flex items-center gap-3">
              <div className="w-[52%] shrink-0">
                <Image
                  src="/images/unlimeted_cash_rewaed.png"
                  alt="Unlimited Cash Rewards card"
                  width={480}
                  height={300}
                  className="w-full h-auto rounded-lg border border-white/40"
                />
              </div>
              <a
                href="#"
                className="flex-1 text-white underline decoration-2 underline-offset-4 text-lg leading-snug font-semibold"
              >
                <span>2% </span>
                <span className="font-semibold">unlimited cash</span>
                <br />
                <span className="font-semibold">back offer</span>
              </a>
            </div>
            {/* Row 3 */}
            <div className="flex items-center gap-3">
              <div className="w-[52%] shrink-0">
                <Image
                  src="/images/travel_reward.png"
                  alt="Travel Rewards card"
                  width={480}
                  height={300}
                  className="w-full h-auto rounded-lg border border-white/40"
                />
              </div>
              <a
                href="#"
                className="flex-1 text-white underline decoration-2 underline-offset-4 text-lg leading-snug font-semibold"
              >
                <span>Unlimited 1.5 points</span>
                <br />
                <span>for every $1 spent on</span>
                <br />
                <span>all purchases</span>
              </a>
            </div>
            {/* Row 4 */}
            <div className="flex items-center gap-3">
              <div className="w-[52%] shrink-0">
                <Image
                  src="/images/credit_card_reward.png"
                  alt="BankAmericard card"
                  width={480}
                  height={300}
                  className="w-full h-auto rounded-lg border border-white/40"
                />
              </div>
              <a
                href="#"
                className="flex-1 text-white underline decoration-2 underline-offset-4 text-lg leading-snug font-semibold"
              >
                <span className="font-semibold">Intro APR offer for</span>
                <br />
                <span>21 billing cycles</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
