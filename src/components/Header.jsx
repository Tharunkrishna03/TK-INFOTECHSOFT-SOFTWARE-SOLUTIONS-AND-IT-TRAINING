import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect on header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close sidebar on path changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Handle hash scrolling for #contacts
  const handleHashLinkClick = (e, hash) => {
    if (hash === '#contacts') {
      e.preventDefault();
      setIsSidebarOpen(false);
      const footerElement = document.getElementById('contacts');
      if (footerElement) {
        footerElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <nav className="navbar p-0" aria-label="Main navigation">
          <div className="site-nav">
            <button 
              className="sidebar-toggle d-lg-none" 
              type="button" 
              onClick={() => setIsSidebarOpen(true)}
              aria-controls="mobileSidebar" 
              aria-expanded={isSidebarOpen} 
              aria-label="Open navigation menu"
            >
              <i className="bx bx-menu-alt-left"></i>
              <span className="toggle-label">Menu</span>
            </button>
            
            <Link className="navbar-brand brand-mark" to="/" aria-label="TK INFOTECHSOFT home">
              <img className="brand-logo" src="/tttkkk.png" alt="TK INFOTECHSOFT logo" />
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
                  <NavLink className="nav-link" to="/programmes">Programmes</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contacts" onClick={(e) => handleHashLinkClick(e, '#contacts')}>
                    Contact
                  </a>
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
              <p>Explore courses, services, contact options, and registration from one clear mobile sidebar.</p>
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
                <span className="mobile-icon-symbol">
                  <i className="bx bxs-home"></i>
                </span>
                <span className="mobile-icon-copy">
                  <strong>Home</strong>
                  <small>Overview and learner highlights</small>
                </span>
                <span className="mobile-link-arrow" aria-hidden="true">
                  <i className="bx bx-chevron-right"></i>
                </span>
              </NavLink>

              <NavLink className="mobile-icon-link" to="/services" onClick={() => setIsSidebarOpen(false)}>
                <span className="mobile-icon-symbol">
                  <i className="bx bxs-briefcase-alt-2"></i>
                </span>
                <span className="mobile-icon-copy">
                  <strong>Services</strong>
                  <small>Career services and digital support</small>
                </span>
                <span className="mobile-link-arrow" aria-hidden="true">
                  <i className="bx bx-chevron-right"></i>
                </span>
              </NavLink>

              <NavLink className="mobile-icon-link" to="/programmes" onClick={() => setIsSidebarOpen(false)}>
                <span className="mobile-icon-symbol">
                  <i className="bx bxs-book-content"></i>
                </span>
                <span className="mobile-icon-copy">
                  <strong>Programmes</strong>
                  <small>Career tracks and skill paths</small>
                </span>
                <span className="mobile-link-arrow" aria-hidden="true">
                  <i className="bx bx-chevron-right"></i>
                </span>
              </NavLink>

              <NavLink className="mobile-icon-link" to="/about" onClick={() => setIsSidebarOpen(false)}>
                <span className="mobile-icon-symbol">
                  <i className="bx bxs-user-circle"></i>
                </span>
                <span className="mobile-icon-copy">
                  <strong>About</strong>
                  <small>Mission, founder, and mentoring</small>
                </span>
                <span className="mobile-link-arrow" aria-hidden="true">
                  <i className="bx bx-chevron-right"></i>
                </span>
              </NavLink>

              <a className="mobile-icon-link" href="#contacts" onClick={(e) => handleHashLinkClick(e, '#contacts')}>
                <span className="mobile-icon-symbol">
                  <i className="bx bxs-envelope"></i>
                </span>
                <span className="mobile-icon-copy">
                  <strong>Contact</strong>
                  <small>Phone, email, and quick enquiry</small>
                </span>
                <span className="mobile-link-arrow" aria-hidden="true">
                  <i className="bx bx-chevron-right"></i>
                </span>
              </a>

              <NavLink className="mobile-icon-link" to="/register" onClick={() => setIsSidebarOpen(false)}>
                <span className="mobile-icon-symbol">
                  <i className="bx bxs-send"></i>
                </span>
                <span className="mobile-icon-copy">
                  <strong>Register</strong>
                  <small>Start your learning journey</small>
                </span>
                <span className="mobile-link-arrow" aria-hidden="true">
                  <i className="bx bx-chevron-right"></i>
                </span>
              </NavLink>
            </nav>
            <div className="mobile-sidebar-cta">
              <p>Start with a quick registration and we can guide you to the right programme.</p>
              <Link className="btn btn-brand btn-sm" to="/register" onClick={() => setIsSidebarOpen(false)}>
                Register
              </Link>
            </div>
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
