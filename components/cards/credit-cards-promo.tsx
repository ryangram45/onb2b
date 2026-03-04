import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CreditCardPromoProps {
  percentage: string;
  offerText: string;
  feeText: string;
  title: string;
  imageSrc: string;
  buttonTopText: string;
  buttonBottomText: string;
  href: string;
  className?: string;
}

export function CreditCardPromo({
  percentage,
  offerText,
  feeText,
  title,
  imageSrc,
  buttonTopText,
  buttonBottomText,
  href,
  className,
}: CreditCardPromoProps) {
  return (
    <div className={cn("flex flex-col rounded-md overflow-hidden", className)}>
      {/* Header */}
      <div className="text-white p-4 text-center">
        <p className="text-4xl font-semibold">{percentage}</p>
        <p className="text-sm mt-1">{offerText}</p>
        <p className="text-sm mt-1">{feeText}</p>
      </div>

      {/* Card Image Placeholder */}
      <div className="bg-gray-200 flex items-center justify-center rounded-lg p-0.5">
        <Image
          src={imageSrc}
          alt={`${title} card`}
          width={280}
          height={160}
          className="object-contain"
        />
      </div>

      {/* Footer */}
      <div className="p-4 text-center space-y-3">
        <p className="font-normal text-white">{title}</p>
        <Button asChild variant="whiteGhost" className="w-full h-auto py-1 justify-center items-center px-3 whitespace-normal">
          <a href={href} className="max-w-[12rem] font-bold text-lg border text-center block flex flex-col -space-y-2.5">
            <span className="block">{buttonTopText}</span>
            <span className="block">{buttonBottomText}</span>
          </a>
        </Button>
      </div>
    </div>
  );
}