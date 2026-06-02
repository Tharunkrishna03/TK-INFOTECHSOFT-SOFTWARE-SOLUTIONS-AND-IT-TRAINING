import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const whyHighlights = [
    {
      icon: 'bx bxs-user-voice',
      title: 'Mentor Guidance',
      text: 'Live mentor-led sessions with guidance you can actually use.'
    },
    {
      icon: 'bx bxs-briefcase',
      title: 'Portfolio Practice',
      text: 'Portfolio projects and interview-focused practice built into learning.'
    },
    {
      icon: 'bx bxs-file-doc',
      title: 'Career Support',
      text: 'Career support for resumes, ATS readiness, and course registration.'
    },
    {
      icon: 'bx bxs-devices',
      title: 'Web Development',
      text: 'From career training to custom web development, we provide end-to-end solutions designed for growth. Our focus on quality, innovation, and real-world results ensures value for both learners and businesses.'
    },
    {
      icon: 'bx bxs-dashboard',
      title: 'Business ERP',
      text: 'Built with flexibility and performance in mind, our product streamlines workflows, centralizes business processes, and delivers real-time insights. It adapts to your needs, helping you work smarter and achieve better results.'
    }
  ];

  const [activeWhy, setActiveWhy] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveWhy((current) => (current + 1) % whyHighlights.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [whyHighlights.length]);

  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="hero-backdrop"></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><i className="bx bxs-rocket"></i> Courses & Software solutions</span>
            <h1>
              Developing talent and
              
              delivering <br/><span className="typing-word">Technology
                </span>.
            </h1>
            <p>Building skills, developing solutions, achieving success.</p>
            
            <div className="hero-actions">
              <Link className="btn btn-brand btn-lg" to="/programmes">Explore programmes</Link>
              <Link className="btn btn-outline-light-soft btn-lg" to="/register">
                Register
              </Link>
            </div>
            
          </div>

          <div className="hero-visual reveal" aria-hidden="true">
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="hero-highlights" aria-label="Why choose TK-INFOTECHSOFT">
        <div className="site-container">
          <div className="why-template-head reveal">
            <span></span>
            <h2>Why Choose ?
             <br/> <span className="why-brand-word">TK-INFOTECHSOFT</span></h2>
            <p>
              We bridge the gap between education, careers, and digital growth through training,
              career support, and technology services.
            </p>
          </div>

          <div className="why-template-grid">
            <div className="why-orbit reveal">
              <div className="why-orbit-ring"></div>
              <div className="why-orbit-center">
                <h3>{whyHighlights[activeWhy].title}</h3>
                <p>{whyHighlights[activeWhy].text}</p>
              </div>
              {whyHighlights.map((item, index) => (
                <button
                  className={`why-orbit-icon why-orbit-icon-${index + 1} ${activeWhy === index ? 'is-active' : ''}`}
                  type="button"
                  key={item.title}
                  aria-label={item.text}
                  aria-pressed={activeWhy === index}
                  onClick={() => setActiveWhy(index)}
                  onFocus={() => setActiveWhy(index)}
                  onMouseEnter={() => setActiveWhy(index)}
                >
                  <i className={item.icon}></i>
                </button>
              ))}
            </div>

            <div className="why-metrics reveal">
              <article>
                <strong>1000<span>+</span></strong>
                <p>Students trained</p>
              </article>
              <article>
                <strong>95<span>%</span></strong>
                <p>Success-focused outcomes</p>
              </article>
              <article>
                <strong>100<span>+</span></strong>
                <p>Company-ready pathways</p>
              </article>
              <article>
                <strong>5<span>+</span></strong>
                <p>Career and digital services</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space trust-strip">
        <div className="site-container">
          <div className="section-intro">
            <span className="kicker">Recognitions</span>
            <h2>Backed by trusted education and startup ecosystems</h2>
            <p>
              These recognitions reflect our focus on structured learning and practical career
              readiness.
            </p>
          </div>
          <div className="logo-cloud">
            <div className="logo-badge reveal">
              <img src="/web.webp" alt="ISO certification logo" loading="lazy" />
            </div>
            <div className="logo-badge reveal">
              <img src="/app.webp" alt="MCA logo" loading="lazy" />
            </div>
            <div className="logo-badge reveal">
              <img src="/res.webp" alt="Nasscom logo" loading="lazy" />
            </div>
            <div className="logo-badge reveal">
              <img src="/intern.webp" alt="Startup India logo" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-space" id="offerings">
        <div className="site-container">
          <div className="section-intro">
            <span className="kicker">What we offer</span>
            <h2>Career tools and programmes built for faster growth</h2>
            <p>
              We focus on practical support that helps learners improve skills, present
              themselves better, and get closer to real job opportunities.
            </p>
          </div>

          <div className="surface-panel">
            <div className="row g-3">
              <div className="col-md-6 col-xl-4">
                <article className="feature-card reveal">
                  <div className="feature-icon"><i className="bx bxs-group"></i></div>
                  <h3>Fellowship support</h3>
                  <p>
                    Structured mentoring, regular guidance, and accountability to keep your
                    learning journey on track.
                  </p>
                  <Link className="card-link" to="/register">Start your journey <i className="bx bx-right-arrow-alt"></i></Link>
                </article>
              </div>
              <div className="col-md-6 col-xl-4">
                <article className="feature-card reveal">
                  <div className="feature-icon"><i className="bx bxs-book-content"></i></div>
                  <h3>Job-ready courses</h3>
                  <p>
                    Learn full stack development, UI/UX, cloud, and other skills through
                    hands-on practice instead of theory alone.
                  </p>
                  <Link className="card-link" to="/programmes">See all programmes <i className="bx bx-right-arrow-alt"></i></Link>
                </article>
              </div>
              <div className="col-md-6 col-xl-4">
                <article className="feature-card reveal">
                  <div className="feature-icon"><i className="bx bxs-file-find"></i></div>
                  <h3>ATS resume review</h3>
                  <p>
                    Improve how your resume performs in screening systems and make your profile
                    easier for recruiters to shortlist.
                  </p>
                  <Link className="card-link" to="/services#ats-support">Request guidance <i className="bx bx-right-arrow-alt"></i></Link>
                </article>
              </div>
              <div className="col-md-6 col-xl-4">
                <article className="feature-card reveal">
                  <div className="feature-icon"><i className="bx bxs-file-doc"></i></div>
                  <h3>Resume builder</h3>
                  <p>
                    Shape your projects, achievements, and technical skills into a cleaner,
                    more professional resume.
                  </p>
                  <Link className="card-link" to="/services#resume-guidance">Get support <i className="bx bx-right-arrow-alt"></i></Link>
                </article>
              </div>
              <div className="col-md-6 col-xl-4">
                <article className="feature-card reveal">
                  <div className="feature-icon"><i className="bx bxs-briefcase-alt-2"></i></div>
                  <h3>course registration</h3>
                  <p>
                    Learn how to choose the right course with certificate and register before
                    limited seats close.
                  </p>
                  <Link className="card-link" to="/services#course-registration">Register with confidence <i className="bx bx-right-arrow-alt"></i></Link>
                </article>
              </div>
              <div className="col-md-6 col-xl-4">
                <article className="feature-card reveal">
                  <div className="feature-icon"><i className="bx bxs-wallet-alt"></i></div>
                  <h3>Salary and role clarity</h3>
                  <p>
                    Understand role expectations, career paths, and salary ranges so your next
                    move feels informed.
                  </p>
                  <Link className="card-link" to="/about">Learn how we guide you <i className="bx bx-right-arrow-alt"></i></Link>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space" id="why-us">
        <div className="site-container">
          <div className="section-intro">
            <span className="kicker">Education + Services</span>
            <h2>Learn the skill, then use the right support to move faster</h2>
            <p>
              TK-INFOTECHSOFT combines practical education with career services so users do not
              have to switch between multiple places to learn, improve, and apply.
            </p>
          </div>

          <div className="reason-grid mb-4">
            <article className="reason-card reveal">
              <h3>Education that builds confidence</h3>
              <p>
                Programmes focus on clear concepts, guided projects, and structured practice for
                learners who want job-ready understanding.
              </p>
            </article>
            <article className="reason-card reveal">
              <h3>Services that improve outcomes</h3>
              <p>
                Resume support, ATS guidance, application strategy, and digital services help
                you use what you learn more effectively.
              </p>
            </article>
            <article className="reason-card reveal">
              <h3>One smoother user journey</h3>
              <p>
                From discovery to action, the site now makes it easier to understand where
                education ends, where services begin, and how both work together.
              </p>
            </article>
          </div>

          <div className="section-intro">
            <span className="kicker">Why choose us</span>
            <h2>Support that feels practical, personal, and career-focused</h2>
            <p>
              Beyond coursework, we help learners build confidence through mentoring,
              facilities, and real practice environments.
            </p>
          </div>

          <div className="reason-grid mb-4">
            <article className="reason-card reveal">
              <h3>Live interactive sessions</h3>
              <p>
                Join real-time classes, ask questions instantly, and get guided support from mentors.
              </p>
            </article>
            <article className="reason-card reveal">
              <h3>AI-powered learning tools</h3>
              <p>
                Practice with modern online tools, coding platforms, and AI assistance from anywhere.
              </p>
            </article>
            <article className="reason-card reveal">
              <h3>Flexible learning from home</h3>
              <p>
                Attend classes, complete projects, and collaborate with peers without location limits.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
