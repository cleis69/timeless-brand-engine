/**
 * ULTRA VISION — point d'envoi des candidatures casting.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/lib/casting-server.ts
 *  Appele par src/server.ts, avant le rendu des pages.
 * ============================================================
 *
 * TROIS ADRESSES
 *
 *   GET  /api/casting/status          le stockage est-il branche ?
 *   POST /api/casting                 depot d'une candidature
 *   GET  /api/casting/photos/<…>      lecture d'une photo deposee
 *
 * OU VONT LES CANDIDATURES
 *
 * Dans le seau R2 `ultravision-casting`, un dossier par candidature :
 *
 *   candidatures/2026-09-21_samira-el-amrani_<identifiant>/
 *     candidature.json
 *     photo-1.jpg
 *     photo-2.jpg
 *
 * La date en tete trie les dossiers dans l'ordre d'arrivee dans le
 * tableau de bord Cloudflare, le nom permet de retrouver quelqu'un sans
 * ouvrir chaque dossier.
 *
 * LES PHOTOS NE SONT PAS PUBLIQUES AU SENS OU ON L'ENTEND
 *
 * Une photo ne se lit qu'avec l'adresse exacte de son dossier, qui
 * contient un identifiant aleatoire de 122 bits : impossible a deviner,
 * et aucune liste des dossiers n'est jamais exposee. Seul l'e-mail de
 * notification contient ces adresses. Les moteurs de recherche sont en
 * outre pries de ne rien indexer (`X-Robots-Tag`).
 *
 * CE QUI EST VERIFIE, ET POURQUOI
 *
 * - L'origine de la requete : un autre site ne peut pas deposer chez
 *   nous depuis le navigateur de ses visiteurs.
 * - Le poids total, AVANT de lire quoi que ce soit.
 * - Les premiers octets de chaque photo. Le type annonce par le
 *   navigateur se falsifie en une ligne ; la signature d'un JPEG, non.
 *   C'est ce qui empeche de faire servir par notre domaine un fichier
 *   qui ne serait pas une image.
 */

import { CASTING, EXPERIENCE, LANGUAGES, PROFILES } from "@/config/casting";
import { FORM } from "@/config/forms";
import { findBucket, foreignOrigin, json, type Bucket } from "./r2";

const PREFIX = "candidatures";

/** Marge pour les champs texte, en plus des photos. */
const MAX_BODY = CASTING.maxPhotos * CASTING.maxPhotoBytes + 256 * 1024;

const PHOTO_PATH =
  /^\/api\/casting\/photos\/(\d{4}-\d{2}-\d{2}_[a-z0-9-]{1,40}_[0-9a-f-]{36})\/(photo-[1-9]\.(?:jpg|png|webp))$/;

/**
 * Traite la requete si elle concerne le casting, renvoie `undefined`
 * sinon — src/server.ts passe alors la main au rendu des pages.
 */
export async function handleCasting(request: Request, env: unknown): Promise<Response | undefined> {
  const { pathname } = new URL(request.url);
  if (pathname !== CASTING.endpoint && !pathname.startsWith(`${CASTING.endpoint}/`)) {
    return undefined;
  }

  const bucket = findBucket(request, env);

  if (pathname === `${CASTING.endpoint}/status`) {
    return json({ ready: Boolean(bucket) });
  }

  const photo = PHOTO_PATH.exec(pathname);
  if (photo && request.method === "GET") {
    if (!bucket) return new Response("Not found", { status: 404 });
    return servePhoto(bucket, `${PREFIX}/${photo[1]}/${photo[2]}`);
  }

  if (pathname === CASTING.endpoint && request.method === "POST") {
    if (!bucket) {
      return json(
        {
          ok: false,
          error:
            "Les candidatures en ligne ouvrent très bientôt. En attendant, envoyez-nous votre profil sur WhatsApp.",
        },
        503,
      );
    }
    return receive(request, bucket);
  }

  return new Response("Not found", { status: 404 });
}

async function receive(request: Request, bucket: Bucket): Promise<Response> {
  if (foreignOrigin(request)) return json({ ok: false, error: "Origine refusée." }, 403);

  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY) {
    return json(
      { ok: false, error: "Vos photos sont trop lourdes. Envoyez-en moins, ou plus légères." },
      413,
    );
  }

  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return json({ ok: false, error: "Le formulaire n'a pas pu être lu. Réessayez." }, 400);
  }

  // Champ piege : on fait semblant d'accepter, sans rien enregistrer.
  if (String(fd.get(FORM.honeypot) ?? "")) return json({ ok: true, id: "", photos: [] });

  const text = (k: string, max: number) =>
    String(fd.get(k) ?? "")
      .trim()
      .slice(0, max);
  const fields = {
    name: text("name", 120),
    age: text("age", 3),
    city: text("city", 80),
    phone: text("phone", 40),
    email: text("email", 160),
    instagram: text("instagram", 80),
    height: text("height", 3),
    profiles: onlyKnown(text("profiles", 300), PROFILES),
    experience: onlyKnown(text("experience", 60), EXPERIENCE),
    languages: onlyKnown(text("languages", 300), LANGUAGES),
    reel: text("reel", 500),
    message: text("message", 2000),
  };

  const problem = checkFields(fields, text("adult", 3) === "oui" && text("consent", 3) === "oui");
  if (problem) return json({ ok: false, error: problem }, 400);

  const files = fd.getAll("photos").filter((f): f is File => typeof f !== "string");
  if (files.length < CASTING.minPhotos || files.length > CASTING.maxPhotos) {
    return json(
      { ok: false, error: `Ajoutez entre ${CASTING.minPhotos} et ${CASTING.maxPhotos} photos.` },
      400,
    );
  }

  const photos: { bytes: ArrayBuffer; ext: string; type: string }[] = [];
  for (const f of files) {
    if (f.size > CASTING.maxPhotoBytes) {
      return json(
        { ok: false, error: "Une de vos photos est trop lourde (8 Mo au maximum)." },
        413,
      );
    }
    const bytes = await f.arrayBuffer();
    const kind = sniff(new Uint8Array(bytes, 0, Math.min(12, bytes.byteLength)));
    if (!kind) {
      return json(
        {
          ok: false,
          error: "Une de vos photos n'est pas dans un format reconnu. Envoyez des JPEG ou des PNG.",
        },
        415,
      );
    }
    photos.push({ bytes, ...kind });
  }

  const date = new Date().toISOString().slice(0, 10);
  const id = `${date}_${slug(fields.name)}_${crypto.randomUUID()}`;
  const base = new URL(request.url).origin;

  try {
    const names = photos.map((p, i) => `photo-${i + 1}.${p.ext}`);
    await Promise.all(
      photos.map((p, i) =>
        bucket.put(`${PREFIX}/${id}/${names[i]}`, p.bytes, {
          httpMetadata: { contentType: p.type },
        }),
      ),
    );

    const urls = names.map((n) => `${base}${CASTING.endpoint}/photos/${id}/${n}`);

    // Ecrit EN DERNIER : un dossier qui contient candidature.json est
    // un dossier complet. Des photos seules signalent un envoi coupe.
    await bucket.put(
      `${PREFIX}/${id}/candidature.json`,
      JSON.stringify({ ...fields, photos: urls, receivedAt: new Date().toISOString() }, null, 2),
      { httpMetadata: { contentType: "application/json; charset=utf-8" } },
    );

    return json({ ok: true, id, photos: urls });
  } catch (error) {
    console.error("[casting] R2", error);
    return json({ ok: false, error: "L'enregistrement a échoué. Réessayez dans un instant." }, 500);
  }
}

async function servePhoto(bucket: Bucket, key: string): Promise<Response> {
  const obj = await bucket.get(key);
  if (!obj) return new Response("Not found", { status: 404 });
  return new Response(obj.body, {
    headers: {
      "content-type": obj.httpMetadata?.contentType ?? "application/octet-stream",
      etag: obj.httpEtag,
      "cache-control": "private, max-age=86400",
      "x-content-type-options": "nosniff",
      "x-robots-tag": "noindex, nofollow",
      "referrer-policy": "no-referrer",
    },
  });
}

/**
 * Le navigateur verifie deja tout cela avant l'envoi. On recommence ici
 * parce qu'une requete peut etre fabriquee sans passer par la page.
 * Renvoie le premier probleme, en clair, ou null.
 */
function checkFields(
  f: { name: string; age: string; city: string; phone: string; reel: string },
  agreed: boolean,
): string | null {
  const age = Number(f.age);
  if (!f.name) return "Indiquez votre nom.";
  if (!Number.isInteger(age) || age < CASTING.minAge || age > 99) {
    return `Le casting est réservé aux personnes de ${CASTING.minAge} ans et plus.`;
  }
  if (!f.city) return "Indiquez votre ville.";
  if (f.phone.replace(/[^\d]/g, "").length < 8) return "Vérifiez votre numéro de téléphone.";
  if (f.reel && !/^https?:\/\//i.test(f.reel)) return "Le lien vidéo doit commencer par https://";
  if (!agreed) return "Cochez les deux cases en bas du formulaire.";
  return null;
}

/** Reconnait un JPEG, un PNG ou un WebP a ses premiers octets. */
function sniff(b: Uint8Array): { ext: string; type: string } | null {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { ext: "jpg", type: "image/jpeg" };
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) {
    return { ext: "png", type: "image/png" };
  }
  const riff = b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46;
  const webp = b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50;
  if (riff && webp) return { ext: "webp", type: "image/webp" };
  return null;
}

/** Ne garde, d'une liste separee par des virgules, que les choix proposes. */
function onlyKnown(value: string, allowed: readonly string[]) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter((s) => allowed.includes(s))
    .join(", ");
}

/** « Samira El Amrani » -> « samira-el-amrani ». Nom en arabe -> « candidate ». */
function slug(name: string) {
  const s = name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/, "");
  return s || "candidate";
}
