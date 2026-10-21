import { Link } from "@tanstack/react-router";
import { url } from "@/config/site";
import { MaskReveal, Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { AREA_SERVED, CONTACT, hasWhatsapp, whatsappUrl } from "@/config/contact";
import { BRAND, withBrand } from "@/config/brand";
import { orgRef, pageHead } from "@/lib/seo";
import { EASE_RESPOND, MOTION } from "@/config/motion";
import { MAD, PACKS, formatDirham, formatEuro, withOffer } from "@/config/pricing";
import {
  aLaCarteFor,
  customFor,
  launchOfferFor,
  madNoteFor,
  notIncludedFor,
  packsFor,
} from "@/content/localized";
import { localePath, useLocale, type Locale } from "@/lib/i18n";

/**
 * ULTRA VISION — page Tarifs.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/routes/tarifs.tsx
 *  Accessible a l'adresse /tarifs
 * ============================================================
 *
 * TOUS LES MONTANTS VIENNENT DE src/config/pricing.ts.
 * Cette page ne contient aucun chiffre en dur : changer un prix se
 * fait dans le fichier de configuration, jamais ici.
 *
 * L'ARGUMENT DE LA PAGE
 *
 * Ce n'est pas « nos prix sont bas ». C'est « vous savez ce que vous
 * payez ». Sur ce marche, l'inquietude du prospect n'est presque
 * jamais le montant : c'est de decouvrir en cours de route qu'il
 * manquait une ligne.
 *
 * D'ou trois partis pris qui structurent toute la page :
 *
 * 1. LA SECTION « CE QUI N'EST JAMAIS COMPRIS » EST MISE EN AVANT, et
 *    non reléguee en note de bas de page. Le budget publicitaire, les
 *    intervenants externes, les abonnements : tout est dit avant la
 *    signature. C'est la section la plus rentable de la page, parce
 *    que c'est celle qui evite les ruptures au deuxieme mois.
 *
 * 2. LE DETAIL A L'UNITE EST PUBLIE SOUS LES FORMULES. Un pack dont on
 *    ne peut pas recomposer le calcul est une boite noire. Publier le
 *    prix unitaire prouve que la remise de volume est reelle.
 *
 * 3. LE « SUR DEVIS » ARRIVE EN DERNIER, avec un delai annonce. Un
 *    « nous consulter » sans engagement de delai est lu comme un
 *    refus de repondre.
 *
 * DEUX LANGUES, UNE SEULE PAGE : le texte vient de `copy(locale)`, les
 * formules, prestations et mentions de `@/content/localized` (repli sur
 * le francais tant qu'une traduction manque). Les routes /tarifs et
 * /en/pricing affichent ce composant.
 */

const PATH = "/tarifs";

/*
  Declaree AVANT la route, et non plus en bas du fichier.

  Ces questions servent maintenant deux fois : a l'affichage, et dans
  les donnees structurees FAQPage generees dans `head()`. Les garder
  plus bas fonctionnerait — `head()` n'est appele qu'au rendu — mais
  une constante lue par une fonction ecrite trois cents lignes plus
  haut est exactement le genre de dependance qu'on casse sans s'en
  rendre compte en reorganisant un fichier.
*/
function copy(l: Locale) {
  const d = (eur: number) => formatDirham(eur, l);
  const e = (eur: number) => formatEuro(eur, l);
  const essai = PACKS.find((p) => p.id === "essai")!.price;

  if (l === "en") {
    return {
      title: withBrand("Pricing: video, advertising and websites"),
      description: `${BRAND.name}'s public prices: a video trial at ${d(essai)}, ads included, monthly plans and one-off services. No surprises.`,
      ogDescription: "Prices on display, a detailed scope, and the list of what is never included.",
      name: "Pricing",
      serviceName: "Video ad production and customer acquisition",
      serviceType: "Video advertising and media buying",
      catalogName: `${BRAND.name} plans`,
      monthly: "Monthly subscription",
      oneOff: "One-off service",
      faq: [
        {
          q: "Is the ad budget included?",
          a: `No, never. It is paid directly to the platforms from your own account, so it stays entirely yours. Allow ${d(800)} to ${d(1500)} a month (${e(800)} to ${e(1500)}) to start, depending on your industry.`,
        },
        {
          q: "What happens after the 3-month commitment?",
          a: "Work continues month to month, cancellable with 30 days' notice. There is no automatic long-term renewal.",
        },
        {
          q: "Can prices change during an engagement?",
          a: "No. The price agreed on the quote is fixed for the whole engagement. Any service added along the way is covered by a separately priced amendment, approved before the work is done.",
        },
        {
          q: "Who owns the videos and the accounts?",
          a: "You do. Source files delivered, ad accounts opened in your name, full admin access. If we stop working together, you leave with everything.",
        },
        {
          q: "How does payment work?",
          a: "Monthly plans are paid at the start of the month. One-off services: 50% on order and 50% on delivery.",
        },
      ],
      eyebrow: "Pricing",
      h1a: "Prices on display,",
      h1b: "no surprises.",
      intro:
        "Everything is written down: what is included, what isn't, and the price of each service on its own. You can redo the maths yourself.",
      note: "Amounts in dirhams, excluding tax. The ad budget is never included.",
      madNote: (n: string) => `Dirham amounts are ${n}.`,
      featured: "Most popular",
      firstOrder: (full: string) => `Price of your first order. ${full} after that.`,
      anchorText: "paying for each service separately",
      save: (x: string) => `— you save ${x}`,
      notEyebrow: "Transparency",
      notTitle: "What is never included.",
      notText:
        "This list is here so that no line item surprises you in the second month. It is the part of the page we suggest you read first.",
      carteEyebrow: "À la carte",
      carteTitle: "The price of each service, on its own.",
      carteText:
        "Published for a simple reason: you can redo the maths and check that the volume discount on the plans is real.",
      from: "from",
      offerNote: "The discount applies to your first order, whether a plan or a one-off service.",
      customEyebrow: "Custom quote",
      writeUs: "Email us",
      faqEyebrow: "Questions",
      faqTitle: "Before you decide.",
    };
  }

  return {
    title: withBrand("Tarifs : vidéo, publicité et sites web"),
    description: `Prix publics d'${BRAND.name} : essai vidéo à ${d(essai)}, diffusion comprise, formules mensuelles et prestations à l'unité. Aucune surprise.`,
    ogDescription:
      "Des prix affichés, un périmètre détaillé, et la liste de ce qui n'est jamais compris.",
    name: "Tarifs",
    serviceName: "Production de vidéos publicitaires et acquisition",
    serviceType: "Publicité vidéo et media buying",
    catalogName: `Formules ${BRAND.name}`,
    monthly: "Abonnement mensuel",
    oneOff: "Prestation unique",
    faq: [
      {
        q: "Le budget publicitaire est-il compris ?",
        a: `Non, jamais. Il est versé directement aux plateformes depuis votre compte, ce qui vous en laisse la pleine propriété. Comptez ${d(800)} à ${d(1500)} par mois (800 à 1 500 €) pour démarrer, selon votre secteur.`,
      },
      {
        q: "Que se passe-t-il après les 3 mois d'engagement ?",
        a: "L'accompagnement continue au mois, résiliable avec un préavis de 30 jours. Il n'y a pas de reconduction longue automatique.",
      },
      {
        q: "Les prix peuvent-ils changer en cours de mission ?",
        a: "Non. Le prix validé au devis est ferme pour toute la durée de la mission. Une prestation ajoutée en cours de route fait l'objet d'un avenant chiffré à part, accepté avant d'être exécuté.",
      },
      {
        q: "À qui appartiennent les vidéos et les comptes ?",
        a: "À vous. Fichiers sources livrés, comptes publicitaires ouverts à votre nom, accès administrateur complet. Si nous arrêtons de travailler ensemble, vous repartez avec tout.",
      },
      {
        q: "Comment se passe le règlement ?",
        a: "Les formules mensuelles sont réglées en début de mois. Les prestations à l'unité, 50 % à la commande et 50 % à la livraison.",
      },
    ],
    eyebrow: "Tarifs",
    h1a: "Des prix affichés,",
    h1b: "aucune surprise.",
    intro:
      "Tout est écrit : ce qui est compris, ce qui ne l'est pas, et le prix de chaque prestation prise séparément. Vous pouvez refaire le calcul vous-même.",
    note: "Montants en dirhams hors taxes. Le budget publicitaire n'est jamais inclus.",
    madNote: (n: string) => `Les montants en dirhams sont ${n}.`,
    featured: "Le plus choisi",
    firstOrder: (full: string) => `Prix de la première commande. ${full} ensuite.`,
    anchorText: "en payant chaque prestation à l'unité",
    save: (x: string) => `— vous économisez ${x}`,
    notEyebrow: "Transparence",
    notTitle: "Ce qui n'est jamais compris.",
    notText:
      "Cette liste est là pour qu'aucune ligne ne vous surprenne au deuxième mois. C'est la partie de la page que nous vous conseillons de lire en premier.",
    carteEyebrow: "À la carte",
    carteTitle: "Le prix de chaque prestation, prise séparément.",
    carteText:
      "Publié pour une raison simple : vous pouvez refaire le calcul et vérifier que la remise de volume des formules est réelle.",
    from: "à partir de",
    offerNote: "La remise s'applique à votre première commande, formule ou prestation à l'unité.",
    customEyebrow: "Sur devis",
    writeUs: "Nous écrire",
    faqEyebrow: "Questions",
    faqTitle: "Avant de vous décider.",
  };
}

type Copy = ReturnType<typeof copy>;

/** Les balises de la page, dans la langue demandee. */
export function pricingHead(locale: Locale) {
  const t = copy(locale);
  return pageHead({
    locale,
    path: PATH,
    title: t.title,
    description: t.description,
    ogDescription: t.ogDescription,
    breadcrumbs: [{ name: t.name, path: PATH }],
    faq: t.faq,
    nodes: [
      /*
        CATALOGUE D'OFFRES — le balisage le plus utile du site.

        « Combien coute une video publicitaire » se pose autant a un
        assistant qu'a Google. Un assistant qui trouve un prix ecrit en
        clair dans les donnees structurees le cite.

        Les montants viennent de pricing.ts : ils ne peuvent pas diverger
        de l'ecran. L'euro fait foi au devis ; le dirham affiche est
        declare a cote, arrondi comme a l'ecran.
      */
      {
        "@type": "Service",
        "@id": `${url(PATH)}#offres`,
        name: t.serviceName,
        serviceType: t.serviceType,
        provider: orgRef,
        areaServed: AREA_SERVED,
        availableLanguage: ["French", "English"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.catalogName,
          itemListElement: packsFor(locale).map((p) => ({
            "@type": "Offer",
            name: p.name,
            description: p.forWho,
            price: p.price,
            priceCurrency: "EUR",
            priceSpecification: [
              {
                "@type": "UnitPriceSpecification",
                price: p.price,
                priceCurrency: "EUR",
                valueAddedTaxIncluded: false,
                ...(p.period ? { unitText: "MONTH" } : {}),
              },
              {
                "@type": "UnitPriceSpecification",
                price: Math.round((p.price * MAD.rate) / 100) * 100,
                priceCurrency: "MAD",
                valueAddedTaxIncluded: false,
                ...(p.period ? { unitText: "MONTH" } : {}),
              },
            ],
            category: p.period ? t.monthly : t.oneOff,
            url: url(localePath(PATH, locale)),
          })),
        },
      },
    ],
  });
}

/* ========================================================================== */

export function PricingPage() {
  const locale = useLocale();
  const t = copy(locale);
  return (
    <>
      <Head t={t} locale={locale} />
      <Packs t={t} locale={locale} />
      <NotIncluded t={t} locale={locale} />
      <Carte t={t} locale={locale} />
      <Custom t={t} locale={locale} />
      <Faq t={t} />
    </>
  );
}

type Props = { t: Copy; locale: Locale };

/* -------------------------------------------------------------------------- */

function Head({ t, locale }: Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="shell pt-36 pb-12 lg:pt-40 lg:pb-14">
        <Reveal immediate>
          <p className="eyebrow" style={{ color: "#3B82F6" }}>
            {t.eyebrow}
          </p>
        </Reveal>

        <h1 className="display mt-5 max-w-3xl text-[2.2rem] leading-[1.02] tracking-[-0.035em] sm:text-[3rem] lg:text-[3.6rem]">
          <MaskReveal delay={80} immediate>
            {t.h1a}
          </MaskReveal>
          <MaskReveal delay={165} immediate>
            <span
              style={{
                background: "linear-gradient(96deg, #60A5FA 0%, #3B82F6 48%, #1D4ED8 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {t.h1b}
            </span>
          </MaskReveal>
        </h1>

        <Reveal delay={280} immediate>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.intro}
          </p>
        </Reveal>

        <Reveal delay={340} immediate>
          <p className="mt-4 text-sm text-[#797976]">
            {t.note}
            {MAD.enabled && <> {t.madNote(madNoteFor(locale))}</>}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function OfferBadge({ locale, className = "" }: { locale: Locale; className?: string }) {
  const offer = launchOfferFor(locale);
  if (!offer.enabled) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.62rem] font-medium tracking-[0.1em] uppercase ${className}`}
      style={{
        backgroundColor: "rgba(59,130,246,.14)",
        border: "1px solid rgba(96,165,250,.4)",
        color: "#93C5FD",
      }}
    >
      <span
        aria-hidden="true"
        className="h-1 w-1 rounded-full"
        style={{ backgroundColor: "#60A5FA" }}
      />
      {offer.badge}
    </span>
  );
}

function Packs({ t, locale }: Props) {
  const offer = launchOfferFor(locale);
  const d = (n: number) => formatDirham(n, locale);
  return (
    <section className="rule bg-background">
      <div className="shell py-16 lg:py-20">
        {offer.enabled && (
          <Reveal>
            <div className="mb-10 flex flex-wrap items-center gap-3">
              <OfferBadge locale={locale} />
              {offer.until && <span className="text-[0.74rem] text-[#797976]">{offer.until}</span>}
            </div>
          </Reveal>
        )}

        <div className="grid gap-4 lg:grid-cols-3">
          {packsFor(locale).map((p, i) => {
            const full = p.price;
            const now = p.noOffer ? p.price : withOffer(p.price);
            const reduced = offer.enabled && now !== full;

            return (
              <Reveal key={p.id} delay={i * MOTION.stagger} className="h-full">
                <article
                  className="relative flex h-full flex-col rounded-3xl p-7 sm:p-8"
                  style={{
                    backgroundColor: p.featured ? "#0B1020" : "#0E0E0E",
                    /*
                      La formule recommandee est la seule a porter une
                      bordure bleue de 2 px. Toute autre difference —
                      taille, ombre portee, decalage vertical — casserait
                      l'alignement des trois colonnes et donnerait
                      l'impression d'un bug de mise en page.
                    */
                    border: p.featured ? "2px solid #2563EB" : "1px solid #262626",
                    boxShadow: p.featured
                      ? "0 30px 70px -30px rgba(37,99,235,.5), 0 0 0 1px rgba(59,130,246,.12)"
                      : "none",
                  }}
                >
                  {p.featured && (
                    <span
                      className="absolute -top-3 left-7 rounded-full px-3 py-1 text-[0.6rem] font-medium tracking-[0.14em] uppercase"
                      style={{ backgroundColor: "#2563EB", color: "#fff" }}
                    >
                      {t.featured}
                    </span>
                  )}

                  <h2 className="display text-2xl">{p.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.forWho}</p>

                  {/* --- Le prix --- */}
                  <div className="mt-7 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className="display text-[2.6rem] leading-none tracking-[-0.03em]">
                      {d(now)}
                    </span>
                    {p.period && <span className="text-sm text-muted-foreground">{p.period}</span>}
                    {reduced && (
                      <span
                        className="text-sm text-[#797976]"
                        style={{ textDecoration: "line-through" }}
                      >
                        {d(full)}
                      </span>
                    )}
                  </div>
                  {reduced && (
                    <p className="mt-1.5 text-[0.72rem] text-[#93C5FD]">{t.firstOrder(d(full))}</p>
                  )}

                  {/*
                    L'EQUIVALENT EN EUROS, EN PETIT SOUS LE PRIX.

                    Le dirham est passe en gros a la demande de
                    l'agence. L'euro reste affiche dessous, et ce n'est
                    pas une politesse : neuf clients sur dix sont des
                    expatries francophones. C'est en euros qu'ils
                    comparent a ce qu'ils payaient en France, ou une
                    video publicitaire coute 1 500 a 3 000 € — un ecart
                    qui joue en notre faveur et qui disparaitrait si le
                    montant en euros n'apparaissait plus nulle part.
                  */}
                  <p className="mt-1.5 text-[0.76rem] text-[#707d9d]">
                    ≈ {formatEuro(now, locale)}
                    {p.period ? ` ${p.period}` : ""}
                  </p>

                  {/*
                    LA DECOMPOSITION.

                    « 1 490 € par mois » se subit en bloc. « soit 372 €
                    la video » se compare a ce que le lecteur connait.
                    Un prix comparable parait toujours plus juste qu'un
                    prix global — et le visiteur peut verifier lui-meme
                    avec les tarifs unitaires publies plus bas.
                  */}
                  {p.equivalent && (
                    <p className="mt-2 text-[0.78rem] text-[#8792ad]">{p.equivalent}</p>
                  )}

                  {/*
                    L'ANCRAGE.

                    Le meme perimetre paye a l'unite. Chaque ligne du
                    calcul est publiee dans la section « a la carte » :
                    l'economie est verifiable, donc credible.
                  */}
                  {p.anchor && p.anchor > full && (
                    <p className="mt-3 text-[0.78rem] text-[#707d9d]">
                      <span style={{ textDecoration: "line-through" }}>{d(p.anchor)}</span>{" "}
                      {t.anchorText}{" "}
                      <span className="text-[#93C5FD]">{t.save(d(p.anchor - full))}</span>
                    </p>
                  )}

                  {/* --- Engagement et delai --- */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span
                      className="rounded-full px-3 py-1.5 text-[0.68rem] text-[#c8c8c6]"
                      style={{ border: "1px solid #262626" }}
                    >
                      {p.commitment}
                    </span>
                    {p.delay && (
                      <span
                        className="rounded-full px-3 py-1.5 text-[0.68rem] text-[#c8c8c6]"
                        style={{ border: "1px solid #262626" }}
                      >
                        {p.delay}
                      </span>
                    )}
                  </div>

                  {/* --- Le detail --- */}
                  <ul className="mt-7 space-y-3 border-t border-hairline pt-7 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3 text-[#c2c2c0]">
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                          style={{ backgroundColor: p.featured ? "#60A5FA" : "#4a4a48" }}
                        />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                    {p.bonus && (
                      <li className="flex gap-3 font-medium" style={{ color: "#93C5FD" }}>
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                          style={{ backgroundColor: "#60A5FA" }}
                        />
                        <span className="leading-relaxed">{p.bonus}</span>
                      </li>
                    )}
                  </ul>

                  <div className="mt-8 pt-2">
                    <Magnetic strength={0.18} radius={80}>
                      <Link
                        to={localePath("/contact", locale)}
                        className="inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-xs font-medium tracking-[0.12em] uppercase"
                        style={{
                          backgroundColor: p.featured ? "#2563EB" : "#F5F5F3",
                          color: p.featured ? "#fff" : "#090909",
                          transition: `background-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                        }}
                      >
                        {p.cta}
                      </Link>
                    </Magnetic>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function NotIncluded({ t, locale }: Props) {
  return (
    <section className="rule bg-surface">
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1fr_1.4fr] lg:py-20">
        <Reveal>
          <div>
            <p className="eyebrow">{t.notEyebrow}</p>
            <h2 className="display mt-5 text-3xl sm:text-4xl">{t.notTitle}</h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t.notText}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-2 sm:grid-cols-2">
          {notIncludedFor(locale).map((n, i) => (
            <Reveal key={n.label} delay={i * MOTION.stagger}>
              <div
                className="h-full rounded-2xl p-5"
                style={{ backgroundColor: "#0E0E0E", border: "1px solid #262626" }}
              >
                <h3 className="text-[0.95rem] font-medium">{n.label}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{n.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Carte({ t, locale }: Props) {
  const offer = launchOfferFor(locale);
  return (
    <section className="rule bg-background">
      <div className="shell py-16 lg:py-20">
        <Reveal>
          <p className="eyebrow">{t.carteEyebrow}</p>
          <h2 className="display mt-5 max-w-2xl text-3xl sm:text-4xl">{t.carteTitle}</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t.carteText}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-14 gap-y-12 lg:grid-cols-2">
          {aLaCarteFor(locale).map((g, gi) => (
            <Reveal key={g.group} delay={gi * MOTION.stagger}>
              <div>
                <p className="text-[0.68rem] font-medium tracking-[0.16em] uppercase text-accent">
                  {g.group}
                </p>

                <div className="mt-5 border-t border-hairline">
                  {g.items.map((it) => {
                    const now = withOffer(it.price);
                    const reduced = offer.enabled && now !== it.price;

                    return (
                      <div
                        key={it.label}
                        className="group grid grid-cols-[1fr_auto] items-baseline gap-6 border-b border-hairline py-5 transition-colors"
                        style={{
                          transition: `background-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                        }}
                      >
                        <div className="min-w-0">
                          <h3 className="text-[0.95rem] font-medium">{it.label}</h3>
                          <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted-foreground">
                            {it.detail}
                          </p>
                        </div>

                        <div className="text-right whitespace-nowrap">
                          {it.from && (
                            <span className="mr-1 text-[0.7rem] text-muted-foreground">
                              {t.from}
                            </span>
                          )}
                          <span className="display text-[1.25rem]">
                            {formatDirham(now, locale)}
                          </span>
                          {it.unit && (
                            <span className="ml-1 text-[0.72rem] text-muted-foreground">
                              {it.unit}
                            </span>
                          )}
                          {reduced && (
                            <p
                              className="mt-0.5 text-[0.72rem] text-[#797976]"
                              style={{ textDecoration: "line-through" }}
                            >
                              {formatDirham(it.price, locale)}
                            </p>
                          )}
                          <p className="mt-0.5 text-[0.68rem] text-[#7b88a6]">
                            ≈ {formatEuro(now, locale)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {offer.enabled && (
          <Reveal delay={120}>
            <div className="mt-10">
              <OfferBadge locale={locale} />
              <p className="mt-3 text-[0.78rem] text-[#797976]">
                {t.offerNote} {offer.until}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Custom({ t, locale }: Props) {
  const custom = customFor(locale);
  return (
    <section className="rule bg-background">
      <div className="shell py-16 lg:py-20">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl p-8 sm:p-12"
            style={{
              background:
                "radial-gradient(120% 130% at 12% 0%, #1E3A8A 0%, #0B1226 46%, #0A0A0A 82%)",
              border: "1px solid #1c2946",
            }}
          >
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <div>
                <p className="eyebrow" style={{ color: "#93C5FD" }}>
                  {t.customEyebrow}
                </p>
                <h2 className="display mt-5 max-w-lg text-3xl sm:text-4xl">{custom.title}</h2>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#a9bad8]">
                  {custom.text}
                </p>
              </div>

              <div>
                <ul className="space-y-3 text-sm">
                  {custom.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[#cddafc]">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: "#60A5FA" }}
                      />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Magnetic strength={0.2} radius={90}>
                    <Link
                      to={localePath("/contact", locale)}
                      className="inline-flex h-12 items-center rounded-full bg-foreground px-7 text-xs font-medium tracking-[0.12em] uppercase text-background"
                      style={{ transition: `background-color ${MOTION.respond}ms ${EASE_RESPOND}` }}
                    >
                      {custom.cta}
                    </Link>
                  </Magnetic>

                  {hasWhatsapp ? (
                    <a
                      href={whatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center rounded-full px-7 text-xs font-medium tracking-[0.12em] uppercase text-foreground"
                      style={{
                        border: "1px solid #2b4880",
                        transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                      }}
                    >
                      WhatsApp
                    </a>
                  ) : (
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="inline-flex h-12 items-center rounded-full px-7 text-xs font-medium tracking-[0.12em] uppercase text-foreground"
                      style={{ border: "1px solid #2b4880" }}
                    >
                      {t.writeUs}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Faq({ t }: { t: Copy }) {
  return (
    <section className="rule bg-surface">
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1fr_1.4fr] lg:py-20">
        <Reveal>
          <div>
            <p className="eyebrow">{t.faqEyebrow}</p>
            <h2 className="display mt-5 text-3xl sm:text-4xl">{t.faqTitle}</h2>
          </div>
        </Reveal>

        <div className="border-t border-hairline">
          {t.faq.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <div className="border-b border-hairline py-6">
                <h3 className="text-[0.98rem] font-medium">{f.q}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
