/**
 * ULTRA VISION — tokens de mouvement
 *
 * Toutes les animations du site puisent ici. Une seule source de verite :
 * si une duree ou une courbe doit changer, elle change ici et partout a la fois.
 *
 * Regle absolue : on n'anime que `transform` et `opacity`.
 * Ces deux proprietes sont traitees par la carte graphique sans recalcul de
 * mise en page, ce qui garantit 60 images par seconde. Animer `width`,
 * `height`, `top` ou `margin` force le navigateur a tout recalculer a chaque
 * image et provoque les saccades.
 */

export const EASE = {
  /** Sortie douce, notre courbe par defaut. Demarre vite, finit en glissant. */
  out: [0.16, 1, 0.3, 1],
  /** Entree et sortie symetriques, pour les transitions d'etat. */
  inOut: [0.65, 0, 0.35, 1],
  /** Sortie tres marquee, reservee aux grandes revelations. */
  expo: [0.19, 1, 0.22, 1],
} as const

export const DURATION = {
  fast: 0.3,
  base: 0.5,
  slow: 0.8,
  reveal: 0.9,
} as const

export const STAGGER = {
  tight: 0.06,
  base: 0.09,
  loose: 0.14,
} as const

type Variants = Record<string, Record<string, unknown>>

/** Apparition verticale sobre : le contenu monte de 24 px en se revelant. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
}

/** Variante courte, pour les elements secondaires. */
export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
}

/** Fondu seul, sans deplacement. Pour les fonds et les halos. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
}

/**
 * Conteneur qui declenche ses enfants en cascade.
 * A poser sur le parent, avec `fadeUp` sur chaque enfant.
 */
export const staggerContainer = (
  stagger: number = STAGGER.base,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

/**
 * Revelation par masque : le texte glisse depuis le bas d'un conteneur
 * en `overflow: hidden`. C'est le mouvement qui donne le caractere
 * editorial haut de gamme aux grands titres.
 * A utiliser avec le composant <MaskReveal>.
 */
export const maskRise: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: DURATION.reveal, ease: EASE.expo },
  },
}

/** Entree cinematique des blocs video. */
export const videoReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: EASE.expo },
  },
}

/**
 * Reglages d'apparition au scroll.
 *
 * `amount: 0.15` signifie qu'il suffit que 15 % de l'element soit visible
 * pour declencher l'animation. C'est volontairement bas : un seuil eleve sur
 * une section haute peut n'etre jamais atteint sur un petit ecran, et la
 * section reste alors invisible pour toujours. C'est exactement le defaut
 * constate sur la version actuelle du site.
 */
export const VIEWPORT = { once: true, amount: 0.15 } as const

/** Version encore plus permissive pour les sections tres hautes. */
export const VIEWPORT_TALL = { once: true, amount: 0.05 } as const
