import { useEffect, useRef, useState } from 'react'

/**
 * ULTRA VISION — apparition au scroll, version increvable.
 *
 * POURQUOI CE FICHIER EXISTE
 *
 * Sur la version actuelle du site, plusieurs sections restent invisibles :
 * la section CTA finale, la colonne gauche de la FAQ, une partie des
 * realisations. Le contenu est bien present dans la page, mais son opacite
 * reste bloquee a 0.
 *
 * Trois causes possibles, et ce hook neutralise les trois :
 *
 * 1. Le seuil de declenchement est trop haut. Si on exige que 50 % d'une
 *    section de 900 px soit visible et que l'ecran ne fait que 700 px, le
 *    seuil ne peut jamais etre atteint. -> seuil bas par defaut.
 *
 * 2. L'element est deja passe au-dessus de l'ecran au moment ou l'observateur
 *    se met en place, par exemple si le navigateur restaure la position de
 *    scroll. L'observateur ne se declenche jamais. -> verification manuelle
 *    de la position au montage.
 *
 * 3. IntersectionObserver n'est pas disponible ou echoue silencieusement.
 *    -> filet de securite temporise.
 *
 * REGLE : aucun contenu ne doit jamais rester invisible. Une animation ratee
 * doit degrader vers du contenu visible, jamais vers du vide.
 */

type Options = {
  /** Part de l'element qui doit etre visible pour declencher. 0.15 = 15 %. */
  amount?: number
  /** Marge autour de l'ecran. Negatif en bas = declenche un peu plus tard. */
  rootMargin?: string
  /** L'animation ne joue qu'une fois. Vrai par defaut. */
  once?: boolean
  /**
   * Filet de securite en millisecondes. Passe ce delai, le contenu est
   * affiche quoi qu'il arrive. Mettre 0 pour desactiver.
   */
  safetyMs?: number
}

export function useReveal<T extends HTMLElement = HTMLDivElement>({
  amount = 0.15,
  rootMargin = '0px 0px -8% 0px',
  once = true,
  safetyMs = 2500,
}: Options = {}) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // L'utilisateur a demande moins d'animations : on affiche tout, tout de suite.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setIsVisible(true)
      return
    }

    // Cause 3 : pas d'observateur disponible.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    // Cause 2 : l'element est deja dans l'ecran, ou deja passe au-dessus.
    const rect = el.getBoundingClientRect()
    const alreadyPassed = rect.top < window.innerHeight && rect.bottom > 0
    if (alreadyPassed) {
      setIsVisible(true)
      if (once) return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: amount, rootMargin },
    )

    observer.observe(el)

    // Filet de securite : si rien ne s'est declenche, on affiche.
    let timer: number | undefined
    if (safetyMs > 0) {
      timer = window.setTimeout(() => {
        setIsVisible((v) => {
          if (!v) observer.disconnect()
          return true
        })
      }, safetyMs)
    }

    return () => {
      observer.disconnect()
      if (timer) window.clearTimeout(timer)
    }
  }, [amount, rootMargin, once, safetyMs])

  return { ref, isVisible }
}

/**
 * Indique si la page a ete scrollee au-dela d'un seuil.
 * Sert au fond de la navbar : transparente en haut, #090909 des qu'on scrolle.
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

/** Vrai si l'utilisateur a demande a reduire les animations. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/** Vrai en dessous de 768 px. Sert a alleger les animations sur mobile. */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    setIsMobile(mq.matches)
    const onChange = () => setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [breakpoint])

  return isMobile
}
