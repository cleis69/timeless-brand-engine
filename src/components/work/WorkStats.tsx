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
 * DEUX GARDE-FOUS
 *
 * 1. Tant qu'une valeur est un marqueur (STAT_01), elle s'affiche en
 *    grise avec la mention « a completer ». Impossible de publier un
 *    faux chiffre sans le voir.
 *
 * 2. Le compteur anime ne se declenche que sur les vraies valeurs
 *    numeriques, et jamais si l'utilisateur a demande a reduire les
 *    animations.
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

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 gap-y-10 border-t border-hairline pt-10 sm:grid-cols-3 sm:gap-x-8 ${className}`}
    >
      {stats.map((stat, i) => (
        <StatCell
          key={stat.label + i}
          stat={stat}
          isVisible={isVisible}
          delay={delay + i * 60}
        />
      ))}
    </div>
  );
}

function StatCell({
  stat,
  isVisible,
  delay,
}: {
  stat: Stat;
  isVisible: boolean;
  delay: number;
}) {
  const pending = isPlaceholder(stat.value);

  return (
    <div
      className="flex flex-col"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity .8s ${EASE} ${delay}ms, transform .8s ${EASE} ${delay}ms`,
      }}
    >
      {/*
        Deux tailles, et c'est volontaire.

        Une vraie valeur est courte — « +42% », « 3.2M » — donc elle
        supporte une typographie tres grande, qui est tout l'effet
        recherche. Un marqueur comme « STAT_01 » fait sept caracteres :
        a la meme taille il deborde de sa colonne et chevauche ses
        voisins. Le marqueur s'affiche donc en petit, en grise, le temps
        que tu renseignes le vrai chiffre.
      */}
      <span
        className={[
          "display tabular-nums leading-[0.9] tracking-[-0.03em]",
          pending
            ? "text-[clamp(1.05rem,1.8vw,1.35rem)] text-[#3a3a3a]"
            : "text-[clamp(2.75rem,7vw,4.5rem)] text-foreground",
        ].join(" ")}
      >
        {pending ? stat.value : <CountUp value={stat.value} play={isVisible} delay={delay} />}
      </span>

      <span className="mt-3 text-[0.7rem] font-medium tracking-[0.16em] uppercase text-muted-foreground">
        {stat.label}
      </span>

      {pending && (
        <span className="mt-2 text-[0.62rem] tracking-[0.12em] uppercase text-[#5a5a5a]">
          à compléter
        </span>
      )}
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
