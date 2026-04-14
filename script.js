// ── CHANGE YOUR BIRTHDAY HERE ── format: new Date("YYYY-MM-DD")
var BIRTHDAY = new Date("2008-04-10T00:00:00");

// ── Scroll progress bar ──
window.addEventListener("scroll", function () {
  var h = document.documentElement.scrollHeight - window.innerHeight;
  var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
  document.getElementById("scroll-progress").style.width = pct + "%";
});

// ── Navbar scroll effect ──
window.addEventListener("scroll", function () {
  var nav = document.getElementById("navbar");
  if (window.scrollY > 50) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
});

// ── Mobile menu ──
function toggleMobileMenu() {
  var menu = document.getElementById("mobile-menu");
  var btn = document.getElementById("mobile-btn");
  menu.classList.toggle("open");
  btn.textContent = menu.classList.contains("open") ? "CLOSE" : "MENU";
}
function scrollToSection(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
  var menu = document.getElementById("mobile-menu");
  if (menu) { menu.classList.remove("open"); document.getElementById("mobile-btn").textContent = "MENU"; }
}

// ── Intersection Observer for scroll animations ──
document.addEventListener("DOMContentLoaded", function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "-60px" });

  document.querySelectorAll(".animate-on-scroll").forEach(function (el) {
    observer.observe(el);
  });

  // ── Live uptime counter ──
  function updateUptime() {
    var now = new Date();
    var hours = Math.floor((now.getTime() - BIRTHDAY.getTime()) / (1000 * 60 * 60));
    var el = document.getElementById("uptime-hours");
    if (el) el.textContent = hours.toLocaleString();
  }
  updateUptime();
  setInterval(updateUptime, 60000);
});

// ── Experience expand/collapse ──
function toggleExperience(index) {
  var el = document.getElementById("exp-highlights-" + index);
  var btn = document.getElementById("exp-toggle-" + index);
  if (!el || !btn) return;
  el.classList.toggle("open");
  if (el.classList.contains("open")) {
    btn.innerHTML = '<svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg> COLLAPSE';
  } else {
    btn.innerHTML = '<svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg> DETAILS';
  }
}

// ── Project expand/collapse ──
function toggleProject(index) {
  var el = document.getElementById("proj-long-" + index);
  var btn = document.getElementById("proj-toggle-" + index);
  if (!el || !btn) return;
  el.classList.toggle("open");
  if (el.classList.contains("open")) {
    btn.innerHTML = '<svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg> LESS';
  } else {
    btn.innerHTML = '<svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg> MORE';
  }
}

// ── Project filter ──
function filterProjects(kind) {
  document.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
  document.querySelector('.filter-btn[data-filter="' + kind + '"]').classList.add("active");

  var cards = document.querySelectorAll(".project-card");
  var shown = 0;
  cards.forEach(function (card) {
    var k = card.getAttribute("data-kind");
    var match = kind === "all" || k === kind || (k === "mixed" && (kind === "software" || kind === "mechanical"));
    card.style.display = match ? "" : "none";
    if (match) shown++;
  });

  var countEl = document.getElementById("filter-count");
  if (countEl) countEl.textContent = shown + " project" + (shown !== 1 ? "s" : "");
}
