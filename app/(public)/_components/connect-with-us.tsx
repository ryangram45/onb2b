"use client"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { connectItems } from "@/app/(public)/data"

interface ConnectCardProps {
  iconSrc: string
  label: string
  href: string
}

function ConnectCard({ iconSrc, label, href }: ConnectCardProps) {
  return (
    <Card className="transition-colors h-full shadow-xl border-none ">
      <CardContent className="p-6 md:px-8 py-6 flex flex-col items-center justify-center text-center h-full">
        <div className="mb-2">
          <Image
            src={iconSrc}
            alt={label}
            width={28}
            height={28}
            className="h-5.5 w-5.5 mx-auto object-contain"
          />
        </div>
        <Link
          href={href}
          className="text-base md:text-base font-normal text-onb2b-blue-800 hover:text-onb2b-blue-800 hover:underline"
        >
          {label}
        </Link>
      </CardContent>
    </Card>
  )
}


export default function ConnectWithUsSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-xl md:text-2xl lg:text-4xl font-normal text-black tracking-wide text-center mb-10">
          Connect with us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-12">
          {connectItems.map((item, index) => (
            <ConnectCard
              key={index}
              iconSrc={item.iconSrc}
              label={item.label}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </section>
  )
}