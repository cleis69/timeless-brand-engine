import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { PageTransition } from "../components/PageTransition";
import { CONTACT } from "../config/contact";

/**
 * ULTRA VISION — racine de l'application.
 *
 * ============================================================
 *  CE FICHIER REMPLACE src/routes/__root.tsx
 * ============================================================
 *
 * TROIS CHANGEMENTS, RIEN D'AUTRE
 *
 * 1. <PageTransition /> est monte au-dessus de tout. Le voile de
 *    navigation doit vivre a la racine : place dans une page, il
 *    disparaitrait au moment meme ou cette page se demonte.
 *
 * 2. Le favicon pointe vers /favicon.svg. Un SVG reste net sur les
 *    ecrans a haute densite, la ou le PNG de 32 px bavait. Le PNG est
 *    conserve en second pour les navigateurs anciens.
 *
 * 3. Les donnees structurees affichaient studio@ultravision.fr et
 *    +33600000000, deux coordonnees inventees. Elles viennent
 *    maintenant du fichier de configuration. Google lit ces donnees et
 *    peut les afficher dans ses resultats : une adresse fausse a cet
 *    endroit se propage.
 *
 * Le reste du fichier est inchange.
 */

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-xs font-medium tracking-[0.12em] uppercase text-background transition-colors hover:bg-accent-hover"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Cette page n'a pas pu se charger
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Un incident est survenu de notre côté. Réessayez ou revenez à l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-xs font-medium tracking-[0.12em] uppercase text-background transition-colors hover:bg-accent-hover"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-hairline px-5 py-2.5 text-xs font-medium tracking-[0.12em] uppercase text-foreground transition-colors hover:border-accent"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "ULTRA VISION" },
      { name: "theme-color", content: "#090909" },
      { property: "og:site_name", content: "ULTRA VISION" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://api.fontshare.com" },
      { rel: "preconnect", href: "https://cdn.fontshare.com", crossOrigin: "anonymous" },
      /*
        POLICES — huit fichiers reduits a cinq.

        General Sans chargeait 400, 500, 600 et 700 ; Inter chargeait
        300, 400, 500 et 600. Huit fichiers, alors que le code n'en
        utilise que cinq :

          General Sans 500 et 700  -> les titres, classe `display`
          Inter 400, 500 et 600    -> corps, navigation, boutons

        Verifie en listant les classes reellement presentes dans le
        code : `font-medium` (500) apparait 26 fois, `font-semibold`
        (600) 7 fois. Inter 300 et General Sans 400 et 600 n'etaient
        appelees nulle part.

        Chaque graisse inutile est un fichier telecharge, decode et
        conserve en memoire pour rien — et une feuille de style de
        police bloque l'affichage du texte tant qu'elle n'est pas lue.
      */
      {
        rel: "stylesheet",
        href: "https://api.fontshare.com/v2/css?f%5B%5D=general-sans@500,700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ULTRA VISION",
          alternateName: "Ultra Vision — Creative Growth Agency",
          url: "https://timeless-brand-engine.lovable.app",
          email: CONTACT.email,
          ...(CONTACT.phone ? { telephone: CONTACT.phone } : {}),
          sameAs: [],
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PageTransition />
      <SiteHeader />
      <main>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
