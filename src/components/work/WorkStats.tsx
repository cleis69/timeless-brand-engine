import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { isPlaceholder, type Stat } from './work.data'
import { useReveal, usePrefersReducedMotion } from '@/hooks/useReveal'
import { EASE, DURATION } from '@/lib/motion'

/**
 * ULTRA VISION — bande statistique sous une video.
 *
 *   +42%              3.2M              +87%
 *   VISIBILITE        VUES              ENGAGEMENT
 *
 * Chiffres tres grands, libelles petits et discrets. Le contraste entre les
 * deux fait tout l'effet.
 *
 * DEUX GARDE-FOUS
 *
 * 1. Tant qu'une valeur est un marqueur (STAT_01), elle s'affiche en grise
 *    avec la mention « a completer ». Impossible de publier un faux chiffre
 *    sans le voir.
 *
 * 2. Le compteur anime ne se declenche que sur les vraies valeurs
 *    numeriques, et jamais si l'utilisateur a demande a reduire les
 *    animations.
 */

type Props = {
  stats: [Stat, Stat, Stat]
  /** Retard apres l'apparition de la video, en secondes. */
  delay?: number
  className?: string
}

export function WorkStats({ stats, delay = 0.24, className = '' }: Props) {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ amount: 0.3 })

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 gap-y-10 border-t border-[#262626] pt-10 sm:grid-cols-3 sm:gap-x-8 ${className}`}
    >
      {stats.map((stat, i) => (
        <StatCell
          key={stat.label + i}
          stat={stat}
          isVisible={isVisible}
          delay={delay + i * 0.06}
        />
      ))}
    </div>
  )
}

function StatCell({
  stat,
  isVisible,
  delay,
}: {
  stat: Stat
  isVisible: boolean
  delay: number
}) {
  const pending = isPlaceholder(stat.value)

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: DURATION.slow, ease: EASE.out, delay }}
      className="flex flex-col"
    >
      <span
        className={[
          'font-display tabular-nums leading-[0.9] tracking-[-0.03em]',
          'text-[clamp(2.75rem,7vw,4.5rem)]',
          pending ? 'text-[#3a3a3a]' : 'text-[#F5F5F3]',
        ].join(' ')}
      >
        {pending ? (
          stat.value
        ) : (
          <CountUp value={stat.value} play={isVisible} delay={delay} />
        )}
      </span>

      <span className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8A8A8A]">
        {stat.label}
      </span>

      {pending && (
        <span className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[#5a5a5a]">
          a completer
        </span>
      )}
    </motion.div>
  )
}

/**
 * Compteur anime.
 *
 * Il decoupe la valeur en trois : ce qui precede le nombre (« + »), le nombre
 * lui-meme, et ce qui suit (« % », « M », « M€ »). Seul le nombre est anime,
 * les symboles restent en place. Sans cela, « +42% » deviendrait « 0% » puis
 * « +42% » d'un coup, ce qui est laid.
 *
 * La courbe d'acceleration est une sortie cubique : le compteur demarre vite
 * puis ralentit en approchant de la valeur finale. Un compteur lineaire fait
 * mecanique.
 */
function CountUp({
  value,
  play,
  delay = 0,
  duration = 1400,
}: {
  value: string
  play: boolean
  delay?: number
  duration?: number
}) {
  const reduced = usePrefersReducedMotion()
  const match = value.match(/^([^\d-]*)(-?[\d\s.,]+)(.*)$/)

  const [display, setDisplay] = useState<string | null>(null)
  const frame = useRef<number>()

  const prefix = match?.[1] ?? ''
  const rawNumber = match?.[2] ?? ''
  const suffix = match?.[3] ?? ''

  const target = parseFloat(rawNumber.replace(/\s/g, '').replace(',', '.'))
  const decimals = (rawNumber.split(/[.,]/)[1] ?? '').trim().length

  useEffect(() => {
    if (!play || reduced || !match || Number.isNaN(target)) return

    let start: number | null = null
    const startDelay = delay * 1000

    const step = (now: number) => {
      if (start === null) start = now
      const elapsed = now - start - startDelay

      if (elapsed < 0) {
        frame.current = requestAnimationFrame(step)
        return
      }

      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = target * eased

      setDisplay(
        decimals > 0
          ? current.toFixed(decimals).replace('.', ',')
          : Math.round(current).toLocaleString('fr-FR'),
      )

      if (t < 1) frame.current = requestAnimationFrame(step)
    }

    frame.current = requestAnimationFrame(step)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [play, reduced, match, target, decimals, duration, delay])

  // Valeur non numerique, animation desactivee, ou avant le depart : valeur brute.
  if (!match || Number.isNaN(target) || reduced || display === null) {
    return <>{value}</>
  }

  return (
    <>
      {prefix}
      {display}
      {suffix}
    </>
  )
}
