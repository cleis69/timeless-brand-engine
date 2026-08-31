import "./lib/error-capture";

import { SITE_DOMAIN } from "./config/site";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

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
 * Redirige `www.` vers l'adresse courte.
 *
 * Sans cette redirection, chaque page existe a deux adresses. Google
 * les traite comme deux pages distinctes au contenu identique, ce qui
 * dilue le referencement entre les deux versions au lieu de le
 * concentrer sur une seule.
 *
 * Le code 301 signifie « deplace definitivement » : les navigateurs le
 * gardent en memoire et les moteurs transferent l'anciennete acquise
 * vers l'adresse d'arrivee. Un 302 ne ferait ni l'un ni l'autre.
 *
 * Le chemin, la chaine de requete et le protocole sont conserves : un
 * visiteur qui arrive sur `www…/tarifs?utm_source=x` atterrit sur
 * `…/tarifs?utm_source=x`, et non sur l'accueil.
 */
function redirectToCanonicalHost(request: Request): Response | undefined {
  const url = new URL(request.url);
  if (url.host !== `www.${SITE_DOMAIN}`) return undefined;
  url.host = SITE_DOMAIN;
  return Response.redirect(url.toString(), 301);
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

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
