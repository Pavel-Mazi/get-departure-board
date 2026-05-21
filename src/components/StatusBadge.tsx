import type { BadgeVariant } from '../types';

const VARIANT_BG: Record<BadgeVariant, string> = {
  green:  'bg-[#268c40]',
  yellow: 'bg-[#b46c05]',
  gray:   'bg-[#808080]',
  blue:   'bg-[#3257a1]',
};

interface StatusBadgeProps {
  label: string;
  variant: BadgeVariant;
}

export function StatusBadge({ label, variant }: StatusBadgeProps) {
  return (
    <span
      className={`${VARIANT_BG[variant]} px-2.5 py-1 rounded-md text-white text-xl font-medium whitespace-nowrap`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {label}
    </span>
  );
}
