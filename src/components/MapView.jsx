import { useState } from 'react';
import { VENUE_DIRECTORY } from '../data/venueDirectory';
import './MapView.css';

export default function MapView({ onSelectStage }) {
  const [openArea, setOpenArea] = useState(null);
  const [openItem, setOpenItem] = useState(null);

  const toggleArea = (id) => {
    setOpenArea((prev) => (prev === id ? null : id));
    setOpenItem(null);
  };

  const toggleItem = (key) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <div className="map-view">
      <p className="map-view-intro">
        Full venue directory, grouped by hall - tap an area to expand it, tap a spot for what it is. Stages jump
        straight to their schedule.
      </p>

      {VENUE_DIRECTORY.map((area) => (
        <div key={area.id} className="map-area">
          <button className="map-area-header" onClick={() => toggleArea(area.id)}>
            <span>{area.name}</span>
            <span className="map-area-chevron">{openArea === area.id ? '\u2212' : '+'}</span>
          </button>

          {openArea === area.id && (
            <div className="map-area-body">
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
                            View schedule \u2192
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
