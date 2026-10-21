import type { Locale } from "@/lib/locale";
import { POLES, SERVICES, type PriceRef, type Service } from "@/content/services";
import { SECTORS, type Sector } from "@/content/sectors";
import { ARTICLES, type Article } from "@/content/blog";
import {
  CASE_STUDIES,
  WORK_ITEMS,
  type CaseItem,
  type Stat,
  type WorkItem,
} from "@/components/work/work.data";
import { SITE_ITEMS, type SiteItem } from "@/components/work/sites.data";
import {
  A_LA_CARTE,
  CUSTOM,
  LAUNCH_OFFER,
  MAD,
  NOT_INCLUDED,
  PACKS,
  type AlaCarte,
  type Pack,
} from "@/config/pricing";
import { POLES_EN, SERVICES_EN } from "@/content/en/services";
import { SECTORS_EN } from "@/content/en/sectors";
import { ARTICLES_EN } from "@/content/en/blog";
import { SITES_EN, STAT_LABELS_EN, WORKS_EN } from "@/content/en/work";
import {
  CARTE_EN,
  CARTE_GROUPS_EN,
  CUSTOM_EN,
  LAUNCH_OFFER_EN,
  MAD_NOTE_EN,
  NOT_INCLUDED_EN,
  PACKS_EN,
} from "@/content/en/pricing";

/**
 * UltraVision Agency — les contenus dans la langue de la page.
 *
 * Chaque fonction prend la langue et renvoie les memes objets que les
 * fichiers francais, avec leurs textes remplaces par la traduction quand
 * elle existe. Un texte non traduit retombe sur le francais : la page
 * reste complete, jamais vide.
 *
 * Les pages appellent ces fonctions plutot que SERVICES, SECTORS... en
 * direct : c'est le seul endroit ou la langue choisit le texte.
 */

/* --------------------------------------------------------------- services */

export const servicesFor = (l: Locale): Service[] =>
  l === "en" ? SERVICES.map((s) => ({ ...s, ...SERVICES_EN[s.slug] })) : SERVICES;

export const findServiceFor = (slug: string | undefined, l: Locale) =>
  servicesFor(l).find((s) => s.slug === slug);

export const polesFor = (l: Locale): typeof POLES =>
  l === "en" ? POLES.map((p) => ({ ...p, ...POLES_EN[p.id] })) : POLES;

/* ---------------------------------------------------------------- secteurs */

export const sectorsFor = (l: Locale): Sector[] =>
  l === "en" ? SECTORS.map((s) => ({ ...s, ...SECTORS_EN[s.slug] })) : SECTORS;

export const findSectorFor = (slug: string | undefined, l: Locale) =>
  sectorsFor(l).find((s) => s.slug === slug);

/* -------------------------------------------------------------------- blog */

/**
 * En anglais, seuls les articles TRADUITS sont publies : un article
 * francais sous une adresse anglaise serait une page en double.
 */
export const articlesFor = (l: Locale): Article[] => {
  const list =
    l === "en"
      ? ARTICLES.filter((a) => ARTICLES_EN[a.slug]).map((a) => ({ ...a, ...ARTICLES_EN[a.slug] }))
      : ARTICLES;
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
};

export const findArticleFor = (slug: string | undefined, l: Locale) =>
  articlesFor(l).find((a) => a.slug === slug);

/* -------------------------------------------------------------- realisations */

const statLabel = (s: Stat): Stat => ({ ...s, label: STAT_LABELS_EN[s.label] ?? s.label });

export function workFor<T extends WorkItem | SiteItem>(item: T, l: Locale): T {
  if (l === "fr") return item;
  const isFilm = "sources" in item;
  const t = isFilm ? WORKS_EN[item.slug] : SITES_EN[item.slug];
  const out = { ...item, ...t, caseStudy: item.caseStudy } as T;
  if (item.caseStudy) out.caseStudy = { ...item.caseStudy, ...t?.caseStudy };
  if (isFilm) {
    const w = out as WorkItem;
    w.stats = w.stats.map(statLabel) as WorkItem["stats"];
    w.demoStats = w.demoStats.map(statLabel) as WorkItem["demoStats"];
  }
  return out;
}

export const workItemsFor = (l: Locale) => WORK_ITEMS.map((w) => workFor(w, l));
export const siteItemsFor = (l: Locale) => SITE_ITEMS.map((s) => workFor(s, l));
export const caseStudiesFor = (l: Locale): CaseItem[] => CASE_STUDIES.map((c) => workFor(c, l));
export const findWorkFor = (slug: string | undefined, l: Locale) =>
  workItemsFor(l).find((w) => w.slug === slug);
export const findCaseFor = (slug: string | undefined, l: Locale) =>
  caseStudiesFor(l).find((c) => c.slug === slug);

/* ------------------------------------------------------------------- tarifs */

export const packsFor = (l: Locale): Pack[] =>
  l === "en" ? PACKS.map((p) => ({ ...p, ...PACKS_EN[p.id] })) : PACKS;

export const aLaCarteFor = (l: Locale): AlaCarte[] =>
  l === "en"
    ? A_LA_CARTE.map((g) => ({
        group: CARTE_GROUPS_EN[g.group] ?? g.group,
        items: g.items.map((i) => ({ ...i, ...CARTE_EN[i.label] })),
      }))
    : A_LA_CARTE;

export const notIncludedFor = (l: Locale) =>
  l === "en" && NOT_INCLUDED_EN.length === NOT_INCLUDED.length ? NOT_INCLUDED_EN : NOT_INCLUDED;

export const customFor = (l: Locale) => (l === "en" && CUSTOM_EN ? CUSTOM_EN : CUSTOM);

export const launchOfferFor = (l: Locale) =>
  l === "en" && LAUNCH_OFFER_EN.badge
    ? { ...LAUNCH_OFFER, badge: LAUNCH_OFFER_EN.badge, until: LAUNCH_OFFER_EN.until }
    : LAUNCH_OFFER;

export const madNoteFor = (l: Locale) => (l === "en" && MAD_NOTE_EN ? MAD_NOTE_EN : MAD.note);

/**
 * Le pendant de resolvePrice (services.ts), dans la langue de la page.
 * La recherche se fait toujours sur le libelle FRANCAIS, qui sert de cle.
 */
export function resolvePriceFor(ref: PriceRef, l: Locale) {
  if ("pack" in ref) {
    const p = packsFor(l).find((x) => x.id === ref.pack);
    if (!p) return null;
    return {
      label: l === "en" ? `${p.name} plan` : `Formule ${p.name}`,
      detail: p.features.slice(0, 3).join(" · "),
      price: p.price,
      ...(p.period ? { unit: p.period } : {}),
      from: false,
    };
  }
  for (const g of A_LA_CARTE) {
    const it = g.items.find((i) => i.label === ref.carte);
    if (it) return { ...it, ...(l === "en" ? CARTE_EN[it.label] : {}), from: !!it.from };
  }
  return null;
}
