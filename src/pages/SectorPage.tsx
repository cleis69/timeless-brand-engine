import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/FinalCTA";
import { Reveal } from "@/components/Reveal";
import {
  ArrowLink,
  CardGrid,
  FaqList,
  LinkCards,
  Section,
  SectionIntro,
} from "@/components/page/Blocks";
import { WorkGrid } from "@/components/work/WorkGrid";
import { SiteGrid } from "@/components/work/SiteGrid";
import { casePath, type CaseItem, type WorkItem } from "@/components/work/work.data";
import { withBrand } from "@/config/brand";
import { servicePath } from "@/content/services";
import { sectorPath } from "@/content/sectors";
import { landingsForSector } from "@/content/landings";
import { findSectorFor, findServiceFor, findWorkFor, siteItemsFor } from "@/content/localized";
import { localePath, useLocale, type Locale } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";

/**
 * UltraVision Agency — la page d'un secteur.
 *
 * Tout le contenu vient de src/content/sectors.ts. La page n'existe que
 * pour les secteurs qui ont des realisations a montrer : c'est la preuve
 * qui justifie la page, pas le mot-cle.
 *
 * Deux langues, un seul gabarit : /secteurs/$slug et /en/industries/$slug.
 * Les libelles fixes viennent de `UI`, le contenu de localized.ts.
 */

const UI = {
  fr: {
    crumb: "Secteurs",
    offer: "Offre",
    service: "Service",
    caseStudy: "Étude de cas",
    challengesEyebrow: "Ce qui fait vendre",
    challengesTitle: "Ce qui compte, dans ce métier.",
    servicesEyebrow: "Nos services",
    servicesTitle: "Ce que nous faisons pour ce secteur.",
    servicesText:
      "Chaque service a sa page : ce qui est compris, comment nous travaillons, et le prix.",
    workEyebrow: "Réalisations",
    workTitle: "Ce que nous avons produit dans ce secteur.",
    workText:
      "Tout est tourné et monté en interne. Les chiffres affichés sont ceux relevés dans les gestionnaires de publicités.",
    clients: "Entreprises accompagnées dans ce secteur :",
    allWork: "Toutes les réalisations",
    casesEyebrow: "Études de cas",
    casesTitle: "Le détail de quelques projets.",
  },
  en: {
    crumb: "Industries",
    offer: "Offer",
    service: "Service",
    caseStudy: "Case study",
    challengesEyebrow: "What sells",
    challengesTitle: "What matters in this trade.",
    servicesEyebrow: "Our services",
    servicesTitle: "What we do for this industry.",
    servicesText: "Each service has its own page: what's included, how we work, and the price.",
    workEyebrow: "Our work",
    workTitle: "What we have produced in this industry.",
    workText:
      "Everything is shot and edited in-house. The figures shown are those recorded in the ad managers.",
    clients: "Businesses we have worked with in this industry:",
    allWork: "All our work",
    casesEyebrow: "Case studies",
    casesTitle: "A closer look at some projects.",
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

/** Les balises de la page d'un secteur, dans la langue demandee. */
export function sectorHead(slug: string | undefined, locale: Locale) {
  const s = findSectorFor(slug, locale);
  if (!s) return {};
  return pageHead({
    locale,
    path: sectorPath(s.slug),
    title: withBrand(s.title),
    description: s.description,
    breadcrumbs: [
      { name: UI[locale].crumb, path: "/secteurs" },
      { name: s.name, path: sectorPath(s.slug) },
    ],
    faq: s.faq,
  });
}

export function SectorPage({ slug }: { slug: string }) {
  const locale = useLocale();
  const lp = (p: string) => localePath(p, locale);
  const t = UI[locale];
  const s = findSectorFor(slug, locale)!;

  const works = (s.works ?? [])
    .map((k) => findWorkFor(k, locale))
    .filter((w): w is WorkItem => !!w);
  const sites = siteItemsFor(locale).filter((x) => s.sites?.includes(x.slug));
  /* Les etudes de cas des films, puis celles des sites (meme page /realisations/<slug>). */
  const cases = [...works, ...sites].filter(
    (x): x is CaseItem => !!x.caseStudy && !("placeholder" in x && x.placeholder),
  );

  return (
    <>
      <PageHero
        eyebrow={s.eyebrow}
        title={s.h1}
        accent={s.accent}
        intro={s.intro}
        breadcrumbs={[
          { name: t.crumb, path: lp("/secteurs") },
          { name: s.name, path: lp(sectorPath(s.slug)) },
        ]}
      />

      <Section>
        <SectionIntro eyebrow={t.challengesEyebrow} title={t.challengesTitle} />
        <CardGrid items={s.challenges} />
      </Section>

      <Section surface>
        <SectionIntro eyebrow={t.servicesEyebrow} title={t.servicesTitle} text={t.servicesText} />
        <LinkCards
          items={[
            ...landingsForSector(s.slug).map((l) => ({
              to: lp(l.path),
              eyebrow: t.offer,
              title: landingIn(l, locale).name,
              text: landingIn(l, locale).text,
            })),
            ...s.services.map((k) => {
              const o = findServiceFor(k, locale)!;
              return {
                to: lp(servicePath(o.slug)),
                eyebrow: t.service,
                title: o.name,
                text: o.description,
              };
            }),
          ]}
        />
      </Section>

      {(works.length > 0 || sites.length > 0) && (
        <Section>
          <SectionIntro eyebrow={t.workEyebrow} title={t.workTitle} text={t.workText} />
          {works.length > 1 && (
            <div className="mt-10">
              <WorkGrid items={works} />
            </div>
          )}
          {sites.length > 0 && (
            <div className="mt-10">
              <SiteGrid items={sites} />
            </div>
          )}
          {s.clients && s.clients.length > 0 && (
            <Reveal>
              <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
                {t.clients} <span className="text-foreground">{s.clients.join(", ")}</span>.
              </p>
            </Reveal>
          )}
          <div className="mt-10">
            <ArrowLink to={lp("/realisations")}>{t.allWork}</ArrowLink>
          </div>
        </Section>
      )}

      {cases.length > 0 && (
        <Section surface>
          <SectionIntro eyebrow={t.casesEyebrow} title={t.casesTitle} />
          <LinkCards
            items={cases.map((w) => ({
              to: lp(casePath(w.slug)),
              eyebrow: t.caseStudy,
              title: w.caseStudy.client,
              text: w.caseStudy.headline,
            }))}
          />
        </Section>
      )}

      <Section>
        <FaqList faq={s.faq} />
      </Section>

      <FinalCTA />
    </>
  );
}
