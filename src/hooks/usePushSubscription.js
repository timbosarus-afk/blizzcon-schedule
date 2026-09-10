import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export function usePushSubscription() {
  const [status, setStatus] = useState('checking'); // checking | unsupported | denied | prompt | subscribed | error
  const [error, setError] = useState(null);

  const check = useCallback(async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setStatus('unsupported');
      return;
    }
    const reg = await navigator.serviceWorker.ready.catch(() => null);
    if (!reg) {
      setStatus('prompt');
      return;
    }
    const sub = await reg.pushManager.getSubscription();
    if (sub) setStatus('subscribed');
    else if (Notification.permission === 'denied') setStatus('denied');
    else setStatus('prompt');
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').finally(check);
    } else {
      setStatus('unsupported');
    }
  }, [check]);

  const subscribe = useCallback(async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setStatus(permission === 'denied' ? 'denied' : 'prompt');
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });
      const { error } = await supabase.from('blizzcon_push_subscriptions').insert({ subscription: sub.toJSON() });
      if (error) throw error;
      setStatus('subscribed');
    } catch (e) {
      setError(e.message);
      setStatus('error');
    }
  }, []);

  return { status, error, subscribe };
}
