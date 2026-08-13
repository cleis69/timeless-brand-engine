import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * ULTRA VISION — transition entre les pages.
 *
 * CE QUE CA FAIT
 *
 * A chaque changement de page, un voile noir monte depuis le bas,
 * couvre l'ecran une fraction de seconde, puis poursuit sa course vers
 * le haut en devoilant la nouvelle page. Le symbole de la marque passe
 * au centre pendant le recouvrement.
 *
 * POURQUOI CA CHANGE LA PERCEPTION
 *
 * Sans transition, une navigation en React donne un remplacement sec :
 * le contenu disparait et un autre apparait au meme instant. C'est
 * rapide, mais ca ne ressemble a rien — l'oeil ne comprend pas ce qui
 * s'est passe.
 *
 * Le voile occupe ce vide. Il ne rend pas la navigation plus rapide, il
 * la rend lisible. C'est un des rares effets qui se remarque sans
 * qu'on sache l'expliquer.
 *
 * DUREE
 *
 * 900 ms au total. En dessous, l'oeil ne suit pas. Au-dessus, on attend.
 *
 * TROIS PRECAUTIONS
 *
 * - Rien au premier chargement. Une page d'accueil qui demarre par un
 *   rideau noir se fait fermer.
 * - `pointer-events: none` en permanence : le voile ne doit jamais
 *   intercepter un clic, meme pendant qu'il couvre l'ecran.
 * - Neutralise si l'utilisateur a demande moins d'animations. Un voile
 *   plein ecran est exactement ce qui declenche les genes vestibulaires.
 */

export function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [playing, setPlaying] = useState(false);
  const [run, setRun] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    // Premier rendu : on ne joue rien.
    if (first.current) {
      first.current = false;
      return;
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // `run` change a chaque navigation : la cle React remonte l'element
    // et relance l'animation depuis le debut. Sans ca, deux navigations
    // rapprochees ne rejoueraient pas le voile.
    setRun((n) => n + 1);
    setPlaying(true);

    const timer = window.setTimeout(() => setPlaying(false), 950);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!playing) return null;

  return (
    <div
      key={run}
      aria-hidden="true"
      className="uv-wipe pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "#090909" }}
    >
      <style>{`
        @keyframes uv-wipe-move {
          0%   { transform: translateY(100%); }
          38%  { transform: translateY(0%); }
          58%  { transform: translateY(0%); }
          100% { transform: translateY(-100%); }
        }
        @keyframes uv-wipe-mark {
          0%, 26%   { opacity: 0; }
          44%, 54%  { opacity: 1; }
          72%, 100% { opacity: 0; }
        }
        .uv-wipe { animation: uv-wipe-move 900ms cubic-bezier(.76,0,.24,1) forwards; }
        .uv-wipe-mark { animation: uv-wipe-mark 900ms linear forwards; }
      `}</style>

      <span className="uv-wipe-mark text-[0.7rem] tracking-[0.28em] text-accent">
        ULTRA VISION
      </span>
    </div>
  );
}
