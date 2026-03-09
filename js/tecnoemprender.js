const WHATSAPP_NUMBER = "573156090975";

function wa(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

document.addEventListener("DOMContentLoaded", function () {

  // BURGER BUTTON
  const headerRight = document.querySelector('.header-right');
  if (headerRight) {
    const btn = document.createElement('button');
    btn.className = 'burger-btn';
    btn.id = 'burgerBtn';
    btn.setAttribute('aria-label', 'Abrir menú');
    btn.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
    headerRight.insertBefore(btn, headerRight.firstChild);
  }

  // MENÚ
  const burgerBtn  = document.getElementById('burgerBtn');
  const mobileNav  = document.getElementById('mobileNav');
  const navOverlay = document.getElementById('navOverlay');
  const closeBtn   = document.getElementById('mobileNavClose');

  function openMenu() {
    mobileNav.classList.add('open');
    navOverlay.classList.add('visible');
    burgerBtn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileNav.classList.remove('open');
    navOverlay.classList.remove('visible');
    burgerBtn.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (burgerBtn)  burgerBtn.addEventListener('click', openMenu);
  if (closeBtn)   closeBtn.addEventListener('click', closeMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  if (mobileNav) {
    mobileNav.querySelectorAll('a:not([data-wa])').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // WHATSAPP
  document.querySelectorAll("a[data-wa]").forEach(a => {
    a.href = wa("Hola, vengo de TecnoEmprender.");
  });
  const waFloat = document.getElementById("waFloat");
  if (waFloat) waFloat.href = wa("Hola, vengo de TecnoEmprender.");

  // TABS
  document.querySelectorAll(".tabbtn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".tabbtn").forEach(b => b.setAttribute("aria-selected", "false"));
      document.querySelectorAll(".tabpanel").forEach(p => p.classList.remove("active"));
      btn.setAttribute("aria-selected", "true");
      document.getElementById(btn.getAttribute("aria-controls")).classList.add("active");
    };
  });

  // ESTADÍSTICAS
  function animateStats() {
    document.querySelectorAll(".stat-number").forEach(stat => {
      const target = parseInt(stat.getAttribute("data-target"));
      const suffix = stat.textContent.includes("%") ? "%" : "+";
      let current = 0;
      const increment = target / 50;
      stat.textContent = "0" + suffix;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { stat.textContent = target + suffix; clearInterval(timer); }
        else stat.textContent = Math.floor(current) + suffix;
      }, 40);
    });
  }

  const statsEl = document.querySelector(".stat-number");
  if (statsEl) {
    new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) animateStats(); });
    }, { threshold: 0.5 }).observe(statsEl.parentElement.parentElement.parentElement);
  }

});