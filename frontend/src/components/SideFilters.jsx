// frontend/src/components/SideFilters.jsx
import React from 'react';

export default function SideFilters({ options, onQuickFilter }) {
  return (
    <aside className="side-panel">
      <div className="side-panel-section">
        <h3>Spa locations</h3>
        <ul>
          {options.locations.map((loc) => (
            <li key={loc}>
              <button onClick={() => onQuickFilter({ location: loc })}>
                {loc}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="side-panel-section">
        <h3>Treatments</h3>
        <ul>
          {options.treatments.map((t) => (
            <li key={t}>
              <button onClick={() => onQuickFilter({ treatment: t })}>
                {t}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
