import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main className="page-shell">
      <section className="about-first-view">
        <div className="site-container about-first-view-grid">
          <div className="about-first-view-copy">
            <span className="eyebrow"><i className="bx bxs-rocket"></i> About us</span>
            <h1>Powering Growth Through Innovation</h1>
            <p>
           At TK InfotechSoft, we don't just develop software . we create intelligent digital solutions that help businesses grow, innovate, and stay ahead in a rapidly evolving world.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-brand btn-lg" to="/contact">Enquiry now</Link>
            </div>
          </div>
          <div className="about-first-view-media" aria-label="About TK-INFOTECHSOFT">
            <img src="/about.jpg" alt="About TK-INFOTECHSOFT" />
          </div>
        </div>
      </section>

      <section className="about-profile-section" id="mission">
        <div className="about-profile-head reveal">
          <div className="about-profile-title">
            <h2>About us</h2>
          </div>
          <div className="about-profile-copy">
           <p>
  As the Founder of TK-INFOTECHSOFT, a training partner of MC-TECH Industrial School, I am committed to delivering high-quality software solutions while helping students and working professionals build the skills needed for today’s fast-evolving IT landscape.
</p>

<p>
  At TK-INFOTECHSOFT, our priority is to provide innovative software services—including Web Development, E-Commerce Solutions, ERP Systems, CRM Applications, and Custom Software Development—while reducing the gap between industry expectations and learner capabilities through practical training, real-time projects, mentorship, and technical support.
</p>
            <div className="about-profile-contact">
              <h3>Contact</h3>
              <div className="about-profile-contact-grid">
                <a href="mailto:tkinfotechsoft@gmail.com"><i className="bx bxs-envelope"></i> tkinfotechsoft@gmail.com</a>
                <a href="tel:+919597151915"><i className="bx bxs-phone-call"></i> +91 95971 51915</a>
                <a href="https://www.linkedin.com/in/tharun-krishna-d-35a6a632b/" target="_blank" rel="noreferrer"><i className="bx bxl-linkedin-square"></i> LinkedIn</a>
                <a href="https://www.instagram.com/tharuntk_d/" target="_blank" rel="noreferrer"><i className="bx bxl-instagram"></i> Instagram</a>
              </div>
            </div>
          </div>
          <div className="about-profile-photo-wrap reveal">
            <img
              className="about-profile-photo"
              src="/Gemini_Generated_Image_37ybzm37ybzm37yb.png"
              alt="Portrait of D. Tharun Krishna"
              loading="lazy"
            />
          </div>
        </div>

              </section>
    </main>
  );
}
