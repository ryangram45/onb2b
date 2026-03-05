export const REALISTIC_MERCHANTS = {
  HIGH_FREQUENCY: [
    { name: "Starbucks", category: "Dining", min: 4, max: 25, type: "POS" },
    { name: "The Coffee Bean", category: "Dining", min: 4, max: 20, type: "POS" },
  ],
  WEEKLY: [
    { name: "Safeway", category: "Groceries", min: 20, max: 350, type: "POS" },
    { name: "Walmart", category: "Groceries", min: 20, max: 400, type: "POS" },
    { name: "Target", category: "Shopping", min: 20, max: 300, type: "POS" },
    { name: "Chevron", category: "Gas", min: 30, max: 120, type: "POS" },
    { name: "Shell", category: "Gas", min: 30, max: 120, type: "POS" },
  ],
  BI_WEEKLY: [
    { name: "Doordash", category: "Dining", min: 15, max: 120, type: "WEB" },
    { name: "Uber Eats", category: "Dining", min: 15, max: 120, type: "WEB" },
    { name: "Lyft", category: "Transportation", min: 10, max: 80, type: "WEB" },
    { name: "Uber", category: "Transportation", min: 10, max: 80, type: "WEB" },
  ],
  MONTHLY: [
    { name: "Netflix", category: "Streaming", min: 10, max: 25, type: "WEB" },
    { name: "Hulu", category: "Streaming", min: 10, max: 25, type: "WEB" },
    { name: "Spotify", category: "Streaming", min: 10, max: 20, type: "WEB" },
  ],
  OCCASIONAL: [
    { name: "Amazon", category: "Shopping", min: 20, max: 500, type: "WEB" },
    { name: "Apple Store", category: "Electronics", min: 200, max: 1200, type: "POS" },
    { name: "Best Buy", category: "Electronics", min: 100, max: 1500, type: "POS" },
    { name: "Delta Airlines", category: "Travel", min: 150, max: 1000, type: "WEB" },
  ],
};

export const PAYMENT_DESCRIPTIONS = [
  "ONLINE PAYMENT - THANK YOU",
  "AUTOPAY PAYMENT",
  "BANK TRANSFER PAYMENT",
];
