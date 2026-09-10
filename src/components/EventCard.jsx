import { useState } from 'react';
import { formatTimeRange, isPast, isLive } from '../utils/time';
import './EventCard.css';

const STAGE_LABELS = {
  main: 'Main Stage',
  legends: 'Legends Stage',
  owcup: 'Overwatch World Cup Arena',
  wow: 'World of Warcraft Stage',
  hearthstone: 'Hearthstone Stage',
  classiccup: 'Classic Cup Stage',
  diablo: 'Diablo Stage',
};

export default function EventCard({ event, isFavorite, isClash, note, onToggleFavorite, onSaveNote, onDelete }) {
  const [editingNote, setEditingNote] = useState(false);
  const [draft, setDraft] = useState(note || '');
  const past = isPast(event.end_time);
  const live = !past && isLive(event.start_time, event.end_time);
  const stageLabel = event.isCustom ? event.location || 'Personal event' : STAGE_LABELS[event.stage] || event.stage;

  return (
    <div
      className={`event-card category-${event.category} ${isFavorite ? 'is-favorite' : ''} ${past ? 'is-past' : ''} ${live ? 'is-live' : ''}`}
    >
      <div className="event-card-bar" />
      <div className="event-card-body">
        <div className="event-card-top">
          <span className="event-time">{formatTimeRange(event.start_time, event.end_time)}</span>
          <span className="event-stage">{stageLabel}</span>
        </div>
        <h3 className="event-title">{event.title}</h3>
        <div className="event-card-meta">
          {live && (
            <span className="event-tag event-tag-live">
              <span className="live-dot" /> Happening now
            </span>
          )}
          {event.isCustom && <span className="event-tag event-tag-custom">Your event</span>}
          {event.in_room_only && <span className="event-tag">In-room experience only</span>}
          {isClash && <span className="event-tag event-tag-clash">Clashes with another favorite</span>}
        </div>

        {isFavorite && (
          <div className="event-note">
            {editingNote ? (
              <div className="event-note-edit">
                <input
                  autoFocus
                  value={draft}
                  placeholder="e.g. meeting Sam by the entrance"
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onSaveNote(draft);
                      setEditingNote(false);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    onSaveNote(draft);
                    setEditingNote(false);
                  }}
                >
                  Save
                </button>
              </div>
            ) : note ? (
              <button className="event-note-display" onClick={() => setEditingNote(true)}>
                📝 {note}
              </button>
            ) : (
              <button className="event-note-add" onClick={() => setEditingNote(true)}>
                + Add note
              </button>
            )}
          </div>
        )}

        {event.isCustom && onDelete && (
          <button className="event-delete" onClick={() => onDelete(event.id)}>
            Remove
          </button>
        )}
      </div>
      <button
        className="event-fav-btn"
        aria-label={isFavorite ? 'Remove from my schedule' : 'Add to my schedule'}
        onClick={onToggleFavorite}
      >
        {isFavorite ? '★' : '☆'}
      </button>
    </div>
  );
}
