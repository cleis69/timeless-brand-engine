import { useLocation } from "@tanstack/react-router";
import { BLOG_SLUGS_EN } from "@/content/blog.slugs.en";

/**
 * UltraVision Agency — les deux langues du site.
 *
 * ============================================================
 *  LE FRANCAIS RESTE LA LANGUE DE REFERENCE
 * ============================================================
 *
 * Toutes les adresses francaises restent ce qu'elles etaient. La version
 * anglaise vit sous /en, avec des adresses traduites : une adresse
 * anglaise se lit, se partage et se cite mieux qu'une adresse francaise
 * precedee de /en.
 *
 * Le code ne connait qu'une adresse par page : l'adresse FRANCAISE. Elle
 * sert d'identifiant. `localePath(path, locale)` la traduit au moment
 * d'afficher un lien ; `frenchPath(path)` fait le chemin inverse pour le
 * selecteur de langue et pour les balises hreflang.
 *
 * Les identifiants internes (slugs de services, de secteurs, d'articles)
 * restent francais partout dans les donnees. Seule l'adresse change.
 */

export type Locale = "fr" | "en";
export const LOCALES: Locale[] = ["fr", "en"];

/** Pour les attributs lang, og:locale, inLanguage. */
export const LANG_TAG: Record<Locale, string> = { fr: "fr-FR", en: "en" };
export const OG_LOCALE: Record<Locale, string> = { fr: "fr_FR", en: "en_GB" };

/** Les pages fixes : adresse francaise → adresse anglaise. */
const PAGES: Record<string, string> = {
  "/": "/en",
  "/agence-marketing-digital-marrakech": "/en/digital-marketing-agency-marrakech",
  "/agence-video-publicitaire-meta-ads-marrakech": "/en/video-ads-meta-ads-agency-marrakech",
  "/generation-leads-immobiliers-marrakech": "/en/real-estate-lead-generation-marrakech",
  "/marketing-hotels-riads-marrakech": "/en/hotel-riad-marketing-marrakech",
  "/services": "/en/services",
  "/tarifs": "/en/pricing",
  "/realisations": "/en/work",
  "/secteurs": "/en/industries",
  "/methode": "/en/method",
  "/a-propos": "/en/about",
  "/contact": "/en/contact",
  "/blog": "/en/blog",
  "/casting": "/en/casting",
};

/** Les sections a adresse variable : prefixe francais → prefixe anglais. */
const SECTIONS: [fr: string, en: string][] = [
  ["/services/", "/en/services/"],
  ["/secteurs/", "/en/industries/"],
  ["/realisations/", "/en/work/"],
  ["/blog/", "/en/blog/"],
];

/** Slugs : identifiant francais → adresse anglaise. Absent = identique. */
export const SLUGS_EN: Record<string, string> = {
  /* Services */
  "production-video-photo": "video-photo-production",
  "generation-de-leads": "lead-generation",
  "creation-site-web": "website-design",
  "crm-ia-automatisation": "crm-ai-automation",
  /* Secteurs */
  immobilier: "real-estate",
  "beaute-bien-etre": "beauty-wellness",
  "restauration-hospitality": "restaurants-hospitality",
  /* Articles du blog */
  ...BLOG_SLUGS_EN,
};

const enSlug = (id: string) => SLUGS_EN[id] ?? id;
/** Slug d'une adresse anglaise → identifiant francais. */
export const slugId = (slug: string) =>
  Object.entries(SLUGS_EN).find(([, en]) => en === slug)?.[0] ?? slug;

const frSlug = (slug: string) =>
  Object.entries(SLUGS_EN).find(([, en]) => en === slug)?.[0] ?? slug;

/** Separe le chemin de son ancre ou de sa requete. */
function split(path: string): [string, string] {
  const i = path.search(/[?#]/);
  return i === -1 ? [path, ""] : [path.slice(0, i), path.slice(i)];
}

/** Adresse francaise → adresse dans la langue demandee. */
export function localePath(path: string, locale: Locale): string {
  if (locale === "fr" || !path.startsWith("/")) return path;
  const [p, rest] = split(path);
  if (p in PAGES) return PAGES[p] + rest;
  for (const [fr, en] of SECTIONS) {
    if (p.startsWith(fr)) return en + enSlug(p.slice(fr.length)) + rest;
  }
  return path;
}

/** Adresse anglaise (ou francaise) → adresse francaise de reference. */
export function frenchPath(path: string): string {
  const [p, rest] = split(path);
  if (!isEnglishPath(p)) return path;
  const clean = p.length > 3 && p.endsWith("/") ? p.slice(0, -1) : p;
  const page = Object.entries(PAGES).find(([, en]) => en === clean || `${en}/` === clean);
  if (page) return page[0] + rest;
  for (const [fr, en] of SECTIONS) {
    if (clean.startsWith(en)) return fr + frSlug(clean.slice(en.length)) + rest;
  }
  return "/";
}

export const isEnglishPath = (pathname: string) =>
  pathname === "/en" || pathname.startsWith("/en/");

export const localeOf = (pathname: string): Locale => (isEnglishPath(pathname) ? "en" : "fr");

/** La langue de la page affichee. */
export function useLocale(): Locale {
  const { pathname } = useLocation();
  return localeOf(pathname);
}

/** Raccourci pour les composants : `const lp = useLocalePath(); <Link to={lp("/tarifs")}>`. */
export function useLocalePath() {
  const locale = useLocale();
  return (path: string) => localePath(path, locale);
}

/** Choisit le texte de la langue : `pick(locale, { fr: "…", en: "…" })`. */
export const pick = <T>(locale: Locale, v: Record<Locale, T>): T => v[locale];
