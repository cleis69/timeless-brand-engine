import { Link } from "@tanstack/react-router";
import { url } from "@/config/site";
import { BRAND, withBrand } from "@/config/brand";
import { orgRef, pageHead } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { articlesFor } from "@/content/localized";
import { EASE_RESPOND, MOTION } from "@/config/motion";
import { LANG_TAG, localePath, useLocale, type Locale } from "@/lib/i18n";

/**
 * ULTRA VISION — la liste des articles.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/routes/blog.index.tsx
 *
 *  ATTENTION : ce fichier va DE PAIR avec src/routes/blog.tsx.
 *  Les deux sont necessaires, et ils ne font pas la meme chose.
 * ============================================================
 *
 * POURQUOI DEUX FICHIERS POUR UNE SEULE PAGE
 *
 * Des qu'une adresse a des adresses enfants — ici /blog et
 * /blog/mon-article — le routeur en fait un PARENT. Un parent ne
 * s'affiche pas a la place de son enfant : il l'entoure. Il doit donc
 * contenir un `<Outlet />`, l'emplacement ou l'enfant vient se poser.
 *
 * Le fichier blog.tsx precedent affichait la liste des articles et ne
 * contenait aucun Outlet. Resultat, en ouvrant un article : l'adresse
 * etait la bonne, le titre de l'onglet aussi, les donnees structurees
 * aussi — mais le corps de la page affichait la liste, parce que
 * l'article n'avait nulle part ou apparaitre.
 *
 * La separation resout cela proprement :
 *
 *   blog.tsx        -> le parent. Ne contient qu'un <Outlet />.
 *   blog.index.tsx  -> la page /blog elle-meme, c'est-a-dire ce fichier.
 *   blog.$slug.tsx  -> un article.
 *
 * Le suffixe `.index` designe precisement « l'adresse du parent, sans
 * rien apres ».
 *
 * Les articles viennent de src/content/blog.ts. Cette page ne contient
 * aucun texte d'article : ajouter un article la-bas l'ajoute ici.
 *
 * LES DONNEES STRUCTUREES
 *
 * La page se declare comme un `Blog` contenant une liste d'articles.
 * Cela permet a Google de comprendre qu'il s'agit d'un index et non
 * d'un article unique, et d'associer chaque titre a son adresse sans
 * avoir a explorer le site.
 *
 * DEUX LANGUES : le composant vit desormais ici (src/pages/BlogIndex.tsx) ;
 * src/routes/blog.index.tsx et src/routes/en/blog.index.tsx l'affichent.
 * En anglais, seuls les articles traduits sont listes (articlesFor).
 */

const PATH = "/blog";

/** Date lisible : « 14 août 2026 » en francais, « 14 August 2026 » en anglais. */
export const formatDateIn = (iso: string, locale: Locale) =>
  new Date(iso).toLocaleDateString(locale === "en" ? "en-GB" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function copy(l: Locale) {
  if (l === "en") {
    return {
      title: withBrand("Blog: video advertising and acquisition"),
      description:
        "Our ad production and acquisition methods, explained without jargon: the TOFU MOFU BOFU funnel, real prices, the vertical format, how we use AI.",
      ogDescription:
        "How we produce and run video ads. Methods, prices and trade-offs, explained in detail.",
      blogDescription:
        "Ad production and acquisition methods: conversion funnel, prices, formats, use of artificial intelligence.",
      h1: "The blog: prices, budgets and methods for digital marketing in Morocco.",
      accent: "explained in detail",
      intro:
        "Our production and media methods, without jargon and without grey areas. Each article answers a question a client has actually asked us.",
      readFirst: "Start here",
      readArticle: "Read the article",
      read: "Read",
    };
  }
  return {
    title: withBrand("Blog : publicité vidéo et acquisition"),
    description:
      "Nos méthodes de production publicitaire et d'acquisition, expliquées sans jargon : tunnel TOFU MOFU BOFU, prix réels, format vertical, usage de l'IA.",
    ogDescription:
      "Comment nous produisons et diffusons des vidéos publicitaires. Méthodes, prix et arbitrages, expliqués en détail.",
    blogDescription:
      "Méthodes de production publicitaire et d'acquisition : tunnel de conversion, prix, formats, usage de l'intelligence artificielle.",
    h1: "Le blog : prix, budgets et méthodes du marketing digital au Maroc.",
    accent: "expliqué en détail",
    intro:
      "Nos méthodes de production et de diffusion, sans jargon et sans zone grise. Chaque article répond à une question qu'un client nous a réellement posée.",
    readFirst: "À lire en premier",
    readArticle: "Lire l'article",
    read: "Lire",
  };
}

/** Les balises de la page, dans la langue demandee. */
export function blogIndexHead(locale: Locale) {
  const t = copy(locale);
  const href = url(localePath(PATH, locale));
  return pageHead({
    locale,
    path: PATH,
    title: t.title,
    description: t.description,
    ogDescription: t.ogDescription,
    pageType: "CollectionPage",
    breadcrumbs: [{ name: "Blog", path: PATH }],
    mainEntity: { "@id": `${href}#blog` },
    nodes: [
      {
        "@type": "Blog",
        "@id": `${href}#blog`,
        name: locale === "en" ? `${BRAND.name} blog` : `Blog ${BRAND.name}`,
        description: t.blogDescription,
        url: href,
        inLanguage: LANG_TAG[locale],
        publisher: orgRef,
        blogPost: articlesFor(locale).map((a) => {
          const u = url(localePath(`/blog/${a.slug}`, locale));
          return {
            "@type": "BlogPosting",
            "@id": `${u}#article`,
            headline: a.title,
            url: u,
            datePublished: a.date,
          };
        }),
      },
    ],
  });
}

export function BlogIndexPage() {
  const locale = useLocale();
  const lp = (p: string) => localePath(p, locale);
  const t = copy(locale);
  const [lead, ...rest] = articlesFor(locale);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={t.h1}
        accent={t.accent}
        intro={t.intro}
        breadcrumbs={[{ name: "Blog", path: lp(PATH) }]}
      />

      <section className="rule bg-background">
        <div className="shell py-14 lg:py-20">
          {/* ---------------- L'article mis en avant ---------------- */}
          {lead && (
            <Reveal>
              <Link
                to={lp(`/blog/${lead.slug}`)}
                className="group block overflow-hidden rounded-3xl p-7 outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-10"
                style={{
                  background:
                    "radial-gradient(120% 130% at 12% 0%, #1E3A8A 0%, #0B1226 46%, #0A0A0A 84%)",
                  border: "1px solid #1c2946",
                  transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                }}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-full px-3 py-1 text-[0.62rem] font-medium tracking-[0.14em] uppercase"
                    style={{ backgroundColor: "#2563EB", color: "#fff" }}
                  >
                    {t.readFirst}
                  </span>
                  <span className="text-[0.72rem] tracking-[0.12em] uppercase text-[#8fb4f0]">
                    {lead.category}
                  </span>
                  <span className="text-[0.72rem] text-[#707d9d]">
                    {formatDateIn(lead.date, locale)} · {lead.readingTime} min
                  </span>
                </div>

                <h2 className="display mt-6 max-w-3xl text-3xl sm:text-4xl lg:text-[2.8rem]">
                  {lead.title}
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#a9bad8] sm:text-base">
                  {lead.excerpt}
                </p>

                <span className="mt-8 inline-flex items-center gap-3 text-[0.76rem] font-semibold tracking-[0.14em] uppercase text-foreground">
                  {t.readArticle}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            </Reveal>
          )}

          {/* ---------------- Les autres ---------------- */}
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={i * MOTION.stagger} className="h-full">
                <Link
                  to={lp(`/blog/${a.slug}`)}
                  className="group flex h-full flex-col rounded-3xl p-7 outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{
                    backgroundColor: "#0B1020",
                    border: "1px solid #16203a",
                    transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}, transform ${MOTION.respond}ms ${EASE_RESPOND}`,
                  }}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[0.66rem] font-medium tracking-[0.14em] uppercase text-accent-hover">
                      {a.category}
                    </span>
                    <span className="text-[0.7rem] text-[#7b88a6]">
                      {formatDateIn(a.date, locale)} · {a.readingTime} min
                    </span>
                  </div>

                  <h2 className="display mt-4 text-xl transition-colors duration-200 group-hover:text-[#93C5FD] sm:text-2xl">
                    {a.title}
                  </h2>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[#8792ad]">{a.excerpt}</p>

                  <span className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-[#93C5FD]">
                    {t.read}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
