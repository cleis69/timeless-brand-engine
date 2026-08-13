import { useEffect, useRef, type ReactNode } from "react";

/**
 * ULTRA VISION — element aimante.
 *
 * L'element se deplace vers le curseur quand celui-ci s'en approche,
 * puis revient a sa place. C'est le detail qui fait dire « ce site est
 * bien fait » sans qu'on sache pourquoi : le bouton semble avoir
 * anticipe le geste.
 *
 * TROIS REGLES
 *
 * 1. Deplacement limite a 28 % de la distance. Au-dela, le bouton fuit
 *    le curseur au lieu de l'accueillir, et devient difficile a cliquer.
 * 2. Rayon d'attraction de 110 px. Plus large, plusieurs elements
 *    bougent en meme temps et la page se met a fremir.
 * 3. Rien sur ecran tactile. Il n'y a pas de curseur a suivre, et
 *    ecouter les mouvements pour rien coute de la batterie.
 *
 * On n'ecoute le curseur qu'une fois pour toute la page, et on
 * n'anime que `transform`.
 */

export function Magnetic({
  children,
  strength = 0.28,
  radius = 110,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        tx = dx * strength;
        ty = dy * strength;
      } else {
        tx = 0;
        ty = 0;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

      if (Math.abs(tx - x) > 0.05 || Math.abs(ty - y) > 0.05) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength, radius]);

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
}
