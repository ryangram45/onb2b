export const transactionMerchants = {
  dining: [
    { name: "Starbucks", min: 4, max: 25, frequency: 'multiple-weekly' },
  ],
  streaming: [
    { name: "Netflix", min: 10, max: 25, frequency: 'monthly' },
  ],
  gas: [
    { name: "Shell", min: 30, max: 120, frequency: 'weekly' },
    { name: "Chevron", min: 30, max: 120, frequency: 'weekly' },
  ],
  groceries: [
    { name: "Walmart", min: 20, max: 500, frequency: 'weekly' },
    { name: "Target", min: 20, max: 500, frequency: 'weekly' },
    { name: "Safeway", min: 20, max: 350, frequency: 'weekly' },
  ],
  utility: [
    { name: "Comcast", min: 60, max: 250, frequency: 'monthly' },
  ],
  shopping: [
    { name: "Amazon", min: 15, max: 400, frequency: 'multiple-weekly' },
  ],
};

export const incomeSources = {
  payroll: { name: "ACME TECH INC", min: 2000, max: 10000, frequency: 'bi-weekly' },
  ach: { name: "External Account Transfer", min: 200, max: 5000, frequency: 'occasional' },
  zelle: { name: "Zelle Deposit", min: 20, max: 2000, frequency: 'occasional' },
  tax: { name: "IRS TREAS 310 - TAX REF", min: 500, max: 10000, frequency: 'annual' },
};

export const transactionCategories = {
  dining: "Dining",
  streaming: "Streaming",
  gas: "Gas",
  groceries: "Groceries",
  utility: "Utilities",
  shopping: "Shopping",
  income: "Income",
  transfer: "Transfer",
  refund: "Refund",
};

export const achCodes = {
  pos: "POS",
  ach: "ACH",
  ppd: "PPD",
  web: "WEB",
  dep: "DEP",
};
