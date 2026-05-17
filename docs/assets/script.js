(function () {
  // Mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      if (!navLinks) return;
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Close nav on link click (mobile)
  document.querySelectorAll('#nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      if (!navLinks) return;
      navLinks.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Sticky nav border on scroll
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
  });

  // Contact form mailto handler
  const form = document.getElementById('mailto-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name    = encodeURIComponent(document.querySelector('#name').value.trim());
      const email   = encodeURIComponent(document.querySelector('#email').value.trim());
      const message = encodeURIComponent(document.querySelector('#message').value.trim());
      const subject = `Website inquiry from ${decodeURIComponent(name) || 'Visitor'}`;
      const body    = `Name: ${decodeURIComponent(name)}\nEmail: ${decodeURIComponent(email)}\n\nMessage:\n${decodeURIComponent(message)}`;
      window.location.href = `mailto:shreejabuid@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Scroll reveal animations
  const revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  // Animated counters
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length > 0) {
    const animateCounter = (el) => {
      const target = Number(el.getAttribute('data-counter'));
      const duration = 1200;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(target * progress);
        el.textContent = String(value);
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  // Use-case tabs
  const tabsRoot = document.querySelector('[data-tabs]');
  if (tabsRoot) {
    const tabs = tabsRoot.querySelectorAll('.mk-tab');
    const panels = tabsRoot.querySelectorAll('.mk-tab-panel');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const selected = tab.getAttribute('data-tab');

        tabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle('active', active);
          t.setAttribute('aria-selected', String(active));
        });

        panels.forEach((panel) => {
          const active = panel.getAttribute('data-panel') === selected;
          panel.classList.toggle('active', active);
          panel.hidden = !active;
        });
      });
    });
  }

  // ROI calculator
  const teamRange = document.getElementById('calc-team-size');
  const hoursRange = document.getElementById('calc-hours');
  const rateRange = document.getElementById('calc-rate');
  if (teamRange && hoursRange && rateRange) {
    const teamVal = document.getElementById('team-size-val');
    const hoursVal = document.getElementById('hours-val');
    const rateVal = document.getElementById('rate-val');
    const monthlyHoursEl = document.getElementById('monthly-hours');
    const monthlyValueEl = document.getElementById('monthly-value');

    const updateCalculator = () => {
      const team = Number(teamRange.value);
      const hours = Number(hoursRange.value);
      const rate = Number(rateRange.value);
      const recoverableRatio = 0.65;
      const monthlyHours = Math.round(team * hours * 4 * recoverableRatio);
      const monthlyValue = Math.round(monthlyHours * rate);

      if (teamVal) teamVal.textContent = String(team);
      if (hoursVal) hoursVal.textContent = String(hours);
      if (rateVal) rateVal.textContent = String(rate);
      if (monthlyHoursEl) monthlyHoursEl.textContent = monthlyHours.toLocaleString();
      if (monthlyValueEl) monthlyValueEl.textContent = monthlyValue.toLocaleString();
    };

    [teamRange, hoursRange, rateRange].forEach((input) => {
      input.addEventListener('input', updateCalculator);
    });
    updateCalculator();
  }

  // Testimonials slider
  const testimonialsRoot = document.querySelector('[data-testimonials]');
  if (testimonialsRoot) {
    const slides = Array.from(testimonialsRoot.querySelectorAll('[data-t-slide]'));
    const prev = testimonialsRoot.querySelector('[data-t-prev]');
    const next = testimonialsRoot.querySelector('[data-t-next]');
    let index = 0;
    let timer = null;

    const showSlide = (newIndex) => {
      index = (newIndex + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle('active', active);
        slide.hidden = !active;
      });
    };

    const restartTimer = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => showSlide(index + 1), 6000);
    };

    if (prev) {
      prev.addEventListener('click', () => {
        showSlide(index - 1);
        restartTimer();
      });
    }

    if (next) {
      next.addEventListener('click', () => {
        showSlide(index + 1);
        restartTimer();
      });
    }

    showSlide(0);
    restartTimer();
  }

  // Video launch overlay
  document.querySelectorAll('[data-video-launch]').forEach((button) => {
    const frame = button.closest('.mk-video-frame');
    const video = frame ? frame.querySelector('[data-video-player]') : null;
    if (!frame || !video) return;

    button.addEventListener('click', () => {
      frame.classList.add('is-playing');
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Keep controls visible even if autoplay policies block playback.
          frame.classList.remove('is-playing');
        });
      }
    });

    video.addEventListener('play', () => frame.classList.add('is-playing'));
    video.addEventListener('pause', () => {
      if (video.currentTime === 0 || video.ended) frame.classList.remove('is-playing');
    });
    video.addEventListener('ended', () => frame.classList.remove('is-playing'));
  });
})();
