import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * UltraVision Agency — enveloppe de la section realisations, en anglais.
 *
 * Le pendant de src/routes/realisations.tsx : la galerie vit dans
 * en/work.index.tsx, chaque etude de cas dans en/work.$slug.tsx.
 * Ne rien ajouter ici d'autre que l'<Outlet />.
 */
export const Route = createFileRoute("/en/work")({
  component: () => <Outlet />,
});
