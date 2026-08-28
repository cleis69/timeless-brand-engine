import { useEffect, useRef, useState } from "react";
import { shownStats, type WorkItem } from "./work.data";
import { WorkPlayer } from "./WorkPlayer";
import { useReveal } from "@/hooks/useReveal";
import { EASE_ENTER, EASE_PAGE, MOTION } from "@/config/motion";

/**
 * ULTRA VISION — la grille des realisations, en chevauchement.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/components/work/WorkGrid.tsx
 *  Il remplace la pile de grandes cartes de /realisations.
 * ============================================================
 *
 * CE QUI EST REMPLACE
 *
 * La page affichait UNE realisation par rangee : une affiche de 280 px
 * de large posee a cote d'un pave de texte, sur toute la largeur de
 * l'ecran. Quatre realisations occupaient ainsi quatre ecrans entiers.
 *
 * Deux consequences. La premiere est un probleme de rythme : on ne voit
 * jamais deux realisations ensemble, donc on ne peut pas les comparer,
 * et rien ne donne l'impression d'un volume de travail. La seconde est
 * un probleme d'echelle : a cette taille, chaque affiche reclame
 * l'attention d'une oeuvre alors que ce sont des formats verticaux de
 * quinze secondes.
 *
 * LE PRINCIPE RETENU : LE JEU DE CARTES
 *
 * Quatre cartes minimum par rangee, six sur tres grand ecran. Elles ne
 * sont pas posees cote a cote avec une gouttiere : elles SE CHEVAUCHENT,
 * chacune mordant sur la precedente d'environ un sixieme de sa largeur,
 * avec une legere inclinaison alternee.
 *
 * C'est la disposition d'un jeu de cartes etale sur une table, et elle
 * est choisie pour une raison precise : des rectangles verticaux poses
 * a intervalle regulier se lisent comme une frise, c'est-a-dire comme un
 * decor. Des rectangles qui se recouvrent se lisent comme des objets
 * empiles, donc comme une matiere qu'on peut prendre en main.
 *
 * L'ANIMATION AU CHEVAUCHEMENT
 *
 * Au survol d'une carte, trois choses se produisent en meme temps :
 *
 *   1. La carte visee se REDRESSE et remonte. Elle perd son inclinaison,
 *      passe au premier plan, grandit de 8 %.
 *   2. Ses VOISINES S'ECARTENT. Celles de gauche glissent vers la
 *      gauche, celles de droite vers la droite — d'autant plus fort
 *      qu'elles sont proches. Le chevauchement s'ouvre autour de la
 *      carte visee, comme un jeu qu'on etale du pouce.
 *   3. Le reste de la rangee S'ASSOMBRIT legerement.
 *
 * Ce qui compte ici, c'est que l'ecartement soit DEGRESSIF. Si toutes
 * les voisines se decalaient de la meme distance, la rangee entiere
 * glisserait d'un bloc et on ne verrait qu'un deplacement. En faisant
 * decroitre l'ecart avec la distance, c'est l'espace autour de la carte
 * qui s'ouvre — et c'est cela qu'on lit comme une intention.
 *
 * L'ecartement ne franchit jamais la fin d'une rangee : une carte ne
 * pousse pas une carte qui se trouve sur la ligne du dessous.
 *
 * LA VIDEO
 *
 * Rien n'est charge tant qu'on ne survole pas. La carte affiche son
 * image fixe ; la video est montee au survol et demontee a la sortie.
 * Avec des fichiers de 5 a 6 Mo, charger les quatre couterait une
 * vingtaine de megaoctets pour une page qu'on parcourt en dix secondes.
 *
 * TELEPHONE
 *
 * Le chevauchement et l'inclinaison sont annules sous 768 px : deux
 * colonnes franches, sans recouvrement. Un chevauchement sur un ecran
 * de 390 px ne se lit plus comme une intention mais comme un defaut de
 * mise en page, et le survol n'existe pas pour le corriger.
 */

type Props = {
  items: WorkItem[];
};

/**
 * Recouvrement horizontal, en part de la largeur d'une carte.
 *
 * 0.10 et non 0.16. A 16 % la carte de gauche mangeait le titre de sa
 * voisine : on ne lisait plus que la premiere de chaque rangee. Le
 * chevauchement doit se voir sans jamais couvrir le bloc de texte, qui
 * occupe le tiers bas de chaque carte.
 */
const OVERLAP = 0.1;

/**
 * Largeur d'une carte pour que la rangee remplisse exactement la
 * largeur disponible, recouvrement compris.
 *
 * n cartes qui se recouvrent de `o` occupent  w * (n - (n-1) * o).
 * On veut que ce total fasse 100 %, d'ou la formule inverse ci-dessous.
 *
 * Sans ce calcul, une rangee de quatre cartes recouvertes de 16 %
 * n'occupait que 88 % de la largeur : la grille s'arretait avant le
 * bord droit et laissait un vide que rien ne justifiait.
 */
const cardWidth = (n: number) => 100 / (n - (n - 1) * OVERLAP);

/** Inclinaison au repos, en degres. Alternee une carte sur deux. */
const TILT = 1.6;

/** Ecartement maximal d'une voisine immediate, en pixels. */
const PUSH = 26;

export function WorkGrid({ items }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  /* La realisation ouverte en plein ecran, ou null. */
  const [playing, setPlaying] = useState<WorkItem | null>(null);
  const [perRow, setPerRow] = useState(4);
  const { ref: sectionRef, isVisible } = useReveal<HTMLDivElement>({ amount: 0.08 });

  /*
    Le nombre de cartes par rangee est lu depuis le navigateur et non
    devine. Il sert au calcul de l'ecartement : sans lui, on ne sait pas
    ou une rangee se termine, et une carte de fin de ligne pousserait
    celle qui commence la ligne suivante.
  */
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 768) setPerRow(2);
      else if (w < 1280) setPerRow(4);
      else if (w < 1600) setPerRow(5);
      else setPerRow(6);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  /*
    Le nombre de colonnes ne depasse jamais le nombre de realisations.

    Sans ce plafond, un ecran de 1512 px demandait cinq colonnes pour
    quatre cartes : la rangee s'arretait aux quatre cinquiemes de la
    largeur et laissait un vide a droite que rien n'expliquait. Le
    defaut n'apparaissait qu'a certaines largeurs, ce qui est la pire
    categorie de defaut — celle qu'on ne voit pas sur son propre ecran.
  */
  const cols = Math.max(1, Math.min(perRow, items.length));
  const compact = cols <= 2;

  /*
    LES RANGEES SONT DECOUPEES EN AMONT, ET NON LAISSEES AU RETOUR
    AUTOMATIQUE A LA LIGNE.

    Avec `flex-wrap`, quatre cartes de 27,027 % separees de trois
    recouvrements de 2,7027 % font exactement 100 % — sur le papier. Le
    navigateur, lui, arrondit chaque largeur au sous-pixel : le total
    depassait le cadre d'une fraction de pixel et la quatrieme carte
    tombait a la ligne suivante.

    En decoupant les rangees nous-memes et en interdisant le retour a la
    ligne, ce depassement d'arrondi se resorbe en retrecissant les
    cartes d'un demi-pixel — ce qui ne se voit pas — au lieu de casser
    la mise en page.

    Ce decoupage rend au passage le calcul de l'ecartement evident : les
    voisines d'une carte sont ses freres dans le tableau, il n'y a plus
    a deduire une rangee d'un indice.
  */
  const rows: WorkItem[][] = [];
  for (let i = 0; i < items.length; i += cols) rows.push(items.slice(i, i + cols));

  return (
    <div
      ref={sectionRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(26px)",
        transition: `opacity ${MOTION.enter}ms ${EASE_ENTER}, transform ${MOTION.enter}ms ${EASE_ENTER}`,
      }}
      onMouseLeave={() => setHovered(null)}
    >
      {rows.map((rowItems, r) => (
        <div
          key={r}
          className="flex flex-nowrap"
          style={{
            // La marge compense le debord des cartes inclinees et soulevees.
            padding: compact ? 0 : "26px 0 30px",
          }}
        >
          {rowItems.map((item, c) => {
            /* Indice global, celui qui sert de numero et de cle de survol. */
            const i = r * cols + c;
            const isFirstOfRow = c === 0;

            /*
              L'ecartement. Il n'existe que si une carte est survolee,
              que ce n'est pas celle-ci, et que les deux sont sur la
              MEME rangee. `distance` vaut 1 pour une voisine immediate,
              2 pour la suivante : l'ecart decroit en 1/distance.
            */
            let push = 0;
            let dim = false;
            if (hovered !== null && hovered !== i && !compact) {
              dim = true;
              const sameRow = Math.floor(hovered / cols) === r;
              if (sameRow) {
                const distance = i - hovered;
                push = (distance > 0 ? PUSH : -PUSH) / Math.abs(distance);
              }
            }

            const isUp = hovered === i;
            const tilt = i % 2 === 0 ? TILT : -TILT;

            return (
              <div
                key={item.slug}
                style={{
                  // Largeur calculee pour que la rangee remplisse le cadre.
                  width: compact ? "50%" : `${cardWidth(cols)}%`,
                  // Le recouvrement : chaque carte mord sur la precedente,
                  // sauf la premiere de chaque rangee.
                  marginLeft: compact || isFirstOfRow ? 0 : `-${OVERLAP * cardWidth(cols)}%`,
                  paddingLeft: compact ? 6 : 0,
                  paddingRight: compact ? 6 : 0,
                  paddingBottom: compact ? 12 : 0,
                  /*
                    LE SENS DE L'EMPILEMENT EST DETERMINANT.

                    Chaque carte passe DEVANT la precedente, et non
                    derriere. C'est la seule facon de garder les textes
                    lisibles : le titre, la categorie et le chiffre sont
                    cales a GAUCHE de chaque carte. Avec l'empilement
                    inverse, la carte de gauche recouvrait la bande de
                    texte de sa voisine — on lisait « cultbody » et
                    « ab » au lieu de « Scultbody » et « Ehab ».

                    Ici, le recouvrement mange la marge droite de la
                    carte precedente, ou il n'y a rien a lire.
                  */
                  zIndex: isUp ? 30 : c + 1,
                  position: "relative",
                }}
              >
                <GridCard
                  item={item}
                  index={i}
                  lifted={isUp}
                  dimmed={dim}
                  push={push}
                  tilt={compact ? 0 : tilt}
                  compact={compact}
                  onEnter={() => setHovered(i)}
                  onPlay={() => setPlaying(item)}
                />
              </div>
            );
          })}
        </div>
      ))}

      {/*
        Le lecteur plein ecran. Il se rend lui-meme dans un portail vers
        <body> — indispensable ici, ou chaque carte est inclinee et mise a
        l'echelle : un ancetre transforme piegerait son `position: fixed`.
        Voir l'en-tete de WorkPlayer.tsx.
      */}
      <WorkPlayer item={playing} onClose={() => setPlaying(null)} />
    </div>
  );
}

/* ==========================================================================
 *  UNE CARTE
 * ========================================================================== */

function GridCard({
  item,
  index,
  lifted,
  dimmed,
  push,
  tilt,
  compact,
  onEnter,
  onPlay,
}: {
  item: WorkItem;
  index: number;
  /** Vrai quand c'est cette carte qui est visee. */
  lifted: boolean;
  /** Vrai quand une AUTRE carte est visee. */
  dimmed: boolean;
  /** Ecartement horizontal en pixels, signe. */
  push: number;
  /** Inclinaison au repos, en degres. */
  tilt: number;
  compact: boolean;
  onEnter: () => void;
  /** Ouvre le lecteur plein ecran. */
  onPlay: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  /*
    Le premier chiffre REEL. Les marqueurs STAT_ sont masques : une carte
    dont les chiffres ne sont pas encore connus n'affiche pas de ligne de
    resultat du tout, plutot qu'un « STAT_01 » sous son titre.
  */
  const stat = shownStats(item)[0];

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (lifted) {
      v.play().catch(() => {
        /* Le navigateur peut refuser la lecture automatique. L'image
           fixe reste affichee : le visiteur ne voit aucun defaut. */
      });
    } else {
      v.pause();
    }
  }, [lifted]);

  /*
    LES OMBRES, EN TROIS ETATS

    Au repos, une ombre courte et un lisere froid : la carte est posee
    sur la pile. Soulevee, l'ombre s'allonge et se decale vers le bas —
    c'est elle, et non l'echelle, qui fait lire la hauteur. Une carte qui
    grandit sans que son ombre change se lit comme un zoom ; une carte
    dont l'ombre s'allonge se lit comme un objet qu'on souleve.
  */
  const restShadow = [
    "inset 0 1px 0 rgba(191,219,254,.26)",
    "inset 0 -1px 0 rgba(0,0,0,.5)",
    "0 14px 30px -14px rgba(0,0,0,.9)",
    "0 0 0 1px rgba(255,255,255,.05)",
  ].join(", ");

  const liftShadow = [
    "inset 0 1px 0 rgba(191,219,254,.5)",
    "inset 0 -1px 0 rgba(0,0,0,.55)",
    "0 44px 80px -26px rgba(0,0,0,.96)",
    "0 14px 28px -10px rgba(0,0,0,.7)",
    "0 0 0 1px rgba(96,165,250,.42)",
    "0 0 64px -18px rgba(59,130,246,.5)",
  ].join(", ");

  const transform = [
    `translate3d(${push}px, ${lifted ? -18 : 0}px, 0)`,
    `rotate(${lifted ? 0 : tilt}deg)`,
    `scale(${lifted ? 1.08 : 1})`,
  ].join(" ");

  return (
    <article
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onClick={onPlay}
      tabIndex={0}
      aria-label={`${item.title} — ${item.category}`}
      className="group relative aspect-[9/16] w-full cursor-pointer overflow-hidden outline-none select-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        borderRadius: compact ? 14 : 16,
        transform,
        boxShadow: lifted ? liftShadow : restShadow,
        filter: dimmed ? "brightness(.6) saturate(.7)" : "none",
        transition: [
          `transform 520ms ${EASE_PAGE}`,
          `box-shadow 520ms ${EASE_PAGE}`,
          `filter 420ms ${EASE_PAGE}`,
        ].join(", "),
        willChange: "transform",
      }}
    >
      {/* --- L'image fixe, toujours presente --- */}
      <picture>
        <source
          srcSet={item.poster.replace(/poster\.jpg$/, "poster-sm.webp")}
          media="(max-width: 640px)"
          type="image/webp"
        />
        <source srcSet={item.poster.replace(/poster\.jpg$/, "poster.webp")} type="image/webp" />
        <img
          src={item.poster}
          alt=""
          aria-hidden="true"
          width={760}
          height={1351}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            transform: lifted ? "scale(1.05)" : "scale(1)",
            transition: `transform 900ms ${EASE_PAGE}`,
          }}
        />
      </picture>

      {/* --- La video : montee uniquement au survol --- */}
      {lifted && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        >
          {item.sources.mobile && (
            <source src={item.sources.mobile} type="video/mp4" media="(max-width: 768px)" />
          )}
          <source src={item.sources.mp4} type="video/mp4" />
        </video>
      )}

      {/* --- Nappe de lumiere fixe : elle donne le volume --- */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[4]"
        style={{
          mixBlendMode: "screen",
          background:
            "linear-gradient(116deg, rgba(255,255,255,.15) 0%, rgba(190,215,255,.04) 26%, transparent 48%)",
        }}
      />

      {/*
        --- Voile de lisibilite ---

        Il monte plus haut et devient plus opaque QUAND LA CARTE EST
        SOULEVEE, parce que c'est a ce moment-la que la description
        apparait : trois lignes de texte gris sur une video en
        mouvement etaient illisibles avec le voile de repos, qui ne
        couvrait que la ligne du titre.

        Le voile de repos, lui, reste discret : au repos il n'a que le
        titre et un chiffre a porter, et l'assombrir davantage
        reviendrait a eteindre l'image pour rien.
      */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background: lifted
            ? "linear-gradient(to top, rgba(6,8,14,.97) 6%, rgba(6,8,14,.78) 30%, rgba(6,8,14,.15) 58%, transparent 78%)"
            : "linear-gradient(to top, rgba(9,9,9,.94) 2%, rgba(9,9,9,.24) 40%, transparent 66%)",
          transition: `background 420ms ${EASE_PAGE}`,
        }}
      />

      {/* --- Numero --- */}
      <span className="pointer-events-none absolute top-3.5 left-3.5 z-[6] text-[0.6rem] tracking-[0.16em] tabular-nums text-accent">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/*
        --- Bouton de lecture ---

        Un VRAI bouton : il ouvre le lecteur plein ecran, avec le son et
        les commandes natives. La carte entiere est cliquable aussi, mais
        le bouton porte le libelle lu par les lecteurs d'ecran.

        Pas de `pointer-events-none` : sur un ecran tactile il n'y a pas
        de survol, et un bouton qu'on ne peut atteindre qu'a la souris
        n'existe pas sur telephone.
      */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPlay();
        }}
        aria-label={`Lire la vidéo — ${item.title}`}
        className="absolute top-1/2 left-1/2 z-[7] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/30 outline-none transition-colors hover:bg-black/55 focus-visible:ring-2 focus-visible:ring-accent"
        style={{
          opacity: lifted ? 1 : 0,
          transform: `translate(-50%,-50%) scale(${lifted ? 1 : 0.8})`,
          transition: `opacity 300ms ${EASE_PAGE}, transform 300ms ${EASE_PAGE}, background-color 200ms ${EASE_PAGE}`,
        }}
      >
        <svg
          width="12"
          height="14"
          viewBox="0 0 20 22"
          fill="#fff"
          className="ml-[3px]"
          aria-hidden="true"
        >
          <path d="M0 1.2C0 .3 1 -.3 1.8.2l17 9.8c.8.5.8 1.6 0 2L1.8 21.8C1 22.3 0 21.7 0 20.8V1.2Z" />
        </svg>
      </button>

      {/* --- Informations --- */}
      <div className="absolute inset-x-0 bottom-0 z-[6] p-3.5 sm:p-4">
        <p className="truncate text-[0.52rem] tracking-[0.16em] uppercase text-accent-hover sm:text-[0.55rem]">
          {item.category}
        </p>
        <h3 className="display mt-1 truncate text-[0.95rem] text-foreground sm:text-[1.05rem]">
          {item.title}
        </h3>

        {/*
          Le chiffre principal reste lisible sur CHAQUE carte QUI EN A UN,
          meme au repos. C'est ce qui empeche la grille de redevenir une
          planche de vignettes : la carte porte un resultat, pas seulement
          une image.

          Les cartes sans chiffres connus n'affichent rien ici. Elles sont
          alors un peu plus basses que leurs voisines — c'est voulu : un
          emplacement reserve et vide se lirait comme un defaut de
          chargement.
        */}
        {stat && (
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="display text-[0.9rem] leading-none text-foreground">{stat.value}</span>
            <span className="text-[0.47rem] tracking-[0.13em] text-[#a9a9a5]">{stat.label}</span>
          </div>
        )}

        {/*
          La description n'apparait qu'au survol, et seulement sur grand
          ecran. Sur une carte de cette largeur, trois lignes de texte
          permanentes ecraseraient l'image — qui est le sujet.
        */}
        {!compact && (
          <p
            className="mt-2 overflow-hidden text-[0.72rem] leading-snug text-[#cbd2e0]"
            style={{
              opacity: lifted ? 1 : 0,
              maxHeight: lifted ? 72 : 0,
              transition: `opacity ${MOTION.expand}ms ${EASE_PAGE} 90ms, max-height 520ms ${EASE_PAGE}`,
            }}
          >
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}

export default WorkGrid;
