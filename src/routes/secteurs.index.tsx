import { createFileRoute } from "@tanstack/react-router";
import { SectorsIndexPage, sectorsIndexHead } from "@/pages/SectorsIndex";

/** La liste des secteurs, en francais. Le contenu : src/pages/SectorsIndex.tsx. */
export const Route = createFileRoute("/secteurs/")({
  head: () => sectorsIndexHead("fr"),
  component: SectorsIndexPage,
});
