import { createFileRoute } from "@tanstack/react-router";
import { ContactPage, contactHead } from "@/pages/Contact";

/** Contact page, in English. Content: src/pages/Contact.tsx. */
export const Route = createFileRoute("/en/contact")({
  head: () => contactHead("en"),
  component: ContactPage,
});
