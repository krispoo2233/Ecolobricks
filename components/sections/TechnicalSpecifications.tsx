import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimatedCounter } from '../ui/AnimatedCounter';

const specificationComposition = [
  {
    label: 'Clay-sand soil',
    value: 70,
    icon: 'soil',
  },
  {
    label: 'Coffee grounds',
    value: 20,
    icon: 'coffee',
  },
  {
    label: 'Date palm fibers',
    value: 10,
    icon: 'fiber',
  },
  {
    label: 'Tannin stabilizer',
    value: 1,
    icon: 'tannin',
  },
  {
    label: 'Linseed oil treatment',
    value: 2,
    icon: 'oil',
  },
];

const physicalCharacteristics = [
  { label: 'Dimensions', value: '4 × 8 × 16 cm' },
  { label: 'Tolerance', value: '±2 mm' },
  { label: 'Dry density', value: '800 kg/m³' },
  { label: 'Compression strength', value: '5 MPa' },
  { label: 'Failure mode', value: 'Ductile behavior reinforced by natural fibers' },
];

const thermalMetrics = [
  { label: 'Thermal conductivity', value: 0.32, suffix: ' W·m⁻¹·K⁻¹', decimals: 2 },
  { label: 'Thermal resistance', value: 0.125, suffix: ' m²·K/W', decimals: 3 },
  { label: 'Thermal diffusivity', value: 0.45, suffix: ' × 10⁻⁶ m²/s', decimals: 2 },
  { label: 'Thermal effusivity', value: 720, suffix: ' W·s⁰.⁵·m⁻²·K⁻¹', decimals: 0 },
  { label: 'Volumetric heat capacity', value: 1.85, suffix: ' × 10⁶ J·m⁻³·K⁻¹', decimals: 2 },
];

const benefits = [
  {
    title: 'Low thermal conductivity',
    description: 'Excellent insulation performance for reduced energy transfer.',
    icon: 'shield',
  },
  {
    title: 'Slow heat propagation',
    description: 'Heat moves gradually through the material for stable indoor climates.',
    icon: 'wave',
  },
  {
    title: 'Excellent thermal inertia',
    description: 'Active heat storage supports cooler and warmer periods alike.',
    icon: 'cube',
  },
  {
    title: 'Improved indoor comfort',
    description: 'Balanced thermal behavior reduces temperature swings in living spaces.',
    icon: 'home',
  },
  {
    title: 'Heat storage and gradual release',
    description: 'The matrix stores energy and releases it with delay for comfort.',
    icon: 'clock',
  },
  {
    title: 'Energy efficient building envelope',
    description: 'Optimized masonry form contributes to low-carbon wall systems.',
    icon: 'leaf',
  },
];

const durabilityItems = [
  {
    headline: 'Tannin stabilization',
    detail: 'Reduced water sensitivity through tannin stabilization.',
  },
  {
    headline: 'Hydrophobic treatment',
    detail: 'Linseed oil coating improves resistance to moisture uptake.',
  },
  {
    headline: 'Dimensional stability',
    detail: 'Maintains shape after drying for dependable assembly.',
  },
  {
    headline: 'Indoor/outdoor ready',
    detail: 'Designed for both sheltered and external installation zones.',
  },
];

const mechanicalStandards = [
  'NF EN 772-1 Compression Strength',
  'NF EN 772-21 Water Absorption',
  'NF EN 772-13 Dry Density',
];

const thermalStandards = [
  'NF EN 12667 Thermal Conductivity',
  'Experimental Diffusivity Method based on NF EN 12667',
];

const applications = [
  'Partition walls',
  'Infill walls',
  'Ecological construction',
  'Low-carbon housing',
  'Local bio-based materials',
];

const Icon = ({ type }: { type: string }) => {
  const baseClass = 'w-10 h-10 rounded-full flex items-center justify-center text-amber bg-amber/10 border border-amber/20';
  switch (type) {
    case 'coffee':
      return (
        <div className={baseClass} aria-hidden>
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 8h12v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z" />
            <path d="M15 8a3 3 0 0 0 6 0" />
          </svg>
        </div>
      );
    case 'fiber':
      return (
        <div className={baseClass} aria-hidden>
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 18c3-2 5-5 5-9" />
            <path d="M18 6c-3 2-5 5-5 9" />
            <path d="M7 7l10 10" />
          </svg>
        </div>
      );
    case 'tannin':
      return (
        <div className={baseClass} aria-hidden>
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 3C8 8 7 12 7 15a5 5 0 0 0 10 0c0-3-1-7-5-12Z" />
            <path d="M12 8v5" />
          </svg>
        </div>
      );
    case 'oil':
      return (
        <div className={baseClass} aria-hidden>
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 3C9 7 8 10 8 12a4 4 0 0 0 8 0c0-2-1-5-4-9Z" />
            <path d="M12 14v4" />
          </svg>
        </div>
      );
    case 'soil':
    default:
      return (
        <div className={baseClass} aria-hidden>
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 16h16" />
            <path d="M4 20h16" />
            <path d="M6 12h2" />
            <path d="M10 13h2" />
            <path d="M14 11h2" />
          </svg>
        </div>
      );
  }
};

export const TechnicalSpecifications: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const floatX = useTransform(scrollYProgress, [0, 1], ['18%', '-18%']);

  return (
    <section
      id="technical-specifications"
      ref={sectionRef}
      className="relative z-10 py-28 md:py-36 overflow-hidden section-parchment"
    >
      <motion.div
        style={{ x: floatX }}
        className="pointer-events-none absolute top-10 left-1/2 h-32 w-[110%] -translate-x-1/2 rounded-full bg-amber/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="section-container relative">
        <div className="max-w-3xl">
          <SectionHeader
            label="Specifications"
            title="Technical Specifications"
            description="Engineered bio-based masonry material optimized for sustainable construction and thermal efficiency."
            align="left"
            theme="light"
          />
        </div>

        <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
            className="glass-panel p-8 border border-amber/15"
          >
            <div className="mb-8">
              <p className="font-label text-xs text-amber/70 uppercase tracking-[0.34em]">
                Material Composition
              </p>
              <h3 className="mt-4 font-display text-3xl text-charcoal font-semibold">
                Material Composition
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {specificationComposition.map((item, index) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-charcoal/10 bg-white/70 p-5 shadow-[0_12px_40px_-24px_rgba(16,14,12,0.35)]"
                >
                  <div className="flex items-center gap-4">
                    <Icon type={item.icon} />
                    <div>
                      <p className="font-label text-[11px] uppercase tracking-[0.25em] text-charcoal/50">
                        {item.label}
                      </p>
                      <p className="mt-2 font-display text-2xl text-charcoal font-semibold">
                        <AnimatedCounter value={item.value} suffix="%" />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.08 }}
            className="glass-panel p-8 border border-amber/15"
          >
            <div className="mb-8">
              <p className="font-label text-xs text-amber/70 uppercase tracking-[0.34em]">
                Physical Characteristics
              </p>
              <h3 className="mt-4 font-display text-3xl text-charcoal font-semibold">
                Physical Characteristics
              </h3>
            </div>
            <div className="grid gap-4">
              {physicalCharacteristics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-charcoal/10 bg-white/80 p-5"
                >
                  <p className="font-label text-sm text-charcoal/60">{item.label}</p>
                  <p className="mt-2 font-body text-lg text-charcoal font-semibold">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
            className="glass-panel p-8 border border-amber/15"
          >
            <p className="font-label text-xs text-amber/70 uppercase tracking-[0.34em]">
              Thermal Performance
            </p>
            <h3 className="mt-4 font-display text-3xl text-charcoal font-semibold">
              Thermal Performance
            </h3>
            <div className="grid gap-4 mt-8 sm:grid-cols-2">
              {thermalMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.8 }}
                  className="rounded-3xl border border-charcoal/10 bg-white/80 p-6"
                >
                  <p className="font-label text-sm text-charcoal/50">{metric.label}</p>
                  <p className="mt-4 text-3xl font-semibold text-charcoal">
                    <AnimatedCounter
                      value={metric.value}
                      suffix={metric.suffix}
                      decimals={metric.decimals}
                      className="inline-block"
                    />
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.08 }}
            className="glass-panel p-8 border border-amber/15"
          >
            <p className="font-label text-xs text-amber/70 uppercase tracking-[0.34em]">
              Why It Matters
            </p>
            <h3 className="mt-4 font-display text-3xl text-charcoal font-semibold">
              Why It Matters
            </h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-3xl border border-charcoal/10 bg-white/80 p-5 hover:-translate-y-1 transition-transform"
                >
                  <div className="flex items-center gap-4">
                    <Icon type={benefit.icon} />
                    <h4 className="font-display text-lg text-charcoal font-semibold">
                      {benefit.title}
                    </h4>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-charcoal/70">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
            className="glass-panel p-8 border border-amber/15"
          >
            <div className="mb-8 flex items-center justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="font-label text-xs text-amber/70 uppercase tracking-[0.34em]">
                  Durability & Weather Resistance
                </p>
                <h3 className="mt-4 font-display text-3xl text-charcoal font-semibold">
                  Durability & Weather Resistance
                </h3>
              </div>
              <span className="rounded-full border border-amber/20 bg-amber/5 px-4 py-2 text-sm text-amber font-medium">
                Premium performance grade
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar py-2">
              {durabilityItems.map((item, index) => (
                <div
                  key={item.headline}
                  className="min-w-[270px] rounded-3xl border border-charcoal/10 bg-white/90 p-6"
                >
                  <p className="font-label text-xs uppercase tracking-[0.24em] text-charcoal/50">
                    Step {index + 1}
                  </p>
                  <h4 className="mt-3 font-display text-xl font-semibold text-charcoal">
                    {item.headline}
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-charcoal/70">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
            className="glass-panel p-8 border border-amber/15"
          >
            <p className="font-label text-xs text-amber/70 uppercase tracking-[0.34em]">
              Testing & Certification Standards
            </p>
            <h3 className="mt-4 font-display text-3xl text-charcoal font-semibold">
              Testing & Certification Standards
            </h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-charcoal/10 bg-white/80 p-6">
                <p className="font-label text-sm text-charcoal/50">Mechanical Tests</p>
                <ul className="mt-4 space-y-3 text-sm text-charcoal/75">
                  {mechanicalStandards.map((item) => (
                    <li key={item} className="flex gap-3 items-start">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-amber" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-charcoal/10 bg-white/80 p-6">
                <p className="font-label text-sm text-charcoal/50">Thermal Tests</p>
                <ul className="mt-4 space-y-3 text-sm text-charcoal/75">
                  {thermalStandards.map((item) => (
                    <li key={item} className="flex gap-3 items-start">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-amber" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.08 }}
            className="glass-panel p-8 border border-amber/15"
          >
            <p className="font-label text-xs text-amber/70 uppercase tracking-[0.34em]">
              Applications
            </p>
            <h3 className="mt-4 font-display text-3xl text-charcoal font-semibold">
              Applications
            </h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {applications.map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-charcoal/10 bg-white/90 p-6 hover:-translate-y-1 transition-transform"
                >
                  <p className="font-display text-xl text-charcoal font-semibold">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.12 }}
          className="mt-16 rounded-[2rem] border border-amber/15 panel-parchment p-10 shadow-[0_40px_100px_-60px_rgba(139,115,85,0.45)]"
        >
          <p className="font-label text-xs text-amber/70 uppercase tracking-[0.34em]">
            Sustainable Material Positioning
          </p>
          <h3 className="mt-4 font-display text-4xl text-charcoal font-semibold">
            Sustainable Material Positioning
          </h3>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-charcoal/75">
            EcoBrick is a bio-based construction material with a low carbon footprint, designed to valorize agricultural waste streams while delivering reliable thermal and mechanical performance for sustainable building projects.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSpecifications;
