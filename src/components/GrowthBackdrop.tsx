import { useReveal } from "@/hooks/useReveal";
import { PLATFORMS, PlatformChip } from "./PlatformChip";

/**
 * ULTRA VISION — decor de croissance.
 *
 * CE QUE CA REPRESENTE
 *
 * Une courbe qui monte, des barres qui grandissent, et les plateformes
 * publicitaires posees le long de la progression. La promesse de
 * l'agence traduite en image : de la diffusion payante vers de la vente.
 *
 * A poser en fond d'une section, jamais seul.
 *
 * TROIS REGLES
 *
 * 1. Ca reste un DECOR. Aucune valeur chiffree sur les axes. Une courbe
 *    de fond qui affiche des chiffres devient un graphique, donc une
 *    allegation qu'il faudrait pouvoir prouver. Ici elle ne dit rien de
 *    mesurable, elle donne une direction.
 *
 * 2. Ca s'anime UNE FOIS, a l'entree dans l'ecran. Une courbe qui se
 *    redessine en boucle attire l'oeil en permanence et concurrence le
 *    texte qu'elle accompagne.
 *
 * 3. Aucune librairie. Un SVG pour la courbe, du HTML pour les
 *    pastilles — c'est ce qui permet aux logos de se replier sur du
 *    texte si le fichier manque.
 */

/* Positions en pourcentage du cadre, pour suivre la courbe a toute taille. */
const POSITIONS = [
  { left: "22%", top: "58%", delay: 900 },
  { left: "50%", top: "40%", delay: 1150 },
  { left: "77%", top: "22%", delay: 1400 },
];

const BARRES = [
  { x: 120, h: 26 },
  { x: 236, h: 44 },
  { x: 352, h: 58 },
  { x: 468, h: 86 },
  { x: 584, h: 112 },
  { x: 700, h: 148 },
  { x: 816, h: 190 },
];

export function GrowthBackdrop({ className = "" }: { className?: string }) {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ amount: 0.15 });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className} ${isVisible ? "uvg-on" : ""}`}
    >
      <style>{`
        @keyframes uv-draw  { to { stroke-dashoffset: 0; } }
        @keyframes uv-rise  { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes uv-pop   { from { opacity: 0; transform: translate(-50%, calc(-50% + 12px)); }
                              to   { opacity: 1; transform: translate(-50%, -50%); } }
        @keyframes uv-fade  { to { opacity: 1; } }

        .uvg-line { stroke-dasharray: 1200; stroke-dashoffset: 1200; }
        .uvg-bar  { transform-origin: center bottom; transform: scaleY(0); }
        .uvg-soft { opacity: 0; }
        .uvg-chip { opacity: 0; transform: translate(-50%, -50%); }

        .uvg-on .uvg-line { animation: uv-draw 2200ms cubic-bezier(.22,1,.36,1) forwards; }
        .uvg-on .uvg-bar  { animation: uv-rise 900ms cubic-bezier(.19,1,.22,1) forwards; }
        .uvg-on .uvg-soft { animation: uv-fade 1200ms ease-out 500ms forwards; }
        .uvg-on .uvg-chip { animation: uv-pop 700ms cubic-bezier(.19,1,.22,1) forwards; }

        @media (prefers-reduced-motion: reduce) {
          .uvg-on .uvg-line { animation: none; stroke-dashoffset: 0; }
          .uvg-on .uvg-bar  { animation: none; transform: scaleY(1); }
          .uvg-on .uvg-soft { animation: none; opacity: 1; }
          .uvg-on .uvg-chip { animation: none; opacity: 1; }
        }
      `}</style>

      <svg
        viewBox="0 0 960 340"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0.55 }}
      >
        <defs>
          <linearGradient id="uvgLine" x1="0" y1="340" x2="960" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1D4ED8" stopOpacity="0.25" />
            <stop offset="0.55" stopColor="#3B82F6" stopOpacity="0.9" />
            <stop offset="1" stopColor="#60A5FA" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="uvgFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3B82F6" stopOpacity="0.16" />
            <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="uvgBar" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="1" stopColor="#3B82F6" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {BARRES.map((b, i) => (
          <rect
            key={b.x}
            className="uvg-bar"
            x={b.x}
            y={310 - b.h}
            width="34"
            height={b.h}
            rx="4"
            fill="url(#uvgBar)"
            style={{ animationDelay: `${i * 90}ms` }}
          />
        ))}

        <path
          className="uvg-soft"
          d="M40 300 C 190 292, 260 250, 360 232 S 560 190, 660 132 S 830 74, 920 40 L920 320 L40 320 Z"
          fill="url(#uvgFill)"
        />

        <path
          className="uvg-line"
          d="M40 300 C 190 292, 260 250, 360 232 S 560 190, 660 132 S 830 74, 920 40"
          fill="none"
          stroke="url(#uvgLine)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle className="uvg-soft" cx="920" cy="40" r="4.5" fill="#60A5FA" />
        <circle
          className="uvg-soft"
          cx="920"
          cy="40"
          r="11"
          fill="none"
          stroke="#3B82F6"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
      </svg>

      {/* Les plateformes, en HTML pour que les logos puissent se replier
          sur du texte quand le fichier n'est pas encore depose. */}
      {POSITIONS.map((pos, i) => {
        const platform = PLATFORMS[i];
        if (!platform) return null;
        return (
          <PlatformChip
            key={platform.label}
            platform={platform}
            className="uvg-chip absolute hidden sm:flex"
            style={{ left: pos.left, top: pos.top, animationDelay: `${pos.delay}ms` }}
          />
        );
      })}

      {/* Estompage : le decor ne doit jamais concurrencer le texte pose dessus. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(9,9,9,0.55) 0%, rgba(9,9,9,0.18) 45%, rgba(9,9,9,0.88) 100%)",
        }}
      />
    </div>
  );
}
