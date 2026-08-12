import { MaskReveal, Reveal } from "./Reveal";

/**
 * ULTRA VISION — la cassure claire.
 *
 * POURQUOI CETTE SECTION EXISTE
 *
 * Le site enchainait des sections en #090909 et en #111111. Deux noirs
 * que l'oeil humain ne distingue pas a l'ecran. Resultat : dix mille
 * pixels de tunnel, aucune respiration, et une impression de page qui
 * ne finit jamais.
 *
 * Une seule section en blanc casse suffit a casser ce tunnel. Elle
 * arrive juste apres les videos, au moment ou l'oeil a besoin de
 * souffler, et elle devient le passage dont on se souvient.
 *
 * Une seule. Deux ruptures claires et l'effet disparait : ce n'est plus
 * une rupture, c'est une alternance.
 *
 * LA REGLE D'ECRITURE
 *
 * Tres peu de texte, tres grand. Une affirmation, pas une description.
 * Si la phrase tient sur deux lignes, elle est bonne. Si elle en prend
 * cinq, ce n'est plus une conviction, c'est un paragraphe.
 */

const PILIERS = [
  {
    title: "Image et acquisition, ensemble",
    text: "La marque et la performance sont construites dans le même mouvement, jamais dans deux silos qui se renvoient la responsabilité.",
  },
  {
    title: "Ceux qui vendent exécutent",
    text: "Vous parlez aux personnes qui travailleront réellement sur votre projet. Il n'y a pas de deuxième équipe derrière la première.",
  },
];

export function Conviction() {
  return (
    <section
      aria-labelledby="conviction-title"
      className="relative bg-[#F5F5F3] text-[#090909]"
    >
      <div className="shell py-28 sm:py-36 lg:py-44">
        <Reveal>
          <p className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[#6B6B6B]">
            Notre conviction
          </p>
        </Reveal>

        <h2
          id="conviction-title"
          className="display mt-10 max-w-4xl text-[clamp(2.1rem,5.4vw,4.25rem)] leading-[1.02] tracking-[-0.035em]"
        >
          <MaskReveal delay={80}>Une marque ne se juge pas</MaskReveal>
          <MaskReveal delay={160}>à sa beauté. Elle se juge</MaskReveal>
          <MaskReveal delay={240}>à ce qu&apos;elle déclenche.</MaskReveal>
        </h2>

        <div className="mt-16 grid gap-10 border-t border-[#DCDCD8] pt-12 sm:mt-20 sm:grid-cols-2 sm:gap-16">
          {PILIERS.map((p, i) => (
            <Reveal key={p.title} delay={320 + i * 90}>
              <h3 className="text-base font-medium">{p.title}</h3>
              <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-[#5A5A57]">
                {p.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
