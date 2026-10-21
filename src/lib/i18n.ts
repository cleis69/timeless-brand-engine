import { useLocation } from "@tanstack/react-router";
import { localeOf, localePath, type Locale } from "@/lib/locale";

/**
 * UltraVision Agency — les deux langues du site, cote composants.
 *
 * Tout ce qui est pur (adresses, correspondances, types) vit dans
 * src/lib/locale.ts et est re-exporte ici : un composant n'importe que
 * ce fichier. Les contenus, seo.ts et machine-files.ts importent
 * locale.ts directement, jamais ce fichier (voir l'avertissement en tete
 * de locale.ts).
 */

export * from "@/lib/locale";

/** La langue de la page affichee. */
export function useLocale(): Locale {
  const { pathname } = useLocation();
  return localeOf(pathname);
}

/** Raccourci pour les composants : `const lp = useLocalePath(); <Link to={lp("/tarifs")}>`. */
export function useLocalePath() {
  const locale = useLocale();
  return (path: string) => localePath(path, locale);
}
