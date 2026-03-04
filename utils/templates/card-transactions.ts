const cardDescriptions = [
  "Amazon Purchase",
  "Netflix Subscription",
  "Uber Ride",
  "Apple Store",
  "Restaurant Payment",
  "Online Shopping",
  "Gas Station",
  "Supermarket Purchase",
  "Gym Membership",
  "Airline Ticket",
];

export function generateCardDescription(): string {
  const index = Math.floor(Math.random() * cardDescriptions.length);
  return cardDescriptions[index];
}