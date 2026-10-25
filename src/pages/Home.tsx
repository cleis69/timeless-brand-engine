import { Link } from "@tanstack/react-router";
import { BRAND } from "@/config/brand";
import { orgRef, pageHead } from "@/lib/seo";
import { ArrowLink, LinkCards, Section, SectionIntro } from "@/components/page/Blocks";
import { articlesFor } from "@/content/localized";
import { localePath, useLocale, type Locale } from "@/lib/i18n";
import { MaskReveal, Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { Conviction } from "@/components/Conviction";
import { HeroReel } from "@/components/HeroReel";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { LOOP, MOTION, EASE_RESPOND } from "@/config/motion";
import { ExpertiseList } from "@/components/ExpertiseList";
import { MethodRail } from "@/components/MethodRail";
import { VideoShowcase } from "@/components/work/VideoShowcase";
import { CONTACT, CONTACT_TEXT, hasWhatsapp, whatsappUrl } from "@/config/contact";
import { LAUNCH_OFFER, MAD, PACKS, dirham, euro, formatDirham, formatEuro, withOffer } from "@/config/pricing";
import { useState } from "react";

/**
 * ULTRA VISION — page d'accueil.
 *
 * ============================================================
 *  CE FICHIER REMPLACE src/routes/index.tsx
 * ============================================================
 *
 * CE QUI CHANGE PAR RAPPORT A LA VERSION PRECEDENTE
 *
 * 1. La section <VideoShowcase /> est ajoutee juste apres le Hero,
 *    avant le bandeau de logos clients. Le visiteur voit une vraie
 *    realisation des le premier scroll.
 *
 * 2. La section <Projects /> a ete supprimee. C'etait une liste de
 *    texte citant Nordhaus, Meridian, Atelier Vaste et Kairos
 *    Capital, qui n'existent pas, avec des resultats chiffres tout
 *    aussi imaginaires. VideoShowcase la remplace avec de vrais
 *    projets.
 *
 * 3. Les statistiques sont passees en marqueurs STAT_01 a STAT_04.
 *    Les chiffres precedents (+214 %, 47 marques, 12 M€, 4,9/5)
 *    etaient inventes. Remplace-les par tes vrais chiffres quand tu
 *    les auras, et le compteur anime se remettra en route.
 *
 * 4. La section <Testimonials /> est desactivee. Les trois
 *    temoignages signes Claire Aubert, Marc Delvaux et Sofia
 *    Bennani etaient fictifs. Publier de faux temoignages clients
 *    est une pratique commerciale trompeuse. Le code est conserve
 *    plus bas : il suffira de le reactiver avec de vrais retours.
 *
 * 5. L'adresse e-mail des donnees structurees passe de
 *    studio@ultravision.fr (inventee) a contact@ultravisionagency.com.
 *    Le telephone +33600000000 a ete retire plutot qu'invente.
 *
 * DEUX LANGUES, UNE SEULE PAGE : le texte vient de `copy(locale)`, la
 * mise en page est commune. Les routes / et /en affichent ce composant.
 * Le francais est le texte d'origine, inchange.
 */

const ESSAI = PACKS.find((p) => p.id === "essai")!;
const PRODUCTION = PACKS.find((p) => p.id === "production")!;

/** Les balises de la page d'accueil, dans la langue demandee. */
export function homeHead(locale: Locale) {
  const t = copy(locale);
  /*
    LE TITRE DIT QUI, QUOI ET OU.

    Nom complet, categorie et ville : c'est ce trio qui distingue
    UltraVision Agency de la dizaine d'homonymes « UltraVision » dans le
    monde. La recherche « agence marketing digital Marrakech » est
    portee par la page pilier ; l'accueil, lui, porte la marque.

    L'entreprise elle-meme n'est plus decrite ici : la racine l'emet sur
    toutes les pages (src/lib/seo.ts). La page d'accueil declare
    simplement qu'elle parle d'elle (`about`).
  */
  return pageHead({
    locale,
    path: "/",
    /*
      « Creative Growth Agency » ne se tape pas dans Google. Le titre
      garde le trio nom, metier et ville, mais avec les mots que les
      prospects cherchent vraiment : video publicitaire et Ads.
    */
    title: t.title,
    description: t.description,
    ogDescription: t.ogDescription,
    about: orgRef,
    faq: t.faq,
  });
}

/**
 * LES ENTREPRISES ACCOMPAGNÉES.
 *
 * ============================================================
 *  POURQUOI DES LARGEURS ÉCRITES À LA MAIN
 * ============================================================
 *
 * Les quatre logos n'ont pas le même rapport d'image : Centralym fait
 * 5,66:1, Koozina 1:1. Les afficher à hauteur égale — le réflexe — fait
 * paraître Koozina trois fois plus petit que ses voisins, parce que
 * l'œil ne compare pas des hauteurs, il compare des SURFACES.
 *
 * Chaque largeur ci-dessous a donc été calculée pour que les quatre
 * logos occupent la même aire visuelle. Si tu ajoutes un logo, ne
 * reprends pas la hauteur du voisin : vise la même surface.
 *
 * ============================================================
 *  POURQUOI LES FICHIERS SONT DÉJÀ TRAITÉS
 * ============================================================
 *
 * Le fond de cette section est #090909. Centralym et Gatsby étaient
 * fournis en noir pur sur transparent : ils étaient donc parfaitement
 * invisibles. Les fichiers déposés dans public/brand/clients/ sont des
 * versions BLANCHES, traitées en amont — et non des originaux corrigés
 * en CSS par un filtre.
 *
 * C'est volontaire. Un filtre `brightness(0) invert(1)` donne le même
 * résultat à l'écran, mais il se déclenche à chaque peinture et il ne
 * survit pas à un changement de fond : le jour où cette section passe
 * sur clair, les logos disparaissent à nouveau, en silence.
 *
 * Koozina est en SVG et garde ses couleurs : son encre sombre a été
 * éclaircie et son disque crème retiré, ce que seul le vectoriel
 * permettait sans perte.
 *
 * AVANT D'AJOUTER UN LOGO : vérifie-le sur #090909, pas sur blanc.
 */
const CLIENTS: { name: string; logo: string; w: number; h: number }[] = [
  { name: "The Kop Barber", logo: "/brand/clients/the-kop-barber.png", w: 186, h: 65 },
  { name: "Centralym Immobilier", logo: "/brand/clients/centralym.png", w: 262, h: 46 },
  { name: "Gatsby", logo: "/brand/clients/gatsby.png", w: 216, h: 56 },
  { name: "Koozina Garden", logo: "/brand/clients/koozina-garden.svg", w: 104, h: 104 },
  { name: "All In Kech", logo: "/brand/clients/all-in-kech.png", w: 104, h: 104 },
  { name: "Shams Immo", logo: "/brand/clients/shams-immo.png", w: 190, h: 57 },
];

/**
 * NOMBRE DE RÉPÉTITIONS DE LA LISTE — CE CHIFFRE N'EST PAS DÉCORATIF.
 *
 * L'animation `marquee-x` translate la bande de 0 à -50 %. Pour que la
 * boucle soit invisible, la bande doit donc être faite de DEUX MOITIÉS
 * IDENTIQUES : au moment où la translation atteint -50 %, la seconde
 * moitié occupe exactement la place qu'occupait la première, et le
 * retour à zéro ne se voit pas. Ce nombre doit rester PAIR.
 *
 * Il doit aussi être assez grand. Une moitié de bande plus étroite que
 * l'écran laisse apparaître du vide en fin de course — le défaut ne se
 * voit que sur les grands écrans, donc jamais sur celui où l'on
 * développe.
 *
 * Les quatre logos et leurs gouttières font 1088 px. Avec 8 répétitions,
 * une moitié fait 4352 px : la bande reste pleine jusqu'aux écrans
 * ultra-larges. C'est le nombre à AUGMENTER, jamais à baisser, si un
 * logo est retiré de la liste.
 */
const LOOPS = 8;

const WHY = [
  {
    title: "Uniquement des seniors",
    text: "Aucun stagiaire sur votre projet. Les personnes qui vendent sont celles qui exécutent.",
  },
  {
    title: "Design et acquisition réunis",
    text: "La marque et la performance sont construites ensemble, jamais dans deux silos.",
  },
  {
    title: "Engagement sur les indicateurs",
    text: "Nous nous engageons sur des rendez-vous qualifiés, pas sur des impressions.",
  },
  {
    title: "Cadence tenue",
    text: "Livraisons hebdomadaires, un interlocuteur unique, des délais annoncés et respectés.",
  },
];

/**
 * Statistiques — chiffres reels, fournis le 14 aout 2026.
 *
 * L'ORDRE N'EST PAS CELUI QUI A ETE DONNE, ET C'EST VOLONTAIRE
 *
 * Il va du plus verifiable au plus declaratif :
 *
 *   10 000 leads   — sort d'un gestionnaire de publicites
 *   50 K€ de budget — sort d'une facture
 *   +15 marques     — se compte
 *   100 % satisfaits — repose sur la parole de l'agence
 *
 * Un chiffre invérifiable place en premier jette le doute sur les
 * trois suivants. Place en dernier, il est lu comme une conclusion,
 * apres que la credibilite a deja ete etablie.
 *
 * DEUX POINTS A VERIFIER DE TON COTE
 *
 * 1. La devise. J'ai mis des euros, par coherence avec la FAQ qui
 *    annonce des budgets en euros. Si tes campagnes sont pilotees en
 *    dirhams, remplace « 50 K€ » par « 500 K MAD » ou la valeur juste.
 *
 * 2. Le « 100 % de clients satisfaits ». C'est une allegation
 *    commerciale : en cas de contestation, c'est a l'annonceur de la
 *    prouver. Une enquete de satisfaction, meme sur quinze clients,
 *    avec les reponses conservees, suffit. Sans support, la formulation
 *    prudente serait « Aucun client perdu depuis la creation ».
 *
 * Toute valeur commencant par STAT_ s'affiche en grise avec la mention
 * « a completer » : le garde-fou reste en place pour les prochains.
 */
/*
  Rappel en console : les chiffres d'accueil encore en marqueur.

  Ils ne s'affichent plus sur le site — c'est donc ici, et nulle part
  ailleurs, qu'un oubli se signale. Ne pas retirer ce bloc.
*/
const STATS: { value: string; label: string }[] = [
  { value: "10 000", label: "Leads générés chaque mois" },
  { value: "50 K€", label: "Budget publicitaire piloté par mois" },
  { value: "+15", label: "Marques accompagnées" },
];

if (import.meta.env.DEV && typeof window !== "undefined") {
  const enAttente = STATS.filter((s) => s.value.startsWith("STAT_"));
  if (enAttente.length > 0) {
    console.warn(
      `[ULTRA VISION] ${enAttente.length} chiffre(s) d'accueil encore en marqueur : ` +
        enAttente.map((s) => s.label).join(", ") +
        ". Ils sont MASQUES sur la page. Renseigner leur valeur dans STATS, src/pages/Home.tsx.",
    );
  }
}

const FAQ = [
  {
    /*
      LA PREMIERE QUESTION EST CELLE QU'ON POSE A UN ASSISTANT.

      « Qu'est-ce qu'UltraVision Agency ? » La reponse est la phrase de
      definition de src/config/brand.ts, mot pour mot : c'est elle que
      Google, ChatGPT ou Perplexity doivent pouvoir citer telle quelle.
    */
    q: "Qu'est-ce qu'UltraVision Agency ?",
    a: `${BRAND.definition} ${BRAND.summary}`,
  },
  {
    /*
      Cette reponse annoncait 20 000 € de depart et 40 000 a 100 000 €
      par an. C'etait le dernier endroit du site qui contredisait
      encore la grille reelle, laquelle demarre a 490 €.
      Un ecart de ce rapport ne se lit pas comme une erreur : il se lit
      comme un prix qui change selon l'interlocuteur.
    */
    q: "Quel est le budget d'un accompagnement ?",
    a: `Une première vidéo publicitaire coûte ${euro(ESSAI.price)} (environ ${dirham(ESSAI.price)}), diffusion comprise pendant 14 jours. Les accompagnements mensuels démarrent à ${euro(PRODUCTION.price)} par mois (environ ${dirham(PRODUCTION.price)}). ${LAUNCH_OFFER.enabled ? `En première commande, l'offre de lancement ramène ces montants à ${euro(withOffer(ESSAI.price))} et ${euro(withOffer(PRODUCTION.price))}, valable jusqu'au 31 décembre 2026. ` : ""}Le détail complet, prestation par prestation, est publié sur la page tarifs.`,
  },
  {
    q: "Quels sont les délais ?",
    a: "Une vidéo publicitaire est livrée en 7 jours. Une landing page en 5 jours, un site vitrine en 3 semaines. Les premières campagnes sont en ligne dès la validation des vidéos.",
  },
  {
    /*
      La question demandait « pourquoi vos prix sont-ils affiches en
      euros ? » alors que la page tarifs les affiche en dirhams depuis la
      fin aout 2026 — et que la reponse juste au-dessus parle deja de
      5 400 MAD. Une FAQ qui contredit la page qu'elle cite fait douter
      de tout le reste. La reponse suit maintenant src/config/pricing.ts.
    */
    q: "Vos prix sont-ils en dirhams ou en euros ?",
    a: `En euros, hors taxes : l'euro fait foi au devis. Équivalent indicatif en dirhams, au taux commercial de ${MAD.rate} MAD pour 1 €, et le règlement se fait en dirhams.`,
  },
  {
    q: "Comment mesurez-vous les résultats ?",
    a: "Un tableau de bord unique relie dépense média, leads, rendez-vous et chiffre d'affaires signé. Revue mensuelle avec la direction.",
  },
  {
    /*
      Cette reponse citait « Paris, Dubai, Geneve et Casablanca ». Trois
      de ces quatre villes ne correspondaient a aucun client. La reponse
      exacte est plus simple, et plus rassurante pour un prospect
      francais : l'equipe est au Maroc, les clients sont en France, et
      le tournage se deplace.
    */
    q: "Où êtes-vous basés, et pour qui travaillez-vous ?",
    a: "Nous sommes basés à Marrakech et intervenons dans tout le Maroc : Marrakech, Casablanca, Rabat, Tanger et Agadir. Le tournage se déplace dans ces cinq villes sans frais supplémentaires. La grande majorité de nos clients sont des dirigeants francophones installés au Maroc — nous travaillons en français et en anglais, avec les standards de production auxquels ils sont habitués.",
  },
];

/* ==========================================================================
 *  LA VERSION ANGLAISE
 * ========================================================================== */

/*
  Memes arguments, memes chiffres, dans le meme ordre. Les montants sont
  calcules depuis pricing.ts : ils suivent la grille sans retouche.
*/
const WHY_EN = [
  {
    title: "Experienced people only",
    text: "No interns on your project. The people who sell the work are the people who do it.",
  },
  {
    title: "Design and acquisition together",
    text: "Brand and performance are built together, never in two silos.",
  },
  {
    title: "Committed to the metrics",
    text: "We commit to qualified meetings, not impressions.",
  },
  {
    title: "A steady pace",
    text: "Weekly deliveries, a single point of contact, deadlines announced and met.",
  },
];

const STATS_EN: { value: string; label: string }[] = [
  { value: "10,000", label: "Leads generated every month" },
  { value: "€50K", label: "Ad budget managed every month" },
  { value: "15+", label: "Brands supported" },
];

function faqEn() {
  const d = (eur: number) => formatDirham(eur, "en");
  return [
    {
      q: "What is UltraVision Agency?",
      a: `${BRAND.name} is a ${BRAND.category} — in other words, a digital marketing agency — based in ${BRAND.city}, Morocco. It brings together in one team brand, video and photo production, advertising on Meta, Google and TikTok, websites and conversion tools: CRM, artificial intelligence and automation.`,
    },
    {
      q: "How much does working with you cost?",
      a: `A first video ad costs ${formatEuro(ESSAI.price, "en")} (about ${formatDirham(ESSAI.price, "en")}), with 14 days of ads included. Monthly plans start at ${formatEuro(PRODUCTION.price, "en")} a month. ${LAUNCH_OFFER.enabled ? `On a first order, the launch offer brings these to ${formatEuro(withOffer(ESSAI.price), "en")} and ${formatEuro(withOffer(PRODUCTION.price), "en")}, valid until 31 December 2026. ` : ""}The full detail, service by service, is published on our pricing page.`,
    },
    {
      q: "How long does it take?",
      a: "A video ad is delivered in 7 days. A landing page in 5 days, a brochure website in 3 weeks. The first campaigns go live as soon as the videos are approved.",
    },
    {
      q: "Are your prices in dirhams or euros?",
      a: `In euros, excluding taxes: the euro is the binding currency for quotes. Indicative equivalent in dirhams at a commercial rate of ${MAD.rate} MAD to €1, and payment is made in dirhams.`,
    },
    {
      q: "How do you measure results?",
      a: "A single dashboard links media spend, leads, meetings and signed revenue. Monthly review with management.",
    },
    {
      q: "Where are you based, and who do you work for?",
      a: "We are based in Marrakech and work across Morocco: Marrakech, Casablanca, Rabat, Tangier and Agadir. Filming travels to all five cities at no extra cost. Most of our clients are French-speaking business owners who have set up in Morocco — we work in French and English, to the production standards they are used to.",
    },
  ];
}

/** Tout le texte de la page, dans la langue demandee. */
function copy(l: Locale) {
  if (l === "en") {
    return {
      title: `${BRAND.name} — Video ads and ad campaigns in ${BRAND.city}`,
      description:
        "Digital marketing agency in Marrakech: video ads, Meta, Google and TikTok Ads campaigns, websites, CRM and AI. First video delivered in 7 days.",
      ogDescription:
        "We turn your views into sales. Video ads conceived, shot and edited by people in Marrakech, then run and optimised by us.",
      faq: faqEn(),
      why: WHY_EN,
      stats: STATS_EN,
      kicker: `${BRAND.category} — ${BRAND.city}, Morocco`,
      h1: ["Video ads", "that bring", "in sales."],
      intro: [
        "We write, shoot and edit your ads, ",
        "then run them on Meta, TikTok and Google",
        " to bring you customers.",
      ],
      ctaMeeting: "Book a meeting",
      ctaWhatsapp: "Chat on WhatsApp",
      ctaEmail: "Email us",
      priceLine: "First video delivered in 7 days, ads included — ",
      priceFrom: `from ${formatEuro(ESSAI.price, "en")}`,
      locations: CONTACT.locations.replace("Tanger", "Tangier"),
      clients: "Businesses we support",
      whyEyebrow: `Why ${BRAND.short}`,
      whyTitle: "The standards of an in-house team, the speed of a studio.",
      pillarLink: "The agency in Marrakech, in detail",
      resourcesEyebrow: "Resources",
      resourcesTitle: "What to know before launching a campaign.",
      resourcesText:
        "Prices, ad budgets, formats: our answers to the questions we are asked before every project.",
      allArticles: "All articles",
      faqTitle: "Frequently asked questions",
    };
  }
  return {
    title: `${BRAND.name} — Vidéos publicitaires et Ads à ${BRAND.city}`,
    description:
      "Agence de marketing digital à Marrakech : vidéos publicitaires, campagnes Meta, Google et TikTok Ads, sites web, CRM et IA. Première vidéo livrée en 7 jours.",
    ogDescription:
      "Nous transformons vos vues en ventes. Vidéos publicitaires pensées, tournées et montées par des humains à Marrakech, diffusées et optimisées par nos soins.",
    faq: FAQ,
    why: WHY,
    stats: STATS,
    kicker: `${BRAND.category} — ${BRAND.city}, ${BRAND.country}`,
    h1: ["Des vidéos", "publicitaires", "qui font vendre."],
    intro: [
      "Nous écrivons, tournons et montons vos publicités, ",
      "puis nous les diffusons sur Meta, TikTok et Google",
      " pour vous amener des clients.",
    ],
    ctaMeeting: "Prendre rendez-vous",
    ctaWhatsapp: "Parler sur WhatsApp",
    ctaEmail: "Nous écrire",
    priceLine: "Première vidéo livrée en 7 jours, diffusion comprise — ",
    priceFrom: `dès ${euro(ESSAI.price)}`,
    locations: CONTACT.locations,
    clients: "Entreprises accompagnées",
    whyEyebrow: `Pourquoi ${BRAND.short}`,
    whyTitle: "Le niveau d'exigence d'une équipe interne, la vitesse d'un studio.",
    pillarLink: "L'agence à Marrakech, en détail",
    resourcesEyebrow: "Ressources",
    resourcesTitle: "Ce qu'il faut savoir avant de lancer une campagne.",
    resourcesText:
      "Prix, budgets publicitaires, formats : nos réponses aux questions qu'on nous pose avant chaque projet.",
    allArticles: "Tous les articles",
    faqTitle: "Questions fréquentes",
  };
}

type Copy = ReturnType<typeof copy>;

export function HomePage() {
  const locale = useLocale();
  const t = copy(locale);
  const lp = (p: string) => localePath(p, locale);
  return (
    <>
      <Hero t={t} lp={lp} />
      {/* La preuve visuelle arrive des le premier scroll. */}
      <VideoShowcase />
      {/* La seule rupture claire de la page. Elle casse le tunnel noir. */}
      <Conviction />
      <Clients t={t} />
      <Poles />
      <Method />
      <Why t={t} lp={lp} />
      <Stats t={t} />
      {/* <Testimonials /> — réactiver avec de vrais témoignages clients. */}
      <Resources t={t} lp={lp} locale={locale} />
      <Faq t={t} />
      <FinalCTA />
    </>
  );
}

/**
 * Le hero.
 *
 * ============================================================
 *  REFAIT LE 21 SEPTEMBRE 2026 : ON COMPREND EN TROIS SECONDES
 * ============================================================
 *
 * L'ANCIEN TITRE, « Nous concevons des marques et des systemes de
 * croissance qui font la difference », etait elegant et ne disait
 * rien : ni le metier, ni le pays, ni le resultat. Un visiteur devait
 * defiler pour apprendre que l'agence fait des videos. Sur telephone,
 * le premier ecran n'etait que du texte.
 *
 * Trois questions, trois reponses, dans l'ordre ou l'oeil les lit :
 *
 *   Qui ?        la ligne du dessus  — agence, Maroc
 *   Quoi ?       le titre            — des videos publicitaires
 *   Pour quoi ?  la fin du titre     — qui font vendre (en bleu)
 *
 * La preuve suit immediatement, a droite sur ordinateur et sous le
 * titre sur telephone : nos vrais films, qui passent au centre de
 * l'iris (voir HeroReel). Puis le prix et le delai de la premiere
 * video, parce que c'est la premiere question de tout prospect et que
 * nos concurrents ne l'affichent pas.
 *
 * SUR TELEPHONE, L'ORDRE CHANGE : titre, films, puis boutons. Les films
 * doivent entrer dans le premier ecran ; les boutons, eux, restent a
 * portee de pouce juste en dessous.
 */
function Hero({ t, lp }: { t: Copy; lp: (p: string) => string }) {
  const locale = useLocale();
  return (
    <section className="relative overflow-hidden">
      {/* Nappe bleue tres diffuse, a gauche : le texte ne flotte pas dans un vide. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(60% 50% at 12% 38%, rgba(29,78,216,.14), transparent 70%)",
        }}
      />

      <div className="shell relative z-[3] grid w-full items-center gap-x-8 gap-y-5 pt-[11rem] pb-14 sm:gap-y-8 lg:min-h-[92svh] lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:grid-rows-[1fr_auto_auto_1fr] xl:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:pt-40 lg:pb-16">
        <div className="lg:col-start-1 lg:row-start-2">
          {/*
            QUI ET OU, AVANT QUOI.

            « Agence video & acquisition — Maroc » decrivait un metier et un
            pays. La ligne donne desormais la categorie de l'agence et sa
            ville : c'est ce que les moteurs et les visiteurs doivent
            retenir d'abord. Le titre, juste dessous, garde la promesse.

            Tout le hero est en `immediate` : l'animation est la meme, mais
            elle part au premier affichage au lieu d'attendre le JavaScript.
          */}
          <Reveal immediate>
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] uppercase text-accent">
              {t.kicker}
            </p>
          </Reveal>

          {/*
            Trois lignes ecrites a la main : « publicitaires » tient seul
            sur la sienne, et la promesse commerciale — « qui font
            vendre » — occupe la derniere, en bleu. Un seul segment
            colore : deux, et plus rien n'est designe.
          */}
          {/*
            La taille suit la largeur de l'ecran entre 1024 et 1600 px.
            A taille fixe, « publicitaires » demandait 391 px dans une
            colonne de 336 sur un portable de 1024 : le mot etait coupe
            net par le cadre de l'animation du titre.
          */}
          <h1 className="display mt-5 text-[2.5rem] leading-[0.98] tracking-[-0.035em] sm:text-[3.8rem] lg:mt-7 lg:text-[clamp(2.6rem,4.2vw,4.6rem)]">
            <MaskReveal delay={80} immediate>
              {t.h1[0]}
            </MaskReveal>
            <MaskReveal delay={165} immediate>
              {t.h1[1]}
            </MaskReveal>
            <MaskReveal delay={250} immediate>
              <span
                style={{
                  background: "linear-gradient(96deg, #60A5FA 0%, #3B82F6 48%, #1D4ED8 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {t.h1[2]}
              </span>
            </MaskReveal>
          </h1>

          <Reveal delay={380} immediate>
            <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-muted-foreground sm:text-lg lg:mt-8">
              {t.intro[0]}
              <span className="text-foreground">{t.intro[1]}</span>
              {t.intro[2]}
            </p>
          </Reveal>
        </div>

        {/* Les films. Sur telephone, ils s'intercalent entre le titre et les boutons. */}
        <div className="lg:col-start-2 lg:row-span-4 lg:row-start-1">
          <Reveal delay={200} immediate>
            <HeroReel />
          </Reveal>
        </div>

        <div className="lg:col-start-1 lg:row-start-3">
          <Reveal delay={460} immediate>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to={lp("/contact")}
                hash="rendez-vous"
                className="inline-flex h-12 items-center rounded-full bg-foreground px-7 text-xs font-medium tracking-[0.14em] uppercase text-background transition-colors duration-300 hover:bg-accent-hover"
              >
                {t.ctaMeeting}
              </Link>
              {hasWhatsapp ? (
                <a
                  href={whatsappUrl(CONTACT_TEXT[locale].whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center rounded-full border border-hairline px-7 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent-hover"
                >
                  {t.ctaWhatsapp}
                </a>
              ) : (
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex h-12 items-center rounded-full border border-hairline px-7 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent-hover"
                >
                  {t.ctaEmail}
                </a>
              )}
            </div>
          </Reveal>

          {/*
            Le prix et le delai de la premiere video, tout de suite.
            C'est la premiere question de chaque prospect ; y repondre
            avant qu'il la pose, c'est lui eviter un clic — et le plus
            souvent un depart.
          */}
          <Reveal delay={540} immediate>
            <Link
              to={lp("/tarifs")}
              className="group mt-6 inline-flex items-center gap-2.5 text-[0.8rem] text-[#a3a3a0] transition-colors duration-200 hover:text-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" aria-hidden="true" />
              <span>
                {t.priceLine}
                <span className="text-foreground">{t.priceFrom}</span>
              </span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="shell relative z-[3] pb-10">
        <Reveal delay={600} immediate>
          <div className="flex flex-wrap gap-x-10 gap-y-2 border-t border-hairline pt-6 text-[0.68rem] tracking-[0.16em] uppercase text-[#797976]">
            {t.locations.split("—").map((v) => (
              <span key={v.trim()}>{v.trim()}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Clients({ t }: { t: Copy }) {
  /*
    Seule la PREMIÈRE série porte un texte alternatif : les autres sont
    des doublons décoratifs, et un lecteur d'écran qui annoncerait « The
    Kop Barber » huit fois de suite rendrait la section illisible à
    l'oreille.

    Le navigateur ne télécharge qu'une fois chaque fichier : les
    répétitions sont gratuites en réseau, elles ne coûtent que des
    nœuds DOM.
  */
  const strip = Array.from({ length: LOOPS }, () => CLIENTS).flat();

  return (
    <section className="rule overflow-hidden bg-background py-10">
      <div className="shell">
        <p className="eyebrow">{t.clients}</p>
      </div>

      <div className="mt-8 flex overflow-hidden">
        <div
          className="marquee flex shrink-0 items-center gap-16 pr-16"
          style={{ animationDuration: `${LOOP.marquee}s` }}
        >
          {strip.map((c, i) => {
            const first = i < CLIENTS.length;

            /*
              Les PNG ont un jumeau WebP, exporte a l'identique et pose a
              cote du fichier d'origine : 121 Ko de PNG deviennent 75 Ko.
              La transparence est conservee (alpha verifie), ce qui est
              indispensable ici — un logo sur fond opaque apparaitrait
              comme un rectangle clair sur le #090909 de la section.

              Koozina est en SVG et n'a pas de jumeau : un vectoriel est
              deja plus leger et plus net que n'importe quel bitmap.
              D'ou le test sur l'extension plutot qu'une conversion
              systematique du chemin.
            */
            const webp = c.logo.endsWith(".png") ? c.logo.replace(/\.png$/, ".webp") : null;

            return (
              <picture key={`${c.name}-${i}`}>
                {webp && <source srcSet={webp} type="image/webp" />}
                <img
                  src={c.logo}
                  alt={first ? c.name : ""}
                  aria-hidden={first ? undefined : true}
                  width={c.w}
                  height={c.h}
                  loading="lazy"
                  decoding="async"
                  className="shrink-0 opacity-[0.65] transition-opacity duration-300 hover:opacity-100"
                  /*
                    Les dimensions sont posées EN DUR, en attribut et en
                    style. Sans elles, les logos n'occupent aucune place
                    tant qu'ils ne sont pas chargés : la bande naît plate
                    puis se déplie d'un coup, et tout ce qui suit sur la
                    page sursaute.
                  */
                  style={{ width: c.w, height: c.h }}
                />
              </picture>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Poles() {
  return (
    /*
      Le decor de croissance (courbe et plateformes) qui etait pose
      derriere les expertises a ete retire le 21 septembre 2026. Les
      panneaux portent desormais leurs propres images, et le decor ne se
      voyait plus que par fragments, dans l'interstice entre deux
      panneaux. Le panneau Acquisition montre la meme chose, avec une
      vraie publicite et ses vrais chiffres.
    */
    <section className="rule relative overflow-hidden bg-surface">
      <div className="shell relative py-24 lg:py-32">
        <ExpertiseList />
      </div>
    </section>
  );
}

function Method() {
  return (
    <section className="rule bg-background">
      <div className="shell py-24 lg:py-32">
        <MethodRail />
      </div>
    </section>
  );
}

function Why({ t, lp }: { t: Copy; lp: (p: string) => string }) {
  return (
    <section className="rule bg-surface">
      <div className="shell grid gap-16 py-24 lg:grid-cols-[1fr_1.2fr] lg:py-32">
        <Reveal>
          <div>
            <p className="eyebrow">{t.whyEyebrow}</p>
            <h2 className="display mt-6 text-4xl sm:text-5xl">{t.whyTitle}</h2>
            {/*
              Le lien vers la page pilier. C'est elle qui repond a la
              question « qu'est-ce que cette agence, et que fait-elle a
              Marrakech ? » ; l'accueil doit y mener directement.
            */}
            <div className="mt-8">
              <ArrowLink to={lp("/agence-marketing-digital-marrakech")}>{t.pillarLink}</ArrowLink>
            </div>
          </div>
        </Reveal>
        {/*
          Surlignage au survol.

          Un bloc bleu profond glisse derriere l'argument survole. Ca
          transforme une liste passive en quelque chose qu'on parcourt,
          et ca ramene du bleu dans une section qui n'en avait aucun.

          Le bleu utilise est #1D4ED8, l'accent sombre de la charte :
          assez soutenu pour porter du texte blanc, assez sobre pour ne
          pas transformer la section en aplat colore.
        */}
        <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
          {t.why.map((w, i) => (
            <Reveal key={w.title} delay={i * 70}>
              {/* Survol : 220 ms. Le bloc bleu doit etre la avant que la
                  main n'ait fini son geste, sinon il donne l'impression
                  de courir apres le curseur. */}
              <div
                tabIndex={0}
                aria-label={`${w.title} — ${w.text}`}
                className="group h-full rounded-2xl border border-transparent px-5 py-6 outline-none hover:border-[#1D4ED8] hover:bg-[#1D4ED8] focus-visible:border-[#1D4ED8] focus-visible:bg-[#1D4ED8]"
                style={{
                  borderTopColor: "#262626",
                  transition: `background-color ${MOTION.respond}ms ${EASE_RESPOND}, border-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                }}
              >
                <h3
                  className="text-base font-medium group-hover:text-white group-focus-visible:text-white"
                  style={{ transition: `color ${MOTION.respond}ms ${EASE_RESPOND}` }}
                >
                  {w.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-[#D6E4FF] group-focus-visible:text-[#D6E4FF]"
                  style={{ transition: `color ${MOTION.respond}ms ${EASE_RESPOND}` }}
                >
                  {w.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats({ t }: { t: Copy }) {
  return (
    <section className="rule bg-background">
      <div className="shell py-24 lg:py-28">
        {/*
          Les chiffres encore marques STAT_ sont RETIRES, pas grises.

          Meme regle que pour les realisations : on ne montre pas un
          emplacement en attente a un visiteur. Un « STAT_01 — a
          completer » sur la page d'accueil se lit comme un site
          inacheve, ce qui coute plus cher que le chiffre manquant ne
          rapporte.

          Le rappel a bascule en console (voir plus bas) : c'est
          desormais le seul endroit ou un oubli se voit.
        */}
        <div className="grid gap-12 sm:grid-cols-3">
          {t.stats
            .filter((s) => !s.value.startsWith("STAT_"))
            .map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div>
                  <p className="display text-5xl lg:text-6xl">{s.value}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{s.label}</p>
                </div>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}

/**
 * LES ARTICLES, DEPUIS L'ACCUEIL.
 *
 * L'accueil est la page qui recoit le plus de liens : ce qu'elle cite,
 * Google le visite en premier et le juge plus important. Sans cette
 * section, les articles n'etaient relies qu'au blog et au menu.
 */
function Resources({ t, lp, locale }: { t: Copy; lp: (p: string) => string; locale: Locale }) {
  /* En anglais, seuls les articles traduits existent : sans article, pas de section. */
  const articles = articlesFor(locale).slice(0, 3);
  if (articles.length === 0) return null;
  return (
    <Section surface labelledBy="ressources-titre">
      <SectionIntro
        id="ressources-titre"
        eyebrow={t.resourcesEyebrow}
        title={t.resourcesTitle}
        text={t.resourcesText}
      />
      <LinkCards
        items={articles.map((a) => ({
          to: lp(`/blog/${a.slug}`),
          eyebrow: a.category,
          title: a.title,
          text: a.excerpt,
        }))}
      />
      <div className="mt-10">
        <ArrowLink to={lp("/blog")}>{t.allArticles}</ArrowLink>
      </div>
    </Section>
  );
}

function Faq({ t }: { t: Copy }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="rule bg-background">
      <div className="shell grid gap-14 py-24 lg:grid-cols-[1fr_1.4fr] lg:py-32">
        <Reveal>
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="display mt-6 text-4xl sm:text-5xl">{t.faqTitle}</h2>
          </div>
        </Reveal>
        <div className="border-t border-hairline">
          {t.faq.map((f, i) => (
            <div key={f.q} className="border-b border-hairline">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className="text-base font-medium group-hover:text-accent-hover sm:text-lg"
                  style={{ transition: `color ${MOTION.respond}ms ${EASE_RESPOND}` }}
                >
                  {f.q}
                </span>
                {/* La croix pivote et passe au bleu : le seul point de
                    couleur de la section, et il indique l'etat ouvert. */}
                <span
                  className={`shrink-0 text-lg group-hover:text-accent-hover ${
                    open === i ? "rotate-45 text-accent" : "text-muted-foreground"
                  }`}
                  style={{
                    transition: `transform ${MOTION.faq}ms ${EASE_RESPOND}, color ${MOTION.respond}ms ${EASE_RESPOND}`,
                  }}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden ${open === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
                style={{
                  transition: `max-height ${MOTION.faq}ms ${EASE_RESPOND}, opacity ${MOTION.faq}ms ${EASE_RESPOND}`,
                }}
              >
                <p className="pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
