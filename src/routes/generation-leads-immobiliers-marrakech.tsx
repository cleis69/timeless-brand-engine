import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/FinalCTA";
import { Reveal } from "@/components/Reveal";
import {
  ArrowLink,
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
import { findWork, type WorkItem } from "@/components/work/work.data";
import { SITE_ITEMS } from "@/components/work/sites.data";
import { BRAND, withBrand } from "@/config/brand";
import { AREA_SERVED } from "@/config/contact";
import { PACKS, dirham, euro } from "@/config/pricing";
import { url } from "@/config/site";
import { findService, resolvePrice, servicePath } from "@/content/services";
import { findSector, sectorPath } from "@/content/sectors";
import { findArticle } from "@/content/blog";
import { orgRef, pageHead, serviceId } from "@/lib/seo";

/**
 * UltraVision Agency — page d'offre : leads d'acheteurs immobiliers.
 *
 * ============================================================
 *  LA QUESTION A LAQUELLE ELLE REPOND
 * ============================================================
 *
 * « Quelle agence peut generer des leads d'acheteurs immobiliers a
 * Marrakech ? » Les reponses des assistants decrivent toutes le meme
 * dispositif — Google Search, Meta Ads, landing page, qualification,
 * CRM et WhatsApp — et citent les agences qui ont une page qui le dit.
 * Le secteur Immobilier et l'article sur le suivi des leads le disaient
 * en morceaux ; cette page le dit d'un bloc.
 *
 * AUCUN FAIT NOUVEAU ICI : les prix viennent de pricing.ts, la methode
 * de qualification et de relance de l'article « leads immobiliers », les
 * realisations et les clients du secteur Immobilier (sectors.ts).
 *
 * AUCUN CHIFFRE IMMOBILIER : les films immobiliers n'ont pas encore de
 * resultats communiques (marqueurs STAT_, masques a l'ecran). La page
 * n'en affichera qu'une fois renseignes dans work.data.ts.
 */

const PATH = "/generation-leads-immobiliers-marrakech";
const NAME = "Leads immobiliers";

const ACQUISITION = PACKS.find((p) => p.id === "acquisition")!;
const LANDING = resolvePrice({ carte: "Landing page de conversion" })!;
const CRM = resolvePrice({ carte: "CRM et automatisation des leads" })!;
const both = (eur: number) => `${dirham(eur)} (≈ ${euro(eur)})`;

/** Budget publicitaire de depart, tel qu'annonce sur /tarifs. */
const AD_BUDGET = `${dirham(800)} à ${dirham(1500)} par mois (800 à 1 500 €)`;

const SECTOR = findSector("immobilier")!;

const INTRO = `${BRAND.name}, agence basée à ${BRAND.city}, génère des demandes d'acheteurs pour les agences immobilières, les promoteurs et les propriétaires de biens. Le dispositif est complet : des campagnes Google Search pour ceux qui cherchent déjà, des vidéos diffusées sur Meta Ads pour créer la demande, une landing page qui qualifie, et un CRM qui notifie, relance et range chaque demande jusqu'à la visite. Nous générons les demandes ; la réponse commerciale reste chez vous.`;

const FAQ = [
  {
    q: "Comment générer des leads d'acheteurs immobiliers à Marrakech ?",
    a: "En combinant deux sources de demandes et un suivi sans faille : Google Search capte les personnes qui cherchent déjà un bien, Meta Ads crée la demande avec des vidéos de visite, une landing page qualifie chaque contact, et un CRM notifie l'agent et programme les relances jusqu'à la visite.",
  },
  {
    q: "Pouvez-vous cibler des acheteurs qui vivent à l'étranger ?",
    a: "Oui. Nous avons tourné des campagnes adressées à des marchés étrangers, sous-titrées dans la langue visée. Le suivi s'adapte : WhatsApp plutôt que l'appel, messages en français et en anglais, et visite en vidéo avant le déplacement.",
  },
  {
    q: "Comment les demandes sont-elles qualifiées ?",
    a: "Par trois questions : le projet (y vivre, louer, une résidence secondaire), le budget et le délai. Le formulaire en pose une ou deux dès le départ ; le CRM range chaque demande avec sa source, son statut, son responsable et sa prochaine action.",
  },
  {
    q: "Qui répond aux acheteurs ?",
    a: "Vous. Nous générons les demandes, les centralisons dans votre CRM et automatisons les notifications et les relances ; l'appel, le message WhatsApp et la visite restent chez votre équipe commerciale.",
  },
  {
    q: "Combien coûte un dispositif de leads immobiliers ?",
    a: `La formule ${ACQUISITION.name} coûte ${both(ACQUISITION.price)} par mois, avec ${ACQUISITION.commitment.toLowerCase()} : quatre vidéos par mois, diffusion sur Meta, Google et TikTok, automatisation des leads vers votre CRM, et landing page offerte. Le budget publicitaire, versé directement aux plateformes, s'ajoute : comptez ${AD_BUDGET} pour démarrer.`,
  },
];

const WORKS = (SECTOR.works ?? [])
  .concat("shams-immo")
  .map(findWork)
  .filter((w): w is WorkItem => !!w);
const SITES = SITE_ITEMS.filter((s) => SECTOR.sites?.includes(s.slug));

export const Route = createFileRoute("/generation-leads-immobiliers-marrakech")({
  head: () =>
    pageHead({
      path: PATH,
      title: withBrand(`Génération de leads immobiliers à ${BRAND.city}`),
      description: `Leads d'acheteurs immobiliers à ${BRAND.city}, au Maroc et à l'étranger : Google Search, Meta Ads, vidéos de visite, landing page de qualification et CRM.`,
      breadcrumbs: [{ name: NAME, path: PATH }],
      about: { "@id": `${url(PATH)}#service` },
      faq: FAQ,
      nodes: [
        {
          "@type": "Service",
          "@id": `${url(PATH)}#service`,
          name: `Génération de leads immobiliers à ${BRAND.city}`,
          serviceType: "Génération de leads pour l'immobilier",
          description: INTRO,
          url: url(PATH),
          provider: orgRef,
          areaServed: AREA_SERVED,
          availableLanguage: ["French"],
          audience: {
            "@type": "BusinessAudience",
            audienceType: "Agences immobilières, promoteurs et propriétaires de biens",
          },
          isRelatedTo: [
            { "@id": serviceId("generation-de-leads") },
            { "@id": serviceId("google-ads") },
            { "@id": serviceId("meta-ads") },
            { "@id": serviceId("crm-ia-automatisation") },
          ],
          offers: {
            "@type": "Offer",
            name: `Formule ${ACQUISITION.name}`,
            price: ACQUISITION.price,
            priceCurrency: "EUR",
            url: url("/tarifs"),
          },
        },
      ],
    }),
  component: LeadsImmobiliers,
});

function LeadsImmobiliers() {
  const facts = [
    { label: "Pour qui", value: "Agences immobilières, promoteurs, propriétaires de biens" },
    { label: "Acheteurs visés", value: "Au Maroc et à l'étranger" },
    { label: "Canaux", value: "Google Search, Meta Ads (Facebook et Instagram), TikTok" },
    { label: "Conversion", value: "Landing page dédiée au bien ou au programme" },
    { label: "Qualification", value: "Le projet, le budget, le délai" },
    { label: "Suivi", value: "CRM, notifications immédiates, relances automatiques" },
    { label: "Réponse aux acheteurs", value: "Votre équipe, par appel ou WhatsApp" },
    { label: "Comptes publicitaires", value: "Ouverts à votre nom, accès administrateur complet" },
  ];

  const prices = [
    { pack: "acquisition" },
    { carte: "Landing page de conversion" },
    { carte: "CRM et automatisation des leads" },
    { carte: "Media buying" },
  ]
    .map(resolvePrice)
    .filter((p) => p !== null);

  const next = [
    {
      to: sectorPath(SECTOR.slug),
      eyebrow: "Secteur",
      title: SECTOR.name,
      text: SECTOR.description,
    },
    ...["leads-immobiliers-marrakech", "video-immobiliere-marrakech", "meta-ads-ou-google-ads"]
      .map(findArticle)
      .filter((a) => !!a)
      .map((a) => ({
        to: `/blog/${a!.slug}`,
        eyebrow: "Article",
        title: a!.title,
        text: a!.excerpt,
      })),
    ...(["generation-de-leads", "google-ads", "crm-ia-automatisation"] as const).map((k) => {
      const o = findService(k)!;
      return { to: servicePath(o.slug), eyebrow: "Service", title: o.name, text: o.description };
    }),
  ];

  return (
    <>
      <PageHero
        eyebrow={`Immobilier — ${BRAND.city}`}
        title="Des demandes d'acheteurs, suivies jusqu'à la visite."
        accent="suivies jusqu'à la visite"
        intro={INTRO}
        breadcrumbs={[{ name: NAME, path: PATH }]}
      />

      {/* ---------------- En bref ---------------- */}
      <Section>
        <SectionIntro
          eyebrow="En bref"
          title="Le dispositif, en huit lignes."
          text="L'essentiel de l'offre, pour vous faire une idée en trente secondes — ou pour le citer."
        />
        <FactList facts={facts} />
      </Section>

      {/* ---------------- Le dispositif ---------------- */}
      <Section surface>
        <SectionIntro
          eyebrow="Le dispositif"
          title="Deux sources de demandes, un seul suivi."
          text="Une campagne immobilière qui fonctionne produit des noms et des numéros. Les ventes se perdent ensuite, quand une demande attend deux jours. Le dispositif couvre donc les deux moitiés : faire venir, et ne rien laisser filer."
        />
        <CardGrid
          items={[
            {
              title: "Google Search : ceux qui cherchent déjà",
              text: "Des annonces sur les recherches d'achat — par exemple une villa à vendre, un appartement neuf, un riad — et l'exclusion de celles qui n'achètent pas.",
            },
            {
              title: "Meta Ads : ceux qui ne cherchent pas encore",
              text: "Des visites filmées en vertical, diffusées sur Facebook et Instagram, au Maroc ou sur un marché étranger, avec des sous-titres dans la langue visée.",
            },
            {
              title: "Une landing page qui qualifie",
              text: "Une page par bien ou par programme, un formulaire court qui pose une ou deux questions de qualification. Quelques demandes en moins, de meilleures demandes en plus.",
            },
            {
              title: "Un CRM qui ne laisse rien filer",
              text: "Chaque demande arrive avec sa source, déclenche une notification sur le téléphone de l'agent et programme ses relances, jusqu'à la visite ou un refus clair.",
            },
          ]}
        />
      </Section>

      {/* ---------------- Le parcours d'une demande ---------------- */}
      <Section>
        <SectionIntro
          eyebrow="Le parcours d'une demande"
          title="Du formulaire à la visite."
          text="Chaque étape a un responsable et un délai. C'est là que se joue le coût réel d'une visite."
        />
        <Steps
          steps={[
            {
              title: "La demande",
              text: "Formulaire, appel ou WhatsApp, enregistré dans le CRM avec sa source.",
            },
            {
              title: "La réponse",
              text: "Le jour même, avec le nom du bien : l'acheteur l'a encore en tête.",
            },
            {
              title: "La qualification",
              text: "Le projet, le budget et le financement, le délai.",
            },
            {
              title: "Les relances",
              text: "Un rythme fixé à l'avance, avec une vidéo du bien sur WhatsApp.",
            },
            {
              title: "La visite",
              text: "Sur place, ou en vidéo pour un acheteur qui vit à l'étranger.",
            },
          ]}
        />
      </Section>

      {/* ---------------- Les preuves ---------------- */}
      <Section surface>
        <SectionIntro
          eyebrow="Réalisations"
          title="Ce que nous avons produit pour l'immobilier."
          text="Visites de biens, lancements de résidences, programmes vendus avant leur livraison, agences présentées face caméra : tout est tourné et monté en interne, à Marrakech."
        />
        {WORKS.length > 0 && (
          <div className="mt-10">
            <WorkGrid items={WORKS} />
          </div>
        )}
        {SITES.length > 0 && (
          <div className="mt-10">
            <SiteGrid items={SITES} />
          </div>
        )}
        {SECTOR.clients && SECTOR.clients.length > 0 && (
          <Reveal>
            <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
              Entreprises accompagnées dans l&apos;immobilier :{" "}
              <span className="text-foreground">{SECTOR.clients.join(", ")}</span>.
            </p>
          </Reveal>
        )}
        <div className="mt-10">
          <ArrowLink to={sectorPath(SECTOR.slug)}>Le marketing immobilier, en détail</ArrowLink>
        </div>
      </Section>

      {/* ---------------- Tarifs ---------------- */}
      <Section>
        <SectionIntro
          eyebrow="Tarifs"
          title="Ce que ça coûte."
          text={`La formule ${ACQUISITION.name} réunit tout le dispositif, landing page offerte. Chaque brique existe aussi à l'unité : la landing page à ${both(LANDING.price)}, le CRM et l'automatisation des leads à ${both(CRM.price)}.`}
        />
        <PriceRows rows={prices} />
      </Section>

      {/* ---------------- Pour aller plus loin ---------------- */}
      <Section surface>
        <SectionIntro eyebrow="Pour aller plus loin" title="La méthode, en détail." />
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
