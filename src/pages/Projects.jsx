/**
 * Projects.jsx
 * Displays a list of company projects and course offerings.
 * Includes modal popups for detailed project descriptions.
 */
import React, { useEffect, useState } from 'react';
import Antigravity from '../components/Antigravity';

/**
 * Projects Component
 * Renders the projects page, handling state for various modal popups.
 */
export default function Projects() {
  // State hooks for managing the visibility of project details popups
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isServicePopupOpen, setIsServicePopupOpen] = useState(false);
  const [isExcelPopupOpen, setIsExcelPopupOpen] = useState(false);

  /**
   * Smoothly scrolls down to the first project section on the page.
   */
  const scrollToProject = () => {
    const el = document.getElementById('first-project');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };



  /**
   * Keyboard event listener to close any open popups when the 'Escape' key is pressed.
   */
  useEffect(() => {
    if (!isPopupOpen && !isServicePopupOpen && !isExcelPopupOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsPopupOpen(false);
        setIsServicePopupOpen(false);
        setIsExcelPopupOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPopupOpen, isServicePopupOpen, isExcelPopupOpen]);

  // Scroll animation observer for images
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    const elements = document.querySelectorAll('.project-scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="page-shell projects-page" style={{ backgroundColor: 'white' }}>
      <style>
        {`
          .project-scroll-animate {
            transform: scale(0.5);
            opacity: 0;
            transition: transform 0.8s ease-out, opacity 0.8s ease-out;
            will-change: transform, opacity;
          }
          .project-scroll-animate.is-visible {
            transform: scale(1);
            opacity: 1;
          }
          .project-scroll-animate.is-visible:hover {
            transform: scale(1.05);
            transition: transform 0.3s ease-in-out;
          }

          /* Explore More Animated Button (Uiverse) */
          .explore-more-btn {
            position: relative;
            display: inline-block;
            cursor: pointer;
            outline: none;
            border: 0;
            vertical-align: middle;
            text-decoration: none;
            background: transparent;
            padding: 0;
            font-size: inherit;
            font-family: inherit;
            width: 12rem;
            height: auto;
          }
          
          .explore-more-btn .circle {
            transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
            position: relative;
            display: block;
            margin: 0;
            width: 3rem;
            height: 3rem;
            background: darkviolet;
            border-radius: 1.625rem;
          }
          
          .explore-more-btn .circle .icon {
            transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            background: #fff;
          }
          
          .explore-more-btn .circle .icon.arrow {
            transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
            left: 0.625rem;
            width: 1.125rem;
            height: 0.125rem;
            background: none;
          }
          
          .explore-more-btn .circle .icon.arrow::before {
            position: absolute;
            content: "";
            top: -0.29rem;
            right: 0.0625rem;
            width: 0.625rem;
            height: 0.625rem;
            border-top: 0.125rem solid #fff;
            border-right: 0.125rem solid #fff;
            transform: rotate(45deg);
          }
          
          .explore-more-btn .button-text {
            transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 0.75rem 0;
            margin: 0 0 0 1.85rem;
            color: darkviolet;
            font-weight: 700;
            line-height: 1.6;
            text-align: center;
            text-transform: uppercase;
            font-size: 0.9rem;
          }
          
          .explore-more-btn:hover .circle {
            width: 100%;
          }
          
          .explore-more-btn:hover .circle .icon.arrow {
            background: #fff;
            transform: translate(1rem, 0);
          }
          
          .explore-more-btn:hover .button-text {
            color: #fff;
          }
        `}
      </style>
      {/* Hero Section for Projects */}
      <section className="project-hero" style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '1080px', height: '1080px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }}>
          <Antigravity
            count={300}
            magnetRadius={8}
            ringRadius={10}
            waveSpeed={0.4}
            waveAmplitude={1}
            particleSize={2}
            lerpSpeed={0.1}
            colors={['#FF5733', '#33FF57', '#3357FF', '#FF33F5', '#33FFF5', '#F5FF33']}
            autoAnimate={false}
            particleVariance={1}
            rotationSpeed={0}
            depthFactor={1}
            pulseSpeed={3}
            particleShape="capsule"
            fieldStrength={10}
          />
        </div>
        <div className="site-container project-hero-inner" style={{ zIndex: 1, position: 'relative', pointerEvents: 'none' }}>
          <div className="core-services-copy" style={{ pointerEvents: 'auto' }}>
            <p className="dia-text-reveal" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', textTransform: 'uppercase', color: 'black' }}>OUR PROJECTS</p>

          </div>
          <button className="project-scroll-button" type="button" onClick={scrollToProject} style={{ pointerEvents: 'auto' }}>
            <span>Scroll now</span>
            <i className="bx bx-down-arrow-alt" aria-hidden="true"></i>
          </button>
        </div>
      </section>

      {/* Project 1: Excel Data Cleaner */}
      <section className="section-space project-detail-section" id="first-project">
        <div className="site-container" style={{ position: 'relative', display: 'flex', justifySelf: 'center', justifyContent: 'center', paddingBottom: '80px', marginTop: '2rem' }}>
          <div className="project-detail-media" style={{ background: 'transparent', width: '100%', maxWidth: '900px' }}>
            <img src="/excel tool.png" alt="Excel Data Cleaner project" className="project-scroll-animate" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }} />
          </div>
          <div className="project-detail-copy" style={{
            position: 'absolute',
            bottom: '20px',
            left: '2%',
            background: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            width: '90%',
            maxWidth: '420px',
            textAlign: 'left',
            zIndex: 10
          }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Excel Data Cleaner</h2>
            <p style={{
              margin: '0 0 1.5rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#444',
              lineHeight: '1.6',
              fontSize: '0.95rem'
            }}>
              Excel Data Cleaner is a local desktop application built using Electron, React, and Python. It allows users to process, clean, compare, map, and merge Excel (.xlsx, .xls) and CSV files without sending data to external cloud services.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="https://t-tool.vercel.app" target="_blank" rel="noopener noreferrer" className="explore-more-btn" style={{ margin: 0 }}>
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Explore more</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project 2: Jewel Finance ERP */}
      <section className="section-space project-detail-section">
        <div className="site-container" style={{ position: 'relative', display: 'flex', justifySelf: 'center', justifyContent: 'center', paddingBottom: '80px', marginTop: '2rem' }}>
          <div className="project-detail-media" style={{ background: 'transparent', width: '100%', maxWidth: '900px' }}>
            <img src="/project.jpg" alt="Jewel Finance ERP Software project" className="project-scroll-animate" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }} />
          </div>
          <div className="project-detail-copy" style={{
            position: 'absolute',
            bottom: '20px',
            right: '2%',
            background: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            width: '90%',
            maxWidth: '420px',
            textAlign: 'left',
            zIndex: 10
          }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Jewel Finance ERP Software</h2>
            <p style={{
              margin: '0 0 1.5rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#444',
              lineHeight: '1.6',
              fontSize: '0.95rem'
            }}>
              A comprehensive ERP solution designed specifically for jewelry finance businesses to streamline customer
              management, financial operations, and daily transactions through a secure and user-friendly platform.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="explore-more-btn" type="button" style={{ margin: 0, transform: 'scale(0.85)', transformOrigin: 'left center' }} onClick={() => setIsPopupOpen(true)}>
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Read more</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project 3: Service Management ERP System */}
      <section className="section-space project-detail-section">
        <div className="site-container" style={{ position: 'relative', display: 'flex', justifySelf: 'center', justifyContent: 'center', paddingBottom: '80px', marginTop: '2rem' }}>
          <div className="project-detail-media" style={{ background: 'transparent', width: '100%', maxWidth: '900px' }}>
            <img src="/project.jpg" alt="Service Management ERP System project" className="project-scroll-animate" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }} />
          </div>
          <div className="project-detail-copy" style={{
            position: 'absolute',
            bottom: '20px',
            left: '2%',
            background: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            width: '90%',
            maxWidth: '420px',
            textAlign: 'left',
            zIndex: 10
          }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Service Management ERP System</h2>
            <p style={{
              margin: '0 0 1.5rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#444',
              lineHeight: '1.6',
              fontSize: '0.95rem'
            }}>
              A powerful ERP solution developed for service-based businesses to manage clients, projects, employees,
              service requests, billing, and operations through a centralized platform with advanced Role-Based Access
              Control (RBAC).
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="explore-more-btn" type="button" style={{ margin: 0, transform: 'scale(0.85)', transformOrigin: 'left center' }} onClick={() => setIsServicePopupOpen(true)}>
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Read more</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project 4: Field Flow Exports */}
      <section className="section-space project-detail-section">
        <div className="site-container" style={{ position: 'relative', display: 'flex', justifySelf: 'center', justifyContent: 'center', paddingBottom: '80px', marginTop: '2rem' }}>
          <div className="project-detail-media" style={{ background: 'transparent', width: '100%', maxWidth: '900px' }}>
            <img src="/fieldflowexports.png" alt="Field Flow Exports project" className="project-scroll-animate" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }} />
          </div>
          <div className="project-detail-copy" style={{
            position: 'absolute',
            bottom: '20px',
            right: '2%',
            background: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            width: '90%',
            maxWidth: '420px',
            textAlign: 'left',
            zIndex: 10
          }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Field Flow Exports</h2>
            <p style={{
              margin: '0 0 1.5rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#444',
              lineHeight: '1.6',
              fontSize: '0.95rem'
            }}>
              Field Flow Exports is a professional corporate website developed to establish a strong online presence for an export business. It features a modern, responsive design with an intuitive user experience across all devices. The website showcases the company's products, services, and global export capabilities while building customer trust. SEO-friendly architecture and optimized performance improve visibility and engagement. The platform helps generate business inquiries and strengthen the brand's digital identity.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="https://fieldflowexports.com/" target="_blank" rel="noopener noreferrer" className="explore-more-btn" style={{ margin: 0 }}>
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Explore more</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project 5: Namma Amma Pickles */}
      <section className="section-space project-detail-section">
        <div className="site-container" style={{ position: 'relative', display: 'flex', justifySelf: 'center', justifyContent: 'center', paddingBottom: '80px', marginTop: '2rem' }}>
          <div className="project-detail-media" style={{ background: 'transparent', width: '100%', maxWidth: '900px' }}>
            <img src="/pickles.png" alt="Numma Amma Pickles project" className="project-scroll-animate" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }} />
          </div>
          <div className="project-detail-copy" style={{
            position: 'absolute',
            bottom: '20px',
            left: '2%',
            background: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            width: '90%',
            maxWidth: '420px',
            textAlign: 'left',
            zIndex: 10
          }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Namma Amma Pickles</h2>
            <p style={{
              margin: '0 0 1.5rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#444',
              lineHeight: '1.6',
              fontSize: '0.95rem'
            }}>
              Namma Amma Pickles is a responsive e-commerce website developed for a homemade South Indian pickle brand. It offers an intuitive shopping experience with beautifully designed product listings, detailed descriptions, and category-based navigation. The website features a modern UI, smooth animations, WhatsApp order integration, and mobile-friendly responsiveness. Built with performance and SEO in mind, it helps the brand expand its online presence and connect directly with customers. The platform combines traditional flavors with a modern digital experience to drive customer engagement and sales.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="https://numma-amma-pickle.vercel.app/" target="_blank" rel="noopener noreferrer" className="explore-more-btn" style={{ margin: 0 }}>
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Explore more</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {isPopupOpen && (
        <div className="service-popup" role="dialog" aria-modal="true" aria-labelledby="project-popup-title">
          <button
            className="service-popup-backdrop"
            type="button"
            aria-label="Close project details"
            onClick={() => setIsPopupOpen(false)}
          ></button>
          <div className="service-popup-panel project-popup-panel">
            <section className="application-card service-popup-card project-popup-card">
              <div className="service-popup-head">
                <span className="kicker">Project overview</span>
                <button
                  className="service-popup-close"
                  type="button"
                  aria-label="Close project details"
                  onClick={() => setIsPopupOpen(false)}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <h2 id="project-popup-title">Jewel Finance ERP Software</h2>
              <p style={{ textAlign: 'justify', marginLeft: '1rem', marginRight: '1rem' }}>
                A comprehensive ERP solution designed specifically for jewelry finance businesses to streamline customer
                management, financial operations, and daily transactions through a secure and user-friendly platform.
              </p>

              <h3>Key Features</h3>
              <h4>Secure Login & User Management</h4>
              <ul>
                <li>Role-based authentication for administrators and staff.</li>
                <li>Secure access control to protect sensitive financial data.</li>
                <li>Activity tracking and user management dashboard.</li>
              </ul>

              <h4>Customer Management System</h4>
              <ul>
                <li>Centralized customer database with complete profile information.</li>
                <li>Customer loan, pledge, and repayment history tracking.</li>
                <li>Quick search and detailed customer account management.</li>
              </ul>

              <h4>Interest Calculation Automation</h4>
              <ul>
                <li>Automated interest calculation based on configurable business rules.</li>
                <li>Accurate daily, monthly, and custom-period interest computation.</li>
                <li>Real-time outstanding balance and payable amount updates.</li>
              </ul>

              <h4>Daily Transaction Management</h4>
              <ul>
                <li>Record and monitor all day-to-day financial transactions.</li>
                <li>Cash inflow and outflow tracking with detailed reports.</li>
                <li>Transaction history with date-wise filtering and auditing.</li>
              </ul>

              <h4>Individual Customer Transaction Tracking</h4>
              <ul>
                <li>Dedicated ledger for each customer.</li>
                <li>Complete transaction history including deposits, repayments, and interest details.</li>
                <li>Instant access to customer account statements and financial summaries.</li>
              </ul>

              <h4>Live Precious Metal Market Rates</h4>
              <ul>
                <li>Real-time market price integration for Gold, Silver, and Diamonds.</li>
                <li>Automatic rate updates to support accurate valuation and financing decisions.</li>
                <li>Market trend monitoring through an intuitive dashboard.</li>
              </ul>

              <h4>Reporting & Analytics</h4>
              <ul>
                <li>Comprehensive financial reports and business performance insights.</li>
                <li>Customer-wise, transaction-wise, and interest collection reports.</li>
                <li>Exportable reports for accounting and audit purposes.</li>
              </ul>

              <h3>Project Overview</h3>
              <p style={{ textAlign: 'justify', marginLeft: '1rem', marginRight: '1rem' }}>
                Developed a robust Jewelry Finance ERP System that digitizes and automates the complete workflow of a
                jewelry finance shop. The software combines customer management, interest calculation, transaction
                monitoring, and live precious metal market data into a single platform, helping businesses improve
                operational efficiency, reduce manual errors, and make informed financial decisions in real time.
              </p>
            </section>
          </div>
        </div>
      )}

      {isServicePopupOpen && (
        <div className="service-popup" role="dialog" aria-modal="true" aria-labelledby="service-project-popup-title">
          <button
            className="service-popup-backdrop"
            type="button"
            aria-label="Close project details"
            onClick={() => setIsServicePopupOpen(false)}
          ></button>
          <div className="service-popup-panel project-popup-panel">
            <section className="application-card service-popup-card project-popup-card">
              <div className="service-popup-head">
                <span className="kicker">Project overview</span>
                <button
                  className="service-popup-close"
                  type="button"
                  aria-label="Close project details"
                  onClick={() => setIsServicePopupOpen(false)}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <h2 id="service-project-popup-title">Service Management ERP System</h2>
              <p style={{ textAlign: 'justify', marginLeft: '1rem', marginRight: '1rem' }}>
                A powerful ERP solution developed for service-based businesses to manage clients, projects, employees,
                service requests, billing, and operations through a centralized platform with advanced Role-Based Access
                Control (RBAC).
              </p>

              <h3>Key Features</h3>
              <h4>Role-Based Access Control (RBAC)</h4>
              <ul>
                <li>Custom roles for Super Admin, Manager, Team Lead, Employee, and Client.</li>
                <li>Permission-based access to modules, reports, and sensitive information.</li>
                <li>Secure authentication and user activity monitoring.</li>
              </ul>

              <h4>Client Management</h4>
              <ul>
                <li>Centralized client database with complete service history.</li>
                <li>Track client requirements, communications, and project status.</li>
                <li>Manage contracts, quotations, and renewals efficiently.</li>
              </ul>

              <h4>Project & Service Management</h4>
              <ul>
                <li>Create and assign projects to teams and employees.</li>
                <li>Monitor project milestones, deadlines, and progress.</li>
                <li>Manage service requests, support tickets, and maintenance activities.</li>
              </ul>

              <h4>Employee Management</h4>
              <ul>
                <li>Employee profiles, attendance tracking, and performance monitoring.</li>
                <li>Task assignment and workload management.</li>
                <li>Department-wise access and reporting structure.</li>
              </ul>

              <h4>Billing & Invoice Management</h4>
              <ul>
                <li>Generate quotations, invoices, and payment receipts.</li>
                <li>Track pending payments and revenue reports.</li>
                <li>Automated billing workflows for recurring services.</li>
              </ul>

              <h4>Dashboard & Analytics</h4>
              <ul>
                <li>Real-time business insights and operational reports.</li>
                <li>Project performance, revenue, and team productivity analytics.</li>
                <li>Custom reports based on user roles and permissions.</li>
              </ul>

              <h4>Document Management</h4>
              <ul>
                <li>Secure storage of contracts, project files, and client documents.</li>
                <li>Role-based document access and version tracking.</li>
                <li>Centralized repository for easy collaboration.</li>
              </ul>

              <h3>Project Overview</h3>
              <p style={{ textAlign: 'justify', marginLeft: '1rem', marginRight: '1rem' }}>
                Designed and developed a comprehensive Service Management ERP System for service-based organizations to
                streamline operations, improve team collaboration, and enhance client service delivery. The platform
                leverages Role-Based Access Control (RBAC) to ensure secure access to business data while enabling
                efficient management of projects, clients, employees, billing, and reporting through a single integrated
                solution. The system helps organizations increase productivity, maintain transparency, and scale
                operations with confidence.
              </p>
            </section>
          </div>
        </div>
      )}

      {isExcelPopupOpen && (
        <div className="service-popup" role="dialog" aria-modal="true" aria-labelledby="excel-project-popup-title">
          <button
            className="service-popup-backdrop"
            type="button"
            aria-label="Close project details"
            onClick={() => setIsExcelPopupOpen(false)}
          ></button>
          <div className="service-popup-panel project-popup-panel">
            <section className="application-card service-popup-card project-popup-card">
              <div className="service-popup-head">
                <span className="kicker">Project overview</span>
                <button
                  className="service-popup-close"
                  type="button"
                  aria-label="Close project details"
                  onClick={() => setIsExcelPopupOpen(false)}
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <h2 id="excel-project-popup-title">Excel Data Cleaner</h2>
              <p style={{ textAlign: 'justify', marginLeft: '1rem', marginRight: '1rem' }}>
                Excel Data Cleaner is a local desktop application built using Electron, React, and Python. It allows users to process, clean, compare, map, and merge Excel (.xlsx, .xls) and CSV files without sending data to external cloud services.
              </p>
              
              <h3 style={{ marginLeft: '1rem', marginRight: '1rem' }}>Architecture Overview</h3>
              <p style={{ textAlign: 'justify', marginLeft: '1rem', marginRight: '1rem' }}>
                The application architecture utilizes a React frontend (bundled via Vite) communicating over local HTTP with a Python/FastAPI backend that handles the heavy data processing using Pandas. The Electron shell serves as the desktop container that coordinates both the visual interface and the underlying API server.
              </p>
            </section>
          </div>
        </div>
      )}
    </main>
  );
}
