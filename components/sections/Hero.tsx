import React, { useRef, lazy, Suspense, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion';
import { HERO } from '../../data/siteContent';
import { Button } from '../ui/Button';
import { HeroAtmosphere } from '../effects/HeroAtmosphere';
import { HeroAmbientSound } from '../effects/HeroAmbientSound';

const EcoBricksScene = lazy(() => import('../three/EcoBricksScene'));

const headlineWords = ['Building', 'the', 'Future', 'with'];
const accentWords = ['Eco-Friendly', 'Bricks'];

const heroStats = [
  { value: '0', label: 'CO₂ emissions' },
  { value: '370t', label: 'Waste / month' },
  { value: 'λ 0.21', label: 'Thermal λ' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.35 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 18 });

  const parallaxTextX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const parallaxTextY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const parallaxSceneX = useTransform(smoothX, [-0.5, 0.5], [-28, 28]);
  const parallaxSceneY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  const sceneScale = useTransform(smoothY, [-0.5, 0.5], [1.02, 0.98]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 120]);

  useEffect(() => {
    const updateSpot = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setSpotlight({ x: rect.width * 0.55, y: rect.height * 0.35 });
    };
    updateSpot();
    window.addEventListener('resize', updateSpot);
    return () => window.removeEventListener('resize', updateSpot);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      <HeroAtmosphere spotlightX={spotlight.x} spotlightY={spotlight.y} />

      {/* Full-bleed 3D stage (behind content) */}
      <motion.div
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
        }}
        className="absolute inset-0 z-[1] pointer-events-none"
      >
        <motion.div
          style={{ x: parallaxSceneX, y: parallaxSceneY, scale: sceneScale }}
          className="absolute inset-0 lg:left-[38%] lg:right-[-8%] top-[8%] bottom-[12%]"
        >
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,163,90,0.08),transparent_65%)]" />
            <Suspense
              fallback={
                <div className="h-full w-full flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                    className="h-10 w-10 rounded-full border border-bronze/40 border-t-amber/80"
                  />
                </div>
              }
            >
              <EcoBricksScene className="h-full w-full" mouseX={smoothX} mouseY={smoothY} />
            </Suspense>
            <div className="absolute inset-0 rounded-sm ring-1 ring-bronze/25 shadow-[inset_0_0_100px_rgba(201,163,90,0.06)] pointer-events-none" />
          </div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="section-container relative z-10 w-full pt-32 pb-36 lg:pt-36"
      >
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            style={{ x: parallaxTextX, y: parallaxTextY }}
            className="lg:col-span-7 xl:col-span-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-3 border border-bronze/30 bg-charcoal/40 px-5 py-2 font-label text-amber/90 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-amber/80" />
                Annaba · Algeria · Atelier
              </span>
            </motion.div>

            <h1 className="mt-10 font-display font-semibold tracking-tight text-ivory">
              <span className="block overflow-hidden">
                {headlineWords.map((word) => (
                  <motion.span
                    key={word}
                    variants={itemVariants}
                    className="inline-block mr-[0.25em] text-4xl sm:text-5xl md:text-6xl xl:text-[4.25rem] leading-[1.05]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block mt-1 overflow-hidden">
                {accentWords.map((word) => (
                  <motion.span
                    key={word}
                    variants={itemVariants}
                    className="inline-block mr-[0.2em] text-4xl sm:text-5xl md:text-6xl xl:text-[4.5rem] leading-[1.02] text-gradient-gold italic"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-lg text-lg md:text-xl text-beige/70 leading-relaxed"
            >
              {HERO.subtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4">
              {HERO.ctas.map((cta) => (
                <Button key={cta.label} variant={cta.variant} href={cta.href}>
                  {cta.label}
                </Button>
              ))}
            </motion.div>

            {/* Cinematic stat strip */}
            <motion.div
              variants={itemVariants}
              className="mt-14 flex flex-wrap gap-10 border-t border-bronze/20 pt-8"
            >
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl md:text-3xl font-semibold text-ivory">{stat.value}</p>
                  <p className="font-label text-beige/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Spacer for 3D on desktop */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6" aria-hidden />
        </div>
      </motion.div>

      {/* Scroll indicator — cinematic ring */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity: heroOpacity }}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-3 text-beige/50 hover:text-amber transition-colors duration-500 group"
      >
        <span className="font-label text-amber/60">Descend</span>
        <div className="relative h-12 w-7 border border-bronze/30 flex justify-center pt-2 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0.8, 0.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="h-2 w-px bg-amber/70"
          />
        </div>
      </motion.a>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 2 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block font-label text-beige/30 [writing-mode:vertical-rl] rotate-180"
      >
        Laboratory of Sustainable Craft · Est. 2024
      </motion.span>

      <HeroAmbientSound />
    </section>
  );
};

export default Hero;
