import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * UltraVision Agency — enveloppe de la section secteurs, en anglais.
 *
 * Le pendant de src/routes/secteurs.tsx : la liste vit dans
 * en/industries.index.tsx, chaque secteur dans en/industries.$slug.tsx.
 */
export const Route = createFileRoute("/en/industries")({
  component: () => <Outlet />,
});
