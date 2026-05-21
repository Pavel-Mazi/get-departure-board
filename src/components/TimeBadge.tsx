import type { StripeColor } from '../types';

const COLOR_BG: Record<StripeColor, string> = {
  red:    'bg-[#ff3b30]',
  orange: 'bg-[#e58600]',
  blue:   'bg-[#3257a1]',
  gray:   'bg-[#808080]',
};

interface TimeBadgeProps {
  minutes: number;
  stripeColor: StripeColor;
}

export function TimeBadge({ minutes, stripeColor }: TimeBadgeProps) {
  return (
    <div
      className={`${COLOR_BG[stripeColor]} h-[74px] w-[200px] px-7 py-3 rounded-xl flex items-center justify-center shrink-0`}
    >
      <span
        className="text-white text-[42px] font-semibold leading-[50px] whitespace-nowrap"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {minutes} мин
      </span>
    </div>
  );
}
