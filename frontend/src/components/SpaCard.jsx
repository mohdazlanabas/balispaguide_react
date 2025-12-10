// frontend/src/components/SpaCard.jsx
import React from 'react';

function budgetToSymbols(budget) {
  if (!budget) return '–';
  return '$'.repeat(budget);
}

export default function SpaCard({ spa }) {
  const treatmentsPreview = spa.treatments.slice(0, 4).join(' • ');

  const timeLabel =
    spa.opening_hour && spa.closing_hour
      ? `${spa.opening_hour} – ${spa.closing_hour}`
      : '';

  return (
    <article className="spa-card">
      <div>
        <div className="spa-card-title">{spa.title}</div>
        {spa.location && (
          <div className="spa-card-location">{spa.location}, Bali</div>
        )}
        {spa.address && (
          <div className="spa-card-address">{spa.address}</div>
        )}
        <div className="spa-card-meta">
          {spa.rating != null && (
            <span className="badge badge-rating">
              ★ {spa.rating.toFixed(1)}
            </span>
          )}
          {spa.budget != null && (
            <span className="badge badge-budget">
              Budget: {budgetToSymbols(spa.budget)}
            </span>
          )}
          {timeLabel && <span className="badge badge-time">{timeLabel}</span>}
        </div>
        {treatmentsPreview && (
          <div style={{ fontSize: '0.8rem', color: '#555' }}>
            {treatmentsPreview}
            {spa.treatments.length > 4 ? ' …' : ''}
          </div>
        )}
      </div>
      <div className="spa-card-actions">
        {spa.phone && <div>☎ {spa.phone}</div>}
        {spa.email && <div>✉ {spa.email}</div>}
        {spa.website && (
          <a href={spa.website} target="_blank" rel="noreferrer">
            Visit website →
          </a>
        )}
        {/* You can later wire this to a detail page / modal */}
        <button className="button-outline">View details</button>
      </div>
    </article>
  );
}
