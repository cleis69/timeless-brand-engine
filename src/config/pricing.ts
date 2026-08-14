/**
 * ULTRA VISION — la grille tarifaire.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/config/pricing.ts
 *
 *  C'EST LE SEUL FICHIER A MODIFIER POUR CHANGER UN PRIX.
 *  La page /tarifs se reconstruit toute seule a partir d'ici.
 * ============================================================
 *
 * TOUT EST EN EUROS HORS TAXES.
 *
 * Les clients sont des entreprises francaises : elles raisonnent en HT,
 * la TVA leur etant recuperable. Afficher du TTC a un professionnel
 * gonfle le prix percu d'un cinquieme pour rien.
 *
 * ------------------------------------------------------------
 * L'OFFRE DE LANCEMENT : A LIRE AVANT DE LA LAISSER EN PLACE
 *
 * Les -20 % sont affiches partout ou un prix apparait. C'est efficace
 * pour ouvrir un carnet de commandes, mais une remise permanente cesse
 * d'etre une remise : au bout de quelques mois, le marche considere que
 * le prix reel est le prix remise, et le prix barre ne trompe plus
 * personne.
 *
 * C'est exactement ce qui s'est produit sur les devis precedents :
 * -35 %, -40 %, -47 %, sur chaque document. Plus aucun client ne
 * payait le prix affiche.
 *
 * Deux precautions, donc :
 *
 *  1. `LAUNCH_OFFER.until` affiche une date de fin. Une remise datee
 *     est une raison d'agir ; une remise permanente est un prix.
 *  2. `LAUNCH_OFFER.enabled` la coupe entierement le jour venu. Les
 *     prix pleins reprennent partout, sans autre modification.
 *
 * La remise ne s'applique qu'a la PREMIERE commande. C'est ce qui la
 * distingue d'une baisse de prix.
 * ------------------------------------------------------------
 */

export const LAUNCH_OFFER = {
  /** Passe a false pour retirer la remise de tout le site. */
  enabled: true,
  /** Pourcentage entier. */
  percent: 20,
  /** Texte court affiche sur les pastilles. */
  badge: "-20 % sur votre première commande",
  /**
   * Date de fin, affichee en petit sous la grille.
   * Laisse une chaine vide pour ne rien afficher — mais lis l'avertissement
   * ci-dessus avant de le faire.
   */
  until: "Offre de lancement, valable jusqu'au 31 décembre 2026.",
} as const;

/**
 * Arrondi psychologique.
 *
 * LE DEFAUT QUE CETTE FONCTION CORRIGE
 *
 * La remise de 20 % produisait des montants calcules : 392 €, 1 192 €,
 * 1 992 €, 712 €. Ces nombres ont un defaut qu'on ne remarque pas
 * consciemment mais qui se paie : ils annoncent au visiteur qu'ils
 * sortent d'une multiplication.
 *
 * Un prix qui ressemble a un resultat de calcul est percu comme
 * negociable — puisqu'il vient manifestement d'une formule, une autre
 * formule pourrait donner moins. Un prix pose, lui, se discute mal.
 *
 * On ramene donc chaque montant remise a la dizaine la plus proche :
 * 392 devient 390, 1 992 devient 1 990. La perte est de quelques euros,
 * le gain est que le prix redevient une decision et non un quotient.
 */
const charm = (n: number) => Math.round(n / 10) * 10;

/** Applique la remise si elle est active, puis l'arrondi psychologique. */
export const withOffer = (price: number) =>
  LAUNCH_OFFER.enabled ? charm(price * (1 - LAUNCH_OFFER.percent / 100)) : price;

/** Formate un montant : 1490 -> « 1 490 € ». Espace insecable avant l'euro. */
export const euro = (n: number) => `${n.toLocaleString("fr-FR")} €`;

/* ==========================================================================
 *  LES TROIS FORMULES
 * ========================================================================== */

export type Pack = {
  id: string;
  name: string;
  /** Une phrase : a qui ca s'adresse. */
  forWho: string;
  price: number;
  /** Suffixe affiche apres le prix. */
  period?: string;
  /** Engagement, ou absence d'engagement. Toujours dit explicitement. */
  commitment: string;
  /** Delai de livraison, quand il est connu. */
  delay?: string;
  features: string[];
  /** Ce qui est offert, affiche en bleu. */
  bonus?: string;
  /**
   * DECOMPOSITION — le levier le plus efficace de la page.
   *
   * « 1 490 € par mois » est un montant que le lecteur doit accepter en
   * bloc. « soit 372 € la video » est un montant qu'il peut comparer a
   * ce qu'il connait. Ramener un prix a son unite la plus petite le
   * rend evaluable, et un prix evaluable parait toujours plus juste
   * qu'un prix global.
   *
   * C'est aussi la seule facon de faire sentir la remise de volume sans
   * l'annoncer : le visiteur fait la soustraction lui-meme avec le prix
   * unitaire publie plus bas, et une conclusion qu'on tire soi-meme ne
   * se conteste pas.
   */
  equivalent?: string;
  /**
   * ANCRAGE — ce que couterait le meme perimetre a l'unite.
   *
   * Affiche barre a cote du prix de la formule. Le montant doit
   * correspondre exactement a la somme des prestations a la carte
   * equivalentes, sinon l'ancrage devient un mensonge verifiable en
   * trois lignes sur la meme page.
   */
  anchor?: number;
  /** La formule mise en avant. Une seule. */
  featured?: boolean;
  /**
   * Passe a true pour exclure cette formule de la remise de lancement.
   *
   * A CONSIDERER SERIEUSEMENT POUR « ACQUISITION ».
   *
   * Une remise sur un abonnement de 2 490 € affiche un prix barre tres
   * visible. Le risque n'est pas de perdre 498 € le premier mois : c'est
   * que le client arrive au deuxieme mois avec le sentiment d'une
   * augmentation de 25 %, alors qu'il paie simplement le prix normal.
   *
   * Une remise fonctionne bien sur un achat unique — l'essai, une
   * prestation a l'unite. Sur un abonnement, elle deplace juste le
   * probleme d'un mois.
   */
  noOffer?: boolean;
  cta: string;
};

export const PACKS: Pack[] = [
  {
    id: "essai",
    name: "Essai",
    forWho: "Pour juger sur pièce avant de vous engager.",
    price: 490,
    commitment: "Sans engagement",
    delay: "Livrée en 7 jours",
    features: [
      "1 vidéo publicitaire",
      "Écriture de l'angle et du script",
      "Tournage et montage",
      "Formats verticaux Reels, Stories et Ads",
      "14 jours de diffusion pilotée",
      "Rapport de performance à 14 jours",
    ],
    /* 340 € la vidéo + 490 € le media buying mensuel, au prorata de 14 jours. */
    anchor: 585,
    cta: "Commander un essai",
  },
  {
    id: "production",
    name: "Production",
    forWho: "Pour alimenter une plateforme en continu.",
    price: 1490,
    period: "/ mois",
    commitment: "Sans engagement",
    features: [
      "4 vidéos publicitaires par mois",
      "4 angles testés : preuve, émotion, offre, urgence",
      "Diffusion pilotée sur une plateforme",
      "Optimisation hebdomadaire des campagnes",
      "Rapport mensuel commenté",
      "Un interlocuteur unique",
    ],
    equivalent: "soit 372 € la vidéo, diffusion comprise",
    /* 4 vidéos à 340 € = 1 360 €, plus 490 € de media buying. */
    anchor: 1850,
    cta: "Démarrer la production",
  },
  {
    id: "acquisition",
    name: "Acquisition",
    forWho: "Pour construire une machine à rendez-vous.",
    price: 2490,
    period: "/ mois",
    commitment: "3 mois d'engagement",
    features: [
      "4 vidéos publicitaires par mois",
      "Diffusion multicanale : Meta, Google et TikTok",
      "Structuration complète des comptes et du suivi",
      "Automatisation des leads vers votre CRM",
      "Optimisation hebdomadaire et arbitrage des budgets",
      "Rapport mensuel et point avec la direction",
    ],
    equivalent: "soit 622 € la vidéo, diffusion et tunnel compris",
    /*
      4 vidéos à 340 € = 1 360 €, media buying 490 €, ouverture des
      comptes 490 €, CRM et automatisation 590 €, landing page 390 €.
      Chacune de ces lignes est publiée plus bas : le calcul est
      refaisable par le visiteur, et c'est la condition pour qu'il y
      croie.
    */
    anchor: 3320,
    bonus: "Landing page de conversion offerte",
    featured: true,
    cta: "Réserver un appel",
  },
];

/* ==========================================================================
 *  LES PRESTATIONS A L'UNITE
 * ========================================================================== */

export type AlaCarte = {
  group: string;
  items: { label: string; detail: string; price: number; unit?: string }[];
};

export const A_LA_CARTE: AlaCarte[] = [
  {
    group: "Production",
    items: [
      {
        /*
          340 et non 350. Le seuil psychologique n'est pas la dizaine,
          c'est le demi-cent : un prix a 350 € est lu « trois cent
          cinquante », un prix a 340 € est lu « trois cent quarante »,
          et le second se range mentalement du cote des trois cents.
          Dix euros de moins, une categorie de prix en dessous.
        */
        label: "Vidéo publicitaire",
        detail: "Angle, script, tournage, montage, formats verticaux.",
        price: 340,
      },
      {
        label: "Vidéo supplémentaire dans un pack",
        detail: "Au-delà des 4 vidéos mensuelles incluses.",
        price: 290,
      },
      {
        label: "Série photo",
        detail: "Une demi-journée de tournage, 20 visuels retouchés.",
        price: 390,
      },
    ],
  },
  {
    group: "Web & conversion",
    items: [
      {
        label: "Landing page de conversion",
        detail: "Une page dédiée à une offre, pensée pour le formulaire.",
        price: 390,
      },
      {
        label: "Site vitrine",
        detail: "Jusqu'à 5 pages, responsive, optimisé pour la vitesse.",
        price: 690,
      },
      {
        label: "Référencement technique",
        detail: "Structure, balises, données structurées, Search Console.",
        price: 290,
      },
    ],
  },
  {
    group: "Marque",
    items: [
      {
        label: "Identité visuelle",
        detail: "Logo, palette, typographies, règles d'usage.",
        price: 890,
      },
      {
        label: "Positionnement & message",
        detail: "Cadrage de l'offre, angles, messages clés.",
        price: 590,
      },
    ],
  },
  {
    group: "Acquisition & outils",
    items: [
      {
        label: "Ouverture des comptes publicitaires",
        detail: "Meta, Google, TikTok : comptes, pixels, conversions.",
        price: 490,
      },
      {
        label: "CRM et automatisation des leads",
        detail: "Pipeline, formulaires, notifications, relances.",
        price: 590,
      },
      {
        label: "Media buying seul",
        detail: "Pilotage mensuel, vos vidéos, une plateforme.",
        price: 490,
        unit: "/ mois",
      },
    ],
  },
];

/* ==========================================================================
 *  CE QUI N'EST JAMAIS COMPRIS
 *
 *  Cette liste est la partie la plus importante de la page.
 *
 *  Le budget publicitaire est la premiere source de malentendu sur ce
 *  type d'offre : un client qui decouvre en cours de mois qu'il doit
 *  payer les plateformes en plus se sent trompe, meme si personne ne
 *  lui a rien cache. L'ecrire noir sur blanc, avant la signature, coute
 *  quelques lignes et evite une rupture.
 * ========================================================================== */

export const NOT_INCLUDED = [
  {
    label: "Le budget publicitaire",
    detail:
      "Il est versé directement aux plateformes, jamais par nous. Comptez 800 € à 1 500 € par mois pour démarrer.",
  },
  {
    label: "Les intervenants externes",
    detail: "Comédiens, mannequins, figurants, lieux de tournage payants.",
  },
  {
    label: "Les abonnements logiciels",
    detail: "CRM, outils d'automatisation, hébergement si vous en changez.",
  },
  {
    label: "La réponse aux messages",
    detail:
      "Nous générons les demandes et les centralisons. Le suivi commercial reste chez vous.",
  },
];

/* ==========================================================================
 *  SUR DEVIS
 * ========================================================================== */

export const CUSTOM = {
  title: "Au-delà de ces formules",
  text: "Implantation sur un nouveau marché, lancement produit, dispositif sur six mois, volumes de tournage importants : ces missions ne rentrent dans aucune case, et il serait malhonnête de leur donner un prix avant d'avoir compris le problème.",
  points: [
    "Un premier échange de 30 minutes, sans engagement",
    "Une proposition chiffrée ligne par ligne sous 5 jours",
    "Un prix ferme, aucune révision en cours de mission",
  ],
  cta: "Demander une proposition",
};
