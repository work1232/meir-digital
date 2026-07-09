export const site = {
  name: "Meir Digital",
  tagline: "Web Developer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://meirdigital.vercel.app",
  phoneDisplay: "054-382-1419",
  phoneHref: "tel:+972543821419",
  whatsappNumber: "972543821419",
  featuredProjectUrl: "https://yosi1223.github.io/work/",
} as const;

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const navKeys = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "portfolio", href: "/portfolio" },
  { key: "pricing", href: "/pricing" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

export type NavHref = (typeof navKeys)[number]["href"];
