import { createFileRoute, notFound } from "@tanstack/react-router";
import { findServiceFor } from "@/content/localized";
import { ServicePage, serviceHead } from "@/pages/ServicePage";

/** La page d'un service, en francais. Le gabarit : src/pages/ServicePage.tsx. */
export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    if (!findServiceFor(params.slug, "fr")) throw notFound();
    /* Seul l'identifiant voyage vers le navigateur : le contenu est deja
       dans le code, inutile de le serialiser une seconde fois dans la page. */
    return { slug: params.slug };
  },
  head: ({ loaderData }) => serviceHead(loaderData?.slug, "fr"),
  component: function Service() {
    const { slug } = Route.useLoaderData();
    return <ServicePage slug={slug} />;
  },
});
