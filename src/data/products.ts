import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_minimalist_lifestyle_1790579639985.jpg';
export const AUDIO_IMAGE = '/src/assets/images/collection_smart_audio_1790579654942.jpg';
export const WORKSPACE_IMAGE = '/src/assets/images/collection_minimalist_workspace_1790579666493.jpg';
export const WELLNESS_IMAGE = '/src/assets/images/collection_active_wellness_1790579679812.jpg';
export const BEAUTY_IMAGE = '/src/assets/images/collection_skincare_botanicals_1790579691540.jpg';

export const SAMPLE_PRODUCTS: Product[] = [
  // ===================== ELECTRONICS (1 to 5) =====================
  {
    id: 'prod-elec-1',
    name: 'Aether ANC Over-Ear Studio Headphones',
    brand: 'Acoustiq Labs',
    category: 'Electronics',
    price: 2899,
    originalPrice: 4999,
    rating: 4.8,
    reviewsCount: 342,
    image: AUDIO_IMAGE,
    additionalImages: [
      AUDIO_IMAGE,
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Hybrid active noise cancelling with 48h playback and memory foam earcups.',
    description: 'Engineered for immersive listening, whether commuting or deep in focus. The Aether ANC combines custom 40mm biocellulose drivers with dual-mic active noise suppression to cancel up to 38dB of ambient chatter. Featherlight 220g chassis with breathable leatherette cushions.',
    highlights: [
      '48-hour continuous battery life with quick-charge USB-C (10 min gives 5h)',
      'Custom 40mm biocellulose diaphragms tuned for natural vocal clarity',
      'Low latency 45ms gaming and video mode',
      'Multipoint Bluetooth 5.3 pairs simultaneously with laptop and smartphone'
    ],
    specs: {
      'Driver Size': '40mm Biocellulose',
      'Battery Life': '48 hours (ANC off) / 38 hours (ANC on)',
      'Noise Cancellation': 'Hybrid Active (-38dB depth)',
      'Connectivity': 'Bluetooth 5.3 + 3.5mm Aux backup',
      'Weight': '225g',
      'Warranty': '1 Year Manufacturer Replacement'
    },
    tags: ['smart-pick', 'trending', 'flash-deal'],
    inStock: true,
    stockCount: 8,
    isLowStock: true,
    isPriceDrop: true,
    priceDropAmount: 600,
    colors: ['Matte Obsidian', 'Desert Sand', 'Slate Green'],
    smartMatchMeta: {
      idealFor: ['Students', 'Remote Workers', 'Frequent Commuters', 'Podcast Listeners'],
      useCases: ['studying', 'travel', 'daily commute', 'office focus', 'zoom meetings', 'headphones under 3000'],
      budgetTier: 'budget',
      strengths: ['Exceptional ANC for this price bracket', 'Outstanding 48h battery endurance', 'Foldable hinge design'],
      tradeoffs: 'Bass profile is neutral rather than ultra-heavy basshead tuning.'
    }
  },
  {
    id: 'prod-elec-2',
    name: 'Kinesis Tenkeyless Low-Profile Mechanical Keyboard',
    brand: 'Nomad Forge',
    category: 'Electronics',
    price: 3499,
    originalPrice: 4999,
    rating: 4.9,
    reviewsCount: 184,
    image: WORKSPACE_IMAGE,
    shortDescription: 'Slim aerospace aluminum chassis with hot-swappable tactile switches.',
    description: 'A whisper-quiet, ultra-compact mechanical keyboard crafted for programmers, writers, and ergonomic perfectionists. Designed with lubricated linear red switches, double-shot PBT keycaps, and tri-mode connection (Bluetooth, 2.4G dongle, and braided Type-C cable).',
    highlights: [
      'Anodized aluminum top plate with acoustic dampening silicone foam',
      'Tri-mode connectivity: switch between 3 devices with dedicated toggle',
      'Subtle warm white per-key backlighting with 14 brightness levels',
      'Hot-swappable 3-pin and 5-pin socket PCB'
    ],
    specs: {
      'Layout': '75% Compact (84 keys)',
      'Switch Type': 'Gateron Low-Profile Linear Red (Hot-swappable)',
      'Keycaps': 'Double-shot PBT Cherry Profile',
      'Battery': '4000mAh (Up to 200 hours backlight off)',
      'Weight': '680g',
      'Compatibility': 'macOS / Windows / Linux / iOS'
    },
    tags: ['lifestyle', 'trending'],
    inStock: true,
    stockCount: 14,
    isPriceDrop: true,
    priceDropAmount: 500,
    smartMatchMeta: {
      idealFor: ['Software Engineers', 'Copywriters', 'Desk Minimalists'],
      useCases: ['coding', 'desk setup', 'productivity', 'remote work', 'typing'],
      budgetTier: 'mid-range',
      strengths: ['Buttery smooth typing experience', 'Minimal desktop footprint', 'Tri-device switching'],
      tradeoffs: 'Low-profile keycaps have slightly less vertical travel than vintage high-profile models.'
    }
  },
  {
    id: 'prod-elec-3',
    name: 'Vessel 65W GaN Dual-Port Fast Travel Charger',
    brand: 'Voltaic',
    category: 'Electronics',
    price: 1899,
    originalPrice: 2799,
    rating: 4.7,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Pocket-sized Gallium Nitride charger capable of powering MacBooks and phones simultaneously.',
    description: 'Half the size of conventional silicone adapters. Equipped with intelligent dynamic power allocation, power delivery 3.0, and temperature shielding safeguards against overvoltage.',
    highlights: [
      'Charges a 13" MacBook Air to 50% in just 32 minutes',
      'Foldable prongs for scratch-free pocket and bag storage',
      'Active temperature sampling 60 times per second',
      'Dual Type-C ports with simultaneous 45W + 20W split'
    ],
    specs: {
      'Total Output': '65W Max GaN III',
      'Ports': '2x USB-C Power Delivery 3.0',
      'Safety': 'Multi-shield short circuit & thermal protection',
      'Dimensions': '48 x 38 x 31 mm',
      'Weight': '98g'
    },
    tags: ['smart-pick'],
    inStock: true,
    stockCount: 42,
    smartMatchMeta: {
      idealFor: ['Digital Nomads', 'Travelers', 'Students with multiple devices'],
      useCases: ['travel', 'fast charging', 'macbook charger', 'phone charger', 'gadgets under 2000'],
      budgetTier: 'budget',
      strengths: ['Insanely compact footprint', 'Stays cool even under sustained 65W load'],
      tradeoffs: 'Includes no braided cable inside the box.'
    }
  },
  {
    id: 'prod-elec-4',
    name: 'Pulse Air True Wireless Earbuds with ENC',
    brand: 'Acoustiq Labs',
    category: 'Electronics',
    price: 1499,
    originalPrice: 2999,
    rating: 4.6,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Ultra-lightweight semi-in-ear buds with quad-mic environmental noise cancellation.',
    description: 'Weighing only 3.8g per earbud, Pulse Air slips gently into your ears without pressure. Equipped with 13mm dynamic neodymium drivers that render pristine acoustic separation.',
    highlights: [
      '32 hours total endurance with compact matte magnetic charging pebble',
      'IPX5 sweat and splash resistance for morning workouts',
      'Intuitive capacitive touch sensors on both stems'
    ],
    specs: {
      'Driver': '13mm Neodymium Dynamic',
      'Playtime': '7h single charge + 25h case',
      'Water Resistance': 'IPX5',
      'Bluetooth': 'v5.3 AAC / SBC Codecs'
    },
    tags: ['flash-deal'],
    inStock: true,
    isLowStock: true,
    stockCount: 5,
    isPriceDrop: true,
    priceDropAmount: 400,
    colors: ['Porcelain White', 'Matte Sage', 'Deep Slate'],
    smartMatchMeta: {
      idealFor: ['Gym goers', 'Students', 'Budget commuters'],
      useCases: ['studying', 'casual audio', 'workouts', 'calls', 'budget earbuds under 2000'],
      budgetTier: 'budget',
      strengths: ['Featherlight fit with no ear canal fatigue', 'Clear quad-mic voice pickups for calls'],
      tradeoffs: 'Semi-in-ear design lets in moderate loud ambient subway noise.'
    }
  },
  {
    id: 'prod-elec-5',
    name: 'Lumina Smart Ambient Monitor Light Bar',
    brand: 'Nomad Forge',
    category: 'Electronics',
    price: 2499,
    originalPrice: 3899,
    rating: 4.8,
    reviewsCount: 260,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Asymmetric desktop task lamp that eliminates monitor screen glare.',
    description: 'Clips seamlessly onto curved or flat monitors without adhesive. Emits a precision 45-degree forward light angle that illuminates your desk surface without reflecting back into your eyes.',
    highlights: [
      'Stepless touch slider for color temperature (2700K warm to 6500K cool)',
      'High Color Rendering Index (Ra >= 95) for authentic true colors',
      'USB-C powered directly from your display or PC hub'
    ],
    specs: {
      'Length': '46cm',
      'Color Temperature': '2700K - 6500K adjustable',
      'CRI': 'Ra > 95',
      'Power': '5V 2A USB-C'
    },
    tags: ['lifestyle'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['Night workers', 'Designers', 'Gamers'],
      useCases: ['studying', 'reading', 'desk lighting', 'eye protection', 'home office'],
      budgetTier: 'budget',
      strengths: ['Completely eliminates screen glare', 'Frees up valuable desk real estate'],
      tradeoffs: 'Not suitable for ultra-thick vintage box monitors exceeding 45mm.'
    }
  },

  // ===================== FITNESS & WELLNESS (6 to 9) =====================
  {
    id: 'prod-fit-1',
    name: 'Terra Organic Textured Cork Yoga Mat',
    brand: 'Solstice Athletics',
    category: 'Fitness',
    price: 2199,
    originalPrice: 3499,
    rating: 4.9,
    reviewsCount: 147,
    image: WELLNESS_IMAGE,
    shortDescription: 'Naturally antimicrobial high-density cork mat with recycled rubber base.',
    description: 'Harvested from sustainably managed Portuguese oak cork bark without felling trees. The grip actively increases as your palms sweat, making it the supreme choice for Vinyasa and Ashtanga sessions.',
    highlights: [
      'Naturally antibacterial and anti-odor surface needs zero synthetic sprays',
      '5mm optimal orthopedic cushioning for knees and wrists',
      'Includes 100% unbleached woven cotton carry strap'
    ],
    specs: {
      'Dimensions': '183cm x 66cm x 5mm',
      'Material': 'Harvested Cork top + Natural tree rubber underlayer',
      'Weight': '2.1 kg',
      'Origin': 'Sustainably sourced'
    },
    tags: ['smart-pick', 'lifestyle'],
    inStock: true,
    stockCount: 19,
    smartMatchMeta: {
      idealFor: ['Yogis', 'Pilates practitioners', 'Eco-conscious athletes'],
      useCases: ['yoga', 'home workout', 'stretching', 'meditation', 'fitness under 3000'],
      budgetTier: 'budget',
      strengths: ['Superior wet grip compared to plastic PVC mats', 'Zero toxic PVC smells'],
      tradeoffs: 'Slightly heavier to carry than cheap foam mats.'
    }
  },
  {
    id: 'prod-fit-2',
    name: 'AeroFlask Matte Vacuum Insulated Bottle 750ml',
    brand: 'Solstice Athletics',
    category: 'Fitness',
    price: 1199,
    originalPrice: 1899,
    rating: 4.8,
    reviewsCount: 630,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    shortDescription: '18/8 food-grade stainless steel bottle keeping drinks icy cold for 24 hours.',
    description: 'Double-walled vacuum insulation wrapped in a scratch-resistant powder coat finish. Leakproof flip-lid with silicone carry loop fits standard car cup holders and gym cages.',
    highlights: [
      'Keeps cold for 24 hours / warm for 12 hours without external condensation',
      'BPA-free lid with smooth hygienic drink spout',
      'Electropolished interior leaves zero metallic aftertaste'
    ],
    specs: {
      'Capacity': '750 ml',
      'Material': 'Pro-Grade 18/8 Stainless Steel',
      'Insulation': 'TempShield Double Wall Vacuum',
      'Weight': '340g'
    },
    tags: ['trending'],
    inStock: true,
    colors: ['Forest Sage', 'Matte Charcoal', 'Sand Dune'],
    smartMatchMeta: {
      idealFor: ['Gym enthusiasts', 'Hikers', 'Desk hydrate trackers'],
      useCases: ['gym', 'hydration', 'travel', 'cold water', 'daily carry'],
      budgetTier: 'budget',
      strengths: ['Zero sweat on exterior', 'Indestructible steel durability'],
      tradeoffs: 'Hand wash recommended for long-term finish longevity.'
    }
  },
  {
    id: 'prod-fit-3',
    name: 'Kratos Modular Cast Iron Kettlebell 16kg',
    brand: 'Solstice Athletics',
    category: 'Fitness',
    price: 2799,
    originalPrice: 3999,
    rating: 4.7,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Single-piece gravity cast iron with smooth powder coat grip for swings and snatches.',
    description: 'Engineered with a machined flat base for zero wobbling during floor planks and pushups. Chalk-receptive powder coating protects your palms during high-volume kettlebell complexes.',
    highlights: [
      'Void-free single casting eliminates seam discomfort',
      'Color-coded handle bands for instant weight identification',
      'Flat bottom stability for renegade rows'
    ],
    specs: {
      'Weight': '16 kg',
      'Material': 'Precision Gravity Cast Iron',
      'Handle Diameter': '38mm standard Russian bell geometry'
    },
    tags: ['trending'],
    inStock: true,
    stockCount: 7,
    isLowStock: true,
    smartMatchMeta: {
      idealFor: ['Home gym builders', 'Strength trainees', 'Functional fitness enthusiasts'],
      useCases: ['strength training', 'home gym', 'fat loss', 'conditioning'],
      budgetTier: 'budget',
      strengths: ['Indestructible cast iron', 'Comfortable textured grip without blisters'],
      tradeoffs: 'Heavy delivery item.'
    }
  },
  {
    id: 'prod-fit-4',
    name: 'Forma Precision Smart Digital Body Scale',
    brand: 'Acoustiq Labs',
    category: 'Fitness',
    price: 1699,
    originalPrice: 2599,
    rating: 4.6,
    reviewsCount: 388,
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Dual-frequency BIA sensors tracking 14 key body composition biomarkers.',
    description: 'Stepped with 4 high-precision manganese sensors providing measurements accurate to 50 grams. Syncs automatically with Apple Health, Google Fit, and Fitbit over Bluetooth.',
    highlights: [
      'Monitors Body Fat %, Muscle Mass, Visceral Fat, BMI, and Basal Metabolic Rate',
      'Concealed LED display emerges only when stepped upon',
      'Supports unlimited family profiles with auto-recognition'
    ],
    specs: {
      'Capacity': '180 kg / 400 lbs',
      'Sensory': '4x High Precision Strain Gauge Sensors',
      'Glass': '6mm Tempered Safety Glass'
    },
    tags: ['smart-pick'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['Health trackers', 'Body transformation challengers'],
      useCases: ['weight tracking', 'health monitoring', 'fat loss analysis'],
      budgetTier: 'budget',
      strengths: ['Instant pairing with health apps', 'Sleek architectural glass look'],
      tradeoffs: 'Requires 3 AAA batteries (included).'
    }
  },

  // ===================== BEAUTY & SKINCARE (10 to 13) =====================
  {
    id: 'prod-beauty-1',
    name: 'Botanica Squalane & Ceramide Barrier Serum 30ml',
    brand: 'Lumiere Organics',
    category: 'Beauty',
    price: 1299,
    originalPrice: 1999,
    rating: 4.9,
    reviewsCount: 410,
    image: BEAUTY_IMAGE,
    shortDescription: '100% plant-derived squalane infused with 5 essential ceramides and gotu kola.',
    description: 'A transformative, weightless lipid serum clinically proven to lock moisture and soothe dry, irritated skin barriers. Formulated in amber glass to protect active botanical antioxidants from light degradation.',
    highlights: [
      'Non-comedogenic oil-free feel absorbs in under 45 seconds',
      'Fragrance-free, paraben-free, cruelty-free certification',
      'Replenishes compromised moisture barriers from pollution and sun'
    ],
    specs: {
      'Volume': '30 ml / 1.0 fl oz',
      'Key Actives': 'Plant Squalane, Ceramide NP/AP/EOP, Centella Asiatica',
      'Skin Type': 'Dry, Sensitive, Compromised Skin',
      'Packaging': 'Recyclable amber glass dropper'
    },
    tags: ['smart-pick', 'trending'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['Individuals with dry skin', 'Barrier repair seekers', 'Clean beauty lovers'],
      useCases: ['skincare under 1500', 'dry skin', 'skin hydration', 'barrier repair', 'sensitive skin'],
      budgetTier: 'budget',
      strengths: ['Clinically soothing without greasy residue', 'High purity plant lipids'],
      tradeoffs: 'Unscented formula has a very subtle natural botanical aroma.'
    }
  },
  {
    id: 'prod-beauty-2',
    name: 'Bakuchiol Gentle Youth Renewal Night Crème',
    brand: 'Lumiere Organics',
    category: 'Beauty',
    price: 1599,
    originalPrice: 2299,
    rating: 4.8,
    reviewsCount: 228,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Plant-based natural retinol alternative suitable for sensitive skin.',
    description: 'Formulated with 2% pharmaceutical-grade bakuchiol and cold-pressed marula oil. Encourages cellular renewal and collagen synthesis overnight without the redness or flaking typical of traditional retinol.',
    highlights: [
      'Safe for pregnancy and daytime usage (non-phototoxic)',
      'Rich velvet emulsion absorbs deep into dermis',
      'Formulated with blue tansy flower oil for calming irritation'
    ],
    specs: {
      'Volume': '50 g',
      'Key Actives': '2% Bakuchiol, Marula Oil, Blue Tansy',
      'Best Time': 'Evening night treatment'
    },
    tags: ['lifestyle'],
    inStock: true,
    stockCount: 12,
    smartMatchMeta: {
      idealFor: ['Anti-aging seekers', 'Sensitive skin types', 'Clean beauty enthusiasts'],
      useCases: ['anti-aging', 'night cream', 'skin smoothing', 'gentle retinol', 'skincare'],
      budgetTier: 'budget',
      strengths: ['All benefits of retinol without irritation', 'Deeply nourishing texture'],
      tradeoffs: 'Noticeable results require 4–6 weeks of consistent nightly use.'
    }
  },
  {
    id: 'prod-beauty-3',
    name: 'Aura Ultrasonic Rose Gold Facial Sculptor',
    brand: 'Lumiere Organics',
    category: 'Beauty',
    price: 2499,
    originalPrice: 3799,
    rating: 4.7,
    reviewsCount: 175,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Microcurrent and gentle heat facial toning device for contouring jawlines.',
    description: 'Combining 8000 acoustic sonic vibrations per minute with therapeutic 42°C warming. Relieves facial muscle tension, increases lymphatic drainage, and boosts serum absorption by up to 300%.',
    highlights: [
      'Contoured zinc alloy massage nodes fit cheekbone angles precisely',
      'USB rechargeable with 30-day battery life per charge',
      '3 intensity modes for eyes, cheeks, and neckline'
    ],
    specs: {
      'Vibration': '8000 RPM Acoustic Micro-Pulses',
      'Thermal Heat': '42°C Constant Warming',
      'Material': 'Medical-grade zinc alloy + ABS'
    },
    tags: ['trending'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['Skincare enthusiasts', 'Puffiness reduction', 'Lymphatic sculpting'],
      useCases: ['facial tool', 'anti-puffiness', 'jawline sculpting', 'skincare routine'],
      budgetTier: 'mid-range',
      strengths: ['Rapid reduction in morning facial puffiness', 'Rechargeable cordless ease'],
      tradeoffs: 'Must be paired with a conductive serum or facial oil.'
    }
  },
  {
    id: 'prod-beauty-4',
    name: 'Kyoto Hinoki & Bergamot Eau de Parfum 50ml',
    brand: 'Maison Aster',
    category: 'Beauty',
    price: 3299,
    originalPrice: 4500,
    rating: 4.9,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Woodsy meditative fragrance featuring cedarwood, Japanese cypress, and sunlit citrus.',
    description: 'An artisanal unisex extrait de parfum that transports you to a morning stroll through temple forests in Kyoto. Hand-blended in small batches with aged vetiver and sparkling bergamot top notes.',
    highlights: [
      '22% perfume oil concentration for 10+ hours lingering sillage',
      'Genderless composition with clean clean-skin musks',
      'Flacon made of recycled heavy Italian crystal'
    ],
    specs: {
      'Top Notes': 'Calabrian Bergamot, Black Pepper',
      'Heart Notes': 'Japanese Hinoki Cypress, Nutmeg',
      'Base Notes': 'Smoked Cedar, Haitian Vetiver',
      'Concentration': 'Eau de Parfum (22%)'
    },
    tags: ['lifestyle', 'new-drop'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['Fragrance connoisseurs', 'Subtle scent wearers', 'Gifting'],
      useCases: ['perfume', 'luxury fragrance', 'unisex scent', 'signature perfume under 3500'],
      budgetTier: 'mid-range',
      strengths: ['Sophisticated, non-synthetic niche aroma', 'Excellent longevity'],
      tradeoffs: 'Intimate projector rather than a loud room-filling scent.'
    }
  },

  // ===================== FASHION & APPAREL (14 to 17) =====================
  {
    id: 'prod-fash-1',
    name: 'Heavyweight Supima Relaxed Crew Tee',
    brand: 'Atelier Minimal',
    category: 'Fashion',
    price: 1299,
    originalPrice: 1999,
    rating: 4.8,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    shortDescription: '280 GSM long-staple cotton t-shirt with ribbed collar that never sags.',
    description: 'The definitive daily t-shirt engineered from 100% California Supima extra-long staple cotton. Pre-shrunk to hold its structured silhouette through dozens of wash cycles without twisting seams.',
    highlights: [
      'Heavyweight 280 GSM knit prevents clinging and transparency',
      'Reinforced double-needle binding on collar and cuffs',
      'Slightly dropped shoulder for modern relaxed drape'
    ],
    specs: {
      'Fabric': '100% Supima Combed Cotton',
      'Weight': '280 GSM Heavyweight Jersey',
      'Fit': 'Modern Relaxed Boxy Fit',
      'Care': 'Machine wash cold, tumble dry low'
    },
    tags: ['trending', 'smart-pick'],
    inStock: true,
    colors: ['Oatmeal Heather', 'Obsidian Black', 'Sage Olive'],
    sizes: ['S', 'M', 'L', 'XL'],
    smartMatchMeta: {
      idealFor: ['Capsule wardrobe minimalists', 'Quality casual wearers'],
      useCases: ['casual wear', 'daily t-shirt', 'minimalist fashion', 'cotton tee under 1500'],
      budgetTier: 'budget',
      strengths: ['Substantial fabric weight', 'Collar maintains crisp shape'],
      tradeoffs: 'Heavy knit makes it best suited for air-conditioned rooms or cool evenings.'
    }
  },
  {
    id: 'prod-fash-2',
    name: 'Merino Wool Lightweight Technical Overshirt',
    brand: 'Atelier Minimal',
    category: 'Fashion',
    price: 3899,
    originalPrice: 5500,
    rating: 4.9,
    reviewsCount: 160,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Thermo-regulating Australian merino overshirt with hidden magnetic closures.',
    description: 'An architectural layering piece that adapts to varying temperatures. Naturally odor-resistant, wrinkle-shedding, and finished with matte coated hardware and discrete travel zip pockets.',
    highlights: [
      '18.5 micron superfine merino wool is soft against bare skin',
      'Hidden interior zippered passport and phone security pocket',
      'Repels light mist and moisture droplets'
    ],
    specs: {
      'Composition': '70% Fine Merino, 30% Cordura Nylon for abrasion resistance',
      'Closure': 'Concealed magnetic placket',
      'Weight': '380g'
    },
    tags: ['lifestyle'],
    inStock: true,
    sizes: ['M', 'L', 'XL'],
    smartMatchMeta: {
      idealFor: ['Travelers', 'Urban commuters', 'Minimalist dressers'],
      useCases: ['travel shirt', 'layering', 'work casual', 'anti-wrinkle jacket'],
      budgetTier: 'mid-range',
      strengths: ['Can be worn 5 days without odor buildup', 'Sleek tailored silhouette'],
      tradeoffs: 'Requires gentle wool cycle or hand wash.'
    }
  },
  {
    id: 'prod-fash-3',
    name: 'Everyday Chino Trousers with Hidden Stretch',
    brand: 'Atelier Minimal',
    category: 'Fashion',
    price: 2499,
    originalPrice: 3499,
    rating: 4.7,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Tailored tapered chinos woven with 4-way performance stretch twill.',
    description: 'Looks like a classic Savile Row chino from the outside, feels like gym pants on the inside. Designed with a curved waistband and gusseted crotch for freedom of movement on flights or bicycle rides.',
    highlights: [
      'Stain-repellent DWR coating sheds coffee and rain spills',
      'Concealed zippered coin pocket within right pocket',
      'Breathable cotton-elastane weave'
    ],
    specs: {
      'Material': '97% Pima Cotton, 3% Roica Spandex',
      'Cut': 'Slim Tapered',
      'Inseam': '32 inches standard'
    },
    tags: ['smart-pick'],
    inStock: true,
    colors: ['Khaki Stone', 'Deep Navy', 'Charcoal'],
    sizes: ['30', '32', '34', '36'],
    smartMatchMeta: {
      idealFor: ['Office workers', 'Commuters', 'Smart casual wearers'],
      useCases: ['office wear', 'travel pants', 'smart casual', 'comfortable trousers under 2500'],
      budgetTier: 'budget',
      strengths: ['Unmatched mobility without bagging at the knees', 'Spill resistant'],
      tradeoffs: 'Tailored slim cut may require sizing up for muscular builds.'
    }
  },
  {
    id: 'prod-fash-4',
    name: 'Vagabond Raw Selvedge Denim Tote Bag',
    brand: 'Atelier Minimal',
    category: 'Fashion',
    price: 1799,
    originalPrice: 2499,
    rating: 4.8,
    reviewsCount: 140,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    shortDescription: '14oz Kurabo Japanese red-line selvedge denim tote with bridle leather handles.',
    description: 'Built to age with unique character over years of daily carry. Reinforced with copper rivets at stress points, interior laptop slip sleeve fitting up to 15" screens, and key fob loop.',
    highlights: [
      'Gains personalized indigo fade patterns over time',
      'Solid copper hand-hammered rivets at handle anchors',
      'Reinforced double-bottom panel for heavy books and groceries'
    ],
    specs: {
      'Fabric': '14oz Japanese Selvedge Denim',
      'Handles': 'Full-grain veg-tanned bridle leather',
      'Capacity': '18 Litres'
    },
    tags: ['lifestyle'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['Students', 'Creative professionals', 'Book lovers'],
      useCases: ['everyday tote', 'laptop bag', 'campus', 'sustainable bag'],
      budgetTier: 'budget',
      strengths: ['Virtually tear-proof construction', 'Aesthetic indigo patina'],
      tradeoffs: 'Raw denim may transfer slight indigo to white pants in the first week.'
    }
  },

  // ===================== HOME & LIVING (18 to 21) =====================
  {
    id: 'prod-home-1',
    name: 'Komorebi Handcrafted Ceramic Pour-Over & Carafe',
    brand: 'Kanso Living',
    category: 'Home',
    price: 1999,
    originalPrice: 2999,
    rating: 4.9,
    reviewsCount: 205,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Artisanal speckled stoneware dripper with 600ml borosilicate glass decanter.',
    description: 'Designed in collaboration with Kyoto ceramists. The 60-degree conical dripper features interior vortex ribs that promote even coffee bed extraction and bright floral notes.',
    highlights: [
      'High-fired heat-retaining stoneware ensures stable brewing temperature',
      'Ergonomic walnut collar protects hands during pouring',
      'Accommodates standard #02 paper coffee filters'
    ],
    specs: {
      'Carafe Volume': '600 ml (2-4 cups)',
      'Material': 'Natural stoneware clay dripper + heatproof glass',
      'Dishwasher Safe': 'Yes (remove walnut collar)'
    },
    tags: ['smart-pick', 'lifestyle'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['Specialty coffee lovers', 'Home baristas', 'Design collectors'],
      useCases: ['coffee brewing', 'morning ritual', 'kitchen aesthetic', 'pour over set under 2000'],
      budgetTier: 'budget',
      strengths: ['Consistent, smooth flow rate', 'Gorgeous kitchen countertop presence'],
      tradeoffs: 'Ceramic dripper requires gentle pre-heating rinse.'
    }
  },
  {
    id: 'prod-home-2',
    name: 'Nordic Solid Oak Floating Valet Organizer',
    brand: 'Kanso Living',
    category: 'Home',
    price: 2699,
    originalPrice: 3899,
    rating: 4.8,
    reviewsCount: 132,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Wall-mounted entryway catch-all crafted from FSC-certified solid European oak.',
    description: 'Keep your keys, sunglasses, watch, and wallet organized in one clean architectural landing spot. Includes concealed neodymium magnet key anchors on the underside and brass hardware.',
    highlights: [
      'Hidden super-magnets hold up to 4 heavy key rings underneath',
      'Felt-lined recessed phone and watch tray prevents scratches',
      'Concealed French cleat mounting system supports up to 10kg'
    ],
    specs: {
      'Dimensions': '42cm x 14cm x 8cm',
      'Wood': 'FSC Certified Solid White Oak',
      'Finish': 'Matte food-safe hardwax oil'
    },
    tags: ['lifestyle'],
    inStock: true,
    stockCount: 6,
    isLowStock: true,
    smartMatchMeta: {
      idealFor: ['Home organizers', 'Minimalist homeowners'],
      useCases: ['entryway storage', 'key holder', 'desk organization', 'home decor'],
      budgetTier: 'budget',
      strengths: ['Invisible wall mounting', 'Genuine solid hardwood grain'],
      tradeoffs: 'Requires two screws into drywall or masonry.'
    }
  },
  {
    id: 'prod-home-3',
    name: 'Sirocco Whisper Ceramic Aromatherapy Diffuser',
    brand: 'Kanso Living',
    category: 'Home',
    price: 2299,
    originalPrice: 3299,
    rating: 4.7,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Matte bisque porcelain ultrasonic mist diffuser with warm candle-like glow.',
    description: 'Transforms essential oils into ultra-fine nano-mist without heating or altering their therapeutic properties. Emits zero hum with whisper-quiet ultrasonic vibrations below 18dB.',
    highlights: [
      '2.4MHz high-frequency ultrasound mists spaces up to 400 sq.ft.',
      'Auto-shutoff feature when water runs out',
      'Ambient LED warm light operates with or without mist mode'
    ],
    specs: {
      'Water Tank': '180 ml (Up to 8 hours continuous mist)',
      'Cover': 'Handcrafted textured ceramic bisque',
      'Noise Level': '< 18dB'
    },
    tags: ['trending'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['Relaxation seekers', 'Aromatherapy users', 'Sleep improvers'],
      useCases: ['sleep aid', 'bedroom scent', 'meditation', 'relaxation', 'home scenting under 2500'],
      budgetTier: 'budget',
      strengths: ['Silent operation', 'Doubles as an elegant sculptural lamp'],
      tradeoffs: 'Requires refilling after 8 hours of continuous use.'
    }
  },
  {
    id: 'prod-home-4',
    name: 'Aura Linen Washed Flax Bedding Duvet Set',
    brand: 'Kanso Living',
    category: 'Home',
    price: 4999,
    originalPrice: 7500,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    shortDescription: '100% French Normandy flax linen pre-washed for cloud-soft lived-in texture.',
    description: 'Linen breathes better than any other natural fiber, keeping you cool in summer heat and insulating in winter chill. Finished with natural coconut shell buttons and interior corner ties.',
    highlights: [
      'Naturally hypoallergenic, dust mite repellent, and moisture wicking',
      'Becomes noticeably softer with every wash',
      'Includes 1 Duvet Cover + 2 matching Oxford pillow shams'
    ],
    specs: {
      'Size': 'Queen (90" x 90")',
      'Fiber': '100% Certified French Flax',
      'Weight': '175 GSM enzyme stone washed'
    },
    tags: ['lifestyle'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['Hot sleepers', 'Luxury bedroom seekers'],
      useCases: ['bedding', 'linen duvet', 'luxury home', 'deep sleep'],
      budgetTier: 'premium',
      strengths: ['Thermo-regulating all seasons', 'Enduring heirloom durability'],
      tradeoffs: 'Natural linen has casual wrinkled texture and should not be starched.'
    }
  },

  // ===================== TRAVEL & COMMUTE (22 to 25) =====================
  {
    id: 'prod-trav-1',
    name: 'Waypoint Expandable 28L Weatherproof Backpack',
    brand: 'AeroVoyage',
    category: 'Travel',
    price: 3699,
    originalPrice: 5299,
    rating: 4.9,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Waterproof recycled cordura travel pack with clamshell opening and 16" laptop vault.',
    description: 'Engineered for seamless transit through airport terminals and rainy city streets. Opens completely flat like a suitcase for fast TSA screening, with dedicated magnetic water bottle pocket and luggage passthrough.',
    highlights: [
      'Waterproof YKK Aquaguard zippers and TPU-coated 840D recycled nylon',
      'Dedicated padded laptop suspension protects against sudden drop impacts',
      'Concealed RFID-blocking passport slot in breathable back panel',
      'Expandable zipper adds 6L of packing volume on demand'
    ],
    specs: {
      'Volume': '22L expandable to 28L',
      'Laptop Fit': 'Up to 16" MacBook Pro',
      'Fabric': '840D Recycled Ballistic Nylon with DWR',
      'Weight': '1.05 kg',
      'Carry-On Compliant': 'Fits under all domestic airline seats'
    },
    tags: ['smart-pick', 'trending'],
    inStock: true,
    stockCount: 11,
    isLowStock: true,
    smartMatchMeta: {
      idealFor: ['Digital Nomads', 'Weekend travelers', 'Tech commuters'],
      useCases: ['travel backpack', 'laptop backpack under 4000', 'carry on bag', 'waterproof bag', 'commute'],
      budgetTier: 'mid-range',
      strengths: ['Clamshell suitcase opening', 'Suspended laptop compartment protects electronics'],
      tradeoffs: 'Water-resistant coated fabric feels slightly rigid when brand new.'
    }
  },
  {
    id: 'prod-trav-2',
    name: 'Voyager Compression Packing Cube Trio',
    brand: 'AeroVoyage',
    category: 'Travel',
    price: 1399,
    originalPrice: 2199,
    rating: 4.8,
    reviewsCount: 540,
    image: 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Ripstop nylon compression cubes that reduce luggage volume by up to 60%.',
    description: 'Eliminates luggage clutter with dual-zipper compression engineering. Pack twice as many shirts and trousers in your weekend duffel without vacuum pumps.',
    highlights: [
      'Ultra-tough 70D diamond ripstop nylon won’t tear under pressure',
      'Breathable mesh top window lets you identify contents instantly',
      'Set includes Small (toiletries), Medium (shirts), and Large (trousers)'
    ],
    specs: {
      'Pieces': '3 Cubes (S: 10x7", M: 14x10", L: 16x12")',
      'Zippers': 'Heavy-duty reverse coil compression zips',
      'Weight': '210g set'
    },
    tags: ['flash-deal'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['Light packers', 'Backpackers', 'Business travelers'],
      useCases: ['packing cubes', 'travel organization', 'luggage compression', 'travel under 1500'],
      budgetTier: 'budget',
      strengths: ['Compacts bulky garments effortlessly', 'Extremely light'],
      tradeoffs: 'Do not over-stuff past the zipper track.'
    }
  },
  {
    id: 'prod-trav-3',
    name: 'Stratos Memory Foam Ergonomic Travel Pillow',
    brand: 'AeroVoyage',
    category: 'Travel',
    price: 1599,
    originalPrice: 2499,
    rating: 4.7,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    shortDescription: '360-degree chin support pillow that rolls down into a compact fist-sized pouch.',
    description: 'Engineered by orthopedic physical therapists to prevent head drop on long-haul flights. High-density responsive memory foam cradles the neck with zero chin pinch.',
    highlights: [
      'Customizable magnetic front clasp for exact neck circumference fit',
      'Cooling ice-silk washable modal cover prevents neck sweat',
      'Rolls down to 1/3 its size into included water-repellent travel pod'
    ],
    specs: {
      'Core': '100% Pure High-Density Memory Foam',
      'Cover': 'Cooling Modal + Breathable mesh',
      'Weight': '320g'
    },
    tags: ['trending'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['Frequent flyers', 'Train commuters', 'Road trippers'],
      useCases: ['travel sleep', 'flight pillow', 'neck support', 'travel accessories under 2000'],
      budgetTier: 'budget',
      strengths: ['Genuine 360 chin support prevents neck sprain', 'Packs small'],
      tradeoffs: 'Needs 20 minutes to fully expand when unpacked from compressed pod.'
    }
  },
  {
    id: 'prod-trav-4',
    name: 'Aero Universal Worldwide Power Adapter 35W',
    brand: 'Voltaic',
    category: 'Travel',
    price: 1499,
    originalPrice: 2199,
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'All-in-one plug adapter compatible with 150+ countries plus 3 USB-C and 2 USB-A ports.',
    description: 'Travel anywhere in the UK, EU, US, Australia, or Asia with a single self-contained sliding adapter. Features built-in 8A auto-resetting fuse so you never have to replace blown fuses abroad.',
    highlights: [
      'Powers 6 devices simultaneously (1 AC outlet + 5 USB ports)',
      'Auto-resetting safety fuse protects against local hotel surges',
      'Single-button slider mechanism with safety lock'
    ],
    specs: {
      'Compatibility': 'US, UK, EU, AU, JP, CN, 150+ nations',
      'Max Power': '2000W at 250V AC / 880W at 110V',
      'USB Output': '35W Max Total'
    },
    tags: ['smart-pick'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['International travelers', 'Photographers'],
      useCases: ['international travel', 'travel adapter', 'multi-country plug', 'travel electronics'],
      budgetTier: 'budget',
      strengths: ['Works everywhere', 'Auto-resetting fuse prevents travel dead-ends'],
      tradeoffs: 'Does not convert electrical voltage (does not convert 220V to 110V for hair dryers).'
    }
  },

  // ===================== ACCESSORIES (26 to 28) =====================
  {
    id: 'prod-acc-1',
    name: 'Monolith RFID-Blocking Titanium Slim Wallet',
    brand: 'Atelier Minimal',
    category: 'Accessories',
    price: 1899,
    originalPrice: 2899,
    rating: 4.8,
    reviewsCount: 315,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Aerospace grade titanium cardholder holding up to 12 cards and folded cash bills.',
    description: 'Precision CNC-machined from Grade 2 titanium plates bonded with military-grade elastic track. Completely shields wireless contactless cards from illicit RFID and NFC scanners.',
    highlights: [
      'Only 6mm thin: sits flat in front pocket without bulging suit trousers',
      'Integrated spring-steel money clip for paper currency',
      'Beveled card thumb-slot for fast one-handed card flick'
    ],
    specs: {
      'Material': 'Grade 2 Anodized Titanium & Spring Steel',
      'Capacity': '1-12 Cards + 10 Folded Cash Bills',
      'Weight': '48g'
    },
    tags: ['smart-pick'],
    inStock: true,
    colors: ['Gunmetal Grey', 'Burnt Titanium', 'Stealth Black'],
    smartMatchMeta: {
      idealFor: ['Minimalists', 'Front pocket wallet users', 'Security conscious'],
      useCases: ['slim wallet', 'rfid wallet under 2000', 'cardholder', 'edc minimal'],
      budgetTier: 'budget',
      strengths: ['Virtually indestructible titanium', 'Zero pocket bulk'],
      tradeoffs: 'Not suited for carrying coins.'
    }
  },
  {
    id: 'prod-acc-2',
    name: 'Chrono Minimalist Sapphire Watch 38mm',
    brand: 'Maison Aster',
    category: 'Accessories',
    price: 4999,
    originalPrice: 7999,
    rating: 4.9,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Bauhaus-inspired analog timepiece with scratch-proof sapphire crystal and Milanese mesh.',
    description: 'Driven by a precision Japanese Miyota quartz movement. Water-resistant to 50 meters, featuring an uncluttered dial, sub-second dial, and quick-release stainless steel mesh strap.',
    highlights: [
      'Genuine sapphire crystal glass resists scratches from keys and concrete',
      '316L surgical-grade stainless steel casing',
      'Interchangeable strap mechanism requires no tools'
    ],
    specs: {
      'Case Diameter': '38 mm',
      'Case Thickness': '7.2 mm ultra-slim',
      'Movement': 'Japanese Miyota Caliber 1L45',
      'Glass': 'Anti-reflective Sapphire Crystal',
      'Water Resistance': '5 ATM / 50m'
    },
    tags: ['lifestyle', 'trending'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['Design professionals', 'Classic watch wearers', 'Formal & casual occasions'],
      useCases: ['watch', 'minimalist watch under 5000', 'luxury watch', 'formal watch'],
      budgetTier: 'mid-range',
      strengths: ['Real sapphire crystal at an accessible price', 'Super-slim profile slips under shirt cuffs'],
      tradeoffs: 'Quartz movement without mechanical automatic sweep.'
    }
  },
  {
    id: 'prod-acc-3',
    name: 'Optic Blue Light Filtering Acetate Glasses',
    brand: 'Atelier Minimal',
    category: 'Accessories',
    price: 1699,
    originalPrice: 2499,
    rating: 4.7,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Italian Mazzucchelli acetate frames with anti-reflective 420nm blue light filter.',
    description: 'Relieves eye fatigue, headaches, and sleep disruption during 8+ hour screen sessions. Clear lenses without the distracting yellow tint found on cheap computer glasses.',
    highlights: [
      'Filters 90% of high-energy blue violet spectrum emitted by OLED monitors',
      'Custom 5-barrel German hinges for lasting temple tension',
      'Includes hard magnetic case and microfiber polishing cloth'
    ],
    specs: {
      'Frame': 'Handmade Cellulose Acetate',
      'Lens': 'CR-39 Clear Lens with Multi-layer Anti-glare',
      'Weight': '24g'
    },
    tags: ['smart-pick'],
    inStock: true,
    colors: ['Tortoiseshell', 'Crystal Clear', 'Smoked Obsidian'],
    smartMatchMeta: {
      idealFor: ['Software developers', 'Gamers', 'Desk screen workers'],
      useCases: ['screen glasses', 'blue light glasses under 2000', 'eye strain relief', 'coding glasses'],
      budgetTier: 'budget',
      strengths: ['Zero yellow discoloration in visual field', 'Durable acetate body'],
      tradeoffs: 'Non-prescription zero power lenses only.'
    }
  },

  // ===================== GROCERY & ARTISANAL PANTRY (29 to 32) =====================
  {
    id: 'prod-groc-1',
    name: 'Estate Single-Origin Cold-Pressed Extra Virgin Olive Oil 500ml',
    brand: 'Olea Reserve',
    category: 'Grocery',
    price: 1199,
    originalPrice: 1699,
    rating: 4.9,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'First cold extraction of hand-harvested Koroneiki olives with polyphenol richness.',
    description: 'Harvested in small coastal family groves and crushed within 4 hours of picking. Delivers a vibrant peppery finish, notes of fresh cut grass, and exceptional antioxidant polyphenols (>380mg/kg).',
    highlights: [
      'Certified Extra Virgin with ultra-low acidity (< 0.28%)',
      'Opaque dark UV-protecting glass bottle keeps delicate fats fresh',
      'Superb for fresh salads, drizzling over sourdough, or finishing roasted vegetables'
    ],
    specs: {
      'Volume': '500 ml',
      'Harvest Date': 'Current Season Harvest',
      'Polyphenols': '> 380 mg/kg High Bioactivity',
      'Acidity': '< 0.28%'
    },
    tags: ['smart-pick', 'lifestyle'],
    inStock: true,
    stockCount: 15,
    smartMatchMeta: {
      idealFor: ['Culinary enthusiasts', 'Heart health focus', 'Mediterranean diet'],
      useCases: ['olive oil', 'cooking', 'gourmet pantry', 'salad dressing', 'healthy foods under 1500'],
      budgetTier: 'budget',
      strengths: ['Intense fresh peppery aroma indicating authentic high polyphenols', 'Single-estate traceability'],
      tradeoffs: 'Best enjoyed raw as finishing oil; not intended for deep frying.'
    }
  },
  {
    id: 'prod-groc-2',
    name: 'Ceremonial Grade Uji Matcha Green Tea 50g',
    brand: 'Kanso Living',
    category: 'Grocery',
    price: 1499,
    originalPrice: 2299,
    rating: 4.9,
    reviewsCount: 280,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'First-harvest shade-grown green tea stone ground in Uji, Kyoto.',
    description: 'Electric vibrant jade green powder with rich umami sweetness and zero bitterness. Rich in L-theanine and EGCG, delivering clean calm energy without coffee jitters.',
    highlights: [
      'Shade-grown for 25 days before picking to concentrate chlorophyll and amino acids',
      'Granite stone ground to 5-micron silk powder',
      'Hermetically vacuum-sealed in gold foil inside tin canister'
    ],
    specs: {
      'Weight': '50g (Yields 25-30 traditional servings)',
      'Origin': 'Uji, Kyoto Prefecture, Japan',
      'Grade': 'First Flush Ceremonial'
    },
    tags: ['trending', 'smart-pick'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['Matcha drinkers', 'Coffee reducers', 'Wellness practitioners'],
      useCases: ['matcha', 'green tea', 'calm energy', 'antioxidants', 'matcha under 1500'],
      budgetTier: 'budget',
      strengths: ['Sweet vegetal umami without astringent bitterness', 'Froths to rich crema'],
      tradeoffs: 'Store refrigerated once opened to maintain vibrant emerald hue.'
    }
  },
  {
    id: 'prod-groc-3',
    name: 'Raw Himalayan Wildflower Honey with Comb 400g',
    brand: 'Olea Reserve',
    category: 'Grocery',
    price: 999,
    originalPrice: 1499,
    rating: 4.8,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Unfiltered, unpasteurized honey harvested from pristine alpine forests with real beeswax comb.',
    description: 'Straight from high-altitude Himalayan beekeepers. Contains live beneficial enzymes, wild floral pollen, and propolis in their natural raw state. Includes a real chunk of chewable honey honeycomb.',
    highlights: [
      'Zero added sugars, syrups, or heat pasteurization',
      'Naturally crystallization-prone proving 100% raw authenticity',
      'Rich floral notes with delicate cedar undertones'
    ],
    specs: {
      'Weight': '400g glass jar with real honeycomb chunk',
      'Altitude': 'Harvested at 2,400m altitude',
      'Processing': 'Cold-settled, coarse filtered'
    },
    tags: ['flash-deal'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['Natural sweeteners', 'Immunity support', 'Tea drinkers'],
      useCases: ['raw honey', 'healthy pantry', 'organic honey under 1000', 'immunity'],
      budgetTier: 'budget',
      strengths: ['Sensational floral depth', 'Chewable edible natural comb inside'],
      tradeoffs: 'Raw honey naturally crystallizes in cold temperatures (warm gently in warm water bath).'
    }
  },
  {
    id: 'prod-groc-4',
    name: 'Single-Estate Arabica Whole Beans - Chikmagalur Light Roast 250g',
    brand: 'Kanso Living',
    category: 'Grocery',
    price: 649,
    originalPrice: 899,
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Altitude 1400m washed process Arabica with tasting notes of Meyer lemon and raw cane sugar.',
    description: 'Grown under native silver oak canopy in the Baba Budan Giri hills of Chikmagalur. Small-batch drum roasted weekly to maintain maximum aromatic vibrancy.',
    highlights: [
      '100% Specialty Arabica with SCA cup score 85.5',
      'Degassing one-way valve bag maintains fresh roast aromas',
      'Ideal for Pour-Over, Aeropress, and French Press'
    ],
    specs: {
      'Weight': '250g Whole Beans',
      'Process': 'Washed',
      'Varietal': 'Selection 795 & SLN 9',
      'Roast Level': 'Light-Medium Filter Roast'
    },
    tags: ['smart-pick'],
    inStock: true,
    smartMatchMeta: {
      idealFor: ['Filter coffee lovers', 'Morning brewers'],
      useCases: ['coffee beans', 'artisan coffee', 'pour over coffee', 'coffee under 1000'],
      budgetTier: 'budget',
      strengths: ['Crisp citrus and honey sweetness', 'Weekly roasted freshness'],
      tradeoffs: 'Sold as whole beans (requires coffee grinder or manual burr mill).'
    }
  }
];

export const CATEGORIES_LIST = [
  'All',
  'Electronics',
  'Fashion',
  'Beauty',
  'Home',
  'Fitness',
  'Accessories',
  'Grocery',
  'Travel'
] as const;

export const POPULAR_SMART_MATCH_PROMPTS = [
  'Headphones under ₹3000 for studying and travel',
  'Organic skincare for dry sensitive skin under ₹1500',
  'Waterproof laptop backpack for daily commute and flights',
  'Ergonomic desk accessories for programming and focus',
  'Healthy morning gourmet pantry essentials under ₹1200',
  'Durable fitness essentials for home workouts'
];
