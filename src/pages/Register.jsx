import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  publicKey: "Nw-A_RtWpccfLfDE1",
  serviceId: "service_tuvi97l",
  templateId: "template_vxbtcnh",
};

const PRIMARY_EMAIL = "tkinfotechsoft@gmail.com";

export default function Register() {
  const [searchParams] = useSearchParams();
  const urlCourse = searchParams.get('course') || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    startDate: '',
    address: '',
    enquiry: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse query course and load cache
  useEffect(() => {
    // 1. Initial preselection from URL
    if (urlCourse) {
      setFormData((prev) => ({ ...prev, course: urlCourse }));
    }

    // 2. Override with local storage cache if present
    try {
      const saved = localStorage.getItem('tkApplication');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error('Storage read error:', e);
    }
  }, [urlCourse]);

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
    const subject = `Course registration from ${payload.name}`;
    const body = `TK-INFOTECHSOFT course registration\n\nName: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email}\nAddress: ${payload.address}\nEnquiry topic: ${payload.course}\nPreferred start date: ${payload.startDate || 'Not provided'}\nEnquiry: ${payload.enquiry}`;
    window.location.href = `mailto:${PRIMARY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus({ text: 'Please check the form for errors.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ text: 'Sending your registration...', type: '' });

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

    const emailSubject = `Course registration from ${payload.name}`;
    const emailBody = `TK-INFOTECHSOFT course registration\n\nName: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email}\nAddress: ${payload.address}\nEnquiry topic: ${payload.course}\nPreferred start date: ${payload.startDate || 'Not provided'}\nEnquiry: ${payload.enquiry}`;

    try {
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
        text: 'Registration sent successfully. We will contact you soon.',
        type: 'success'
      });
    } catch (error) {
      console.error('Application email error:', error);
      openMailClient(payload);
      setStatus({
        text: 'Your email app was opened so you can continue the course registration, and your details are still saved on this device.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="page-hero">
        <div className="site-container">
          <span className="eyebrow"><i className="bx bxs-send"></i> Course with Certificate</span>
          <h1>Register - Limited Seats Only.</h1>
          <p>
            Use this form to register for a course with certificate, request counselling, or
            tell us which programme you are interested in. The form saves your details on this
            device for convenience and sends your submitted registration by email.
          </p>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container application-layout">
          <section className="application-card reveal" id="apply">
            <span className="kicker">Registration form</span>
            <h2>course registration and counselling</h2>
            <p>
              Fill in the details below so we can understand your interest area and preferred
              timeline.
            </p>

            {urlCourse && (
              <div className="inline-note" id="selected-track-note">
                Selected option: {urlCourse}. You can change it before sending the form.
              </div>
            )}

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
                  <label className="form-label" htmlFor="application-course">Select a course</label>
                  <select 
                    className={`form-select ${errors.course ? 'is-invalid' : ''}`} 
                    id="application-course" 
                    name="course" 
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a course</option>
                    <option value="Python Full Stack">Python Full Stack</option>
                    <option value="Java Full Stack">Java Full Stack</option>
                    <option value="MERN Stack">MERN Stack</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="AWS &amp; Cloud Foundations">AWS &amp; Cloud Foundations</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Career Counselling">Career Counselling</option>
                  </select>
                  {errors.course && <div className="invalid-feedback">{errors.course}</div>}
                </div>
              </div>

              <div className="field-grid">
                <div>
                  <label className="form-label" htmlFor="application-start-date">Preferred start date</label>
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
                  <label className="form-label" htmlFor="application-address">Address</label>
                  <input
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    id="application-address"
                    name="address"
                    type="text"
                    placeholder="City, area, or full address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="application-enquiry">Enquiry</label>
                <textarea
                  className={`form-control ${errors.enquiry ? 'is-invalid' : ''}`}
                  id="application-enquiry"
                  name="enquiry"
                  rows="4"
                  placeholder="Tell us your goal, preferred programme, or any questions"
                  value={formData.enquiry}
                  onChange={handleInputChange}
                  required
                ></textarea>
                {errors.enquiry && <div className="invalid-feedback">{errors.enquiry}</div>}
              </div>

              <div className="inline-note">
                Your registration details are emailed to our team and also cached in this browser
                until the submission succeeds.
              </div>

              <div className="form-actions">
                <button className="btn btn-brand" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send registration'}
                </button>
                <Link className="btn btn-outline-secondary" to="/">Back to home</Link>
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

          <aside className="info-panel reveal">
            <span className="kicker">What happens next</span>
            <h2>We make the process simple</h2>
            <p>
              Once you share your details, you can use the contact section below to ask
              questions, clarify programmes, or request direct guidance.
            </p>
            <ul className="checklist">
              <li>
                <i className="bx bxs-check-circle"></i>
                <span>Choose the learning path or role you want to move toward.</span>
              </li>
              <li>
                <i className="bx bxs-check-circle"></i>
                <span>Save your form details locally so they stay available on this device.</span>
              </li>
              <li>
                <i className="bx bxs-check-circle"></i>
                <span>Send a quick enquiry below if you need programme or certificate guidance.</span>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
