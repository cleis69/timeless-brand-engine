import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import type { WorkItem } from './work.data'
import { VideoPlayer } from './VideoPlayer'
import { WorkStats } from './WorkStats'
import { MaskReveal, Reveal } from '@/components/Reveal'
import { useReveal, usePrefersReducedMotion, useIsMobile } from '@/hooks/useReveal'
import { EASE } from '@/lib/motion'

/**
 * ULTRA VISION — une realisation.
 *
 * DEUX MISES EN PAGE, CHOISIES AUTOMATIQUEMENT
 *
 * Le composant regarde le rapport d'image de la video et adapte la mise
 * en page. C'est indispensable : une video verticale 9:16 affichee sur
 * toute la largeur d'un ecran de 1440 px ferait 2 560 px de haut. Le
 * visiteur ne verrait jamais qu'un tiers de l'image.
 *
 *   Format vertical (9:16, 4:5)
 *     -> deux colonnes sur desktop. La video tient dans 82 % de la hauteur
 *        d'ecran, le texte et les chiffres se placent a cote.
 *     -> les blocs alternent gauche et droite d'une realisation a l'autre,
 *        ce qui cree un rythme au lieu d'une colonne monotone.
 *
 *   Format horizontal (16:9, 21:9)
 *     -> pleine largeur, texte au-dessus, chiffres en dessous.
 *
 * L'ANIMATION
 *
 * Trois mouvements superposes, du plus visible au plus discret :
 *
 * 1. L'ENTREE. Le bloc arrive reduit a 92 % et invisible, coins tres
 *    arrondis a 32 px. Il grandit jusqu'a sa taille reelle et ses coins se
 *    resserrent a 20 px. La video prend possession de l'espace.
 *
 * 2. LA PARALLAXE. L'image glisse de quelques pourcents a l'interieur de
 *    son cadre pendant le scroll. Cadre et contenu ne bougent pas a la
 *    meme vitesse, d'ou une sensation de profondeur. C'est subtil par
 *    construction : une parallaxe que l'on remarque est une parallaxe ratee.
 *
 * 3. LA CASCADE. Titre a 120 ms, chiffres a 240 ms, puis 60 ms entre
 *    chaque chiffre. L'oeil est guide dans l'ordre de lecture voulu.
 *
 * SUR MOBILE la parallaxe est coupee, la reduction passe de 92 a 97 %, les
 * durees sont raccourcies. Une animation qui saccade coute plus cher en
 * credibilite qu'une animation absente.
 *
 * SI L'UTILISATEUR A REDUIT LES ANIMATIONS tout est neutralise.
 */

type Props = {
  item: WorkItem
  index: number
  total: number
}

export function VideoReveal({ item, index, total }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const { ref: revealRef, isVisible } = useReveal<HTMLDivElement>({ amount: 0.12 })

  const animate = !reduced && !isMobile
  const isPortrait = item.aspect === '9/16' || item.aspect === '4/5'
  const flipped = isPortrait && index % 2 === 0

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  /* Le ressort adoucit la valeur brute du scroll. Sans lui, le mouvement
     colle exactement a la molette et parait nerveux. */
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  })

  const parallaxY = useTransform(smooth, [0, 1], animate ? ['-3%', '3%'] : ['0%', '0%'])
  const scale = useTransform(smooth, [0, 0.5, 1], animate ? [1.05, 1, 1.05] : [1, 1, 1])

  const enterScale = reduced ? 1 : isMobile ? 0.97 : 0.92
  const enterDuration = isMobile ? 0.6 : 1
  const numero = String(index).padStart(2, '0')

  /* ---------------------------------------------------------------- */
  /*  Blocs reutilises par les deux mises en page                      */
  /* ---------------------------------------------------------------- */

  const meta = (
    <div className="min-w-0">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-[13px] tabular-nums tracking-[0.1em] text-[#3B82F6]">
          {numero}
        </span>
        <span className="h-px w-8 bg-[#262626]" aria-hidden="true" />
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8A8A8A]">
          {item.category}
        </span>
      </div>

      <h3
        id={`work-${item.slug}-title`}
        className="font-display mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-[-0.03em] text-[#F5F5F3]"
      >
        <MaskReveal delay={120}>{item.title}</MaskReveal>
      </h3>

      <Reveal delay={200}>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#8A8A8A] sm:text-[16px]">
          {item.description}
        </p>
        {item.year && (
          <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#5a5a5a]">
            {item.year}
          </p>
        )}
      </Reveal>
    </div>
  )

  const video = (
    <motion.div
      ref={revealRef}
      initial={{ opacity: 0, scale: enterScale, borderRadius: 32 }}
      animate={
        isVisible
          ? { opacity: 1, scale: 1, borderRadius: 20 }
          : { opacity: 0, scale: enterScale, borderRadius: 32 }
      }
      transition={{ duration: enterDuration, ease: EASE.expo }}
      className="relative overflow-hidden will-change-transform"
      style={{
        borderRadius: 20,
        /* Garde-fou : une video verticale ne depasse jamais 82 % de la
           hauteur d'ecran, et reste centree dans sa colonne. */
        ...(isPortrait ? { maxHeight: '82vh', maxWidth: 480, marginInline: 'auto' } : {}),
      }}
    >
      <motion.div style={{ y: parallaxY, scale }} className="will-change-transform">
        <VideoPlayer item={item} radius={20} withSound={index === 1} />
      </motion.div>
    </motion.div>
  )

  /* ---------------------------------------------------------------- */
  /*  Mise en page verticale : deux colonnes                           */
  /* ---------------------------------------------------------------- */

  if (isPortrait) {
    return (
      <section
        ref={sectionRef}
        aria-labelledby={`work-${item.slug}-title`}
        className="relative"
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div
            className={[
              'lg:col-span-5',
              flipped ? 'lg:order-2 lg:col-start-8' : 'lg:order-1',
            ].join(' ')}
          >
            {video}
          </div>

          <div
            className={[
              'flex flex-col justify-center lg:col-span-6',
              flipped ? 'lg:order-1 lg:col-start-1' : 'lg:order-2',
            ].join(' ')}
          >
            {meta}
            <WorkStats stats={item.stats} delay={0.24} className="mt-12" />
          </div>
        </div>

        {index < total && (
          <div className="mt-24 h-px w-full bg-[#262626] sm:mt-32" aria-hidden="true" />
        )}
      </section>
    )
  }

  /* ---------------------------------------------------------------- */
  /*  Mise en page horizontale : pleine largeur                        */
  /* ---------------------------------------------------------------- */

  return (
    <section
      ref={sectionRef}
      aria-labelledby={`work-${item.slug}-title`}
      className="relative"
    >
      <div className="mb-8 sm:mb-10">{meta}</div>
      {video}
      <WorkStats stats={item.stats} delay={0.24} className="mt-12 sm:mt-16" />

      {index < total && (
        <div className="mt-20 h-px w-full bg-[#262626] sm:mt-28" aria-hidden="true" />
      )}
    </section>
  )
}
