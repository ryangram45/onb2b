import Image from "next/image";
import { Button } from "@/components/ui/button";
import { betterMoneyCardItems } from "@/app/(public)/data";

interface CardItemProps {
  imageSrc: string;
  iconSrc: string;
  iconAlt: string;
  title: string;
}

function CardItem({ imageSrc, iconSrc, iconAlt, title }: CardItemProps) {
  return (
    <div className="relative aspect-[4/4] overflow-hidden bg-gray-100">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/10 transition-colors duration-300" />

      {/* Bottom bar */}
      <div className="group absolute bottom-5 left-0 right-0 bg-white/95 backdrop-blur-sm text-black inset-x-5 mx-auto max-w-[calc(100%-2.5rem)] cursor-pointer py-2">
        <div className="flex items-start justify-start gap-2 p-4">
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={10}
            height={10}
            className="h-7 w-7 object-contain"
          />
          <p className="text-sm font-normal leading-tight group-hover:underline text-onb2b-blue-800">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}


export default function BetterMoneyHabitsSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-12 text-black">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-normal text-black tracking-wide">
            Your financial goals matter
          </h2>
          <p className="mt-4 text-lg md:text-xl tracking-wide font-normal mx-auto">
            We can help you achieve them through Better Money Habits® financial education and programs that make communities stronger.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {betterMoneyCardItems.map((item, index) => (
            <CardItem
              key={index}
              imageSrc={item.imageSrc}
              iconSrc={item.iconSrc}
              iconAlt={item.iconAlt}
              title={item.title}
            />
          ))}
        </div>

        <div className="mt-8 md:mt-10 text-center">
          <p className="text-base md:text-lg mb-6">
            Explore more topics and build your financial know-how.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-onb2b-blue-1000 hover:bg-onb2b-blue-900 text-white px-8 py-6 text-lg font-medium"
            asChild
          >
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Better Money Habits®
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}