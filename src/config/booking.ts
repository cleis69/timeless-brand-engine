/**
 * ULTRA VISION — reservation d'un appel, directement dans la page.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/config/booking.ts
 *
 *  C'EST ICI QU'ON REGLE LES JOURS, LES HEURES ET LES CONGES.
 *  Partage par le calendrier (navigateur) et par /api/rdv (serveur).
 * ============================================================
 *
 * CE QUI SE PASSE QUAND UN PROSPECT RESERVE
 *
 *   1. Il choisit un jour, puis un creneau, et laisse son nom et son
 *      numero. Trois clics et deux champs : c'est tout.
 *   2. Le serveur verifie que le creneau existe, qu'il est dans le
 *      futur et qu'il est encore libre, puis le range dans le stockage
 *      Cloudflare (rendez-vous/<date>/<heure>.json). Des cet instant,
 *      le creneau disparait du calendrier pour tous les visiteurs.
 *   3. Tu recois un e-mail avec ses coordonnees, un lien WhatsApp et un
 *      bouton « Ajouter a Google Agenda ».
 *
 * POUR BLOQUER UN JOUR (conge, tournage, jour ferie), ajoute sa date
 * dans `closed`. Pour changer les horaires, modifie `times`.
 */

import { FORM } from "./forms";

export const BOOKING = {
  /** Point d'envoi, servi par src/server.ts. */
  endpoint: "/api/rdv",

  /** Fuseau des creneaux affiches. Toutes les heures du calendrier sont celles du Maroc. */
  timeZone: "Africa/Casablanca",

  /** Duree d'un appel, en minutes. */
  durationMin: 30,

  /** Jours ouverts : 1 = lundi … 5 = vendredi, 6 = samedi, 0 = dimanche. */
  weekdays: [1, 2, 3, 4, 5] as readonly number[],

  /** Heures de debut des appels, heure du Maroc. */
  times: ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"] as readonly string[],

  /**
   * Delai minimal avant un appel, en heures.
   *
   * Sans lui, un prospect pouvait reserver 10 h a 9 h 58 : le rendez-vous
   * existe, personne ne l'a vu passer, et c'est un prospect perdu.
   */
  minNoticeHours: 3,

  /** Jusqu'ou le calendrier ouvre, en jours. Trois semaines : assez pour choisir, pas assez pour oublier. */
  horizonDays: 21,

  /**
   * Jours fermes, au format « AAAA-MM-JJ ».
   * Exemple : ["2026-11-06", "2026-11-18"]
   */
  closed: [] as readonly string[],
} as const;

/* ------------------------------------------------------------------
 *  L'heure du Maroc, sans dependre de l'horloge du visiteur
 * ------------------------------------------------------------------ */

/** Date et minute courantes au Maroc : { date: "2026-09-22", minutes: 870 }. */
export function nowInZone(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BOOKING.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

/**
 * Minutes ecoulees depuis 1970 sur l'horloge murale du Maroc.
 * Comparer deux valeurs de cette fonction donne un ecart juste, quel
 * que soit le decalage horaire du jour (heure d'ete, ramadan).
 */
const wallMinutes = (date: string, minutes: number) => {
  const [y = 0, m = 1, d = 1] = date.split("-").map(Number);
  return Date.UTC(y, m - 1, d) / 60000 + minutes;
};

const toMinutes = (time: string) => {
  const [h = 0, m = 0] = time.split(":").map(Number);
  return h * 60 + m;
};

/** « 2026-09-22 » + n jours. */
export function addDays(date: string, n: number) {
  const [y = 0, m = 1, d = 1] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

/** Jour de la semaine d'une date « AAAA-MM-JJ » (0 = dimanche). */
export function weekday(date: string) {
  const [y = 0, m = 1, d = 1] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/** Identifiant d'un creneau : « 2026-09-24T15:00 ». */
export const slotId = (date: string, time: string) => `${date}T${time}`;

/**
 * Les creneaux proposes pour un jour, passes et trop proches exclus.
 * Ne tient PAS compte des creneaux deja reserves : ceux-la viennent du
 * serveur.
 */
export function openTimes(date: string, now = nowInZone()) {
  if (!BOOKING.weekdays.includes(weekday(date))) return [];
  if (BOOKING.closed.includes(date)) return [];
  if (date < now.date || date > addDays(now.date, BOOKING.horizonDays)) return [];
  const earliest = wallMinutes(now.date, now.minutes) + BOOKING.minNoticeHours * 60;
  return BOOKING.times.filter((t) => wallMinutes(date, toMinutes(t)) >= earliest);
}

/** Vrai si le creneau fait partie de ceux que l'agence propose, maintenant. */
export const isBookable = (date: string, time: string, now = nowInZone()) =>
  openTimes(date, now).includes(time);

/* ------------------------------------------------------------------
 *  Libelles
 * ------------------------------------------------------------------ */

const fmt = (date: string, opts: Intl.DateTimeFormatOptions) => {
  const [y = 0, m = 1, d = 1] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("fr-FR", { timeZone: "UTC", ...opts }).format(
    new Date(Date.UTC(y, m - 1, d, 12)),
  );
};

/** « jeudi 24 septembre » */
export const dayLabel = (date: string) =>
  fmt(date, { weekday: "long", day: "numeric", month: "long" });

/** « septembre 2026 » */
export const monthLabel = (date: string) => fmt(date, { month: "long", year: "numeric" });

/** « 15:00 » -> « 15 h », « 14:30 » -> « 14 h 30 » */
export const timeLabel = (time: string) => {
  const [h, m] = time.split(":");
  return m === "00" ? `${Number(h)} h` : `${Number(h)} h ${m}`;
};

/**
 * L'heure du creneau chez le visiteur, s'il n'est pas a l'heure du Maroc.
 * « 16 h » pour un prospect a Paris en ete, `null` a Casablanca.
 */
export function visitorTimeLabel(date: string, time: string) {
  const [y = 0, m = 1, d = 1] = date.split("-").map(Number);
  const target = toMinutes(time);
  // Premiere estimation en UTC, corrigee du decalage du Maroc ce jour-la.
  const guess = Date.UTC(y, m - 1, d) + target * 60000;
  const seen = nowInZone(new Date(guess));
  const drift = wallMinutes(seen.date, seen.minutes) - wallMinutes(date, target);
  const instant = new Date(guess - drift * 60000);
  const local = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(instant);
  const [lh = "0", lm = "00"] = local.split(":");
  const label = timeLabel(`${lh.padStart(2, "0")}:${lm}`);
  return label === timeLabel(time) ? null : label;
}

/* ------------------------------------------------------------------
 *  Agenda : Google et fichier .ics
 * ------------------------------------------------------------------ */

const compact = (date: string, time: string) =>
  `${date.replaceAll("-", "")}T${time.replace(":", "")}00`;

const endOf = (date: string, time: string) => {
  const end = toMinutes(time) + BOOKING.durationMin;
  const hh = String(Math.floor(end / 60)).padStart(2, "0");
  const mm = String(end % 60).padStart(2, "0");
  return `${hh}:${mm}`;
};

/** Lien « Ajouter a Google Agenda », a l'heure du Maroc quel que soit le fuseau du lecteur. */
export function googleCalendarUrl(date: string, time: string, title: string, details: string) {
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${compact(date, time)}/${compact(date, endOf(date, time))}`,
    ctz: BOOKING.timeZone,
    details,
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

/** Fichier .ics pour Apple Calendrier et Outlook, genere dans le navigateur. */
export function icsFile(date: string, time: string, title: string, details: string) {
  const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ULTRA VISION//Rendez-vous//FR",
    "BEGIN:VEVENT",
    `UID:${slotId(date, time)}@ultravisionagency.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART;TZID=${BOOKING.timeZone}:${compact(date, time)}`,
    `DTEND;TZID=${BOOKING.timeZone}:${compact(date, endOf(date, time))}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(details)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/* ------------------------------------------------------------------
 *  Cote navigateur : lire les creneaux pris, reserver
 * ------------------------------------------------------------------ */

export type BookingFields = {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
};

export type BookingResult = { ok: true } | { ok: false; message: string; taken?: boolean };

/** Les creneaux deja reserves, et si le stockage est branche. Ne leve jamais. */
export async function fetchTaken(): Promise<{ ready: boolean; taken: string[] }> {
  try {
    const res = await fetch(`${BOOKING.endpoint}/slots`, {
      headers: { Accept: "application/json" },
    });
    const json = (await res.json()) as { ready?: boolean; taken?: string[] };
    return { ready: json.ready === true, taken: json.taken ?? [] };
  } catch {
    return { ready: false, taken: [] };
  }
}

/**
 * Reserve un creneau. L'e-mail de notification part apres
 * l'enregistrement ; son echec ne defait pas la reservation.
 */
export async function book(
  date: string,
  time: string,
  f: BookingFields,
  honeypot: string,
): Promise<BookingResult> {
  if (honeypot) return { ok: true };

  let res: Response;
  let json: { ok?: boolean; error?: string; taken?: boolean };
  try {
    res = await fetch(BOOKING.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ date, time, ...f }),
    });
    json = await res.json().catch(() => ({}));
  } catch {
    return {
      ok: false,
      message:
        "La connexion a échoué. Vérifiez votre réseau et réessayez : vos réponses sont toujours là.",
    };
  }
  if (!json.ok) {
    return {
      ok: false,
      message: json.error ?? "La réservation a échoué. Réessayez, ou écrivez-nous sur WhatsApp.",
      taken: json.taken === true,
    };
  }

  const digits = f.phone.replace(/[^\d]/g, "");
  const when = `${dayLabel(date)} à ${timeLabel(time)}`;
  const agenda = googleCalendarUrl(
    date,
    time,
    `Appel — ${f.name}${f.company ? ` (${f.company})` : ""}`,
    [
      `Téléphone : ${f.phone}`,
      f.email && `E-mail : ${f.email}`,
      f.message && `Projet : ${f.message}`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  try {
    await fetch(FORM.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: FORM.accessKey,
        subject: `Rendez-vous — ${when} — ${f.name}`,
        from_name: "Réservation ULTRA VISION",
        rendez_vous: `${when} (heure du Maroc), ${BOOKING.durationMin} minutes`,
        nom: f.name,
        entreprise: f.company || "—",
        telephone: f.phone,
        ...(digits ? { whatsapp: `https://wa.me/${digits}` } : {}),
        ...(f.email ? { email: f.email } : {}),
        projet: f.message || "—",
        ajouter_a_google_agenda: agenda,
      }),
    });
  } catch {
    /* Le creneau est deja enregistre : la reservation tient. */
  }
  return { ok: true };
}
