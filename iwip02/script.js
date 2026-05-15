/* ============================================================
   INDUSTRIAL CORP — MASTER SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar ────────────────────────────────────────────────
  const navbar  = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
  }

  // Close mobile nav when clicking a link
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Dark Mode Toggle ──────────────────────────────────────
  const themeBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeBtn) updateThemeIcon(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });
  }
  function updateThemeIcon(theme) {
    if (themeBtn) themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // ── Search Overlay ────────────────────────────────────────
  const searchBtn     = document.getElementById('searchBtn');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose   = document.querySelector('.search-close');
  const searchInput   = document.querySelector('.search-overlay input');

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('open');
      setTimeout(() => searchInput && searchInput.focus(), 200);
    });
  }
  if (searchClose) {
    searchClose.addEventListener('click', () => searchOverlay.classList.remove('open'));
  }
  if (searchOverlay) {
    searchOverlay.addEventListener('click', e => {
      if (e.target === searchOverlay) searchOverlay.classList.remove('open');
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      searchOverlay && searchOverlay.classList.remove('open');
      closeLightbox();
      closeModal();
    }
  });

  // Search hints
  document.querySelectorAll('.search-hint').forEach(hint => {
    hint.addEventListener('click', () => {
      if (searchInput) searchInput.value = hint.textContent;
    });
  });

  // ── Counter Animation ─────────────────────────────────────
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
    }, step);
  }

  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = true;
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ── Scroll Reveal ─────────────────────────────────────────
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

  // ── News / Gallery Filter ─────────────────────────────────
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-filter-group]') || btn.parentElement;
      group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const container = document.querySelector('[data-filter-container]');
      if (!container) return;

      container.querySelectorAll('[data-category]').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ── Job Category Filter ───────────────────────────────────
  document.querySelectorAll('.category-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.job-card').forEach(card => {
        if (filter === 'all' || card.dataset.dept === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ── News Modal ────────────────────────────────────────────
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose   = document.querySelector('.modal-close');

  window.openNewsModal = function(data) {
    if (!modalOverlay) return;
    modalOverlay.querySelector('.modal-header h3').textContent = data.title;
    const img = modalOverlay.querySelector('.modal-img');
    if (img) img.src = data.img;
    const body = modalOverlay.querySelector('.modal-body-text');
    if (body) body.innerHTML = data.content;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // ── Lightbox ──────────────────────────────────────────────
  const lightbox    = document.querySelector('.lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  let galleryImages = [];
  let lightboxIndex = 0;

  window.openLightbox = function(src, index) {
    if (!lightbox) return;
    galleryImages = Array.from(document.querySelectorAll('.gallery-item img')).map(i => i.src);
    lightboxIndex = index || 0;
    lightboxImg.src = galleryImages[lightboxIndex];
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const lightboxPrev  = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
  const lightboxNext  = lightbox ? lightbox.querySelector('.lightbox-next') : null;

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[lightboxIndex];
  });
  if (lightboxNext) lightboxNext.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[lightboxIndex];
  });

  document.addEventListener('keydown', e => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') lightboxPrev && lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext && lightboxNext.click();
  });

  // ── Form Submissions ──────────────────────────────────────
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      showToast('✅ Submitted successfully! We\'ll be in touch soon.');
    });
  });

  // File upload UI
  const fileInput = document.querySelector('.file-input');
  const fileUpload = document.querySelector('.file-upload');
  if (fileInput && fileUpload) {
    fileUpload.addEventListener('click', () => fileInput.click());
    fileUpload.addEventListener('dragover', e => {
      e.preventDefault();
      fileUpload.style.borderColor = 'var(--green-500)';
    });
    fileUpload.addEventListener('dragleave', () => {
      fileUpload.style.borderColor = '';
    });
    fileUpload.addEventListener('drop', e => {
      e.preventDefault();
      fileUpload.style.borderColor = '';
      const file = e.dataTransfer.files[0];
      if (file) updateFileUpload(file);
    });
    fileInput.addEventListener('change', () => {
      if (fileInput.files[0]) updateFileUpload(fileInput.files[0]);
    });
  }
  function updateFileUpload(file) {
    if (fileUpload) {
      fileUpload.querySelector('p').innerHTML =
        `<strong style="color:var(--green-500)">${file.name}</strong><br>
         <span style="font-size:0.75rem;color:var(--slate-400)">${(file.size/1024/1024).toFixed(2)} MB</span>`;
    }
  }

  // ── Back to Top ───────────────────────────────────────────
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── Toast ─────────────────────────────────────────────────
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✅</span> ${message}`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('show'));
    });
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // ── Job Apply Button ──────────────────────────────────────
  document.querySelectorAll('.job-apply-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const title = btn.closest('.job-card').querySelector('h3').textContent;
      const select = document.querySelector('select[name="position"]');
      if (select) {
        select.focus();
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
      }
      showToast(`📋 Applying for: ${title}`);
    });
  });

  // ── Newsletter ────────────────────────────────────────────
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value) {
        showToast('📧 Subscribed! Welcome aboard.');
        input.value = '';
      }
    });
  });

  // ── Smooth anchor scroll ──────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Init scroll check
  window.dispatchEvent(new Event('scroll'));
});
