/**
 * COREX - Interactive PC Builder Configurator
 * Built for Performance
 */

(function() {
  'use strict';

  // Builder Component Slot Definitions
  const SLOTS = [
    { key: 'cpu', label: 'Processor (CPU)', category: 'Processors', required: true, icon: 'cpu' },
    { key: 'motherboard', label: 'Motherboard', category: 'Motherboards', required: true, icon: 'circuit-board' },
    { key: 'gpu', label: 'Graphics Card (GPU)', category: 'Graphics Cards', required: false, icon: 'monitor' },
    { key: 'ram', label: 'Memory (RAM)', category: 'RAM', required: true, icon: 'hard-drive' },
    { key: 'ssd', label: 'Primary Storage (SSD)', category: 'SSD & HDD', componentFilter: 'ssd', required: true, icon: 'database' },
    { key: 'hdd', label: 'Secondary Storage (HDD)', category: 'SSD & HDD', componentFilter: 'hdd', required: false, icon: 'hard-drive' },
    { key: 'cabinet', label: 'Computer Cabinet', category: 'Cabinets', required: true, icon: 'box' },
    { key: 'psu', label: 'Power Supply (PSU)', category: 'Power Supplies', required: true, icon: 'zap' },
    { key: 'cooler', label: 'CPU Cooler & Fans', category: 'Cooling', required: false, icon: 'wind' },
    { key: 'monitor', label: 'Display Monitor', category: 'Monitors', required: false, icon: 'tv' },
    { key: 'keyboard', label: 'Keyboard', category: 'Keyboards', required: false, icon: 'keyboard' },
    { key: 'mouse', label: 'Mouse', category: 'Mice', required: false, icon: 'mouse' }
  ];

  // Default build or load from localStorage
  let currentBuild = {};

  function loadSavedBuild() {
    try {
      const saved = localStorage.getItem('corex_pc_build');
      if (saved) {
        currentBuild = JSON.parse(saved);
      }
    } catch(e) {
      currentBuild = {};
    }
  }

  function saveBuildLocally() {
    localStorage.setItem('corex_pc_build', JSON.stringify(currentBuild));
  }

  // Pre-seed with recommended balanced defaults if empty
  function seedDefaultBuildIfEmpty() {
    if (Object.keys(currentBuild).length === 0) {
      currentBuild = {
        cpu: 'cpu-i5-14400',
        motherboard: 'mb-msi-b760',
        gpu: 'gpu-rtx4060',
        ram: 'ram-crucial-16gb',
        ssd: 'ssd-samsung-990pro',
        hdd: 'hdd-seagate-2tb',
        cabinet: 'case-fractal-north',
        psu: 'psu-corsair-rm750e'
      };
      saveBuildLocally();
    }
  }

  window.COREX_BUILDER = {
    selectComponent: function(slotKey, productId) {
      if (productId) {
        currentBuild[slotKey] = productId;
      } else {
        delete currentBuild[slotKey];
      }
      saveBuildLocally();
      this.render();
      window.COREX.showToast('Updated ' + slotKey.toUpperCase() + ' in your build', 'info');
    },

    removeComponent: function(slotKey) {
      delete currentBuild[slotKey];
      saveBuildLocally();
      this.render();
    },

    clearAll: function() {
      currentBuild = {};
      saveBuildLocally();
      this.render();
      window.COREX.showToast('Cleared custom configuration', 'info');
    },

    addBuildToCart: function() {
      const validation = this.checkCompatibility();
      if (!validation.isComplete) {
        window.COREX.showToast('Please select all required components before ordering', 'error');
        return;
      }

      const total = this.calculateTotal();
      const cpuItem = COREX_PRODUCTS.find(p => p.id === currentBuild.cpu);
      const gpuItem = COREX_PRODUCTS.find(p => p.id === currentBuild.gpu);

      const customName = `COREX Custom Rig (${cpuItem ? cpuItem.name.split(' ')[0] + ' ' + cpuItem.name.split(' ')[1] : 'High-End'} + ${gpuItem ? gpuItem.name.split(' ')[0] + ' ' + gpuItem.name.split(' ')[3] : 'RTX'})`;
      const summaryList = Object.keys(currentBuild).map(k => {
        const prod = COREX_PRODUCTS.find(p => p.id === currentBuild[k]);
        return prod ? `${k.toUpperCase()}: ${prod.name}` : '';
      }).filter(Boolean).join(' | ');

      window.COREX.addToCart(null, 1, false, {
        name: customName,
        price: total,
        image: 'images/products/case-lianli-vision.jpg',
        specsSummary: summaryList,
        components: currentBuild
      });
    },

    calculateTotal: function() {
      return Object.values(currentBuild).reduce((sum, pid) => {
        const prod = COREX_PRODUCTS.find(p => p.id === pid);
        return sum + (prod ? prod.price : 0);
      }, 0);
    },

    checkCompatibility: function() {
      const issues = [];
      const cpu = COREX_PRODUCTS.find(p => p.id === currentBuild.cpu);
      const mb = COREX_PRODUCTS.find(p => p.id === currentBuild.motherboard);
      const gpu = COREX_PRODUCTS.find(p => p.id === currentBuild.gpu);
      const psu = COREX_PRODUCTS.find(p => p.id === currentBuild.psu);

      // Check required
      const missingRequired = SLOTS.filter(s => s.required && !currentBuild[s.key]);
      const isComplete = missingRequired.length === 0;

      // Socket check
      if (cpu && mb) {
        if (cpu.socket && mb.socket && cpu.socket !== mb.socket) {
          issues.push(`Socket Mismatch! ${cpu.name} requires ${cpu.socket}, but ${mb.name} uses ${mb.socket}.`);
        }
      }

      // Wattage check
      let estimatedWattage = 150; // base system (fans, storage, RAM, board)
      if (cpu && cpu.powerDraw) estimatedWattage += cpu.powerDraw;
      if (gpu && gpu.powerDraw) estimatedWattage += gpu.powerDraw;

      const recommendedPsu = Math.ceil((estimatedWattage * 1.35) / 50) * 50;

      if (psu && psu.wattage) {
        if (psu.wattage < estimatedWattage) {
          issues.push(`Insufficient Power! System load (~${estimatedWattage}W) exceeds selected PSU (${psu.wattage}W). Recommended: ${recommendedPsu}W+`);
        }
      }

      return {
        isComplete,
        missingRequired,
        issues,
        estimatedWattage,
        recommendedPsu
      };
    },

    render: function() {
      const container = document.getElementById('pc-builder-slots');
      const summaryContainer = document.getElementById('pc-builder-summary');
      if (!container) return;

      const compat = this.checkCompatibility();
      const total = this.calculateTotal();

      // Render Slots
      container.innerHTML = SLOTS.map(slot => {
        const selectedId = currentBuild[slot.key];
        const selectedProd = selectedId ? COREX_PRODUCTS.find(p => p.id === selectedId) : null;
        const availableProducts = COREX_PRODUCTS.filter(p => {
          if (slot.componentFilter) return p.componentType === slot.componentFilter;
          return p.category === slot.category;
        });

        return `
          <div class="bg-neutral-900/90 rounded-2xl border ${selectedProd ? 'border-neutral-700' : 'border-neutral-800'} p-5 transition-all hover:border-[#93032E]">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              <!-- Slot Header & Icon -->
              <div class="flex items-center gap-3 min-w-[200px]">
                <div class="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[#93032E] flex-shrink-0">
                  <i data-lucide="${slot.icon}" class="w-5 h-5"></i>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-bold text-white uppercase tracking-wider">${slot.label}</span>
                    ${slot.required ? '<span class="text-[10px] text-red-400 font-semibold uppercase">Required</span>' : '<span class="text-[10px] text-neutral-500 uppercase">Optional</span>'}
                  </div>
                  <span class="text-xs text-neutral-400">${slot.category}</span>
                </div>
              </div>

              <!-- Selected Item Details -->
              <div class="flex-1">
                ${selectedProd ? `
                  <div class="flex items-center gap-4 bg-black/40 rounded-xl p-3 border border-neutral-800">
                    <img src="${selectedProd.image}" alt="${selectedProd.name}" class="w-14 h-14 object-cover rounded-lg border border-neutral-700 flex-shrink-0" onerror="this.src='images/logo/corex-symbol.png'">
                    <div class="min-w-0 flex-1">
                      <div class="flex items-center gap-2">
                        <span class="text-[10px] uppercase font-bold text-[#93032E]">${selectedProd.brand}</span>
                        ${selectedProd.socket ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">${selectedProd.socket}</span>` : ''}
                      </div>
                      <h4 class="text-sm font-semibold text-white truncate">${selectedProd.name}</h4>
                      <p class="text-xs text-neutral-400 truncate">${selectedProd.specs ? selectedProd.specs.join(' • ') : ''}</p>
                    </div>
                    <div class="text-right">
                      <div class="text-sm font-bold text-white">₹${selectedProd.price.toLocaleString('en-IN')}</div>
                      <button onclick="window.COREX_BUILDER.removeComponent('${slot.key}')" class="text-[11px] text-red-400 hover:text-red-300 transition mt-1 underline">Remove</button>
                    </div>
                  </div>
                ` : `
                  <div class="p-3 bg-neutral-950/50 rounded-xl border border-dashed border-neutral-800 text-neutral-500 text-xs flex items-center justify-between">
                    <span>No ${slot.label} selected yet</span>
                    <span class="text-[11px] text-neutral-400 font-medium">Choose below</span>
                  </div>
                `}
              </div>

              <!-- Dropdown Selector -->
              <div class="w-full lg:w-64 flex-shrink-0">
                <select onchange="window.COREX_BUILDER.selectComponent('${slot.key}', this.value)" class="w-full bg-neutral-800 border border-neutral-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#93032E] transition">
                  <option value="">-- Choose ${slot.label} --</option>
                  ${availableProducts.map(p => `
                    <option value="${p.id}" ${selectedId === p.id ? 'selected' : ''}>
                      ${p.brand} - ${p.name.slice(0, 32)}... (₹${p.price.toLocaleString('en-IN')})
                    </option>
                  `).join('')}
                </select>
              </div>

            </div>
          </div>
        `;
      }).join('');

      // Render Summary Bar
      if (summaryContainer) {
        summaryContainer.innerHTML = `
          <div class="bg-gradient-to-r from-neutral-950 via-[#1C1C1C] to-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-2xl">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <!-- Compatibility & Wattage -->
              <div class="space-y-2">
                <div class="flex items-center gap-3">
                  <span class="text-xs font-bold uppercase tracking-wider text-neutral-400">Compatibility Status:</span>
                  ${compat.issues.length === 0 ? `
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-950/80 text-green-400 border border-green-800/80">
                      <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> 100% Compatible
                    </span>
                  ` : `
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-950/80 text-red-400 border border-red-800/80">
                      <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i> Issues Detected (${compat.issues.length})
                    </span>
                  `}
                </div>

                <div class="flex items-center gap-4 text-xs text-neutral-400">
                  <span>Estimated Draw: <strong class="text-white">${compat.estimatedWattage} Watts</strong></span>
                  <span>•</span>
                  <span>Recommended PSU: <strong class="text-white">${compat.recommendedPsu}W+</strong></span>
                </div>

                ${compat.issues.map(err => `
                  <div class="text-xs text-red-400 bg-red-950/30 border border-red-900/50 px-3 py-1.5 rounded-lg">
                    ⚠️ ${err}
                  </div>
                `).join('')}
              </div>

              <!-- Price & Checkout Actions -->
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="text-left sm:text-right">
                  <span class="text-xs text-neutral-400 uppercase font-semibold">Total Custom Rig Price</span>
                  <div class="text-3xl font-black text-white font-heading">₹${total.toLocaleString('en-IN')}</div>
                  <span class="text-[11px] text-neutral-500">Includes assembly, testing & warranty</span>
                </div>
                <div class="flex items-center gap-3">
                  <button onclick="window.COREX_BUILDER.clearAll()" class="px-4 py-3 rounded-xl border border-neutral-700 hover:border-neutral-500 text-neutral-400 hover:text-white text-xs font-bold transition">
                    Reset
                  </button>
                  <button onclick="window.COREX_BUILDER.addBuildToCart()" class="px-6 py-3.5 rounded-xl bg-burgundy-grad text-white text-sm font-bold shadow-burgundy-glow hover:scale-105 transition flex items-center gap-2">
                    <i data-lucide="shopping-bag" class="w-4 h-4"></i> Add Rig to Cart
                  </button>
                  <a href="contact.html?subject=Custom%20PC%20Build%20Enquiry" class="px-5 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-bold transition flex items-center gap-2">
                    <i data-lucide="message-square" class="w-4 h-4"></i> Enquire Now
                  </a>
                </div>
              </div>

            </div>
          </div>
        `;
      }

      if (window.lucide) window.lucide.createIcons();
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    loadSavedBuild();
    seedDefaultBuildIfEmpty();
    if (document.getElementById('pc-builder-slots')) {
      window.COREX_BUILDER.render();
    }
  });

})();
