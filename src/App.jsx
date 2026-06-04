import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CursorStar from './components/CursorStar.jsx';
import PageLoader from './components/PageLoader.jsx';

import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Projects from './pages/Projects.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

gsap.registerPlugin(ScrollTrigger);

// Helper function to animate counters
function runCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.countTo || 0);
    const suffix = counter.dataset.suffix || '';

    if (prefersReducedMotion) {
      counter.textContent = `${target.toLocaleString()}${suffix}`;
      return;
    }

    const duration = 1400;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);

      counter.textContent = `${value.toLocaleString()}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      }
    };

    window.requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          instance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.55 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

// Helper to stagger card animations
function runStaggerCardMotion() {
  const animatedCards = document.querySelectorAll(
    '.stat-card, .logo-badge, .feature-card, .reason-card, .programme-card, .value-card, .partner-tile, .footer-card, .software-service-tab, .work-process-card, .about-profile-grid > article, .about-profile-contact-grid a, .application-form > *, .contact-form > *'
  );

  animatedCards.forEach((card, index) => {
    card.style.setProperty('--reveal-delay', `${(index % 6) * 0.08}s`);
  });
}

function smoothScrollToTop() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}

function getRevealMotion(item, index) {
  if (
    item.matches(
      '.feature-card, .reason-card, .programme-card, .value-card, .partner-tile, .logo-badge, .stat-card, .software-service-tab, .work-process-card, .about-profile-grid > article'
    )
  ) {
    return {
      x: index % 2 === 0 ? -88 : 88,
      y: 22,
    };
  }

  if (item.matches('.story-card, .application-card, .info-panel, .leader-card, .software-service-card, .about-profile-panel')) {
    return { x: -54, y: 24 };
  }

  if (item.matches('.hero-card, .about-first-view-media, .hero-visual')) {
    return { x: 64, y: 0 };
  }

  if (item.matches('.cta-banner, .carousel-shell')) {
    return { x: 0, y: 46 };
  }

  return { x: 0, y: 38 };
}

// Initialize GSAP reveals
function runRevealAnimations() {
  // Clear any existing ScrollTrigger instances to prevent layout shifting/duplication on route change
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  const revealSelector = [
    '.reveal',
    '.software-services-layout',
    '.software-service-card',
    '.software-service-tab',
    '.offered-course-card',
    '.work-process-card',
    '.about-profile-grid > article',
    '.about-profile-contact-grid a',
    '.about-first-view-media',
    '.application-form > *',
    '.contact-form > *',
    '.checklist li'
  ].join(', ');

  const textBlocks = Array.from(
    new Set(
      Array.from(
        document.querySelectorAll(
          '.hero-copy > .eyebrow, .hero-copy > h1, .hero-copy > p, .hero-copy > .hero-actions, .about-first-view-copy > .eyebrow, .about-first-view-copy > h1, .about-first-view-copy > p, .about-first-view-copy > .hero-actions, .page-hero > .site-container, .section-intro, .software-services-inner > h2, .why-template-head, .core-services-copy, .work-process-head, .product-contact-copy > h2, .product-contact-copy > p, .product-contact-copy > .btn, .about-profile-title, .about-profile-copy > p, .about-profile-contact h3'
        )
      )
    )
  );
  const items = Array.from(
    new Set(Array.from(document.querySelectorAll(revealSelector)).filter((item) => !textBlocks.includes(item)))
  );

  if (!items.length && !textBlocks.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    [...items, ...textBlocks].forEach((item) => item.classList.add('is-visible'));
    return;
  }

  textBlocks.forEach((item, index) => {
    gsap.set(item, { autoAlpha: 0, y: 34 });

    ScrollTrigger.create({
      trigger:
        item.closest(
          '.hero-copy, .about-first-view-copy, .page-hero, .section-intro, .software-services-inner, .why-template-head, .work-process-head, .product-contact-copy, .about-profile-head'
        ) || item,
      start: 'top 86%',
      onEnter: () => {
        item.classList.add('is-visible');
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          delay: index === 0 ? 0.08 : 0,
          ease: 'power3.out',
        });
      },
      onEnterBack: () => {
        item.classList.add('is-visible');
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          duration: 0.62,
          ease: 'power3.out',
        });
      },
      onLeaveBack: () => {
        item.classList.remove('is-visible');
        gsap.to(item, {
          autoAlpha: 0,
          y: 34,
          duration: 0.42,
          ease: 'power2.out',
        });
      },
    });
  });

  items.forEach((item, index) => {
    const motion = getRevealMotion(item, index);
    const delay = Number.parseFloat(item.style.getPropertyValue('--reveal-delay')) || 0;

    gsap.set(item, { autoAlpha: 0, x: motion.x, y: motion.y });

    ScrollTrigger.create({
      trigger: item,
      start: 'top 88%',
      onEnter: () => {
        item.classList.add('is-visible');
        gsap.to(item, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.82,
          delay: delay * 0.75,
          ease: 'power3.out',
        });
      },
      onEnterBack: () => {
        item.classList.add('is-visible');
        gsap.to(item, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        });
      },
      onLeaveBack: () => {
        item.classList.remove('is-visible');
        gsap.to(item, {
          autoAlpha: 0,
          x: motion.x,
          y: motion.y,
          duration: 0.42,
          ease: 'power2.out',
        });
      },
    });
  });
}

function AppContent() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const preventMediaDownload = (event) => {
      if (event.target.closest('img, video')) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', preventMediaDownload);
    document.addEventListener('dragstart', preventMediaDownload);

    return () => {
      document.removeEventListener('contextmenu', preventMediaDownload);
      document.removeEventListener('dragstart', preventMediaDownload);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Synchronize document titles and meta descriptions for SEO
  useEffect(() => {
    const routeTitles = {
      '/': 'TK-INFOTECHSOFT | Career-Focused IT Training',
      '/services': 'Services | TK-INFOTECHSOFT',
      '/projects': 'Projects | TK-INFOTECHSOFT',
      '/about': 'About | TK-INFOTECHSOFT',
      '/contact': 'Contact | TK-INFOTECHSOFT',
    };

    const routeDescs = {
      '/': 'TK-INFOTECHSOFT, training partner of MC-TECH Industrial School, helps students and fresh graduates build job-ready tech skills.',
      '/services': 'Explore TK-INFOTECHSOFT services in web development, app development, ERP, resume guidance, and ATS support.',
      '/projects': 'Explore TK-INFOTECHSOFT projects in full stack development, UI/UX, cloud, and digital careers.',
      '/about': 'Learn about TK-INFOTECHSOFT, our founder, and our role as a training partner of MC-TECH Industrial School.',
      '/contact': 'Contact TK-INFOTECHSOFT for course, service, and quick enquiry support.',
    };

    document.title = routeTitles[location.pathname] || 'TK-INFOTECHSOFT';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', routeDescs[location.pathname] || routeDescs['/']);
    }
  }, [location.pathname]);

  // Handle route change transitions
  useEffect(() => {
    // Initial page load removes loading class
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      document.body.classList.remove('page-loading');
      
      // Page specific body classes
      if (location.pathname === '/services') {
        document.body.classList.add('services-page');
      } else {
        document.body.classList.remove('services-page');
      }

      runStaggerCardMotion();
      runRevealAnimations();
      runCounters();

      // Scroll to hash if exists
      if (location.hash) {
        setTimeout(() => {
          const el = document.getElementById(location.hash.substring(1));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
      return;
    }

    // Path changed: trigger page transition overlay
    setIsTransitioning(true);
    document.body.classList.add('page-transitioning');

    const transitionTimeout = setTimeout(() => {
      // 1. Update active rendered path
      setCurrentPath(location.pathname);

      // Page specific body classes
      if (location.pathname === '/services') {
        document.body.classList.add('services-page');
      } else {
        document.body.classList.remove('services-page');
      }

      // Scroll to hash or top
      if (location.hash) {
        setTimeout(() => {
          const el = document.getElementById(location.hash.substring(1));
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            smoothScrollToTop();
          }
        }, 80);
      } else {
        smoothScrollToTop();
      }

      // 2. Hide loader and end transition class
      const endTransitionTimeout = setTimeout(() => {
        setIsTransitioning(false);
        document.body.classList.remove('page-transitioning');

        // 3. Wait for mounting then run animations
        const animTimeout = setTimeout(() => {
          runStaggerCardMotion();
          runRevealAnimations();
          runCounters();
          ScrollTrigger.refresh();
        }, 120);

        return () => clearTimeout(animTimeout);
      }, 100);

      return () => clearTimeout(endTransitionTimeout);
    }, 240);

    return () => clearTimeout(transitionTimeout);
  }, [location.pathname, location.search]);

  // Handle smooth scroll for direct hash changes without pathname change
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  return (
    <>
      <PageLoader isVisible={isFirstLoad.current || isTransitioning} />
      <Header />
      <Routes location={{ pathname: currentPath }}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <button
        type="button"
        className={`scroll-top-button${showScrollTop ? ' is-visible' : ''}`}
        aria-label="Scroll to top"
        onClick={smoothScrollToTop}
      >
        ↑
      </button>
      <CursorStar />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
