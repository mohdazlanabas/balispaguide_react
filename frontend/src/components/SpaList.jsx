// frontend/src/components/SpaList.jsx
import React from 'react';
import SpaCard from './SpaCard.jsx';

export default function SpaList({ spas, loading }) {
  if (loading) return <div>Loading spas…</div>;
  if (!spas.length) return <div>No spas match your filters.</div>;

  return (
    <div className="spa-list">
      {spas.map((spa) => (
        <SpaCard key={spa.id} spa={spa} />
      ))}
    </div>
  );
}
