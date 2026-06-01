export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Products', href: '#products' },
  { label: 'Impact', href: '#impact' },
  { label: 'Technology', href: '#technology' },
  { label: 'Market', href: '#market' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
] as const;

export const HERO = {
  headline: 'Building the Future with Eco-Friendly Bricks',
  subtitle:
    'Transforming coffee waste and palm fibers into sustainable construction materials for tomorrow’s architecture.',
  ctas: [
    { label: 'Explore Products', href: '#products', variant: 'primary' as const },
    { label: 'Discover Technology', href: '#technology', variant: 'secondary' as const },
    { label: 'Contact Us', href: '#contact', variant: 'ghost' as const },
  ],
};

export const ABOUT_STATS = [
  { value: 370, suffix: ' t', label: 'Recycled waste / month', prefix: '' },
  { value: 0, suffix: ' CO₂', label: 'Cold manufacturing emissions', prefix: '' },
  { value: 52, suffix: '%', label: 'Gross margin', prefix: '' },
  { value: 0.21, suffix: ' W/mK', label: 'Thermal insulation λ', prefix: 'λ=' },
  { value: 100, suffix: '%', label: 'Local Algerian production', prefix: '' },
];

export const PROCESS_NARRATIVE = [
  'Raw organic matter',
  'Scientific refinement',
  'Cold craftsmanship',
  'Living architecture',
] as const;

export const PROCESS_STEPS = [
  {
    id: 1,
    title: 'Coffee Waste Collection',
    description: 'Partner cafés across Annaba supply spent grounds through our circular collection network.',
    phase: 'Raw Matter',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Palm Fiber Collection',
    description: 'Agricultural palm residues are harvested and prepared as natural structural reinforcement.',
    phase: 'Raw Matter',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Scientific Treatment',
    description: 'Laboratory sorting, dehydration, and bio-polymer activation at CRTI & University of Annaba.',
    phase: 'Refinement',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Cold Compression',
    description: 'Zero-heat hydraulic forging bonds organic matrices without kiln emissions.',
    phase: 'Craft',
    image: 'https://images.unsplash.com/photo-1536831107507-67ad1332cb5f?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Eco-Brick Formation',
    description: 'Precision molds shape load-bearing units with verified thermal and acoustic performance.',
    phase: 'Craft',
    image: 'https://images.unsplash.com/photo-1590059132212-f733cb588d07?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Sustainable Architecture',
    description: 'B2B integration into construction — walls, envelopes, and green developments across Algeria.',
    phase: 'Architecture',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
  },
];

export const PRODUCTS = [
  {
    id: 'standard',
    name: 'EcoloBrick Standard',
    tagline: 'Structural biosourced brick for load-bearing walls',
    image:
      'https://i.postimg.cc/NFZBRFLN/brick.jpg',
    specs: [
      { label: 'Thermal λ', value: '0.21 W/mK' },
      { label: 'Density', value: '850 kg/m³' },
      { label: 'Compressive strength', value: '12 MPa' },
      { label: 'CO₂ footprint', value: 'Carbon negative' },
    ],
    benefits: [
      'Superior thermal insulation',
      'Acoustic dampening',
      'Lightweight structure',
      'Circular economy certified',
    ],
  },
  {
    id: 'insulation',
    name: 'Eco Insulation Panels',
    tagline: 'High-performance interior & envelope insulation',
    image:
      'https://images.unsplash.com/photo-1581417478175-a9ef18f210c1?q=80&w=1200&auto=format&fit=crop',
    specs: [
      { label: 'Thermal λ', value: '0.18 W/mK' },
      { label: 'Acoustic reduction', value: '42 dB' },
      { label: 'Weight', value: '40% lighter than clay' },
      { label: 'Durability', value: '25+ year lifespan' },
    ],
    benefits: [
      'Passive cooling optimization',
      'Moisture regulation',
      'Fire-retardant treatment',
      'Modular installation',
    ],
  },
];

export const IMPACT_METRICS = [
  { id: 'co2', label: 'CO₂ Saved', value: 2840, suffix: ' t', icon: '🌍' },
  { id: 'waste', label: 'Waste Recycled', value: 4440, suffix: ' t', icon: '♻️' },
  { id: 'cafes', label: 'Cafés Partnered', value: 127, suffix: '+', icon: '☕' },
  { id: 'projects', label: 'Construction Projects', value: 38, suffix: '+', icon: '🏗️' },
  { id: 'energy', label: 'Energy Reduction', value: 95, suffix: '%', icon: '⚡' },
];

export const TECH_FEATURES = [
  {
    title: 'QR Traceability',
    description: 'Every batch is blockchain-linked from café collection to construction site.',
    icon: 'QR',
  },
  {
    title: 'EcoloConnect',
    description: 'Digital B2B platform for orders, logistics, and sustainability reporting.',
    icon: 'NET',
  },
  {
    title: 'AI Logistics',
    description: 'Route optimization reduces fleet emissions across East Algeria.',
    icon: 'AI',
  },
  {
    title: 'University R&D',
    description: 'Joint research with Badji Mokhtar University — Génie Civil department.',
    icon: 'UNI',
  },
  {
    title: 'CRTI Labs',
    description: 'Industrial validation, ASTM-C67 testing, and certification pipelines.',
    icon: 'LAB',
  },
  {
    title: 'Digital Twin',
    description: 'Simulate thermal performance before deployment on site.',
    icon: '3D',
  },
];

export const MARKET_ROADMAP = [
  { year: '2024', title: 'Annaba HQ', description: 'Pilot plant & first B2B contracts' },
  { year: '2025', title: 'Constantine & Skikda', description: 'Regional collection hubs' },
  { year: '2026', title: 'Algiers Metro', description: 'Capital market penetration' },
  { year: '2027', title: 'Maghreb Export', description: 'Tunisia & Morocco partnerships' },
];

export const EXPANSION_CITIES = [
  { name: 'Annaba', status: 'HQ', x: 78, y: 22 },
  { name: 'Constantine', status: '2025', x: 62, y: 35 },
  { name: 'Skikda', status: '2025', x: 70, y: 28 },
  { name: 'Algiers', status: '2026', x: 38, y: 42 },
  { name: 'Oran', status: '2027', x: 22, y: 38 },
];

export const CONTACT = {
  email: 'abdoumansouri2323@gmail.com',
  phone: '+213 67 61 04 11 5',
  whatsapp: 'https://wa.me/213380000000',
  address: 'Dept. of Civil Engineering, Badji Mokhtar University, Annaba, Algeria',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102068.7513337965!2d7.674998188151977!3d36.902641030310245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f0067347a59275%3A0xc664673895e634c4!2sAnnaba%2C%20Algeria!5e0!3m2!1sen!2sus!4v1715632123456!5m2!1sen!2sus',
};

export const SOCIAL = [
  { name: 'LinkedIn', url: 'https://linkedin.com/company/ecolobrick' },
  { name: 'Instagram', url: 'https://instagram.com/ecolobrick' },
  { name: 'X', url: 'https://x.com/ecolobrick' },
  { name: 'Facebook', url: 'https://facebook.com/ecolobrick' },
];

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  image: string;
  linkedin: string;
  location: string;
  featured?: boolean;
}

/** Core leadership — displayed on the homepage */
export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    id: 'ceo',
    name: 'Abderrahman Mansouri',
    role: 'Chief Executive Officer',
    title: 'CEO · Product Development',
    bio: 'Defines product strategy and leads the transition from university research to industrial-scale biosourced brick production across Algeria.',
    image:
      'https://i.postimg.cc/43Sv614Z/abdou.jpg',
    linkedin: 'https://linkedin.com/company/ecolobrick',
    location: 'Annaba',
    featured: true,
  },
  {
    id: 'marketing',
    name: 'boumzaout zin edine',
    role: 'Head of Growth',
    title: 'Marketing & Strategy',
    bio: 'Architects B2B partnerships, brand positioning, and market expansion — connecting EcoloBrick with developers, architects, and green-building projects.',
    image:
      'https://i.postimg.cc/9QjLz2Jj/zino.jpg',
    linkedin: 'https://linkedin.com/company/ecolobrick',
    location: 'Annaba',
  },
  {
    id: 'research',
    name: 'lekouaght abdelhamid',
    role: 'Director of Quality',
    title: 'Quality & Research',
    bio: 'Oversees laboratory validation, material certification, and R&D with CRTI and the University of Annaba — ensuring every batch meets structural and thermal standards.',
    image:
      'https://i.postimg.cc/ZR98VsVx/mido.jpg',
    linkedin: 'https://linkedin.com/company/ecolobrick',
    location: 'Annaba',
  },
];
