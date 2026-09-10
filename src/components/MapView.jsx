import { useMemo, useState } from 'react';
import { VENUE_DIRECTORY } from '../data/venueDirectory';
import './MapView.css';

const MAPPED_AREAS = VENUE_DIRECTORY.filter((a) => a.bbox);
const AMENITIES = VENUE_DIRECTORY.find((a) => a.id === 'amenities');
const SEARCH_INDEX = MAPPED_AREAS.flatMap((area) => area.items.map((item) => ({ area, item })));

export default function MapView({ onSelectStage }) {
  const [selected, setSelected] = useState(null); // { area, item }
  const [query, setQuery] = useState('');
  const [zoomAreaId, setZoomAreaId] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter(({ item }) => item.name.toLowerCase().includes(q));
  }, [query]);

  const pick = (area, item) => {
    setSelected({ area, item });
    setQuery('');
  };

  const zoomArea = MAPPED_AREAS.find((a) => a.id === zoomAreaId);

  const renderDetail = () =>
    selected && (
      <div className="map-detail">
        <div className="map-detail-header">
          <span>{selected.item.name}</span>
          <button className="map-detail-close" onClick={() => setSelected(null)}>
            Close
          </button>
        </div>
        <div className="map-item-detail-standalone">
          <p>
            <span className="map-detail-area-tag">{selected.area.name}</span>
          </p>
          <p>{selected.item.desc}</p>
          {selected.item.stageId && (
            <button className="map-item-goto" onClick={() => onSelectStage(selected.item.stageId)}>
              View schedule &rarr;
            </button>
          )}
        </div>
      </div>
    );

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
            <button key={`${area.id}-${item.name}`} className="map-search-result" onClick={() => pick(area, item)}>
              <span className="map-search-result-name">{item.name}</span>
              <span className="map-search-result-area">{area.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <>
          <select
            className="map-zoom-select"
            value={zoomAreaId}
            onChange={(e) => {
              setZoomAreaId(e.target.value);
              setSelected(null);
            }}
          >
            <option value="">Whole venue (overview)</option>
            {MAPPED_AREAS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>

          <p className="map-view-intro">
            Positioned from the real floor plan - still approximate (isometric artwork flattened to top-down).
            {zoomArea ? ' Zoomed into ' + zoomArea.name + '.' : ' Pinch/scroll to explore the overview, or pick an area above to zoom in.'}
          </p>

          {zoomArea ? (
            <div className="map-scroll map-scroll-zoom">
              <svg
                className="map-svg map-svg-zoom"
                viewBox={`${zoomArea.bbox.x - 6} ${zoomArea.bbox.y - 6} ${zoomArea.bbox.w + 12} ${zoomArea.bbox.h + 12}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x={zoomArea.bbox.x}
                  y={zoomArea.bbox.y}
                  width={zoomArea.bbox.w}
                  height={zoomArea.bbox.h}
                  rx={6}
                  className="map-area-bbox"
                />
                {zoomArea.items.map((item) => {
                  const isSelected = selected?.item.name === item.name && selected?.area.id === zoomArea.id;
                  const isStage = Boolean(item.stageId);
                  return (
                    <g key={item.name} className="map-dot-group" onClick={() => pick(zoomArea, item)}>
                      <circle
                        cx={item.x}
                        cy={item.y}
                        r={isStage ? 5 : 3.2}
                        className={`map-dot ${isStage ? 'map-dot-stage' : ''} ${isSelected ? 'is-selected' : ''}`}
                      />
                      <text x={item.x + 5} y={item.y + 2} className="map-dot-inline-label">
                        {item.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          ) : (
            <div className="map-scroll">
              <svg className="map-svg" viewBox="-10 -10 1060 480" xmlns="http://www.w3.org/2000/svg">
                {MAPPED_AREAS.map((area) => (
                  <g key={area.id}>
                    <rect
                      x={area.bbox.x}
                      y={area.bbox.y}
                      width={area.bbox.w}
                      height={area.bbox.h}
                      rx={8}
                      className="map-area-bbox"
                    />
                    <text x={area.bbox.x + 4} y={area.bbox.y - 4} className="map-area-label">
                      {area.name.split(/[—(]/)[0].trim()}
                    </text>
                  </g>
                ))}

                {MAPPED_AREAS.flatMap((area) =>
                  area.items.map((item) => {
                    const isSelected = selected?.item.name === item.name && selected?.area.id === area.id;
                    const isStage = Boolean(item.stageId);
                    return (
                      <g key={`${area.id}-${item.name}`} className="map-dot-group" onClick={() => pick(area, item)}>
                        <circle
                          cx={item.x}
                          cy={item.y}
                          r={isStage ? 8 : 5}
                          className={`map-dot ${isStage ? 'map-dot-stage' : ''} ${isSelected ? 'is-selected' : ''}`}
                        />
                      </g>
                    );
                  })
                )}
              </svg>
            </div>
          )}

          {selected ? renderDetail() : <p className="map-view-hint">Tap any dot to see what's there.</p>}

          <div className="map-area map-amenities">
            <div className="map-area-header-static">{AMENITIES.name} (venue-wide)</div>
            {AMENITIES.items.map((item) => (
              <div key={item.name} className="map-item">
                <div className="map-item-row map-item-row-static">
                  <span>{item.name}</span>
                </div>
                <div className="map-item-detail">
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
