import { Link } from '@tanstack/react-router'
import { FEATURED_WORK, type WorkItem } from './work.data'
import { WorkRail } from './WorkRail'
import { MaskReveal, Reveal } from '@/components/Reveal'

/**
 * ULTRA VISION — section « Selected Work ».
 *
 * POSITION DANS LA PAGE
 * Cette section se place immediatement apres le Hero, AVANT le bandeau de
 * logos clients. C'est le point le plus important de tout le projet : le
 * visiteur doit voir une realisation des le premier scroll, pas apres avoir
 * traverse trois blocs de texte.
 *
 * Ordre voulu sur la page d'accueil :
 *   Hero -> VideoShowcase -> logos clients -> expertises -> methode -> ...
 *
 * RYTHME
 * Quatre realisations sur l'accueil, pas davantage. Au dela, la page devient
 * un catalogue et perd sa tension. Les autres vivent sur /realisations.
 */

type Props = {
  items?: WorkItem[]
  /** Titre de section. */
  title?: string
  label?: string
  intro?: string
  /** Affiche le lien vers la page complete. */
  withLink?: boolean
  className?: string
}

export function VideoShowcase({
  items = FEATURED_WORK,
  label = 'SELECTED WORK',
  title = 'Ce que nous produisons.',
  intro = 'Films de marque, campagnes publicitaires et contenus performants. Produits en interne, de l ecriture au montage final.',
  withLink = true,
  className = '',
}: Props) {
  return (
    <section
      aria-labelledby="selected-work-title"
      className={`relative overflow-hidden bg-[#090909] py-28 sm:py-36 lg:py-44 ${className}`}
    >
      {/* Halo bleu tres discret, ancre en haut a droite. Le bleu reste un
          accent : jamais un fond. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full opacity-[0.16] blur-[130px]"
        style={{ background: 'radial-gradient(circle, #1D4ED8 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* ---------- En-tete de section ---------- */}
        <header className="mb-20 sm:mb-28">
          <Reveal>
            <div className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]"
                aria-hidden="true"
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8A8A8A]">
                {label}
              </span>
            </div>
          </Reveal>

          <h2
            id="selected-work-title"
            className="font-display mt-8 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.035em] text-[#F5F5F3]"
          >
            <MaskReveal delay={80}>{title}</MaskReveal>
          </h2>

          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <Reveal delay={160}>
              <p className="max-w-xl text-[16px] leading-relaxed text-[#8A8A8A] sm:text-[17px]">
                {intro}
              </p>
            </Reveal>

            {withLink && (
              <Reveal delay={220}>
                <Link
                  to="/realisations"
                  className="group inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#F5F5F3] outline-none transition-colors duration-300 hover:text-[#60A5FA] focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#090909]"
                >
                  Voir toutes les realisations
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
              </Reveal>
            )}
          </div>
        </header>

        {/* ---------- Les realisations ---------- */}
        <WorkRail items={items} />
      </div>
    </section>
  )
}

export default VideoShowcase
