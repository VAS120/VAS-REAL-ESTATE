/**
 * VAS ESTATES LUXURY REAL ESTATE - ADVANCED PRODUCTION JAVASCRIPT ENGINE
 * Company: VAS Estates Luxury Real Estate (Accra, Ghana)
 * Founder & Principal Broker: Vincent Somuah (+233 599 120 927)
 * Email: somuahvincent18@gmail.com
 *
 * Integrated Features:
 * - Dynamic Multi-Currency Converter (USD, GHS GH₵, EUR €, GBP £) with Persistent LocalStorage
 * - Real-Time Mortgage & Investment Calculator synced with currency exchange
 * - Interactive Saved Properties Offcanvas Drawer with WhatsApp Inquire
 * - Floating WhatsApp VIP Concierge (+233 599 120 927)
 * - Quick-View Interactive Modal with Direct WhatsApp Lead Routing
 * - Sticky Header with Micro-Interactions & Mobile Drawer Navigation
 * - Instant Client-Side Catalog Search, Type Filter & Multi-Criteria Sort
 * - Architectural Gallery Lightbox & Filter Tabs
 * - FAQ Accordion with smooth transitions
 * - Toast Notification System & Form Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initWhatsAppButton();
  initScrollTop();
  initCurrencySwitcher();
  initFavoritesDrawer();
  initSearchTabs();
  initFaqAccordion();
  initMortgageCalculator();
  initGalleryFilter();
  initLightbox();
  initFloorPlanTabs();
  initForms();
  initPropertyFilter();
  initQuickView();
});

/* --- 1. Sticky Navigation & Mobile Menu --- */
function initNavbar() {
  const header = document.querySelector('.header');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdowns = document.querySelectorAll('.nav-item');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
          icon.classList.replace('fa-xmark', 'fa-bars');
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });

    // Mobile dropdown toggle
    dropdowns.forEach(item => {
      const link = item.querySelector('.nav-link');
      const menu = item.querySelector('.dropdown-menu');
      if (link && menu) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 1100) {
            e.preventDefault();
            item.classList.toggle('open');
          }
        });
      }
    });
  }
}

/* --- 2. Floating WhatsApp VIP Concierge --- */
function initWhatsAppButton() {
  if (document.querySelector('.whatsapp-floating')) return;

  const btn = document.createElement('a');
  btn.href = 'https://wa.me/233599120927?text=' + encodeURIComponent('Hello Vincent Somuah / VAS Estates, I would like to inquire about your luxury properties and private advisory.');
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.className = 'whatsapp-floating';
  btn.title = 'Chat with Vincent Somuah on WhatsApp';
  btn.innerHTML = `<i class="fa-brands fa-whatsapp"></i><span>WhatsApp Concierge</span>`;
  document.body.appendChild(btn);
}

/* --- 3. Scroll to Top Floating Button --- */
function initScrollTop() {
  if (document.querySelector('.scroll-top-btn')) return;

  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-top-btn';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 380) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- 4. Multi-Currency Switcher (USD, GHS, EUR, GBP) --- */
const CURRENCY_CONFIG = {
  USD: { symbol: '$', rate: 1.0, prefix: true },
  GHS: { symbol: 'GH₵ ', rate: 15.80, prefix: true },
  EUR: { symbol: '€', rate: 0.92, prefix: true },
  GBP: { symbol: '£', rate: 0.79, prefix: true }
};

let activeCurrency = localStorage.getItem('vas_currency') || 'USD';

function initCurrencySwitcher() {
  // Inject currency selector into topbar if present
  const topbarRight = document.querySelector('.topbar-right');
  if (topbarRight && !document.querySelector('.currency-selector')) {
    const selectorWrap = document.createElement('div');
    selectorWrap.className = 'currency-selector';
    selectorWrap.innerHTML = `
      <i class="fa-solid fa-coins" style="color: var(--accent); font-size: 0.75rem;"></i>
      <select id="vas-currency-picker" aria-label="Select Currency">
        <option value="USD">USD ($)</option>
        <option value="GHS">GHS (GH₵)</option>
        <option value="EUR">EUR (€)</option>
        <option value="GBP">GBP (£)</option>
      </select>
    `;
    topbarRight.insertBefore(selectorWrap, topbarRight.firstChild);

    const picker = document.getElementById('vas-currency-picker');
    if (picker) {
      picker.value = activeCurrency;
      picker.addEventListener('change', (e) => {
        setCurrency(e.target.value);
      });
    }
  }

  // Stamp original USD numeric prices on price elements and preserve periods
  document.querySelectorAll('.property-card, .property-price-tag, .calc-result-amount').forEach(el => {
    const priceTag = el.classList.contains('property-price-tag') ? el : el.querySelector('.property-price-tag');
    if (priceTag) {
      if (!priceTag.getAttribute('data-base-price')) {
        const rawText = priceTag.textContent || '';
        const numMatch = rawText.replace(/,/g, '').match(/\d+/);
        if (numMatch) {
          priceTag.setAttribute('data-base-price', numMatch[0]);
        }
      }
      if (priceTag.querySelector('.period') && !priceTag.getAttribute('data-period')) {
        priceTag.setAttribute('data-period', priceTag.querySelector('.period').textContent.trim());
      }
    }
  });

  function setCurrency(code) {
    if (!CURRENCY_CONFIG[code]) return;
    activeCurrency = code;
    localStorage.setItem('vas_currency', code);
    applyCurrency();
    if (typeof window.triggerMortgageCalc === 'function') {
      window.triggerMortgageCalc();
    }
    showToast(`Currency converted to ${code}`);
  }

  function applyCurrency() {
    const config = CURRENCY_CONFIG[activeCurrency] || CURRENCY_CONFIG.USD;
    document.querySelectorAll('[data-base-price]').forEach(tag => {
      const baseUSD = parseFloat(tag.getAttribute('data-base-price')) || 0;
      const converted = Math.round(baseUSD * config.rate);
      const period = tag.getAttribute('data-period');
      const periodHtml = period ? ` <span class="period">${period}</span>` : '';
      tag.innerHTML = `${config.symbol}${converted.toLocaleString()}${periodHtml}`;
    });
  }

  window.applyVasCurrency = applyCurrency;
  applyCurrency();
}

/* --- 5. Interactive Saved Properties Offcanvas Drawer --- */
function initFavoritesDrawer() {
  let favorites = JSON.parse(localStorage.getItem('vas_favorites_data') || '[]');

  // Create drawer markup if not exists
  let overlay = document.querySelector('.fav-drawer-overlay');
  let drawer = document.querySelector('.fav-drawer');

  if (!drawer) {
    overlay = document.createElement('div');
    overlay.className = 'fav-drawer-overlay';

    drawer = document.createElement('div');
    drawer.className = 'fav-drawer';
    drawer.innerHTML = `
      <div class="fav-drawer-header">
        <h3><i class="fa-solid fa-heart" style="color: var(--rose);"></i> Saved Properties (<span id="fav-drawer-count">0</span>)</h3>
        <div class="fav-drawer-close" aria-label="Close drawer"><i class="fa-solid fa-xmark"></i></div>
      </div>
      <div class="fav-drawer-body" id="fav-drawer-items"></div>
      <div class="fav-drawer-footer">
        <a href="#" id="fav-inquire-btn" class="btn btn-gold" style="width: 100%; text-align: center;">
          <i class="fa-brands fa-whatsapp"></i> Inquire on Collection via WhatsApp
        </a>
        <button id="fav-clear-btn" class="btn btn-outline" style="width: 100%; font-size: 0.85rem;">
          <i class="fa-solid fa-trash-can"></i> Clear Saved Collection
        </button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    const closeBtn = drawer.querySelector('.fav-drawer-close');
    const clearBtn = drawer.querySelector('#fav-clear-btn');
    const inquireBtn = drawer.querySelector('#fav-inquire-btn');

    closeBtn?.addEventListener('click', closeDrawer);
    overlay?.addEventListener('click', closeDrawer);

    clearBtn?.addEventListener('click', () => {
      favorites = [];
      saveFavorites();
      renderDrawer();
      showToast('Saved collection cleared.');
    });

    inquireBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      if (!favorites.length) {
        showToast('Your collection is empty. Bookmark properties first.');
        return;
      }
      const titles = favorites.map(f => `• ${f.title} (${f.price})`).join('%0A');
      const waUrl = `https://wa.me/233599120927?text=${encodeURIComponent('Hello Vincent Somuah / VAS Estates, I am interested in these properties from my saved portfolio:%0A')}${titles}`;
      window.open(waUrl, '_blank');
    });
  }

  function openDrawer() {
    renderDrawer();
    overlay.classList.add('active');
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    overlay.classList.remove('active');
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  function saveFavorites() {
    localStorage.setItem('vas_favorites_data', JSON.stringify(favorites));
    updateBadges();
  }

  function updateBadges() {
    document.querySelectorAll('.header-fav-count').forEach(badge => {
      badge.textContent = favorites.length;
    });
    const countSpan = document.getElementById('fav-drawer-count');
    if (countSpan) countSpan.textContent = favorites.length;

    // Toggle active state on cards
    document.querySelectorAll('.card-fav-btn').forEach(btn => {
      const id = btn.getAttribute('data-id');
      const isFav = favorites.some(f => f.id === id);
      const icon = btn.querySelector('i');
      if (isFav) {
        btn.classList.add('active');
        if (icon) {
          icon.classList.replace('fa-regular', 'fa-solid');
          icon.style.color = '#e11d48';
        }
      } else {
        btn.classList.remove('active');
        if (icon) {
          icon.classList.replace('fa-solid', 'fa-regular');
          icon.style.color = '';
        }
      }
    });
  }

  function renderDrawer() {
    const container = document.getElementById('fav-drawer-items');
    if (!container) return;

    if (!favorites.length) {
      container.innerHTML = `
        <div class="fav-empty-state">
          <i class="fa-regular fa-heart"></i>
          <h4>Your Portfolio is Empty</h4>
          <p>Click the heart icon on any villa, penthouse, or land holding to save it for confidential consultation.</p>
          <a href="properties.html" class="btn btn-primary btn-sm" style="margin-top: 1rem;">Explore Properties</a>
        </div>
      `;
      return;
    }

    container.innerHTML = favorites.map(item => `
      <div class="fav-item" data-id="${item.id}">
        <div class="fav-item-thumb">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="fav-item-details">
          <h4 class="fav-item-title"><a href="${item.url || 'property-details.html'}">${item.title}</a></h4>
          <div class="fav-item-price">${item.price}</div>
          <div class="fav-item-actions">
            <a href="${item.url || 'property-details.html'}" style="color: var(--primary); font-weight: 700;">View Details &rarr;</a>
            <span>&bull;</span>
            <span class="fav-item-remove" data-id="${item.id}"><i class="fa-solid fa-trash"></i> Remove</span>
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.fav-item-remove').forEach(rmBtn => {
      rmBtn.addEventListener('click', () => {
        const id = rmBtn.getAttribute('data-id');
        favorites = favorites.filter(f => f.id !== id);
        saveFavorites();
        renderDrawer();
        showToast('Property removed from collection.');
      });
    });
  }

  // Intercept header favorite button click to open drawer
  document.querySelectorAll('.header-fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer();
    });
  });

  // Card favorite button click handling
  document.querySelectorAll('.card-fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const card = btn.closest('.property-card');
      const id = btn.getAttribute('data-id') || 'prop-' + Math.random().toString(36).substr(2, 9);
      const isSaved = favorites.some(f => f.id === id);

      if (isSaved) {
        favorites = favorites.filter(f => f.id !== id);
        showToast('Removed from saved collection.');
      } else {
        const title = card?.querySelector('.property-title')?.textContent.trim() || 'Luxury Estate';
        const price = card?.querySelector('.property-price-tag')?.textContent.trim() || 'Contact for Price';
        const image = card?.querySelector('.property-thumb-wrapper img')?.src || 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80';
        const url = card?.querySelector('.property-title a')?.getAttribute('href') || 'property-details.html';

        favorites.push({ id, title, price, image, url });
        showToast('Property saved to your private collection!');
      }

      saveFavorites();
    });
  });

  updateBadges();
}

/* --- 6. Search Tabs in Hero --- */
function initSearchTabs() {
  const tabs = document.querySelectorAll('.search-tab-btn');
  const typeSelect = document.getElementById('search-purpose');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const type = tab.getAttribute('data-type');
      if (typeSelect) {
        typeSelect.value = type;
      }
    });
  });
}

/* --- 7. FAQ Accordion --- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* --- 8. Real Estate Mortgage Calculator --- */
function initMortgageCalculator() {
  const form = document.getElementById('mortgage-calc-form');
  if (!form) return;

  const priceInput = document.getElementById('calc-price');
  const downPaymentInput = document.getElementById('calc-down');
  const interestInput = document.getElementById('calc-interest');
  const termInput = document.getElementById('calc-term');
  const resultDisplay = document.getElementById('calc-monthly-total');
  const principalDisplay = document.getElementById('calc-principal-total');
  const taxDisplay = document.getElementById('calc-tax-total');

  function calculate() {
    const config = CURRENCY_CONFIG[activeCurrency] || CURRENCY_CONFIG.USD;
    const homePrice = parseFloat(priceInput.value) || 0;
    const downPayment = parseFloat(downPaymentInput.value) || 0;
    const principal = Math.max(0, homePrice - downPayment);
    const annualRate = (parseFloat(interestInput.value) || 0) / 100;
    const monthlyRate = annualRate / 12;
    const totalPayments = (parseInt(termInput.value) || 30) * 12;

    let monthlyPrincipalInterest = 0;
    if (monthlyRate > 0 && principal > 0) {
      monthlyPrincipalInterest = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else if (totalPayments > 0) {
      monthlyPrincipalInterest = principal / totalPayments;
    }

    const monthlyTax = (homePrice * 0.012) / 12;
    const monthlyInsurance = 100;
    const totalMonthly = monthlyPrincipalInterest + monthlyTax + monthlyInsurance;

    if (resultDisplay) {
      resultDisplay.textContent = config.symbol + Math.round(totalMonthly * config.rate).toLocaleString();
    }
    if (principalDisplay) {
      principalDisplay.textContent = config.symbol + Math.round(monthlyPrincipalInterest * config.rate).toLocaleString();
    }
    if (taxDisplay) {
      taxDisplay.textContent = config.symbol + Math.round(monthlyTax * config.rate).toLocaleString();
    }
  }

  window.triggerMortgageCalc = calculate;

  [priceInput, downPaymentInput, interestInput, termInput].forEach(input => {
    if (input) {
      input.addEventListener('input', calculate);
      input.addEventListener('change', calculate);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculate();
  });

  calculate();
}

/* --- 9. Gallery Filtering --- */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --- 10. Lightbox Modal Preview --- */
function initLightbox() {
  const items = document.querySelectorAll('.lightbox-trigger');
  if (!items.length) return;

  let lightbox = document.querySelector('.modal-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'modal-lightbox';
    lightbox.innerHTML = `
      <div class="modal-lightbox-close"><i class="fa-solid fa-xmark"></i></div>
      <img src="" alt="Enlarged Property" class="modal-lightbox-img">
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = lightbox.querySelector('.modal-lightbox-img');
  const closeBtn = lightbox.querySelector('.modal-lightbox-close');

  items.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const src = trigger.getAttribute('data-image') || trigger.querySelector('img')?.src;
      if (src && lightboxImg) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* --- 11. Floor Plan Tab Switcher --- */
function initFloorPlanTabs() {
  const tabs = document.querySelectorAll('.floor-plan-tab');
  const contents = document.querySelectorAll('.floor-plan-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* --- 12. Toast Notification & Form Handlers --- */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #c5a880; font-size: 1.2rem;"></i><span class="toast-msg"></span>`;
    document.body.appendChild(toast);
  }

  toast.querySelector('.toast-msg').textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function initForms() {
  const forms = document.querySelectorAll('form[data-ajax-notify]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = form.getAttribute('data-ajax-notify') || 'Thank you! Your request has been received by Vincent Somuah.';
      showToast(msg);
      form.reset();
    });
  });
}

/* --- 13. Client-Side Catalog Search & Sort --- */
function initPropertyFilter() {
  const searchInput = document.getElementById('catalog-search-input');
  const typeFilter = document.getElementById('catalog-type-filter');
  const sortSelect = document.getElementById('catalog-sort-select');
  const propertyGrid = document.getElementById('properties-catalog-grid');

  if (!propertyGrid) return;

  function filterProperties() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const selectedType = typeFilter?.value || 'all';
    const cards = Array.from(propertyGrid.querySelectorAll('.property-card'));

    cards.forEach(card => {
      const title = (card.querySelector('.property-title')?.textContent || '').toLowerCase();
      const location = (card.querySelector('.property-location')?.textContent || '').toLowerCase();
      const ptype = card.getAttribute('data-type') || '';

      const matchesQuery = !query || title.includes(query) || location.includes(query);
      const matchesType = selectedType === 'all' || ptype === selectedType;

      if (matchesQuery && matchesType) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    if (sortSelect) {
      sortCards(sortSelect.value);
    }
  }

  function sortCards(criteria) {
    const cards = Array.from(propertyGrid.querySelectorAll('.property-card'));
    cards.sort((a, b) => {
      const priceA = parseFloat(a.getAttribute('data-price') || '0');
      const priceB = parseFloat(b.getAttribute('data-price') || '0');
      if (criteria === 'price-asc') return priceA - priceB;
      if (criteria === 'price-desc') return priceB - priceA;
      return 0;
    });

    cards.forEach(card => propertyGrid.appendChild(card));
  }

  searchInput?.addEventListener('input', filterProperties);
  typeFilter?.addEventListener('change', filterProperties);
  sortSelect?.addEventListener('change', () => {
    sortCards(sortSelect.value);
  });
}

/* --- 14. Quick View Interactive Modal --- */
function initQuickView() {
  let modal = document.querySelector('.quickview-modal-backdrop');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'quickview-modal-backdrop';
    modal.innerHTML = `
      <div class="quickview-card">
        <div class="quickview-close" aria-label="Close modal"><i class="fa-solid fa-xmark"></i></div>
        <div class="quickview-media">
          <img src="" alt="Property View" class="qv-img">
        </div>
        <div class="quickview-info">
          <div>
            <div class="qv-type" style="font-size: 0.85rem; font-weight: 700; color: var(--accent); text-transform: uppercase; margin-bottom: 0.35rem;"></div>
            <h3 class="qv-title" style="font-size: 1.45rem; line-height: 1.25; margin-bottom: 0.5rem;"></h3>
            <div class="qv-loc" style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.25rem;"></div>
            <div class="qv-price" style="font-family: var(--font-heading); font-size: 1.75rem; font-weight: 700; color: var(--primary); margin-bottom: 1rem;"></div>
            <div class="qv-specs" style="display: flex; gap: 1rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; flex-wrap: wrap;"></div>
          </div>
          <div style="display: flex; gap: 0.75rem; flex-direction: column;">
            <a href="property-details.html" class="btn btn-primary qv-details-link" style="width: 100%; text-align: center;">View Full Architectural Dossier &rarr;</a>
            <a href="#" target="_blank" class="btn btn-gold qv-wa-link" style="width: 100%; text-align: center;"><i class="fa-brands fa-whatsapp"></i> Inquire via WhatsApp (+233 599 120 927)</a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const closeBtn = modal.querySelector('.quickview-close');
  const qvImg = modal.querySelector('.qv-img');
  const qvType = modal.querySelector('.qv-type');
  const qvTitle = modal.querySelector('.qv-title');
  const qvLoc = modal.querySelector('.qv-loc');
  const qvPrice = modal.querySelector('.qv-price');
  const qvSpecs = modal.querySelector('.qv-specs');
  const qvDetails = modal.querySelector('.qv-details-link');
  const qvWa = modal.querySelector('.qv-wa-link');

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // Attach quick view trigger on property thumbs
  document.querySelectorAll('.property-card').forEach(card => {
    const thumb = card.querySelector('.property-thumb-wrapper');
    if (!thumb) return;

    if (!thumb.querySelector('.quickview-trigger-btn')) {
      const qvBtn = document.createElement('button');
      qvBtn.className = 'quickview-trigger-btn';
      qvBtn.title = 'Quick Preview';
      qvBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Quick View';
      qvBtn.style.cssText = 'position: absolute; bottom: 12px; left: 12px; background: rgba(15,23,42,0.85); backdrop-filter: blur(4px); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; padding: 5px 10px; font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 5px; z-index: 5; transition: all 0.25s ease; opacity: 0; transform: translateY(6px);';
      thumb.appendChild(qvBtn);

      thumb.addEventListener('mouseenter', () => {
        qvBtn.style.opacity = '1';
        qvBtn.style.transform = 'translateY(0)';
      });
      thumb.addEventListener('mouseleave', () => {
        qvBtn.style.opacity = '0';
        qvBtn.style.transform = 'translateY(6px)';
      });

      qvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const img = thumb.querySelector('img')?.src || '';
        const title = card.querySelector('.property-title')?.textContent.trim() || 'Exclusive Property';
        const type = card.querySelector('.property-type')?.textContent.trim() || 'Luxury Real Estate';
        const loc = card.querySelector('.property-location')?.innerHTML || '';
        const price = card.querySelector('.property-price-tag')?.innerHTML || '';
        const specs = card.querySelector('.property-specs')?.innerHTML || '';
        const url = card.querySelector('.property-title a')?.getAttribute('href') || 'property-details.html';

        if (qvImg) qvImg.src = img;
        if (qvType) qvType.textContent = type;
        if (qvTitle) qvTitle.textContent = title;
        if (qvLoc) qvLoc.innerHTML = loc;
        if (qvPrice) qvPrice.innerHTML = price;
        if (qvSpecs) qvSpecs.innerHTML = specs;
        if (qvDetails) qvDetails.href = url;
        if (qvWa) {
          qvWa.href = `https://wa.me/233599120927?text=${encodeURIComponent('Hello Vincent Somuah / VAS Estates, I am interested in inquiring about ' + title + ' (' + card.querySelector('.property-price-tag')?.textContent.trim() + ').')}`;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
  });
}
