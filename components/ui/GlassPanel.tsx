import React from 'react';
import { motion } from 'framer-motion';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  glow?: boolean;
  hover?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  dark = false,
  glow = false,
  hover = true,
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -6, transition: { duration: 0.35 } } : undefined}
      className={`rounded-2xl md:rounded-3xl p-6 md:p-8 ${
        dark ? 'glass-panel-dark' : 'glass-panel'
      } ${glow ? 'glow-border' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassPanel;
