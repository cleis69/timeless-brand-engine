/**
 * UltraVision Agency — balises et donnees structurees de chaque page.
 *
 * ============================================================
 *  TOUTES LES PAGES PASSENT PAR `pageHead()`.
 * ============================================================
 *
 * Avant, chaque page ecrivait ses balises a la main : dix facons de
 * faire, des oublis (aucune image de partage nulle part), et surtout
 * plusieurs « Organization » par page, sans lien entre elles. Pour un
 * moteur, c'etaient autant d'entreprises homonymes.
 *
 * LE GRAPHE
 *
 *   #organization  l'agence, decrite une fois (emise par la racine)
 *   #website       le site, publie par l'agence
 *   <page>#webpage chaque page, partie du site, a propos de...
 *
 * Chaque page ne redecrit plus l'agence : elle y renvoie par son `@id`.
 * Google, Bing et les assistants IA fusionnent les blocs qui partagent
 * un identifiant — c'est ce qui fait d'UltraVision Agency UNE entite.
 */

import { SITE_URL, url } from "@/config/site";
import { BRAND, LOGO, LOGO_ID, OG_IMAGE, ORG_ID, WEBSITE_ID } from "@/config/brand";
import { AREA_SERVED, CONTACT, hasPhone, hasWhatsapp, whatsappUrl } from "@/config/contact";
import { POLES, SERVICES, servicePath, type Service } from "@/content/services";
import type { CaseStudy, WorkItem } from "@/components/work/work.data";
import type { SiteItem } from "@/components/work/sites.data";

type Node = Record<string, unknown>;

export const orgRef = { "@id": ORG_ID };
export const websiteRef = { "@id": WEBSITE_ID };

/** Adresse absolue d'une page. La page d'accueil garde sa barre finale. */
export const pageUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : url(path));

export const serviceId = (slug: string) => `${url(servicePath(slug as Service["slug"]))}#service`;

/* ==========================================================================
 *  L'ENTITE
 * ========================================================================== */

/**
 * L'agence. ProfessionalService est un sous-type de LocalBusiness, lui-meme
 * sous-type d'Organization : c'est le type le plus precis que schema.org
 * propose pour une agence de services.
 */
export function organizationNode(): Node {
  return {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: BRAND.name,
    alternateName: [...BRAND.alternateNames],
    description: `${BRAND.definition} ${BRAND.summary}`,
    slogan: BRAND.slogan,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: url(LOGO.path),
      contentUrl: url(LOGO.path),
      width: LOGO.width,
      height: LOGO.height,
      caption: BRAND.name,
    },
    image: { "@id": LOGO_ID },
    email: CONTACT.email,
    ...(hasPhone ? { telephone: CONTACT.phone } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: BRAND.city,
      addressCountry: BRAND.countryCode,
    },
    areaServed: AREA_SERVED,
    knowsLanguage: ["fr", "ar", "en"],
    knowsAbout: [
      BRAND.category,
      "Marketing digital",
      ...SERVICES.map((s) => s.name),
      "Référencement naturel (SEO)",
      "Visibilité sur les moteurs IA (GEO)",
    ],
    founder: { "@type": "Person", name: BRAND.founder.name, jobTitle: BRAND.founder.jobTitle },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACT.email,
        ...(hasPhone ? { telephone: CONTACT.phone } : {}),
        ...(hasWhatsapp ? { url: whatsappUrl() } : {}),
        areaServed: BRAND.countryCode,
        availableLanguage: ["French"],
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services ${BRAND.name}`,
      itemListElement: POLES.map((pole) => ({
        "@type": "OfferCatalog",
        name: pole.title,
        itemListElement: pole.services.map((slug) => {
          const s = SERVICES.find((x) => x.slug === slug)!;
          return {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": serviceId(s.slug),
              name: s.name,
              url: url(servicePath(s.slug)),
            },
          };
        }),
      })),
    },
    ...(BRAND.sameAs.length ? { sameAs: [...BRAND.sameAs] } : {}),
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: BRAND.name,
    alternateName: [BRAND.short, "ULTRA VISION"],
    description: `${BRAND.category} à ${BRAND.city} : marque, production vidéo, publicité, sites web et automatisation.`,
    inLanguage: "fr-FR",
    publisher: orgRef,
  };
}

/** Le bloc emis par la racine, sur toutes les pages. */
export const rootJsonLd = () =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode()],
  });

/* ==========================================================================
 *  LES NOEUDS REUTILISABLES
 * ========================================================================== */

export function serviceNode(s: Service): Node {
  return {
    "@type": "Service",
    "@id": serviceId(s.slug),
    name: s.name,
    serviceType: s.serviceType,
    description: s.intro,
    url: url(servicePath(s.slug)),
    provider: orgRef,
    areaServed: AREA_SERVED,
    availableLanguage: ["French"],
  };
}

export function videoNode(w: WorkItem, pagePath?: string): Node {
  return {
    "@type": "VideoObject",
    "@id": `${url(pagePath ?? "/realisations")}#video-${w.slug}`,
    name: `${w.title} — vidéo publicitaire`,
    description: w.caseStudy?.summary ?? w.description,
    thumbnailUrl: url(w.poster),
    contentUrl: url(w.sources.mp4),
    uploadDate: w.published,
    duration: `PT${w.durationSec}S`,
    inLanguage: "fr",
    creator: orgRef,
    publisher: orgRef,
  };
}

/**
 * Un site livre par l'agence, sujet d'une etude de cas. Le pendant de
 * `videoNode` pour les realisations web : `url` est l'adresse publique
 * du site (`caseStudy.website`), `creator` renvoie a l'agence.
 */
export function siteNode(s: SiteItem & { caseStudy: CaseStudy }, pagePath: string): Node {
  const c = s.caseStudy;
  return {
    "@type": "WebSite",
    "@id": `${pageUrl(pagePath)}#site-${s.slug}`,
    name: s.title,
    description: c.summary,
    ...(c.website ? { url: c.website } : {}),
    ...(s.shot ? { image: url(s.shot) } : {}),
    inLanguage: "fr",
    creator: orgRef,
  };
}

export function faqNode(path: string, faq: { q: string; a: string }[]): Node {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl(path)}#faq`,
    isPartOf: { "@id": `${pageUrl(path)}#webpage` },
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* ==========================================================================
 *  LA TETE DE PAGE
 * ========================================================================== */

type Crumb = { name: string; path: string };

type PageOptions = {
  path: string;
  /** Titre complet, nom de marque compris. */
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article";
  image?: { path: string; width?: number; height?: number; alt?: string };
  /** WebPage, AboutPage, ContactPage, CollectionPage... */
  pageType?: string;
  /** Le fil d'Ariane, sans l'accueil (ajoute automatiquement). */
  breadcrumbs?: Crumb[];
  /** Ce dont parle la page, s'il y a lieu (l'agence, un service...). */
  about?: Node;
  mainEntity?: Node;
  faq?: { q: string; a: string }[];
  /** Noeuds supplementaires : Service, VideoObject, ItemList... */
  nodes?: Node[];
  datePublished?: string;
  dateModified?: string;
  extraMeta?: Record<string, string>[];
  noindex?: boolean;
};

export function pageHead(o: PageOptions) {
  const href = pageUrl(o.path);
  const img = o.image ?? OG_IMAGE;
  const imgUrl = url(img.path);
  const crumbs = o.breadcrumbs && o.breadcrumbs.length > 0 ? o.breadcrumbs : null;

  const webPage: Node = {
    "@type": o.pageType ?? "WebPage",
    "@id": `${href}#webpage`,
    url: href,
    name: o.title,
    description: o.description,
    inLanguage: "fr-FR",
    isPartOf: websiteRef,
    primaryImageOfPage: { "@type": "ImageObject", url: imgUrl },
    ...(o.about ? { about: o.about } : {}),
    ...(o.mainEntity ? { mainEntity: o.mainEntity } : {}),
    ...(crumbs ? { breadcrumb: { "@id": `${href}#breadcrumb` } } : {}),
    ...(o.datePublished ? { datePublished: o.datePublished } : {}),
    ...(o.dateModified ? { dateModified: o.dateModified } : {}),
  };

  const graph: Node[] = [webPage];

  if (crumbs) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${href}#breadcrumb`,
      itemListElement: [{ name: "Accueil", path: "/" }, ...crumbs].map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: pageUrl(c.path),
      })),
    });
  }

  if (o.faq && o.faq.length > 0) graph.push(faqNode(o.path, o.faq));
  if (o.nodes) graph.push(...o.nodes);

  const ogTitle = o.ogTitle ?? o.title;
  const ogDescription = o.ogDescription ?? o.description;

  return {
    meta: [
      { title: o.title },
      { name: "description", content: o.description },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: ogDescription },
      { property: "og:url", content: href },
      { property: "og:type", content: o.ogType ?? "website" },
      { property: "og:image", content: imgUrl },
      ...(img.width ? [{ property: "og:image:width", content: String(img.width) }] : []),
      ...(img.height ? [{ property: "og:image:height", content: String(img.height) }] : []),
      { property: "og:image:alt", content: img.alt ?? ogTitle },
      { name: "twitter:title", content: ogTitle },
      { name: "twitter:description", content: ogDescription },
      { name: "twitter:image", content: imgUrl },
      ...(o.noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
      ...(o.extraMeta ?? []),
    ],
    links: [{ rel: "canonical", href }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      },
    ],
  };
}
