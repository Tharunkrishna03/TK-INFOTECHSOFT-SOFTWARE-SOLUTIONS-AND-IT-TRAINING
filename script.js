const EMAILJS_CONFIG = {
  publicKey: "Ou_qu_feu12sSNEkc",
  serviceId: "service_tpuqps7",
  templateId: "template_ln9myvv",
};

const PRIMARY_EMAIL = "dtharunkrishna65@gmail.com";
const INTRO_STORAGE_KEY = "tkIntroSeen";

document.addEventListener("DOMContentLoaded", () => {
  initPageTransitions();
  initIntroExperience();
  initHeaderState();
  initMobileSidebar();
  initStaggeredCardMotion();
  initRevealAnimations();
  initCounters();
  initPointerAnimation();
  initContactForm();
  initApplicationForm();
});

function initHeaderState() {
  const header = document.querySelector(".site-header");

  if (!header) {
    return;
  }

  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

function initMobileSidebar() {
  const sidebar = document.getElementById("mobileSidebar");
  const toggle = document.querySelector('[data-sidebar-target="#mobileSidebar"]');
  const closeButton = sidebar?.querySelector(".sidebar-close");
  const links = sidebar?.querySelectorAll(".mobile-icon-link, .mobile-sidebar-cta .btn");

  if (!sidebar || !toggle || !closeButton || !links) {
    return;
  }

  const setExpandedState = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
  };

  const hasBootstrapOffcanvas =
    typeof bootstrap !== "undefined" && typeof bootstrap.Offcanvas !== "undefined";

  if (hasBootstrapOffcanvas) {
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(sidebar);

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      offcanvas.toggle();
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        offcanvas.hide();
      });
    });

    sidebar.addEventListener("shown.bs.offcanvas", () => {
      setExpandedState(true);
    });

    sidebar.addEventListener("hidden.bs.offcanvas", () => {
      setExpandedState(false);
    });

    return;
  }

  document.body.classList.add("mobile-sidebar-fallback");

  const backdrop = document.createElement("button");
  backdrop.type = "button";
  backdrop.className = "mobile-sidebar-backdrop";
  backdrop.setAttribute("aria-label", "Close navigation menu");
  document.body.append(backdrop);

  const closeSidebar = () => {
    sidebar.classList.remove("is-open");
    backdrop.classList.remove("is-visible");
    document.body.classList.remove("mobile-sidebar-open");
    setExpandedState(false);
  };

  const openSidebar = () => {
    sidebar.classList.add("is-open");
    backdrop.classList.add("is-visible");
    document.body.classList.add("mobile-sidebar-open");
    setExpandedState(true);
  };

  toggle.addEventListener("click", (event) => {
    event.preventDefault();

    if (sidebar.classList.contains("is-open")) {
      closeSidebar();
      return;
    }

    openSidebar();
  });

  closeButton.addEventListener("click", (event) => {
    event.preventDefault();
    closeSidebar();
  });

  backdrop.addEventListener("click", closeSidebar);

  links.forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSidebar();
    }
  });
}

function initPageTransitions() {
  if (document.querySelector(".page-loader")) {
    return;
  }

  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.setAttribute("aria-hidden", "true");
  loader.innerHTML = `
    <div class="page-loader-panel">
      <span class="page-loader-label">Loading next step</span>
      <div class="page-loader-pulse" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p class="page-loader-copy">Opening the next TK INFO-TECH page...</p>
    </div>
  `;

  document.body.append(loader);

  window.addEventListener("pageshow", () => {
    document.body.classList.remove("page-transitioning");
    loader.classList.remove("is-visible");
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");

    if (!shouldTriggerPageTransition(link, event)) {
      return;
    }

    event.preventDefault();
    document.body.classList.add("page-transitioning");
    loader.classList.add("is-visible");

    window.setTimeout(() => {
      window.location.href = link.href;
    }, 220);
  });
}

function shouldTriggerPageTransition(link, event) {
  if (
    !link ||
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    link.hasAttribute("download") ||
    link.target === "_blank"
  ) {
    return false;
  }

  const rawHref = link.getAttribute("href") || "";

  if (
    !rawHref ||
    rawHref.startsWith("#") ||
    rawHref.startsWith("mailto:") ||
    rawHref.startsWith("tel:") ||
    rawHref.startsWith("javascript:")
  ) {
    return false;
  }

  const nextUrl = new URL(link.href, window.location.href);

  if (nextUrl.origin !== window.location.origin) {
    return false;
  }

  if (nextUrl.pathname === window.location.pathname && nextUrl.hash) {
    return false;
  }

  return (
    nextUrl.pathname !== window.location.pathname ||
    nextUrl.search !== window.location.search
  );
}

function initIntroExperience() {
  const intro = document.getElementById("introScreen");
  const enterButton = intro?.querySelector("[data-intro-enter]");
  const introCard = intro?.querySelector(".intro-card");
  const powerGlow = intro?.querySelector(".intro-power-glow");
  const powerStatus = intro?.querySelector(".intro-power-status");

  if (!intro || !enterButton || !introCard) {
    return;
  }

  if (getSessionStorageValue(INTRO_STORAGE_KEY) === "true") {
    intro.hidden = true;
    return;
  }

  const reduceMotion = shouldReduceMotion();
  const hasGsap = typeof gsap !== "undefined";

  document.body.classList.add("intro-active");

  if (hasGsap && !reduceMotion) {
    gsap.fromTo(
      introCard,
      { y: 32, autoAlpha: 0, scale: 0.96 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.9, ease: "power3.out" }
    );

    gsap.fromTo(
      introCard.children,
      { y: 16, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.15,
      }
    );

    gsap.to(intro.querySelectorAll(".intro-orb"), {
      xPercent: 6,
      yPercent: -8,
      duration: 5.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });
  }

  const finishIntro = () => {
    intro.hidden = true;
    document.body.classList.remove("intro-active");

    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  };

  enterButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (enterButton.dataset.busy === "true") {
      return;
    }

    enterButton.dataset.busy = "true";
    intro.classList.add("is-armed");
    enterButton.setAttribute("aria-pressed", "true");
    setSessionStorageValue(INTRO_STORAGE_KEY, "true");
    powerStatus?.classList.add("is-live");

    if (!hasGsap || reduceMotion) {
      finishIntro();
      return;
    }

    const exitTimeline = gsap.timeline({ onComplete: finishIntro });

    if (powerGlow) {
      exitTimeline.to(
        powerGlow,
        {
          autoAlpha: 1,
          scale: 1.08,
          duration: 0.28,
          ease: "power2.out",
        },
        0
      );
    }

    exitTimeline.to(
      enterButton,
      {
        scale: 1.06,
        duration: 0.28,
        ease: "power2.out",
      },
      0
    );

    if (powerStatus) {
      exitTimeline.to(
        powerStatus,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        },
        0.1
      );
    }

    exitTimeline.to(
      introCard,
      {
        y: -18,
        scale: 0.97,
        duration: 0.35,
        ease: "power2.in",
      },
      0
    );

    exitTimeline.to(
      intro,
      {
        autoAlpha: 0,
        duration: 0.65,
        ease: "power2.out",
      },
      0.24
    );
  });
}

function shouldReduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getSessionStorageValue(key) {
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.error("Session storage read error:", error);
    return null;
  }
}

function setSessionStorageValue(key, value) {
  try {
    sessionStorage.setItem(key, value);
  } catch (error) {
    console.error("Session storage write error:", error);
  }
}


function initRevealAnimations() {
  const items = Array.from(document.querySelectorAll(".reveal"));
  const textBlocks = Array.from(
    document.querySelectorAll(
      ".hero-copy > .eyebrow, .hero-copy > h1, .hero-copy > p, .hero-copy > .hero-actions, .page-hero > .site-container, .section-intro"
    )
  );

  if (!items.length && !textBlocks.length) {
    return;
  }

  const hasGsap =
    typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";

  if (shouldReduceMotion()) {
    [...items, ...textBlocks].forEach((item) => item.classList.add("is-visible"));
    return;
  }

  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);

    textBlocks.forEach((item, index) => {
      gsap.set(item, { autoAlpha: 0, y: 34 });

      ScrollTrigger.create({
        trigger: item.closest(".hero-copy, .page-hero, .section-intro") || item,
        start: "top 86%",
        once: true,
        onEnter: () => {
          item.classList.add("is-visible");
          gsap.to(item, {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            delay: index === 0 ? 0.08 : 0,
            ease: "power3.out",
          });
        },
      });
    });

    items.forEach((item, index) => {
      const motion = getRevealMotion(item, index);
      const delay =
        Number.parseFloat(item.style.getPropertyValue("--reveal-delay")) || 0;

      gsap.set(item, { autoAlpha: 0, x: motion.x, y: motion.y });

      ScrollTrigger.create({
        trigger: item,
        start: "top 88%",
        once: true,
        onEnter: () => {
          item.classList.add("is-visible");
          gsap.to(item, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.82,
            delay: delay * 0.75,
            ease: "power3.out",
          });
        },
      });
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  [...items, ...textBlocks].forEach((item) => observer.observe(item));
}

function getRevealMotion(item, index) {
  if (
    item.matches(
      ".feature-card, .reason-card, .programme-card, .value-card, .footer-card, .partner-tile, .logo-badge, .stat-card"
    )
  ) {
    return {
      x: index % 2 === 0 ? -88 : 88,
      y: 22,
    };
  }

  if (item.matches(".story-card, .application-card, .info-panel, .leader-card")) {
    return { x: -54, y: 24 };
  }

  if (item.matches(".hero-card")) {
    return { x: 64, y: 0 };
  }

  if (item.matches(".cta-banner, .carousel-shell")) {
    return { x: 0, y: 46 };
  }

  return { x: 0, y: 38 };
}

function initStaggeredCardMotion() {
  const animatedCards = document.querySelectorAll(
    ".stat-card, .logo-badge, .feature-card, .reason-card, .programme-card, .value-card, .partner-tile, .footer-card"
  );

  animatedCards.forEach((card, index) => {
    card.style.setProperty("--reveal-delay", `${(index % 6) * 0.08}s`);
  });
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count-to]");

  if (!counters.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.countTo || 0);
    const suffix = counter.dataset.suffix || "";

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

  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
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
    {
      threshold: 0.55,
    }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initPointerAnimation() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;

  if (prefersReducedMotion || !supportsFinePointer) {
    return;
  }

  const star = document.createElement("div");

  star.className = "cursor-star";
  document.body.append(star);
  document.body.classList.add("pointer-enabled");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let starX = mouseX;
  let starY = mouseY;
  let lastSparkAt = 0;

  const render = () => {
    starX += (mouseX - starX) * 0.22;
    starY += (mouseY - starY) * 0.22;

    star.style.left = `${starX}px`;
    star.style.top = `${starY}px`;

    window.requestAnimationFrame(render);
  };

  const syncHoverState = (target) => {
    const isInteractive = Boolean(
      target &&
        target.closest(
          "a, button, .btn, .mobile-icon-link, .sidebar-toggle, .sidebar-close, input, textarea, select, label"
        )
    );

    star.classList.toggle("is-hover", isInteractive);
    return isInteractive;
  };

  const spawnSpark = (x, y, isInteractive = false) => {
    const spark = document.createElement("span");
    spark.className = `cursor-spark${isInteractive ? " is-hover" : ""}`;
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty("--spark-x", `${randomBetween(-22, 22)}px`);
    spark.style.setProperty("--spark-y", `${randomBetween(-22, 22)}px`);
    spark.style.setProperty("--spark-scale", `${randomBetween(0.8, 1.45)}`);
    document.body.append(spark);
    spark.addEventListener(
      "animationend",
      () => {
        spark.remove();
      },
      { once: true }
    );
  };

  document.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      star.classList.add("is-visible");
      const isInteractive = syncHoverState(event.target);
      const now = performance.now();

      if (now - lastSparkAt > 34) {
        spawnSpark(mouseX, mouseY, isInteractive);
        lastSparkAt = now;
      }
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", () => {
    star.classList.remove("is-visible", "is-hover", "is-active");
  });

  document.addEventListener("mousedown", () => {
    star.classList.add("is-active");

    for (let index = 0; index < 4; index += 1) {
      spawnSpark(mouseX, mouseY, true);
    }
  });

  document.addEventListener("mouseup", (event) => {
    star.classList.remove("is-active");
    syncHoverState(event.target);
  });

  window.requestAnimationFrame(render);
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function initEmailJs() {
  if (typeof emailjs === "undefined") {
    return false;
  }

  if (!initEmailJs.ready) {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    initEmailJs.ready = true;
  }

  return true;
}

function setStatus(node, message, type = "") {
  if (!node) {
    return;
  }

  node.textContent = message;
  node.classList.remove("status-success", "status-error");

  if (type === "success") {
    node.classList.add("status-success");
  }

  if (type === "error") {
    node.classList.add("status-error");
  }
}

function openMailClient(subject, body) {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  window.location.href = `mailto:${PRIMARY_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-form-status");

  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = form.elements.namedItem("name")?.value.trim() || "";
    const email = form.elements.namedItem("email")?.value.trim() || "";
    const message = form.elements.namedItem("message")?.value.trim() || "";

    if (!name || !email || !message) {
      setStatus(
        status,
        "Please fill in your name, email, and enquiry before sending.",
        "error"
      );
      return;
    }

    const emailBody = `Quick enquiry from TK INFO-TECH website

Name: ${name}
Email: ${email}
Enquiry: ${message}`;

    setStatus(status, "Sending your enquiry...");

    if (!initEmailJs()) {
      openMailClient(`Website enquiry from ${name}`, emailBody);
      setStatus(
        status,
        "Your email app has been opened so you can finish sending the enquiry.",
        "success"
      );
      return;
    }

    try {
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
        from_name: name,
        email_id: email,
        reply_to: email,
        to_email: PRIMARY_EMAIL,
        message: emailBody,
      });

      form.reset();
      setStatus(status, "Thanks. Your enquiry was sent successfully.", "success");
    } catch (error) {
      console.error("EmailJS error:", error);
      openMailClient(`Website enquiry from ${name}`, emailBody);
      setStatus(
        status,
        "Email sending failed in-browser, so your mail app was opened as a fallback.",
        "error"
      );
    }
  });
}

function initApplicationForm() {
  const form = document.getElementById("application-form");
  const status = document.getElementById("application-status");
  const selectedTrackNote = document.getElementById("selected-track-note");
  const submitButton = form?.querySelector('button[type="submit"]');
  const csrfToken = form?.querySelector('input[name="csrfmiddlewaretoken"]');

  if (!form) {
    return;
  }

  populateStoredApplication(form);
  applySelectedCourseFromQuery(form, selectedTrackNote);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const phoneDigits = String(payload.phone || "").replace(/\D/g, "");
    const phoneField = form.elements.namedItem("phone");

    if (phoneDigits.length !== 10) {
      setStatus(status, "Enter a valid 10-digit phone number.", "error");
      return;
    }

    payload.phone = phoneDigits;
    formData.set("phone", phoneDigits);

    if (phoneField) {
      phoneField.value = phoneDigits;
    }

    saveApplicationLocally(payload);

    if (submitButton) {
      submitButton.disabled = true;
    }

    setStatus(status, "Saving your application...");

    try {
      const response = await fetch(form.getAttribute("action") || window.location.href, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-CSRFToken": csrfToken?.value || "",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formData,
        credentials: "same-origin",
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus(
          status,
          data.message || "We could not save your application. Please try again.",
          "error"
        );
        return;
      }

      form.reset();
      clearStoredApplication();
      applySelectedCourseFromQuery(form, selectedTrackNote);
      setStatus(
        status,
        data.message || "Application saved successfully. We will contact you soon.",
        "success"
      );
    } catch (error) {
      console.error("Application save error:", error);
      setStatus(
        status,
        "We could not reach the server. Please try again in a moment.",
        "error"
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

function applySelectedCourseFromQuery(form, noteNode) {
  const params = new URLSearchParams(window.location.search);
  const course = params.get("course");

  if (!course) {
    return;
  }

  const courseField = form.elements.namedItem("course");

  if (courseField) {
    const optionExists = Array.from(courseField.options || []).some(
      (option) => option.value === course
    );

    if (!optionExists && courseField.options) {
      courseField.add(new Option(course, course));
    }

    courseField.value = course;
  }

  if (noteNode) {
    noteNode.hidden = false;
    noteNode.textContent = `Selected track: ${course}. You can change it before sending the application.`;
  }
}

function saveApplicationLocally(payload) {
  try {
    localStorage.setItem("tkApplication", JSON.stringify(payload));
  } catch (error) {
    console.error("Storage save error:", error);
  }
}

function clearStoredApplication() {
  try {
    localStorage.removeItem("tkApplication");
  } catch (error) {
    console.error("Storage clear error:", error);
  }
}

function buildApplicationMessage(payload) {
  return `TK INFO-TECH internship enquiry

Name: ${payload.name || ""}
Phone: ${payload.phone || ""}
Email: ${payload.email || ""}
Address: ${payload.address || ""}
Enquiry course: ${payload.course || ""}
Preferred start date: ${payload.startDate || "Not provided"}
Enquiry: ${payload.enquiry || ""}`;
}

function populateStoredApplication(form) {
  let saved = "";

  try {
    saved = localStorage.getItem("tkApplication");
  } catch (error) {
    console.error("Storage read error:", error);
    return;
  }

  if (!saved) {
    return;
  }

  try {
    const data = JSON.parse(saved);

    Object.entries(data).forEach(([key, value]) => {
      const field = form.elements.namedItem(key);

      if (field && typeof value === "string") {
        field.value = value;
      }
    });
  } catch (error) {
    console.error("Could not parse saved application:", error);
  }
}

