import React from 'react';

export default function PageLoader({ isVisible }) {
  return (
    <div 
      className={`page-loader ${isVisible ? 'is-visible' : 'd-none'}`} 
      aria-hidden="true"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'all' : 'none'
      }}
    >
      <div className="page-loader-shell">
        <img 
          src="/tk-logo.png" 
          alt="Loading..." 
          className="page-loader-logo" 
        />
      </div>
    </div>
  );
}
