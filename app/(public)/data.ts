import { Globe } from "lucide-react";

export const navbarMainItems = [
  { href: "/personal", label: "Personal" },
  { href: "/wealth-management", label: "Wealth Management" },
  { href: "/business", label: "Business" },
  { href: "/corporations-institutions", label: "Corporations & Institutions" },
];

export const navbarUtilityItems = [
  { href: "/security", label: "Security" },
  { href: "/about-us", label: "About Us" },
  { href: "/en-espanol", label: "En español", icon: Globe },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/help", label: "Help" },
];


export const promotionItems = [
  {
    iconSrc: "/images/asset-card.png",
    title: "6% customized cash back offer",
    description:
      "Earn more cash back in the category of your choice with the Customized Cash Rewards credit card.",
    ctaLabel: "Apply now",
    href: "#",
  },
  {
    iconSrc: "/images/assets-dollar.png",
    title: "Cash offer up to $500",
    description: "Check out this offer for new checking customers.",
    ctaLabel: "See details",
    href: "#",
  },
  {
    iconSrc: "/images/asset-bell.png",
    title: "Custom mobile alerts",
    description:
      "With our Mobile Banking app alerts, prioritize what you see based on what matters most to you.",
    ctaLabel: "Get the app",
    href: "#",
  },
  {
    iconSrc: "/images/asset-merrill.svg",
    title: "Solutions built around you",
    description:
      "At Merrill, we provide the tools, people and know-how to help you pursue your financial goals.",
    ctaLabel: "Get started",
    href: "#",
  },
] as const

export const betterMoneyCardItems = [
  {
    imageSrc: "/images/asset-wallet-bank-bg.jpg",
    iconSrc: "/images/asset-wallet-habit.svg",
    iconAlt: "Briefcase icon",
    title: "Real Talk with Better Money Habits®",
  },
  {
    imageSrc: "/images/asset-rounded-dollar-bg.jpg",
    iconSrc: "/images/asset-rounded-dollar.svg",
    iconAlt: "Dollar sign icon",
    title: "8 common bank fees—and how to avoid them",
  },
  {
    imageSrc: "/images/asset-bank-bg.jpg",
    iconSrc: "/images/asset-bank.svg",
    iconAlt: "House icon",
    title: "What is a certificate of deposit (CD) and how does it work?",
  },
  {
    imageSrc: "/images/asset-piggy-bank-bg.jpg",
    iconSrc: "/images/asset-piggy-bank.svg",
    iconAlt: "Piggy bank / target icon",
    title: "How to start building an emergency fund",
  },
] as const;


export const connectItems = [
  {
    iconSrc: "/images/asset-connect-calander.svg",
    label: "Schedule an appointment",
    href: "#",
  },
  {
    iconSrc: "/images/asset-connect-location.svg",
    label: "Find a location",
    href: "#",
  },
  {
    iconSrc: "/images/asset-connect-phone.svg",
    label: "Contact us",
    href: "#",
  },
  {
    iconSrc: "/images/asset-connect-help.svg",
    label: "Help center",
    href: "#",
  },
] as const

export const footerTopNavItems = [
  "Locations",
  "Contact Us",
  "Help & Support",
  "Browse with Specialist",
  "Accessible Banking",
  "Privacy",
  "Children’s Privacy",
  "Security",
  "Online Banking Service Agreement",
  "AdChoices",
  "Your Privacy Choices",
  "Site Map",
  "Careers",
  "Share Your Feedback",
  "View Full Online Banking Site",
] as const;


export const loginHelpLinks = [
    "Forgot ID/Password?",
    "Problem logging in?",
  ];

export const onlineBankingLinks = [
    "Enroll now",
    "Learn more about Online Banking",
    "Service Agreement",
  ];
