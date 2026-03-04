import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface PromotionCardProps {
  iconSrc: string
  title: string
  description: string
  ctaLabel: string
  href: string
  isFirst: boolean
}

export function PromotionCard({
  iconSrc,
  title,
  description,
  ctaLabel,
  href,
  isFirst = false,
}: PromotionCardProps) {
  const isSvg = iconSrc.toLowerCase().endsWith('.svg');

  return (
    <Card className="group border-transparent hover:border-onb2b-blue-800 transition-colors shadow-none rounded-none py-0 bg-transparent">
      <CardContent className="px-6 md:px-8 py-3.5 flex flex-col items-start border-r ">
        <div className={`relative mb-6 ${isSvg ? 'w-36 h-14' : 'w-16 h-16'}`}>
          <Image
            src={iconSrc}
            alt={`${title} icon`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 64px, 48px"
            priority={false}
          />
        </div>

        <h4 className={cn("text-xl font-normal mb-3 ", isSvg ? "text-onb2b-blue-900" : "text-onb2b-red-700", isFirst && "max-w-[10rem]")}>
          {title}
        </h4>

        <p className="text-sm text-black font-semibold mb-6 grow">
          {description}
        </p>

        <Link
          href={href}
          className="text-onb2b-blue-800 font-normal hover:text-onb2b-blue-800 group-hover:underline tracking-wide"
        >
          {ctaLabel}
        </Link>
      </CardContent>
    </Card>
  )
}