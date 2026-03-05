import BankAccount from "@/lib/models/BankAccount";
import Transaction from "@/lib/models/Transaction";
import { DEBIT_MERCHANTS_BY_CATEGORY, INCOME_SOURCES } from "@/lib/simulation/bank-rules";

// --- Helper Functions ---
const randomAmount = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getBalanceTier = (balance: number) => {
  if (balance < 2000) return "LOW";
  if (balance < 50000) return "MEDIUM";
  if (balance < 1000000) return "HIGH";
  return "ULTRA_HIGH";
};

// --- Simulation Core ---

interface GenerateHistoryArgs {
  bankAccountId: string;
  balance: number; // This is the starting balance
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

    const attemptDebit = (category: keyof typeof DEBIT_MERCHANTS_BY_CATEGORY, probability: number) => {
      if (dailyTransactionCount >= 5 || Math.random() > probability) return;

      const merchants = DEBIT_MERCHANTS_BY_CATEGORY[category];
      const merchant = getRandomElement(merchants);
      const amount = randomAmount(merchant.min, merchant.max);

      if (currentBalance - amount < 0) return; // Insufficient funds

      currentBalance -= amount;
      const newTx = {
        bankAccountId,
        date: currentDate,
        amount: -amount,
        description: `${merchant.name.toUpperCase()} ${merchant.descriptor()}`,
        category: category,
        currentBalance,
      };
      transactions.push(newTx);
      purchaseHistory.push(newTx);
      dailyTransactionCount++;
    };

    const attemptCredit = (source: keyof typeof INCOME_SOURCES, probability: number) => {
        if (Math.random() > probability) return;
        const income = INCOME_SOURCES[source];
        const amount = randomAmount(income.min, income.max);
        currentBalance += amount;
        transactions.push({ bankAccountId, date: currentDate, amount, description: income.descriptor(), category: "Deposit", currentBalance });
    }

    // --- Income Generation ---
    if (currentDate.getDate() === 1 || currentDate.getDate() === 15) attemptCredit("Payroll", 1.0);
    if (currentDate.getDate() === 28) attemptCredit("Interest", 1.0);
    attemptCredit("ACH_Transfer", 0.03);
    attemptCredit("Zelle", 0.05);
    attemptCredit("Wire_Transfer", tier === "HIGH" || tier === "ULTRA_HIGH" ? 0.01 : 0); // Wires only for high balance

    // --- Spending Generation (Probabilities scaled by balance tier) ---
    const probabilities = {
      LOW: { Dining: 0.2, Gas: 0.5, Groceries: 0.6, Shopping: 0.05 },
      MEDIUM: { Dining: 0.5, Gas: 0.6, Groceries: 0.7, Shopping: 0.2 },
      HIGH: { Dining: 0.7, Gas: 0.7, Groceries: 0.8, Shopping: 0.4 },
      ULTRA_HIGH: { Dining: 0.8, Gas: 0.8, Groceries: 0.9, Shopping: 0.6 },
    };

    attemptDebit("Dining", probabilities[tier].Dining);
    attemptDebit("Gas", probabilities[tier].Gas);
    attemptDebit("Groceries", probabilities[tier].Groceries);
    attemptDebit("Shopping", probabilities[tier].Shopping);

    // --- Bill Payments (Fixed Dates) ---
    if (currentDate.getDate() === 5) attemptDebit("Utility", 1.0);
    if (currentDate.getDate() === 10) attemptDebit("Streaming", 1.0);

    // --- Refunds ---
    if (Math.random() < 0.02 && purchaseHistory.length > 0) {
        const purchaseToRefund = getRandomElement(purchaseHistory.filter(p => (currentDate.getTime() - new Date(p.date).getTime()) / (1000 * 3600 * 24) > 3));
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
