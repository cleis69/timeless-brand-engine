import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="rule relative overflow-hidden bg-surface">
      <div
        className="glow-blue -bottom-32 right-1/4 h-[24rem] w-[24rem] opacity-50"
        aria-hidden
      />
      <div className="shell relative py-28 lg:py-40">
        <Reveal>
          <p className="eyebrow">Prochaine étape</p>
          <h2 className="display mt-8 max-w-4xl text-4xl sm:text-6xl lg:text-7xl">
            Parlons de votre croissance sur les douze prochains mois.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            30 minutes, sans engagement. Vous repartez avec une lecture claire de votre
            positionnement, de votre tunnel d&apos;acquisition et des leviers prioritaires.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center rounded-full bg-foreground px-7 text-xs font-medium tracking-[0.14em] uppercase text-background transition-colors duration-300 hover:bg-accent-hover"
            >
              Réserver un appel stratégique
            </Link>
            <a
              href="https://wa.me/33600000000"
              className="inline-flex h-12 items-center rounded-full border border-hairline px-7 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent-hover"
            >
              WhatsApp
            </a>
            <a
              href="tel:+33600000000"
              className="inline-flex h-12 items-center px-2 text-xs font-medium tracking-[0.14em] uppercase text-muted-foreground transition-colors hover:text-foreground"
            >
              +33 6 00 00 00 00
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
