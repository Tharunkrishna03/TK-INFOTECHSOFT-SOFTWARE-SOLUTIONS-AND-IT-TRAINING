import React from 'react';

export default function About() {
  return (
    <main className="page-shell">
      <section className="page-hero">
       
      </section>

      <section className="section-space">
        <div className="site-container about-layout">
          <aside className="leader-card reveal">
            <img
              className="leader-photo"
              src="/Gemini_Generated_Image_37ybzm37ybzm37yb.png"
              alt="Portrait of D. Tharun Krishna"
              loading="lazy"
            />
            <div className="leader-meta">
              <h2>D. Tharun Krishna</h2>
              <p>Founder - TK-INFOTECHSOFT</p>
              <p>Training Partner of MC-TECH Industrial School</p>
            </div>
            <div className="social-links" aria-label="Social profiles">
              <a
                href="https://www.instagram.com/tharuntk_d/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram profile"
              >
                <i className="bx bxl-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/tharun-krishna-d-35a6a632b/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
              >
                <i className="bx bxl-linkedin-square"></i>
              </a>
            </div>
          </aside>

          <section className="story-card reveal" id="mission">
            <span className="kicker">Founder&apos;s note</span>
            <h2>Building practical learning paths for modern careers</h2>
            <p>
              As the Founder of TK-INFOTECHSOFT, a training partner of MC-TECH Industrial School,
              I am committed to helping students and working professionals build the skills needed
              for today&apos;s fast-evolving IT landscape. My background in computer applications,
              machine learning, full stack development, and UI/UX design shaped a learning
              environment that values both strong fundamentals and real implementation.
            </p>
            <p>
              The goal of TK-INFOTECHSOFT is simple: reduce the gap between what industry expects
              and what learners confidently deliver. That means practical training, project
              experience, mentorship, and a learning experience that feels supportive instead of
              overwhelming, while responsibly presenting our role as a training partner of
              MC-TECH Industrial School.
            </p>
            <div className="value-grid">
              <article className="value-card reveal">
                <h3>Practical learning</h3>
                <p>
                  Courses focus on applying skills through projects, guided tasks, and real
                  examples.
                </p>
              </article>
              <article className="value-card reveal">
                <h3>Career readiness</h3>
                <p>
                  We help learners build resumes, confidence, and better preparation for
                  interviews, certifications, and career starts.
                </p>
              </article>
              <article className="value-card reveal">
                <h3>Supportive mentoring</h3>
                <p>
                  Questions, feedback, and one-to-one guidance are part of the experience, not an
                  afterthought.
                </p>
              </article>
            </div>
          </section>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="surface-panel reveal">
            <div className="section-intro mb-0">
              <span className="kicker">What we stand for</span>
              <h2>Technology education and career services that feel clear, relevant, and encouraging</h2>
              <p>
                We aim to create a space where learners can build strong technical foundations,
                explore current tools, and move toward meaningful opportunities with more
                confidence through both education and service support.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
