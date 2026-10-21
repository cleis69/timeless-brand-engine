import { createFileRoute, notFound } from "@tanstack/react-router";
import { findServiceFor } from "@/content/localized";
import { localePath, slugId } from "@/lib/i18n";
import { ServicePage, serviceHead } from "@/pages/ServicePage";

/** A service page, in English. Template: src/pages/ServicePage.tsx. */
export const Route = createFileRoute("/en/services/$slug")({
  loader: ({ params }) => {
    /* L'adresse anglaise porte le slug anglais ; les donnees, l'identifiant francais. */
    const slug = slugId(params.slug);
    if (!findServiceFor(slug, "en")) throw notFound();
    /* Une seule adresse par page : le slug francais sous /en n'existe pas. */
    if (localePath(`/services/${slug}`, "en") !== `/en/services/${params.slug}`) throw notFound();
    return { slug };
  },
  head: ({ loaderData }) => serviceHead(loaderData?.slug, "en"),
  component: function Service() {
    const { slug } = Route.useLoaderData();
    return <ServicePage slug={slug} />;
  },
});
