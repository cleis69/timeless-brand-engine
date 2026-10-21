import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * UltraVision Agency — enveloppe du blog, en anglais.
 *
 * Le pendant de src/routes/blog.tsx, pour la meme raison : sans
 * <Outlet />, /en/blog/<article> afficherait la liste. Aucune balise
 * `head` ici, aucun habillage : chaque page declare les siennes.
 */
export const Route = createFileRoute("/en/blog")({
  component: () => <Outlet />,
});
