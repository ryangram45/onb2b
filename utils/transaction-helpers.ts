import { achCodes } from "@/lib/transaction-rules";

export function buildDescription(merchantName: string, type: keyof typeof achCodes): string {
  const code = achCodes[type].toUpperCase();
  return `${merchantName.toUpperCase()} - ${code}`;
}

export function randomAmount(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
