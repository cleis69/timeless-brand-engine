import { createFileRoute } from "@tanstack/react-router";
import { HotelsRiadsPage, hotelsRiadsHead } from "@/pages/HotelsRiads";

/** Page d'offre hotels et riads, en francais. Le contenu : src/pages/HotelsRiads.tsx. */
export const Route = createFileRoute("/marketing-hotels-riads-marrakech")({
  head: () => hotelsRiadsHead("fr"),
  component: HotelsRiadsPage,
});
