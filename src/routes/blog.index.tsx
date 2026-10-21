import { createFileRoute } from "@tanstack/react-router";
import { BlogIndexPage, blogIndexHead } from "@/pages/BlogIndex";

/**
 * La liste des articles, en francais. Le contenu : src/pages/BlogIndex.tsx.
 *
 * ATTENTION : ce fichier va DE PAIR avec src/routes/blog.tsx (le parent,
 * qui ne contient qu'un <Outlet />). Voir les explications dans
 * src/pages/BlogIndex.tsx.
 */
export const Route = createFileRoute("/blog/")({
  component: BlogIndexPage,
  head: () => blogIndexHead("fr"),
});
