import type { WaitingEntry } from '../types';
import { WaitingRow } from './WaitingRow';

interface WaitingSectionProps {
  entries: WaitingEntry[];
  now: Date;
}

export function WaitingSection({ entries, now }: WaitingSectionProps) {
  return (
    <div className="w-full flex flex-col">
      {/* Column headers */}
      <div className="w-full bg-[#fafafa] border border-[#c9c9c9] rounded-tl-[12px] rounded-tr-[12px] flex items-center overflow-hidden shrink-0">
        <div className="w-[1384px] px-6 py-4 border-r border-[#c9c9c9] flex items-center shrink-0">
          <span
            className="text-[rgba(18,18,18,0.6)] text-2xl font-normal"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            На ожидании
          </span>
        </div>
        <div className="flex-1 px-[44px] py-4 border-r border-[#c9c9c9] flex items-center">
          <span
            className="text-[rgba(18,18,18,0.6)] text-2xl font-normal"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            До возврата
          </span>
        </div>
      </div>

      {/* Waiting rows */}
      {entries.map((entry, index) => (
        <WaitingRow
          key={entry.id}
          entry={entry}
          now={now}
          isLast={index === entries.length - 1}
        />
      ))}
    </div>
  );
}
