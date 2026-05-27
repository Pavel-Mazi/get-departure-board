import type { DepartureEntry, TheoryFlags } from '../types';
import { QueueRow } from './QueueRow';

interface QueueTableProps {
  entries: DepartureEntry[];
  now: Date;
  theories: TheoryFlags;
}

export function QueueTable({ entries, now, theories }: QueueTableProps) {
  const { badgesInRouteColumn: theoryA } = theories;

  // CSS Grid column template:
  // stripe(40px) | vehicle(200px) | route-info(auto ← fits widest content)
  // | [status(auto)] | modified-route(1fr) | time(472px)
  const gridCols = theoryA
    ? '40px 200px auto auto minmax(0, 1fr) 472px'
    : '40px 200px auto minmax(0, 1fr) 472px';

  const HEADER_BG = 'bg-[#38456f]';
  const BORDER    = 'border-b border-r border-[#4d5b89]';
  const BORDER_NOR = 'border-b border-[#4d5b89]';

  return (
    <div
      className="w-full border border-[#4d5b89] rounded-[12px] overflow-hidden"
      style={{ display: 'grid', gridTemplateColumns: gridCols }}
    >
      {/* ── Header ── */}
      {/* "Следующие к отправлению" always spans stripe + vehicle + route-info */}
      <div
        className={`${HEADER_BG} px-6 py-4 ${BORDER}`}
        style={{ gridColumn: '1 / 4' }}
      >
        <span className="text-white/60 text-2xl font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
          Следующие к отправлению
        </span>
      </div>

      {theoryA && (
        <div className={`${HEADER_BG} px-[44px] py-4 ${BORDER}`}>
          <span className="text-white/60 text-2xl font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
            Статус
          </span>
        </div>
      )}

      <div className={`${HEADER_BG} px-[44px] py-4 ${BORDER}`}>
        <span className="text-white/60 text-2xl font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
          {theoryA ? 'Трасса' : 'Измененная трасса'}
        </span>
      </div>

      <div className={`${HEADER_BG} px-[44px] py-4 ${BORDER_NOR}`}>
        <span className="text-white/60 text-2xl font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
          Время отправления
        </span>
      </div>

      {/* ── Data rows (each QueueRow returns a Fragment of grid cells) ── */}
      {entries.map((entry, index) => (
        <QueueRow
          key={entry.id}
          entry={entry}
          now={now}
          isLast={index === entries.length - 1}
          theories={theories}
        />
      ))}

      {entries.length === 0 && (
        <div
          className="bg-[#24315b] h-[120px] flex items-center justify-center"
          style={{ gridColumn: '1 / -1' }}
        >
          <span className="text-white/40 text-2xl" style={{ fontFamily: 'Inter, sans-serif' }}>
            Нет рейсов к отправлению
          </span>
        </div>
      )}
    </div>
  );
}
