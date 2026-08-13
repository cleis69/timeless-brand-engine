import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

/**
 * ULTRA VISION — les expertises, en liste editoriale.
 *
 * CE QUI REMPLACE QUOI
 *
 * Avant : cinq cartes identiques dans une grille. Le brief l'interdisait
 * explicitement, et pour une bonne raison : une grille de cartes ne
 * hierarchise rien. Les cinq poles ont l'air interchangeables, alors
 * qu'un visiteur en cherche un seul.
 *
 * Maintenant : une liste. Chaque ligne porte son numero, son nom en
 * grand, et deplie ses prestations au survol. La ligne survolee glisse
 * de huit pixels vers la droite et s'eclaire, les autres s'effacent.
 *
 * C'est le meme geste que le rail des videos — survoler pour reveler.
 * Le visiteur apprend une fois et reutilise. Deux mecaniques
 * differentes pour la meme intention, ca fait bricolage.
 *
 * SUR TELEPHONE
 *
 * Pas de survol : les prestations restent visibles en permanence sous
 * chaque nom. Un contenu qui n'apparait qu'au survol est un contenu
 * perdu pour la moitie des visiteurs.
 */

const EASE = "cubic-bezier(.19,1,.22,1)";

const POLES = [
  {
    n: "01",
    title: "Branding",
    lines: ["Identité visuelle", "Positionnement", "Charte graphique"],
    text: "Une marque lisible en trois secondes, cohérente sur chaque point de contact.",
  },
  {
    n: "02",
    title: "Web & Applications",
    lines: ["Sites web", "Applications", "Landing pages"],
    text: "Des interfaces rapides, sobres et pensées pour la conversion.",
  },
  {
    n: "03",
    title: "IA & Automatisation",
    lines: ["Agents IA", "Automatisation", "CRM"],
    text: "Vos processus commerciaux exécutés sans friction, 24 h sur 24.",
  },
  {
    n: "04",
    title: "Acquisition",
    lines: ["Meta Ads", "Google Ads", "TikTok Ads", "Lead generation"],
    text: "Un pilotage au coût par rendez-vous qualifié, pas au clic.",
  },
  {
    n: "05",
    title: "Création de contenu",
    lines: ["Photo", "Vidéo", "Motion design"],
    text: "Des contenus de niveau maison de luxe, produits en interne.",
  },
];

export function ExpertiseList() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div>
      <Reveal>
        <p className="eyebrow">Nos expertises</p>
        <h2 className="display mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
          Cinq pôles, une seule équipe, une chaîne de valeur complète.
        </h2>
      </Reveal>

      <div className="mt-14 border-t border-hairline sm:mt-16">
        {POLES.map((p, i) => {
          const isActive = i === active;
          return (
            <div
              key={p.n}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
              className="group border-b border-hairline outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
              style={{
                transform: isActive ? "translateX(8px)" : "translateX(0)",
                transition: `transform 450ms ${EASE}`,
              }}
            >
              <div className="grid items-baseline gap-x-8 gap-y-3 py-7 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.1fr)]">
                <span className="text-[0.7rem] tabular-nums text-accent">{p.n}</span>

                <h3
                  className="display text-2xl transition-colors duration-400 sm:text-3xl lg:text-[2.1rem]"
                  style={{ color: isActive ? "#F5F5F3" : "#6f6f6d" }}
                >
                  {p.title}
                </h3>

                <div className="lg:justify-self-end lg:text-right">
                  <p
                    className="max-w-sm text-sm leading-relaxed transition-colors duration-400 lg:ml-auto"
                    style={{ color: isActive ? "#8A8A8A" : "#4f4f4d" }}
                  >
                    {p.text}
                  </p>

                  {/* Les prestations : depliees au survol sur grand ecran,
                      toujours visibles sur telephone. */}
                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: isActive ? 60 : 0,
                      opacity: isActive ? 1 : 0,
                      transition: `max-height 500ms ${EASE}, opacity 400ms ${EASE}`,
                    }}
                  >
                    <ul className="flex flex-wrap gap-x-4 gap-y-1 pt-3 text-xs text-[#6f6f6d] lg:justify-end">
                      {p.lines.map((l) => (
                        <li key={l} className="flex items-center gap-2">
                          <span className="h-px w-3 bg-hairline" aria-hidden="true" />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Reveal delay={200}>
        <Link
          to="/services"
          className="group mt-12 inline-flex items-center gap-3 text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-foreground outline-none transition-colors duration-300 hover:text-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
        >
          Voir le détail des services
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </Reveal>
    </div>
  );
}
