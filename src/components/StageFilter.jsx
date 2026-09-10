import './StageFilter.css';

export default function StageFilter({ stages, activeStage, setActiveStage }) {
  return (
    <div className="stage-filter">
      <button className={!activeStage ? 'active' : ''} onClick={() => setActiveStage(null)}>
        All Stages
      </button>
      {stages.map((s) => (
        <button key={s.id} className={activeStage === s.id ? 'active' : ''} onClick={() => setActiveStage(s.id)}>
          {s.name}
        </button>
      ))}
    </div>
  );
}
