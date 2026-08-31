/**
 * ULTRA VISION — le liseré promotionnel, tout en haut du site.
 *
 * ============================================================
 *  LE TEXTE SE MODIFIE ICI, ET NULLE PART AILLEURS
 * ============================================================
 *
 * Tout est dans la constante PROMO ci-dessous. Pour retirer l'offre :
 * passer `enabled` à false. Le liseré disparaît, l'en-tête reprend sa
 * hauteur d'origine, rien d'autre ne bouge.
 *
 * ============================================================
 *  POURQUOI IL NE DISPARAÎT PAS AU DÉFILEMENT
 * ============================================================
 *
 * La pastille « Nous transformons vos vues en ventes », juste en
 * dessous, se replie dès qu'on descend : c'est une accroche, elle a
 * fait son travail une fois lue.
 *
 * Une offre commerciale, non. Le visiteur qui hésite sur la page des
 * tarifs est précisément celui à qui elle s'adresse, et il y arrive
 * après avoir descendu plusieurs écrans. Un liseré qui s'escamote au
 * premier scroll ne serait vu que par ceux qui n'ont pas encore
 * regardé les prix.
 *
 * C'est aussi pour cela qu'il est FIN. Une bande épaisse et permanente
 * mange la hauteur utile sur téléphone, où l'en-tête recouvre déjà le
 * haut du contenu.
 *
 * ============================================================
 *  L'ASTÉRISQUE N'EST PAS DÉCORATIF
 * ============================================================
 *
 * « offert » est une promesse ferme. Sans la mention des conditions
 * juste à côté, elle engage l'agence sur la seule foi du liseré.
 *
 * ATTENTION : il n'existe pas encore de page décrivant ces conditions.
 * La mention renvoie donc à un contenu qui reste à écrire — tant qu'il
 * n'existe pas, c'est aux commerciaux de les énoncer à l'oral, et la
 * mention ne protège que partiellement.
 */

const PROMO = {
  /** Passe à false pour retirer entièrement le liseré. */
  enabled: true,
  /** La première offre, la plus forte. */
  offreForte: "Votre site internet offert",
  /** La seconde, pour ceux qui n'ont pas besoin d'un site. */
  offreAlternative: "−30 % sur nos services",
  /** À qui les deux s'adressent. */
  cible: "pour les nouveaux clients",
  /** Mention légale courte, affichée en plus petit. */
  conditions: "voir conditions",
} as const;

export function PromoBar() {
  if (!PROMO.enabled) return null;

  return (
    <div
      /*
        `relative` et un z-index bas : le liseré vit DANS l'en-tête fixe,
        il ne se superpose pas à lui. C'est ce qui lui évite de rester
        seul en haut de page quand le menu mobile s'ouvre par-dessus.
      */
      className="relative w-full border-b border-[#1c2946]"
      style={{
        /*
          Un fond bleu très sombre plutôt que l'accent plein. Le bleu
          vif du site sert aux boutons : le réutiliser ici mettrait le
          liseré au même niveau d'appel qu'un bouton d'action, alors
          qu'il informe, il ne se clique pas.
        */
        background: "linear-gradient(90deg, #0B1020 0%, #101a33 50%, #0B1020 100%)",
      }}
    >
      <p className="shell flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 py-[7px] text-center text-[0.66rem] leading-tight tracking-[0.08em] text-[#C7D9FF] sm:text-[0.7rem]">
        <span className="font-medium text-foreground">
          {PROMO.offreForte}
          {/*
            L'astérisque est collé au mot, sans espace : séparé, il se
            lit comme une puce de liste et non comme un renvoi.
          */}
          <span aria-hidden="true">*</span>
        </span>

        <span className="text-[#707d9d]">ou</span>

        <span className="font-medium text-foreground">{PROMO.offreAlternative}</span>

        <span>{PROMO.cible}</span>

        <span className="text-[0.9em] text-[#707d9d]">
          <span aria-hidden="true">*</span>
          {PROMO.conditions}
        </span>
      </p>
    </div>
  );
}
