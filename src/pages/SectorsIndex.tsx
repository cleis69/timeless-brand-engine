import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/FinalCTA";
import { Reveal } from "@/components/Reveal";
import { LinkCards, Section } from "@/components/page/Blocks";
import { BRAND, withBrand } from "@/config/brand";
import { url } from "@/config/site";
import { sectorPath } from "@/content/sectors";
import { sectorsFor } from "@/content/localized";
import { localePath, useLocale, type Locale } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";

/**
 * UltraVision Agency — la liste des secteurs.
 *
 * Elle existe pour que /secteurs ne soit pas une impasse : un visiteur
 * qui remonte l'adresse depuis /secteurs/immobilier doit trouver une
 * page, pas une erreur.
 *
 * Deux langues, une seule page : /secteurs et /en/industries.
 */

const PATH = "/secteurs";

function copy(l: Locale) {
  if (l === "en") {
    return {
      title: withBrand(`Industries we work in, ${BRAND.city}`),
      description:
        "Real estate, beauty and wellness, restaurants and hospitality: the industries where UltraVision Agency, a digital marketing agency in Marrakech, has produced the most work.",
      crumb: "Industries",
      eyebrow: "Industries",
      h1: "The trades where we have produced the most.",
      accent: "produced the most",
      intro:
        "Every industry has its own codes: what gets a table booked won't sell a villa. These are the ones where we have the most work — what sells there, and what we have produced.",
      card: "Industry",
      note: "We also work with service businesses and premium brands. Their trade doesn't have a page here yet: tell us about yours.",
    };
  }
  return {
    title: withBrand(`Secteurs d'intervention à ${BRAND.city}`),
    description:
      "Immobilier, beauté et bien-être, restauration et hospitality : les secteurs où UltraVision Agency, agence de marketing digital à Marrakech, a le plus produit.",
    crumb: "Secteurs",
    eyebrow: "Secteurs",
    h1: "Les métiers où nous avons le plus produit.",
    accent: "le plus produit",
    intro:
      "Chaque secteur a ses codes : ce qui fait réserver une table ne fait pas acheter une villa. Voici ceux où nos réalisations sont les plus nombreuses — ce qui y fait vendre, et ce que nous y avons produit.",
    card: "Secteur",
    note: "Nous accompagnons aussi des entreprises de services et des marques haut de gamme. Leur métier n'a pas encore de page ici : parlez-nous du vôtre.",
  };
}

/** Les balises de la page, dans la langue demandee. */
export function sectorsIndexHead(locale: Locale) {
  const t = copy(locale);
  return pageHead({
    locale,
    path: PATH,
    title: t.title,
    description: t.description,
    pageType: "CollectionPage",
    breadcrumbs: [{ name: t.crumb, path: PATH }],
    nodes: [
      {
        "@type": "ItemList",
        "@id": `${url(localePath(PATH, locale))}#liste`,
        itemListElement: sectorsFor(locale).map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.name,
          url: url(localePath(sectorPath(s.slug), locale)),
        })),
      },
    ],
  });
}

export function SectorsIndexPage() {
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

      <Section>
        <LinkCards
          items={sectorsFor(locale).map((s) => ({
            to: lp(sectorPath(s.slug)),
            eyebrow: t.card,
            title: s.name,
            text: s.description,
          }))}
        />
        <Reveal delay={200}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t.note}</p>
        </Reveal>
      </Section>

      <FinalCTA />
    </>
  );
}
