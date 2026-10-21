import { Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/FinalCTA";
import { Reveal } from "@/components/Reveal";
import { FactList, LinkCards, Section, SectionIntro } from "@/components/page/Blocks";
import { VideoPlayer } from "@/components/work/VideoPlayer";
import { WorkStats } from "@/components/work/WorkStats";
import { casePath, isFilm, shownStats } from "@/components/work/work.data";
import { withBrand } from "@/config/brand";
import { servicePath } from "@/content/services";
import { sectorPath } from "@/content/sectors";
import { caseStudiesFor, findCaseFor, findSectorFor, findServiceFor } from "@/content/localized";
import { localePath, useLocale, type Locale } from "@/lib/i18n";
import { pageHead, pageUrl, siteNode } from "@/lib/seo";
import { videoNodeIn } from "@/pages/WorkIndex";

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
 *
 * DEUX LANGUES, UN SEUL GABARIT : /realisations/$slug et /en/work/$slug.
 * Les libelles fixes viennent de `UI`, les textes de localized.ts.
 */

const UI = {
  fr: {
    crumb: "Réalisations",
    caseStudy: "Étude de cas",
    client: "Client",
    sector: "Secteur",
    location: "Lieu",
    services: "Prestations",
    platforms: "Plateformes",
    format: "Format",
    film: (s: number) => `Vidéo verticale 9:16 · ${s} s`,
    website: "Site web",
    site: "Site",
    year: "Année",
    objective: "L'objectif",
    challenge: "Le problème",
    strategy: "La stratégie",
    execution: "L'exécution",
    projectEyebrow: "Le projet",
    projectTitle: "En bref.",
    statsNote: "Chiffres relevés dans les gestionnaires de publicités.",
    tools: "Outils :",
    shotAlt: (client: string, domain: string) =>
      `Le site de ${client}${domain}, en capture d'écran.`,
    siteAlt: "site web",
    nextEyebrow: "Aller plus loin",
    nextTitle: "Les services derrière ce projet.",
    service: "Service",
  },
  en: {
    crumb: "Our work",
    caseStudy: "Case study",
    client: "Client",
    sector: "Industry",
    location: "Location",
    services: "Services",
    platforms: "Platforms",
    format: "Format",
    film: (s: number) => `Vertical 9:16 video · ${s} s`,
    website: "Website",
    site: "Website",
    year: "Year",
    objective: "The objective",
    challenge: "The problem",
    strategy: "The strategy",
    execution: "The execution",
    projectEyebrow: "The project",
    projectTitle: "At a glance.",
    statsNote: "Figures recorded in the ad managers.",
    tools: "Tools:",
    shotAlt: (client: string, domain: string) => `Screenshot of the ${client} website${domain}.`,
    siteAlt: "website",
    nextEyebrow: "Go further",
    nextTitle: "The services behind this project.",
    service: "Service",
  },
};

/** Le domaine lisible d'une adresse : « https://www.x.com/ » -> « x.com ». */
const domainOf = (href: string) => {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
};

/** Les balises d'une etude de cas, dans la langue demandee. */
export function caseHead(slug: string | undefined, locale: Locale) {
  const w = findCaseFor(slug, locale);
  if (!w) return {};
  const t = UI[locale];
  const c = w.caseStudy;
  const path = casePath(w.slug);
  const href = pageUrl(localePath(path, locale));
  const base = {
    locale,
    path,
    title: withBrand(c.seoTitle),
    description: c.seoDescription,
    breadcrumbs: [
      { name: t.crumb, path: "/realisations" },
      { name: c.client, path },
    ],
  };
  if (isFilm(w)) {
    return pageHead({
      ...base,
      image: { path: w.poster, alt: `${c.client} — ${w.title}` },
      mainEntity: { "@id": `${href}#video-${w.slug}` },
      nodes: [videoNodeIn(w, path, locale)],
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
      alt: `${c.client} — ${t.siteAlt}`,
    },
    mainEntity: { "@id": `${href}#site-${w.slug}` },
    nodes: [siteNode(w, localePath(path, locale))],
  });
}

export function CaseStudyPage({ slug }: { slug: string }) {
  const locale = useLocale();
  const lp = (p: string) => localePath(p, locale);
  const t = UI[locale];
  const w = findCaseFor(slug, locale)!;
  const c = w.caseStudy;
  const film = isFilm(w) ? w : null;
  const site = isFilm(w) ? null : w;
  const sector = findSectorFor(c.sector, locale);
  const hasStats = !!film && shownStats(film).length > 0;

  const facts = [
    { label: t.client, value: c.client },
    ...(sector
      ? [
          {
            label: t.sector,
            value: (
              <Link to={lp(sectorPath(sector.slug))} className="link-underline">
                {sector.name}
              </Link>
            ),
          },
        ]
      : []),
    ...(c.location ? [{ label: t.location, value: c.location }] : []),
    {
      label: t.services,
      value: (
        <span className="flex flex-col gap-1">
          {c.services.map((k) => {
            const s = findServiceFor(k, locale)!;
            return (
              <Link key={k} to={lp(servicePath(s.slug))} className="link-underline">
                {s.name}
              </Link>
            );
          })}
        </span>
      ),
    },
    ...(c.platforms?.length ? [{ label: t.platforms, value: c.platforms.join(", ") }] : []),
    {
      label: t.format,
      value: film ? t.film(film.durationSec) : t.website,
    },
    /*
      LE SEUL LIEN VERS LE SITE D'UN CLIENT. Suivi, volontairement : pas de
      nofollow ni de noreferrer, seulement noopener pour l'ouverture dans
      un nouvel onglet.
    */
    ...(c.website
      ? [
          {
            label: t.site,
            value: (
              <a href={c.website} target="_blank" rel="noopener" className="link-underline">
                {domainOf(c.website)}
              </a>
            ),
          },
        ]
      : []),
    ...(w.year ? [{ label: t.year, value: w.year }] : []),
  ];

  /* Les rubriques d'une etude de cas complete, affichees si renseignees. */
  const story = [
    { title: t.objective, text: c.objective },
    { title: t.challenge, text: c.challenge },
    { title: t.strategy, text: c.strategy },
    { title: t.execution, text: c.execution },
  ].filter((b): b is { title: string; text: string } => !!b.text);

  const others = caseStudiesFor(locale).filter((x) => x.slug !== w.slug);

  const details = (
    <div>
      <SectionIntro eyebrow={t.projectEyebrow} title={t.projectTitle} />
      <FactList facts={facts} />

      {film && hasStats && (
        <>
          <WorkStats stats={film.stats} className="mt-12" />
          <p className="mt-5 text-[0.78rem] leading-relaxed text-[#797976]">{t.statsNote}</p>
        </>
      )}

      {c.tools && c.tools.length > 0 && (
        <p className="mt-8 text-sm text-muted-foreground">
          {t.tools} <span className="text-foreground">{c.tools.join(", ")}</span>
        </p>
      )}
    </div>
  );

  return (
    <>
      <PageHero
        eyebrow={`${t.caseStudy}${sector ? ` — ${sector.name}` : ""}`}
        title={c.headline}
        accent={c.client}
        intro={c.summary}
        breadcrumbs={[
          { name: t.crumb, path: lp("/realisations") },
          { name: c.client, path: lp(casePath(w.slug)) },
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
                    srcSet={
                      site.shotLarge ? `${site.shot} 960w, ${site.shotLarge} 1440w` : undefined
                    }
                    sizes={site.shotLarge ? "(min-width: 1280px) 1184px, 100vw" : undefined}
                    width={960}
                    height={546}
                    alt={t.shotAlt(c.client, c.website ? ` (${domainOf(c.website)})` : "")}
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
          {/* Une seule rubrique (Find Estate et REV n'ont que l'execution) : pleine
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
        <SectionIntro eyebrow={t.nextEyebrow} title={t.nextTitle} />
        <LinkCards
          items={[
            ...c.services.map((k) => {
              const s = findServiceFor(k, locale)!;
              return {
                to: lp(servicePath(s.slug)),
                eyebrow: t.service,
                title: s.name,
                text: s.description,
              };
            }),
            ...others.map((x) => ({
              to: lp(casePath(x.slug)),
              eyebrow: t.caseStudy,
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
