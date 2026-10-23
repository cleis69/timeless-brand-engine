/**
 * ULTRA VISION — les articles du blog.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/content/blog.ts
 *
 *  C'EST LE SEUL FICHIER A MODIFIER POUR ECRIRE UN ARTICLE.
 *  Les pages /blog et /blog/mon-article se construisent seules.
 * ============================================================
 *
 * POURQUOI UN BLOG SUR CE SITE, ET CE QU'IL DOIT FAIRE
 *
 * Un blog d'agence ne sert presque jamais a etre lu. Il sert a deux
 * choses tres concretes :
 *
 * 1. REPONDRE AVANT L'APPEL. Chaque article traite une objection que
 *    vous entendez au telephone. Un prospect qui a lu l'article arrive
 *    avec la question suivante, pas avec la premiere.
 *
 * 2. EXISTER SUR GOOGLE sur des recherches que personne ne fait sur
 *    votre nom : « combien coute une video publicitaire », « pourquoi
 *    mes publicites ne convertissent plus ». Ce sont des recherches de
 *    debut de parcours, et ce sont les seules ou vous pouvez apparaitre
 *    sans budget publicitaire.
 *
 * D'ou la regle qui gouverne ces textes : aucun article ne parle de
 * l'agence. Chacun resout un probleme, et l'agence apparait a la fin
 * comme une consequence, jamais comme un sujet.
 *
 * ------------------------------------------------------------
 * COMMENT AJOUTER UN ARTICLE
 *
 * Copie un bloc, change les valeurs. Le corps est une suite de blocs :
 *
 *   { k: 'h2',    v: 'Un intertitre' }
 *   { k: 'p',     v: 'Un paragraphe.' }
 *   { k: 'ul',    v: ['Premier point', 'Deuxieme point'] }
 *   { k: 'quote', v: 'Une phrase mise en exergue.' }
 *   { k: 'note',  v: 'Un encadre bleu, pour un point important.' }
 *   { k: 'table', v: { head: ['Col 1','Col 2'], rows: [['a','b']] } }
 *
 * Les dates sont au format AAAA-MM-JJ. L'ordre d'affichage suit la
 * date, du plus recent au plus ancien.
 * ------------------------------------------------------------
 */

import type { FigureData } from "@/components/Figure";
import { A_LA_CARTE, PACKS, dirham, euro } from "@/config/pricing";
import type { ServiceSlug } from "./services";

/*
 * LES PRIX CITES DANS LES ARTICLES SONT LUS DANS pricing.ts.
 *
 * Un article qui annonce un prix different de la page tarifs fait douter
 * des deux. Les montants ci-dessous suivent donc la grille : si un prix
 * ou le taux du dirham change, les articles changent avec.
 */
const carte = (label: string) => {
  const it = A_LA_CARTE.flatMap((g) => g.items).find((i) => i.label === label);
  if (!it) throw new Error(`[blog] Prestation introuvable dans pricing.ts : ${label}`);
  return it.price;
};
const pack = (id: string) => {
  const p = PACKS.find((x) => x.id === id);
  if (!p) throw new Error(`[blog] Formule introuvable dans pricing.ts : ${id}`);
  return p.price;
};
/** « 4 300 MAD (390 €) » */
const both = (eur: number) => `${dirham(eur)} (${euro(eur)})`;
/** « 8 800 à 16 500 MAD (800 à 1 500 €) » */
const range = (a: number, b: number) =>
  `${dirham(a).replace(" MAD", "")} à ${dirham(b)} (${a.toLocaleString("fr-FR")} à ${euro(b)})`;

const VIDEO = carte("Vidéo publicitaire");
const MEDIA = carte("Media buying");
const LANDING = carte("Landing page de conversion");
const VITRINE = carte("Site vitrine");
const SEO_TECH = carte("Référencement technique");
const ESSAI = pack("essai");
const PRODUCTION = pack("production");
const ACQUISITION = pack("acquisition");
const CM = carte("Community management");
const SEO_SUIVI = carte("Suivi SEO mensuel");
const GEO = carte("Visibilité sur les IA (GEO)");
const CRM = carte("CRM et automatisation des leads");
const OUVERTURE = carte("Ouverture des comptes publicitaires");
/** Budget publicitaire de depart, tel qu'annonce sur /tarifs. */
const AD_BUDGET = range(800, 1500);

export type Block =
  | { k: "h2"; v: string }
  | { k: "p"; v: string }
  | { k: "ul"; v: string[] }
  | { k: "quote"; v: string }
  | { k: "note"; v: string }
  | { k: "table"; v: { head: string[]; rows: string[][] } }
  /**
   * Infographie. Quatre formes disponibles : `funnel`, `steps`, `bars`
   * et `split`. Elles sont dessinees en code, pas importees en image :
   * leur texte reste donc lisible par Google et par les assistants,
   * et elles pesent quelques centaines d'octets au lieu de plusieurs
   * centaines de kilo-octets.
   */
  | { k: "figure"; v: FigureData };

export type Article = {
  slug: string;
  title: string;
  /** Titre court pour l'onglet et Google (60 caracteres, marque comprise). Defaut : `title`. */
  seoTitle?: string;
  /** Sous-titre affiche sous le titre, et dans la liste. */
  excerpt: string;
  /** Une categorie courte. Sert de filtre visuel. */
  category: string;
  date: string;
  /** Duree de lecture en minutes, calculee a la main. */
  readingTime: number;
  /** Description pour Google. 150 a 160 caracteres. */
  seo: string;
  /**
   * L'ESSENTIEL — trois a cinq phrases autonomes.
   *
   * C'est le champ le plus important de tout ce fichier pour la
   * recherche assistee par intelligence artificielle.
   *
   * Un moteur classique classe des pages. Un moteur conversationnel —
   * ChatGPT, Perplexity, l'Apercu IA de Google — extrait des reponses.
   * Il cherche des affirmations courtes, autoportantes, qu'il peut
   * citer sans le reste de l'article.
   *
   * Chaque phrase doit donc se comprendre seule, sans « comme on l'a
   * vu plus haut » ni « cela signifie que ». Sortie de son contexte,
   * elle doit rester vraie et complete.
   *
   * Ces phrases sont affichees en haut de l'article, dans un encadre,
   * et reprises telles quelles dans les donnees structurees.
   */
  takeaways: string[];
  /**
   * QUESTIONS FREQUENTES, en fin d'article.
   *
   * Publiees en donnees structurees FAQPage. C'est le format que
   * Google et les moteurs conversationnels reprennent le plus
   * volontiers, parce que la correspondance entre une question posee
   * et une question ecrite est directe.
   *
   * Les questions doivent etre formulees comme un humain les tape,
   * pas comme un service marketing les redige.
   */
  faq: { q: string; a: string }[];
  body: Block[];
  /**
   * Les services dont parle l'article. Affiches en fin d'article : un
   * lecteur convaincu par la methode doit trouver en un clic le service
   * qui l'applique.
   */
  services?: ServiceSlug[];
};

export const ARTICLES: Article[] = [
  /* ======================================================================
   *  1. TOFU / MOFU / BOFU
   * ==================================================================== */
  {
    slug: "tofu-mofu-bofu-video-publicitaire",
    services: ["meta-ads", "tiktok-ads", "generation-de-leads"],
    title: "TOFU, MOFU, BOFU : pourquoi une seule vidéo ne peut pas vendre",
    seoTitle: "TOFU, MOFU, BOFU en vidéo publicitaire",
    excerpt:
      "La plupart des campagnes échouent pour une raison mécanique : elles montrent le même film à quelqu'un qui découvre la marque et à quelqu'un qui hésite à acheter. Voici comment nous découpons la production en trois étages.",
    category: "Stratégie",
    date: "2026-08-14",
    readingTime: 9,
    seo: "TOFU, MOFU, BOFU appliqué à la vidéo publicitaire : quel film produire pour chaque étage du tunnel, dans quel ordre, et avec quel budget.",
    takeaways: [
      "TOFU, MOFU et BOFU désignent les trois étages d'un tunnel d'acquisition : le haut, le milieu et le bas de l'entonnoir. Chacun s'adresse à une personne qui en sait plus que la précédente sur la marque.",
      "Une vidéo TOFU dure 8 à 15 secondes, ne parle pas de la marque et sert uniquement à arrêter le défilement. Une vidéo MOFU dure 20 à 45 secondes et apporte la preuve. Une vidéo BOFU dure 10 à 20 secondes et présente l'offre.",
      "Une seule vidéo ne peut pas couvrir les trois étages : elle sera trop commerciale pour une audience froide et trop vague pour une audience prête à acheter.",
      "La répartition de départ recommandée est de deux vidéos TOFU, une MOFU et une BOFU par mois, avec 50 à 60 % du budget média sur le haut du tunnel.",
      "On construit le tunnel en commençant par le bas : le BOFU s'adresse à une audience déjà existante et finance la suite. Ouvrir le TOFU en premier revient à payer pour une attention que rien ne récupère.",
    ],
    faq: [
      {
        q: "Que veulent dire TOFU, MOFU et BOFU ?",
        a: "Ce sont les abréviations de top of funnel, middle of funnel et bottom of funnel — le haut, le milieu et le bas de l'entonnoir de conversion. TOFU désigne les contenus destinés à des personnes qui ne connaissent pas la marque, MOFU celles qui la connaissent mais hésitent, BOFU celles qui sont prêtes à acheter.",
      },
      {
        q: "Combien de vidéos faut-il pour couvrir les trois étages ?",
        a: "Quatre vidéos par mois suffisent pour un tunnel complet : deux TOFU, une MOFU et une BOFU. Le haut du tunnel demande plus de production parce qu'une accroche s'use en trois à six semaines, alors qu'une vidéo de preuve se réutilise pendant des mois.",
      },
      {
        q: "Par quel étage faut-il commencer quand on part de zéro ?",
        a: "Par le bas. Une vidéo BOFU envoyée à une audience déjà existante — visiteurs du site, base client, abonnés — produit des résultats immédiats et finance la construction des étages supérieurs. C'est aussi le test le plus rapide pour savoir si le produit a un angle.",
      },
      {
        q: "Quelle part du budget publicitaire mettre sur chaque étage ?",
        a: "En rythme de croisière : 50 à 60 % sur le TOFU, 20 à 30 % sur le MOFU et 20 % sur le BOFU. Concentrer tout le budget sur le BOFU donne d'excellents résultats pendant trois semaines, puis le coût par lead double parce que l'audience est épuisée.",
      },
    ],
    body: [
      {
        k: "p",
        v: "Un annonceur nous appelle presque toujours avec la même phrase : « j'ai fait une vidéo, je l'ai poussée en publicité, ça n'a rien donné ». Neuf fois sur dix, la vidéo n'était pas mauvaise. Elle était seule.",
      },
      {
        k: "p",
        v: "Une publicité ne fait pas passer quelqu'un de l'ignorance à l'achat. Elle le fait avancer d'un cran. Si vous n'avez qu'un cran, tout le monde reste au même endroit.",
      },

      { k: "h2", v: "Les trois étages, en une phrase chacun" },
      {
        k: "p",
        v: "TOFU, MOFU et BOFU découpent l'entonnoir — le tunnel — en trois moments. Le vocabulaire vient de l'anglais top, middle et bottom of funnel : le haut, le milieu et le bas de l'entonnoir. Derrière ces sigles, il n'y a qu'une question : qu'est-ce que la personne sait déjà de vous au moment où votre vidéo apparaît ?",
      },
      {
        k: "figure",
        v: {
          type: "funnel",
          caption:
            "Les trois étages du tunnel. La largeur représente le volume d'audience touchée : beaucoup de monde en haut, peu de monde en bas, mais une valeur par personne qui augmente à chaque étage.",
          levels: [
            {
              label: "TOFU — haut",
              value: "8 à 15 s",
              sub: "La personne ne vous connaît pas. La vidéo doit arrêter le pouce et poser un problème qu'elle reconnaît.",
              note: "Audience froide · 50 à 60 % du budget",
            },
            {
              label: "MOFU — milieu",
              value: "20 à 45 s",
              sub: "Elle vous a vu mais n'a pas décidé. La vidéo doit prouver que vous savez faire.",
              note: "Audience ayant déjà interagi · 20 à 30 % du budget",
            },
            {
              label: "BOFU — bas",
              value: "10 à 20 s",
              sub: "Elle hésite et compare. La vidéo doit lever le dernier frein et faire agir.",
              note: "Audience chaude · 20 % du budget",
            },
          ],
        },
      },
      {
        k: "quote",
        v: "Une vidéo BOFU montrée à quelqu'un qui ne vous connaît pas ne vend rien. Elle agace.",
      },

      { k: "h2", v: "TOFU — la vidéo qui arrête le pouce" },
      {
        k: "p",
        v: "En haut du tunnel, votre concurrent n'est pas l'autre marque. C'est le pouce du spectateur. Vous avez entre une et deux secondes avant qu'il ne défile, et la personne n'a rien demandé.",
      },
      {
        k: "p",
        v: "Une vidéo TOFU ne parle donc jamais de vous. Elle parle d'un problème que la personne reconnaît immédiatement, ou elle montre quelque chose qu'elle n'a pas l'habitude de voir. Le nom de la marque peut n'apparaître qu'à la fin, et parfois pas du tout.",
      },
      {
        k: "ul",
        v: [
          "Durée : 8 à 15 secondes. Au-delà, la chute d'attention est brutale.",
          "L'accroche tient dans les 2 premières secondes, sans logo, sans introduction.",
          "Aucun jargon métier : la personne ne sait pas encore de quoi vous parlez.",
          "Un seul message. Deux messages dans une vidéo TOFU, c'est zéro message.",
        ],
      },
      {
        k: "p",
        v: "C'est l'étage où le volume compte le plus. Une accroche qui fonctionne ne se devine pas, elle se trouve — et pour la trouver il faut en tester plusieurs. C'est la raison pour laquelle nos formules mensuelles comportent quatre vidéos et non une : quatre angles différents sur le même produit, dont un seul, en général, se détache vraiment.",
      },

      { k: "h2", v: "MOFU — la vidéo qui prouve" },
      {
        k: "p",
        v: "Au milieu, la personne vous a déjà vu. Elle n'a pas besoin d'être surprise, elle a besoin d'être rassurée. C'est l'étage le plus souvent oublié, et c'est celui où se perdent le plus de ventes : le prospect a compris le problème, il ne sait pas encore pourquoi ce serait vous plutôt qu'un autre.",
      },
      {
        k: "ul",
        v: [
          "Démonstration réelle du produit ou du service, filmée sans effet.",
          "Coulisses, méthode, atelier : ce qui montre que vous savez faire.",
          "Témoignage client, si et seulement si le client est réel et nommé.",
          "Comparaison honnête : ce que vous faites, ce que vous ne faites pas.",
        ],
      },
      {
        k: "p",
        v: "Le format s'allonge : 20 à 45 secondes. On accepte ici que la personne regarde plus longtemps, parce qu'elle a déjà manifesté un intérêt. Le ciblage aussi change : on ne s'adresse plus à une audience froide, mais à ceux qui ont vu la vidéo TOFU, visité le site ou interagi avec le compte.",
      },
      {
        k: "note",
        v: "C'est à cet étage que se joue la différence entre une agence qui livre des vidéos et une agence qui pilote la diffusion. Une vidéo MOFU envoyée à une audience froide dépense du budget pour rien. Le film peut être excellent : montré au mauvais moment, il ne prouve rien à personne.",
      },

      { k: "h2", v: "BOFU — la vidéo qui fait agir" },
      {
        k: "p",
        v: "En bas, la personne est prête. Elle compare, elle calcule, elle repousse. Votre vidéo n'a plus qu'un travail : supprimer la dernière raison de ne pas y aller.",
      },
      {
        k: "ul",
        v: [
          "L'offre est dite clairement, avec son prix ou sa condition d'entrée.",
          "La garantie, le délai ou la réversibilité sont montrés, pas suggérés.",
          "Un seul appel à l'action, répété. Pas trois options.",
          "Durée courte à nouveau : 10 à 20 secondes suffisent.",
        ],
      },
      {
        k: "p",
        v: "C'est l'étage le moins créatif et le plus rentable. Le coût par acquisition y est presque toujours le plus bas du compte — ce qui pousse beaucoup d'annonceurs à n'investir que là. C'est une erreur de court terme : sans TOFU, l'audience BOFU s'épuise en quelques semaines et le coût explose.",
      },

      { k: "h2", v: "Comment nous répartissons la production" },
      {
        k: "p",
        v: "Sur quatre vidéos par mois, notre répartition de départ est la suivante. Elle bouge ensuite selon ce que disent les chiffres.",
      },
      {
        k: "figure",
        v: {
          type: "bars",
          caption:
            "Répartition du budget média sur quatre vidéos mensuelles. Le haut de tunnel concentre plus de la moitié de la dépense parce que c'est le seul étage où l'on cherche encore.",
          unit: "Part du budget publicitaire mensuel, hors production.",
          bars: [
            { label: "TOFU — 2 vidéos", value: 55, display: "50 à 60 %", highlight: true },
            { label: "MOFU — 1 vidéo", value: 25, display: "20 à 30 %" },
            { label: "BOFU — 1 vidéo", value: 20, display: "20 %" },
          ],
        },
      },
      {
        k: "p",
        v: "Deux vidéos TOFU parce que c'est l'étage où l'on cherche encore. Une MOFU et une BOFU parce que ces deux-là, une fois trouvées, se réutilisent pendant des mois : une bonne vidéo de preuve ne s'use presque pas, une accroche s'use en trois semaines.",
      },
      {
        k: "quote",
        v: "L'accroche s'use. La preuve, non. C'est pour cela qu'on produit plus de haut de tunnel que de bas.",
      },

      { k: "h2", v: "L'ordre dans lequel on construit" },
      {
        k: "p",
        v: "Contre-intuitivement, on ne commence pas par le haut. On commence par le bas.",
      },
      {
        k: "figure",
        v: {
          type: "steps",
          caption:
            "L'ordre de construction, à l'envers de l'ordre de lecture. On installe d'abord ce qui convertit, ensuite ce qui attire.",
          steps: [
            {
              label: "Semaine 1 — BOFU",
              sub: "Une audience prête existe déjà : visiteurs du site, base client, abonnés.",
            },
            {
              label: "Semaines 2 à 4 — MOFU",
              sub: "On installe la preuve pendant que le BOFU tourne et rapporte.",
            },
            {
              label: "Mois 2 — TOFU",
              sub: "On ouvre le haut une fois que ce qui suit est en place.",
            },
            {
              label: "Mois 3 — Bascule",
              sub: "Le budget se déplace vers le haut, le bas fonctionne seul.",
            },
          ],
        },
      },
      {
        k: "p",
        v: "Ouvrir le TOFU en premier, c'est verser de l'eau dans un tuyau qui n'est pas encore raccordé. Vous payez pour de l'attention que rien ne récupère.",
      },

      { k: "h2", v: "Les trois erreurs que nous voyons le plus" },
      {
        k: "ul",
        v: [
          "Une seule vidéo poussée sur tout le monde. Elle est forcément trop vague pour le bas et trop commerciale pour le haut.",
          "Tout le budget en BOFU. Les résultats sont excellents trois semaines, puis le coût par lead double sans explication apparente : l'audience est simplement épuisée.",
          "Changer de vidéo trop vite. Une accroche a besoin de quelques milliers d'impressions avant de dire quelque chose. Couper au bout de deux jours, c'est ne jamais rien apprendre.",
        ],
      },

      { k: "h2", v: "Ce que ça donne concrètement" },
      {
        k: "p",
        v: "Le mois d'ouverture sert à poser les trois étages et à trouver l'accroche. Les mois suivants servent à remplacer ce qui s'use — c'est-à-dire, presque toujours, le haut du tunnel. C'est exactement le rythme de nos formules mensuelles : quatre vidéos, réparties sur les trois étages, et une diffusion pilotée qui décide où va chaque euro.",
      },
      {
        k: "note",
        v: "Si vous partez de zéro, ne cherchez pas à construire les trois étages le premier mois. Une seule vidéo BOFU envoyée à votre base existante vous apprendra plus, et plus vite, que trois films envoyés à des inconnus.",
      },
    ],
  },

  /* ======================================================================
   *  2. LE PRIX D'UNE VIDEO
   * ==================================================================== */
  {
    slug: "combien-coute-une-video-publicitaire",
    services: ["production-video-photo", "meta-ads"],
    title: "Combien coûte une vidéo publicitaire ? Les prix en dirhams et en euros",
    seoTitle: "Prix d'une vidéo publicitaire au Maroc",
    excerpt: `Entre ${range(200, 8000)} pour un objet qui porte le même nom. Ce qui change vraiment d'un devis à l'autre, les prix pratiqués à Marrakech, et les questions à poser avant de signer.`,
    category: "Tarifs",
    date: "2026-08-10",
    readingTime: 6,
    seo: "Prix d'une vidéo publicitaire en dirhams et en euros : ce qui fait varier un devis, nos tarifs à Marrakech et les cinq questions à poser avant de signer.",
    takeaways: [
      `Le prix d'une vidéo publicitaire varie de ${both(150)} pour un simple montage à plus de ${both(15000)} pour une production avec équipe complète et comédiens.`,
      `Pour de la publicité en ligne, la gamme pertinente se situe entre ${range(400, 1200)} : écriture, tournage et montage avec une équipe réduite.`,
      `À Marrakech, UltraVision Agency facture une vidéo publicitaire ${both(VIDEO)} hors taxes et hors budget publicitaire : angle, script, tournage, montage et formats verticaux compris.`,
      "Cinq facteurs expliquent l'essentiel des écarts : la présence ou non d'un tournage, le temps passé à l'écriture, les intervenants externes, le nombre de déclinaisons et l'inclusion ou non du pilotage des campagnes.",
      "Le budget publicitaire versé aux plateformes n'est presque jamais inclus dans le prix d'une vidéo. C'est la première source de malentendu entre une agence et son client.",
      "Sur un feed de téléphone, un plan à 8 000 € et un plan à 400 € occupent la même surface d'écran pendant la même seconde et demie. L'accroche pèse davantage que le budget de tournage.",
    ],
    faq: [
      {
        q: "Combien coûte une vidéo publicitaire pour Meta ou TikTok ?",
        a: `Comptez ${range(400, 1200)} pour une production légère comprenant écriture, tournage et montage. En dessous de ${both(400)}, il s'agit généralement d'un montage à partir d'images que vous fournissez. Au-dessus de ${both(3000)}, on entre dans la production lourde, rarement justifiée pour de la publicité en ligne.`,
      },
      {
        q: "Combien coûte une vidéo publicitaire au Maroc ?",
        a: `Chez UltraVision Agency, à Marrakech, une vidéo publicitaire coûte ${both(VIDEO)} hors taxes : angle, script, tournage, montage et formats verticaux. Une première vidéo avec 14 jours de diffusion pilotée coûte ${both(ESSAI)}. Le budget publicitaire versé aux plateformes s'ajoute toujours.`,
      },
      {
        q: "Le budget publicitaire est-il compris dans le prix d'une vidéo ?",
        a: `Non, presque jamais. Le budget média est versé directement aux plateformes depuis votre propre compte publicitaire. Il s'ajoute au coût de production. Prévoyez ${AD_BUDGET} par mois pour démarrer selon le secteur.`,
      },
      {
        q: "Quelles questions poser avant de signer un devis vidéo ?",
        a: "Cinq questions suffisent : le budget publicitaire est-il inclus, combien de versions du montage sont comprises, à qui appartiennent les fichiers sources et le compte publicitaire, qui paie les comédiens et les lieux, et que se passe-t-il si la vidéo ne performe pas.",
      },
      {
        q: "Une vidéo plus chère est-elle plus efficace ?",
        a: "Pas mécaniquement. Au-delà d'un certain seuil de qualité technique, le budget de tournage ne se voit plus sur un écran de téléphone. Ce qui fait la différence de performance est l'angle publicitaire et la qualité des deux premières secondes.",
      },
    ],
    body: [
      {
        k: "p",
        v: "C'est la question qu'on nous pose en premier, et c'est aussi celle à laquelle il est le plus difficile de répondre honnêtement, parce que « une vidéo publicitaire » ne désigne pas un objet mais une famille d'objets qui n'ont presque rien en commun.",
      },

      { k: "h2", v: "Ce qui fait vraiment varier un devis" },
      {
        k: "ul",
        v: [
          "Le tournage. Une vidéo montée à partir d'images existantes et une vidéo tournée sur place ne sont pas la même prestation. Le tournage, c'est une équipe, une journée, du matériel et un lieu.",
          "L'écriture. Un script trouvé après trois versions coûte plus cher qu'un script écrit d'un jet — et il vend souvent trois fois mieux.",
          "Les intervenants. Un comédien, un mannequin ou un lieu payant s'ajoutent toujours au devis. Une agence qui ne le mentionne pas vous le facturera plus tard.",
          "Les déclinaisons. Une vidéo ou une vidéo déclinée en quatre formats, ce n'est pas le même travail de montage.",
          "La diffusion. Certains prix incluent le pilotage des campagnes, d'autres non. C'est la plus grosse source de malentendu.",
        ],
      },

      { k: "h2", v: "Les trois grandes gammes du marché" },
      {
        k: "figure",
        v: {
          type: "bars",
          caption:
            "Les trois gammes du marché, en prix moyen constaté. La gamme du milieu est celle qui convient à la quasi-totalité des campagnes en ligne.",
          unit: "Prix hors taxes pour une vidéo, hors budget publicitaire.",
          bars: [
            { label: "Montage seul, sans tournage", value: 275, display: "150 à 400 €" },
            {
              label: "Production légère — équipe réduite",
              value: 800,
              display: "400 à 1 200 €",
              highlight: true,
            },
            { label: "Production lourde — équipe complète", value: 9000, display: "3 000 à 15 000 €" },
          ],
        },
      },
      {
        k: "p",
        v: "Pour de la publicité en ligne, la gamme du milieu est presque toujours la bonne. La production lourde produit des films magnifiques que l'algorithme traite exactement comme les autres — et sur un feed, un plan à 8 000 € et un plan à 400 € occupent la même surface d'écran pendant la même seconde et demie.",
      },
      {
        k: "quote",
        v: "Sur un téléphone, un budget de tournage ne se voit pas. Une bonne accroche, si.",
      },

      { k: "h2", v: "Les cinq questions à poser avant de signer" },
      {
        k: "ul",
        v: [
          "Le budget publicitaire est-il inclus ? La réponse est presque toujours non, et c'est normal — mais il doit être écrit.",
          "Combien de versions du montage sont comprises ? Deux allers-retours est la norme. Illimité n'existe pas.",
          "À qui appartiennent les fichiers sources et le compte publicitaire ?",
          "Qui paie les comédiens, les lieux, la musique sous licence ?",
          "Que se passe-t-il si la vidéo ne performe pas ? Une agence sérieuse a une réponse préparée, qui n'est ni « on recommence gratuitement » ni « ce n'est pas notre problème ».",
        ],
      },

      { k: "h2", v: "Ce que nous pratiquons" },
      {
        k: "p",
        v: "Nous publions nos prix, ligne par ligne, sur la page tarifs — y compris ce qui n'est jamais compris. Ce n'est pas de la transparence pour le principe : c'est parce que la quasi-totalité des ruptures entre une agence et un client vient d'une ligne dont personne n'avait parlé avant de commencer.",
      },
      {
        k: "table",
        v: {
          head: ["Prestation, à Marrakech", "Prix hors taxes"],
          rows: [
            ["Une vidéo publicitaire : angle, script, tournage, montage", both(VIDEO)],
            ["Une première vidéo, avec 14 jours de diffusion pilotée", both(ESSAI)],
            ["Quatre vidéos par mois, diffusion pilotée comprise", `${both(PRODUCTION)} par mois`],
            ["Budget publicitaire conseillé pour démarrer, versé aux plateformes", `${AD_BUDGET} par mois`],
          ],
        },
      },
      {
        k: "note",
        v: "Les montants en dirhams sont convertis au taux commercial de l'agence ; le devis est établi en euros, qui font foi. Le tournage se déplace à Casablanca, Rabat, Tanger et Agadir sans frais supplémentaires.",
      },
    ],
  },

  /* ======================================================================
   *  3. POURQUOI 4 VIDEOS
   * ==================================================================== */
  {
    slug: "pourquoi-quatre-videos-par-mois",
    services: ["production-video-photo", "meta-ads", "tiktok-ads"],
    title: "Pourquoi quatre vidéos par mois, et pas une très bonne",
    seoTitle: "Pourquoi quatre vidéos par mois",
    excerpt:
      "Personne ne sait à l'avance quelle accroche va fonctionner — ni vous, ni nous, ni l'algorithme. Ce qui décide, c'est le nombre d'essais.",
    category: "Méthode",
    date: "2026-08-06",
    readingTime: 5,
    seo: "Pourquoi produire quatre vidéos publicitaires par mois plutôt qu'une seule : usure créative, test d'angles et logique des algorithmes de diffusion.",
    takeaways: [
      "Une vidéo publicitaire qui fonctionne voit son coût par résultat augmenter au bout de trois à six semaines. Ce phénomène s'appelle la fatigue créative et il est inévitable.",
      "Personne ne peut prédire quel angle publicitaire va fonctionner : sur quatre angles également défendables, les équipes expérimentées se trompent environ une fois sur deux.",
      "Les algorithmes de diffusion optimisent en comparant plusieurs créations entre elles. Avec une seule vidéo, la plateforme n'a rien à comparer et le coût reste plus élevé.",
      "Quatre vidéos par mois permettent de tester quatre angles, de conserver une réserve pendant que la vidéo en tête s'use, et d'alimenter les trois étages du tunnel.",
      "Avec un budget limité, une seule vidéo reste utile — mais il faut la considérer comme un test destiné à identifier un angle, pas comme une campagne.",
    ],
    faq: [
      {
        q: "Combien de vidéos publicitaires faut-il produire par mois ?",
        a: "Quatre est le seuil à partir duquel un dispositif devient stable : deux pour le haut de tunnel, une pour la preuve, une pour l'offre. En dessous, il n'y a pas assez de matière pour tester des angles ni pour compenser l'usure créative.",
      },
      {
        q: "Qu'est-ce que la fatigue créative en publicité ?",
        a: "C'est l'augmentation progressive du coût par résultat d'une publicité qui a bien fonctionné. Elle n'est pas due à une dégradation de la vidéo mais au fait que l'audience ciblée l'a déjà vue plusieurs fois. Elle apparaît généralement entre la troisième et la sixième semaine.",
      },
      {
        q: "Vaut-il mieux une vidéo très soignée ou plusieurs vidéos correctes ?",
        a: "Plusieurs vidéos correctes, dans la quasi-totalité des cas. L'angle gagnant dépend de l'audience, du moment et de la concurrence sur les enchères — aucune expertise ne remplace un test, et un test demande plusieurs variantes.",
      },
    ],
    body: [
      {
        k: "p",
        v: "C'est l'objection la plus fréquente à nos formules mensuelles : « je préfère une seule vidéo, mais vraiment bien faite ». C'est une intuition raisonnable, et elle est fausse pour deux raisons mécaniques.",
      },

      { k: "h2", v: "Première raison : personne ne sait à l'avance" },
      {
        k: "p",
        v: "Sur un même produit, quatre angles sont toujours défendables : la preuve, l'émotion, l'offre, l'urgence. Quand nous demandons à une équipe de parier sur celui qui va gagner, elle se trompe environ une fois sur deux. Nous aussi.",
      },
      {
        k: "p",
        v: "Ce n'est pas un manque de métier, c'est la nature du problème : l'accroche gagnante dépend de l'audience, du moment, de la concurrence sur les enchères ce mois-là. Aucune expertise ne remplace un test.",
      },
      {
        k: "quote",
        v: "Une agence qui vous promet la bonne accroche du premier coup vous vend une certitude qu'elle n'a pas.",
      },

      { k: "h2", v: "Deuxième raison : une accroche s'use" },
      {
        k: "p",
        v: "Une vidéo qui fonctionne bien voit son coût par résultat monter au bout de trois à six semaines. Ce n'est pas la vidéo qui se dégrade : c'est l'audience qui l'a déjà vue. Les plateformes appellent ça la fatigue créative, et elle est inévitable.",
      },
      {
        k: "p",
        v: "Avec une seule vidéo, vous n'avez donc pas un actif : vous avez un compte à rebours. Quand elle s'use, la campagne s'arrête, et il faut recommencer un cycle de production complet pendant que rien ne tourne.",
      },

      { k: "h2", v: "Ce que quatre vidéos permettent réellement" },
      {
        k: "figure",
        v: {
          type: "split",
          caption:
            "Ce que change le passage d'une vidéo à quatre. La colonne de gauche décrit un pari, celle de droite un dispositif.",
          left: {
            title: "Avec une seule vidéo",
            items: [
              "Un seul angle testé, choisi au jugé",
              "Aucune réserve quand elle s'use",
              "Un seul étage du tunnel alimenté",
              "Rien à comparer pour l'algorithme",
              "Campagne à l'arrêt pendant la production suivante",
            ],
          },
          right: {
            title: "Avec quatre vidéos par mois",
            items: [
              "Quatre angles testés en parallèle",
              "Une réserve prête quand la première fatigue",
              "Les trois étages alimentés en continu",
              "De quoi laisser l'algorithme arbitrer",
              "Aucune interruption de diffusion",
            ],
          },
        },
      },
      {
        k: "note",
        v: "Le dernier point est le moins intuitif. Les plateformes publicitaires optimisent la diffusion en comparant des créations entre elles. Avec une seule vidéo, il n'y a rien à comparer : vous privez le système du levier qui lui permet de baisser votre coût.",
      },

      { k: "h2", v: "Et si le budget ne le permet pas ?" },
      {
        k: "p",
        v: "Alors commencez par une, mais sachez ce que vous achetez : un test, pas une campagne. C'est exactement ce à quoi sert notre formule Essai — une vidéo, deux semaines de diffusion, et un rapport. Elle ne prétend pas installer un tunnel. Elle vous dit si le produit a un angle.",
      },
    ],
  },

  /* ======================================================================
   *  4. LE FORMAT VERTICAL
   * ==================================================================== */
  {
    slug: "format-vertical-9-16",
    services: ["production-video-photo", "tiktok-ads"],
    title: "Le format vertical n'est pas un recadrage",
    excerpt:
      "Prendre une vidéo horizontale et couper les bords produit une vidéo verticale techniquement conforme et commercialement morte. Ce qui change vraiment quand on tourne pour le 9/16.",
    category: "Production",
    date: "2026-07-28",
    readingTime: 4,
    seo: "Format vertical 9/16 en publicité : pourquoi recadrer une vidéo horizontale ne fonctionne pas, et comment composer directement pour le téléphone.",
    takeaways: [
      "Recadrer une vidéo tournée en 16/9 vers du 9/16 supprime environ 60 % de la surface de l'image, et généralement le sujet avec.",
      "Une vidéo destinée au format vertical se cadre plus serré, avec le sujet placé dans le tiers haut de l'image.",
      "Le tiers bas doit rester libre : c'est la zone où les plateformes affichent leurs boutons, le nom du compte et le texte de la publicité.",
      "Les mouvements de caméra latéraux ne fonctionnent pas en vertical : un panoramique horizontal traverse un cadre étroit en une demi-seconde.",
      "Tout doit rester compréhensible sans le son, la majorité des vues démarrant en lecture muette.",
    ],
    faq: [
      {
        q: "Peut-on transformer une vidéo horizontale en vidéo verticale ?",
        a: "Techniquement oui, mais le résultat convertit rarement. Le recadrage supprime environ 60 % de l'image, décale la composition et fait souvent sortir le texte du cadre. Cela ne se défend que si la vidéo d'origine a été tournée en haute définition avec des plans volontairement aérés, et que cette décision a été prise avant le tournage.",
      },
      {
        q: "Quel format pour une publicité Meta, TikTok ou YouTube Shorts ?",
        a: "Le 9/16, soit 1080 x 1920 pixels. C'est le format natif des Reels, des Stories, de TikTok et des Shorts. Une vidéo carrée ou horizontale y occupe moins de surface d'écran et perd en impact.",
      },
      {
        q: "Où placer le texte dans une vidéo verticale ?",
        a: "Dans la moitié haute, en évitant les 20 % inférieurs de l'image où les plateformes superposent leur interface. Le texte doit rester lisible sans le son, puisque la plupart des vues démarrent en muet.",
      },
    ],
    body: [
      {
        k: "p",
        v: "Nous recevons régulièrement des vidéos d'entreprise tournées en 16/9, avec la demande de les « passer en vertical pour les réseaux ». C'est faisable en dix minutes. Le résultat ne convertit presque jamais.",
      },

      { k: "h2", v: "Ce que le recadrage détruit" },
      {
        k: "figure",
        v: {
          type: "bars",
          caption:
            "Ce qu'il reste d'une image quand on la fait passer d'un format à l'autre. Le recadrage d'un 16/9 vers du 9/16 ne conserve qu'environ quatre dixièmes de la surface d'origine.",
          unit: "Surface de l'image conservée après recadrage.",
          bars: [
            { label: "Tourné directement en 9/16", value: 100, display: "100 %", highlight: true },
            { label: "16/9 recadré en 9/16", value: 40, display: "environ 40 %" },
            { label: "16/9 recadré en 1/1", value: 56, display: "environ 56 %" },
          ],
        },
      },
      {
        k: "ul",
        v: [
          "La composition. Un plan large horizontal recadré en vertical perd la majeure partie de son image, et généralement le sujet avec.",
          "Le texte à l'écran. Positionné pour un cadre large, il sort du cadre ou se retrouve sous l'interface de l'application.",
          "Le rythme. Une vidéo horizontale est écrite pour un écran qu'on regarde ; une verticale, pour un écran qu'on fait défiler.",
        ],
      },

      { k: "h2", v: "Ce qu'on fait différemment au tournage" },
      {
        k: "ul",
        v: [
          "Les sujets sont cadrés plus serré, et centrés dans le tiers haut de l'image.",
          "Le tiers bas est laissé libre : c'est là que les plateformes posent leurs boutons, leur texte et leur nom de compte.",
          "Le mouvement est vertical plutôt que latéral — un panoramique horizontal traverse un cadre étroit en une demi-seconde.",
          "Tout est lisible sans le son. La majorité des vues démarrent en muet.",
        ],
      },
      {
        k: "quote",
        v: "Une vidéo verticale bien tournée reste regardable en horizontal. L'inverse n'est presque jamais vrai.",
      },

      { k: "h2", v: "Le cas où le recadrage se défend" },
      {
        k: "p",
        v: "Quand la vidéo d'origine a été tournée en très haute définition avec des plans larges volontairement aérés, on peut y prélever un cadre vertical propre. C'est une décision qui se prend avant le tournage, pas après — et c'est ce que nous faisons quand un même contenu doit vivre en télévision et sur téléphone.",
      },
    ],
  },

  /* ======================================================================
   *  5. HUMAINS + IA
   * ==================================================================== */
  {
    slug: "ce-que-l-ia-fait-vraiment-dans-notre-production",
    services: ["crm-ia-automatisation", "production-video-photo"],
    title: "Ce que l'intelligence artificielle fait vraiment dans notre production",
    seoTitle: "L'IA dans notre production vidéo",
    excerpt:
      "Tout le monde annonce de l'IA, presque personne ne dit où elle intervient. Voici la liste exacte, y compris ce que nous refusons de lui confier.",
    category: "Méthode",
    date: "2026-07-20",
    readingTime: 5,
    seo: "IA et production vidéo : où l'intelligence artificielle fait gagner du temps, où elle dégrade le résultat, et pourquoi le tournage reste humain.",
    takeaways: [
      "L'intelligence artificielle fait gagner du temps sur quatre tâches de production vidéo : le dérushage, les sous-titres, la déclinaison de scripts validés et le premier tri des données de performance.",
      "Ces quatre tâches ont un point commun : elles sont fastidieuses, vérifiables en un coup d'œil, et une erreur y est sans conséquence.",
      "Quatre décisions restent humaines chez UltraVision Agency : l'angle publicitaire, le tournage, les témoignages et le montage final.",
      "Un visage généré par intelligence artificielle se repère, et une marque prise à montrer des personnes qui n'existent pas perd davantage de crédibilité qu'elle n'a gagné de temps.",
      "Un faux témoignage client constitue une pratique commerciale trompeuse, quelle que soit la technologie utilisée pour le produire.",
    ],
    faq: [
      {
        q: "L'IA peut-elle remplacer un tournage vidéo ?",
        a: "Pour de la publicité de marque, non. Les visages et les environnements générés restent identifiables, et le risque de crédibilité dépasse le gain de temps. L'IA est en revanche efficace en amont et en aval du tournage : préparation, dérushage, sous-titrage, déclinaisons.",
      },
      {
        q: "Utilisez-vous l'IA pour écrire les scripts publicitaires ?",
        a: "Pour décliner un angle déjà validé en plusieurs variantes courtes, oui. Pour trouver l'angle lui-même, non : cette décision demande de connaître le client, son marché et ce qu'il ne peut pas dire.",
      },
      {
        q: "Comment savoir si une agence utilise l'IA de façon honnête ?",
        a: "Demandez-lui la liste précise des tâches concernées, et surtout celles qu'elle refuse de lui confier. Une agence qui répond « nous sommes boostés par l'IA » sans pouvoir détailler n'a probablement pas réfléchi à la question.",
      },
    ],
    body: [
      {
        k: "p",
        v: "« Boosté par l'IA » ne veut plus rien dire. Autant être précis : voici où elle intervient chez nous, et où nous avons décidé qu'elle n'interviendrait pas.",
      },

      { k: "h2", v: "Là où elle fait gagner du temps" },
      {
        k: "ul",
        v: [
          "Le dérushage. Retrouver les prises exploitables dans quatre heures d'images prenait une demi-journée. C'est aujourd'hui une affaire de minutes.",
          "Les sous-titres. Transcription automatique, puis relecture humaine. Le gain est réel et le risque faible.",
          "Les variantes de script. Décliner un angle validé en quatre versions courtes, pour tester.",
          "Le premier tri des performances. Repérer dans les données ce qui mérite un œil, avant de l'analyser nous-mêmes.",
        ],
      },
      {
        k: "p",
        v: "Le point commun de ces quatre tâches : elles sont fastidieuses, vérifiables en un coup d'œil, et une erreur y est sans conséquence. Ce sont exactement les critères qui rendent l'automatisation raisonnable.",
      },

      { k: "h2", v: "Là où nous ne l'utilisons pas" },
      {
        k: "figure",
        v: {
          type: "split",
          caption:
            "Le partage exact. À gauche ce que nous gardons, à droite ce que nous confions à la machine. Le critère est simple : une erreur y est-elle rattrapable en un coup d'œil ?",
          left: {
            title: "Jamais confié à l'IA",
            items: [
              "L'angle publicitaire et la promesse",
              "Le tournage et les visages",
              "Les témoignages clients",
              "Le montage final et son rythme",
            ],
          },
          right: {
            title: "Confié à l'IA",
            items: [
              "Le dérushage de plusieurs heures d'images",
              "La transcription des sous-titres",
              "Les variantes d'un script déjà validé",
              "Le premier tri des données de performance",
            ],
          },
        },
      },
      {
        k: "ul",
        v: [
          "L'angle publicitaire. C'est la décision qui détermine tout le reste, et elle demande de connaître le client, son marché et ce qu'il ne peut pas dire.",
          "Le tournage. Un visage généré se repère, et une marque qui se fait prendre à montrer des gens qui n'existent pas perd davantage qu'elle n'a gagné.",
          "Les témoignages. Jamais. Un faux témoignage est une pratique commerciale trompeuse, quelle que soit la technologie employée.",
          "Le montage final. Le rythme d'une vidéo publicitaire se décide à l'image près, et c'est encore un métier.",
        ],
      },
      {
        k: "quote",
        v: "L'IA nous fait gagner des heures sur ce qui est fastidieux. Elle ne nous a jamais fait gagner une idée.",
      },

      { k: "h2", v: "Pourquoi nous le disons dans cet ordre" },
      {
        k: "p",
        v: "Sur notre page d'accueil, la phrase est « pensé, tourné et monté par des humains, décuplé par l'intelligence artificielle ». L'ordre est délibéré. Sur un marché où tout le monde annonce de l'IA, ce qui devient rare n'est plus l'IA — c'est la main humaine. Le rare doit passer devant.",
      },
      {
        k: "note",
        v: "Cette page sera mise à jour quand nos pratiques changeront. Si vous lisez cet article dans six mois et que la liste vous paraît datée, dites-le-nous : c'est qu'elle l'est.",
      },
    ],
  },

  /* ======================================================================
   *  6. LE BUDGET META ADS
   * ==================================================================== */
  {
    slug: "budget-meta-ads-maroc",
    services: ["meta-ads", "production-video-photo", "generation-de-leads"],
    title: "Quel budget pour Facebook Ads et Meta Ads au Maroc ? Le calcul, pas une moyenne",
    seoTitle: "Prix Facebook Ads au Maroc : le budget",
    excerpt:
      "Facebook et Instagram acceptent des campagnes à quelques dirhams par jour. La vraie question n'est pas le minimum autorisé, mais le minimum utile : celui qui donne à l'algorithme assez de résultats pour apprendre.",
    category: "Tarifs",
    date: "2026-10-05",
    readingTime: 7,
    seo: "Prix et budget Facebook Ads au Maroc : combien dépenser sur Facebook et Instagram, en dirhams, calculé à partir du coût d'un résultat.",
    takeaways: [
      "Un budget Meta Ads se calcule à partir du coût d'un résultat, pas à partir d'une moyenne de marché : il doit permettre à chaque ensemble de publicités d'obtenir régulièrement des conversions.",
      "Selon la documentation de Meta, un ensemble de publicités sort de sa phase d'apprentissage après environ 50 événements d'optimisation sur sept jours. Pendant cette phase, les coûts sont plus élevés et moins stables.",
      "Le calcul de départ tient en une ligne : le coût estimé d'un résultat, multiplié par 50 résultats par semaine, multiplié par quatre semaines.",
      "Un petit budget réparti sur plusieurs campagnes n'apprend rien : chaque découpage par audience, par ville ou par format divise les résultats que l'algorithme reçoit.",
      `Pour démarrer, UltraVision Agency recommande ${AD_BUDGET} par mois de budget publicitaire, versé directement à Meta depuis le compte de l'annonceur, en plus des honoraires de production et de pilotage.`,
    ],
    faq: [
      {
        q: "Combien coûte la publicité Facebook Ads au Maroc ?",
        a: `Deux coûts distincts : le budget publicitaire, versé directement à Meta depuis votre compte, et les honoraires de l'agence. Pour démarrer, UltraVision Agency recommande ${AD_BUDGET} par mois de budget publicitaire. Les honoraires de production et de pilotage sont publics sur la page tarifs.`,
      },
      {
        q: "Quel est le budget minimum pour faire de la publicité sur Facebook au Maroc ?",
        a: "Techniquement, Meta accepte de très petits budgets quotidiens. Pour qu'une campagne apprenne, il faut viser environ 50 résultats par semaine et par ensemble de publicités, ce qui représente le plus souvent plusieurs milliers de dirhams par mois selon le coût d'un résultat dans votre secteur.",
      },
      {
        q: "Le budget publicitaire est-il compris dans les honoraires d'une agence ?",
        a: "Non. Le budget publicitaire est versé directement à Meta depuis le compte de l'annonceur. Les honoraires de l'agence paient la production des vidéos et le pilotage des campagnes. Les deux doivent figurer sur deux lignes distinctes du devis.",
      },
      {
        q: "Combien de temps avant de juger une campagne Meta Ads ?",
        a: "Deux semaines au minimum. La première semaine sert souvent à sortir de la phase d'apprentissage : juger avant revient à juger l'algorithme pendant qu'il apprend, pas la publicité.",
      },
      {
        q: "Que faire si le budget calculé dépasse ce que je peux dépenser ?",
        a: "Changer l'événement optimisé plutôt que de couper le budget. Optimiser sur un événement plus fréquent, comme un clic vers WhatsApp ou une visite de la page de contact, permet d'atteindre les 50 événements hebdomadaires avec moins d'argent, au prix d'un signal moins précis.",
      },
    ],
    body: [
      {
        k: "p",
        v: "« Combien faut-il mettre sur Facebook ? » La réponse honnête commence par une autre question : combien vous coûte un client, et combien vous en rapporte-t-il ? Meta laisse lancer une campagne avec quelques dirhams par jour. Ce minimum technique n'a presque rien à voir avec le minimum utile.",
      },

      { k: "h2", v: "Le minimum technique et le minimum utile" },
      {
        k: "p",
        v: "Une campagne lancée avec un budget minuscule démarre normalement : des impressions arrivent, quelques clics, puis plus rien. Ce n'est pas que la publicité ne fonctionne pas. C'est que l'algorithme n'a pas reçu assez de résultats pour comprendre à qui la montrer.",
      },
      {
        k: "p",
        v: "Meta l'écrit dans sa documentation : un ensemble de publicités reste en phase d'apprentissage tant qu'il n'a pas obtenu environ 50 événements d'optimisation — achats, demandes de contact, inscriptions — sur une période de sept jours. Pendant cette phase, la diffusion tâtonne, et chaque résultat coûte plus cher qu'il ne coûtera ensuite.",
      },

      { k: "h2", v: "Le calcul, en trois lignes" },
      {
        k: "ul",
        v: [
          "Estimez le coût d'un résultat : une demande de contact, une réservation, un achat. Sans historique, partez d'une hypothèse prudente, et corrigez-la après deux semaines de diffusion.",
          "Multipliez par 50 : c'est le volume hebdomadaire qui permet à un ensemble de publicités d'apprendre.",
          "Multipliez par quatre semaines : vous obtenez le budget mensuel qui donne à une campagne une vraie chance.",
        ],
      },
      {
        k: "table",
        v: {
          head: ["Coût d'un résultat (exemple)", "50 résultats par semaine", "Budget sur quatre semaines"],
          rows: [
            ["20 MAD — une inscription", "1 000 MAD", "4 000 MAD"],
            ["50 MAD — une demande de contact", "2 500 MAD", "10 000 MAD"],
            ["150 MAD — une demande de devis qualifiée", "7 500 MAD", "30 000 MAD"],
          ],
        },
      },
      {
        k: "note",
        v: "Ces coûts sont des exemples choisis pour montrer le calcul, pas des moyennes du marché marocain. Le coût réel d'un résultat dépend de votre secteur, de votre offre, de votre zone et surtout de vos vidéos.",
      },
      {
        k: "p",
        v: "Quand le budget obtenu dépasse ce que vous pouvez dépenser, ne baissez pas le chiffre : changez l'événement. Optimiser sur une action plus fréquente — un clic vers WhatsApp, une visite de la page de contact — permet d'atteindre les 50 événements avec moins d'argent. Le signal est moins précis, mais la campagne apprend, ce qui vaut mieux qu'une campagne précise qui n'apprend jamais.",
      },

      { k: "h2", v: "Pourquoi un petit budget se disperse" },
      {
        k: "p",
        v: "L'erreur la plus fréquente n'est pas un budget trop petit, c'est un budget trop découpé. Quatre campagnes à 50 MAD par jour n'apprennent rien ; une seule campagne à 200 MAD par jour a une chance d'apprendre. Chaque découpage — une campagne par ville, par audience, par format — divise les résultats que l'algorithme reçoit.",
      },
      { k: "quote", v: "Mieux vaut une campagne bien nourrie que quatre campagnes affamées." },
      {
        k: "p",
        v: "Ce qui doit varier, au départ, ce sont les vidéos, pas les audiences. Quatre vidéos qui testent quatre angles différents dans une même campagne donnent à Meta de quoi choisir, sans diviser le budget.",
      },

      { k: "h2", v: "Ce qui est propre au Maroc" },
      {
        k: "ul",
        v: [
          "La carte de paiement. Vérifiez avec votre banque qu'elle est activée pour les paiements en ligne à l'international : une carte refusée est la cause la plus banale d'une campagne qui s'arrête sans prévenir.",
          "La zone. Meta permet de viser une ville — Marrakech, Casablanca — ou un rayon autour de votre adresse. Pour un commerce de quartier, un rayon de quelques kilomètres vaut mieux que tout le pays.",
          "L'audience étrangère. Une résidence, un riad ou un service aux non-résidents peut viser des personnes qui vivent en France ou en Belgique : le budget doit alors tenir compte d'un coût souvent plus élevé sur ces marchés.",
          "La langue. Une vidéo en français ne parle pas au même public qu'une vidéo en darija. Le choix de la langue est un choix de cible, avant d'être un choix de traduction.",
        ],
      },

      { k: "h2", v: "Ce que le budget publicitaire ne paie pas" },
      {
        k: "p",
        v: "Le budget publicitaire va à Meta, depuis votre compte, avec votre carte. Il ne paie ni les vidéos, ni le pilotage, ni la page qui reçoit les demandes. Un devis qui annonce un montant « tout compris » sans séparer ces lignes vous laisse deviner ce qui part réellement en publicité.",
      },

      { k: "h2", v: "Ce que nous recommandons pour démarrer" },
      {
        k: "p",
        v: `Pour une entreprise qui démarre sur Meta, nous recommandons ${AD_BUDGET} par mois de budget publicitaire, concentrés sur une seule campagne et quatre vidéos qui testent quatre angles. Ce budget est versé directement à Meta. Notre pilotage est facturé à part, ${both(MEDIA)} par mois et par plateforme, et une vidéo publicitaire ${both(VIDEO)}.`,
      },
      {
        k: "note",
        v: "Le compte publicitaire est toujours ouvert à votre nom, avec un accès administrateur complet. Si nous arrêtons de travailler ensemble, vous repartez avec le compte, son historique et ses audiences.",
      },
    ],
  },

  /* ======================================================================
   *  7. META OU GOOGLE
   * ==================================================================== */
  {
    slug: "meta-ads-ou-google-ads",
    services: ["meta-ads", "google-ads", "generation-de-leads"],
    title: "Meta Ads ou Google Ads : par où commencer ?",
    excerpt:
      "Les deux plateformes ne font pas le même travail. Google répond à quelqu'un qui cherche déjà ; Meta va chercher quelqu'un qui ne cherchait rien. Le bon point de départ dépend d'une seule question : votre client sait-il qu'il a besoin de vous ?",
    category: "Stratégie",
    date: "2026-10-05",
    readingTime: 6,
    seo: "Meta Ads (Facebook, Instagram) ou Google Ads : laquelle choisir pour démarrer au Maroc, selon que vos clients cherchent déjà votre service ou non.",
    takeaways: [
      "Google Ads capte une demande qui existe déjà : la publicité s'affiche quand quelqu'un tape une recherche. Meta Ads crée une demande : la publicité s'affiche à quelqu'un qui ne cherchait rien.",
      "Si vos clients cherchent votre service sur Google — un plombier, une clinique, une location de voiture — Google Ads est le premier canal à ouvrir.",
      "Si votre produit se comprend en le voyant — un lieu, un plat, un soin, un bien immobilier — Meta Ads et une vidéo verticale font mieux le travail.",
      "Sur Google, le résultat dépend d'abord des mots-clés et de la page d'arrivée. Sur Meta, il dépend d'abord de la vidéo, et surtout de ses premières secondes.",
      "Google Ads ne peut pas dépenser plus que ce que la demande permet : pour un service local peu recherché, le volume de recherches limite la campagne avant le budget.",
    ],
    faq: [
      {
        q: "Facebook Ads ou Google Ads, lequel est le moins cher ?",
        a: "Aucun des deux n'est moins cher dans l'absolu. Un clic sur Google coûte souvent plus cher qu'un clic sur Meta, mais il vient de quelqu'un qui cherche déjà. Comparez le coût d'un client, pas le coût d'un clic.",
      },
      {
        q: "Peut-on lancer Meta Ads et Google Ads en même temps ?",
        a: "Oui, si le budget le permet. Avec un budget serré, mieux vaut commencer par une seule plateforme, la faire fonctionner, puis ouvrir la seconde : deux campagnes sous-alimentées apprennent moins vite qu'une seule.",
      },
      {
        q: "Google Ads fonctionne-t-il au Maroc ?",
        a: "Oui. Google Ads permet de viser le Maroc entier, une ville comme Marrakech ou Casablanca, ou un rayon autour d'une adresse, et de choisir les langues des internautes visés.",
      },
      {
        q: "Faut-il un site internet pour faire de la publicité ?",
        a: "Pour Google Ads, oui : l'annonce mène à une page. Pour Meta Ads, un formulaire intégré à Facebook ou un message WhatsApp suffisent pour démarrer, mais une page dédiée mesure et convertit mieux.",
      },
    ],
    body: [
      {
        k: "p",
        v: "C'est la question qui suit presque toujours celle du budget. Et la réponse n'est pas une préférence d'agence : les deux plateformes ne vendent pas la même chose. Google vend l'accès à quelqu'un qui cherche. Meta vend l'attention de quelqu'un qui fait défiler son fil.",
      },

      { k: "h2", v: "Deux machines différentes" },
      {
        k: "table",
        v: {
          head: ["", "Google Ads", "Meta Ads"],
          rows: [
            ["Quand la publicité apparaît", "Quand quelqu'un tape une recherche", "Pendant qu'on fait défiler Facebook ou Instagram"],
            ["Ce qu'on achète", "Une demande qui existe déjà", "De l'attention, pour créer une demande"],
            ["Ce qui fait le résultat", "Les mots-clés et la page d'arrivée", "La vidéo, surtout ses premières secondes"],
            ["Ce qui limite le volume", "Le nombre de recherches", "La capacité de la vidéo à arrêter le défilement"],
            ["Idéal pour", "Les services recherchés, souvent urgents", "Les produits et les lieux qui se montrent"],
          ],
        },
      },

      { k: "h2", v: "La question qui tranche" },
      {
        k: "p",
        v: "Votre client sait-il déjà qu'il a besoin de vous ? Si oui, il cherche, et Google est l'endroit où il cherche. Si non, il faut aller le chercher là où il passe son temps, et lui montrer quelque chose qu'il n'attendait pas.",
      },
      {
        k: "ul",
        v: [
          "Une fuite d'eau, une panne de voiture, un rendez-vous chez un dentiste : le besoin précède la recherche. Google Ads d'abord.",
          "Un nouveau restaurant, un soin du visage, une villa en construction : personne ne le cherche avant de l'avoir vu. Meta Ads d'abord.",
          "Une formation, un service aux entreprises, un logiciel : les deux, souvent — Meta pour faire connaître, Google pour récupérer ceux qui cherchent ensuite.",
        ],
      },

      { k: "h2", v: "Le piège du petit marché" },
      {
        k: "p",
        v: "Une campagne Google ne peut s'afficher que lorsque quelqu'un tape la recherche. Pour un service local et précis, le nombre de recherches mensuelles peut être faible : la campagne plafonne alors, quel que soit le budget. L'outil de planification des mots-clés de Google donne une estimation des volumes avant d'investir — c'est la première chose à regarder.",
      },
      {
        k: "p",
        v: "Au Maroc, il faut aussi regarder la langue des recherches. Une même demande peut être tapée en français, en arabe ou en darija écrite en lettres latines. Une campagne qui n'en couvre qu'une partie passe à côté du reste.",
      },

      { k: "h2", v: "Ce qui se travaille en premier" },
      {
        k: "ul",
        v: [
          "Sur Google : la liste des recherches visées, celles qu'on exclut, et la page d'arrivée. Une annonce parfaite qui mène à une page d'accueil générique perd la plupart des clics.",
          "Sur Meta : la vidéo. Le ciblage large fonctionne de mieux en mieux, à condition que la création dise d'elle-même à qui elle s'adresse.",
        ],
      },
      { k: "quote", v: "Sur Google, on choisit à qui parler. Sur Meta, c'est la vidéo qui choisit." },

      { k: "h2", v: "L'ordre que nous conseillons" },
      {
        k: "p",
        v: `Une plateforme d'abord, celle qui correspond à la façon dont vos clients vous trouvent. Quand elle produit des demandes à un coût stable, la seconde vient la compléter. Le pilotage de chaque plateforme est facturé ${both(MEDIA)} par mois chez UltraVision Agency ; la formule Acquisition réunit Meta, Google et TikTok, avec les vidéos et le suivi des demandes.`,
      },
    ],
  },

  /* ======================================================================
   *  8. LE PRIX D'UN SITE
   * ==================================================================== */
  {
    slug: "prix-site-internet-maroc",
    services: ["creation-site-web", "generation-de-leads"],
    title: "Combien coûte la création d'un site web au Maroc ? Ce qui fait le prix",
    seoTitle: "Prix création de site web au Maroc",
    excerpt:
      "Deux devis pour « un site internet » peuvent aller du simple au décuple, et décrire deux objets différents. Les cinq éléments qui font le prix, les lignes qu'on oublie, et les questions à poser avant de signer.",
    category: "Tarifs",
    date: "2026-10-05",
    readingTime: 6,
    seo: `Prix de création d'un site web au Maroc : ce qui fait varier un devis, landing page ou site vitrine, les frais oubliés et nos tarifs à Marrakech, en dirhams.`,
    takeaways: [
      "Le prix d'un site internet dépend surtout de cinq éléments : le nombre de pages, le design, les contenus, les fonctions et ce qui est compris après la mise en ligne.",
      `Chez UltraVision Agency, à Marrakech, un site vitrine jusqu'à cinq pages coûte ${both(VITRINE)} et une landing page de conversion ${both(LANDING)}, hors taxes.`,
      "Une landing page est une page unique construite autour d'une offre et d'une seule action ; un site vitrine présente l'entreprise sur plusieurs pages. Pour recevoir le trafic d'une campagne publicitaire, la landing page est le meilleur choix.",
      "Le nom de domaine, l'hébergement, la maintenance et le référencement sont souvent facturés à part : ils doivent apparaître sur le devis avant la signature.",
      "Le nom de domaine doit être enregistré au nom de l'entreprise, pour qu'elle en reste propriétaire si elle change de prestataire.",
    ],
    faq: [
      {
        q: "Combien coûte un site vitrine au Maroc ?",
        a: `Chez UltraVision Agency, ${both(VITRINE)} hors taxes pour un site jusqu'à cinq pages. Le prix d'un site vitrine dépend surtout du nombre de pages, des contenus à produire et des fonctions demandées, comme la réservation ou plusieurs langues.`,
      },
      {
        q: "Combien de temps faut-il pour créer un site internet ?",
        a: "Chez nous, cinq jours pour une landing page et trois semaines pour un site vitrine, à partir du moment où les textes et les visuels sont validés.",
      },
      {
        q: "Le référencement est-il compris dans le prix d'un site ?",
        a: `Pas toujours, et c'est à vérifier sur le devis. Chez UltraVision Agency, le référencement technique — structure, balises, données structurées, Search Console — est une prestation distincte à ${both(SEO_TECH)}.`,
      },
      {
        q: "Landing page ou site vitrine : que choisir ?",
        a: "Une landing page pour une offre précise et une campagne publicitaire ; un site vitrine pour présenter l'entreprise et être trouvé sur Google. Beaucoup d'entreprises commencent par la landing page, qui produit des demandes plus vite.",
      },
    ],
    body: [
      {
        k: "p",
        v: "« Un site internet » désigne aussi bien une page unique montée en deux jours qu'une boutique en ligne en trois langues. Comparer deux devis sans savoir ce qu'ils contiennent revient à comparer le prix d'un scooter et celui d'une camionnette parce que les deux ont des roues.",
      },

      { k: "h2", v: "Les cinq éléments qui font le prix" },
      {
        k: "ul",
        v: [
          "Le nombre de pages. Chaque page se conçoit, s'écrit et se met en forme. Cinq pages bien faites valent mieux que quinze pages vides.",
          "Le design. Un modèle adapté et une maquette dessinée pour votre marque ne demandent pas le même travail.",
          "Les contenus. Qui écrit les textes, qui fait les photos et les vidéos ? C'est souvent la ligne la plus longue à produire, et la plus souvent oubliée.",
          "Les fonctions. Réservation, paiement en ligne, plusieurs langues, espace client : chacune ajoute du développement et des tests.",
          "L'après. Hébergement, mises à jour, corrections, sauvegardes : un site qui n'est plus entretenu se dégrade, même s'il ne change pas.",
        ],
      },

      { k: "h2", v: "Landing page ou site vitrine ?" },
      {
        k: "table",
        v: {
          head: ["", "Landing page", "Site vitrine"],
          rows: [
            ["Ce que c'est", "Une page, une offre, une action", "Plusieurs pages qui présentent l'entreprise"],
            ["Sert à", "Transformer le trafic d'une campagne en demandes", "Être trouvé sur Google et rassurer avant un contact"],
            ["Délai chez nous", "5 jours", "3 semaines"],
            ["Prix chez nous, hors taxes", both(LANDING), `${both(VITRINE)}, jusqu'à 5 pages`],
          ],
        },
      },
      {
        k: "p",
        v: "Envoyer le trafic d'une publicité vers une page d'accueil est l'une des fuites les plus coûteuses d'une campagne : le visiteur arrive pour une offre et trouve un menu. Une landing page ne lui propose qu'une chose à faire.",
      },

      { k: "h2", v: "Les lignes qu'on oublie" },
      {
        k: "ul",
        v: [
          "Le nom de domaine, qui se renouvelle chaque année.",
          "L'hébergement, mensuel ou annuel selon le prestataire.",
          "La maintenance : mises à jour, sauvegardes, corrections.",
          "Le référencement technique : structure, balises, données structurées, inscription à la Search Console de Google.",
          "Les traductions, si le site parle à des clients étrangers.",
          "Les photos et vidéos, quand il n'en existe pas encore.",
        ],
      },
      { k: "quote", v: "Un devis de site se lit par ce qu'il ne dit pas." },

      { k: "h2", v: "Les questions à poser avant de signer" },
      {
        k: "ul",
        v: [
          "À quel nom le nom de domaine est-il enregistré ? Il doit l'être au nom de votre entreprise.",
          "Aurai-je un accès administrateur au site et à l'hébergement ?",
          "Combien d'allers-retours sur la maquette sont compris ?",
          "Qui écrit les textes, et qui fournit les photos ?",
          "Que coûte le site chaque année après la mise en ligne ?",
          "Le site est-il relié à un outil de mesure, et qui le consulte ?",
        ],
      },

      { k: "h2", v: "Ce que nous pratiquons" },
      {
        k: "p",
        v: `Nos prix sont publiés : ${both(LANDING)} pour une landing page de conversion, ${both(VITRINE)} pour un site vitrine jusqu'à cinq pages, ${both(SEO_TECH)} pour le référencement technique. Les textes, les photos et les vidéos se pensent ensemble, avant la première ligne de code — c'est ce qui permet de tenir trois semaines pour un site vitrine.`,
      },
      {
        k: "note",
        v: "Quand un site reçoit des demandes, elles peuvent arriver directement dans un CRM, avec leur source. C'est ce qui permet de savoir, chaque mois, quelle campagne a produit quel client.",
      },
    ],
  },

  /* ======================================================================
   *  9. CHOISIR UNE AGENCE
   * ==================================================================== */
  {
    slug: "choisir-agence-marketing-digital-maroc",
    services: ["meta-ads", "production-video-photo", "generation-de-leads"],
    title: "Choisir une agence de marketing digital au Maroc : huit questions à poser",
    seoTitle: "Choisir une agence digitale au Maroc",
    excerpt:
      "Les sites d'agence se ressemblent : mêmes promesses, mêmes logos, mêmes « résultats ». Les vraies différences apparaissent dans les réponses à quelques questions précises, posées avant de signer.",
    category: "Stratégie",
    date: "2026-10-05",
    readingTime: 7,
    seo: "Comment choisir une agence de marketing digital au Maroc : les huit questions à poser avant de signer, et les signaux d'alerte qui doivent faire fuir.",
    takeaways: [
      "Le compte publicitaire et le nom de domaine doivent être ouverts au nom du client, avec un accès administrateur complet : c'est la première question à poser à une agence de marketing digital.",
      "Le budget publicitaire versé aux plateformes et les honoraires de l'agence doivent figurer sur deux lignes séparées du devis.",
      "Une agence sérieuse mesure ses résultats en demandes, en rendez-vous ou en ventes, pas en likes ni en impressions.",
      "Les réalisations présentées doivent être vérifiables : un nom de client, une vidéo en ligne, un site qui existe.",
      "Aucune agence ne peut garantir une première place sur Google : Google le précise lui-même dans sa documentation.",
    ],
    faq: [
      {
        q: "Combien coûte une agence de marketing digital au Maroc ?",
        a: `Cela dépend du périmètre : production de contenus, pilotage des publicités, site, CRM. Chez UltraVision Agency, à Marrakech, le pilotage d'une plateforme publicitaire coûte ${both(MEDIA)} par mois, et la formule Production — quatre vidéos par mois et leur diffusion — ${both(PRODUCTION)} par mois. Le budget publicitaire s'ajoute toujours.`,
      },
      {
        q: "Faut-il s'engager plusieurs mois avec une agence ?",
        a: "Pas forcément. Un engagement de quelques mois se justifie quand le travail demande du temps pour produire des résultats, comme la structuration d'un tunnel d'acquisition. Pour juger une agence, un essai sans engagement sur une première vidéo ou une première campagne est plus parlant qu'un long contrat.",
      },
      {
        q: "Une agence peut-elle garantir la première place sur Google ?",
        a: "Non. Google indique lui-même que personne ne peut garantir un classement en première position. Une agence qui le promet vend autre chose que du référencement.",
      },
      {
        q: "Vaut-il mieux une agence locale ou une agence à distance ?",
        a: "Pour tout ce qui se tourne — vidéos, photos, visites de lieux — une équipe sur place évite les frais de déplacement et les délais. Pour le pilotage des publicités, la distance compte moins que la réactivité et la clarté des rapports.",
      },
    ],
    body: [
      {
        k: "p",
        v: "Un dirigeant qui cherche une agence voit défiler des sites presque identiques : des promesses de croissance, des logos de clients, des chiffres sans source. Le site ne permet pas de choisir. Les réponses à huit questions, si.",
      },

      { k: "h2", v: "1. À qui appartiennent les comptes ?" },
      {
        k: "p",
        v: "Le compte publicitaire Meta ou Google, le nom de domaine, le site, les fichiers sources des vidéos : tout doit être à votre nom, avec un accès administrateur complet. Un compte publicitaire ouvert au nom de l'agence emporte avec lui l'historique et les audiences le jour où vous la quittez.",
      },

      { k: "h2", v: "2. Le budget publicitaire est-il séparé des honoraires ?" },
      {
        k: "p",
        v: "Le budget publicitaire est versé aux plateformes ; les honoraires paient le travail de l'agence. Un devis qui mélange les deux ne permet pas de savoir combien part réellement en publicité.",
      },

      { k: "h2", v: "3. Qu'est-ce que vous mesurez ?" },
      {
        k: "p",
        v: "Les likes, les vues et les impressions se mesurent facilement et ne paient aucune facture. Demandez quel indicateur figurera en tête du rapport mensuel : le coût d'une demande, d'un rendez-vous ou d'une vente est la seule réponse qui relie le travail de l'agence à votre chiffre d'affaires.",
      },

      { k: "h2", v: "4. Puis-je voir des réalisations vérifiables ?" },
      {
        k: "p",
        v: "Un nom de client, une vidéo en ligne, un site qui existe : une réalisation se vérifie. Un témoignage sans nom ou un logo sans projet ne prouve rien — et un faux témoignage est une pratique commerciale trompeuse.",
      },

      { k: "h2", v: "5. Qui fait réellement le travail ?" },
      {
        k: "p",
        v: "Beaucoup d'agences vendent et sous-traitent. Ce n'est pas un défaut en soi, mais vous devez savoir qui écrit, qui tourne, qui pilote les campagnes, et qui vous répond quand quelque chose ne va pas.",
      },

      { k: "h2", v: "6. Quel est l'engagement ?" },
      {
        k: "p",
        v: "Durée minimale, préavis, conditions de sortie : tout doit être écrit. Un engagement de quelques mois peut se justifier ; un engagement long sans possibilité d'essai fait porter tout le risque au client.",
      },

      { k: "h2", v: "7. Que se passe-t-il si les résultats ne viennent pas ?" },
      {
        k: "p",
        v: "Ni « on recommence gratuitement », ni « ce n'est pas notre problème ». Une agence sérieuse a une réponse préparée : ce qu'elle change, dans quel délai, et à partir de quand elle recommande d'arrêter.",
      },

      { k: "h2", v: "8. Vos prix sont-ils publiés ?" },
      {
        k: "p",
        v: "Un prix publié se compare. Un prix donné « après un appel découverte » se négocie, et varie souvent selon l'interlocuteur. Les prix publics ne sont pas une garantie de qualité, mais ils sont une garantie de cohérence.",
      },

      { k: "h2", v: "Les signaux d'alerte" },
      {
        k: "ul",
        v: [
          "Une première place sur Google garantie.",
          "Des abonnés ou des avis achetés, présentés comme une stratégie.",
          "Un compte publicitaire ouvert au nom de l'agence.",
          "Un rapport mensuel qui parle de portée, jamais de demandes.",
          "Un engagement d'un an avant la moindre réalisation.",
        ],
      },
      { k: "quote", v: "Une agence se juge à ce qu'elle accepte d'écrire avant la signature." },

      { k: "h2", v: "Nos réponses" },
      {
        k: "p",
        v: `Les comptes publicitaires sont ouverts à votre nom. Le budget publicitaire est toujours séparé de nos honoraires. Nous pilotons au coût par demande et par rendez-vous. Nos réalisations sont en ligne, avec le nom des clients. L'équipe est restreinte et nommée : ceux qui vendent le projet l'exécutent. La formule Production est sans engagement, et une première vidéo avec 14 jours de diffusion pilotée coûte ${both(ESSAI)}.`,
      },
    ],
  },
  /* ======================================================================
   *  10. PRIX D'UNE AGENCE A MARRAKECH
   * ==================================================================== */
  {
    slug: "prix-agence-marketing-digital-marrakech",
    services: ["meta-ads", "production-video-photo", "generation-de-leads"],
    title: "Combien coûte une agence de marketing digital à Marrakech ? Ce que l'on paie vraiment",
    seoTitle: "Prix d'une agence marketing à Marrakech",
    excerpt:
      "Un devis d'agence mélange souvent quatre choses différentes : la production, le pilotage, le budget publicitaire et les outils. Les séparer est le seul moyen de comparer deux propositions.",
    category: "Tarifs",
    date: "2026-10-19",
    readingTime: 6,
    seo: "Prix d'une agence de marketing digital à Marrakech : production, pilotage des publicités, budget, site et CRM. Nos tarifs publics et comment lire un devis.",
    takeaways: [
      "Le prix d'une agence de marketing digital se compose de quatre postes distincts : la production des contenus, le pilotage des campagnes, le budget publicitaire versé aux plateformes et les outils comme le site ou le CRM.",
      "Le budget publicitaire n'est pas un honoraire : il est payé directement à Meta, Google ou TikTok, et doit figurer sur une ligne séparée du devis.",
      `À Marrakech, chez UltraVision Agency, le pilotage d'une plateforme publicitaire coûte ${both(MEDIA)} par mois hors taxes, et la formule Production — quatre vidéos par mois et leur diffusion — ${both(PRODUCTION)} par mois.`,
      "Une agence payée en pourcentage du budget publicitaire coûte plus cher à mesure que le budget augmente, même quand le travail reste le même.",
      "Deux devis d'agence se comparent sur ce qui est livré chaque mois, pas sur le montant total.",
    ],
    faq: [
      {
        q: "Quel est le tarif d'une agence de marketing digital au Maroc ?",
        a: `Il dépend de ce qui est inclus. Chez UltraVision Agency, à Marrakech, une vidéo publicitaire coûte ${both(VIDEO)}, le pilotage d'une plateforme publicitaire ${both(MEDIA)} par mois et le community management ${both(CM)} par mois, hors taxes. Le budget publicitaire, versé aux plateformes, s'ajoute : comptez ${AD_BUDGET} par mois pour démarrer.`,
      },
      {
        q: "Le budget publicitaire est-il compris dans le prix de l'agence ?",
        a: "Non, et il ne devrait jamais l'être sans que ce soit écrit. Le budget est versé directement à Meta, Google ou TikTok, depuis un compte ouvert à votre nom ; les honoraires de l'agence rémunèrent son travail.",
      },
      {
        q: "Pourquoi certaines agences facturent-elles un pourcentage du budget ?",
        a: "C'est un mode de facturation courant dans la publicité en ligne. Son défaut : la facture augmente avec le budget, même quand le travail ne change pas. Un forfait par plateforme rend le coût prévisible.",
      },
      {
        q: "Peut-on tester une agence avant de s'engager ?",
        a: `Oui, et c'est la façon la plus sûre de la juger. Chez UltraVision Agency, une vidéo publicitaire avec 14 jours de diffusion pilotée coûte ${both(ESSAI)}, sans engagement.`,
      },
    ],
    body: [
      {
        k: "p",
        v: "« Combien coûte une agence ? » appelle une réponse en deux temps : ce que l'on achète, puis le prix de chaque morceau. Les devis qui affichent un seul montant mensuel recouvrent presque toujours plusieurs prestations, et c'est en les séparant qu'on peut les comparer.",
      },

      { k: "h2", v: "Les quatre postes d'un devis" },
      {
        k: "table",
        v: {
          head: ["Poste", "Ce que c'est", "Qui l'encaisse"],
          rows: [
            ["La production", "Vidéos, photos, visuels, textes publicitaires", "L'agence"],
            ["Le pilotage", "Réglage et optimisation des campagnes, rapports", "L'agence"],
            ["Le budget publicitaire", "L'achat d'espace sur Meta, Google ou TikTok", "Les plateformes"],
            ["Les outils", "Site, landing page, CRM, automatisations", "L'agence pour la création, l'éditeur pour l'abonnement"],
          ],
        },
      },
      {
        k: "p",
        v: "Un devis qui ne distingue pas ces quatre lignes ne permet pas de savoir combien part réellement en publicité, ni ce que l'agence facture pour son propre travail.",
      },

      { k: "h2", v: "Forfait ou pourcentage du budget" },
      {
        k: "p",
        v: "Deux modes de facturation dominent le pilotage des campagnes. Le pourcentage du budget publicitaire augmente mécaniquement avec les dépenses, même lorsque le travail reste identique. Le forfait par plateforme rend le coût prévisible : piloter une plateforme coûte le même prix, que le budget soit modeste ou important.",
      },
      {
        k: "p",
        v: "Le forfait se compte par plateforme parce que le travail n'est pas le même : piloter Meta seul, ou Meta, Google et TikTok, c'est trois interfaces, trois logiques d'enchères et trois jeux de créations à décliner.",
      },

      { k: "h2", v: "Ce qui n'est jamais compris" },
      {
        k: "ul",
        v: [
          "Le budget publicitaire, versé directement aux plateformes depuis votre compte.",
          "Les comédiens, mannequins ou lieux de tournage payants.",
          "Les abonnements logiciels : CRM, outils d'automatisation, hébergement.",
          "La réponse aux messages : l'agence génère et centralise les demandes, le suivi commercial reste chez vous.",
        ],
      },
      { k: "note", v: `Pour démarrer une campagne, comptez ${AD_BUDGET} de budget publicitaire par mois, en plus des honoraires.` },

      { k: "h2", v: "Comment comparer deux devis" },
      {
        k: "ul",
        v: [
          "Additionner ce qui est livré chaque mois : nombre de vidéos, plateformes pilotées, rapports.",
          "Vérifier que le budget publicitaire figure sur une ligne séparée.",
          "Demander à qui appartiennent les comptes publicitaires et les fichiers sources.",
          "Lire la durée d'engagement et les conditions de sortie.",
        ],
      },
      { k: "quote", v: "Un prix ne se compare qu'à ce qu'il contient." },

      { k: "h2", v: "Nos prix, ligne par ligne" },
      {
        k: "table",
        v: {
          head: ["Prestation", "Prix hors taxes"],
          rows: [
            ["Vidéo publicitaire : angle, script, tournage, montage", both(VIDEO)],
            ["Pilotage d'une plateforme publicitaire", `${both(MEDIA)} par mois`],
            ["Community management", `${both(CM)} par mois`],
            ["Landing page de conversion", both(LANDING)],
            ["Site vitrine, jusqu'à 5 pages", `à partir de ${both(VITRINE)}`],
            ["Référencement technique", both(SEO_TECH)],
            ["CRM et automatisation des leads", both(CRM)],
          ],
        },
      },
      {
        k: "p",
        v: `Les formules regroupent ces lignes. La formule Production — quatre vidéos par mois, diffusées et optimisées sur une plateforme — coûte ${both(PRODUCTION)} par mois, sans engagement. La formule Acquisition — quatre vidéos, diffusion sur Meta, Google et TikTok, leads envoyés dans votre CRM — coûte ${both(ACQUISITION)} par mois, avec trois mois d'engagement. L'offre de lancement en cours est indiquée sur notre page tarifs.`,
      },
    ],
  },

  /* ======================================================================
   *  11. COMMUNITY MANAGER A MARRAKECH
   * ==================================================================== */
  {
    slug: "community-manager-marrakech",
    services: ["production-video-photo", "meta-ads", "branding"],
    title: "Community manager à Marrakech : ce qu'il fait, et ce qu'il ne fait pas",
    seoTitle: "Community manager à Marrakech : prix",
    excerpt:
      "Publier tous les jours ne suffit pas. Ce qui fait la différence, c'est ce qui est publié, pour qui, et ce qui se passe quand quelqu'un répond.",
    category: "Stratégie",
    date: "2026-10-19",
    readingTime: 5,
    seo: "Community manager à Marrakech : ligne éditoriale, calendrier, publication et modération. Ce que couvre le service, son prix, et sa différence avec la publicité.",
    takeaways: [
      "Un community manager construit la ligne éditoriale d'une marque, planifie et publie ses contenus, et modère les commentaires sur Instagram, Facebook ou TikTok.",
      "Le community management fait vivre un compte ; la publicité payante fait venir des clients qui ne vous suivent pas encore. Les deux se complètent mais ne se remplacent pas.",
      `Chez UltraVision Agency, à Marrakech, le community management coûte ${both(CM)} par mois hors taxes : ligne éditoriale, calendrier, publication et modération.`,
      "La qualité des contenus pèse plus que la fréquence : une vidéo tournée pour le format vertical fait plus pour un compte que plusieurs visuels génériques.",
      "Les réponses commerciales aux messages privés — prix, réservations, disponibilités — sont mieux traitées par l'entreprise elle-même, qui connaît ses clients.",
    ],
    faq: [
      {
        q: "Combien coûte un community manager à Marrakech ?",
        a: `Cela dépend du nombre de réseaux, du volume de publications et de qui produit les contenus. Chez UltraVision Agency, le community management coûte ${both(CM)} par mois hors taxes ; les vidéos se commandent à part, à ${both(VIDEO)} l'unité, ou dans la formule Production.`,
      },
      {
        q: "Un community manager répond-il aux messages des clients ?",
        a: "Il modère les commentaires et peut répondre aux questions simples. Les demandes commerciales — prix, réservations, disponibilités — sont mieux traitées par l'entreprise, ou transmises à elle sans délai.",
      },
      {
        q: "Faut-il un community manager ou de la publicité ?",
        a: "Si la marque est encore peu connue, la publicité fait venir les premiers clients plus vite. Si elle a déjà une audience, le community management l'entretient. La plupart des entreprises ont besoin des deux, dans cet ordre.",
      },
      {
        q: "Combien de publications par semaine faut-il ?",
        a: "Il n'existe pas de chiffre valable pour tous. Un rythme tenu dans la durée vaut mieux qu'un rythme intense abandonné au bout d'un mois, et une publication réussie vaut mieux que trois publications faites pour remplir le calendrier.",
      },
    ],
    body: [
      {
        k: "p",
        v: "À Marrakech, beaucoup de commerces confient leur compte Instagram à un proche, puis à un freelance, puis à une agence. Le poste change de main ; la question reste la même : que doit-on attendre d'un community manager ?",
      },

      { k: "h2", v: "Ce que couvre le community management" },
      {
        k: "ul",
        v: [
          "La ligne éditoriale : ce que la marque dit, à qui, et sur quel ton.",
          "Le calendrier : quoi publier, quand, sur quel réseau.",
          "La publication : légendes, formats, identifications.",
          "La modération : répondre aux commentaires, masquer les indésirables, transmettre les questions commerciales.",
        ],
      },

      { k: "h2", v: "Ce qui n'en fait pas partie" },
      {
        k: "p",
        v: "La production des vidéos et des photos est un métier à part : trouver l'angle, écrire, tourner, monter. Un community manager publie une vidéo ; il ne la tourne pas forcément. La publicité payante aussi est un autre métier : régler une campagne Meta ou TikTok, suivre le coût d'une demande et arbitrer les budgets relève du pilotage publicitaire.",
      },
      {
        k: "table",
        v: {
          head: ["", "Community management", "Publicité payante"],
          rows: [
            ["Objectif", "Faire vivre le compte et fidéliser", "Faire venir de nouveaux clients"],
            ["Qui voit les contenus", "Surtout vos abonnés", "Des personnes qui ne vous connaissent pas encore"],
            ["Ce qui se mesure", "Engagement, messages reçus", "Coût par demande, par rendez-vous"],
            ["Ce que l'on paie", "Des honoraires", "Des honoraires et un budget versé aux plateformes"],
          ],
        },
      },

      { k: "h2", v: "La fréquence compte moins que le contenu" },
      {
        k: "p",
        v: "Publier chaque jour un visuel générique remplit un calendrier, pas un carnet de commandes. Un compte qui publie moins, mais montre le lieu, le produit et les vrais clients, donne une raison de s'abonner, et de revenir.",
      },
      { k: "quote", v: "Un compte se juge à ce qu'il donne envie de faire, pas au nombre de publications." },

      { k: "h2", v: "Notre façon de faire" },
      {
        k: "p",
        v: `Nous produisons les contenus avant de les publier : les vidéos sont tournées sur place, à Marrakech, au format vertical, puis réutilisées dans les publicités. Le community management coûte ${both(CM)} par mois hors taxes : ligne éditoriale, calendrier, publication et modération. Les vidéos se commandent à l'unité, à ${both(VIDEO)}, ou dans la formule Production, à ${both(PRODUCTION)} par mois pour quatre vidéos diffusées et pilotées.`,
      },
    ],
  },

  /* ======================================================================
   *  12. REFERENCEMENT GOOGLE A MARRAKECH
   * ==================================================================== */
  {
    slug: "referencement-google-marrakech",
    services: ["creation-site-web", "google-ads", "generation-de-leads"],
    title: "Apparaître en premier sur Google à Marrakech : ce qui compte vraiment",
    seoTitle: "Référencement Google à Marrakech",
    excerpt:
      "Sur une recherche comme « restaurant Marrakech » ou « agence immobilière Marrakech », Google affiche d'abord une carte, puis des sites. Les deux ne se gagnent pas de la même manière.",
    category: "Stratégie",
    date: "2026-10-19",
    readingTime: 6,
    seo: "Référencement à Marrakech : fiche Google, avis, une page par service, technique et liens. Ce qui fait remonter une entreprise locale, et en combien de temps.",
    takeaways: [
      "Sur une recherche locale, Google affiche souvent un bloc de carte avant les sites : ce bloc dépend de la fiche d'établissement Google, pas du site seul.",
      "Google indique classer les résultats locaux selon trois critères : la pertinence, la distance et la notoriété de l'établissement, dont font partie le nombre et la note des avis.",
      "Une page par service, qui nomme la ville et répond aux questions des clients — prix, délais, déroulé —, se positionne mieux qu'une page d'accueil qui parle de tout.",
      "Un site neuf met plusieurs semaines, souvent plusieurs mois, à s'installer sur des recherches disputées : personne ne peut garantir une première place sur Google.",
      "Entre deux pages de qualité comparable, les liens et les mentions venant d'autres sites sérieux, notamment marocains, font souvent la différence.",
    ],
    faq: [
      {
        q: "Combien de temps faut-il pour apparaître en premier sur Google ?",
        a: "Il n'y a pas de délai garanti. Sur une recherche peu disputée, quelques semaines peuvent suffire ; sur une recherche comme « agence immobilière Marrakech », il faut compter plusieurs mois de travail régulier. Une agence qui garantit la première place promet ce que Google lui-même dit impossible.",
      },
      {
        q: "La fiche Google est-elle plus importante que le site ?",
        a: "Pour les recherches locales, la fiche d'établissement est souvent ce qui apparaît en premier, avec la carte. Le site reste indispensable : c'est lui qui convainc, et c'est vers lui que la fiche renvoie.",
      },
      {
        q: "Combien coûte le référencement d'un site à Marrakech ?",
        a: `Chez UltraVision Agency, le référencement technique — structure, balises, données structurées, Search Console — coûte ${both(SEO_TECH)} une fois, et le suivi mensuel — mots-clés, contenus, liens, rapport de positions — ${both(SEO_SUIVI)} par mois, hors taxes.`,
      },
      {
        q: "Faut-il faire de la publicité Google Ads en attendant ?",
        a: "C'est souvent judicieux. Le référencement naturel prend du temps ; une annonce Google Ads apparaît en haut des résultats dès son lancement. La publicité apporte des demandes pendant que le référencement s'installe.",
      },
    ],
    body: [
      {
        k: "p",
        v: "Tapez « restaurant Marrakech » ou « agence immobilière Marrakech » : Google montre d'abord une carte avec quelques établissements, puis une liste de sites. Ces deux emplacements ne se gagnent pas de la même façon.",
      },

      { k: "h2", v: "La carte : la fiche d'établissement Google" },
      {
        k: "p",
        v: "Le bloc de carte s'appuie sur la fiche d'établissement Google, celle qui affiche l'adresse, les horaires et les avis. Google indique classer ces résultats selon trois critères : la pertinence par rapport à la recherche, la distance avec la personne qui cherche, et la notoriété de l'établissement.",
      },
      {
        k: "ul",
        v: [
          "Une catégorie principale exacte : « agence de marketing », « restaurant », « agence immobilière ».",
          "Des informations complètes et identiques partout : nom, adresse ou zone desservie, téléphone, site.",
          "Des photos réelles, tenues à jour.",
          "Des avis de vrais clients, auxquels l'établissement répond.",
        ],
      },
      {
        k: "note",
        v: "Les avis achetés ou écrits par l'entreprise elle-même sont contraires aux règles de Google, qui peut les supprimer et restreindre la fiche.",
      },

      { k: "h2", v: "Les sites : une page par question" },
      {
        k: "p",
        v: "Sous la carte, Google classe des pages, pas des entreprises. Une page d'accueil qui parle de tout se positionne rarement sur une recherche précise. Une page consacrée à un service, qui nomme la ville et répond aux questions qu'un client se pose — prix, délais, déroulé, exemples —, a beaucoup plus de chances d'être choisie.",
      },
      {
        k: "p",
        v: "C'est aussi ce que lisent les assistants comme ChatGPT ou l'Aperçu IA de Google : des réponses courtes et claires, qui se comprennent sorties de la page.",
      },

      { k: "h2", v: "La technique : ce que Google ne doit pas deviner" },
      {
        k: "ul",
        v: [
          "Un site rapide sur mobile.",
          "Une seule adresse par page, en https.",
          "Un titre et une description écrits pour chaque page.",
          "Des données structurées qui décrivent l'entreprise et ses services.",
          "Un plan du site déclaré dans la Search Console, qui permet aussi de suivre les positions.",
        ],
      },

      { k: "h2", v: "Les mentions : ce que les autres disent de vous" },
      {
        k: "p",
        v: "Entre deux pages de qualité comparable, Google tient compte des liens et des mentions qui viennent d'autres sites : un annuaire professionnel, un média local, un partenaire, un client qui cite son prestataire. Un lien venu d'un site marocain sérieux vaut mieux que des dizaines de liens achetés sans rapport avec votre activité.",
      },

      { k: "h2", v: "Le délai" },
      {
        k: "p",
        v: "Un site neuf met plusieurs semaines à être exploré, puis plusieurs mois à s'installer sur des recherches disputées. La Search Console permet de suivre ce travail : les pages indexées, les recherches qui déclenchent l'affichage, la position moyenne.",
      },
      { k: "quote", v: "Personne ne peut garantir la première place. On peut en revanche ne rien laisser au hasard." },

      { k: "h2", v: "Ce que nous faisons" },
      {
        k: "p",
        v: `Le référencement technique — structure, balises, données structurées, Search Console — coûte ${both(SEO_TECH)}, une fois. Le suivi mensuel — mots-clés, contenus, liens, rapport de positions — coûte ${both(SEO_SUIVI)} par mois. Pour être cité par ChatGPT, Perplexity et les résumés IA de Google, la visibilité sur les IA coûte ${both(GEO)}. Prix hors taxes.`,
      },
    ],
  },
  /* ======================================================================
   *  13. VIDEO IMMOBILIERE A MARRAKECH
   * ==================================================================== */
  {
    slug: "video-immobiliere-marrakech",
    services: ["production-video-photo", "meta-ads", "generation-de-leads"],
    title: "Vidéo immobilière à Marrakech : filmer un bien pour qu'il se vende",
    seoTitle: "Vidéo immobilière à Marrakech",
    excerpt:
      "Une visite filmée répond aux questions avant le premier appel. Encore faut-il filmer ce que l'acheteur cherche, et le montrer à ceux qui achètent vraiment.",
    category: "Production",
    date: "2026-10-19",
    readingTime: 6,
    seo: "Vidéo immobilière à Marrakech : visite face caméra ou en ambiance, format vertical, sous-titres pour acheteurs étrangers, diffusion et suivi des demandes.",
    takeaways: [
      "Une vidéo immobilière efficace répond aux questions d'un acheteur avant le premier appel : la lumière, les volumes, la vue, le quartier et l'état réel du bien.",
      "Le format vertical est celui des réseaux où se diffusent les annonces : un bien filmé en vertical se regarde en entier sur un téléphone, sans le tourner.",
      "Pour un programme encore en construction, on filme ce qui existe déjà : le quartier, les commerces, les parties communes, le cadre de vie.",
      "Pour des acheteurs étrangers, la vidéo est tournée sur place, sous-titrée dans la langue du marché visé, puis diffusée dans ce pays.",
      `Chez UltraVision Agency, à Marrakech, une vidéo publicitaire — angle, script, tournage, montage, formats verticaux — coûte ${both(VIDEO)} hors taxes.`,
    ],
    faq: [
      {
        q: "Combien coûte une vidéo immobilière à Marrakech ?",
        a: `Chez UltraVision Agency, une vidéo publicitaire immobilière — angle, script, tournage sur place, montage et formats verticaux — coûte ${both(VIDEO)} hors taxes. Une première vidéo avec 14 jours de diffusion pilotée coûte ${both(ESSAI)}, sans engagement.`,
      },
      {
        q: "Faut-il apparaître face caméra ?",
        a: "Ce n'est pas obligatoire. Une visite présentée par l'agent ou le promoteur crée de la confiance : on sait à qui l'on parle avant d'appeler. Une visite en ambiance, sans personne à l'écran, convient mieux à un bien d'exception où le lieu suffit.",
      },
      {
        q: "Quelle durée pour une vidéo de visite ?",
        a: "Assez pour montrer les pièces principales, la vue et l'extérieur, pas davantage. Les premières secondes décident si la vidéo est regardée : elles doivent montrer ce que le bien a de plus fort.",
      },
      {
        q: "Peut-on toucher des acheteurs qui vivent à l'étranger ?",
        a: "Oui. La vidéo est sous-titrée dans la langue du marché visé, et la publicité est diffusée auprès des personnes de ce pays. C'est un dispositif que nous avons mis en place pour un agent immobilier et pour un promoteur.",
      },
    ],
    body: [
      {
        k: "p",
        v: "Dans l'immobilier, la vidéo ne remplace pas la visite : elle décide qui viendra la faire. Un acheteur qui a vu le bien filmé arrive avec ses vraies questions, et ceux à qui il ne convient pas ne prennent pas rendez-vous pour rien.",
      },

      { k: "h2", v: "Ce qu'un acheteur veut voir" },
      {
        k: "ul",
        v: [
          "La lumière, et l'orientation des pièces.",
          "Les volumes, filmés en continu plutôt qu'en plans fixes.",
          "La vue et l'extérieur : terrasse, jardin, piscine, rue.",
          "Le quartier : ce qu'il y a à pied, ce qu'il y a autour.",
          "L'état réel du bien, sans retouche qui décevrait à la visite.",
        ],
      },

      { k: "h2", v: "Face caméra ou en ambiance" },
      {
        k: "p",
        v: "Deux façons de filmer une visite. Présentée face caméra par l'agent ou le promoteur, elle crée de la confiance : on connaît la personne avant de l'appeler. C'est le format de la visite d'un triplex à Marrakech pour l'agence All In Kech, et du film tourné pour Shams Immo sur l'immobilier neuf. En ambiance, sans personne à l'écran, le lieu parle seul : c'est le choix des biens d'exception et des intérieurs très travaillés.",
      },

      { k: "h2", v: "Vendre ce qui n'est pas encore construit" },
      {
        k: "p",
        v: "Pour un programme en construction, il n'y a pas encore de pièces à filmer. On filme ce qui existe déjà : le quartier, les commerces, les parties communes, le cadre de vie. C'est ainsi qu'ont été tournés le lancement d'une résidence neuve et la présentation d'un programme de villas encore en chantier, adressée à un marché étranger.",
      },

      { k: "h2", v: "Le format vertical" },
      {
        k: "p",
        v: "Les annonces immobilières se regardent sur Instagram, Facebook et TikTok, sur un téléphone tenu droit. Une vidéo tournée en vertical occupe tout l'écran ; une vidéo horizontale recadrée perd une partie de la pièce. Le cadrage se décide donc au tournage, pas au montage.",
      },

      { k: "h2", v: "Toucher les acheteurs étrangers" },
      {
        k: "p",
        v: "Une partie des acheteurs d'un bien à Marrakech vit à l'étranger. Pour eux, la vidéo est tournée sur place puis sous-titrée dans la langue du marché visé, et la publicité est diffusée dans ce pays. C'est le dispositif utilisé pour un agent immobilier qui cherchait des acheteurs à l'international.",
      },

      { k: "h2", v: "Après la vidéo : ne perdre aucune demande" },
      {
        k: "p",
        v: "Une vidéo qui fonctionne génère des messages, des appels et des formulaires. Sans suivi, une partie se perd. Un formulaire relié à un CRM, avec une notification et une relance, permet que chaque demande reçoive une réponse, jusqu'à la visite.",
      },
      { k: "quote", v: "La vidéo ne remplace pas la visite : elle décide qui viendra la faire." },

      { k: "h2", v: "Nos prix" },
      {
        k: "p",
        v: `Une vidéo publicitaire — angle, script, tournage sur place à Marrakech, montage, formats verticaux — coûte ${both(VIDEO)} hors taxes. Pour juger avant de s'engager, une première vidéo avec 14 jours de diffusion pilotée coûte ${both(ESSAI)}. Le budget publicitaire, versé aux plateformes, s'ajoute.`,
      },
    ],
  },

  /* ======================================================================
   *  14. RESERVATIONS DIRECTES : RESTAURANTS, RIADS, HOTELS
   * ==================================================================== */
  {
    slug: "reservations-directes-restaurant-riad-marrakech",
    services: ["creation-site-web", "production-video-photo", "meta-ads"],
    title: "Restaurant, riad, hôtel à Marrakech : obtenir plus de réservations en direct",
    seoTitle: "Réservations directes à Marrakech",
    excerpt:
      "Les plateformes de réservation apportent des clients et prennent une commission sur chacun. Un site qui réserve, des vidéos qui donnent envie et une publicité bien ciblée font venir une partie d'entre eux en direct.",
    category: "Stratégie",
    date: "2026-10-19",
    readingTime: 6,
    seo: "Restaurant, riad ou hôtel à Marrakech : site avec réservation intégrée, vidéos de jour et de nuit, fiche Google, Instagram et publicité pour réserver en direct.",
    takeaways: [
      "Une réservation directe passe par le site, le téléphone, le WhatsApp ou les réseaux de l'établissement, sans intermédiaire qui prélève une commission.",
      "Le site d'un restaurant, d'un riad ou d'un hôtel doit permettre de réserver en quelques gestes sur un téléphone, sans renvoyer vers une autre plateforme.",
      "À Marrakech, la clientèle est à la fois locale et de passage : un site en au moins deux langues parle aux deux.",
      "Un lieu filmé de jour et de nuit montre ses deux visages : le calme de l'après-midi et l'ambiance du soir ne s'adressent pas aux mêmes clients.",
      "La fiche d'établissement Google, avec ses photos, ses horaires, ses avis et son lien de réservation, est souvent le premier contact entre un client et un lieu.",
    ],
    faq: [
      {
        q: "Comment obtenir plus de réservations directes ?",
        a: "En rendant la réservation directe aussi simple que sur une plateforme : un site rapide sur téléphone, un bouton de réservation visible, des photos et des vidéos à jour, et le lien de ce site partout — Instagram, fiche Google, WhatsApp.",
      },
      {
        q: "Faut-il quitter les plateformes de réservation ?",
        a: "Rarement. Elles apportent une clientèle qui ne vous connaît pas encore. L'objectif est de faire réserver en direct les clients qui vous connaissent déjà, et d'être assez visible pour que d'autres le fassent aussi.",
      },
      {
        q: "Combien coûte un site avec réservation pour un restaurant ?",
        a: `Chez UltraVision Agency, un site vitrine jusqu'à 5 pages coûte à partir de ${both(VITRINE)} hors taxes. Le prix final dépend du nombre de pages, des langues et du système de réservation retenu.`,
      },
      {
        q: "Quelles vidéos tourner pour un restaurant ou un riad ?",
        a: "Le lieu de jour et de nuit, les gestes en cuisine ou au service, les chambres et les terrasses, et les moments que les clients viennent chercher. Filmés en vertical, ces plans servent à la fois sur Instagram, dans les publicités et sur le site.",
      },
    ],
    body: [
      {
        k: "p",
        v: "Un restaurant, un riad ou un hôtel se choisit sur un écran avant de se choisir sur place. La question n'est pas d'être présent sur les plateformes, mais de savoir combien de clients arrivent en direct, et combien passent par un intermédiaire.",
      },

      { k: "h2", v: "Ce qu'est une réservation directe" },
      {
        k: "p",
        v: "Une réservation directe passe par le site de l'établissement, son téléphone, son WhatsApp ou ses réseaux, sans plateforme qui prélève une commission. Elle donne aussi accès au client : son nom, ses coordonnées, et la possibilité de le faire revenir.",
      },

      { k: "h2", v: "Le site : réserver en quelques gestes" },
      {
        k: "ul",
        v: [
          "Un bouton de réservation visible dès l'arrivée, sur téléphone.",
          "La réservation sur le site lui-même, sans renvoi vers une autre plateforme.",
          "La carte, les chambres ou les formules, avec des photos réelles.",
          "Au moins deux langues, pour la clientèle locale et la clientèle de passage.",
          "Le lien du site sur Instagram, sur la fiche Google et dans chaque réponse WhatsApp.",
        ],
      },
      {
        k: "p",
        v: "C'est ce que nous avons mis en place pour Koozina Garden, restaurant et boutique à Essaouira, dont le site bilingue présente la carte, le jardin, la boutique et les événements, et pour le chef Raphaël Anglesy : dans les deux cas, la réservation est intégrée au site.",
      },

      { k: "h2", v: "La vidéo : de jour et de nuit" },
      {
        k: "p",
        v: "Le calme d'un patio l'après-midi et l'ambiance d'une terrasse le soir ne parlent pas aux mêmes clients. Un lieu filmé aux deux moments montre ses deux visages : c'est le parti pris du film tourné pour un lieu de loisirs à Marrakech, avec une accroche sur le tarif d'entrée.",
      },

      { k: "h2", v: "Instagram et la publicité" },
      {
        k: "p",
        v: "Instagram sert de vitrine : c'est là qu'un client vérifie l'ambiance avant de réserver. La publicité Meta va chercher ceux qui ne vous suivent pas encore — les habitants de Marrakech, les personnes qui s'intéressent à la ville — avec une vidéo verticale et un lien direct vers la réservation.",
      },

      { k: "h2", v: "La fiche Google" },
      {
        k: "p",
        v: "Sur « restaurant Marrakech » ou « riad Marrakech », Google affiche d'abord une carte. La fiche d'établissement — photos, horaires, avis, lien de réservation — est souvent le premier contact avec un client. Elle se tient à jour comme une vitrine.",
      },
      { k: "quote", v: "Chaque réservation directe est un client que vous pouvez faire revenir." },

      { k: "h2", v: "Ce que nous faisons" },
      {
        k: "p",
        v: `Nous concevons les sites avec réservation intégrée, filmons les lieux sur place et diffusons ces vidéos en publicité. Un site vitrine coûte à partir de ${both(VITRINE)}, une vidéo publicitaire ${both(VIDEO)}, et le pilotage d'une plateforme publicitaire ${both(MEDIA)} par mois, hors taxes. Le budget publicitaire s'ajoute.`,
      },
    ],
  },
  /* ======================================================================
   *  15. ETRE CITE PAR CHATGPT ET LES ASSISTANTS IA
   * ==================================================================== */
  {
    slug: "etre-cite-par-chatgpt-entreprise-marrakech",
    services: ["creation-site-web"],
    title: "Être cité par ChatGPT quand on cherche une entreprise à Marrakech",
    seoTitle: "Être cité par ChatGPT à Marrakech",
    excerpt:
      "Quand on demande à ChatGPT ou à Perplexity une bonne adresse à Marrakech, l'assistant répond par trois ou quatre noms. Ce qu'il lit pour les choisir, et ce qu'une entreprise peut faire pour en faire partie.",
    category: "Stratégie",
    date: "2026-10-20",
    readingTime: 6,
    seo: "Être cité par ChatGPT, Perplexity et l'Aperçu IA de Google à Marrakech : un nom cohérent partout, des pages qui répondent, une fiche Google, des avis.",
    takeaways: [
      "ChatGPT, Perplexity, Gemini et l'Aperçu IA de Google répondent à une question en citant quelques entreprises, choisies parmi les pages qu'ils trouvent et comprennent.",
      "Un assistant cite plus volontiers une entreprise dont le nom, la ville et le métier sont décrits de la même façon sur son site, sa fiche Google et les annuaires.",
      "Une page qui répond en une ou deux phrases claires à une question précise est plus facile à citer qu'une page qui renvoie vers un formulaire de contact.",
      "Les avis clients et les mentions sur d'autres sites comptent autant que le site lui-même : un assistant cherche des confirmations extérieures.",
      "Le référencement sur les assistants IA, appelé GEO, prolonge le référencement Google et repose sur les mêmes fondations.",
    ],
    faq: [
      {
        q: "Comment apparaître dans les réponses de ChatGPT ?",
        a: "En étant trouvable, compréhensible et confirmé : un site qui répond clairement aux questions de vos clients, le même nom, la même ville et le même métier partout, une fiche Google validée avec des avis, et des mentions sur d'autres sites.",
      },
      {
        q: "Qu'est-ce que le GEO ?",
        a: "GEO signifie Generative Engine Optimization : le travail qui rend une entreprise compréhensible et citable par les assistants comme ChatGPT, Perplexity, Gemini ou l'Aperçu IA de Google. Il prolonge le référencement Google et repose sur les mêmes fondations.",
      },
      {
        q: "Le fichier llms.txt est-il obligatoire ?",
        a: "Non. C'est un résumé du site destiné aux assistants qui le lisent ; Google ne l'utilise pas pour classer les pages. Il aide surtout à éviter qu'une machine résume mal votre entreprise.",
      },
      {
        q: "Combien coûte la visibilité sur les IA ?",
        a: `Chez UltraVision Agency, à Marrakech, la visibilité sur les IA (GEO) coûte ${both(GEO)} hors taxes. Elle s'appuie idéalement sur un référencement technique propre, à ${both(SEO_TECH)}.`,
      },
    ],
    body: [
      {
        k: "p",
        v: "Une partie des recherches ne passe plus par une liste de liens. On demande à un assistant « un bon riad à Marrakech », « une clinique dentaire à Guéliz » ou « une agence pour mes vidéos publicitaires », et il répond par trois ou quatre noms. Être dans cette réponse se prépare, comme une première page Google.",
      },

      { k: "h2", v: "Comment un assistant choisit les entreprises qu'il cite" },
      {
        k: "p",
        v: "Pour une question locale, l'assistant cherche sur le web, lit quelques pages et compose une réponse. Il retient les entreprises qu'il trouve, qu'il comprend, et que d'autres sources confirment. Une entreprise introuvable n'est pas lue, une page confuse n'est pas comprise, et un nom que rien ne confirme passe après ceux que plusieurs sources citent.",
      },
      {
        k: "figure",
        v: {
          type: "steps",
          caption:
            "Les trois conditions pour être cité. Chacune dépend de la précédente : une page qu'un assistant ne trouve pas ne sera jamais comprise.",
          steps: [
            { label: "Trouvé", sub: "Le site est accessible aux robots et présent dans les moteurs." },
            { label: "Compris", sub: "Le nom, la ville, le métier et les prix sont écrits clairement." },
            { label: "Confirmé", sub: "La fiche Google, les avis et les annuaires disent la même chose." },
          ],
        },
      },

      { k: "h2", v: "Un nom, une ville, un métier, partout pareil" },
      {
        k: "p",
        v: "C'est la base, et c'est souvent là que tout se perd. Une entreprise s'appelle d'une façon sur son site, d'une autre sur sa fiche Google, d'une troisième sur Instagram, avec une ancienne adresse dans un annuaire. Pour un assistant, ce sont peut-être plusieurs entreprises.",
      },
      {
        k: "ul",
        v: [
          "Le même nom exact partout, sans mot-clé ajouté.",
          "La même ville et le même quartier.",
          "Le même téléphone et le même site.",
          "Une phrase qui dit ce que vous faites, reprise à l'identique : « Nom est un restaurant libanais à Guéliz, Marrakech ».",
        ],
      },

      { k: "h2", v: "Des pages qui répondent" },
      {
        k: "p",
        v: "Un assistant cite des phrases. « Nous livrons à Guéliz et à l'Hivernage, du mardi au dimanche » peut être repris tel quel ; « livraison selon conditions, contactez-nous » ne peut pas l'être. Les pages à soigner sont celles qui répondent aux questions qu'on vous pose au téléphone : vos prix, vos horaires, votre quartier, ce qui est compris, les délais.",
      },
      {
        k: "ul",
        v: [
          "Une question par section, posée en intertitre.",
          "La réponse dans la première phrase, le détail ensuite.",
          "Une foire aux questions, avec les questions telles qu'on les tape.",
          "Les prix, quand vous pouvez les publier.",
        ],
      },
      {
        k: "p",
        v: "Le site doit aussi être lisible par une machine : du texte dans la page plutôt que dans une image, et des données structurées qui disent qui vous êtes, où vous êtes et ce que vous faites.",
      },

      { k: "h2", v: "Ce que les autres disent de vous" },
      {
        k: "p",
        v: "Un assistant ne se fie pas seulement à ce qu'une entreprise dit d'elle-même. Il cherche des confirmations : les avis de la fiche Google, les profils dans les annuaires, les articles de la presse locale, les sites des partenaires. Une entreprise que plusieurs sources indépendantes décrivent de la même façon devient une réponse sûre.",
      },
      {
        k: "ul",
        v: [
          "La fiche Google validée, complète, avec des avis récents.",
          "Les annuaires de votre métier et les annuaires marocains.",
          "Les sites de vos partenaires, quand ils vous citent avec un lien.",
          "Une fiche Bing Places : tous les assistants ne s'appuient pas sur Google.",
        ],
      },

      { k: "h2", v: "Laisser les assistants lire le site" },
      {
        k: "p",
        v: "Certains sites bloquent sans le savoir les robots des assistants, par un réglage de sécurité ou un fichier robots.txt trop strict. À l'inverse, un fichier llms.txt placé à la racine du site résume l'entreprise et ses pages principales pour les assistants qui le lisent. Ce n'est pas un raccourci : c'est un résumé propre, qui évite qu'une machine se trompe.",
      },
      {
        k: "table",
        v: {
          head: ["Ce qu'un assistant cherche", "Où le lui donner"],
          rows: [
            ["Qui vous êtes", "Une phrase de définition, identique sur le site, la fiche Google et les annuaires"],
            ["Où vous êtes", "La ville, le quartier, la zone desservie"],
            ["Ce que vous faites, et à quel prix", "Une page par service, avec les prix quand c'est possible"],
            ["Ce qu'en pensent vos clients", "Les avis Google et ceux des annuaires"],
            ["Qui le confirme", "Les annuaires, la presse, les partenaires"],
          ],
        },
      },
      { k: "quote", v: "Un assistant cite ce qu'il comprend, et ce que d'autres confirment." },

      { k: "h2", v: "Combien de temps ?" },
      {
        k: "p",
        v: "Les corrections du site se voient à mesure que les moteurs relisent les pages : quelques semaines. La confiance, elle, se construit avec les avis et les mentions, sur plusieurs mois. C'est le même calendrier que le référencement Google, et c'est le même travail.",
      },

      { k: "h2", v: "Ce que nous faisons" },
      {
        k: "p",
        v: `Nous avons appliqué cette méthode à notre propre site — définition de l'entreprise, données structurées, fichier llms.txt, pages qui répondent, profils alignés — et nous la mettons en place pour nos clients. La visibilité sur les IA coûte ${both(GEO)} et le référencement technique ${both(SEO_TECH)}, hors taxes.`,
      },
    ],
  },

  /* ======================================================================
   *  16. LEADS IMMOBILIERS : DU FORMULAIRE A LA VISITE
   * ==================================================================== */
  {
    slug: "leads-immobiliers-marrakech",
    services: ["crm-ia-automatisation", "generation-de-leads", "meta-ads"],
    title: "Agence immobilière à Marrakech : ne plus perdre de leads entre le formulaire et la visite",
    seoTitle: "Leads immobiliers à Marrakech",
    excerpt:
      "Une publicité immobilière qui fonctionne remplit une liste de demandes. La suite décide des ventes : le délai de réponse, la qualification, les relances et le suivi, jusqu'à la visite.",
    category: "Méthode",
    date: "2026-10-20",
    readingTime: 6,
    seo: "Agences immobilières et promoteurs à Marrakech : répondre vite aux leads, les qualifier, les relancer sur WhatsApp et suivre chaque demande dans un CRM.",
    takeaways: [
      "Un lead immobilier est une demande de contact laissée par une personne intéressée par un bien, le plus souvent par un formulaire publicitaire, un appel ou un message WhatsApp.",
      "Une personne qui vient de remplir un formulaire a encore le bien en tête : la réponse le jour même est le réglage le plus rentable du suivi.",
      "Trois questions suffisent à qualifier une demande immobilière : le projet, le budget et le délai.",
      "Un CRM regroupe toutes les demandes au même endroit, avec leur source, leur statut, leur responsable et la prochaine action à faire.",
      "Une partie des acheteurs à Marrakech vit à l'étranger : le suivi passe alors par WhatsApp, en plusieurs langues, avec des visites en vidéo avant le déplacement.",
    ],
    faq: [
      {
        q: "Comment gérer les leads immobiliers ?",
        a: "En les centralisant dans un seul outil, en répondant le jour même, en qualifiant chaque demande par le projet, le budget et le délai, et en relançant selon un rythme fixé à l'avance, jusqu'à la visite ou à un refus clair.",
      },
      {
        q: "Quel CRM pour une agence immobilière ?",
        a: "Celui que l'équipe met vraiment à jour. L'outil compte moins que les règles : chaque demande a une source, un statut, un responsable et une prochaine action datée. Le choix se fait selon vos habitudes et votre budget logiciel.",
      },
      {
        q: "Pourquoi mes leads Facebook immobiliers ne répondent pas ?",
        a: "Souvent parce que la réponse arrive trop tard, ou parce que le formulaire était trop facile à remplir. Une notification immédiate, une réponse le jour même et une ou deux questions de qualification dans le formulaire améliorent la qualité des demandes.",
      },
      {
        q: "Combien coûte l'automatisation des leads ?",
        a: `Chez UltraVision Agency, à Marrakech, la mise en place du CRM et de l'automatisation des leads coûte ${both(CRM)} hors taxes. L'abonnement au logiciel CRM est payé directement à l'éditeur.`,
      },
    ],
    body: [
      {
        k: "p",
        v: "Une campagne immobilière qui fonctionne produit des demandes : des noms, des numéros, des messages. Beaucoup de ventes se perdent ensuite, pas dans la publicité. Une demande qui attend deux jours, un numéro rappelé une seule fois, un tableur que personne ne tient à jour : le budget publicitaire a payé des contacts que personne n'a suivis.",
      },

      { k: "h2", v: "Le parcours d'une demande" },
      {
        k: "figure",
        v: {
          type: "steps",
          caption:
            "Les cinq étapes entre le formulaire et la visite. Chacune a un responsable et un délai ; c'est là que se joue le coût réel d'une visite.",
          steps: [
            { label: "Demande", sub: "Formulaire, appel ou WhatsApp, enregistré avec sa source." },
            { label: "Réponse", sub: "Le jour même, avec le nom du bien." },
            { label: "Qualification", sub: "Le projet, le budget, le délai." },
            { label: "Relances", sub: "Un rythme fixé à l'avance." },
            { label: "Visite", sub: "Sur place ou en vidéo." },
          ],
        },
      },

      { k: "h2", v: "Répondre le jour même" },
      {
        k: "p",
        v: "Une personne qui demande des informations sur une villa regarde peut-être trois autres annonces le même soir. La première agence qui répond, avec le nom du bien et une proposition concrète, prend l'avantage. Une notification immédiate sur le téléphone de l'agent — le nom, le numéro, le bien concerné — est le réglage le plus rentable de tout le dispositif.",
      },

      { k: "h2", v: "Qualifier en trois questions" },
      {
        k: "ul",
        v: [
          "Le projet : y vivre, louer, une résidence secondaire.",
          "Le budget, et le financement s'il y en a un.",
          "Le délai : ce mois-ci, dans six mois, ou simple curiosité.",
        ],
      },
      {
        k: "p",
        v: "Ces trois réponses décident de la suite. Un acheteur prêt dans le mois appelle une visite ; un investisseur qui compare attend des chiffres et un dossier ; une curiosité reçoit une sélection de biens et une relance plus tard. Le formulaire publicitaire peut poser une ou deux de ces questions dès le départ : quelques demandes en moins, de meilleures demandes en plus.",
      },

      { k: "h2", v: "Relancer sans harceler" },
      {
        k: "p",
        v: "Beaucoup de personnes ne décrochent pas au premier appel. Un rythme simple : un appel et un message WhatsApp le jour même, un second message le lendemain avec une vidéo du bien, un dernier quelques jours plus tard avec des biens comparables. Au-delà, la demande passe dans un suivi mensuel : un projet immobilier prend du temps.",
      },
      {
        k: "p",
        v: "La vidéo est un argument de relance. Un film de visite envoyé sur WhatsApp fait revenir une personne qui hésitait, surtout si elle ne peut pas se déplacer.",
      },

      { k: "h2", v: "Le CRM : une seule liste, à jour" },
      {
        k: "table",
        v: {
          head: ["Ce que le CRM garde", "Pourquoi"],
          rows: [
            ["La source de la demande", "Savoir quelle campagne produit des visites, pas seulement des formulaires"],
            ["Le bien concerné", "Répondre avec le bon bien, sans faire répéter"],
            ["Le statut", "Nouvelle, contactée, qualifiée, visite prévue, offre, perdue"],
            ["La prochaine action et sa date", "Ne plus oublier de relance"],
            ["L'agent responsable", "Une demande, un interlocuteur"],
          ],
        },
      },
      {
        k: "p",
        v: "L'intérêt n'est pas l'outil, c'est la discipline qu'il impose. C'est aussi lui qui permet, au bout d'un mois, de dire combien de visites et de ventes chaque campagne a produites : la seule mesure qui compte vraiment.",
      },

      { k: "h2", v: "Les acheteurs qui vivent à l'étranger" },
      {
        k: "p",
        v: "Une partie des acheteurs et des investisseurs à Marrakech ne vit pas au Maroc. Le suivi s'adapte : WhatsApp plutôt que l'appel, des messages en français et en anglais, des horaires qui tiennent compte du décalage, et une visite en vidéo avant le déplacement.",
      },
      { k: "quote", v: "Le budget publicitaire achète des demandes. Le suivi les transforme en visites." },

      { k: "h2", v: "Ce que nous faisons" },
      {
        k: "p",
        v: `Nous tournons les vidéos de biens, diffusons les campagnes immobilières et branchons les demandes sur un CRM, avec notifications et relances. Le CRM et l'automatisation des leads coûtent ${both(CRM)}, le pilotage d'une plateforme publicitaire ${both(MEDIA)} par mois, hors taxes. La formule Acquisition réunit les vidéos, la diffusion sur Meta, Google et TikTok et l'automatisation des leads pour ${both(ACQUISITION)} par mois.`,
      },
    ],
  },

  /* ======================================================================
   *  17. PUBLICITE TIKTOK AU MAROC
   * ==================================================================== */
  {
    slug: "publicite-tiktok-maroc",
    services: ["tiktok-ads", "production-video-photo"],
    title: "Publicité TikTok au Maroc : le budget, les vidéos et ce qui fonctionne",
    seoTitle: "Publicité TikTok au Maroc : le budget",
    excerpt:
      "Le budget minimum imposé par TikTok, celui qu'il faut pour apprendre quelque chose, et le type de vidéos qui fonctionne : ce qu'il faut savoir avant de lancer une première campagne TikTok au Maroc.",
    category: "Tarifs",
    date: "2026-10-20",
    readingTime: 6,
    seo: "Publicité TikTok au Maroc : budget minimum, budget utile pour démarrer, vidéos qui fonctionnent, mesure des résultats et prix de la gestion à Marrakech.",
    takeaways: [
      "Dans le gestionnaire de publicités TikTok, le budget quotidien d'un groupe d'annonces doit dépasser 20 dollars, et celui d'une campagne, s'il est fixé à ce niveau, 50 dollars.",
      "Un groupe d'annonces diffusé un mois au budget minimum représente un peu plus de 600 dollars, versés directement à TikTok.",
      "Sur TikTok, les publicités qui fonctionnent ressemblent aux vidéos du fil : tournées en vertical, avec une accroche dans les premières secondes et du texte à l'écran.",
      "Une accroche s'use en quelques semaines : une campagne TikTok demande de nouvelles vidéos chaque mois.",
      "TikTok convient aux métiers où le résultat se voit tout de suite : beauté, coiffure, cosmétique, restauration, loisirs.",
    ],
    faq: [
      {
        q: "Quel budget minimum pour une publicité TikTok ?",
        a: "Dans le gestionnaire de publicités TikTok, le budget quotidien d'un groupe d'annonces doit dépasser 20 dollars, soit un peu plus de 600 dollars sur un mois. Si un budget est fixé au niveau de la campagne, il doit dépasser 50 dollars par jour.",
      },
      {
        q: "Peut-on faire de la publicité TikTok au Maroc ?",
        a: "Oui. Une entreprise au Maroc crée ses campagnes dans le gestionnaire de publicités TikTok, comme ailleurs, et peut cibler le public marocain.",
      },
      {
        q: "Quelles vidéos marchent sur TikTok Ads ?",
        a: "Des vidéos verticales qui ressemblent au contenu du fil : une accroche dans les premières secondes, une personne face caméra, du texte à l'écran et une offre claire. Une publicité qui ressemble à une publicité est zappée.",
      },
      {
        q: "Combien coûte la gestion d'une campagne TikTok ?",
        a: `Chez UltraVision Agency, à Marrakech, le pilotage de TikTok Ads coûte ${both(MEDIA)} par mois hors taxes, hors budget publicitaire versé à TikTok. Une vidéo publicitaire coûte ${both(VIDEO)}.`,
      },
    ],
    body: [
      {
        k: "p",
        v: "TikTok permet de montrer un soin, une coupe, un plat ou une soirée à des personnes qui ne vous connaissent pas encore. Avant de lancer une campagne, trois questions : combien prévoir, quelles vidéos tourner, et comment savoir si ça fonctionne.",
      },

      { k: "h2", v: "Le budget minimum imposé par TikTok" },
      {
        k: "p",
        v: "Dans le gestionnaire de publicités TikTok, le budget quotidien d'un groupe d'annonces doit dépasser 20 dollars. Si vous fixez aussi un budget au niveau de la campagne, il doit dépasser 50 dollars par jour. Un groupe d'annonces diffusé tout un mois au minimum représente donc un peu plus de 600 dollars, versés directement à TikTok.",
      },
      {
        k: "table",
        v: {
          head: ["Niveau", "Budget quotidien minimum", "Sur un mois"],
          rows: [
            ["Groupe d'annonces", "Plus de 20 dollars", "Plus de 600 dollars"],
            ["Campagne, si un budget y est fixé", "Plus de 50 dollars", "Plus de 1 500 dollars"],
          ],
        },
      },
      {
        k: "note",
        v: "La presse marocaine rapporte qu'une TVA de 20 % s'applique depuis le 1er août 2026 aux publicités TikTok achetées par les annonceurs au Maroc. Vérifiez-la sur vos factures TikTok et prévoyez-la dans le budget.",
      },

      { k: "h2", v: "Le budget utile" },
      {
        k: "p",
        v: `Le minimum permet de diffuser, pas d'apprendre. Pour savoir quelle vidéo fonctionne, chacune doit recevoir assez de vues pour se comparer aux autres. Nous conseillons de démarrer avec un seul groupe d'annonces, trois ou quatre vidéos et un budget tenu au moins quatre semaines, plutôt que plusieurs groupes au minimum qui n'apprennent rien. Toutes plateformes confondues, nous annonçons ${AD_BUDGET} de budget publicitaire par mois pour démarrer.`,
      },

      { k: "h2", v: "Les vidéos qui fonctionnent sur TikTok" },
      {
        k: "ul",
        v: [
          "Tournées en vertical dès la prise de vue, pas recadrées depuis un format horizontal.",
          "Une accroche dans les premières secondes : un résultat, une question, un geste.",
          "Du texte à l'écran et des sous-titres, pour ceux qui regardent sans le son.",
          "Une personne qui parle face caméra, plutôt qu'une voix off sur des images.",
          "Le prix ou l'offre dit clairement, avant la fin.",
        ],
      },
      {
        k: "p",
        v: "Une publicité TikTok qui ressemble à une publicité est zappée. Celle qui ressemble à une vidéo du fil — la gérante qui montre son institut, le barbier qui termine un dégradé, la cliente qui découvre son résultat — est regardée.",
      },

      { k: "h2", v: "Renouveler avant l'usure" },
      {
        k: "p",
        v: "Une même vidéo montrée trop souvent aux mêmes personnes perd son effet en quelques semaines, et le coût par résultat remonte. Une campagne TikTok se nourrit donc de nouvelles vidéos chaque mois, avec plusieurs accroches testées en parallèle : c'est le rythme de quatre vidéos par mois que nous appliquons aussi sur Meta.",
      },

      { k: "h2", v: "TikTok ou Meta ?" },
      {
        k: "p",
        v: "Les deux ne s'excluent pas. Nous lançons le plus souvent Meta — Facebook et Instagram — en premier, puis TikTok avec les mêmes angles adaptés à ses codes, une fois qu'une vidéo a fait ses preuves. TikTok élargit alors l'audience d'une campagne qui fonctionne déjà.",
      },

      { k: "h2", v: "Mesurer ce qui compte" },
      {
        k: "p",
        v: "Avant de lancer, installez le pixel TikTok sur le site et déclarez les conversions : demande de contact, réservation, achat. Sans cela, TikTok optimise pour des vues, et une campagne qui fait beaucoup de vues peut ne produire aucun client.",
      },
      { k: "quote", v: "Sur TikTok, la vidéo fait l'essentiel du travail ; le budget ne fait que l'amplifier." },

      { k: "h2", v: "Ce que nous faisons" },
      {
        k: "p",
        v: `Nous tournons les vidéos en vertical pour TikTok, ouvrons le compte publicitaire avec son pixel et ses conversions, et pilotons la diffusion chaque semaine. Une vidéo publicitaire coûte ${both(VIDEO)}, l'ouverture des comptes publicitaires ${both(OUVERTURE)}, et le pilotage de TikTok Ads ${both(MEDIA)} par mois, hors taxes et hors budget versé à TikTok.`,
      },
    ],
  },
];

/** Articles triés du plus récent au plus ancien. */
export const ARTICLES_SORTED = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));

/** Retrouve un article par son identifiant d'adresse. */
export const findArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

/** Date lisible : « 14 août 2026 ». */
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
