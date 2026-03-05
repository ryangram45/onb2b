import CardTransaction from "@/lib/models/CreditCardTransaction";
import CreditCard from "@/lib/models/CreditCard";
import { generateCardDescription } from "@/utils/templates/card-transactions";


interface GenerateCardHistoryOptions {
  creditCardId: string;
  balance: number;
  days?: number;
}

function randomCardAmount(balance: number, days: number): number {
  const isRefund = Math.random() < 0.1;
  const maxPurchase = balance / (days * 0.9) * 1.5;
  const maxRefund = balance / (days * 0.1) * 0.5;

  if (isRefund) {
    return Math.floor(Math.random() * maxRefund) + 20;
  }

  return -(Math.floor(Math.random() * maxPurchase) + 10);
}

function subtractDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
}

export async function generateCardHistory({
  creditCardId,
  balance,
  days = 30,
}: GenerateCardHistoryOptions) {
  let currentBalance = balance;

  const transactions = [];

  for (let i = 0; i < days; i++) {
    const amount = randomCardAmount(balance, days);
    currentBalance += amount;

    const date = subtractDays(new Date(), i);

    transactions.push({
      creditCardId,
      date,
      amount,
      description: generateCardDescription(),
      type: amount > 0 ? "refund" : "purchase",
      currentBalance,
    });
  }

  transactions.reverse();

  await CardTransaction.insertMany(transactions);

  const finalBalance = transactions[transactions.length - 1].currentBalance;

  await CreditCard.findByIdAndUpdate(creditCardId, { balance: finalBalance });

  return transactions;
}