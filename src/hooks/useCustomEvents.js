import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// Shapes a raw custom_events row to look like an official schedule event,
// so it can be merged straight into the same events array everywhere else
// in the app (schedule list, clash detection, favorites, notifications).
function toScheduleShape(row) {
  return {
    id: row.id,
    day: row.day,
    stage: 'custom',
    category: 'custom',
    title: row.title,
    start_time: row.start_time,
    end_time: row.end_time,
    in_room_only: false,
    location: row.location || null,
    isCustom: true,
  };
}

export function useCustomEvents() {
  const [customEvents, setCustomEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data, error } = await supabase.from('blizzcon_custom_events').select('*').order('start_time', { ascending: true });
    if (!error && data) setCustomEvents(data.map(toScheduleShape));
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addCustomEvent = useCallback(
    async ({ title, day, start_time, end_time, location }) => {
      const { data, error } = await supabase
        .from('blizzcon_custom_events')
        .insert({ title, day, start_time, end_time, location: location || null })
        .select()
        .single();
      if (error) throw error;
      const shaped = toScheduleShape(data);
      setCustomEvents((prev) => [...prev, shaped].sort((a, b) => new Date(a.start_time) - new Date(b.start_time)));
      return shaped;
    },
    []
  );

  const deleteCustomEvent = useCallback(async (id) => {
    setCustomEvents((prev) => prev.filter((e) => e.id !== id));
    await supabase.from('blizzcon_custom_events').delete().eq('id', id);
    await supabase.from('blizzcon_favorites').delete().eq('event_id', id);
    await supabase.from('blizzcon_notified_events').delete().eq('event_id', id);
  }, []);

  return { customEvents, loading, addCustomEvent, deleteCustomEvent };
}
