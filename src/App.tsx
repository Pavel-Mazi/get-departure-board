import { useState, useEffect, useCallback, useRef } from 'react';

import { Header } from './components/Header';
import { QueueTable } from './components/QueueTable';
import { WaitingSection } from './components/WaitingSection';
import { initialDepartureData, initialWaitingData } from './data/mockData';
import type { DepartureEntry } from './types';

const DESIGN_WIDTH = 1920;

function formatClock(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

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
  const [scale, setScale] = useState(1);
  const boardRef = useRef<HTMLDivElement>(null);

  // Zoom the 1920px board to fit the actual viewport width
  useEffect(() => {
    const updateScale = () => setScale(window.innerWidth / DESIGN_WIDTH);
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const reload = useCallback(() => {
    setDepartures(rebuildDepartures(initialDepartureData));
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      const current = new Date();
      setNow(current);
      setDepartures(prev => {
        const remaining = prev.filter(e => e.departureTime.getTime() > current.getTime());
        if (remaining.length === 0) return rebuildDepartures(initialDepartureData);
        return remaining;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [reload]);

  const sortedDepartures = [...departures].sort(
    (a, b) => a.departureTime.getTime() - b.departureTime.getTime()
  );

  return (
    // zoom scales both visually and in layout — no height clipping
    <div ref={boardRef} style={{ zoom: scale, width: DESIGN_WIDTH }} className="bg-white flex flex-col">
      <Header time={formatClock(now)} />
      <div className="p-8">
        <QueueTable entries={sortedDepartures} now={now} />
      </div>
      <div className="px-8 pb-8">
        <WaitingSection entries={initialWaitingData} now={now} />
      </div>
    </div>
  );
}
