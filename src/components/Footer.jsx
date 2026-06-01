import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  publicKey: "Ou_qu_feu12sSNEkc",
  serviceId: "service_tpuqps7",
  templateId: "template_ln9myvv",
};

const PRIMARY_EMAIL = "tkinfotechsoft@gmail.com";

export default function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    if (!formData.email.trim()) {
      newErrors.email = 'This field is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'This field is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openMailClient = (name, email, message) => {
    const subject = `Website enquiry from ${name}`;
    const body = `Quick enquiry from TK-INFOTECHSOFT website\n\nName: ${name}\nEmail: ${email}\nEnquiry: ${message}`;
    window.location.href = `mailto:${PRIMARY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus({ text: 'Please check the form for errors.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ text: 'Sending your enquiry...', type: '' });

    const emailBody = `Quick enquiry from TK-INFOTECHSOFT website\n\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nEnquiry: ${formData.message.trim()}`;

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: formData.name.trim(),
          email_id: formData.email.trim(),
          reply_to: formData.email.trim(),
          to_email: PRIMARY_EMAIL,
          message: emailBody,
        },
        {
          publicKey: EMAILJS_CONFIG.publicKey,
        }
      );

      setFormData({ name: '', email: '', message: '' });
      setStatus({ text: 'Thanks. Your enquiry was sent successfully.', type: 'success' });
    } catch (error) {
      console.error('EmailJS error:', error);
      openMailClient(formData.name.trim(), formData.email.trim(), formData.message.trim());
      setStatus({
        text: 'Email sending failed in-browser, so your mail app was opened as a fallback.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <p>
              TK-INFOTECHSOFT is a training partner of MC-TECH Industrial School, delivering
              career-focused IT training with mentor support and practical project guidance.
            </p>
            <div className="contact-pair">
              <i className="bx bxs-phone-call"></i>
              <div>
                <a href="tel:+919597151915">+91 95971 51915</a><br />
                <a href="tel:+9188707084318">+91 88707084318</a>
              </div>
            </div>
            <div class="contact-pair">
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
              <li><Link to="/services#app-development" onClick={(e) => handleAnchorClick(e, '/services', 'app-development')}>App Development</Link></li>
              <li><Link to="/services#business-erp" onClick={(e) => handleAnchorClick(e, '/services', 'business-erp')}>Business ERP</Link></li>
              <li><Link to="/services#resume-guidance" onClick={(e) => handleAnchorClick(e, '/services', 'resume-guidance')}>Resume guidance</Link></li>
              <li><Link to="/services#ats-support" onClick={(e) => handleAnchorClick(e, '/services', 'ats-support')}>ATS support</Link></li>
              <li><Link to="/services#course-registration" onClick={(e) => handleAnchorClick(e, '/services', 'course-registration')}>Course registration</Link></li>
              <li><Link to="/about">Mentoring model</Link></li>
              <li><Link to="/#why-us" onClick={(e) => handleAnchorClick(e, '/', 'why-us')}>Facilities and support</Link></li>
            </ul>
          </section>

          <section className="footer-card reveal">
            <h3>Quick enquiry</h3>
            <form id="contact-form" className="contact-form" onSubmit={handleSubmit} noValidate>
              <div>
                <label className="form-label" htmlFor="contact-name">Name</label>
                <input
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              <div>
                <label className="form-label" htmlFor="contact-email">Email</label>
                <input
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="contact-email"
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
                <label className="form-label" htmlFor="contact-message">Enquiry</label>
                <textarea
                  className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                  id="contact-message"
                  name="message"
                  rows="4"
                  placeholder="Tell us what you need help with"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
                {errors.message && <div className="invalid-feedback">{errors.message}</div>}
              </div>
              <button className="btn btn-brand" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send enquiry'}
              </button>
              {status.text && (
                <p 
                  id="contact-form-status" 
                  className={`form-status ${status.type === 'success' ? 'status-success' : status.type === 'error' ? 'status-error' : ''}`} 
                  aria-live="polite"
                >
                  {status.text}
                </p>
              )}
            </form>
          </section>
        </div>

        <p className="footer-note">
          TK-INFOTECHSOFT - Training Partner of MC-TECH Industrial School. Copyright &copy; 2026. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
