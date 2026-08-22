import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * ULTRA VISION — remise en haut de page a chaque navigation.
 *
 * ============================================================
 *  NOUVEAU FICHIER : src/components/ScrollToTop.tsx
 * ============================================================
 *
 * LE DEFAUT QU'IL CORRIGE
 *
 * En cliquant « Tarifs » depuis le bas de l'accueil, on arrivait au
 * milieu de la page Tarifs. En cliquant « A propos », on arrivait dans
 * son pied de page. Autrement dit : on n'arrivait jamais au debut de ce
 * qu'on venait de demander.
 *
 * POURQUOI `scrollRestoration` NE SUFFISAIT PAS
 *
 * Le routeur sait restaurer une position, et il le fait bien pour le
 * bouton « precedent ». Mais la page qui arrive est enveloppee par
 * <PageTransition>, qui lui applique une mise a l'echelle. Un element
 * transforme devient le bloc de reference de ses descendants et sa
 * hauteur mesuree change pendant l'animation : au moment ou le routeur
 * veut ecrire la position, le document n'a pas encore sa taille finale,
 * et l'ecriture se perd.
 *
 * D'ou ce composant, qui repasse APRES l'animation d'entree.
 *
 * TROIS CAS SONT LAISSES TRANQUILLES
 *
 * 1. Le retour arriere. On restaure alors la position d'ou l'on vient,
 *    c'est tout l'interet du bouton « precedent ». On ne touche a rien.
 * 2. Les ancres (#tarifs, #faq). Le navigateur doit pouvoir viser
 *    l'element demande ; le forcer en haut annulerait le lien.
 * 3. Le tout premier affichage. Rien a corriger, on y est deja.
 *
 * `behavior: 'instant'` et non `'smooth'` : une page qui defile toute
 * seule sur trois mille pixels apres un changement de page se lit comme
 * un bug, pas comme une intention.
 */
export function ScrollToTop() {
  const { pathname, hash } = useRouterState({
    select: (s) => ({ pathname: s.location.pathname, hash: s.location.hash }),
  });
  const first = useRef(true);

  useEffect(() => {
    // Premier affichage : la position est deja la bonne.
    if (first.current) {
      first.current = false;
      return;
    }

    // Une ancre a ete demandee : c'est elle qui commande, pas nous.
    if (hash) return;

    // Retour arriere : le routeur restaure, on le laisse faire.
    if (
      typeof window !== "undefined" &&
      (window.history.state as { __scrollRestore?: boolean } | null)?.__scrollRestore
    ) {
      return;
    }

    /*
      Deux images d'attente.

      La premiere laisse React poser le contenu de la nouvelle page, la
      seconde laisse le navigateur en calculer la hauteur. Ecrire avant
      cela revient a viser une page qui n'a pas encore sa taille : le
      navigateur corrige ensuite la position tout seul, et on retombe
      exactement sur le defaut qu'on essaie de supprimer.
    */
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [pathname, hash]);

  return null;
}
