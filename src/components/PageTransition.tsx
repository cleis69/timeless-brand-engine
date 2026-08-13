import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * ULTRA VISION — transition entre les pages : l'obturateur.
 *
 * LE PRINCIPE
 *
 * A chaque changement de page, l'iris de la marque grandit depuis le
 * point exact ou le visiteur vient de cliquer, jusqu'a recouvrir
 * l'ecran. Un eclat bleu marque le declenchement. Puis l'iris se
 * retracte et devoile la nouvelle page.
 *
 * POURQUOI DEPUIS LE POINT CLIQUE, ET NON DEPUIS LE CENTRE
 *
 * Le lien que le visiteur vient de toucher devient l'origine du
 * mouvement. Son regard est deja a cet endroit : il n'a rien a
 * rattraper. Une transition partant du centre de l'ecran oblige l'oeil
 * a se deplacer deux fois, une pour la fermeture, une pour la nouvelle
 * page.
 *
 * POURQUOI L'IRIS ET NON UN VOILE
 *
 * Le symbole de la marque s'appelle un iris. Un iris, ca se ferme.
 * L'analogie n'est pas decorative, elle est exacte — et pour une agence
 * qui produit de la video, l'obturateur d'objectif est le geste metier
 * par excellence. C'est aussi la seule transition qu'un concurrent ne
 * peut pas copier sans copier le logo.
 *
 * L'ECLAT
 *
 * Volontairement discret : 35 % d'opacite, 120 ms. Un flash marque le
 * declenchement, mais repete a chaque navigation il devient vite
 * agressif. Assez pour qu'on l'entende, pas assez pour qu'on le
 * subisse.
 *
 * TROIS PRECAUTIONS
 *
 * - Rien au premier chargement. Une page d'accueil qui demarre par un
 *   rideau noir se fait fermer.
 * - `pointer-events: none` en permanence : jamais d'interception de clic.
 * - Neutralise si l'utilisateur a demande moins d'animations. Un
 *   mouvement plein ecran est exactement ce qui declenche les genes
 *   vestibulaires.
 */

const DURATION = 1560;

export function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [phase, setPhase] = useState<"idle" | "close" | "open">("idle");
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const first = useRef(true);
  const point = useRef({ x: 0.5, y: 0.5 });

  /* On memorise en continu la derniere position cliquee. Au moment ou
     la route change, on sait d'ou faire partir l'obturateur. */
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      point.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  useEffect(() => {
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

    setOrigin({ x: point.current.x * 100, y: point.current.y * 100 });
    setPhase("close");

    const toOpen = window.setTimeout(() => setPhase("open"), DURATION * 0.46);
    const toIdle = window.setTimeout(() => setPhase("idle"), DURATION);

    return () => {
      window.clearTimeout(toOpen);
      window.clearTimeout(toIdle);
    };
  }, [pathname]);

  if (phase === "idle") return null;

  const closed = phase === "close";

  /* Le facteur d'echelle doit couvrir l'ecran depuis n'importe quel
     point. Le pire cas est un clic dans un angle : la diagonale
     complete. On prend large plutot que de calculer au plus juste. */
  const cover = 62;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      {/* L'eclat de declenchement */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${origin.x}% ${origin.y}%, #60A5FA 0%, #3B82F6 26%, transparent 62%)`,
          opacity: closed ? 0.35 : 0,
          transition: closed ? "opacity 120ms ease-out 560ms" : "opacity 340ms ease-out",
        }}
      />

      {/* La pupille : c'est elle qui masque reellement la page */}
      <div
        className="absolute h-4 w-4 rounded-full will-change-transform"
        style={{
          left: `${origin.x}%`,
          top: `${origin.y}%`,
          backgroundColor: "#090909",
          transform: `translate(-50%, -50%) scale(${closed ? cover * 1.9 : 0})`,
          transition: `transform ${DURATION * 0.46}ms cubic-bezier(.76,0,.24,1)`,
        }}
      />

      {/* L'iris, par-dessus : il donne le geste et la couleur */}
      <img
        src="/brand/icon/ultravision-icon-blue.svg"
        alt=""
        width={120}
        height={120}
        className="absolute w-[120px] will-change-transform"
        style={{
          left: `${origin.x}%`,
          top: `${origin.y}%`,
          transform: `translate(-50%, -50%) scale(${closed ? 5.4 : 0.2}) rotate(${closed ? 150 : 285}deg)`,
          opacity: closed ? 0.9 : 0,
          transition: `transform ${DURATION * 0.46}ms cubic-bezier(.76,0,.24,1), opacity ${closed ? 260 : 400}ms ease-out ${closed ? 0 : 240}ms`,
        }}
      />
    </div>
  );
}
