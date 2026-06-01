import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TECH_FEATURES } from '../../data/siteContent';
import { SectionHeader } from '../ui/SectionHeader';

export const Technology: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section
      id="technology"
      ref={ref}
      className="relative z-10 py-32 md:py-40 section-parchment overflow-hidden -mt-16"
    >
      <div className="absolute inset-0 blueprint-grid opacity-50" />
      <motion.div style={{ rotate }} className="section-container relative">
        <SectionHeader
          label="Intelligence & Systems"
          title="Workshop discipline meets digital precision"
          theme="light"
          align="center"
        />

        <div className="mt-8 grid gap-4 md:hidden">
          {TECH_FEATURES.map((feat, i) => (
            <motion.article
              key={feat.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-ivory/90 border border-bronze/25 p-6 rounded-sm"
            >
              <h3 className="font-display text-lg font-semibold text-charcoal">{feat.title}</h3>
              <p className="mt-2 text-sm text-brown/70">{feat.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="relative mt-8 hidden md:block min-h-[520px]">
          {TECH_FEATURES.map((feat, i) => {
            const positions = [
              'top-0 left-0 w-[42%]',
              'top-12 right-0 w-[38%]',
              'top-[38%] left-[8%] w-[36%]',
              'top-[32%] right-[5%] w-[40%]',
              'bottom-8 left-[15%] w-[35%]',
              'bottom-0 right-0 w-[42%]',
            ];
            return (
              <motion.article
                key={feat.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.75 }}
                whileHover={{ zIndex: 30, scale: 1.03, transition: { duration: 0.35 } }}
                className={`absolute ${positions[i]} bg-ivory/90 border border-bronze/25 p-6 shadow-lift rounded-sm`}
                style={{ zIndex: 10 + i }}
              >
                <span className="font-mono text-[10px] text-bronze/50">{feat.icon}</span>
                <h3 className="font-display text-lg font-semibold text-charcoal mt-3">{feat.title}</h3>
                <p className="mt-2 text-sm text-brown/70 font-body leading-relaxed">{feat.description}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 md:mt-48 max-w-4xl mx-auto border border-charcoal/20 bg-charcoal text-ivory p-10 md:p-14 relative overflow-hidden"
        >
          <div className="absolute inset-0 blueprint-grid opacity-20" />
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-label text-amber/80">EcoloConnect</p>
              <h3 className="font-display text-3xl font-semibold mt-3">The circular chain, mapped</h3>
              <p className="mt-4 text-beige/60 font-body">
                Cafés, laboratories, forge, and construction sites — one traceable network.
              </p>
            </div>
            <svg viewBox="0 0 200 120" className="w-full opacity-60" aria-hidden>
              <motion.circle cx="30" cy="60" r="8" fill="#c9a35a" fillOpacity="0.3" stroke="#c9a35a" />
              <motion.circle cx="100" cy="30" r="8" fill="#c9a35a" fillOpacity="0.3" stroke="#c9a35a" />
              <motion.circle cx="170" cy="60" r="8" fill="#c9a35a" fillOpacity="0.3" stroke="#c9a35a" />
              <motion.path
                d="M38 60 H92 M108 35 L162 55"
                stroke="#8b7355"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Technology;
