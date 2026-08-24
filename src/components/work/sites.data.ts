/**
 * ULTRA VISION — donnees des realisations web.
 *
 * ============================================================
 *  NOUVELLE REGLE : AUCUNE CARTE N'EST CLIQUABLE
 * ============================================================
 *
 *  Les realisations se donnent a voir, pas a visiter. Aucune carte de
 *  cette section ne mene vers l'adresse reelle du site client : un
 *  visiteur qui veut en savoir plus passe par le contact, et l'adresse
 *  d'un client n'a pas a etre exposee depuis une page de realisations.
 *
 *  C'est aussi une regle de confidentialite absolue : aucune URL reelle
 *  de site client ne doit subsister dans le depot — ni dans une prop,
 *  ni dans un href, ni en commentaire. Le champ `url` a ete supprime du
 *  type. Seul `domain` est renseigne, et il sert d'ADRESSE D'AFFICHAGE
 *  fictive : il est floute dans la maquette pour garder la silhouette
 *  d'une barre d'adresse (ce qui fait lire « site web ») sans donner a
 *  lire l'adresse elle-meme.
 *
 *  UN PROJET MARQUE `placeholder: true` :
 *    - porte la mention « Exemple de mise en page » sur sa carte,
 *    - est compte dans l'avertissement de console en developpement.
 *
 *  POUR AJOUTER UN VRAI PROJET :
 *    1. remplace un bloc marque `placeholder: true`,
 *    2. retire la ligne `placeholder`,
 *    3. renseigne `domain` (adresse d'affichage, pas l'URL reelle).
 */

/** Vrai tant qu'au moins un projet de la liste est un exemple. */
export const hasPlaceholders = () => SITE_ITEMS.some((s) => s.placeholder)

export type SiteItem = {
  /** Identifiant en minuscules avec des tirets. */
  slug: string
  /** Nom du projet. Neutre et descriptif tant que c'est un exemple. */
  title: string
  /** Type de projet, affiche en majuscules espacees. */
  category: string
  /** Une phrase. Ce que le site devait resoudre. */
  description: string
  /**
   * Adresse d'affichage FICTIVE, affichee floutee dans la barre du
   * navigateur dessine. Elle n'est jamais un lien, jamais cliquable,
   * et ne correspond pas a l'URL reelle du site client. On veut la
   * silhouette d'une barre d'adresse — ce qui fait lire « site web » —
   * sans donner a lire l'adresse elle-meme.
   */
  domain?: string
  /**
   * Vrai tant que le projet est un exemple de mise en page.
   * Absent = projet reel.
   */
  placeholder?: boolean
  /** Trois mots-cles maximum. */
  tags: string[]
  /**
   * Teinte dominante de la maquette dessinee, en degres (0-360).
   * Chaque projet a la sienne : six maquettes de la meme couleur se
   * liraient comme six fois le meme site.
   */
  hue: number
  /**
   * Silhouette de la page dessinee. Determine la maquette :
   *   'editorial'  -> un grand titre, deux colonnes de texte
   *   'commerce'   -> une grille de produits
   *   'landing'    -> un bloc d'accroche et un formulaire
   */
  layout: 'editorial' | 'commerce' | 'landing'
}

export const SITE_ITEMS: SiteItem[] = [
  /* ---------------- Projets reels ---------------- */
  {
    slug: 'ideal-contemporain',
    title: 'Idéal Contemporain',
    category: 'E-COMMERCE • MOBILIER',
    description:
      'Boutique de mobilier contemporain sur-mesure à Marrakech. Catalogue, fiches produit et demande de devis.',
    domain: 'ideal-contemporain.ma',
    tags: ['Catalogue', 'Sur-mesure', 'Devis'],
    hue: 28,
    layout: 'commerce',
  },
  {
    slug: 'raphael-anglesy',
    title: 'Raphaël Anglesy',
    category: 'SITE VITRINE • CHEF PRIVÉ',
    description:
      'Vitrine d\'un chef privé : univers culinaire, prestations et prise de contact, dans une mise en page éditoriale qui laisse la photo respirer.',
    domain: 'raphael-anglesy.com',
    tags: ['Éditorial', 'Prestations', 'Contact'],
    hue: 18,
    layout: 'editorial',
  },
  {
    slug: 'koozina-garden',
    title: 'Koozina Garden',
    category: 'SITE VITRINE • RÉSERVATION',
    description:
      'Vitrine de restaurant avec réservation intégrée : la carte, le lieu et la prise de table sur un même parcours, sans détour.',
    domain: 'koozina-garden.ma',
    tags: ['Réservation', 'Carte', 'Mobile'],
    hue: 96,
    layout: 'editorial',
  },
  /* ---------------- Exemples de mise en page ---------------- */
  {
    slug: 'exemple-landing-immobilier',
    title: 'Landing — Immobilier',
    category: 'LANDING PAGE',
    description:
      'Une offre, un formulaire, aucune sortie latérale. Pensée pour recevoir du trafic payant.',
    domain: 'exemple-immobilier.ma',
    tags: ['Formulaire', 'Ads', 'Conversion'],
    hue: 210,
    layout: 'landing',
    placeholder: true,
  },
  {
    slug: 'exemple-boutique-mode',
    title: 'Boutique — Mode',
    category: 'E-COMMERCE',
    description:
      'Collections saisonnières, filtres rapides et fiches pensées pour la photo verticale.',
    domain: 'exemple-mode.ma',
    tags: ['Collections', 'Filtres', 'Photo'],
    hue: 268,
    layout: 'commerce',
    placeholder: true,
  },
  {
    slug: 'exemple-landing-formation',
    title: 'Landing — Formation',
    category: 'LANDING PAGE',
    description:
      'Programme détaillé, preuve sociale et inscription en un écran, sans menu pour se perdre.',
    domain: 'exemple-formation.ma',
    tags: ['Inscription', 'Programme', 'Ads'],
    hue: 42,
    layout: 'landing',
    placeholder: true,
  },
]

/*
  Avertissement en console tant que les projets sont des exemples.
  Il s'affiche pour toi en developpement, jamais pour un visiteur.
  Meme garde-fou que pour le prenom manquant de la page « A propos » :
  une donnee provisoire doit se signaler, pas se faire oublier.
*/
if (typeof window !== 'undefined') {
  const n = SITE_ITEMS.filter((s) => s.placeholder).length
  if (n > 0) {
    console.warn(
      `[ULTRA VISION] ${n} des ${SITE_ITEMS.length} projets de la section « Sites internet » ` +
        'sont encore des exemples de mise en page. A remplacer dans ' +
        'src/components/work/sites.data.ts, puis retirer leur ligne `placeholder`.',
    )
  }
}
