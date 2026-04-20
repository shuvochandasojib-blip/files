/* =============================================
   SHUVO CHANDA SOJIB — PORTFOLIO JS
   ============================================= */

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mx = -100, my = -100, tx = -100, ty = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateTrail() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  cursorTrail.style.left = tx + 'px';
  cursorTrail.style.top = ty + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, .port-img, .service-card, .tool-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    cursor.style.opacity = '0.5';
    cursorTrail.style.transform = 'translate(-50%,-50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.opacity = '1';
    cursorTrail.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});


// ---- NAVBAR ----
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
  handleScrollTop();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active Nav on scroll
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}


// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
        // Trigger skill bars when skills section reveals
        if (entry.target.classList.contains('skills-bars')) {
          animateSkillBars();
        }
        // Trigger stat counters in hero
        if (entry.target.classList.contains('hero-stats')) {
          animateCounters();
        }
      }, 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Stagger children in grids
function staggerReveal(parentSelector, childSelector, delayStep = 100) {
  document.querySelectorAll(parentSelector).forEach(parent => {
    parent.querySelectorAll(childSelector).forEach((child, i) => {
      child.style.transitionDelay = (i * delayStep) + 'ms';
    });
  });
}
staggerReveal('.services-grid', '.service-card', 80);
staggerReveal('.portfolio-grid', '.port-card', 60);
staggerReveal('.testi-grid', '.testi-card', 100);
staggerReveal('.tools-list', '.tool-card', 60);


// ---- SKILL BARS ANIMATION ----
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.width = bar.style.getPropertyValue('--w') || bar.getAttribute('style').match(/--w:(\d+%)/)?.[1] || '0%';
  });
}
// Also trigger on scroll via observer (handled above)


// ---- COUNTER ANIMATION ----
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 35);
  });
}

// Trigger counter when hero is visible (it's above fold)
window.addEventListener('load', () => {
  setTimeout(animateCounters, 800);
});


// ---- PORTFOLIO FILTER ----
const filterBtns = document.querySelectorAll('.filter-btn');
const portCards = document.querySelectorAll('.port-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portCards.forEach((card, i) => {
      const cat = card.getAttribute('data-cat');
      const show = filter === 'all' || cat === filter;

      if (show) {
        card.style.display = '';
        card.classList.remove('hidden');
        setTimeout(() => card.classList.add('visible'), 10 + i * 40);
      } else {
        card.classList.add('hidden');
        setTimeout(() => card.style.display = 'none', 500);
      }
    });
  });
});


// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      formSuccess.classList.add('show');
      contactForm.reset();
      btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
      btn.disabled = false;
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1500);
  });
}


// ---- SCROLL TO TOP ----
const scrollTopBtn = document.getElementById('scrollTop');

function handleScrollTop() {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
}

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ---- HERO REVEAL STAGGER ----
document.querySelectorAll('.hero-inner .reveal').forEach((el, i) => {
  el.style.transitionDelay = (i * 150) + 'ms';
  setTimeout(() => el.classList.add('visible'), 200 + i * 150);
});

// ---- SMOOTH ACTIVE STATE FOR HERO STATS ----
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObserver.unobserve(heroStats);
    }
  }, { threshold: 0.5 });
  // We handle this via load event above
}

// ---- CLOSE MOBILE MENU ON OUTSIDE CLICK ----
document.addEventListener('click', e => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

// ---- INITIAL SCROLL STATE ----
if (window.scrollY > 50) navbar.classList.add('scrolled');
updateActiveNav();
