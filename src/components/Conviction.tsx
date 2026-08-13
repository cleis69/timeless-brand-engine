import { MaskReveal, Reveal } from "./Reveal";
import { Seam, Texture } from "./Texture";

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
    <>
      {/* Jointure haute : le noir se dissout dans le clair sur 120 px
          au lieu de s'arreter net. C'est ce qui supprime l'effet de bloc. */}
      <Seam from="#070708" to="#F5F5F3" height={120} />

      <section
        aria-labelledby="conviction-title"
        className="relative text-[#090909]"
        style={{
          // Le clair non plus n'est pas un aplat : il se creuse legerement
          // vers le bas pour amorcer le retour au sombre.
          background: "linear-gradient(to bottom, #F5F5F3 0%, #EFEFEC 62%, #E7E7E3 100%)",
        }}
      >
        <Texture tone="light" size={76} opacity={0.05} from="18% 8%" />

        <div className="shell relative py-24 sm:py-28 lg:py-32">
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

        {/*
          Trois colonnes au lieu de deux.

          Avec deux blocs de texte, le tiers droit de la section restait
          vide et la page paraissait inachevee. La troisieme colonne porte
          le chiffre qui resume l'agence : elle remplit l'espace et ajoute
          un argument au lieu d'un remplissage.
        */}
        <div className="mt-14 grid gap-10 border-t border-[#D6D6D2] pt-12 sm:mt-16 sm:gap-12 lg:grid-cols-3 lg:gap-14">
          {PILIERS.map((p, i) => (
            <Reveal key={p.title} delay={320 + i * 90}>
              <h3 className="text-base font-medium">{p.title}</h3>
              <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-[#5A5A57]">
                {p.text}
              </p>
            </Reveal>
          ))}

          <Reveal delay={500}>
            <div className="flex h-full flex-col justify-between rounded-2xl bg-[#090909] p-7 text-[#F5F5F3]">
              <p className="text-[0.62rem] font-medium tracking-[0.16em] uppercase text-[#8A8A8A]">
                Une seule équipe
              </p>
              <div className="mt-8">
                <span className="display block text-[3.2rem] leading-none tracking-[-0.04em]">
                  10
                </span>
                <span className="mt-2 block text-[0.8rem] leading-relaxed text-[#A8A8A6]">
                  métiers réunis, du branding à l&apos;acquisition, sans jamais passer
                  par un prestataire externe.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
        </div>
      </section>

      {/* Jointure basse : retour au sombre, sans coupure. */}
      <Seam from="#E7E7E3" to="#090909" height={120} />
    </>
  );
}
