gsap.registerPlugin(ScrollTrigger);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce) {
  // Hero: one entrance, then slow zoom and fade on scroll
  gsap.from('.hero-img', { scale: 1.2, duration: 2.4, ease: 'power3.out' });
  gsap.from('.hero h1, .hero p, .hero-cta', { y: 40, opacity: 0, duration: 1.2, stagger: .15, delay: .3, ease: 'power3.out' });
  const heroScroll = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('.hero-img', { scale: 1.15, yPercent: 12, ease: 'none', scrollTrigger: heroScroll });
  gsap.to('.hero-copy', { opacity: 0, y: -80, ease: 'none', scrollTrigger: heroScroll });

  // Statement: the two lines slide in from opposite sides
  gsap.timeline({ scrollTrigger: { trigger: '.statement', start: 'top top', end: '+=120%', pin: true, scrub: 1 } })
    .from('.s-line.l', { xPercent: -120 }, 0)
    .from('.s-line.r', { xPercent: 120 }, 0)
    .from('.s-note', { opacity: 0, y: 30 }, .7);

  // 3D card ring turns as you scroll
  const ring = document.querySelector('.ring');
  const cards = [...ring.children];
  const n = cards.length;
  function layoutRing() {
    const r = Math.round((cards[0].offsetWidth / 2) / Math.tan(Math.PI / n)) + 40;
    cards.forEach((c, i) => c.style.transform = `rotateY(${i * 360 / n}deg) translateZ(${r}px)`);
    gsap.set(ring, { z: -r });
  }
  layoutRing();
  ScrollTrigger.addEventListener('refreshInit', layoutRing);
  gsap.to(ring, { rotationY: -(360 - 360 / n), ease: 'none',
    scrollTrigger: { trigger: '.rooms', start: 'top top', end: '+=250%', pin: true, scrub: 1 } });

  // Gallery: vertical scroll drives a horizontal track
  const track = document.querySelector('.track');
  const dist = () => track.scrollWidth - innerWidth;
  gsap.to(track, { x: () => -dist(), ease: 'none',
    scrollTrigger: { trigger: '.gallery', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true } });

  // Booking: photos drift at different speeds
  gsap.utils.toArray('.float').forEach((el, i) =>
    gsap.fromTo(el, { y: 100 + i * 40 }, { y: -100 - i * 40, ease: 'none',
      scrollTrigger: { trigger: '.book', start: 'top bottom', end: 'bottom top', scrub: true } }));
}

// Booking form: swap this for Formspree, Netlify Forms or your own endpoint
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('note').textContent = 'Request received. We will reply within a day.';
  e.target.reset();
});
