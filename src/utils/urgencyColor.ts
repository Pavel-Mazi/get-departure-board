import type { StripeColor } from '../types';

// Color is derived purely from minutes remaining:
// < 5 min (or overdue) → red
// < 10 min             → orange
// < 15 min             → blue
// ≥ 15 min             → gray
export function getUrgencyColor(minutes: number): StripeColor {
  if (minutes < 5)  return 'red';
  if (minutes < 10) return 'orange';
  if (minutes < 15) return 'blue';
  return 'gray';
}
