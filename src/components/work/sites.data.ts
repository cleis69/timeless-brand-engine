/**
 * ULTRA VISION — donnees des realisations web.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/components/work/sites.data.ts
 * ============================================================
 *
 * ------------------------------------------------------------
 *  ATTENTION — CES SIX PROJETS SONT DES EXEMPLES DE MISE EN PAGE
 *
 *  Ils servent a juger le rendu de la section en attendant les
 *  vrais projets. Ils ne correspondent a aucun client existant.
 *
 *  TANT QUE `SITES_ARE_PLACEHOLDERS` VAUT `true` :
 *    - la section porte la mention « Exemples de mise en page »,
 *    - aucun chiffre de resultat n'est affiche,
 *    - un avertissement s'affiche dans la console en developpement.
 *
 *  C'est volontaire, et c'est le point important de ce fichier.
 *  Publier des references inventees sous un titre « Realisations »
 *  est une pratique commerciale trompeuse — et le premier prospect
 *  qui cherche un de ces noms et ne trouve rien ne revient pas.
 *
 *  QUAND TU AURAS LES VRAIS PROJETS :
 *    1. remplace les blocs ci-dessous par les vrais,
 *    2. passe `SITES_ARE_PLACEHOLDERS` a `false`,
 *    3. renseigne `url` pour rendre les cartes cliquables.
 * ------------------------------------------------------------
 */

/** Passe a `false` le jour ou les projets ci-dessous sont reels. */
export const SITES_ARE_PLACEHOLDERS = true

export type SiteItem = {
  /** Identifiant en minuscules avec des tirets. */
  slug: string
  /** Nom du projet. Neutre et descriptif tant que c'est un exemple. */
  title: string
  /** Type de projet, affiche en majuscules espacees. */
  category: string
  /** Une phrase. Ce que le site devait resoudre. */
  description: string
  /** Adresse affichee dans la barre du navigateur dessine. */
  domain: string
  /** Lien reel. Laisse vide tant que le projet est un exemple. */
  url?: string
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
  {
    slug: 'exemple-vitrine-restaurant',
    title: 'Vitrine — Restauration',
    category: 'SITE VITRINE',
    description:
      'Une carte lisible, des horaires justes et un bouton de réservation visible sans scroller.',
    domain: 'exemple-restaurant.ma',
    tags: ['Réservation', 'Carte', 'Mobile'],
    hue: 24,
    layout: 'editorial',
  },
  {
    slug: 'exemple-boutique-cosmetique',
    title: 'Boutique — Cosmétique',
    category: 'E-COMMERCE',
    description:
      'Fiches produit courtes, tunnel en trois étapes et paiement sans création de compte.',
    domain: 'exemple-cosmetique.ma',
    tags: ['Catalogue', 'Paiement', 'Panier'],
    hue: 320,
    layout: 'commerce',
  },
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
  },
  {
    slug: 'exemple-vitrine-clinique',
    title: 'Vitrine — Clinique',
    category: 'SITE VITRINE',
    description:
      'Prise de rendez-vous en ligne, équipe présentée, et les informations pratiques en tête de page.',
    domain: 'exemple-clinique.ma',
    tags: ['Rendez-vous', 'Équipe', 'SEO'],
    hue: 168,
    layout: 'editorial',
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
  },
]

/*
  Avertissement en console tant que les projets sont des exemples.
  Il s'affiche pour toi en developpement, jamais pour un visiteur.
  Meme garde-fou que pour le prenom manquant de la page « A propos » :
  une donnee provisoire doit se signaler, pas se faire oublier.
*/
if (typeof window !== 'undefined' && SITES_ARE_PLACEHOLDERS) {
  console.warn(
    '[ULTRA VISION] La section « Sites internet » affiche des exemples de mise en page, ' +
      'pas des projets reels. A remplacer dans src/components/work/sites.data.ts, ' +
      'puis passer SITES_ARE_PLACEHOLDERS a false.',
  )
}
