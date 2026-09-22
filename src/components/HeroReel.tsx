import { useCallback, useEffect, useRef, useState } from "react";
import { EASE_PAGE, LOOP } from "@/config/motion";
import { WORK_ITEMS, shownStats, type WorkItem } from "@/components/work/work.data";
import { WorkPlayer } from "@/components/work/WorkPlayer";
import { FloatingPlatforms } from "@/components/FloatingPlatforms";

/**
 * ULTRA VISION — nos publicites, au centre de l'iris.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/components/HeroReel.tsx
 *  Il remplace IrisBackdrop dans le premier ecran de l'accueil.
 * ============================================================
 *
 * L'IDEE
 *
 * Le premier ecran montrait un iris qui tournait a vide et un titre
 * abstrait. Un visiteur mettait un defilement entier a decouvrir que
 * l'agence fait des videos. Sur telephone, il n'en voyait aucune.
 *
 * Ici, l'iris de la marque — l'oeil d'ULTRA VISION — a enfin quelque
 * chose a regarder : nos vraies publicites, qui passent l'une apres
 * l'autre en son centre, au format ou elles vivent (vertical, comme
 * une story). Les trois plateformes gravitent autour. Tout le metier
 * tient dans l'image : on tourne, on diffuse.
 *
 * LE POIDS
 *
 * Les videos du ruban pesent 2 a 5 Mo meme en version mobile. Ici, ce
 * sont des boucles de 6 secondes, 360 x 640, sans son : 260 a 500 Ko,
 * generees a partir des memes films (public/work/<slug>/loop.mp4, avec
 * leur premiere image en loop.webp). UNE SEULE se charge a la fois,
 * celle du centre.
 *
 * Pas de video du tout si le visiteur a demande moins d'animations ou
 * active l'economiseur de donnees : les images fixes suffisent, et le
 * visiteur peut toujours passer d'une carte a l'autre.
 *
 * ET QUAND ON VEUT LE SON
 *
 * Le bouton « Avec le son » ouvre le lecteur plein ecran du site,
 * sur la version complete du film.
 */

/**
 * L'ordre de passage. Deux secteurs differents se suivent toujours,
 * et le film le plus vu ouvre la sequence.
 */
const REEL = ["africa-beauty", "residence-neuve", "scultbody", "institut-beaute", "loisirs"];

/** Duree d'affichage quand la video ne peut pas jouer (economie, refus). */
const STILL_MS = 6000;

const ITEMS = REEL.map((slug) => WORK_ITEMS.find((w) => w.slug === slug)).filter(
  (w): w is WorkItem => Boolean(w),
);

const loopOf = (w: WorkItem) => `/work/${w.slug}/loop.mp4`;
const stillOf = (w: WorkItem) => `/work/${w.slug}/loop.webp`;

/*
  Les pastilles de plateformes, placees autour de la pile de cartes et
  non plus sur toute la largeur du hero : elles « orbitent » autour des
  films qu'elles diffusent.
*/
const PLATFORM_SLOTS = [
  { top: "9%", left: "2%", drift: 0.6 },
  { top: "46%", left: "80%", drift: 1.0 },
  { top: "80%", left: "6%", drift: 1.4 },
];

export function HeroReel() {
  const n = ITEMS.length;
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [visible, setVisible] = useState(true);
  const [playing, setPlaying] = useState<WorkItem | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const next = useCallback(() => {
    setProgress(0);
    setCurrent((c) => (c + 1) % n);
  }, [n]);

  /* Video seulement si le visiteur n'a demande ni calme ni economie. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    );
    setCanPlay(!reduced && !saveData);
  }, []);

  /* Hors de l'ecran, rien ne tourne : ni video, ni changement de carte. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(Boolean(e?.isIntersecting)), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (visible && !playing) {
      v.play().catch((err: DOMException) => {
        // Seul un refus franc du navigateur (lecture automatique bloquee)
        // fait renoncer a la video. Une lecture interrompue parce que la
        // carte vient de changer ou que la section sort de l'ecran leve
        // une AbortError sans gravite : on n'abandonne pas pour si peu.
        if (err?.name === "NotAllowedError") setCanPlay(false);
      });
    } else v.pause();
  }, [visible, playing, current, canPlay]);

  /* Sans video, les cartes avancent seules au meme rythme. */
  useEffect(() => {
    if (canPlay || !visible || playing) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = window.setTimeout(next, STILL_MS);
    return () => window.clearTimeout(t);
  }, [canPlay, visible, playing, current, next]);

  const offset = (i: number) => {
    let d = (i - current + n) % n;
    if (d > n / 2) d -= n;
    return d;
  };

  const front = ITEMS[current];
  const stat = front ? shownStats(front)[0] : undefined;

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-[560px]">
      <style>{`
        @keyframes uv-reel-spin { from { transform: translate(-50%,-50%) rotate(0deg) } to { transform: translate(-50%,-50%) rotate(360deg) } }
        .uv-reel-iris { animation: uv-reel-spin ${LOOP.iris}s linear infinite; }
        .uv-reel-card { transition: transform 820ms ${EASE_PAGE}, opacity 620ms ${EASE_PAGE}, filter 620ms ${EASE_PAGE}; }
        @media (prefers-reduced-motion: reduce) {
          .uv-reel-iris { animation: none; }
          .uv-reel-card { transition: none; }
        }
      `}</style>

      {/* ---------- L'iris et le contre-jour, derriere les films ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(59,130,246,.42), rgba(29,78,216,.16) 55%, transparent)",
            filter: "blur(30px)",
          }}
        />
        <img
          src="/brand/icon/ultravision-icon-blue.svg"
          alt=""
          width={512}
          height={512}
          draggable={false}
          className="uv-reel-iris absolute top-1/2 left-1/2 w-[150%] max-w-none opacity-[0.34] sm:w-[135%] lg:opacity-[0.5]"
          style={{
            maskImage: "radial-gradient(closest-side, #000 58%, transparent)",
            WebkitMaskImage: "radial-gradient(closest-side, #000 58%, transparent)",
          }}
        />
      </div>

      <FloatingPlatforms slots={PLATFORM_SLOTS} />

      {/* ---------- Les films ---------- */}
      <div // La hauteur suit la carte du centre (46 % de large en 9:16 sur
        // telephone, 40 % au-dela) : plus basse, elle deborderait sur les
        // boutons en dessous.
        className="relative z-[1] flex aspect-[25/23] items-center justify-center sm:aspect-[6/5]"
      >
        {ITEMS.map((w, i) => {
          const d = offset(i);
          const isFront = d === 0;
          const hidden = Math.abs(d) > 1;
          return (
            <div
              key={w.slug}
              className="uv-reel-card absolute top-1/2 left-1/2 aspect-[9/16] w-[46%] overflow-hidden sm:w-[40%]"
              style={{
                borderRadius: 20,
                transform: `translate(-50%,-50%) translateX(${d * 64}%) translateY(${isFront ? 0 : 5}%) rotate(${d * 6}deg) scale(${isFront ? 1 : 0.86})`,
                opacity: hidden ? 0 : 1,
                filter: isFront ? "none" : "brightness(.5) saturate(.7)",
                zIndex: 10 - Math.abs(d),
                boxShadow: isFront
                  ? "inset 0 1px 0 rgba(191,219,254,.45), 0 0 0 1px rgba(96,165,250,.35), 0 40px 80px -24px rgba(0,0,0,.95), 0 0 90px -20px rgba(59,130,246,.55)"
                  : "0 24px 50px -20px rgba(0,0,0,.9), 0 0 0 1px rgba(255,255,255,.06)",
              }}
            >
              <img
                src={stillOf(w)}
                alt=""
                width={360}
                height={640}
                // La carte du centre est la premiere chose que l'on voit sur
                // telephone : elle se charge en priorite, les autres ensuite.
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {isFront && canPlay && (
                <video
                  key={w.slug}
                  ref={videoRef}
                  src={loopOf(w)}
                  poster={stillOf(w)}
                  muted
                  playsInline
                  autoPlay
                  preload="auto"
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    if (v.duration) setProgress(v.currentTime / v.duration);
                  }}
                  onEnded={next}
                  onError={() => setCanPlay(false)}
                  aria-hidden="true"
                  tabIndex={-1}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              {/* Les cartes laterales se cliquent : on passe directement a elles. */}
              {!isFront && !hidden && (
                <button
                  type="button"
                  onClick={() => {
                    setProgress(0);
                    setCurrent(i);
                  }}
                  aria-label={`Voir ${w.title}`}
                  className="absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              )}
            </div>
          );
        })}

        {/* ---------- Habillage de la carte du centre ---------- */}
        {front && (
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 z-[20] aspect-[9/16] w-[46%] -translate-x-1/2 sm:w-[40%] -translate-y-1/2"
            style={{ borderRadius: 20 }}
          >
            {/*
              Les segments de progression, comme une story. Ils disent au
              visiteur que ce n'est pas une image : qu'il y a une suite,
              et combien de films il reste a voir.
            */}
            <div className="absolute inset-x-3 top-3 flex gap-1" aria-hidden="true">
              {ITEMS.map((w, i) => (
                <span
                  key={w.slug}
                  className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/25"
                >
                  <span
                    className="block h-full origin-left bg-white"
                    style={{
                      transform: `scaleX(${i < current ? 1 : i === current ? progress : 0})`,
                    }}
                  />
                </span>
              ))}
            </div>

            <div
              className="absolute inset-x-0 bottom-0 rounded-b-[20px] p-3.5 sm:p-4"
              style={{
                background:
                  "linear-gradient(to top, rgba(9,9,9,.88), rgba(9,9,9,.35) 65%, transparent)",
              }}
            >
              <p className="display truncate text-[0.95rem] text-foreground">{front.title}</p>
              {stat && (
                <p className="mt-0.5 text-[0.62rem] tracking-[0.12em] text-[#cfd6e6]">
                  <span className="display text-[0.85rem] text-foreground">{stat.value}</span>{" "}
                  {stat.label}
                </p>
              )}
              <button
                type="button"
                onClick={() => setPlaying(front)}
                className="pointer-events-auto mt-2.5 inline-flex h-8 items-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-black/35 px-3 text-[0.6rem] font-medium tracking-[0.12em] uppercase text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                <svg width="8" height="9" viewBox="0 0 20 22" fill="#fff" aria-hidden="true">
                  <path d="M0 1.2C0 .3 1 -.3 1.8.2l17 9.8c.8.5.8 1.6 0 2L1.8 21.8C1 22.3 0 21.7 0 20.8V1.2Z" />
                </svg>
                Avec le son
              </button>
            </div>
          </div>
        )}
      </div>

      <WorkPlayer item={playing} onClose={() => setPlaying(null)} />
    </div>
  );
}
