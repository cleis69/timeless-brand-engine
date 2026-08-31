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
 * Les -30 % sont affiches partout ou un prix apparait. C'est efficace
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
  percent: 30,
  /** Texte court affiche sur les pastilles. */
  badge: "-30 % sur votre première commande",
  /**
   * Date de fin, affichee en petit sous la grille.
   * Laisse une chaine vide pour ne rien afficher — mais lis l'avertissement
   * ci-dessus avant de le faire.
   */
  until: "Offre de lancement, valable jusqu'au 31 décembre 2026.",
} as const;

/**
 * Arrondi des prix remises.
 *
 * LA REGLE DE LA GRILLE : TOUT PRIX PLEIN SE TERMINE PAR 90.
 *
 * 490, 1 490, 2 490 pour les formules ; 150, 290, 390, 490, 590 pour
 * les prestations a l'unite. Cette terminaison place chaque montant
 * juste sous un seuil rond, ce qui fait basculer le chiffre de gauche :
 * 490 se lit « quatre cents et quelque », 500 se lirait « cinq cents ».
 * C'est le levier le plus puissant de la tarification, et il ne coute
 * que dix euros.
 *
 * Les prix remises, eux, sont calcules — et un calcul ne tombe jamais
 * juste : 490 x 0,80 donne 392. Cette fonction ramene donc chaque
 * montant a la dizaine la plus proche.
 *
 * CE QUE LA REMISE A 30 % A COUTE — A SAVOIR
 *
 * A -20 %, les trois formules tombaient parfaitement :
 *
 *   490 -> 390     1 490 -> 1 190     2 490 -> 1 990
 *
 * Les trois prix se terminaient par 90 dans les deux colonnes. A -30 %,
 * ils tombent sur 340, 1 040 et 1 740 : la terminaison en 90 est perdue
 * sur la colonne remisee.
 *
 * C'est un vrai renoncement, mais il pese moins qu'avant : depuis que
 * le DIRHAM est la devise affichee en grand, aucune terminaison en euro
 * ne survit de toute facon a la conversion et a l'arrondi a la centaine
 * (390 EUR devient 4 300 MAD). La regle du 90 ne gouverne donc plus que
 * la ligne en petit.
 *
 * SI TU VEUX RETROUVER DES MONTANTS RONDS, c'est desormais sur les
 * dirhams qu'il faut travailler, pas sur les euros — donc en ajustant
 * MAD.rate ou en saisissant les prix directement en dirhams.
 *
 * Sur les prestations a l'unite, le montant remise
 * finit par 10, 30, 50 ou 70 selon les lignes : forcer un 90 partout
 * aurait exige de deformer la remise jusqu'a 34 % sur certaines
 * lignes, ce qui aurait rendu le « -20 % » affiche indefendable.
 *
 * CONSEQUENCE ASSUMEE : LA REMISE N'EST PAS EXACTEMENT DE 20 %.
 *
 * Elle oscille entre 19,6 % et 20,4 %. Personne ne verifie un
 * pourcentage, tout le monde voit un prix — et l'ecart joue presque
 * toujours en faveur du client, puisqu'on arrondit vers le bas.
 */
const charm = (n: number) => Math.round(n / 10) * 10;

/** Applique la remise si elle est active, puis l'arrondi a la dizaine. */
export const withOffer = (price: number) =>
  LAUNCH_OFFER.enabled ? charm(price * (1 - LAUNCH_OFFER.percent / 100)) : price;

/** Formate un montant : 1490 -> « 1 490 € ». Espace insecable avant l'euro. */
export const euro = (n: number) => `${n.toLocaleString("fr-FR")} €`;

/* ==========================================================================
 *  LA SECONDE DEVISE
 * ========================================================================== */

/**
 * L'EURO RESTE LA DEVISE PRINCIPALE. LE DIRHAM EST INDICATIF.
 *
 * Ce n'est pas un detail d'affichage, c'est une decision commerciale.
 *
 * Neuf clients sur dix sont des expatries francophones installes au
 * Maroc. Ils ont deux references de prix en tete, et ce n'est pas la
 * meme selon ce qu'on leur montre :
 *
 *  - En euros, ils comparent a ce qu'ils payaient en France, ou une
 *    video publicitaire coute couramment 1 500 a 3 000 €. A 490 €,
 *    l'ecart est enorme, et il joue en notre faveur.
 *
 *  - En dirhams seuls, ils comparent au marche local, dont les reperes
 *    sont bien plus bas. Le meme prix parait alors cher.
 *
 * L'euro en gros, le dirham en petit : on garde l'ancrage favorable
 * tout en repondant a la question pratique — combien vais-je
 * reellement virer.
 *
 * ------------------------------------------------------------
 *  LE TAUX EST A REGLER PAR TES SOINS
 *
 *  Il n'est PAS mis a jour automatiquement, et c'est volontaire : un
 *  prix qui bouge entre le moment ou un prospect le lit et celui ou il
 *  signe est ingerable.
 *
 *  Prends un taux commercial rond, legerement au-dessus du taux du
 *  jour pour absorber les variations, et revois-le deux fois par an.
 *  La mention « a titre indicatif » qui accompagne le montant te
 *  protege : c'est l'euro qui fait foi au devis.
 * ------------------------------------------------------------
 */
export const MAD = {
  /** Passe a false pour n'afficher que l'euro. */
  enabled: true,
  /** Taux commercial. 1 euro = X dirhams. A revoir deux fois par an. */
  rate: 11,
  /**
   * Mention obligatoire a cote des montants convertis.
   *
   * ELLE NE DIT PLUS « a titre indicatif », ET C'EST VOLONTAIRE.
   *
   * Tant que le dirham etait la petite ligne, « indicatif » allait de
   * soi. Depuis qu'il est le prix affiche en grand, qualifier
   * d'indicatif le montant principal revenait a dire au visiteur que le
   * chiffre qu'il lit n'est pas le vrai — exactement l'inverse de ce
   * que promet le titre de la page.
   *
   * La formulation actuelle dit la meme chose juridiquement (l'euro
   * reste la devise du devis) sans jeter le doute sur le montant lu.
   */
  note: "convertis au taux commercial en vigueur ; l'euro fait foi au devis",
} as const;

/**
 * Convertit et arrondit a la centaine de dirhams.
 *
 * L'arrondi est volontairement grossier. Un montant converti au dirham
 * pres — « 5 390 MAD » — annonce qu'il sort d'une multiplication, donc
 * qu'il se negocie. Arrondi a « 5 400 MAD », il redevient un prix.
 */
export const dirham = (eur: number) => {
  const v = Math.round((eur * MAD.rate) / 100) * 100;
  return `${v.toLocaleString("fr-FR")} MAD`;
};

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
   * visible. Le risque n'est pas de perdre 500 € le premier mois : c'est
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
    /* 390 € la vidéo + 245 € de media buying, moitié d'un mois à 490 €. */
    anchor: 635,
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
    /* 4 vidéos à 390 € = 1 560 €, plus 490 € de media buying. */
    anchor: 2050,
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
      4 vidéos à 390 € = 1 560 €
      media buying sur 3 plateformes, 3 x 490 € = 1 470 €
      ouverture des comptes = 290 €
      CRM et automatisation = 490 €
      landing page = 150 €
      -------------------------------------------------- 3 960 €

      Chacune de ces lignes est publiée plus bas. Le calcul est
      refaisable par le visiteur, et c'est la condition pour qu'il y
      croie : un prospect qui refait l'addition et tombe juste vous
      croit sur tout le reste ; un qui tombe faux ne vous croit plus
      sur rien.
    */
    anchor: 3960,
    bonus: "Landing page de conversion offerte",
    featured: true,
    cta: "Réserver un appel",
  },
];

/* ==========================================================================
 *  LES PRESTATIONS A L'UNITE
 * ==========================================================================
 *
 *  POURQUOI CERTAINS PRIX EN EUROS NE SE TERMINENT PAS PAR 90
 *
 *  Les prestations historiques ont ete pensees EN EUROS, d'ou 290, 390,
 *  490, 590 — la regle du 90 decrite plus haut.
 *
 *  Les cinq dernieres (podcast, vlog, SEO mensuel, GEO, community
 *  management) ont ete fixees EN DIRHAMS par l'agence : 3 500, 7 000,
 *  2 500, 2 500 et 8 000 MAD. Le champ `price` etant en euros, la valeur
 *  stockee est celle qui, convertie au taux 11 et arrondie a la
 *  centaine, redonne EXACTEMENT le montant voulu :
 *
 *    320 EUR -> 3 500 MAD      640 EUR -> 7 000 MAD
 *    230 EUR -> 2 500 MAD      730 EUR -> 8 000 MAD
 *
 *  C'est le dirham qui est juste ici, pas l'euro. NE PAS « corriger »
 *  ces montants vers une terminaison en 90 : cela decalerait le prix
 *  affiche, qui est celui que l'agence a annonce.
 *
 *  SI MAD.rate CHANGE, ces cinq valeurs ne suivront pas : il faudra les
 *  recalculer pour retomber sur les memes dirhams.
 * ========================================================================== */

export type AlaCarte = {
  group: string;
  items: {
    label: string;
    detail: string;
    price: number;
    /** Suffixe : « / mois », « / mois / plateforme »… */
    unit?: string;
    /** Affiche « à partir de » devant le prix. */
    from?: boolean;
  }[];
};

/**
 * LES PRESTATIONS, AVANT FILTRAGE.
 *
 * Ne pas importer cette constante dans une page : c'est A_LA_CARTE,
 * plus bas, qui est la liste affichable.
 */
const A_LA_CARTE_BRUT: AlaCarte[] = [
  {
    group: "Production",
    items: [
      {
                label: "Vidéo publicitaire",
        detail: "Angle, script, tournage, montage, formats verticaux.",
        price: 390,
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
    /*
      LE CONTENU LONG N'EST PAS DE LA PUBLICITE, ET IL A SON GROUPE.

      Une video publicitaire dure quinze secondes et cherche un clic.
      Un episode de podcast dure quarante minutes et cherche une
      relation. Les ranger ensemble ferait lire le podcast comme une
      « grosse pub » et son prix comme un abus.
    */
    group: "Contenu long",
    items: [
      {
        /*
          « A partir de » : un episode avec un invite en plateau fixe et
          un episode tourne en deux lieux avec habillage sur mesure ne
          demandent pas le meme travail. Annoncer un prix ferme
          obligerait a refuser le second ou a renegocier apres coup.
        */
        label: "Épisode de podcast",
        detail: "Plateau, deux à trois caméras, montage, habillage, extraits verticaux.",
        price: 320,
        from: true,
      },
      {
        label: "Vlog format long",
        detail: "Une journée de tournage, montage narratif, 8 à 12 minutes.",
        price: 640,
        from: true,
      },
    ],
  },
  {
    group: "Web & conversion",
    items: [
      {
        label: "Landing page de conversion",
        detail: "Une page dédiée à une offre, pensée pour le formulaire.",
        price: 150,
      },
      {
        /*
          « A partir de » est indispensable ici, et nulle part ailleurs.
          Un site vitrine n'a pas de perimetre fixe : trois pages ou
          huit pages, c'est le meme intitule et pas le meme travail.
          Annoncer un prix ferme obligerait soit a refuser les projets
          plus larges, soit a renegocier apres coup — c'est-a-dire a
          faire exactement ce que la page promet d'eviter.
        */
        label: "Site vitrine",
        detail: "Jusqu'à 5 pages, responsive, optimisé pour la vitesse.",
        price: 590,
        from: true,
      },
      {
        /*
          PONCTUEL, ET C'EST VOLONTAIREMENT DISTINCT DU SUIVI.

          Le technique se fait une fois : une structure corrigee le
          reste. Le suivi editorial, lui, n'existe que dans la duree.
          Les vendre ensemble obligerait un client qui veut juste un
          site propre a payer un abonnement dont il n'a pas l'usage.
        */
        label: "Référencement technique",
        detail: "Structure, balises, données structurées, Search Console.",
        price: 290,
      },
      {
        label: "Suivi SEO mensuel",
        detail: "Mots-clés, contenus, netlinking, rapport de positions.",
        price: 230,
        unit: "/ mois",
      },
      {
        /*
          GEO — pour « Generative Engine Optimization ».

          Le sigle ne dit rien a personne hors du metier, et il se
          confond avec « geographique ». Le libelle l'ecrit donc en
          clair : ce qu'on vend, c'est d'etre cite par les assistants,
          pas un acronyme.
        */
        label: "Visibilité sur les IA (GEO)",
        detail: "Être cité par ChatGPT, Perplexity et les résumés IA de Google.",
        price: 230,
      },
    ],
  },
  {
    group: "Marque",
    items: [
      {
        label: "Identité visuelle",
        detail: "Logo, palette, typographies, règles d'usage.",
        price: 490,
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
        price: 290,
      },
      {
        label: "CRM et automatisation des leads",
        detail: "Pipeline, formulaires, notifications, relances.",
        price: 490,
      },
      {
        /*
          PAR PLATEFORME, ET C'EST UNE PRECISION INDISPENSABLE.

          Piloter Meta seul et piloter Meta, Google et TikTok ne
          representent pas le meme travail : trois interfaces, trois
          logiques d'enchere, trois jeux de creations a decliner.

          Sans cette mention, la formule Acquisition — qui est
          multicanale — paraissait couter plus cher que la somme de ses
          composants achetes separement. L'argument des formules
          s'effondrait sur sa propre page.
        */
        label: "Media buying",
        detail: "Pilotage mensuel de vos campagnes, vos vidéos.",
        price: 490,
        unit: "/ mois / plateforme",
      },
      {
        label: "Community management",
        detail: "Ligne éditoriale, calendrier, publication, modération.",
        price: 730,
        unit: "/ mois",
      },
    ],
  },
];

/* ==========================================================================
 *  LE FILTRE DES PRESTATIONS SANS PRIX
 *
 *  UN PRIX A 0 SIGNIFIE « PAS ENCORE FIXE », ET LA LIGNE N'EST PAS
 *  AFFICHEE.
 *
 *  Cette page promet en titre « des prix affiches, aucune surprise ».
 *  Une prestation annoncee sans montant, ou pire avec un montant
 *  invente, contredit la seule chose que la page a a vendre.
 *
 *  Le garde-fou est automatique : il n'y a pas d'interrupteur a penser
 *  a basculer. Des qu'un prix reel remplace le 0, la ligne apparait
 *  toute seule. Un groupe dont toutes les lignes sont a 0 disparait
 *  entierement, plutot que de laisser un titre au-dessus du vide.
 * ========================================================================== */

export const A_LA_CARTE: AlaCarte[] = A_LA_CARTE_BRUT.map((g) => ({
  ...g,
  items: g.items.filter((i) => i.price > 0),
})).filter((g) => g.items.length > 0);

/*
  Rappel en console, en developpement : la liste des prestations encore
  sans prix. Elles sont invisibles sur le site, donc c'est le seul
  endroit ou l'oubli se voit.
*/
if (typeof window !== "undefined") {
  const sansPrix = A_LA_CARTE_BRUT.flatMap((g) =>
    g.items.filter((i) => i.price <= 0).map((i) => i.label),
  );
  if (sansPrix.length > 0) {
    console.warn(
      `[ULTRA VISION] ${sansPrix.length} prestation(s) sans prix, donc MASQUEES sur /tarifs et /services : ` +
        sansPrix.join(", ") +
        ". Renseigner leur prix dans src/config/pricing.ts pour les faire apparaitre.",
    );
  }
}

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
