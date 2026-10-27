/**
 * Saxby All Saints Village Hall - Main JavaScript
 * Interactive components, responsive helpers, and form handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar Dynamic Shadow on Scroll
  const navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Dynamic Copyright Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 3. Highlight Active Navigation Link based on current URL path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .dropdown-item');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');

      // If item is inside a dropdown, highlight the parent dropdown toggle
      const parentDropdown = link.closest('.dropdown');
      if (parentDropdown) {
        const toggle = parentDropdown.querySelector('.dropdown-toggle');
        if (toggle) {
          toggle.classList.add('active');
        }
      }
    }
  });

  // 4. Auto-collapse mobile navbar when a link is clicked
  const navCollapse = document.getElementById('navbarMain');
  if (navCollapse && window.bootstrap) {
    const bsCollapse = new window.bootstrap.Collapse(navCollapse, { toggle: false });
    const collapseLinks = navCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item');
    collapseLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }

  // 5. Client-Side Bootstrap Form Validation Handler
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        // Mock feedback for flat-file placeholder form
        if (form.dataset.mockSubmit === 'true') {
          event.preventDefault();
          const feedbackTarget = document.getElementById(form.dataset.feedbackTarget || 'formFeedback');
          if (feedbackTarget) {
            feedbackTarget.classList.remove('d-none');
            feedbackTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          form.reset();
          form.classList.remove('was-validated');
          return;
        }
      }
      form.classList.add('was-validated');
    }, false);
  });

  // 6. Online Booking Calendar Iframe Helper (Hall Booking Online)
  const bookingIframe = document.getElementById('hallbooking-frame');
  if (bookingIframe) {
    // Listen for responsive message resize if provider postMessage API is used
    window.addEventListener('message', (event) => {
      if (event.data && typeof event.data === 'object') {
        const height = event.data.height || event.data.hallbookingHeight;
        if (height) {
          bookingIframe.style.height = `${height}px`;
        }
      }
    }, false);
  }
});
