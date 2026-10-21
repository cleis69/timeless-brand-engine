import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * UltraVision Agency — enveloppe de la section services, en anglais.
 *
 * Le pendant de src/routes/services.tsx : sans <Outlet />,
 * /en/services/meta-ads afficherait la liste au lieu du service.
 * Ne rien y ajouter d'autre.
 */
export const Route = createFileRoute("/en/services")({
  component: () => <Outlet />,
});
