import { createFileRoute } from "@tanstack/react-router";
import { PillarPage, pillarHead } from "@/pages/Pillar";

/** La page pilier, en francais. Le contenu : src/pages/Pillar.tsx. */
export const Route = createFileRoute("/agence-marketing-digital-marrakech")({
  head: () => pillarHead("fr"),
  component: PillarPage,
});
