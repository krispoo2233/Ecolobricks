import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../../data/siteContent';
import { useScrollTo } from '../../hooks/useScrollTo';

const SECTION_PREVIEWS: Record<string, React.ReactNode> = {
  '#about': (
    <div className="flex flex-col gap-2 p-2 rounded-3xl bg-gradient-to-br from-amber/15 via-charcoal/10 to-charcoal/35 h-full">
      <div className="h-2 rounded-full bg-amber/70 w-3/4" />
      <div className="h-2 rounded-full bg-beige/40 w-full" />
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-amber/80" />
        <div className="h-2 rounded-full bg-beige/40 w-2/3" />
      </div>
    </div>
  ),
  '#process': (
    <div className="flex flex-col gap-2 p-2 rounded-3xl bg-gradient-to-br from-charcoal/70 via-charcoal/40 to-amber/10 h-full">
      <div className="h-2 rounded-full bg-amber/60 w-full" />
      <div className="h-2 rounded-full bg-amber/40 w-5/6" />
      <div className="h-2 rounded-full bg-amber/20 w-3/4" />
      <div className="h-2 rounded-full bg-amber/10 w-2/3" />
    </div>
  ),
  '#products': (
    <div className="flex flex-col gap-2 p-2 rounded-3xl bg-gradient-to-br from-forest-deep/60 via-charcoal/55 to-amber/10 h-full">
      <div className="h-2 rounded-full bg-amber/60 w-full" />
      <div className="h-10 rounded-2xl bg-charcoal/90 w-full" />
      <div className="h-2 rounded-full bg-beige/50 w-2/3" />
    </div>
  ),
  '#impact': (
    <div className="flex flex-col gap-2 p-2 rounded-3xl bg-gradient-to-br from-charcoal/70 via-charcoal/45 to-amber/10 h-full">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-amber/70" />
        <div className="h-2 rounded-full bg-beige/40 w-full" />
      </div>
      <div className="h-2 rounded-full bg-beige/30 w-5/6" />
      <div className="h-2 rounded-full bg-amber/20 w-2/3" />
    </div>
  ),
  '#technology': (
    <div className="flex flex-col gap-2 p-2 rounded-3xl bg-gradient-to-br from-charcoal/70 via-charcoal/40 to-emerald/10 h-full">
      <div className="h-2 rounded-full bg-amber/60 w-4/5" />
      <div className="h-2 rounded-full bg-beige/40 w-full" />
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-emerald/70" />
        <div className="h-2 rounded-full bg-beige/40 w-2/3" />
      </div>
    </div>
  ),
  '#market': (
    <div className="flex flex-col gap-2 p-2 rounded-3xl bg-gradient-to-br from-charcoal/70 via-charcoal/40 to-amber/10 h-full">
      <div className="h-2 rounded-full bg-amber/60 w-3/4" />
      <div className="h-2 rounded-full bg-beige/40 w-full" />
      <div className="h-2 rounded-full bg-amber/20 w-2/3" />
    </div>
  ),
  '#team': (
    <div className="flex flex-col gap-2 p-2 rounded-3xl bg-gradient-to-br from-charcoal/70 via-charcoal/40 to-amber/10 h-full">
      <div className="h-10 rounded-2xl bg-charcoal/90 w-full" />
      <div className="h-2 rounded-full bg-amber/50 w-2/3" />
      <div className="h-2 rounded-full bg-beige/40 w-1/2" />
    </div>
  ),
  '#contact': (
    <div className="flex flex-col gap-2 p-2 rounded-3xl bg-gradient-to-br from-charcoal/70 via-charcoal/45 to-amber/10 h-full">
      <div className="h-2 rounded-full bg-amber/70 w-full" />
      <div className="h-2 rounded-full bg-beige/40 w-5/6" />
      <div className="h-2 rounded-full bg-amber/20 w-3/4" />
    </div>
  ),
};

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState(NAV_LINKS[0]?.href || '#about');
  const scrollTo = useScrollTo();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.2, 0.4, 0.6, 0.8] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setActive(href);
    scrollTo(href);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-700 ${scrolled ? 'py-3' : 'py-6'}`}>
        <div
          className={`section-container flex items-center justify-between transition-all duration-700 rounded-2xl ${
            scrolled ? 'glass-panel-dark py-3 px-6 border border-bronze/15' : 'px-2'
          }`}
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#hero');
            }}
            className="font-display text-xl font-semibold tracking-tight text-ivory"
          >
            Ecolo<span className="text-amber italic">Brick</span>
          </a>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNav('#contact');
              }}
              className="btn-primary text-xs py-2.5 px-6"
            >
              Inquire
            </a>
          </div>

          <button
            type="button"
            aria-label="Menu"
            className="lg:hidden p-2 text-parchment"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden section-container mt-2 overflow-hidden"
            >
              <div className="glass-panel-dark border border-bronze/15 p-6 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <button
                    type="button"
                    key={link.href}
                    onClick={() => {
                      handleNav(link.href);
                      setMobileOpen(false);
                    }}
                    className="text-left font-body text-parchment py-2 rounded-2xl hover:bg-amber/10 transition-all"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <aside className="scroll-dock">
        <div className="scroll-dock-inner">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <motion.button
                key={link.href}
                type="button"
                onClick={() => handleNav(link.href)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className={`dock-button group relative flex items-center gap-3 rounded-3xl border border-bronze/20 bg-charcoal/90 p-3 text-left transition-all duration-300 ${
                  isActive ? 'dock-button-active' : 'hover:bg-charcoal/80'
                }`}
              >
                <div className="w-12 h-12 rounded-3xl border border-bronze/15 overflow-hidden bg-charcoal/80 shadow-soft">
                  {SECTION_PREVIEWS[link.href] || (
                    <div className="h-full w-full bg-charcoal/80" />
                  )}
                </div>
                <span className="font-label text-beige/70 text-[11px] tracking-[0.25em] uppercase hidden xl:inline-block">
                  {link.label}
                </span>

                <div className="dock-tooltip hidden group-hover:flex">
                  <div className="font-label text-amber/80 text-[10px] tracking-[0.25em] uppercase">
                    {link.label}
                  </div>
                  <div className="mt-2 rounded-3xl border border-bronze/20 bg-charcoal/90 p-3 shadow-soft w-44">
                    <div className="h-2 rounded-full bg-amber/60 w-3/4" />
                    <div className="mt-2 h-2 rounded-full bg-beige/40 w-full" />
                    <div className="mt-2 h-2 rounded-full bg-beige/30 w-5/6" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
