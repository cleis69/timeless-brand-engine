/**
 * UltraVision Agency — les services, et leur page.
 *
 * ============================================================
 *  LA SEULE LISTE DE SERVICES DU SITE.
 * ============================================================
 *
 * Avant ce fichier, le site decoupait ses services de cinq facons
 * differentes : quatre poles sur l'accueil, quatre autres sur /services,
 * six expertises dans le pied de page, six besoins sur /contact, et les
 * groupes de /tarifs. Un moteur qui lisait le site ne savait pas ce que
 * l'agence vendait.
 *
 * Desormais : quatre poles, huit services, une page par service. Tout le
 * reste du site (accueil, pied de page, formulaire, donnees structurees,
 * llms.txt) lit cette liste.
 *
 * ------------------------------------------------------------
 *  REGLE DE REDACTION
 *
 *  Chaque phrase decrit ce que l'agence fait reellement : elle vient des
 *  tarifs, de la methode, des realisations ou des articles publies.
 *  Aucun chiffre, aucun client, aucun resultat n'est ajoute ici qui ne
 *  figure pas deja ailleurs sur le site.
 *
 *  Les prix ne sont JAMAIS ecrits en dur : ils sont lus dans
 *  src/config/pricing.ts, comme sur /tarifs.
 * ------------------------------------------------------------
 */

import { A_LA_CARTE, PACKS, dirham, euro } from "@/config/pricing";
import type { SectorSlug } from "./sectors";

export type ServiceSlug =
  | "production-video-photo"
  | "meta-ads"
  | "google-ads"
  | "tiktok-ads"
  | "generation-de-leads"
  | "creation-site-web"
  | "branding"
  | "crm-ia-automatisation";

export type PoleId = "marque-contenu" | "acquisition" | "web-applications" | "ia-automatisation";

/** Un prix affiche sur une page service, lu dans pricing.ts. */
export type PriceRef = { carte: string } | { pack: string };

export type Service = {
  slug: ServiceSlug;
  pole: PoleId;
  /** Nom court : menus, listes, liens. */
  name: string;
  /** Type de service declare dans les donnees structurees. */
  serviceType: string;
  /** Titre de la page, sans le nom de marque (ajoute automatiquement). */
  title: string;
  /** Description pour Google : 150 a 160 caracteres. */
  description: string;
  eyebrow: string;
  h1: string;
  /** Fragment du H1 colore en bleu. Doit figurer tel quel dans `h1`. */
  accent: string;
  /**
   * Premier paragraphe. Une definition autonome, qui se comprend sortie
   * de la page : c'est le passage que les assistants IA citent.
   */
  intro: string;
  includes: string[];
  useCases: { title: string; text: string }[];
  process: { title: string; text: string }[];
  prices: PriceRef[];
  /** Realisations video (slugs de work.data.ts). */
  works?: string[];
  /** Realisations web (slugs de sites.data.ts). */
  sites?: string[];
  /** Articles du blog (slugs de blog.ts). */
  articles?: string[];
  related: ServiceSlug[];
  sectors?: SectorSlug[];
  faq: { q: string; a: string }[];
};

/* ==========================================================================
 *  LES PRIX CITES DANS LES TEXTES
 *
 *  Lus dans pricing.ts au chargement : si un prix change la-bas, les
 *  phrases qui le citent changent avec lui.
 * ========================================================================== */

const carte = (label: string) => {
  for (const g of A_LA_CARTE) {
    const it = g.items.find((i) => i.label === label);
    if (it) return it.price;
  }
  throw new Error(`[services] Prestation introuvable dans pricing.ts : ${label}`);
};

const pack = (id: string) => {
  const p = PACKS.find((x) => x.id === id);
  if (!p) throw new Error(`[services] Formule introuvable dans pricing.ts : ${id}`);
  return p.price;
};

/** « 4 300 MAD (≈ 390 €) » */
const both = (eur: number) => `${dirham(eur)} (≈ ${euro(eur)})`;

const VIDEO = carte("Vidéo publicitaire");
const PHOTO = carte("Série photo");
const MEDIA = carte("Media buying");
const COMPTES = carte("Ouverture des comptes publicitaires");
const LANDING = carte("Landing page de conversion");
const VITRINE = carte("Site vitrine");
const SEO_TECH = carte("Référencement technique");
const IDENTITE = carte("Identité visuelle");
const POSITION = carte("Positionnement & message");
const CRM = carte("CRM et automatisation des leads");
const ESSAI = pack("essai");
const ACQUISITION = pack("acquisition");

/** Budget publicitaire de depart, tel qu'annonce sur /tarifs. */
const AD_BUDGET = `${dirham(800)} à ${dirham(1500)} par mois (800 à 1 500 €)`;

/* ==========================================================================
 *  LES QUATRE POLES
 * ========================================================================== */

export const POLES: {
  id: PoleId;
  n: string;
  title: string;
  text: string;
  services: ServiceSlug[];
}[] = [
  {
    id: "marque-contenu",
    n: "01",
    title: "Marque & Contenu",
    text: "Une identité lisible en trois secondes, et tous les contenus qui la font exister — photo, vidéo, motion, publicité.",
    services: ["production-video-photo", "branding"],
  },
  {
    id: "acquisition",
    n: "02",
    title: "Acquisition",
    text: "Un pilotage au coût par rendez-vous qualifié, pas au clic.",
    services: ["meta-ads", "google-ads", "tiktok-ads", "generation-de-leads"],
  },
  {
    id: "web-applications",
    n: "03",
    title: "Web & Applications",
    text: "Des interfaces rapides, sobres et pensées pour la conversion.",
    services: ["creation-site-web"],
  },
  {
    id: "ia-automatisation",
    n: "04",
    title: "IA & Automatisation",
    text: "Vos processus commerciaux exécutés sans friction, 24 h sur 24.",
    services: ["crm-ia-automatisation"],
  },
];

/* ==========================================================================
 *  LES HUIT SERVICES
 * ========================================================================== */

export const SERVICES: Service[] = [
  /* ---------------------------------------------------------------- 01 */
  {
    slug: "production-video-photo",
    pole: "marque-contenu",
    name: "Production vidéo & photo",
    serviceType: "Production de vidéos publicitaires et photographie",
    title: "Vidéo publicitaire et photo à Marrakech",
    description:
      "Vidéos publicitaires verticales, séries photo et contenus écrits, tournés et montés en interne par UltraVision Agency à Marrakech. Première vidéo en 7 jours.",
    eyebrow: "Production vidéo & photo",
    h1: "Des vidéos publicitaires et des photos pensées pour vendre, pas seulement pour plaire.",
    accent: "pensées pour vendre",
    intro:
      "La production vidéo et photo est le métier de base d'UltraVision Agency. Nous cherchons l'angle de vente, écrivons le script, tournons sur place — à Marrakech comme dans les autres villes où nous intervenons — puis montons des formats verticaux prêts pour Instagram, Facebook, TikTok et YouTube Shorts. Tout est produit en interne, de l'écriture au montage final.",
    includes: [
      "Recherche de l'angle de vente et écriture du script",
      "Tournage sur place : direction artistique, lumière, figuration",
      "Montage, sous-titres et habillage",
      "Formats verticaux pour Reels, Stories, TikTok et publicités",
      "Déclinaisons pour tester plusieurs accroches",
      "Séries photo : une demi-journée de tournage, 20 visuels retouchés",
      "Contenus longs : épisodes de podcast et vlogs",
      "Community management : ligne éditoriale, calendrier, publication, modération",
    ],
    useCases: [
      {
        title: "Lancer une campagne publicitaire",
        text: "Une vidéo par angle de vente, livrée avec ses déclinaisons, pour savoir vite ce qui déclenche des demandes.",
      },
      {
        title: "Alimenter vos réseaux chaque mois",
        text: "Quatre vidéos par mois : le rythme qui permet de remplacer une accroche avant qu'elle ne s'use.",
      },
      {
        title: "Montrer un lieu ou un produit",
        text: "Un bien, un institut, un restaurant : le lieu devient le sujet, filmé pour l'écran du téléphone.",
      },
      {
        title: "Installer une présence de marque",
        text: "Séries photo, podcast et vlog pour les contenus qui construisent la confiance dans la durée.",
      },
    ],
    process: [
      {
        title: "L'angle",
        text: "Nous cherchons ce qui fait acheter vos clients, puis l'écrivons en script court : une accroche, une preuve, une offre.",
      },
      {
        title: "Le tournage",
        text: "Une équipe réduite tourne sur place, en vertical dès la prise de vue : le cadre est composé pour le téléphone, pas recadré après coup.",
      },
      {
        title: "Le montage",
        text: "Rythme, sous-titres, habillage. L'IA nous aide au dérushage et aux sous-titres ; l'angle, les visages et le montage final restent humains.",
      },
      {
        title: "La diffusion",
        text: "Les vidéos sont livrées prêtes pour Meta, TikTok et Google. Nous pouvons aussi piloter leur diffusion et vous dire laquelle vend.",
      },
    ],
    prices: [
      { carte: "Vidéo publicitaire" },
      { carte: "Vidéo supplémentaire dans un pack" },
      { carte: "Série photo" },
      { carte: "Épisode de podcast" },
      { carte: "Vlog format long" },
      { carte: "Community management" },
      { pack: "essai" },
      { pack: "production" },
    ],
    works: [
      "africa-beauty",
      "all-in-kech",
      "institut-beaute",
      "promoteur-immobilier",
      "scultbody",
      "loisirs",
    ],
    articles: [
      "format-vertical-9-16",
      "pourquoi-quatre-videos-par-mois",
      "combien-coute-une-video-publicitaire",
      "ce-que-l-ia-fait-vraiment-dans-notre-production",
    ],
    related: ["meta-ads", "tiktok-ads", "branding"],
    sectors: ["immobilier", "beaute-bien-etre", "restauration-hospitality"],
    faq: [
      {
        q: "Combien coûte une vidéo publicitaire chez UltraVision Agency ?",
        a: `Une vidéo publicitaire coûte ${both(VIDEO)} à l'unité : angle, script, tournage, montage et formats verticaux. L'essai à ${both(ESSAI)} comprend la vidéo et 14 jours de diffusion pilotée. Le détail est publié sur la page tarifs.`,
      },
      {
        q: "En combien de temps une vidéo est-elle livrée ?",
        a: "Sept jours pour une vidéo publicitaire, de la validation de l'angle à la livraison des formats verticaux.",
      },
      {
        q: "Tournez-vous en dehors de Marrakech ?",
        a: "Oui. Nous tournons à Marrakech, Casablanca, Rabat, Tanger et Agadir, sans frais de déplacement supplémentaires.",
      },
      {
        q: "Les comédiens et les lieux sont-ils compris ?",
        a: "Non. Comédiens, mannequins, figurants et lieux de tournage payants sont chiffrés à part, avant le tournage.",
      },
      {
        q: "Combien coûte une séance photo ?",
        a: `Une série photo coûte ${both(PHOTO)} : une demi-journée de tournage et 20 visuels retouchés.`,
      },
    ],
  },

  /* ---------------------------------------------------------------- 02 */
  {
    slug: "meta-ads",
    pole: "acquisition",
    name: "Meta Ads",
    serviceType: "Gestion de campagnes publicitaires Meta Ads (Facebook et Instagram)",
    title: "Agence Meta Ads à Marrakech",
    description:
      "Campagnes Facebook et Instagram pilotées au coût par lead par UltraVision Agency, à Marrakech : vidéos produites en interne, comptes à votre nom, rapport mensuel.",
    eyebrow: "Meta Ads — Facebook & Instagram",
    h1: "Des campagnes Meta Ads pilotées au coût par lead, pas au clic.",
    accent: "au coût par lead",
    intro:
      "Meta Ads est la régie publicitaire de Facebook et d'Instagram. UltraVision Agency y diffuse les vidéos qu'elle produit elle-même, structure vos comptes et vos conversions, puis arbitre les budgets chaque semaine pour faire baisser le coût par lead et par rendez-vous. L'agence est basée à Marrakech et pilote des campagnes pour des entreprises installées au Maroc, y compris quand elles vendent à une clientèle étrangère.",
    includes: [
      "Ouverture ou reprise du compte publicitaire, du pixel et des conversions",
      "Campagnes structurées par étage du tunnel : découverte, preuve, offre",
      "Diffusion de vos vidéos, déclinées en plusieurs accroches",
      "Tests créatifs et arbitrage des budgets chaque semaine",
      "Suivi du coût par lead et par rendez-vous",
      "Rapport mensuel commenté",
    ],
    useCases: [
      {
        title: "Générer des demandes de rendez-vous",
        text: "Formulaire ou landing page : chaque demande arrive dans votre CRM, avec sa source.",
      },
      {
        title: "Toucher une clientèle étrangère",
        text: "Pour l'immobilier notamment : ciblage d'un marché étranger, sous-titres dans la langue visée.",
      },
      {
        title: "Faire connaître un lieu",
        text: "Salon, institut, lieu de loisirs : une audience locale et une accroche sur l'offre.",
      },
      {
        title: "Relancer ceux qui ont déjà vu",
        text: "Les personnes qui ont regardé vos vidéos reçoivent la preuve, puis l'offre.",
      },
    ],
    process: [
      {
        title: "Audit et installation",
        text: "Comptes, pixel, événements de conversion : on vérifie ce qui mesure avant de dépenser.",
      },
      {
        title: "Vidéos et accroches",
        text: "Quatre angles testés en parallèle : la preuve, l'émotion, l'offre, l'urgence.",
      },
      {
        title: "Lancement et tests",
        text: "Le budget se déplace vers les créations qui produisent des demandes, pas des likes.",
      },
      {
        title: "Pilotage",
        text: "Optimisation hebdomadaire, arbitrage des budgets et rapport mensuel commenté.",
      },
    ],
    prices: [
      { carte: "Media buying" },
      { carte: "Ouverture des comptes publicitaires" },
      { pack: "production" },
      { pack: "acquisition" },
    ],
    works: [
      "africa-beauty",
      "agent-immobilier",
      "promoteur-immobilier",
      "cosmetique",
      "institut-beaute",
      "residence-neuve",
    ],
    articles: [
      "tofu-mofu-bofu-video-publicitaire",
      "pourquoi-quatre-videos-par-mois",
      "format-vertical-9-16",
    ],
    related: ["tiktok-ads", "google-ads", "generation-de-leads", "production-video-photo"],
    sectors: ["immobilier", "beaute-bien-etre", "restauration-hospitality"],
    faq: [
      {
        q: "Quel budget publicitaire prévoir sur Meta ?",
        a: `Comptez ${AD_BUDGET} pour démarrer, selon votre secteur. Ce budget est versé directement à Meta depuis votre compte : il n'est jamais compris dans nos honoraires.`,
      },
      {
        q: "Combien coûte la gestion de campagnes Meta Ads ?",
        a: `Le pilotage est facturé ${both(MEDIA)} par mois et par plateforme. Les formules Production et Acquisition l'incluent, avec les vidéos.`,
      },
      {
        q: "Le compte publicitaire est-il à mon nom ?",
        a: "Oui. Les comptes publicitaires sont ouverts à votre nom, avec un accès administrateur complet. Si nous arrêtons de travailler ensemble, vous repartez avec tout.",
      },
      {
        q: "Comment mesurez-vous les résultats ?",
        a: "Au coût par lead et par rendez-vous, pas au clic. Un tableau de bord relie la dépense, les leads et les rendez-vous, et nous le commentons chaque mois.",
      },
    ],
  },

  /* ---------------------------------------------------------------- 03 */
  {
    slug: "google-ads",
    pole: "acquisition",
    name: "Google Ads",
    serviceType: "Gestion de campagnes Google Ads",
    title: "Agence Google Ads à Marrakech",
    description:
      "Campagnes Google Ads pour capter les personnes qui cherchent déjà votre service : structure, suivi des conversions et pilotage au coût par lead, depuis Marrakech.",
    eyebrow: "Google Ads — la demande existante",
    h1: "Google Ads : être trouvé au moment où l'on vous cherche.",
    accent: "au moment où l'on vous cherche",
    intro:
      "Google Ads permet d'apparaître en tête des résultats quand quelqu'un cherche déjà ce que vous vendez. Là où Meta et TikTok créent la demande avec la vidéo, Google la capte au moment de la recherche. UltraVision Agency structure vos campagnes, installe le suivi des conversions et pilote les enchères au coût par lead, en complément de vos campagnes vidéo.",
    includes: [
      "Ouverture ou reprise du compte Google Ads et du suivi des conversions",
      "Choix des recherches à acheter, et de celles à exclure",
      "Rédaction des annonces",
      "Page d'atterrissage dédiée quand l'offre le demande",
      "Arbitrage des enchères et des budgets chaque semaine",
      "Rapport mensuel commenté",
    ],
    useCases: [
      {
        title: "Un service que l'on cherche sur Google",
        text: "Quand vos clients tapent une demande précise, votre annonce apparaît au bon moment.",
      },
      {
        title: "Compléter une campagne vidéo",
        text: "Ceux que vos vidéos ont touchés finissent souvent par chercher votre nom : Google sécurise ce dernier clic.",
      },
      {
        title: "Savoir ce qui rapporte",
        text: "Chaque formulaire et chaque prise de contact est rattaché à la recherche qui l'a produit.",
      },
    ],
    process: [
      {
        title: "La demande",
        text: "Nous listons ce que vos clients tapent réellement, et ce qu'il ne faut pas payer.",
      },
      {
        title: "Structure et suivi",
        text: "Compte, conversions, page d'atterrissage : tout ce qui permet de mesurer.",
      },
      {
        title: "Lancement",
        text: "Annonces, enchères et budgets calibrés sur le coût par lead visé.",
      },
      {
        title: "Pilotage",
        text: "Optimisation hebdomadaire et rapport mensuel commenté.",
      },
    ],
    prices: [
      { carte: "Media buying" },
      { carte: "Ouverture des comptes publicitaires" },
      { carte: "Landing page de conversion" },
      { pack: "acquisition" },
    ],
    articles: ["tofu-mofu-bofu-video-publicitaire", "combien-coute-une-video-publicitaire"],
    related: ["meta-ads", "generation-de-leads", "creation-site-web"],
    sectors: ["immobilier", "restauration-hospitality"],
    faq: [
      {
        q: "Google Ads ou Meta Ads : lequel choisir ?",
        a: "Ils ne font pas le même travail. Google capte une demande qui existe déjà ; Meta et TikTok la créent avec la vidéo. La formule Acquisition combine les trois pour couvrir tout le parcours.",
      },
      {
        q: "Combien coûte la gestion Google Ads ?",
        a: `${both(MEDIA)} par mois, hors budget publicitaire versé à Google. L'ouverture du compte et du suivi des conversions est à ${both(COMPTES)}.`,
      },
      {
        q: "Faut-il une landing page ?",
        a: `Souvent, oui : une page dédiée à une offre convertit mieux qu'une page d'accueil généraliste. Nous la réalisons en 5 jours, pour ${both(LANDING)}.`,
      },
    ],
  },

  /* ---------------------------------------------------------------- 04 */
  {
    slug: "tiktok-ads",
    pole: "acquisition",
    name: "TikTok Ads",
    serviceType: "Gestion de campagnes publicitaires TikTok Ads",
    title: "Agence TikTok Ads à Marrakech",
    description:
      "Publicités TikTok tournées pour le format vertical et pilotées par UltraVision Agency, à Marrakech : accroches testées, diffusion et suivi du coût par résultat.",
    eyebrow: "TikTok Ads",
    h1: "TikTok Ads : des vidéos tournées pour le fil, pas recadrées.",
    accent: "tournées pour le fil",
    intro:
      "TikTok récompense les vidéos qui ressemblent à du contenu, pas à de la publicité. UltraVision Agency tourne directement en vertical, écrit des accroches pensées pour les premières secondes et pilote la diffusion sur TikTok Ads, souvent en parallèle de Meta.",
    includes: [
      "Ouverture du compte TikTok Ads, du pixel et des conversions",
      "Vidéos verticales tournées pour TikTok, sous-titrées",
      "Plusieurs accroches testées en parallèle",
      "Pilotage des budgets chaque semaine",
      "Renouvellement des vidéos avant qu'elles ne s'usent",
      "Rapport mensuel commenté",
    ],
    useCases: [
      {
        title: "Montrer un produit en quelques secondes",
        text: "Beauté, cosmétique, coiffure, loisirs : les métiers où le résultat se voit tout de suite.",
      },
      {
        title: "Tester des accroches",
        text: "Chaque vidéo est déclinée ; celles qui retiennent l'attention reçoivent le budget.",
      },
      {
        title: "Prolonger une campagne Meta",
        text: "Les mêmes angles, adaptés aux codes de TikTok, pour élargir l'audience.",
      },
    ],
    process: [
      {
        title: "Les accroches",
        text: "Les trois premières secondes décident de tout : on en écrit plusieurs.",
      },
      {
        title: "Le tournage vertical",
        text: "Cadrage, rythme et texte à l'écran pensés pour le téléphone dès la prise de vue.",
      },
      {
        title: "Lancement et tests",
        text: "Plusieurs vidéos en parallèle ; le budget suit celles qui produisent des résultats.",
      },
      {
        title: "Renouvellement",
        text: "Une accroche s'use en quelques semaines : nous la remplaçons avant que le coût ne remonte.",
      },
    ],
    prices: [
      { carte: "Media buying" },
      { carte: "Ouverture des comptes publicitaires" },
      { carte: "Vidéo publicitaire" },
      { pack: "production" },
    ],
    works: [
      "africa-beauty",
      "cosmetique",
      "salon-coiffure",
      "institut-beaute",
      "barber-shop",
      "loisirs",
    ],
    articles: [
      "format-vertical-9-16",
      "pourquoi-quatre-videos-par-mois",
      "tofu-mofu-bofu-video-publicitaire",
    ],
    related: ["meta-ads", "production-video-photo", "generation-de-leads"],
    sectors: ["beaute-bien-etre", "restauration-hospitality"],
    faq: [
      {
        q: "Faut-il des vidéos différentes pour TikTok ?",
        a: "Idéalement, oui : TikTok privilégie les vidéos au rythme et aux codes de la plateforme. Nous tournons en vertical dès la prise de vue et adaptons l'accroche à TikTok.",
      },
      {
        q: "Combien coûte la gestion TikTok Ads ?",
        a: `${both(MEDIA)} par mois, hors budget publicitaire versé à TikTok.`,
      },
      {
        q: "Combien de vidéos faut-il par mois ?",
        a: "Quatre, pour tester plusieurs accroches et remplacer celles qui s'usent. C'est le rythme de la formule Production.",
      },
    ],
  },

  /* ---------------------------------------------------------------- 05 */
  {
    slug: "generation-de-leads",
    pole: "acquisition",
    name: "Génération de leads",
    serviceType: "Génération de leads et acquisition de clients",
    title: "Génération de leads à Marrakech",
    description:
      "Un système complet pour générer des demandes qualifiées : vidéos, campagnes Meta, Google et TikTok, landing page et CRM. Conçu et piloté par UltraVision Agency.",
    eyebrow: "Génération de leads",
    h1: "Une machine à rendez-vous, de la vidéo jusqu'au CRM.",
    accent: "de la vidéo jusqu'au CRM",
    intro:
      "La génération de leads consiste à transformer l'attention en demandes de contact qualifiées. Chez UltraVision Agency, c'est un système complet : des vidéos qui arrêtent le défilement, des campagnes sur Meta, Google et TikTok, une page qui convertit et un CRM qui ne laisse filer aucune demande. Nous générons les demandes et les centralisons ; le suivi commercial reste chez vous.",
    includes: [
      "Vidéos publicitaires pour chaque étage du tunnel",
      "Campagnes Meta, Google et TikTok",
      "Landing page de conversion dédiée à l'offre",
      "Formulaires, notifications et relances automatiques",
      "CRM : pipeline et centralisation des demandes",
      "Tableau de bord : dépense, leads, rendez-vous",
    ],
    useCases: [
      {
        title: "Immobilier",
        text: "Captation d'acheteurs, y compris à l'étranger, pour un bien, une agence ou un programme.",
      },
      {
        title: "Prestations sur rendez-vous",
        text: "Instituts, salons, cabinets : chaque demande devient un créneau dans l'agenda.",
      },
      {
        title: "Lancement d'une offre",
        text: "Une page, une offre, une campagne : on sait vite si le marché répond.",
      },
    ],
    process: [
      {
        title: "L'offre",
        text: "Ce que l'on promet, à qui, et ce qui prouve que c'est vrai.",
      },
      {
        title: "Les contenus et les campagnes",
        text: "Des vidéos pour chaque étage du tunnel, diffusées là où se trouve votre clientèle.",
      },
      {
        title: "La page et le CRM",
        text: "Une page pensée pour le formulaire, et chaque demande rangée, notifiée, relancée.",
      },
      {
        title: "Le pilotage",
        text: "Arbitrage hebdomadaire au coût par rendez-vous, revue mensuelle avec la direction.",
      },
    ],
    prices: [
      { pack: "acquisition" },
      { carte: "Landing page de conversion" },
      { carte: "CRM et automatisation des leads" },
      { carte: "Media buying" },
    ],
    works: [
      "agent-immobilier",
      "promoteur-immobilier",
      "all-in-kech",
      "scultbody",
      "residence-neuve",
      "africa-beauty",
    ],
    articles: ["tofu-mofu-bofu-video-publicitaire", "pourquoi-quatre-videos-par-mois"],
    related: ["meta-ads", "google-ads", "crm-ia-automatisation", "creation-site-web"],
    sectors: ["immobilier", "beaute-bien-etre"],
    faq: [
      {
        q: "Qu'est-ce qu'un lead qualifié ?",
        a: "Une demande de contact d'une personne qui correspond à votre cible et à votre offre — pas un simple clic ou un nouvel abonné. Nous pilotons les campagnes sur ce critère.",
      },
      {
        q: "Qui répond aux demandes générées ?",
        a: "Vous. Nous générons les demandes et les centralisons dans votre CRM ; la réponse commerciale reste chez vous.",
      },
      {
        q: "Combien coûte un dispositif complet ?",
        a: `La formule Acquisition coûte ${both(ACQUISITION)} par mois, avec 3 mois d'engagement : quatre vidéos par mois, diffusion sur Meta, Google et TikTok, CRM, et landing page offerte.`,
      },
      {
        q: "Le budget publicitaire est-il compris ?",
        a: `Non, jamais. Il est versé directement aux plateformes depuis votre compte. Comptez ${AD_BUDGET} pour démarrer.`,
      },
    ],
  },

  /* ---------------------------------------------------------------- 06 */
  {
    slug: "creation-site-web",
    pole: "web-applications",
    name: "Sites web & applications",
    serviceType: "Création de sites web, landing pages et applications web",
    title: "Création de site web à Marrakech",
    description:
      "Sites vitrines, landing pages et applications web rapides, pensés pour la conversion, référencés sur Google et lisibles par les IA. Par UltraVision Agency à Marrakech.",
    eyebrow: "Sites web & applications",
    h1: "Des sites rapides, sobres et pensés pour la conversion.",
    accent: "pensés pour la conversion",
    intro:
      "UltraVision Agency conçoit des sites vitrines, des landing pages et des applications web pour les entreprises qui veulent transformer leurs visites en demandes. Chaque site est construit pour la vitesse, pensé d'abord pour le téléphone, référencé sur Google et structuré pour être compris par les assistants IA comme ChatGPT ou Perplexity.",
    includes: [
      "Landing pages de conversion, dédiées à une offre",
      "Sites vitrines jusqu'à 5 pages, responsive et optimisés pour la vitesse",
      "Applications web : réservation, prise de rendez-vous, formulaires avancés",
      "Référencement technique : structure, balises, données structurées, Search Console",
      "Suivi SEO mensuel et visibilité sur les IA (GEO)",
      "Connexion au CRM, suivi des conversions et tableaux de bord",
    ],
    useCases: [
      {
        title: "Recevoir des demandes",
        text: "Une landing page par offre, reliée à vos campagnes et à votre CRM.",
      },
      {
        title: "Présenter une activité haut de gamme",
        text: "Un site vitrine qui raconte, comme celui d'un chef ou d'une boutique de mobilier sur mesure.",
      },
      {
        title: "Réserver en ligne",
        text: "La réservation intégrée au site, pour un restaurant ou une prestation privée.",
      },
      {
        title: "Être cité par les IA",
        text: "Une structure et des contenus pensés pour ChatGPT, Perplexity et les résumés IA de Google.",
      },
    ],
    process: [
      {
        title: "Le cadrage",
        text: "Ce que le site doit obtenir — un appel, une réservation, un devis — et pour qui.",
      },
      {
        title: "La maquette et les contenus",
        text: "Textes, photos et vidéos pensés ensemble, avant la première ligne de code.",
      },
      {
        title: "Le développement",
        text: "Un site rapide, lisible sur téléphone et lisible par les moteurs.",
      },
      {
        title: "La mise en ligne et le suivi",
        text: "Search Console, suivi des conversions, puis améliorations mesurées.",
      },
    ],
    prices: [
      { carte: "Landing page de conversion" },
      { carte: "Site vitrine" },
      { carte: "Référencement technique" },
      { carte: "Suivi SEO mensuel" },
      { carte: "Visibilité sur les IA (GEO)" },
    ],
    sites: ["ideal-contemporain", "raphael-anglesy", "koozina-garden", "rev"],
    related: ["generation-de-leads", "crm-ia-automatisation", "branding"],
    sectors: ["restauration-hospitality", "immobilier"],
    faq: [
      {
        q: "Combien coûte un site vitrine ?",
        a: `À partir de ${both(VITRINE)} pour un site jusqu'à 5 pages. Une landing page de conversion coûte ${both(LANDING)}.`,
      },
      {
        q: "Quels sont les délais ?",
        a: "Cinq jours pour une landing page, trois semaines pour un site vitrine.",
      },
      {
        q: "Le référencement est-il compris ?",
        a: `Le référencement technique est une prestation distincte, à ${both(SEO_TECH)} : structure, balises, données structurées et Search Console. Le suivi SEO mensuel et la visibilité sur les IA sont proposés à part.`,
      },
    ],
  },

  /* ---------------------------------------------------------------- 07 */
  {
    slug: "branding",
    pole: "marque-contenu",
    name: "Branding & identité",
    serviceType: "Branding, identité visuelle et positionnement",
    title: "Branding et identité visuelle à Marrakech",
    description:
      "Positionnement, messages clés, logo et identité visuelle, direction artistique : une marque lisible en trois secondes et prête pour la publicité. Par UltraVision Agency.",
    eyebrow: "Branding & identité",
    h1: "Une marque lisible en trois secondes, qui déclenche quelque chose.",
    accent: "qui déclenche quelque chose",
    intro:
      "Pour UltraVision Agency, une identité n'existe pas sur une charte : elle existe dans ce qui la fait circuler. Le branding couvre le positionnement, les messages clés, l'identité visuelle et la direction artistique — pensés dès le départ pour la vidéo, les réseaux sociaux et la publicité.",
    includes: [
      "Positionnement et cadrage de l'offre",
      "Angles et messages clés",
      "Logo et identité visuelle : palette, typographies, règles d'usage",
      "Direction artistique photo et vidéo",
      "Motion design",
    ],
    useCases: [
      {
        title: "Lancer une marque",
        text: "Un nom qui existe déjà, une offre à clarifier : on pose ce que la marque promet et comment elle se montre.",
      },
      {
        title: "Repositionner une offre",
        text: "Quand le discours ne correspond plus à ce que vous vendez, ni à qui vous le vendez.",
      },
      {
        title: "Préparer une campagne",
        text: "Avant de tourner : savoir quoi dire, à qui, et comment le montrer.",
      },
    ],
    process: [
      {
        title: "L'écoute",
        text: "Votre offre, vos clients, vos concurrents, et ce que vous ne pouvez pas dire.",
      },
      {
        title: "Le positionnement",
        text: "Une promesse, des angles et des messages clés, écrits noir sur blanc.",
      },
      {
        title: "L'identité",
        text: "Logo, palette, typographies et règles d'usage, testés sur des formats réels.",
      },
      {
        title: "La mise en circulation",
        text: "La marque passe dans les vidéos, les réseaux, le site et les publicités.",
      },
    ],
    prices: [{ carte: "Identité visuelle" }, { carte: "Positionnement & message" }],
    related: ["production-video-photo", "creation-site-web", "meta-ads"],
    faq: [
      {
        q: "Combien coûte une identité visuelle ?",
        a: `${both(IDENTITE)} pour le logo, la palette, les typographies et les règles d'usage. Le positionnement et les messages clés coûtent ${both(POSITION)}.`,
      },
      {
        q: "Pourquoi relier la marque à la publicité ?",
        a: "Parce qu'une marque se juge à ce qu'elle déclenche. Nous construisons l'image et la performance dans le même mouvement, jamais dans deux silos.",
      },
      {
        q: "Qui dirige la direction artistique ?",
        a: "Julien, directeur artistique de l'agence : photographe et vidéaste depuis plus de dix ans, architecte d'intérieur de formation.",
      },
    ],
  },

  /* ---------------------------------------------------------------- 08 */
  {
    slug: "crm-ia-automatisation",
    pole: "ia-automatisation",
    name: "CRM, IA & automatisation",
    serviceType: "Intégration CRM, intelligence artificielle et automatisation commerciale",
    title: "CRM, IA et automatisation à Marrakech",
    description:
      "Mise en place du CRM, automatisation des leads et des relances, agents IA et tableaux de bord : aucune demande perdue entre le clic et l'appel. Par UltraVision Agency.",
    eyebrow: "CRM, IA & automatisation",
    h1: "Aucune demande perdue entre le clic et l'appel.",
    accent: "entre le clic et l'appel",
    intro:
      "Une campagne qui génère des demandes ne sert à rien si elles se perdent. UltraVision Agency met en place ou connecte votre CRM, automatise l'arrivée des leads, les notifications et les relances, et installe des outils d'intelligence artificielle là où ils font gagner du temps sans dégrader la relation avec vos clients.",
    includes: [
      "Mise en place ou connexion du CRM : pipeline, étapes, formulaires",
      "Automatisation des leads : notifications, attribution, relances",
      "Agents IA sur vos processus commerciaux",
      "Suivi des conversions et tableaux de bord",
      "Un tableau unique : dépense média, leads, rendez-vous, chiffre d'affaires signé",
    ],
    useCases: [
      {
        title: "Centraliser les demandes",
        text: "Formulaires du site et des publicités : tout arrive au même endroit, avec sa source.",
      },
      {
        title: "Relancer sans y penser",
        text: "Les relances partent seules, au bon moment, et personne n'est oublié.",
      },
      {
        title: "Piloter avec des chiffres",
        text: "Un tableau de bord relie la dépense, les leads, les rendez-vous et le chiffre d'affaires signé.",
      },
    ],
    process: [
      {
        title: "La cartographie",
        text: "Le chemin d'une demande, du clic jusqu'à la signature, et là où elle se perd aujourd'hui.",
      },
      {
        title: "L'installation",
        text: "CRM, formulaires, étapes du pipeline, droits d'accès.",
      },
      {
        title: "L'automatisation",
        text: "Notifications, relances et tâches répétitives confiées à la machine.",
      },
      {
        title: "Le suivi",
        text: "Tableaux de bord et revue mensuelle : on corrige ce que les chiffres montrent.",
      },
    ],
    prices: [{ carte: "CRM et automatisation des leads" }, { pack: "acquisition" }],
    articles: ["ce-que-l-ia-fait-vraiment-dans-notre-production"],
    related: ["generation-de-leads", "creation-site-web", "meta-ads"],
    faq: [
      {
        q: "Faut-il changer de CRM ?",
        a: "Pas forcément. Nous pouvons mettre en place un CRM ou connecter celui que vous utilisez déjà. Les abonnements logiciels restent à votre charge.",
      },
      {
        q: "Combien coûte la mise en place ?",
        a: `${both(CRM)} pour le CRM et l'automatisation des leads : pipeline, formulaires, notifications et relances.`,
      },
      {
        q: "Comment utilisez-vous l'intelligence artificielle ?",
        a: "Là où elle fait gagner du temps sur des tâches vérifiables. Les décisions qui engagent votre marque — l'angle, la promesse, la relation client — restent humaines.",
      },
    ],
  },
];

export const findService = (slug: string | undefined) => SERVICES.find((s) => s.slug === slug);

/** Les services d'un pole, dans l'ordre du pole. */
export const servicesOf = (pole: PoleId) =>
  POLES.find((p) => p.id === pole)!.services.map((s) => findService(s)!);

/** Adresse d'une page service. */
export const servicePath = (slug: ServiceSlug) => `/services/${slug}`;

/**
 * Resout un prix de pricing.ts pour l'affichage.
 * Renvoie null si la ligne n'existe plus : la page ne l'affiche pas.
 */
export function resolvePrice(ref: PriceRef) {
  if ("pack" in ref) {
    const p = PACKS.find((x) => x.id === ref.pack);
    if (!p) return null;
    return {
      label: `Formule ${p.name}`,
      detail: p.features.slice(0, 3).join(" · "),
      price: p.price,
      ...(p.period ? { unit: p.period } : {}),
      from: false,
    };
  }
  for (const g of A_LA_CARTE) {
    const it = g.items.find((i) => i.label === ref.carte);
    if (it) return { ...it, from: !!it.from };
  }
  return null;
}
