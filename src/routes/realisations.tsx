import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * UltraVision Agency — enveloppe de la section realisations.
 *
 * Meme principe que src/routes/blog.tsx : la galerie vit dans
 * realisations.index.tsx, chaque etude de cas dans
 * realisations.$slug.tsx. Ne rien ajouter ici d'autre que l'<Outlet />.
 */
export const Route = createFileRoute("/realisations")({
  component: () => <Outlet />,
});
