import "./lib/error-capture";

import { SITE_DOMAIN } from "./config/site";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { handleCasting } from "./lib/casting-server";
import { handleBooking } from "./lib/booking-server";
import { buildLlmsFullTxt, buildLlmsTxt, buildSitemap } from "./lib/machine-files";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

/**
 * UNE SEULE ADRESSE POUR CHAQUE PAGE : https://ultravisionagency.com/...
 *
 * Constate le 30 septembre 2026, le meme site repondait a quatre
 * endroits : en https, en http (sans redirection), sur www., et sur
 * l'ancienne adresse timeless-brand-engine.lovable.app — cette derniere
 * servant une copie PLUS ANCIENNE, dont chaque page se declarait
 * elle-meme canonique. Pour Google et pour les assistants IA, c'etaient
 * deux sites officiels qui se contredisaient.
 *
 * Tout converge desormais ici, en 301 (« deplace definitivement ») :
 * les navigateurs le memorisent et les moteurs transferent l'anciennete
 * acquise vers l'adresse d'arrivee. Chemin et parametres sont conserves.
 *
 * NON REDIRIGES, VOLONTAIREMENT :
 *  - l'apercu de l'editeur Lovable (id-preview--….lovable.app), sans
 *    lequel on ne pourrait plus travailler dans Lovable ;
 *  - l'adresse technique *.workers.dev, gardee pour verifier un
 *    deploiement quand le domaine ne repond pas. Elle recoit a la place
 *    un en-tete « noindex » (voir withHostHeaders).
 *
 * LA BARRE FINALE : /services/ repondait par une redirection TEMPORAIRE
 * (307) vers /services. Elle est rendue definitive ici.
 */
const LEGACY_HOSTS = new Set([`www.${SITE_DOMAIN}`, "timeless-brand-engine.lovable.app"]);

function redirectToCanonicalHost(request: Request): Response | undefined {
  const url = new URL(request.url);
  const legacy = LEGACY_HOSTS.has(url.host);
  const insecure = url.host === SITE_DOMAIN && url.protocol === "http:";
  const slash = url.pathname.length > 1 && url.pathname.endsWith("/");
  if (!legacy && !insecure && !slash) return undefined;

  const path = slash ? url.pathname.replace(/\/+$/, "") || "/" : url.pathname;
  const origin = legacy || insecure ? `https://${SITE_DOMAIN}` : url.origin;
  return Response.redirect(`${origin}${path}${url.search}`, 301);
}

/**
 * En-tetes ajoutes selon l'adresse de la requete.
 *
 * - Domaine principal : HSTS. Le navigateur retient qu'il ne faut plus
 *   jamais demander ce site en http.
 * - *.workers.dev : « noindex ». Cette adresse technique sert le meme
 *   contenu ; elle ne doit apparaitre dans aucun moteur.
 */
function withHostHeaders(request: Request, response: Response): Response {
  const host = new URL(request.url).host;
  const isCanonical = host === SITE_DOMAIN;
  const isWorkersDev = host.endsWith(".workers.dev");
  if (!isCanonical && !isWorkersDev) return response;

  const out = new Response(response.body, response);
  if (isCanonical) out.headers.set("Strict-Transport-Security", "max-age=31536000");
  if (isWorkersDev) out.headers.set("X-Robots-Tag", "noindex, nofollow");
  return out;
}

/**
 * sitemap.xml, llms.txt et llms-full.txt, generes a la demande a partir
 * des donnees du site (src/lib/machine-files.ts). Ils ne vivent plus
 * dans public/ : ils ne peuvent donc plus prendre de retard sur le site.
 */
function serveMachineFile(request: Request): Response | undefined {
  const { pathname } = new URL(request.url);
  const files: Record<string, [() => string, string]> = {
    "/sitemap.xml": [buildSitemap, "application/xml; charset=utf-8"],
    "/llms.txt": [buildLlmsTxt, "text/plain; charset=utf-8"],
    "/llms-full.txt": [buildLlmsFullTxt, "text/plain; charset=utf-8"],
  };
  const file = files[pathname];
  if (!file) return undefined;
  return new Response(file[0](), {
    headers: {
      "content-type": file[1],
      "cache-control": "public, max-age=3600",
    },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const canonical = redirectToCanonicalHost(request);
    if (canonical) return canonical;

    const machine = serveMachineFile(request);
    if (machine) return withHostHeaders(request, machine);

    try {
      // Les candidatures casting (/api/casting…) et les rendez-vous
      // (/api/rdv…) ne passent pas par le rendu des pages : ils ont
      // besoin du stockage R2, que seul ce point d'entree recoit.
      const api = (await handleCasting(request, env)) ?? (await handleBooking(request, env));
      if (api) return api;

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withHostHeaders(request, await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
