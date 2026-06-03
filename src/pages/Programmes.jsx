import React from 'react';
import { Link } from 'react-router-dom';

export default function Programmes() {
  const handleAnchorClick = (e, elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="page-shell">
          </main>
  );
}
