import React from 'react';
import { motion } from 'framer-motion';

type Variant = 'dark-to-light' | 'light-to-dark' | 'dark-to-warm';

const fills: Record<Variant, string> = {
  'dark-to-light': '#e8e2d6',
  'light-to-dark': '#1a1816',
  'dark-to-warm': '#2c2420',
};

export const SectionBridge: React.FC<{ variant?: Variant; className?: string }> = ({
  variant = 'dark-to-light',
  className = '',
}) => (
  <div className={`relative z-30 -mt-1 pointer-events-none ${className}`} aria-hidden>
    <motion.svg
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="w-full h-16 md:h-24 block"
    >
      <path
        d="M0,80 C360,20 720,100 1080,40 C1260,10 1380,60 1440,50 L1440,120 L0,120 Z"
        fill={fills[variant]}
      />
    </motion.svg>
  </div>
);

export default SectionBridge;
