/**
 * Get the last N digits of a string (default: 4)
 * Useful for showing masked account numbers, card numbers, etc.
 */
export function getLastDigits(value: string, digits: number = 4): string {
  if (!value) return "";
  return value.slice(-digits);
}

/**
 * Format account number with mask (e.g., "****1234")
 */
export function maskAccountNumber(accountNumber: string, visibleDigits: number = 4): string {
  if (!accountNumber) return "";
  const lastDigits = accountNumber.slice(-visibleDigits);
  const maskedLength = accountNumber.length - visibleDigits;
  return `${'•'.repeat(Math.min(maskedLength, 4))}${lastDigits}`;
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `$${amount?.toFixed?.(2) ?? String(amount)}`;
  }
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Truncate a string to max length with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}


/**
 * Convert string to title case
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

/**
 * Mask email: first letter + *** + last letter before @ + @ + domain
 * e.g., john.doe@example.com -> j***e@example.com
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return email || "";
  const [local, domain] = email.split("@");
  if (local.length <= 2) {
    // Minimal local part: show first char then mask
    const first = local[0] ?? "";
    const last = local.length > 1 ? local[local.length - 1] : "";
    return `${first}***${last}@${domain}`;
  }
  const first = local[0];
  const last = local[local.length - 1];
  return `${first}***${last}@${domain}`;
}

/**
 * Generate a confirmation number with mixed uppercase letters and digits.
 * Length is randomized between minLen and maxLen (inclusive).
 */
export function generateConfirmationNumber(minLen: number = 10, maxLen: number = 20): string {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // exclude I/O to avoid confusion
  const digits = "0123456789";
  const alphabet = letters + digits;
  const length = Math.max(minLen, Math.min(maxLen, Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen));
  let out = "";
  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * alphabet.length);
    out += alphabet[idx];
  }
  return out;
}
