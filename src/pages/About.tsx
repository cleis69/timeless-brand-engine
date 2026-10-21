import { url } from "@/config/site";
import { BRAND, withBrand } from "@/config/brand";
import { orgRef, pageHead } from "@/lib/seo";
import { ArrowLink } from "@/components/page/Blocks";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { TeamCard, type Member } from "@/components/TeamAvatar";
import { CONTACT } from "@/config/contact";
import { localePath, useLocale, type Locale } from "@/lib/i18n";
import { EASE_RESPOND, MOTION } from "@/config/motion";

/**
 * ULTRA VISION — page À propos.
 *
 * ============================================================
 *  CE FICHIER REMPLACE src/routes/a-propos.tsx
 * ============================================================
 *
 * CE QUI A ETE SUPPRIME, ET POURQUOI
 *
 * L'ancienne version annoncait « dix-huit specialistes » repartis en
 * six poles chiffres — 3 directeurs artistiques, 4 developpeurs, etc.
 * Ces nombres etaient inventes. Sur une page « A propos », c'est le
 * mensonge le plus facile a verifier : il suffit d'un appel ou d'un
 * coup d'oeil a LinkedIn.
 *
 * Elle annoncait aussi des bureaux a « Paris — Dubai — Casablanca ».
 * Deux de ces trois villes n'existent pas dans l'entreprise.
 *
 * CE QUI LES REMPLACE
 *
 * Quatre personnes reelles, nommees, avec leur parcours. Une equipe de
 * quatre dont on peut citer les noms vaut infiniment mieux qu'une
 * equipe de dix-huit anonymes — parce qu'elle est verifiable, et parce
 * qu'un client achete des personnes, pas un organigramme.
 *
 * ------------------------------------------------------------
 *  DEUX CHOSES A COMPLETER DE TON COTE
 *
 *  1. LE PRENOM DE LA COMMUNITY MANAGER. Il n'a pas ete communique.
 *     Le champ contient « Prenom » et un avertissement s'affiche dans
 *     la console du navigateur tant qu'il n'est pas rempli.
 *
 *  2. LES PHOTOS. Depose-les dans public/brand/team/ puis renseigne le
 *     champ `photo` de chaque membre, par exemple '/brand/team/cleis.jpg'.
 *     Format conseille : 640 x 800 px, cadrage vertical.
 *     Tant que le champ est vide, l'avatar dessine prend le relais —
 *     et si un nom de fichier est faux, l'avatar revient tout seul.
 * ------------------------------------------------------------
 *
 * DEUX LANGUES, UNE SEULE PAGE : le texte vient de `copy(locale)`, la
 * mise en page est commune. Les routes /a-propos et /en/about affichent
 * ce composant. Le francais est le texte d'origine, inchange.
 */

const PATH = "/a-propos";

/* ==========================================================================
 *  L'EQUIPE
 * ========================================================================== */

/** Marqueur du prenom manquant. Ne pas renommer : il sert au controle. */
const NAME_TODO = "Prénom";

const TEAM_ALL: Member[] = [
  {
    name: "Cleis",
    role: "Fondateur",
    bio: "Dix ans à la tête d'un studio de production audiovisuelle en France. Formé en école de commerce, autodidacte pour le reste. C'est lui qui prend le brief, et c'est lui qui reste sur le projet.",
    facts: ["Business school", "Autodidacte", "10 ans de studio en France"],
    /*
      Le fichier est deja cadre en 4/5 sur le buste, exactement le
      format du cadre. Aucun `objectPosition` n'est donc necessaire :
      recadrer une seconde fois en CSS ne ferait que rogner un cadrage
      deja choisi.

      Le plan large d'origine — la personne en pied dans un patio — a
      ete resserre a la prise de vue plutot qu'en CSS : dans une carte
      de 330 px, un plan en pied reduit le visage a une trentaine de
      pixels, et une fiche d'equipe ou l'on ne distingue pas le visage
      ne sert a rien.
    */
    photo: "/brand/team/cleis.jpg",
  },
  {
    name: "Julien",
    role: "Directeur artistique",
    bio: "Photographe et vidéaste depuis plus de dix ans, architecte d'intérieur de formation. Ce double regard explique la façon dont il compose un cadre : il pense l'espace avant de penser l'image.",
    facts: ["Photo & vidéo", "Architecte d'intérieur", "10 ans d'expérience"],
    // photo: '/brand/team/julien.jpg',
  },
  {
    name: NAME_TODO,
    role: "Community manager",
    bio: "Elle tient la ligne éditoriale et la présence quotidienne sur les réseaux : ce qui se publie, quand, et sur quel ton. C'est le lien entre les campagnes payantes et ce que la marque raconte le reste du temps.",
    facts: ["Ligne éditoriale", "Réseaux sociaux", "Community management"],
  },
  {
    name: "Selim",
    role: "Media buyer",
    bio: "Il pilote la diffusion sur Meta, Google et TikTok : structure des campagnes, arbitrage des budgets, coût par résultat. C'est lui qui transforme une bonne vidéo en rendez-vous qualifiés.",
    facts: ["Meta Ads", "Google Ads", "TikTok Ads"],
  },
];

/*
  ============================================================
   UNE FICHE SANS NOM N'EST PAS PUBLIEE.
  ============================================================

  Le site affichait « Prenom » en gros, en tete d'une fiche, a cote de
  trois collegues nommes. Sur une page dont l'argument est « une equipe
  restreinte, et vous savez qui fait quoi », c'est le seul endroit du
  site ou une negligence se voit immediatement — et elle contredit
  exactement la phrase qu'elle accompagne.

  La fiche est donc retiree de l'affichage ET des donnees structurees
  tant que le prenom manque. Trois personnes nommees valent mieux que
  quatre dont une s'appelle « Prenom ».

  Elle revient toute seule des que le prenom est ecrit ci-dessus : il
  n'y a rien d'autre a faire que remplacer NAME_TODO par le prenom.
*/
export const TEAM: Member[] = TEAM_ALL.filter((m) => m.name !== NAME_TODO);

/*
  Le nombre de colonnes suit le nombre de fiches REELLEMENT publiees.

  Avec la fiche sans prenom retiree, la grille figee a quatre colonnes
  laissait une case vide au bout de la rangee : trois personnes alignees
  a gauche et un trou a droite, ce qui se lit comme un oubli plutot que
  comme une equipe de trois.

  Les classes sont ecrites en entier et non composees a la volee :
  Tailwind lit le code source pour decider des classes qu'il genere, et
  une classe assemblee par concatenation n'existerait pas dans la
  feuille de style finale.
*/
const TEAM_COLS =
  TEAM.length >= 4 ? "lg:grid-cols-4" : TEAM.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";

if (
  import.meta.env.DEV &&
  typeof window !== "undefined" &&
  TEAM_ALL.some((m) => m.name === NAME_TODO)
) {
  console.warn(
    "[ULTRA VISION] Le prénom de la community manager n'est pas renseigné : " +
      "sa fiche n'est PAS affichée sur le site. " +
      "À compléter dans src/pages/About.tsx, tableau TEAM_ALL.",
  );
}

/*
  L'EQUIPE EST DECLAREE AVANT LA ROUTE.

  Elle sert maintenant deux fois : a l'affichage, et dans les
  donnees structurees generees par `head()`. Une constante lue par
  une fonction ecrite cent lignes plus haut est exactement le genre
  de dependance qu'on casse sans s'en apercevoir en reorganisant
  un fichier.
*/
export function aboutHead(locale: Locale) {
  const t = copy(locale);
  return pageHead({
    locale,
    path: PATH,
    title: t.title,
    description: t.description,
    ogDescription: t.ogDescription,
    pageType: "AboutPage",
    about: orgRef,
    mainEntity: orgRef,
    breadcrumbs: [{ name: t.name, path: PATH }],
    /*
      L'EQUIPE, NOMMEE.

      Declarer les personnes relie l'agence a des individus reels : c'est
      ce qu'evalue Google quand il juge la fiabilite d'une source, et ce
      qu'un assistant cite quand on lui demande qui dirige l'agence.
      Uniquement les prenoms et les fonctions — jamais de coordonnees
      personnelles. La fiche sans prenom n'est pas declaree.

      L'identifiant (@id) reste celui de l'adresse francaise dans les deux
      langues : c'est la meme personne, pas une seconde fiche.
    */
    nodes: teamFor(locale).map((m) => ({
      "@type": "Person",
      "@id": `${url(PATH)}#${m.name.toLowerCase()}`,
      name: m.name,
      jobTitle: m.role,
      url: url(localePath(PATH, locale)),
      worksFor: orgRef,
    })),
  });
}

/* ==========================================================================
 *  VALEURS
 * ========================================================================== */

const VALUES = [
  {
    t: "Ceux qui vendent exécutent",
    d: "Vous parlez aux personnes qui travailleront sur votre projet. Il n'y a pas de seconde équipe derrière la première.",
  },
  {
    t: "Des humains, outillés",
    d: "L'intelligence artificielle nous fait gagner du temps sur la préparation et le montage. Elle n'écrit pas nos angles et ne tient pas la caméra.",
  },
  {
    t: "Des périmètres écrits",
    d: "Ce qui est compris, ce qui ne l'est pas, et le prix. Tout figure au devis, avant de commencer.",
  },
  {
    t: "Peu de clients à la fois",
    d: "Une équipe restreinte ne peut pas tout prendre. Nous préférons refuser une mission que la livrer à moitié.",
  },
];

/* ==========================================================================
 *  LA VERSION ANGLAISE
 * ========================================================================== */

/*
  Les fiches en anglais. La cle est la fonction FRANCAISE, qui ne change
  pas quand un prenom est renseigne : la fiche de la community manager
  retrouve donc sa traduction toute seule le jour ou elle est publiee.
*/
const TEAM_EN: Record<string, Pick<Member, "role" | "bio" | "facts">> = {
  Fondateur: {
    role: "Founder",
    bio: "Ten years running an audiovisual production studio in France. Business-school trained, self-taught for the rest. He takes the brief, and he stays on the project.",
    facts: ["Business school", "Self-taught", "10 years running a studio in France"],
  },
  "Directeur artistique": {
    role: "Art director",
    bio: "A photographer and videographer for more than ten years, trained as an interior architect. That double eye explains how he composes a frame: he thinks about the space before he thinks about the image.",
    facts: ["Photo & video", "Interior architect", "10 years' experience"],
  },
  "Community manager": {
    role: "Community manager",
    bio: "She looks after the editorial line and the day-to-day presence on social media: what gets published, when, and in what tone. She is the link between the paid campaigns and what the brand says the rest of the time.",
    facts: ["Editorial line", "Social media", "Community management"],
  },
  "Media buyer": {
    role: "Media buyer",
    bio: "He runs the ads on Meta, Google and TikTok: campaign structure, budget allocation, cost per result. He is the one who turns a good video into qualified meetings.",
    facts: ["Meta Ads", "Google Ads", "TikTok Ads"],
  },
};

/** L'equipe publiee, dans la langue de la page. */
const teamFor = (l: Locale): Member[] =>
  l === "en" ? TEAM.map((m) => ({ ...m, ...TEAM_EN[m.role] })) : TEAM;

const VALUES_EN = [
  {
    t: "Those who sell, deliver",
    d: "You talk to the people who will work on your project. There is no second team behind the first.",
  },
  {
    t: "People, well equipped",
    d: "Artificial intelligence saves us time on preparation and editing. It does not write our angles and it does not hold the camera.",
  },
  {
    t: "Scope in writing",
    d: "What is included, what isn't, and the price. It is all in the quote, before we start.",
  },
  {
    t: "Few clients at a time",
    d: "A small team cannot take everything on. We would rather turn down a project than deliver half of it.",
  },
];

/** Tout le texte de la page, dans la langue demandee. */
function copy(l: Locale) {
  if (l === "en") {
    return {
      name: "About",
      title: withBrand(`About us: the team, in ${BRAND.city}`),
      description: `${BRAND.name}, a ${BRAND.category} based in Marrakech: a small team of seniors — audiovisual production, art direction, content and media buying.`,
      ogDescription:
        "Four specialists, named. The people who sell you the project are the people who deliver it.",
      h1: "A small team, and you know who does what.",
      accent: "and you know who does what",
      /*
        « Nous travaillons en francais et en anglais » : confirme par
        l'agence (BRAND.workingLanguage). C'est la premiere question d'un
        visiteur qui lit la version anglaise.
      */
      intro: `${BRAND.name} is a ${BRAND.category} based in Marrakech. We produce advertising content, run its distribution and build the tools that turn attention into customers — in Marrakech, Casablanca, Rabat, Tangier and Agadir, for French-speaking business owners who have set up in Morocco. We work in French and English.`,
      values: VALUES_EN,
      stanceEyebrow: "Our stance",
      stanceTitle: "A beautiful video that sells nothing is still an expense.",
      stance: [
        "Most businesses don't have a creativity problem. They have a chain problem: beautiful images on one side, campaigns on the other, and nobody to connect the two.",
        "We produce and we run the ads. It is the same team, so the same goal — and nobody to pass the blame to when results don't come.",
      ],
      teamEyebrow: "The team",
      teamTitleFull: "Four people. You will get to know all of them.",
      teamTitle: "The people who will work on your project.",
      teamText:
        "We don't claim to be a large organisation. That is precisely the point: there is nobody between you and the people who produce the work.",
      base: "Based in Marrakech, the agency also works in Casablanca, Rabat, Tangier and Agadir.",
      pillarLink: "The agency in Marrakech, in detail",
    };
  }
  return {
    name: "À propos",
    title: withBrand(`À propos : l'équipe, à ${BRAND.city}`),
    description: `${BRAND.name}, ${BRAND.category} basée à Marrakech : une équipe restreinte de seniors — production audiovisuelle, direction artistique, contenu et media buying.`,
    ogDescription:
      "Quatre spécialistes, nommés. Ceux qui vous vendent le projet sont ceux qui l'exécutent.",
    h1: "Une équipe restreinte, et vous savez qui fait quoi.",
    accent: "et vous savez qui fait quoi",
    intro: `${BRAND.name} est une ${BRAND.category} basée à Marrakech. Nous produisons des contenus publicitaires, pilotons leur diffusion et construisons les outils qui transforment l'attention en clients — à Marrakech, Casablanca, Rabat, Tanger et Agadir, auprès de dirigeants francophones qui ont installé leur activité au Maroc.`,
    values: VALUES,
    stanceEyebrow: "Notre parti pris",
    stanceTitle: "Une belle vidéo qui ne vend rien reste une dépense.",
    stance: [
      "La plupart des entreprises n'ont pas un problème de créativité. Elles ont un problème de chaîne : de belles images d'un côté, des campagnes de l'autre, et personne pour relier les deux.",
      "Nous produisons et nous diffusons. C'est la même équipe, donc le même objectif — et personne à qui renvoyer la responsabilité quand les résultats ne viennent pas.",
    ],
    teamEyebrow: "L'équipe",
    teamTitleFull: "Quatre personnes. Vous les connaîtrez toutes.",
    teamTitle: "Les personnes qui travailleront sur votre projet.",
    teamText:
      "Nous ne prétendons pas être une grande structure. C'est précisément l'intérêt : il n'y a personne entre vous et ceux qui produisent.",
    base: CONTACT.base,
    pillarLink: "L'agence à Marrakech, en détail",
  };
}

/* ==========================================================================
 *  LA PAGE
 * ========================================================================== */

export function AboutPage() {
  const locale = useLocale();
  const t = copy(locale);
  const lp = (p: string) => localePath(p, locale);
  const team = teamFor(locale);
  return (
    <>
      <PageHero
        eyebrow={t.name}
        title={t.h1}
        accent={t.accent}
        intro={t.intro}
        breadcrumbs={[{ name: t.name, path: lp(PATH) }]}
      />

      {/* ---------------- Parti pris ---------------- */}
      <section className="rule bg-background">
        <div className="shell grid gap-14 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <Reveal>
            <div>
              <p className="eyebrow">{t.stanceEyebrow}</p>
              <h2 className="display mt-5 text-3xl sm:text-4xl">{t.stanceTitle}</h2>
              <p className="mt-7 text-base leading-relaxed text-muted-foreground">{t.stance[0]}</p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t.stance[1]}</p>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {t.values.map((v, i) => (
              <Reveal key={v.t} delay={i * MOTION.stagger} className="h-full">
                <div
                  tabIndex={0}
                  aria-label={`${v.t} — ${v.d}`}
                  className="group h-full rounded-2xl p-5 outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{
                    backgroundColor: "#0B1020",
                    border: "1px solid #16203a",
                    transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}, background-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                  }}
                >
                  <h3 className="text-[0.95rem] font-medium transition-colors duration-200 group-hover:text-[#93C5FD]">
                    {v.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#8792ad]">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- L'equipe ---------------- */}
      <section className="rule relative overflow-hidden bg-surface">
        {/* Contre-jour bleu, le meme dispositif que le ruban des realisations. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 46% at 50% 42%, rgba(59,130,246,.16) 0%, transparent 70%)",
          }}
        />

        <div className="shell relative py-20 lg:py-28">
          <Reveal>
            <p className="eyebrow" style={{ color: "#60A5FA" }}>
              {t.teamEyebrow}
            </p>
            {/*
              Le titre suit le nombre de fiches REELLEMENT publiees. Tant que
              le prenom de la community manager manque, trois fiches
              s'affichent : annoncer « quatre personnes » au-dessus de trois
              visages se lit comme un oubli.
            */}
            <h2 className="display mt-5 max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
              {TEAM.length === TEAM_ALL.length ? t.teamTitleFull : t.teamTitle}
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {t.teamText}
            </p>
          </Reveal>

          {/*
            Le nombre de colonnes suit le nombre de fiches REELLEMENT
            publiees, il n'est pas fige a quatre.

            Avec la fiche sans prenom retiree, une grille de quatre
            colonnes laissait une case vide au bout de la rangee : trois
            personnes alignees a gauche et un trou a droite, ce qui se
            lit comme un oubli plutot que comme une equipe de trois.
          */}
          <div className={`mt-12 grid gap-4 sm:grid-cols-2 ${TEAM_COLS}`}>
            {team.map((m, i) => (
              <Reveal key={m.role} delay={i * MOTION.stagger} className="h-full">
                <TeamCard member={m} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-12 text-sm text-muted-foreground">{t.base}</p>
            <div className="mt-8">
              <ArrowLink to={lp("/agence-marketing-digital-marrakech")}>{t.pillarLink}</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
