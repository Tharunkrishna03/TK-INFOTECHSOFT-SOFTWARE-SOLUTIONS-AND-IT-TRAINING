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

  const coreServices = [
    { title: 'Web Development', icon: 'bx bx-code-alt' },
    { title: 'Ecommerce Website', icon: 'bx bx-store-alt' },
    { title: 'Business ERP Softwares', icon: 'bx bx-layer' },
    { title: 'CRM', icon: 'bx bx-user-pin' },
    { title: 'Portfolio Website', icon: 'bx bx-id-card' }
  ];

  const workProcesses = {
    software: [
      {
        title: 'Understand the Problem',
        text: 'Collaborate with clients to analyze challenges and define clear, actionable objectives.'
      },
      {
        title: 'Gather Requirements',
        text: 'Collect and refine business requirements to align with the best IT solutions and practices.'
      },
      {
        title: 'Optimize and Support',
        text: 'Continuously monitor, refine, and provide support to ensure seamless operations and sustained growth.'
      }
    ],
    training: [
      {
        title: 'Assess Learning Needs',
        text: "Understand students' goals, current skill levels, and career aspirations to create the right learning path."
      },
      {
        title: 'Deliver Practical Training',
        text: 'Provide industry-focused training through expert instructors, hands-on projects, real-world case studies, and interactive sessions.'
      },
      {
        title: 'Evaluate & Mentor',
        text: 'Track progress with assessments, offer personalized guidance, and prepare students for certifications, interviews, and career opportunities.'
      }
    ]
  };

  const [activeWhy, setActiveWhy] = useState(0);
  const [activeProcess, setActiveProcess] = useState('software');

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
           <br/> <h1>
              Developing talent and
              
              delivering <br/><span className="typing-word">Technology
                </span>.
            </h1><br/>
            <p>Building skills, developing solutions, achieving success.</p>
            <br/>
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

            <article className="why-content-card reveal">
              <div className="why-content-icon" key={whyHighlights[activeWhy].title}>
                <i className={whyHighlights[activeWhy].icon}></i>
              </div>
              <h3>{whyHighlights[activeWhy].title}</h3>
              <p>{whyHighlights[activeWhy].text}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="core-services-section" aria-label="Core services">
        <div className="core-services-grid" aria-hidden="true"></div>
        <div className="site-container core-services-inner">
          <div className="core-services-copy reveal">
            <p>our core</p>
            <h2>Services</h2>
            <span>Smart solutions real results</span>
          </div>

          <div className="core-service-cards reveal">
            {coreServices.map((service, index) => (
              <article className={`core-service-card core-service-card-${index + 1}`} key={service.title}>
                <div className="core-service-media" aria-hidden="true">
                  <video autoPlay muted loop playsInline preload="metadata">
                    <source src="/hero.mp4" type="video/mp4" />
                  </video>
                  <i className={service.icon}></i>
                </div>
                <h3>{service.title}</h3>
              </article>
            ))}
          </div>

          <div className="core-services-action reveal">
            <Link className="btn btn-brand btn-lg core-services-button" to="/services">Our services</Link>
          </div>
        </div>
      </section>

      <section className="section-space work-process-section">
        <div className="site-container work-process-layout">
          <div className="work-process-content">
            <div className="why-template-head work-process-head">
              <span></span>
              <h2>
                {activeProcess === 'training'
                  ? 'How Our Training Process'
                  : 'How Our Software Process'}
                <br />
                <span className="why-brand-word">Works</span>
              </h2>
            </div>

            <div className="work-process-tabs" role="tablist" aria-label="Work process type">
              <button
                className={`work-process-tab ${activeProcess === 'software' ? 'is-active' : ''}`}
                type="button"
                role="tab"
                aria-selected={activeProcess === 'software'}
                onClick={() => setActiveProcess('software')}
              >
                Software
              </button>
              <button
                className={`work-process-tab ${activeProcess === 'training' ? 'is-active' : ''}`}
                type="button"
                role="tab"
                aria-selected={activeProcess === 'training'}
                onClick={() => setActiveProcess('training')}
              >
                Training
              </button>
            </div>

            <div className="work-process-cards">
              {workProcesses[activeProcess].map((step, index) => (
                <article className="work-process-card" key={step.title}>
                  <span>{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="work-process-media reveal" aria-hidden="true">
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="/workprocess.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="section-space product-contact-section">
        <div className="site-container product-contact-layout">
          <div className="product-contact-media reveal" aria-hidden="true">
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="/contact.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="product-contact-copy reveal">
            <h2>Turn Your Vision into a Powerful Software Product</h2>
            <p>
              Bring your business ideas to life with cutting-edge software solutions designed
              for growth and innovation.
            </p>
            <Link className="btn btn-brand core-services-button" to="/contact">Reach us</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
