import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect on header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Close sidebar on path changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''} ${isSidebarOpen ? 'mobile-sidebar-open' : ''}`}>
        <nav className="navbar p-0" aria-label="Main navigation">
          <div className="site-nav">
            <input 
              type="checkbox" 
              id="checkbox" 
              checked={isSidebarOpen}
              onChange={(e) => setIsSidebarOpen(e.target.checked)}
            />
            <label 
              htmlFor="checkbox" 
              className="toggle d-lg-none"
              aria-controls="mobileSidebar"
              aria-expanded={isSidebarOpen}
              aria-label="Toggle navigation menu"
            >
              <div id="bar1" className="bars"></div>
              <div id="bar2" className="bars"></div>
              <div id="bar3" className="bars"></div>
            </label>
            
            <Link className="navbar-brand brand-mark" to="/" aria-label="TK INFOTECHSOFT home">
              <img className="brand-logo" src="/logotk (1).png" alt="TK INFOTECHSOFT logo" />
            </Link>

            <div className="desktop-nav d-none d-lg-flex ms-auto">
              <ul className="navbar-nav flex-row align-items-center gap-lg-2">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" end>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/services">Services</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/projects">Projects</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">Contact</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Mobile Sidebar */}
        <div 
          className={`offcanvas offcanvas-start mobile-sidebar d-lg-none ${isSidebarOpen ? 'show' : ''}`} 
          tabIndex="-1" 
          id="mobileSidebar"
          aria-label="Mobile navigation"
          style={{ 
            visibility: isSidebarOpen ? 'visible' : 'hidden',
            transition: 'transform 0.3s ease-in-out'
          }}
        >
          <div className="offcanvas-header">
            <div className="mobile-sidebar-brand">
              <Link className="navbar-brand brand-mark" to="/" onClick={() => setIsSidebarOpen(false)} aria-label="TK INFOTECHSOFT home">
                <img className="brand-logo" src="/tttkkk.png" alt="TK INFOTECHSOFT logo" />
              </Link>
                </div>
            <button 
              type="button" 
              className="sidebar-close" 
              onClick={() => setIsSidebarOpen(false)} 
              aria-label="Close navigation menu"
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
          <div className="offcanvas-body">
            <nav className="mobile-icon-nav" aria-label="Mobile navigation links">
              <NavLink className="mobile-icon-link" to="/" end onClick={() => setIsSidebarOpen(false)}>
                <span className="mobile-icon-copy">
                  <strong>Home</strong>
                </span>
              </NavLink>

              <NavLink className="mobile-icon-link" to="/services" onClick={() => setIsSidebarOpen(false)}>
                <span className="mobile-icon-copy">
                  <strong>Services</strong>
                </span>
              </NavLink>

              <NavLink className="mobile-icon-link" to="/projects" onClick={() => setIsSidebarOpen(false)}>
                <span className="mobile-icon-copy">
                  <strong>Projects</strong>
                </span>
              </NavLink>

              <NavLink className="mobile-icon-link" to="/about" onClick={() => setIsSidebarOpen(false)}>
                <span className="mobile-icon-copy">
                  <strong>About</strong>
                </span>
              </NavLink>

              <NavLink className="mobile-icon-link" to="/contact" onClick={() => setIsSidebarOpen(false)}>
                <span className="mobile-icon-copy">
                  <strong>Contact</strong>
                </span>
              </NavLink>

              <NavLink className="mobile-icon-link" to="/register" onClick={() => setIsSidebarOpen(false)}>
                <span className="mobile-icon-copy">
                  <strong>Register</strong>
                </span>
              </NavLink>
            </nav>

          </div>
        </div>
      </header>

      {/* Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="offcanvas-backdrop fade show d-lg-none" 
          onClick={() => setIsSidebarOpen(false)}
          style={{ zIndex: 1040 }}
        />
      )}
    </>
  );
}
