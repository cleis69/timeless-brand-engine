import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

/**
 * ULTRA VISION — navigation.
 *
 * ============================================================
 *  CE FICHIER REMPLACE src/components/SiteHeader.tsx
 * ============================================================
 *
 * CE QUI CHANGE, ET POURQUOI C'EST IMPORTANT
 *
 * La barre utilisait la classe `bg-background/75`. Verifie sur le site
 * en production : cette classe calculait `oklab(0 0 0 / 0)`, c'est-a-dire
 * un noir totalement transparent. La barre n'avait donc aucun fond, a
 * aucun moment.
 *
 * Ca passait inapercu tant que toute la page etait noire. Depuis
 * l'ajout de la section claire, le probleme saute aux yeux : le logo,
 * qui est clair, et le bouton, blanc lui aussi, disparaissent
 * completement quand cette section passe dessous.
 *
 * Le fond est donc pose en valeur explicite plutot qu'en calcul
 * d'opacite Tailwind. Une couleur ecrite en toutes lettres ne peut pas
 * echouer silencieusement.
 *
 * NAVIGATION REDUITE
 * Six entrees, c'etait trop : le brief en prevoit quatre. « Notre
 * methode » et « Blog » restent accessibles depuis le pied de page.
 * Une navigation courte augmente le taux de clic sur le bouton
 * principal, qui est le seul objectif de cette barre.
 */

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: solid ? "rgba(9, 9, 9, 0.88)" : "transparent",
        backdropFilter: solid ? "blur(20px)" : "none",
        WebkitBackdropFilter: solid ? "blur(20px)" : "none",
        borderBottom: solid ? "1px solid #262626" : "1px solid transparent",
      }}
    >
      <div className="shell grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
        <Link to="/" className="min-w-0" onClick={() => setOpen(false)} aria-label="ULTRA VISION">
          <Logo className="h-7 sm:h-8" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "link-underline text-sm text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex h-10 items-center rounded-full bg-foreground px-5 text-xs font-medium tracking-[0.12em] uppercase text-background transition-colors duration-300 hover:bg-accent-hover"
          >
            Prendre rendez-vous
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="flex h-10 w-10 shrink-0 items-center justify-center lg:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-foreground transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-foreground transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-hairline lg:hidden ${open ? "max-h-[32rem]" : "max-h-0"} transition-[max-height] duration-500`}
        style={{ backgroundColor: "#090909" }}
      >
        <nav className="shell flex flex-col gap-5 py-8">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="display text-3xl"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-xs font-medium tracking-[0.12em] uppercase text-background"
          >
            Prendre rendez-vous
          </Link>
        </nav>
      </div>
    </header>
  );
}
