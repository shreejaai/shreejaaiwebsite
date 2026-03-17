(function () {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  const navDropdownToggle = document.querySelector('.nav-drop-toggle');
  const navDropdownItem = document.querySelector('.nav-item.has-dropdown');
  const navDropdownPanel = document.querySelector('.nav-dropdown');

  function closeNav() {
    if (!links || !toggle) {
      return;
    }
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function closeProductDropdown() {
    if (!navDropdownItem || !navDropdownToggle) {
      return;
    }
    navDropdownItem.classList.remove('open');
    navDropdownToggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      if (!isOpen) {
        closeProductDropdown();
      }
    });

    links.querySelectorAll('a').forEach(function (anchor) {
      anchor.addEventListener('click', function () {
        closeNav();
        closeProductDropdown();
      });
    });
  }

  if (navDropdownToggle && navDropdownItem && navDropdownPanel) {
    navDropdownToggle.addEventListener('click', function (event) {
      event.preventDefault();
      const isOpen = navDropdownItem.classList.toggle('open');
      navDropdownToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function (event) {
      if (!navDropdownItem.contains(event.target)) {
        closeProductDropdown();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeProductDropdown();
        closeNav();
      }
    });
  }

  document.querySelectorAll('a[data-scroll-target]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      const target = document.querySelector(anchor.getAttribute('data-scroll-target'));
      if (!target) {
        return;
      }
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const mailForm = document.querySelector('#mailto-form');
  if (mailForm) {
    mailForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = encodeURIComponent(document.querySelector('#name').value.trim());
      const email = encodeURIComponent(document.querySelector('#email').value.trim());
      const message = encodeURIComponent(document.querySelector('#message').value.trim());
      const subject = `Website inquiry from ${decodeURIComponent(name) || 'Visitor'}`;
      const body = `Name: ${decodeURIComponent(name)}\nEmail: ${decodeURIComponent(email)}\n\nMessage:\n${decodeURIComponent(message)}`;
      window.location.href = `mailto:hello@shreejaai.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
