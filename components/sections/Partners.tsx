import React from 'react';
import { motion } from 'framer-motion';
import { PARTNERS } from '../../constants';
import { SectionHeader } from '../ui/SectionHeader';

export const Partners: React.FC = () => {
  const all = [...PARTNERS, { id: 99, name: 'NESDA', logo: '', type: 'Innovation Hub' }];

  return (
    <section id="partners" className="py-28 md:py-36 section-parchment border-t border-bronze/15">
      <div className="section-container">
        <SectionHeader
          label="Alliances"
          title="Institutions of trust"
          theme="light"
          align="center"
        />

        <div className="relative overflow-hidden py-8">
          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {[...all, ...all].map((p, i) => (
              <div key={`${p.id}-${i}`} className="flex-shrink-0 flex flex-col items-center gap-3 min-w-[130px] group">
                {p.logo ? (
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="h-12 w-auto object-contain opacity-40 grayscale group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="h-12 px-4 flex items-center border border-bronze/30 font-display text-charcoal">
                    NESDA
                  </div>
                )}
                <p className="font-label text-bronze text-center">{p.type}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
