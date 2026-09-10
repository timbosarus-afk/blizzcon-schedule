import { useEffect, useState } from 'react';
import { isLive } from '../utils/time';
import './HappeningNowSection.css';

const STAGE_LABELS = {
  main: 'Main Stage',
  legends: 'Legends Stage',
  owcup: 'Overwatch World Cup Arena',
  wow: 'World of Warcraft Stage',
  hearthstone: 'Hearthstone Stage',
  classiccup: 'Classic Cup Stage',
  diablo: 'Diablo Stage',
};

export default function HappeningNowSection({ events }) {
  const [, forceTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => forceTick((n) => n + 1), 30000);
    return () => clearInterval(id);
  }, []);

  const liveNow = events
    .filter((e) => !e.isCustom && isLive(e.start_time, e.end_time))
    .sort((a, b) => new Date(a.end_time) - new Date(b.end_time));

  if (liveNow.length === 0) return null;

  return (
    <div className="happening-now">
      <div className="happening-now-label">
        <span className="live-dot" /> Happening now, venue-wide
      </div>
      <div className="happening-now-list">
        {liveNow.map((event) => (
          <div key={event.id} className={`happening-now-item category-${event.category}`}>
            <span className="happening-now-title">{event.title}</span>
            <span className="happening-now-stage">{STAGE_LABELS[event.stage] || event.stage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
