(function () {
  'use strict';

  document.documentElement.classList.add('js');

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealTargets = document.querySelectorAll('.reveal-line, .scroll-reveal');
  const redDisc = document.querySelector('.red-disc');
  const bottle = document.querySelector('.bottle-silhouette');
  const posterStage = document.querySelector('.poster-stage');
  let revealObserver;
  let ticking = false;
  let animationFrame;

  function motionEnabled() {
    return !motionQuery.matches && window.innerWidth >= 768;
  }

  function revealAll() {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }

  function observeReveals() {
    if (!motionEnabled() || !('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    revealTargets.forEach((target) => {
      if (!target.classList.contains('is-visible')) revealObserver.observe(target);
    });
  }

  function clearParallax() {
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    animationFrame = undefined;
    ticking = false;
    redDisc?.style.removeProperty('transform');
    bottle?.style.removeProperty('transform');
  }

  function updateParallax() {
    if (!motionEnabled() || !redDisc || !bottle || !posterStage) {
      clearParallax();
      return;
    }

    const rect = posterStage.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (rect.bottom > 0 && rect.top < viewportHeight) {
      const progress = Math.max(0, Math.min(1, 1 - (rect.bottom / (viewportHeight + rect.height))));
      const discOffset = progress * 30;
      const bottleOffset = progress * -10;

      redDisc.style.transform = `translateY(${discOffset}px) scale(${1 + progress * 0.03})`;
      bottle.style.transform = `translateY(${bottleOffset}px)`;
    }

    ticking = false;
  }

  function onScroll() {
    if (!motionEnabled()) {
      revealAll();
      clearParallax();
      return;
    }
    if (ticking) return;
    animationFrame = window.requestAnimationFrame(updateParallax);
    ticking = true;
  }

  function applyMotionPreference() {
    if (!motionEnabled()) {
      if (revealObserver) revealObserver.disconnect();
      revealAll();
      clearParallax();
      return;
    }

    observeReveals();
    updateParallax();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', applyMotionPreference, { passive: true });

  if (typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', applyMotionPreference);
  } else {
    motionQuery.addListener(applyMotionPreference);
  }

  applyMotionPreference();
})();
