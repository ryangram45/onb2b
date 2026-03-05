export const DEBIT_MERCHANTS = {
  Starbucks: { category: "Dining", min: 4, max: 25, descriptor: () => `STORE ${Math.floor(1000 + Math.random() * 9000)} - POS` },
  Netflix: { category: "Streaming", min: 10, max: 25, descriptor: () => `.COM - WEB` },
  Shell: { category: "Gas", min: 30, max: 120, descriptor: () => `OIL ${String(Math.floor(10000 + Math.random() * 90000)).padStart(5, '0')} - POS` },
  Chevron: { category: "Gas", min: 30, max: 120, descriptor: () => `STATION ${Math.floor(1000 + Math.random() * 9000)} - POS` },
  Walmart: { category: "Groceries/Shopping", min: 20, max: 500, descriptor: () => `SUPERCENTER #${Math.floor(1000 + Math.random() * 9000)} - POS` },
  Target: { category: "Shopping", min: 20, max: 400, descriptor: () => `STORE #${Math.floor(1000 + Math.random() * 9000)} - POS` },
  Safeway: { category: "Groceries", min: 20, max: 350, descriptor: () => `STORE #${Math.floor(1000 + Math.random() * 9000)} - POS` },
  Amazon: { category: "Shopping", min: 15, max: 400, descriptor: () => `MKTPLACE PMTS - WEB` },
  Comcast: { category: "Utility", min: 60, max: 250, descriptor: () => `CABLE PAYMENT - ACH` },
};

export const INCOME_SOURCES = {
  Payroll: { min: 2000, max: 10000, descriptor: () => `PAYROLL - ACME TECH INC` },
  ACH_Transfer: { min: 200, max: 5000, descriptor: () => `ACH TRANSFER FROM SAVINGS` },
  Zelle: { min: 20, max: 2000, descriptor: () => `ZELLE FROM JANE DOE` },
  Tax_Refund: { min: 500, max: 8000, descriptor: () => `IRS TREAS 310 - TAX REF` },
  Interest: { min: 1, max: 200, descriptor: () => `INTEREST PAYMENT` },
};
