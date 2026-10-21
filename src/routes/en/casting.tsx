import { createFileRoute } from "@tanstack/react-router";
import { CastingPage, castingHead, validateCastingSearch } from "@/pages/Casting";

/** Casting page, in English. Content: src/pages/Casting.tsx. */
export const Route = createFileRoute("/en/casting")({
  component: CastingPage,
  validateSearch: validateCastingSearch,
  head: ({ match }) => castingHead("en", match.search.profil),
});
