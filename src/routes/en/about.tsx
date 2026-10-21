import { createFileRoute } from "@tanstack/react-router";
import { AboutPage, aboutHead } from "@/pages/About";

/** About page, in English. Content: src/pages/About.tsx. */
export const Route = createFileRoute("/en/about")({
  head: () => aboutHead("en"),
  component: AboutPage,
});
