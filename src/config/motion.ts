/**
 * ULTRA VISION — le socle des vitesses d'animation.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/config/motion.ts
 * ============================================================
 *
 * LA REGLE QUI GOUVERNE TOUT LE SITE
 *
 *      L'ENTREE EST LENTE. LE SURVOL EST INSTANTANE.
 *
 * Ce sont deux gestes opposes, et les confondre est l'erreur la plus
 * repandue sur les sites d'agence.
 *
 * Une section qui APPARAIT lentement se donne de l'importance. On a le
 * temps de la voir arriver, elle se pose, on la regarde. C'est le geste
 * des sites primes, et il ne coute rien : le visiteur scrolle, il
 * n'attend pas apres l'animation.
 *
 * Un element qui REPOND lentement au survol produit exactement l'effet
 * inverse. La main est deja passee a autre chose que l'element bouge
 * encore. Le visiteur ne se dit jamais « c'est elegant », il se dit
 * « ca rame ». Un survol au-dela de 300 ms est percu comme un retard,
 * pas comme un raffinement.
 *
 * D'ou le decoupage ci-dessous. Toutes les durees du site viennent
 * d'ici : changer une valeur ici la change partout, de facon coherente.
 * C'est precisement ce qu'on ne peut plus faire quand les durees sont
 * ecrites a la main dans quinze fichiers.
 */

/* ==========================================================================
 *  LES COURBES
 * ========================================================================== */

/**
 * Courbe d'entree. Demarrage franc, arrivee tres amortie.
 * Le mouvement se termine en glissant plutot qu'en s'arretant net :
 * c'est ce qui donne l'impression de masse.
 */
export const EASE_ENTER = "cubic-bezier(.16,1,.3,1)";

/**
 * Courbe de reponse. Plus directe, sans amortissement prolonge.
 * Sur un survol, l'amortissement se lit comme de la latence.
 */
export const EASE_RESPOND = "cubic-bezier(.22,1,.36,1)";

/* ==========================================================================
 *  LES DUREES, EN MILLISECONDES
 * ========================================================================== */

export const MOTION = {
  /** Apparition d'un bloc au scroll. */
  enter: 950,
  /** Apparition d'un grand titre par masque. Un peu plus long, c'est un geste. */
  enterTitle: 1000,
  /** Cascade entre deux elements d'une meme rangee. */
  stagger: 70,

  /**
   * Reponse au survol : couleur, glissement, soulignement.
   * En dessous de 180 ms le changement paraitrait brutal ; au-dessus de
   * 300 ms il paraitrait en retard. 220 ms est le creux entre les deux.
   */
  respond: 220,

  /**
   * Depliage d'un contenu au survol — prestations, description, reponse
   * de FAQ. Plus long que `respond` : ce n'est pas un changement d'etat,
   * c'est du contenu qui prend sa place et la mise en page suit.
   */
  expand: 340,

  /**
   * Elargissement d'une carte du rail des realisations.
   * Ni un survol ni une entree : un mouvement de mise en page. Trop
   * rapide, les quatre colonnes sautent ; trop lent, la main attend.
   */
  rail: 700,

  /** Ouverture d'une reponse de FAQ. */
  faq: 400,
} as const;

/* ==========================================================================
 *  LES MOUVEMENTS CONTINUS, EN SECONDES
 * ========================================================================== */

export const LOOP = {
  /**
   * Rotation de l'iris. 90 secondes par tour.
   *
   * A 120 s on ne percevait plus rien : autant afficher une image fixe.
   * En dessous de 60 s la rotation devient visible et attire l'oeil vers
   * un decor au lieu du titre. 90 s est le point ou l'on sent que quelque
   * chose vit sans jamais le regarder.
   */
  iris: 90,

  /** Rotation de l'iris du bloc final. Beaucoup plus lente : il est immense. */
  irisFinal: 150,

  /** Defile des noms de clients. Assez lent pour qu'on lise chaque nom. */
  marquee: 44,

  /** Rotation du halo de la pastille de positionnement. */
  halo: 4.5,
} as const;

/** Raccourci pratique : `transition` complet pour une entree. */
export const enterTransition = (props: string[], delay = 0) =>
  props.map((p) => `${p} ${MOTION.enter}ms ${EASE_ENTER} ${delay}ms`).join(", ");

/** Raccourci pratique : `transition` complet pour une reponse au survol. */
export const respondTransition = (props: string[], delay = 0) =>
  props.map((p) => `${p} ${MOTION.respond}ms ${EASE_RESPOND} ${delay}ms`).join(", ");
