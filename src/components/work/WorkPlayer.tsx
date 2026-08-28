import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { type WorkItem } from "./work.data";
import { EASE_PAGE } from "@/config/motion";

/**
 * ULTRA VISION — le lecteur plein ecran.
 *
 * ============================================================
 *  POURQUOI UN LECTEUR SEPARE DE L'APERCU
 * ============================================================
 *
 * Les cartes du ruban et de la grille montrent un APERCU : muet, en
 * boucle, sans commande, declenche par le survol. C'est une vignette qui
 * bouge, pas une lecture.
 *
 * Ce composant est l'autre moitie du geste. Il s'ouvre sur un CLIC —
 * donc sur une intention — et il donne ce que l'apercu ne peut pas
 * donner : le son, la barre de progression, la pause, le plein ecran.
 *
 * Les deux ne pouvaient pas etre le meme objet. Un apercu qui se
 * declenche au survol NE PEUT PAS avoir de son : dix cartes qui se
 * mettent a parler quand la souris les traverse rendraient la page
 * inutilisable, et les navigateurs refusent de toute facon de lancer un
 * son que l'utilisateur n'a pas demande.
 *
 * ============================================================
 *  LE SON EST ACTIF A L'OUVERTURE
 * ============================================================
 *
 * Le clic est un geste utilisateur : le navigateur autorise donc le son.
 *
 * Si la lecture sonore est malgre tout refusee — onglet en arriere-plan,
 * reglage systeme, economie de donnees — on repasse en muet et on relance
 * (mieux vaut une image qui bouge sans son qu'un lecteur noir et fige),
 * et un bouton « Activer le son » s'affiche par-dessus la video. Sans lui,
 * le visiteur n'a aucun moyen de savoir que ce qu'il regarde EST sonore :
 * il voit une video muette et en conclut qu'elle n'a pas de son.
 *
 * Les fichiers portent tous une piste AAC stereo. Les APERCUS des cartes,
 * eux, restent muets par leur attribut `muted` : c'est le lecteur, et lui
 * seul, qui a le droit de faire du bruit.
 *
 * ============================================================
 *  IL EST RENDU DANS UN PORTAIL, ET C'EST OBLIGATOIRE
 * ============================================================
 *
 * Le lecteur est en `position: fixed` pour se caler sur la FENETRE. Mais
 * `fixed` ment des qu'un ancetre porte un `transform`, un `filter` ou une
 * `perspective` : cet ancetre devient le referentiel, et le lecteur se
 * centre sur LUI.
 *
 * Or les deux endroits qui l'appellent en sont pleins. Les cartes de la
 * grille sont inclinees, translatees et mises a l'echelle ; le ruban
 * defile par transform ; les blocs <Reveal> animent leur contenu en
 * translation. Rendu sur place, le lecteur se retrouvait cale — et
 * incline — dans la carte cliquee, au lieu de recouvrir la page.
 *
 * `createPortal` vers `document.body` le sort de toute cette pile. Il
 * n'a plus aucun ancetre transforme, donc `fixed` redevient vrai et la
 * video est au centre de l'ecran, toujours.
 *
 * NE PAS le re-rendre sur place « pour simplifier » : le defaut ne se
 * voit que sur les cartes inclinees, donc pas sur la premiere qu'on
 * essaie.
 *
 * ============================================================
 *  CE QU'IL FAUT SAVOIR AVANT D'Y TOUCHER
 * ============================================================
 *
 * - La touche Echap ferme. C'est la seule sortie evidente sur une
 *   surface qui recouvre toute la page.
 * - Le defilement de la page est bloque pendant l'ouverture : sans cela
 *   la molette fait glisser la page DERRIERE le lecteur, et en la
 *   refermant on se retrouve ailleurs sans comprendre pourquoi.
 * - Le focus part sur le bouton de fermeture a l'ouverture et REVIENT a
 *   son point de depart a la fermeture. Sans ce retour, une navigation
 *   au clavier repart du haut de la page a chaque video fermee.
 */

type Props = {
  /** La realisation a lire. `null` ferme le lecteur. */
  item: WorkItem | null;
  onClose: () => void;
};

export function WorkPlayer({ item, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /*
    Vrai quand le navigateur a refuse la lecture sonore et qu'on a du
    repasser en muet. C'est ce qui declenche le bouton « Activer le son ».
  */
  const [needsUnmute, setNeedsUnmute] = useState(false);

  /*
    L'element qui avait le focus AVANT l'ouverture. On le memorise pour
    le lui rendre : c'est la carte sur laquelle on vient de cliquer, et
    c'est la que le clavier doit repartir.
  */
  const previousFocus = useRef<HTMLElement | null>(null);

  const open = item !== null;

  /* ---------- Echap ferme ---------- */
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    document.addEventListener("keydown", onKeyDown);

    /*
      Blocage du defilement. On compense la largeur de la barre de
      defilement qui disparait : sans ce padding, toute la page saute
      lateralement de quelques pixels a l'ouverture, et resaute a la
      fermeture.
    */
    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const overflow = body.style.overflow;
    const padding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = overflow;
      body.style.paddingRight = padding;
      previousFocus.current?.focus?.();
    };
  }, [open, onKeyDown]);

  /* ---------- Lancer la lecture ---------- */
  useEffect(() => {
    if (!open) return;
    const v = videoRef.current;
    if (!v) return;

    v.currentTime = 0;
    v.muted = false;
    setNeedsUnmute(false);

    v.play().catch(() => {
      /*
        Refus du navigateur — politique de lecture automatique, onglet en
        arriere-plan, economie de donnees. On repasse en muet et on
        relance : une video qui tourne sans son reste une video, un
        lecteur fige est une panne.

        Et on le DIT, via le bouton « Activer le son » : un repli
        silencieux se confondrait avec une video sans bande-son.
      */
      v.muted = true;
      setNeedsUnmute(true);
      v.play().catch(() => {
        /* Refus definitif : la commande de lecture native prend le
           relais, le visiteur appuie lui-meme. */
      });
    });
  }, [open, item?.slug]);

  /*
    `document` n'existe pas au rendu serveur. On ne tente le portail
    qu'une fois cote navigateur ; avant cela le lecteur n'a de toute
    facon rien a afficher, puisqu'il s'ouvre sur un clic.
  */
  if (!item || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — ${item.category}`}
      onMouseDown={(e) => {
        /*
          Fermeture au clic sur le fond, et sur le fond SEULEMENT.
          `mousedown` plutot que `click` : un glisser commence sur la
          barre de progression et relache hors du lecteur produirait
          sinon une fermeture involontaire en plein reglage.
        */
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{
        background: "rgba(4,4,6,.93)",
        backdropFilter: "blur(6px)",
        animation: `uv-player-in 260ms ${EASE_PAGE} both`,
      }}
    >
      <style>{`
        @keyframes uv-player-in {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        @keyframes uv-player-rise {
          from { opacity: 0; transform: translateY(14px) scale(.985) }
          to   { opacity: 1; transform: none }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-uv-player], [data-uv-player-frame] { animation: none !important }
        }
      `}</style>

      <div
        data-uv-player-frame
        className="relative w-full max-w-[420px]"
        style={{ animation: `uv-player-rise 320ms ${EASE_PAGE} both` }}
      >
        {/*
          ---------- Barre du haut ----------

          Elle est posee AU-DESSUS du cadre (`bottom-full`), hors du flux.

          Dans le flux, elle poussait la video vers le bas : le bloc
          titre+video etait centre, donc la video, elle, se retrouvait
          decalee de la moitie de la hauteur du titre — 24 px trop bas.
          Ce qu'on veut voir au centre de l'ecran, c'est l'image, pas la
          moyenne entre l'image et sa legende.
        */}
        <div className="absolute inset-x-0 bottom-full mb-3 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-[0.55rem] tracking-[0.16em] uppercase text-accent-hover">
              {item.category}
            </p>
            <h2 className="display mt-1 truncate text-[1.05rem] text-foreground">{item.title}</h2>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer la vidéo"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-foreground outline-none transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* ---------- La video ---------- */}
        <div className="relative">
          <video
            ref={videoRef}
            data-uv-player
            /*
              `controls` est ce qui distingue ce lecteur de l'apercu : la
              barre native donne la pause, la progression, LE VOLUME et le
              plein ecran, dans la langue et les habitudes du systeme du
              visiteur. Aucune raison de la redessiner.
            */
            controls
            playsInline
            preload="metadata"
            poster={item.poster}
            onVolumeChange={(e) => {
              /* Des que le son passe, le bouton n'a plus lieu d'etre —
                 y compris si le visiteur a utilise la barre native. */
              if (!e.currentTarget.muted) setNeedsUnmute(false);
            }}
            /*
              72vh et non 78 : la barre de titre vit au-dessus du cadre,
              hors du flux. Il lui faut de la place, sinon elle sort par
              le haut de la fenetre sur un ecran bas — un portable pose
              en paysage, typiquement.
            */
            className="max-h-[72vh] w-full rounded-xl bg-black object-contain"
            style={{ aspectRatio: item.aspect.replace("/", " / ") }}
          >
            {/*
              Sous 768 px, la version allegee. Le lecteur est un geste
              volontaire, mais cela ne justifie pas d'imposer 20 Mo a un
              telephone en 4G : la definition d'une video verticale de
              480 px de large sur un ecran de telephone est deja au-dela
              de ce que l'oeil distingue.
            */}
            {item.sources.mobile && (
              <source src={item.sources.mobile} type="video/mp4" media="(max-width: 768px)" />
            )}
            <source src={item.sources.mp4} type="video/mp4" />
          </video>

          {/*
            --- Activer le son ---

            Ne s'affiche QUE si le navigateur a refuse le son. Il ne
            double pas la commande native : il signale un etat que rien
            d'autre ne signale.
          */}
          {needsUnmute && (
            <button
              type="button"
              onClick={() => {
                const v = videoRef.current;
                if (!v) return;
                v.muted = false;
                v.volume = 1;
                setNeedsUnmute(false);
                v.play().catch(() => {
                  /* Toujours refuse : la barre native reste la sortie. */
                });
              }}
              className="absolute top-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/25 bg-black/70 px-3.5 py-2 text-[0.7rem] tracking-[0.06em] text-foreground outline-none backdrop-blur-sm transition-colors hover:bg-black/90 focus-visible:ring-2 focus-visible:ring-accent"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7 2.2 3.8 5H1.4a.6.6 0 0 0-.6.6v4.8c0 .33.27.6.6.6h2.4L7 13.8c.4.35 1 .07 1-.45V2.65c0-.52-.6-.8-1-.45Z" />
                <path
                  d="M10.6 5.2a3.6 3.6 0 0 1 0 5.6M12.9 3.1a6.6 6.6 0 0 1 0 9.8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              Activer le son
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
