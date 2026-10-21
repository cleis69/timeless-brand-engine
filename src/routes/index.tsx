import { createFileRoute } from "@tanstack/react-router";
import { HomePage, homeHead } from "@/pages/Home";

/** Page d'accueil, en francais. Le contenu : src/pages/Home.tsx. */
export const Route = createFileRoute("/")({
  head: () => homeHead("fr"),
  component: HomePage,
});
