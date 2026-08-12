/**
 * ULTRA VISION — logo.
 *
 * ============================================================
 *  CE FICHIER REMPLACE src/components/Logo.tsx
 *  L'interface publique est identique : { className }.
 *  Aucun autre fichier n'a besoin d'etre modifie.
 * ============================================================
 *
 * CE QUI CHANGE
 *
 * L'ancienne version chargeait un PNG de 1983 x 793 px, affiche a
 * 80 x 32 px dans la navigation. Deux problemes :
 *
 * 1. L'image pesait 25 fois sa taille d'affichage.
 * 2. Elle avait un fond noir incruste. La parade employee etait
 *    `mix-blend-screen`, qui rend le noir transparent — mais cette
 *    astuce delave le logo et cesse de fonctionner des qu'on le pose
 *    sur un fond clair.
 *
 * Le SVG n'a pas ces defauts : fond reellement transparent, poids
 * de quelques kilo-octets, nettete parfaite a toutes les tailles.
 *
 * REGLE DE NON-DEFORMATION
 * On ne contraint que la hauteur, via `className` (par exemple `h-8`).
 * La largeur reste `w-auto`. Fixer les deux ecrase le logo des que le
 * rapport ne tombe pas juste.
 *
 * FICHIERS ATTENDUS
 *   public/brand/logo/ultravision-horizontal-dark.svg   (fond sombre)
 *   public/brand/logo/ultravision-horizontal-light.svg  (fond clair)
 *   public/brand/logo/ultravision-mono-white.svg        (sur photo/video)
 *   public/brand/logo/ultravision-nav-compact.svg       (navigation mobile)
 *   public/brand/icon/ultravision-icon-blue.svg         (symbole seul)
 */

const SRC = {
  dark: '/brand/logo/ultravision-horizontal-dark.svg',
  light: '/brand/logo/ultravision-horizontal-light.svg',
  mono: '/brand/logo/ultravision-mono-white.svg',
  compact: '/brand/logo/ultravision-nav-compact.svg',
} as const

export type LogoVariant = keyof typeof SRC

export function Logo({
  className = 'h-8',
  variant = 'dark',
}: {
  className?: string
  variant?: LogoVariant
}) {
  return (
    <img
      src={SRC[variant]}
      alt="ULTRA VISION — agence creative growth"
      className={`${className} w-auto object-contain`}
      loading="eager"
      decoding="async"
      draggable={false}
    />
  )
}

/**
 * Symbole seul, sans le nom.
 * A utiliser quand le nom ULTRA VISION est deja ecrit a cote,
 * ou dans un espace trop etroit pour le logo complet.
 *
 * La densite de pointes s'adapte a la taille : 24 pointes en dessous
 * de 56 px, 36 au dessus. En dessous de 32 px, c'est le favicon qui
 * prend le relais, avec 18 pointes.
 */
export function LogoIcon({
  size = 40,
  className = '',
}: {
  size?: number
  className?: string
}) {
  const src =
    size < 56
      ? '/brand/icon/ultravision-icon-nav-24.svg'
      : '/brand/icon/ultravision-icon-blue.svg'

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={className}
      draggable={false}
    />
  )
}
