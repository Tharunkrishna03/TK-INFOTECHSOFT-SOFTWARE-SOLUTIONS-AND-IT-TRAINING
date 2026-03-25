const EMAILJS_CONFIG = {
  publicKey: "Ou_qu_feu12sSNEkc",
  serviceId: "service_tpuqps7",
  templateId: "template_ln9myvv",
};

const PRIMARY_EMAIL = "dtharunkrishna65@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
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


function initRevealAnimations() {
  const items = document.querySelectorAll(".reveal");

  if (!items.length) {
    return;
  }

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    items.forEach((item) => item.classList.add("is-visible"));
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

  items.forEach((item) => observer.observe(item));
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

  const dot = document.createElement("div");
  const ring = document.createElement("div");

  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  document.body.append(dot, ring);
  document.body.classList.add("pointer-enabled");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  const render = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    window.requestAnimationFrame(render);
  };

  const syncHoverState = (target) => {
    const isInteractive = Boolean(
      target &&
        target.closest(
          "a, button, .btn, .mobile-icon-link, .sidebar-toggle, .sidebar-close"
        )
    );

    dot.classList.toggle("is-hover", isInteractive);
    ring.classList.toggle("is-hover", isInteractive);
  };

  document.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.classList.add("is-visible");
      ring.classList.add("is-visible");
      syncHoverState(event.target);
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", () => {
    dot.classList.remove("is-visible");
    ring.classList.remove("is-visible");
  });

  document.addEventListener("mousedown", () => {
    dot.classList.add("is-hover");
    ring.classList.add("is-hover");
  });

  document.addEventListener("mouseup", (event) => {
    syncHoverState(event.target);
  });

  window.requestAnimationFrame(render);
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

