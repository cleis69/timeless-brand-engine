import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import {
  GSAP_DURATION,
  GSAP_EASE,
  GSAP_STAGGER,
  GSAP_TRIGGER,
  gsap,
  prefersReducedMotion,
  registerGsap,
} from '@/lib/gsap'

/**
 * Apparition d'une section au scroll, pilotee par GSAP + ScrollTrigger.
 *
 * Usage :
 *   const ref = useSectionReveal<HTMLElement>()
 *   <section ref={ref}> ... <div data-reveal> ... </div> </section>
 *
 * Chaque enfant portant `data-reveal` monte de 24 px en se revelant, en
 * cascade. L'animation ne joue qu'une fois : rejouer au retour de scroll
 * donne l'impression d'un site qui clignote.
 *
 * Si le visiteur a demande moins d'animations, tout s'affiche
 * immediatement — aucune transformation, aucun risque de contenu
 * invisible.
 */
export function useSectionReveal<T extends HTMLElement>(options?: {
  selector?: string
  stagger?: number
  y?: number
}) {
  const ref = useRef<T>(null)
  const selector = options?.selector ?? '[data-reveal]'
  const stagger = options?.stagger ?? GSAP_STAGGER
  const y = options?.y ?? 24

  useGSAP(
    () => {
      registerGsap()
      const root = ref.current
      if (!root) return

      const targets = Array.from(root.querySelectorAll<HTMLElement>(selector))
      const items = targets.length ? targets : [root]

      if (prefersReducedMotion()) {
        gsap.set(items, { clearProps: 'all', opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: GSAP_DURATION.enter,
          ease: GSAP_EASE,
          stagger,
          scrollTrigger: { trigger: root, ...GSAP_TRIGGER },
        },
      )
    },
    { scope: ref },
  )

  return ref
}
