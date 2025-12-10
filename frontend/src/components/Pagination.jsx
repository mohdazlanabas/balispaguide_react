// frontend/src/components/Pagination.jsx
import React from 'react';

export default function Pagination({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < pageCount;

  return (
    <div className="pagination">
      <button disabled={!canPrev} onClick={() => canPrev && onChange(1)}>
        « First
      </button>
      <button disabled={!canPrev} onClick={() => canPrev && onChange(page - 1)}>
        ‹ Prev
      </button>
      <span className="page-info">
        Page {page} of {pageCount}
      </span>
      <button disabled={!canNext} onClick={() => canNext && onChange(page + 1)}>
        Next ›
      </button>
      <button
        disabled={!canNext}
        onClick={() => canNext && onChange(pageCount)}
      >
        Last »
      </button>
    </div>
  );
}
