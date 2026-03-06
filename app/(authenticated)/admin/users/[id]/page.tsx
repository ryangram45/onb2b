import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { 
  User, 
  Mail, 
  CreditCard, 
  Landmark, 
  QrCode,
  Activity,
  ArrowLeft,
  MoreVertical
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import UserHistoryActions from "@/components/admin/user-history-actions";
import TransactionListClient from "./TransactionListClient";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

type BankAccountDto = {
  advPlusAccountNumber: string;
  routingNumber: string;
  paperElectronicNumber: string;
  wiresAccountNumber: string;
  balance: number;
};

type CreditCardDto = {
  cardName: string;
  cardNumber: string;
  balance: number;
  limit: number;
  expiryDate?: string;
};

type BankTx = {
  id: string;
  date: string | null;
  amount: number;
  description: string;
  balance: number;
};

type CardTx = {
  id: string;
  date: string | null;
  amount: number;
  merchant?: string;
  type?: string;
  balance: number;
};

async function getUser(id: string, cookie: string) {
  const res = await fetch(`${baseUrl}/api/admin/users/${id}`, {
    cache: "no-store",
    headers: {
      cookie,
    },
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch user ${res.status}`);
  }

  return res.json();
}

async function getBankAccount(id: string, cookie: string): Promise<BankAccountDto | null> {
  const res = await fetch(`${baseUrl}/api/admin/users/${id}/bank-account`, {
    cache: "no-store",
    headers: {
      cookie,
    },
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch bank account ${res.status}`);
  }
  return res.json() as Promise<BankAccountDto>;
}

async function getCreditCard(id: string, cookie: string): Promise<CreditCardDto | null> {
  const res = await fetch(`${baseUrl}/api/admin/users/${id}/credit-card`, {
    cache: "no-store",
    headers: {
      cookie,
    },
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch credit card ${res.status}`);
  }
  return res.json() as Promise<CreditCardDto>;
}

async function getRecentBankTransactions(id: string, cookie: string): Promise<BankTx[]> {
  const res = await fetch(`${baseUrl}/api/admin/users/${id}/bank-transactions?limit=5`, {
    cache: "no-store",
    headers: {
      cookie,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch bank tx ${res.status}`);
  }
  return res.json() as Promise<BankTx[]>;
}

async function getRecentCardTransactions(id: string, cookie: string): Promise<CardTx[]> {
  const res = await fetch(`${baseUrl}/api/admin/users/${id}/card-transactions?limit=5`, {
    cache: "no-store",
    headers: {
      cookie,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch card tx ${res.status}`);
  }
  return res.json() as Promise<CardTx[]>;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatAccountNumber(number: string) {
  return `•••• ${number.slice(-4)}`;
}

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hdrs = await headers();
  const cookie = hdrs.get("cookie") ?? "";
  const [user, bankAccountRaw, creditCardRaw, recentTransactions, recentCardTransactions] = await Promise.all([
    getUser(id, cookie),
    getBankAccount(id, cookie),
    getCreditCard(id, cookie),
    getRecentBankTransactions(id, cookie),
    getRecentCardTransactions(id, cookie),
  ]);

  if (!user) {
    return notFound();
  }

  const bankAccount = bankAccountRaw ?? {
    advPlusAccountNumber: "",
    routingNumber: "",
    paperElectronicNumber: "",
    wiresAccountNumber: "",
    balance: 0,
  };
  const creditCard = creditCardRaw ?? {
    cardName: "N/A",
    cardNumber: "•••• •••• •••• ••••",
    balance: 0,
    limit: 0,
    expiryDate: "—",
  };
  const accountNumber = bankAccount.advPlusAccountNumber ?? "";

  return (
    <div className="space-y-6 pb-8">
      {/* Header with back button and actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/users">
            <Button variant="ghost" size="icon" className="rounded-full cursor-pointer hover:bg-transparent">
              <ArrowLeft className="h-5 w-5 text-onb2b-blue-900" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">
              User Profile
            </h1>
            <p className="text-sm text-muted-foreground">
              Detailed information and account management
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-none shadow-none cursor-pointer">
            <Activity className="h-4 w-4 mr-2 text-onb2b-blue-600" />
            Activity Log
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-transparent cursor-pointer">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* User Profile Card */}
      <Card className="border-0 bg-gradient-to-r from-onb2b-blue-50 to-onb2b-red-50 dark:from-onb2b-blue-950/30 dark:to-onb2b-red-950/30 overflow-hidden shadow-onb2b-red-100/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-20 w-20 border-4 border-white dark:border-gray-800 shadow-lg">
              <AvatarFallback className="bg-onb2b-blue-100 text-onb2b-blue-800 text-xl">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold">{user.fullName}</h2>
                <Badge className={cn(
                  "capitalize",
                  user.role === "admin" 
                    ? "bg-onb2b-blue-100 text-onb2b-blue-800 border-onb2b-blue-200" 
                    : "bg-onb2b-red-50 text-onb2b-red-700 border-onb2b-red-200"
                )}>
                  {user.role}
                </Badge>
                <Badge variant="outline" className={cn(
                  user.isActive 
                    ? "bg-green-500 text-white" 
                    : "border-onb2b-red-450 text-onb2b-red-450"
                )}>
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-onb2b-blue-600" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-onb2b-blue-600" />
                  <span>User ID: {user.userId}</span>
                </div>
              </div>
            </div>

            <div className="md:flex gap-2 self-end md:self-center hidden">
              <UserHistoryActions userId={id} userDisplayName={user.fullName} align="end" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Bank Account Card */}
        <Card className="border-0 shadow-onb2b-blue-100/60 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-onb2b-blue-600 to-onb2b-blue-800" />
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Landmark className="h-5 w-5 text-onb2b-blue-600" />
              Bank Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-onb2b-blue-800">
                {formatCurrency(bankAccount.balance)}
              </span>
              <Badge variant="secondary" className="bg-onb2b-blue-50 text-onb2b-blue-700">
                Available Balance
              </Badge>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Account Number</p>
                <p className="font-mono text-sm flex items-center gap-1">
                  <QrCode className="h-3 w-3 text-onb2b-blue-600" />
                  {formatAccountNumber(accountNumber)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Routing Number</p>
                <p className="font-mono text-sm">{bankAccount.routingNumber}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Paper & Electronic</p>
                <p className="font-mono text-sm">{bankAccount.paperElectronicNumber}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Wires Number</p>
                <p className="font-mono text-sm">{bankAccount.wiresAccountNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Card Card */}
        <Card className="border-0 shadow-onb2b-red-100/20 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-onb2b-red-450 to-onb2b-red-600" />
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-onb2b-red-450" />
              {creditCard.cardName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-onb2b-red-600">
                {formatCurrency(creditCard.balance)}
              </span>
              <Badge variant="secondary" className="bg-onb2b-red-50 text-onb2b-red-700">
                Current Balance
              </Badge>
            </div>
            
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Card Number</p>
              <p className="font-mono text-lg tracking-wider">
                {creditCard.cardNumber}
              </p>
              <div className="flex justify-between mt-2 text-sm">
                <span>Expires: {creditCard.expiryDate}</span>
                <span>Limit: {formatCurrency(creditCard.limit)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Transactions */}
      <Tabs defaultValue="bank" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="bank" className="data-[state=active]:bg-onb2b-blue-600 data-[state=active]:text-white">
            Bank Transactions
          </TabsTrigger>
          <TabsTrigger value="card" className="data-[state=active]:bg-onb2b-red-450 data-[state=active]:text-white">
            Card Transactions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="bank" className="mt-4">
          <Card className="shadow-onb2b-blue-100/60 border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Recent Bank Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionListClient
                userId={id}
                type="bank"
                transactions={recentTransactions}
              />
              
              <a href={`/admin/users/${id}/bank-transactions`} className="block">
                <Button variant="link" className="mt-4 text-onb2b-blue-600 w-full">
                  View All Transactions
                </Button>
              </a>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="card" className="mt-4">
          <Card className="shadow-onb2b-red-100/20 border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Recent Card Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionListClient
                userId={id}
                type="card"
                transactions={recentCardTransactions}
              />
              
              <a href={`/admin/users/${id}/card-transactions`} className="block">
                <Button variant="link" className="mt-4 text-onb2b-red-450 w-full">
                  View All Card Transactions
                </Button>
              </a>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Action Buttons (Mobile responsive) */}
      <div className="md:hidden">
        <UserHistoryActions userId={id} userDisplayName={user.fullName} align="start" />
      </div>
    </div>
  );
}
