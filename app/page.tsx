import HeaderBanner from "@/app/(public)/_components/header-banner";
import Navbar from "@/app/(public)/_components/navbar";
import HeroSection from "./(public)/_components/hero-section";
import PromotionSection from "./(public)/_components/promotion";
import BetterMoneyHabitSection from "./(public)/_components/better-money-habit";
import NewsAndInformationSection from "./(public)/_components/news-and-information";
import ConnectWithUsSection from "./(public)/_components/connect-with-us";
import InvestmentDisclaimersSection from "./(public)/_components/investment-disclalmer";
import Footer from "./(public)/_components/footer";


export default function Page() {
  return (
    <main className="min-h-screen bg-background font-inter">
      <div className="mx-auto max-w-full">
        <HeaderBanner />
        <Navbar/>
        <HeroSection />
        <PromotionSection />
        <BetterMoneyHabitSection/>
        <NewsAndInformationSection/>
        <ConnectWithUsSection/>
        <div className="bg-[#f5f5f5] py-7">
        <InvestmentDisclaimersSection/>
        <Footer/>
        </div>
      </div>
    </main>
  );
}
