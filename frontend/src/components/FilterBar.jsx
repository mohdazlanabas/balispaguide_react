// frontend/src/components/FiltersBar.jsx
import React from 'react';

export default function FiltersBar({ filters, options, onChange }) {
  return (
    <div className="filters-bar">
      <div>
        <label>Search</label>
        <input
          type="text"
          placeholder="Spa name or address…"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
        />
      </div>
      <div>
        <label>Location</label>
        <select
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value })}
        >
          <option value="">All locations</option>
          {options.locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Treatment</label>
        <select
          value={filters.treatment}
          onChange={(e) => onChange({ treatment: e.target.value })}
        >
          <option value="">All treatments</option>
          {options.treatments.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Budget</label>
        <select
          value={filters.budget}
          onChange={(e) => onChange({ budget: e.target.value })}
        >
          <option value="">Any</option>
          {options.budgets.map((b) => (
            <option key={b} value={b}>
              {'$'.repeat(b)}
            </option>
          ))}
        </select>
      </div>
      <div className="sort-select">
        <label>Sort by</label>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value })}
        >
          <option value="rating_desc">Rating (High–Low)</option>
          <option value="rating_asc">Rating (Low–High)</option>
          <option value="budget_asc">Price (Low–High)</option>
          <option value="budget_desc">Price (High–Low)</option>
        </select>
      </div>
    </div>
  );
}
