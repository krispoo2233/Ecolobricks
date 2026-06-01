import React from 'react';
import { motion } from 'framer-motion';

interface FloatingPanelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  offset?: 'left' | 'right' | 'center';
}

export const FloatingPanel: React.FC<FloatingPanelProps> = ({
  children,
  className = '',
  delay = 0,
  offset = 'right',
}) => {
  const offsetClass =
    offset === 'left'
      ? '-translate-x-4 md:-translate-x-8'
      : offset === 'right'
        ? 'translate-x-4 md:translate-x-8'
        : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: offset === 'left' ? -1 : 1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.4 } }}
      className={`glass-panel-dark border border-bronze/25 shadow-warm ${offsetClass} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default FloatingPanel;
