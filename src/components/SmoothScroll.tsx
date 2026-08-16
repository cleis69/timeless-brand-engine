import { useEffect, useRef, type ReactNode } from 'react'
import { ReactLenis, type LenisRef } from 'lenis/react'
import { ScrollTrigger, gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap'

/**
 * ULTRA VISION — defilement lisse.
 *
 * Lenis prend la main sur le scroll de la page et le lisse. Trois
 * points de vigilance, tous traites ici :
 *
 * 1. Lenis et ScrollTrigger doivent parler. Sans `lenis.on('scroll',
 *    ScrollTrigger.update)`, les animations se declenchent au mauvais
 *    endroit puisque ScrollTrigger n'est plus prevenu du deplacement.
 *
 * 2. Lenis est avance par le ticker GSAP, avec `lagSmoothing(0)`. Deux
 *    boucles d'animation concurrentes produisent un micro-tremblement
 *    permanent ; une seule horloge, et il disparait.
 *
 * 3. `autoRaf: false` : c'est GSAP qui pilote, pas Lenis.
 *
 * Les ancres et la navigation collante ne sont pas touchees : le
 * defilement natif reste celui du document, on ne deplace aucun
 * conteneur.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    registerGsap()
    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    if (prefersReducedMotion()) {
      lenis.destroy()
      return
    }

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(raf)
    }
  }, [])

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        // Le tactile garde son inertie native : la lisser donne une
        // sensation de glissade que personne n'attend sur telephone.
        syncTouch: false,
        autoRaf: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
