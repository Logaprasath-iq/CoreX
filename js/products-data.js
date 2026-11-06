/**
 * COREX - BUILT FOR PERFORMANCE
 * Master Product Catalogue & Hardware Database
 * Complete Computer Hardware & Peripherals Store (20 Curated Items Across All Categories)
 */

const COREX_PRODUCTS = [
  {
    "id": "cpu-i5-14400",
    "name": "Intel Core i5-14400 10-Core Desktop Processor",
    "brand": "Intel",
    "category": "Processors",
    "categorySlug": "processors",
    "price": 4490,
    "originalPrice": 5790,
    "discount": "22% OFF",
    "rating": 4.8,
    "reviewsCount": 164,
    "badge": "HOME & OFFICE VALUE",
    "stock": "In Stock",
    "featured": true,
    "flashSale": false,
    "image": "images/products/cpu-i7-14700k.jpg",
    "shortDesc": "10 Cores (6P + 4E) and 16 Threads up to 4.7 GHz with Intel UHD Graphics 730 for everyday multitasking and office efficiency.",
    "specs": [
      "10 Cores / 16 Threads",
      "Up to 4.7 GHz Max Turbo",
      "LGA 1700 Socket",
      "Intel UHD Graphics 730"
    ],
    "fullSpecs": {
      "Total Cores": "10 (6 Performance + 4 Efficient)",
      "Total Threads": "16",
      "Max Turbo Frequency": "4.70 GHz",
      "Socket": "LGA1700",
      "Cache": "20 MB Intel Smart Cache",
      "Base Power": "65W",
      "Warranty": "3 Years Brand Warranty"
    },
    "componentType": "cpu",
    "socket": "LGA1700",
    "powerDraw": 148
  },
  {
    "id": "cpu-ryzen-7800x3d",
    "name": "AMD Ryzen 7 7800X3D 8-Core Processor with 3D V-Cache",
    "brand": "AMD",
    "category": "Processors",
    "categorySlug": "processors",
    "price": 7990,
    "originalPrice": 9990,
    "discount": "20% OFF",
    "rating": 4.9,
    "reviewsCount": 230,
    "badge": "TOP GAMING CPU",
    "stock": "In Stock",
    "featured": true,
    "flashSale": true,
    "image": "images/products/cpu-ryzen-7800x3d.jpg",
    "shortDesc": "The undisputed efficiency champion with 96MB of stacked L3 3D V-Cache delivering maximum frame rates and low power draw.",
    "specs": [
      "8 Cores / 16 Threads",
      "96MB 3D V-Cache",
      "Up to 5.0 GHz Boost",
      "Socket AM5"
    ],
    "fullSpecs": {
      "Cores / Threads": "8 / 16",
      "Max Boost Clock": "5.0 GHz",
      "Total L3 Cache": "96 MB",
      "Socket": "AM5",
      "TDP": "120W",
      "Memory Support": "DDR5-5200+",
      "Warranty": "3 Years Brand Warranty"
    },
    "componentType": "cpu",
    "socket": "AM5",
    "powerDraw": 120
  },
  {
    "id": "gpu-rtx4060",
    "name": "MSI GeForce RTX 4060 Ventus 2X Black 8GB OC",
    "brand": "MSI",
    "category": "Graphics Cards",
    "categorySlug": "graphics-cards",
    "price": 6990,
    "originalPrice": 8990,
    "discount": "22% OFF",
    "rating": 4.7,
    "reviewsCount": 94,
    "badge": "1080P ESSENTIAL",
    "stock": "In Stock",
    "featured": true,
    "flashSale": false,
    "image": "images/products/gpu-rtx4070ti.jpg",
    "shortDesc": "Compact dual-fan graphics card for high-refresh 1080p gaming, hardware video encoding, and photo acceleration at only 115W.",
    "specs": [
      "8GB GDDR6",
      "Ada Lovelace Architecture",
      "Boost Clock 2490 MHz",
      "Ultra-Low 115W Power"
    ],
    "fullSpecs": {
      "CUDA Cores": "3,072",
      "Memory": "8GB GDDR6",
      "Memory Interface": "128-bit",
      "Outputs": "3x DisplayPort 1.4a, 1x HDMI 2.1a",
      "Recommended PSU": "550W",
      "Warranty": "3 Years Brand Warranty"
    },
    "componentType": "gpu",
    "powerDraw": 115
  },
  {
    "id": "gpu-rtx4090",
    "name": "ASUS ROG Strix GeForce RTX 4090 OC 24GB GDDR6X",
    "brand": "ASUS ROG",
    "category": "Graphics Cards",
    "categorySlug": "graphics-cards",
    "price": 19990,
    "originalPrice": 24990,
    "discount": "20% OFF",
    "rating": 4.9,
    "reviewsCount": 142,
    "badge": "FLAGSHIP BEAST",
    "stock": "In Stock",
    "featured": true,
    "flashSale": true,
    "image": "images/products/gpu-rtx4090.jpg",
    "shortDesc": "The pinnacle of GPU engineering with 24GB GDDR6X, 16,384 CUDA cores, and patented vapor chamber for extreme rendering and 4K gaming.",
    "specs": [
      "24GB GDDR6X",
      "16,384 CUDA Cores",
      "Boost Clock 2640 MHz",
      "450W TDP"
    ],
    "fullSpecs": {
      "CUDA Cores": "16,384",
      "Memory Interface": "384-bit",
      "Memory Speed": "21 Gbps",
      "Recommended PSU": "1000W",
      "Warranty": "3 Years Brand Warranty"
    },
    "componentType": "gpu",
    "powerDraw": 450
  },
  {
    "id": "mb-msi-b760",
    "name": "MSI PRO B760M-A WiFi DDR5 Motherboard",
    "brand": "MSI",
    "category": "Motherboards",
    "categorySlug": "motherboards",
    "price": 2990,
    "originalPrice": 3890,
    "discount": "23% OFF",
    "rating": 4.7,
    "reviewsCount": 65,
    "badge": "OFFICE & HOME CHOICE",
    "stock": "In Stock",
    "featured": false,
    "flashSale": false,
    "image": "images/products/mb-aorus-b650.jpg",
    "shortDesc": "Reliable Intel LGA 1700 motherboard with DDR5 support, PCIe 4.0 x16, dual M.2 slots, 2.5G LAN, and Wi-Fi 6E.",
    "specs": [
      "LGA 1700 Socket",
      "DDR5 up to 6800+ MHz",
      "Dual Gen4 M.2 Slots",
      "Wi-Fi 6E & 2.5G LAN"
    ],
    "fullSpecs": {
      "Chipset": "Intel B760",
      "Socket": "LGA1700",
      "Memory Slots": "4x DDR5 (Up to 192GB)",
      "Form Factor": "Micro-ATX",
      "Warranty": "3 Years Brand Warranty"
    },
    "componentType": "motherboard",
    "socket": "LGA1700"
  },
  {
    "id": "mb-aorus-b650",
    "name": "Gigabyte B650 AORUS Elite AX V2 AM5 Motherboard",
    "brand": "Gigabyte",
    "category": "Motherboards",
    "categorySlug": "motherboards",
    "price": 3490,
    "originalPrice": 4490,
    "discount": "22% OFF",
    "rating": 4.8,
    "reviewsCount": 92,
    "badge": "AM5 BESTSELLER",
    "stock": "In Stock",
    "featured": true,
    "flashSale": false,
    "image": "images/products/mb-aorus-b650.jpg",
    "shortDesc": "Twin 12+2+2 digital VRM power phases, PCIe 5.0 M.2 slot, Wi-Fi 6E, and reinforced PCIe slot designed for AMD Ryzen 7000/8000.",
    "specs": [
      "AMD Socket AM5",
      "12+2+2 Phase VRM",
      "PCIe 5.0 M.2 Support",
      "Wi-Fi 6E & 2.5G LAN"
    ],
    "fullSpecs": {
      "Chipset": "AMD B650",
      "Socket": "AM5",
      "Memory": "4x DDR5 DIMM (up to 8000MHz OC)",
      "PCIe Slots": "1x PCIe 4.0 x16, 2x PCIe 3.0 x1",
      "Form Factor": "ATX",
      "Warranty": "3 Years Brand Warranty"
    },
    "componentType": "motherboard",
    "socket": "AM5"
  },
  {
    "id": "ram-crucial-16gb",
    "name": "Crucial 16GB DDR5 5600MHz Desktop Memory",
    "brand": "Crucial",
    "category": "RAM",
    "categorySlug": "ram",
    "price": 1190,
    "originalPrice": 1590,
    "discount": "25% OFF",
    "rating": 4.7,
    "reviewsCount": 135,
    "badge": "HOME & WORK READY",
    "stock": "In Stock",
    "featured": false,
    "flashSale": false,
    "image": "images/products/ram-gskill-trident.jpg",
    "shortDesc": "Reliable plug-and-play DDR5 desktop RAM module running at 5600MHz CL46 for smooth everyday computing, office suites, and browser multitasking.",
    "specs": [
      "16GB Single Module",
      "DDR5 5600 MT/s",
      "1.1V Low Power",
      "Universal Compatibility"
    ],
    "fullSpecs": {
      "Capacity": "16GB",
      "Speed": "DDR5-5600",
      "Latency": "CL46",
      "Voltage": "1.1V",
      "Warranty": "Limited Lifetime Warranty"
    },
    "componentType": "ram"
  },
  {
    "id": "ssd-samsung-990pro",
    "name": "Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD",
    "brand": "Samsung",
    "category": "SSD & HDD",
    "categorySlug": "storage",
    "price": 1790,
    "originalPrice": 2390,
    "discount": "25% OFF",
    "rating": 4.9,
    "reviewsCount": 310,
    "badge": "GEN4 BENCHMARK KING",
    "stock": "In Stock",
    "featured": true,
    "flashSale": true,
    "image": "images/products/ssd-samsung-990pro.jpg",
    "shortDesc": "Blazing sequential read speeds up to 7450 MB/s and write speeds up to 6900 MB/s powered by Samsung's in-house Pascal controller.",
    "specs": [
      "2TB NVMe M.2 (2280)",
      "Sequential Read: 7450 MB/s",
      "Sequential Write: 6900 MB/s",
      "1200 TBW Endurance"
    ],
    "fullSpecs": {
      "Capacity": "2TB",
      "Interface": "PCIe Gen 4.0 x4, NVMe 2.0",
      "Form Factor": "M.2 2280",
      "Controller": "Samsung In-House Pascal",
      "DRAM Cache": "2GB LPDDR4",
      "Warranty": "5 Years Brand Warranty"
    },
    "componentType": "ssd"
  },
  {
    "id": "hdd-seagate-2tb",
    "name": "Seagate BarraCuda 2TB 7200 RPM 3.5\" Internal HDD",
    "brand": "Seagate",
    "category": "SSD & HDD",
    "categorySlug": "storage",
    "price": 1490,
    "originalPrice": 1990,
    "discount": "25% OFF",
    "rating": 4.7,
    "reviewsCount": 280,
    "badge": "MASS STORAGE VALUE",
    "stock": "In Stock",
    "featured": false,
    "flashSale": false,
    "image": "images/categories/storage.jpg",
    "shortDesc": "Proven, cost-effective hard drive for mass data backup, home video collections, documents, and office archiving with 256MB cache.",
    "specs": [
      "2TB Capacity",
      "7200 RPM Spindle Speed",
      "256MB Cache",
      "SATA 6Gb/s Interface"
    ],
    "fullSpecs": {
      "Capacity": "2TB",
      "Form Factor": "3.5-inch",
      "Spindle Speed": "7200 RPM",
      "Cache": "256 MB",
      "Warranty": "2 Years Brand Warranty"
    },
    "componentType": "hdd"
  },
  {
    "id": "psu-corsair-rm750e",
    "name": "Corsair RMe Series RM750e 750W 80+ Gold Fully Modular",
    "brand": "Corsair",
    "category": "Power Supplies",
    "categorySlug": "power-supplies",
    "price": 1690,
    "originalPrice": 2290,
    "discount": "26% OFF",
    "rating": 4.8,
    "reviewsCount": 140,
    "badge": "BEST VALUE PSU",
    "stock": "In Stock",
    "featured": false,
    "flashSale": false,
    "image": "images/products/psu-corsair-rm1000x.jpg",
    "shortDesc": "ATX 3.0 and PCIe 5.0 compliant 750-watt power supply with low-noise fan curve, 105°C-rated capacitors, and 12V-2x6 cable included.",
    "specs": [
      "750 Watts Continuous",
      "80 PLUS Gold Certified",
      "ATX 3.0 & PCIe 5.0 Ready",
      "Fully Modular Cables"
    ],
    "fullSpecs": {
      "Wattage": "750W",
      "Efficiency": "80 PLUS Gold",
      "Fan Size": "120mm Rifle Bearing",
      "Warranty": "7 Years Brand Warranty"
    },
    "componentType": "psu",
    "wattage": 750
  },
  {
    "id": "case-fractal-north",
    "name": "Fractal Design North Charcoal Black Walnut Wood ATX Case",
    "brand": "Fractal Design",
    "category": "Cabinets",
    "categorySlug": "cabinets",
    "price": 1890,
    "originalPrice": 2490,
    "discount": "24% OFF",
    "rating": 4.9,
    "reviewsCount": 165,
    "badge": "MODERN INTERIOR AESTHETIC",
    "stock": "In Stock",
    "featured": true,
    "flashSale": false,
    "image": "images/products/case-fractal-north.jpg",
    "shortDesc": "Real FSC-certified walnut wood front slats combine Scandinavian home aesthetic with open airflow engineering and brass details.",
    "specs": [
      "Real Walnut Wood Front",
      "Supports GPUs up to 355mm",
      "Dual 140mm Aspect Fans",
      "Mesh / TG Side Panel"
    ],
    "fullSpecs": {
      "Motherboard Support": "ATX / mATX / Mini-ITX",
      "Front Ports": "1x USB 3.1 Gen 2 Type-C, 2x USB 3.0",
      "Warranty": "2 Years Brand Warranty"
    },
    "componentType": "cabinet"
  },
  {
    "id": "cooler-kraken-elite",
    "name": "NZXT Kraken Elite 360 RGB LCD Liquid Cooler",
    "brand": "NZXT",
    "category": "Cooling",
    "categorySlug": "cooling",
    "price": 1490,
    "originalPrice": 1990,
    "discount": "25% OFF",
    "rating": 4.8,
    "reviewsCount": 95,
    "badge": "2.36\" IPS DISPLAY",
    "stock": "In Stock",
    "featured": false,
    "flashSale": false,
    "image": "images/products/cooler-kraken-elite.jpg",
    "shortDesc": "Vibrant 2.36-inch wide-angle IPS display with 60Hz refresh rate displays live hardware temps, animated GIFs, and custom brand logos.",
    "specs": [
      "360mm Aluminum Radiator",
      "2.36\" 640x640 IPS Display",
      "Asetek 7th Gen V2 Pump",
      "3x F120 RGB Core Fans"
    ],
    "fullSpecs": {
      "Compatibility": "Intel LGA 1700/1200, AMD AM5/AM4",
      "Warranty": "6 Years Brand Warranty"
    },
    "componentType": "cooler"
  },
  {
    "id": "monitor-dell-ultrasharp",
    "name": "Dell UltraSharp 27\" 4K UHD USB-C Hub Monitor (U2723QE)",
    "brand": "Dell",
    "category": "Monitors",
    "categorySlug": "monitors",
    "price": 4990,
    "originalPrice": 6490,
    "discount": "23% OFF",
    "rating": 4.9,
    "reviewsCount": 175,
    "badge": "OFFICE & CREATOR #1",
    "stock": "In Stock",
    "featured": true,
    "flashSale": false,
    "image": "images/products/monitor-rog-pg32.jpg",
    "shortDesc": "IPS Black technology with 2000:1 contrast ratio, 98% DCI-P3 color accuracy, and 90W USB-C single cable laptop connectivity with RJ45 Ethernet.",
    "specs": [
      "27\" 4K UHD (3840x2160)",
      "IPS Black 2000:1 Contrast",
      "90W USB-C Power Delivery",
      "Built-In KVM & RJ45 Hub"
    ],
    "fullSpecs": {
      "Panel Type": "IPS Black",
      "Resolution": "3840 x 2160 at 60 Hz",
      "Color Support": "1.07 Billion Colors (98% DCI-P3)",
      "Ports": "HDMI, DP, USB-C, RJ45 Ethernet",
      "Warranty": "3 Years Advanced Exchange Service"
    },
    "componentType": "monitor"
  },
  {
    "id": "kb-apex-pro",
    "name": "SteelSeries Apex Pro TKL (Gen 3) Rapid Trigger Keyboard",
    "brand": "SteelSeries",
    "category": "Keyboards",
    "categorySlug": "keyboards",
    "price": 1290,
    "originalPrice": 1790,
    "discount": "28% OFF",
    "rating": 4.8,
    "reviewsCount": 150,
    "badge": "MAGNETIC RAPID TRIGGER",
    "stock": "In Stock",
    "featured": false,
    "flashSale": true,
    "image": "images/products/keyboard-apex-pro.jpg",
    "shortDesc": "OmniPoint 3.0 adjustable Hall Effect magnetic switches (0.1mm - 4.0mm actuation), OLED smart display, and aircraft-grade aluminum.",
    "specs": [
      "OmniPoint 3.0 Magnetic Switches",
      "Rapid Trigger Technology",
      "OLED Smart Display",
      "Double-Shot PBT Keycaps"
    ],
    "fullSpecs": {
      "Actuation Range": "0.1 mm to 4.0 mm",
      "Switch Lifespan": "100 Million Keypresses",
      "Warranty": "2 Years Brand Warranty"
    },
    "componentType": "keyboard"
  },
  {
    "id": "mouse-logitech-mx3s",
    "name": "Logitech MX Master 3S Wireless Performance Mouse",
    "brand": "Logitech",
    "category": "Mice",
    "categorySlug": "mice",
    "price": 490,
    "originalPrice": 790,
    "discount": "38% OFF",
    "rating": 4.9,
    "reviewsCount": 540,
    "badge": "#1 PRODUCTIVITY MOUSE",
    "stock": "In Stock",
    "featured": true,
    "flashSale": false,
    "image": "images/products/mouse-pro-x-superlight.jpg",
    "shortDesc": "Quiet Click switches with 8000 DPI sensor tracking on glass, MagSpeed electromagnetic scroll wheel (1,000 lines/sec), and thumb wheel.",
    "specs": [
      "8000 DPI Darkfield Sensor",
      "MagSpeed Electromagnetic Wheel",
      "Quiet Click Technology (90% Quieter)",
      "70 Days on Full Charge"
    ],
    "fullSpecs": {
      "Sensor Technology": "Darkfield High Precision (Works on Glass)",
      "Buttons": "7 Customizable Buttons",
      "Wireless Range": "10 Meters",
      "Warranty": "1 Year Brand Warranty"
    },
    "componentType": "mouse"
  },
  {
    "id": "headset-arctis-nova",
    "name": "SteelSeries Arctis Nova Pro Wireless Multi-System Headset",
    "brand": "SteelSeries",
    "category": "Headphones",
    "categorySlug": "headphones",
    "price": 1490,
    "originalPrice": 2190,
    "discount": "32% OFF",
    "rating": 4.8,
    "reviewsCount": 160,
    "badge": "DUAL BATTERY SWAP",
    "stock": "In Stock",
    "featured": false,
    "flashSale": false,
    "image": "images/products/headset-arctis-nova.jpg",
    "shortDesc": "Premium Hi-Res audio drivers, active noise cancellation, OLED base station, and infinity hot-swappable dual battery system.",
    "specs": [
      "Hi-Res Audio Drivers",
      "Active Noise Cancellation",
      "Multi-System Connect Base",
      "Infinity Battery System"
    ],
    "fullSpecs": {
      "Wireless": "2.4GHz + Bluetooth Simultaneous",
      "Warranty": "2 Years Brand Warranty"
    },
    "componentType": "headset"
  },
  {
    "id": "webcam-logitech-brio",
    "name": "Logitech Brio 4K Ultra HD Pro Business Webcam",
    "brand": "Logitech",
    "category": "Webcams",
    "categorySlug": "webcams",
    "price": 890,
    "originalPrice": 1290,
    "discount": "31% OFF",
    "rating": 4.8,
    "reviewsCount": 195,
    "badge": "4K HDR CONFERENCE",
    "stock": "In Stock",
    "featured": true,
    "flashSale": false,
    "image": "images/categories/accessories.jpg",
    "shortDesc": "Ultra 4K resolution at 30 fps or 1080p at 60 fps with RightLight 3 HDR, dual omnidirectional noise-canceling mics, and Windows Hello face login.",
    "specs": [
      "4K Ultra HD at 30 fps",
      "RightLight 3 with HDR Auto-Correction",
      "Adjustable FOV: 65° / 78° / 90°",
      "Windows Hello Facial Recognition"
    ],
    "fullSpecs": {
      "Connection": "USB-A / USB-C Plug & Play",
      "Zoom": "5x Digital Zoom",
      "Warranty": "3 Years Brand Warranty"
    },
    "componentType": "webcam"
  },
  {
    "id": "speaker-creative-pebble",
    "name": "Creative Pebble Pro 2.0 USB-C Desktop Speakers with RGB",
    "brand": "Creative",
    "category": "Speakers",
    "categorySlug": "speakers",
    "price": 590,
    "originalPrice": 890,
    "discount": "34% OFF",
    "rating": 4.7,
    "reviewsCount": 220,
    "badge": "DESKTOP AUDIO VALUE",
    "stock": "In Stock",
    "featured": false,
    "flashSale": true,
    "image": "images/categories/accessories.jpg",
    "shortDesc": "Elevated 45° angled soundstage drivers delivering 30W peak power, Clear Dialog audio processing, Bluetooth 5.3, and customizable RGB lighting.",
    "specs": [
      "30W Peak Power Audio",
      "45° Elevated Driver Angle",
      "Clear Dialog Voice Processing",
      "USB-C Audio + Bluetooth 5.3"
    ],
    "fullSpecs": {
      "Frequency Response": "80 Hz - 20,000 Hz",
      "Dimensions": "123 x 123 x 118 mm",
      "Warranty": "1 Year Brand Warranty"
    },
    "componentType": "speakers"
  },
  {
    "id": "printer-hp-smarttank",
    "name": "HP Smart Tank 580 All-in-One Wireless Ink Tank Printer",
    "brand": "HP",
    "category": "Printers",
    "categorySlug": "printers",
    "price": 3490,
    "originalPrice": 4690,
    "discount": "26% OFF",
    "rating": 4.7,
    "reviewsCount": 310,
    "badge": "ULTRA LOW-COST PRINTING",
    "stock": "In Stock",
    "featured": true,
    "flashSale": false,
    "image": "images/categories/accessories.jpg",
    "shortDesc": "Print, copy, and scan with dual-band self-healing Wi-Fi, smart guided buttons, and included ink bottles yielding up to 12,000 black pages.",
    "specs": [
      "Print, Copy, Scan All-in-One",
      "Up to 12,000 Black / 6,000 Color Pages",
      "Self-Healing Dual Band Wi-Fi",
      "HP Smart App Mobile Printing"
    ],
    "fullSpecs": {
      "Functions": "Print, Copy, Scan",
      "Print Speed": "Up to 12 ppm (Black), 5 ppm (Color)",
      "Duty Cycle": "Up to 3,000 pages per month",
      "Warranty": "1 Year or 30,000 Pages Warranty"
    },
    "componentType": "printer"
  },
  {
    "id": "hub-anker-10in1",
    "name": "Anker 10-in-1 USB-C Hub with 4K HDMI & 100W Power Delivery",
    "brand": "Anker",
    "category": "Computer Accessories",
    "categorySlug": "accessories",
    "price": 390,
    "originalPrice": 590,
    "discount": "34% OFF",
    "rating": 4.8,
    "reviewsCount": 160,
    "badge": "DESK CONNECTIVITY",
    "stock": "In Stock",
    "featured": false,
    "flashSale": true,
    "image": "images/categories/accessories.jpg",
    "shortDesc": "Massive port expansion: Dual 4K HDMI, Gigabit Ethernet, 100W PD pass-through charging, SD/TF card slots, and USB 3.2 10Gbps ports.",
    "specs": [
      "Dual 4K HDMI Outputs",
      "100W Power Delivery Pass-Through",
      "Gigabit Ethernet RJ45",
      "10Gbps USB-C & USB-A Data"
    ],
    "fullSpecs": {
      "Total Ports": "10 Ports",
      "Material": "Anodized Space Gray Aluminum",
      "Warranty": "18 Months Brand Warranty"
    },
    "componentType": "accessories"
  }
];

const COREX_PACKAGES = [
  {
    "id": "pkg-home",
    "name": "BASIC HOME PC",
    "subtitle": "Everyday Computing, Family & Web Surfing",
    "badge": "ENTRY HOME VALUE",
    "price": 11990,
    "originalPrice": 14990,
    "discount": "20% OFF",
    "image": "images/products/build-basic.jpg",
    "targetAudience": "Home documents, web streaming, email, online banking, and family everyday computing",
    "features": [
      "Intel Core i3-14100 / AMD Ryzen 3 Quad-Core Processor",
      "Intel UHD 730 Integrated Graphics",
      "16GB DDR4 3200MHz High-Speed Memory",
      "512GB NVMe PCIe 4.0 Fast Solid State Drive",
      "H610M Micro-ATX Motherboard with HDMI & VGA",
      "450W Continuous Efficient Power Supply Unit",
      "Compact Micro-ATX Quiet Airflow Chassis",
      "Windows 11 Home Pre-Configured with Antivirus",
      "USB Keyboard & Optical Mouse Set Included",
      "2-Year Onsite Pick & Drop Warranty Service"
    ],
    "highlights": {
      "cpu": "Intel Core i3 Quad-Core",
      "gpu": "Intel UHD 730 Graphics",
      "ram": "16GB Dual-Channel",
      "storage": "512GB Fast NVMe SSD",
      "purpose": "Home & Everyday Fast Web",
      "peripherals": "Keyboard & Mouse Included"
    }
  },
  {
    "id": "pkg-student",
    "name": "STUDENT PC",
    "subtitle": "Coding, Online Classes & Project Multi-tasking",
    "badge": "STUDENT SWEETSPOT",
    "price": 16990,
    "originalPrice": 19990,
    "discount": "15% OFF",
    "image": "images/products/build-gaming.jpg",
    "targetAudience": "Computer science students, school & college academics, programming (Python, Java, Web Dev), and light photo editing",
    "features": [
      "Intel Core i5-14400 10-Core / AMD Ryzen 5 7600 Processor",
      "Integrated High-Definition Digital Graphics",
      "16GB DDR5 5200MHz Next-Gen RAM",
      "1TB PCIe 4.0 NVMe High-Speed SSD",
      "B760M / A620M WiFi Motherboard with Bluetooth",
      "550W 80-Plus Certified Reliable Power Supply",
      "Mid-Tower Case with Dust Filters & Quiet Fans",
      "Microsoft Office 2024 & Windows 11 Ready",
      "High-Speed Gigabit LAN & Wi-Fi 6 Antenna",
      "3-Year Comprehensive Warranty Protection"
    ],
    "highlights": {
      "cpu": "Intel i5 (10-Core) / Ryzen 5",
      "gpu": "Integrated HD Graphics",
      "ram": "16GB DDR5 Memory",
      "storage": "1TB Fast NVMe SSD",
      "purpose": "Coding, Academics & Projects",
      "warranty": "3-Year Comprehensive"
    }
  },
  {
    "id": "pkg-office",
    "name": "OFFICE PC",
    "subtitle": "Enterprise Productivity, Spreadsheets & Multi-Display",
    "badge": "OFFICE FAVORITE",
    "popular": true,
    "price": 21990,
    "originalPrice": 25990,
    "discount": "15% OFF",
    "image": "images/products/build-pro.jpg",
    "targetAudience": "Corporate workstations, accounting (Tally/QuickBooks), large Excel financial models, ERP systems, and dual-monitor multi-tasking",
    "features": [
      "Intel Core i5-14500 14-Core High-Efficiency CPU",
      "Support for Dual 4K Display Outputs (HDMI + DisplayPort)",
      "32GB (2x16GB) DDR5 5600MHz High-Capacity RAM",
      "1TB Gen4 NVMe SSD + 2TB Secondary Backup HDD",
      "B760M Commercial Motherboard with Hardware TPM 2.0",
      "650W 80-Plus Bronze Ultra-Quiet Power Supply",
      "Acoustic Dampening Professional Black Chassis",
      "Dual-Band Wi-Fi 6E + 2.5G Enterprise Ethernet",
      "GST Invoicing with 18% Input Tax Credit Included",
      "3-Year Priority Onsite Enterprise SLA Support"
    ],
    "highlights": {
      "cpu": "Intel Core i5 14-Core",
      "gpu": "Dual 4K Multi-Display Out",
      "ram": "32GB DDR5 High-Capacity",
      "storage": "1TB SSD + 2TB Storage",
      "purpose": "Office ERP, Finance & Dual Mon",
      "support": "3-Year Enterprise SLA"
    }
  },
  {
    "id": "pkg-gaming",
    "name": "GAMING PC",
    "subtitle": "High-FPS 1440p / 4K Ray Tracing Battlebox",
    "badge": "GAMER CHOICE",
    "price": 34990,
    "originalPrice": 39990,
    "discount": "13% OFF",
    "image": "images/products/build-gaming.jpg",
    "targetAudience": "AAA gaming at 1440p high refresh rates, ray tracing, DLSS 3.5 frame generation, esports titles at 300+ FPS, and streaming",
    "features": [
      "AMD Ryzen 5 7600X / Intel Core i5-14600KF Processor",
      "NVIDIA GeForce RTX 4060 Ti 16GB / RTX 4070 12GB GPU",
      "32GB (2x16GB) DDR5 6000MHz RGB Gaming Memory",
      "1TB Samsung 990 PRO Gen4 NVMe (7450 MB/s)",
      "B650 / Z790 WiFi Gaming Motherboard",
      "750W 80-Plus Gold Fully Modular Power Supply",
      "Tempered Glass Airflow Gaming Cabinet with 4x ARGB Fans",
      "240mm Liquid AIO Cooler / Twin Tower Heatpipe Cooler",
      "Optimized Gaming BIOS with Low-Latency PBO Profiles",
      "3-Year Doorstep Warranty & Zero Assembly Fee"
    ],
    "highlights": {
      "cpu": "Ryzen 5 / Core i5 Unlocked",
      "gpu": "GeForce RTX 40-Series",
      "ram": "32GB DDR5 6000MHz",
      "storage": "1TB Ultra NVMe SSD",
      "purpose": "1440p Gaming & Ray Tracing",
      "cooling": "AIO Liquid Cooling"
    }
  },
  {
    "id": "pkg-workstation",
    "name": "PROFESSIONAL WORKSTATION",
    "subtitle": "3D Animation, Video Production & Architecture CAD",
    "badge": "STUDIO CREATOR TIER",
    "price": 49990,
    "originalPrice": 59990,
    "discount": "17% OFF",
    "image": "images/products/build-ultimate.jpg",
    "targetAudience": "Architects (AutoCAD, Revit), video editors (Premiere Pro, DaVinci Resolve Studio 4K/8K), Blender 3D artists, and AI machine learning developers",
    "features": [
      "Intel Core i9-14900K 24-Core / AMD Ryzen 9 7950X 16-Core",
      "NVIDIA GeForce RTX 4080 Super 16GB / RTX 4090 24GB",
      "64GB (2x32GB) DDR5 6000MHz High-Stability Memory",
      "2TB Gen4 NVMe OS/Cache SSD + 4TB Enterprise Storage",
      "Z790 / X670E High-Current VRM Motherboard",
      "1000W 80-Plus Gold ATX 3.0 Power Delivery",
      "Fractal Design / Lian Li Sound-Dampened Premium Chassis",
      "360mm High-Performance Liquid AIO Cooler",
      "Factory Calibrated Thermal Grizzly Kryonaut Compound",
      "3-Year VIP Replacement Service & Dedicated Concierge"
    ],
    "highlights": {
      "cpu": "Intel i9 24-Core / Ryzen 9",
      "gpu": "RTX 4080 Super / RTX 4090",
      "ram": "64GB DDR5 Memory",
      "storage": "6TB Combined Fast Storage",
      "purpose": "3D CAD, 8K Video & AI Work",
      "warranty": "3-Year VIP Concierge"
    }
  },
  {
    "id": "pkg-custom",
    "name": "CUSTOM PC BUILD",
    "subtitle": "Tailored to Your Exact Hardware & Peripheral Specs",
    "badge": "100% BESPOKE CONFIG",
    "price": 9990,
    "originalPrice": 12990,
    "discount": "23% OFF",
    "image": "images/products/build-ultimate.jpg",
    "targetAudience": "Anyone with custom requirements: choose every processor, graphics card, RAM, storage, monitor, and peripheral with live compatibility checks",
    "features": [
      "Select your exact processor, motherboard, GPU, RAM, SSD, and HDD",
      "Pick your favorite cabinet, power supply, and quiet cooling options",
      "Add office or gaming monitors, ergonomic keyboards, and precision mice",
      "Automated live socket verification & power supply wattage calculation",
      "Cleanroom precision assembly and comprehensive 72-hour burn-in testing",
      "Original retail boxes, manufacturer warranties, and insured delivery"
    ],
    "highlights": {
      "cpu": "Your Choice of CPU",
      "gpu": "Integrated or Dedicated GPU",
      "ram": "Custom Capacity DDR4/DDR5",
      "storage": "Custom SSD + HDD Array",
      "purpose": "Built for Your Exact Budget",
      "link": "build-pc.html"
    }
  }
];

const COREX_CATEGORIES = [
  {
    "name": "Processors",
    "slug": "processors",
    "count": 2,
    "image": "images/categories/processors.jpg",
    "desc": "Intel Core 14th Gen & AMD Ryzen 7000/8000 series desktop processors for home, office, and high-performance computing."
  },
  {
    "name": "Graphics Cards",
    "slug": "graphics-cards",
    "count": 2,
    "image": "images/categories/graphics-cards.jpg",
    "desc": "NVIDIA GeForce RTX 40 Series & AMD Radeon graphics cards for creative work, 3D modeling, and gaming."
  },
  {
    "name": "Motherboards",
    "slug": "motherboards",
    "count": 2,
    "image": "images/categories/motherboards.jpg",
    "desc": "Intel LGA 1700 and AMD AM5 motherboards with PCIe 5.0, Wi-Fi 6E/7, and robust power delivery."
  },
  {
    "name": "RAM",
    "slug": "ram",
    "count": 1,
    "image": "images/categories/ram.jpg",
    "desc": "High-speed DDR4 and DDR5 memory modules from Crucial, G.Skill, and Corsair for smooth multitasking."
  },
  {
    "name": "SSD & HDD",
    "slug": "storage",
    "count": 2,
    "image": "images/categories/storage.jpg",
    "desc": "Fast PCIe Gen4 NVMe M.2 solid state drives and high-capacity internal 3.5\" HDDs for everyday storage."
  },
  {
    "name": "Power Supplies",
    "slug": "power-supplies",
    "count": 1,
    "image": "images/categories/accessories.jpg",
    "desc": "80 PLUS Bronze, Gold, and Platinum certified power supplies with ATX 3.0 and silent fan modes."
  },
  {
    "name": "Cabinets",
    "slug": "cabinets",
    "count": 1,
    "image": "images/categories/case-lianli-vision.jpg",
    "desc": "Professional office towers, Scandinavian wood aesthetic cases, and airflow chassis."
  },
  {
    "name": "CPU Coolers",
    "slug": "cooling",
    "count": 1,
    "image": "images/categories/accessories.jpg",
    "desc": "Quiet air cooling towers and high-efficiency AIO liquid coolers for optimal silicon temperatures."
  },
  {
    "name": "Monitors",
    "slug": "monitors",
    "count": 1,
    "image": "images/categories/monitors.jpg",
    "desc": "Ultra-sharp 4K IPS business monitors, ergonomic productivity displays, and high-refresh screens."
  },
  {
    "name": "Keyboards",
    "slug": "keyboards",
    "count": 1,
    "image": "images/categories/keyboards.jpg",
    "desc": "Ergonomic wireless office keyboards, mechanical tactile switches, and compact desktop models."
  },
  {
    "name": "Mice",
    "slug": "mice",
    "count": 1,
    "image": "images/categories/mice.jpg",
    "desc": "Precision ergonomic productivity mice with MagSpeed scrolling and lightweight optical sensors."
  },
  {
    "name": "Headphones",
    "slug": "headphones",
    "count": 1,
    "image": "images/categories/headsets.jpg",
    "desc": "Active Noise Cancelling office headsets, wireless headphones, and crystal-clear conference headsets."
  },
  {
    "name": "Webcams",
    "slug": "webcams",
    "count": 1,
    "image": "images/categories/accessories.jpg",
    "desc": "4K and 1080p Ultra HD webcams with HDR auto-exposure and noise-canceling dual microphones."
  },
  {
    "name": "Speakers",
    "slug": "speakers",
    "count": 1,
    "image": "images/categories/accessories.jpg",
    "desc": "Compact desktop USB-C stereo speakers and high-fidelity Bluetooth bookshelf audio systems."
  },
  {
    "name": "Printers",
    "slug": "printers",
    "count": 1,
    "image": "images/categories/accessories.jpg",
    "desc": "All-in-one wireless ink tank and laser printers for home study, office documents, and color copying."
  },
  {
    "name": "Computer Accessories",
    "slug": "accessories",
    "count": 1,
    "image": "images/categories/accessories.jpg",
    "desc": "APC Back-UPS battery backups, multi-port USB-C hubs, HDMI cables, adapters, and laptop stands."
  }
];

const COREX_BLOGS = [
  {
    "id": "blog-choose-processor",
    "title": "How to Choose the Right Processor for Home, Office, or Gaming",
    "slug": "how-to-choose-the-right-processor",
    "category": "Hardware Guides",
    "date": "Nov 04, 2026",
    "author": "Arjun Verma, Hardware Lead",
    "readTime": "7 min read",
    "image": "images/blog/blog-intel-vs-amd.jpg",
    "excerpt": "Demystifying clock speeds, core counts, and thermal envelopes: A practical buying guide comparing Intel Core i3/i5/i7/i9 and AMD Ryzen 5/7/9.",
    "content": "Choosing the right central processing unit (CPU) is the foundational decision for any computer build or upgrade. Whether you are typing reports, analyzing data in Excel, editing 4K video, or playing the latest games, matching core counts to your real workload prevents overspending..."
  },
  {
    "id": "blog-ssd-vs-hdd",
    "title": "SSD vs HDD: Which Storage Drives Does Your Computer Need?",
    "slug": "ssd-vs-hdd-storage-guide",
    "category": "Storage Technology",
    "date": "Oct 30, 2026",
    "author": "Rohan Nambiar, Storage Specialist",
    "readTime": "8 min read",
    "image": "images/blog/blog-ssd-vs-hdd.jpg",
    "excerpt": "Understand the ideal storage balance: Blazing NVMe SSDs for instant operating system boots paired with high-capacity HDDs for cost-effective backups.",
    "content": "Solid State Drives (SSDs) and traditional mechanical Hard Disk Drives (HDDs) serve fundamentally different needs in modern computing. Today, a hybrid setup delivers the ultimate combination of lightning speed and vast, economical capacity..."
  },
  {
    "id": "blog-how-much-ram",
    "title": "How Much RAM Do You Need in 2026? (8GB vs 16GB vs 32GB vs 64GB)",
    "slug": "how-much-ram-do-you-need",
    "category": "Buying Guides",
    "date": "Oct 24, 2026",
    "author": "Kavya Sundaram, Hardware Engineer",
    "readTime": "6 min read",
    "image": "images/blog/blog-ram-guide.jpg",
    "excerpt": "From basic student browsing to demanding video production: A clear breakdown of RAM capacities and DDR4 vs DDR5 performance benefits.",
    "content": "Random Access Memory (RAM) directly determines how many browser tabs, documents, design tools, and background apps your system can hold concurrently without sluggish stuttering..."
  },
  {
    "id": "blog-best-monitors",
    "title": "Best Monitors for Office Productivity and Home Entertainment",
    "slug": "best-monitors-for-office-and-home",
    "category": "Display Technology",
    "date": "Oct 18, 2026",
    "author": "Arjun Verma, Hardware Lead",
    "readTime": "7 min read",
    "image": "images/blog/blog-gaming-monitors.jpg",
    "excerpt": "What to look for in a modern monitor: 4K resolution, IPS Black contrast, USB-C single cable laptop charging, eye-care certification, and ergonomic stands.",
    "content": "Your monitor is your direct window to your work and entertainment. With professionals spending over 8 hours a day at their desks, choosing a display with excellent text sharpness and flicker-free eye care is essential..."
  },
  {
    "id": "blog-choose-graphics-card",
    "title": "How to Choose a Graphics Card for Your Budget and Workload",
    "slug": "how-to-choose-a-graphics-card",
    "category": "Hardware Guides",
    "date": "Oct 12, 2026",
    "author": "Siddharth Menon, Lead Architect",
    "readTime": "9 min read",
    "image": "images/blog/blog-gpu-guide.jpg",
    "excerpt": "Integrated graphics vs dedicated GPUs: Find the sweet spot for office multi-display, creative rendering in Premiere/Blender, and 1080p/1440p gaming.",
    "content": "Not every computer requires a high-end dedicated GPU. Many modern processors provide capable integrated graphics for everyday office tasks and 4K media streaming..."
  },
  {
    "id": "blog-wired-vs-wireless-keyboard",
    "title": "Wired vs Wireless Keyboards: Ergonomics, Battery Life and Typing Feel",
    "slug": "wired-vs-wireless-keyboards",
    "category": "Peripherals Guide",
    "date": "Oct 05, 2026",
    "author": "Rohan Nambiar, Peripherals Specialist",
    "readTime": "5 min read",
    "image": "images/blog/blog-keyboards.jpg",
    "excerpt": "Mechanical switches, low-profile designs, multi-device Bluetooth pairing, and latency considerations for work and casual play.",
    "content": "The modern keyboard has evolved into an ergonomic powerhouse. Multi-device wireless keyboards allow switching between your laptop, tablet, and desktop with a single click..."
  },
  {
    "id": "blog-select-computer-mouse",
    "title": "How to Select the Ideal Computer Mouse for Long Work Days",
    "slug": "how-to-select-a-computer-mouse",
    "category": "Ergonomics",
    "date": "Sep 28, 2026",
    "author": "Kavya Sundaram, Hardware Engineer",
    "readTime": "6 min read",
    "image": "images/blog/blog-keyboards.jpg",
    "excerpt": "Combat wrist fatigue with the right ergonomics: Thumb rests, silent clicks, glass-tracking sensors, and horizontal scrolling wheels.",
    "content": "Repetitive strain from poor mouse ergonomics is one of the most common workplace complaints. Investing in a sculpted ergonomic mouse with electromagnetic scrolling transforms daily workflow..."
  },
  {
    "id": "blog-computer-buying-guide",
    "title": "Complete Computer Buying Guide: Desktop vs Laptop for Home & Work",
    "slug": "complete-computer-buying-guide",
    "category": "PC Building Guides",
    "date": "Sep 20, 2026",
    "author": "Arjun Verma, Hardware Lead",
    "readTime": "11 min read",
    "image": "images/blog/blog-how-to-build-pc.jpg",
    "excerpt": "Everything you need to know before buying a computer: Component lifespan, upgradeability advantages of desktop towers, and budget optimization.",
    "content": "Whether you are setting up a home study for your children, outfitting an office team, or building a creative workstation, desktops offer vastly superior repairability, upgradeability, and thermal performance..."
  },
  {
    "id": "blog-essential-accessories",
    "title": "9 Essential Computer Accessories for a Clean and Productive Desk",
    "slug": "essential-computer-accessories",
    "category": "Accessories & Setup",
    "date": "Sep 14, 2026",
    "author": "Siddharth Menon, Lead Architect",
    "readTime": "6 min read",
    "image": "images/categories/accessories.jpg",
    "excerpt": "From surge-protecting UPS backups and USB-C multiport docks to monitor arms and noise-isolating webcams: Upgrade your daily workspace.",
    "content": "A reliable computer is only half the workstation equation. Essential peripherals and power backups protect your expensive hardware and eliminate cable clutter..."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { COREX_PRODUCTS, COREX_PACKAGES, COREX_CATEGORIES, COREX_BLOGS };
}
