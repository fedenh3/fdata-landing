// ══════════════════════════════════════
// F-DATA SOLUCIONES – Landing Page JS
// ══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──
  const navbar = document.querySelector('.navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── Scroll reveal animations ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => observer.observe(el));

  // ── Staggered card animations ──
  document.querySelectorAll('.services-grid, .process-steps').forEach(grid => {
    const cards = grid.children;
    const gridObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Array.from(cards).forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, i * 120);
          });
          gridObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    Array.from(cards).forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity .5s ease, transform .5s ease';
    });

    gridObserver.observe(grid);
  });

  // ── Animated counter for metrics ──
  function animateCounter(el, target, duration = 1500) {
    const start = 0;
    const startTime = performance.now();
    const suffix = el.dataset.suffix || '';

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.round(start + (target - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // Observe metric numbers
  document.querySelectorAll('[data-count]').forEach(el => {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(el, parseInt(el.dataset.count), 1800);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counterObserver.observe(el);
  });

  // ── FAQ Accordion ──
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const wasActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq-item.active').forEach(faq => faq.classList.remove('active'));
      // Toggle clicked
      if (!wasActive) item.classList.add('active');
    });
  });

  // ── Staggered skill tags animation ──
  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) {
    const tags = skillsGrid.children;
    Array.from(tags).forEach(tag => {
      tag.style.opacity = '0';
      tag.style.transform = 'scale(0.85)';
      tag.style.transition = 'opacity .4s ease, transform .4s ease';
    });
    const skillsObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Array.from(tags).forEach((tag, i) => {
            setTimeout(() => {
              tag.style.opacity = '1';
              tag.style.transform = 'scale(1)';
            }, i * 60);
          });
          skillsObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    skillsObs.observe(skillsGrid);
  }

});
