const revealNodes = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

revealNodes.forEach((node, index) => {
  node.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealNodes.forEach((node) => observer.observe(node));

if (!prefersReducedMotion) {
  const heroImages = document.querySelectorAll(".hero-main-img img, .hero-side-img img");
  let rafId = null;

  const updateParallax = () => {
    const y = window.scrollY || 0;
    heroImages.forEach((img, i) => {
      const speed = i === 0 ? 0.035 : 0.05;
      img.style.transform = `translateY(${Math.min(y * speed, 22)}px) scale(1.05)`;
    });
    rafId = null;
  };

  const onScroll = () => {
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(updateParallax);
  };

  updateParallax();
  window.addEventListener("scroll", onScroll, { passive: true });
}
