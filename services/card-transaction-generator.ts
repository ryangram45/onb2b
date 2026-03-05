import CreditCard from "@/lib/models/CreditCard";
import CreditCardTransaction from "@/lib/models/CreditCardTransaction";
import { REALISTIC_MERCHANTS, PAYMENT_DESCRIPTIONS } from "@/lib/simulation/card-rules";

// --- Helper Functions ---
function randomAmount(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- Simulation Core ---

interface GenerateHistoryArgs {
  creditCardId: string;
  creditLimit: number;
  userId: string;
}

export async function generateCardHistory(args: GenerateHistoryArgs) {
  const { creditCardId, creditLimit, userId } = args;

  // 1. Clear old history
  await CreditCardTransaction.deleteMany({ creditCardId });

  let currentBalance = 0;
  const transactions: any[] = [];
  const purchaseHistory: any[] = [];
  const today = new Date();
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(today.getDate() - 90);

  let nextPaymentDate = new Date(ninetyDaysAgo);
  nextPaymentDate.setDate(ninetyDaysAgo.getDate() + 25 + Math.floor(Math.random() * 5)); // Schedule first payment

  for (let day = new Date(ninetyDaysAgo); day <= today; day.setDate(day.getDate() + 1)) {
    const currentDate = new Date(day);

    // --- Generate Purchases ---
    const generatePurchase = (merchant: any) => {
      let amount = randomAmount(merchant.min, merchant.max);
      if (currentBalance + amount > creditLimit) {
        amount = creditLimit - currentBalance; // Adjust amount to not exceed limit
      }
      if (amount <= 0) return; // Skip if no available credit

      currentBalance += amount;
      const newTx = {
        creditCardId,
        userId,
        date: currentDate,
        amount: -amount, // Purchases are negative
        description: `${merchant.name} - ${merchant.type}`,
        category: merchant.category,
        type: "Purchase",
        currentBalance: currentBalance,
      };
      transactions.push(newTx);
      purchaseHistory.push(newTx);
    };

    // Generate transactions based on frequency
    if (Math.random() < 0.6) generatePurchase(getRandomElement(REALISTIC_MERCHANTS.HIGH_FREQUENCY));
    if (currentDate.getDay() === 5 && Math.random() < 0.8) generatePurchase(getRandomElement(REALISTIC_MERCHANTS.WEEKLY)); // Friday grocery/gas run
    if (currentDate.getDay() === 1 && Math.random() < 0.5) generatePurchase(getRandomElement(REALISTIC_MERCHANTS.WEEKLY)); // Monday
    if (Math.random() < 0.15) generatePurchase(getRandomElement(REALISTIC_MERCHANTS.BI_WEEKLY));
    if (Math.random() < 0.05) generatePurchase(getRandomElement(REALISTIC_MERCHANTS.OCCASIONAL));
    if (currentDate.getDate() === 15) generatePurchase(getRandomElement(REALISTIC_MERCHANTS.MONTHLY)); // Monthly subscriptions

    // --- Generate Payments ---
    if (currentDate >= nextPaymentDate && currentBalance > 100) {
      const paymentAmount = randomAmount(100, Math.min(currentBalance * 0.8, 3000));
      currentBalance -= paymentAmount;
      transactions.push({
        creditCardId,
        userId,
        date: currentDate,
        amount: paymentAmount, // Payments are positive
        description: getRandomElement(PAYMENT_DESCRIPTIONS),
        category: "Payment",
        type: "Payment",
        currentBalance: currentBalance,
      });
      // Schedule next payment
      nextPaymentDate.setDate(currentDate.getDate() + 28 + Math.floor(Math.random() * 5));
    }

    // --- Generate Refunds ---
    if (Math.random() < 0.02 && purchaseHistory.length > 0) {
      const purchaseToRefund = getRandomElement(purchaseHistory.filter(p => (currentDate.getTime() - new Date(p.date).getTime()) / (1000 * 3600 * 24) > 3 && (currentDate.getTime() - new Date(p.date).getTime()) / (1000 * 3600 * 24) < 14));
      if (purchaseToRefund) {
        const refundAmount = randomAmount(1, -purchaseToRefund.amount);
        currentBalance -= refundAmount;
        transactions.push({
          creditCardId,
          userId,
          date: currentDate,
          amount: refundAmount, // Refunds are positive
          description: `REFUND: ${purchaseToRefund.description}`,
          category: "Refund",
          type: "Refund",
          currentBalance: currentBalance,
        });
      }
    }
  }

  // Sort all transactions by date before saving
  transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Recalculate running balance to ensure accuracy
  let runningBalance = 0;
  for (const tx of transactions) {
    runningBalance += -tx.amount; // Invert amount for calculation
    tx.currentBalance = runningBalance;
  }

  if (transactions.length > 0) {
    await CreditCardTransaction.insertMany(transactions);
    const finalBalance = transactions[transactions.length - 1].currentBalance;
    await CreditCard.findByIdAndUpdate(creditCardId, { balance: finalBalance });
  } else {
    await CreditCard.findByIdAndUpdate(creditCardId, { balance: 0 });
  }

  return transactions;
}
