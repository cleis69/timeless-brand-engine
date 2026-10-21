import { createFileRoute } from "@tanstack/react-router";
import { PillarPage, pillarHead } from "@/pages/Pillar";

/** The pillar page, in English. Content: src/pages/Pillar.tsx. */
export const Route = createFileRoute("/en/digital-marketing-agency-marrakech")({
  head: () => pillarHead("en"),
  component: PillarPage,
});
