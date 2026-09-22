import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { EASE_PAGE, EASE_RESPOND, MOTION } from "@/config/motion";
import {
  AGE_RANGES,
  TALENT_CATEGORIES,
  categoryLabel,
  talentAge,
  type Talent,
  type TalentCategory,
} from "@/content/talents";
import { TalentSheet } from "./TalentSheet";

/**
 * ULTRA VISION — la grille des talents, sur la page /casting.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/components/casting/TalentBoard.tsx
 *  Les donnees viennent de src/content/talents.ts.
 * ============================================================
 *
 * DEUX FILTRES, PAS PLUS
 *
 * Par famille (actrices, mannequins, createrices) et par tranche d'age.
 * C'est ce que demande une marque qui cherche un visage : « une femme
 * de 25-35 ans qui joue ». La ville, la taille, les langues sont dans
 * la fiche ; les mettre en filtre sur une vingtaine de profils
 * produirait surtout des resultats vides.
 *
 * Une famille sans aucun profil n'apparait pas dans les filtres : un
 * bouton qui ne mene a rien est une impasse.
 *
 * CHAQUE CARTE EST UN VRAI LIEN
 *
 * /casting?profil=<slug>. On peut donc envoyer a un client le lien
 * direct d'une fiche par WhatsApp, l'ouvrir dans un nouvel onglet, ou
 * revenir en arriere pour la refermer. Un bouton qui ouvrirait une
 * fenetre sans changer l'adresse ne permettrait rien de tout cela.
 */

type Props = {
  talents: Talent[];
  /** Slug de la fiche ouverte, lu dans l'adresse. */
  selected?: string | undefined;
  /** Appele au clic sur une carte, avant la navigation. */
  onOpen?: (() => void) | undefined;
  onClose: () => void;
};

export function TalentBoard({ talents, selected, onOpen, onClose }: Props) {
  const [category, setCategory] = useState<TalentCategory | null>(null);
  const [range, setRange] = useState<(typeof AGE_RANGES)[number]["id"] | null>(null);

  const counts = useMemo(() => {
    const c = new Map<TalentCategory, number>();
    for (const t of talents) for (const k of t.categories) c.set(k, (c.get(k) ?? 0) + 1);
    return c;
  }, [talents]);

  const shown = useMemo(() => {
    const r = AGE_RANGES.find((x) => x.id === range);
    return talents.filter((t) => {
      if (category && !t.categories.includes(category)) return false;
      if (r) {
        const age = talentAge(t);
        if (age < r.min || age > r.max) return false;
      }
      return true;
    });
  }, [talents, category, range]);

  const open = talents.find((t) => t.slug === selected) ?? null;

  /* Change a chaque filtre : les cartes rejouent leur entree. */
  const pass = `${category ?? "all"}-${range ?? "all"}`;

  const chip = (on: boolean) => ({
    borderColor: on ? "#3B82F6" : "#262626",
    backgroundColor: on ? "rgba(59,130,246,.12)" : "transparent",
    color: on ? "#93C5FD" : "#8a8a8a",
    transition: `all ${MOTION.respond}ms ${EASE_RESPOND}`,
  });

  return (
    <div>
      <style>{`
        @keyframes uv-talent-in {
          from { opacity: 0; transform: translateY(14px) }
          to   { opacity: 1; transform: none }
        }
        .uv-talent { animation: uv-talent-in 520ms ${EASE_PAGE} both; }
        .uv-talent-alt { opacity: 0; transition: opacity 520ms ${EASE_PAGE}; }
        .uv-talent-img { transition: transform 900ms ${EASE_PAGE}; }
        @media (hover: hover) {
          .uv-talent:hover .uv-talent-alt { opacity: 1; }
          .uv-talent:hover .uv-talent-img { transform: scale(1.04); }
        }
        @media (prefers-reduced-motion: reduce) {
          .uv-talent { animation: none; }
          .uv-talent-img, .uv-talent-alt { transition: none; }
        }
      `}</style>

      {/* ---------------- Les filtres ---------------- */}
      <div className="flex flex-col gap-3">
        <div role="group" aria-label="Filtrer par profil" className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory(null)}
            aria-pressed={category === null}
            className="rounded-full border px-4 py-2 text-xs"
            style={chip(category === null)}
          >
            Tous <span className="opacity-60">{talents.length}</span>
          </button>
          {TALENT_CATEGORIES.filter((c) => counts.get(c.id)).map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() => setCategory(category === c.id ? null : c.id)}
              aria-pressed={category === c.id}
              className="rounded-full border px-4 py-2 text-xs"
              style={chip(category === c.id)}
            >
              {c.label} <span className="opacity-60">{counts.get(c.id)}</span>
            </button>
          ))}
        </div>
        <div role="group" aria-label="Filtrer par âge" className="flex flex-wrap gap-2">
          {AGE_RANGES.map((r) => (
            <button
              type="button"
              key={r.id}
              onClick={() => setRange(range === r.id ? null : r.id)}
              aria-pressed={range === r.id}
              className="rounded-full border px-3.5 py-1.5 text-[0.7rem]"
              style={chip(range === r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-[0.74rem] text-[#797976]" aria-live="polite">
        {shown.length} profil{shown.length > 1 ? "s" : ""}
      </p>

      {/* ---------------- La grille ---------------- */}
      {shown.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {shown.map((t, i) => (
            <li
              key={`${pass}-${t.slug}`}
              className="uv-talent"
              // Cascade plafonnee : au-dela de huit cartes, attendre
              // davantage ne se lit plus comme un rythme mais comme une
              // lenteur.
              style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
            >
              <TalentCard talent={t} eager={i < 4} onOpen={onOpen} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="mt-4 rounded-xl p-6 text-sm text-[#8792ad]"
          style={{ border: "1px dashed #2a3346" }}
        >
          Aucun profil ne correspond à ces deux filtres.{" "}
          <button
            type="button"
            onClick={() => {
              setCategory(null);
              setRange(null);
            }}
            className="link-underline text-[#93C5FD]"
          >
            Tout afficher
          </button>
        </div>
      )}

      <TalentSheet talent={open} onClose={onClose} />
    </div>
  );
}

function TalentCard({
  talent: t,
  eager,
  onOpen,
}: {
  talent: Talent;
  eager: boolean;
  onOpen?: (() => void) | undefined;
}) {
  const [cover, alt] = t.photos;
  return (
    <Link
      to="/casting"
      search={{ profil: t.slug }}
      resetScroll={false}
      onClick={onOpen}
      aria-label={`Voir le profil de ${t.name}`}
      className="group relative block aspect-[3/4] overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        borderRadius: 17,
        boxShadow:
          "inset 0 1px 0 rgba(191,219,254,.2), 0 26px 54px -20px rgba(0,0,0,.94), 0 0 0 1px rgba(255,255,255,.045)",
      }}
    >
      <img
        src={cover}
        alt=""
        width={900}
        height={1200}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="uv-talent-img absolute inset-0 h-full w-full object-cover"
      />
      {alt && (
        <img
          src={alt}
          alt=""
          width={900}
          height={1200}
          loading="lazy"
          decoding="async"
          className="uv-talent-alt uv-talent-img absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Voile de lisibilite, le meme que sur les cartes du ruban. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(9,9,9,.9) 4%, rgba(9,9,9,.18) 40%, transparent 62%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
        <p className="text-[0.54rem] tracking-[0.16em] uppercase text-accent-hover">
          {categoryLabel(t.categories[0])}
        </p>
        <h3 className="display mt-1 truncate text-[1rem] text-foreground">{t.name}</h3>
        <p className="mt-0.5 truncate text-[0.7rem] text-[#a9a9a5]">
          {talentAge(t)} ans · {t.city}
        </p>
      </div>
    </Link>
  );
}
