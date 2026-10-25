import { Link } from "@tanstack/react-router";
import { url } from "@/config/site";
import { BRAND, withBrand } from "@/config/brand";
import { AREA_SERVED } from "@/config/contact";
import { orgRef, pageHead, serviceChannel } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { EASE_RESPOND, MOTION } from "@/config/motion";
import { findArticleFor } from "@/content/localized";
import { localePath, useLocale, type Locale } from "@/lib/i18n";

/**
 * ULTRA VISION — page Accompagnement 360.
 *
 * ============================================================
 *  CE FICHIER REMPLACE src/routes/methode.tsx
 * ============================================================
 *
 * CE QUI NE COLLAIT PLUS
 *
 * La page decrivait un cycle en dix semaines : audit du CRM, entretiens
 * avec la direction et les commerciaux, plateforme de marque, feuille de
 * route a douze mois, transfert de competences aux equipes du client.
 *
 * C'est la methode d'une agence a vingt mille euros. Elle contredisait
 * frontalement la promesse affichee partout ailleurs sur le site :
 * une video livree en sept jours, un essai a 490 €, un engagement de
 * trois mois.
 *
 * Un prospect qui lisait la page d'accueil puis celle-ci n'y comprenait
 * rien — et dans le doute, il partait.
 *
 * CE QUE CETTE PAGE DEVIENT
 *
 * Elle ne decrit plus le cycle de production des formules — celui-ci
 * tient en une ligne sur la page tarifs : sept jours. Elle decrit
 * l'ACCOMPAGNEMENT 360, c'est-a-dire les missions qui ne rentrent dans
 * aucune formule et qui sont chiffrees sur devis.
 *
 * C'est le bon endroit pour une methode detaillee : un prospect qui
 * envisage une mission longue veut savoir comment on travaille avant
 * de demander un prix. Un prospect qui achete une video a 490 € veut
 * juste savoir quand elle arrive.
 *
 * Aucun prix n'est affiche ici, volontairement. Le perimetre varie
 * trop d'une mission a l'autre, et un montant indicatif sur une page
 * de methode serait lu comme un engagement.
 *
 * DEUX LANGUES, UNE SEULE PAGE : le texte vient de `copy(locale)`, la
 * mise en page est commune. Les routes /methode et /en/method affichent
 * ce composant. Le francais est le texte d'origine, inchange.
 */

const PATH = "/methode";
const FUNNEL_SLUG = "tofu-mofu-bofu-video-publicitaire";

/*
  LA STRATEGIE DIGITALE A SA PAGE : CELLE-CI.

  Le brief de l'agence la cite comme un service a part entiere. Elle
  n'avait pas d'adresse : « strategie » n'apparaissait nulle part dans
  un titre. La page garde son contenu et son adresse ; son titre dit
  desormais ce qu'elle est.

  Le balisage HowTo est retire : Google ne l'exploite plus depuis 2023.
  La page est declaree comme un Service, fourni par l'agence.
*/
export function methodHead(locale: Locale) {
  const t = copy(locale);
  return pageHead({
    locale,
    path: PATH,
    title: t.title,
    description: t.description,
    ogDescription: t.ogDescription,
    breadcrumbs: [{ name: t.name, path: PATH }],
    about: { "@id": `${url(PATH)}#service` },
    nodes: [
      {
        "@type": "Service",
        "@id": `${url(PATH)}#service`,
        name: t.serviceName,
        serviceType: t.serviceType,
        description: t.serviceDescription,
        provider: orgRef,
        areaServed: AREA_SERVED,
        availableChannel: serviceChannel(locale),
        url: url(localePath(PATH, locale)),
      },
    ],
  });
}

export const STEPS = [
  {
    n: "01",
    title: "Diagnostic",
    duration: "Semaines 1 et 2",
    text: "Nous regardons ce qui existe déjà : la marque, l'offre, le tunnel, les campagnes passées et ce que disent les chiffres. L'objectif n'est pas de tout refaire, mais de trouver le point de friction qui coûte le plus cher.",
    deliverables: [
      "Audit écrit de la marque et du tunnel",
      "Lecture des données de campagne existantes",
      "Priorisation des chantiers par impact",
    ],
  },
  {
    n: "02",
    title: "Stratégie",
    duration: "Semaines 2 à 4",
    text: "Positionnement, messages, offres mises en avant et plan d'acquisition chiffré par canal. Un document de référence que vos équipes peuvent utiliser sans nous.",
    deliverables: [
      "Positionnement et messages clés",
      "Plan d'acquisition chiffré par canal",
      "Calendrier de production",
    ],
  },
  {
    n: "03",
    title: "Production",
    duration: "Semaines 4 à 10",
    text: "Identité, contenus, site, landing pages et campagnes, produits en cycles courts. Vous validez chaque semaine : il n'y a jamais de mois sans rien voir.",
    deliverables: [
      "Identité et supports de marque",
      "Contenus photo et vidéo",
      "Site, landing pages et suivi des conversions",
    ],
  },
  {
    n: "04",
    title: "Croissance",
    duration: "En continu",
    text: "Diffusion multicanale, automatisation des leads, renouvellement des créations et revue mensuelle avec la direction. C'est la phase la plus longue, et celle où se gagne le coût par rendez-vous.",
    deliverables: [
      "Campagnes pilotées et arbitrées",
      "Automatisation des leads vers votre CRM",
      "Revue mensuelle avec la direction",
    ],
  },
];

export const PRINCIPLES = [
  {
    t: "Un seul interlocuteur",
    d: "La personne qui prend le brief suit votre projet jusqu'à la livraison. Il n'y a pas de chef de projet entre vous et l'équipe qui produit.",
  },
  {
    t: "Tout vous appartient",
    d: "Fichiers sources, comptes publicitaires, données de campagne. Si nous arrêtons de travailler ensemble, vous repartez avec l'ensemble.",
  },
  {
    t: "Le prix ne bouge pas",
    d: "Le montant validé au devis est ferme pour toute la mission. Une prestation ajoutée fait l'objet d'un avenant accepté avant d'être exécutée.",
  },
  {
    t: "On dit quand ça ne marche pas",
    d: "Un rapport qui ne contient que de bonnes nouvelles n'est pas un rapport. Les campagnes qui échouent sont nommées, et on explique pourquoi.",
  },
];

/* ==========================================================================
 *  LA VERSION ANGLAISE
 * ========================================================================== */

const STEPS_EN: typeof STEPS = [
  {
    n: "01",
    title: "Diagnosis",
    duration: "Weeks 1 and 2",
    text: "We look at what already exists: the brand, the offer, the funnel, past campaigns and what the numbers say. The aim is not to redo everything, but to find the point of friction that costs the most.",
    deliverables: [
      "Written audit of the brand and the funnel",
      "Review of existing campaign data",
      "Workstreams prioritised by impact",
    ],
  },
  {
    n: "02",
    title: "Strategy",
    duration: "Weeks 2 to 4",
    text: "Positioning, messages, featured offers and an acquisition plan costed by channel. A reference document your teams can use without us.",
    deliverables: [
      "Positioning and key messages",
      "Acquisition plan costed by channel",
      "Production calendar",
    ],
  },
  {
    n: "03",
    title: "Production",
    duration: "Weeks 4 to 10",
    text: "Identity, content, website, landing pages and campaigns, produced in short cycles. You approve every week: there is never a month without anything to see.",
    deliverables: [
      "Identity and brand assets",
      "Photo and video content",
      "Website, landing pages and conversion tracking",
    ],
  },
  {
    n: "04",
    title: "Growth",
    duration: "Ongoing",
    text: "Multichannel ads, lead automation, refreshed creatives and a monthly review with management. It is the longest phase, and the one where cost per meeting is won.",
    deliverables: [
      "Campaigns managed and budgets reallocated",
      "Lead automation into your CRM",
      "Monthly review with management",
    ],
  },
];

const PRINCIPLES_EN: typeof PRINCIPLES = [
  {
    t: "A single point of contact",
    d: "The person who takes the brief follows your project through to delivery. There is no project manager between you and the team that produces it.",
  },
  {
    t: "Everything belongs to you",
    d: "Source files, ad accounts, campaign data. If we stop working together, you leave with all of it.",
  },
  {
    t: "The price doesn't move",
    d: "The amount approved in the quote is fixed for the whole engagement. Any added service is covered by an amendment, accepted before the work is done.",
  },
  {
    t: "We say when it isn't working",
    d: "A report that contains only good news is not a report. Campaigns that fail are named, and we explain why.",
  },
];

/** Tout le texte de la page, dans la langue demandee. */
function copy(l: Locale) {
  if (l === "en") {
    return {
      name: "Strategy & 360 support",
      title: withBrand("Digital strategy and 360 support"),
      description: `Diagnosis, strategy, production and growth: how ${BRAND.name} runs its 360 support engagements in Marrakech, for projects quoted individually.`,
      ogDescription:
        "For projects beyond our plans: diagnosis, strategy, production and management, costed line by line.",
      serviceName: "Digital strategy and 360 support",
      serviceType: "Digital strategy",
      serviceDescription:
        "The method behind our bespoke engagements: diagnosis, strategy, production and managed growth, quoted individually.",
      eyebrow: "Digital strategy — 360 support",
      h1: "For projects that don't fit any plan.",
      accent: "that don't fit any plan",
      intro:
        "Brand launches, entry into a new market, campaigns running over several months: these engagements are quoted individually. Here is how we run digital strategy and support, step by step.",
      steps: STEPS_EN,
      principles: PRINCIPLES_EN,
      step: "Step",
      delivered: "What is delivered",
      rulesEyebrow: "Our rules",
      rulesTitle: "What we don't compromise on.",
      rulesText:
        "A long engagement depends less on the stated method than on what happens when results are slow to come. These four rules apply for the whole engagement.",
      funnelLink: "How we build a funnel",
    };
  }
  return {
    name: "Stratégie & accompagnement 360",
    title: withBrand("Stratégie digitale et accompagnement 360"),
    description: `Diagnostic, stratégie, production et croissance : la méthode des accompagnements 360 d'${BRAND.name}, à Marrakech, pour les projets établis sur devis.`,
    ogDescription:
      "Pour les projets qui dépassent nos formules : diagnostic, stratégie, production et pilotage, chiffrés ligne par ligne.",
    serviceName: "Stratégie digitale et accompagnement 360",
    serviceType: "Stratégie digitale",
    serviceDescription:
      "La méthode des accompagnements sur mesure : diagnostic, stratégie, production et croissance pilotée, chiffrés sur devis.",
    eyebrow: "Stratégie digitale — Accompagnement 360",
    h1: "Pour les projets qui ne rentrent dans aucune formule.",
    accent: "qui ne rentrent dans aucune formule",
    intro:
      "Lancement de marque, implantation sur un nouveau marché, dispositif sur plusieurs mois : ces missions se chiffrent sur devis. Voici comment nous conduisons la stratégie digitale et l'accompagnement, étape par étape.",
    steps: STEPS,
    principles: PRINCIPLES,
    step: "Étape",
    delivered: "Ce qui est livré",
    rulesEyebrow: "Nos règles",
    rulesTitle: "Ce sur quoi nous ne transigeons pas.",
    rulesText:
      "Un accompagnement long se joue moins sur la méthode affichée que sur ce qui se passe quand les résultats tardent. Ces quatre règles valent pour toute la durée de la mission.",
    funnelLink: "Comment nous construisons un tunnel",
  };
}

export function MethodPage() {
  const locale = useLocale();
  const t = copy(locale);
  const lp = (p: string) => localePath(p, locale);
  /* L'article n'est lie que s'il existe dans la langue de la page. */
  const funnel = findArticleFor(FUNNEL_SLUG, locale);
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.h1}
        accent={t.accent}
        intro={t.intro}
        breadcrumbs={[{ name: t.name, path: lp(PATH) }]}
      />

      {/* ---------------- Les quatre etapes ---------------- */}
      <section className="rule relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 40% at 80% 0%, rgba(59,130,246,.13) 0%, transparent 68%)",
          }}
        />

        <div className="shell relative py-16 lg:py-24">
          <div className="grid gap-4 lg:grid-cols-2">
            {t.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * MOTION.stagger} className="h-full">
                <article
                  tabIndex={0}
                  aria-label={`${t.step} ${s.n} — ${s.title}`}
                  className="group relative h-full overflow-hidden rounded-3xl p-7 outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-9"
                  style={{
                    backgroundColor: "#0B1020",
                    border: "1px solid #16203a",
                    transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}, transform ${MOTION.respond}ms ${EASE_RESPOND}`,
                  }}
                >
                  {/* Lueur bleue qui monte au survol. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                    style={{
                      background:
                        "radial-gradient(120% 90% at 50% 130%, rgba(37,99,235,.3) 0%, transparent 68%)",
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[0.68rem] tracking-[0.2em] text-accent">{s.n}</span>
                      <span
                        className="rounded-full px-3 py-1 text-[0.66rem] text-[#93C5FD]"
                        style={{
                          backgroundColor: "rgba(59,130,246,.1)",
                          border: "1px solid rgba(96,165,250,.24)",
                        }}
                      >
                        {s.duration}
                      </span>
                    </div>

                    <h2 className="display mt-6 text-2xl sm:text-3xl">{s.title}</h2>

                    <p className="mt-4 max-w-md text-sm leading-relaxed text-[#8792ad]">{s.text}</p>

                    <p className="mt-7 text-[0.64rem] font-medium tracking-[0.16em] uppercase text-[#707d9d]">
                      {t.delivered}
                    </p>
                    <ul className="mt-3 space-y-0 text-sm">
                      {s.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex gap-3 border-t border-[#16203a] py-3 text-[#9aa7c2]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                            style={{ backgroundColor: "#3B82F6" }}
                          />
                          <span className="leading-relaxed">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Le rythme mensuel ---------------- */}
      <section className="rule bg-surface">
        <div className="shell grid gap-12 py-16 lg:grid-cols-[1fr_1.2fr] lg:py-20">
          <Reveal>
            <div>
              <p className="eyebrow" style={{ color: "#60A5FA" }}>
                {t.rulesEyebrow}
              </p>
              <h2 className="display mt-5 text-3xl sm:text-4xl">{t.rulesTitle}</h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {t.rulesText}
              </p>
              {funnel && (
                <Link
                  to={lp(`/blog/${funnel.slug}`)}
                  className="group mt-7 inline-flex items-center gap-3 text-[0.76rem] font-semibold tracking-[0.14em] uppercase text-foreground transition-colors duration-200 hover:text-accent-hover"
                >
                  {t.funnelLink}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
              )}
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {t.principles.map((p, i) => (
              <Reveal key={p.t} delay={i * MOTION.stagger} className="h-full">
                <div
                  tabIndex={0}
                  aria-label={`${p.t} — ${p.d}`}
                  className="group h-full rounded-2xl p-5 outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{
                    backgroundColor: "#0B1020",
                    border: "1px solid #16203a",
                    transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                  }}
                >
                  <h3 className="text-[0.95rem] font-medium transition-colors duration-200 group-hover:text-[#93C5FD]">
                    {p.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#8792ad]">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
