import { useState } from 'react';
import { supabase } from '../lib/supabase';
import './ShareBar.css';

export default function ShareBar({ favoriteIds }) {
  const [link, setLink] = useState(null);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  const generate = async () => {
    setBusy(true);
    const { data, error } = await supabase.from('blizzcon_shares').insert({}).select('token').single();
    setBusy(false);
    if (error || !data) return;
    const url = `${window.location.origin}${window.location.pathname}?share=${data.token}`;
    setLink(url);
  };

  const copy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (favoriteIds.size === 0) return null;

  return (
    <div className="share-bar">
      {!link ? (
        <button onClick={generate} disabled={busy}>
          {busy ? 'Creating link…' : 'Share my schedule'}
        </button>
      ) : (
        <div className="share-link-row">
          <input readOnly value={link} onFocus={(e) => e.target.select()} />
          <button onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
        </div>
      )}
    </div>
  );
}
