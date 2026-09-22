import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL } from "@/config/site";
import { MaskReveal, Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { Conviction } from "@/components/Conviction";
import { HeroReel } from "@/components/HeroReel";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { LOOP, MOTION, EASE_RESPOND } from "@/config/motion";
import { ExpertiseList } from "@/components/ExpertiseList";
import { MethodRail } from "@/components/MethodRail";
import { VideoShowcase } from "@/components/work/VideoShowcase";
import { AREA_SERVED, CONTACT, hasWhatsapp, whatsappUrl } from "@/config/contact";
import { MAD } from "@/config/pricing";
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
 */

/*
  L'adresse vient desormais de src/config/site.ts.
  Le jour du basculement vers ultravisionagency.com, une seule ligne
  change la-bas et les dix pages suivent — y compris toutes les
  adresses canoniques et toutes les donnees structurees.
*/
const URL = SITE_URL;

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      /*
        Le titre et la description annoncaient « branding, sites web et
        applications, intelligence artificielle, automatisation ». C'est
        l'ancien positionnement, et il n'a plus rien a voir avec ce que
        la page raconte : production de videos publicitaires et
        acquisition.

        C'est le texte que Google affiche dans ses resultats. Un visiteur
        qui clique sur « branding et applications » et tombe sur des
        videos publicitaires repart aussitot — et ce depart compte comme
        un signal negatif.
      */
      { title: "ULTRA VISION — Vidéos publicitaires & acquisition" },
      {
        name: "description",
        content:
          "Production de vidéos publicitaires et pilotage de vos campagnes Meta, Google et TikTok. Première vidéo livrée en 7 jours, diffusion comprise, à partir de 5 400 MAD.",
      },
      { property: "og:title", content: "ULTRA VISION — Vidéos publicitaires & acquisition" },
      {
        property: "og:description",
        content:
          "Nous transformons vos vues en ventes. Vidéos publicitaires pensées, tournées et montées par des humains, diffusées et optimisées par nos soins.",
      },
      { property: "og:url", content: `${URL}/` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "ULTRA VISION",
          description:
            "Agence de production de vidéos publicitaires et d'acquisition. Écriture, tournage, montage et diffusion sur Meta, Google et TikTok.",
          url: URL,
          email: CONTACT.email,
          /*
            L'ADRESSE ANNONCAIT « Paris, FR ». C'ETAIT FAUX.

            C'est le dernier mensonge du site, et le plus discret : il
            n'apparaissait nulle part a l'ecran, uniquement dans les
            donnees que Google lit. Google s'en sert pourtant pour
            decider dans quelles recherches locales faire apparaitre
            l'entreprise.

            La zone d'intervention vient maintenant de
            src/config/contact.ts : le Maroc et les cinq villes. Elle
            est identique sur toutes les pages du site — declarer une
            zone differente d'une page a l'autre est l'erreur la plus
            couteuse en referencement local, parce que Google cesse
            alors de situer l'entreprise et ne l'affiche plus nulle part.
          */
          areaServed: AREA_SERVED,
          address: { "@type": "PostalAddress", addressCountry: CONTACT.country },
          knowsLanguage: ["fr", "ar", "en"],
        }),
      },
    ],
  }),
});

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
  { value: "100 %", label: "Clients satisfaits" },
];

if (typeof window !== "undefined") {
  const enAttente = STATS.filter((s) => s.value.startsWith("STAT_"));
  if (enAttente.length > 0) {
    console.warn(
      `[ULTRA VISION] ${enAttente.length} chiffre(s) d'accueil encore en marqueur : ` +
        enAttente.map((s) => s.label).join(", ") +
        ". Ils sont MASQUES sur la page. Renseigner leur valeur dans STATS, src/routes/index.tsx.",
    );
  }
}

const FAQ = [
  {
    /*
      Cette reponse annoncait 20 000 € de depart et 40 000 a 100 000 €
      par an. C'etait le dernier endroit du site qui contredisait
      encore la grille reelle, laquelle demarre a 490 €.
      Un ecart de ce rapport ne se lit pas comme une erreur : il se lit
      comme un prix qui change selon l'interlocuteur.
    */
    q: "Quel est le budget d'un accompagnement ?",
    a: "Une première vidéo publicitaire est à 5 400 MAD, diffusion comprise pendant 14 jours. Les accompagnements mensuels démarrent à 16 400 MAD par mois. Le détail complet, prestation par prestation, est publié sur la page tarifs.",
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
    a: `En dirhams, convertis au taux commercial de ${MAD.rate} MAD pour 1 €. Le devis est établi en euros, qui font foi, et le règlement se fait en dirhams.`,
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
    q: "Où intervenez-vous, et pour qui ?",
    a: "Uniquement au Maroc : Casablanca, Rabat, Marrakech, Tanger et Agadir. Le tournage se déplace dans ces cinq villes sans frais supplémentaires. La grande majorité de nos clients sont des dirigeants francophones installés au Maroc — nous travaillons en français, avec les standards de production auxquels ils sont habitués.",
  },
];

function Home() {
  return (
    <>
      <Hero />
      {/* La preuve visuelle arrive des le premier scroll. */}
      <VideoShowcase />
      {/* La seule rupture claire de la page. Elle casse le tunnel noir. */}
      <Conviction />
      <Clients />
      <Poles />
      <Method />
      <Why />
      <Stats />
      {/* <Testimonials /> — réactiver avec de vrais témoignages clients. */}
      <Faq />
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
function Hero() {
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

      <div className="shell relative z-[3] grid w-full items-center gap-x-8 gap-y-5 pt-[11rem] pb-14 sm:gap-y-8 lg:min-h-[92svh] lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:grid-rows-[1fr_auto_auto_1fr] lg:pt-40 lg:pb-16">
        <div className="lg:col-start-1 lg:row-start-2">
          <Reveal>
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] uppercase text-accent">
              Agence vidéo &amp; acquisition — Maroc
            </p>
          </Reveal>

          {/*
            Trois lignes ecrites a la main : « publicitaires » tient seul
            sur la sienne, et la promesse commerciale — « qui font
            vendre » — occupe la derniere, en bleu. Un seul segment
            colore : deux, et plus rien n'est designe.
          */}
          <h1 className="display mt-5 text-[2.5rem] leading-[0.98] tracking-[-0.035em] sm:text-[3.8rem] lg:mt-7 lg:text-[4.6rem]">
            <MaskReveal delay={80}>Des vidéos</MaskReveal>
            <MaskReveal delay={165}>publicitaires</MaskReveal>
            <MaskReveal delay={250}>
              <span
                style={{
                  background: "linear-gradient(96deg, #60A5FA 0%, #3B82F6 48%, #1D4ED8 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                qui font vendre.
              </span>
            </MaskReveal>
          </h1>

          <Reveal delay={380}>
            <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-muted-foreground sm:text-lg lg:mt-8">
              Nous écrivons, tournons et montons vos publicités,{" "}
              <span className="text-foreground">
                puis nous les diffusons sur Meta, TikTok et Google
              </span>{" "}
              pour vous amener des clients.
            </p>
          </Reveal>
        </div>

        {/* Les films. Sur telephone, ils s'intercalent entre le titre et les boutons. */}
        <div className="lg:col-start-2 lg:row-span-4 lg:row-start-1">
          <Reveal delay={200}>
            <HeroReel />
          </Reveal>
        </div>

        <div className="lg:col-start-1 lg:row-start-3">
          <Reveal delay={460}>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center rounded-full bg-foreground px-7 text-xs font-medium tracking-[0.14em] uppercase text-background transition-colors duration-300 hover:bg-accent-hover"
              >
                Prendre rendez-vous
              </Link>
              {hasWhatsapp ? (
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center rounded-full border border-hairline px-7 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent-hover"
                >
                  Parler sur WhatsApp
                </a>
              ) : (
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex h-12 items-center rounded-full border border-hairline px-7 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent-hover"
                >
                  Nous écrire
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
          <Reveal delay={540}>
            <Link
              to="/tarifs"
              className="group mt-6 inline-flex items-center gap-2.5 text-[0.8rem] text-[#a3a3a0] transition-colors duration-200 hover:text-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" aria-hidden="true" />
              <span>
                Première vidéo livrée en 7 jours, diffusion comprise —{" "}
                <span className="text-foreground">dès 5 400 MAD</span>
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
        <Reveal delay={600}>
          <div className="flex flex-wrap gap-x-10 gap-y-2 border-t border-hairline pt-6 text-[0.68rem] tracking-[0.16em] uppercase text-[#797976]">
            {CONTACT.locations.split("—").map((v) => (
              <span key={v.trim()}>{v.trim()}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Clients() {
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
        <p className="eyebrow">Entreprises accompagnées</p>
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

function Why() {
  return (
    <section className="rule bg-surface">
      <div className="shell grid gap-16 py-24 lg:grid-cols-[1fr_1.2fr] lg:py-32">
        <Reveal>
          <div>
            <p className="eyebrow">Pourquoi ULTRA VISION</p>
            <h2 className="display mt-6 text-4xl sm:text-5xl">
              Le niveau d&apos;exigence d&apos;une équipe interne, la vitesse d&apos;un studio.
            </h2>
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
          {WHY.map((w, i) => (
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

function Stats() {
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
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.filter((s) => !s.value.startsWith("STAT_")).map((s, i) => (
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

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="rule bg-background">
      <div className="shell grid gap-14 py-24 lg:grid-cols-[1fr_1.4fr] lg:py-32">
        <Reveal>
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="display mt-6 text-4xl sm:text-5xl">Questions fréquentes</h2>
          </div>
        </Reveal>
        <div className="border-t border-hairline">
          {FAQ.map((f, i) => (
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
                  style={{ transition: `transform ${MOTION.faq}ms ${EASE_RESPOND}, color ${MOTION.respond}ms ${EASE_RESPOND}` }}
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
