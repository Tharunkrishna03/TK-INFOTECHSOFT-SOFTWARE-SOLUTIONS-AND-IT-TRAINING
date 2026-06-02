import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleAnchorClick = (e, path, elementId) => {
    // If we're already on that page, scroll directly
    if (window.location.pathname === path) {
      const el = document.getElementById(elementId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="site-footer" id="contacts">
      <div className="site-container">
        <div className="footer-grid">
          <section className="footer-card reveal">
            <h2>TK-INFOTECHSOFT</h2>
           <br/>
            <div className="contact-pair">
              <i className="bx bxs-phone-call"></i>
              <div>
                <a href="tel:+919597151915">+91 95971 51915</a><br />
                <a href="tel:+9188707084318">+91 88707084318</a>
              </div>
            </div>
            <div className="contact-pair">
              <i className="bx bxs-envelope"></i>
              <div>
                <a href="mailto:tkinfotechsoft@gmail.com">tkinfotechsoft@gmail.com</a><br />
                <a href="mailto:dtharunkrishna65@gmail.com">dtharunkrishna65@gmail.com</a>
              </div>
            </div>
            <div className="contact-pair">
              <i className="bx bxs-map"></i>
              <div>
                TK-INFOTECHSOFT<br /> (Training Partner of MC-TECH Industrial School)<br />
                MKP Nagar, MC-TECH Campus,<br />
                Kottur, Malayandi Pattinam,<br />
                Anaimalai Tk, Coimbatore District - 642007
              </div>
            </div>
          </section>

          <section className="footer-card reveal">
            <h3>Courses</h3>
            <ul className="footer-list">
              <li><Link to="/programmes#course-catalogue" onClick={(e) => handleAnchorClick(e, '/programmes', 'course-catalogue')}>Python Full Stack</Link></li>
              <li><Link to="/programmes#course-catalogue" onClick={(e) => handleAnchorClick(e, '/programmes', 'course-catalogue')}>Java Full Stack</Link></li>
              <li><Link to="/programmes#course-catalogue" onClick={(e) => handleAnchorClick(e, '/programmes', 'course-catalogue')}>MERN Stack</Link></li>
              <li><Link to="/programmes#course-catalogue" onClick={(e) => handleAnchorClick(e, '/programmes', 'course-catalogue')}>UI/UX Design</Link></li>
              <li><Link to="/programmes#course-catalogue" onClick={(e) => handleAnchorClick(e, '/programmes', 'course-catalogue')}>AWS Foundations</Link></li>
            </ul>
          </section>

          <section className="footer-card reveal">
            <h3>Services</h3>
            <ul className="footer-list">
              <li><Link to="/services#web-development" onClick={(e) => handleAnchorClick(e, '/services', 'web-development')}>Web Development</Link></li>
              <li><Link to="/services#app-development" onClick={(e) => handleAnchorClick(e, '/services', 'app-development')}>Ecommer website</Link></li>
              <li><Link to="/services#business-erp" onClick={(e) => handleAnchorClick(e, '/services', 'business-erp')}>Business ERP</Link></li>
              
              <li><Link to="/services#course-registration" onClick={(e) => handleAnchorClick(e, '/services', 'course-registration')}>CRM</Link></li>
              
              
            </ul>
          </section>
        </div>

        <p className="footer-note">
          TK-INFOTECHSOFT - Training Partner of MC-TECH Industrial School. Copyright &copy; 2026. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
