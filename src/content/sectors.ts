/**
 * UltraVision Agency — les secteurs, et leur page.
 *
 * ============================================================
 *  UNE PAGE SECTEUR N'EXISTE QUE SI DES PREUVES EXISTENT.
 * ============================================================
 *
 * Trois secteurs ont une page, parce que le site montre deja des
 * realisations reelles pour chacun :
 *
 *   immobilier                 4 films, 1 site, 2 clients cites
 *   beaute-bien-etre           6 films, 1 client cite
 *   restauration-hospitality   2 sites, 1 film, 1 client cite
 *
 * Le luxe, l'hotellerie « pure » ou les services aux entreprises n'ont
 * pas de page : aucune realisation publiable ne les illustre encore.
 * Une page secteur sans preuve est une page de mots-cles, et c'est
 * exactement ce que ce site refuse de publier.
 *
 * Pour ouvrir un secteur : ajouter ses realisations dans work.data.ts ou
 * sites.data.ts, puis un bloc ici.
 */

import type { ServiceSlug } from "./services";

export type SectorSlug = "immobilier" | "beaute-bien-etre" | "restauration-hospitality";

export type Sector = {
  slug: SectorSlug;
  /** Nom court : menus, listes, liens. */
  name: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  accent: string;
  intro: string;
  /** Ce qui fait vendre dans ce secteur, et ce que nous y faisons. */
  challenges: { title: string; text: string }[];
  services: ServiceSlug[];
  works?: string[];
  sites?: string[];
  /** Entreprises du secteur deja citees sur le site (bandeau clients). */
  clients?: string[];
  faq: { q: string; a: string }[];
};

export const SECTORS: Sector[] = [
  {
    slug: "immobilier",
    name: "Immobilier",
    title: "Marketing immobilier à Marrakech",
    description:
      "Vidéos de visite, campagnes Meta pour capter des acheteurs au Maroc et à l'étranger, landing pages et CRM : le marketing immobilier d'UltraVision Agency, à Marrakech.",
    eyebrow: "Secteur — Immobilier",
    h1: "Marketing immobilier : faire visiter un bien avant la visite.",
    accent: "avant la visite",
    intro:
      "L'immobilier est l'un des secteurs où UltraVision Agency tourne le plus : visites de biens, lancements de résidences, programmes de villas vendus avant leur livraison, agences présentées face caméra. Nous produisons ces vidéos sur place, à Marrakech et dans les villes où nous intervenons, puis nous les diffusons pour capter des acheteurs — y compris à l'étranger.",
    challenges: [
      {
        title: "Montrer le lieu, pas seulement les photos",
        text: "Une visite filmée en vertical répond aux questions avant le premier appel.",
      },
      {
        title: "Vendre ce qui n'existe pas encore",
        text: "Pour un programme en construction : le quartier, les commerces, les parties communes, le cadre de vie.",
      },
      {
        title: "Toucher des acheteurs étrangers",
        text: "Tournage sur place, sous-titres dans la langue du marché visé, diffusion ciblée à l'international.",
      },
      {
        title: "Ne perdre aucun acheteur",
        text: "Formulaires, CRM et relances : chaque demande est suivie jusqu'à la visite.",
      },
    ],
    services: [
      "production-video-photo",
      "meta-ads",
      "generation-de-leads",
      "creation-site-web",
      "crm-ia-automatisation",
    ],
    works: ["all-in-kech", "agent-immobilier", "promoteur-immobilier", "residence-neuve"],
    sites: ["rev"],
    clients: ["All In Kech", "Centralym Immobilier"],
    faq: [
      {
        q: "Tournez-vous des visites de biens à Marrakech ?",
        a: "Oui, c'est l'un de nos formats les plus fréquents : la visite du bien, présentée face caméra ou filmée en ambiance, tournée en vertical sur place.",
      },
      {
        q: "Pouvez-vous cibler des acheteurs à l'étranger ?",
        a: "Oui. Nous avons tourné des campagnes adressées à des marchés étrangers, sous-titrées dans la langue visée, pour des agents immobiliers et des promoteurs.",
      },
      {
        q: "Et pour un programme encore en construction ?",
        a: "On filme ce qui existe déjà : le quartier, les commerces, les parties communes, le cadre de vie. Le plan vient ensuite.",
      },
    ],
  },
  {
    slug: "beaute-bien-etre",
    name: "Beauté & bien-être",
    title: "Marketing beauté et bien-être à Marrakech",
    description:
      "Vidéos publicitaires et campagnes Meta et TikTok pour salons, instituts, barbiers, marques cosmétiques et remise en forme, par UltraVision Agency à Marrakech.",
    eyebrow: "Secteur — Beauté & bien-être",
    h1: "Le geste et le résultat, filmés pour remplir l'agenda.",
    accent: "pour remplir l'agenda",
    intro:
      "Salons de coiffure, instituts, barbiers, marques cosmétiques, remise en forme : la beauté et le bien-être forment le secteur le plus représenté dans les réalisations d'UltraVision Agency. Ces métiers se vendent par le geste et par le résultat — exactement ce qu'une vidéo verticale montre en quelques secondes.",
    challenges: [
      {
        title: "Montrer le geste",
        text: "Gros plans, lumière chaude, rythme : le savoir-faire se voit avant de se raconter.",
      },
      {
        title: "Faire du lieu le sujet",
        text: "Du fauteuil à l'espace soin, une visite guidée rassure avant le premier rendez-vous.",
      },
      {
        title: "Montrer un produit en usage",
        text: "Du geste d'application au résultat, en conditions réelles, sans voix off.",
      },
      {
        title: "Convertir, pas seulement plaire",
        text: "Des créations pensées pour alimenter un tunnel d'acquisition complet.",
      },
    ],
    services: ["production-video-photo", "meta-ads", "tiktok-ads", "generation-de-leads"],
    works: [
      "africa-beauty",
      "scultbody",
      "institut-beaute",
      "salon-coiffure",
      "cosmetique",
      "barber-shop",
    ],
    clients: ["The Kop Barber"],
    faq: [
      {
        q: "Quels résultats avez-vous obtenus dans la beauté ?",
        a: "Pour Africa Beauty : 1,4 million de vues, 4,2 % de taux de clic et +38 % de ventes. Pour Scultbody : 890 000 vues, un coût par lead de 2,10 € et +52 % de conversions. Chiffres relevés dans les gestionnaires de publicités.",
      },
      {
        q: "Tournez-vous dans mon salon ou mon institut ?",
        a: "Oui, sur place, à Marrakech et dans les villes où nous intervenons. Le lieu fait partie du message.",
      },
      {
        q: "Quelles plateformes privilégier ?",
        a: "Meta et TikTok, où ces métiers se montrent le mieux en vidéo verticale. La plupart de nos campagnes beauté y sont diffusées.",
      },
    ],
  },
  {
    slug: "restauration-hospitality",
    name: "Restauration & hospitality",
    title: "Marketing restaurants et hôtels à Marrakech",
    description:
      "Sites avec réservation, vidéos et campagnes pour restaurants, chefs, hôtels, riads et lieux de loisirs : le marketing hospitality d'UltraVision Agency à Marrakech.",
    eyebrow: "Secteur — Restauration & hospitality",
    h1: "Donner envie de réserver, avant même d'avoir goûté.",
    accent: "de réserver",
    intro:
      "Un restaurant, un chef, un hôtel ou un lieu de loisirs se choisit sur écran avant de se choisir sur place. UltraVision Agency conçoit les sites avec réservation intégrée, filme les lieux et les gestes, et diffuse ces contenus pour remplir les tables et les agendas.",
    challenges: [
      {
        title: "Être choisi sur écran",
        text: "Photos, vidéos et site doivent donner envie en quelques secondes, sur un téléphone.",
      },
      {
        title: "Réserver sans friction",
        text: "La réservation intégrée au site, sans détour par un intermédiaire.",
      },
      {
        title: "Parler à plusieurs publics",
        text: "Un site bilingue pour la clientèle locale et la clientèle de passage.",
      },
      {
        title: "Montrer l'ambiance",
        text: "Un lieu filmé de jour et de nuit montre ses deux visages.",
      },
    ],
    services: ["creation-site-web", "production-video-photo", "meta-ads", "tiktok-ads", "branding"],
    works: ["loisirs"],
    sites: ["koozina-garden", "raphael-anglesy"],
    clients: ["Koozina Garden"],
    faq: [
      {
        q: "Pouvez-vous intégrer la réservation au site ?",
        a: "Oui. Les sites de Koozina Garden, restaurant et boutique à Essaouira, et du chef Raphaël Anglesy intègrent la réservation directement.",
      },
      {
        q: "Faites-vous des sites bilingues ?",
        a: "Oui, comme celui de Koozina Garden : la carte, le jardin, la boutique et les événements, dans deux langues.",
      },
      {
        q: "Travaillez-vous avec des hôtels et des riads ?",
        a: "Oui : sites avec réservation, vidéos des lieux et campagnes publicitaires s'appliquent aux hôtels et aux riads comme aux restaurants. Parlez-nous de votre établissement.",
      },
    ],
  },
];

export const findSector = (slug: string | undefined) => SECTORS.find((s) => s.slug === slug);

export const sectorPath = (slug: SectorSlug) => `/secteurs/${slug}`;
