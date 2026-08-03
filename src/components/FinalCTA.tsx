import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="rule bg-primary text-primary-foreground">
      <div className="shell py-28 lg:py-40">
        <Reveal>
          <p className="eyebrow text-primary-foreground/60">Start here</p>
          <h2 className="display mt-8 max-w-4xl text-5xl sm:text-7xl lg:text-8xl">
            Let&apos;s decide if we&apos;re the right studio for your next chapter.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-primary-foreground/70">
            A 30-minute discovery call. No decks, no pressure. You leave with a clear read on your
            positioning, your funnel and the fastest path to growth — whether you work with us or
            not.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center rounded-full bg-primary-foreground px-7 text-xs font-semibold tracking-[0.16em] uppercase text-primary transition-opacity duration-300 hover:opacity-80"
            >
              Book a discovery call
            </Link>
            <a
              href="https://wa.me/33600000000"
              className="inline-flex h-12 items-center rounded-full border border-primary-foreground/30 px-7 text-xs font-semibold tracking-[0.16em] uppercase transition-colors duration-300 hover:border-primary-foreground"
            >
              WhatsApp
            </a>
            <a
              href="tel:+33600000000"
              className="inline-flex h-12 items-center px-2 text-xs font-semibold tracking-[0.16em] uppercase text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              +33 6 00 00 00 00
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
