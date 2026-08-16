import { useRef, type ElementType } from 'react'
import { useGSAP } from '@gsap/react'
import { GSAP_TRIGGER, gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap'

/**
 * React Bits — SplitText.
 *
 * React Bits est une bibliotheque de composants a recopier, pas une
 * dependance npm : le composant vit donc ici, dans le projet, et suit
 * la charte du site plutot que ses valeurs par defaut.
 *
 * Adaptation ULTRA VISION : decoupage par mots (jamais par lettres —
 * sur un titre editorial, les lettres qui sautent une a une font
 * gadget), montee courte, cascade serree, une seule lecture.
 *
 * Le texte complet reste present dans le DOM pour les moteurs de
 * recherche et les lecteurs d'ecran : seul l'affichage est fractionne.
 */
export function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.05,
}: {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
}) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      registerGsap()
      const root = ref.current
      if (!root) return
      const words = root.querySelectorAll<HTMLElement>('[data-word]')
      if (!words.length) return

      if (prefersReducedMotion()) {
        gsap.set(words, { opacity: 1, yPercent: 0 })
        return
      }

      gsap.fromTo(
        words,
        { opacity: 0, yPercent: 100 },
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger,
          delay,
          scrollTrigger: { trigger: root, ...GSAP_TRIGGER },
        },
      )
    },
    { scope: ref, dependencies: [text] },
  )

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.08em', marginBottom: '-0.08em' }}
        >
          <span data-word className="inline-block" style={{ opacity: 0 }}>
            {word}
          </span>
          {i < text.split(' ').length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  )
}
