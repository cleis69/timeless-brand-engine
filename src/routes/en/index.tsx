import { createFileRoute } from "@tanstack/react-router";
import { HomePage, homeHead } from "@/pages/Home";

/** Home page, in English. Content: src/pages/Home.tsx. */
export const Route = createFileRoute("/en/")({
  head: () => homeHead("en"),
  component: HomePage,
});
