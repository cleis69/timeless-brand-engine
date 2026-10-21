import { createFileRoute, notFound } from "@tanstack/react-router";
import { findArticleFor } from "@/content/localized";
import { localePath, slugId } from "@/lib/i18n";
import { BlogArticlePage, articleHead } from "@/pages/BlogArticle";

/** An article, in English. Template: src/pages/BlogArticle.tsx. */
export const Route = createFileRoute("/en/blog/$slug")({
  loader: ({ params }) => {
    /* L'adresse anglaise porte le slug anglais ; les donnees, l'identifiant francais.
       Un article non traduit n'existe pas en anglais : findArticleFor renvoie undefined. */
    const slug = slugId(params.slug);
    const article = findArticleFor(slug, "en");
    if (!article) throw notFound();
    /* Une seule adresse par page : le slug francais sous /en n'existe pas. */
    if (localePath(`/blog/${slug}`, "en") !== `/en/blog/${params.slug}`) throw notFound();
    return article;
  },
  component: function Article() {
    return <BlogArticlePage article={Route.useLoaderData()} />;
  },
  head: ({ loaderData }) => articleHead(loaderData, "en"),
});
