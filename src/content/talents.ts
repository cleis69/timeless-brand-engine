/**
 * ULTRA VISION — nos talents (actrices, modeles, createrices).
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/content/talents.ts
 *
 *  C'EST ICI QU'ON AJOUTE, RETIRE OU REORDONNE UN TALENT.
 *  La page /casting suit toute seule.
 * ============================================================
 *
 * TANT QUE LA LISTE EST VIDE, la section « Nos talents » ne s'affiche
 * pas du tout, et la page /casting reste une page de candidature. Une
 * galerie vide, ou remplie de visages d'illustration, dirait le
 * contraire de ce qu'elle doit dire : qu'on travaille avec de vraies
 * personnes.
 *
 * ------------------------------------------------------------
 *  AJOUTER UN TALENT
 *
 *  1. Ses photos dans public/talents/<slug>/ : 1.webp, 2.webp…
 *     Format VERTICAL 3:4, 1200 px de haut. La premiere est la
 *     couverture de sa carte, la seconde apparait au survol.
 *  2. Une entree dans TALENTS ci-dessous, sur le modele en commentaire.
 *
 *  L'ordre de la liste est l'ordre d'affichage : mets en tete les
 *  profils que tu veux pousser.
 *
 *  AVANT DE PUBLIER QUELQU'UN : son accord ecrit pour apparaitre sur
 *  le site, avec ces photos-la. Prenom et initiale du nom suffisent —
 *  un nom complet a cote d'une photo et d'une ville, c'est plus qu'il
 *  n'en faut pour retrouver quelqu'un.
 * ------------------------------------------------------------
 */

/** Les familles de profils. L'ordre est celui des filtres de la page. */
export const TALENT_CATEGORIES = [
  { id: "actrice", label: "Actrices", one: "Actrice" },
  { id: "mannequin", label: "Mannequins", one: "Mannequin" },
  { id: "ugc", label: "Créatrices UGC", one: "Créatrice UGC" },
] as const;

export type TalentCategory = (typeof TALENT_CATEGORIES)[number]["id"];

/** Tranches d'age proposees en filtre. `max` inclus. */
export const AGE_RANGES = [
  { id: "18-24", label: "18–24 ans", min: 18, max: 24 },
  { id: "25-34", label: "25–34 ans", min: 25, max: 34 },
  { id: "35+", label: "35 ans et +", min: 35, max: 120 },
] as const;

export type Talent = {
  /** Identifiant d'adresse : /casting?profil=<slug>. Minuscules, sans accent. */
  slug: string;
  /** Prenom et initiale : « Samira E. ». */
  name: string;
  /** Une ou plusieurs familles. La premiere est affichee sur la carte. */
  categories: TalentCategory[];
  /**
   * Annee et mois de naissance, « 1998-04 ». L'age affiche se met a jour
   * tout seul — un age ecrit en dur est faux un an apres.
   */
  born: string;
  city: string;
  /** En centimetres. */
  height?: number;
  languages: string[];
  /** Chemins depuis public/, la premiere est la couverture. */
  photos: string[];
  /** Seulement si la personne souhaite qu'il apparaisse. */
  instagram?: string;
  /** Tournages realises avec nous : « Institut de beauté — Meta, 2026 ». */
  credits?: string[];
};

/*
  MODELE D'ENTREE — a copier dans la liste, puis a remplir.

  {
    slug: "prenom-n",
    name: "Prénom N.",
    categories: ["actrice", "ugc"],
    born: "1998-04",
    city: "Casablanca",
    height: 168,
    languages: ["Darija", "Français"],
    photos: ["/talents/prenom-n/1.webp", "/talents/prenom-n/2.webp"],
    instagram: "@compte",
    credits: ["Institut de beauté — Meta, 2026"],
  },
*/
export const TALENTS: Talent[] = [];

/** Age en annees revolues, a partir de « AAAA-MM ». */
export function talentAge(t: Talent, now = new Date()): number {
  const [y = 0, m = 1] = t.born.split("-").map(Number);
  const age = now.getFullYear() - y;
  return now.getMonth() + 1 < m ? age - 1 : age;
}

export const categoryLabel = (id: TalentCategory | undefined) =>
  TALENT_CATEGORIES.find((c) => c.id === id)?.one ?? "";

export const findTalent = (slug: string | undefined) =>
  slug ? TALENTS.find((t) => t.slug === slug) : undefined;
