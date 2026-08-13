/**
 * ULTRA VISION — texture et jointures.
 *
 * LE PROBLEME QUE CES DEUX COMPOSANTS RESOLVENT
 *
 * Une section en #090909 pur sur mille pixels de haut n'est pas percue
 * comme du noir : elle est percue comme un TROU. L'oeil n'a aucun repere
 * pour estimer la profondeur, alors il abandonne. Meme chose pour un
 * blanc casse en aplat. C'est exactement la sensation de « gros blocs ».
 *
 * Les sites qui paraissent chers ne sont jamais en aplat. Il y a
 * toujours quelque chose sous la surface : une grille, un grain, une
 * lueur. On ne le remarque pas consciemment — c'est justement ce qui
 * fait que ca fonctionne.
 *
 * Deux outils ici :
 *
 *   <Texture />  une grille technique tres faible, estompee sur les
 *                bords. Elle donne une echelle a l'espace vide.
 *
 *   <Seam />     une jointure degradee entre deux sections de valeurs
 *                opposees. Sans elle, le passage du noir au blanc est
 *                une ligne franche qui coupe la page en deux.
 */

type TextureProps = {
  /** 'dark' pose des lignes claires, 'light' des lignes sombres. */
  tone?: "dark" | "light";
  /** Ecart entre les lignes, en pixels. */
  size?: number;
  /** Intensite. Au-dela de 0.06 la grille devient un motif, pas une texture. */
  opacity?: number;
  /** Point d'ancrage de l'estompage. */
  from?: string;
  className?: string;
};

export function Texture({
  tone = "dark",
  size = 76,
  opacity = 0.045,
  from = "50% 0%",
  className = "",
}: TextureProps) {
  const line = tone === "dark" ? "255,255,255" : "9,9,9";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: `linear-gradient(rgba(${line},1) 1px, transparent 1px), linear-gradient(90deg, rgba(${line},1) 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        opacity,
        // L'estompage est essentiel : une grille qui va jusqu'aux bords
        // ressemble a du papier millimetre. Estompee, elle ne se voit
        // plus, elle se ressent.
        maskImage: `radial-gradient(ellipse 90% 70% at ${from}, #000 0%, transparent 78%)`,
        WebkitMaskImage: `radial-gradient(ellipse 90% 70% at ${from}, #000 0%, transparent 78%)`,
      }}
    />
  );
}

type SeamProps = {
  /** Couleur de depart, en haut. */
  from?: string;
  /** Couleur d'arrivee, en bas. */
  to?: string;
  /** Hauteur de la transition. En dessous de 80 px l'effet ne se voit pas. */
  height?: number;
};

/**
 * Jointure entre deux sections.
 *
 * A poser entre deux <section> de valeurs differentes. Le degrade etale
 * la rupture sur cent-vingt pixels au lieu d'un seul, et la frontiere
 * cesse d'etre une coupure.
 */
export function Seam({ from = "#090909", to = "#F5F5F3", height = 120 }: SeamProps) {
  return (
    <div
      aria-hidden="true"
      style={{ height, background: `linear-gradient(to bottom, ${from}, ${to})` }}
    />
  );
}
