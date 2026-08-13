import { useEffect, useRef } from "react";
import { statsOf, type WorkItem } from "./work.data";
import { VideoPlayer } from "./VideoPlayer";
import { WorkStats } from "./WorkStats";
import { MaskReveal, Reveal } from "@/components/Reveal";
import { useReveal, usePrefersReducedMotion, useIsMobile } from "@/hooks/useReveal";

/**
 * ULTRA VISION — une realisation.
 *
 * AUCUNE LIBRAIRIE D'ANIMATION. Le projet n'embarque pas
 * framer-motion, et l'ajouter aurait coute 40 ko pour un resultat
 * identique. Tout passe par des transitions CSS et une seule boucle
 * d'animation native pour la parallaxe.
 *
 * DEUX MISES EN PAGE, CHOISIES AUTOMATIQUEMENT
 *
 * Le composant regarde le rapport d'image de la video et adapte la
 * mise en page. C'est indispensable : une video verticale 9:16
 * affichee sur toute la largeur d'un ecran de 1440 px ferait 2 560 px
 * de haut. Le visiteur n'en verrait qu'un tiers.
 *
 *   Format vertical (9:16, 4:5)
 *     -> deux colonnes sur grand ecran. La video tient dans 82 % de la
 *        hauteur d'ecran, le texte et les chiffres se placent a cote.
 *     -> les blocs alternent gauche et droite d'une realisation a
 *        l'autre, ce qui cree un rythme au lieu d'une colonne monotone.
 *
 *   Format horizontal (16:9, 21:9)
 *     -> pleine largeur, texte au-dessus, chiffres en dessous.
 *
 * L'ANIMATION : TROIS MOUVEMENTS SUPERPOSES
 *
 * 1. L'ENTREE. Le bloc arrive reduit a 92 % et invisible, coins tres
 *    arrondis a 32 px. Il grandit jusqu'a sa taille reelle et ses
 *    coins se resserrent a 20 px. La video prend possession de
 *    l'espace.
 *
 * 2. LA PARALLAXE. L'image glisse de quelques pourcents a l'interieur
 *    de son cadre pendant le scroll. Cadre et contenu ne bougent pas a
 *    la meme vitesse, d'ou une sensation de profondeur. C'est subtil
 *    par construction : une parallaxe que l'on remarque est une
 *    parallaxe ratee.
 *
 * 3. LA CASCADE. Titre a 120 ms, chiffres a 240 ms, puis 60 ms entre
 *    chaque chiffre. L'oeil est guide dans l'ordre de lecture voulu.
 *
 * SUR MOBILE la parallaxe est coupee et la reduction passe de 92 a
 * 97 %. Une animation qui saccade coute plus cher en credibilite
 * qu'une animation absente.
 *
 * SI L'UTILISATEUR A REDUIT LES ANIMATIONS tout est neutralise.
 */

const EASE_EXPO = "cubic-bezier(.19,1,.22,1)";

/**
 * Parallaxe maison.
 *
 * Une seule boucle, synchronisee sur le rafraichissement de l'ecran
 * via requestAnimationFrame, qui ecrit directement dans le style de
 * l'element. On n'anime que `transform`, la seule propriete que la
 * carte graphique traite sans recalculer la mise en page. C'est ce qui
 * garantit 60 images par seconde.
 */
function useParallax(ref: React.RefObject<HTMLDivElement | null>, enabled: boolean) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!enabled) {
      el.style.transform = "";
      return;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 quand le bloc entre par le bas, 1 quand il sort par le haut.
      const p = Math.min(Math.max((vh - r.top) / (vh + r.height), 0), 1);
      const y = (p - 0.5) * 6; // -3 % a +3 %
      const s = 1 + Math.abs(p - 0.5) * 0.1; // 1 a 1,05
      el.style.transform = `translate3d(0, ${y.toFixed(3)}%, 0) scale(${s.toFixed(4)})`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, enabled]);
}

type Props = {
  item: WorkItem;
  index: number;
  total: number;
};

export function VideoReveal({ item, index, total }: Props) {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const { ref: revealRef, isVisible } = useReveal<HTMLDivElement>({ amount: 0.12 });
  const parallaxRef = useRef<HTMLDivElement>(null);

  const animate = !reduced && !isMobile;
  useParallax(parallaxRef, animate);

  const isPortrait = item.aspect === "9/16" || item.aspect === "4/5";
  const flipped = isPortrait && index % 2 === 0;

  const enterScale = reduced ? 1 : isMobile ? 0.97 : 0.92;
  const enterDuration = isMobile ? 600 : 1000;
  const numero = String(index).padStart(2, "0");

  /* ---------------------------------------------------------------- */
  /*  Blocs reutilises par les deux mises en page                      */
  /* ---------------------------------------------------------------- */

  const meta = (
    <div className="min-w-0">
      <div className="flex items-baseline gap-4">
        <span className="display text-[0.8rem] tracking-[0.1em] tabular-nums text-accent">
          {numero}
        </span>
        <span className="h-px w-8 bg-hairline" aria-hidden="true" />
        <span className="text-[0.7rem] font-medium tracking-[0.16em] uppercase text-muted-foreground">
          {item.category}
        </span>
      </div>

      <h3
        id={`work-${item.slug}-title`}
        className="display mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98] tracking-[-0.03em]"
      >
        <MaskReveal delay={120}>{item.title}</MaskReveal>
      </h3>

      <Reveal delay={200}>
        <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
          {item.description}
        </p>
        {item.year && (
          <p className="mt-3 text-[0.7rem] tracking-[0.16em] uppercase text-[#5a5a5a]">
            {item.year}
          </p>
        )}
      </Reveal>
    </div>
  );

  /*
    LA PROFONDEUR

    Trois couches empilees, et c'est ce qui separe une image collee sur
    une page d'un objet pose dans un espace :

      1. Une plaque bleue inclinee de quelques degres, en arriere-plan.
         Elle depasse d'un cote, comme une feuille glissee sous une
         autre. C'est ce decalage qui cree la sensation d'epaisseur.
      2. Une lueur diffuse derriere la video, qui la decolle du fond.
      3. Une ombre portee profonde sous la carte elle-meme.

    L'inclinaison alterne d'une realisation a l'autre, en miroir de la
    mise en page. Sans cette alternance, les plaques pencheraient toutes
    du meme cote et l'oeil y verrait un defaut plutot qu'une intention.
  */
  const tilt = flipped ? 6 : -6;

  const video = (
    <div
      className="relative"
      style={isPortrait ? { maxWidth: 480, marginInline: "auto" } : undefined}
    >
      {/* Couche 1 — la plaque inclinee */}
      <div
        aria-hidden="true"
        className="absolute inset-x-4 top-6 bottom-6 rounded-[26px]"
        style={{
          background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
          opacity: isVisible ? 0.3 : 0,
          transform: `rotate(${isVisible ? tilt : 0}deg)`,
          transition: `opacity ${enterDuration}ms ${EASE_EXPO} 120ms, transform ${enterDuration}ms ${EASE_EXPO} 120ms`,
        }}
      />

      {/* Couche 2 — la lueur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.20) 0%, transparent 68%)",
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${enterDuration}ms ease-out 200ms`,
          filter: "blur(28px)",
        }}
      />

      {/* Couche 3 — la carte */}
      <div
        ref={revealRef}
        className="relative overflow-hidden will-change-transform"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1)" : `scale(${enterScale})`,
          borderRadius: isVisible ? 20 : 32,
          boxShadow: "0 34px 80px rgba(0,0,0,0.72)",
          transition: `opacity ${enterDuration}ms ${EASE_EXPO}, transform ${enterDuration}ms ${EASE_EXPO}, border-radius ${enterDuration}ms ${EASE_EXPO}`,
          // Garde-fou : une video verticale ne depasse jamais 82 % de la
          // hauteur d'ecran.
          ...(isPortrait ? { maxHeight: "82vh" } : {}),
        }}
      >
        <div ref={parallaxRef} className="will-change-transform">
          <VideoPlayer item={item} radius={20} withSound={index === 1} />
        </div>
      </div>
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Mise en page verticale : deux colonnes                           */
  /* ---------------------------------------------------------------- */

  if (isPortrait) {
    return (
      <section aria-labelledby={`work-${item.slug}-title`} className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div
            className={[
              "lg:col-span-5",
              flipped ? "lg:order-2 lg:col-start-8" : "lg:order-1",
            ].join(" ")}
          >
            {video}
          </div>

          <div
            className={[
              "flex flex-col justify-center lg:col-span-6",
              flipped ? "lg:order-1 lg:col-start-1" : "lg:order-2",
            ].join(" ")}
          >
            {meta}
            <WorkStats stats={statsOf(item)} delay={240} className="mt-12" />
          </div>
        </div>

        {index < total && (
          <div className="mt-24 h-px w-full bg-hairline sm:mt-32" aria-hidden="true" />
        )}
      </section>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Mise en page horizontale : pleine largeur                        */
  /* ---------------------------------------------------------------- */

  return (
    <section aria-labelledby={`work-${item.slug}-title`} className="relative">
      <div className="mb-8 sm:mb-10">{meta}</div>
      {video}
      <WorkStats stats={statsOf(item)} delay={240} className="mt-12 sm:mt-16" />

      {index < total && (
        <div className="mt-20 h-px w-full bg-hairline sm:mt-28" aria-hidden="true" />
      )}
    </section>
  );
}
