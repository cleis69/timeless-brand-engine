import { createFileRoute, notFound } from "@tanstack/react-router";
import { findArticleFor } from "@/content/localized";
import { BlogArticlePage, articleHead } from "@/pages/BlogArticle";

/** Un article, en francais. Adresse : /blog/mon-article. Le gabarit : src/pages/BlogArticle.tsx. */
export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = findArticleFor(params.slug, "fr");
    if (!article) throw notFound();
    return article;
  },
  component: function Article() {
    return <BlogArticlePage article={Route.useLoaderData()} />;
  },
  head: ({ loaderData }) => articleHead(loaderData, "fr"),
});
