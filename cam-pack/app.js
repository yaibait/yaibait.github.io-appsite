// Translation Dictionary
const translations = {
  en: {
    nav_features: "Features",
    nav_privacy: "Privacy Policy",
    nav_terms: "Terms of Service",
    hero_badge: "📸 Professional Packaging Video Recorder",
    hero_title: "Record Shipping Packets <span>Effortlessly</span>",
    hero_desc: "CamPack helps online sellers easily record packaging videos, scan tracking codes automatically, manage local storage space, and preserve proof of shipments safely to prevent order disputes.",
    store_google_play_sub: "GET IT ON",
    store_app_store_sub: "Download on the",
    features_title: "App Features",
    features_desc: "Designed specifically for e-commerce store owners and online merchants.",
    feat_1_title: "Video Recording",
    feat_1_desc: "Capture clear video footage of your packaging process with high quality, ensuring every item detail is visible.",
    feat_2_title: "Auto QR & Barcode Scan",
    feat_2_desc: "Point the camera at the tracking label to automatically parse the order code. Easily search videos by barcode later.",
    feat_3_title: "Clean Up Storage",
    feat_3_desc: "Free up device space in bulk. Automatically clear older package videos while keeping your bookmarked archives safe.",
    feat_4_title: "Safe Archive",
    feat_4_desc: "Bookmark important videos to protect them from automated clean-ups. Keep your shipment proof safe as long as needed.",
    cta_title: "Ready to secure your shipments?",
    cta_desc: "Download CamPack today and start recording every order package with ease.",
    footer_desc: "CamPack - The ultimate packing video companion for smart online merchants.",
    footer_copyright: "© 2026 CamPack. All rights reserved."
  },
  vi: {
    nav_features: "Tính năng",
    nav_privacy: "Chính sách bảo mật",
    nav_terms: "Điều khoản dịch vụ",
    hero_badge: "📸 Quay video đóng gói hàng chuyên nghiệp",
    hero_title: "Quay video đóng gói <span>dễ dàng & thông minh</span>",
    hero_desc: "CamPack giúp các nhà bán hàng dễ dàng quay video đóng gói, tự động quét mã vận đơn (QR/Barcode), quản lý dung lượng lưu trữ cục bộ và bảo vệ bằng chứng giao hàng để phòng tránh khiếu nại.",
    store_google_play_sub: "TẢI VỀ TRÊN",
    store_app_store_sub: "Tải về từ",
    features_title: "Tính năng nổi bật",
    features_desc: "Được thiết kế dành riêng cho chủ cửa hàng thương mại điện tử và nhà bán hàng online.",
    feat_1_title: "Quay video đóng gói",
    feat_1_desc: "Ghi lại hình ảnh rõ nét quá trình đóng gói với chất lượng cao, đảm bảo hiển thị chi tiết mọi mặt hàng.",
    feat_2_title: "Tự động quét QR & Barcode",
    feat_2_desc: "Hướng camera vào nhãn vận đơn để tự động nhận diện mã đơn hàng. Tìm kiếm lại video cực nhanh bằng mã vận đơn.",
    feat_3_title: "Dọn dẹp bộ nhớ thông minh",
    feat_3_desc: "Giải phóng bộ nhớ thiết bị hàng loạt. Tự động xóa các video đóng gói cũ nhưng giữ an toàn cho các video quan trọng.",
    feat_4_title: "Lưu trữ an toàn",
    feat_4_desc: "Đánh dấu video quan trọng để bảo vệ khỏi các đợt dọn dẹp bộ nhớ tự động. Lưu trữ bằng chứng lâu dài theo nhu cầu.",
    cta_title: "Sẵn sàng bảo vệ đơn hàng của bạn?",
    cta_desc: "Tải CamPack ngay hôm nay và bắt đầu ghi hình đóng gói đơn hàng thật dễ dàng.",
    footer_desc: "CamPack - Người bạn đồng hành quay video đóng gói tối ưu dành cho nhà bán hàng thông minh.",
    footer_copyright: "© 2026 CamPack. Bảo lưu mọi quyền."
  }
};

// State Variables
let currentLanguage = 'en';

// Initialize i18n
function initLanguage() {
  // Detect saved language, fallback to browser language, default to 'en'
  const savedLang = localStorage.getItem('campack_lang');
  if (savedLang === 'en' || savedLang === 'vi') {
    currentLanguage = savedLang;
  } else {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('vi')) {
      currentLanguage = 'vi';
    } else {
      currentLanguage = 'en';
    }
  }
  
  // Set initial UI button state
  updateLanguageButtons();
  
  // Apply translation
  applyTranslations();
}

// Update Active Button Classes
function updateLanguageButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const lang = btn.getAttribute('data-lang');
    if (lang === currentLanguage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Translate All Elements with data-i18n attributes
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translations[currentLanguage][key];
    
    if (translation) {
      // Check if element has HTML elements inside (like <span>)
      if (translation.includes('<span')) {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
  
  // Update html lang attribute
  document.documentElement.lang = currentLanguage;

  // Show/Hide language-specific blocks
  document.querySelectorAll('[data-lang-content]').forEach(element => {
    const lang = element.getAttribute('data-lang-content');
    if (lang === currentLanguage) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
}

// Switch Language Function
function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'vi') return;
  currentLanguage = lang;
  localStorage.setItem('campack_lang', lang);
  updateLanguageButtons();
  applyTranslations();
}

// DOM Loaded setup
document.addEventListener('DOMContentLoaded', () => {
  // Language Switcher click listeners
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const isOpen = navLinks.classList.contains('mobile-open');
      mobileToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;'; // X mark vs Hamburger menu icon
    });
  }
  
  // Run i18n
  initLanguage();
});
