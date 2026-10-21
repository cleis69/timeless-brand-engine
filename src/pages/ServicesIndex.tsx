import { Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { ArrowLink, LinkCards, Section, SectionIntro } from "@/components/page/Blocks";
import { formatDirham, formatEuro, withOffer, LAUNCH_OFFER } from "@/config/pricing";
import { EASE_RESPOND, MOTION } from "@/config/motion";
import { BRAND, withBrand } from "@/config/brand";
import { url } from "@/config/site";
import { servicePath } from "@/content/services";
import { sectorPath } from "@/content/sectors";
import { packsFor, polesFor, sectorsFor, servicesFor } from "@/content/localized";
import { localePath, useLocale, type Locale } from "@/lib/i18n";
import { pageHead, serviceId } from "@/lib/seo";

/**
 * UltraVision Agency — page Services : l'entree vers les huit services.
 *
 * ============================================================
 *  UNE PAGE-CARREFOUR, PLUS UNE PAGE-CATALOGUE
 * ============================================================
 *
 * Elle presentait quatre poles decrits par des listes de mots, sans
 * aucun lien : un visiteur interesse par Meta Ads ne pouvait aller nulle
 * part, et Google ne trouvait aucune page a associer a « agence Meta Ads
 * Marrakech ».
 *
 * Les quatre poles restent, avec le meme dessin. Chaque service y
 * devient un lien vers sa page, et toute la liste vient de
 * src/content/services.ts — la meme que l'accueil, le pied de page et
 * le formulaire de contact.
 *
 * Les formules, tirees de pricing.ts, restent en bas : une seule source
 * de prix, donc aucune divergence possible avec /tarifs.
 *
 * DEUX LANGUES, UNE SEULE PAGE : le texte fixe vient de `copy(locale)`,
 * les contenus de src/content/localized.ts. Les routes /services et
 * /en/services affichent ce composant.
 */

const PATH = "/services";

function copy(l: Locale) {
  if (l === "en") {
    return {
      title: withBrand(`Digital marketing services in ${BRAND.city}`),
      description:
        "Video and photo, Meta, Google and TikTok Ads, lead generation, websites, branding, CRM and AI: the eight services of UltraVision Agency, based in Marrakech.",
      crumb: "Services",
      listName: `${BRAND.name} services`,
      eyebrow: "Services",
      h1: "Everything that grows a brand, from a single team.",
      accent: "from a single team",
      intro:
        "UltraVision Agency brings four practices together — brand and content, acquisition, web and apps, AI and automation — in a single team based in Marrakech. The same people create and run the campaigns: that is what lets us fix a campaign by changing the video, not by changing agency.",
      polesLabel: "The four practices",
      strategyTitle: "Digital strategy & 360 support",
      strategyText:
        "Audit, strategy, production and growth: for projects that fit no plan, quoted on request.",
      method: "Our method",
      packsEyebrow: "Plans",
      packsTitle: "Three ways to work together.",
      packsText:
        "The full detail, the one-off services and what is never included are on the pricing page.",
      packLink: "See the detail",
      sectorsEyebrow: "By industry",
      sectorsTitle: "The same services, applied to your trade.",
      sectorsText:
        "The industries where we have the most work each have their own page: what sells there, and what we have produced.",
      sectorCard: "Industry",
    };
  }
  return {
    title: withBrand(`Services de marketing digital à ${BRAND.city}`),
    description:
      "Vidéo et photo, Meta, Google et TikTok Ads, génération de leads, sites web, branding, CRM et IA : les huit services d'UltraVision Agency, basée à Marrakech.",
    crumb: "Services",
    listName: `Services ${BRAND.name}`,
    eyebrow: "Services",
    h1: "Tout ce qui fait grandir une marque, par une seule équipe.",
    accent: "par une seule équipe",
    intro:
      "UltraVision Agency réunit quatre pôles — marque et contenu, acquisition, web et applications, IA et automatisation — dans une seule équipe basée à Marrakech. La création et la diffusion sont faites par les mêmes personnes : c'est ce qui permet de corriger une campagne en changeant la vidéo, et non en changeant d'agence.",
    polesLabel: "Les quatre pôles",
    strategyTitle: "Stratégie digitale & accompagnement 360",
    strategyText:
      "Diagnostic, stratégie, production et croissance : pour les projets qui ne rentrent dans aucune formule, chiffrés sur devis.",
    method: "La méthode",
    packsEyebrow: "Formules",
    packsTitle: "Trois façons de travailler ensemble.",
    packsText:
      "Le détail complet, les prestations à l'unité et ce qui n'est jamais compris se trouvent sur la page tarifs.",
    packLink: "Voir le détail",
    sectorsEyebrow: "Par secteur",
    sectorsTitle: "Les mêmes services, appliqués à votre métier.",
    sectorsText:
      "Les secteurs où nos réalisations sont les plus nombreuses ont chacun leur page : ce qui y fait vendre, et ce que nous y avons produit.",
    sectorCard: "Secteur",
  };
}

/** Les balises de la page, dans la langue demandee. */
export function servicesIndexHead(locale: Locale) {
  const t = copy(locale);
  const services = servicesFor(locale);
  const href = url(localePath(PATH, locale));
  return pageHead({
    locale,
    path: PATH,
    title: t.title,
    description: t.description,
    pageType: "CollectionPage",
    breadcrumbs: [{ name: t.crumb, path: PATH }],
    mainEntity: { "@id": `${href}#liste` },
    nodes: [
      {
        "@type": "ItemList",
        "@id": `${href}#liste`,
        name: t.listName,
        numberOfItems: services.length,
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.name,
          url: url(localePath(servicePath(s.slug), locale)),
          item: { "@id": serviceId(s.slug) },
        })),
      },
    ],
  });
}

export function ServicesIndexPage() {
  const locale = useLocale();
  const lp = (p: string) => localePath(p, locale);
  const t = copy(locale);
  const services = servicesFor(locale);
  const servicesOf = (pole: string) =>
    polesFor(locale)
      .find((p) => p.id === pole)!
      .services.map((k) => services.find((s) => s.slug === k)!);

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.h1}
        accent={t.accent}
        intro={t.intro}
        breadcrumbs={[{ name: t.crumb, path: lp(PATH) }]}
      />

      {/* ---------------- Les quatre poles ---------------- */}
      <section className="rule bg-background" aria-label={t.polesLabel}>
        <div className="shell py-16 lg:py-24">
          <div className="grid gap-4 lg:grid-cols-2">
            {polesFor(locale).map((p, i) => (
              <Reveal key={p.id} delay={i * MOTION.stagger} className="h-full">
                <article
                  className="group relative h-full overflow-hidden rounded-3xl p-7 sm:p-9"
                  style={{
                    backgroundColor: "#0B1020",
                    border: "1px solid #16203a",
                    transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                  }}
                >
                  {/*
                    Lueur bleue qui monte du bas au survol. Une couche
                    superposee dont on anime l'opacite : animer la couleur
                    de fond ferait passer la transition par des gris sales.
                  */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(120% 90% at 50% 130%, rgba(37,99,235,.34) 0%, transparent 68%)",
                    }}
                  />

                  <div className="relative">
                    <span className="text-[0.68rem] tracking-[0.2em] text-accent">{p.n}</span>
                    <h2 className="display mt-5 text-2xl sm:text-3xl">{p.title}</h2>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-[#8792ad]">{p.text}</p>

                    <ul className="mt-7 text-sm">
                      {servicesOf(p.id).map((s) => (
                        <li key={s.slug} className="border-t border-[#16203a]">
                          <Link
                            to={lp(servicePath(s.slug))}
                            className="group/item flex items-center justify-between gap-4 py-3.5 text-[#c3cde3] transition-colors duration-200 hover:text-white"
                          >
                            <span className="flex gap-3">
                              <span
                                aria-hidden="true"
                                className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                                style={{ backgroundColor: "#3B82F6" }}
                              />
                              <span>
                                <span className="font-medium">{s.name}</span>
                                <span className="mt-1 block text-[0.8rem] leading-relaxed text-[#8792ad]">
                                  {s.includes.slice(0, 3).join(" · ")}
                                </span>
                              </span>
                            </span>
                            <span
                              aria-hidden="true"
                              className="text-accent-hover transition-transform duration-200 group-hover/item:translate-x-1"
                            >
                              &rarr;
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/*
            La strategie digitale n'est pas un cinquieme pole : c'est ce qui
            les ordonne. Elle a sa page, sur devis.
          */}
          <Reveal delay={200}>
            <div
              className="mt-4 flex flex-col gap-5 rounded-3xl p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9"
              style={{ backgroundColor: "#0E0E0E", border: "1px solid #262626" }}
            >
              <div>
                <h2 className="display text-xl sm:text-2xl">{t.strategyTitle}</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {t.strategyText}
                </p>
              </div>
              <ArrowLink to={lp("/methode")}>{t.method}</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Les formules, tirees de pricing.ts ---------------- */}
      <section className="rule bg-surface">
        <div className="shell py-16 lg:py-24">
          <Reveal>
            <p className="eyebrow" style={{ color: "#60A5FA" }}>
              {t.packsEyebrow}
            </p>
            <h2 className="display mt-5 max-w-2xl text-3xl sm:text-4xl">{t.packsTitle}</h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {t.packsText}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {packsFor(locale).map((p, i) => {
              const now = p.noOffer ? p.price : withOffer(p.price);
              const reduced = LAUNCH_OFFER.enabled && now !== p.price;

              return (
                <Reveal key={p.id} delay={i * MOTION.stagger} className="h-full">
                  <div
                    className="flex h-full flex-col justify-between rounded-3xl p-7"
                    style={{
                      backgroundColor: p.featured ? "#0B1020" : "#0E0E0E",
                      border: p.featured ? "2px solid #2563EB" : "1px solid #262626",
                    }}
                  >
                    <div>
                      <h3 className="display text-2xl">{p.name}</h3>

                      <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="display text-[1.9rem] leading-none">
                          {formatDirham(now, locale)}
                        </span>
                        {p.period && (
                          <span className="text-sm text-muted-foreground">{p.period}</span>
                        )}
                        {reduced && (
                          <span
                            className="text-[0.8rem] text-[#797976]"
                            style={{ textDecoration: "line-through" }}
                          >
                            {formatDirham(p.price, locale)}
                          </span>
                        )}
                      </div>

                      {/*
                        L'equivalent en euros, en petit. Les clients
                        expatries comparent a ce qu'ils payaient en France.
                      */}
                      <p className="mt-1.5 text-[0.74rem] text-[#707d9d]">
                        ≈ {formatEuro(now, locale)}
                        {p.period ? ` ${p.period}` : ""}
                      </p>

                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                        {p.forWho}
                      </p>

                      <p className="mt-4 text-[0.72rem] tracking-[0.1em] uppercase text-[#707d9d]">
                        {p.commitment}
                      </p>
                    </div>

                    <Link
                      to={lp("/tarifs")}
                      className="link-underline mt-9 text-sm text-accent-hover"
                    >
                      {t.packLink}
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Par secteur ---------------- */}
      <Section>
        <SectionIntro eyebrow={t.sectorsEyebrow} title={t.sectorsTitle} text={t.sectorsText} />
        <LinkCards
          items={sectorsFor(locale).map((s) => ({
            to: lp(sectorPath(s.slug)),
            eyebrow: t.sectorCard,
            title: s.name,
            text: s.challenges.map((c) => c.title).join(" · "),
          }))}
        />
      </Section>

      <FinalCTA />
    </>
  );
}
