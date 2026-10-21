import { createFileRoute } from "@tanstack/react-router";
import { SectorsIndexPage, sectorsIndexHead } from "@/pages/SectorsIndex";

/** Industries list, in English. Content: src/pages/SectorsIndex.tsx. */
export const Route = createFileRoute("/en/industries/")({
  head: () => sectorsIndexHead("en"),
  component: SectorsIndexPage,
});
