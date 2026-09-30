import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * UltraVision Agency — enveloppe de la section services.
 *
 * Meme principe que src/routes/blog.tsx : ce fichier ne fait que laisser
 * passer la page enfant. La liste des services vit dans
 * services.index.tsx, chaque service dans services.$slug.tsx.
 *
 * NE PAS Y AJOUTER DE MISE EN PAGE : sans <Outlet />, /services/meta-ads
 * afficherait la liste des services au lieu de la page du service.
 */
export const Route = createFileRoute("/services")({
  component: () => <Outlet />,
});
