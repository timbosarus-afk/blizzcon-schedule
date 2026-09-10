import { useMemo, useState } from 'react';
import { VENUE_DIRECTORY } from '../data/venueDirectory';
import './MapView.css';

const MAPPED_AREAS = VENUE_DIRECTORY.filter((a) => a.shape);
const AMENITIES = VENUE_DIRECTORY.find((a) => a.id === 'amenities');

// Flat searchable index: every item, tagged with its parent area.
const SEARCH_INDEX = VENUE_DIRECTORY.flatMap((area) => area.items.map((item) => ({ area, item })));

export default function MapView({ onSelectStage }) {
  const [selectedId, setSelectedId] = useState(null);
  const [openItem, setOpenItem] = useState(null);
  const [query, setQuery] = useState('');

  const selected = VENUE_DIRECTORY.find((a) => a.id === selectedId);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter(({ item }) => item.name.toLowerCase().includes(q));
  }, [query]);

  const selectArea = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
    setOpenItem(null);
  };

  const toggleItem = (key) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  const jumpToResult = (area, item) => {
    setQuery('');
    setSelectedId(area.id);
    setOpenItem(`${area.id}-${item.name}`);
  };

  const renderItemDetail = (area, item, key) => {
    const expanded = openItem === key;
    return (
      <div key={key} className="map-item">
        <button className="map-item-row" onClick={() => toggleItem(key)}>
          <span>{item.name}</span>
          {item.stageId && <span className="map-item-tag">Stage</span>}
        </button>
        {expanded && (
          <div className="map-item-detail">
            <p>{item.desc}</p>
            {item.stageId && (
              <button className="map-item-goto" onClick={() => onSelectStage(item.stageId)}>
                View schedule &rarr;
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="map-view">
      <input
        className="map-search"
        type="text"
        placeholder="Search the venue directory…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query.trim() ? (
        <div className="map-search-results">
          {results.length === 0 && <p className="map-view-hint">No matches for "{query}"</p>}
          {results.map(({ area, item }) => (
            <button key={`${area.id}-${item.name}`} className="map-search-result" onClick={() => jumpToResult(area, item)}>
              <span className="map-search-result-name">{item.name}</span>
              <span className="map-search-result-area">{area.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <>
          <p className="map-view-intro">Schematic layout, not the official artwork - tap an area to zoom in.</p>

          <svg className="map-svg" viewBox="0 0 1040 640" xmlns="http://www.w3.org/2000/svg">
            {MAPPED_AREAS.map((area) => {
              const isSelected = selectedId === area.id;
              if (area.shape.type === 'circle') {
                const { cx, cy, r } = area.shape;
                return (
                  <g key={area.id} className="map-shape-group" onClick={() => selectArea(area.id)}>
                    <circle cx={cx} cy={cy} r={r} className={`map-shape ${isSelected ? 'is-selected' : ''}`} />
                    <text x={cx} y={cy} className="map-shape-label" textAnchor="middle" dominantBaseline="middle">
                      {shortLabel(area.name)}
                    </text>
                  </g>
                );
              }
              const { x, y, w, h } = area.shape;
              return (
                <g key={area.id} className="map-shape-group" onClick={() => selectArea(area.id)}>
                  <rect x={x} y={y} width={w} height={h} rx={10} className={`map-shape ${isSelected ? 'is-selected' : ''}`} />
                  <text x={x + w / 2} y={y + h / 2} className="map-shape-label" textAnchor="middle" dominantBaseline="middle">
                    {shortLabel(area.name)}
                  </text>
                </g>
              );
            })}
            <text x={20} y={630} className="map-skybridge-note">
              ⟶ Skybridge connects Hall A / Arena up to Level 2
            </text>
          </svg>

          {selected ? (
            <div className="map-detail">
              <div className="map-detail-header">
                <span>{selected.name}</span>
                <button className="map-detail-close" onClick={() => setSelectedId(null)}>
                  Close
                </button>
              </div>
              <p className="map-detail-caveat">
                Approximate layout - positions are ordered as listed on the floor map, not to exact scale.
              </p>
              <div className="map-hall-grid">
                {selected.items.map((item, i) => {
                  const key = `${selected.id}-${item.name}`;
                  return (
                    <button
                      key={key}
                      className={`map-grid-box ${openItem === key ? 'is-open' : ''}`}
                      onClick={() => toggleItem(key)}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
              {selected.items.map((item) => {
                const key = `${selected.id}-${item.name}`;
                if (openItem !== key) return null;
                return (
                  <div key={key} className="map-item-detail map-item-detail-standalone">
                    <p>
                      <strong>{item.name}:</strong> {item.desc}
                    </p>
                    {item.stageId && (
                      <button className="map-item-goto" onClick={() => onSelectStage(item.stageId)}>
                        View schedule &rarr;
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="map-view-hint">Tap a shape above to zoom into that area.</p>
          )}

          <div className="map-area map-amenities">
            <div className="map-area-header-static">{AMENITIES.name} (venue-wide)</div>
            {AMENITIES.items.map((item) => renderItemDetail(AMENITIES, item, `${AMENITIES.id}-${item.name}`))}
          </div>
        </>
      )}
    </div>
  );
}

function shortLabel(name) {
  return name.split(/[—(]/)[0].trim();
}
