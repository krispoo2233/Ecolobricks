import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const VIDEO_SRC =
  'https://assets.mixkit.co/videos/preview/mixkit-factory-industrial-machines-working-4931-large.mp4';

export const HeroVideoOverlay: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {!failed ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          onError={() => setFailed(true)}
          onLoadedData={() => videoRef.current?.play().catch(() => setFailed(true))}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.06] mix-blend-soft-light scale-105"
          style={{
            filter: 'sepia(0.5) saturate(0.4) brightness(0.4) contrast(1.1) hue-rotate(-15deg)',
          }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      ) : (
        <motion.div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 30% 40%, rgba(201,163,90,0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, rgba(61,92,74,0.2) 0%, transparent 45%)
            `,
          }}
          animate={{ opacity: [0.04, 0.07, 0.04] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      )}
    </div>
  );
};

export default HeroVideoOverlay;
