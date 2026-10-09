/**
 * ULTRA VISION — donnees des realisations web.
 *
 * ============================================================
 *  REGLE 1 : AUCUNE CARTE N'EST CLIQUABLE
 * ============================================================
 *
 *  Les realisations se donnent a voir, pas a visiter. Aucune carte de
 *  cette section ne mene vers l'adresse reelle du site client : un
 *  visiteur qui veut en savoir plus passe par le contact.
 *
 *  Aucune URL reelle de site client ne doit subsister dans le depot —
 *  ni dans une prop, ni dans un href, ni en commentaire. Le champ `url`
 *  a ete supprime du type. Seul `domain` est renseigne, et il sert
 *  d'ADRESSE D'AFFICHAGE fictive : il est floute dans la vignette pour
 *  garder la silhouette d'une barre d'adresse (ce qui fait lire
 *  « site web ») sans donner a lire l'adresse elle-meme.
 *
 *  UNE SEULE EXCEPTION, DOCUMENTEE (9 octobre 2026) :
 *  `caseStudy.website`. C'est l'adresse d'un domaine de PRODUCTION,
 *  publiee avec l'accord du client, et elle n'est liee QUE depuis la
 *  page d'etude de cas /realisations/<slug>, dans sa fiche « En bref ».
 *  Jamais depuis une carte (les cartes restent non cliquables, y compris
 *  celle d'un projet qui a son etude de cas), et jamais une adresse de
 *  previsualisation ou d'hebergeur. Premier et seul cas : Find Estate.
 *  Pour ce projet, `domain` reprend donc l'adresse reelle, deja publique
 *  par ce lien ; elle reste floutee dans la vignette comme les autres.
 *
 * ============================================================
 *  REGLE 2 : UNE VRAIE CAPTURE BAT TOUJOURS UNE MAQUETTE
 * ============================================================
 *
 *  `shot` est le chemin d'une capture d'ecran du site. Quand il est
 *  renseigne, la carte affiche la capture ; sinon elle retombe sur la
 *  maquette dessinee en CSS.
 *
 *  Ce repli n'est pas un luxe. Les projets reels d'Ultra Vision (cinq
 *  aujourd'hui) partagent la meme signature — fond sombre, accent
 *  chaud. Le champ `hue` etait cense les distinguer ; il n'y arrive pas,
 *  parce que la ressemblance est REELLE. Des maquettes dessinees aux
 *  teintes voisines se lisent comme plusieurs fois le meme site. Les
 *  captures sont donc le seul moyen de montrer des projets distincts, et
 *  `hue` ne sert plus qu'aux cartes « Exemple », qui n'ont pas de capture.
 *
 *  LES CAPTURES ACTUELLES sont des captures de FENETRE, servies en WebP
 *  de 960 px de large (`shot-960.webp`, 15 a 70 Ko) : trois a quatre
 *  fois plus legeres que les PNG d'origine, gardes a cote comme source.
 *  Une amelioration reste possible : les refaire en PLEINE PAGE. Une
 *  capture haute laisse de la matiere au defilement du survol, qui est
 *  le geste qui fait lire « c'est un site » plutot que « c'est une image
 *  de site ». Remplace le fichier en gardant le meme nom, rien d'autre a
 *  toucher.
 *
 *  NE NOMME JAMAIS un fichier d'apres son hebergeur : cela
 *  reintroduirait l'adresse qu'on vient de masquer.
 *
 * ------------------------------------------------------------
 *  POUR AJOUTER UN VRAI PROJET :
 *    1. remplace un bloc marque `placeholder: true`,
 *    2. retire la ligne `placeholder`,
 *    3. renseigne `domain` (adresse d'affichage, pas l'URL reelle),
 *    4. depose la capture et renseigne `shot`.
 *
 *  POUR LUI DONNER UNE ETUDE DE CAS (page /realisations/<slug>) :
 *    5. renseigne `caseStudy` (meme forme que pour un film, voir
 *       work.data.ts) et `year` ;
 *    6. depose a cote de la capture une image de partage `og.jpg` en
 *       1200x630 : la page d'etude de cas la declare en og:image ;
 *    7. ajoute le slug dans `sites` du secteur (sectors.ts) et du
 *       service (services.ts) concernes.
 * ------------------------------------------------------------
 */

import type { CaseStudy } from './work.data'

/** Vrai tant qu'au moins un projet de la liste est un exemple. */
export const hasPlaceholders = () => SITE_ITEMS.some((s) => s.placeholder)

export type SiteItem = {
  /** Identifiant en minuscules avec des tirets. */
  slug: string
  /** Nom du projet. */
  title: string
  /** Type de projet, affiche en majuscules espacees. */
  category: string
  /** Une phrase. Ce que le site devait resoudre. */
  description: string
  /**
   * Adresse d'affichage FICTIVE, affichee floutee dans la barre du
   * navigateur dessine. Jamais un lien, jamais cliquable, et sans
   * rapport avec l'URL reelle du client.
   */
  domain?: string
  /**
   * Chemin d'une capture d'ecran, depuis `public/`.
   * Absent = la carte retombe sur la maquette dessinee.
   */
  shot?: string
  /**
   * Version large de la capture (1440 px), facultative. Servie par
   * `srcSet` sur la page d'etude de cas, ou la capture occupe toute la
   * largeur du contenu : la version 960 y serait agrandie et floue.
   */
  shotLarge?: string
  /**
   * Vrai tant que le projet est un exemple de mise en page.
   * Absent = projet reel.
   */
  placeholder?: boolean
  /** Trois mots-cles maximum. */
  tags: string[]
  /**
   * Teinte de la maquette DESSINEE, en degres (0-360).
   * Ignoree des qu'une capture existe.
   */
  hue: number
  /**
   * Silhouette de la page dessinee :
   *   'editorial'  -> un grand titre, deux colonnes de texte
   *   'commerce'   -> une grille de produits
   *   'landing'    -> un bloc d'accroche et un formulaire
   */
  layout: 'editorial' | 'commerce' | 'landing'
  /** Annee de mise en ligne, affichee sur la page d'etude de cas. */
  year?: string
  /**
   * ETUDE DE CAS — facultative, comme pour un film (voir work.data.ts).
   *
   * Renseignee, elle cree une page /realisations/<slug>, sans video :
   * la capture y tient la place du film. Objectif, probleme et strategie
   * ne sont JAMAIS ecrits de memoire : a completer avec le client, ou a
   * laisser vides. La carte de la grille, elle, reste non cliquable.
   */
  caseStudy?: CaseStudy
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
    shot: '/work/sites/ideal-contemporain/shot-960.webp',
    tags: ['Catalogue', 'Sur-mesure', 'Devis'],
    hue: 28,
    layout: 'commerce',
  },
  {
    slug: 'raphael-anglesy',
    title: 'Raphaël Anglesy',
    category: 'SITE VITRINE • CHEF PRIVÉ',
    description:
      'Vitrine d’un chef de cuisine, construite en sept chapitres : parcours, prestations privées, création de carte et GM Box, avec réservation directe.',
    domain: 'raphael-anglesy.com',
    shot: '/work/sites/raphael-anglesy/shot-960.webp',
    tags: ['Chapitrée', 'Prestations', 'Réservation'],
    hue: 42,
    layout: 'editorial',
  },
  {
    slug: 'koozina-garden',
    title: 'Koozina Garden',
    category: 'SITE VITRINE • RESTAURANT & SHOP',
    description:
      'Restaurant et boutique à Essaouira : la carte, le jardin, la boutique et les événements sur un site bilingue, avec réservation intégrée.',
    domain: 'koozina-garden.ma',
    shot: '/work/sites/koozina-garden/shot-960.webp',
    tags: ['Bilingue', 'Boutique', 'Réservation'],
    hue: 18,
    layout: 'editorial',
  },
  {
    slug: 'rev',
    title: 'R.E.V',
    category: 'SITE VITRINE • IMMOBILIER',
    description:
      'Site vitrine pour la photographie et la vidéo immobilière, avec formulaire de prise de rendez-vous.',
    domain: 'rev-immobilier.com',
    shot: '/work/sites/rev/shot-960.webp',
    tags: ['Photo & vidéo', 'Rendez-vous', 'Immobilier'],
    hue: 38,
    layout: 'editorial',
  },
  {
    /*
      Ajoute le 9 octobre 2026, a la place de l'exemple « Landing —
      Formation » : la grille garde ses six cartes. Premier site avec
      une etude de cas, et seul projet dont l'adresse reelle est liee
      (voir la REGLE 1, en tete de fichier).
    */
    slug: 'find-estate',
    title: 'Find Estate',
    category: 'REFONTE • CONCIERGERIE',
    description:
      'Conciergerie de location courte durée en France et à Dubaï : pages propriétaires, estimateur de revenus et demandes reliées directement à la conciergerie.',
    domain: 'find-estate.com',
    shot: '/work/sites/find-estate/shot-960.webp',
    shotLarge: '/work/sites/find-estate/shot-1440.webp',
    tags: ['Refonte', 'Estimateur', 'Formulaires'],
    hue: 40,
    layout: 'editorial',
    year: '2026',
    caseStudy: {
      client: 'Find Estate',
      sector: 'immobilier',
      location: 'Lyon, Paris et Dubaï',
      services: ['creation-site-web'],
      headline: 'Refonte de Find Estate : le site d’une conciergerie de location courte durée, de Lyon à Dubaï.',
      seoTitle: 'Find Estate : refonte du site d’une conciergerie',
      seoDescription:
        'Refonte du site de Find Estate, conciergerie de location courte durée en France et à Dubaï : estimateur de revenus, formulaires et référencement page par page.',
      summary:
        'Pour Find Estate, conciergerie de location courte durée fondée à Lyon en 2023 et présente en France et à Dubaï, UltraVision Agency a réalisé et mis en ligne un nouveau site de 22 pages sur find-estate.com : pages pour les propriétaires, estimateur de revenus en cinq étapes, formulaires reliés à la conciergerie et référencement page par page.',
      execution:
        "Vingt-deux pages : formules pour les propriétaires, estimateur de revenus en cinq étapes avec des repères de marché sourcés, destinations, logements, avis et contact. Chaque demande est enregistrée et transmise par e-mail à la conciergerie, avec un consentement explicite. Mentions légales et politique de confidentialité rédigées pour le site, polices auto-hébergées. Refonte visuelle d'après une maquette : Cormorant Garamond et Jost, angles droits ; palette noir et or. Photos : celles des annonces Airbnb de la conciergerie, choisies et ordonnées pour le site. Les notes Airbnb sont affichées avec leur nombre d'avis, et datées sur les fiches des logements et la page Avis.",
      tools: ['TanStack Start', 'Cloudflare Workers', 'Cloudflare D1'],
      website: 'https://find-estate.com',
    },
  },
  /* ---------------- Exemples de mise en page ---------------- */
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
]

/*
  Deux avertissements en console, en developpement seulement.
  Jamais affiches a un visiteur.

  Une donnee provisoire doit se signaler, pas se faire oublier.
*/
if (import.meta.env.DEV && typeof window !== 'undefined') {
  const exemples = SITE_ITEMS.filter((s) => s.placeholder).length
  if (exemples > 0) {
    console.warn(
      `[ULTRA VISION] ${exemples} des ${SITE_ITEMS.length} projets de la section « Sites internet » ` +
        'sont encore des exemples de mise en page. A remplacer dans ' +
        'src/components/work/sites.data.ts, puis retirer leur ligne `placeholder`.',
    )
  }

  const sansCapture = SITE_ITEMS.filter((s) => !s.placeholder && !s.shot)
  if (sansCapture.length > 0) {
    console.warn(
      `[ULTRA VISION] ${sansCapture.length} projet(s) reel(s) sans capture : ` +
        sansCapture.map((s) => s.slug).join(', ') +
        `. Ils s'affichent avec la maquette dessinee, qui ne montre pas le site.`,
    )
  }
}
