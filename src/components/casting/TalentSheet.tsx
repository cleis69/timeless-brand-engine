import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EASE_PAGE, EASE_RESPOND, MOTION } from "@/config/motion";
import { hasWhatsapp, whatsappUrl } from "@/config/contact";
import { SITE_URL } from "@/config/site";
import { categoryLabel, talentAge, type Talent } from "@/content/talents";

/**
 * ULTRA VISION — la fiche d'un talent, ouverte par-dessus la grille.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/components/casting/TalentSheet.tsx
 * ============================================================
 *
 * Meme construction que le lecteur video (WorkPlayer) : portail vers
 * <body>, Echap et clic sur le fond pour fermer, defilement de la page
 * bloque, focus rendu a la carte d'origine a la fermeture.
 *
 * LES PHOTOS DEFILENT AU DOIGT
 *
 * Une bande horizontale « scroll-snap » : le glisser est celui du
 * telephone lui-meme, avec son inertie, sans une ligne de calcul. Les
 * fleches du clavier et les vignettes font la meme chose sur ordinateur.
 *
 * LE BOUTON PRINCIPAL S'ADRESSE AUX MARQUES
 *
 * « Choisir ce profil » ouvre WhatsApp avec le nom du talent ET le lien
 * de sa fiche. Le message qui arrive dit donc exactement de qui il
 * s'agit, meme si le prospect a efface la moitie du texte.
 */

type Props = {
  talent: Talent | null;
  onClose: () => void;
};

export function TalentSheet({ talent, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const open = talent !== null;
  const count = talent?.photos.length ?? 0;

  const goTo = useCallback((i: number) => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollTo({ left: i * strip.clientWidth, behavior: "smooth" });
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(Math.min(index + 1, count - 1));
      if (e.key === "ArrowLeft") goTo(Math.max(index - 1, 0));
    },
    [onClose, goTo, index, count],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onKeyDown]);

  /* Blocage du defilement et focus : voir WorkPlayer, meme raisons. */
  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const overflow = body.style.overflow;
    const padding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    closeRef.current?.focus();
    return () => {
      body.style.overflow = overflow;
      body.style.paddingRight = padding;
      previousFocus.current?.focus?.();
    };
  }, [open]);

  /* Une nouvelle fiche repart de sa premiere photo. */
  useEffect(() => {
    setIndex(0);
    setCopied(false);
    stripRef.current?.scrollTo({ left: 0 });
  }, [talent?.slug]);

  if (!talent || typeof document === "undefined") return null;

  const link = `${SITE_URL}/casting?profil=${talent.slug}`;
  const ask = whatsappUrl(
    `Bonjour ULTRA VISION, je souhaite travailler avec ${talent.name} pour une campagne : ${link}`,
  );

  const share = async () => {
    /*
      Sur telephone, la feuille de partage du systeme : WhatsApp,
      Messages, AirDrop… Sur ordinateur, ou si elle est refusee, on
      copie le lien.
    */
    if (navigator.share) {
      try {
        await navigator.share({ title: `${talent.name} — ULTRA VISION`, url: link });
        return;
      } catch {
        /* Partage annule : on se rabat sur la copie. */
      }
    }
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      /* Presse-papiers refuse : le lien reste dans la barre d'adresse. */
    }
  };

  const facts: [string, string][] = [
    ["Âge", `${talentAge(talent)} ans`],
    ...(talent.height ? ([["Taille", `${talent.height} cm`]] as [string, string][]) : []),
    ["Ville", talent.city],
    ["Langues", talent.languages.join(", ")],
  ];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Profil de ${talent.name}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      // Lenis intercepte la molette sur toute la page : sans cet
      // attribut, la fiche ne defilerait pas sur un petit ecran.
      // Centrage par `m-auto` et non `items-center` : une fiche plus
      // haute que l'ecran serait sinon coupee en haut, hors d'atteinte.
      data-lenis-prevent
      className="fixed inset-0 z-[100] overflow-y-auto lg:flex lg:p-8"
      style={{
        background: "rgba(4,4,6,.93)",
        backdropFilter: "blur(6px)",
        animation: `uv-sheet-in 260ms ${EASE_PAGE} both`,
      }}
    >
      <style>{`
        @keyframes uv-sheet-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes uv-sheet-rise {
          from { opacity: 0; transform: translateY(14px) scale(.985) }
          to   { opacity: 1; transform: none }
        }
        .uv-sheet-strip { scrollbar-width: none; }
        .uv-sheet-strip::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          [data-uv-sheet] { animation: none !important }
        }
      `}</style>

      <div
        data-uv-sheet
        className="relative mx-auto w-full max-w-[980px] lg:m-auto lg:grid lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-10 lg:overflow-hidden lg:rounded-3xl"
        style={{
          backgroundColor: "#0B1020",
          border: "1px solid #16203a",
          animation: `uv-sheet-rise 320ms ${EASE_PAGE} both`,
        }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer la fiche"
          className="absolute top-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-foreground outline-none backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-accent"
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

        {/* ---------------- Les photos ---------------- */}
        <div className="relative">
          <div
            ref={stripRef}
            onScroll={(e) => {
              const s = e.currentTarget;
              setIndex(Math.round(s.scrollLeft / Math.max(1, s.clientWidth)));
            }}
            className="uv-sheet-strip flex snap-x snap-mandatory overflow-x-auto"
          >
            {talent.photos.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${talent.name}, photo ${i + 1} sur ${count}`}
                width={900}
                height={1200}
                className="aspect-[3/4] w-full shrink-0 snap-center object-cover"
              />
            ))}
          </div>

          {count > 1 && (
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {talent.photos.map((src, i) => (
                // 24 px de zone tactile autour d'un point de 6 px.
                <button
                  type="button"
                  key={src}
                  onClick={() => goTo(i)}
                  aria-label={`Photo ${i + 1}`}
                  aria-current={i === index}
                  className="flex h-6 w-6 items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className="block h-1.5 rounded-full"
                    style={{
                      width: i === index ? 18 : 6,
                      backgroundColor: i === index ? "#fff" : "rgba(255,255,255,.45)",
                      transition: `all ${MOTION.respond}ms ${EASE_RESPOND}`,
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---------------- Les informations ---------------- */}
        <div className="p-7 sm:p-9 lg:py-10 lg:pr-12 lg:pl-0">
          <p className="eyebrow" style={{ color: "#60A5FA" }}>
            {talent.categories.map(categoryLabel).join(" · ")}
          </p>
          <h2 className="display mt-3 text-[2rem] leading-[1.05] tracking-[-0.03em] text-foreground">
            {talent.name}
          </h2>

          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4">
            {facts.map(([k, v]) => (
              <div key={k} className="border-t border-hairline pt-3">
                <dt className="text-[0.62rem] tracking-[0.16em] uppercase text-[#797976]">{k}</dt>
                <dd className="mt-1 text-sm text-foreground">{v}</dd>
              </div>
            ))}
          </dl>

          {talent.credits && talent.credits.length > 0 && (
            <div className="mt-7">
              <p className="text-[0.62rem] tracking-[0.16em] uppercase text-[#797976]">
                A tourné avec nous
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {talent.credits.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {talent.instagram && (
            <a
              href={`https://instagram.com/${talent.instagram.replace(/^@/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-6 inline-block text-sm text-[#93C5FD]"
            >
              {talent.instagram}
            </a>
          )}

          <div className="mt-9 flex flex-wrap gap-3">
            {hasWhatsapp && (
              <a
                href={ask}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center rounded-full px-7 text-xs font-medium tracking-[0.14em] uppercase text-white"
                style={{
                  backgroundColor: "#2563EB",
                  transition: `background-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                }}
              >
                Choisir ce profil
              </a>
            )}
            <button
              type="button"
              onClick={share}
              className="inline-flex h-12 items-center rounded-full px-6 text-xs font-medium tracking-[0.14em] uppercase"
              style={{ border: "1px solid #2b4880", color: "#cddafc" }}
            >
              {copied ? "Lien copié" : "Partager la fiche"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
