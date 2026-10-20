import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/FinalCTA";
import {
  ArrowLink,
  BulletPanel,
  CardGrid,
  FactList,
  FaqList,
  LinkCards,
  PriceRows,
  Section,
  SectionIntro,
  Steps,
} from "@/components/page/Blocks";
import { WorkGrid } from "@/components/work/WorkGrid";
import { SiteGrid } from "@/components/work/SiteGrid";
import { casePath, findCase, findWork, type WorkItem } from "@/components/work/work.data";
import { SITE_ITEMS } from "@/components/work/sites.data";
import { BRAND, withBrand } from "@/config/brand";
import { AREA_SERVED } from "@/config/contact";
import { PACKS, dirham, euro } from "@/config/pricing";
import { findService, resolvePrice, servicePath } from "@/content/services";
import { sectorPath } from "@/content/sectors";
import { findArticle } from "@/content/blog";
import { url } from "@/config/site";
import { orgRef, pageHead, serviceId, videoNode } from "@/lib/seo";

/**
 * UltraVision Agency — page d'offre : hotels et riads.
 *
 * ============================================================
 *  LA QUESTION A LAQUELLE ELLE REPOND
 * ============================================================
 *
 * « Quelle agence a Marrakech travaille pour les hotels et les riads ? »
 * Les assistants qui citaient UltraVision ajoutaient qu'aucune source
 * ne confirmait l'hotellerie. Cette page est cette source, et elle
 * s'appuie sur une realisation reelle : le film du Petit Hotel du
 * Flouka, tourne au bord du lac Lalla Takerkoust.
 *
 * AUCUN FAIT NOUVEAU ICI : les prix viennent de pricing.ts, la
 * realisation de work.data.ts, la reservation integree des sites deja
 * livres (sites.data.ts). Aucun chiffre de reservation n'est annonce :
 * l'hotel n'en a pas communique.
 */

const PATH = "/marketing-hotels-riads-marrakech";
const NAME = "Hôtels et riads";

const ESSAI = PACKS.find((p) => p.id === "essai")!;
const PRODUCTION = PACKS.find((p) => p.id === "production")!;
const VITRINE = resolvePrice({ carte: "Site vitrine" })!;
const both = (eur: number) => `${dirham(eur)} (≈ ${euro(eur)})`;

/* La realisation hoteliere. Ses informations sont lues, pas recopiees. */
const PROOF = findCase("hotel-bord-de-lac");

const INTRO = `${BRAND.name} filme les hôtels et les riads de ${BRAND.city} et de ses environs, construit leur site avec réservation intégrée, et diffuse leurs vidéos sur Instagram, Facebook et TikTok pour obtenir des réservations en direct, sans commission de plateforme. Nous avons notamment tourné le film de présentation du Petit Hôtel du Flouka, au bord du lac Lalla Takerkoust.`;

const FAQ = [
  {
    q: "Quelle agence à Marrakech travaille pour les hôtels et les riads ?",
    a: `${BRAND.name}, basée à ${BRAND.city}. L'agence tourne les vidéos des lieux, crée des sites avec réservation intégrée et diffuse les contenus en publicité. Elle a notamment réalisé le film de présentation du Petit Hôtel du Flouka, au lac Lalla Takerkoust.`,
  },
  {
    q: "Comment obtenir plus de réservations en direct ?",
    a: "Trois choses à la fois : un site qui réserve sans détour par une plateforme, des vidéos qui donnent envie avant la visite, et une publicité qui montre ces vidéos aux voyageurs qui préparent leur séjour. Les plateformes continuent d'apporter des clients ; une partie d'entre eux réserve alors chez vous, sans commission.",
  },
  {
    q: "Tournez-vous en dehors de Marrakech ?",
    a: "Oui. Le Petit Hôtel du Flouka est à une trentaine de kilomètres, au bord du lac Lalla Takerkoust. Nous tournons aussi à Casablanca, Rabat, Tanger et Agadir, sans frais de déplacement supplémentaires.",
  },
  {
    q: "Combien coûte une vidéo pour un hôtel ou un riad ?",
    a: `L'essai coûte ${both(ESSAI.price)} : une vidéo livrée en 7 jours et 14 jours de diffusion pilotée. La formule Production, à ${both(PRODUCTION.price)} par mois, comprend quatre vidéos et leur diffusion. Un site vitrine avec réservation démarre à ${both(VITRINE.price)}.`,
  },
  {
    q: "Le site peut-il être bilingue ?",
    a: "Oui. La clientèle d'un hôtel ou d'un riad est souvent étrangère : le site peut être livré en plusieurs langues, comme celui de Koozina Garden.",
  },
];

/* Les films montres : la realisation hoteliere d'abord, puis le film
   tourne de jour et de nuit pour un lieu de loisirs. */
const WORKS = ["hotel-bord-de-lac", "loisirs"]
  .map(findWork)
  .filter((w): w is WorkItem => !!w);

const SITES = SITE_ITEMS.filter((s) => ["koozina-garden", "raphael-anglesy"].includes(s.slug));

export const Route = createFileRoute("/marketing-hotels-riads-marrakech")({
  head: () =>
    pageHead({
      path: PATH,
      title: withBrand(`Marketing pour hôtels et riads à ${BRAND.city}`),
      description: `Vidéos des lieux, site avec réservation intégrée et publicité pour les hôtels et les riads de ${BRAND.city}. Réalisation : Le Petit Hôtel du Flouka. Essai à ${dirham(ESSAI.price)}.`,
      breadcrumbs: [{ name: NAME, path: PATH }],
      about: { "@id": `${url(PATH)}#service` },
      faq: FAQ,
      nodes: [
        {
          "@type": "Service",
          "@id": `${url(PATH)}#service`,
          name: `Marketing pour hôtels et riads à ${BRAND.city}`,
          serviceType: "Vidéo, site avec réservation et publicité pour l'hôtellerie",
          description: INTRO,
          url: url(PATH),
          provider: orgRef,
          areaServed: AREA_SERVED,
          availableLanguage: ["French"],
          audience: { "@type": "BusinessAudience", name: "Hôtels et riads" },
          isRelatedTo: [
            { "@id": serviceId("production-video-photo") },
            { "@id": serviceId("creation-site-web") },
            { "@id": serviceId("meta-ads") },
          ],
          offers: {
            "@type": "Offer",
            name: `Essai — ${ESSAI.features[0]}`,
            price: ESSAI.price,
            priceCurrency: "EUR",
            url: url("/tarifs"),
          },
        },
        ...WORKS.filter((w) => w.slug === PROOF?.slug).map((w) => videoNode(w, PATH)),
      ],
    }),
  component: HotelsRiads,
});

function HotelsRiads() {
  const facts = [
    {
      label: "Ce que nous faisons",
      value: "Vidéos des lieux, site avec réservation, publicité",
    },
    { label: "Pour qui", value: "Hôtels, riads, maisons d'hôtes et leurs restaurants" },
    { label: "Réalisation", value: "Le Petit Hôtel du Flouka, lac Lalla Takerkoust" },
    {
      label: "Où nous tournons",
      value: `${BRAND.city} et ses environs, Casablanca, Rabat, Tanger et Agadir`,
    },
    { label: "Délai", value: "Première vidéo livrée en 7 jours" },
    { label: "Objectif", value: "Des réservations en direct, sans commission" },
    { label: "Comptes publicitaires", value: "Ouverts à votre nom, accès administrateur complet" },
    {
      label: "Prix d'entrée",
      value: `${dirham(ESSAI.price)} (≈ ${euro(ESSAI.price)}), diffusion comprise`,
    },
  ];

  const prices = [{ pack: "essai" }, { pack: "production" }, { carte: "Site vitrine" }]
    .map(resolvePrice)
    .filter((p) => p !== null);

  const next = [
    {
      to: sectorPath("restauration-hospitality"),
      eyebrow: "Secteur",
      title: "Restauration & hospitality",
      text: "Restaurants, chefs, hôtels et lieux de loisirs : toutes nos réalisations du secteur.",
    },
    ...(["production-video-photo", "creation-site-web", "meta-ads"] as const).map((k) => {
      const o = findService(k)!;
      return { to: servicePath(o.slug), eyebrow: "Service", title: o.name, text: o.description };
    }),
    ...["reservations-directes-restaurant-riad-marrakech", "combien-coute-une-video-publicitaire"]
      .map(findArticle)
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
        eyebrow={`Hôtels et riads — ${BRAND.city}`}
        title="Donner envie de réserver chez vous, pas sur une plateforme."
        accent="chez vous"
        intro={INTRO}
        breadcrumbs={[{ name: NAME, path: PATH }]}
      />

      {/* ---------------- En bref ---------------- */}
      <Section>
        <SectionIntro
          eyebrow="En bref"
          title="Le lieu filmé, le site qui réserve, la publicité qui les montre."
          text="L'essentiel de l'offre, pour vous faire une idée en trente secondes — ou pour le citer."
        />
        <FactList facts={facts} />
      </Section>

      {/* ---------------- Ce qui fait réserver ---------------- */}
      <Section surface>
        <SectionIntro
          eyebrow="Ce qui fait réserver"
          title="Un voyageur choisit sa chambre sur un écran."
          text="Avant de comparer les prix, il compare des images. Celles qui montrent le lieu tel qu'on le vit font la différence."
        />
        <CardGrid
          items={[
            {
              title: "Montrer le lieu tel qu'on le vit",
              text: "La terrasse, la vue, le restaurant, la lumière du soir : une vidéo répond aux questions qu'une photo laisse ouvertes.",
            },
            {
              title: "Réserver sans intermédiaire",
              text: "La réservation intégrée au site, pour que les clients qui vous trouvent puissent réserver chez vous.",
            },
            {
              title: "Parler aux voyageurs étrangers",
              text: "Un site en plusieurs langues et des publicités ciblées sur les pays d'où viennent vos clients.",
            },
            {
              title: "Être vu avant le départ",
              text: "Vos vidéos diffusées sur Instagram, Facebook et TikTok auprès de ceux qui préparent leur séjour.",
            },
          ]}
        />
      </Section>

      {/* ---------------- Comment ---------------- */}
      <Section>
        <SectionIntro eyebrow="Comment nous travaillons" title="Du tournage aux réservations." />
        <Steps
          steps={[
            {
              title: "Visite et repérage",
              text: "Les chambres, les espaces communs, les meilleurs moments de lumière.",
            },
            {
              title: "Tournage et montage",
              text: "Sur place, en formats verticaux pour les réseaux et horizontaux pour le site.",
            },
            {
              title: "Site et réservation",
              text: "Un site rapide, avec la réservation intégrée et vos vidéos en vitrine.",
            },
            {
              title: "Diffusion",
              text: "Les vidéos diffusées en publicité, pilotées chaque semaine.",
            },
          ]}
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <BulletPanel
            title="Ce qui est compris"
            items={[
              "Repérage et tournage sur place",
              "Montage en formats verticaux et horizontaux",
              "Site avec réservation intégrée, sur devis",
              "Ouverture ou reprise du compte publicitaire",
              "Diffusion pilotée et rapport de performance",
            ]}
          />
          <BulletPanel
            title="Ce qui ne l'est jamais"
            items={[
              "Le budget publicitaire, versé directement à Meta depuis votre compte",
              "La propriété de vos comptes, de votre site et de vos fichiers : ils restent à vous",
            ]}
          />
        </div>
      </Section>

      {/* ---------------- La preuve ---------------- */}
      <Section surface>
        <SectionIntro
          eyebrow="Réalisations"
          title="Ce que nous avons tourné et construit."
          text="Le film du Petit Hôtel du Flouka, tourné au bord du lac Lalla Takerkoust, et des sites avec réservation intégrée."
        />
        <div className="mt-10">
          <WorkGrid items={WORKS} />
        </div>
        {SITES.length > 0 && (
          <div className="mt-10">
            <SiteGrid items={SITES} />
          </div>
        )}
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {PROOF && (
            <ArrowLink to={casePath(PROOF.slug)}>
              L&apos;étude de cas {PROOF.caseStudy.client}
            </ArrowLink>
          )}
          <ArrowLink to="/realisations">Toutes les réalisations</ArrowLink>
        </div>
      </Section>

      {/* ---------------- Tarifs ---------------- */}
      <Section>
        <SectionIntro
          eyebrow="Tarifs"
          title="Ce que ça coûte."
          text="Nos prix sont publics. Le budget publicitaire n'est jamais compris : il est versé directement aux plateformes."
        />
        <PriceRows rows={prices} />
      </Section>

      {/* ---------------- Pour aller plus loin ---------------- */}
      <Section surface>
        <SectionIntro eyebrow="Pour aller plus loin" title="Le détail, service par service." />
        <LinkCards items={next} />
      </Section>

      {/* ---------------- FAQ ---------------- */}
      <Section>
        <FaqList faq={FAQ} />
      </Section>

      <FinalCTA />
    </>
  );
}
