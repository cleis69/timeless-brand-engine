/**
 * ULTRA VISION — acces au stockage Cloudflare R2, cote serveur.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/lib/r2.ts
 *  Partage par casting-server.ts et booking-server.ts.
 * ============================================================
 *
 * UN SEUL SEAU, DEUX DOSSIERS
 *
 * Le seau `ultravision-casting` (son nom date de sa creation, pour le
 * casting) range desormais :
 *
 *   candidatures/   les candidatures casting et leurs photos
 *   rendez-vous/    les appels reserves depuis le calendrier
 *
 * Il est branche sous le nom STORAGE par scripts/set-storage.mjs.
 */

/** Le strict necessaire de l'API R2, sans dependre des types Cloudflare. */
export type Bucket = {
  put(
    key: string,
    value: ArrayBuffer | string,
    options?: { httpMetadata?: { contentType?: string } },
  ): Promise<unknown>;
  get(key: string): Promise<{
    body: ReadableStream;
    httpEtag: string;
    httpMetadata?: { contentType?: string };
  } | null>;
  head(key: string): Promise<unknown | null>;
  list(options?: {
    prefix?: string;
    startAfter?: string;
    limit?: number;
    cursor?: string;
  }): Promise<{ objects: { key: string }[]; truncated: boolean; cursor?: string }>;
};

/** Doit rester identique a BINDING dans scripts/set-storage.mjs. */
export const STORAGE_BINDING = "STORAGE";

/**
 * La liaison R2 peut arriver par trois chemins selon la facon dont
 * nitro appelle ce serveur : le second argument de `fetch`, la requete
 * enrichie par nitro, ou la variable globale que nitro renseigne a
 * chaque requete. On prend le premier qui repond.
 */
export function findBucket(request: Request, env: unknown): Bucket | undefined {
  const candidates = [
    env,
    (request as { runtime?: { cloudflare?: { env?: unknown } } }).runtime?.cloudflare?.env,
    (globalThis as { __env__?: unknown }).__env__,
  ];
  for (const c of candidates) {
    const b = (c as Record<string, unknown> | undefined)?.[STORAGE_BINDING] as Bucket | undefined;
    if (b && typeof b.put === "function") return b;
  }
  return undefined;
}

/** Refuse une requete envoyee depuis un autre site que le notre. */
export const foreignOrigin = (request: Request) => {
  const origin = request.headers.get("origin");
  return Boolean(origin && origin !== new URL(request.url).origin);
};

export function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
