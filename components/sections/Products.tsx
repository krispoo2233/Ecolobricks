import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PRODUCTS } from '../../data/siteContent';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';

export const Products: React.FC = () => {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgX = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative z-10 py-28 md:py-36 overflow-hidden section-dark -mt-12"
    >
      <motion.div
        style={{ x: bgX }}
        className="absolute inset-0 opacity-20"
        aria-hidden
      >
        <img
          src="https://images.unsplash.com/photo-1518112391480-98feec058ec3?q=80&w=2000"
          alt=""
          className="w-[120%] h-full object-cover grayscale"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-forest-deep/80" />

      <div className="relative z-10 pl-6 md:pl-12 lg:pl-16 mb-12 max-w-2xl">
        <SectionHeader
          label="Specimens"
          title="Materials forged for architecture"
          description="Swipe through our core specimens — each a distinct expression of organic matter refined by science."
        />
      </div>

      {/* Horizontal exploratory gallery */}
      <div
        ref={trackRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          const idx = Math.round(el.scrollLeft / (el.clientWidth * 0.85));
          setActive(Math.min(PRODUCTS.length - 1, Math.max(0, idx)));
        }}
        className="flex gap-6 md:gap-10 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-6 md:px-12 pb-8"
      >
        {PRODUCTS.map((product, i) => (
          <motion.article
            key={product.id}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className={`snap-center flex-shrink-0 w-[min(88vw,520px)] md:w-[min(42vw,560px)] relative ${
              i % 2 === 1 ? 'md:translate-y-16' : ''
            }`}
          >
            <div className="glass-panel-dark border border-bronze/20 overflow-hidden rounded-3xl group" style={{ boxShadow: 'var(--shadow-soft)' }}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-[1.6s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-label text-amber/80">{product.tagline}</p>
                  <h3 className="font-display text-3xl font-semibold text-ivory mt-2">{product.name}</h3>
                </div>
              </div>
              <div className="p-6 border-t border-bronze/15">
                <div className="grid grid-cols-2 gap-2">
                  {product.specs.slice(0, 4).map((s) => (
                    <div key={s.label} className="text-xs border border-bronze/15 p-2 rounded-xl">
                      <span className="font-label text-beige/40 block">{s.label}</span>
                      <span className="text-ivory font-body">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-8 relative z-10">
        {PRODUCTS.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              active === i ? 'w-10 bg-amber' : 'w-2 bg-bronze/40'
            }`}
          />
        ))}
      </div>

      <div className="text-center mt-14 relative z-10">
        <Button href="#contact" variant="primary">
          Request B2B Catalogue
        </Button>
      </div>
    </section>
  );
};

export default Products;
