import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { SITE_URL } from "@/config/site";
import { graphOf, orgRef, websiteRef } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CONTACT, hasWhatsapp, whatsappUrl } from "@/config/contact";
import { EASE_RESPOND, MOTION } from "@/config/motion";
import { FORM } from "@/config/forms";
import { TalentBoard } from "@/components/casting/TalentBoard";
import { categoryLabelFor } from "@/components/casting/TalentSheet";
import { TALENTS, findTalent } from "@/content/talents";
import {
  CASTING,
  EXPERIENCE,
  LANGUAGES,
  PROFILES,
  castingLabel,
  castingMessage,
  castingReady,
  photoAccepted,
  preparePhoto,
  sendCasting,
  type CastingResult,
} from "@/config/casting";
import { LANG_TAG, OG_LOCALE, localePath, useLocale, type Locale } from "@/lib/i18n";

/**
 * ULTRA VISION — page Casting.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/routes/casting.tsx
 * ============================================================
 *
 * A QUI ELLE S'ADRESSE
 *
 * Aux actrices, comediennes, modeles et createrices de contenu qui
 * veulent tourner dans nos films publicitaires. Ce n'est pas un
 * prospect : elle ne cherche pas une agence, elle cherche un role. La
 * page parle donc d'elle, pas de nous.
 *
 * CE QUI COMPTE LE PLUS SUR CETTE PAGE
 *
 * 1. Qu'elle se remplisse AU TELEPHONE. C'est la que la candidate a ses
 *    photos. Les photos sont reduites dans le telephone avant l'envoi
 *    (voir src/config/casting.ts) : un envoi d'une minute en 4G, c'est
 *    une candidate sur deux qui abandonne.
 *
 * 2. Qu'elle rassure. Les arnaques au casting sont courantes : faux
 *    castings payants, photos reutilisees. La page dit en clair que
 *    c'est gratuit, a quoi servent les photos et combien de temps elles
 *    sont gardees.
 *
 * 3. Qu'elle ne promette rien. L'agence appelle quand un tournage le
 *    demande, pas a date fixe : aucune phrase n'annonce un rappel, un
 *    delai ou une priorite. « Si un tournage vous correspond », jamais
 *    « nous vous appelons ».
 *
 * 4. Qu'elle ne mente jamais. Tant que le stockage n'est pas branche,
 *    la page le dit des le haut du formulaire et renvoie vers WhatsApp,
 *    au lieu de laisser remplir vingt champs pour rien.
 *
 * NOS TALENTS, EN TETE DE PAGE
 *
 * Des que src/content/talents.ts contient au moins un profil, la page
 * s'ouvre sur la grille des actrices et modeles avec qui nous tournons,
 * et le formulaire passe en dessous sous « Rejoindre nos talents ».
 *
 * La grille sert deux publics a la fois : la marque, qui choisit un
 * visage et le reserve par WhatsApp ; la candidate, qui voit a quoi
 * ressemble le groupe qu'elle veut rejoindre.
 *
 * Chaque fiche a sa propre adresse, /casting?profil=<slug>, et son propre
 * apercu (photo, nom) quand on la partage sur WhatsApp.
 *
 * DEUX LANGUES, UNE SEULE PAGE : le texte vient de `copy(locale)`. Les
 * routes /casting et /en/casting affichent ce composant. Ce qui part au
 * serveur ne change pas avec la langue : les cases cochees sont envoyees
 * avec leur valeur FRANCAISE (le serveur les verifie), seul le libelle
 * affiche est traduit (castingLabel, src/config/casting.ts).
 */

const URL_ = SITE_URL;
const PATH = "/casting";

/** L'adresse ?profil=<slug>, lue par les deux routes. */
export const validateCastingSearch = (
  search: Record<string, unknown>,
): { profil?: string | undefined } => ({
  profil: typeof search["profil"] === "string" ? search["profil"] : undefined,
});

function copy(l: Locale) {
  if (l === "en") {
    return {
      /** Message pre-rempli quand une candidate ouvre WhatsApp depuis cette page. */
      whatsapp:
        "Hello UltraVision, I'm coming from the casting page on your website. I'd like to send you my profile.",
      title: "Casting: actresses, models and creators in Morocco | UltraVision Agency",
      name: "Casting: actresses, models and creators in Morocco",
      description:
        "Actresses, performers, models: apply for our video ads in Morocco. Free, two minutes, from your phone.",
      home: "Home",
      sharedDescription: (city: string) =>
        `${city}. See her profile and book her for your campaign.`,
      ogTalents: "The actresses and models in our campaigns. You can also submit your profile.",
      ogEmpty: "Submit your profile for our next video ads. Free, two minutes.",
      heroTalentsTitle: "The faces of our campaigns.",
      heroTalentsAccent: "our campaigns",
      heroTalentsIntro:
        "The actresses, models and creators we shoot with, sorted by profile. If you are a brand, choose the face of your next campaign. If you want to join them, apply further down.",
      heroTitle: "The next face of our campaigns could be you.",
      heroAccent: "could be you",
      heroIntro:
        "We shoot video ads for brands in Morocco: beauty, real estate, leisure. Experienced actress or first time in front of a camera, submit your profile. If a shoot suits you, we will contact you.",
      talentsTitle: "Our talent",
      apply: "Submit my application",
      joinEyebrow: "Join our talent",
      joinTitle: "The next face could be you.",
      joinText:
        "Experienced actress or first time in front of a camera: two minutes is enough. If a shoot suits you, we will contact you.",
      notReadyTitle: "Online applications open very soon.",
      notReadyText: "In the meantime, send us two photos and a few words about yourself",
      on: "on",
      at: "at",
      fieldName: "Full name",
      fieldAge: "Age",
      fieldCity: "City",
      fieldPhone: "Phone / WhatsApp",
      fieldEmail: "Email",
      instagramPlaceholder: "@youraccount",
      fieldHeight: "Height (cm)",
      youAre: "You are",
      experience: "On-camera experience",
      noExperience: "No experience required.",
      languages: "Languages spoken",
      photosTitle: "Your photos",
      photosHint: `${CASTING.minPhotos} to ${CASTING.maxPhotos} recent photos: a front-facing portrait and a full-length shot. No filters.`,
      tooMany: `${CASTING.maxPhotos} photos maximum: choose the ones that show you best.`,
      unreadable:
        "A photo could not be read. Send it as a JPEG or PNG — on iPhone, a screenshot of the photo works.",
      tooFew: `Add at least ${CASTING.minPhotos} photos: a front-facing portrait and a full-length shot.`,
      photoAlt: (i: number) => `Photo ${i}`,
      removePhoto: (i: number) => `Remove photo ${i}`,
      preparingOne: "Preparing…",
      addPhotos: "Add photos",
      add: "Add",
      stillNeeded: (n: number) => ` — at least ${n} more`,
      reel: "Introduction video or showreel",
      reelPlaceholder: "Instagram, YouTube, TikTok or Google Drive link…",
      about: "A few words about you",
      aboutPlaceholder: "Your shoots, your availability, what you would like to play.",
      adult: `I am ${CASTING.minAge} or older.`,
      consent: `I agree that UltraVision Agency may keep my application and photos for up to ${CASTING.retentionMonths} months, solely to offer me roles. I can ask for them to be deleted at any time at ${CONTACT.email}.`,
      sendingPhotos: "Sending photos…",
      preparingPhotos: "Preparing photos…",
      submit: "Send my application",
      sendWhatsapp: "Send on WhatsApp",
      howTitle: "How it works",
      steps: [
        ["You submit your profile.", "Two minutes, from your phone."],
        ["It joins our files.", "We look through them for our shoots."],
        ["If a role suits you,", "we contact you by phone or WhatsApp, for a test or a meeting."],
      ],
      goodPhotosTitle: "Photos that work",
      goodPhotos:
        "A front-facing portrait in natural light, a full-length shot. No filters or retouching: we need to see you as the camera will. A sharp, recent selfie is better than a studio photo from five years ago.",
      freeTitle: "Free, always",
      free: "Applying is free. UltraVision Agency will never ask you for money to take part in a casting.",
      yourPhotosTitle: "Your photos",
      yourPhotos: `They are used only for our castings and are never published without your consent. Kept for ${CASTING.retentionMonths} months at most, deleted on request.`,
      questionTitle: "A question",
      writeWhatsapp: "Message us on WhatsApp",
      optional: "(optional)",
    };
  }

  return {
    /** Message pre-rempli quand une candidate ouvre WhatsApp depuis cette page. */
    whatsapp:
      "Bonjour UltraVision, je viens de la page casting de votre site. J'aimerais vous envoyer mon profil.",
    title: "Casting : actrices, modèles et créatrices au Maroc | UltraVision Agency",
    name: "Casting : actrices, modèles et créatrices au Maroc",
    description:
      "Actrices, comédiennes, modèles : déposez votre candidature pour nos films publicitaires au Maroc. Gratuit, deux minutes, depuis votre téléphone.",
    home: "Accueil",
    sharedDescription: (city: string) =>
      `${city}. Découvrez son profil et réservez-la pour votre campagne.`,
    ogTalents: "Les actrices et modèles de nos campagnes. Déposez aussi votre profil.",
    ogEmpty: "Déposez votre profil pour nos prochains films publicitaires. Gratuit, deux minutes.",
    heroTalentsTitle: "Les visages de nos campagnes.",
    heroTalentsAccent: "nos campagnes",
    heroTalentsIntro:
      "Les actrices, modèles et créatrices avec qui nous tournons, classées par profil. Vous êtes une marque : choisissez le visage de votre prochaine campagne. Vous voulez les rejoindre : déposez votre candidature plus bas.",
    heroTitle: "Le prochain visage de nos campagnes, c'est peut-être vous.",
    heroAccent: "c'est peut-être vous",
    heroIntro:
      "Nous tournons des films publicitaires pour des marques au Maroc : beauté, immobilier, loisirs. Actrice confirmée ou première fois devant une caméra, déposez votre profil. Si un tournage vous correspond, nous vous contacterons.",
    talentsTitle: "Nos talents",
    apply: "Déposer ma candidature",
    joinEyebrow: "Rejoindre nos talents",
    joinTitle: "Le prochain visage, c'est peut-être vous.",
    joinText:
      "Actrice confirmée ou première fois devant une caméra : deux minutes suffisent. Si un tournage vous correspond, nous vous contacterons.",
    notReadyTitle: "Les candidatures en ligne ouvrent très bientôt.",
    notReadyText: "En attendant, envoyez-nous deux photos et quelques mots sur vous",
    on: "sur",
    at: "à",
    fieldName: "Nom et prénom",
    fieldAge: "Âge",
    fieldCity: "Ville",
    fieldPhone: "Téléphone / WhatsApp",
    fieldEmail: "Email",
    instagramPlaceholder: "@votrecompte",
    fieldHeight: "Taille (cm)",
    youAre: "Vous êtes",
    experience: "Expérience devant la caméra",
    noExperience: "Aucune expérience n'est exigée.",
    languages: "Langues parlées",
    photosTitle: "Vos photos",
    photosHint: `${CASTING.minPhotos} à ${CASTING.maxPhotos} photos récentes : un portrait de face, une photo en pied. Sans filtre.`,
    tooMany: `${CASTING.maxPhotos} photos au maximum : choisissez les plus parlantes.`,
    unreadable:
      "Une photo n'a pas pu être lue. Envoyez-la en JPEG ou en PNG — sur iPhone, une capture d'écran de la photo fonctionne.",
    tooFew: `Ajoutez au moins ${CASTING.minPhotos} photos : un portrait de face et une photo en pied.`,
    photoAlt: (i: number) => `Photo ${i}`,
    removePhoto: (i: number) => `Retirer la photo ${i}`,
    preparingOne: "Préparation…",
    addPhotos: "Ajouter des photos",
    add: "Ajouter",
    stillNeeded: (n: number) => ` — encore ${n} au minimum`,
    reel: "Vidéo de présentation ou bande démo",
    reelPlaceholder: "Lien Instagram, YouTube, TikTok, Google Drive…",
    about: "Quelques mots sur vous",
    aboutPlaceholder: "Vos tournages, vos disponibilités, ce que vous aimeriez jouer.",
    adult: `J'ai ${CASTING.minAge} ans ou plus.`,
    consent: `J'accepte qu'UltraVision Agency conserve ma candidature et mes photos pendant ${CASTING.retentionMonths} mois au plus, uniquement pour me proposer des rôles. Je peux en demander la suppression à tout moment à ${CONTACT.email}.`,
    sendingPhotos: "Envoi des photos…",
    preparingPhotos: "Préparation des photos…",
    submit: "Envoyer ma candidature",
    sendWhatsapp: "Envoyer sur WhatsApp",
    howTitle: "Comment ça se passe",
    steps: [
      ["Vous déposez votre profil.", "Deux minutes, depuis votre téléphone."],
      ["Il rejoint notre fichier.", "Nous le consultons pour nos tournages."],
      [
        "Si un rôle vous correspond,",
        "nous vous contactons par téléphone ou WhatsApp, pour un essai ou une rencontre.",
      ],
    ],
    goodPhotosTitle: "Les photos qui marchent",
    goodPhotos:
      "Un portrait de face en lumière naturelle, une photo en pied. Sans filtre ni retouche : nous devons vous voir comme la caméra vous verra. Un selfie net et récent vaut mieux qu'une photo de studio d'il y a cinq ans.",
    freeTitle: "Gratuit, toujours",
    free: "Déposer une candidature est gratuit. UltraVision Agency ne vous demandera jamais d'argent pour participer à un casting.",
    yourPhotosTitle: "Vos photos",
    yourPhotos: `Elles servent uniquement à nos castings et ne sont jamais publiées sans votre accord. Conservées ${CASTING.retentionMonths} mois au plus, supprimées sur simple demande.`,
    questionTitle: "Une question",
    writeWhatsapp: "Écrire sur WhatsApp",
    optional: "(facultatif)",
  };
}

/** Les balises de la page, dans la langue demandee (et la fiche partagee, s'il y en a une). */
export function castingHead(locale: Locale, profil: string | undefined) {
  const c = copy(locale);
  const path = localePath(PATH, locale);
  const pageUrl = `${URL_}${path}`;

  /*
    Une fiche partagee sur WhatsApp doit s'annoncer avec SA photo et
    SON nom, pas avec l'apercu generique de la page. L'adresse
    canonique, elle, reste /casting : pour Google, c'est une seule page.
  */
  const t = findTalent(profil);
  const shared = t
    ? [
        {
          property: "og:title",
          content: `${t.name} — ${categoryLabelFor(t.categories[0], locale)} | UltraVision Agency`,
        },
        {
          property: "og:description",
          content: c.sharedDescription(t.city),
        },
        { property: "og:image", content: `${URL_}${t.photos[0]}` },
        { property: "og:url", content: `${pageUrl}?profil=${t.slug}` },
      ]
    : [
        { property: "og:title", content: "Casting | UltraVision Agency" },
        {
          property: "og:description",
          content: TALENTS.length ? c.ogTalents : c.ogEmpty,
        },
        { property: "og:url", content: pageUrl },
      ];
  return {
    meta: [
      {
        title: t ? `${t.name} — Casting | UltraVision Agency` : c.title,
      },
      {
        name: "description",
        content: c.description,
      },
      ...shared,
      { property: "og:type", content: "website" },
      { property: "og:locale", content: OG_LOCALE[locale] },
    ],
    links: [
      { rel: "canonical", href: pageUrl },
      /* Les deux versions de la page se declarent l'une l'autre, comme dans pageHead. */
      { rel: "alternate", hrefLang: "fr", href: `${URL_}${PATH}` },
      { rel: "alternate", hrefLang: "en", href: `${URL_}${localePath(PATH, "en")}` },
      { rel: "alternate", hrefLang: "x-default", href: `${URL_}${PATH}` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: graphOf(
          [
            {
              "@type": "WebPage",
              "@id": `${pageUrl}#webpage`,
              url: pageUrl,
              name: c.name,
              inLanguage: LANG_TAG[locale],
              isPartOf: websiteRef,
              about: orgRef,
              breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: c.home,
                  item: `${URL_}${localePath("/", locale)}`,
                },
                { "@type": "ListItem", position: 2, name: "Casting", item: pageUrl },
              ],
            },
          ],
          locale,
        ),
      },
    ],
  };
}

type Photo = { id: number; blob: Blob; url: string };

export function CastingPage() {
  const locale = useLocale();
  const c = copy(locale);
  const { profil } = useSearch({ strict: false }) as { profil?: string | undefined };
  const navigate = useNavigate();
  const lenis = useLenis();
  const hasTalents = TALENTS.length > 0;

  /*
    Fermer une fiche ouverte depuis la grille, c'est revenir en arriere :
    le bouton « precedent » du telephone et la croix font alors la meme
    chose, et l'historique ne garde pas une fiche deja fermee. Une fiche
    arrivee par un lien partage n'a pas de « derriere » sur ce site : on
    remplace simplement l'adresse.
  */
  const openedFromGrid = useRef(false);
  const closeTalent = () => {
    if (openedFromGrid.current) {
      openedFromGrid.current = false;
      window.history.back();
    } else {
      navigate({
        to: localePath(PATH, locale),
        search: {},
        replace: true,
        resetScroll: false,
      });
    }
  };

  const toForm = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) lenis.scrollTo("#candidature", { offset: -110 });
    else document.getElementById("candidature")?.scrollIntoView({ behavior: "smooth" });
  };

  /* null tant qu'on ne sait pas encore : rien ne s'affiche, rien ne clignote. */
  const [ready, setReady] = useState<boolean | null>(null);
  const [profiles, setProfiles] = useState<string[]>([]);
  const [experience, setExperience] = useState<string | null>(null);
  const [languages, setLanguages] = useState<string[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [preparing, setPreparing] = useState(0);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<CastingResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const nextId = useRef(0);
  const addRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    castingReady().then(setReady);
  }, []);

  /* Les apercus sont des adresses en memoire : on les libere en partant. */
  const photosRef = useRef(photos);
  photosRef.current = photos;
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  const room = CASTING.maxPhotos - photos.length - preparing;

  const addFiles = async (list: FileList | File[]) => {
    const files = Array.from(list).filter((f) => f.type.startsWith("image/") || f.type === "");
    if (!files.length) return;
    setPhotoError(null);
    const taken = files.slice(0, Math.max(0, room));
    if (files.length > taken.length) {
      setPhotoError(c.tooMany);
    }
    setPreparing((n) => n + taken.length);

    for (const file of taken) {
      const blob = await preparePhoto(file);
      setPreparing((n) => n - 1);
      if (!photoAccepted(blob)) {
        setPhotoError(c.unreadable);
        continue;
      }
      const url = URL.createObjectURL(blob);
      setPhotos((cur) => [...cur, { id: nextId.current++, blob, url }]);
    }
  };

  const removePhoto = (id: number) =>
    setPhotos((cur) => {
      const gone = cur.find((p) => p.id === id);
      if (gone) URL.revokeObjectURL(gone.url);
      return cur.filter((p) => p.id !== id);
    });

  const toggle = (set: React.Dispatch<React.SetStateAction<string[]>>, v: string) =>
    set((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));

  /*
    L'envoi. Memes precautions que sur la page contact : bouton
    verrouille pendant l'envoi, formulaire conserve en cas d'echec.

    Le formulaire est saisi AVANT l'attente. Apres un `await`, React a
    deja remis `e.currentTarget` a null : `e.currentTarget.reset()`
    echouerait et le formulaire ne se viderait jamais.
  */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending || !ready || preparing > 0) return;

    if (photos.length < CASTING.minPhotos) {
      setPhotoError(c.tooFew);
      addRef.current?.focus();
      addRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "");

    setSending(true);
    setResult(null);

    const r = await sendCasting(
      {
        name: get("name"),
        age: get("age"),
        city: get("city"),
        phone: get("phone"),
        email: get("email"),
        instagram: get("instagram"),
        height: get("height"),
        profiles: profiles.join(", "),
        experience: experience ?? "",
        languages: languages.join(", "),
        reel: get("reel"),
        message: get("message"),
        consent: fd.get("consent") ? "oui" : "",
        adult: fd.get("adult") ? "oui" : "",
      },
      photos.map((p) => p.blob),
      get(FORM.honeypot),
    );

    setSending(false);
    setResult(r);
    if (r.ok) {
      form.reset();
      photos.forEach((p) => URL.revokeObjectURL(p.url));
      setPhotos([]);
      setProfiles([]);
      setExperience(null);
      setLanguages([]);
      setPhotoError(null);
    }
  };

  /** Style commun aux pastilles de choix, identique a la page contact. */
  const chip = (on: boolean) => ({
    borderColor: on ? "#3B82F6" : "#262626",
    backgroundColor: on ? "rgba(59,130,246,.12)" : "transparent",
    color: on ? "#93C5FD" : "#8a8a8a",
    transition: `all ${MOTION.respond}ms ${EASE_RESPOND}`,
  });

  const locked = sending || ready !== true || preparing > 0;

  return (
    <>
      {hasTalents ? (
        <PageHero
          eyebrow="Casting"
          title={c.heroTalentsTitle}
          accent={c.heroTalentsAccent}
          intro={c.heroTalentsIntro}
        />
      ) : (
        <PageHero eyebrow="Casting" title={c.heroTitle} accent={c.heroAccent} intro={c.heroIntro} />
      )}

      {hasTalents && (
        <section className="rule bg-background" aria-labelledby="talents-title">
          <div className="shell py-14 lg:py-20">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="talents-title" className="eyebrow" style={{ color: "#60A5FA" }}>
                {c.talentsTitle}
              </h2>
              <a
                href="#candidature"
                onClick={toForm}
                className="group inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#F5F5F3] transition-colors duration-300 hover:text-[#60A5FA]"
              >
                {c.apply}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  &darr;
                </span>
              </a>
            </div>
            <TalentBoard
              talents={TALENTS}
              selected={profil}
              onOpen={() => {
                openedFromGrid.current = true;
              }}
              onClose={closeTalent}
            />
          </div>
        </section>
      )}

      <section id="candidature" className="rule bg-background">
        {hasTalents && (
          <div className="shell pt-14 lg:pt-20">
            <Reveal>
              <p className="eyebrow" style={{ color: "#60A5FA" }}>
                {c.joinEyebrow}
              </p>
              <h2 className="display mt-4 max-w-2xl text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.05] tracking-[-0.03em]">
                {c.joinTitle}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {c.joinText}
              </p>
            </Reveal>
          </div>
        )}
        <div
          className={`shell grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16 ${hasTalents ? "pt-10 pb-14 lg:pb-20" : "py-14 lg:py-20"}`}
        >
          {/* ---------------- Le formulaire ---------------- */}
          <Reveal>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl p-7 sm:p-9"
              style={{ backgroundColor: "#0B1020", border: "1px solid #16203a" }}
            >
              {/* Champ piege : voir la page contact. */}
              <input
                type="text"
                name={FORM.honeypot}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
              />

              {ready === false && (
                <div
                  className="mb-8 rounded-xl p-4"
                  style={{
                    backgroundColor: "rgba(148,163,184,.06)",
                    border: "1px solid #2a3346",
                  }}
                >
                  <p className="text-sm text-[#c2c6d2]">{c.notReadyTitle}</p>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-[#8792ad]">
                    {c.notReadyText}{" "}
                    {hasWhatsapp ? (
                      <>
                        {c.on}{" "}
                        <a
                          href={whatsappUrl(c.whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-[#93C5FD]"
                        >
                          WhatsApp
                        </a>
                      </>
                    ) : (
                      <>
                        {c.at}{" "}
                        <a
                          href={`mailto:${CONTACT.email}`}
                          className="link-underline text-[#93C5FD]"
                        >
                          {CONTACT.email}
                        </a>
                      </>
                    )}
                    .
                  </p>
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={c.fieldName} name="name" autoComplete="name" />
                <Field
                  label={c.fieldAge}
                  name="age"
                  type="number"
                  inputMode="numeric"
                  min={CASTING.minAge}
                  max={99}
                />
                <Field
                  label={c.fieldCity}
                  name="city"
                  autoComplete="address-level2"
                  list="casting-cities"
                />
                <Field
                  label={c.fieldPhone}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+212 6…"
                />
                <Field
                  label={c.fieldEmail}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required={false}
                />
                <Field
                  label="Instagram"
                  name="instagram"
                  placeholder={c.instagramPlaceholder}
                  required={false}
                />
                <Field
                  label={c.fieldHeight}
                  name="height"
                  type="number"
                  inputMode="numeric"
                  min={120}
                  max={220}
                  required={false}
                />
              </div>
              <datalist id="casting-cities">
                {CONTACT.cities.map((city) => (
                  <option
                    key={city}
                    value={locale === "en" && city === "Tanger" ? "Tangier" : city}
                  />
                ))}
              </datalist>

              <fieldset className="mt-9">
                <legend className="eyebrow" style={{ color: "#60A5FA" }}>
                  {c.youAre}
                </legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {PROFILES.map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => toggle(setProfiles, p)}
                      aria-pressed={profiles.includes(p)}
                      className="rounded-full border px-4 py-2 text-xs"
                      style={chip(profiles.includes(p))}
                    >
                      {castingLabel(p, locale)}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-9">
                <legend className="eyebrow" style={{ color: "#60A5FA" }}>
                  {c.experience}
                </legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {EXPERIENCE.map((x) => (
                    <button
                      type="button"
                      key={x}
                      onClick={() => setExperience(experience === x ? null : x)}
                      aria-pressed={experience === x}
                      className="rounded-full border px-4 py-2 text-xs"
                      style={chip(experience === x)}
                    >
                      {castingLabel(x, locale)}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-[0.74rem] text-[#797976]">{c.noExperience}</p>
              </fieldset>

              <fieldset className="mt-9">
                <legend className="eyebrow" style={{ color: "#60A5FA" }}>
                  {c.languages}
                </legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {LANGUAGES.map((l) => (
                    <button
                      type="button"
                      key={l}
                      onClick={() => toggle(setLanguages, l)}
                      aria-pressed={languages.includes(l)}
                      className="rounded-full border px-4 py-2 text-xs"
                      style={chip(languages.includes(l))}
                    >
                      {castingLabel(l, locale)}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* ---------------- Les photos ---------------- */}
              <fieldset className="mt-9">
                <legend className="eyebrow" style={{ color: "#60A5FA" }}>
                  {c.photosTitle}
                </legend>
                <p className="mt-3 text-[0.82rem] leading-relaxed text-[#8792ad]">{c.photosHint}</p>

                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
                  {photos.map((p, i) => (
                    <div
                      key={p.id}
                      className="relative aspect-[3/4] overflow-hidden rounded-xl"
                      style={{ border: "1px solid #16203a" }}
                    >
                      <img
                        src={p.url}
                        alt={c.photoAlt(i + 1)}
                        className="h-full w-full object-cover"
                      />
                      {/*
                        44 px de zone tactile, 28 px de pastille visible :
                        la croix reste discrete sur la photo, mais le doigt
                        ne la rate pas.
                      */}
                      <button
                        type="button"
                        onClick={() => removePhoto(p.id)}
                        aria-label={c.removePhoto(i + 1)}
                        className="absolute top-0 right-0 flex h-11 w-11 items-center justify-center"
                      >
                        <span
                          aria-hidden="true"
                          className="flex h-7 w-7 items-center justify-center rounded-full text-sm text-white"
                          style={{
                            backgroundColor: "rgba(0,0,0,.62)",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          ×
                        </span>
                      </button>
                    </div>
                  ))}

                  {Array.from({ length: preparing }, (_, i) => (
                    <div
                      key={`prep-${i}`}
                      className="flex aspect-[3/4] items-center justify-center rounded-xl text-[0.7rem] text-[#8792ad]"
                      style={{ border: "1px dashed #2a3346" }}
                    >
                      {c.preparingOne}
                    </div>
                  ))}

                  {room > 0 && (
                    <label
                      ref={addRef}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.currentTarget.click();
                        }
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        addFiles(e.dataTransfer.files);
                      }}
                      className="flex aspect-[3/4] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl px-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                      style={{
                        border: `1px dashed ${dragOver ? "#3B82F6" : "#2b4880"}`,
                        backgroundColor: dragOver ? "rgba(59,130,246,.12)" : "rgba(59,130,246,.04)",
                        transition: `all ${MOTION.respond}ms ${EASE_RESPOND}`,
                      }}
                    >
                      <span aria-hidden="true" className="text-2xl leading-none text-[#60A5FA]">
                        +
                      </span>
                      <span className="text-[0.7rem] leading-tight text-[#cddafc]">
                        {photos.length === 0 ? c.addPhotos : c.add}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        tabIndex={-1}
                        onChange={(e) => {
                          if (e.target.files) addFiles(e.target.files);
                          // Sans cela, choisir a nouveau la meme photo apres
                          // l'avoir retiree ne declencherait rien.
                          e.target.value = "";
                        }}
                      />
                    </label>
                  )}
                </div>

                <p className="mt-3 text-[0.74rem] text-[#797976]" aria-live="polite">
                  {photos.length} / {CASTING.maxPhotos}
                  {photos.length > 0 && photos.length < CASTING.minPhotos
                    ? c.stillNeeded(CASTING.minPhotos - photos.length)
                    : ""}
                </p>
                {photoError && (
                  <p role="alert" className="mt-2 text-[0.82rem] text-[#fca5a5]">
                    {photoError}
                  </p>
                )}
              </fieldset>

              <div className="mt-9">
                <Field
                  label={c.reel}
                  name="reel"
                  type="url"
                  required={false}
                  placeholder={c.reelPlaceholder}
                />
              </div>

              <div className="mt-9">
                <label htmlFor="message" className="eyebrow" style={{ color: "#60A5FA" }}>
                  {c.about} <Optional />
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-4 w-full resize-none rounded-xl px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: "#070A14",
                    border: "1px solid #16203a",
                    transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#3B82F6")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#16203a")}
                  placeholder={c.aboutPlaceholder}
                />
              </div>

              <div className="mt-9 space-y-4">
                <Check name="adult">{c.adult}</Check>
                <Check name="consent">{c.consent}</Check>
              </div>

              <button
                type="submit"
                disabled={locked}
                className="mt-9 inline-flex h-12 items-center rounded-full px-7 text-xs font-medium tracking-[0.14em] uppercase"
                style={{
                  backgroundColor: locked ? "#1f2c48" : "#2563EB",
                  color: locked ? "#7d8aa5" : "#fff",
                  cursor: locked ? "not-allowed" : "pointer",
                  transition: `background-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                }}
              >
                {sending ? c.sendingPhotos : preparing > 0 ? c.preparingPhotos : c.submit}
              </button>

              {/* --- Resultat de l'envoi --- */}
              {result && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-6 rounded-xl p-4"
                  style={{
                    backgroundColor: result.ok ? "rgba(59,130,246,.1)" : "rgba(248,113,113,.08)",
                    border: `1px solid ${result.ok ? "rgba(96,165,250,.3)" : "rgba(248,113,113,.3)"}`,
                  }}
                >
                  <p className="text-sm" style={{ color: result.ok ? "#93C5FD" : "#fca5a5" }}>
                    {castingMessage(result, locale)}
                  </p>
                  {!result.ok && hasWhatsapp && (
                    <a
                      href={whatsappUrl(c.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex h-9 items-center rounded-full px-4 text-[0.72rem] font-medium tracking-[0.1em] uppercase"
                      style={{ border: "1px solid #2b4880", color: "#cddafc" }}
                    >
                      {c.sendWhatsapp}
                    </a>
                  )}
                </div>
              )}
            </form>
          </Reveal>

          {/* ---------------- Ce que la candidate doit savoir ---------------- */}
          <Reveal delay={100}>
            <div className="space-y-9">
              <div>
                <p className="eyebrow" style={{ color: "#60A5FA" }}>
                  {c.howTitle}
                </p>
                <ol className="mt-5 space-y-5">
                  {c.steps.map(([t, d], i) => (
                    <li key={t} className="flex gap-4">
                      <span className="display text-sm text-[#60A5FA]">0{i + 1}</span>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        <span className="text-foreground">{t}</span> {d}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border-t border-hairline pt-8">
                <p className="eyebrow" style={{ color: "#60A5FA" }}>
                  {c.goodPhotosTitle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.goodPhotos}</p>
              </div>

              <div className="border-t border-hairline pt-8">
                <p className="eyebrow" style={{ color: "#60A5FA" }}>
                  {c.freeTitle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.free}</p>
              </div>

              <div className="border-t border-hairline pt-8">
                <p className="eyebrow" style={{ color: "#60A5FA" }}>
                  {c.yourPhotosTitle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.yourPhotos}</p>
              </div>

              {hasWhatsapp && (
                <div className="border-t border-hairline pt-8">
                  <p className="eyebrow" style={{ color: "#60A5FA" }}>
                    {c.questionTitle}
                  </p>
                  <a
                    href={whatsappUrl(c.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-7 text-xs font-medium tracking-[0.14em] uppercase"
                    style={{ border: "1px solid #16203a", backgroundColor: "#0B1020" }}
                  >
                    <img
                      src="/brand/platforms/whatsapp.svg"
                      alt=""
                      aria-hidden="true"
                      width={16}
                      height={16}
                      style={{ height: 16, width: 16 }}
                    />
                    {c.writeWhatsapp}
                  </a>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Optional() {
  const locale = useLocale();
  return (
    <span className="ml-1 normal-case tracking-normal text-[#5f6b85]">{copy(locale).optional}</span>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "type" | "required">) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow" style={{ color: "#60A5FA" }}>
        {label}
        {!required && <Optional />}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        {...rest}
        className="mt-3 h-11 w-full rounded-xl px-4 text-sm outline-none placeholder:text-[#4b5670]"
        style={{
          backgroundColor: "#070A14",
          border: "1px solid #16203a",
          transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}`,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#3B82F6")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#16203a")}
      />
    </div>
  );
}

function Check({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-[0.82rem] leading-relaxed text-[#a3aac0]">
      <input
        type="checkbox"
        name={name}
        required
        className="mt-[3px] h-[18px] w-[18px] shrink-0 cursor-pointer"
        style={{ accentColor: "#3B82F6" }}
      />
      <span>{children}</span>
    </label>
  );
}
