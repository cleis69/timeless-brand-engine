import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { EASE_RESPOND, MOTION } from "@/config/motion";
import { LAUNCH_OFFER, dirham, euro } from "@/config/pricing";

/**
 * UltraVision Agency — briques des pages services, secteurs, etudes de
 * cas et de la page pilier.
 *
 * AUCUN NOUVEAU STYLE ICI. Chaque brique reprend a l'identique un
 * dispositif deja en ligne :
 *
 *   CardGrid    les panneaux des poles de /services
 *   Steps       les etapes de /methode
 *   PriceRows   les lignes « a la carte » de /tarifs
 *   LinkCards   les cartes « A lire ensuite » du blog
 *   FaqList     la FAQ de /tarifs
 *   FactList    les cartes « Ce qui n'est jamais compris » de /tarifs
 *
 * Les nouvelles pages ressemblent donc au reste du site, parce qu'elles
 * sont faites des memes pieces.
 */

const CARD = { backgroundColor: "#0B1020", border: "1px solid #16203a" } as const;

/** Une section standard : filet, fond, marges verticales du site. */
export function Section({
  children,
  surface = false,
  id,
  labelledBy,
}: {
  children: ReactNode;
  /** Fond legerement plus clair, pour alterner avec la section voisine. */
  surface?: boolean;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`rule ${surface ? "bg-surface" : "bg-background"}`}
    >
      <div className="shell py-16 lg:py-24">{children}</div>
    </section>
  );
}

/** En-tete de section : eyebrow bleu, titre, paragraphe facultatif. */
export function SectionIntro({
  eyebrow,
  title,
  text,
  id,
}: {
  eyebrow: string;
  title: string;
  text?: ReactNode;
  id?: string;
}) {
  return (
    <Reveal>
      <p className="eyebrow" style={{ color: "#60A5FA" }}>
        {eyebrow}
      </p>
      <h2 id={id} className="display mt-5 max-w-3xl text-3xl sm:text-4xl">
        {title}
      </h2>
      {text && (
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {text}
        </p>
      )}
    </Reveal>
  );
}

/** Liste a puces bleues, dans un panneau. */
export function BulletPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal className="h-full">
      <div className="h-full rounded-3xl p-7 sm:p-9" style={CARD}>
        <h3 className="display text-2xl">{title}</h3>
        <ul className="mt-7 text-sm">
          {items.map((it) => (
            <li key={it} className="flex gap-3 border-t border-[#16203a] py-3 text-[#9aa7c2]">
              <span
                aria-hidden="true"
                className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: "#3B82F6" }}
              />
              <span className="leading-relaxed">{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/** Cartes titre + texte, deux par rangee sur grand ecran. */
export function CardGrid({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="mt-12 grid gap-3 sm:grid-cols-2">
      {items.map((c, i) => (
        <Reveal key={c.title} delay={i * MOTION.stagger} className="h-full">
          <div className="h-full rounded-2xl p-5 sm:p-6" style={CARD}>
            <h3 className="text-[0.98rem] font-medium">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#8792ad]">{c.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Etapes numerotees. */
export function Steps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="mt-12 grid gap-4 lg:grid-cols-2">
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * MOTION.stagger} className="h-full">
          <li className="h-full list-none rounded-3xl p-7 sm:p-8" style={CARD}>
            <span className="text-[0.68rem] tracking-[0.2em] text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="display mt-5 text-2xl">{s.title}</h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#8792ad]">{s.text}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

/** Lignes de prix, lues dans pricing.ts. Prix plein, en dirhams et en euros. */
export function PriceRows({
  rows,
}: {
  rows: {
    label: string;
    detail: string;
    price: number;
    unit?: string;
    from?: boolean;
  }[];
}) {
  return (
    <div className="mt-10">
      <div className="border-t border-hairline">
        {rows.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-[1fr_auto] items-baseline gap-6 border-b border-hairline py-5"
          >
            <div className="min-w-0">
              <h3 className="text-[0.95rem] font-medium">{r.label}</h3>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted-foreground">
                {r.detail}
              </p>
            </div>
            <div className="text-right whitespace-nowrap">
              {r.from && (
                <span className="mr-1 text-[0.7rem] text-muted-foreground">à partir de</span>
              )}
              <span className="display text-[1.25rem]">{dirham(r.price)}</span>
              {r.unit && (
                <span className="ml-1 text-[0.72rem] text-muted-foreground">{r.unit}</span>
              )}
              <p className="mt-0.5 text-[0.68rem] text-[#7b88a6]">≈ {euro(r.price)}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[0.78rem] leading-relaxed text-[#797976]">
        Tarifs pleins, hors taxes et hors budget publicitaire.
        {LAUNCH_OFFER.enabled && <> {LAUNCH_OFFER.badge}.</>}{" "}
        <Link to="/tarifs" className="link-underline text-accent-hover">
          Voir tous les tarifs
        </Link>
      </p>
    </div>
  );
}

/** Cartes-liens vers d'autres pages du site. */
export function LinkCards({
  items,
}: {
  items: { to: string; eyebrow?: string; title: string; text?: string }[];
}) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Reveal key={it.to} delay={i * MOTION.stagger} className="h-full">
          <Link
            to={it.to}
            className="group flex h-full flex-col rounded-2xl p-6"
            style={{ ...CARD, transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}` }}
          >
            {it.eyebrow && (
              <span className="text-[0.64rem] font-medium tracking-[0.14em] uppercase text-accent-hover">
                {it.eyebrow}
              </span>
            )}
            <span className="display mt-3 text-lg transition-colors duration-200 group-hover:text-[#93C5FD]">
              {it.title}
            </span>
            {it.text && (
              <span className="mt-3 flex-1 text-sm leading-relaxed text-[#8792ad]">{it.text}</span>
            )}
            <span
              aria-hidden="true"
              className="mt-5 inline-block text-accent-hover transition-transform duration-200 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

/** Questions frequentes, toujours depliees : lisibles sans clic, et par les robots. */
export function FaqList({
  faq,
  title = "Questions fréquentes",
}: {
  faq: { q: string; a: string }[];
  title?: string;
}) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
      <Reveal>
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="display mt-5 text-3xl sm:text-4xl">{title}</h2>
        </div>
      </Reveal>
      <div className="border-t border-hairline">
        {faq.map((f, i) => (
          <Reveal key={f.q} delay={i * 50}>
            <div className="border-b border-hairline py-6">
              <h3 className="text-[0.98rem] font-medium">{f.q}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/**
 * Fiche : des couples libelle / valeur.
 * Balisee en <dl> : c'est la structure que les moteurs lisent comme des
 * faits, et que les assistants reprennent le plus volontiers.
 */
export function FactList({ facts }: { facts: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {facts.map((f, i) => (
        /*
          Une seule <div> entre <dl> et ses <dt>/<dd> : c'est tout ce que
          la norme HTML tolere. La carte est donc portee par le conteneur
          anime lui-meme, sans enveloppe supplementaire.
        */
        <Reveal
          key={f.label}
          delay={i * 40}
          className="h-full rounded-2xl border border-[#262626] bg-[#0E0E0E] p-5"
        >
          <dt className="text-[0.64rem] font-medium tracking-[0.16em] uppercase text-[#707d9d]">
            {f.label}
          </dt>
          <dd className="mt-2.5 text-[0.95rem] leading-relaxed text-foreground">{f.value}</dd>
        </Reveal>
      ))}
    </dl>
  );
}

/** Lien flèche, au style des « Voir le détail » du site. */
export function ArrowLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-3 text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-foreground transition-colors duration-200 hover:text-accent-hover"
    >
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}
