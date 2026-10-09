import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/FinalCTA";
import { Reveal } from "@/components/Reveal";
import { FactList, LinkCards, Section, SectionIntro } from "@/components/page/Blocks";
import { VideoPlayer } from "@/components/work/VideoPlayer";
import { WorkStats } from "@/components/work/WorkStats";
import { CASE_STUDIES, casePath, findCase, isFilm, shownStats } from "@/components/work/work.data";
import { withBrand } from "@/config/brand";
import { findService, servicePath } from "@/content/services";
import { findSector, sectorPath } from "@/content/sectors";
import { pageHead, pageUrl, siteNode, videoNode } from "@/lib/seo";

/**
 * UltraVision Agency — une etude de cas.
 *
 * ============================================================
 *  RIEN N'EST ECRIT ICI QUI NE SOIT DANS work.data.ts OU sites.data.ts.
 * ============================================================
 *
 * Deux sortes d'etudes de cas partagent cette page :
 *
 *   un FILM (work.data.ts)  le film en colonne, a cote de la fiche, et
 *                           les chiffres des gestionnaires de publicites
 *                           quand ils existent ;
 *   un SITE (sites.data.ts) la capture du site en pleine largeur, la
 *                           fiche dessous, et le lien vers le site livre.
 *
 * La structure complete d'une etude de cas est prevue — objectif,
 * probleme, strategie, execution, outils — mais chaque bloc n'apparait
 * que si le champ correspondant est rempli dans `caseStudy`.
 *
 * LE SEUL LIEN VERS LE SITE D'UN CLIENT est ici : `caseStudy.website`, affiche
 * dans la fiche « En bref ». Il est suivi (rel="noopener", sans
 * nofollow) : c'est un site que l'agence a livre et signe, avec
 * l'accord du client. Voir la REGLE 1 de sites.data.ts.
 *
 * Completer une etude de cas se fait donc dans les fichiers de donnees,
 * avec le client, jamais de memoire.
 */

/** Le domaine lisible d'une adresse : « https://www.x.com/ » -> « x.com ». */
const domainOf = (href: string) => {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
};

export const Route = createFileRoute("/realisations/$slug")({
  loader: ({ params }) => {
    if (!findCase(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const w = findCase(loaderData?.slug);
    if (!w) return {};
    const c = w.caseStudy;
    const path = casePath(w.slug);
    const base = {
      path,
      title: withBrand(c.seoTitle),
      description: c.seoDescription,
      breadcrumbs: [
        { name: "Réalisations", path: "/realisations" },
        { name: c.client, path },
      ],
    };
    if (isFilm(w)) {
      return pageHead({
        ...base,
        image: { path: w.poster, alt: `${c.client} — ${w.title}` },
        mainEntity: { "@id": `${pageUrl(path)}#video-${w.slug}` },
        nodes: [videoNode(w, path)],
      });
    }
    /*
      Un site n'a pas d'affiche : l'image de partage est `og.jpg`, en
      1200x630, deposee a cote de sa capture (voir sites.data.ts).
    */
    return pageHead({
      ...base,
      image: {
        path: `/work/sites/${w.slug}/og.jpg`,
        width: 1200,
        height: 630,
        alt: `${c.client} — site web`,
      },
      mainEntity: { "@id": `${pageUrl(path)}#site-${w.slug}` },
      nodes: [siteNode(w, path)],
    });
  },
  component: CasePage,
});

function CasePage() {
  const { slug } = Route.useLoaderData();
  const w = findCase(slug)!;
  const c = w.caseStudy;
  const film = isFilm(w) ? w : null;
  const site = isFilm(w) ? null : w;
  const sector = findSector(c.sector);
  const hasStats = !!film && shownStats(film).length > 0;

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
    {
      label: "Format",
      value: film ? `Vidéo verticale 9:16 · ${film.durationSec} s` : "Site web",
    },
    /*
      LE SEUL LIEN VERS LE SITE D'UN CLIENT. Suivi, volontairement : pas de
      nofollow ni de noreferrer, seulement noopener pour l'ouverture dans
      un nouvel onglet.
    */
    ...(c.website
      ? [
          {
            label: "Site",
            value: (
              <a href={c.website} target="_blank" rel="noopener" className="link-underline">
                {domainOf(c.website)}
              </a>
            ),
          },
        ]
      : []),
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

  const details = (
    <div>
      <SectionIntro eyebrow="Le projet" title="En bref." />
      <FactList facts={facts} />

      {film && hasStats && (
        <>
          <WorkStats stats={film.stats} className="mt-12" />
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
  );

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
        {film ? (
          <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-start lg:gap-16">
            <Reveal>
              <div className="mx-auto w-full max-w-[380px]">
                <VideoPlayer item={film} radius={20} withSound />
              </div>
            </Reveal>
            {details}
          </div>
        ) : (
          <>
            {/*
              Un site se montre en largeur : la capture tient la place du
              film, sur toute la largeur du contenu, et la fiche passe
              dessous. Une capture de fenetre (16/9 environ) reduite a la
              colonne de 380 px d'un film ne montrerait plus aucune mise
              en page.
            */}
            {site?.shot && (
              <Reveal>
                <figure
                  className="overflow-hidden rounded-2xl"
                  style={{ backgroundColor: "#05070F", border: "1px solid #16203a" }}
                >
                  <img
                    src={site.shot}
                    srcSet={site.shotLarge ? `${site.shot} 960w, ${site.shotLarge} 1440w` : undefined}
                    sizes={site.shotLarge ? "(min-width: 1280px) 1184px, 100vw" : undefined}
                    width={960}
                    height={546}
                    alt={`Page d'accueil du site de ${c.client}${c.website ? ` (${domainOf(c.website)})` : ""}, en capture d'écran.`}
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </figure>
              </Reveal>
            )}
            <div className={site?.shot ? "mt-14 lg:mt-16" : undefined}>{details}</div>
          </>
        )}
      </Section>

      {story.length > 0 && (
        <Section surface>
          {/* Une seule rubrique (Find Estate n'a que l'execution) : pleine
              mesure de lecture plutot qu'une demi-colonne a cote d'un vide. */}
          <div className={story.length > 1 ? "grid gap-4 sm:grid-cols-2" : "max-w-3xl"}>
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
