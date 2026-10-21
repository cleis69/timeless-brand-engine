import { Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { LinkCards } from "@/components/page/Blocks";
import { casePath, type WorkItem } from "@/components/work/work.data";
import { WorkGrid } from "@/components/work/WorkGrid";
import { SiteGrid } from "@/components/work/SiteGrid";
import { hasPlaceholders } from "@/components/work/sites.data";
import { EASE_RESPOND, MOTION } from "@/config/motion";
import { BRAND, withBrand } from "@/config/brand";
import { url } from "@/config/site";
import { caseStudiesFor, siteItemsFor, workItemsFor } from "@/content/localized";
import { localePath, useLocale, type Locale } from "@/lib/i18n";
import { pageHead, videoNode } from "@/lib/seo";

/**
 * UltraVision Agency — page Réalisations.
 *
 * Les films et les sites reels, tires de work.data.ts et sites.data.ts :
 * ajouter une realisation la-bas l'ajoute ici.
 *
 * LES DONNEES STRUCTUREES
 *
 * Chaque film est declare en VideoObject, avec sa vraie date de mise en
 * ligne et sa vraie duree (mesurees sur les fichiers), et non plus une
 * date estimee au 1er janvier. Les etudes de cas ont chacune leur page,
 * /realisations/<slug> : avec le meme film, ou, pour un site, avec sa
 * capture (CASE_STUDIES reunit les deux). La liste VideoObject ci-dessous
 * ne compte que les films.
 *
 * DEUX LANGUES, UNE SEULE PAGE : /realisations et /en/work. Le texte
 * fixe vient de `copy(locale)`, les realisations de localized.ts.
 */

const PATH = "/realisations";

function copy(l: Locale) {
  if (l === "en") {
    return {
      title: withBrand("Our work: video ads and websites"),
      description: `Vertical ad films, Meta and TikTok campaigns and websites produced in-house by ${BRAND.name}, a digital marketing agency in Marrakech.`,
      ogDescription: "What we have produced, and what it achieved.",
      crumb: "Our work",
      listName: `${BRAND.name} video work`,
      eyebrow: "Our work",
      h1: "What we have produced, and what it achieved.",
      accent: "and what it achieved",
      intro:
        "The films are shot and edited in-house, from writing the angle to the final cut. The figures shown are those recorded in the ad managers.",
      filmsEyebrow: "Films & campaigns",
      filmsTitle: "Vertical formats, made for the feed.",
      hover: "Hover over a card to play the video.",
      casesEyebrow: "Case studies",
      casesTitle: "A closer look at some projects.",
      sitesEyebrow: "Websites",
      sitesTitle: "Fast, understated interfaces built for conversion.",
      placeholders: "Cards marked “Example” illustrate a layout",
      nextEyebrow: "In production",
      nextTitle: "More films are being edited.",
      nextText:
        "We prefer to publish little and publish true. The next projects will appear here as they are delivered.",
      askText:
        "Want to see a format close to yours before deciding? Ask us, and we'll send you the matching footage.",
      askCta: "Ask for examples",
    };
  }
  return {
    title: withBrand("Réalisations : vidéos publicitaires et sites web"),
    description: `Films publicitaires verticaux, campagnes Meta et TikTok et sites web produits en interne par ${BRAND.name}, agence de marketing digital à Marrakech.`,
    ogDescription: "Ce que nous avons produit, et ce que ça a donné.",
    crumb: "Réalisations",
    listName: `Réalisations vidéo ${BRAND.name}`,
    eyebrow: "Réalisations",
    h1: "Ce que nous avons produit, et ce que ça a donné.",
    accent: "et ce que ça a donné",
    intro:
      "Les films sont tournés et montés en interne, de l'écriture de l'angle au montage final. Les chiffres affichés sont ceux relevés dans les gestionnaires de publicités.",
    filmsEyebrow: "Films & campagnes",
    filmsTitle: "Formats verticaux, pensés pour le feed.",
    hover: "Survolez une carte pour lancer la vidéo.",
    casesEyebrow: "Études de cas",
    casesTitle: "Le détail de quelques projets.",
    sitesEyebrow: "Sites internet",
    sitesTitle: "Des interfaces rapides, sobres et pensées pour la conversion.",
    placeholders: "Les cartes marquées « Exemple » illustrent une mise en page",
    nextEyebrow: "En production",
    nextTitle: "D'autres films sont en cours de montage.",
    nextText:
      "Nous préférons publier peu et publier vrai. Les prochaines réalisations arriveront ici au fur et à mesure de leur livraison.",
    askText:
      "Vous voulez voir un format proche du vôtre avant de décider ? Demandez-nous, nous vous enverrons les rushes correspondants.",
    askCta: "Demander des exemples",
  };
}

/** Un film en VideoObject, avec l'adresse et le nom dans la langue de la page. */
export function videoNodeIn(w: WorkItem, frPath: string, locale: Locale) {
  const node = videoNode(w, localePath(frPath, locale));
  return locale === "en" ? { ...node, name: `${w.title} — video ad` } : node;
}

/** Les balises de la page, dans la langue demandee. */
export function workIndexHead(locale: Locale) {
  const t = copy(locale);
  const works = workItemsFor(locale);
  const href = url(localePath(PATH, locale));
  return pageHead({
    locale,
    path: PATH,
    title: t.title,
    description: t.description,
    ogDescription: t.ogDescription,
    pageType: "CollectionPage",
    breadcrumbs: [{ name: t.crumb, path: PATH }],
    mainEntity: { "@id": `${href}#films` },
    nodes: [
      {
        "@type": "ItemList",
        "@id": `${href}#films`,
        name: t.listName,
        numberOfItems: works.length,
        itemListElement: works.map((w, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: videoNodeIn(w, w.caseStudy ? casePath(w.slug) : PATH, locale),
        })),
      },
    ],
  });
}

export function WorkIndexPage() {
  const locale = useLocale();
  const lp = (p: string) => localePath(p, locale);
  const t = copy(locale);

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.h1}
        accent={t.accent}
        intro={t.intro}
        breadcrumbs={[{ name: t.crumb, path: lp(PATH) }]}
      />

      {/* ---------------- Les films et campagnes ---------------- */}
      <section className="rule bg-background">
        <div className="shell py-14 lg:py-20">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow" style={{ color: "#60A5FA" }}>
                  {t.filmsEyebrow}
                </p>
                <h2 className="display mt-4 text-2xl sm:text-3xl">{t.filmsTitle}</h2>
              </div>
              <p className="max-w-xs text-[0.8rem] leading-relaxed text-[#7d89a6]">{t.hover}</p>
            </div>
          </Reveal>

          <WorkGrid items={workItemsFor(locale)} />
        </div>
      </section>

      {/* ---------------- Les etudes de cas ---------------- */}
      {/*
        Les realisations dont le detail est publie : client, prestations,
        format et, quand ils existent, les chiffres. Chacune a sa page.
      */}
      <section className="rule bg-surface" aria-labelledby="etudes-de-cas">
        <div className="shell py-14 lg:py-20">
          <Reveal>
            <p className="eyebrow" style={{ color: "#60A5FA" }}>
              {t.casesEyebrow}
            </p>
            <h2 id="etudes-de-cas" className="display mt-4 text-2xl sm:text-3xl">
              {t.casesTitle}
            </h2>
          </Reveal>
          <LinkCards
            items={caseStudiesFor(locale).map((w) => ({
              to: lp(casePath(w.slug)),
              eyebrow: w.category.replace("PUBLICITE", "Publicité"),
              title: w.caseStudy.client,
              text: w.caseStudy.headline,
            }))}
          />
        </div>
      </section>

      {/* ---------------- Les sites internet ---------------- */}
      {/* Fonds alternes : films (fond), etudes de cas (surface), sites
          (fond), films en cours (surface). Deux fonds identiques colles
          l'un a l'autre effacent la separation entre deux sujets. */}
      <section className="rule bg-background">
        <div className="shell py-16 lg:py-20">
          <Reveal>
            <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow" style={{ color: "#60A5FA" }}>
                  {t.sitesEyebrow}
                </p>
                <h2 className="display mt-4 max-w-xl text-2xl sm:text-3xl">{t.sitesTitle}</h2>
              </div>

              {/*
                LA MENTION EST OBLIGATOIRE TANT QUE LES PROJETS SONT DES
                EXEMPLES.

                Elle disparait toute seule le jour ou
                SITES_ARE_PLACEHOLDERS passe a false dans sites.data.ts.

                Presenter six sites inventes sous un titre
                « Realisations » sans le dire serait exactement la faute
                que le reste de ce site a corrigee : le premier prospect
                qui cherche un de ces noms et ne trouve rien ne revient
                pas.
              */}
              {hasPlaceholders() && (
                <p
                  className="rounded-full px-3.5 py-1.5 text-[0.68rem] tracking-[0.06em] text-[#8792ad]"
                  style={{
                    background: "rgba(148,163,184,.07)",
                    border: "1px solid #24304a",
                  }}
                >
                  {t.placeholders}
                </p>
              )}
            </div>
          </Reveal>

          <SiteGrid items={siteItemsFor(locale)} />
        </div>
      </section>

      {/* ---------------- Ce qui arrive ---------------- */}
      <section className="rule bg-surface">
        <div className="shell grid gap-10 py-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-20">
          <Reveal>
            <div>
              <p className="eyebrow" style={{ color: "#60A5FA" }}>
                {t.nextEyebrow}
              </p>
              <h2 className="display mt-5 text-3xl sm:text-4xl">{t.nextTitle}</h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                {t.nextText}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              className="rounded-3xl p-7"
              style={{
                background:
                  "radial-gradient(120% 130% at 14% 0%, #1E3A8A 0%, #0B1226 48%, #0A0A0A 84%)",
                border: "1px solid #1c2946",
              }}
            >
              <p className="text-sm leading-relaxed text-[#cddafc]">{t.askText}</p>
              <Link
                to={lp("/contact")}
                className="mt-6 inline-flex h-11 items-center rounded-full bg-foreground px-6 text-xs font-medium tracking-[0.12em] uppercase text-background"
                style={{ transition: `background-color ${MOTION.respond}ms ${EASE_RESPOND}` }}
              >
                {t.askCta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
