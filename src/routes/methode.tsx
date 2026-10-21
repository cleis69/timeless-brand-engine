import { createFileRoute } from "@tanstack/react-router";
import { MethodPage, methodHead } from "@/pages/Method";

/** Page Strategie & accompagnement 360, en francais. Le contenu : src/pages/Method.tsx. */
export const Route = createFileRoute("/methode")({
  head: () => methodHead("fr"),
  component: MethodPage,
});
