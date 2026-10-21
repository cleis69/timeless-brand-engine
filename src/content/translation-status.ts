import { SERVICES, POLES } from "@/content/services";
import { SECTORS } from "@/content/sectors";
import { ARTICLES } from "@/content/blog";
import { BLOG_SLUGS_EN } from "@/content/blog.slugs.en";
import { LANDINGS } from "@/content/landings";
import { WORK_ITEMS } from "@/components/work/work.data";
import { SITE_ITEMS } from "@/components/work/sites.data";
import { A_LA_CARTE, NOT_INCLUDED, PACKS } from "@/config/pricing";
import { POLES_EN, SERVICES_EN } from "@/content/en/services";
import { SECTORS_EN } from "@/content/en/sectors";
import { ARTICLES_EN } from "@/content/en/blog";
import { SITES_EN, STAT_LABELS_EN, WORKS_EN } from "@/content/en/work";
import { CARTE_EN, CARTE_GROUPS_EN, NOT_INCLUDED_EN, PACKS_EN } from "@/content/en/pricing";

/**
 * UltraVision Agency — ce qui n'est pas encore traduit.
 *
 * ============================================================
 *  LE SITE EST BILINGUE : TOUT CONTENU AJOUTE EN FRANCAIS DOIT
 *  AVOIR SA VERSION ANGLAISE AVANT D'ETRE MIS EN LIGNE.
 * ============================================================
 *
 * Sans traduction, un contenu retombe sur le francais dans la page
 * anglaise (service, secteur, realisation, tarif), ou n'a tout
 * simplement pas de page anglaise (article). Les deux passent
 * inapercus. Cette liste les rend visibles : `npm run deploy` l'execute
 * (scripts/check-translations.mjs) et refuse de mettre le site en ligne
 * tant qu'elle n'est pas vide.
 *
 * OU TRADUIRE
 *   article        src/content/en/blog-*.ts  + son adresse dans blog.slugs.en.ts
 *   service, pole  src/content/en/services.ts
 *   secteur        src/content/en/sectors.ts
 *   film, site     src/content/en/work.ts (et STAT_LABELS_EN pour un nouveau libelle)
 *   tarif          src/content/en/pricing.ts
 *   page d'offre   nameEn / textEn dans src/content/landings.ts
 *   nouvelle page  src/pages/<Page>.tsx (texte fr + en), route EN dans
 *                  src/routes/en/, adresse dans PAGES (src/lib/locale.ts)
 */
export function missingTranslations(): string[] {
  const out: string[] = [];
  const miss = (what: string, ok: unknown) => {
    if (!ok) out.push(what);
  };

  for (const a of ARTICLES) {
    miss(`article « ${a.slug} » (src/content/en/blog-*.ts)`, ARTICLES_EN[a.slug]);
    miss(`adresse anglaise de l'article « ${a.slug} » (blog.slugs.en.ts)`, BLOG_SLUGS_EN[a.slug]);
  }
  for (const s of SERVICES)
    miss(`service « ${s.slug} » (en/services.ts)`, SERVICES_EN[s.slug]?.intro);
  for (const p of POLES) miss(`pôle « ${p.id} » (en/services.ts)`, POLES_EN[p.id]);
  for (const s of SECTORS) miss(`secteur « ${s.slug} » (en/sectors.ts)`, SECTORS_EN[s.slug]?.intro);

  for (const w of WORK_ITEMS) {
    miss(`film « ${w.slug} » (en/work.ts)`, WORKS_EN[w.slug]?.description);
    if (w.caseStudy)
      miss(`étude de cas « ${w.slug} » (en/work.ts)`, WORKS_EN[w.slug]?.caseStudy?.summary);
    for (const s of [...w.stats, ...w.demoStats]) {
      miss(`libellé de chiffre « ${s.label} » (STAT_LABELS_EN)`, STAT_LABELS_EN[s.label]);
    }
  }
  for (const s of SITE_ITEMS.filter((x) => !x.placeholder)) {
    miss(`site « ${s.slug} » (en/work.ts)`, SITES_EN[s.slug]?.description);
    if (s.caseStudy)
      miss(`étude de cas « ${s.slug} » (en/work.ts)`, SITES_EN[s.slug]?.caseStudy?.summary);
  }

  for (const p of PACKS) miss(`formule « ${p.id} » (en/pricing.ts)`, PACKS_EN[p.id]?.features);
  for (const g of A_LA_CARTE) {
    miss(`groupe de prestations « ${g.group} » (CARTE_GROUPS_EN)`, CARTE_GROUPS_EN[g.group]);
    for (const i of g.items) miss(`prestation « ${i.label} » (CARTE_EN)`, CARTE_EN[i.label]);
  }
  miss(
    "« ce qui n'est jamais compris » (NOT_INCLUDED_EN, même nombre de lignes)",
    NOT_INCLUDED_EN.length === NOT_INCLUDED.length,
  );

  for (const l of LANDINGS)
    miss(`page d'offre « ${l.path} » (nameEn / textEn dans landings.ts)`, l.nameEn && l.textEn);

  return [...new Set(out)];
}
