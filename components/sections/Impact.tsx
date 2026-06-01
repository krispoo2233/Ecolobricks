import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { IMPACT_METRICS } from '../../data/siteContent';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { FloatingPanel } from '../layout/FloatingPanel';

const chartData = [
  { name: '2022', co2: 420 },
  { name: '2023', co2: 1180 },
  { name: '2024', co2: 2840 },
];

export const Impact: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const diagonalY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="impact"
      ref={ref}
      className="relative z-10 py-32 md:py-44 overflow-hidden section-warm -mt-20"
    >
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      <div className="section-container relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div style={{ y: diagonalY }} className="lg:col-span-5 lg:-translate-x-8">
            <p className="font-label text-amber/70">Environmental Ledger</p>
            <h2 className="mt-4 font-display text-4xl md:text-6xl font-semibold text-ivory leading-tight">
              Impact you can <span className="italic text-gradient-gold">measure</span>
            </h2>
            <p className="mt-6 text-beige/60 font-body text-lg max-w-md">
              Every brick carries a quantified story of waste diverted and emissions avoided.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-12">
              {IMPACT_METRICS.slice(0, 4).map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`glass-panel-dark p-5 border border-bronze/15 ${i === 1 ? 'translate-y-8' : ''}`}
                >
                  <p className="font-display text-2xl text-ivory">
                    <AnimatedCounter value={m.value} suffix={m.suffix} />
                  </p>
                  <p className="font-label text-beige/45 mt-1 text-[10px]">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-7 relative lg:translate-x-12">
            <FloatingPanel className="p-8 md:p-10" offset="left">
              <h3 className="font-display text-xl text-ivory mb-6 text-center">
                CO₂ emissions avoided (tons)
              </h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#8b7355" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#8b735580" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: '#1a1816',
                        border: '1px solid rgba(139,115,85,0.3)',
                        borderRadius: 2,
                      }}
                    />
                    <Bar dataKey="co2" radius={[2, 2, 0, 0]}>
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={i === 2 ? '#c9a35a' : '#3d5c4a'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </FloatingPanel>
            {IMPACT_METRICS[4] && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 md:-left-12 glass-panel-dark border border-amber/30 px-6 py-4"
              >
                <AnimatedCounter value={IMPACT_METRICS[4].value} suffix={IMPACT_METRICS[4].suffix} />
                <span className="font-label text-beige/50 ml-2">{IMPACT_METRICS[4].label}</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
