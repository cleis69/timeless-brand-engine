import { useEffect, useRef, type CSSProperties } from 'react'
import { prefersReducedMotion } from '@/lib/gsap'

/**
 * ULTRA VISION — fond anime Vanta.
 *
 * Trois precautions, toutes obligatoires ici :
 *
 * 1. Vanta et three sont charges en import dynamique, dans un effet.
 *    Les deux touchent `window` et `document` des leur evaluation :
 *    importes en haut de fichier, ils feraient tomber le rendu serveur.
 *
 * 2. THREE est passe explicitement a l'effet. Les bundles de Vanta
 *    cherchent sinon un `window.THREE` global, absent d'un projet
 *    moderne.
 *
 * 3. L'instance est detruite au demontage. Sans cela, chaque changement
 *    de page laisse un canvas WebGL et une boucle d'animation en vie.
 *
 * L'effet est desactive quand le visiteur a demande moins d'animations,
 * sur mobile, et sur les machines peu puissantes : un fond decoratif ne
 * doit jamais couter une image perdue.
 */

type VantaInstance = { destroy: () => void }

export function VantaBackground({
  className = '',
  style,
  opacity = 0.5,
}: {
  className?: string
  style?: CSSProperties
  opacity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let instance: VantaInstance | null = null
    let cancelled = false

    const el = ref.current
    if (!el) return

    const lowPower =
      window.innerWidth < 1024 ||
      (typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 8) <= 4)

    if (prefersReducedMotion() || lowPower) return

    void (async () => {
      try {
        const THREE = await import('three')
        const mod = await import('vanta/dist/vanta.dots.min.js')
        if (cancelled || !ref.current) return

        const DOTS = (mod as { default: (opts: Record<string, unknown>) => VantaInstance })
          .default

        instance = DOTS({
          el: ref.current,
          THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          // Monochrome strict : fond noir de la charte, points et lignes
          // en gris clair. Aucune couleur, aucun degrade.
          backgroundColor: 0x090909,
          color: 0xf5f5f3,
          color2: 0x8a8a8a,
          size: 1.6,
          spacing: 42,
          showLines: true,
        })
      } catch {
        // Un fond decoratif ne doit jamais casser la page : en cas
        // d'echec, la section reste simplement noire.
      }
    })()

    return () => {
      cancelled = true
      instance?.destroy()
      instance = null
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity, ...style }}
    />
  )
}
