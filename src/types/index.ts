export type BadgeVariant = 'green' | 'yellow' | 'gray' | 'blue';
export type StripeColor = 'red' | 'orange' | 'blue' | 'gray';

export interface StatusBadgeData {
  label: string;
  variant: BadgeVariant;
}

export interface DepartureEntry {
  id: string;
  vehicleNumber: string;
  routeName: string;
  badges: StatusBadgeData[];
  modifiedRoute?: string;      // full text: «Ст. метро — ПТО «Шаврова»»
  modifiedRouteCode?: string;  // short code for theory B: «С», «Б» etc.
  departureTime: Date;
}

// Which UI theory variants are active
export interface TheoryFlags {
  badgesInRouteColumn: boolean;  // Theory A: move badges → "Измененная трасса" column
  shortRouteCode: boolean;       // Theory B: show single-letter code instead of full route text
}

export interface WaitingEntry {
  id: string;
  vehicleNumber: string;
  routeName: string;
  badges: StatusBadgeData[];
  returnTime: Date;
}
