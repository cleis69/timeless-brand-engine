import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { LinkCards } from "@/components/page/Blocks";
import { CASE_STUDIES, WORK_ITEMS, casePath } from "@/components/work/work.data";
import { WorkGrid } from "@/components/work/WorkGrid";
import { SiteGrid } from "@/components/work/SiteGrid";
import { SITE_ITEMS, hasPlaceholders } from "@/components/work/sites.data";
import { EASE_RESPOND, MOTION } from "@/config/motion";
import { BRAND, withBrand } from "@/config/brand";
import { url } from "@/config/site";
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
 */

export const Route = createFileRoute("/realisations/")({
  component: Realisations,
  head: () =>
    pageHead({
      path: "/realisations",
      title: withBrand("Réalisations : vidéos publicitaires et sites web"),
      description: `Films publicitaires verticaux, campagnes Meta et TikTok et sites web produits en interne par ${BRAND.name}, agence de marketing digital à Marrakech.`,
      ogDescription: "Ce que nous avons produit, et ce que ça a donné.",
      pageType: "CollectionPage",
      breadcrumbs: [{ name: "Réalisations", path: "/realisations" }],
      mainEntity: { "@id": `${url("/realisations")}#films` },
      nodes: [
        {
          "@type": "ItemList",
          "@id": `${url("/realisations")}#films`,
          name: `Réalisations vidéo ${BRAND.name}`,
          numberOfItems: WORK_ITEMS.length,
          itemListElement: WORK_ITEMS.map((w, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: videoNode(w, w.caseStudy ? casePath(w.slug) : "/realisations"),
          })),
        },
      ],
    }),
});

function Realisations() {
  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title="Ce que nous avons produit, et ce que ça a donné."
        accent="et ce que ça a donné"
        intro="Tout est tourné et monté en interne, de l'écriture de l'angle au montage final. Les chiffres affichés sont ceux relevés dans les gestionnaires de publicités."
        breadcrumbs={[{ name: "Réalisations", path: "/realisations" }]}
      />

      {/* ---------------- Les films et campagnes ---------------- */}
      <section className="rule bg-background">
        <div className="shell py-14 lg:py-20">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow" style={{ color: "#60A5FA" }}>
                  Films & campagnes
                </p>
                <h2 className="display mt-4 text-2xl sm:text-3xl">
                  Formats verticaux, pensés pour le feed.
                </h2>
              </div>
              <p className="max-w-xs text-[0.8rem] leading-relaxed text-[#7d89a6]">
                Survolez une carte pour lancer la vidéo.
              </p>
            </div>
          </Reveal>

          <WorkGrid items={WORK_ITEMS} />
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
              Études de cas
            </p>
            <h2 id="etudes-de-cas" className="display mt-4 text-2xl sm:text-3xl">
              Le détail de quelques projets.
            </h2>
          </Reveal>
          <LinkCards
            items={CASE_STUDIES.map((w) => ({
              to: casePath(w.slug),
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
                  Sites internet
                </p>
                <h2 className="display mt-4 max-w-xl text-2xl sm:text-3xl">
                  Des interfaces rapides, sobres et pensées pour la conversion.
                </h2>
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
                  Les cartes marquées « Exemple » illustrent une mise en page
                </p>
              )}
            </div>
          </Reveal>

          <SiteGrid items={SITE_ITEMS} />
        </div>
      </section>

      {/* ---------------- Ce qui arrive ---------------- */}
      <section className="rule bg-surface">
        <div className="shell grid gap-10 py-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-20">
          <Reveal>
            <div>
              <p className="eyebrow" style={{ color: "#60A5FA" }}>
                En production
              </p>
              <h2 className="display mt-5 text-3xl sm:text-4xl">
                D'autres films sont en cours de montage.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Nous préférons publier peu et publier vrai. Les prochaines réalisations
                arriveront ici au fur et à mesure de leur livraison.
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
              <p className="text-sm leading-relaxed text-[#cddafc]">
                Vous voulez voir un format proche du vôtre avant de décider ? Demandez-nous, nous
                vous enverrons les rushes correspondants.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex h-11 items-center rounded-full bg-foreground px-6 text-xs font-medium tracking-[0.12em] uppercase text-background"
                style={{ transition: `background-color ${MOTION.respond}ms ${EASE_RESPOND}` }}
              >
                Demander des exemples
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
