import { createFileRoute } from "@tanstack/react-router";
import { ServicesIndexPage, servicesIndexHead } from "@/pages/ServicesIndex";

/** La liste des services, en francais. Le contenu : src/pages/ServicesIndex.tsx. */
export const Route = createFileRoute("/services/")({
  component: ServicesIndexPage,
  head: () => servicesIndexHead("fr"),
});
