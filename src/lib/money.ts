import { CostLineView } from '../context/TripContext';

// Approximate rate; the quetzal has hovered around 7.7 per dollar for years.
export const GTQ_PER_USD = 7.7;
export const CONTINGENCY = 0.1;

export const costSummary = (lines: CostLineView[], travelers: number) => {
  const subtotal = lines.reduce((sum, l) => sum + l.quantity * l.unitUsdEffective, 0);
  const contingency = Math.round(subtotal * CONTINGENCY);
  const total = subtotal + contingency;
  return { subtotal, contingency, total, perPerson: Math.round(total / travelers) };
};

export const usd = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
export const gtq = (n: number) => `Q${Math.round(n * GTQ_PER_USD).toLocaleString('en-US')}`;
