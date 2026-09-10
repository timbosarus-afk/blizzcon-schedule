import './TopBar.css';

export default function TopBar({ day, setDay, view, setView, days }) {
  return (
    <div className="topbar">
      <div className="topbar-title">
        <span className="topbar-title-main">BlizzCon</span>
        <span className="topbar-title-sub">Schedule</span>
      </div>

      <div className="topbar-row">
        <div className="view-toggle">
          <button className={view === 'schedule' ? 'active' : ''} onClick={() => setView('schedule')}>
            Schedule
          </button>
          <button className={view === 'mine' ? 'active' : ''} onClick={() => setView('mine')}>
            Mine
          </button>
        </div>
      </div>

      {view === 'schedule' && (
        <div className="day-tabs">
          {days.map((d) => (
            <button key={d.value} className={day === d.value ? 'active' : ''} onClick={() => setDay(d.value)}>
              {d.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
