/**
 * ULTRA VISION — point d'entree unique de GSAP.
 *
 * ScrollTrigger n'est enregistre qu'une seule fois, et uniquement dans
 * le navigateur : le rendu serveur ne doit jamais toucher `window`.
 *
 * Toutes les animations du site passent par ces reglages. Une seule
 * courbe, une seule duree : c'est ce qui donne l'impression d'un site
 * ecrit d'une seule main.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function registerGsap() {
  if (registered || typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

/** Courbe d'entree — demarrage franc, arrivee tres amortie. */
export const GSAP_EASE = 'power3.out'

/** Durees, en secondes. Courtes : une entree lente se lit comme une attente. */
export const GSAP_DURATION = {
  enter: 0.8,
  fast: 0.45,
} as const

export const GSAP_STAGGER = 0.08

/** Reglage de declenchement commun a toutes les sections. */
export const GSAP_TRIGGER = {
  start: 'top 85%',
  once: true,
} as const

/** Le visiteur a-t-il demande moins d'animations ? */
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export { gsap, ScrollTrigger }
