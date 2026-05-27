import { Fragment } from 'react';
import type { DepartureEntry, StripeColor, TheoryFlags } from '../types';
import { getUrgencyColor } from '../utils/urgencyColor';
import { StatusBadge } from './StatusBadge';
import { TimeBadge } from './TimeBadge';

const STRIPE_BG: Record<StripeColor, string> = {
  red:    'bg-[#ff3b30]',
  orange: 'bg-[#ff9500]',
  blue:   'bg-[#007aff]',
  gray:   'bg-[#808080]',
};

const ROW_BG = 'bg-[#24315b]';

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
  theories: TheoryFlags;
}

export function QueueRow({ entry, now, isLast, theories }: QueueRowProps) {
  const minutes = minutesUntil(entry.departureTime, now);
  const color   = getUrgencyColor(minutes);
  const { badgesInRouteColumn: theoryA, shortRouteCode: theoryB } = theories;

  // Border helpers: last row has no bottom border (container provides it)
  const br  = isLast ? 'border-r border-[#4d5b89]'                : 'border-b border-r border-[#4d5b89]';
  const bNor = isLast ? ''                                          : 'border-b border-[#4d5b89]';

  const routeText = theoryB
    ? (entry.modifiedRouteCode ?? entry.modifiedRoute)
    : entry.modifiedRoute;
  const isShortCode = theoryB && !!entry.modifiedRouteCode;

  return (
    <Fragment>
      {/* Col 1 — Urgency stripe */}
      <div className={`${STRIPE_BG[color]} h-[120px] ${br}`} />

      {/* Col 2 — Vehicle number */}
      <div className={`${ROW_BG} h-[120px] ${br} flex items-center justify-center px-[44px]`}>
        <span className="text-white text-[50px] font-semibold leading-[60px]"
          style={{ fontFamily: 'Inter, sans-serif' }}>
          {entry.vehicleNumber}
        </span>
      </div>

      {/* Col 3 — Route name + badges (badges hidden in Theory A) */}
      <div className={`${ROW_BG} h-[120px] ${br} flex flex-col justify-center pl-[28px] pr-[44px] pb-1.5`}>
        <span className="text-white text-[32px] font-semibold leading-normal whitespace-nowrap"
          style={{ fontFamily: 'Inter, sans-serif' }}>
          {entry.routeName}
        </span>
        {!theoryA && (
          <div className="flex gap-2 items-start mt-2.5">
            {entry.badges.map((badge, i) => (
              <StatusBadge key={i} label={badge.label} variant={badge.variant} />
            ))}
          </div>
        )}
      </div>

      {/* Col 4 — Status badges (Theory A only) */}
      {theoryA && (
        <div className={`${ROW_BG} h-[120px] ${br} flex flex-col justify-center px-[44px]`}>
          <div className="flex gap-2 flex-wrap">
            {entry.badges.map((badge, i) => (
              <StatusBadge key={i} label={badge.label} variant={badge.variant} />
            ))}
          </div>
        </div>
      )}

      {/* Col 4/5 — Modified route text or letter code */}
      <div className={`${ROW_BG} h-[120px] ${br} flex items-center px-[44px]`}>
        {routeText && (
          isShortCode ? (
            <span className="text-white font-bold leading-none"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '64px' }}>
              {routeText}
            </span>
          ) : (
            <span className="text-white text-[30px] font-medium leading-[38px]"
              style={{ fontFamily: 'Inter, sans-serif' }}>
              {routeText}
            </span>
          )
        )}
      </div>

      {/* Last col — Countdown + departure time */}
      <div className={`${ROW_BG} h-[120px] ${bNor} flex items-center pl-[44px]`}>
        <TimeBadge minutes={Math.max(0, minutes)} stripeColor={color} />
        <div className="flex-1 h-full pl-5 flex items-center justify-end pr-[44px]">
          <span className="text-white text-[32px] font-semibold leading-[40px] whitespace-nowrap"
            style={{ fontFamily: 'Inter, sans-serif' }}>
            отпр. {formatTime(entry.departureTime)}
          </span>
        </div>
      </div>
    </Fragment>
  );
}
