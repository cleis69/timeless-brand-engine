import { createFileRoute } from "@tanstack/react-router";
import { RealEstateLeadsPage, realEstateLeadsHead } from "@/pages/RealEstateLeads";

/** Real estate lead generation offer page, in English. Content: src/pages/RealEstateLeads.tsx. */
export const Route = createFileRoute("/en/real-estate-lead-generation-marrakech")({
  head: () => realEstateLeadsHead("en"),
  component: RealEstateLeadsPage,
});
