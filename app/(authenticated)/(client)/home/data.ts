import { SiZelle } from "react-icons/si";
import { TbWorldCode } from "react-icons/tb";
import type { ComponentType } from "react";
import { FaCertificate } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

export interface ActiveAccount {
  name: string;
  logo: string;
  text?: string;
  type: string;
  balance: string;
  page: string;
}

export interface ProfileUpdateItem {
  title: string;
  description?: string;
}

type Logo = string | ComponentType<{ size?: number; color?: string }>;

export interface PaymentMethod {
  logo: Logo;
  title: string;
  description: string;
}

export const paymentMethods: PaymentMethod[] = [
  {
    logo: "/images/banking2.svg",
    title: "Transfer",
    description: "between my accounts",
  },
  {
    logo: SiZelle,
    title: "Zelle®",
    description: "Send or receive",
  },
  {
    logo: "/images/bills.svg",
    title: "Pay Bills",
    description: "pay now or schedule",
  },
  {
    logo: TbWorldCode,
    title: "Wire",
    description: "U.S or international",
  },
];

export const paidTransaction = [
  {
    logo: "/images/logo.svg",
    title: "BANK OF AMERICA - PERSONAL CARD - 1314",
    type: "Doc",
    date: "due Feb 24",
    isPaid: "PAY",
    approve: "Mark as Paid",
  },
  {
    logo: "/images/logo.svg",
    title: "BANK OF AMERICA - PERSONAL CARD - 1314",
    type: "Doc",
    date: "due Mar 24",
    isPaid: "PAY",
    approve: "Mark as Paid",
  },
];

export const disclaimers = [
  "Are Not FDIC Insured",
  "Are Not Bank Guaranteed",
  "May Lose Value",
  "Are Not Deposits",
  "Are Not Insured by Any Federal Government Agency",
  "Are Not a Condition to Any Banking Service or Activities",
];

export const legalButtonsGroupOne = [
  "Browse with Specialist",
  "Security",
  "Privacy",
  "Children's Privacy",
];
export const legalButtonsGroupTwo = [
  "Your Privacy Choices",
  "Advertising Practices",
  "Legal Info & Disclosures",
  "Equal Housing Lender",
];


export const buttonListOne = [
  "Browse with Specialist",
  "Security",
  "Privacy",
  "Children's Privacy",
];
export const buttonListTwo = [
  "Your Privacy Choices",
  "Advertising Practices",
  "Legal Info & Disclosures",
  "Equal Housing Lender",
];


export const activeAccounts: ActiveAccount[] = [
  {
    name: "Banking",
    logo: "/images/logo.svg",
    text: "FDIC-Insured - Backed by the full faith and credit of the U.S Government",
    type: "Adv Plus Banking - 3324",
    balance: "$3,158,624.19",
    page: "/home/account/histories",
  },
  {
    name: "Credit Cards",
    logo: "/images/logo.svg",
    type: "Doc",
    balance: "$15,844.79",
    page: "/home/account/credit-card/histories",
  },
];

export const profileUpdateItems: ProfileUpdateItem[] = [
  { title: "Jane", description: "Preferred Rewards Platinum Member" },
  { title: "Bank of American Life Plan®", description: "Your next steps are ready. Let's go!" },
  { title: "My Rewards" },
];


export const investmentRiskDisclaimers = ["Are Not FDIC Insured", "Are Not Bank Guaranteed", "May Lose Value", "Are Not Deposits", "Are Not Insured by Any Federal Government Agency", "Are Not a Condition to Any Banking Service or Activities"]
export const dashboardList = [
    {
      logo: "/images/Adv Plus Banking.svg",
      title: "Adv Plus Banking - 3324",
      balance: "$54.19",
      description: "Available balance",
    },
    {
      logo: "/images/AverageSpend.svg",
      title: "On Average You Speed",
      balance: "$1,523",
      description: "More Than You Deposit",
    },
    {
      logo: "/images/FICOscore.svg",
      title: "My FICO® Score",
      balance: "$560",
      description: "As of 02/20/2025",
    },
    {
      logo: "/images/untuckit.svg",
      title: "BankAmeriDeals®",
      balance: "$20",
      description: "65 Days Left",
    },
    {
      logo: IoIosNotifications,
      title: "Alerts",
      balance: "0",
      description: "Unread",
    },
    {
      logo: FaCertificate,
      title: "My Rewards",
      description: "All your rewards in one place",
    },
  ];