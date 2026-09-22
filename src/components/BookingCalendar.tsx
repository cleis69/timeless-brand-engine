import { useEffect, useMemo, useRef, useState } from "react";
import { EASE_PAGE, EASE_RESPOND, MOTION } from "@/config/motion";
import { FORM } from "@/config/forms";
import { hasWhatsapp, whatsappUrl } from "@/config/contact";
import {
  BOOKING,
  addDays,
  book,
  dayLabel,
  fetchTaken,
  googleCalendarUrl,
  icsFile,
  monthLabel,
  nowInZone,
  openTimes,
  slotId,
  timeLabel,
  visitorTimeLabel,
  weekday,
} from "@/config/booking";

/**
 * ULTRA VISION — le calendrier de reservation, dans la page.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/components/BookingCalendar.tsx
 *  Pose dans le bloc de fin de page (FinalCTA) et sur /contact.
 *  Reglages : src/config/booking.ts.
 * ============================================================
 *
 * TROIS GESTES, DANS LA MEME CARTE
 *
 *   un jour  ->  une heure  ->  un nom et un numero
 *
 * Le premier jour libre est deja selectionne a l'ouverture : les
 * creneaux sont visibles sans un clic. Chaque etape apparait sous la
 * precedente, jamais sur une nouvelle page — un visiteur qui change
 * d'avis sur l'heure n'a rien a refaire.
 *
 * LES HEURES SONT CELLES DU MAROC, ecrites comme telles. Un prospect
 * connecte depuis un autre fuseau voit en plus l'heure chez lui sous le
 * creneau choisi : c'est la cause numero un des appels manques.
 *
 * LES CRENEAUX DEJA PRIS restent affiches, barres. Les faire disparaitre
 * donnait des journees trouees sans explication ; barres, ils disent
 * simplement que d'autres ont reserve.
 *
 * LE CALENDRIER NE PARLE AU SERVEUR QU'UNE FOIS VISIBLE. Il est pose en
 * bas de sept pages : interroger le stockage a chaque visite, pour des
 * visiteurs qui ne descendront jamais jusque-la, n'aurait aucun sens.
 */

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

type Now = ReturnType<typeof nowInZone>;
type Done = { date: string; time: string; phone: string };

export function BookingCalendar() {
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [now, setNow] = useState<Now | null>(null);
  const [ready, setReady] = useState<boolean | null>(null);
  const [taken, setTaken] = useState<Set<string>>(new Set());
  const [month, setMonth] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<Done | null>(null);

  const refresh = async () => {
    const r = await fetchTaken();
    setReady(r.ready);
    setTaken(new Set(r.taken));
    return r;
  };

  /* L'heure du Maroc n'est lue qu'au navigateur : le rendu serveur n'a pas a la deviner. */
  useEffect(() => setNow(nowInZone()), []);

  /* Premier affichage a l'ecran : on lit les creneaux pris. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        void refresh();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const free = (date: string) =>
    now ? openTimes(date, now).filter((t) => !taken.has(slotId(date, t))) : [];

  /* Le premier jour ou il reste un creneau, dans l'horizon. */
  const firstFree = useMemo(() => {
    if (!now) return null;
    for (let i = 0; i <= BOOKING.horizonDays; i++) {
      const d = addDays(now.date, i);
      if (free(d).length) return d;
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, taken]);

  /* A l'ouverture, et chaque fois que la liste change : un jour libre selectionne. */
  useEffect(() => {
    if (!firstFree) return;
    if (!day || !free(day).length) {
      setDay(firstFree);
      setMonth(`${firstFree.slice(0, 7)}-01`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstFree]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!day || !time || sending) return;
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");
    setSending(true);
    setError(null);
    const r = await book(
      day,
      time,
      {
        name: get("name"),
        phone: get("phone"),
        email: get("email"),
        company: get("company"),
        message: get("message"),
      },
      get(FORM.honeypot),
    );
    setSending(false);
    if (r.ok) {
      setDone({ date: day, time, phone: get("phone") });
      return;
    }
    setError(r.message);
    if (r.taken) {
      setTime(null);
      await refresh();
    }
  };

  const chip = (on: boolean) => ({
    borderColor: on ? "#3B82F6" : "#262f45",
    backgroundColor: on ? "rgba(59,130,246,.16)" : "transparent",
    color: on ? "#DBEAFE" : "#c3cadb",
    transition: `all ${MOTION.respond}ms ${EASE_RESPOND}`,
  });

  /* ---------------------------------------------------------------
   *  Le stockage ne repond pas : on le dit, et on donne WhatsApp.
   * --------------------------------------------------------------- */
  if (ready === false) {
    return (
      <div ref={rootRef} className="rounded-3xl p-7 sm:p-8" style={card}>
        <p className="eyebrow" style={{ color: "#60A5FA" }}>
          Réserver un appel
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[#c2c6d2]">
          La réservation en ligne est momentanément indisponible.
        </p>
        {hasWhatsapp && (
          <a
            href={whatsappUrl("Bonjour ULTRA VISION, je souhaite réserver un appel.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-12 items-center rounded-full bg-[#2563EB] px-7 text-xs font-medium tracking-[0.14em] text-white uppercase"
          >
            Choisir un créneau sur WhatsApp
          </a>
        )}
      </div>
    );
  }

  /* ---------------------------------------------------------------
   *  C'est reserve.
   * --------------------------------------------------------------- */
  if (done) {
    const label = `${dayLabel(done.date)} à ${timeLabel(done.time)}`;
    const when = label.charAt(0).toUpperCase() + label.slice(1);
    const details = `Appel de ${BOOKING.durationMin} minutes avec ULTRA VISION, au ${done.phone}.${
      hasWhatsapp
        ? ` Un empêchement ? ${whatsappUrl("Bonjour ULTRA VISION, je dois déplacer notre appel.")}`
        : ""
    }`;
    const ics = `data:text/calendar;charset=utf-8,${encodeURIComponent(
      icsFile(done.date, done.time, "Appel avec ULTRA VISION", details),
    )}`;
    const elsewhere = visitorTimeLabel(done.date, done.time);
    return (
      <div
        ref={rootRef}
        className="rounded-3xl p-7 sm:p-8"
        style={card}
        role="status"
        aria-live="polite"
      >
        <span
          aria-hidden="true"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2563EB]"
          style={{ animation: `uv-cal-pop 520ms ${EASE_PAGE} both` }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10.5l4 4 8-9"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <style>{`@keyframes uv-cal-pop { from { transform: scale(.6); opacity: 0 } to { transform: none; opacity: 1 } }
          @media (prefers-reduced-motion: reduce) { [style*="uv-cal-pop"] { animation: none !important } }`}</style>
        <h3 className="display mt-5 text-2xl text-foreground">C&apos;est réservé.</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#c2c6d2]">
          <span className="text-foreground">{when}</span>, heure du Maroc
          {elsewhere ? ` (${elsewhere} chez vous)` : ""}. Nous vous appelons au {done.phone}.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={googleCalendarUrl(done.date, done.time, "Appel avec ULTRA VISION", details)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-full bg-foreground px-5 text-[0.7rem] font-medium tracking-[0.12em] text-background uppercase"
          >
            Ajouter à Google Agenda
          </a>
          <a
            href={ics}
            download="appel-ultra-vision.ics"
            className="inline-flex h-10 items-center rounded-full px-5 text-[0.7rem] font-medium tracking-[0.12em] uppercase"
            style={{ border: "1px solid #2b4880", color: "#cddafc" }}
          >
            Apple / Outlook
          </a>
        </div>
        {hasWhatsapp && (
          <a
            href={whatsappUrl("Bonjour ULTRA VISION, je dois déplacer notre appel.")}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-6 inline-block text-[0.8rem] text-[#93C5FD]"
          >
            Un empêchement ? Prévenez-nous sur WhatsApp
          </a>
        )}
      </div>
    );
  }

  /* ---------------------------------------------------------------
   *  Le calendrier.
   * --------------------------------------------------------------- */
  const firstMonth = now ? `${now.date.slice(0, 7)}-01` : null;
  const lastMonth = now ? `${addDays(now.date, BOOKING.horizonDays).slice(0, 7)}-01` : null;
  const shownMonth = month ?? firstMonth;
  const shiftMonth = (n: number) => {
    if (!shownMonth) return;
    const [y = 0, m = 1] = shownMonth.split("-").map(Number);
    setMonth(new Date(Date.UTC(y, m - 1 + n, 1)).toISOString().slice(0, 10));
  };

  const cells: (string | null)[] = [];
  if (shownMonth) {
    const [y = 0, m = 1] = shownMonth.split("-").map(Number);
    const count = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const lead = (weekday(shownMonth) + 6) % 7;
    for (let i = 0; i < lead; i++) cells.push(null);
    for (let d = 1; d <= count; d++)
      cells.push(`${shownMonth.slice(0, 8)}${String(d).padStart(2, "0")}`);
  }

  const dayTimes = day && now ? openTimes(day, now) : [];
  const elsewhere = day && time ? visitorTimeLabel(day, time) : null;

  return (
    <div ref={rootRef} className="rounded-3xl p-6 sm:p-8" style={card}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="eyebrow whitespace-nowrap" style={{ color: "#60A5FA" }}>
          Réserver un appel
        </p>
        <p className="text-[0.7rem] whitespace-nowrap text-[#8792ad]">
          {BOOKING.durationMin} min · heure du Maroc
        </p>
      </div>

      {/* ---------------- Mois ---------------- */}
      <div className="mt-6 flex items-center justify-between">
        <p className="display text-lg text-foreground first-letter:uppercase" aria-live="polite">
          {shownMonth ? monthLabel(shownMonth) : " "}
        </p>
        <div className="flex gap-1">
          {[
            {
              n: -1,
              label: "Mois précédent",
              path: "M12 4l-6 6 6 6",
              off: !shownMonth || shownMonth <= (firstMonth ?? ""),
            },
            {
              n: 1,
              label: "Mois suivant",
              path: "M8 4l6 6-6 6",
              off: !shownMonth || shownMonth >= (lastMonth ?? ""),
            },
          ].map((b) => (
            <button
              key={b.n}
              type="button"
              onClick={() => shiftMonth(b.n)}
              disabled={b.off}
              aria-label={b.label}
              className="flex h-9 w-9 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-25"
              style={{ border: "1px solid #262f45" }}
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d={b.path}
                  stroke="#c3cadb"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- Jours ---------------- */}
      <div
        className="mt-4 grid grid-cols-7 gap-1 text-center"
        role="grid"
        aria-label="Jours disponibles"
      >
        {WEEKDAYS.map((w, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="pb-1 text-[0.62rem] tracking-[0.12em] text-[#5f6b85]"
          >
            {w}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`b${i}`} />;
          const n = free(d).length;
          const on = d === day;
          const today = d === now?.date;
          return (
            <button
              key={d}
              type="button"
              disabled={!n}
              onClick={() => {
                setDay(d);
                setTime(null);
                setError(null);
              }}
              aria-pressed={on}
              aria-label={`${dayLabel(d)}${n ? `, ${n} créneau${n > 1 ? "x" : ""} libre${n > 1 ? "s" : ""}` : ", complet ou fermé"}`}
              className="relative flex aspect-square items-center justify-center rounded-xl text-sm tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-default"
              style={{
                backgroundColor: on ? "#F5F5F3" : n ? "rgba(255,255,255,.05)" : "transparent",
                color: on ? "#090909" : n ? "#F5F5F3" : "#3d4760",
                fontWeight: on ? 600 : 400,
                boxShadow: today && !on ? "inset 0 0 0 1px #3B82F6" : "none",
                transition: `background-color ${MOTION.respond}ms ${EASE_RESPOND}, color ${MOTION.respond}ms ${EASE_RESPOND}`,
              }}
            >
              {Number(d.slice(8))}
            </button>
          );
        })}
      </div>

      {/* ---------------- Heures ---------------- */}
      {day && (
        <div className="mt-6 border-t border-white/5 pt-5">
          <p className="text-[0.8rem] text-[#c3cadb] first-letter:uppercase">{dayLabel(day)}</p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Heures disponibles">
            {dayTimes.map((t) => {
              const gone = taken.has(slotId(day, t));
              const on = t === time;
              return (
                <button
                  key={t}
                  type="button"
                  disabled={gone}
                  onClick={() => {
                    setTime(t);
                    setError(null);
                    // Le formulaire apparait sous les heures : on l'amene a portee de pouce.
                    requestAnimationFrame(() =>
                      formRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }),
                    );
                  }}
                  aria-pressed={on}
                  aria-label={`${timeLabel(t)}${gone ? ", déjà réservé" : ""}`}
                  className="h-10 min-w-[4.5rem] rounded-full border px-4 text-[0.8rem] tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:line-through disabled:opacity-35"
                  style={chip(on)}
                >
                  {timeLabel(t)}
                </button>
              );
            })}
          </div>
          {elsewhere && (
            <p className="mt-3 text-[0.72rem] text-[#8792ad]">
              Soit {elsewhere} à votre heure locale.
            </p>
          )}
        </div>
      )}

      {!now && <div className="mt-4 h-[260px]" aria-hidden="true" />}
      {now && !firstFree && ready && (
        <p className="mt-6 text-sm text-[#8792ad]">
          Tous les créneaux des trois prochaines semaines sont pris. Écrivez-nous sur WhatsApp, nous
          trouverons un moment.
        </p>
      )}

      {/* ---------------- Coordonnees ---------------- */}
      {day && time && (
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="mt-6 border-t border-white/5 pt-5"
          style={{ animation: `uv-cal-in 420ms ${EASE_PAGE} both` }}
        >
          <style>{`@keyframes uv-cal-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
            @media (prefers-reduced-motion: reduce) { form[style*="uv-cal-in"] { animation: none !important } }`}</style>
          <input
            type="text"
            name={FORM.honeypot}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input name="name" label="Nom et prénom" autoComplete="name" required />
            <Input
              name="phone"
              label="Téléphone / WhatsApp"
              type="tel"
              autoComplete="tel"
              required
            />
            <Input name="company" label="Entreprise" autoComplete="organization" />
            <Input name="email" label="E-mail" type="email" autoComplete="email" />
          </div>
          <div className="mt-3">
            <Input name="message" label="Votre projet en une phrase" />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-xs font-medium tracking-[0.14em] uppercase sm:w-auto"
            style={{
              backgroundColor: sending ? "#1f2c48" : "#2563EB",
              color: sending ? "#7d8aa5" : "#fff",
              transition: `background-color ${MOTION.respond}ms ${EASE_RESPOND}`,
            }}
          >
            {sending
              ? "Réservation…"
              : `Réserver ${dayLabel(day).split(" ").slice(0, 2).join(" ")} à ${timeLabel(time)}`}
          </button>
        </form>
      )}

      {error && (
        <p role="alert" className="mt-4 text-[0.82rem] text-[#fca5a5]">
          {error}
        </p>
      )}
    </div>
  );
}

const card = {
  backgroundColor: "rgba(11,16,32,.92)",
  border: "1px solid #1c2742",
  boxShadow: "0 40px 90px -40px rgba(0,0,0,.9)",
  backdropFilter: "blur(8px)",
} as const;

function Input({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-[0.62rem] tracking-[0.14em] uppercase text-[#8792ad]">
        {label}
        {!required && (
          <span className="ml-1 normal-case tracking-normal text-[#5f6b85]">(facultatif)</span>
        )}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 h-11 w-full rounded-xl px-3.5 text-sm outline-none"
        style={{
          backgroundColor: "#070A14",
          border: "1px solid #16203a",
          transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}`,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#3B82F6")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#16203a")}
      />
    </label>
  );
}
