import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';
import { PROCESS_STEPS, PROCESS_NARRATIVE } from '../../data/siteContent';

const STEP_COUNT = PROCESS_STEPS.length;

function ProcessDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const x = useTransform(smoothProgress, [0, 1], ['0%', `-${(STEP_COUNT - 1) * 100}%`]);
  const lineProgress = useTransform(smoothProgress, [0, 1], [0, 1]);
  const progressWidth = useTransform(lineProgress, (v) => `${v * 100}%`);

  useMotionValueEvent(smoothProgress, 'change', (v) => {
    setActive(Math.min(STEP_COUNT - 1, Math.max(0, Math.round(v * (STEP_COUNT - 1)))));
  });

  return (
    <div ref={containerRef} className="relative z-20" style={{ height: `${STEP_COUNT * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-charcoal">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-deep/60 via-charcoal to-brown/40" />
        <div className="absolute inset-0 blueprint-grid opacity-15" />

        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-amber/30"
            style={{ left: `${10 + i * 7}%`, top: `${20 + (i % 5) * 15}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        <div className="absolute top-24 left-0 right-0 z-40 px-12 lg:px-16 pointer-events-none">
          <p className="font-label text-amber/70">The Transformation</p>
          <h2 className="mt-3 font-display text-5xl lg:text-6xl font-semibold text-ivory max-w-3xl leading-tight">
            From <span className="text-gradient-gold italic">waste</span> to architecture
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {PROCESS_NARRATIVE.map((label, i) => (
              <span
                key={label}
                className={`font-label px-3 py-1 border transition-all duration-500 ${
                  Math.floor(active / 2) === i
                    ? 'border-amber/50 text-amber bg-amber/10'
                    : 'border-bronze/20 text-beige/40'
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <motion.div style={{ x }} className="flex h-full will-change-transform">
          {PROCESS_STEPS.map((step, i) => (
            <article
              key={step.id}
              className="relative flex-shrink-0 w-screen h-full flex items-center justify-center px-12 pt-32 pb-24"
            >
              <div className="relative w-full max-w-7xl h-[min(70vh,640px)] grid grid-cols-12 gap-8 items-center">
                <motion.div
                  className={`relative col-span-7 h-full min-h-[320px] ${
                    i % 2 === 1 ? 'order-2 translate-x-8' : '-translate-x-4'
                  }`}
                  animate={{ scale: active === i ? 1 : 0.9, opacity: active === i ? 1 : 0.3 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="absolute inset-0 rounded-sm overflow-hidden border border-bronze/20">
                    <motion.img
                      src={step.image}
                      alt=""
                      className="w-full h-full object-cover"
                      animate={{ scale: active === i ? 1.1 : 1 }}
                      transition={{ duration: 1.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                  </div>
                  <div
                    className={`absolute -z-10 inset-0 border border-amber/15 rounded-sm translate-x-3 translate-y-3`}
                  />
                </motion.div>

                <motion.div
                  className={`col-span-5 relative z-10 ${i % 2 === 1 ? 'order-1 -translate-y-10' : 'translate-y-10'}`}
                >
                  <AnimatePresence mode="wait">
                    {active === i && (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(6px)' }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="glass-panel-dark border border-amber/25 p-10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)]"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <span className="font-display text-5xl text-amber/40">
                            {String(step.id).padStart(2, '0')}
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-amber/60 to-transparent" />
                          <span className="font-label text-amber/80">{step.phase}</span>
                        </div>
                        <h3 className="font-display text-3xl md:text-4xl font-semibold text-ivory leading-tight">
                          {step.title}
                        </h3>
                        <p className="mt-5 text-beige/65 leading-relaxed font-body text-lg">
                          {step.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </article>
          ))}
        </motion.div>

        <div className="absolute bottom-10 left-12 right-12 z-40">
          <div className="flex items-center gap-4">
            <span className="font-label text-beige/40">Journey</span>
            <div className="flex-1 h-px bg-bronze/30 relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-amber/70"
                style={{ width: progressWidth }}
              />
            </div>
            <div className="flex gap-2">
              {PROCESS_STEPS.map((s, i) => (
                <div
                  key={s.id}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    active === i ? 'w-8 bg-amber' : 'w-2 bg-bronze/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15 z-0" aria-hidden>
          <motion.path
            d="M0,55 Q400,75 800,40 T1600,50"
            fill="none"
            stroke="#c9a35a"
            strokeWidth="1"
            strokeDasharray="8 12"
            style={{ pathLength: lineProgress }}
          />
        </svg>
      </div>
    </div>
  );
}

function ProcessMobile() {
  const [active, setActive] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-24 bg-charcoal overflow-hidden lg:hidden">
      <div className="px-6 mb-10">
        <p className="font-label text-amber/70">The Transformation</p>
        <h2 className="font-display text-3xl font-semibold text-ivory mt-2">
          Waste to architecture
        </h2>
      </div>
      <div
        ref={stripRef}
        onScroll={(e) => {
          const w = e.currentTarget.clientWidth;
          setActive(Math.round(e.currentTarget.scrollLeft / w));
        }}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
      >
        {PROCESS_STEPS.map((step) => (
          <div key={step.id} className="snap-center flex-shrink-0 w-[88vw] first:pl-6 last:pr-6">
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-bronze/20 mb-4">
              <img src={step.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="glass-panel-dark p-6 border border-amber/20 mr-4">
              <span className="font-label text-amber/70">{step.phase}</span>
              <h3 className="font-display text-xl font-semibold text-ivory mt-2">{step.title}</h3>
              <p className="mt-3 text-sm text-beige/60">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {PROCESS_STEPS.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full ${active === i ? 'w-6 bg-amber' : 'w-1.5 bg-bronze/40'}`} />
        ))}
      </div>
    </section>
  );
}

export const Process: React.FC = () => (
  <div id="process" className="relative z-20 -mt-16">
    <div className="hidden lg:block">
      <ProcessDesktop />
    </div>
    <ProcessMobile />
  </div>
);

export default Process;
