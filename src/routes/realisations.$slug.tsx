import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/FinalCTA";
import { Reveal } from "@/components/Reveal";
import { FactList, LinkCards, Section, SectionIntro } from "@/components/page/Blocks";
import { VideoPlayer } from "@/components/work/VideoPlayer";
import { WorkStats } from "@/components/work/WorkStats";
import { CASE_STUDIES, casePath, findWork, shownStats } from "@/components/work/work.data";
import { withBrand } from "@/config/brand";
import { findService, servicePath } from "@/content/services";
import { findSector, sectorPath } from "@/content/sectors";
import { pageHead, pageUrl, videoNode } from "@/lib/seo";

/**
 * UltraVision Agency — une etude de cas.
 *
 * ============================================================
 *  RIEN N'EST ECRIT ICI QUI NE SOIT DANS work.data.ts.
 * ============================================================
 *
 * La structure complete d'une etude de cas est prevue — objectif,
 * probleme, strategie, execution, outils — mais chaque bloc n'apparait
 * que si le champ correspondant est rempli dans `caseStudy`. Aujourd'hui,
 * seuls les faits deja publies sur le site le sont : client, secteur,
 * prestations, format, et les chiffres releves dans les gestionnaires de
 * publicites quand ils existent.
 *
 * Completer une etude de cas se fait donc dans work.data.ts, avec le
 * client, jamais de memoire.
 */

export const Route = createFileRoute("/realisations/$slug")({
  loader: ({ params }) => {
    const w = findWork(params.slug);
    if (!w || !w.caseStudy) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const w = findWork(loaderData?.slug);
    if (!w?.caseStudy) return {};
    const c = w.caseStudy;
    const path = casePath(w.slug);
    return pageHead({
      path,
      title: withBrand(c.seoTitle),
      description: c.seoDescription,
      image: { path: w.poster, alt: `${c.client} — ${w.title}` },
      breadcrumbs: [
        { name: "Réalisations", path: "/realisations" },
        { name: c.client, path },
      ],
      mainEntity: { "@id": `${pageUrl(path)}#video-${w.slug}` },
      nodes: [videoNode(w, path)],
    });
  },
  component: CasePage,
});

function CasePage() {
  const { slug } = Route.useLoaderData();
  const w = findWork(slug)!;
  const c = w.caseStudy!;
  const sector = findSector(c.sector);
  const hasStats = shownStats(w).length > 0;

  const facts = [
    { label: "Client", value: c.client },
    ...(sector
      ? [
          {
            label: "Secteur",
            value: (
              <Link to={sectorPath(sector.slug)} className="link-underline">
                {sector.name}
              </Link>
            ),
          },
        ]
      : []),
    ...(c.location ? [{ label: "Lieu", value: c.location }] : []),
    {
      label: "Prestations",
      value: (
        <span className="flex flex-col gap-1">
          {c.services.map((k) => {
            const s = findService(k)!;
            return (
              <Link key={k} to={servicePath(s.slug)} className="link-underline">
                {s.name}
              </Link>
            );
          })}
        </span>
      ),
    },
    ...(c.platforms?.length ? [{ label: "Plateformes", value: c.platforms.join(", ") }] : []),
    { label: "Format", value: `Vidéo verticale 9:16 · ${w.durationSec} s` },
    ...(w.year ? [{ label: "Année", value: w.year }] : []),
  ];

  /* Les rubriques d'une etude de cas complete, affichees si renseignees. */
  const story = [
    { title: "L'objectif", text: c.objective },
    { title: "Le problème", text: c.challenge },
    { title: "La stratégie", text: c.strategy },
    { title: "L'exécution", text: c.execution },
  ].filter((b): b is { title: string; text: string } => !!b.text);

  const others = CASE_STUDIES.filter((x) => x.slug !== w.slug);

  return (
    <>
      <PageHero
        eyebrow={`Étude de cas${sector ? ` — ${sector.name}` : ""}`}
        title={c.headline}
        accent={c.client}
        intro={c.summary}
        breadcrumbs={[
          { name: "Réalisations", path: "/realisations" },
          { name: c.client, path: casePath(w.slug) },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-start lg:gap-16">
          <Reveal>
            <div className="mx-auto w-full max-w-[380px]">
              <VideoPlayer item={w} radius={20} withSound />
            </div>
          </Reveal>

          <div>
            <SectionIntro eyebrow="Le projet" title="En bref." />
            <FactList facts={facts} />

            {hasStats && (
              <>
                <WorkStats stats={w.stats} className="mt-12" />
                <p className="mt-5 text-[0.78rem] leading-relaxed text-[#797976]">
                  Chiffres relevés dans les gestionnaires de publicités.
                </p>
              </>
            )}

            {c.tools && c.tools.length > 0 && (
              <p className="mt-8 text-sm text-muted-foreground">
                Outils : <span className="text-foreground">{c.tools.join(", ")}</span>
              </p>
            )}
          </div>
        </div>
      </Section>

      {story.length > 0 && (
        <Section surface>
          <div className="grid gap-4 sm:grid-cols-2">
            {story.map((b) => (
              <Reveal key={b.title} className="h-full">
                <div
                  className="h-full rounded-2xl p-6"
                  style={{ backgroundColor: "#0B1020", border: "1px solid #16203a" }}
                >
                  <h2 className="display text-xl">{b.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#8792ad]">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section surface={story.length === 0}>
        <SectionIntro eyebrow="Aller plus loin" title="Les services derrière ce projet." />
        <LinkCards
          items={[
            ...c.services.map((k) => {
              const s = findService(k)!;
              return {
                to: servicePath(s.slug),
                eyebrow: "Service",
                title: s.name,
                text: s.description,
              };
            }),
            ...others.map((x) => ({
              to: casePath(x.slug),
              eyebrow: "Étude de cas",
              title: x.caseStudy.client,
              text: x.caseStudy.headline,
            })),
          ]}
        />
      </Section>

      <FinalCTA />
    </>
  );
}
