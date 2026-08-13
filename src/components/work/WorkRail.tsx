import { useEffect, useRef, useState } from "react";
import { statsOf, type WorkItem } from "./work.data";
import { VideoPlayer } from "./VideoPlayer";
import { WorkStats } from "./WorkStats";
import { useIsMobile, useReveal } from "@/hooks/useReveal";

/**
 * ULTRA VISION — le rail des realisations.
 *
 * LE PRINCIPE
 *
 * Les quatre videos occupent l'ecran en permanence, cote a cote. Celle
 * que l'on survole s'elargit, les trois autres se compriment. Le rail
 * glisse vers la gauche des qu'il y en a plus de quatre.
 *
 * C'est la seule mise en page qui tienne les deux exigences a la fois :
 * tout voir d'un coup, et pouvoir defiler pour aller plus loin.
 *
 * ORDINATEUR
 *   Quatre colonnes en flex. La colonne active passe en flex 2.8, les
 *   autres tombent a 0.7. Le survol suffit, aucun clic necessaire.
 *
 * TELEPHONE
 *   Le rail devient un carrousel a accroche magnetique, une video par
 *   ecran. C'est le geste que les visiteurs venus d'Instagram et de
 *   TikTok font toute la journee — inutile de leur en apprendre un autre.
 *   La video active est detectee par observation, pas par survol :
 *   sur un ecran tactile, le survol n'existe pas.
 *
 * PERFORMANCE
 *   Une seule video joue a la fois, celle qui est active. Les autres
 *   restent sur leur image fixe. Avec des fichiers de 5 a 6 Mo, c'est
 *   ce qui separe une page fluide d'une page qui rame.
 *
 * ACCESSIBILITE
 *   Chaque carte est un bouton atteignable au clavier. Le focus active
 *   la carte exactement comme le survol, donc la navigation au clavier
 *   donne acces au meme contenu.
 */

const EASE = "cubic-bezier(.19,1,.22,1)";

export function WorkRail({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile(1024);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const { ref: sectionRef, isVisible } = useReveal<HTMLDivElement>({ amount: 0.1 });

  /*
    Sur mobile, la carte active est celle qui occupe le centre du rail.
    On l'observe au lieu de la deviner : c'est le seul moyen fiable quand
    le visiteur fait defiler au doigt avec de l'inertie.
  */
  useEffect(() => {
    if (!isMobile) return;
    const rail = railRef.current;
    if (!rail) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const i = cardRefs.current.indexOf(entry.target as HTMLElement);
            if (i >= 0) setActive(i);
          }
        });
      },
      { root: rail, threshold: [0.6] },
    );

    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [isMobile, items.length]);

  const current = items[active] ?? items[0];

  return (
    <div ref={sectionRef}>
      {/* ---------------- Le rail ---------------- */}
      <div
        ref={railRef}
        className={[
          "uv-rail flex gap-3 sm:gap-4",
          "snap-x snap-mandatory overflow-x-auto pb-4",
          "lg:snap-none lg:overflow-visible lg:pb-0",
        ].join(" ")}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(28px)",
          transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
        }}
      >
        <style>{`
          .uv-rail { scrollbar-width: none; -ms-overflow-style: none; }
          .uv-rail::-webkit-scrollbar { display: none; }
        `}</style>

        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <article
              key={item.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onMouseEnter={() => !isMobile && setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
              aria-label={`${item.title} — ${item.category}`}
              className={[
                "group relative shrink-0 snap-center overflow-hidden outline-none",
                "w-[78vw] max-w-[330px]",
                "lg:w-auto lg:min-w-0 lg:shrink lg:snap-align-none",
                "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              ].join(" ")}
              style={{
                height: "min(66vh, 560px)",
                borderRadius: 18,
                flexGrow: isMobile ? 0 : isActive ? 2.8 : 0.7,
                flexBasis: isMobile ? "auto" : 0,
                transition: `flex-grow 620ms ${EASE}`,
                boxShadow: isActive
                  ? "0 30px 70px rgba(0,0,0,.7), 0 0 0 1px rgba(59,130,246,.28)"
                  : "0 18px 44px rgba(0,0,0,.55), 0 0 0 1px #262626",
              }}
            >
              <VideoPlayer
                item={item}
                radius={18}
                active={isActive}
                withSound={isActive && i === 0}
                className="!absolute !inset-0 !h-full !w-full"
              />

              {/* Voile de lisibilite */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(9,9,9,.88) 0%, rgba(9,9,9,.25) 34%, rgba(9,9,9,0) 62%)",
                }}
              />

              {/* Numero */}
              <span className="pointer-events-none absolute top-5 left-5 text-[0.7rem] tracking-[0.14em] tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Titre et categorie */}
              <div className="pointer-events-none absolute inset-x-5 bottom-5">
                <p
                  className="text-[0.62rem] font-medium tracking-[0.16em] uppercase text-[#9a9a98]"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(6px)",
                    transition: `opacity 450ms ${EASE} 120ms, transform 450ms ${EASE} 120ms`,
                  }}
                >
                  {item.category}
                </p>
                <h3 className="display mt-1.5 text-[1.35rem] leading-tight tracking-[-0.02em] text-foreground sm:text-[1.6rem]">
                  {item.title}
                </h3>
                <p
                  className="mt-2 max-w-xs text-[0.82rem] leading-relaxed text-[#a8a8a6]"
                  style={{
                    opacity: isActive ? 1 : 0,
                    maxHeight: isActive ? 80 : 0,
                    overflow: "hidden",
                    transition: `opacity 450ms ${EASE} 180ms, max-height 550ms ${EASE}`,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* ---------------- Indicateur mobile ---------------- */}
      <div className="mt-5 flex items-center gap-2 lg:hidden" aria-hidden="true">
        {items.map((item, i) => (
          <span
            key={item.slug}
            className="h-[2px] flex-1 rounded-full"
            style={{
              background: i === active ? "#3B82F6" : "#262626",
              transition: "background 400ms ease",
            }}
          />
        ))}
      </div>

      {/* ---------------- Chiffres de la realisation active ---------------- */}
      <div className="mt-12 sm:mt-16">
        <div className="mb-6 flex items-baseline gap-3">
          <span className="text-[0.7rem] tracking-[0.14em] tabular-nums text-accent">
            {String(active + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-8 bg-hairline" aria-hidden="true" />
          <span className="text-[0.72rem] font-medium tracking-[0.16em] uppercase text-muted-foreground">
            {current.title}
          </span>
        </div>

        {/*
          La cle force React a remonter le bloc a chaque changement de
          realisation. Sans elle, les chiffres se contenteraient de
          changer de valeur d'un coup ; avec elle, ils rejouent leur
          apparition et leur compteur.
        */}
        <WorkStats key={current.slug} stats={statsOf(current)} delay={0} />
      </div>
    </div>
  );
}
