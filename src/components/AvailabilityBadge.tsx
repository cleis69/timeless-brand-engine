/**
 * ULTRA VISION — pastille de positionnement.
 *
 * « Nous transformons vos vues en ventes. »
 *
 * POURQUOI CETTE PHRASE PLUTOT QU'UNE AUTRE
 *
 * Une pastille du type « disponible pour vos projets » ne dit rien du
 * metier. Celle-ci annonce le resultat, et surtout elle est prouvee
 * trois cents pixels plus bas : la section suivante montre justement
 * des publicites video. La promesse et la preuve se touchent.
 *
 * COMMENT LE FILET LUMINEUX FONCTIONNE
 *
 * Un degrade conique tourne dans un conteneur legerement plus grand que
 * la pastille. Par-dessus, un second bloc opaque laisse depasser un
 * seul pixel sur le pourtour. Ce pixel qui depasse, c'est la lumiere.
 *
 * Ce n'est pas une bordure animee — les bordures ne savent pas porter
 * de degrade tournant — mais deux couches superposees. C'est la seule
 * facon d'obtenir cet effet sans image ni librairie.
 *
 * On n'anime qu'une rotation, donc la carte graphique s'en occupe seule
 * et le processeur reste libre.
 */

export function AvailabilityBadge({
  text = "Nous transformons vos vues en ventes",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={`relative inline-block rounded-full p-px ${className}`}>
      <style>{`
        /*
          Le halo doit etre CARRE, pas etire aux dimensions de la pastille.

          Un degrade conique tourne autour du centre de son conteneur. Dans
          un rectangle large et plat, ses rayons s'ecrasent et l'on voit des
          bandes horizontales au lieu d'un arc de lumiere.

          On le pose donc en carre, centre, plus large que la pastille : la
          rotation redevient circulaire et seul un arc passe derriere le
          bord. La largeur est exprimee en pourcentage de la largeur de la
          pastille, et la hauteur suit via aspect-ratio.
        */
        @keyframes uv-halo {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .uv-halo {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 165%;
          aspect-ratio: 1 / 1;
          transform: translate(-50%, -50%);
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            #1D4ED8 40deg,
            #3B82F6 72deg,
            #60A5FA 96deg,
            transparent 150deg
          );
          animation: uv-halo 4.5s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .uv-halo { animation: none; background: #1D4ED8; opacity: .55; }
        }
      `}</style>

      <span className="absolute inset-0 overflow-hidden rounded-full" aria-hidden="true">
        <span className="uv-halo block" />
      </span>

      <span className="relative flex items-center gap-2.5 rounded-full bg-[#101010] px-5 py-2.5">
        <span
          className="h-[5px] w-[5px] shrink-0 rounded-full bg-accent"
          style={{ boxShadow: "0 0 9px #3B82F6" }}
          aria-hidden="true"
        />
        <span className="text-[0.78rem] leading-none text-foreground">{text}</span>
      </span>
    </div>
  );
}
