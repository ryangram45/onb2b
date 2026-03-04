import CardTransaction from "@/lib/models/CreditCardTransaction";
import { generateCardDescription } from "@/utils/templates/card-transactions";


interface GenerateCardHistoryOptions {
  creditCardId: string;
  startingBalance?: number;
  days?: number;
}

function randomCardAmount(): number {
  const isRefund = Math.random() < 0.1;

  if (isRefund) {
    return Math.floor(Math.random() * 200) + 20;
  }

  return -(Math.floor(Math.random() * 300) + 10);
}

function subtractDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
}

export async function generateCardHistory({
  creditCardId,
  startingBalance = 0,
  days = 30,
}: GenerateCardHistoryOptions) {
  let balance = startingBalance;

  const transactions = [];

  for (let i = 0; i < days; i++) {
    const amount = randomCardAmount();
    balance += amount;

    const date = subtractDays(new Date(), i);

    transactions.push({
      creditCardId,
      date,
      amount,
      description: generateCardDescription(),
      type: amount > 0 ? "refund" : "purchase",
      currentBalance: balance,
    });
  }

  transactions.reverse();

  await CardTransaction.insertMany(transactions);

  return transactions;
}