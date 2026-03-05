import Transaction from "@/lib/models/Transaction";
import BankAccount from "@/lib/models/BankAccount";
import { transactionMerchants, incomeSources } from "@/lib/transaction-rules";
import { buildDescription, randomAmount } from "@/utils/transaction-helpers";

interface GenerateHistoryOptions {
  bankAccountId: string;
  balance: number;
  startDate: Date;
  endDate: Date;
}

export async function generateBankHistory({
  bankAccountId,
  balance,
  startDate,
  endDate,
}: GenerateHistoryOptions) {
  let currentBalance = balance;
  const transactions = [];

  const payrollDay1 = 1;
  const payrollDay2 = 15;

  for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
    const date = new Date(day);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

    // Payroll (bi-weekly)
    if (date.getDate() === payrollDay1 || date.getDate() === payrollDay2) {
      const amount = randomAmount(incomeSources.payroll.min, incomeSources.payroll.max);
      currentBalance += amount;
      transactions.push({
        bankAccountId,
        date,
        amount,
        description: buildDescription(incomeSources.payroll.name, 'dep'),
        currentBalance,
      });
    }

    // Monthly Bills
    if (date.getDate() === 5) { // Comcast
      const comcast = transactionMerchants.utility[0];
      const comcastAmount = -randomAmount(comcast.min, comcast.max);
      if (currentBalance + comcastAmount > 0) {
        currentBalance += comcastAmount;
        transactions.push({
          bankAccountId, date, amount: comcastAmount, 
          description: buildDescription(comcast.name, 'ppd'), currentBalance
        });
      }
    }
    if (date.getDate() === 10) { // Netflix
      const netflix = transactionMerchants.streaming[0];
      const netflixAmount = -randomAmount(netflix.min, netflix.max);
      if (currentBalance + netflixAmount > 0) {
        currentBalance += netflixAmount;
        transactions.push({
          bankAccountId, date, amount: netflixAmount, 
          description: buildDescription(netflix.name, 'web'), currentBalance
        });
      }
    }

    // Groceries (1-3 times a week)
    if ([1, 3, 5].includes(dayOfWeek) && Math.random() < 0.5) { // Mon, Wed, Fri
      const merchant = transactionMerchants.groceries[Math.floor(Math.random() * transactionMerchants.groceries.length)];
      const amount = -randomAmount(merchant.min, merchant.max);
      if (currentBalance > 200 && currentBalance + amount > 0) {
        currentBalance += amount;
        transactions.push({ bankAccountId, date, amount, description: buildDescription(merchant.name, 'pos'), currentBalance });
      }
    }

    // Gas (1-2 times a week)
    if (dayOfWeek === 2 && Math.random() < 0.8) { // Tuesday
      const merchant = transactionMerchants.gas[Math.floor(Math.random() * transactionMerchants.gas.length)];
      const amount = -randomAmount(merchant.min, merchant.max);
      if (currentBalance > 150 && currentBalance + amount > 0) {
        currentBalance += amount;
        transactions.push({ bankAccountId, date, amount, description: buildDescription(merchant.name, 'pos'), currentBalance });
      }
    }

    // Dining/Coffee (multiple times a week)
    if (Math.random() < (currentBalance > 1000 ? 0.6 : 0.2)) {
      const merchant = transactionMerchants.dining[0];
      const amount = -randomAmount(merchant.min, merchant.max);
      if (currentBalance + amount > 0) {
        currentBalance += amount;
        transactions.push({ bankAccountId, date, amount, description: buildDescription(merchant.name, 'pos'), currentBalance });
      }
    }
    
    // Amazon Shopping
    if (Math.random() < 0.2) { // Occasional shopping
        const merchant = transactionMerchants.shopping[0];
        const amount = -randomAmount(merchant.min, merchant.max);
        if (currentBalance > 500 && currentBalance + amount > 0) {
            currentBalance += amount;
            transactions.push({ bankAccountId, date, amount, description: buildDescription(merchant.name, 'web'), currentBalance });
        }
    }
  }

  // Sort transactions by date before inserting
  transactions.sort((a, b) => a.date.getTime() - b.date.getTime());

  await Transaction.insertMany(transactions);

  if (transactions.length > 0) {
    const finalBalance = transactions[transactions.length - 1].currentBalance;
    await BankAccount.findByIdAndUpdate(bankAccountId, { balance: finalBalance });
  }

  return transactions;
}