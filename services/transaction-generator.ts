import BankAccount from "@/lib/models/BankAccount";
import Transaction from "@/lib/models/Transaction";
import { DEBIT_MERCHANTS_BY_CATEGORY, INCOME_SOURCES } from "@/lib/simulation/bank-rules";

// --- Helper Functions ---
const randomAmount = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// --- Simulation Core ---

interface GenerateHistoryArgs {
  bankAccountId: string;
  startingBalance: number;
  closingBalance: number;
  startDate: Date;
  endDate: Date;
}

export async function generateBankHistory(args: GenerateHistoryArgs) {
  const { bankAccountId, startingBalance, closingBalance, startDate, endDate } = args;

  await Transaction.deleteMany({ bankAccountId });

  const transactions: any[] = [];
  const baseSalary = randomAmount(8000, 14500);
  const salaryVariation = baseSalary * 0.05;

  // 1. Schedule consistent, realistic payroll
  const firstPayrollDate = new Date(startDate);
  firstPayrollDate.setDate(startDate.getDate() + Math.floor(Math.random() * 14));

  for (let payDay = new Date(firstPayrollDate); payDay <= endDate; payDay.setDate(payDay.getDate() + 14)) {
    const payrollAmount = randomAmount(baseSalary - salaryVariation, baseSalary + salaryVariation);
    transactions.push({ 
      date: new Date(payDay), 
      amount: payrollAmount, 
      description: INCOME_SOURCES.Payroll.descriptor(), 
      category: "Deposit" 
    });
  }

  // 2. Schedule other major credit and debit events
  for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
    const currentDate = new Date(day);

    // Interest
    if (currentDate.getDate() === 28) {
      const income = INCOME_SOURCES.Interest;
      transactions.push({ date: currentDate, amount: randomAmount(income.min, income.max), description: income.descriptor(), category: "Deposit" });
    }

    // Probabilistic Major Credits (Wires, ACH, Zelle)
    if (Math.random() < 0.1) { // Reduced probability to make them more special
        const sourceType = getRandomElement(["Wire_Transfer", "ACH_Transfer", "Zelle"]);
        const income = INCOME_SOURCES[sourceType as keyof typeof INCOME_SOURCES];
        transactions.push({ date: currentDate, amount: randomAmount(income.min, income.max), description: income.descriptor(), category: "Deposit" });
    }
    
    // Utility and Subscription Bills on fixed days
    if (currentDate.getDate() === 5) {
        const merchant = DEBIT_MERCHANTS_BY_CATEGORY.Utility[0];
        transactions.push({ date: currentDate, amount: -randomAmount(merchant.min, merchant.max), description: `${merchant.name.toUpperCase()} ${merchant.descriptor()}`, category: "Utility" });
    }
    if (currentDate.getDate() === 10) {
        const merchant = DEBIT_MERCHANTS_BY_CATEGORY.Streaming[0];
        transactions.push({ date: currentDate, amount: -randomAmount(merchant.min, merchant.max), description: `${merchant.name.toUpperCase()} ${merchant.descriptor()}`, category: "Streaming" });
    }

    // Daily spending, with low probability
    if (Math.random() < 0.6) { // 60% chance of any spending
        const category = getRandomElement(["Dining", "Gas", "Groceries", "Shopping"]);
        const merchants = DEBIT_MERCHANTS_BY_CATEGORY[category as keyof typeof DEBIT_MERCHANTS_BY_CATEGORY];
        const merchant = getRandomElement(merchants);
        transactions.push({ date: currentDate, amount: -randomAmount(merchant.min, merchant.max), description: `${merchant.name.toUpperCase()} ${merchant.descriptor()}`, category });
    }
  }

  // 3. Sort all transactions by date
  transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // 4. Calculate running balance and save
  let runningBalance = startingBalance;
  for (const tx of transactions) {
    runningBalance += tx.amount;
    // Ensure balance doesn't go negative from debits
    if (runningBalance < 0 && tx.amount < 0) {
        runningBalance -= tx.amount; // Revert transaction if it causes overdraft
        tx.amount = 0; // Effectively remove the transaction
    }
    tx.currentBalance = runningBalance;
    tx.bankAccountId = bankAccountId;
  }
  
  const finalTransactions = transactions.filter(tx => tx.amount !== 0); // Filter out reverted transactions

  const finalBalanceCalculated = finalTransactions.length > 0 ? finalTransactions[finalTransactions.length - 1].currentBalance : startingBalance;
  const closingBalanceDelta = closingBalance - finalBalanceCalculated;
  if (closingBalanceDelta !== 0) {
    if (closingBalanceDelta > 0) {
      const incomeKeys = ["ACH_Transfer", "Wire_Transfer", "Zelle", "Tax_Refund", "Interest"] as const;
      const selectedIncomeKey = getRandomElement([...incomeKeys]);
      const income = INCOME_SOURCES[selectedIncomeKey];
      finalTransactions.push({
        date: endDate,
        amount: closingBalanceDelta,
        description: income.descriptor(),
        category: "Deposit",
        bankAccountId,
        currentBalance: finalBalanceCalculated + closingBalanceDelta,
      });
    } else {
      const debitCategories = Object.keys(DEBIT_MERCHANTS_BY_CATEGORY) as Array<keyof typeof DEBIT_MERCHANTS_BY_CATEGORY>;
      const selectedCategory = getRandomElement(debitCategories);
      const merchant = getRandomElement(DEBIT_MERCHANTS_BY_CATEGORY[selectedCategory]);
      finalTransactions.push({
        date: endDate,
        amount: closingBalanceDelta, // negative
        description: `${merchant.name.toUpperCase()} ${merchant.descriptor()}`,
        category: selectedCategory,
        bankAccountId,
        currentBalance: finalBalanceCalculated + closingBalanceDelta,
      });
    }
  }

  if (finalTransactions.length > 0) {
    await Transaction.insertMany(finalTransactions);
    const finalBalance = finalTransactions[finalTransactions.length - 1].currentBalance;
    await BankAccount.findByIdAndUpdate(bankAccountId, { balance: finalBalance });
  } else {
    await BankAccount.findByIdAndUpdate(bankAccountId, { balance: startingBalance });
  }

  return finalTransactions;
}
