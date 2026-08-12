import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { WorkItem } from './work.data'
import { usePrefersReducedMotion } from '@/hooks/useReveal'
import { EASE, DURATION } from '@/lib/motion'

/**
 * ULTRA VISION — lecteur video.
 *
 * CE QUE FAIT CE COMPOSANT, EN CLAIR
 *
 * Une page qui charge neuf videos en meme temps met dix secondes a s'afficher
 * et fait chauffer les telephones. Ce lecteur ne charge la video que lorsque
 * le visiteur s'en approche, et la met en pause des qu'elle sort de l'ecran.
 *
 * Le deroule pour chaque video :
 *
 *   1. Au depart, seule l'image poster est affichee. Poids : environ 80 ko.
 *      La video n'est pas chargee du tout (`preload="none"`).
 *   2. Quand le visiteur arrive a 300 px de la video, on branche les sources
 *      et le navigateur commence a telecharger.
 *   3. Quand la video entre reellement dans l'ecran, la lecture demarre.
 *   4. Des qu'elle sort de l'ecran, pause immediate : on libere le decodeur
 *      video et on economise la batterie.
 *
 * SON ET LECTURE AUTOMATIQUE
 * Les navigateurs interdisent la lecture automatique avec du son. C'est une
 * regle, pas un reglage. Les videos demarrent donc en muet. Un bouton permet
 * de retablir le son, ce qui constitue l'action utilisateur exigee.
 */

type Props = {
  item: WorkItem
  /** Coins arrondis en pixels, pilotes par l'animation du parent. */
  radius?: number
  className?: string
  /** Affiche le bouton de son. Reserve a la video principale. */
  withSound?: boolean
}

export function VideoPlayer({ item, radius = 20, className = '', withSound = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [shouldLoad, setShouldLoad] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [canPlay, setCanPlay] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hovered, setHovered] = useState(false)

  const reduced = usePrefersReducedMotion()

  /* --- Etape 1 : precharger quand le visiteur approche --------------------- */
  useEffect(() => {
    const el = containerRef.current
    if (!el || shouldLoad) return
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shouldLoad])

  /* --- Etape 2 : lire dans l'ecran, mettre en pause en dehors -------------- */
  useEffect(() => {
    const el = containerRef.current
    const video = videoRef.current
    if (!el || !video || !shouldLoad) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
          video.play().then(
            () => setIsPlaying(true),
            () => setIsPlaying(false), // le navigateur a refuse, ce n'est pas une erreur
          )
        } else {
          video.pause()
          setIsPlaying(false)
        }
      },
      { threshold: [0, 0.25, 0.6] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shouldLoad])

  /* --- Barre de progression ----------------------------------------------- */
  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return
    const onTime = () => {
      if (video.duration > 0) setProgress((video.currentTime / video.duration) * 100)
    }
    video.addEventListener('timeupdate', onTime)
    return () => video.removeEventListener('timeupdate', onTime)
  }, [shouldLoad])

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => setIsPlaying(true), () => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [])

  const toggleSound = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }, [])

  const controlsVisible = hovered || !isPlaying

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden bg-[#111111] ${className}`}
      style={{ aspectRatio: item.aspect.replace('/', ' / '), borderRadius: radius }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Poster : visible immediatement, s'efface quand la video est prete */}
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

      {/* Voile bas : garantit la lisibilite des surtitres poses sur la video */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: 'linear-gradient(to top, rgba(9,9,9,0.55), transparent)',
        }}
      />

      {/* Commandes */}
      <AnimatePresence>
        {controlsVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE.out }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? `Mettre en pause ${item.title}` : `Lire ${item.title}`}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/35 text-[#F5F5F3] backdrop-blur-sm outline-none transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-black/50 focus-visible:ring-2 focus-visible:ring-[#3B82F6] sm:h-20 sm:w-20"
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton de son, sur la video principale uniquement */}
      {withSound && shouldLoad && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
          className="absolute right-4 top-4 flex h-10 items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 text-[11px] font-semibold tracking-[0.14em] text-[#F5F5F3] backdrop-blur-sm outline-none transition-colors duration-300 hover:border-white/35 hover:bg-black/55 focus-visible:ring-2 focus-visible:ring-[#3B82F6] sm:right-6 sm:top-6"
        >
          {isMuted ? 'SON' : 'MUET'}
        </button>
      )}

      {/* Progression : un filet bleu, sans fioriture */}
      {!reduced && shouldLoad && (
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
          <div
            className="h-full bg-[#3B82F6] transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}
