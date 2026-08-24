import { useState } from "react";
import { type SiteItem } from "./sites.data";
import { Reveal } from "@/components/Reveal";
import { EASE_PAGE, MOTION } from "@/config/motion";

/**
 * ULTRA VISION — la grille des realisations web.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/components/work/SiteGrid.tsx
 * ============================================================
 *
 * TROIS PROJETS PAR RANGEE, ET POURQUOI PAS QUATRE
 *
 * Les videos sont verticales : on peut en aligner six sans qu'aucune ne
 * devienne illisible, parce qu'une affiche verticale reste lisible
 * etroite. Une page web est horizontale, et son sujet est sa MISE EN
 * PAGE. Reduite au quart de la largeur d'un ecran, elle ne montre plus
 * de mise en page du tout : elle montre une tache.
 *
 * Trois par rangee est la limite basse a laquelle on distingue encore
 * une colonne d'une grille, un titre d'un paragraphe. C'est le minimum
 * pour que la vignette dise quelque chose.
 *
 * POURQUOI DES MAQUETTES DESSINEES ET NON DES CAPTURES
 *
 * Une capture d'ecran de site pese entre 200 et 600 Ko, et il en
 * faudrait six. Surtout, une capture reduite a 380 px de large ne se lit
 * plus : le texte devient du bruit gris.
 *
 * Les maquettes ci-dessous sont dessinees en CSS. Elles ne pesent rien,
 * restent nettes a toutes les densites d'ecran, et montrent ce qu'une
 * capture ne montre plus a cette taille : la STRUCTURE. Trois silhouettes
 * differentes — editorial, commerce, landing — pour qu'on distingue les
 * types de projet d'un coup d'oeil.
 *
 * Le jour ou de vraies captures existent, elles remplacent le contenu de
 * <Mockup /> sans toucher au reste.
 *
 * L'ANIMATION
 *
 * Au survol, la fenetre du navigateur remonte de 10 px et son ombre
 * s'allonge, pendant que la page a l'interieur DEFILE vers le haut. Ce
 * defilement est le seul geste qui dise « c'est un site » plutot que
 * « c'est une image de site » : on montre qu'il y a une suite.
 */

type Props = {
  items: SiteItem[];
};

export function SiteGrid({ items }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
      {items.map((item, i) => (
        <Reveal key={item.slug} delay={i * MOTION.stagger}>
          <SiteCard item={item} />
        </Reveal>
      ))}
    </div>
  );
}

/* ==========================================================================
 *  UNE CARTE
 * ========================================================================== */

function SiteCard({ item }: { item: SiteItem }) {
  const [hover, setHover] = useState(false);

  /*
    AUCUNE CARTE N'EST CLIQUABLE, PAR CHOIX.

    La vignette montre la mise en page d'un site ; l'adresse reelle du
    client n'a pas a etre exposee depuis une page de realisations. Un
    visiteur qui veut en savoir plus passe par le contact.

    La carte reste focalisable (tabIndex, focus visible) pour la
    navigation clavier, mais elle ne mene nulle part : c'est une
    vignette de presentation, pas un lien.
  */

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      tabIndex={0}
      aria-label={`${item.title} — ${item.category}`}
      className="group block h-full overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        backgroundColor: "#0B1020",
        border: `1px solid ${hover ? "rgba(96,165,250,.4)" : "#16203a"}`,
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hover
          ? "0 34px 64px -28px rgba(0,0,0,.95), 0 0 52px -24px rgba(59,130,246,.42)"
          : "0 14px 30px -18px rgba(0,0,0,.85)",
        transition: [
          `transform 480ms ${EASE_PAGE}`,
          `box-shadow 480ms ${EASE_PAGE}`,
          `border-color ${MOTION.respond}ms ${EASE_PAGE}`,
        ].join(", "),
      }}
    >
      {/* ---------------- La fenetre de navigateur ---------------- */}
      <div className="relative m-3 overflow-hidden rounded-xl" style={{ background: "#05070F" }}>
        {/* Barre du navigateur */}
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ background: "#0E1526", borderBottom: "1px solid #16203a" }}
        >
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="block h-[7px] w-[7px] rounded-full" style={{ background: "#33405e" }} />
            <i className="block h-[7px] w-[7px] rounded-full" style={{ background: "#33405e" }} />
            <i className="block h-[7px] w-[7px] rounded-full" style={{ background: "#33405e" }} />
          </span>
          {/*
            L'ADRESSE EST FLOUTEE, PAS SUPPRIMEE.

            La barre d'adresse est ce qui fait lire « site web » plutot
            que « capture d'ecran » : la retirer casserait la metaphore
            du navigateur, et la remplacer par un trait gris donnerait
            une barre vide, qui se lit comme un element non fini.

            On garde donc le texte, sa longueur et son rythme, et on le
            rend illisible. Ce qui reste — la silhouette d'une adresse —
            suffit a la lecture, et l'hebergeur ne raconte rien au
            visiteur : un `github.io` ou un `lovable.app` dans une page
            de realisations parle de l'outil, jamais du client.

            `aria-hidden` : ce qui est illisible a l'oeil ne doit pas
            etre lu a voix haute par un lecteur d'ecran. Le nom du
            projet, lui, est annonce par le `aria-label` de la carte.
          */}
          {item.domain ? (
            <span
              aria-hidden="true"
              className="ml-1 flex-1 truncate rounded-full px-2.5 py-1 text-[0.56rem] tracking-[0.04em] text-[#7b88a6] select-none"
              style={{
                background: "#070B16",
                border: "1px solid #1b2540",
                filter: "blur(3px)",
                // Le flou deborde du texte : sans ce leger retrait, les
                // lettres floutees bavent par-dessus la bordure de la
                // pastille et l'on voit une trainee, pas un flou.
                opacity: 0.85,
              }}
            >
              {item.domain}
            </span>
          ) : (
            /*
              Aucune adresse n'est stockee pour ce projet (regle de
              confidentialite absolue). On garde la silhouette d'une
              barre d'adresse — deux traits floutes — pour que la
              fenetre lise toujours « site web », mais aucun caractere
              d'URL, reel ou fictif, n'apparait dans le source ni dans
              le HTML rendu.
            */
            <span
              aria-hidden="true"
              className="ml-1 flex flex-1 items-center gap-1.5 rounded-full px-2.5 py-1 select-none"
              style={{
                background: "#070B16",
                border: "1px solid #1b2540",
                filter: "blur(3px)",
                opacity: 0.85,
              }}
            >
              <span className="block h-[5px] w-[55%] rounded-full" style={{ background: "#2b3855" }} />
              <span className="block h-[5px] w-[26%] rounded-full" style={{ background: "#1e2740" }} />
            </span>
          )}
        </div>

        {/* La page, qui defile au survol */}
        <div className="relative aspect-[16/11] overflow-hidden">
          <div
            className="absolute inset-x-0 top-0"
            style={{
              transform: hover ? "translateY(-28%)" : "translateY(0)",
              transition: `transform 1100ms ${EASE_PAGE}`,
            }}
          >
            <Mockup layout={item.layout} hue={item.hue} />
          </div>

          {/* Ombre basse : elle indique qu'il y a une suite. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
            style={{ background: "linear-gradient(to top, #05070F, transparent)" }}
          />
        </div>
      </div>

      {/* ---------------- Le texte ---------------- */}
      <div className="px-4 pt-1 pb-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[0.55rem] tracking-[0.16em] uppercase text-accent-hover">
            {item.category}
          </p>

          {/*
            La mention voyage AVEC la carte, elle n'est plus posee sur
            le titre de section. C'est la seule facon de melanger vrais
            projets et exemples sans qu'un visiteur puisse se tromper
            sur ce qu'il regarde.
          */}
          {item.placeholder && (
            <span
              className="shrink-0 rounded-full px-2 py-[3px] text-[0.55rem] tracking-[0.04em] text-[#8792ad]"
              style={{ background: "rgba(148,163,184,.08)", border: "1px solid #24304a" }}
            >
              Exemple
            </span>
          )}
        </div>

        <h3 className="display mt-1.5 flex items-center gap-2 text-[1.15rem] leading-tight text-foreground">
          {item.title}
          {clickable && (
            <span
              aria-hidden="true"
              className="text-[0.8rem] text-[#60A5FA]"
              style={{
                transform: hover ? "translate(2px,-2px)" : "translate(0,0)",
                transition: `transform ${MOTION.respond}ms ${EASE_PAGE}`,
              }}
            >
              ↗
            </span>
          )}
        </h3>
        <p className="mt-2.5 text-[0.8rem] leading-relaxed text-[#8792ad]">{item.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <span
              key={t}
              className="rounded-full px-2.5 py-1 text-[0.62rem] text-[#8fa3c9]"
              style={{ background: "rgba(59,130,246,.09)", border: "1px solid #1c2946" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

/* ==========================================================================
 *  LES MAQUETTES DESSINEES
 *
 *  Chacune fait deux fois la hauteur de sa fenetre : c'est ce qui laisse
 *  de la matiere a decouvrir quand la page defile au survol. Une maquette
 *  de la hauteur exacte du cadre ne pourrait pas defiler.
 * ========================================================================== */

function Mockup({ layout, hue }: { layout: SiteItem["layout"]; hue: number }) {
  /* La teinte du projet, declinee en trois intensites. */
  const strong = `hsl(${hue} 72% 62%)`;
  const soft = `hsl(${hue} 46% 42%)`;
  const faint = `hsl(${hue} 30% 26%)`;

  /** Une ligne de faux texte. */
  const Line = ({ w, dim = false }: { w: string; dim?: boolean }) => (
    <span
      className="block h-[3px] rounded-full"
      style={{ width: w, background: dim ? "#1e2740" : "#2b3855" }}
    />
  );

  /*
    Un pied de page commun aux trois silhouettes.

    Il n'est pas decoratif : sans lui, la maquette etait plus courte que
    son cadre et laissait un aplat noir sous le contenu — on lisait un
    bloc vide, pas une page. Une page web a toujours un bas ; l'oublier
    est exactement ce qui fait qu'une maquette ne ressemble pas a un
    site.

    Il donne aussi de la matiere au defilement du survol : sans contenu
    sous la ligne de flottaison, il n'y aurait rien a reveler.
  */
  const Footer = () => (
    <div className="mt-3 border-t pt-3" style={{ borderColor: "#141d33" }}>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-1">
            <span
              className="block h-[3px] w-[70%] rounded-full"
              style={{ background: i === 0 ? strong : "#25304a", opacity: i === 0 ? 0.8 : 1 }}
            />
            <Line w="90%" dim />
            <Line w="76%" dim />
            <Line w="84%" dim />
          </div>
        ))}
      </div>
    </div>
  );

  if (layout === "commerce") {
    return (
      <div className="p-3" style={{ background: "#070B16" }}>
        {/* En-tete */}
        <div className="mb-3 flex items-center justify-between">
          <span className="h-2 w-10 rounded-sm" style={{ background: strong }} />
          <span className="flex gap-1.5">
            <Line w="14px" />
            <Line w="14px" />
            <Line w="14px" />
          </span>
        </div>

        {/* Banniere */}
        <div
          className="mb-3 h-9 rounded-md"
          style={{ background: `linear-gradient(120deg, ${soft}, ${faint})` }}
        />

        {/* Grille de produits, deux rangees */}
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div
                className="aspect-square rounded-md"
                style={{ background: i % 2 ? "#111a2e" : "#0e1626", border: "1px solid #18223a" }}
              />
              <Line w="80%" />
              <span
                className="block h-[3px] w-[40%] rounded-full"
                style={{ background: strong, opacity: 0.75 }}
              />
            </div>
          ))}
        </div>

        <Footer />
      </div>
    );
  }

  if (layout === "landing") {
    return (
      <div className="p-3" style={{ background: "#070B16" }}>
        {/* Pas de menu : une landing ne propose aucune sortie. */}
        <div className="mb-3 flex justify-center">
          <span className="h-2 w-12 rounded-sm" style={{ background: strong }} />
        </div>

        {/* Accroche centree */}
        <div className="mb-3 flex flex-col items-center gap-1.5">
          <span className="block h-[5px] w-[70%] rounded-full" style={{ background: "#33405e" }} />
          <span className="block h-[5px] w-[52%] rounded-full" style={{ background: "#33405e" }} />
          <span
            className="mt-1.5 block h-[13px] w-[38%] rounded-full"
            style={{ background: strong }}
          />
        </div>

        {/* Le formulaire, sujet de la page */}
        <div
          className="mb-3 space-y-1.5 rounded-md p-2.5"
          style={{ background: "#0d1526", border: `1px solid ${faint}` }}
        >
          <div className="h-3 rounded" style={{ background: "#111c33" }} />
          <div className="h-3 rounded" style={{ background: "#111c33" }} />
          <div className="h-3 w-[45%] rounded" style={{ background: strong, opacity: 0.85 }} />
        </div>

        {/* Preuve sociale */}
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="space-y-1 rounded-md p-2"
              style={{ background: "#0c1424", border: "1px solid #18223a" }}
            >
              <Line w="100%" dim />
              <Line w="70%" dim />
            </div>
          ))}
        </div>

        <Footer />
      </div>
    );
  }

  /* --- editorial --- */
  return (
    <div className="p-3" style={{ background: "#070B16" }}>
      {/* En-tete avec menu */}
      <div className="mb-3 flex items-center justify-between">
        <span className="h-2 w-9 rounded-sm" style={{ background: strong }} />
        <span className="flex gap-2">
          <Line w="16px" />
          <Line w="16px" />
          <Line w="16px" />
          <Line w="16px" />
        </span>
      </div>

      {/* Grand titre et image d'accroche */}
      <div className="mb-2 space-y-1.5">
        <span className="block h-[7px] w-[78%] rounded-full" style={{ background: "#3a4a6d" }} />
        <span className="block h-[7px] w-[54%] rounded-full" style={{ background: "#3a4a6d" }} />
      </div>
      <div
        className="mb-3 h-14 rounded-md"
        style={{ background: `linear-gradient(135deg, ${soft}, #0d1526 72%)` }}
      />

      {/* Deux colonnes de texte */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <span className="block h-[4px] w-[50%] rounded-full" style={{ background: strong }} />
          <Line w="100%" dim />
          <Line w="92%" dim />
          <Line w="96%" dim />
          <Line w="60%" dim />
        </div>
        <div className="space-y-1.5">
          <span className="block h-[4px] w-[50%] rounded-full" style={{ background: strong }} />
          <Line w="100%" dim />
          <Line w="88%" dim />
          <Line w="94%" dim />
          <Line w="70%" dim />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SiteGrid;
