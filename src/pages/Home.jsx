import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-section">
        <video className="hero-video" autoPlay muted loop playsInline preLoad="metadata" aria-hidden="true">
          <source src="/3129957-uhd_3840_2160_25fps.mp4" type="video/mp4" />
        </video>
        <div className="hero-backdrop"></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><i className="bx bxs-rocket"></i> Course with Certificate</span>
            <h1>Bridge the gap between college and your career.</h1>
            <p>
              Learn through job-ready education, then use our services for resumes, ATS,
              course registration, and digital growth so your progress feels complete from
              learning to action.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-brand btn-lg" to="/programmes">Explore programmes</Link>
              <Link className="btn btn-outline-light-soft btn-lg" to="/register">
                Register
              </Link>
            </div>
            <div className="stats-grid">
              <article className="stat-card reveal">
                <span className="stat-number" data-count-to="1000" data-suffix="+">0+</span>
                <span className="stat-label">Students trained</span>
              </article>
              <article className="stat-card reveal">
                <span className="stat-number" data-count-to="95" data-suffix="%">0%</span>
                <span className="stat-label">Success-focused outcomes</span>
              </article>
              <article className="stat-card reveal">
                <span className="stat-number" data-count-to="100" data-suffix="+">0+</span>
                <span className="stat-label">Company-ready pathways</span>
              </article>
            </div>
          </div>

          <aside className="hero-card reveal" aria-label="Highlights">
            <h2>Why learners choose TK-INFOTECHSOFT</h2>
            <p>
              TK-INFOTECHSOFT is a training partner of MC-TECH Industrial School, connecting
              education and services so learners can build skills and move toward real opportunities.
            </p>
            <ul className="info-list">
              <li>
                <i className="bx bxs-badge-check"></i>
                <span>Live mentor-led sessions with guidance you can actually use.</span>
              </li>
              <li>
                <i className="bx bxs-briefcase"></i>
                <span>Portfolio projects and interview-focused practice built into learning.</span>
              </li>
              <li>
                <i className="bx bxs-graduation"></i>
                <span>Career support for resumes, ATS readiness, and course registration.</span>
              </li>
            </ul>
          </aside>
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
