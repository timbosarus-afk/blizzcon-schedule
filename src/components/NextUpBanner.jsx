import { useEffect, useState } from 'react';
import { minutesUntil, formatTimeRange } from '../utils/time';
import './NextUpBanner.css';

export default function NextUpBanner({ events, favoriteIds }) {
  const [, forceTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => forceTick((n) => n + 1), 30000);
    return () => clearInterval(id);
  }, []);

  const upcoming = events
    .filter((e) => favoriteIds.has(e.id) && minutesUntil(e.start_time) >= -5)
    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))[0];

  if (!upcoming) return null;

  const mins = minutesUntil(upcoming.start_time);
  let label;
  if (mins <= 0) label = 'Starting now';
  else if (mins < 60) label = `In ${mins} min`;
  else label = formatTimeRange(upcoming.start_time, upcoming.end_time);

  return (
    <div className={`next-up category-${upcoming.category}`}>
      <span className="next-up-label">Next up · {label}</span>
      <span className="next-up-title">{upcoming.title}</span>
    </div>
  );
}
