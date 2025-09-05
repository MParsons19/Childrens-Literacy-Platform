// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.menu-toggle');
  const drawer = document.getElementById('drawer');

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
      }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        toggle.focus();
      }
    });
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement && targetId !== '#') {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (drawer && drawer.classList.contains('open')) {
          drawer.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          drawer.setAttribute('aria-hidden', 'true');
        }
      }
    });
  });

  // Newsletter form handling
  const newsletterForm = document.querySelector('.newsletter form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        // Show success message
        alert('Thanks! You\'re on the list.');
        newsletterForm.reset();
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }

  // Add loading states for buttons (optional enhancement)
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    if (button.type === 'submit') {
      button.addEventListener('click', function() {
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.disabled = true;
        
        setTimeout(() => {
          this.textContent = originalText;
          this.disabled = false;
        }, 2000);
      });
    }
  });
});
