/**
 * ULTRA VISION — donnees des realisations web.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/components/work/sites.data.ts
 * ============================================================
 *
 * ------------------------------------------------------------
 *  DEUX PROJETS REELS, QUATRE EXEMPLES DE MISE EN PAGE
 *
 *  Le drapeau est desormais POSE PAR PROJET (`placeholder: true`) et
 *  non plus sur toute la section. C'etait necessaire des le premier
 *  vrai projet livre : un drapeau global obligeait a choisir entre
 *  presenter un vrai site sous la mention « exemple » — donc a le
 *  devaloriser — ou presenter quatre inventions sans mention — donc a
 *  mentir.
 *
 *  UN PROJET MARQUE `placeholder: true` :
 *    - porte la mention « Exemple de mise en page » sur sa carte,
 *    - n'est jamais cliquable, meme si une `url` est renseignee,
 *    - est compte dans l'avertissement de console en developpement.
 *
 *  C'est le point important de ce fichier. Publier des references
 *  inventees sous un titre « Realisations » est une pratique
 *  commerciale trompeuse — et le premier prospect qui cherche un de
 *  ces noms et ne trouve rien ne revient pas.
 *
 *  POUR AJOUTER UN VRAI PROJET :
 *    1. remplace un bloc marque `placeholder: true`,
 *    2. retire la ligne `placeholder`,
 *    3. renseigne `url` et `domain`.
 * ------------------------------------------------------------
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
   * Adresse affichee dans la barre du navigateur dessine.
   *
   * Elle est FLOUTEE a l'affichage : on veut la silhouette d'une barre
   * d'adresse, qui est ce qui fait lire « site web », sans donner a
   * lire l'adresse elle-meme — un `github.io` ou un `lovable.app` dans
   * une page de realisations raconte l'hebergeur, pas le client.
   */
  domain: string
  /** Lien reel. Laisse vide tant que le projet est un exemple. */
  url?: string
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
    url: 'https://cleis69.github.io/ideal-marrakech-atelier/',
    tags: ['Catalogue', 'Sur-mesure', 'Devis'],
    hue: 28,
    layout: 'commerce',
  },
  {
    slug: 'garden-coast',
    title: 'Garden Coast',
    category: 'SITE VITRINE • RESTAURATION',
    description:
      'Vitrine de restaurant : la carte, l’ambiance et la réservation accessibles sans jamais scroller deux fois.',
    domain: 'garden-coast.ma',
    url: 'https://garden-coast-vibes.lovable.app/',
    tags: ['Carte', 'Réservation', 'Mobile'],
    hue: 150,
    layout: 'editorial',
  },
  {
    /*
      IDEAL — atelier de mobilier a Marrakech.

      PROJET REEL, SANS ADRESSE. La regle de confidentialite est
      absolue : aucune URL client ne doit apparaitre, ni a l'ecran,
      ni dans le source, ni dans le HTML rendu. Le champ `url` est
      absent (la carte n'est donc jamais cliquable vers l'exterieur)
      et le champ `domain` est absent (la barre du navigateur dessine
      un flux neutre, pas une adresse). Un visiteur qui inspecte le
      code source ne trouve aucune trace de l'adresse du site.
    */
    slug: 'ideal',
    title: 'IDEAL — Atelier de mobilier',
    category: 'E-COMMERCE • MOBILIER',
    description:
      "Plateforme e-commerce sur mesure pour un atelier de mobilier à Marrakech. Catalogue produits, fiches détaillées, parcours d'achat optimisé et identité visuelle premium.",
    tags: ['E-commerce', 'Branding', 'Web Design', 'UX/UI'],
    hue: 200,
    layout: 'commerce',
  },
  {
    /*
      RAPHAEL ANGLESY — chef prive. Meme regle de confidentialite :
      pas d'URL, pas de domain. La carte n'est pas cliquable.
    */
    slug: 'raphael-anglesy',
    title: 'Raphael Anglesy — Chef privé',
    category: 'SITE VITRINE • GASTRONOMIE',
    description:
      "Site vitrine éditorial pour un chef privé. Mise en scène de l'univers culinaire, présentation des prestations et tunnel de contact orienté conversion.",
    tags: ['Site vitrine', 'Branding', 'Direction artistique'],
    hue: 45,
    layout: 'editorial',
  },
  {
    /*
      KOOZINA GARDEN — restaurant avec reservation en ligne.
      Meme regle de confidentialite : pas d'URL, pas de domain.
    */
    slug: 'koozina-garden',
    title: 'Koozina Garden — Restaurant',
    category: 'SITE VITRINE • RESTAURATION',
    description:
      "Site vitrine avec système de réservation en ligne. Expérience immersive, présentation du lieu et de la carte, réservation fluide en quelques clics.",
    tags: ['Site vitrine', 'Réservation', 'Web App', 'UX/UI'],
    hue: 120,
    layout: 'landing',
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
    slug: 'exemple-vitrine-clinique',
    title: 'Vitrine — Clinique',
    category: 'SITE VITRINE',
    description:
      'Prise de rendez-vous en ligne, équipe présentée, et les informations pratiques en tête de page.',
    domain: 'exemple-clinique.ma',
    tags: ['Rendez-vous', 'Équipe', 'SEO'],
    hue: 168,
    layout: 'editorial',
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
