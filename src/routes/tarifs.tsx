import { createFileRoute } from "@tanstack/react-router";
import { PricingPage, pricingHead } from "@/pages/Pricing";

/** Page Tarifs, en francais. Le contenu : src/pages/Pricing.tsx. */
export const Route = createFileRoute("/tarifs")({
  head: () => pricingHead("fr"),
  component: PricingPage,
});
