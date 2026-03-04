const merchants = [
  "SAFEWAY",
  "TARGET",
  "AMAZON",
  "STARBUCKS",
  "WALMART",
  "CHEVRON",
  "SHELL",
  "NETFLIX",
  "SPOTIFY",
  "COMCAST",
];

const categories = [
  "GROCERIES",
  "SHOPPING",
  "DINING",
  "UTILITY",
  "STREAMING",
  "GAS",
  "MEDICAL",
  "TRAVEL",
];


const channels = ["POS", "WEB", "ACH", "PPD"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomReferenceId(): string {
  return `XXXXX${Math.floor(100000 + Math.random() * 900000)}`;
}

function randomBranch(): string {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

export function generateBankDescription(): string {
  const merchant = randomItem(merchants);
  const category = randomItem(categories);
  const channel = randomItem(channels);
  const id = randomReferenceId();
  const branch = randomBranch();

  return `${merchant} DES:${category} ID:${id} BRANCH:${branch} ${channel}`;
}