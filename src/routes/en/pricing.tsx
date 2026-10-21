import { createFileRoute } from "@tanstack/react-router";
import { PricingPage, pricingHead } from "@/pages/Pricing";

/** Pricing page, in English. Content: src/pages/Pricing.tsx. */
export const Route = createFileRoute("/en/pricing")({
  head: () => pricingHead("en"),
  component: PricingPage,
});
