/**
 * ULTRA VISION — point d'envoi du calendrier de rendez-vous.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/lib/booking-server.ts
 *  Appele par src/server.ts, avant le rendu des pages.
 * ============================================================
 *
 *   GET  /api/rdv/slots   les creneaux deja reserves (et si le stockage repond)
 *   POST /api/rdv         reserver un creneau
 *
 * UN FICHIER PAR CRENEAU
 *
 *   rendez-vous/2026-09-24/1500.json
 *
 * La cle EST le creneau. Deux personnes ne peuvent donc pas tenir le
 * meme : la seconde trouve le fichier deja la et recoit « ce creneau
 * vient d'etre reserve ». Et la liste des creneaux pris se lit d'un
 * seul appel, sans ouvrir un fichier.
 *
 * CE QUE LA LISTE PUBLIQUE REVELE : les heures prises, rien d'autre.
 * Ni nom, ni numero, ni entreprise — ce sont les fichiers eux-memes qui
 * les contiennent, et ils ne sont jamais servis.
 *
 * POUR ANNULER UN RENDEZ-VOUS : supprime son fichier dans le tableau de
 * bord Cloudflare (R2 -> ultravision-casting -> rendez-vous). Le creneau
 * se rouvre aussitot sur le site.
 */

import { BOOKING, addDays, isBookable, nowInZone } from "@/config/booking";
import { FORM } from "@/config/forms";
import { findBucket, foreignOrigin, json, type Bucket } from "./r2";

const PREFIX = "rendez-vous";

const keyOf = (date: string, time: string) => `${PREFIX}/${date}/${time.replace(":", "")}.json`;

export async function handleBooking(request: Request, env: unknown): Promise<Response | undefined> {
  const { pathname } = new URL(request.url);
  if (pathname !== BOOKING.endpoint && !pathname.startsWith(`${BOOKING.endpoint}/`)) {
    return undefined;
  }

  const bucket = findBucket(request, env);

  if (pathname === `${BOOKING.endpoint}/slots` && request.method === "GET") {
    if (!bucket) return json({ ready: false, taken: [] });
    try {
      return json({ ready: true, taken: await taken(bucket) });
    } catch (error) {
      console.error("[rdv] liste", error);
      return json({ ready: false, taken: [] });
    }
  }

  if (pathname === BOOKING.endpoint && request.method === "POST") {
    if (!bucket) {
      return json(
        {
          ok: false,
          error: "La réservation en ligne est indisponible. Écrivez-nous sur WhatsApp.",
        },
        503,
      );
    }
    return reserve(request, bucket);
  }

  return new Response("Not found", { status: 404 });
}

/** Les creneaux reserves d'aujourd'hui jusqu'a la fin de l'horizon : ["2026-09-24T15:00", …]. */
async function taken(bucket: Bucket) {
  const today = nowInZone().date;
  const last = addDays(today, BOOKING.horizonDays);
  const out: string[] = [];
  let cursor: string | undefined;
  do {
    // `startAfter` saute tout l'historique : les cles commencent par la
    // date, l'ordre alphabetique est donc l'ordre chronologique.
    const page = await bucket.list({
      prefix: `${PREFIX}/`,
      startAfter: `${PREFIX}/${addDays(today, -1)}/9999`,
      limit: 1000,
      ...(cursor ? { cursor } : {}),
    });
    for (const o of page.objects) {
      const m = /^rendez-vous\/(\d{4}-\d{2}-\d{2})\/(\d{2})(\d{2})\.json$/.exec(o.key);
      if (m && m[1]! <= last) out.push(`${m[1]}T${m[2]}:${m[3]}`);
    }
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);
  return out;
}

async function reserve(request: Request, bucket: Bucket): Promise<Response> {
  if (foreignOrigin(request)) return json({ ok: false, error: "Origine refusée." }, 403);
  if (Number(request.headers.get("content-length") ?? 0) > 16 * 1024) {
    return json({ ok: false, error: "Demande trop longue." }, 413);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "La demande n'a pas pu être lue. Réessayez." }, 400);
  }

  const text = (k: string, max: number) =>
    String(body[k] ?? "")
      .trim()
      .slice(0, max);

  // Champ piege : on fait semblant d'accepter, sans rien enregistrer.
  if (text(FORM.honeypot, 200)) return json({ ok: true });

  const date = text("date", 10);
  const time = text("time", 5);
  const f = {
    name: text("name", 120),
    phone: text("phone", 40),
    email: text("email", 160),
    company: text("company", 120),
    message: text("message", 1000),
  };

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time) || !isBookable(date, time)) {
    return json(
      {
        ok: false,
        taken: true,
        error: "Ce créneau n'est plus disponible. Choisissez-en un autre.",
      },
      409,
    );
  }
  if (!f.name) return json({ ok: false, error: "Indiquez votre nom." }, 400);
  if (f.phone.replace(/[^\d]/g, "").length < 8) {
    return json({ ok: false, error: "Vérifiez votre numéro de téléphone." }, 400);
  }

  const key = keyOf(date, time);
  try {
    if (await bucket.head(key)) {
      return json(
        {
          ok: false,
          taken: true,
          error: "Ce créneau vient d'être réservé. Choisissez-en un autre.",
        },
        409,
      );
    }
    await bucket.put(
      key,
      JSON.stringify(
        { date, time, timeZone: BOOKING.timeZone, ...f, receivedAt: new Date().toISOString() },
        null,
        2,
      ),
      { httpMetadata: { contentType: "application/json; charset=utf-8" } },
    );
    return json({ ok: true });
  } catch (error) {
    console.error("[rdv] R2", error);
    return json({ ok: false, error: "La réservation a échoué. Réessayez dans un instant." }, 500);
  }
}
