import { useReveal } from "@/hooks/useReveal";
import { EASE_PAGE } from "@/config/motion";
import { WORK_ITEMS, shownStats } from "@/components/work/work.data";
import { SITE_ITEMS } from "@/components/work/sites.data";

/**
 * ULTRA VISION — une image par pole, dans la section Expertises.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/components/PoleVisuals.tsx
 *  Utilise par src/components/ExpertiseList.tsx.
 * ============================================================
 *
 * LA REGLE : CHAQUE IMAGE MONTRE LE TRAVAIL LUI-MEME
 *
 * Pas d'illustration, pas de photo d'ambiance. Un pole se prouve par ce
 * qu'il produit :
 *
 *   Marque & Contenu  nos films, en planche verticale
 *   Web               nos sites livres, dans leur navigateur
 *   IA                ce que voit le client : un agent qui repond sur
 *                     WhatsApp et pose le rendez-vous
 *   Acquisition       une de nos publicites telle qu'elle passe dans le
 *                     fil, avec ses vrais chiffres
 *
 * Les films, les sites et les chiffres viennent des memes fichiers que
 * les pages Realisations (work.data.ts, sites.data.ts) : ajouter ou
 * corriger un projet la-bas le corrige ici.
 */

const film = (slug: string) => WORK_ITEMS.find((w) => w.slug === slug);
const site = (slug: string) => SITE_ITEMS.find((s) => s.slug === slug);

/* ================================================================
 *  MARQUE & CONTENU — trois films, decales comme une planche contact
 * ================================================================ */

const REEL_SLUGS = ["cosmetique", "salon-coiffure", "barber-shop"];
/* Decalage vertical de chaque colonne : le rythme d'une planche, pas une grille. */
/*
  Tous positifs : une affiche remontee au-dela du haut du panneau y
  etait coupee net, ce qui se lisait comme une erreur et non comme un
  debord voulu.
*/
const REEL_SHIFT = ["10%", "0%", "18%"];

export function ReelVisual() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-5 top-5 bottom-[34%] flex gap-3 sm:inset-x-6">
        {REEL_SLUGS.map((slug, i) => {
          const w = film(slug);
          if (!w) return null;
          return (
            <div
              key={slug}
              className="relative flex-1 transition-transform duration-700 group-hover:-translate-y-[4%]"
              style={{
                transform: `translateY(${REEL_SHIFT[i]})`,
                transitionTimingFunction: EASE_PAGE,
              }}
            >
              <img
                src={`/work/${slug}/poster-md.webp`}
                alt=""
                width={480}
                height={854}
                loading="lazy"
                decoding="async"
                className="aspect-[9/16] w-full rounded-xl object-cover brightness-[.72] transition-[filter] duration-500 group-hover:brightness-100"
                style={{
                  boxShadow: "0 20px 40px -16px rgba(0,0,0,.9), 0 0 0 1px rgba(255,255,255,.06)",
                }}
              />
            </div>
          );
        })}
      </div>
      {/* Le fondu vers la couleur du panneau : le texte se pose dessus sans cadre. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #0B1020 34%, rgba(11,16,32,.72) 52%, transparent 78%)",
        }}
      />
    </div>
  );
}

/* ================================================================
 *  WEB — deux sites livres, dans leur navigateur
 * ================================================================ */

function Browser({ slug, className = "" }: { slug: string; className?: string }) {
  const s = site(slug);
  if (!s) return null;
  return (
    <figure
      className={`overflow-hidden rounded-lg ${className}`}
      style={{
        border: "1px solid #26324d",
        backgroundColor: "#0d1426",
        boxShadow: "0 30px 60px -24px rgba(0,0,0,.95)",
      }}
    >
      <div className="flex h-5 items-center gap-1 px-2" style={{ backgroundColor: "#121b33" }}>
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate rounded bg-white/5 px-2 text-[0.5rem] leading-[12px] text-[#8b97b5]">
          {s.domain}
        </span>
      </div>
      <img
        src={`/work/sites/${slug}/shot-960.webp`}
        alt=""
        width={960}
        height={492}
        loading="lazy"
        decoding="async"
        className="block w-full"
      />
    </figure>
  );
}

export function WebVisual() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/*
        Le site du fond est decale vers le haut et assombri, celui du
        premier plan deborde du panneau par la droite et par le bas :
        on voit un travail en cours d'usage, pas une vignette encadree.
      */}
      <div
        className="absolute top-[12%] right-[-8%] w-[78%] brightness-[.55] transition-transform duration-700 group-hover:-translate-y-2 sm:w-[64%]"
        style={{ transitionTimingFunction: EASE_PAGE }}
      >
        <Browser slug="koozina-garden" />
      </div>
      <div
        className="absolute top-[34%] right-[-14%] w-[82%] transition-transform duration-700 group-hover:-translate-x-2 sm:w-[68%]"
        style={{ transitionTimingFunction: EASE_PAGE }}
      >
        <Browser slug="ideal-contemporain" />
      </div>
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background: "linear-gradient(90deg, #0B1020 34%, rgba(11,16,32,.6) 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 sm:hidden"
        style={{ background: "linear-gradient(to top, #0B1020 38%, transparent 70%)" }}
      />
    </div>
  );
}

/* ================================================================
 *  IA — l'agent qui repond sur WhatsApp et pose le rendez-vous
 * ================================================================ */

/*
  Une conversation type, sur le cas le plus frequent de nos clients :
  une demande de visite immobiliere arrivee un soir de semaine. Aucun
  chiffre, aucun nom de client : c'est une demonstration du geste, pas
  un resultat.
*/
const CHAT = [
  { from: "in", text: "Bonjour, je peux visiter l'appartement samedi ?" },
  { from: "out", text: "Bien sûr. Samedi, je vous propose 11 h ou 15 h." },
  { from: "in", text: "15 h, parfait." },
] as const;

export function AiVisual() {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ amount: 0.4 });
  const step = (i: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "none" : "translateY(8px)",
    transition: `opacity 420ms ${EASE_PAGE} ${250 + i * 520}ms, transform 420ms ${EASE_PAGE} ${250 + i * 520}ms`,
  });

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div
        ref={ref}
        className="absolute top-5 right-5 left-5 rounded-2xl p-3 sm:top-6 sm:right-6 sm:left-auto sm:w-[54%] lg:top-1/2 lg:-translate-y-1/2"
        style={{
          backgroundColor: "#0d1426",
          border: "1px solid #1f2b47",
          boxShadow: "0 30px 60px -24px rgba(0,0,0,.95)",
        }}
      >
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <img
            src="/brand/platforms/whatsapp.svg"
            alt=""
            width={14}
            height={14}
            className="h-3.5 w-3.5"
          />
          <span className="text-[0.62rem] text-[#c7d2ea]">Agent IA</span>
          <span className="ml-auto flex items-center gap-1 text-[0.55rem] text-[#6fdc8c]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
            en ligne
          </span>
        </div>
        <div className="mt-2.5 flex flex-col gap-1.5">
          {CHAT.map((m, i) => (
            <p
              key={m.text}
              className={`max-w-[86%] rounded-2xl px-3 py-1.5 text-[0.66rem] leading-snug ${
                m.from === "in"
                  ? "self-start rounded-bl-md bg-white/[.07] text-[#d7deee]"
                  : "self-end rounded-br-md bg-[#2563EB] text-white"
              }`}
              style={step(i)}
            >
              {m.text}
            </p>
          ))}
          <p
            className="mt-1 self-center rounded-full border border-[#28c840]/30 bg-[#28c840]/10 px-2.5 py-1 text-[0.56rem] tracking-[0.04em] text-[#8ee6a6]"
            style={step(CHAT.length)}
          >
            ✓ Visite ajoutée au CRM — samedi 15 h
          </p>
        </div>
      </div>
      {/*
        Le fondu passe SOUS le texte, jamais sur la conversation : sa
        derniere ligne — le rendez-vous inscrit au CRM — est tout
        l'argument du panneau.
      */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{ background: "linear-gradient(to top, #0B1020 34%, transparent 58%)" }}
      />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{ background: "linear-gradient(90deg, #0B1020 26%, transparent 46%)" }}
      />
    </div>
  );
}

/* ================================================================
 *  ACQUISITION — une de nos publicites, telle qu'elle passe dans le fil
 * ================================================================ */

const AD_SLUG = "scultbody";

export function AdsVisual() {
  const w = film(AD_SLUG);
  if (!w) return null;
  const stats = shownStats(w);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute top-5 right-5 left-5 flex items-start justify-end gap-3 sm:left-auto sm:gap-4 sm:right-8 lg:top-1/2 lg:right-10 lg:-translate-y-1/2">
        {/*
          Les resultats de cette publicite, a gauche du fil. Visibles sur
          telephone aussi : ce sont les seuls chiffres verifiables de la
          section, les cacher sur le support le plus utilise n'avait pas
          de sens.
        */}
        <ul className="flex flex-col gap-2 pt-8 sm:pt-10">
          {stats.map((s) => (
            <li
              key={s.label}
              className="rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5"
              style={{ backgroundColor: "rgba(13,20,38,.9)", border: "1px solid #1f2b47" }}
            >
              <span className="display block text-[1rem] leading-none text-foreground sm:text-[1.15rem]">
                {s.value}
              </span>
              <span className="mt-1 block text-[0.55rem] tracking-[0.14em] text-[#8792ad]">
                {s.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Le post sponsorise. */}
        <figure
          className="w-[148px] shrink-0 overflow-hidden rounded-2xl transition-transform duration-700 group-hover:-translate-y-2 sm:w-[210px]"
          style={{
            backgroundColor: "#0d1426",
            border: "1px solid #1f2b47",
            boxShadow: "0 30px 60px -24px rgba(0,0,0,.95)",
            transitionTimingFunction: EASE_PAGE,
          }}
        >
          <div className="flex items-center gap-2 px-3 py-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2563EB] text-[0.55rem] font-semibold text-white">
              {w.title[0]}
            </span>
            <span className="leading-tight">
              <span className="block text-[0.62rem] text-[#e3e8f4]">{w.title}</span>
              <span className="block text-[0.5rem] text-[#8792ad]">Sponsorisé</span>
            </span>
            <img
              src="/brand/platforms/meta.svg"
              alt=""
              width={22}
              height={10}
              className="ml-auto h-2.5 w-auto opacity-70"
            />
          </div>
          <img
            src={`/work/${AD_SLUG}/poster-md.webp`}
            alt=""
            width={480}
            height={854}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="flex items-center justify-between gap-2 bg-[#121b33] px-3 py-2">
            <span className="text-[0.6rem] text-[#e3e8f4]">Envoyer un message</span>
            <img
              src="/brand/platforms/whatsapp.svg"
              alt=""
              width={12}
              height={12}
              className="h-3 w-3"
            />
          </div>
        </figure>
      </div>
      <div
        className="absolute inset-0 lg:hidden"
        style={{ background: "linear-gradient(to top, #0B1020 30%, transparent 40%)" }}
      />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{ background: "linear-gradient(90deg, #0B1020 30%, transparent 56%)" }}
      />
    </div>
  );
}
