import { useState } from "react";

/**
 * ULTRA VISION — pastille plateforme.
 *
 * Les logos officiels sont deposes dans public/brand/platforms/.
 * Si un fichier venait a manquer, la pastille se replie automatiquement
 * sur le nom en toutes lettres : la page ne casse jamais.
 *
 * ------------------------------------------------------------
 * DEUX AJUSTEMENTS FAITS SUR LES FICHIERS FOURNIS
 *
 * 1. TIKTOK. Le fichier d'origine est en couleurs, avec une note NOIRE.
 *    Sur un fond a #0d0d10, cette note disparait purement et simplement.
 *    Le fichier a donc ete passe en monochrome blanc — c'est la variante
 *    que TikTok prevoit explicitement pour les fonds sombres. La version
 *    couleur d'origine est conservee sous tiktok-couleur.svg si tu en as
 *    besoin sur fond clair.
 *
 * 2. META. Le fichier fourni est le lockup complet, symbole + mot
 *    « Meta ». Ecrire « Meta Ads » a cote afficherait donc « Meta » deux
 *    fois. Les plateformes dont le logo contient deja le nom n'affichent
 *    que le complement : « Ads ».
 *
 * GOOGLE ADS reste en couleurs, volontairement. Google impose ses
 * couleurs officielles sur son glyphe et n'autorise pas de version
 * monochrome pour cet usage. C'est aussi la seule tache de couleur non
 * bleue de la page : elle attire l'oeil exactement la ou il faut.
 *
 * ------------------------------------------------------------
 * LA SEULE REGLE QUI EXPOSE VRAIMENT
 *
 * Ne jamais laisser croire a un partenariat ou une certification que tu
 * n'as pas. Citer une plateforme pour decrire une prestation que tu
 * fournis reellement est un usage nominatif, admis, et pratique par
 * toutes les agences.
 */

export type Platform = {
  /** Nom complet, utilise en repli et pour l'accessibilite. */
  label: string;
  /** Fichier dans public/brand/platforms/. */
  file: string;
  /**
   * Vrai si le logo contient deja le nom de la marque. Dans ce cas on
   * n'affiche a cote que le complement, pour ne pas ecrire le nom deux
   * fois.
   */
  wordmark?: boolean;
  /** Complement affiche a droite du logo. */
  suffix?: string;
  /** Hauteur du logo en pixels. Compense les rapports tres differents. */
  height?: number;
  /**
   * Largeur du logo en pixels, calculee depuis le viewBox du fichier SVG.
   *
   * POURQUOI ELLE EST OBLIGATOIRE ICI
   *
   * Un SVG dont on ne fixe que la hauteur occupe zero pixel de large
   * tant que le navigateur ne l'a pas telecharge. La pastille se
   * construit donc trop etroite, puis s'elargit d'un coup quand le
   * logo arrive. C'est un decalage de mise en page (CLS), et c'est
   * exactement ce que l'audit « navigation agentique » de PageSpeed
   * sanctionne : un agent qui a repere un element avant le decalage
   * clique a cote apres.
   */
  width?: number;
};

/*
  Les largeurs sont calculees depuis le viewBox de chaque fichier :
    meta.svg        6962 x 3000  -> rapport 2,32  -> 13 px de haut = 30 px
    google-ads.svg   256 x  256  -> rapport 1,00  -> 16 px de haut = 16 px
    tiktok.svg        32 x   32  -> rapport 1,00  -> 16 px de haut = 16 px
    instagram.svg   1000 x 1000  -> rapport 1,00  -> 15 px de haut = 15 px
    whatsapp.svg     720 x  720  -> rapport 1,00  -> 16 px de haut = 16 px
  Si tu remplaces un fichier, recalcule sa largeur, sinon le logo
  s'ecrase ou s'etire.
*/
export const PLATFORMS: Platform[] = [
  { label: "Meta Ads", file: "meta.svg", wordmark: true, suffix: "Ads", height: 13, width: 30 },
  { label: "Google Ads", file: "google-ads.svg", suffix: "Google Ads", height: 16, width: 16 },
  { label: "TikTok Ads", file: "tiktok.svg", suffix: "TikTok Ads", height: 16, width: 16 },
];

/** Disponibles si tu veux les ajouter ailleurs sur le site. */
export const PLATFORMS_EXTRA: Platform[] = [
  { label: "Instagram", file: "instagram.svg", suffix: "Instagram", height: 15, width: 15 },
  { label: "WhatsApp", file: "whatsapp.svg", suffix: "WhatsApp", height: 16, width: 16 },
];

export function PlatformChip({
  platform,
  className = "",
  style,
}: {
  platform: Platform;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  const text = failed ? platform.label : (platform.suffix ?? platform.label);

  return (
    <div
      className={`flex items-center gap-2.5 rounded-full border border-[#262a35] bg-[#0d0d10]/90 px-4 py-2 backdrop-blur-sm ${className}`}
      style={style}
      title={platform.label}
    >
      {failed ? (
        <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-accent" aria-hidden="true" />
      ) : (
        <img
          src={`/brand/platforms/${platform.file}`}
          alt=""
          aria-hidden="true"
          width={platform.width ?? 16}
          height={platform.height ?? 16}
          className="shrink-0"
          style={{ height: platform.height ?? 16, width: platform.width ?? 16 }}
          onError={() => setFailed(true)}
          draggable={false}
        />
      )}
      <span className="text-[0.72rem] whitespace-nowrap text-[#C8C8C6]">{text}</span>
    </div>
  );
}
