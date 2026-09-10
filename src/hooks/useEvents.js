import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const CACHE_KEY = 'blizzcon_events_cache_v1';

export function useEvents() {
  const [events, setEvents] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(events.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from('blizzcon_events')
      .select('*')
      .order('start_time', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setError(error.message);
        } else if (data) {
          setEvents(data);
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(data));
          } catch {
            // storage full or unavailable, non-fatal
          }
        }
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { events, loading, error };
}
