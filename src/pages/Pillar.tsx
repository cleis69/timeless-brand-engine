import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/FinalCTA";
import { Reveal } from "@/components/Reveal";
import {
  ArrowLink,
  CardGrid,
  FactList,
  FaqList,
  LinkCards,
  Section,
  SectionIntro,
} from "@/components/page/Blocks";
import { WorkGrid } from "@/components/work/WorkGrid";
import { casePath, isFilm, type WorkItem } from "@/components/work/work.data";
import { BRAND, SOCIAL, withBrand } from "@/config/brand";
import { CONTACT, hasWhatsapp, whatsappUrl } from "@/config/contact";
import { PACKS, formatDirham, formatEuro } from "@/config/pricing";
import { servicePath } from "@/content/services";
import { LANDINGS, type Landing } from "@/content/landings";
import { sectorPath } from "@/content/sectors";
import {
  articlesFor,
  caseStudiesFor,
  findWorkFor,
  polesFor,
  sectorsFor,
  servicesFor,
} from "@/content/localized";
import { localePath, useLocale, type Locale } from "@/lib/i18n";
import { orgRef, pageHead, pageUrl } from "@/lib/seo";

/**
 * UltraVision Agency — la page pilier.
 *
 * ============================================================
 *  LA PAGE QUI REPOND A « QU'EST-CE QU'ULTRAVISION AGENCY ? »
 * ============================================================
 *
 * Elle est ecrite pour etre lue par une personne ET extraite par un
 * moteur. D'ou sa structure :
 *
 *  1. La definition, des le premier paragraphe, en une phrase qui reste
 *     vraie hors contexte (src/config/brand.ts).
 *  2. Une fiche « En bref » balisee en liste de definitions : nom,
 *     categorie, siege, zone, metiers, equipe, prix, delai.
 *  3. Les services, les secteurs, l'approche, les preuves — chacun avec
 *     un lien vers sa page detaillee.
 *  4. Les questions qu'on pose a un assistant, avec leurs reponses.
 *
 * Marrakech y est nommee la ou c'est une information — le siege, la zone
 * de tournage — et nulle part ailleurs. Une ville repetee a chaque
 * paragraphe ne renseigne personne ; elle signale une page ecrite pour
 * un robot.
 *
 * AUCUN FAIT NOUVEAU ICI : tout vient des tarifs, de l'equipe, des
 * realisations et de la FAQ deja publies.
 *
 * DEUX LANGUES, UNE SEULE PAGE : le texte vient de `copy(locale)`, la
 * mise en page est commune. Les routes /agence-marketing-digital-marrakech
 * et /en/digital-marketing-agency-marrakech affichent ce composant.
 */

const PATH = "/agence-marketing-digital-marrakech";

const ESSAI = PACKS.find((p) => p.id === "essai")!;
const PRODUCTION = PACKS.find((p) => p.id === "production")!;

/*
  La definition et le resume de brand.ts, en anglais. Meme sens, mot
  pour mot autant que l'anglais le permet : c'est la phrase que les
  assistants reprennent quand on leur demande ce qu'est l'agence.
*/
const DEFINITION_EN = `${BRAND.name} is a ${BRAND.category} — in other words, a digital marketing agency — based in ${BRAND.city}, Morocco.`;
const SUMMARY_EN =
  "It brings together, in a single team, branding, video and photo production, advertising on Meta, Google and TikTok, websites and conversion tools: CRM, artificial intelligence and automation.";

/* Les noms et textes des pages d'offre : l'anglais quand landings.ts le fournit. */
type LandingText = Landing & { nameEn?: string; textEn?: string };

function copy(l: Locale) {
  const d = (eur: number) => formatDirham(eur, l);
  const both = (eur: number) => `${d(eur)} (≈ ${formatEuro(eur, l)})`;
  const services = servicesFor(l);

  if (l === "en") {
    return {
      title: withBrand(`Digital marketing agency in ${BRAND.city}`),
      description: `${BRAND.name}, a ${BRAND.category} based in ${BRAND.city}: video, Meta, Google and TikTok Ads, websites, CRM and AI, brought together in a single team.`,
      crumb: `The agency in ${BRAND.city}`,
      eyebrow: `Digital marketing agency — ${BRAND.city}`,
      h1: `A digital marketing agency in ${BRAND.city} whose work sells.`,
      accent: "whose work sells",
      intro: `${DEFINITION_EN} ${SUMMARY_EN}`,
      factsEyebrow: "At a glance",
      factsTitle: `${BRAND.name}, in nine lines.`,
      factsText: "The essentials — to get the picture in thirty seconds, or to quote it.",
      facts: [
        { label: "Name", value: BRAND.name },
        { label: "Category", value: `${BRAND.category} — digital marketing agency` },
        { label: "Head office", value: `${BRAND.city}, Morocco` },
        {
          label: "Where we work",
          value: CONTACT.locations.replaceAll(" — ", ", ").replace("Tanger", "Tangier"),
        },
        {
          label: "What we do",
          value: "Branding, video and photo content, advertising, websites, CRM and AI",
        },
        {
          label: "Team",
          value: "Four people: founder, art direction, community management, media buying",
        },
        { label: "Working languages", value: "French and English" },
        {
          label: "Pricing",
          value: `Public — video trial at ${d(ESSAI.price)}, ads included`,
        },
        { label: "Turnaround", value: "First video delivered in 7 days" },
      ],
      contact: "Contact:",
      whatEyebrow: "What the agency does",
      whatTitle: "Four divisions, eight services, one team.",
      whatText:
        "Brand, content, advertising and conversion tools are built together: that is what sets a Creative Growth Agency apart from an agency that only does one or the other.",
      offer: "Offer",
      method: "Digital strategy and end-to-end support",
      whoEyebrow: "Who we work with",
      whoTitle: "Businesses based in Morocco, and their customers.",
      whoText:
        "Most of our clients are French-speaking business owners based in Morocco. Three industries account for most of our work; we also work with service businesses and premium brands.",
      sector: "Industry",
      approachEyebrow: "Our approach",
      approachTitle: "Four rules, on every project.",
      approach: [
        {
          title: "The same team creates and runs",
          text: "The people who write and shoot your videos are the people who manage the ads. Nobody to pass the responsibility to when results don't come.",
        },
        {
          title: "Managed for meetings, not clicks",
          text: "We commit to qualified meetings, not impressions.",
        },
        {
          title: "Public prices",
          text: "Every service has a published price, and what is never included is written down before you sign.",
        },
        {
          title: "Everything belongs to you",
          text: "Source files, ad accounts opened in your name, campaign data: if we stop, you leave with everything.",
        },
      ],
      workEyebrow: "Work",
      workTitle: "What we have produced.",
      workText:
        "Everything is shot and edited in-house. The figures shown are taken from the ad managers.",
      caseStudy: "Case study",
      allWork: "All our work",
      localEyebrow: `Based in ${BRAND.city}`,
      localTitle: "An agency on the ground, not a remote supplier.",
      local: [
        {
          title: "We shoot on location",
          text: "In Marrakech, and in the other cities where we work — Casablanca, Rabat, Tangier, Agadir — with no extra travel fees.",
        },
        {
          title: "We reply quickly",
          text: "A reply within 24 working hours, the same day on WhatsApp. A 30-minute call can be booked online.",
        },
        {
          title: "We work in French and English",
          text: "With the production standards our clients are used to.",
        },
        {
          title: "You know who does what",
          text: "A small, named team. The people who sell you the project are the people who deliver it.",
        },
      ],
      team: "Meet the team",
      resourcesEyebrow: "Resources",
      resourcesTitle: "Prices, budgets and method, explained.",
      resourcesText: "Detailed answers to the questions we are asked before we start.",
      allArticles: "All articles",
      faq: [
        {
          q: `What is ${BRAND.name}?`,
          a: `${DEFINITION_EN} ${SUMMARY_EN}`,
        },
        {
          q: `Where is ${BRAND.name} based?`,
          a: "In Marrakech, Morocco. The agency also works in Casablanca, Rabat, Tangier and Agadir: shoots travel to these cities at no extra cost.",
        },
        {
          q: `What services does ${BRAND.name} offer?`,
          a: `${services.map((s) => s.name).join(", ")}. And, for projects that don't fit any plan, end-to-end support on quotation: diagnosis, strategy, production and growth.`,
        },
        {
          q: "What kind of businesses do you work with?",
          a: "Mainly French-speaking business owners and companies based in Morocco: real estate, beauty and wellness, restaurants and hospitality, as well as service businesses and premium brands.",
        },
        {
          q: "How much does a first campaign cost?",
          a: `The trial costs ${both(ESSAI.price)}: one video ad delivered in 7 days and 14 days of managed ads. Monthly plans start at ${d(PRODUCTION.price)} a month. All prices are published on the pricing page.`,
        },
        {
          q: "How do I get started with the agency?",
          a: "Book a 30-minute call from the contact page, or message us on WhatsApp. We get back to you within 24 working hours with a time slot and a first angle to work on.",
        },
      ],
    };
  }

  return {
    title: withBrand(`Agence de marketing digital à ${BRAND.city}`),
    description:
      "UltraVision Agency, Creative Growth Agency basée à Marrakech : vidéo, Meta, Google et TikTok Ads, sites web, CRM et IA, réunis dans une seule équipe.",
    crumb: `L'agence à ${BRAND.city}`,
    eyebrow: `Agence de marketing digital — ${BRAND.city}`,
    h1: "Une agence de marketing digital à Marrakech qui fait vendre ce qu'elle crée.",
    accent: "qui fait vendre ce qu'elle crée",
    intro: `${BRAND.definition} ${BRAND.summary}`,
    factsEyebrow: "En bref",
    factsTitle: `${BRAND.name}, en neuf lignes.`,
    factsText: "L'essentiel, pour vous faire une idée en trente secondes — ou pour le citer.",
    facts: [
      { label: "Nom", value: BRAND.name },
      { label: "Catégorie", value: `${BRAND.category} — ${BRAND.categoryFr}` },
      { label: "Siège", value: `${BRAND.city}, ${BRAND.country}` },
      { label: "Zone d'intervention", value: CONTACT.locations.replaceAll(" — ", ", ") },
      {
        label: "Métiers",
        value: "Marque, contenu vidéo et photo, publicité, sites web, CRM et IA",
      },
      {
        label: "Équipe",
        value:
          "Quatre personnes : fondateur, direction artistique, community management, media buying",
      },
      { label: "Langue de travail", value: "Français et anglais" },
      {
        label: "Tarifs",
        value: `${l === "en" ? "Public prices" : "Prix publics"} — essai vidéo à ${formatEuro(ESSAI.price, l)}, diffusion comprise`,
      },
      { label: "Délai", value: "Première vidéo livrée en 7 jours" },
    ],
    contact: "Contact :",
    whatEyebrow: "Ce que fait l'agence",
    whatTitle: "Quatre pôles, huit services, une seule équipe.",
    whatText:
      "La marque, les contenus, la publicité et les outils de conversion sont construits ensemble : c'est ce qui distingue une Creative Growth Agency d'une agence qui ne fait que l'un ou l'autre.",
    offer: "Offre",
    method: "Stratégie digitale et accompagnement 360",
    whoEyebrow: "Pour qui",
    whoTitle: "Des entreprises installées au Maroc, et leurs clients.",
    whoText:
      "La grande majorité de nos clients sont des dirigeants francophones installés au Maroc. Trois secteurs concentrent l'essentiel de nos réalisations ; nous accompagnons aussi des entreprises de services et des marques haut de gamme.",
    sector: "Secteur",
    approachEyebrow: "Notre approche",
    approachTitle: "Quatre règles, sur chaque projet.",
    approach: [
      {
        title: "La même équipe crée et diffuse",
        text: "Ceux qui écrivent et tournent vos vidéos sont ceux qui pilotent leur diffusion. Personne à qui renvoyer la responsabilité quand les résultats ne viennent pas.",
      },
      {
        title: "Un pilotage au rendez-vous, pas au clic",
        text: "Nous nous engageons sur des rendez-vous qualifiés, pas sur des impressions.",
      },
      {
        title: "Des prix publics",
        text: "Chaque prestation a un prix publié, et ce qui n'est jamais compris est écrit avant la signature.",
      },
      {
        title: "Tout vous appartient",
        text: "Fichiers sources, comptes publicitaires ouverts à votre nom, données de campagne : si nous arrêtons, vous repartez avec tout.",
      },
    ],
    workEyebrow: "Réalisations",
    workTitle: "Ce que nous avons produit.",
    workText:
      "Tout est tourné et monté en interne. Les chiffres affichés sont ceux relevés dans les gestionnaires de publicités.",
    caseStudy: "Étude de cas",
    allWork: "Toutes les réalisations",
    localEyebrow: `Basés à ${BRAND.city}`,
    localTitle: "Une agence sur place, pas un prestataire à distance.",
    local: [
      {
        title: "Nous tournons sur place",
        text: "À Marrakech, et dans les autres villes où nous intervenons — Casablanca, Rabat, Tanger, Agadir — sans frais de déplacement supplémentaires.",
      },
      {
        title: "Nous répondons vite",
        text: "Réponse sous 24 heures ouvrées, dans la journée sur WhatsApp. Un appel de 30 minutes se réserve en ligne.",
      },
      {
        title: "Nous travaillons en français et en anglais",
        text: "Avec les standards de production auxquels nos clients sont habitués.",
      },
      {
        title: "Vous savez qui fait quoi",
        text: "Une équipe restreinte et nommée. Ceux qui vous vendent le projet sont ceux qui l'exécutent.",
      },
    ],
    team: "Rencontrer l'équipe",
    resourcesEyebrow: "Ressources",
    resourcesTitle: "Prix, budgets et méthode, expliqués.",
    resourcesText: "Les réponses détaillées aux questions qu'on nous pose avant de commencer.",
    allArticles: "Tous les articles",
    faq: [
      {
        q: "Qu'est-ce qu'UltraVision Agency ?",
        a: `${BRAND.definition} ${BRAND.summary}`,
      },
      {
        q: "Où est basée UltraVision Agency ?",
        a: "À Marrakech, au Maroc. L'agence intervient aussi à Casablanca, Rabat, Tanger et Agadir : le tournage se déplace dans ces villes sans frais supplémentaires.",
      },
      {
        q: "Quels services propose UltraVision Agency ?",
        a: `${services.map((s) => s.name).join(", ")}. Et, pour les projets qui ne rentrent dans aucune formule, un accompagnement 360 sur devis : diagnostic, stratégie, production et croissance.`,
      },
      {
        q: "Avec quelles entreprises travaillez-vous ?",
        a: "Principalement avec des dirigeants et des entreprises francophones installés au Maroc : immobilier, beauté et bien-être, restauration et hospitality, mais aussi services et marques haut de gamme.",
      },
      {
        q: "Combien coûte une première campagne ?",
        a: `L'essai coûte ${both(ESSAI.price)} : une vidéo publicitaire livrée en 7 jours et 14 jours de diffusion pilotée. Les accompagnements mensuels démarrent à ${d(PRODUCTION.price)} par mois. Tous les prix sont publiés sur la page tarifs.`,
      },
      {
        q: "Comment démarrer avec l'agence ?",
        a: "Réservez un appel de 30 minutes depuis la page contact, ou écrivez-nous sur WhatsApp. Nous revenons vers vous sous 24 heures ouvrées avec un créneau et un premier angle de travail.",
      },
    ],
  };
}

/** Les balises de la page, dans la langue demandee. */
export function pillarHead(locale: Locale) {
  const t = copy(locale);
  return pageHead({
    locale,
    path: PATH,
    title: t.title,
    description: t.description,
    breadcrumbs: [{ name: t.crumb, path: PATH }],
    about: orgRef,
    mainEntity: orgRef,
    faq: t.faq,
    nodes: [
      {
        "@type": "Service",
        "@id": `${pageUrl(localePath(PATH, locale))}#service`,
        name: locale === "en" ? "Digital marketing agency in Marrakech" : "Agence de marketing digital à Marrakech",
        serviceType: locale === "en" ? "Digital marketing" : "Marketing digital",
        description: t.description,
        url: pageUrl(localePath(PATH, locale)),
        provider: orgRef,
        areaServed: ["Marrakech", "Casablanca", "Rabat", "Tanger", "Agadir"].map((c) => ({ "@type": "City", name: c })),
        availableLanguage: ["French", "English"],
      },
    ],
  });
}

/*
  Les films montres ici : les trois etudes de cas filmees et un film de
  lieu. Les cartes « Etude de cas », plus bas, ne gardent que les films
  (isFilm) : la section annonce « Tout est tourne et monte en interne »,
  ce qui ne vaut pas pour un site. Les etudes de cas de sites (Find
  Estate, dont les photos sont celles des annonces Airbnb du client, et
  REV) restent sur /realisations et sur les pages secteur et service.
*/
const WORK_SLUGS = ["africa-beauty", "all-in-kech", "sculpt-body-marrakech", "institut-beaute"];

const works = (l: Locale) =>
  WORK_SLUGS.map((s) => findWorkFor(s, l)).filter((w): w is WorkItem => !!w);

export function PillarPage() {
  const locale = useLocale();
  const lp = (p: string) => localePath(p, locale);
  const t = copy(locale);
  const services = servicesFor(locale);
  const en = locale === "en";

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.h1}
        accent={t.accent}
        intro={t.intro}
        breadcrumbs={[{ name: t.crumb, path: lp(PATH) }]}
      />

      {/* ---------------- En bref ---------------- */}
      <Section>
        <SectionIntro eyebrow={t.factsEyebrow} title={t.factsTitle} text={t.factsText} />
        <FactList facts={t.facts} />
        <Reveal delay={200}>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            {t.contact}{" "}
            <a href={`mailto:${CONTACT.email}`} className="link-underline text-foreground">
              {CONTACT.email}
            </a>
            {hasWhatsapp && (
              <>
                {" "}
                ·{" "}
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-foreground"
                >
                  WhatsApp
                </a>
              </>
            )}
            {SOCIAL.map((n) => (
              <span key={n.network}>
                {" "}
                ·{" "}
                <a
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="link-underline text-foreground"
                >
                  {n.network} {n.handle}
                </a>
              </span>
            ))}
          </p>
        </Reveal>
      </Section>

      {/* ---------------- Ce que fait l'agence ---------------- */}
      <Section surface>
        <SectionIntro eyebrow={t.whatEyebrow} title={t.whatTitle} text={t.whatText} />
        <LinkCards
          items={polesFor(locale).flatMap((p) =>
            p.services.map((slug) => {
              const s = services.find((x) => x.slug === slug)!;
              return {
                to: lp(servicePath(s.slug)),
                eyebrow: p.title,
                title: s.name,
                text: s.description,
              };
            }),
          )}
        />
        <LinkCards
          items={(LANDINGS as LandingText[]).map((l) => ({
            to: lp(l.path),
            eyebrow: t.offer,
            title: en ? (l.nameEn ?? l.name) : l.name,
            text: en ? (l.textEn ?? l.text) : l.text,
          }))}
        />
        <div className="mt-10">
          <ArrowLink to={lp("/methode")}>{t.method}</ArrowLink>
        </div>
      </Section>

      {/* ---------------- Pour quelles entreprises ---------------- */}
      <Section>
        <SectionIntro eyebrow={t.whoEyebrow} title={t.whoTitle} text={t.whoText} />
        <LinkCards
          items={sectorsFor(locale).map((s) => ({
            to: lp(sectorPath(s.slug)),
            eyebrow: t.sector,
            title: s.name,
            text: s.description,
          }))}
        />
      </Section>

      {/* ---------------- L'approche ---------------- */}
      <Section surface>
        <SectionIntro eyebrow={t.approachEyebrow} title={t.approachTitle} />
        <CardGrid items={t.approach} />
      </Section>

      {/* ---------------- Les preuves ---------------- */}
      <Section>
        <SectionIntro eyebrow={t.workEyebrow} title={t.workTitle} text={t.workText} />
        <div className="mt-10">
          <WorkGrid items={works(locale)} />
        </div>
        <LinkCards
          items={caseStudiesFor(locale)
            .filter(isFilm)
            .map((w) => ({
              to: lp(casePath(w.slug)),
              eyebrow: t.caseStudy,
              title: w.caseStudy.client,
              text: w.caseStudy.headline,
            }))}
        />
        <div className="mt-10">
          <ArrowLink to={lp("/realisations")}>{t.allWork}</ArrowLink>
        </div>
      </Section>

      {/* ---------------- Marrakech ---------------- */}
      <Section surface>
        <SectionIntro eyebrow={t.localEyebrow} title={t.localTitle} />
        <CardGrid items={t.local} />
        <div className="mt-10">
          <ArrowLink to={lp("/a-propos")}>{t.team}</ArrowLink>
        </div>
      </Section>

      {/* ---------------- Ressources ---------------- */}
      <Section>
        <SectionIntro
          eyebrow={t.resourcesEyebrow}
          title={t.resourcesTitle}
          text={t.resourcesText}
        />
        <LinkCards
          items={articlesFor(locale)
            .slice(0, 6)
            .map((a) => ({
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

      {/* ---------------- FAQ ---------------- */}
      <Section surface>
        <FaqList faq={t.faq} />
      </Section>

      <FinalCTA />
    </>
  );
}
