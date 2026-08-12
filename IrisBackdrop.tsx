/**
 * ULTRA VISION — decor du hero.
 *
 * L'IDEE
 *
 * Le hero affichait le logo en grand, alors que la navigation le montre
 * deja juste au-dessus. Deux fois la meme chose en trois cents pixels :
 * c'est le signe d'une page qui n'a rien a montrer.
 *
 * A la place, on prend le symbole de la marque, on l'agrandit jusqu'a
 * ce qu'il deborde du cadre, et on le laisse tourner tres lentement.
 * Il n'est plus un logo pose sur la page, il devient l'espace dans
 * lequel la page existe. C'est le meme fichier SVG, il ne coute rien de
 * plus a charger.
 *
 * TROIS PRECAUTIONS
 *
 * 1. Le voile degrade a gauche garantit que le titre reste lisible quoi
 *    qu'il arrive. Sans lui, les aiguilles passeraient derriere le texte.
 * 2. La rotation dure deux minutes par tour. A cette vitesse on ne la
 *    voit pas bouger, on la sent. Une rotation visible ferait gadget.
 * 3. Elle s'arrete si l'utilisateur a demande moins d'animations.
 *
 * On n'anime que `transform`, la seule propriete que la carte graphique
 * traite sans recalculer la mise en page.
 */

export function IrisBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[78%] select-none md:block"
    >
      <style>{`
        @keyframes uv-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .uv-iris { animation: uv-spin 120s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .uv-iris { animation: none; } }
      `}</style>

      <img
        src="/brand/icon/ultravision-icon-blue.svg"
        alt=""
        className="uv-iris absolute top-1/2 right-[-22%] w-[min(96vh,860px)] -translate-y-1/2 opacity-[0.55]"
        draggable={false}
      />

      {/* Voile : le texte passe toujours devant. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #090909 22%, rgba(9,9,9,0.72) 52%, rgba(9,9,9,0) 88%)",
        }}
      />
    </div>
  );
}
