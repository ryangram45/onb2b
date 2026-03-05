import BankAccount from "@/lib/models/BankAccount";
import Transaction from "@/lib/models/Transaction";
import { DEBIT_MERCHANTS_BY_CATEGORY, INCOME_SOURCES } from "@/lib/simulation/bank-rules";

// --- Helper Functions ---
const randomAmount = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

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

  const transactions: any[] = [];

  // 1. Schedule major credit events first
  for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
    const currentDate = new Date(day);

    // Guaranteed Payroll & Interest
    if (currentDate.getDate() === 1 || currentDate.getDate() === 15) {
      const income = INCOME_SOURCES.Payroll;
      transactions.push({ date: currentDate, amount: randomAmount(income.min, income.max), description: income.descriptor(), category: "Deposit" });
    }
    if (currentDate.getDate() === 28) {
      const income = INCOME_SOURCES.Interest;
      transactions.push({ date: currentDate, amount: randomAmount(income.min, income.max), description: income.descriptor(), category: "Deposit" });
    }

    // Probabilistic Major Credits (Wires, ACH, Zelle)
    if (Math.random() < 0.15) { // ~15% chance each day for one of these
        const sourceType = getRandomElement(["Wire_Transfer", "ACH_Transfer", "Zelle"]);
        const income = INCOME_SOURCES[sourceType as keyof typeof INCOME_SOURCES];
        transactions.push({ date: currentDate, amount: randomAmount(income.min, income.max), description: income.descriptor(), category: "Deposit" });
    }
  }

  // 2. Sprinkle in debit events between the credits
  for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
    const currentDate = new Date(day);
    let dailyDebits = 0;

    // Utility and Subscription Bills on fixed days
    if (currentDate.getDate() === 5) {
        const merchant = DEBIT_MERCHANTS_BY_CATEGORY.Utility[0];
        transactions.push({ date: currentDate, amount: -randomAmount(merchant.min, merchant.max), description: `${merchant.name.toUpperCase()} ${merchant.descriptor()}`, category: "Utility" });
    }
    if (currentDate.getDate() === 10) {
        const merchant = DEBIT_MERCHANTS_BY_CATEGORY.Streaming[0];
        transactions.push({ date: currentDate, amount: -randomAmount(merchant.min, merchant.max), description: `${merchant.name.toUpperCase()} ${merchant.descriptor()}`, category: "Streaming" });
    }

    // Daily spending, but with much lower probability
    const maxDailyDebits = 2;
    if (Math.random() < 0.7 && dailyDebits < maxDailyDebits) { // 70% chance of any spending
        const category = getRandomElement(["Dining", "Gas", "Groceries", "Shopping"]);
        const merchants = DEBIT_MERCHANTS_BY_CATEGORY[category as keyof typeof DEBIT_MERCHANTS_BY_CATEGORY];
        const merchant = getRandomElement(merchants);
        transactions.push({ date: currentDate, amount: -randomAmount(merchant.min, merchant.max), description: `${merchant.name.toUpperCase()} ${merchant.descriptor()}`, category });
        dailyDebits++;
    }
  }

  // 3. Sort all transactions by date
  transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // 4. Calculate running balance and save
  let runningBalance = balance;
  for (const tx of transactions) {
    runningBalance += tx.amount;
    tx.currentBalance = runningBalance;
    tx.bankAccountId = bankAccountId;
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
