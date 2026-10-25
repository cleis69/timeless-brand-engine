import { Link } from "@tanstack/react-router";
import { url } from "@/config/site";
import { BRAND, ORG_ID, withBrand } from "@/config/brand";
import { FOUNDER_ID, pageHead, pageUrl } from "@/lib/seo";
import { LinkCards } from "@/components/page/Blocks";
import { servicePath } from "@/content/services";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import type { Article, Block } from "@/content/blog";
import { articlesFor, findServiceFor } from "@/content/localized";
import { Figure } from "@/components/Figure";
import { EASE_RESPOND, MOTION } from "@/config/motion";
import { LANG_TAG, localePath, useLocale, type Locale } from "@/lib/i18n";
import { formatDateIn } from "@/pages/BlogIndex";

/**
 * ULTRA VISION — page d'un article.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/routes/blog.$slug.tsx
 *  Adresse : /blog/mon-article
 * ============================================================
 *
 * OPTIMISATION POUR LA RECHERCHE CLASSIQUE ET CONVERSATIONNELLE
 *
 * Ces deux objectifs ne demandent pas les memes choses, et la page
 * traite les deux separement.
 *
 * POUR GOOGLE — le referencement classique
 *
 *  - Un seul <h1> par page, puis des <h2> dans l'ordre. Une hierarchie
 *    cassee est l'erreur technique la plus repandue sur les blogs.
 *  - `<article>` et `<time dateTime>` : la nature et la date du contenu
 *    sont declarees dans le balisage, pas seulement affichees.
 *  - Donnees structurees BlogPosting, avec date de publication, auteur
 *    et editeur.
 *  - Un fil d'Ariane declare en BreadcrumbList : c'est lui qui produit
 *    le chemin « ultravision.com > Blog > Article » dans les resultats.
 *  - Une adresse canonique, pour qu'une meme page atteinte par deux
 *    chemins ne se concurrence pas elle-meme.
 *  - Des liens vers les autres articles en bas : un article isole ne
 *    transmet rien au reste du site.
 *
 * POUR LES MOTEURS CONVERSATIONNELS — ChatGPT, Perplexity, l'Apercu IA
 *
 * Ils ne classent pas des pages, ils extraient des reponses. Ils
 * cherchent des affirmations courtes, autoportantes, attribuables.
 * Trois dispositifs repondent a ce besoin :
 *
 *  1. L'ENCADRE « L'ESSENTIEL », tout en haut. Trois a cinq phrases
 *     qui se comprennent sans lire l'article. C'est le bloc le plus
 *     souvent repris tel quel.
 *
 *  2. LES QUESTIONS FREQUENTES, en bas, publiees en FAQPage. La
 *     correspondance entre une question posee a un assistant et une
 *     question ecrite dans la page est directe : c'est le format le
 *     plus facilement citable qui existe.
 *
 *  3. LE `speakable` DANS LES DONNEES STRUCTUREES. Il designe
 *     explicitement quelles parties de la page sont autonomes et
 *     peuvent etre lues a voix haute ou citees hors contexte.
 *
 * Une derniere chose compte autant que la technique : les articles
 * repondent a la question posee des le premier paragraphe, sans
 * introduction. Un moteur conversationnel qui doit lire six paragraphes
 * avant de trouver la reponse choisit une autre source.
 *
 * DEUX LANGUES : le gabarit vit dans src/pages/BlogArticle.tsx, affiche
 * par src/routes/blog.$slug.tsx et src/routes/en/blog.$slug.tsx. En
 * anglais, seuls les articles traduits existent (findArticleFor) ; les
 * libelles fixes viennent de `UI`, les dates sont ecrites a l'anglaise.
 */

const UI = {
  fr: {
    home: "Accueil",
    breadcrumbLabel: "Fil d'Ariane",
    readingTime: (n: number) => `${n} minutes de lecture`,
    takeawaysLabel: "L'essentiel de cet article",
    takeaways: "L'essentiel",
    faq: "Questions fréquentes",
    servicesEyebrow: "Nos services",
    servicesTitle: "Ce que nous faisons de cette méthode.",
    service: "Service",
    next: "À lire ensuite",
    sources: "Sources",
  },
  en: {
    home: "Home",
    breadcrumbLabel: "Breadcrumb",
    readingTime: (n: number) => `${n} min read`,
    takeawaysLabel: "Key takeaways from this article",
    takeaways: "Key takeaways",
    faq: "Frequently asked questions",
    servicesEyebrow: "Our services",
    servicesTitle: "What we do with this method.",
    service: "Service",
    next: "Read next",
    sources: "Sources",
  },
};

/** Les sources d'un article, avec le titre et l'adresse de la langue demandee. */
const referencesFor = (a: Article, locale: Locale) =>
  (a.references ?? []).map((r) =>
    locale === "en" ? { ...r, title: r.titleEn ?? r.title, url: r.urlEn ?? r.url } : r,
  );

/** Les balises d'un article, dans la langue demandee. */
export function articleHead(a: Article | undefined, locale: Locale) {
  if (!a) return {};

  const path = `/blog/${a.slug}`;
  const href = pageUrl(localePath(path, locale));
  const blogHref = url(localePath("/blog", locale));
  /* L'agence, auteur et editeur : reference a l'entite de la racine,
     avec son nom en clair pour les lecteurs qui ne suivent pas les @id. */
  const agency = { "@id": ORG_ID, name: BRAND.name, url: url("/") };

  return pageHead({
    locale,
    path,
    title: withBrand(a.seoTitle ?? a.title),
    description: a.seo,
    ogTitle: a.title,
    ogType: "article",
    breadcrumbs: [
      { name: "Blog", path: "/blog" },
      /* Meme fil que celui affiche : Accueil / Blog / rubrique. */
      { name: a.category, path },
    ],
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    faq: a.faq,
    extraMeta: [
      { property: "article:published_time", content: a.date },
      ...(a.updated ? [{ property: "article:modified_time", content: a.updated }] : []),
      { property: "article:section", content: a.category },
    ],
    nodes: [
      {
        "@type": "BlogPosting",
        "@id": `${href}#article`,
        headline: a.title,
        description: a.seo,
        /*
          `abstract` reprend les phrases de l'encadre « L'essentiel » :
          c'est le champ que les moteurs conversationnels lisent en
          priorite pour resumer une source.
        */
        abstract: a.takeaways.join(" "),
        datePublished: a.date,
        dateModified: a.updated ?? a.date,
        inLanguage: LANG_TAG[locale],
        timeRequired: `PT${a.readingTime}M`,
        articleSection: a.category,
        author: { "@id": FOUNDER_ID },
        publisher: agency,
        isPartOf: {
          "@type": "Blog",
          "@id": `${blogHref}#blog`,
          name: locale === "en" ? `${BRAND.name} blog` : `Blog ${BRAND.name}`,
          url: blogHref,
        },
        mainEntityOfPage: { "@id": `${href}#webpage` },
        image: url("/og/ultravision-agency.jpg"),
        ...(a.services?.length
          ? {
              about: a.services.map((k) => ({
                "@id": `${url(servicePath(k))}#service`,
              })),
            }
          : {}),
        ...(a.references?.length
          ? {
              citation: referencesFor(a, locale).map((r) => ({
                "@type": "CreativeWork",
                name: r.title,
                url: r.url,
                publisher: { "@type": "Organization", name: r.publisher },
                ...(r.date ? { datePublished: r.date } : {}),
              })),
            }
          : {}),
        /* Designe les zones autonomes, citables hors contexte. */
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".uv-takeaways", ".uv-faq"],
        },
      },
    ],
  });
}

/* ========================================================================== */

export function BlogArticlePage({ article: a }: { article: Article }) {
  const locale = useLocale();
  const lp = (p: string) => localePath(p, locale);
  const t = UI[locale];
  const refs = referencesFor(a, locale);
  const others = articlesFor(locale)
    .filter((x) => x.slug !== a.slug)
    .slice(0, 2);
  return (
    <article>
      {/* ---------------- En-tete ---------------- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
          style={{
            background:
              "radial-gradient(60% 100% at 20% 0%, rgba(59,130,246,.2) 0%, transparent 70%)",
          }}
        />

        <div className="shell relative pt-[184px] pb-10 sm:pt-[172px] lg:pt-40 lg:pb-12">
          {/* Fil d'Ariane, visible et declare en donnees structurees. */}
          <Reveal immediate>
            <nav aria-label={t.breadcrumbLabel} className="text-[0.72rem] text-[#7b88a6]">
              <Link to={lp("/")} className="hover:text-foreground">
                {t.home}
              </Link>
              <span className="mx-2">/</span>
              <Link to={lp("/blog")} className="hover:text-foreground">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[#8792ad]">{a.category}</span>
            </nav>
          </Reveal>

          <Reveal delay={60} immediate>
            <h1 className="display mt-6 max-w-4xl text-[2rem] leading-[1.05] tracking-[-0.035em] sm:text-[2.8rem] lg:text-[3.4rem]">
              {a.title}
            </h1>
          </Reveal>

          <Reveal delay={140} immediate>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {a.excerpt}
            </p>
          </Reveal>

          <Reveal delay={200} immediate>
            <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.74rem] text-[#7b88a6]">
              <time dateTime={a.date}>{formatDateIn(a.date, locale)}</time>
              <span aria-hidden="true">·</span>
              <span>{t.readingTime(a.readingTime)}</span>
              <span aria-hidden="true">·</span>
              <Link to={lp("/a-propos")} rel="author" className="hover:text-foreground">
                {locale === "en" ? "By" : "Par"} {BRAND.founder.name}
              </Link>
              <span aria-hidden="true">·</span>
              <span>{BRAND.name}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- L'essentiel ---------------- */}
      <section className="bg-background">
        <div className="shell pb-12">
          <Reveal>
            <aside
              className="uv-takeaways rounded-3xl p-6 sm:p-8"
              aria-label={t.takeawaysLabel}
              style={{
                background:
                  "radial-gradient(120% 130% at 10% 0%, #14275a 0%, #0B1226 52%, #0A0E1A 88%)",
                border: "1px solid #1c2946",
              }}
            >
              <p className="text-[0.66rem] font-medium tracking-[0.18em] uppercase text-[#93C5FD]">
                {t.takeaways}
              </p>
              <ul className="mt-5 space-y-3.5">
                {a.takeaways.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.92rem] leading-relaxed text-[#cddafc]">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: "#60A5FA" }}
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Le corps ---------------- */}
      <section className="bg-background">
        <div className="shell pb-16 lg:pb-20">
          <div className="max-w-[46rem]">
            {a.body.map((b, i) => (
              <Reveal key={i} delay={0}>
                <BlockView block={b} />
              </Reveal>
            ))}

            {/* Les sources publiques des faits avances, en fin d'article. */}
            {refs.length > 0 && (
              <Reveal>
                <div className="mt-12 border-t border-hairline pt-6">
                  <h2 className="text-[0.72rem] font-medium tracking-[0.14em] uppercase text-[#7b88a6]">
                    {t.sources}
                  </h2>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {refs.map((r) => (
                      <li key={r.url}>
                        {r.publisher}
                        {r.date ? `, ${formatDateIn(r.date, locale)}` : ""}
                        {locale === "en" ? ": " : " : "}
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener"
                          className="text-foreground underline underline-offset-2 hover:text-accent-hover"
                        >
                          {r.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- Questions frequentes ---------------- */}
      <section className="rule bg-surface">
        <div className="shell py-14 lg:py-18">
          <Reveal>
            <h2 className="display text-2xl sm:text-3xl">{t.faq}</h2>
          </Reveal>

          <div className="uv-faq mt-8 max-w-[52rem] border-t border-hairline">
            {a.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <div className="border-b border-hairline py-6">
                  <h3 className="text-[0.98rem] font-medium">{f.q}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Les services lies ---------------- */}
      {/*
        L'article explique une methode ; la page service la vend. Sans ce
        lien, un lecteur convaincu n'avait que le bouton de contact.
      */}
      {a.services && a.services.length > 0 && (
        <section className="rule bg-background">
          <div className="shell py-14 lg:py-18">
            <Reveal>
              <p className="eyebrow" style={{ color: "#60A5FA" }}>
                {t.servicesEyebrow}
              </p>
              <h2 className="display mt-4 text-2xl sm:text-3xl">{t.servicesTitle}</h2>
            </Reveal>
            <LinkCards
              items={a.services.map((k) => {
                const s = findServiceFor(k, locale)!;
                return {
                  to: lp(servicePath(s.slug)),
                  eyebrow: t.service,
                  title: s.name,
                  text: s.description,
                };
              })}
            />
          </div>
        </section>
      )}

      {/* ---------------- Suite ---------------- */}
      {others.length > 0 && (
        <section className={`rule ${a.services?.length ? "bg-surface" : "bg-background"}`}>
          <div className="shell py-14 lg:py-18">
            <Reveal>
              <p className="eyebrow" style={{ color: "#60A5FA" }}>
                {t.next}
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {others.map((o, i) => (
                <Reveal key={o.slug} delay={i * MOTION.stagger} className="h-full">
                  <Link
                    to={lp(`/blog/${o.slug}`)}
                    className="group flex h-full flex-col rounded-2xl p-6"
                    style={{
                      backgroundColor: "#0B1020",
                      border: "1px solid #16203a",
                      transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                    }}
                  >
                    <span className="text-[0.64rem] font-medium tracking-[0.14em] uppercase text-accent-hover">
                      {o.category}
                    </span>
                    <h3 className="display mt-3 text-lg transition-colors duration-200 group-hover:text-[#93C5FD]">
                      {o.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#8792ad]">
                      {o.excerpt}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
    </article>
  );
}

/* ==========================================================================
 *  RENDU D'UN BLOC
 * ========================================================================== */

function BlockView({ block }: { block: Block }) {
  switch (block.k) {
    case "h2":
      return <h2 className="display mt-12 mb-5 text-2xl sm:text-[1.7rem]">{block.v}</h2>;

    case "p":
      return <p className="mb-5 text-[1rem] leading-[1.8] text-[#c2c6d2]">{block.v}</p>;

    case "ul":
      return (
        <ul className="mb-6 space-y-3">
          {block.v.map((li) => (
            <li key={li} className="flex gap-3 text-[0.96rem] leading-[1.75] text-[#c2c6d2]">
              <span
                aria-hidden="true"
                className="mt-[11px] h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: "#3B82F6" }}
              />
              <span>{li}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="my-9 border-l-2 py-1 pl-6" style={{ borderColor: "#3B82F6" }}>
          <p className="display text-[1.3rem] leading-[1.4] text-foreground sm:text-[1.5rem]">
            {block.v}
          </p>
        </blockquote>
      );

    case "note":
      return (
        <aside
          className="my-8 rounded-2xl p-5"
          style={{
            backgroundColor: "rgba(59,130,246,.08)",
            border: "1px solid rgba(96,165,250,.26)",
          }}
        >
          <p className="text-[0.92rem] leading-[1.75] text-[#cddafc]">{block.v}</p>
        </aside>
      );

    case "figure":
      return <Figure data={block.v} />;

    case "table":
      return (
        <div className="my-9 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead>
              <tr>
                {block.v.head.map((h) => (
                  <th
                    key={h}
                    className="border-b px-3 pb-3 text-[0.7rem] font-medium tracking-[0.12em] uppercase text-[#93C5FD]"
                    style={{ borderColor: "#1c2946" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.v.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td
                      key={j}
                      className="border-b px-3 py-3.5 align-top leading-relaxed text-[#c2c6d2]"
                      style={{ borderColor: "#16203a" }}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
