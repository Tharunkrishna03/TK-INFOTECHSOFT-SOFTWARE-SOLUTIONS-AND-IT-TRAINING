import React, { useEffect, useState } from 'react';

const ImageSlider = ({ images, altPrefix }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', overflow: 'hidden' }}>
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${altPrefix} ${idx + 1}`}
          style={{
            position: idx === 0 ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: currentIndex === idx ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
            zIndex: currentIndex === idx ? 1 : 0,
          }}
        />
      ))}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 2,
      }}>
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: currentIndex === idx ? '#00c2ff' : '#ffffff',
              border: currentIndex === idx ? 'none' : '1px solid rgba(0,0,0,0.1)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Projects() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isServicePopupOpen, setIsServicePopupOpen] = useState(false);

  const scrollToProject = () => {
    const el = document.getElementById('jewel-finance-project');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isPopupOpen && !isServicePopupOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsPopupOpen(false);
        setIsServicePopupOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPopupOpen, isServicePopupOpen]);

  return (
    <main className="page-shell projects-page">
      <section className="project-hero">
        <div className="core-services-grid" aria-hidden="true"></div>
        <div className="site-container project-hero-inner">
          <div className="core-services-copy reveal">
            <p>OUR PROJECTS</p>
            
          </div>
          <button className="project-scroll-button" type="button" onClick={scrollToProject}>
            <span>Scroll now</span>
            <i className="bx bx-down-arrow-alt" aria-hidden="true"></i>
          </button>
        </div>
      </section>

      <section className="section-space project-detail-section" id="jewel-finance-project">
        <div className="site-container project-detail-layout">
          <div className="project-detail-media reveal" style={{ padding: 0 }}>
            <ImageSlider 
              images={[
                '/tk-info-tech-career-bridge-learning-institute-demo-erp-1.png',
                '/tk-info-tech-career-bridge-learning-institute-demo-erp-2.png',
                '/tk-info-tech-career-bridge-learning-institute-demo-erp-3.png'
              ]} 
              altPrefix="Jewel Finance ERP Software"
            />
          </div>
          <div className="project-detail-copy reveal">
            <h2>Jewel Finance ERP Software</h2>
            <p>
              A comprehensive ERP solution designed specifically for jewelry finance businesses to streamline customer
              management, financial operations, and daily transactions through a secure and user-friendly platform.
            </p>
            <button className="btn btn-brand core-services-button" type="button" onClick={() => setIsPopupOpen(true)}>
              Read more
            </button>
          </div>
        </div>
      </section>

      <section className="section-space project-detail-section">
        <div className="site-container project-detail-layout">
          <div className="project-detail-copy reveal">
            <h2>Service Management ERP System</h2>
            <p>
              A powerful ERP solution developed for service-based businesses to manage clients, projects, employees,
              service requests, billing, and operations through a centralized platform with advanced Role-Based Access
              Control (RBAC).
            </p>
            <button className="btn btn-brand core-services-button" type="button" onClick={() => setIsServicePopupOpen(true)}>
              Read more
            </button>
          </div>
          <div className="project-detail-media reveal">
            <img src="/project.jpg" alt="Service Management ERP System project" />
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
              <p>
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
              <p>
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
              <p>
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
              <p>
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
    </main>
  );
}
