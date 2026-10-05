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
            "Le partage exact. À gauche ce que nous confions à la machine, à droite ce que nous gardons. Le critère est simple : une erreur y est-elle rattrapable en un coup d'œil ?",
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
    title: "Quel budget pour Meta Ads au Maroc ? Le calcul, pas une moyenne",
    excerpt:
      "Facebook et Instagram acceptent des campagnes à quelques dirhams par jour. La vraie question n'est pas le minimum autorisé, mais le minimum utile : celui qui donne à l'algorithme assez de résultats pour apprendre.",
    category: "Tarifs",
    date: "2026-10-05",
    readingTime: 7,
    seo: "Budget Meta Ads au Maroc : comment calculer ce qu'il faut dépenser sur Facebook et Instagram, en dirhams, à partir du coût d'un résultat et de la phase d'apprentissage.",
    takeaways: [
      "Un budget Meta Ads se calcule à partir du coût d'un résultat, pas à partir d'une moyenne de marché : il doit permettre à chaque ensemble de publicités d'obtenir régulièrement des conversions.",
      "Selon la documentation de Meta, un ensemble de publicités sort de sa phase d'apprentissage après environ 50 événements d'optimisation sur sept jours. Pendant cette phase, les coûts sont plus élevés et moins stables.",
      "Le calcul de départ tient en une ligne : le coût estimé d'un résultat, multiplié par 50 résultats par semaine, multiplié par quatre semaines.",
      "Un petit budget réparti sur plusieurs campagnes n'apprend rien : chaque découpage par audience, par ville ou par format divise les résultats que l'algorithme reçoit.",
      `Pour démarrer, UltraVision Agency recommande ${AD_BUDGET} par mois de budget publicitaire, versé directement à Meta depuis le compte de l'annonceur, en plus des honoraires de production et de pilotage.`,
    ],
    faq: [
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
    title: "Combien coûte un site internet au Maroc ? Ce qui fait le prix",
    excerpt:
      "Deux devis pour « un site internet » peuvent aller du simple au décuple, et décrire deux objets différents. Les cinq éléments qui font le prix, les lignes qu'on oublie, et les questions à poser avant de signer.",
    category: "Tarifs",
    date: "2026-10-05",
    readingTime: 6,
    seo: `Prix d'un site internet au Maroc : ce qui fait varier un devis, landing page ou site vitrine, les frais oubliés et nos tarifs à Marrakech, en dirhams.`,
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
];

/** Articles triés du plus récent au plus ancien. */
export const ARTICLES_SORTED = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));

/** Retrouve un article par son identifiant d'adresse. */
export const findArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

/** Date lisible : « 14 août 2026 ». */
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
