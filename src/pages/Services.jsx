import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  publicKey: "Nw-A_RtWpccfLfDE1",
  serviceId: "service_tuvi97l",
  templateId: "template_vxbtcnh",
};

const PRIMARY_EMAIL = "tkinfotechsoft@gmail.com";

export default function Services() {
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
      <section className="page-hero">
        <div className="site-container">
          <span className="eyebrow"><i className="bx bxs-briefcase-alt-2"></i> Services</span>
          <h1>Services that move your learning, profile, and career plans forward.</h1>
          <p>
            Our services work alongside education pathways, so learners and businesses can move
            from skill-building to profile growth, digital execution, and career action in one place.
          </p>
        </div>
      </section>

      <section className="section-space" id="services-catalogue">
        <div className="site-container">
          <div className="section-intro">
            <span className="kicker">Services catalogue</span>
            <h2>Choose the service that fits your next move</h2>
            <p>
              Each service below explains where it helps, what you receive, and how the work is
              delivered so you can compare options quickly.
            </p>
          </div>

          <div className="services-detail-list">
            <article className="service-detail reveal" id="web-development">
              <div className="service-detail-content">
                <span className="service-detail-index">01</span>
                <div className="feature-icon"><i className="bx bx-code-curly"></i></div>
                <h3>Web Development</h3>
                <p className="service-detail-copy">
                  Business websites and landing pages are built to present your brand clearly,
                  load smoothly, and guide visitors toward enquiries, calls, or conversions.
                </p>
                <div className="programme-meta">
                  <span className="meta-chip">Responsive builds</span>
                  <span className="meta-chip">Modern UI</span>
                  <span className="meta-chip">Business-ready</span>
                </div>
                <ul className="service-detail-points checklist">
                  <li><i className="bx bxs-check-circle"></i><span>Business websites, portfolio pages, and campaign landing pages designed for desktop and mobile use.</span></li>
                  <li><i className="bx bxs-check-circle"></i><span>Layout structure, content flow, and visual hierarchy shaped to make your offer easier to understand.</span></li>
                  <li><i className="bx bxs-check-circle"></i><span>Performance-minded builds with cleaner sections, stronger calls to action, and practical maintenance support.</span></li>
                </ul>
                <a className="card-link" href="#service-contact">Request web support <i className="bx bx-right-arrow-alt"></i></a>
              </div>
            </article>

            <article className="service-detail reveal" id="app-development">
              <div className="service-detail-content">
                <span className="service-detail-index">02</span>
                <div className="feature-icon"><i className="bx bx-mobile-alt"></i></div>
                <h3>App Development</h3>
                <p className="service-detail-copy">
                  App ideas are shaped into usable product flows with attention to screens,
                  user actions, and the practical steps needed for delivery.
                </p>
                <div className="programme-meta">
                  <span className="meta-chip">Product thinking</span>
                  <span className="meta-chip">UX support</span>
                  <span className="meta-chip">Delivery guidance</span>
                </div>
                <ul className="service-detail-points checklist">
                  <li><i className="bx bxs-check-circle"></i><span>Screen planning and interaction flow for service apps, internal tools, or customer-facing products.</span></li>
                  <li><i className="bx bxs-check-circle"></i><span>Feature prioritization so the first version stays focused on what users actually need.</span></li>
                  <li><i className="bx bxs-check-circle"></i><span>Guidance on interface consistency, handoff clarity, and scalable product direction.</span></li>
                </ul>
                <a className="card-link" href="#service-contact">Discuss your app idea <i className="bx bx-right-arrow-alt"></i></a>
              </div>
            </article>

            <article className="service-detail reveal" id="business-erp">
              <div className="service-detail-content">
                <span className="service-detail-index">03</span>
                <div className="feature-icon"><i className="bx bx-buildings"></i></div>
                <h3>Business ERP</h3>
                <p className="service-detail-copy">
                  Operational workflows become easier to manage through better process visibility,
                  cleaner mapping, and more organized systems support.
                </p>
                <div className="programme-meta">
                  <span className="meta-chip">Process mapping</span>
                  <span className="meta-chip">Business systems</span>
                  <span className="meta-chip">Workflow clarity</span>
                </div>
                <ul className="service-detail-points checklist">
                  <li><i className="bx bxs-check-circle"></i><span>Review of current business flow to identify delays, manual repetition, and reporting gaps.</span></li>
                  <li><i className="bx bxs-check-circle"></i><span>ERP-oriented planning for sales, inventory, operations, or coordination-heavy tasks.</span></li>
                  <li><i className="bx bxs-check-circle"></i><span>Recommendations focused on structure, accountability, and easier day-to-day tracking.</span></li>
                </ul>
                <a className="card-link" href="#service-contact">Talk ERP needs <i className="bx bx-right-arrow-alt"></i></a>
              </div>
            </article>

            <article className="service-detail reveal" id="resume-guidance">
              <div className="service-detail-content">
                <span className="service-detail-index">04</span>
                <div className="feature-icon"><i className="bx bxs-file-doc"></i></div>
                <h3>Resume Guidance</h3>
                <p className="service-detail-copy">
                  Resume guidance focuses on making your strengths, projects, and role fit easier
                  for recruiters to scan and understand.
                </p>
                <div className="programme-meta">
                  <span className="meta-chip">Resume polish</span>
                  <span className="meta-chip">Project framing</span>
                  <span className="meta-chip">Role alignment</span>
                </div>
                <ul className="service-detail-points checklist">
                  <li><i className="bx bxs-check-circle"></i><span>Content restructuring that highlights skills, coursework, academic projects, and measurable effort.</span></li>
                  <li><i className="bx bxs-check-circle"></i><span>Stronger wording for summaries, experience lines, and project descriptions without overclaiming.</span></li>
                  <li><i className="bx bxs-check-circle"></i><span>Cleaner role targeting for fresher and entry-level applications.</span></li>
                </ul>
                <a className="card-link" href="#service-contact">Upgrade your resume <i className="bx bx-right-arrow-alt"></i></a>
              </div>
            </article>

            <article className="service-detail reveal" id="ats-support">
              <div className="service-detail-content">
                <span className="service-detail-index">05</span>
                <div className="feature-icon"><i className="bx bxs-file-find"></i></div>
                <h3>ATS Support</h3>
                <p className="service-detail-copy">
                  ATS support improves how your resume is read by screening systems through tighter
                  keywords, stronger structure, and cleaner formatting choices.
                </p>
                <div className="programme-meta">
                  <span className="meta-chip">ATS optimization</span>
                  <span className="meta-chip">Keyword strategy</span>
                  <span className="meta-chip">Cleaner structure</span>
                </div>
                <ul className="service-detail-points checklist">
                  <li><i className="bx bxs-check-circle"></i><span>Keyword alignment based on the roles you want instead of generic stuffing.</span></li>
                  <li><i className="bx bxs-check-circle"></i><span>Formatting cleanup that reduces parsing issues and keeps section labels easy to identify.</span></li>
                  <li><i className="bx bxs-check-circle"></i><span>Profile tuning for better matching in job portals and recruiter search workflows.</span></li>
                </ul>
                <a className="card-link" href="#service-contact">Improve ATS fit <i className="bx bx-right-arrow-alt"></i></a>
              </div>
            </article>

            <article className="service-detail service-detail-featured reveal" id="freelancing-services">
              <div className="service-detail-content">
                <span className="service-detail-index">07</span>
                <span className="service-detail-badge">Freelancer Focus</span>
                <div className="feature-icon"><i className="bx bx-briefcase-alt"></i></div>
                <h3>Freelancing Services</h3>
                <p className="service-detail-copy">
                  Freelancers get help presenting their work better, packaging services clearly,
                  and handling client-facing communication with more confidence.
                </p>
                <div className="programme-meta">
                  <span className="meta-chip">Portfolio setup</span>
                  <span className="meta-chip">Client proposals</span>
                  <span className="meta-chip">Delivery support</span>
                </div>
                <ul className="service-detail-points checklist">
                  <li><i className="bx bxs-check-circle"></i><span>Portfolio and service positioning for designers, developers, marketers, and student freelancers.</span></li>
                  <li><i className="bx bxs-check-circle"></i><span>Proposal guidance, pricing clarity, and better project communication with potential clients.</span></li>
                  <li><i className="bx bxs-check-circle"></i><span>Support for presenting deliverables professionally and building repeat-work credibility.</span></li>
                </ul>
                <a className="card-link" href="#service-contact">Start freelancing support <i className="bx bx-right-arrow-alt"></i></a>
              </div>
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
