import React from 'react';
import { motion } from 'framer-motion';
import { HeroVideoOverlay } from './HeroVideoOverlay';

interface HeroAtmosphereProps {
  spotlightX: number;
  spotlightY: number;
}

export const HeroAtmosphere: React.FC<HeroAtmosphereProps> = ({ spotlightX, spotlightY }) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <HeroVideoOverlay />

      {/* Workshop atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1816] via-[#12100e] to-matte" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_30%,rgba(201,163,90,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_70%,rgba(61,92,74,0.15),transparent_50%)]" />

      {/* Warm mouse lantern */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(520px circle at ${spotlightX}px ${spotlightY}px, rgba(201,163,90,0.14), transparent 48%)`,
        }}
      />

      {/* Atmospheric fog layers */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[55%] opacity-40"
        style={{
          background: 'linear-gradient(to top, rgba(26,24,22,0.95), transparent)',
        }}
        animate={{ opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[20%] left-[-10%] w-[120%] h-[40%] opacity-20"
        style={{
          background: 'radial-gradient(ellipse, rgba(201,163,90,0.15) 0%, transparent 70%)',
        }}
        animate={{ x: ['-2%', '2%', '-2%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Stone-floor perspective */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%] opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,115,85,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,115,85,0.25) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          transform: 'perspective(600px) rotateX(72deg)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, black 15%, transparent 80%)',
        }}
      />

      {/* Amber light shafts */}
      <motion.div
        className="absolute top-0 left-[22%] w-px h-full origin-top"
        style={{
          background: 'linear-gradient(to bottom, rgba(201,163,90,0.25), transparent 70%)',
          transform: 'rotate(-14deg)',
        }}
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-0 right-[28%] w-px h-full origin-top"
        style={{
          background: 'linear-gradient(to bottom, rgba(232,226,214,0.12), transparent 65%)',
          transform: 'rotate(10deg)',
        }}
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 11, repeat: Infinity, delay: 2 }}
      />

      {/* Dust motes — warm, not neon */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-amber/40"
          style={{
            left: `${(i * 19) % 100}%`,
            top: `${(i * 27) % 100}%`,
            width: i % 4 === 0 ? 2 : 1,
            height: i % 4 === 0 ? 2 : 1,
            boxShadow: '0 0 8px rgba(201,163,90,0.3)',
          }}
          animate={{
            y: [0, -40 - i * 3, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 10 + (i % 4),
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,14,13,0.65)_100%)]" />
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-matte to-transparent" />
    </div>
  );
};

export default HeroAtmosphere;
