import { createFileRoute } from "@tanstack/react-router";
import { HotelsRiadsPage, hotelsRiadsHead } from "@/pages/HotelsRiads";

/** Hotel and riad marketing offer page, in English. Content: src/pages/HotelsRiads.tsx. */
export const Route = createFileRoute("/en/hotel-riad-marketing-marrakech")({
  head: () => hotelsRiadsHead("en"),
  component: HotelsRiadsPage,
});
