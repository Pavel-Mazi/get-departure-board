import type { DepartureEntry, StripeColor } from '../types';
import { getUrgencyColor } from '../utils/urgencyColor';
import { StatusBadge } from './StatusBadge';
import { TimeBadge } from './TimeBadge';

const STRIPE_BG: Record<StripeColor, string> = {
  red:    'bg-[#ff3b30]',
  orange: 'bg-[#ff9500]',
  blue:   'bg-[#007aff]',
  gray:   'bg-[#808080]',
};

function formatTime(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function minutesUntil(target: Date, now: Date): number {
  return Math.ceil((target.getTime() - now.getTime()) / 60_000);
}

interface QueueRowProps {
  entry: DepartureEntry;
  now: Date;
  isLast: boolean;
}

export function QueueRow({ entry, now, isLast }: QueueRowProps) {
  const minutes = minutesUntil(entry.departureTime, now);
  const color = getUrgencyColor(minutes);

  return (
    <div
      className={`w-full h-[120px] bg-[#24315b] border border-[#4d5b89] flex items-center justify-between overflow-hidden shrink-0 transition-all duration-300 ${
        isLast ? 'rounded-bl-[12px] rounded-br-[12px]' : ''
      }`}
    >
      <div className="flex flex-1 items-center min-w-0 h-full">
        {/* Urgency stripe — color computed from countdown */}
        <div className={`${STRIPE_BG[color]} w-[40px] h-full shrink-0 border border-[#4d5b89]`} />

        {/* Vehicle number */}
        <div className="w-[200px] h-full px-[44px] flex items-center justify-center shrink-0">
          <span className="text-white text-[50px] font-semibold leading-[60px]"
            style={{ fontFamily: 'Inter, sans-serif' }}>
            {entry.vehicleNumber}
          </span>
        </div>

        {/* Route name + status badges */}
        <div className="w-[380px] h-full pr-[44px] pb-1.5 border-r border-[#4d5b89] flex flex-col justify-center items-start gap-2.5 shrink-0">
          <span className="text-white text-[32px] font-semibold leading-normal whitespace-nowrap"
            style={{ fontFamily: 'Inter, sans-serif' }}>
            {entry.routeName}
          </span>
          <div className="flex gap-2 items-start overflow-hidden">
            {entry.badges.map((badge, i) => (
              <StatusBadge key={i} label={badge.label} variant={badge.variant} />
            ))}
          </div>
        </div>

        {/* Modified route — empty cell preserves column alignment */}
        <div className="w-[764px] h-full px-[44px] border-r border-[#4d5b89] flex flex-col justify-center items-start shrink-0">
          {entry.modifiedRoute && (
            <span className="text-white text-[30px] font-medium leading-[38px]"
              style={{ fontFamily: 'Inter, sans-serif' }}>
              {entry.modifiedRoute}
            </span>
          )}
        </div>
      </div>

      {/* Countdown badge + departure time */}
      <div className="w-[472px] h-full pl-[44px] flex items-center shrink-0">
        <TimeBadge minutes={Math.max(0, minutes)} stripeColor={color} />
        <div className="w-[200px] h-full pl-5 flex items-center justify-end shrink-0">
          <span className="text-white text-[32px] font-semibold leading-[40px] whitespace-nowrap"
            style={{ fontFamily: 'Inter, sans-serif' }}>
            отпр. {formatTime(entry.departureTime)}
          </span>
        </div>
      </div>
    </div>
  );
}
