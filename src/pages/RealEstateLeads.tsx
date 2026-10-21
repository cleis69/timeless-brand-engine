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
import { type WorkItem } from "@/components/work/work.data";
import { BRAND, withBrand } from "@/config/brand";
import { AREA_SERVED } from "@/config/contact";
import { PACKS, formatDirham, formatEuro } from "@/config/pricing";
import { url } from "@/config/site";
import { servicePath, type ServiceSlug } from "@/content/services";
import { findSector, sectorPath } from "@/content/sectors";
import {
  articlesFor,
  findSectorFor,
  findServiceFor,
  findWorkFor,
  packsFor,
  resolvePriceFor,
  siteItemsFor,
} from "@/content/localized";
import { localePath, useLocale, type Locale } from "@/lib/i18n";
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
 *
 * DEUX LANGUES, UNE SEULE PAGE : le texte vient de `copy(locale)`, la
 * mise en page est commune. Les routes /generation-leads-immobiliers-…
 * et /en/real-estate-lead-generation-marrakech affichent ce composant.
 * La version anglaise s'adresse aussi aux acheteurs et investisseurs
 * etrangers qui posent la question en anglais.
 */

const PATH = "/generation-leads-immobiliers-marrakech";

const ACQUISITION = PACKS.find((p) => p.id === "acquisition")!;

/* Le secteur Immobilier : ses realisations, ses sites et ses clients. */
const SECTOR_SLUG = "immobilier";
const SECTOR_FR = findSector(SECTOR_SLUG)!;

function copy(l: Locale) {
  const d = (eur: number) => formatDirham(eur, l);
  const both = (eur: number) => `${d(eur)} (≈ ${formatEuro(eur, l)})`;
  const landing = resolvePriceFor({ carte: "Landing page de conversion" }, l)!;
  const crm = resolvePriceFor({ carte: "CRM et automatisation des leads" }, l)!;
  const pack = packsFor(l).find((p) => p.id === "acquisition")!;

  if (l === "en") {
    /** Starting ad budget, as stated on /pricing. */
    const adBudget = `${d(800)} to ${d(1500)} a month (€800 to €1,500)`;
    const intro = `${BRAND.name}, an agency based in ${BRAND.city}, generates buyer enquiries for real estate agencies, property developers and property owners. The system is complete: Google Search campaigns for people already looking, videos run on Meta Ads to create demand, a landing page that qualifies, and a CRM that notifies, follows up and files every enquiry until the viewing. We generate the enquiries; the sales conversation stays with you.`;
    return {
      name: "Real estate leads",
      title: withBrand(`Real estate lead generation in ${BRAND.city}`),
      description: `Property buyer leads in ${BRAND.city}, from Morocco and abroad: Google Search, Meta Ads, property tour videos, a qualifying landing page and a CRM.`,
      serviceName: `Real estate lead generation in ${BRAND.city}`,
      serviceType: "Lead generation for real estate",
      audienceType: "Real estate agencies, property developers and property owners",
      offerName: `${pack.name} plan`,
      eyebrow: `Real estate — ${BRAND.city}`,
      h1: "Buyer enquiries, followed through to the viewing.",
      accent: "followed through to the viewing",
      intro,
      factsEyebrow: "At a glance",
      factsTitle: "The system, in eight lines.",
      factsText: "The offer at a glance — to get the picture in thirty seconds, or to quote it.",
      facts: [
        {
          label: "Who it is for",
          value: "Real estate agencies, property developers, property owners",
        },
        { label: "Target buyers", value: "In Morocco and abroad" },
        { label: "Channels", value: "Google Search, Meta Ads (Facebook and Instagram), TikTok" },
        { label: "Conversion", value: "A landing page dedicated to the property or development" },
        { label: "Qualification", value: "The project, the budget, the timeframe" },
        { label: "Follow-up", value: "CRM, instant notifications, automated follow-ups" },
        { label: "Who replies to buyers", value: "Your team, by phone or WhatsApp" },
        { label: "Ad accounts", value: "Opened in your name, with full admin access" },
      ],
      systemEyebrow: "The system",
      systemTitle: "Two sources of enquiries, one follow-up.",
      systemText:
        "A property campaign that works produces names and phone numbers. Sales are lost afterwards, when an enquiry waits two days. So the system covers both halves: bringing buyers in, and letting nothing slip.",
      system: [
        {
          title: "Google Search: people already looking",
          text: "Ads on purchase searches — a villa for sale, a new-build flat, a riad, for example — and the exclusion of searches that don't lead to a purchase.",
        },
        {
          title: "Meta Ads: people not looking yet",
          text: "Vertical property tours run on Facebook and Instagram, in Morocco or in a foreign market, with subtitles in the target language.",
        },
        {
          title: "A landing page that qualifies",
          text: "One page per property or development, with a short form that asks one or two qualifying questions. A few fewer enquiries, and better ones.",
        },
        {
          title: "A CRM that lets nothing slip",
          text: "Every enquiry arrives with its source, triggers a notification on the agent's phone and schedules its follow-ups, until the viewing or a clear no.",
        },
      ],
      journeyEyebrow: "The journey of an enquiry",
      journeyTitle: "From the form to the viewing.",
      journeyText:
        "Every step has an owner and a deadline. That is where the real cost of a viewing is decided.",
      steps: [
        {
          title: "The enquiry",
          text: "A form, a call or a WhatsApp message, logged in the CRM with its source.",
        },
        {
          title: "The reply",
          text: "The same day, naming the property: the buyer still has it in mind.",
        },
        {
          title: "Qualification",
          text: "The project, the budget and financing, the timeframe.",
        },
        {
          title: "Follow-ups",
          text: "A pace set in advance, with a video of the property on WhatsApp.",
        },
        {
          title: "The viewing",
          text: "On site, or by video for a buyer who lives abroad.",
        },
      ],
      workEyebrow: "Work",
      workTitle: "What we have produced for real estate.",
      workText:
        "Property tours, residence launches, developments sold before completion, agencies presented on camera: everything is shot and edited in-house, in Marrakech.",
      clients: "Businesses we have worked with in real estate:",
      sectorLink: "Real estate marketing, in detail",
      pricesEyebrow: "Pricing",
      pricesTitle: "What it costs.",
      pricesText: `The ${pack.name} plan brings the whole system together, with the landing page included free. Each part is also available on its own: the landing page at ${both(landing.price)}, CRM and lead automation at ${both(crm.price)}.`,
      nextEyebrow: "Go further",
      nextTitle: "The method, in detail.",
      sector: "Industry",
      article: "Article",
      service: "Service",
      faq: [
        {
          q: `How do you generate property buyer leads in ${BRAND.city}?`,
          a: "By combining two sources of enquiries with watertight follow-up: Google Search captures people already looking for a property, Meta Ads creates demand with property tour videos, a landing page qualifies each contact, and a CRM notifies the agent and schedules follow-ups until the viewing.",
        },
        {
          q: "Can you target buyers who live abroad?",
          a: "Yes. We have shot campaigns aimed at foreign markets, subtitled in the target language. The follow-up adapts: WhatsApp rather than a phone call, messages in French and English, and a video tour before the buyer travels.",
        },
        {
          q: "How are enquiries qualified?",
          a: "With three questions: the project (to live in, to let, a second home), the budget and the timeframe. The form asks one or two from the start; the CRM files each enquiry with its source, status, owner and next action.",
        },
        {
          q: "Who replies to buyers?",
          a: "You do. We generate the enquiries, centralise them in your CRM and automate notifications and follow-ups; the call, the WhatsApp message and the viewing stay with your sales team.",
        },
        {
          q: "How much does a real estate lead generation system cost?",
          a: `The ${pack.name} plan costs ${both(ACQUISITION.price)} a month, with a three-month commitment: four videos a month, ads on Meta, Google and TikTok, lead automation into your CRM, and a free landing page. The ad budget, paid directly to the platforms, comes on top: allow ${adBudget} to start.`,
        },
      ],
    };
  }

  /** Budget publicitaire de depart, tel qu'annonce sur /tarifs. */
  const adBudget = `${d(800)} à ${d(1500)} par mois (800 à 1 500 €)`;
  const intro = `${BRAND.name}, agence basée à ${BRAND.city}, génère des demandes d'acheteurs pour les agences immobilières, les promoteurs et les propriétaires de biens. Le dispositif est complet : des campagnes Google Search pour ceux qui cherchent déjà, des vidéos diffusées sur Meta Ads pour créer la demande, une landing page qui qualifie, et un CRM qui notifie, relance et range chaque demande jusqu'à la visite. Nous générons les demandes ; la réponse commerciale reste chez vous.`;
  return {
    name: "Leads immobiliers",
    title: withBrand(`Génération de leads immobiliers à ${BRAND.city}`),
    description: `Leads d'acheteurs immobiliers à ${BRAND.city}, au Maroc et à l'étranger : Google Search, Meta Ads, vidéos de visite, landing page de qualification et CRM.`,
    serviceName: `Génération de leads immobiliers à ${BRAND.city}`,
    serviceType: "Génération de leads pour l'immobilier",
    audienceType: "Agences immobilières, promoteurs et propriétaires de biens",
    offerName: `Formule ${ACQUISITION.name}`,
    eyebrow: `Immobilier — ${BRAND.city}`,
    h1: "Des demandes d'acheteurs, suivies jusqu'à la visite.",
    accent: "suivies jusqu'à la visite",
    intro,
    factsEyebrow: "En bref",
    factsTitle: "Le dispositif, en huit lignes.",
    factsText:
      "L'essentiel de l'offre, pour vous faire une idée en trente secondes — ou pour le citer.",
    facts: [
      { label: "Pour qui", value: "Agences immobilières, promoteurs, propriétaires de biens" },
      { label: "Acheteurs visés", value: "Au Maroc et à l'étranger" },
      { label: "Canaux", value: "Google Search, Meta Ads (Facebook et Instagram), TikTok" },
      { label: "Conversion", value: "Landing page dédiée au bien ou au programme" },
      { label: "Qualification", value: "Le projet, le budget, le délai" },
      { label: "Suivi", value: "CRM, notifications immédiates, relances automatiques" },
      { label: "Réponse aux acheteurs", value: "Votre équipe, par appel ou WhatsApp" },
      {
        label: "Comptes publicitaires",
        value: "Ouverts à votre nom, accès administrateur complet",
      },
    ],
    systemEyebrow: "Le dispositif",
    systemTitle: "Deux sources de demandes, un seul suivi.",
    systemText:
      "Une campagne immobilière qui fonctionne produit des noms et des numéros. Les ventes se perdent ensuite, quand une demande attend deux jours. Le dispositif couvre donc les deux moitiés : faire venir, et ne rien laisser filer.",
    system: [
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
    ],
    journeyEyebrow: "Le parcours d'une demande",
    journeyTitle: "Du formulaire à la visite.",
    journeyText:
      "Chaque étape a un responsable et un délai. C'est là que se joue le coût réel d'une visite.",
    steps: [
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
    ],
    workEyebrow: "Réalisations",
    workTitle: "Ce que nous avons produit pour l'immobilier.",
    workText:
      "Visites de biens, lancements de résidences, programmes vendus avant leur livraison, agences présentées face caméra : tout est tourné et monté en interne, à Marrakech.",
    clients: "Entreprises accompagnées dans l'immobilier :",
    sectorLink: "Le marketing immobilier, en détail",
    pricesEyebrow: "Tarifs",
    pricesTitle: "Ce que ça coûte.",
    pricesText: `La formule ${ACQUISITION.name} réunit tout le dispositif, landing page offerte. Chaque brique existe aussi à l'unité : la landing page à ${both(landing.price)}, le CRM et l'automatisation des leads à ${both(crm.price)}.`,
    nextEyebrow: "Pour aller plus loin",
    nextTitle: "La méthode, en détail.",
    sector: "Secteur",
    article: "Article",
    service: "Service",
    faq: [
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
        a: `La formule ${ACQUISITION.name} coûte ${both(ACQUISITION.price)} par mois, avec ${ACQUISITION.commitment.toLowerCase()} : quatre vidéos par mois, diffusion sur Meta, Google et TikTok, automatisation des leads vers votre CRM, et landing page offerte. Le budget publicitaire, versé directement aux plateformes, s'ajoute : comptez ${adBudget} pour démarrer.`,
      },
    ],
  };
}

const works = (l: Locale) =>
  (SECTOR_FR.works ?? [])
    .concat("shams-immo")
    .map((s) => findWorkFor(s, l))
    .filter((w): w is WorkItem => !!w);

const sites = (l: Locale) => siteItemsFor(l).filter((s) => SECTOR_FR.sites?.includes(s.slug));

/** Les balises de la page, dans la langue demandee. */
export function realEstateLeadsHead(locale: Locale) {
  const t = copy(locale);
  return pageHead({
    locale,
    path: PATH,
    title: t.title,
    description: t.description,
    breadcrumbs: [{ name: t.name, path: PATH }],
    about: { "@id": `${url(PATH)}#service` },
    faq: t.faq,
    nodes: [
      {
        "@type": "Service",
        "@id": `${url(PATH)}#service`,
        name: t.serviceName,
        serviceType: t.serviceType,
        description: t.intro,
        url: url(localePath(PATH, locale)),
        provider: orgRef,
        areaServed: AREA_SERVED,
        availableLanguage: ["French", "English"],
        audience: {
          "@type": "BusinessAudience",
          audienceType: t.audienceType,
        },
        isRelatedTo: [
          { "@id": serviceId("generation-de-leads") },
          { "@id": serviceId("google-ads") },
          { "@id": serviceId("meta-ads") },
          { "@id": serviceId("crm-ia-automatisation") },
        ],
        offers: {
          "@type": "Offer",
          name: t.offerName,
          price: ACQUISITION.price,
          priceCurrency: "EUR",
          url: url(localePath("/tarifs", locale)),
        },
      },
    ],
  });
}

export function RealEstateLeadsPage() {
  const locale = useLocale();
  const lp = (p: string) => localePath(p, locale);
  const t = copy(locale);
  const sector = findSectorFor(SECTOR_SLUG, locale)!;
  const workItems = works(locale);
  const siteItems = sites(locale);

  const prices = [
    { pack: "acquisition" },
    { carte: "Landing page de conversion" },
    { carte: "CRM et automatisation des leads" },
    { carte: "Media buying" },
  ]
    .map((r) => resolvePriceFor(r, locale))
    .filter((p) => p !== null);

  const articles = articlesFor(locale);
  const next = [
    {
      to: lp(sectorPath(sector.slug)),
      eyebrow: t.sector,
      title: sector.name,
      text: sector.description,
    },
    ...["leads-immobiliers-marrakech", "video-immobiliere-marrakech", "meta-ads-ou-google-ads"]
      .map((s) => articles.find((a) => a.slug === s))
      .filter((a) => !!a)
      .map((a) => ({
        to: lp(`/blog/${a!.slug}`),
        eyebrow: t.article,
        title: a!.title,
        text: a!.excerpt,
      })),
    ...(["generation-de-leads", "google-ads", "crm-ia-automatisation"] as ServiceSlug[]).map(
      (k) => {
        const o = findServiceFor(k, locale)!;
        return {
          to: lp(servicePath(o.slug)),
          eyebrow: t.service,
          title: o.name,
          text: o.description,
        };
      },
    ),
  ];

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.h1}
        accent={t.accent}
        intro={t.intro}
        breadcrumbs={[{ name: t.name, path: lp(PATH) }]}
      />

      {/* ---------------- En bref ---------------- */}
      <Section>
        <SectionIntro eyebrow={t.factsEyebrow} title={t.factsTitle} text={t.factsText} />
        <FactList facts={t.facts} />
      </Section>

      {/* ---------------- Le dispositif ---------------- */}
      <Section surface>
        <SectionIntro eyebrow={t.systemEyebrow} title={t.systemTitle} text={t.systemText} />
        <CardGrid items={t.system} />
      </Section>

      {/* ---------------- Le parcours d'une demande ---------------- */}
      <Section>
        <SectionIntro eyebrow={t.journeyEyebrow} title={t.journeyTitle} text={t.journeyText} />
        <Steps steps={t.steps} />
      </Section>

      {/* ---------------- Les preuves ---------------- */}
      <Section surface>
        <SectionIntro eyebrow={t.workEyebrow} title={t.workTitle} text={t.workText} />
        {workItems.length > 0 && (
          <div className="mt-10">
            <WorkGrid items={workItems} />
          </div>
        )}
        {siteItems.length > 0 && (
          <div className="mt-10">
            <SiteGrid items={siteItems} />
          </div>
        )}
        {sector.clients && sector.clients.length > 0 && (
          <Reveal>
            <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
              {t.clients} <span className="text-foreground">{sector.clients.join(", ")}</span>.
            </p>
          </Reveal>
        )}
        <div className="mt-10">
          <ArrowLink to={lp(sectorPath(sector.slug))}>{t.sectorLink}</ArrowLink>
        </div>
      </Section>

      {/* ---------------- Tarifs ---------------- */}
      <Section>
        <SectionIntro eyebrow={t.pricesEyebrow} title={t.pricesTitle} text={t.pricesText} />
        <PriceRows rows={prices} />
      </Section>

      {/* ---------------- Pour aller plus loin ---------------- */}
      <Section surface>
        <SectionIntro eyebrow={t.nextEyebrow} title={t.nextTitle} />
        <LinkCards items={next} />
      </Section>

      {/* ---------------- FAQ ---------------- */}
      <Section>
        <FaqList faq={t.faq} />
      </Section>

      <FinalCTA />
    </>
  );
}
