import Transaction from "@/lib/models/Transaction";
import { generateBankDescription } from "@/utils/templates/bank-transaction";

interface GenerateHistoryOptions {
  bankAccountId: string;
  startingBalance?: number;
  days?: number;
}

function randomAmount(): number {
  const isIncome = Math.random() < 0.3;

  if (isIncome) {
    return Math.floor(Math.random() * 5000) + 500;
  }

  return -(Math.floor(Math.random() * 500) + 5);
}

function subtractDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
}

export async function generateBankHistory({
  bankAccountId,
  startingBalance = 10000,
  days = 30,
}: GenerateHistoryOptions) {
  let balance = startingBalance;

  const transactions = [];

  for (let i = 0; i < days; i++) {
    const amount = randomAmount();
    balance += amount;

    const date = subtractDays(new Date(), i);

    transactions.push({
      bankAccountId,
      date,
      amount,
      description: generateBankDescription(),
      currentBalance: balance,
    });
  }

  transactions.reverse();

  await Transaction.insertMany(transactions);

  return transactions;
}