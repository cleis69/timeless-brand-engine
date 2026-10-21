import { createFileRoute, notFound } from "@tanstack/react-router";
import { findCaseFor } from "@/content/localized";
import { slugId } from "@/lib/i18n";
import { CaseStudyPage, caseHead } from "@/pages/CaseStudy";

/** A case study, in English. Template: src/pages/CaseStudy.tsx. */
export const Route = createFileRoute("/en/work/$slug")({
  loader: ({ params }) => {
    /* Les etudes de cas gardent leur slug ; slugId le confirme s'il en change un jour. */
    const slug = slugId(params.slug);
    if (!findCaseFor(slug, "en")) throw notFound();
    return { slug };
  },
  head: ({ loaderData }) => caseHead(loaderData?.slug, "en"),
  component: function Case() {
    const { slug } = Route.useLoaderData();
    return <CaseStudyPage slug={slug} />;
  },
});
