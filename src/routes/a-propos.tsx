import { createFileRoute } from "@tanstack/react-router";
import { AboutPage, aboutHead } from "@/pages/About";

/** Page A propos, en francais. Le contenu : src/pages/About.tsx. */
export const Route = createFileRoute("/a-propos")({
  head: () => aboutHead("fr"),
  component: AboutPage,
});
