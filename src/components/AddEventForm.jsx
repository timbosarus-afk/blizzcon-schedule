import { useState } from 'react';
import './AddEventForm.css';

const DAY_OPTIONS = [
  { value: '2026-09-12', label: 'Sat 9/12' },
  { value: '2026-09-13', label: 'Sun 9/13' },
];

export default function AddEventForm({ onAdd, onClose }) {
  const [title, setTitle] = useState('');
  const [day, setDay] = useState(DAY_OPTIONS[0].value);
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('13:00');
  const [location, setLocation] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Give it a title first.');
      return;
    }
    if (endTime <= startTime) {
      setError('End time needs to be after the start time.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onAdd({
        title: title.trim(),
        day,
        start_time: `${day}T${startTime}:00-07:00`,
        end_time: `${day}T${endTime}:00-07:00`,
        location: location.trim(),
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong saving that.');
      setSaving(false);
    }
  };

  return (
    <div className="add-event-overlay" onClick={onClose}>
      <form className="add-event-form" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <div className="add-event-header">
          <span>Add to my schedule</span>
          <button type="button" className="add-event-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <label className="add-event-label">
          Title
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Hearthstone Tavern Meet & Greet"
          />
        </label>

        <label className="add-event-label">
          Day
          <div className="add-event-day-toggle">
            {DAY_OPTIONS.map((d) => (
              <button
                type="button"
                key={d.value}
                className={day === d.value ? 'active' : ''}
                onClick={() => setDay(d.value)}
              >
                {d.label}
              </button>
            ))}
          </div>
        </label>

        <div className="add-event-time-row">
          <label className="add-event-label">
            Start
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </label>
          <label className="add-event-label">
            End
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </label>
        </div>

        <label className="add-event-label">
          Location <span className="add-event-optional">(optional)</span>
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Hall B" />
        </label>

        {error && <p className="add-event-error">{error}</p>}

        <button type="submit" className="add-event-submit" disabled={saving}>
          {saving ? 'Saving…' : 'Add & favorite'}
        </button>
      </form>
    </div>
  );
}
