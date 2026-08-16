import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { GSAP_TRIGGER, gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap'

/**
 * Compteur anime, declenche a l'entree dans l'ecran.
 *
 * La valeur est une chaine libre du type « 10 000 », « 50 K€ », « +15 »
 * ou « 100 % » : on isole le nombre, on anime le nombre seul, et on
 * remet le prefixe et le suffixe autour. Le separateur de milliers
 * d'origine est conserve pour eviter tout saut de largeur.
 */
export function useCountUp<T extends HTMLElement>(value: string, enabled = true) {
  const ref = useRef<T>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || !enabled) return
      registerGsap()

      const match = value.match(/[\d\u202f\u00a0 ,.]*\d/)
      if (!match) return

      const raw = match[0]
      const prefix = value.slice(0, match.index ?? 0)
      const suffix = value.slice((match.index ?? 0) + raw.length)
      const grouped = /[\u202f\u00a0 ]/.test(raw)
      const target = Number(raw.replace(/[^\d]/g, ''))
      if (!Number.isFinite(target)) return

      const format = (n: number) => {
        const rounded = Math.round(n)
        const body = grouped
          ? rounded.toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, '\u202f')
          : String(rounded)
        return `${prefix}${body}${suffix}`
      }

      if (prefersReducedMotion()) {
        el.textContent = value
        return
      }

      const state = { n: 0 }
      el.textContent = format(0)

      gsap.to(state, {
        n: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = format(state.n)
        },
        scrollTrigger: { trigger: el, ...GSAP_TRIGGER },
      })
    },
    { dependencies: [value, enabled] },
  )

  return ref
}
