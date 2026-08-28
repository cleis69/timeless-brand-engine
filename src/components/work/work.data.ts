/**
 * ULTRA VISION — donnees des realisations.
 *
 * ============================================================
 *  C'EST LE SEUL FICHIER QUE TU AURAS A MODIFIER TOI-MEME.
 * ============================================================
 *
 * Pour ajouter une realisation : copie un bloc, change les valeurs.
 * Pour en retirer une : supprime le bloc.
 * Pour changer l'ordre a l'ecran : deplace le bloc.
 *
 * Le code ne bouge pas. Jamais.
 *
 * ------------------------------------------------------------
 * ETAT AU 28 AOUT 2026
 *
 * Les deux realisations Ehab ont ete RETIREES du site a la demande de
 * l'agence, et leurs deux dossiers public/work/ehab-... supprimes du
 * depot dans le meme commit. C'etait indispensable et non cosmetique :
 * le depot est PUBLIC, et un fichier seulement dereference reste
 * telechargeable par son URL directe.
 *
 * ATTENTION — la suppression ne vaut que pour l'etat courant. Ces
 * fichiers restent presents dans l'HISTORIQUE Git, donc recuperables
 * par quiconque clone le depot. Seuls le passage du depot en prive ou
 * une reecriture d'historique les rendent reellement inaccessibles.
 *
 * Huit realisations ont ete ajoutees le meme jour, ce qui ramene la
 * liste a DIX. La grille est donc revenue a son comportement normal :
 * au-dessus de quatre elements, WorkGrid retrouve le chevauchement,
 * l'inclinaison et l'ecartement au survol. Ne pas redescendre sous
 * quatre.
 *
 * WorkGrid.tsx calcule ses colonnes ainsi :
 *     cols = min(colonnesEcran, items.length)
 * En dessous de quatre elements, cols tombe a 2 ou 3, `compact` passe a
 * true — et `compact` est la mise en page TELEPHONE, appliquée sur tous
 * les ecrans. Ce n'est pas un bug : c'est la consequence mecanique du
 * nombre d'elements.
 *
 * ------------------------------------------------------------
 * LES STATISTIQUES — CONFIRMEES REELLES LE 13 AOUT 2026
 *
 * Les chiffres qui servaient de demonstration ont ete confirmes comme
 * exacts. Ils vivent maintenant dans `stats`, la cle affichee en
 * permanence. Le systeme de bascule demo/reel reste en place pour la
 * prochaine realisation ajoutee : ecrire ses vrais chiffres dans
 * `stats`, ou des marqueurs STAT_01 en attendant de les avoir.
 */

/* ==========================================================================
 *  Mode demonstration — desactive.
 *
 *  Les realisations ci-dessous affichent leurs vrais chiffres.
 *  Repasser a true uniquement pour juger le rendu visuel d'une future
 *  realisation dont les chiffres ne sont pas encore connus.
 * ========================================================================== */
export const DEMO_STATS = false;

export type Stat = {
  /** '+42%', '3.2M', ou 'STAT_01' tant que le chiffre reel manque. */
  value: string;
  /** Libelle court, deux mots maximum. Affiche en majuscules. */
  label: string;
};

export type WorkItem = {
  /** Identifiant en minuscules avec des tirets. Sert aussi de nom de dossier. */
  slug: string;
  /** Nom du projet ou du client. */
  title: string;
  /** Categorie courte, affichee en majuscules espacees. */
  category: string;
  /** Une phrase. Deux lignes maximum a l'ecran. */
  description: string;
  client?: string;
  year?: string;
  sources: {
    /** Obligatoire. Format universel. */
    mp4: string;
    /** Optionnel. Plus leger sur Chrome et Firefox. Non genere pour l'instant. */
    webm?: string;
    /** Version allegee servie en dessous de 768 px. */
    mobile?: string;
  };
  /** Image affichee avant le chargement de la video. Obligatoire. */
  poster: string;
  /**
   * Rapport d'image. Determine la mise en page :
   *   '9/16' et '4/5'  -> deux colonnes, video a cote du texte
   *   '16/9' et '21/9' -> pleine largeur, texte au-dessus
   */
  aspect: "16/9" | "9/16" | "1/1" | "4/5" | "21/9";
  /** Les vrais chiffres. Marqueurs STAT_ tant qu'ils ne sont pas connus. */
  stats: [Stat, Stat, Stat];
  /** Chiffres inventes, affiches uniquement quand DEMO_STATS vaut true. */
  demoStats: [Stat, Stat, Stat];
};

/** Renvoie les chiffres a afficher selon le mode en cours. */
export const statsOf = (item: WorkItem) => (DEMO_STATS ? item.demoStats : item.stats);

/** Vrai si la valeur est encore un marqueur et non un chiffre reel. */
export const isPlaceholder = (value: string) => value.startsWith("STAT_");

/**
 * Les chiffres REELLEMENT affichables d'une realisation.
 *
 * Les marqueurs STAT_ sont MASQUES a l'ecran, a la demande de l'agence :
 * une realisation sans chiffres connus montre son film et son titre, sans
 * emplacement vide ni mention « a completer » sous chaque colonne.
 *
 * Ce qu'il faut savoir avant de s'y fier : le garde-fou visuel a disparu
 * avec eux. Un marqueur oublie ne se voit plus sur le site — il ne se
 * signale plus que dans la console en developpement (voir plus bas).
 * Renseigner les vrais chiffres reste la seule facon de les faire
 * apparaitre.
 */
export const shownStats = (item: WorkItem) => statsOf(item).filter((s) => !isPlaceholder(s.value));

export const WORK_ITEMS: WorkItem[] = [
  /*
    ORDRE — DEUX FILMS DU MEME THEME NE SE SUIVENT JAMAIS.

    Ce n'est pas une preference de mise en page. La grille montre les
    affiches cote a cote : deux salons de coiffure voisins se lisent
    comme une seule realisation dupliquee, et l'oeil saute les deux.
    L'alternance est ce qui fait lire « plusieurs metiers ».

    Themes en presence : beaute (3), immobilier (3), cosmetique, barber,
    loisirs, remise en forme. Si tu deplaces un bloc, verifie ses deux
    nouveaux voisins.

    L'ORDRE DU TABLEAU EST L'ORDRE DE LA VITRINE : la page d'accueil
    affiche desormais TOUTE la liste via FEATURED_WORK, dans cet ordre.

    NOMMAGE — les slugs et les titres portent le SECTEUR, jamais le nom
    du client : le slug devient un nom de dossier, donc une URL, donc une
    ligne lisible dans le source de la page. `africa-beauty` et
    `scultbody` sont deux exceptions anterieures a cette regle, laissees
    en l'etat a la demande de l'agence.

    LES CHIFFRES SONT DES MARQUEURS STAT_. Ils s'affichent en gris avec
    la mention « a completer ». Les remplacer par les vrais releves du
    gestionnaire de publicites ; n'en inventer aucun.
  */
  {
    slug: "salon-coiffure",
    title: "Salon de coiffure",
    category: "PUBLICITE • META & TIKTOK",
    description:
      "Film vertical tourné en salon, centré sur le geste et le résultat. Montage rythmé pour le feed.",
    year: "2025",
    sources: {
      mp4: "/work/salon-coiffure/salon-coiffure.mp4",
      mobile: "/work/salon-coiffure/salon-coiffure-mobile.mp4",
    },
    poster: "/work/salon-coiffure/poster.jpg",
    aspect: "9/16",
    stats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "TAUX DE CLIC" },
      { value: "STAT_03", label: "RENDEZ-VOUS" },
    ],
    demoStats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "TAUX DE CLIC" },
      { value: "STAT_03", label: "RENDEZ-VOUS" },
    ],
  },
  {
    slug: "agent-immobilier",
    title: "Agent immobilier",
    category: "PUBLICITE • META",
    description:
      "Captation de prospects à l'international : tournage sur place, sous-titrage dans la langue du marché visé.",
    year: "2025",
    sources: {
      mp4: "/work/agent-immobilier/agent-immobilier.mp4",
      mobile: "/work/agent-immobilier/agent-immobilier-mobile.mp4",
    },
    poster: "/work/agent-immobilier/poster.jpg",
    aspect: "9/16",
    stats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "COUT PAR LEAD" },
      { value: "STAT_03", label: "LEADS" },
    ],
    demoStats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "COUT PAR LEAD" },
      { value: "STAT_03", label: "LEADS" },
    ],
  },
  {
    slug: "cosmetique",
    title: "Cosmétique",
    category: "PUBLICITE • META & TIKTOK",
    description:
      "Film produit tourné en conditions réelles, du geste d'application à l'usage. Format vertical, sans voix off.",
    year: "2025",
    sources: {
      mp4: "/work/cosmetique/cosmetique.mp4",
      mobile: "/work/cosmetique/cosmetique-mobile.mp4",
    },
    poster: "/work/cosmetique/poster.jpg",
    aspect: "9/16",
    stats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "TAUX DE CLIC" },
      { value: "STAT_03", label: "VENTES" },
    ],
    demoStats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "TAUX DE CLIC" },
      { value: "STAT_03", label: "VENTES" },
    ],
  },
  {
    slug: "barber-shop",
    title: "Barber shop",
    category: "PUBLICITE • META & TIKTOK",
    description:
      "Film d'ambiance tourné en boutique, lumière chaude et gros plans sur le geste. Pensé pour la notoriété locale.",
    year: "2025",
    sources: {
      mp4: "/work/barber-shop/barber-shop.mp4",
      mobile: "/work/barber-shop/barber-shop-mobile.mp4",
    },
    poster: "/work/barber-shop/poster.jpg",
    aspect: "9/16",
    stats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "TAUX DE CLIC" },
      { value: "STAT_03", label: "RENDEZ-VOUS" },
    ],
    demoStats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "TAUX DE CLIC" },
      { value: "STAT_03", label: "RENDEZ-VOUS" },
    ],
  },
  {
    slug: "promoteur-immobilier",
    title: "Promoteur immobilier",
    category: "PUBLICITE • META",
    description:
      "Présentation d'un programme de villas encore en construction, adressée à un marché étranger.",
    year: "2025",
    sources: {
      mp4: "/work/promoteur-immobilier/promoteur-immobilier.mp4",
      mobile: "/work/promoteur-immobilier/promoteur-immobilier-mobile.mp4",
    },
    poster: "/work/promoteur-immobilier/poster.jpg",
    aspect: "9/16",
    stats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "COUT PAR LEAD" },
      { value: "STAT_03", label: "LEADS" },
    ],
    demoStats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "COUT PAR LEAD" },
      { value: "STAT_03", label: "LEADS" },
    ],
  },
  {
    slug: "institut-beaute",
    title: "Institut de beauté",
    category: "PUBLICITE • META & TIKTOK",
    description:
      "Visite guidée de l'institut, du fauteuil à l'espace soin. Le lieu est le sujet, pas le discours.",
    year: "2025",
    sources: {
      mp4: "/work/institut-beaute/institut-beaute.mp4",
      mobile: "/work/institut-beaute/institut-beaute-mobile.mp4",
    },
    poster: "/work/institut-beaute/poster.jpg",
    aspect: "9/16",
    stats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "TAUX DE CLIC" },
      { value: "STAT_03", label: "RENDEZ-VOUS" },
    ],
    demoStats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "TAUX DE CLIC" },
      { value: "STAT_03", label: "RENDEZ-VOUS" },
    ],
  },
  {
    slug: "loisirs",
    title: "Loisirs & sport",
    category: "PUBLICITE • META & TIKTOK",
    description:
      "Film tourné de jour et de nuit pour montrer les deux visages du lieu. Accroche sur le tarif d'entrée.",
    year: "2025",
    sources: {
      mp4: "/work/loisirs/loisirs.mp4",
      mobile: "/work/loisirs/loisirs-mobile.mp4",
    },
    poster: "/work/loisirs/poster.jpg",
    aspect: "9/16",
    stats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "TAUX DE CLIC" },
      { value: "STAT_03", label: "RESERVATIONS" },
    ],
    demoStats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "TAUX DE CLIC" },
      { value: "STAT_03", label: "RESERVATIONS" },
    ],
  },
  {
    slug: "residence-neuve",
    title: "Résidence neuve",
    category: "PUBLICITE • META",
    description:
      "Lancement d'une résidence : les parties communes, les commerces, le quartier. Un cadre de vie avant un plan.",
    year: "2025",
    sources: {
      mp4: "/work/residence-neuve/residence-neuve.mp4",
      mobile: "/work/residence-neuve/residence-neuve-mobile.mp4",
    },
    poster: "/work/residence-neuve/poster.jpg",
    aspect: "9/16",
    stats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "COUT PAR LEAD" },
      { value: "STAT_03", label: "VISITES" },
    ],
    demoStats: [
      { value: "STAT_01", label: "VUES" },
      { value: "STAT_02", label: "COUT PAR LEAD" },
      { value: "STAT_03", label: "VISITES" },
    ],
  },
  {
    slug: "scultbody",
    title: "Scultbody",
    category: "PUBLICITE",
    description:
      "Création publicitaire orientée conversion, pensée pour alimenter un tunnel d'acquisition complet.",
    year: "2025",
    sources: {
      mp4: "/work/scultbody/scultbody.mp4",
      mobile: "/work/scultbody/scultbody-mobile.mp4",
    },
    poster: "/work/scultbody/poster.jpg",
    aspect: "9/16",
    stats: [
      { value: "890K", label: "VUES" },
      { value: "2.10€", label: "COUT PAR LEAD" },
      { value: "+52%", label: "CONVERSIONS" },
    ],
    demoStats: [
      { value: "890K", label: "VUES" },
      { value: "2.10€", label: "COUT PAR LEAD" },
      { value: "+52%", label: "CONVERSIONS" },
    ],
  },
  {
    slug: "africa-beauty",
    title: "Africa Beauty",
    category: "PUBLICITE • META & TIKTOK",
    description:
      "Campagne publicitaire à l'esthétique 80s, tournée et montée en interne. Format vertical pensé pour le feed.",
    year: "2025",
    sources: {
      mp4: "/work/africa-beauty/africa-beauty.mp4",
      mobile: "/work/africa-beauty/africa-beauty-mobile.mp4",
    },
    poster: "/work/africa-beauty/poster.jpg",
    aspect: "9/16",
    stats: [
      { value: "1.4M", label: "VUES" },
      { value: "4.2%", label: "TAUX DE CLIC" },
      { value: "+38%", label: "VENTES" },
    ],
    demoStats: [
      { value: "1.4M", label: "VUES" },
      { value: "4.2%", label: "TAUX DE CLIC" },
      { value: "+38%", label: "VENTES" },
    ],
  },
];

/**
 * Les realisations affichees sur la page d'accueil.
 *
 * TOUTES, et non plus les quatre premieres.
 *
 * Le ruban d'accueil (WorkRibbon) ne charge la video que de la carte
 * survolee, une seule a la fois : ce qui defile en permanence, ce sont
 * des posters. Allonger la liste coute donc quelques images, pas dix
 * fichiers video — c'est ce qui rend le catalogue complet tenable ici.
 *
 * Consequence a garder en tete : il n'y a plus de selection. Toute
 * realisation ajoutee a WORK_ITEMS apparait desormais sur l'accueil, et
 * l'ordre du tableau est l'ordre de la vitrine.
 */
export const FEATURED_WORK = WORK_ITEMS;

/*
  Rappel en console : les realisations dont les chiffres ne sont pas
  encore renseignes.

  Les marqueurs STAT_ ne s'affichant plus sur le site, c'est le seul
  endroit ou un oubli se voit encore. Ne pas le retirer.
*/
if (typeof window !== "undefined") {
  const sansChiffres = WORK_ITEMS.filter((i) => i.stats.every((s) => isPlaceholder(s.value)));
  if (sansChiffres.length > 0) {
    console.warn(
      `[ULTRA VISION] ${sansChiffres.length} realisation(s) sans chiffres : ` +
        sansChiffres.map((i) => i.slug).join(", ") +
        ". Leurs marqueurs STAT_ sont MASQUES a l ecran. " +
        "Renseigner les vrais releves dans src/components/work/work.data.ts.",
    );
  }
}

/*
  Avertissement en console, en developpement seulement.

  Il rappelle que la liste est trop courte pour que la grille s'affiche
  comme prevu. Il disparait tout seul des qu'une troisieme et une
  quatrieme realisation sont ajoutees.
*/
if (typeof window !== "undefined" && WORK_ITEMS.length < 4) {
  console.warn(
    `[ULTRA VISION] ${WORK_ITEMS.length} realisation(s) dans WORK_ITEMS. ` +
      "En dessous de 4, WorkGrid bascule en mise en page compacte (telephone) " +
      "sur tous les ecrans : ni chevauchement, ni animation au survol. " +
      "Ajouter des realisations dans src/components/work/work.data.ts.",
  );
}
