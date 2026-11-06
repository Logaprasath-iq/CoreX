/**
 * COREX - BUILT FOR PERFORMANCE
 * Main Controller: Store, Navbar, Cart Drawer, Search, RTL, Theme, Animations
 */

(function() {
  'use strict';

  // --- 1. LOCAL STORAGE HELPERS ---
  const STORAGE_KEYS = {
    CART: 'corex_cart',
    WISHLIST: 'corex_wishlist',
    THEME: 'corex_theme',
    RTL: 'corex_rtl',
    PC_BUILD: 'corex_pc_build'
  };

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || [];
    } catch(e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    updateCartUI();
  }

  function getWishlist() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST)) || [];
    } catch(e) {
      return [];
    }
  }

  function saveWishlist(list) {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(list));
    updateWishlistUI();
  }

  // --- 2. CART ACTIONS & PRODUCT ALIASES ---
  window.COREX = window.COREX || {};

  // Canonical ID aliases for backward-compatibility
  const PRODUCT_ALIASES = {
    'keyboard-apex-pro': 'kb-apex-pro',
    'keyboard-huntsman-v3': 'kb-apex-pro',
    'mouse-pro-x-superlight': 'mouse-logitech-mx3s',
    'mouse-viper-v3': 'mouse-logitech-mx3s',
    'psu-corsair-rm1000x': 'psu-corsair-rm750e',
    'psu-seasonic-tx1300': 'psu-corsair-rm750e',
    'case-lianli-vision': 'case-fractal-north',
    'case-nzxt-h9': 'case-fractal-north',
    'cpu-i9-14900ks': 'cpu-i5-14400',
    'cpu-i7-14700k': 'cpu-i5-14400',
    'cpu-ryzen-7600': 'cpu-ryzen-7800x3d',
    'cpu-ryzen-7950x3d': 'cpu-ryzen-7800x3d',
    'gpu-rtx4070ti': 'gpu-rtx4060',
    'gpu-rtx4080s': 'gpu-rtx4090',
    'gpu-rx7900xtx': 'gpu-rtx4090',
    'mb-rog-z790': 'mb-msi-b760',
    'mb-msi-x670e': 'mb-aorus-b650',
    'monitor-rog-pg32': 'monitor-dell-ultrasharp',
    'monitor-odyssey-g9': 'monitor-dell-ultrasharp',
    'ram-gskill-trident': 'ram-crucial-16gb',
    'ram-corsair-dominator': 'ram-crucial-16gb',
    'ssd-wd-sn850x': 'ssd-samsung-990pro',
    'cooler-corsair-icue': 'cooler-kraken-elite',
    'headset-sony-wh1000': 'headset-arctis-nova',
    'headset-blackshark-v2': 'headset-arctis-nova',
    'kb-logitech-mx-keys': 'kb-apex-pro',
    'ups-apc-1100va': 'hub-anker-10in1',
    'pkg-pro': 'pkg-workstation'
  };

  function resolveProductId(id) {
    if (!id) return id;
    return PRODUCT_ALIASES[id] || id;
  }
  window.COREX.resolveProductId = resolveProductId;
  window.COREX.getProductById = function(id) {
    const resolved = resolveProductId(id);
    return (typeof COREX_PRODUCTS !== 'undefined') ? COREX_PRODUCTS.find(p => p.id === resolved) : null;
  };

  window.COREX.addToCart = function(productId, qty = 1, isPackage = false, customData = null) {
    productId = resolveProductId(productId);
    const cart = getCart();
    let title = "Item";
    let price = 0;
    let image = "images/products/gpu-rtx4090.jpg";
    let specs = "";

    if (customData) {
      // Custom PC Build Config
      title = customData.name || "Custom Built Gaming Rig";
      price = customData.price || 0;
      image = customData.image || "images/products/build-ultimate.jpg";
      specs = customData.specsSummary || "Custom Component Configuration";
      cart.push({
        id: 'custom-' + Date.now(),
        type: 'custom_pc',
        name: title,
        price: Number(price),
        qty: 1,
        image: image,
        specs: specs,
        components: customData.components || {}
      });
    } else if (isPackage) {
      const pkg = (typeof COREX_PACKAGES !== 'undefined') ? COREX_PACKAGES.find(p => p.id === productId) : null;
      if (pkg) {
        title = pkg.name + " (" + pkg.subtitle + ")";
        price = pkg.price;
        image = pkg.image;
        specs = pkg.highlights ? Object.values(pkg.highlights).join(' • ') : "Prebuilt Gaming Rig";
        
        const existingIdx = cart.findIndex(item => item.id === pkg.id);
        if (existingIdx > -1) {
          cart[existingIdx].qty += qty;
        } else {
          cart.push({
            id: pkg.id,
            type: 'package',
            name: title,
            price: price,
            qty: qty,
            image: image,
            specs: specs
          });
        }
      }
    } else {
      const prod = (typeof COREX_PRODUCTS !== 'undefined') ? COREX_PRODUCTS.find(p => p.id === productId) : null;
      if (prod) {
        title = prod.name;
        price = prod.price;
        image = prod.image;
        specs = prod.specs ? prod.specs.slice(0, 2).join(' • ') : "";

        const existingIdx = cart.findIndex(item => item.id === prod.id);
        if (existingIdx > -1) {
          cart[existingIdx].qty += qty;
        } else {
          cart.push({
            id: prod.id,
            type: 'product',
            name: title,
            price: price,
            qty: qty,
            image: image,
            specs: specs
          });
        }
      }
    }

    saveCart(cart);
    window.COREX.showToast(`Added "${title}" to your cart!`, 'success');
    window.COREX.openCartDrawer();
  };

  window.COREX.removeFromCart = function(index) {
    const cart = getCart();
    if (index >= 0 && index < cart.length) {
      const removed = cart.splice(index, 1)[0];
      saveCart(cart);
      window.COREX.showToast(`Removed "${removed.name}" from cart`, 'info');
      // If on order page, trigger order refresh
      if (typeof window.renderOrderPage === 'function') {
        window.renderOrderPage();
      }
    }
  };

  window.COREX.updateCartQty = function(index, delta) {
    const cart = getCart();
    if (cart[index]) {
      cart[index].qty = Math.max(1, (cart[index].qty || 1) + delta);
      saveCart(cart);
      if (typeof window.renderOrderPage === 'function') {
        window.renderOrderPage();
      }
    }
  };

  window.COREX.clearCart = function() {
    saveCart([]);
    if (typeof window.renderOrderPage === 'function') {
      window.renderOrderPage();
    }
  };

  function updateCartUI() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const subtotal = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.qty || 1)), 0);

    // Badges
    document.querySelectorAll('.cart-count-badge').forEach(el => {
      el.textContent = count;
      if (count > 0) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    // Drawer elements
    const drawerList = document.getElementById('drawer-cart-items');
    const drawerSubtotal = document.getElementById('drawer-cart-subtotal');
    const drawerEmpty = document.getElementById('drawer-cart-empty');
    const drawerFilled = document.getElementById('drawer-cart-content');

    if (drawerSubtotal) {
      drawerSubtotal.textContent = '₹' + subtotal.toLocaleString('en-IN');
    }

    if (drawerList) {
      if (cart.length === 0) {
        if (drawerEmpty) drawerEmpty.classList.remove('hidden');
        if (drawerFilled) drawerFilled.classList.add('hidden');
        drawerList.innerHTML = '';
      } else {
        if (drawerEmpty) drawerEmpty.classList.add('hidden');
        if (drawerFilled) drawerFilled.classList.remove('hidden');
        
        drawerList.innerHTML = cart.map((item, idx) => `
          <div class="flex items-center gap-3 p-3 bg-neutral-900/60 rounded-xl border border-neutral-800">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg bg-black border border-neutral-800 flex-shrink-0" onerror="this.src='images/logo/corex-symbol.png'">
            <div class="flex-1 min-w-0">
              <h4 class="text-xs font-semibold text-white truncate">${item.name}</h4>
              <p class="text-[11px] text-neutral-400 mt-0.5 truncate">${item.specs || ''}</p>
              <div class="flex items-center justify-between mt-2">
                <span class="text-xs font-bold text-burgundy-400">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
                <div class="flex items-center gap-2 border border-neutral-700 rounded-lg px-2 py-0.5 bg-black/40">
                  <button onclick="window.COREX.updateCartQty(${idx}, -1)" class="text-neutral-400 hover:text-white text-xs px-1">-</button>
                  <span class="text-xs font-bold text-white">${item.qty}</span>
                  <button onclick="window.COREX.updateCartQty(${idx}, 1)" class="text-neutral-400 hover:text-white text-xs px-1">+</button>
                </div>
              </div>
            </div>
            <button onclick="window.COREX.removeFromCart(${idx})" class="p-1.5 text-neutral-500 hover:text-red-400 transition" title="Remove">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        `).join('');

        if (window.lucide) {
          window.lucide.createIcons();
        }
      }
    }
  }

  // --- 3. WISHLIST ACTIONS ---
  window.COREX.toggleWishlist = function(productId) {
    productId = resolveProductId(productId);
    let list = getWishlist();
    const idx = list.indexOf(productId);
    let added = false;
    if (idx > -1) {
      list.splice(idx, 1);
      window.COREX.showToast('Removed item from your Wishlist', 'info');
    } else {
      list.push(productId);
      added = true;
      window.COREX.showToast('Added item to your Wishlist!', 'success');
    }
    saveWishlist(list);
    return added;
  };

  function updateWishlistUI() {
    const list = getWishlist();
    document.querySelectorAll('.wishlist-count-badge').forEach(el => {
      el.textContent = list.length;
      if (list.length > 0) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      const pid = btn.getAttribute('data-wishlist-id');
      const icon = btn.querySelector('i, svg');
      if (list.includes(pid)) {
        btn.classList.add('text-burgundy', 'fill-burgundy');
        if (icon) icon.classList.add('fill-current', 'text-[#93032E]');
      } else {
        btn.classList.remove('text-burgundy', 'fill-burgundy');
        if (icon) icon.classList.remove('fill-current', 'text-[#93032E]');
      }
    });
  }

  // --- 4. TOAST NOTIFICATIONS ---
  window.COREX.showToast = function(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    
    let iconName = 'check-circle';
    if (type === 'info') iconName = 'info';
    if (type === 'error') iconName = 'alert-triangle';

    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-5 h-5 text-[#93032E] flex-shrink-0"></i>
      <span class="text-sm font-medium flex-1">${message}</span>
      <button class="text-neutral-500 hover:text-white transition" onclick="this.parentElement.remove()">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 3800);
  };

  // --- 5. THEME & RTL CONTROLS ---
  function initTheme() {
    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('theme');
    const savedTheme = themeParam || localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    updateThemeIcons();
  }

  window.COREX.toggleTheme = function() {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem(STORAGE_KEYS.THEME, isLight ? 'light' : 'dark');
    updateThemeIcons();
  };

  function updateThemeIcons() {
    const isLight = document.documentElement.classList.contains('light');
    document.querySelectorAll('.theme-toggle-icon').forEach(el => {
      el.setAttribute('data-lucide', isLight ? 'moon' : 'sun');
    });
    if (window.lucide) window.lucide.createIcons();
  }

  function initRTL() {
    const savedRTL = localStorage.getItem(STORAGE_KEYS.RTL) === 'true';
    if (savedRTL) {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }

  window.COREX.toggleRTL = function() {
    const current = document.documentElement.getAttribute('dir') === 'rtl';
    const next = !current;
    document.documentElement.setAttribute('dir', next ? 'rtl' : 'ltr');
    localStorage.setItem(STORAGE_KEYS.RTL, next);
    window.COREX.showToast(next ? 'RTL Layout Enabled' : 'LTR Layout Restored', 'info');
  };

  // --- 6. CART DRAWER TOGGLE ---
  window.COREX.openCartDrawer = function() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (drawer && overlay) {
      drawer.classList.remove('hidden');
      // allow display change before sliding in
      requestAnimationFrame(() => {
        drawer.classList.remove('translate-x-full');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
      });
    }
  };

  window.COREX.closeCartDrawer = function() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (drawer && overlay) {
      drawer.classList.add('translate-x-full');
      overlay.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        if (drawer.classList.contains('translate-x-full')) {
          drawer.classList.add('hidden');
        }
      }, 300);
    }
  };

  // --- 7. SEARCH MODAL ---
  window.COREX.openSearch = function() {
    const modal = document.getElementById('search-modal');
    if (modal) {
      modal.classList.remove('hidden');
      const input = document.getElementById('search-modal-input');
      if (input) {
        input.value = '';
        input.focus();
        window.COREX.renderSearchResults('');
      }
    }
  };

  window.COREX.closeSearch = function() {
    const modal = document.getElementById('search-modal');
    if (modal) modal.classList.add('hidden');
  };

  window.COREX.renderSearchResults = function(query) {
    const resultsContainer = document.getElementById('search-modal-results');
    if (!resultsContainer) return;

    if (!query || query.trim().length === 0) {
      resultsContainer.innerHTML = `
        <div class="text-center py-8 text-neutral-500">
          <i data-lucide="search" class="w-8 h-8 mx-auto mb-2 opacity-40"></i>
          <p class="text-sm">Search by hardware name, brand, or component type...</p>
          <div class="flex flex-wrap justify-center gap-2 mt-4">
            <span class="px-2.5 py-1 text-xs bg-neutral-800 rounded-full cursor-pointer hover:bg-burgundy/40 text-neutral-300" onclick="document.getElementById('search-modal-input').value='RTX 4090'; window.COREX.renderSearchResults('RTX 4090');">RTX 4090</span>
            <span class="px-2.5 py-1 text-xs bg-neutral-800 rounded-full cursor-pointer hover:bg-burgundy/40 text-neutral-300" onclick="document.getElementById('search-modal-input').value='Ryzen'; window.COREX.renderSearchResults('Ryzen');">Ryzen 7800X3D</span>
            <span class="px-2.5 py-1 text-xs bg-neutral-800 rounded-full cursor-pointer hover:bg-burgundy/40 text-neutral-300" onclick="document.getElementById('search-modal-input').value='DDR5'; window.COREX.renderSearchResults('DDR5');">DDR5 RAM</span>
            <span class="px-2.5 py-1 text-xs bg-neutral-800 rounded-full cursor-pointer hover:bg-burgundy/40 text-neutral-300" onclick="document.getElementById('search-modal-input').value='Monitor'; window.COREX.renderSearchResults('Monitor');">OLED Monitors</span>
          </div>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const q = query.toLowerCase();
    const matches = (typeof COREX_PRODUCTS !== 'undefined') ? COREX_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.specs && p.specs.some(s => s.toLowerCase().includes(q)))
    ) : [];

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="text-center py-10 text-neutral-400">
          <i data-lucide="alert-circle" class="w-8 h-8 mx-auto mb-2 text-burgundy"></i>
          <p class="text-base font-semibold">No hardware found matching "${query}"</p>
          <p class="text-xs text-neutral-500 mt-1">Try keywords like GPU, Intel, AMD, Samsung, or Razer.</p>
        </div>
      `;
    } else {
      resultsContainer.innerHTML = `
        <div class="text-xs text-neutral-400 font-semibold mb-3">FOUND ${matches.length} PERFORMANCE PRODUCTS</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          ${matches.map(p => `
            <a href="product-details.html?id=${p.id}" class="flex items-center gap-3 p-3 bg-neutral-900/80 hover:bg-neutral-800 rounded-xl border border-neutral-800 transition group">
              <img src="${p.image}" alt="${p.name}" class="w-16 h-16 object-cover rounded-lg bg-black border border-neutral-700 flex-shrink-0">
              <div class="flex-1 min-w-0">
                <span class="text-[10px] uppercase font-bold text-burgundy">${p.brand} • ${p.category}</span>
                <h4 class="text-sm font-semibold text-white group-hover:text-burgundy transition truncate">${p.name}</h4>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-xs font-bold text-white">₹${p.price.toLocaleString('en-IN')}</span>
                  ${p.discount ? `<span class="text-[10px] text-green-400 font-semibold">${p.discount}</span>` : ''}
                </div>
              </div>
            </a>
          `).join('')}
        </div>
      `;
    }
    if (window.lucide) window.lucide.createIcons();
  };

  // --- 8. FLASH SALE COUNTDOWN ---
  function initCountdown() {
    const daysEl = document.getElementById('sale-days');
    const hoursEl = document.getElementById('sale-hours');
    const minutesEl = document.getElementById('sale-mins');
    const secondsEl = document.getElementById('sale-secs');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    // 48-hour rolling demo countdown
    let targetTime = localStorage.getItem('corex_sale_target');
    if (!targetTime || Number(targetTime) < Date.now()) {
      targetTime = Date.now() + (48 * 60 * 60 * 1000) + (14 * 60 * 1000);
      localStorage.setItem('corex_sale_target', targetTime);
    }

    function update() {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      daysEl.textContent = String(d).padStart(2, '0');
      hoursEl.textContent = String(h).padStart(2, '0');
      minutesEl.textContent = String(m).padStart(2, '0');
      secondsEl.textContent = String(s).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  // --- 9. SCROLL REVEAL OBSERVER ---
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal-init').forEach(el => observer.observe(el));
  }

  // --- 10. STICKY NAVBAR & ACTIVE PAGE HIGHLIGHT ---
  function initNavbar() {
    const nav = document.getElementById('main-navbar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 35) {
        nav.classList.add('navbar-scrolled');
      } else {
        nav.classList.remove('navbar-scrolled');
      }
    });

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }

    // Active page highlighting
    highlightActivePage();
  }

  function highlightActivePage() {
    const rawPath = window.location.pathname;
    let page = rawPath.split('/').pop().split('?')[0].split('#')[0] || 'index.html';
    if (!page || page === '') page = 'index.html';

    const navLinks = document.querySelectorAll('#main-navbar .nav-link, #mobile-menu a');
    navLinks.forEach(link => {
      link.classList.remove('active');
      link.classList.remove('text-[#93032E]');
      
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPage = href.split('/').pop().split('?')[0].split('#')[0];

      let isMatch = false;
      if (linkPage === page) {
        isMatch = true;
      } else if (page === 'product-details.html' && linkPage === 'products.html') {
        isMatch = true;
      } else if (page === 'blog-details.html' && linkPage === 'blog.html') {
        isMatch = true;
      }

      if (isMatch) {
        link.classList.add('active');
        link.classList.add('text-[#93032E]');
      }
    });

    // Also highlight Home dropdown button if on Home 1 or Home 2
    if (page === 'index.html' || page === 'home-2.html' || page === '') {
      const homeDropdownBtn = document.querySelector('#main-navbar .group > button.nav-link');
      if (homeDropdownBtn) {
        homeDropdownBtn.classList.add('active');
        homeDropdownBtn.classList.add('text-[#93032E]');
      }
    }
  }

  // --- 11. 3D CARD PERSPECTIVE TILT ---
  function init3DTilt() {
    const cards = document.querySelectorAll('.card-tilt-3d');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // --- 12. ROBUST FORM VALIDATION SUITE ---
  window.COREX.validators = {
    // 1. Name: Min 3 chars, letters/spaces only, NO NUMBERS
    validateName: function(val) {
      if (!val || typeof val !== 'string') return { valid: false, message: 'Name is required' };
      const trimmed = val.trim();
      if (trimmed.length < 3) return { valid: false, message: 'Name must be at least 3 characters long' };
      if (/\d/.test(trimmed)) return { valid: false, message: 'Name cannot contain numbers. Letters only.' };
      if (!/^[A-Za-z\s.'-]+$/.test(trimmed)) return { valid: false, message: 'Name can only contain letters and spaces' };
      return { valid: true, message: '' };
    },

    // 2. Phone: Numbers only, min 10 digits, NO LETTERS
    validatePhone: function(val) {
      if (!val || typeof val !== 'string') return { valid: false, message: 'Phone number is required' };
      const trimmed = val.trim();
      if (/[a-zA-Z]/.test(trimmed)) return { valid: false, message: 'Phone number cannot contain letters. Numbers only.' };
      const digitsOnly = trimmed.replace(/\D/g, '');
      if (digitsOnly.length < 10) return { valid: false, message: 'Phone number must be at least 10 digits (e.g. 9876543210)' };
      if (digitsOnly.length > 13) return { valid: false, message: 'Phone number cannot exceed 13 digits' };
      return { valid: true, message: '' };
    },

    // 3. Email: Valid format with @ and domain
    validateEmail: function(val) {
      if (!val || typeof val !== 'string') return { valid: false, message: 'Email address is required' };
      const trimmed = val.trim();
      if (!trimmed.includes('@')) return { valid: false, message: "Email must include '@' symbol (e.g. name@domain.com)" };
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(trimmed)) return { valid: false, message: 'Please enter a valid email address with domain (e.g. user@domain.com)' };
      return { valid: true, message: '' };
    },

    // 4. City: Letters only, min 2 chars, NO NUMBERS
    validateCity: function(val) {
      if (!val || typeof val !== 'string') return { valid: false, message: 'City is required' };
      const trimmed = val.trim();
      if (trimmed.length < 2) return { valid: false, message: 'City name must be at least 2 characters' };
      if (/\d/.test(trimmed)) return { valid: false, message: 'City cannot contain numbers. Letters only.' };
      if (!/^[A-Za-z\s.'-]+$/.test(trimmed)) return { valid: false, message: 'City can only contain letters and spaces' };
      return { valid: true, message: '' };
    },

    // 5. State: Letters only, min 2 chars, NO NUMBERS
    validateState: function(val) {
      if (!val || typeof val !== 'string') return { valid: false, message: 'State is required' };
      const trimmed = val.trim();
      if (trimmed.length < 2) return { valid: false, message: 'State name must be at least 2 characters' };
      if (/\d/.test(trimmed)) return { valid: false, message: 'State cannot contain numbers. Letters only.' };
      if (!/^[A-Za-z\s.'-]+$/.test(trimmed)) return { valid: false, message: 'State can only contain letters and spaces' };
      return { valid: true, message: '' };
    },

    // 6. PIN Code: Numbers only, exactly 6 digits
    validatePincode: function(val) {
      if (!val || typeof val !== 'string') return { valid: false, message: 'PIN Code is required' };
      const trimmed = val.trim();
      if (/[a-zA-Z]/.test(trimmed)) return { valid: false, message: 'PIN Code cannot contain letters. Numbers only.' };
      if (!/^\d{6}$/.test(trimmed)) return { valid: false, message: 'PIN Code must be a 6-digit number (e.g. 600001)' };
      return { valid: true, message: '' };
    },

    // 7. Street Address: Min 5 chars
    validateAddress: function(val) {
      if (!val || typeof val !== 'string') return { valid: false, message: 'Street address is required' };
      const trimmed = val.trim();
      if (trimmed.length < 5) return { valid: false, message: 'Please enter a complete street address (min 5 characters)' };
      return { valid: true, message: '' };
    },

    // 8. Subject: Min 3 chars
    validateSubject: function(val) {
      if (!val || typeof val !== 'string') return { valid: false, message: 'Subject is required' };
      const trimmed = val.trim();
      if (trimmed.length < 3) return { valid: false, message: 'Subject must be at least 3 characters' };
      return { valid: true, message: '' };
    },

    // 9. Message: Min 10 chars
    validateMessage: function(val) {
      if (!val || typeof val !== 'string') return { valid: false, message: 'Message is required' };
      const trimmed = val.trim();
      if (trimmed.length < 10) return { valid: false, message: 'Please provide more details (minimum 10 characters)' };
      return { valid: true, message: '' };
    },

    // 10. Date: Valid date, not in past
    validateDate: function(val) {
      if (!val) return { valid: false, message: 'Please select an appointment date' };
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(selected.getTime())) return { valid: false, message: 'Please enter a valid date' };
      if (selected < today) return { valid: false, message: 'Appointment date cannot be in the past' };
      return { valid: true, message: '' };
    }
  };

  // Helper: Show Inline Field Error
  window.COREX.showFieldError = function(inputEl, message) {
    if (!inputEl) return;
    inputEl.classList.remove('border-neutral-700', 'border-[#383838]', 'border-emerald-500');
    inputEl.classList.add('border-red-500');
    
    let errorEl = inputEl.parentElement.querySelector('.field-error-msg');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'field-error-msg text-[11px] text-red-400 mt-1 block font-medium';
      inputEl.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  };

  // Helper: Clear Inline Field Error
  window.COREX.clearFieldError = function(inputEl, markValid = true) {
    if (!inputEl) return;
    inputEl.classList.remove('border-red-500');
    if (markValid && inputEl.value.trim().length > 0) {
      inputEl.classList.add('border-emerald-500');
    } else {
      inputEl.classList.remove('border-emerald-500');
      inputEl.classList.add('border-neutral-700');
    }
    const errorEl = inputEl.parentElement.querySelector('.field-error-msg');
    if (errorEl) {
      errorEl.classList.add('hidden');
      errorEl.textContent = '';
    }
  };

  // Real-time input masking & validation listeners
  window.COREX.attachFormSanitizers = function(scope = document) {
    // 1. Names: prevent numbers on input, letters only, min 3 chars
    scope.querySelectorAll('input[data-validate="name"], #cust-name, #contact-name, #booking-name').forEach(input => {
      input.addEventListener('input', (e) => {
        const val = e.target.value;
        const clean = val.replace(/[0-9]/g, '');
        if (clean !== val) {
          e.target.value = clean;
          window.COREX.showFieldError(input, 'Numbers are not allowed in name');
        } else if (clean.trim().length >= 3) {
          window.COREX.clearFieldError(input, true);
        }
      });
      input.addEventListener('blur', () => {
        const res = window.COREX.validators.validateName(input.value);
        if (!res.valid) window.COREX.showFieldError(input, res.message);
        else window.COREX.clearFieldError(input, true);
      });
    });

    // 2. Phones: prevent letters on input, digits only, min 10
    scope.querySelectorAll('input[data-validate="phone"], input[type="tel"], #cust-phone, #contact-phone, #booking-phone').forEach(input => {
      input.addEventListener('input', (e) => {
        const val = e.target.value;
        const clean = val.replace(/[^0-9+\s-]/g, '');
        if (clean !== val) {
          e.target.value = clean;
          window.COREX.showFieldError(input, 'Letters are not allowed in phone number');
        } else {
          const digitsOnly = clean.replace(/\D/g, '');
          if (digitsOnly.length >= 10 && digitsOnly.length <= 13) {
            window.COREX.clearFieldError(input, true);
          }
        }
      });
      input.addEventListener('blur', () => {
        const res = window.COREX.validators.validatePhone(input.value);
        if (!res.valid) window.COREX.showFieldError(input, res.message);
        else window.COREX.clearFieldError(input, true);
      });
    });

    // 3. Emails: validate @ and domain
    scope.querySelectorAll('input[data-validate="email"], input[type="email"], #cust-email, #contact-email').forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.includes('@') && input.value.includes('.')) {
          const res = window.COREX.validators.validateEmail(input.value);
          if (res.valid) window.COREX.clearFieldError(input, true);
        }
      });
      input.addEventListener('blur', () => {
        const res = window.COREX.validators.validateEmail(input.value);
        if (!res.valid) window.COREX.showFieldError(input, res.message);
        else window.COREX.clearFieldError(input, true);
      });
    });

    // 4. City: letters only, no numbers
    scope.querySelectorAll('input[data-validate="city"], #cust-city').forEach(input => {
      input.addEventListener('input', (e) => {
        const val = e.target.value;
        const clean = val.replace(/[0-9]/g, '');
        if (clean !== val) {
          e.target.value = clean;
          window.COREX.showFieldError(input, 'City cannot contain numbers. Letters only.');
        } else if (clean.trim().length >= 2) {
          window.COREX.clearFieldError(input, true);
        }
      });
      input.addEventListener('blur', () => {
        const res = window.COREX.validators.validateCity(input.value);
        if (!res.valid) window.COREX.showFieldError(input, res.message);
        else window.COREX.clearFieldError(input, true);
      });
    });

    // 5. State: letters only, no numbers
    scope.querySelectorAll('input[data-validate="state"], #cust-state').forEach(input => {
      input.addEventListener('input', (e) => {
        const val = e.target.value;
        const clean = val.replace(/[0-9]/g, '');
        if (clean !== val) {
          e.target.value = clean;
          window.COREX.showFieldError(input, 'State cannot contain numbers. Letters only.');
        } else if (clean.trim().length >= 2) {
          window.COREX.clearFieldError(input, true);
        }
      });
      input.addEventListener('blur', () => {
        const res = window.COREX.validators.validateState(input.value);
        if (!res.valid) window.COREX.showFieldError(input, res.message);
        else window.COREX.clearFieldError(input, true);
      });
    });

    // 6. PIN Code: exactly 6 digits, numbers only
    scope.querySelectorAll('input[data-validate="pincode"], #cust-pin').forEach(input => {
      input.addEventListener('input', (e) => {
        const val = e.target.value;
        const clean = val.replace(/\D/g, '').slice(0, 6);
        if (clean !== val) {
          e.target.value = clean;
          window.COREX.showFieldError(input, 'PIN code must be numbers only (6 digits)');
        } else if (clean.length === 6) {
          window.COREX.clearFieldError(input, true);
        }
      });
      input.addEventListener('blur', () => {
        const res = window.COREX.validators.validatePincode(input.value);
        if (!res.valid) window.COREX.showFieldError(input, res.message);
        else window.COREX.clearFieldError(input, true);
      });
    });

    // 7. Address
    scope.querySelectorAll('#cust-address').forEach(input => {
      input.addEventListener('blur', () => {
        const res = window.COREX.validators.validateAddress(input.value);
        if (!res.valid) window.COREX.showFieldError(input, res.message);
        else window.COREX.clearFieldError(input, true);
      });
    });

    // 8. Contact Subject
    scope.querySelectorAll('#contact-subject').forEach(input => {
      input.addEventListener('blur', () => {
        const res = window.COREX.validators.validateSubject(input.value);
        if (!res.valid) window.COREX.showFieldError(input, res.message);
        else window.COREX.clearFieldError(input, true);
      });
    });

    // 9. Contact Message
    scope.querySelectorAll('#contact-message').forEach(input => {
      input.addEventListener('blur', () => {
        const res = window.COREX.validators.validateMessage(input.value);
        if (!res.valid) window.COREX.showFieldError(input, res.message);
        else window.COREX.clearFieldError(input, true);
      });
    });

    // 10. Booking Date (Set minimum to today)
    scope.querySelectorAll('#booking-date, input[type="date"]').forEach(input => {
      const todayStr = new Date().toISOString().split('T')[0];
      input.min = todayStr;
      input.addEventListener('change', () => {
        const res = window.COREX.validators.validateDate(input.value);
        if (!res.valid) window.COREX.showFieldError(input, res.message);
        else window.COREX.clearFieldError(input, true);
      });
    });
  };

  // Newsletter Submit Handler
  window.handleNewsletterSubmit = function(event, formEl) {
    if (event) event.preventDefault();
    const input = formEl.querySelector('input[type="email"]');
    if (!input) return;
    const res = window.COREX.validators.validateEmail(input.value);
    if (!res.valid) {
      window.COREX.showFieldError(input, res.message);
      window.COREX.showToast(res.message, 'error');
      input.focus();
      return;
    }
    window.COREX.clearFieldError(input, false);
    window.COREX.showToast('Subscribed to COREX Briefing successfully!', 'success');
    formEl.reset();
  };

  // --- 12B. FAQ ACCORDION HANDLER ---
  function initFAQAccordions() {
    const accordions = document.querySelectorAll('.faq-accordion');
    accordions.forEach(acc => {
      const detailsList = acc.querySelectorAll('details');
      detailsList.forEach(detail => {
        detail.addEventListener('toggle', () => {
          if (detail.open) {
            detailsList.forEach(other => {
              if (other !== detail && other.open) {
                other.removeAttribute('open');
              }
            });
          }
        });
      });
    });
  }
  window.COREX.initFAQAccordions = initFAQAccordions;

  // --- 13. INITIALIZATION ON DOM READY ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initNavbar();
    updateCartUI();
    updateWishlistUI();
    initCountdown();
    initScrollReveal();
    init3DTilt();
    window.COREX.attachFormSanitizers();
    initFAQAccordions();

    // Search input listener
    const searchInput = document.getElementById('search-modal-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        window.COREX.renderSearchResults(e.target.value);
      });
    }

    // Dismiss preloader promptly
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 100);
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

})();
