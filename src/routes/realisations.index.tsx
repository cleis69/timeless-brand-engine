import { createFileRoute } from "@tanstack/react-router";
import { WorkIndexPage, workIndexHead } from "@/pages/WorkIndex";

/** La page Realisations, en francais. Le contenu : src/pages/WorkIndex.tsx. */
export const Route = createFileRoute("/realisations/")({
  component: WorkIndexPage,
  head: () => workIndexHead("fr"),
});
