import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/FinalCTA";
import { Reveal } from "@/components/Reveal";
import { LinkCards, Section } from "@/components/page/Blocks";
import { BRAND, withBrand } from "@/config/brand";
import { url } from "@/config/site";
import { SECTORS, sectorPath } from "@/content/sectors";
import { pageHead } from "@/lib/seo";

/**
 * UltraVision Agency — la liste des secteurs.
 *
 * Elle existe pour que /secteurs ne soit pas une impasse : un visiteur
 * qui remonte l'adresse depuis /secteurs/immobilier doit trouver une
 * page, pas une erreur.
 */

export const Route = createFileRoute("/secteurs/")({
  head: () =>
    pageHead({
      path: "/secteurs",
      title: withBrand(`Secteurs d'intervention à ${BRAND.city}`),
      description:
        "Immobilier, beauté et bien-être, restauration et hospitality : les secteurs où UltraVision Agency, agence de marketing digital à Marrakech, a le plus produit.",
      pageType: "CollectionPage",
      breadcrumbs: [{ name: "Secteurs", path: "/secteurs" }],
      nodes: [
        {
          "@type": "ItemList",
          "@id": `${url("/secteurs")}#liste`,
          itemListElement: SECTORS.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.name,
            url: url(sectorPath(s.slug)),
          })),
        },
      ],
    }),
  component: Secteurs,
});

function Secteurs() {
  return (
    <>
      <PageHero
        eyebrow="Secteurs"
        title="Les métiers où nous avons le plus produit."
        accent="le plus produit"
        intro="Chaque secteur a ses codes : ce qui fait réserver une table ne fait pas acheter une villa. Voici ceux où nos réalisations sont les plus nombreuses — ce qui y fait vendre, et ce que nous y avons produit."
        breadcrumbs={[{ name: "Secteurs", path: "/secteurs" }]}
      />

      <Section>
        <LinkCards
          items={SECTORS.map((s) => ({
            to: sectorPath(s.slug),
            eyebrow: "Secteur",
            title: s.name,
            text: s.description,
          }))}
        />
        <Reveal delay={200}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Nous accompagnons aussi des entreprises de services et des marques haut de gamme. Leur
            métier n&apos;a pas encore de page ici : parlez-nous du vôtre.
          </p>
        </Reveal>
      </Section>

      <FinalCTA />
    </>
  );
}
