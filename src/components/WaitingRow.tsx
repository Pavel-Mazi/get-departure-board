import type { WaitingEntry } from '../types';
import { StatusBadge } from './StatusBadge';
import { TimeBadge } from './TimeBadge';

function formatTime(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function minutesUntil(target: Date, now: Date): number {
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 60_000));
}

interface WaitingRowProps {
  entry: WaitingEntry;
  now: Date;
  isLast: boolean;
}

export function WaitingRow({ entry, now, isLast }: WaitingRowProps) {
  const minutes = minutesUntil(entry.returnTime, now);

  return (
    <div
      className={`w-full h-[120px] bg-white border border-[#c9c9c9] flex items-center justify-between overflow-hidden shrink-0 ${
        isLast ? 'rounded-bl-[12px] rounded-br-[12px]' : ''
      }`}
    >
      {/* Left section: stripe + vehicle + route info */}
      <div className="flex flex-1 items-center min-w-0 h-full">
        {/* Gray stripe */}
        <div className="bg-[#808080] w-[40px] h-full shrink-0 border border-[#c9c9c9]" />

        {/* Vehicle number */}
        <div className="w-[200px] h-full px-[44px] flex items-center justify-center shrink-0">
          <span
            className="text-[#121212] text-[50px] font-semibold leading-[60px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {entry.vehicleNumber}
          </span>
        </div>

        {/* Route name + status badges */}
        <div className="w-[380px] h-full pr-[44px] pb-1.5 flex flex-col justify-center items-start gap-2.5 shrink-0">
          <span
            className="text-[#121212] text-[32px] font-semibold leading-normal whitespace-nowrap"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {entry.routeName}
          </span>
          <div className="flex gap-2 items-start overflow-hidden">
            {entry.badges.map((badge, i) => (
              <StatusBadge key={i} label={badge.label} variant={badge.variant} />
            ))}
          </div>
        </div>
      </div>

      {/* Right section: countdown badge + return time */}
      <div className="w-[472px] h-full pl-[44px] border-l border-[#c9c9c9] flex items-center shrink-0">
        <TimeBadge minutes={minutes} stripeColor="gray" />
        <div className="w-[200px] h-full pl-5 flex items-center justify-end shrink-0">
          <span
            className="text-[#121212] text-[32px] font-semibold leading-[40px] whitespace-nowrap"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            отпр. {formatTime(entry.returnTime)}
          </span>
        </div>
      </div>
    </div>
  );
}
