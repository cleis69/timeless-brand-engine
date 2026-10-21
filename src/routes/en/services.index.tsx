import { createFileRoute } from "@tanstack/react-router";
import { ServicesIndexPage, servicesIndexHead } from "@/pages/ServicesIndex";

/** Services list, in English. Content: src/pages/ServicesIndex.tsx. */
export const Route = createFileRoute("/en/services/")({
  component: ServicesIndexPage,
  head: () => servicesIndexHead("en"),
});
