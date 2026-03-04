export function generateRandomDigits(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
}

export function generateAdvPlusAccountNumber(): string {
  return "1" + generateRandomDigits(10);
}
const commonBoARoutingByState: Record<string, string> = {
  CA: "121000358",
  FL: "063100277",
  NY: "021000322",
  TX: "111000025",
  IL: "071000505",
  CO: "123103716",
  GA: "061000052",
  DEFAULT: "121000358",
};

export function generateRoutingNumber(state: string = "DEFAULT"): string {
  return commonBoARoutingByState[state.toUpperCase()] || commonBoARoutingByState.DEFAULT;
}

export function generatePaperElectronicNumber(state: string = "DEFAULT"): string {
  return generateRoutingNumber(state);
}

export function generateWireRoutingNumber(): string {
  return "026009593";
}

export function generateWiresAccountNumber(): string {
  return generateAdvPlusAccountNumber();
}

export function generateCreditCardNumber(): string {
  return "4111" + generateRandomDigits(12);
}

export function generateExpiryDate(): string {
  const now = new Date();
  const year = now.getFullYear() + 3;
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${month}/${String(year).slice(2)}`;
}