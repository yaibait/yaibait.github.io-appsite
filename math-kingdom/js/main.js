/**
 * Math Kingdom 3D - Educational Math Adventure
 * Interactive JavaScript for Landing Page & Legal Documents
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initFaqAccordion();
  initMathTableExplorer();
  initBackToTop();
  initScrollSpy();
  initModals();
  initPrivacyForm();
});

/* ----------------------------------------------------
   1. THEME TOGGLE (Dark / Light)
   ---------------------------------------------------- */
function initTheme() {
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('vqt_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default to dark for gaming vibe
  applyTheme(initialTheme);

  themeToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('vqt_theme', newTheme);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
  themeToggleButtons.forEach(btn => {
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    btn.setAttribute('title', theme === 'dark' ? 'Light Mode' : 'Dark Mode');
  });
}

/* ----------------------------------------------------
   2. NAVBAR & MOBILE MENU
   ---------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isActive = navLinks.classList.toggle('mobile-active');
      mobileBtn.innerHTML = isActive ? '✕' : '☰';
      mobileBtn.setAttribute('aria-expanded', isActive);
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        mobileBtn.innerHTML = '☰';
      });
    });
  }
}

/* ----------------------------------------------------
   3. INTERACTIVE MULTIPLICATION TABLE EXPLORER
   ---------------------------------------------------- */
function initMathTableExplorer() {
  const container = document.getElementById('tableRowsContainer');
  const buttons = document.querySelectorAll('.table-btn');
  const currentTitle = document.getElementById('currentTableTitle');

  if (!container || buttons.length === 0) return;

  function renderTable(tableNum) {
    if (currentTitle) {
      currentTitle.textContent = `Times Table ${tableNum}`;
    }

    container.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
      const cell = document.createElement('div');
      cell.className = 'table-cell';
      cell.innerHTML = `<span>${tableNum} × ${i} = </span><span class="ans">${tableNum * i}</span>`;
      container.appendChild(cell);
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const num = parseInt(btn.getAttribute('data-table') || '2', 10);
      renderTable(num);
    });
  });

  // Initial render with table 2
  renderTable(2);
}

/* ----------------------------------------------------
   4. FAQ ACCORDION
   ---------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove('active');
      });
      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });
}

/* ----------------------------------------------------
   5. LEGAL TABLE OF CONTENTS & SCROLLSPY
   ---------------------------------------------------- */
function initScrollSpy() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const sections = document.querySelectorAll('.legal-section');

  if (tocLinks.length === 0 || sections.length === 0) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id') || '';
      }
    });

    if (currentId) {
      tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ----------------------------------------------------
   6. BACK TO TOP BUTTON
   ---------------------------------------------------- */
function initBackToTop() {
  const backBtn = document.getElementById('backToTopBtn');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ----------------------------------------------------
   7. MODAL LOGIC (Web demo or preview)
   ---------------------------------------------------- */
function initModals() {
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  const overlays = document.querySelectorAll('.modal-overlay');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
}

/* ----------------------------------------------------
   8. PRIVACY DATA DELETION / CONTACT FORM
   ---------------------------------------------------- */
function initPrivacyForm() {
  const form = document.getElementById('parentRequestForm');
  const alertBox = document.getElementById('formSuccessAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = document.getElementById('reqNickname')?.value || '';
    const parentEmail = document.getElementById('reqEmail')?.value || '';

    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.innerHTML = `
        <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 8px; padding: 1rem; margin-top: 1rem; color: var(--text-main);">
          <strong>✅ Request received successfully!</strong><br>
          Our team will verify the nickname <em>"${escapeHtml(nickname)}"</em> and follow up with <em>"${escapeHtml(parentEmail)}"</em> within 24 to 48 business hours. Thank you!
        </div>
      `;
      form.reset();
    }
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
