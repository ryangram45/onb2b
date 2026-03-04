"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function NewsAndInformationSection() {
  return (
    <section className="w-full pt-12 relative">
      <div className="px-4 md:px-6 lg:px-12">
        {/* Main Title */}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-normal text-black tracking-wide">
            Your news and information
          </h2>
        </div>

        {/* Security Row */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 mb-32 lg:mb-40 px-4 sm:px-12 lg:px-20">
          {/* Left Column */}
          <div className="lg:w-1/2 text-center lg:text-left z-10">
            <h3 className="text-xl md:text-3xl font-normal text-black tracking-wide mb-2.5">
              Level up your account security
            </h3>
            <p className="text-lg text-black/60 mb-8 max-w-[33rem] mx-auto lg:mx-0">
              Watch your security meter rise as you take action to help protect against fraud. See it in the Security Center in Mobile and Online Banking.
            </p>
            <Button
              size="lg"
              className="bg-onb2b-red-900 hover:bg-onb2b-red-800 cursor-pointer text-white rounded-full px-10 py-6 text-lg font-medium"
            >
              Check your level
            </Button>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2 relative h-85 overflow-hidden">
            <div className="absolute top-20 right-0 -translate-x-1/2 w-[230px] md:w-[230px]">
              <Image
                src="/images/asset-advance-security.png"
                alt="Security Center in Mobile Banking"
                width={480}
                height={900}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/*  */}
        <div
          className="relative overflow-hidden bg-cover bg-center bg-no-repeat -mt-32 lg:-mt-48 z-0 h-[21.2rem]"
          style={{ backgroundImage: "url('/images/blue-gradient-bg.jpg')" }}
        >
          <div className="py-20 md:py-24 px-4 sm:px-12 lg:px-20 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 relative z-10">
            {/* Left Column  */}
            <div className="lg:w-1/2 text-center lg:text-left text-white z-20">
              <h3 className="text-xl md:text-2xl max-w-md font-normal tracking-wide mb-10">
                Convenient banking with our Mobile app
              </h3>
              <Button
                size="lg"
                variant="outline"
                className="bg-white border-white text-black hover:bg-white/90 cursor-pointer rounded-full px-10 py-6 text-lg font-medium"
              >
                Explore our app
              </Button>
            </div>

            {/* Right Column */}
            <div className="lg:w-1/2 relative h-85 overflow-hidden -mt-6">
              <div className="absolute top-0 right-0 -translate-x-1/2 w-[360px] md:w-[400px] lg:w-[230px]">
                <Image
                  src="/images/asset-iphone-dashboard.png"
                  alt="Bank of America Mobile App Dashboard"
                  width={460}
                  height={880}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}