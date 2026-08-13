import { MaskReveal, Reveal } from "./Reveal";
import { Texture } from "./Texture";

/**
 * ULTRA VISION — la respiration claire.
 *
 * CE QUI A CHANGE, ET POURQUOI
 *
 * Version precedente : une bande claire sur toute la largeur, encadree
 * de deux jointures degradees. Deux defauts.
 *
 * D'abord les degrades. Un fond qui passe progressivement du blanc casse
 * au gris se lit comme une impression ratee, pas comme une intention.
 * Les degrades fonctionnent sur une lueur ou une ombre, jamais sur un
 * fond de section : la surface parait sale.
 *
 * Ensuite la pleine largeur. Elle produisait exactement le « gros bloc »
 * qu'on cherchait a eviter — un pave clair colle a un pave sombre.
 *
 * LA NOUVELLE APPROCHE
 *
 * Le clair devient un PANNEAU pose sur la page sombre, avec du noir tout
 * autour. Trois avantages :
 *
 *   - Aucune frontiere franche. Le sombre continue de part et d'autre,
 *     donc rien ne coupe la page en deux.
 *   - Aucun degrade. Le panneau est en aplat unique, net.
 *   - Le contraste reste entier, mais il est cadre. C'est un objet dans
 *     la page, plus une interruption de la page.
 *
 * C'est la difference entre peindre un mur en blanc et y accrocher un
 * tableau.
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
    <section aria-labelledby="conviction-title" className="relative bg-background py-16 sm:py-20">
      <div className="shell">
        {/* Le panneau clair, en aplat unique. */}
        <div className="relative overflow-hidden rounded-[28px] bg-[#F2F2EF] px-7 py-16 text-[#090909] sm:px-12 sm:py-20 lg:px-16 lg:py-24">
          <Texture tone="light" size={72} opacity={0.05} from="14% 6%" />

          <div className="relative">
            <Reveal>
              <p className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[#6B6B6B]">
                Notre conviction
              </p>
            </Reveal>

            <h2
              id="conviction-title"
              className="display mt-9 max-w-4xl text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-[-0.035em]"
            >
              <MaskReveal delay={80}>Une marque ne se juge pas</MaskReveal>
              <MaskReveal delay={160}>à sa beauté. Elle se juge</MaskReveal>
              <MaskReveal delay={240}>à ce qu&apos;elle déclenche.</MaskReveal>
            </h2>

            <div className="mt-14 grid gap-10 border-t border-[#D6D6D2] pt-12 sm:gap-12 lg:grid-cols-3 lg:gap-14">
              {PILIERS.map((p, i) => (
                <Reveal key={p.title} delay={320 + i * 90}>
                  <h3 className="text-base font-medium">{p.title}</h3>
                  <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-[#5A5A57]">
                    {p.text}
                  </p>
                </Reveal>
              ))}

              {/*
                Le bloc sombre au sein du panneau clair.
                Il remplit le tiers droit qui restait vide, et son
                inversion de valeurs rappelle la page tout autour :
                le panneau ne parait pas plaque, il dialogue.
              */}
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
        </div>
      </div>
    </section>
  );
}
