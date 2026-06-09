import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { MARKET_ROADMAP, EXPANSION_CITIES } from '../../data/siteContent';

const growthData = [
  { year: '2024', revenue: 12 },
  { year: '2025', revenue: 28 },
  { year: '2026', revenue: 52 },
  { year: '2027', revenue: 89 },
];

export const Market: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const mapScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section id="market" ref={ref} className="relative z-10 py-32 overflow-hidden -mt-12">
      <div className="grid lg:grid-cols-2 min-h-[80vh]">
        <motion.div
          style={{ scale: mapScale }}
          className="relative bg-charcoal p-10 md:p-16 flex flex-col justify-end overflow-hidden"
        >
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200"
              alt=""
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="relative z-10">
            <p className="font-label text-amber/70">Territory</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-ivory mt-3 max-w-md">
              From Annaba across Algeria
            </h2>
            <div className="relative aspect-[2/1] mt-10 border border-bronze/30 bg-charcoal/50 rounded-2xl" style={{ boxShadow: 'var(--shadow-subtle)' }}>
              {EXPANSION_CITIES.map((city) => (
                <div
                  key={city.name}
                  className="absolute"
                  style={{ left: `${city.x}%`, top: `${city.y}%` }}
                >
                  <span className="block h-2 w-2 rounded-full bg-amber shadow-[0_0_12px_rgba(201,163,90,0.5)]" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="section-parchment p-10 md:p-16 flex flex-col justify-center">
          <p className="font-label text-bronze">Expansion</p>
          <div className="h-40 my-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="mktGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b7355" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8b7355" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#8b7355" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#8b7355" fill="url(#mktGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-6">
            {MARKET_ROADMAP.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border-l-2 border-amber pl-6"
              >
                <span className="font-display text-2xl text-bronze">{item.year}</span>
                <p className="font-display text-lg font-semibold text-charcoal">{item.title}</p>
                <p className="text-sm text-brown/70 font-body">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Market;
