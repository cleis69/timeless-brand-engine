import { createFileRoute, notFound } from "@tanstack/react-router";
import { findSectorFor } from "@/content/localized";
import { SectorPage, sectorHead } from "@/pages/SectorPage";

/** La page d'un secteur, en francais. Le gabarit : src/pages/SectorPage.tsx. */
export const Route = createFileRoute("/secteurs/$slug")({
  loader: ({ params }) => {
    if (!findSectorFor(params.slug, "fr")) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => sectorHead(loaderData?.slug, "fr"),
  component: function Sector() {
    const { slug } = Route.useLoaderData();
    return <SectorPage slug={slug} />;
  },
});
