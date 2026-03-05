import CardTransaction from "@/lib/models/CreditCardTransaction";
import CreditCard from "@/lib/models/CreditCard";
import { transactionMerchants } from "@/lib/transaction-rules";
import { buildDescription, randomAmount } from "@/utils/transaction-helpers";

interface GenerateCardHistoryOptions {
  creditCardId: string;
  balance: number;
  startDate: Date;
  endDate: Date;
}

export async function generateCardHistory({
  creditCardId,
  balance,
  startDate,
  endDate,
}: GenerateCardHistoryOptions) {
  let currentBalance = balance;
  const transactions = [];

  for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
    const date = new Date(day);
    const dayOfWeek = date.getDay();

    // Monthly Bills
    if (date.getDate() === 10) { // Netflix
      const netflix = transactionMerchants.streaming[0];
      const netflixAmount = -randomAmount(netflix.min, netflix.max);
      if (currentBalance + netflixAmount > 0) {
        currentBalance += netflixAmount;
        transactions.push({
          creditCardId, date, amount: netflixAmount,
          description: buildDescription(netflix.name, 'web'), currentBalance,
          type: 'purchase'
        });
      }
    }

    // Groceries
    if ([1, 5].includes(dayOfWeek) && Math.random() < 0.4) { // Mon, Fri
      const merchant = transactionMerchants.groceries[Math.floor(Math.random() * transactionMerchants.groceries.length)];
      const amount = -randomAmount(merchant.min, merchant.max);
      if (currentBalance > 200 && currentBalance + amount > 0) {
        currentBalance += amount;
        transactions.push({ creditCardId, date, amount, description: buildDescription(merchant.name, 'pos'), currentBalance, type: 'purchase' });
      }
    }

    // Gas
    if (dayOfWeek === 4 && Math.random() < 0.7) { // Thursday
      const merchant = transactionMerchants.gas[Math.floor(Math.random() * transactionMerchants.gas.length)];
      const amount = -randomAmount(merchant.min, merchant.max);
      if (currentBalance > 100 && currentBalance + amount > 0) {
        currentBalance += amount;
        transactions.push({ creditCardId, date, amount, description: buildDescription(merchant.name, 'pos'), currentBalance, type: 'purchase' });
      }
    }

    // Dining/Coffee
    if (Math.random() < (currentBalance > 500 ? 0.5 : 0.15)) {
      const merchant = transactionMerchants.dining[0];
      const amount = -randomAmount(merchant.min, merchant.max);
      if (currentBalance + amount > 0) {
        currentBalance += amount;
        transactions.push({ creditCardId, date, amount, description: buildDescription(merchant.name, 'pos'), currentBalance, type: 'purchase' });
      }
    }

    // Amazon Shopping
    if (Math.random() < 0.25) { // Occasional shopping
        const merchant = transactionMerchants.shopping[0];
        const amount = -randomAmount(merchant.min, merchant.max);
        if (currentBalance > 300 && currentBalance + amount > 0) {
            currentBalance += amount;
            transactions.push({ creditCardId, date, amount, description: buildDescription(merchant.name, 'web'), currentBalance, type: 'purchase' });
        }
    }
  }

  transactions.sort((a, b) => a.date.getTime() - b.date.getTime());

  await CardTransaction.insertMany(transactions);

  if (transactions.length > 0) {
    const finalBalance = transactions[transactions.length - 1].currentBalance;
    await CreditCard.findByIdAndUpdate(creditCardId, { balance: finalBalance });
  }

  return transactions;
}