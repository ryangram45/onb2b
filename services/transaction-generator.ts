import BankAccount from "@/lib/models/BankAccount";
import Transaction from "@/lib/models/Transaction";
import { DEBIT_MERCHANTS, INCOME_SOURCES } from "@/lib/simulation/bank-rules";

// --- Helper Functions ---
const randomAmount = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getBalanceTier = (balance: number) => {
  if (balance < 2000) return "LOW";
  if (balance < 50000) return "MEDIUM";
  if (balance < 1000000) return "HIGH";
  return "ULTRA_HIGH";
};


interface GenerateHistoryArgs {
  bankAccountId: string;
  balance: number;
  startDate: Date;
  endDate: Date;
}

export async function generateBankHistory(args: GenerateHistoryArgs) {
  const { bankAccountId, balance, startDate, endDate } = args;

  await Transaction.deleteMany({ bankAccountId });

  let currentBalance = balance;
  const transactions: any[] = [];
  const purchaseHistory: any[] = [];

  for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
    const currentDate = new Date(day);
    const tier = getBalanceTier(currentBalance);
    let dailyTransactionCount = 0;

    const attemptTransaction = (merchantName: keyof typeof DEBIT_MERCHANTS, probability: number) => {
      if (dailyTransactionCount >= 5 || Math.random() > probability) return;

      const merchant = DEBIT_MERCHANTS[merchantName];
      const amount = randomAmount(merchant.min, merchant.max);

      if (currentBalance - amount < 0) return; // Insufficient funds

      currentBalance -= amount;
      const newTx = {
        bankAccountId,
        date: currentDate,
        amount: -amount,
        description: `${merchantName.toUpperCase()} ${merchant.descriptor()}`,
        category: merchant.category,
        currentBalance,
      };
      transactions.push(newTx);
      purchaseHistory.push(newTx);
      dailyTransactionCount++;
    };

    // --- Income Generation ---
    if (currentDate.getDate() === 1 || currentDate.getDate() === 15) {
      const income = INCOME_SOURCES.Payroll;
      const amount = randomAmount(income.min, income.max);
      currentBalance += amount;
      transactions.push({ bankAccountId, date: currentDate, amount, description: income.descriptor(), category: "Deposit", currentBalance });
    }
    if (currentDate.getDate() === 28) { // Monthly Interest
        const interest = INCOME_SOURCES.Interest;
        const amount = randomAmount(interest.min, Math.min(interest.max, currentBalance * 0.01));
        currentBalance += amount;
        transactions.push({ bankAccountId, date: currentDate, amount, description: interest.descriptor(), category: "Deposit", currentBalance });
    }

    // --- Spending Generation (Probabilities scaled by balance tier) ---
    const probabilities = {
      LOW: { Starbucks: 0.2, Gas: 0.5, Groceries: 0.6, Amazon: 0.05, Target: 0 },
      MEDIUM: { Starbucks: 0.5, Gas: 0.6, Groceries: 0.7, Amazon: 0.2, Target: 0.1 },
      HIGH: { Starbucks: 0.7, Gas: 0.7, Groceries: 0.8, Amazon: 0.4, Target: 0.3 },
      ULTRA_HIGH: { Starbucks: 0.8, Gas: 0.8, Groceries: 0.9, Amazon: 0.6, Target: 0.5 },
    };

    attemptTransaction("Starbucks", probabilities[tier].Starbucks || 0);
    attemptTransaction("Shell", probabilities[tier].Gas || 0);
    attemptTransaction("Safeway", probabilities[tier].Groceries || 0);
    attemptTransaction("Amazon", probabilities[tier].Amazon || 0);
    attemptTransaction("Target", probabilities[tier].Target || 0);

    // --- Bill Payments (Fixed Dates) ---
    if (currentDate.getDate() === 5) attemptTransaction("Comcast", 1.0);
    if (currentDate.getDate() === 10) attemptTransaction("Netflix", 1.0);

    // --- Refunds ---
    if (Math.random() < 0.02 && purchaseHistory.length > 0) {
        const purchaseToRefund = getRandomElement(purchaseHistory.filter(p => (currentDate.getTime() - new Date(p.date).getTime()) / (1000 * 3600 * 24) > 3 && (currentDate.getTime() - new Date(p.date).getTime()) / (1000 * 3600 * 24) < 14));
        if (purchaseToRefund) {
            const refundAmount = randomAmount(1, -purchaseToRefund.amount);
            currentBalance += refundAmount;
            transactions.push({ bankAccountId, date: currentDate, amount: refundAmount, description: `REFUND: ${purchaseToRefund.description}`, category: "Refund", currentBalance });
        }
    }
  }

  transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Final balance recalculation for accuracy
  let runningBalance = balance;
  for (const tx of transactions) {
    runningBalance += tx.amount;
    tx.currentBalance = runningBalance;
  }

  if (transactions.length > 0) {
    await Transaction.insertMany(transactions);
    const finalBalance = transactions[transactions.length - 1].currentBalance;
    await BankAccount.findByIdAndUpdate(bankAccountId, { balance: finalBalance });
  } else {
    await BankAccount.findByIdAndUpdate(bankAccountId, { balance });
  }

  return transactions;
}
