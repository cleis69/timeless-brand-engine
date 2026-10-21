import { createFileRoute } from "@tanstack/react-router";
import { WorkIndexPage, workIndexHead } from "@/pages/WorkIndex";

/** Our work, in English. Content: src/pages/WorkIndex.tsx. */
export const Route = createFileRoute("/en/work/")({
  component: WorkIndexPage,
  head: () => workIndexHead("en"),
});
