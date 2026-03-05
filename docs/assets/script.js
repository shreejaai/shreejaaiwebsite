(function () {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach(function (anchor) {
      anchor.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const mailForm = document.querySelector('#mailto-form');
  if (mailForm) {
    mailForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = encodeURIComponent(document.querySelector('#name').value.trim());
      const email = encodeURIComponent(document.querySelector('#email').value.trim());
      const message = encodeURIComponent(document.querySelector('#message').value.trim());
      const subject = `Website inquiry from ${decodeURIComponent(name) || 'Visitor'}`;
      const body = `Name: ${decodeURIComponent(name)}\nEmail: ${decodeURIComponent(email)}\n\nMessage:\n${decodeURIComponent(message)}`;
      window.location.href = `mailto:navneetgoel126@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
