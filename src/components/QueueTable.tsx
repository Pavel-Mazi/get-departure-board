import type { DepartureEntry } from '../types';
import { QueueRow } from './QueueRow';

interface QueueTableProps {
  entries: DepartureEntry[];
  now: Date;
}

export function QueueTable({ entries, now }: QueueTableProps) {
  return (
    <div className="w-full flex flex-col">
      {/* Column headers */}
      <div className="w-full bg-[#38456f] border border-[#4d5b89] rounded-tl-[12px] rounded-tr-[12px] flex items-center overflow-hidden shrink-0">
        <div className="w-[620px] px-6 py-4 border-r border-[#4d5b89] flex items-center shrink-0">
          <span
            className="text-white/60 text-2xl font-normal"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Следующие к отправлению
          </span>
        </div>
        <div className="w-[764px] px-[44px] py-4 border-r border-[#4d5b89] flex items-center shrink-0">
          <span
            className="text-white/60 text-2xl font-normal"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Измененная трасса
          </span>
        </div>
        <div className="flex-1 px-[44px] py-4 border-r border-[#4d5b89] flex items-center">
          <span
            className="text-white/60 text-2xl font-normal"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Время отправления
          </span>
        </div>
      </div>

      {/* Departure rows */}
      {entries.map((entry, index) => (
        <QueueRow
          key={entry.id}
          entry={entry}
          now={now}
          isLast={index === entries.length - 1}
        />
      ))}

      {entries.length === 0 && (
        <div className="w-full h-[120px] bg-[#24315b] border border-[#4d5b89] rounded-bl-[12px] rounded-br-[12px] flex items-center justify-center">
          <span className="text-white/40 text-2xl" style={{ fontFamily: 'Inter, sans-serif' }}>
            Нет рейсов к отправлению
          </span>
        </div>
      )}
    </div>
  );
}
