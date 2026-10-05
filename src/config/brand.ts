/**
 * UltraVision Agency — l'identite de l'entreprise, en un seul endroit.
 *
 * ============================================================
 *  CE FICHIER EST LA SOURCE DE VERITE DE L'ENTITE.
 * ============================================================
 *
 * Google, ChatGPT, Claude, Gemini ou Perplexity ne « comprennent » une
 * entreprise que si elle se decrit de la meme facon partout : dans les
 * titres, dans les textes, dans les donnees structurees, dans llms.txt.
 * Une seule variation — un autre nom, une autre ville, une autre
 * categorie — et ils hesitent entre plusieurs entreprises.
 *
 * Le nom « UltraVision » est partage par plus de dix societes dans le
 * monde, dont une agence parisienne qui a travaille a Marrakech. Le nom
 * complet, la categorie et la ville sont donc TOUJOURS donnes ensemble.
 *
 * NOM OFFICIEL : « UltraVision Agency ».
 * Le logo dessine « ULTRA VISION » : c'est une graphie, pas un autre nom.
 *
 * ------------------------------------------------------------
 *  A COMPLETER QUAND L'INFORMATION EXISTE — JAMAIS AVANT
 *
 *  - `SOCIAL` : les autres profils officiels (LinkedIn, YouTube, fiche
 *    Google Business Profile), quand ils existent.
 *  - `address.streetAddress` : seulement si l'adresse est publique.
 *
 *  Un champ vide n'est pas publie. Un champ invente l'est, et se
 *  propage dans les moteurs.
 * ------------------------------------------------------------
 */

import { SITE_URL } from "./site";

/**
 * LES PROFILS OFFICIELS, communiques par l'agence.
 *
 * Ils alimentent `sameAs` dans les donnees structurees, la ligne
 * « Profils officiels » de llms.txt et les liens du pied de page. C'est
 * ce qui permet a un moteur de relier ce site et ces comptes a la meme
 * entreprise — et de ne pas les confondre avec ceux des homonymes.
 */
export const SOCIAL = [
  {
    network: "Instagram",
    handle: "@ultravision.agency",
    url: "https://www.instagram.com/ultravision.agency/",
  },
  {
    network: "TikTok",
    handle: "@ultravision.agency",
    url: "https://www.tiktok.com/@ultravision.agency",
  },
  /*
    Le profil d'agence sur Sortlist, publie le 5 octobre 2026. Un annuaire
    d'agences qui pointe vers le site, et que le site declare en retour :
    c'est ce lien dans les deux sens qui fait reconnaitre l'entreprise.
  */
  {
    network: "Sortlist",
    handle: "UltraVision Agency",
    url: "https://www.sortlist.com/agency/ultra-vision-360-agency",
  },
] as const;

export const BRAND = {
  /** Nom officiel, a utiliser dans tout texte et tout balisage. */
  name: "UltraVision Agency",
  /** Forme courte, pour les phrases ou le nom complet serait lourd. */
  short: "UltraVision",
  /** Graphies deja rencontrees, declarees pour que les moteurs les relient. */
  alternateNames: ["UltraVision", "ULTRA VISION"],
  /** La categorie, en anglais comme dans la signature de la marque. */
  category: "Creative Growth Agency",
  /** La meme categorie, dans les mots que les gens tapent. */
  categoryFr: "agence de marketing digital",
  /** Signature publiee sur le site depuis l'origine. */
  slogan: "Nous transformons vos vues en ventes",
  city: "Marrakech",
  country: "Maroc",
  countryCode: "MA",
  /**
   * LA PHRASE DE DEFINITION.
   *
   * Elle repond a « Qu'est-ce qu'UltraVision Agency ? » et doit rester
   * vraie sortie de son contexte. Elle est reprise telle quelle dans la
   * FAQ de l'accueil, la page pilier, le pied de page et llms.txt.
   */
  definition:
    "UltraVision Agency est une Creative Growth Agency, c'est-à-dire une agence de marketing digital, basée à Marrakech, au Maroc.",
  /** Ce que fait l'agence, en une phrase qui suit la definition. */
  summary:
    "Elle réunit dans une seule équipe la marque, la production vidéo et photo, la publicité sur Meta, Google et TikTok, les sites web et les outils de conversion : CRM, intelligence artificielle et automatisation.",
  /** Adresses des profils officiels (voir SOCIAL). */
  sameAs: SOCIAL.map((s) => s.url) as string[],
  founder: { name: "Cleis", jobTitle: "Fondateur" },
  /** Langue de travail affichee sur le site. */
  workingLanguage: "français",
} as const;

/** Identifiants stables du graphe de donnees structurees. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_ID = `${SITE_URL}/#logo`;

/** Logo carre en PNG : Google n'affiche pas de SVG comme logo d'entreprise. */
export const LOGO = {
  path: "/brand/logo/ultravision-agency-logo-512.png",
  width: 512,
  height: 512,
};

/** Image de partage par defaut (WhatsApp, LinkedIn, X, Facebook). */
export const OG_IMAGE = {
  path: "/og/ultravision-agency.jpg",
  width: 1200,
  height: 630,
  alt: "UltraVision Agency — Creative Growth Agency à Marrakech, Maroc",
};

/** Titre complet, ou le nom de marque ferme toujours le titre. */
export const withBrand = (title: string) => `${title} | ${BRAND.name}`;
