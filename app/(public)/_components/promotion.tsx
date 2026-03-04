import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { PromotionCard } from "@/components/cards/promotion/promotion-card"
import { promotionItems } from "@/app/(public)/data"

export default function PromotionsSection() {
  return (
    <section className="w-full bg-white">
      <div className="px-4 sm:px-6 lg:px-12">
        {/* Top two-column section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 mb-12 lg:mb-0">
          {/* Cash Offer Card */}
          <Card className="group border-transparent bg-onb2b-blue-200/50 hover:border-onb2b-blue-800 transition-colors overflow-hidden rounded-none shadow-none">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full px-6 gap-1">
              <CardContent className="bg-white p-6 md:px-5 py-4 flex flex-col justify-start text-black">
                <p className="text-md uppercase font-normal tracking-wide mb-1">
                  NEW CHECKING CUSTOMERS
                </p>
                <h3 className="text-2xl font-normal text-onb2b-red-700 mb-3">
                  Cash offer up to $500
                </h3>
                <p className="text-base mb-2.5">
                  Start by opening a new eligible checking account.
                </p>
                <Link
                  href="#"
                  className="text-base text-onb2b-blue-800 font-normal hover:text-onb2b-blue-800 group-hover:underline tracking-wide"
                >
                  See details
                </Link>
              </CardContent>

              <div className="px-6 flex flex-col justify-start items-center text-center">
                <div className="space-y-6 md:space-y-3">
                  <div className="text-onb2b-blue-400">
                    <p className="text-2xl md:text-3xl font-normal">$100</p>
                    <p className="text-sm">cash offer</p>
                  </div>
                  <div className="text-onb2b-blue-700">
                    <p className="text-3xl md:text-4xl font-normal">$300</p>
                    <p className="text-base">cash offer</p>
                  </div>
                  <div className="text-onb2b-blue-800">
                    <p className="text-4xl md:text-5xl font-normal tracking-wider">$500</p>
                    <p className="text-lg">cash offer</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Champion / Volunteer Card */}
          <Card
            className={cn(
              "group relative overflow-hidden border-transparent hover:border-onb2b-blue-800 transition-colors bg-cover bg-center rounded-none shadow-none px-6",
              "bg-[url('/images/asset-champion.png')]"
            )}
          >
            <div className="absolute inset-0 bg-black/10" />
            <CardContent className="relative z-10 h-full px-6 md:px-5 py-4 flex flex-col bg-white max-w-sm">
              <h3 className="text-xl md:text-2xl font-normal text-onb2b-red-700 mb-1.5 lg:w-80">
                From one Champion to another
              </h3>
              <p className="text-base max-w-md">
                Employee volunteers deliver
              </p>
              <p className="text-base mb-6 max-w-md">
                Better Money Habits® to Special Olympics athletes.
              </p>
              
              <Link
                href="#"
                className="text-onb2b-blue-800 font-normal hover:text-onb2b-blue-800 group-hover:underline tracking-wide"
              >
                Watch now
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 bg-[#f5f5f5] py-6">
          {promotionItems.map((item, index) => (
            <PromotionCard
              key={index}
              iconSrc={item.iconSrc}
              title={item.title}
              description={item.description}
              ctaLabel={item.ctaLabel}
              href={item.href}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}