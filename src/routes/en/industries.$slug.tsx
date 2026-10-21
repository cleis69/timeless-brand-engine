import { createFileRoute, notFound } from "@tanstack/react-router";
import { findSectorFor } from "@/content/localized";
import { localePath, slugId } from "@/lib/i18n";
import { SectorPage, sectorHead } from "@/pages/SectorPage";

/** An industry page, in English. Template: src/pages/SectorPage.tsx. */
export const Route = createFileRoute("/en/industries/$slug")({
  loader: ({ params }) => {
    /* L'adresse anglaise porte le slug anglais ; les donnees, l'identifiant francais. */
    const slug = slugId(params.slug);
    if (!findSectorFor(slug, "en")) throw notFound();
    /* Une seule adresse par page : le slug francais sous /en n'existe pas. */
    if (localePath(`/secteurs/${slug}`, "en") !== `/en/industries/${params.slug}`) throw notFound();
    return { slug };
  },
  head: ({ loaderData }) => sectorHead(loaderData?.slug, "en"),
  component: function Sector() {
    const { slug } = Route.useLoaderData();
    return <SectorPage slug={slug} />;
  },
});
