import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ABOUT_STATS } from '../../data/siteContent';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { FloatingPanel } from '../layout/FloatingPanel';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const panelX = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 pt-28 pb-32 md:pb-40 section-parchment overflow-hidden"
    >
      <div className="section-container relative">
        <div className="grid lg:grid-cols-12 gap-0 items-start">
          {/* Asymmetric image column — bleeds outside grid */}
          <div className="lg:col-span-6 relative lg:-ml-12">
            <motion.div style={{ y: imageY }} className="relative">
              <div className="aspect-[3/4] md:aspect-[4/5] max-h-[720px] overflow-hidden rounded-3xl border border-bronze/20" style={{ boxShadow: 'var(--shadow-soft)' }}>
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
                  alt="Sustainable architecture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-parchment/20 via-transparent to-charcoal/30" />
              </div>
              <FloatingPanel
                offset="right"
                className="absolute -bottom-8 -right-4 md:-right-12 max-w-xs p-6 !bg-charcoal/90 !text-ivory hidden md:block"
                delay={0.2}
              >
                <p className="font-display text-2xl italic text-amber/90">Zero kiln.</p>
                <p className="font-body text-sm text-beige/60 mt-2">Infinite circular craft.</p>
              </FloatingPanel>
            </motion.div>
          </div>

          {/* Copy + stats — overlapping */}
          <div className="lg:col-span-6 lg:-mt-20 lg:pl-8 relative z-10">
            <motion.div style={{ x: panelX }}>
              <SectionHeader
                label="Manifesto"
                title="Circular construction with workshop integrity"
                description="We transmute organic waste into load-bearing architecture — cold-forged, locally made, scientifically verified."
                theme="light"
              />

              <p className="font-body text-brown/80 text-lg leading-relaxed max-w-md -mt-8 mb-12">
                Kilns poison the air while coffee and palm fiber rot in landfills. Our Annaba atelier
                refuses that dichotomy.
              </p>

              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {ABOUT_STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.7 }}
                    className={`border border-bronze/15 bg-ivory/70 p-6 md:p-8 rounded-3xl ${
                      i === 0 ? 'col-span-2 md:col-span-1' : ''
                    } ${i % 3 === 0 ? 'md:translate-y-6' : ''}`}
                    style={{ boxShadow: 'var(--shadow-subtle)' }}
                  >
                    <p className="font-display text-2xl md:text-3xl font-semibold text-charcoal">
                      {stat.prefix}
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.value > 0 && stat.value < 1 ? 2 : 0}
                      />
                    </p>
                    <p className="font-label text-bronze mt-2">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
