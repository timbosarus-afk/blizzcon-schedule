import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { formatDayLabel, formatTimeRange } from '../utils/time';
import './ShareView.css';

export default function ShareView({ token }) {
  const [state, setState] = useState('loading'); // loading | invalid | ok
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: share } = await supabase.from('blizzcon_shares').select('token').eq('token', token).maybeSingle();
      if (!share) {
        setState('invalid');
        return;
      }
      const { data: favs } = await supabase.from('blizzcon_favorites').select('event_id');
      const ids = (favs || []).map((f) => f.event_id);
      if (ids.length === 0) {
        setEvents([]);
        setState('ok');
        return;
      }
      const { data: evts } = await supabase
        .from('blizzcon_events')
        .select('*')
        .in('id', ids)
        .order('start_time', { ascending: true });
      setEvents(evts || []);
      setState('ok');
    })();
  }, [token]);

  if (state === 'loading') return <div className="share-view-msg">Loading schedule…</div>;
  if (state === 'invalid') return <div className="share-view-msg">This share link isn't valid.</div>;

  let currentDay = null;

  return (
    <div className="share-view">
      <div className="share-view-header">
        <span className="share-view-title">Tim's BlizzCon Schedule</span>
        <span className="share-view-sub">Shared read-only</span>
      </div>
      {events.length === 0 && <div className="share-view-msg">No favorites yet.</div>}
      {events.map((e) => {
        const showDay = e.day !== currentDay;
        currentDay = e.day;
        return (
          <div key={e.id}>
            {showDay && <div className="share-view-day">{formatDayLabel(e.day)}</div>}
            <div className={`share-view-event category-${e.category}`}>
              <div className="share-view-event-bar" />
              <div>
                <div className="share-view-event-time">{formatTimeRange(e.start_time, e.end_time)}</div>
                <div className="share-view-event-title">{e.title}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
