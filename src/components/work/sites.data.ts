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
 * ============================================================
 *  REGLE 2 : UNE VRAIE CAPTURE BAT TOUJOURS UNE MAQUETTE
 * ============================================================
 *
 *  `shot` est le chemin d'une capture d'ecran du site. Quand il est
 *  renseigne, la carte affiche la capture ; sinon elle retombe sur la
 *  maquette dessinee en CSS.
 *
 *  Ce repli n'est pas un luxe. Les quatre projets reels d'Ultra Vision
 *  partagent la meme signature — fond sombre, accent chaud. Le champ
 *  `hue` etait cense les distinguer ; il n'y arrive pas, parce que la
 *  ressemblance est REELLE. Quatre maquettes dessinees aux teintes
 *  voisines se lisent comme quatre fois le meme site. Les captures sont
 *  donc le seul moyen de montrer quatre projets distincts, et `hue` ne
 *  sert plus qu'aux cartes « Exemple », qui n'ont pas de capture.
 *
 *  LES CAPTURES ACTUELLES sont des captures de FENETRE en PNG. Elles
 *  fonctionnent, mais deux ameliorations restent possibles :
 *    - convertir en WebP 900 px (squoosh.app) : ~4x plus leger ;
 *    - refaire en PLEINE PAGE : une capture haute laisse de la matiere
 *      au defilement du survol, qui est le geste qui fait lire
 *      « c'est un site » plutot que « c'est une image de site ».
 *  Remplace le fichier en gardant le meme nom, rien d'autre a toucher.
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
 * ------------------------------------------------------------
 */

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
    shot: '/work/sites/ideal-contemporain/shot.png',
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
    shot: '/work/sites/raphael-anglesy/shot.png',
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
    shot: '/work/sites/koozina-garden/shot.png',
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
    shot: '/work/sites/rev/shot.png',
    tags: ['Photo & vidéo', 'Rendez-vous', 'Immobilier'],
    hue: 38,
    layout: 'editorial',
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
  Deux avertissements en console, en developpement seulement.
  Jamais affiches a un visiteur.

  Une donnee provisoire doit se signaler, pas se faire oublier.
*/
if (typeof window !== 'undefined') {
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
