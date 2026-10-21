import { useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { EASE_RESPOND, MOTION } from "@/config/motion";
import { useLocale, type Locale } from "@/lib/i18n";

/**
 * ULTRA VISION — la methode, en rail vertical.
 *
 * Une ligne, quatre points d'arret. Le point bleu glisse d'une etape a
 * l'autre au survol, et l'etape survolee deplie sa description.
 *
 * POURQUOI CE TRAITEMENT PLUTOT QU'UN AUTRE
 *
 * C'est le seul qui garde exactement la meme forme sur telephone : la
 * colonne est deja verticale, il n'y a rien a reecrire. Les mises en
 * page en escalier ou en cartes qui se retournent obligent a une
 * seconde version pour le tactile — donc deux fois plus de code a
 * maintenir, et deux fois plus d'occasions de casser quelque chose.
 *
 * AUCUNE MECANIQUE DE SCROLL
 *
 * Le point ne suit pas le defilement, il suit le curseur. Le visiteur
 * garde la main : il lit l'etape qu'il veut, dans l'ordre qu'il veut.
 * Une methode qui se devoile au scroll impose au contraire un rythme,
 * et frustre celui qui cherche juste l'etape 3.
 *
 * SUR TELEPHONE
 *
 * Pas de survol : les quatre etapes sont depliees en permanence et le
 * point se cale sur la premiere. Le contenu reste integralement
 * accessible, sans geste a deviner.
 */

/*
  Vitesses issues de src/config/motion.ts.

  Le point bleu se deplace en 340 ms et non 480. C'est le seul repere
  visuel de la section : s'il arrive apres que le curseur a change
  d'etape, il designe la mauvaise ligne pendant un instant — et c'est
  precisement ce moment que l'oeil remarque.
*/
const EASE = EASE_RESPOND;

const ETAPES = [
  {
    n: "01",
    title: "Diagnostic",
    text: "Audit de la marque, du tunnel et des données. Nous identifions le point de friction qui coûte le plus cher.",
  },
  {
    n: "02",
    title: "Stratégie",
    text: "Positionnement, message, offre et plan d'acquisition. Un document de référence, pas une présentation.",
  },
  {
    n: "03",
    title: "Design & Build",
    text: "Identité, site, applications et contenus produits par des seniors, en cycles courts et validés.",
  },
  {
    n: "04",
    title: "Croissance",
    text: "Campagnes, automatisations et itérations mensuelles pilotées par la donnée commerciale.",
  },
];

/* Les memes etapes, en anglais, dans le meme ordre. */
const ETAPES_EN: { title: string; text: string }[] = [
  {
    title: "Diagnosis",
    text: "An audit of the brand, the funnel and the data. We find the point of friction that costs the most.",
  },
  {
    title: "Strategy",
    text: "Positioning, message, offer and acquisition plan. A reference document, not a slide deck.",
  },
  {
    title: "Design & Build",
    text: "Identity, website, apps and content produced by senior people, in short, signed-off cycles.",
  },
  {
    title: "Growth",
    text: "Campaigns, automations and monthly iterations driven by sales data.",
  },
];

const UI: Record<Locale, { eyebrow: string; title: string; text: string; step: string }> = {
  fr: {
    eyebrow: "Notre méthode",
    title: "Quatre étapes, aucune zone grise.",
    text: "Vous savez à tout moment où en est votre projet, ce qui a été livré, et ce qui arrive ensuite.",
    step: "Étape",
  },
  en: {
    eyebrow: "Our method",
    title: "Four steps, no grey areas.",
    text: "At any moment you know where your project stands, what has been delivered and what comes next.",
    step: "Step",
  },
};

export function MethodRail() {
  const locale = useLocale();
  const t = UI[locale];
  const etapes = locale === "en" ? ETAPES.map((e, i) => ({ ...e, ...ETAPES_EN[i] })) : ETAPES;
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dotTop, setDotTop] = useState(0);

  const focus = (i: number) => {
    setActive(i);
    const el = itemRefs.current[i];
    const list = listRef.current;
    if (el && list) {
      // Le point se cale sur la premiere ligne de texte de l'etape,
      // pas sur le centre du bloc : une etape depliee est plus haute,
      // et le point derivrait vers le bas au lieu de designer le titre.
      setDotTop(el.offsetTop - list.offsetTop + 11);
    }
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
      <Reveal>
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="display mt-6 max-w-md text-4xl sm:text-5xl">{t.title}</h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">{t.text}</p>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="flex gap-6 sm:gap-8">
          {/* La ligne et son point */}
          <div className="relative mt-3 w-px shrink-0 bg-hairline" aria-hidden="true">
            <span
              className="absolute -left-[3.5px] hidden h-2 w-2 rounded-full bg-accent lg:block"
              style={{
                top: dotTop,
                boxShadow: "0 0 12px #3B82F6",
                transition: `top ${MOTION.expand}ms ${EASE}`,
              }}
            />
          </div>

          <div ref={listRef} className="min-w-0 flex-1">
            {etapes.map((e, i) => {
              const isActive = i === active;
              return (
                <div
                  key={e.n}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  onMouseEnter={() => focus(i)}
                  onFocus={() => focus(i)}
                  tabIndex={0}
                  aria-label={`${t.step} ${e.n} — ${e.title}`}
                  className="group border-b border-hairline py-5 outline-none last:border-b-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-[0.7rem] tabular-nums text-accent">{e.n}</span>
                    <h3
                      className="display text-xl sm:text-2xl"
                      style={{
                        color: isActive ? "#F5F5F3" : "#7d7d7b",
                        transition: `color ${MOTION.respond}ms ${EASE}`,
                      }}
                    >
                      {e.title}
                    </h3>
                  </div>

                  {/*
                    Sur grand ecran la description se deplie au survol.
                    Sur telephone elle reste ouverte en permanence : sans
                    curseur, un contenu qui n'apparait qu'au survol est un
                    contenu perdu.
                  */}
                  <div
                    className="overflow-hidden lg:transition-[max-height,opacity]"
                    style={{
                      transitionDuration: `${MOTION.expand}ms`,
                      transitionTimingFunction: EASE,
                    }}
                  >
                    <p
                      className="max-w-md pt-3 pl-8 text-sm leading-relaxed text-muted-foreground lg:pt-0"
                      style={{
                        opacity: 1,
                      }}
                    >
                      <span className="hidden lg:block" style={{ height: isActive ? 12 : 0 }} />
                      {e.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
