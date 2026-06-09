export function scrollToSection(id: string) {
  const el = document.getElementById(id.replace(/^#/, ''));
  if (!el) return;
  const headerOffset = 96;
  const elementPosition = el.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = Math.max(0, elementPosition - headerOffset);
  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
}

export function useScrollTo() {
  return (href: string) => {
    if (href.startsWith('#')) scrollToSection(href);
    else window.location.href = href;
  };
}
