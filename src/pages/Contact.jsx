import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  publicKey: "Ou_qu_feu12sSNEkc",
  serviceId: "service_tpuqps7",
  templateId: "template_ln9myvv",
};

const PRIMARY_EMAIL = "tkinfotechsoft@gmail.com";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ text: '', type: '' });
  const [toast, setToast] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!toast) return undefined;

    const toastTimeout = window.setTimeout(() => {
      setToast('');
    }, 3600);

    return () => window.clearTimeout(toastTimeout);
  }, [toast]);

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
      setToast('Thanks. Your enquiry was sent successfully.');
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

  return (
    <main className="page-shell">
      {toast && (
        <div className="toast-notification" role="status" aria-live="polite">
          {toast}
        </div>
      )}
      <section className="contact-first-view">
        <div className="site-container contact-first-view-grid">
          <section className="contact-form-panel reveal">
            <h4>Quick enquiry</h4>
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

          <aside className="contact-details-panel reveal" aria-label="TK-INFOTECHSOFT contact details">
            <h3>TK-INFOTECHSOFT</h3>
            <div className="contact-details-list">
              <a href="tel:+919597151915">+91 95971 51915</a>
              <a href="tel:+9188707084318">+91 88707084318</a>
              <a href="mailto:tkinfotechsoft@gmail.com">tkinfotechsoft@gmail.com</a>
              <a href="mailto:dtharunkrishna65@gmail.com">dtharunkrishna65@gmail.com</a>
            </div>
            <address>
              <strong>TK-INFOTECHSOFT</strong><br />
              (Training Partner of MC-TECH Industrial School)<br />
              MKP Nagar, MC-TECH Campus,<br />
              Kottur, Malayandi Pattinam,<br />
              Anaimalai Tk, Coimbatore District - 642007
            </address>
          </aside>
        </div>
      </section>
    </main>
  );
}
