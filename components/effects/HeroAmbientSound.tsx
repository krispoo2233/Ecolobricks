import React from 'react';
import { motion } from 'framer-motion';
import { useHeroAmbientSound } from '../../hooks/useHeroAmbientSound';

export const HeroAmbientSound: React.FC = () => {
  const { enabled, toggle } = useHeroAmbientSound();

  return (
    <motion.button
      type="button"
      onClick={() => toggle()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2 }}
      aria-label={enabled ? 'Mute atelier ambience' : 'Play atelier ambience'}
      aria-pressed={enabled}
      className="fixed bottom-10 right-6 z-30 flex items-center gap-3 border border-bronze/30 bg-charcoal/70 px-4 py-2.5 backdrop-blur-md hover:border-amber/40 transition-all duration-500"
    >
      <span className="font-label text-beige/60">{enabled ? 'Ambience on' : 'Ambience'}</span>
    </motion.button>
  );
};

export default HeroAmbientSound;
