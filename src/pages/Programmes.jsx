import React from 'react';
import { Link } from 'react-router-dom';

export default function Programmes() {
  const handleAnchorClick = (e, elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="page-shell">
      <section className="page-hero">
        <div className="site-container">
          <span className="eyebrow"><i className="bx bxs-book-open"></i> Programmes</span>
          <h1>Programmes designed to build practical, employable skills.</h1>
          <p>
            Choose from career-focused tracks that combine learning, guided projects, mentoring,
            and connected services like ATS, resume, and course guidance so progress feels complete.
          </p>
        </div>
      </section>

      <section className="section-space" id="course-catalogue">
        <div className="site-container">
          <div className="section-intro">
            <span className="kicker">Course with Certificate</span>
            <h2>Register- Limited Seats Only</h2>
            <p>
              Each programme is structured around concepts, implementation, and confidence-building
              practice rather than passive learning.
            </p>
          </div>

          <div className="programme-grid">
            <article className="programme-card reveal">
              <div className="feature-icon"><i className="bx bxl-python"></i></div>
              <h3>Python Full Stack</h3>
              <p>
                Build web applications using Python, frontend fundamentals, and backend
                workflows with project-based guidance.
              </p>
              <div className="programme-meta">
                <span className="meta-chip">Projects</span>
                <span className="meta-chip">Mentoring</span>
                <span className="meta-chip">Career prep</span>
              </div>
              <Link className="card-link" to="/register?course=Python Full Stack">
                Register for this course <i className="bx bx-right-arrow-alt"></i>
              </Link>
            </article>

            <article className="programme-card reveal">
              <div className="feature-icon"><i className="bx bxl-java"></i></div>
              <h3>Java Full Stack</h3>
              <p>
                Learn Java-based application development with frontend integration, databases,
                and workflow-driven practice.
              </p>
              <div className="programme-meta">
                <span className="meta-chip">Enterprise focus</span>
                <span className="meta-chip">Hands-on tasks</span>
                <span className="meta-chip">Interview readiness</span>
              </div>
              <Link className="card-link" to="/register?course=Java Full Stack">
                Register for this course <i className="bx bx-right-arrow-alt"></i>
              </Link>
            </article>

            <article className="programme-card reveal">
              <div className="feature-icon"><i className="bx bxl-react"></i></div>
              <h3>MERN Stack</h3>
              <p>
                Create full stack applications with MongoDB, Express, React, and Node.js while
                strengthening modern web development habits.
              </p>
              <div className="programme-meta">
                <span className="meta-chip">Portfolio projects</span>
                <span className="meta-chip">API practice</span>
                <span className="meta-chip">Frontend + backend</span>
              </div>
              <Link className="card-link" to="/register?course=MERN Stack">
                Register for this course <i className="bx bx-right-arrow-alt"></i>
              </Link>
            </article>

            <article className="programme-card reveal">
              <div className="feature-icon"><i className="bx bxs-palette"></i></div>
              <h3>UI/UX Design</h3>
              <p>
                Learn interface design, user journeys, layout systems, and practical thinking
                for digital products that feel easier to use.
              </p>
              <div className="programme-meta">
                <span className="meta-chip">Design thinking</span>
                <span className="meta-chip">Portfolio support</span>
                <span className="meta-chip">Visual systems</span>
              </div>
              <Link className="card-link" to="/register?course=UI/UX Design">
                Register for this course <i className="bx bx-right-arrow-alt"></i>
              </Link>
            </article>

            <article className="programme-card reveal">
              <div className="feature-icon"><i className="bx bxs-cloud"></i></div>
              <h3>AWS &amp; Cloud Foundations</h3>
              <p>
                Understand cloud basics, deployment concepts, and practical platform workflows
                that support real-world development teams.
              </p>
              <div className="programme-meta">
                <span className="meta-chip">Cloud basics</span>
                <span className="meta-chip">Dev workflows</span>
                <span className="meta-chip">Career guidance</span>
              </div>
              <Link className="card-link" to="/register?course=AWS & Cloud Foundations">
                Register for this course <i className="bx bx-right-arrow-alt"></i>
              </Link>
            </article>

            <article className="programme-card reveal">
              <div className="feature-icon"><i className="bx bxs-megaphone"></i></div>
              <h3>Digital Marketing</h3>
              <p>
                Build a foundation in content strategy, campaigns, and digital growth skills for
                modern business environments.
              </p>
              <div className="programme-meta">
                <span className="meta-chip">Campaign basics</span>
                <span className="meta-chip">Content skills</span>
                <span className="meta-chip">Practical roadmap</span>
              </div>
              <Link className="card-link" to="/register?course=Digital Marketing">
                Register for this course <i className="bx bx-right-arrow-alt"></i>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space" id="partner-network">
        <div className="site-container">
          <div className="section-intro">
            <span className="kicker">Career direction</span>
            <h2>Learning paths shaped around top company expectations</h2>
            <p>
              We help learners prepare for the skills, project standards, and communication habits
              expected by strong tech teams.
            </p>
          </div>

          <div className="partner-grid">
            <div className="partner-tile reveal">
              <img src="/Amazon-CF90nFBW.png" alt="Amazon logo" loading="lazy" />
            </div>
            <div className="partner-tile reveal">
              <img src="/HCL-BasrQWFD.png" alt="HCL logo" loading="lazy" />
            </div>
            <div className="partner-tile reveal">
              <img src="/Accenture-BHehTV0h.png" alt="Accenture logo" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="cta-banner reveal">
            <div>
              <h2>Not sure which course fits you best?</h2>
              <p>
                Share your interest area and we can guide you toward the track that matches your
                goals, background, and comfort level.
              </p>
            </div>
            <Link className="btn btn-brand btn-lg" to="/register?course=Career Counselling">
              Register
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
