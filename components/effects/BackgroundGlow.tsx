import React from 'react';

export const BackgroundGlow: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
    <div className="absolute -top-1/4 -left-1/4 h-[70vh] w-[70vh] rounded-full bg-forest/25 blur-[140px]" />
    <div className="absolute top-1/3 -right-1/4 h-[55vh] w-[55vh] rounded-full bg-amber/8 blur-[120px]" />
    <div className="absolute -bottom-1/4 left-1/4 h-[45vh] w-[45vh] rounded-full bg-bronze/10 blur-[100px]" />
  </div>
);

export default BackgroundGlow;
