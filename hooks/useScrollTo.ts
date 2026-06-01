export function scrollToSection(id: string) {
  const el = document.getElementById(id.replace(/^#/, ''));
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function useScrollTo() {
  return (href: string) => {
    if (href.startsWith('#')) scrollToSection(href);
    else window.location.href = href;
  };
}
