import { useMemo, useState } from 'react';
import { useEvents } from './hooks/useEvents';
import { useFavorites } from './hooks/useFavorites';
import { usePushSubscription } from './hooks/usePushSubscription';
import { STAGES } from './data/schedule';
import { findClashes } from './utils/time';
import TopBar from './components/TopBar';
import StageFilter from './components/StageFilter';
import NextUpBanner from './components/NextUpBanner';
import NotifySetup from './components/NotifySetup';
import EventCard from './components/EventCard';
import ShareBar from './components/ShareBar';
import ShareView from './components/ShareView';
import MapView from './components/MapView';

const DAYS = [
  { value: '2026-09-12', label: 'Sat 9/12' },
  { value: '2026-09-13', label: 'Sun 9/13' },
];

export default function App() {
  const shareToken = new URLSearchParams(window.location.search).get('share');
  if (shareToken) return <ShareView token={shareToken} />;
  return <ScheduleApp />;
}

function ScheduleApp() {
  const { events, loading } = useEvents();
  const { favorites, favoriteIds, toggleFavorite, setNote } = useFavorites();
  const push = usePushSubscription();

  const [day, setDay] = useState(DAYS[0].value);
  const [view, setView] = useState('schedule');
  const [activeStage, setActiveStage] = useState(null);

  const clashes = useMemo(() => findClashes(events, favoriteIds), [events, favoriteIds]);

  const visibleEvents = useMemo(() => {
    if (view === 'mine') {
      return events.filter((e) => favoriteIds.has(e.id)).sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
    }
    return events
      .filter((e) => e.day === day)
      .filter((e) => !activeStage || e.stage === activeStage)
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  }, [events, view, day, activeStage, favoriteIds]);

  const jumpToStage = (stageId) => {
    setActiveStage(stageId);
    setView('schedule');
  };

  return (
    <div>
      <TopBar day={day} setDay={setDay} view={view} setView={setView} days={DAYS} />

      {view === 'schedule' && <StageFilter stages={STAGES} activeStage={activeStage} setActiveStage={setActiveStage} />}

      {view !== 'map' && <NextUpBanner events={events} favoriteIds={favoriteIds} />}
      {view !== 'map' && <NotifySetup status={push.status} subscribe={push.subscribe} />}

      {view === 'mine' && <ShareBar favoriteIds={favoriteIds} />}

      {view === 'map' ? (
        <MapView onSelectStage={jumpToStage} />
      ) : (
        <div style={{ padding: '12px 16px 60px' }}>
          {loading && <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>Loading schedule…</div>}

          {!loading && view === 'mine' && visibleEvents.length === 0 && (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>
              Nothing favorited yet - tap the star on anything in the Full Schedule.
            </div>
          )}

          {visibleEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isFavorite={favoriteIds.has(event.id)}
              isClash={clashes.has(event.id)}
              note={favorites[event.id]?.note}
              onToggleFavorite={() => toggleFavorite(event.id)}
              onSaveNote={(note) => setNote(event.id, note)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
