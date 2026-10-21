import { createFileRoute } from "@tanstack/react-router";
import { MethodPage, methodHead } from "@/pages/Method";

/** Strategy & 360 support page, in English. Content: src/pages/Method.tsx. */
export const Route = createFileRoute("/en/method")({
  head: () => methodHead("en"),
  component: MethodPage,
});
