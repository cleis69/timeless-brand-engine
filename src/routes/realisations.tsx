import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL } from "@/config/site";
import { ORG_LD } from "@/config/contact";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { WORK_ITEMS } from "@/components/work/work.data";
import { WorkGrid } from "@/components/work/WorkGrid";
import { SiteGrid } from "@/components/work/SiteGrid";
import { SITE_ITEMS, hasPlaceholders } from "@/components/work/sites.data";
import { EASE_RESPOND, MOTION } from "@/config/motion";

/**
 * ULTRA VISION — page Réalisations.
 *
 * ============================================================
 *  CE FICHIER REMPLACE src/routes/realisations.tsx
 * ============================================================
 *
 * CE QUI ETAIT EN LIGNE, ET QUI A ETE SUPPRIME
 *
 * Quatre etudes de cas entierement inventees : Nordhaus, Meridian,
 * Atelier Vaste, Kairos Capital. Aucune de ces entreprises n'existe.
 * Leurs resultats non plus : +214 % de pipeline, cout par demonstration
 * divise par 2,8, 11 projets signes, 38 % de temps commercial libere.
 *
 * Plus bas, trois compteurs animes : 47 marques accompagnees, 12 M€ de
 * chiffre d'affaires genere, 93 % de clients reconduits.
 *
 * C'est la page la plus dangereuse du site telle qu'elle etait ecrite.
 * Un prospect qui cherche « Nordhaus » ou « Kairos Capital » ne trouve
 * rien, et il ne revient pas. Un concurrent qui la lit sait exactement
 * quoi dire de vous. Et publier des resultats chiffres invente est une
 * pratique commerciale trompeuse.
 *
 * CE QUI LES REMPLACE
 *
 * Les quatre realisations reelles, celles qui vivent deja dans
 * work.data.ts et qui s'affichent sur la page d'accueil. Meme source,
 * donc jamais de divergence : ajouter une realisation dans work.data.ts
 * l'ajoute ici automatiquement.
 *
 * Quatre projets vrais valent mieux que quatre projets inventes, meme
 * si le chiffre parait maigre. Un prospect ne compte pas les cas : il
 * en lit un, et il regarde si c'est credible.
 */

/*
  L'adresse vient desormais de src/config/site.ts.
  Le jour du basculement vers ultravisionagency.com, une seule ligne
  change la-bas et les dix pages suivent — y compris toutes les
  adresses canoniques et toutes les donnees structurees.
*/
const URL = SITE_URL;

export const Route = createFileRoute("/realisations")({
  component: Realisations,
  head: () => ({
    meta: [
      { title: "Réalisations — Campagnes et films de marque | ULTRA VISION" },
      {
        name: "description",
        content:
          "Campagnes publicitaires, films de marque et contenus verticaux produits en interne, de l'écriture au montage final.",
      },
      { property: "og:title", content: "Réalisations — ULTRA VISION" },
      {
        property: "og:description",
        content: "Ce que nous avons produit, et ce que ça a donné.",
      },
      { property: "og:url", content: `${URL}/realisations` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${URL}/realisations` }],
    scripts: [
      {
        /*
          CollectionPage listant les realisations reelles. Les chiffres
          declares sont ceux de work.data.ts : ils ne peuvent donc pas
          diverger de ce qui est affiche. Un resultat balise different
          du resultat affiche serait traite comme une manipulation.
        */
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          url: `${URL}/realisations`,
          inLanguage: "fr-FR",
          publisher: ORG_LD(URL),
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: WORK_ITEMS.length,
            itemListElement: WORK_ITEMS.map((w, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "VideoObject",
                name: w.title,
                description: w.description,
                genre: w.category,
                thumbnailUrl: `${URL}${w.poster}`,
                contentUrl: `${URL}${w.sources.mp4}`,
                uploadDate: w.year ? `${w.year}-01-01` : undefined,
                creator: { "@type": "Organization", name: "ULTRA VISION" },
              },
            })),
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: URL },
            { "@type": "ListItem", position: 2, name: "Réalisations", item: `${URL}/realisations` },
          ],
        }),
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

      {/* ---------------- Les sites internet ---------------- */}
      <section className="rule bg-surface">
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
      {/* bg-background, et non bg-surface : la section des sites juste
          au-dessus est deja en surface, et deux fonds identiques colles
          l'un a l'autre effacent la separation entre les deux sujets. */}
      <section className="rule bg-background">
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
