import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { QueueTable } from './components/QueueTable';
import { WaitingSection } from './components/WaitingSection';
import { initialDepartureData, initialWaitingData } from './data/mockData';
import type { DepartureEntry } from './types';

function formatClock(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// Rebuild departure times relative to a new base (for cycling demo)
function rebuildDepartures(template: DepartureEntry[]): DepartureEntry[] {
  const base = new Date();
  base.setSeconds(0, 0);
  return template.map((entry, i) => ({
    ...entry,
    id: `${entry.id}-${Date.now()}`,
    departureTime: new Date(base.getTime() + (i + 1) * 60_000),
  }));
}

export default function App() {
  const [now, setNow] = useState(() => new Date());
  const [departures, setDepartures] = useState<DepartureEntry[]>(initialDepartureData);

  const reload = useCallback(() => {
    setDepartures(rebuildDepartures(initialDepartureData));
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      const current = new Date();
      setNow(current);
      setDepartures(prev => {
        const remaining = prev.filter(e => e.departureTime.getTime() > current.getTime());
        // Auto-reload when queue is empty so the demo keeps running
        if (remaining.length === 0) return rebuildDepartures(initialDepartureData);
        return remaining;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [reload]);

  // Always display sorted by nearest departure first
  const sortedDepartures = [...departures].sort(
    (a, b) => a.departureTime.getTime() - b.departureTime.getTime()
  );

  return (
    <div className="w-[1920px] min-h-screen bg-white flex flex-col">
      <Header time={formatClock(now)} />

      {/* Departure queue */}
      <div className="p-8">
        <QueueTable entries={sortedDepartures} now={now} />
      </div>

      {/* Waiting section */}
      <div className="px-8 pb-8">
        <WaitingSection entries={initialWaitingData} now={now} />
      </div>
    </div>
  );
}
