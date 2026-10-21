import { createFileRoute } from "@tanstack/react-router";
import { CastingPage, castingHead, validateCastingSearch } from "@/pages/Casting";

/** Page Casting, en francais. Le contenu : src/pages/Casting.tsx. */
export const Route = createFileRoute("/casting")({
  component: CastingPage,
  validateSearch: validateCastingSearch,
  head: ({ match }) => castingHead("fr", match.search.profil),
});
