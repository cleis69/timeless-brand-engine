import { createFileRoute } from "@tanstack/react-router";
import { RealEstateLeadsPage, realEstateLeadsHead } from "@/pages/RealEstateLeads";

/** Page d'offre leads immobiliers, en francais. Le contenu : src/pages/RealEstateLeads.tsx. */
export const Route = createFileRoute("/generation-leads-immobiliers-marrakech")({
  head: () => realEstateLeadsHead("fr"),
  component: RealEstateLeadsPage,
});
