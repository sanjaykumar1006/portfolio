


window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

/* ---------- CUSTOM CURSOR ---------- */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();


document.querySelectorAll('a, button, .project-card, .skill-category, .social-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    follower.style.borderColor = 'rgba(201,168,76,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.borderColor = '';
  });
});


const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


const revealElements = document.querySelectorAll(
  '.about-grid, .skill-category, .project-card, .contact-grid, .progress-item, .section-title, .section-label, .about-text, .contact-intro'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => revealObserver.observe(el));


const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.progress-fill');
      if (fill) {
        const width = fill.getAttribute('data-width');
        setTimeout(() => { fill.style.width = width + '%'; }, 300);
      }
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-item').forEach(item => progressObserver.observe(item));


const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--gold)';
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => sectionObserver.observe(sec));


document.querySelectorAll('.skill-category').forEach((cat, ci) => {
  cat.querySelectorAll('.skill-tag').forEach((tag, ti) => {
    tag.style.transitionDelay = `${ti * 40}ms`;
  });
});


const formBtn = document.querySelector('.contact-form .btn-primary');
if (formBtn) {
  formBtn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#ff4444';
        valid = false;
        setTimeout(() => { input.style.borderColor = ''; }, 2000);
      }
    });
    if (valid) {
      const original = formBtn.innerHTML;
      formBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      formBtn.style.background = 'linear-gradient(135deg, #2d7a2d, #4caf50)';
      setTimeout(() => {
        formBtn.innerHTML = original;
        formBtn.style.background = '';
        inputs.forEach(input => input.value = '');
      }, 3000);
    }
  });
}


const heroBgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  if (heroBgText) {
    const scrollY = window.scrollY;
    heroBgText.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
});


const heroRole = document.querySelector('.hero-role');
if (heroRole) {
  const roles = [
    'React + Django <span class="gold">Developer</span>',
    'Frontend <span class="gold">React Expert</span>',
    'Python Django <span class="gold">Backend Dev</span>',
    'Full Stack <span class="gold">Fresher 🔥</span>'
  ];
  let roleIndex = 0;
  setInterval(() => {
    heroRole.style.opacity = '0';
    heroRole.style.transform = 'translateY(10px)';
    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      heroRole.innerHTML = roles[roleIndex];
      heroRole.style.opacity = '1';
      heroRole.style.transform = 'translateY(0)';
      heroRole.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }, 400);
  }, 3000);
}


document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(201,168,76,0.04), var(--black-2) 60%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

console.log('%c Sanjay Portfolio ', 'background: #c9a84c; color: #0a0a0a; font-size: 16px; font-weight: bold; padding: 8px 20px;');
console.log('%c React + Django | Full Stack Developer ', 'color: #c9a84c; font-size: 12px;');
