export function formatTimeRange(startISO, endISO) {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const opts = { hour: 'numeric', minute: '2-digit', timeZone: 'America/Los_Angeles' };
  const s = start.toLocaleTimeString('en-US', opts).replace(' ', '');
  const e = end.toLocaleTimeString('en-US', opts).replace(' ', '');
  return `${s} - ${e}`;
}

export function formatDayLabel(dateStr) {
  const d = new Date(`${dateStr}T12:00:00-07:00`);
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'America/Los_Angeles' });
}

// Given the full event list and the set of favorited event ids, returns a
// Set of event ids that overlap in time with at least one other favorite.
export function findClashes(events, favoriteIds) {
  const favs = events.filter((e) => favoriteIds.has(e.id));
  const clashes = new Set();
  for (let i = 0; i < favs.length; i++) {
    for (let j = i + 1; j < favs.length; j++) {
      const a = favs[i];
      const b = favs[j];
      const aStart = new Date(a.start_time ?? a.start).getTime();
      const aEnd = new Date(a.end_time ?? a.end).getTime();
      const bStart = new Date(b.start_time ?? b.start).getTime();
      const bEnd = new Date(b.end_time ?? b.end).getTime();
      if (aStart < bEnd && bStart < aEnd) {
        clashes.add(a.id);
        clashes.add(b.id);
      }
    }
  }
  return clashes;
}

export function isPast(endISO) {
  return new Date(endISO).getTime() < Date.now();
}

export function isLive(startISO, endISO) {
  const now = Date.now();
  return new Date(startISO).getTime() <= now && now < new Date(endISO).getTime();
}

export function minutesUntil(startISO) {
  return Math.round((new Date(startISO).getTime() - Date.now()) / 60000);
}
