import React from 'react';
import { motion } from 'framer-motion';
import { NAV_LINKS, SOCIAL, CONTACT } from '../../data/siteContent';
import { useScrollTo } from '../../hooks/useScrollTo';

export const Footer: React.FC = () => {
  const scrollTo = useScrollTo();

  return (
    <footer className="relative border-t border-bronze/20 bg-charcoal pt-24 pb-12 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-amber/5 blur-[80px] rounded-full" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <h3 className="font-display text-3xl font-semibold text-ivory">
              Ecolo<span className="text-amber italic">Brick</span>
            </h3>
            <p className="mt-5 text-beige/55 leading-relaxed font-body max-w-sm">
              An industrial laboratory reimagined — biosourced architecture born from coffee waste,
              palm fiber, and cold craftsmanship in Annaba.
            </p>
            <p className="mt-8 font-display text-lg italic text-amber/60">
              Craft · Science · Permanence
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="font-label text-bronze mb-5">Navigate</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(l.href);
                    }}
                    className="text-beige/55 hover:text-amber transition-colors duration-300 text-sm font-body"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="font-label text-bronze mb-5">Atelier</p>
            <p className="text-sm text-beige/55 font-body">{CONTACT.address}</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="block mt-3 text-sm text-amber/80 hover:text-amber font-body"
            >
              {CONTACT.email}
            </a>
            <div className="flex flex-wrap gap-3 mt-8">
              {SOCIAL.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="font-label text-beige/50 border border-bronze/25 px-4 py-2 rounded-lg hover:border-amber/40 hover:text-amber transition-all duration-300"
                >
                  {s.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-bronze/15 flex flex-col sm:flex-row justify-between gap-4 text-xs text-beige/40 font-body">
          <span>© {new Date().getFullYear()} EcoloBrick</span>
          <span>Annaba, Algeria — Sustainable Construction Atelier</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
