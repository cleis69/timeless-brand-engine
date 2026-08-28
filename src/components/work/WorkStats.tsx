import { useEffect, useRef, useState } from "react";
import { DEMO_STATS, isPlaceholder, type Stat } from "./work.data";
import { useReveal, usePrefersReducedMotion } from "@/hooks/useReveal";

/*
  Avertissement en console tant que le mode demonstration est actif.
  Il ne se voit pas sur le site, mais il rappelle a chaque ouverture des
  outils de developpement que les chiffres affiches sont inventes.
*/
if (typeof window !== "undefined" && DEMO_STATS) {
  console.warn(
    "%c[ULTRA VISION] Chiffres de DEMONSTRATION affiches. " +
      "Passer DEMO_STATS a false dans src/components/work/work.data.ts avant de publier.",
    "color:#3B82F6;font-weight:600",
  );
}

/**
 * ULTRA VISION — bande statistique sous une video.
 *
 *   +42%              3.2M              +87%
 *   VISIBILITE        VUES              ENGAGEMENT
 *
 * Chiffres tres grands, libelles petits et discrets. Le contraste
 * entre les deux fait tout l'effet.
 *
 * AUCUNE LIBRAIRIE D'ANIMATION. Uniquement des transitions CSS et un
 * compteur en requestAnimationFrame. Le projet n'embarque pas
 * framer-motion, et il n'y a aucune raison de l'ajouter pour trois
 * fondus : ce serait 40 ko de plus pour un resultat identique.
 *
 * LES MARQUEURS SONT MASQUES
 *
 * Une valeur encore marquee (STAT_01) n'est pas affichee : ni le chiffre,
 * ni son libelle. Si les trois le sont, la bande entiere disparait, avec
 * son filet de separation — une bande vide surmontee d'un trait se lit
 * comme un bloc casse, pas comme un bloc en attente.
 *
 * Ce que cela change : le garde-fou visuel n'existe plus. Un marqueur
 * oublie ne se voit plus sur le site. Le rappel a bascule dans la console,
 * dans work.data.ts — ne pas l'y supprimer.
 *
 * RESTE UN GARDE-FOU : le compteur anime ne se declenche que sur les
 * vraies valeurs numeriques, et jamais si l'utilisateur a demande a
 * reduire les animations.
 */

const EASE = "cubic-bezier(.16,1,.3,1)";

type Props = {
  stats: [Stat, Stat, Stat];
  /** Retard apres l'apparition de la video, en millisecondes. */
  delay?: number;
  className?: string;
};

export function WorkStats({ stats, delay = 240, className = "" }: Props) {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ amount: 0.25 });

  /*
    Les marqueurs sont retires AVANT le rendu, pas caches en CSS : une
    colonne vide dans une grille en trois parts laisse un trou que l'oeil
    lit comme une donnee manquante.
  */
  const shown = stats.filter((s) => !isPlaceholder(s.value));

  /*
    Aucun chiffre connu : on ne rend rien du tout. Le filet superieur
    part avec, sinon la section se termine sur un trait suivi de vide.
  */
  if (shown.length === 0) return null;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 gap-y-10 border-t border-hairline pt-10 sm:grid-cols-3 sm:gap-x-8 ${className}`}
    >
      {shown.map((stat, i) => (
        <StatCell key={stat.label + i} stat={stat} isVisible={isVisible} delay={delay + i * 60} />
      ))}
    </div>
  );
}

function StatCell({ stat, isVisible, delay }: { stat: Stat; isVisible: boolean; delay: number }) {
  /*
    Par construction StatCell ne recoit plus de marqueur : WorkStats les
    filtre en amont. Le garde reste pour que le composant ne puisse pas
    afficher « STAT_01 » en typographie geante s'il etait un jour appele
    depuis ailleurs.
  */
  if (isPlaceholder(stat.value)) return null;

  return (
    <div
      className="flex flex-col"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity .8s ${EASE} ${delay}ms, transform .8s ${EASE} ${delay}ms`,
      }}
    >
      <span className="display text-[clamp(2.75rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.03em] tabular-nums text-foreground">
        <CountUp value={stat.value} play={isVisible} delay={delay} />
      </span>

      <span className="mt-3 text-[0.7rem] font-medium tracking-[0.16em] uppercase text-muted-foreground">
        {stat.label}
      </span>
    </div>
  );
}

/**
 * Compteur anime.
 *
 * Il decoupe la valeur en trois : ce qui precede le nombre (« + »), le
 * nombre lui-meme, et ce qui suit (« % », « M », « M€ »). Seul le
 * nombre est anime, les symboles restent en place. Sans cela, « +42% »
 * deviendrait « 0% » puis « +42% » d'un coup, ce qui est laid.
 *
 * La courbe d'acceleration est une sortie cubique : le compteur demarre
 * vite puis ralentit en approchant de la valeur finale. Un compteur
 * lineaire fait mecanique.
 */
function CountUp({
  value,
  play,
  delay = 0,
  duration = 1400,
}: {
  value: string;
  play: boolean;
  delay?: number;
  duration?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const match = value.match(/^([^\d-]*)(-?[\d\s.,]+)(.*)$/);

  const [display, setDisplay] = useState<string | null>(null);
  const frame = useRef<number | undefined>(undefined);

  const prefix = match?.[1] ?? "";
  const rawNumber = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";

  const target = parseFloat(rawNumber.replace(/\s/g, "").replace(",", "."));
  const decimals = (rawNumber.split(/[.,]/)[1] ?? "").trim().length;

  useEffect(() => {
    if (!play || reduced || !match || Number.isNaN(target)) return;

    let start: number | null = null;

    const step = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start - delay;

      if (elapsed < 0) {
        frame.current = requestAnimationFrame(step);
        return;
      }

      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target * eased;

      setDisplay(
        decimals > 0
          ? current.toFixed(decimals).replace(".", ",")
          : Math.round(current).toLocaleString("fr-FR"),
      );

      if (t < 1) frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [play, reduced, match, target, decimals, duration, delay]);

  if (!match || Number.isNaN(target) || reduced || display === null) {
    return <>{value}</>;
  }

  return (
    <>
      {prefix}
      {display}
      {suffix}
    </>
  );
}
