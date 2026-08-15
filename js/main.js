// Heritage Poster — progressive enhancement for scroll reveals and parallax
// Respects prefers-reduced-motion and touch devices.

(function () {
  'use strict';

  const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  // Reveal headline lines on load
  const revealLines = document.querySelectorAll('.reveal-line');

  function reveal() {
    revealLines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('is-visible');
      }, 120 * index);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal);
  } else {
    reveal();
  }

  if (!motionOk || window.innerWidth < 768) {
    return;
  }

  // Subtle parallax for the red disc and bottle on scroll
  const redDisc = document.querySelector('.red-disc');
  const bottle = document.querySelector('.bottle-silhouette');
  const posterStage = document.querySelector('.poster-stage');

  if (!redDisc || !bottle || !posterStage) return;

  let ticking = false;

  function updateParallax() {
    const rect = posterStage.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Only animate while the poster stage is in view
    if (rect.bottom > 0 && rect.top < viewportHeight) {
      const progress = Math.max(0, Math.min(1, 1 - (rect.bottom / (viewportHeight + rect.height))));
      const discOffset = progress * 30; // px
      const bottleOffset = progress * -40; // px

      redDisc.style.transform = `translateY(${discOffset}px) scale(${1 + progress * 0.03})`;
      bottle.style.transform = `translateY(${bottleOffset}px)`;
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateParallax();
})();
