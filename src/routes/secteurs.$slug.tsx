import { createFileRoute, notFound } from "@tanstack/react-router";
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
import { casePath, findWork, type CaseItem, type WorkItem } from "@/components/work/work.data";
import { SITE_ITEMS } from "@/components/work/sites.data";
import { withBrand } from "@/config/brand";
import { findService, servicePath } from "@/content/services";
import { findSector, sectorPath } from "@/content/sectors";
import { pageHead } from "@/lib/seo";

/**
 * UltraVision Agency — la page d'un secteur.
 *
 * Tout le contenu vient de src/content/sectors.ts. La page n'existe que
 * pour les secteurs qui ont des realisations a montrer : c'est la preuve
 * qui justifie la page, pas le mot-cle.
 */

export const Route = createFileRoute("/secteurs/$slug")({
  loader: ({ params }) => {
    if (!findSector(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const s = findSector(loaderData?.slug);
    if (!s) return {};
    return pageHead({
      path: sectorPath(s.slug),
      title: withBrand(s.title),
      description: s.description,
      breadcrumbs: [
        { name: "Secteurs", path: "/secteurs" },
        { name: s.name, path: sectorPath(s.slug) },
      ],
      faq: s.faq,
    });
  },
  component: SectorPage,
});

function SectorPage() {
  const { slug } = Route.useLoaderData();
  const s = findSector(slug)!;

  const works = (s.works ?? []).map(findWork).filter((w): w is WorkItem => !!w);
  const sites = SITE_ITEMS.filter((x) => s.sites?.includes(x.slug));
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
          { name: "Secteurs", path: "/secteurs" },
          { name: s.name, path: sectorPath(s.slug) },
        ]}
      />

      <Section>
        <SectionIntro eyebrow="Ce qui fait vendre" title="Ce qui compte, dans ce métier." />
        <CardGrid items={s.challenges} />
      </Section>

      <Section surface>
        <SectionIntro
          eyebrow="Nos services"
          title="Ce que nous faisons pour ce secteur."
          text="Chaque service a sa page : ce qui est compris, comment nous travaillons, et le prix."
        />
        <LinkCards
          items={s.services.map((k) => {
            const o = findService(k)!;
            return {
              to: servicePath(o.slug),
              eyebrow: "Service",
              title: o.name,
              text: o.description,
            };
          })}
        />
      </Section>

      {(works.length > 0 || sites.length > 0) && (
        <Section>
          <SectionIntro
            eyebrow="Réalisations"
            title="Ce que nous avons produit dans ce secteur."
            text="Tout est tourné et monté en interne. Les chiffres affichés sont ceux relevés dans les gestionnaires de publicités."
          />
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
                Entreprises accompagnées dans ce secteur :{" "}
                <span className="text-foreground">{s.clients.join(", ")}</span>.
              </p>
            </Reveal>
          )}
          <div className="mt-10">
            <ArrowLink to="/realisations">Toutes les réalisations</ArrowLink>
          </div>
        </Section>
      )}

      {cases.length > 0 && (
        <Section surface>
          <SectionIntro eyebrow="Études de cas" title="Le détail de quelques projets." />
          <LinkCards
            items={cases.map((w) => ({
              to: casePath(w.slug),
              eyebrow: "Étude de cas",
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
