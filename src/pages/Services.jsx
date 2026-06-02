import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  publicKey: "Nw-A_RtWpccfLfDE1",
  serviceId: "service_tuvi97l",
  templateId: "template_vxbtcnh",
};

const PRIMARY_EMAIL = "tkinfotechsoft@gmail.com";

const softwareServices = [
  {
    title: 'Web Development',
    icon: 'bx bx-code-curly',
    headline: 'Custom Websites That Build Your Digital Presence',
    points: [
      'Responsive Design - Websites that work seamlessly across desktops, tablets, and mobile devices.',
      'Custom Development - Tailor-made solutions designed to match your business goals and brand identity.',
      'High Performance - Fast-loading, optimized websites for a better user experience and higher engagement.',
      'SEO-Friendly Structure - Built with search engine best practices to improve online visibility.',
      'Secure & Scalable - Developed with modern technologies to ensure security and future growth.'
    ]
  },
  {
    title: 'E-Commerce Website',
    icon: 'bx bx-store-alt',
    headline: 'Powerful Online Stores That Drive Sales',
    points: [
      'User-Friendly Shopping Experience - Intuitive navigation and smooth checkout process for customers.',
      'Secure Payment Integration - Support for multiple payment gateways with secure transactions.',
      'Inventory Management - Easy product, stock, and order management from a centralized dashboard.',
      'Mobile Commerce Ready - Optimized shopping experience across all devices.',
      'Growth-Focused Features - Promotions, coupons, analytics, and customer engagement tools to increase revenue.'
    ]
  },
  {
    title: 'Business ERP',
    icon: 'bx bx-layer',
    headline: 'Integrated Solutions for Efficient Business Management',
    points: [
      'Centralized Operations - Manage finance, HR, inventory, sales, and procurement in one system.',
      'Real-Time Reporting - Access accurate business insights and performance data instantly.',
      'Process Automation - Reduce manual tasks and improve operational efficiency.',
      'Department Collaboration - Enable seamless communication and workflow across teams.',
      'Scalable Architecture - Flexible ERP solutions that grow with your business requirements.'
    ]
  },
  {
    title: 'CRM',
    icon: 'bx bx-user-pin',
    headline: 'Strengthen Customer Relationships and Boost Sales',
    points: [
      'Lead Management - Capture, organize, and track potential customers effectively.',
      'Sales Automation - Streamline sales processes and improve conversion rates.',
      'Customer Interaction Tracking - Maintain complete customer communication history.',
      'Performance Analytics - Monitor sales performance and customer engagement metrics.',
      'Improved Customer Retention - Build stronger relationships through personalized interactions and support.'
    ]
  },
  {
    title: 'Portfolio Website',
    icon: 'bx bx-id-card',
    headline: 'Showcase Your Brand, Work, and Achievements',
    points: [
      'Professional Online Presence - Create a strong first impression with a modern portfolio website.',
      'Project Showcase - Highlight your work, achievements, and success stories effectively.',
      'Personal Branding - Reflect your unique identity, skills, and expertise.',
      'Lead Generation - Convert visitors into clients with strategic contact and inquiry sections.',
      'Easy Content Management - Update projects, services, and information effortlessly as you grow.'
    ]
  }
];

export default function Services() {
  const [activeSoftwareService, setActiveSoftwareService] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '', // Represents Selected Service in schema
    startDate: '',
    address: '',
    enquiry: ''
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load cached form data from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tkApplication');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error('Storage read error:', e);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'This field is required.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'This field is required.';
    } else {
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        newErrors.phone = 'Please enter a valid 10-digit phone number.';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'This field is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.course) {
      newErrors.course = 'This field is required.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'This field is required.';
    }

    if (!formData.enquiry.trim()) {
      newErrors.enquiry = 'This field is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openMailClient = (payload) => {
    const subject = `Service enquiry from ${payload.name}`;
    const body = `TK-INFOTECHSOFT service enquiry\n\nName: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email}\nAddress: ${payload.address}\nEnquiry topic: ${payload.course}\nPreferred start date: ${payload.startDate || 'Not provided'}\nEnquiry: ${payload.enquiry}`;
    window.location.href = `mailto:${PRIMARY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus({ text: 'Please check the form for errors.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ text: 'Sending your service enquiry...', type: '' });

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.replace(/\D/g, ''),
      email: formData.email.trim(),
      course: formData.course,
      startDate: formData.startDate,
      address: formData.address.trim(),
      enquiry: formData.enquiry.trim()
    };

    // Cache locally
    try {
      localStorage.setItem('tkApplication', JSON.stringify(payload));
    } catch (err) {
      console.error('Storage save error:', err);
    }

    const emailSubject = `Service enquiry from ${payload.name}`;
    const emailBody = `TK-INFOTECHSOFT service enquiry\n\nName: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email}\nAddress: ${payload.address}\nEnquiry topic: ${payload.course}\nPreferred start date: ${payload.startDate || 'Not provided'}\nEnquiry: ${payload.enquiry}`;

    try {
      // Send via EmailJS using sendForm style parameters
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: payload.name,
          email_id: payload.email,
          reply_to: payload.email,
          to_email: PRIMARY_EMAIL,
          phone_number: payload.phone,
          enquiry_course: payload.course,
          start_date: payload.startDate || 'Not provided',
          preferred_start_date: payload.startDate || 'Not provided',
          subject: emailSubject,
          message: emailBody,
        },
        {
          publicKey: EMAILJS_CONFIG.publicKey,
        }
      );

      // Reset Form and Storage
      setFormData({
        name: '',
        phone: '',
        email: '',
        course: '',
        startDate: '',
        address: '',
        enquiry: ''
      });
      
      try {
        localStorage.removeItem('tkApplication');
      } catch (err) {}

      setStatus({
        text: 'Service enquiry sent successfully. We will contact you soon.',
        type: 'success'
      });
    } catch (error) {
      console.error('Application email error:', error);
      openMailClient(payload);
      setStatus({
        text: 'Your email app was opened so you can continue the service enquiry, and your details are still saved on this device.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="services-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>Software Solutions & Training for Growth and Success</h1>
            <p>
              We deliver innovative software solutions for businesses and practical,
              industry-focused training for learners. Empowering organizations and individuals
              with the skills and technology needed to succeed.
            </p>
          </div>

          <div className="hero-visual reveal" aria-hidden="true">
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="/service.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="software-services-section" aria-labelledby="software-services-title">
        <div className="site-container software-services-inner">
          <h2 id="software-services-title">Our Software Services</h2>

          <div className="software-services-layout">
            <div className="software-service-tabs" role="tablist" aria-label="Software services">
              {softwareServices.map((service, index) => (
                <button
                  className={`software-service-tab ${activeSoftwareService === index ? 'is-active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={activeSoftwareService === index}
                  aria-controls="software-service-panel"
                  id={`software-service-tab-${index}`}
                  key={service.title}
                  onClick={() => setActiveSoftwareService(index)}
                >
                  <span className="software-service-fold" aria-hidden="true"></span>
                  <span className="software-service-points" aria-hidden="true">
                    <span className="software-service-point"></span>
                    <span className="software-service-point"></span>
                    <span className="software-service-point"></span>
                    <span className="software-service-point"></span>
                    <span className="software-service-point"></span>
                    <span className="software-service-point"></span>
                    <span className="software-service-point"></span>
                    <span className="software-service-point"></span>
                    <span className="software-service-point"></span>
                    <span className="software-service-point"></span>
                  </span>
                  <span className="software-service-inner">{service.title}</span>
                </button>
              ))}
            </div>

            <article
              className="software-service-card"
              id="software-service-panel"
              role="tabpanel"
              aria-labelledby={`software-service-tab-${activeSoftwareService}`}
            >
              <h3>{softwareServices[activeSoftwareService].title}</h3>
              <h4>{softwareServices[activeSoftwareService].headline}</h4>
              <ul className="checklist">
                {softwareServices[activeSoftwareService].points.map((point) => (
                  <li key={point}>
                    <i className="bx bxs-check-circle"></i>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      
      <section className="section-space">
        <div className="site-container">
          <div className="section-intro">
            <span className="kicker">Connected journey</span>
            <h2>Learning support and career support work better together</h2>
            <p>
              Programmes strengthen skill depth, while services help you present that work, apply
              with better direction, or build real client-facing output.
            </p>
          </div>

          <div className="reason-grid mb-4">
            <article className="reason-card reveal">
              <h3>Start with education</h3>
              <p>Choose a programme when you need stronger skills, projects, and practical confidence.</p>
            </article>
            <article className="reason-card reveal">
              <h3>Add focused services</h3>
              <p>Use targeted support when you need better applications, presentation, or digital delivery.</p>
            </article>
            <article className="reason-card reveal">
              <h3>Move with clarity</h3>
              <p>Both paths are explained clearly so users can understand what to choose and when.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container about-layout">
          <section className="info-panel reveal">
            <span className="kicker">Why this works</span>
            <h2>A simpler way to choose the right support</h2>
            <p>
              We start by understanding your situation, then match the request to the most useful
              service instead of forcing you through an unnecessary package.
            </p>
            <ul className="checklist">
              <li>
                <i className="bx bxs-badge-check"></i>
                <span>Clarity-first conversations so you know what to do next.</span>
              </li>
              <li>
                <i className="bx bxs-badge-check"></i>
                <span>Hands-on guidance for digital execution and career presentation.</span>
              </li>
              <li>
                <i className="bx bxs-badge-check"></i>
                <span>Actionable outcomes instead of vague advice and one-size-fits-all tips.</span>
              </li>
            </ul>
          </section>

          <section className="application-card reveal" id="service-contact">
            <span className="kicker">Service-related contact</span>
            <h2>Share your service enquiry</h2>
            <p>
              Use this form for service-related contact so we can understand the support you need,
              your timing, and the result you want.
            </p>

            <form
              id="application-form"
              className="application-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="field-grid">
                <div>
                  <label className="form-label" htmlFor="application-name">Full name</label>
                  <input
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="application-name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div>
                  <label className="form-label" htmlFor="application-phone">Phone number</label>
                  <input
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    id="application-phone"
                    name="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    inputmode="numeric"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
              </div>

              <div className="field-grid">
                <div>
                  <label className="form-label" htmlFor="application-email">Email address</label>
                  <input
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="application-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div>
                  <label className="form-label" htmlFor="application-course">Enquiry service</label>
                  <select 
                    className={`form-select ${errors.course ? 'is-invalid' : ''}`} 
                    id="application-course" 
                    name="course" 
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                    <option value="Business ERP">Business ERP</option>
                    <option value="Resume Guidance">Resume Guidance</option>
                    <option value="ATS Support">ATS Support</option>
                    <option value="Freelancing Services">Freelancing Services</option>
                    <option value="General Service Enquiry">General Service Enquiry</option>
                  </select>
                  {errors.course && <div className="invalid-feedback">{errors.course}</div>}
                </div>
              </div>

              <div className="field-grid">
                <div>
                  <label className="form-label" htmlFor="application-start-date">Preferred support date</label>
                  <input
                    className="form-control"
                    id="application-start-date"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="application-address">Location / address</label>
                  <input
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    id="application-address"
                    name="address"
                    type="text"
                    placeholder="City, area, office, or full address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="application-enquiry">Service enquiry</label>
                <textarea
                  className={`form-control ${errors.enquiry ? 'is-invalid' : ''}`}
                  id="application-enquiry"
                  name="enquiry"
                  rows="4"
                  placeholder="Tell us which service you need and how we can help"
                  value={formData.enquiry}
                  onChange={handleInputChange}
                  required
                ></textarea>
                {errors.enquiry && <div className="invalid-feedback">{errors.enquiry}</div>}
              </div>

              <div className="inline-note">
                Your service enquiry details are emailed to our team and also cached in this
                browser until the submission succeeds.
              </div>

              <div className="form-actions">
                <button className="btn btn-brand" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send service enquiry'}
                </button>
                <Link className="btn btn-outline-secondary" to="/programmes">Explore programmes</Link>
              </div>
              
              {status.text && (
                <p 
                  id="application-status" 
                  className={`form-status ${status.type === 'success' ? 'status-success' : status.type === 'error' ? 'status-error' : ''}`} 
                  aria-live="polite"
                >
                  {status.text}
                </p>
              )}
            </form>
          </section>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="cta-banner reveal">
            <div>
              <span className="kicker">Start now</span>
              <h2>Need a service, a programme, or both?</h2>
              <p>
                Tell us what you are trying to achieve and we will help you choose the right
                support path without making the process complicated.
              </p>
            </div>
            <div className="form-actions">
              <a className="btn btn-brand" href="#service-contact">Service contact</a>
              <Link className="btn btn-outline-light-soft" to="/programmes">Explore programmes</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
