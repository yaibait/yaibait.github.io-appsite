// ==========================================================================
// Vị Trí Lô Đất - Interactive JavaScript
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobilePanel = document.querySelector('.mobile-nav-panel');
  if (mobileBtn && mobilePanel) {
    mobileBtn.addEventListener('click', () => {
      mobilePanel.classList.toggle('open');
      const isOpen = mobilePanel.classList.contains('open');
      mobileBtn.innerHTML = isOpen ? '✕' : '☰';
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // 2. Screenshots Gallery Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panes = document.querySelectorAll('.gallery-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(i => {
          i.classList.remove('active');
          const ans = i.querySelector('.faq-answer');
          if (ans) ans.style.maxHeight = null;
        });

        // Open if it was not active
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
        }
      });
    }
  });

  // 4. Lightbox Modal for Screenshots
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.querySelector('.lightbox-close');

  const screenCards = document.querySelectorAll('.screen-card');
  screenCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const caption = card.querySelector('.screen-info h4');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Screenshot Vị Trí Lô Đất';
        if (lightboxCaption && caption) {
          lightboxCaption.textContent = caption.textContent;
        }
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('show');
      document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  }
});
