(function () {
  // Mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.getElementById('nav-links').classList.toggle('open');
    });
  }

  // Close nav on link click (mobile)
  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('nav-links').classList.remove('open');
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
