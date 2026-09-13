/**
 * PageLoader.jsx
 * Displays a full-screen loading overlay during page transitions and initial load.
 */
import React from 'react';

/**
 * PageLoader Component
 * @param {boolean} isVisible - Controls whether the loader overlay is displayed.
 */
export default function PageLoader({ isVisible }) {
  const brandText = "TKinfotechsoft";

  return (
    <div 
      className={`page-loader ${isVisible ? 'is-visible' : 'd-none'}`} 
      aria-hidden="true"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'all' : 'none'
      }}
    >
      <div className="page-loader-content">
        <div className="page-loader-shell">
          {/* Pulsing Brand Logo */}
          <img 
            src="/tk-logo.png" 
            alt="Loading..." 
            className="page-loader-logo" 
          />
        </div>
        <div className="page-loader-text">
          {brandText.split('').map((char, i) => (
            <span 
              key={i} 
              className="loader-char" 
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
