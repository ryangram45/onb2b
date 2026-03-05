import Transaction from "@/lib/models/Transaction";
import BankAccount from "@/lib/models/BankAccount";
import { generateBankDescription } from "@/utils/templates/bank-transaction";

interface GenerateHistoryOptions {
  bankAccountId: string;
  balance: number;
  days?: number;
}

function randomAmount(balance: number, days: number): number {
  const isIncome = Math.random() < 0.3;
  const maxIncome = balance / (days * 0.3) * 2;
  const maxExpense = balance / (days * 0.7) * 0.5;

  if (isIncome) {
    return Math.floor(Math.random() * maxIncome) + 500;
  }

  return -(Math.floor(Math.random() * maxExpense) + 5);
}

function subtractDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
}

export async function generateBankHistory({
  bankAccountId,
  balance,
  days = 30,
}: GenerateHistoryOptions) {
  let currentBalance = balance;

  const transactions = [];

  for (let i = 0; i < days; i++) {
    const amount = randomAmount(balance, days);
    currentBalance += amount;

    const date = subtractDays(new Date(), i);

    transactions.push({
      bankAccountId,
      date,
      amount,
      description: generateBankDescription(),
      currentBalance,
    });
  }

  transactions.reverse();

  await Transaction.insertMany(transactions);

  const finalBalance = transactions[transactions.length - 1].currentBalance;

  await BankAccount.findByIdAndUpdate(bankAccountId, { balance: finalBalance });

  return transactions;
}