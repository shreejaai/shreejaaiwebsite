(function () {
  function setTab(tabId, trigger) {
    document.querySelectorAll('.arch-diagram').forEach(diagram => {
      diagram.classList.toggle('active', diagram.id === `tab-${tabId}`);
    });
    document.querySelectorAll('.arch-tab').forEach(tab => {
      tab.classList.toggle('active', tab === trigger);
    });
  }

  window.switchTab = function (tabId, trigger) {
    setTab(tabId, trigger);
  };

  document.querySelectorAll('.arch-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      if (target) setTab(target, tab);
    });
  });

  // Mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Close nav on link click (mobile)
  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks) {
        navLinks.classList.remove('open');
      }
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
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
      window.location.href = `mailto:hello@shreejaai.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
