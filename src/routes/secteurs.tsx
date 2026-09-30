import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * UltraVision Agency — enveloppe de la section secteurs.
 *
 * Meme principe que src/routes/blog.tsx : la liste vit dans
 * secteurs.index.tsx, chaque secteur dans secteurs.$slug.tsx.
 */
export const Route = createFileRoute("/secteurs")({
  component: () => <Outlet />,
});
