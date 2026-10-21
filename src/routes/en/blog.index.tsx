import { createFileRoute } from "@tanstack/react-router";
import { BlogIndexPage, blogIndexHead } from "@/pages/BlogIndex";

/** Blog index, in English (translated articles only). Content: src/pages/BlogIndex.tsx. */
export const Route = createFileRoute("/en/blog/")({
  component: BlogIndexPage,
  head: () => blogIndexHead("en"),
});
