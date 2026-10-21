import { createFileRoute, notFound } from "@tanstack/react-router";
import { findCaseFor } from "@/content/localized";
import { CaseStudyPage, caseHead } from "@/pages/CaseStudy";

/** Une etude de cas, en francais. Le gabarit : src/pages/CaseStudy.tsx. */
export const Route = createFileRoute("/realisations/$slug")({
  loader: ({ params }) => {
    if (!findCaseFor(params.slug, "fr")) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => caseHead(loaderData?.slug, "fr"),
  component: function Case() {
    const { slug } = Route.useLoaderData();
    return <CaseStudyPage slug={slug} />;
  },
});
