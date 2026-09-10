import { useState } from 'react';
import { VENUE_DIRECTORY } from '../data/venueDirectory';
import './MapView.css';

const MAPPED_AREAS = VENUE_DIRECTORY.filter((a) => a.shape);
const AMENITIES = VENUE_DIRECTORY.find((a) => a.id === 'amenities');

export default function MapView({ onSelectStage }) {
  const [selectedId, setSelectedId] = useState(null);
  const [openItem, setOpenItem] = useState(null);

  const selected = VENUE_DIRECTORY.find((a) => a.id === selectedId);

  const selectArea = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
    setOpenItem(null);
  };

  const toggleItem = (key) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  const renderItemList = (area) => (
    <div className="map-detail-items">
      {area.items.map((item) => {
        const key = `${area.id}-${item.name}`;
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
      })}
    </div>
  );

  return (
    <div className="map-view">
      <p className="map-view-intro">
        Schematic layout, not the official artwork - tap an area for what's there.
      </p>

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
          \u27f6 Skybridge connects Hall A / Arena up to Level 2
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
          {renderItemList(selected)}
        </div>
      ) : (
        <p className="map-view-hint">Tap a shape above to see what's there.</p>
      )}

      <div className="map-area map-amenities">
        <div className="map-area-header-static">{AMENITIES.name} (venue-wide)</div>
        {renderItemList(AMENITIES)}
      </div>
    </div>
  );
}

function shortLabel(name) {
  // Compact label for the small SVG shapes; full name shown in the detail panel.
  return name.split(/[\u2014(]/)[0].trim();
}
