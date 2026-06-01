import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'dark' | 'light';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  description,
  align = 'left',
  theme = 'dark',
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const maxDesc = align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-xl';
  const labelColor = theme === 'light' ? 'text-bronze' : 'text-amber/80';
  const titleColor = theme === 'light' ? 'text-charcoal' : 'text-ivory';
  const descColor = theme === 'light' ? 'text-brown/80' : 'text-beige/65';

  return (
    <div className={`mb-16 md:mb-24 ${alignClass}`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        className={`flex items-center gap-4 mb-6 ${align === 'center' ? 'justify-center' : ''}`}
      >
        {align !== 'center' && <div className="ornament-line" />}
        <span className={`font-label text-xs ${labelColor}`}>{label}</span>
        {align === 'center' && <div className="ornament-line" />}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: 0.06, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-semibold leading-[1.08] tracking-tight ${titleColor}`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12, duration: 0.8 }}
          className={`mt-6 text-base md:text-lg leading-relaxed font-body ${descColor} ${maxDesc}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
