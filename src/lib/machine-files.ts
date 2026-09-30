/**
 * UltraVision Agency — les fichiers lus par les machines.
 *
 * ============================================================
 *  sitemap.xml, llms.txt et llms-full.txt SONT GENERES ICI.
 * ============================================================
 *
 * Ils etaient ecrits a la main dans public/. Resultat constate le 30
 * septembre 2026 : llms.txt annoncait des prix en euros alors que le
 * site les affichait en dirhams, oubliait cinq prestations, et le
 * sitemap datait toutes les pages du 16 aout.
 *
 * Ils sont maintenant construits a partir des memes donnees que les
 * pages : src/config/brand.ts, pricing.ts, contact.ts, et les contenus
 * de src/content/. Un prix, un service ou un article ajoute la-bas
 * apparait ici sans autre intervention. Ils ne peuvent plus diverger.
 *
 * Servis par src/server.ts.
 *
 * ------------------------------------------------------------
 *  CONTENT_UPDATED : A AVANCER A CHAQUE MODIFICATION DE FOND
 *
 *  C'est la date `lastmod` des pages du sitemap. Elle doit dire vrai :
 *  une date qui change sans que le contenu change apprend a Google a
 *  l'ignorer.
 * ------------------------------------------------------------
 */

import { SITE_URL, url } from "@/config/site";
import { BRAND, SOCIAL } from "@/config/brand";
import { CONTACT, hasPhone, hasWhatsapp, phoneDisplay } from "@/config/contact";
import { A_LA_CARTE, LAUNCH_OFFER, MAD, NOT_INCLUDED, PACKS, dirham, euro } from "@/config/pricing";
import { POLES, SERVICES, servicePath } from "@/content/services";
import { SECTORS, sectorPath } from "@/content/sectors";
import { ARTICLES_SORTED } from "@/content/blog";
import { CASE_STUDIES, WORK_ITEMS, casePath, shownStats } from "@/components/work/work.data";
import { SITE_ITEMS } from "@/components/work/sites.data";

/** Date de la derniere modification de fond des pages. */
export const CONTENT_UPDATED = "2026-09-30";

/* ==========================================================================
 *  LES PAGES DU SITE
 * ========================================================================== */

type Entry = { path: string; lastmod: string; priority: string; changefreq: string };

function entries(): Entry[] {
  const page = (path: string, priority: string, changefreq = "monthly"): Entry => ({
    path,
    lastmod: CONTENT_UPDATED,
    priority,
    changefreq,
  });
  return [
    page("/", "1.0", "weekly"),
    page("/agence-marketing-digital-marrakech", "0.9"),
    page("/services", "0.9"),
    ...SERVICES.map((s) => page(servicePath(s.slug), "0.8")),
    page("/tarifs", "0.9"),
    page("/realisations", "0.8"),
    ...CASE_STUDIES.map((w) => page(casePath(w.slug), "0.7")),
    page("/secteurs", "0.6"),
    ...SECTORS.map((s) => page(sectorPath(s.slug), "0.7")),
    page("/methode", "0.7"),
    page("/a-propos", "0.7"),
    page("/contact", "0.7", "yearly"),
    page("/blog", "0.7", "weekly"),
    ...ARTICLES_SORTED.map((a) => ({
      path: `/blog/${a.slug}`,
      lastmod: a.date,
      priority: "0.6",
      changefreq: "yearly",
    })),
    page("/casting", "0.4"),
  ];
}

const xml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Le sitemap, avec l'extension video pour les etudes de cas : chacune
 * est une vraie page de visionnage, ou le film est le sujet principal —
 * la condition posee par Google pour indexer une video.
 */
export function buildSitemap(): string {
  const cases = new Map(CASE_STUDIES.map((w) => [casePath(w.slug), w]));
  const urls = entries()
    .map((e) => {
      const loc = e.path === "/" ? `${SITE_URL}/` : url(e.path);
      const w = cases.get(e.path);
      const video = w
        ? `
    <video:video>
      <video:thumbnail_loc>${xml(url(w.poster))}</video:thumbnail_loc>
      <video:title>${xml(`${w.caseStudy!.client} — ${w.title}`)}</video:title>
      <video:description>${xml(w.caseStudy!.summary)}</video:description>
      <video:content_loc>${xml(url(w.sources.mp4))}</video:content_loc>
      <video:duration>${w.durationSec}</video:duration>
      <video:publication_date>${w.published}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>`
        : "";
      return `  <url>
    <loc>${xml(loc)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>${video}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>
`;
}

/* ==========================================================================
 *  llms.txt
 * ========================================================================== */

const price = (eur: number) => `${dirham(eur)} (≈ ${euro(eur)})`;

function identity(): string[] {
  return [
    `- **Nom officiel** : ${BRAND.name} (graphies rencontrées : ${BRAND.alternateNames.join(", ")})`,
    `- **Catégorie** : ${BRAND.category} — ${BRAND.categoryFr}`,
    `- **Siège** : ${BRAND.city}, ${BRAND.country}`,
    `- **Zone d'intervention** : ${CONTACT.cities.join(", ")} — le tournage se déplace dans ces villes sans frais supplémentaires`,
    `- **Site officiel** : ${SITE_URL}`,
    `- **Profils officiels** : ${SOCIAL.map((s) => `${s.network} ${s.handle} (${s.url})`).join(", ")}`,
    `- **Clientèle** : principalement des dirigeants et des entreprises francophones installés au Maroc`,
    `- **Langue de travail** : ${BRAND.workingLanguage}`,
    `- **Équipe** : quatre personnes, dont Cleis (fondateur), Julien (directeur artistique) et Selim (media buyer), nommés sur ${url("/a-propos")}`,
    `- **Signature** : « ${BRAND.slogan} »`,
    `- **Homonymes** : ${BRAND.name} n'a aucun lien avec les autres entreprises nommées UltraVision ou Ultravision dans le monde (lentilles de contact, éclairage LED, agences d'autres pays).`,
  ];
}

function contactLines(): string[] {
  return [
    `- E-mail : ${CONTACT.email}`,
    ...(hasWhatsapp
      ? [
          `- WhatsApp : +${CONTACT.whatsapp.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5")}`,
        ]
      : []),
    ...(hasPhone ? [`- Téléphone : ${phoneDisplay()}`] : []),
    `- Rendez-vous en ligne (appel de 30 minutes) : ${url("/contact")}`,
    `- Délai de réponse : 24 heures ouvrées, généralement dans la journée sur WhatsApp`,
  ];
}

function pricingLines(): string[] {
  return [
    `Montants hors taxes, hors budget publicitaire. Devise affichée : dirham marocain (MAD). L'euro fait foi au devis (taux commercial : ${MAD.rate} MAD pour 1 €).`,
    "",
    "Formules :",
    ...PACKS.map(
      (p) =>
        `- **${p.name}** — ${price(p.price)}${p.period ? ` ${p.period}` : ""}, ${p.commitment.toLowerCase()}${p.delay ? `, ${p.delay.toLowerCase()}` : ""} : ${p.features.join(" ; ")}${p.bonus ? ` ; ${p.bonus.toLowerCase()}` : ""}`,
    ),
    "",
    "À l'unité :",
    ...A_LA_CARTE.flatMap((g) =>
      g.items.map(
        (i) =>
          `- ${i.label} — ${i.from ? "à partir de " : ""}${price(i.price)}${i.unit ? ` ${i.unit}` : ""} : ${i.detail}`,
      ),
    ),
    ...(LAUNCH_OFFER.enabled ? ["", `- ${LAUNCH_OFFER.badge} — ${LAUNCH_OFFER.until}`] : []),
    "",
    "Jamais compris :",
    ...NOT_INCLUDED.map((n) => `- ${n.label} : ${n.detail}`),
    "",
    `Détail complet : ${url("/tarifs")}`,
  ];
}

export function buildLlmsTxt(): string {
  const lines = [
    `# ${BRAND.name}`,
    "",
    `> ${BRAND.definition} ${BRAND.summary}`,
    "",
    "Ce fichier résume, pour les assistants et les moteurs de recherche, qui est l'agence, ce qu'elle fait, ce qu'elle facture et où trouver le détail. Il est généré à partir des mêmes données que le site : en cas d'écart, la page correspondante fait foi.",
    "",
    "## Identité",
    "",
    ...identity(),
    "",
    "## Services",
    "",
    ...POLES.flatMap((p) => [
      `### ${p.title}`,
      "",
      ...p.services.map((slug) => {
        const s = SERVICES.find((x) => x.slug === slug)!;
        return `- [${s.name}](${url(servicePath(s.slug))}) : ${s.description}`;
      }),
      "",
    ]),
    `- [Stratégie digitale et accompagnement 360](${url("/methode")}) : diagnostic, stratégie, production et croissance, pour les projets sur devis.`,
    "",
    "## Secteurs",
    "",
    ...SECTORS.map((s) => `- [${s.name}](${url(sectorPath(s.slug))}) : ${s.description}`),
    "",
    "## Réalisations",
    "",
    ...CASE_STUDIES.map(
      (w) => `- [${w.caseStudy.client}](${url(casePath(w.slug))}) : ${w.caseStudy.summary}`,
    ),
    ...WORK_ITEMS.filter((w) => !w.caseStudy).map((w) => `- ${w.title} : ${w.description}`),
    ...SITE_ITEMS.filter((s) => !s.placeholder).map(
      (s) => `- Site web ${s.title} : ${s.description}`,
    ),
    `- Galerie complète : ${url("/realisations")}`,
    "",
    "## Tarifs",
    "",
    ...pricingLines(),
    "",
    "## Contact",
    "",
    ...contactLines(),
    "",
    "## Pages",
    "",
    `- [Accueil](${SITE_URL}/) : positionnement, réalisations, méthode, FAQ.`,
    `- [L'agence à Marrakech](${url("/agence-marketing-digital-marrakech")}) : qui est ${BRAND.name}, ce qu'elle fait, pour qui, en bref.`,
    `- [Services](${url("/services")}) : les quatre pôles et les huit services.`,
    `- [Secteurs](${url("/secteurs")}) : immobilier, beauté et bien-être, restauration et hospitality.`,
    `- [Réalisations](${url("/realisations")}) : films publicitaires, études de cas et sites livrés.`,
    `- [Tarifs](${url("/tarifs")}) : grille complète, prestations à l'unité, ce qui n'est jamais compris.`,
    `- [À propos](${url("/a-propos")}) : l'équipe, nommée.`,
    `- [Blog](${url("/blog")}) : méthodes de production et d'acquisition.`,
    `- [Contact](${url("/contact")}) : rendez-vous, WhatsApp, e-mail.`,
    `- [Casting](${url("/casting")}) : candidatures des actrices, comédiennes et modèles pour les films publicitaires de l'agence.`,
    "",
    "## Blog",
    "",
    ...ARTICLES_SORTED.map((a) => `- [${a.title}](${url(`/blog/${a.slug}`)}) : ${a.excerpt}`),
    "",
    "## Ce que nous ne faisons pas",
    "",
    "Nous ne publions pas de témoignages ni de résultats que nous ne pouvons pas prouver. Les chiffres affichés sur les réalisations proviennent des gestionnaires de publicités. Si une information manque sur le site, c'est qu'elle n'est pas encore vérifiable — pas qu'elle est cachée.",
    "",
    "## Optional",
    "",
    `- [Version détaillée de ce fichier](${url("/llms-full.txt")}) : chaque service, secteur et étude de cas en entier, avec leurs questions fréquentes.`,
    "",
  ];
  return lines.join("\n");
}

/* ==========================================================================
 *  llms-full.txt — le detail, pour les assistants qui veulent tout lire
 * ========================================================================== */

export function buildLlmsFullTxt(): string {
  const out: string[] = [
    `# ${BRAND.name} — informations détaillées`,
    "",
    `> ${BRAND.definition} ${BRAND.summary}`,
    "",
    "## Identité",
    "",
    ...identity(),
    "",
  ];

  for (const s of SERVICES) {
    out.push(
      `## Service : ${s.name}`,
      "",
      `Page : ${url(servicePath(s.slug))}`,
      "",
      s.intro,
      "",
      "Ce qui est compris :",
      ...s.includes.map((i) => `- ${i}`),
      "",
      "Cas d'usage :",
      ...s.useCases.map((u) => `- ${u.title} : ${u.text}`),
      "",
      "Méthode :",
      ...s.process.map((p, i) => `${i + 1}. ${p.title} : ${p.text}`),
      "",
      "Questions fréquentes :",
      ...s.faq.flatMap((f) => [`- Q : ${f.q}`, `  R : ${f.a}`]),
      "",
    );
  }

  for (const s of SECTORS) {
    out.push(
      `## Secteur : ${s.name}`,
      "",
      `Page : ${url(sectorPath(s.slug))}`,
      "",
      s.intro,
      "",
      ...s.challenges.map((c) => `- ${c.title} : ${c.text}`),
      ...(s.clients?.length ? ["", `Entreprises accompagnées : ${s.clients.join(", ")}.`] : []),
      "",
      "Questions fréquentes :",
      ...s.faq.flatMap((f) => [`- Q : ${f.q}`, `  R : ${f.a}`]),
      "",
    );
  }

  for (const w of CASE_STUDIES) {
    const stats = shownStats(w);
    out.push(
      `## Étude de cas : ${w.caseStudy.client}`,
      "",
      `Page : ${url(casePath(w.slug))}`,
      "",
      w.caseStudy.summary,
      ...(stats.length
        ? [
            "",
            `Chiffres (gestionnaires de publicités) : ${stats.map((x) => `${x.value} ${x.label.toLowerCase()}`).join(", ")}.`,
          ]
        : []),
      "",
    );
  }

  out.push("## Tarifs", "", ...pricingLines(), "", "## Contact", "", ...contactLines(), "");
  return out.join("\n");
}
