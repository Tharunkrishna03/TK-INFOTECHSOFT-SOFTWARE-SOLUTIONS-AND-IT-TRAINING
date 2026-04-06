const EMAILJS_CONFIG = {
  contact: {
    publicKey: "Ou_qu_feu12sSNEkc",
    serviceId: "service_tpuqps7",
    templateId: "template_ln9myvv",
  },
  application: {
    publicKey: "Nw-A_RtWpccfLfDE1",
    serviceId: "service_tuvi97l",
    templateId: "template_vxbtcnh",
  },
};

const PRIMARY_EMAIL = "dtharunkrishna65@gmail.com";
const LOADER_LOTTIE_SRC =
  "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie";
const dotLottieReady =
  window.__tkDotLottieReady ||
  import("https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm")
    .then(({ DotLottie }) => DotLottie)
    .catch((error) => {
      console.error("Lottie animation failed to load:", error);
      return null;
    });

initLottieAnimations();

document.addEventListener("DOMContentLoaded", () => {
  initPageTransitions();
  initHeaderState();
  initMobileSidebar();
  initStaggeredCardMotion();
  initRevealAnimations();
  initCounters();
  initPointerAnimation();
  initContactForm();
  initApplicationForm();
});

function initLottieAnimations() {
  const canvases = document.querySelectorAll("canvas[data-lottie-src]");

  if (!canvases.length) {
    return;
  }

  dotLottieReady
    .then((DotLottie) => {
      if (!DotLottie) {
        return;
      }

      canvases.forEach((canvas) => {
        if (!(canvas instanceof HTMLCanvasElement) || canvas.dataset.lottieReady === "true") {
          return;
        }

        const src = canvas.dataset.lottieSrc || LOADER_LOTTIE_SRC;

        canvas.dataset.lottieReady = "true";

        new DotLottie({
          autoplay: true,
          loop: true,
          canvas,
          src,
        });
      });
    });
}

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
  const clearLoadingState = () => {
    document.body.classList.remove("page-loading", "page-transitioning");
  };

  const finishInitialLoad = () => {
    window.setTimeout(clearLoadingState, 120);
  };

  if (document.readyState === "complete") {
    finishInitialLoad();
  } else {
    window.addEventListener("load", finishInitialLoad, { once: true });
  }

  window.addEventListener("pageshow", finishInitialLoad);

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");

    if (!shouldTriggerPageTransition(link, event)) {
      return;
    }

    event.preventDefault();
    document.body.classList.remove("page-loading");
    document.body.classList.add("page-transitioning");

    window.setTimeout(() => {
      window.location.href = link.href;
    }, 240);
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

function shouldReduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

function initEmailJs(publicKey) {
  if (typeof emailjs === "undefined") {
    return false;
  }

  if (publicKey && initEmailJs.currentKey !== publicKey) {
    emailjs.init(publicKey);
    initEmailJs.currentKey = publicKey;
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

function showFieldError(input, message) {
  clearFieldError(input);
  input.classList.add("is-invalid");
  const errorDiv = document.createElement("div");
  errorDiv.className = "invalid-feedback";
  errorDiv.textContent = message;
  input.parentNode.appendChild(errorDiv);
}

function clearFieldError(input) {
  input.classList.remove("is-invalid");
  const errorDiv = input.parentNode.querySelector(".invalid-feedback");
  if (errorDiv) {
    errorDiv.remove();
  }
}

function validateForm(form) {
  let isValid = true;
  const elements = form.elements;
  
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
      clearFieldError(el);
      if (!el.dataset.validationBound) {
        el.addEventListener("input", () => clearFieldError(el));
        el.dataset.validationBound = "true";
      }
    }
  }

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
      const isRequired = el.hasAttribute("required");
      const val = el.value.trim();

      if (isRequired && !val) {
        showFieldError(el, "This field is required.");
        isValid = false;
      } else if (val) {
        if (el.type === "email" || el.name === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) {
            showFieldError(el, "Please enter a valid email address.");
            isValid = false;
          }
        } else if (el.type === "tel" || el.name === "phone") {
          const phoneVal = val.replace(/\D/g, "");
          if (phoneVal.length !== 10) {
            showFieldError(el, "Please enter a valid 10-digit phone number.");
            isValid = false;
          }
        }
      }
    }
  }
  
  return isValid;
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-form-status");

  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateForm(form)) {
      setStatus(
        status,
        "Please check the form for errors.",
        "error"
      );
      return;
    }

    const name = form.elements.namedItem("name")?.value.trim() || "";
    const email = form.elements.namedItem("email")?.value.trim() || "";
    const message = form.elements.namedItem("message")?.value.trim() || "";

    const emailBody = `Quick enquiry from Tk-infotechsoftwares website

Name: ${name}
Email: ${email}
Enquiry: ${message}`;

    setStatus(status, "Sending your enquiry...");

    if (!initEmailJs(EMAILJS_CONFIG.contact.publicKey)) {
      openMailClient(`Website enquiry from ${name}`, emailBody);
      setStatus(
        status,
        "Your email app has been opened so you can finish sending the enquiry.",
        "success"
      );
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_CONFIG.contact.serviceId,
        EMAILJS_CONFIG.contact.templateId,
        {
          from_name: name,
          email_id: email,
          reply_to: email,
          to_email: PRIMARY_EMAIL,
          message: emailBody,
        },
        {
          publicKey: EMAILJS_CONFIG.contact.publicKey,
        }
      );

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

  if (!form) {
    return;
  }

  populateStoredApplication(form);
  applySelectedCourseFromQuery(form, selectedTrackNote);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateForm(form)) {
      return;
    }

    const payload = getApplicationPayload(form);

    syncApplicationFields(form, payload);

    saveApplicationLocally(payload);

    if (submitButton) {
      submitButton.disabled = true;
    }

    const emailSubject = `Internship application from ${payload.name || "Tk-infotechsoftwares website"}`;
    const emailBody = buildApplicationMessage(payload);

    setStatus(status, "Sending your application...");

    if (!initEmailJs(EMAILJS_CONFIG.application.publicKey)) {
      openMailClient(emailSubject, emailBody);
      setStatus(
        status,
        "Your email app has been opened so you can finish sending the application. Your details are still saved on this device."
      );
      if (submitButton) {
        submitButton.disabled = false;
      }
      return;
    }

    try {
      prepareApplicationEmailFields(form, payload, emailSubject, emailBody);

      await emailjs.sendForm(
        EMAILJS_CONFIG.application.serviceId,
        EMAILJS_CONFIG.application.templateId,
        form,
        {
          publicKey: EMAILJS_CONFIG.application.publicKey,
        }
      );

      form.reset();
      clearStoredApplication();
      applySelectedCourseFromQuery(form, selectedTrackNote);
      setStatus(
        status,
        "Application sent successfully. We will contact you soon.",
        "success"
      );
    } catch (error) {
      const errorMessage = getEmailJsErrorMessage(error);

      console.error("Application email error:", {
        status: error?.status,
        text: error?.text,
        message: errorMessage,
        serviceId: EMAILJS_CONFIG.application.serviceId,
        templateId: EMAILJS_CONFIG.application.templateId,
        error,
      });
      openMailClient(emailSubject, emailBody);
      setStatus(
        status,
        "Your email app was opened so you can continue the application, and your details are still saved on this device."
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

function getApplicationPayload(form) {
  return {
    name: String(form.elements.namedItem("name")?.value || "").trim(),
    phone: String(form.elements.namedItem("phone")?.value || "").replace(/\D/g, ""),
    email: String(form.elements.namedItem("email")?.value || "").trim(),
    course: String(form.elements.namedItem("course")?.value || "").trim(),
    startDate: String(form.elements.namedItem("startDate")?.value || "").trim(),
    address: String(form.elements.namedItem("address")?.value || "").trim(),
    enquiry: String(form.elements.namedItem("enquiry")?.value || "").trim(),
  };
}

function syncApplicationFields(form, payload) {
  Object.entries(payload).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);

    if (field) {
      field.value = value;
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
  return `Tk-infotechsoftwares internship enquiry

Name: ${payload.name || ""}
Phone: ${payload.phone || ""}
Email: ${payload.email || ""}
Address: ${payload.address || ""}
Enquiry course: ${payload.course || ""}
Preferred start date: ${payload.startDate || "Not provided"}
Enquiry: ${payload.enquiry || ""}`;
}

function prepareApplicationEmailFields(form, payload, subject, message) {
  const hiddenFields = {
    from_name: payload.name,
    email_id: payload.email,
    reply_to: payload.email,
    to_email: PRIMARY_EMAIL,
    subject,
    message,
    phone_number: payload.phone,
    enquiry_course: payload.course,
    start_date: payload.startDate || "Not provided",
    preferred_start_date: payload.startDate || "Not provided",
  };

  Object.entries(hiddenFields).forEach(([name, value]) => {
    upsertHiddenField(form, name, value);
  });
}

function upsertHiddenField(form, name, value) {
  let field = form.querySelector(`input[type="hidden"][name="${name}"]`);

  if (!field) {
    field = document.createElement("input");
    field.type = "hidden";
    field.name = name;
    form.append(field);
  }

  field.value = value;
}

function getEmailJsErrorMessage(error) {
  if (!error) {
    return "Unknown EmailJS error";
  }

  if (typeof error.text === "string" && error.text.trim()) {
    return error.text.trim();
  }

  if (typeof error.message === "string" && error.message.trim()) {
    return error.message.trim();
  }

  return `Request failed${error.status ? ` with status ${error.status}` : ""}`;
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

