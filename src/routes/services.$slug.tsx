import { createFileRoute, notFound } from "@tanstack/react-router";
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
import { findWork, casePath, type CaseItem, type WorkItem } from "@/components/work/work.data";
import { SITE_ITEMS } from "@/components/work/sites.data";
import { withBrand } from "@/config/brand";
import { findService, resolvePrice, servicePath } from "@/content/services";
import { findSector, sectorPath } from "@/content/sectors";
import { findArticle } from "@/content/blog";
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
 */

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    if (!findService(params.slug)) throw notFound();
    /* Seul l'identifiant voyage vers le navigateur : le contenu est deja
       dans le code, inutile de le serialiser une seconde fois dans la page. */
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const s = findService(loaderData?.slug);
    if (!s) return {};
    return pageHead({
      path: servicePath(s.slug),
      title: withBrand(s.title),
      description: s.description,
      breadcrumbs: [
        { name: "Services", path: "/services" },
        { name: s.name, path: servicePath(s.slug) },
      ],
      about: { "@id": serviceId(s.slug) },
      faq: s.faq,
      nodes: [serviceNode(s)],
    });
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const s = findService(slug)!;

  const works = (s.works ?? []).map(findWork).filter((w): w is WorkItem => !!w);
  const sites = SITE_ITEMS.filter((x) => s.sites?.includes(x.slug));
  const prices = s.prices.map(resolvePrice).filter((p) => p !== null);
  /* Les etudes de cas des films, puis celles des sites (meme page /realisations/<slug>). */
  const cases = [...works, ...sites].filter(
    (x): x is CaseItem => !!x.caseStudy && !("placeholder" in x && x.placeholder),
  );

  const next = [
    ...cases.map((w) => ({
      to: casePath(w.slug),
      eyebrow: "Étude de cas",
      title: w.caseStudy.client,
      text: w.caseStudy.headline,
    })),
    ...s.related.map((r) => {
      const o = findService(r)!;
      return { to: servicePath(o.slug), eyebrow: "Service", title: o.name, text: o.description };
    }),
    ...(s.sectors ?? []).map((k) => {
      const o = findSector(k)!;
      return { to: sectorPath(o.slug), eyebrow: "Secteur", title: o.name, text: o.description };
    }),
    ...(s.articles ?? [])
      .map((a) => findArticle(a))
      .filter((a) => !!a)
      .map((a) => ({
        to: `/blog/${a!.slug}`,
        eyebrow: "Article",
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
          { name: "Services", path: "/services" },
          { name: s.name, path: servicePath(s.slug) },
        ]}
      />

      {/* 2. Ce qui est compris */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionIntro
            eyebrow="Le service"
            title="Ce qui est compris."
            text="Tout est réalisé par la même équipe : celle qui écrit, tourne, diffuse et mesure. Pas de sous-traitance, un interlocuteur unique."
          />
          <BulletPanel title={s.name} items={s.includes} />
        </div>
      </Section>

      {/* 3. Pour qui */}
      <Section surface>
        <SectionIntro eyebrow="Pour qui" title="Dans quels cas nous le mettons en place." />
        <CardGrid items={s.useCases} />
      </Section>

      {/* 4. Comment */}
      <Section>
        <SectionIntro
          eyebrow="Méthode"
          title="Comment nous travaillons."
          text="Des étapes courtes, validées avec vous : vous savez à tout moment ce qui a été livré et ce qui arrive ensuite."
        />
        <Steps steps={s.process} />
      </Section>

      {/* 5. Combien */}
      {prices.length > 0 && (
        <Section surface>
          <SectionIntro
            eyebrow="Tarifs"
            title="Ce que ça coûte."
            text="Nos prix sont publics, prestation par prestation. Le budget publicitaire, versé directement aux plateformes, n'est jamais compris."
          />
          <PriceRows rows={prices} />
        </Section>
      )}

      {/* 6. Les preuves */}
      {(works.length > 0 || sites.length > 0) && (
        <Section>
          <SectionIntro
            eyebrow="Réalisations"
            title={
              works.length > 0
                ? "Des films que nous avons produits."
                : "Des sites que nous avons livrés."
            }
            text="Tout est produit en interne. Les chiffres affichés sont ceux relevés dans les gestionnaires de publicités."
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
            <ArrowLink to="/realisations">Toutes les réalisations</ArrowLink>
          </div>
        </Section>
      )}

      {/* 7. Et ensuite */}
      {next.length > 0 && (
        <Section surface>
          <SectionIntro eyebrow="Aller plus loin" title="Ce qui va souvent avec." />
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
