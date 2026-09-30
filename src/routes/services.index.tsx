import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { ArrowLink, LinkCards, Section, SectionIntro } from "@/components/page/Blocks";
import { PACKS, euro, dirham, withOffer, LAUNCH_OFFER } from "@/config/pricing";
import { EASE_RESPOND, MOTION } from "@/config/motion";
import { BRAND, withBrand } from "@/config/brand";
import { url } from "@/config/site";
import { POLES, SERVICES, servicePath, servicesOf } from "@/content/services";
import { SECTORS, sectorPath } from "@/content/sectors";
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
 */

const TITLE = withBrand(`Services de marketing digital à ${BRAND.city}`);
const DESCRIPTION =
  "Vidéo et photo, Meta, Google et TikTok Ads, génération de leads, sites web, branding, CRM et IA : les huit services d'UltraVision Agency, basée à Marrakech.";

export const Route = createFileRoute("/services/")({
  component: Services,
  head: () =>
    pageHead({
      path: "/services",
      title: TITLE,
      description: DESCRIPTION,
      pageType: "CollectionPage",
      breadcrumbs: [{ name: "Services", path: "/services" }],
      mainEntity: { "@id": `${url("/services")}#liste` },
      nodes: [
        {
          "@type": "ItemList",
          "@id": `${url("/services")}#liste`,
          name: `Services ${BRAND.name}`,
          numberOfItems: SERVICES.length,
          itemListElement: SERVICES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.name,
            url: url(servicePath(s.slug)),
            item: { "@id": serviceId(s.slug) },
          })),
        },
      ],
    }),
});

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Tout ce qui fait grandir une marque, par une seule équipe."
        accent="par une seule équipe"
        intro="UltraVision Agency réunit quatre pôles — marque et contenu, acquisition, web et applications, IA et automatisation — dans une seule équipe basée à Marrakech. La création et la diffusion sont faites par les mêmes personnes : c'est ce qui permet de corriger une campagne en changeant la vidéo, et non en changeant d'agence."
        breadcrumbs={[{ name: "Services", path: "/services" }]}
      />

      {/* ---------------- Les quatre poles ---------------- */}
      <section className="rule bg-background" aria-label="Les quatre pôles">
        <div className="shell py-16 lg:py-24">
          <div className="grid gap-4 lg:grid-cols-2">
            {POLES.map((p, i) => (
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
                            to={servicePath(s.slug)}
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
                <h2 className="display text-xl sm:text-2xl">Stratégie digitale &amp; accompagnement 360</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Diagnostic, stratégie, production et croissance : pour les projets qui ne
                  rentrent dans aucune formule, chiffrés sur devis.
                </p>
              </div>
              <ArrowLink to="/methode">La méthode</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Les formules, tirees de pricing.ts ---------------- */}
      <section className="rule bg-surface">
        <div className="shell py-16 lg:py-24">
          <Reveal>
            <p className="eyebrow" style={{ color: "#60A5FA" }}>
              Formules
            </p>
            <h2 className="display mt-5 max-w-2xl text-3xl sm:text-4xl">
              Trois façons de travailler ensemble.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Le détail complet, les prestations à l&apos;unité et ce qui n&apos;est jamais
              compris se trouvent sur la page tarifs.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {PACKS.map((t, i) => {
              const now = t.noOffer ? t.price : withOffer(t.price);
              const reduced = LAUNCH_OFFER.enabled && now !== t.price;

              return (
                <Reveal key={t.id} delay={i * MOTION.stagger} className="h-full">
                  <div
                    className="flex h-full flex-col justify-between rounded-3xl p-7"
                    style={{
                      backgroundColor: t.featured ? "#0B1020" : "#0E0E0E",
                      border: t.featured ? "2px solid #2563EB" : "1px solid #262626",
                    }}
                  >
                    <div>
                      <h3 className="display text-2xl">{t.name}</h3>

                      <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="display text-[1.9rem] leading-none">{dirham(now)}</span>
                        {t.period && (
                          <span className="text-sm text-muted-foreground">{t.period}</span>
                        )}
                        {reduced && (
                          <span
                            className="text-[0.8rem] text-[#797976]"
                            style={{ textDecoration: "line-through" }}
                          >
                            {dirham(t.price)}
                          </span>
                        )}
                      </div>

                      {/*
                        L'equivalent en euros, en petit. Les clients
                        expatries comparent a ce qu'ils payaient en France.
                      */}
                      <p className="mt-1.5 text-[0.74rem] text-[#707d9d]">
                        ≈ {euro(now)}
                        {t.period ? ` ${t.period}` : ""}
                      </p>

                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                        {t.forWho}
                      </p>

                      <p className="mt-4 text-[0.72rem] tracking-[0.1em] uppercase text-[#707d9d]">
                        {t.commitment}
                      </p>
                    </div>

                    <Link to="/tarifs" className="link-underline mt-9 text-sm text-accent-hover">
                      Voir le détail
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
        <SectionIntro
          eyebrow="Par secteur"
          title="Les mêmes services, appliqués à votre métier."
          text="Les secteurs où nos réalisations sont les plus nombreuses ont chacun leur page : ce qui y fait vendre, et ce que nous y avons produit."
        />
        <LinkCards
          items={SECTORS.map((s) => ({
            to: sectorPath(s.slug),
            eyebrow: "Secteur",
            title: s.name,
            text: s.challenges.map((c) => c.title).join(" · "),
          }))}
        />
      </Section>

      <FinalCTA />
    </>
  );
}
