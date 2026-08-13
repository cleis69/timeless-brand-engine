import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { Magnetic } from "./Magnetic";

/**
 * ULTRA VISION — navigation.
 *
 * DEUX CORRECTIONS DEMANDEES
 *
 * 1. LE LOGO ETAIT TROP PETIT. Il passe de 28 a 40 px de haut. Sur une
 *    barre de 80 px, un logo de 28 px flotte au milieu du vide et ne
 *    pese rien face au bouton d'appel a l'action. A 40 px il occupe la
 *    moitie de la hauteur : c'est le rapport habituel, et la marque
 *    reprend le dessus sur le bouton.
 *
 * 2. LA PASTILLE ETAIT MAL PLACEE. Perdue au-dessus du titre, elle
 *    ressemblait a une etiquette oubliee. Elle remonte au centre, sur
 *    une premiere ligne au-dessus de la navigation — la position que
 *    SUPRA utilise, et qui fonctionne pour une raison simple : c'est le
 *    premier element que l'oeil rencontre, avant meme le logo.
 *
 *    Elle s'efface des que le visiteur scrolle. Une phrase de
 *    positionnement a rempli son role au premier ecran ; la garder
 *    ensuite volerait de la place a la navigation sans rien ajouter.
 *
 * LE FOND
 *
 * Pose en couleur explicite et non via `bg-background/75`. Cette classe
 * calculait un noir totalement transparent : la barre n'avait aucun
 * fond, a aucun moment. Invisible tant que la page etait noire, le
 * defaut sautait aux yeux des l'ajout de la section claire.
 */

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

/** Fil bleu qui se remplit au fil du defilement. */
function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-transparent" aria-hidden="true">
      <div
        className="h-full origin-left"
        style={{
          width: `${pct}%`,
          background: "linear-gradient(90deg, #1D4ED8, #3B82F6 55%, #60A5FA)",
          boxShadow: pct > 0 ? "0 0 12px rgba(59,130,246,.55)" : "none",
          transition: "width 120ms linear",
        }}
      />
    </div>
  );
}

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
      {/* --- Ligne de positionnement, visible en haut de page seulement --- */}
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-500"
        style={{
          maxHeight: scrolled ? 0 : 56,
          opacity: scrolled ? 0 : 1,
        }}
      >
        <div className="flex justify-center pt-4 pb-1">
          <AvailabilityBadge />
        </div>
      </div>

      {/* --- Barre de navigation --- */}
      <div className="shell grid h-[72px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
        <Link to="/" className="min-w-0" onClick={() => setOpen(false)} aria-label="ULTRA VISION">
          <Logo className="h-9 sm:h-10" />
        </Link>

        {/*
          TYPOGRAPHIE DE LA BARRE, selon la charte.

          La charte prevoit Inter 400 pour le corps et Inter 600 pour les
          boutons. La navigation se place entre les deux : Inter 500,
          avec un interlettrage de 0,04em et une taille de 13 px.

          Les liens etaient jusqu'ici en Inter 400 a 14 px, la meme
          graisse que les paragraphes du site. Une navigation qui a le
          poids d'un paragraphe ne se lit pas comme une navigation : elle
          se fond dans la page au lieu de la structurer.
        */}
        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-underline text-[0.82rem] font-medium tracking-[0.04em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              activeProps={{
                className:
                  "link-underline text-[0.82rem] font-medium tracking-[0.04em] text-foreground",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Magnetic strength={0.22} radius={90}>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-xs font-medium tracking-[0.12em] uppercase text-background transition-colors duration-300 hover:bg-accent-hover"
            >
              Prendre rendez-vous
            </Link>
          </Magnetic>
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

      {/*
        Fil bleu de progression.

        Une ligne de deux pixels qui se remplit au fil du scroll. C'est
        la seule presence du bleu qui traverse TOUTE la page : quelle que
        soit la section regardee, l'accent de la marque est visible.

        Elle sert aussi a quelque chose : sur une page de dix mille
        pixels, le visiteur ne sait pas ou il en est. Le fil le lui dit
        sans occuper un centimetre carre.
      */}
      <ScrollProgress />

      {/* --- Menu mobile --- */}
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
