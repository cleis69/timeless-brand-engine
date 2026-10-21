import { createFileRoute } from "@tanstack/react-router";
import { ContactPage, contactHead } from "@/pages/Contact";

/** Page Contact, en francais. Le contenu : src/pages/Contact.tsx. */
export const Route = createFileRoute("/contact")({
  head: () => contactHead("fr"),
  component: ContactPage,
});
