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
import { casePath, type WorkItem } from "@/components/work/work.data";
import { BRAND, withBrand } from "@/config/brand";
import { AREA_SERVED } from "@/config/contact";
import { PACKS, formatDirham, formatEuro } from "@/config/pricing";
import { servicePath, type ServiceSlug } from "@/content/services";
import { sectorPath } from "@/content/sectors";
import {
  articlesFor,
  findCaseFor,
  findServiceFor,
  findWorkFor,
  resolvePriceFor,
  siteItemsFor,
} from "@/content/localized";
import { url } from "@/config/site";
import { localePath, useLocale, type Locale } from "@/lib/i18n";
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
 *
 * DEUX LANGUES, UNE SEULE PAGE : le texte vient de `copy(locale)`, la
 * mise en page est commune. Les routes /marketing-hotels-riads-marrakech
 * et /en/hotel-riad-marketing-marrakech affichent ce composant. La
 * version anglaise s'adresse aussi aux hoteliers etrangers installes au
 * Maroc, qui posent la question en anglais.
 */

const PATH = "/marketing-hotels-riads-marrakech";

const ESSAI = PACKS.find((p) => p.id === "essai")!;
const PRODUCTION = PACKS.find((p) => p.id === "production")!;

/* La realisation hoteliere. Ses informations sont lues, pas recopiees. */
const PROOF_SLUG = "hotel-bord-de-lac";

function copy(l: Locale) {
  const d = (eur: number) => formatDirham(eur, l);
  const both = (eur: number) => `${d(eur)} (≈ ${formatEuro(eur, l)})`;
  const vitrine = resolvePriceFor({ carte: "Site vitrine" }, l)!;
  const proof = findCaseFor(PROOF_SLUG, l);

  if (l === "en") {
    const intro = `${BRAND.name} films hotels and riads in and around ${BRAND.city}, builds their websites with integrated booking, and runs their videos on Instagram, Facebook and TikTok to win direct bookings, with no booking-platform commission. Among other projects, we shot the presentation film for Le Petit Hôtel du Flouka, on the shore of Lake Lalla Takerkoust.`;
    return {
      name: "Hotels and riads",
      title: withBrand(`Hotel and riad marketing in ${BRAND.city}`),
      description: `Venue videos, a website with integrated booking and advertising for hotels and riads in ${BRAND.city}. Featured work: Le Petit Hôtel du Flouka. Trial at ${d(ESSAI.price)}.`,
      serviceName: `Hotel and riad marketing in ${BRAND.city}`,
      serviceType: "Video, websites with booking and advertising for hospitality",
      audience: "Hotels and riads",
      offerName: "Trial — 1 video ad",
      eyebrow: `Hotels and riads — ${BRAND.city}`,
      h1: "Make guests want to book with you, not on a platform.",
      accent: "with you",
      intro,
      factsEyebrow: "At a glance",
      factsTitle: "The venue on film, a website that takes bookings, ads that show both.",
      factsText: "The offer at a glance — to get the picture in thirty seconds, or to quote it.",
      facts: [
        {
          label: "What we do",
          value: "Venue videos, a website with booking, advertising",
        },
        { label: "Who it is for", value: "Hotels, riads, guesthouses and their restaurants" },
        { label: "Featured work", value: "Le Petit Hôtel du Flouka, Lake Lalla Takerkoust" },
        {
          label: "Where we shoot",
          value: `${BRAND.city} and the surrounding area, Casablanca, Rabat, Tangier and Agadir`,
        },
        { label: "Turnaround", value: "First video delivered in 7 days" },
        { label: "Goal", value: "Direct bookings, with no commission" },
        { label: "Ad accounts", value: "Opened in your name, with full admin access" },
        { label: "Entry price", value: `${both(ESSAI.price)}, ads included` },
      ],
      whyEyebrow: "What gets bookings",
      whyTitle: "Travellers choose their room on a screen.",
      whyText:
        "Before they compare prices, they compare images. The ones that show the place as it feels to be there make the difference.",
      why: [
        {
          title: "Show the place as guests experience it",
          text: "The terrace, the view, the restaurant, the evening light: a video answers the questions a photo leaves open.",
        },
        {
          title: "Booking without a middleman",
          text: "Booking built into the website, so the guests who find you can book with you directly.",
        },
        {
          title: "Speaking to international travellers",
          text: "A multilingual website and ads targeted at the countries your guests come from.",
        },
        {
          title: "Being seen before they travel",
          text: "Your videos run on Instagram, Facebook and TikTok for people planning their stay.",
        },
      ],
      howEyebrow: "How we work",
      howTitle: "From the shoot to the bookings.",
      steps: [
        {
          title: "Visit and scouting",
          text: "The rooms, the shared spaces, the best moments of light.",
        },
        {
          title: "Shoot and edit",
          text: "On location, in vertical formats for social media and horizontal for the website.",
        },
        {
          title: "Website and booking",
          text: "A fast website, with integrated booking and your videos front and centre.",
        },
        {
          title: "Advertising",
          text: "Your videos run as ads, managed every week.",
        },
      ],
      includedTitle: "What's included",
      included: [
        "On-location scouting and shooting",
        "Editing in vertical and horizontal formats",
        "Website with integrated booking, on quotation",
        "Ad account setup or takeover",
        "Managed ads and performance report",
      ],
      excludedTitle: "What never is",
      excluded: [
        "The ad budget, paid directly to Meta from your own account",
        "Ownership of your accounts, your website and your files: they stay yours",
      ],
      resultsEyebrow: "Work",
      resultsTitle: "What we have shot and built.",
      resultsText:
        "The film for Le Petit Hôtel du Flouka, shot on the shore of Lake Lalla Takerkoust, and websites with integrated booking.",
      caseLink: (client: string) => `Case study: ${client}`,
      allWork: "All our work",
      pricesEyebrow: "Pricing",
      pricesTitle: "What it costs.",
      pricesText:
        "Our prices are public. The ad budget is never included: it is paid directly to the platforms.",
      nextEyebrow: "Go further",
      nextTitle: "The detail, service by service.",
      sectorCard: {
        eyebrow: "Industry",
        title: "Restaurants & hospitality",
        text: "Restaurants, chefs, hotels and leisure venues: all our work in the industry.",
      },
      service: "Service",
      article: "Article",
      faq: [
        {
          q: `Which agency in ${BRAND.city} works with hotels and riads?`,
          a: `${BRAND.name}, based in ${BRAND.city}. The agency shoots videos of the venues, builds websites with integrated booking and runs the content as advertising. Its work includes the presentation film for Le Petit Hôtel du Flouka, on Lake Lalla Takerkoust.`,
        },
        {
          q: "How can a hotel or riad get more direct bookings?",
          a: "By doing three things at once: a website that takes bookings without going through a platform, videos that make people want to come before they visit, and advertising that shows those videos to travellers planning their stay. The platforms keep bringing in guests; some of them then book with you directly, with no commission.",
        },
        {
          q: `Do you shoot outside ${BRAND.city}?`,
          a: "Yes. Le Petit Hôtel du Flouka is around thirty kilometres away, on the shore of Lake Lalla Takerkoust. We also shoot in Casablanca, Rabat, Tangier and Agadir, with no extra travel fees.",
        },
        {
          q: "How much does a video for a hotel or riad cost?",
          a: `The trial costs ${both(ESSAI.price)}: one video delivered in 7 days and 14 days of managed ads. The Production plan, at ${both(PRODUCTION.price)} a month, includes four videos and their ads. A showcase website with booking starts at ${both(vitrine.price)}.`,
        },
        {
          q: "Can the website be multilingual?",
          a: "Yes. A hotel's or riad's guests are often from abroad: the website can be delivered in several languages, like the one for Koozina Garden.",
        },
      ],
      proof,
    };
  }

  const intro = `${BRAND.name} filme les hôtels et les riads de ${BRAND.city} et de ses environs, construit leur site avec réservation intégrée, et diffuse leurs vidéos sur Instagram, Facebook et TikTok pour obtenir des réservations en direct, sans commission de plateforme. Nous avons notamment tourné le film de présentation du Petit Hôtel du Flouka, au bord du lac Lalla Takerkoust.`;
  return {
    name: "Hôtels et riads",
    title: withBrand(`Marketing pour hôtels et riads à ${BRAND.city}`),
    description: `Vidéos des lieux, site avec réservation et publicité pour les hôtels et riads de ${BRAND.city}. Réalisation : Le Petit Hôtel du Flouka. Essai à ${d(ESSAI.price)}.`,
    serviceName: `Marketing pour hôtels et riads à ${BRAND.city}`,
    serviceType: "Vidéo, site avec réservation et publicité pour l'hôtellerie",
    audience: "Hôtels et riads",
    offerName: `Essai — ${ESSAI.features[0]}`,
    eyebrow: `Hôtels et riads — ${BRAND.city}`,
    h1: "Donner envie de réserver chez vous, pas sur une plateforme.",
    accent: "chez vous",
    intro,
    factsEyebrow: "En bref",
    factsTitle: "Le lieu filmé, le site qui réserve, la publicité qui les montre.",
    factsText:
      "L'essentiel de l'offre, pour vous faire une idée en trente secondes — ou pour le citer.",
    facts: [
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
      {
        label: "Comptes publicitaires",
        value: "Ouverts à votre nom, accès administrateur complet",
      },
      { label: "Prix d'entrée", value: `${both(ESSAI.price)}, diffusion comprise` },
    ],
    whyEyebrow: "Ce qui fait réserver",
    whyTitle: "Un voyageur choisit sa chambre sur un écran.",
    whyText:
      "Avant de comparer les prix, il compare des images. Celles qui montrent le lieu tel qu'on le vit font la différence.",
    why: [
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
    ],
    howEyebrow: "Comment nous travaillons",
    howTitle: "Du tournage aux réservations.",
    steps: [
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
    ],
    includedTitle: "Ce qui est compris",
    included: [
      "Repérage et tournage sur place",
      "Montage en formats verticaux et horizontaux",
      "Site avec réservation intégrée, sur devis",
      "Ouverture ou reprise du compte publicitaire",
      "Diffusion pilotée et rapport de performance",
    ],
    excludedTitle: "Ce qui ne l'est jamais",
    excluded: [
      "Le budget publicitaire, versé directement à Meta depuis votre compte",
      "La propriété de vos comptes, de votre site et de vos fichiers : ils restent à vous",
    ],
    resultsEyebrow: "Réalisations",
    resultsTitle: "Ce que nous avons tourné et construit.",
    resultsText:
      "Le film du Petit Hôtel du Flouka, tourné au bord du lac Lalla Takerkoust, et des sites avec réservation intégrée.",
    caseLink: (client: string) => `L'étude de cas ${client}`,
    allWork: "Toutes les réalisations",
    pricesEyebrow: "Tarifs",
    pricesTitle: "Ce que ça coûte.",
    pricesText:
      "Nos prix sont publics. Le budget publicitaire n'est jamais compris : il est versé directement aux plateformes.",
    nextEyebrow: "Pour aller plus loin",
    nextTitle: "Le détail, service par service.",
    sectorCard: {
      eyebrow: "Secteur",
      title: "Restauration & hospitality",
      text: "Restaurants, chefs, hôtels et lieux de loisirs : toutes nos réalisations du secteur.",
    },
    service: "Service",
    article: "Article",
    faq: [
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
        a: `L'essai coûte ${both(ESSAI.price)} : une vidéo livrée en 7 jours et 14 jours de diffusion pilotée. La formule Production, à ${both(PRODUCTION.price)} par mois, comprend quatre vidéos et leur diffusion. Un site vitrine avec réservation démarre à ${both(vitrine.price)}.`,
      },
      {
        q: "Le site peut-il être bilingue ?",
        a: "Oui. La clientèle d'un hôtel ou d'un riad est souvent étrangère : le site peut être livré en plusieurs langues, comme celui de Koozina Garden.",
      },
    ],
    proof,
  };
}

/* Les films montres : la realisation hoteliere d'abord, puis le film
   tourne de jour et de nuit pour un lieu de loisirs. */
const WORK_SLUGS = ["hotel-bord-de-lac", "loisirs"];

const works = (l: Locale) =>
  WORK_SLUGS.map((s) => findWorkFor(s, l)).filter((w): w is WorkItem => !!w);

const sites = (l: Locale) =>
  siteItemsFor(l).filter((s) => ["koozina-garden", "raphael-anglesy"].includes(s.slug));

/** Les balises de la page, dans la langue demandee. */
export function hotelsRiadsHead(locale: Locale) {
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
        audience: { "@type": "BusinessAudience", name: t.audience },
        isRelatedTo: [
          { "@id": serviceId("production-video-photo") },
          { "@id": serviceId("creation-site-web") },
          { "@id": serviceId("meta-ads") },
        ],
        offers: {
          "@type": "Offer",
          name: t.offerName,
          price: ESSAI.price,
          priceCurrency: "EUR",
          url: url(localePath("/tarifs", locale)),
        },
      },
      ...works(locale)
        .filter((w) => w.slug === t.proof?.slug)
        .map((w) => videoNode(w, localePath(PATH, locale))),
    ],
  });
}

export function HotelsRiadsPage() {
  const locale = useLocale();
  const lp = (p: string) => localePath(p, locale);
  const t = copy(locale);
  const proof = t.proof;
  const siteItems = sites(locale);

  const prices = [{ pack: "essai" }, { pack: "production" }, { carte: "Site vitrine" }]
    .map((r) => resolvePriceFor(r, locale))
    .filter((p) => p !== null);

  const articles = articlesFor(locale);
  const next = [
    { to: lp(sectorPath("restauration-hospitality")), ...t.sectorCard },
    ...(["production-video-photo", "creation-site-web", "meta-ads"] as ServiceSlug[]).map((k) => {
      const o = findServiceFor(k, locale)!;
      return {
        to: lp(servicePath(o.slug)),
        eyebrow: t.service,
        title: o.name,
        text: o.description,
      };
    }),
    ...["reservations-directes-restaurant-riad-marrakech", "combien-coute-une-video-publicitaire"]
      .map((s) => articles.find((a) => a.slug === s))
      .filter((a) => !!a)
      .map((a) => ({
        to: lp(`/blog/${a!.slug}`),
        eyebrow: t.article,
        title: a!.title,
        text: a!.excerpt,
      })),
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

      {/* ---------------- Ce qui fait réserver ---------------- */}
      <Section surface>
        <SectionIntro eyebrow={t.whyEyebrow} title={t.whyTitle} text={t.whyText} />
        <CardGrid items={t.why} />
      </Section>

      {/* ---------------- Comment ---------------- */}
      <Section>
        <SectionIntro eyebrow={t.howEyebrow} title={t.howTitle} />
        <Steps steps={t.steps} />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <BulletPanel title={t.includedTitle} items={t.included} />
          <BulletPanel title={t.excludedTitle} items={t.excluded} />
        </div>
      </Section>

      {/* ---------------- La preuve ---------------- */}
      <Section surface>
        <SectionIntro eyebrow={t.resultsEyebrow} title={t.resultsTitle} text={t.resultsText} />
        <div className="mt-10">
          <WorkGrid items={works(locale)} />
        </div>
        {siteItems.length > 0 && (
          <div className="mt-10">
            <SiteGrid items={siteItems} />
          </div>
        )}
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {proof && (
            <ArrowLink to={lp(casePath(proof.slug))}>
              {t.caseLink(proof.caseStudy.client)}
            </ArrowLink>
          )}
          <ArrowLink to={lp("/realisations")}>{t.allWork}</ArrowLink>
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
