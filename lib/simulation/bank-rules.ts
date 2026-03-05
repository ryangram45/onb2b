export const DEBIT_MERCHANTS_BY_CATEGORY = {
  Dining: [
    { name: "Starbucks", min: 4, max: 25, descriptor: () => `STORE ${Math.floor(1000 + Math.random() * 9000)} - POS` },
  ],
  Gas: [
    { name: "Shell", min: 30, max: 120, descriptor: () => `OIL ${String(Math.floor(10000 + Math.random() * 90000)).padStart(5, '0')} - POS` },
    { name: "Chevron", min: 30, max: 120, descriptor: () => `STATION ${Math.floor(1000 + Math.random() * 9000)} - POS` },
  ],
  Groceries: [
    { name: "Safeway", min: 20, max: 350, descriptor: () => `STORE #${Math.floor(1000 + Math.random() * 9000)} - POS` },
    { name: "Walmart", min: 20, max: 500, descriptor: () => `SUPERCENTER #${Math.floor(1000 + Math.random() * 9000)} - POS` },
  ],
  Shopping: [
    { name: "Target", min: 20, max: 400, descriptor: () => `STORE #${Math.floor(1000 + Math.random() * 9000)} - POS` },
    { name: "Amazon", min: 15, max: 400, descriptor: () => `MKTPLACE PMTS - WEB` },
  ],
  Utility: [
    { name: "Comcast", min: 60, max: 250, descriptor: () => `CABLE PAYMENT - ACH` },
  ],
  Streaming: [
    { name: "Netflix", min: 10, max: 25, descriptor: () => `.COM - WEB` },
  ],
};

export const INCOME_SOURCES = {
  Payroll: { min: 2000, max: 10000, descriptor: () => `PAYROLL - ACME TECH INC` },
  ACH_Transfer: { min: 200, max: 5000, descriptor: () => `ACH TRANSFER FROM SAVINGS` },
  Zelle: { min: 20, max: 2000, descriptor: () => `ZELLE FROM SHANISE WILLIAMS` },
  Tax_Refund: { min: 500, max: 8000, descriptor: () => `IRS TREAS 310 - TAX REF` },
  Interest: { min: 1, max: 200, descriptor: () => `INTEREST PAYMENT` },
  Wire_Transfer: { min: 5000, max: 25000, descriptor: () => `Wire Transfer Received - DES:INCOMING WIRE ID:WT${Math.floor(1000000000 + Math.random() * 9000000000)} INDN:GLOBAL TECH SOLUTIONS` },
};
