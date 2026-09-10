import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useFavorites() {
  // Map of event_id -> { note }
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data, error } = await supabase.from('blizzcon_favorites').select('*');
    if (!error && data) {
      const map = {};
      for (const row of data) map[row.event_id] = { note: row.note || '' };
      setFavorites(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggleFavorite = useCallback(
    async (eventId) => {
      const isFav = Boolean(favorites[eventId]);
      // optimistic update
      setFavorites((prev) => {
        const next = { ...prev };
        if (isFav) delete next[eventId];
        else next[eventId] = { note: '' };
        return next;
      });
      if (isFav) {
        await supabase.from('blizzcon_favorites').delete().eq('event_id', eventId);
      } else {
        await supabase.from('blizzcon_favorites').insert({ event_id: eventId });
      }
    },
    [favorites]
  );

  const setNote = useCallback(async (eventId, note) => {
    setFavorites((prev) => ({ ...prev, [eventId]: { note } }));
    await supabase.from('blizzcon_favorites').upsert({ event_id: eventId, note });
  }, []);

  return { favorites, loading, toggleFavorite, setNote, favoriteIds: new Set(Object.keys(favorites)) };
}
