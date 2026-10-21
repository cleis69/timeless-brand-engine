/**
 * ULTRA VISION — candidatures casting.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/config/casting.ts
 *
 *  Partage par la page /casting (navigateur) et par le point
 *  d'envoi /api/casting (serveur, src/lib/casting-server.ts).
 * ============================================================
 *
 * LE TRAJET D'UNE CANDIDATURE
 *
 *   1. Les photos sont reduites DANS LE TELEPHONE de la candidate,
 *      avant tout envoi. Une photo d'iPhone pese 3 a 5 Mo ; reduite a
 *      1 800 px de cote elle en pese 300 a 600 Ko, sans perte visible
 *      pour juger un visage. Sur une connexion 4G moyenne, c'est la
 *      difference entre un envoi de 5 secondes et un envoi d'une minute
 *      — pendant laquelle une candidate sur deux abandonne.
 *
 *   2. Le site range la candidature et ses photos dans le stockage
 *      Cloudflare R2 (seau `ultravision-casting`). C'est la copie de
 *      reference : meme si l'e-mail se perd, rien n'est perdu.
 *
 *   3. Un e-mail part vers contact@ via Web3Forms, le meme service que
 *      le formulaire de contact, avec les liens vers les photos.
 *
 * POURQUOI PAS DE PIECES JOINTES DANS L'E-MAIL
 *
 * Web3Forms ne les accepte que dans son offre payante. Et cinq photos
 * par candidature, multipliees par un appel a casting qui tourne bien,
 * remplissent une boite mail en quelques semaines. Des liens ne pesent
 * rien.
 */

import { FORM } from "./forms";

export const CASTING = {
  /** Point d'envoi, servi par src/server.ts. */
  endpoint: "/api/casting",

  minPhotos: 2,
  maxPhotos: 5,

  /**
   * Plafond par photo, VERIFIE PAR LE SERVEUR.
   *
   * Une photo reduite dans le navigateur n'en approche jamais. Il ne
   * sert que dans le cas ou la reduction a echoue (navigateur ancien,
   * format exotique) et ou le fichier d'origine part tel quel.
   */
  maxPhotoBytes: 8 * 1024 * 1024,

  /** Plus grand cote d'une photo apres reduction, en pixels. */
  photoMaxEdge: 1800,

  /** Qualite JPEG apres reduction. 0,85 : aucune perte visible sur un visage. */
  photoQuality: 0.85,

  /** Seuls formats acceptes par le serveur. */
  photoTypes: ["image/jpeg", "image/png", "image/webp"],

  minAge: 18,

  /** Duree de conservation annoncee aux candidates, en mois. */
  retentionMonths: 24,
} as const;

/** Ce que la candidate peut cocher sous « Vous êtes ». */
export const PROFILES = [
  "Actrice / comédienne",
  "Mannequin",
  "Créatrice de contenu (UGC)",
  "Figuration",
] as const;

export const EXPERIENCE = ["Débutante", "Quelques tournages", "Professionnelle"] as const;

export const LANGUAGES = ["Darija", "Arabe", "Français", "Anglais", "Espagnol", "Amazigh"] as const;

/*
  LIBELLES ANGLAIS — affichage seulement.

  Les valeurs francaises ci-dessus restent celles qui partent au serveur
  (qui les verifie avec onlyKnown) et dans l'e-mail : la page anglaise
  affiche la traduction, mais envoie toujours la valeur francaise.
*/
const LABELS_EN: Record<string, string> = {
  /* Vous etes */
  "Actrice / comédienne": "Actress",
  Mannequin: "Model",
  "Créatrice de contenu (UGC)": "Content creator (UGC)",
  Figuration: "Extra",
  /* Experience */
  Débutante: "Beginner",
  "Quelques tournages": "A few shoots",
  Professionnelle: "Professional",
  /* Langues */
  Darija: "Darija",
  Arabe: "Arabic",
  Français: "French",
  Anglais: "English",
  Espagnol: "Spanish",
  Amazigh: "Amazigh",
};

/** Libelle affiche d'une valeur de PROFILES, EXPERIENCE ou LANGUAGES. */
export const castingLabel = (value: string, locale: "fr" | "en") =>
  locale === "en" ? (LABELS_EN[value] ?? value) : value;

/*
  Les messages de sendCasting() et du serveur (src/lib/casting-server.ts)
  sont en francais. Sur la page anglaise, castingMessage() affiche leur
  traduction ; un message inconnu retombe sur une phrase generique.
*/
const MESSAGES_EN: Record<string, string> = {
  "Merci, votre candidature est bien arrivée. Si un tournage vous correspond, nous vous contacterons par téléphone ou WhatsApp.":
    "Thank you, your application has arrived. If a shoot suits you, we will contact you by phone or WhatsApp.",
  "La connexion a échoué pendant l'envoi. Vérifiez votre réseau et réessayez : vos photos et vos réponses sont toujours là.":
    "The connection failed while sending. Check your network and try again: your photos and answers are still here.",
  "L'envoi a échoué. Réessayez dans un instant, ou envoyez-nous votre profil sur WhatsApp.":
    "Sending failed. Try again in a moment, or send us your profile on WhatsApp.",
  "Les candidatures en ligne ouvrent très bientôt. En attendant, envoyez-nous votre profil sur WhatsApp.":
    "Online applications open very soon. In the meantime, send us your profile on WhatsApp.",
  "Vos photos sont trop lourdes. Envoyez-en moins, ou plus légères.":
    "Your photos are too large. Send fewer, or smaller ones.",
  "Le formulaire n'a pas pu être lu. Réessayez.": "The form could not be read. Please try again.",
  [`Ajoutez entre ${CASTING.minPhotos} et ${CASTING.maxPhotos} photos.`]: `Add between ${CASTING.minPhotos} and ${CASTING.maxPhotos} photos.`,
  "Une de vos photos est trop lourde (8 Mo au maximum).":
    "One of your photos is too large (8 MB maximum).",
  "Une de vos photos n'est pas dans un format reconnu. Envoyez des JPEG ou des PNG.":
    "One of your photos is not in a recognised format. Send JPEG or PNG files.",
  "L'enregistrement a échoué. Réessayez dans un instant.": "Saving failed. Try again in a moment.",
  "Indiquez votre nom.": "Please enter your name.",
  [`Le casting est réservé aux personnes de ${CASTING.minAge} ans et plus.`]: `Casting is open to people aged ${CASTING.minAge} and over.`,
  "Indiquez votre ville.": "Please enter your city.",
  "Vérifiez votre numéro de téléphone.": "Please check your phone number.",
  "Le lien vidéo doit commencer par https://": "The video link must start with https://",
  "Cochez les deux cases en bas du formulaire.": "Tick both boxes at the bottom of the form.",
};

/** Le message d'un resultat, dans la langue de la page. */
export const castingMessage = (r: CastingResult, locale: "fr" | "en") =>
  locale === "en"
    ? (MESSAGES_EN[r.message] ??
      (r.ok
        ? "Thank you, your application has arrived."
        : "Sending failed. Try again in a moment, or send us your profile on WhatsApp."))
    : r.message;

/** Champs texte de la candidature, tels qu'envoyes au serveur. */
export type CastingFields = {
  name: string;
  age: string;
  city: string;
  phone: string;
  email: string;
  instagram: string;
  height: string;
  profiles: string;
  experience: string;
  languages: string;
  reel: string;
  message: string;
  consent: string;
  adult: string;
};

export type CastingResult = { ok: boolean; message: string };

/**
 * Reduit une photo dans le navigateur, avant l'envoi.
 *
 * On passe par une balise <img> et non par `createImageBitmap` : une
 * image affichee respecte l'orientation EXIF dans tous les navigateurs
 * actuels, alors que `createImageBitmap` ne le fait pas partout. Sans
 * cela, une photo prise telephone a la verticale arrivait couchee.
 *
 * Si la reduction echoue (format que le navigateur ne sait pas lire,
 * comme le HEIC sur Chrome), le fichier d'origine est renvoye tel quel.
 * Le serveur tranchera — et refusera proprement ce qu'il ne sait pas
 * afficher.
 */
export async function preparePhoto(file: File): Promise<Blob> {
  const src = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = src;
    await img.decode();

    const scale = Math.min(1, CASTING.photoMaxEdge / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", CASTING.photoQuality),
    );
    return blob ?? file;
  } catch {
    return file;
  } finally {
    URL.revokeObjectURL(src);
  }
}

/** Vrai si le fichier (reduit ou non) sera accepte par le serveur. */
export const photoAccepted = (b: Blob) =>
  (CASTING.photoTypes as readonly string[]).includes(b.type) && b.size <= CASTING.maxPhotoBytes;

/**
 * Le stockage est-il branche ?
 *
 * Tant que R2 n'est pas active sur le compte Cloudflare, le serveur
 * repond « non » et la page le dit, au lieu de laisser une candidate
 * remplir vingt champs et choisir cinq photos pour rien.
 */
export async function castingReady(): Promise<boolean> {
  try {
    const res = await fetch(`${CASTING.endpoint}/status`, {
      headers: { Accept: "application/json" },
    });
    const json = (await res.json()) as { ready?: boolean };
    return json.ready === true;
  } catch {
    return false;
  }
}

/**
 * Envoie une candidature.
 *
 * Ne leve jamais d'exception, comme sendForm() : une erreur reseau ne
 * doit pas laisser la candidate devant une page figee.
 *
 * L'e-mail de notification part APRES l'enregistrement, et son echec ne
 * fait pas echouer la candidature : elle est deja rangee dans R2, elle
 * n'est pas perdue. Annoncer un echec a ce stade pousserait la candidate
 * a recommencer, et on recevrait deux dossiers.
 */
export async function sendCasting(
  fields: CastingFields,
  photos: Blob[],
  honeypot: string,
): Promise<CastingResult> {
  const thanks: CastingResult = {
    ok: true,
    message:
      "Merci, votre candidature est bien arrivée. Si un tournage vous correspond, nous vous contacterons par téléphone ou WhatsApp.",
  };

  // Champ piege rempli : c'est un automate. On fait semblant d'accepter.
  if (honeypot) return thanks;

  const body = new FormData();
  for (const [k, v] of Object.entries(fields)) body.append(k, v);
  photos.forEach((p, i) =>
    body.append(
      "photos",
      p,
      `photo-${i + 1}.${p.type === "image/png" ? "png" : p.type === "image/webp" ? "webp" : "jpg"}`,
    ),
  );

  let saved: { ok?: boolean; id?: string; photos?: string[]; error?: string };
  try {
    const res = await fetch(CASTING.endpoint, { method: "POST", body });
    saved = await res.json().catch(() => ({ ok: false }));
  } catch {
    return {
      ok: false,
      message:
        "La connexion a échoué pendant l'envoi. Vérifiez votre réseau et réessayez : vos photos et vos réponses sont toujours là.",
    };
  }

  if (!saved.ok) {
    return {
      ok: false,
      message:
        saved.error ??
        "L'envoi a échoué. Réessayez dans un instant, ou envoyez-nous votre profil sur WhatsApp.",
    };
  }

  await notify(fields, saved.photos ?? [], saved.id ?? "");
  return thanks;
}

/** L'e-mail de notification, via Web3Forms. Ses echecs sont silencieux. */
async function notify(f: CastingFields, photoUrls: string[], id: string) {
  const digits = f.phone.replace(/[^\d]/g, "");
  try {
    await fetch(FORM.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: FORM.accessKey,
        subject: `Casting — ${f.name}, ${f.age} ans, ${f.city}`,
        from_name: "Casting UltraVision Agency",
        nom: f.name,
        age: `${f.age} ans`,
        ville: f.city,
        telephone: f.phone,
        // Un clic depuis l'e-mail ouvre la conversation WhatsApp.
        ...(digits ? { whatsapp: `https://wa.me/${digits}` } : {}),
        // Web3Forms utilise le champ `email` comme adresse de reponse.
        ...(f.email ? { email: f.email } : {}),
        instagram: f.instagram || "—",
        taille: f.height ? `${f.height} cm` : "—",
        profil: f.profiles || "—",
        experience: f.experience || "—",
        langues: f.languages || "—",
        video: f.reel || "—",
        message: f.message || "—",
        photos: photoUrls.join("\n"),
        dossier: id,
      }),
    });
  } catch {
    /* La candidature est deja enregistree dans R2. */
  }
}
