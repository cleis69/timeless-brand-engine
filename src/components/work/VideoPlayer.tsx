import { useEffect, useRef, useState, useCallback } from "react";
import type { WorkItem } from "./work.data";
import { usePrefersReducedMotion } from "@/hooks/useReveal";

/**
 * ULTRA VISION — lecteur video.
 *
 * AUCUNE LIBRAIRIE. Transitions CSS et IntersectionObserver natif.
 *
 * CE QUE FAIT CE COMPOSANT, EN CLAIR
 *
 * Une page qui charge quatre videos en meme temps met plusieurs
 * secondes a s'afficher et fait chauffer les telephones. Ce lecteur
 * ne charge la video que lorsque le visiteur s'en approche, et la met
 * en pause des qu'elle sort de l'ecran.
 *
 * Le deroule pour chaque video :
 *
 *   1. Au depart, seule l'image poster est affichee, environ 80 ko.
 *      La video n'est pas chargee du tout.
 *   2. A 300 px de l'ecran, on branche les sources et le navigateur
 *      commence a telecharger.
 *   3. Quand la video entre reellement dans l'ecran, la lecture demarre.
 *   4. Des qu'elle sort, pause immediate : on libere le decodeur video
 *      et on economise la batterie.
 *
 * SON ET LECTURE AUTOMATIQUE
 * Les navigateurs interdisent la lecture automatique avec du son.
 * C'est une regle, pas un reglage. Les videos demarrent donc en muet.
 * Un bouton permet de retablir le son, ce qui constitue l'action
 * utilisateur exigee par le navigateur.
 */

type Props = {
  item: WorkItem;
  /** Coins arrondis en pixels. */
  radius?: number;
  className?: string;
  /** Affiche le bouton de son. Reserve a la premiere video. */
  withSound?: boolean;
  /**
   * Pilotage externe de la lecture.
   *
   * Non renseigne : la video joue des qu'elle entre dans l'ecran.
   * Renseigne : elle ne joue que si `active` vaut true ET qu'elle est
   * visible. C'est ce que le rail utilise pour ne faire tourner qu'une
   * seule video a la fois — les trois autres restent sur leur image
   * fixe. Avec des fichiers de 5 a 6 Mo, c'est la difference entre une
   * page fluide et une page qui rame.
   */
  active?: boolean;
};

export function VideoPlayer({
  item,
  radius = 20,
  className = "",
  withSound = false,
  active,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [canPlay, setCanPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  const reduced = usePrefersReducedMotion();

  /* --- Etape 1 : precharger quand le visiteur approche --------------- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || shouldLoad) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldLoad]);

  /* --- Etape 2 : savoir si la video est dans l'ecran ----------------- */
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !shouldLoad) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.25),
      { threshold: [0, 0.25, 0.6] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldLoad]);

  /* --- Etape 3 : lire ou mettre en pause ----------------------------- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    const shouldPlay = inView && (active ?? true);

    if (shouldPlay) {
      video.play().then(
        () => setIsPlaying(true),
        () => setIsPlaying(false), // le navigateur a refuse, ce n'est pas une erreur
      );
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [inView, active, shouldLoad]);

  /* --- Barre de progression ----------------------------------------- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    const onTime = () => {
      if (video.duration > 0) setProgress((video.currentTime / video.duration) * 100);
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, [shouldLoad]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(
        () => setIsPlaying(true),
        () => {},
      );
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const controlsVisible = hovered || !isPlaying;

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden bg-surface ${className}`}
      style={{
        // Dans le rail, la carte impose sa hauteur : on ne force donc pas
        // de rapport d'image, sinon la video deborderait de sa colonne.
        ...(className.includes("!absolute")
          ? {}
          : { aspectRatio: item.aspect.replace("/", " / ") }),
        borderRadius: radius,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Poster : visible immediatement, s'efface quand la video tourne */}
      <img
        src={item.poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: canPlay && isPlaying ? 0 : 1 }}
        loading="lazy"
        decoding="async"
      />

      {shouldLoad && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={item.poster}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setCanPlay(true)}
        >
          {/* L'ordre compte : le navigateur prend la premiere source qu'il sait lire. */}
          {item.sources.mobile && (
            <source src={item.sources.mobile} type="video/mp4" media="(max-width: 768px)" />
          )}
          {item.sources.webm && <source src={item.sources.webm} type="video/webm" />}
          <source src={item.sources.mp4} type="video/mp4" />
        </video>
      )}

      {/* Voile bas : garantit la lisibilite de ce qui est pose sur la video */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{ background: "linear-gradient(to top, rgba(9,9,9,0.55), transparent)" }}
      />

      {/* Commandes */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{
          opacity: controlsVisible ? 1 : 0,
          pointerEvents: controlsVisible ? "auto" : "none",
        }}
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? `Mettre en pause ${item.title}` : `Lire ${item.title}`}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/35 text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-black/50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none sm:h-20 sm:w-20"
        >
          {isPlaying ? (
            <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor" aria-hidden="true">
              <rect x="0" y="0" width="6" height="20" rx="1" />
              <rect x="12" y="0" width="6" height="20" rx="1" />
            </svg>
          ) : (
            <svg width="20" height="22" viewBox="0 0 20 22" fill="currentColor" aria-hidden="true">
              <path d="M0 1.2C0 .3 1 -.3 1.8.2l17 9.8c.8.5.8 1.6 0 2L1.8 21.8C1 22.3 0 21.7 0 20.8V1.2Z" />
            </svg>
          )}
        </button>
      </div>

      {/* Bouton de son, sur la premiere video uniquement */}
      {withSound && shouldLoad && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? "Activer le son" : "Couper le son"}
          className="absolute top-4 right-4 flex h-10 items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 text-[0.68rem] font-semibold tracking-[0.14em] text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-white/35 hover:bg-black/55 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none sm:top-6 sm:right-6"
        >
          {isMuted ? "SON" : "MUET"}
        </button>
      )}

      {/* Progression : un filet bleu, sans fioriture */}
      {!reduced && shouldLoad && (
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
          <div
            className="h-full bg-accent transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
