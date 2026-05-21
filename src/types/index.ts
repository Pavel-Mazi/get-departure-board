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
  modifiedRoute?: string;
  departureTime: Date;
}

export interface WaitingEntry {
  id: string;
  vehicleNumber: string;
  routeName: string;
  badges: StatusBadgeData[];
  returnTime: Date;
}
