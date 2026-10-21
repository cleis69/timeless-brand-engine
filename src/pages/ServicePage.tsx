import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/FinalCTA";
import {
  ArrowLink,
  BulletPanel,
  CardGrid,
  FaqList,
  LinkCards,
  PriceRows,
  Section,
  SectionIntro,
  Steps,
} from "@/components/page/Blocks";
import { WorkGrid } from "@/components/work/WorkGrid";
import { SiteGrid } from "@/components/work/SiteGrid";
import { casePath, type CaseItem, type WorkItem } from "@/components/work/work.data";
import { withBrand } from "@/config/brand";
import { url } from "@/config/site";
import { servicePath } from "@/content/services";
import { sectorPath } from "@/content/sectors";
import { landingsForService } from "@/content/landings";
import {
  findArticleFor,
  findSectorFor,
  findServiceFor,
  findWorkFor,
  resolvePriceFor,
  siteItemsFor,
} from "@/content/localized";
import { localePath, useLocale, type Locale } from "@/lib/i18n";
import { pageHead, serviceId, serviceNode } from "@/lib/seo";

/**
 * UltraVision Agency — la page d'un service.
 *
 * ============================================================
 *  UN SEUL GABARIT, HUIT PAGES
 * ============================================================
 *
 * Tout le contenu vient de src/content/services.ts. Cette page ne
 * contient aucun texte propre a un service : elle l'ordonne, dans un
 * ordre pense pour repondre aux questions d'un prospect dans l'ordre
 * ou il se les pose.
 *
 *   1. Qu'est-ce que c'est ?        l'en-tete et sa definition
 *   2. Qu'est-ce qui est compris ?  la liste
 *   3. Est-ce pour moi ?            les cas d'usage
 *   4. Comment ca se passe ?        les etapes
 *   5. Combien ca coute ?           les prix, lus dans pricing.ts
 *   6. Vous l'avez deja fait ?      les realisations reelles
 *   7. Et ensuite ?                 services lies, secteurs, articles
 *   8. Et si... ?                   la FAQ
 *
 * Les sections sans contenu ne s'affichent pas : un service sans
 * realisation video n'affiche pas de galerie vide.
 *
 * DEUX LANGUES, UN SEUL GABARIT : les libelles fixes viennent de `UI`,
 * le contenu de src/content/localized.ts (le francais si la traduction
 * manque). Routes : /services/$slug et /en/services/$slug.
 */

const UI = {
  fr: {
    crumb: "Services",
    offer: "Offre",
    caseStudy: "Étude de cas",
    service: "Service",
    sector: "Secteur",
    article: "Article",
    includedEyebrow: "Le service",
    includedTitle: "Ce qui est compris.",
    includedText:
      "Tout est réalisé par la même équipe : celle qui écrit, tourne, diffuse et mesure. Pas de sous-traitance, un interlocuteur unique.",
    forWhoEyebrow: "Pour qui",
    forWhoTitle: "Dans quels cas nous le mettons en place.",
    howEyebrow: "Méthode",
    howTitle: "Comment nous travaillons.",
    howText:
      "Des étapes courtes, validées avec vous : vous savez à tout moment ce qui a été livré et ce qui arrive ensuite.",
    pricesEyebrow: "Tarifs",
    pricesTitle: "Ce que ça coûte.",
    pricesText:
      "Nos prix sont publics, prestation par prestation. Le budget publicitaire, versé directement aux plateformes, n'est jamais compris.",
    workEyebrow: "Réalisations",
    workFilms: "Des films que nous avons produits.",
    workSites: "Des sites que nous avons livrés.",
    workText:
      "Tout est produit en interne. Les chiffres affichés sont ceux relevés dans les gestionnaires de publicités.",
    allWork: "Toutes les réalisations",
    nextEyebrow: "Aller plus loin",
    nextTitle: "Ce qui va souvent avec.",
  },
  en: {
    crumb: "Services",
    offer: "Offer",
    caseStudy: "Case study",
    service: "Service",
    sector: "Industry",
    article: "Article",
    includedEyebrow: "The service",
    includedTitle: "What's included.",
    includedText:
      "Everything is done by the same team: the one that writes, shoots, runs and measures. No outsourcing, a single point of contact.",
    forWhoEyebrow: "Who it's for",
    forWhoTitle: "When we put it in place.",
    howEyebrow: "Method",
    howTitle: "How we work.",
    howText:
      "Short steps, signed off with you: at any moment you know what has been delivered and what comes next.",
    pricesEyebrow: "Pricing",
    pricesTitle: "What it costs.",
    pricesText:
      "Our prices are public, service by service. Ad spend, paid directly to the platforms, is never included.",
    workEyebrow: "Our work",
    workFilms: "Films we have produced.",
    workSites: "Websites we have delivered.",
    workText:
      "Everything is produced in-house. The figures shown are those recorded in the ad managers.",
    allWork: "All our work",
    nextEyebrow: "Go further",
    nextTitle: "What often goes with it.",
  },
} satisfies Record<Locale, Record<string, string>>;

/** Nom et texte d'une page d'offre dans la langue (champs anglais s'ils existent). */
const landingIn = (
  l: { path: string; name: string; text: string; nameEn?: string; textEn?: string },
  locale: Locale,
) =>
  locale === "en"
    ? { name: l.nameEn ?? l.name, text: l.textEn ?? l.text }
    : { name: l.name, text: l.text };

/** Les balises de la page d'un service, dans la langue demandee. */
export function serviceHead(slug: string | undefined, locale: Locale) {
  const s = findServiceFor(slug, locale);
  if (!s) return {};
  const t = UI[locale];
  const node = serviceNode(s);
  return pageHead({
    locale,
    path: servicePath(s.slug),
    title: withBrand(s.title),
    description: s.description,
    breadcrumbs: [
      { name: t.crumb, path: "/services" },
      { name: s.name, path: servicePath(s.slug) },
    ],
    about: { "@id": serviceId(s.slug) },
    faq: s.faq,
    /* Meme @id dans les deux langues : c'est la meme entite. */
    nodes: [
      locale === "en"
        ? {
            ...node,
            url: url(localePath(servicePath(s.slug), locale)),
            availableLanguage: ["French", "English"],
          }
        : node,
    ],
  });
}

export function ServicePage({ slug }: { slug: string }) {
  const locale = useLocale();
  const lp = (p: string) => localePath(p, locale);
  const t = UI[locale];
  const s = findServiceFor(slug, locale)!;

  const works = (s.works ?? [])
    .map((k) => findWorkFor(k, locale))
    .filter((w): w is WorkItem => !!w);
  const sites = siteItemsFor(locale).filter((x) => s.sites?.includes(x.slug));
  const prices = s.prices.map((r) => resolvePriceFor(r, locale)).filter((p) => p !== null);
  /* Les etudes de cas des films, puis celles des sites (meme page /realisations/<slug>). */
  const cases = [...works, ...sites].filter(
    (x): x is CaseItem => !!x.caseStudy && !("placeholder" in x && x.placeholder),
  );

  const next = [
    ...landingsForService(s.slug).map((l) => ({
      to: lp(l.path),
      eyebrow: t.offer,
      title: landingIn(l, locale).name,
      text: landingIn(l, locale).text,
    })),
    ...cases.map((w) => ({
      to: lp(casePath(w.slug)),
      eyebrow: t.caseStudy,
      title: w.caseStudy.client,
      text: w.caseStudy.headline,
    })),
    ...s.related.map((r) => {
      const o = findServiceFor(r, locale)!;
      return {
        to: lp(servicePath(o.slug)),
        eyebrow: t.service,
        title: o.name,
        text: o.description,
      };
    }),
    ...(s.sectors ?? []).map((k) => {
      const o = findSectorFor(k, locale)!;
      return { to: lp(sectorPath(o.slug)), eyebrow: t.sector, title: o.name, text: o.description };
    }),
    /* En anglais, un article non traduit n'existe pas : il disparait de la liste. */
    ...(s.articles ?? [])
      .map((a) => findArticleFor(a, locale))
      .filter((a) => !!a)
      .map((a) => ({
        to: lp(`/blog/${a!.slug}`),
        eyebrow: t.article,
        title: a!.title,
        text: a!.excerpt,
      })),
  ];

  return (
    <>
      <PageHero
        eyebrow={s.eyebrow}
        title={s.h1}
        accent={s.accent}
        intro={s.intro}
        breadcrumbs={[
          { name: t.crumb, path: lp("/services") },
          { name: s.name, path: lp(servicePath(s.slug)) },
        ]}
      />

      {/* 2. Ce qui est compris */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionIntro eyebrow={t.includedEyebrow} title={t.includedTitle} text={t.includedText} />
          <BulletPanel title={s.name} items={s.includes} />
        </div>
      </Section>

      {/* 3. Pour qui */}
      <Section surface>
        <SectionIntro eyebrow={t.forWhoEyebrow} title={t.forWhoTitle} />
        <CardGrid items={s.useCases} />
      </Section>

      {/* 4. Comment */}
      <Section>
        <SectionIntro eyebrow={t.howEyebrow} title={t.howTitle} text={t.howText} />
        <Steps steps={s.process} />
      </Section>

      {/* 5. Combien */}
      {prices.length > 0 && (
        <Section surface>
          <SectionIntro eyebrow={t.pricesEyebrow} title={t.pricesTitle} text={t.pricesText} />
          <PriceRows rows={prices} />
        </Section>
      )}

      {/* 6. Les preuves */}
      {(works.length > 0 || sites.length > 0) && (
        <Section>
          <SectionIntro
            eyebrow={t.workEyebrow}
            title={works.length > 0 ? t.workFilms : t.workSites}
            text={t.workText}
          />
          {works.length > 0 && (
            <div className="mt-10">
              <WorkGrid items={works} />
            </div>
          )}
          {sites.length > 0 && (
            <div className="mt-10">
              <SiteGrid items={sites} />
            </div>
          )}
          <div className="mt-10">
            <ArrowLink to={lp("/realisations")}>{t.allWork}</ArrowLink>
          </div>
        </Section>
      )}

      {/* 7. Et ensuite */}
      {next.length > 0 && (
        <Section surface>
          <SectionIntro eyebrow={t.nextEyebrow} title={t.nextTitle} />
          <LinkCards items={next} />
        </Section>
      )}

      {/* 8. FAQ */}
      <Section>
        <FaqList faq={s.faq} />
      </Section>

      <FinalCTA />
    </>
  );
}
