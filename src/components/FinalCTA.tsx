import { MaskReveal, Reveal } from "./Reveal";
import { BookingCalendar } from "./BookingCalendar";
import {
  CONTACT,
  hasPhone,
  hasWhatsapp,
  phoneDisplay,
  telUrl,
  whatsappUrl,
} from "@/config/contact";

/**
 * ULTRA VISION — bloc de conversion final.
 *
 * ============================================================
 *  CE FICHIER REMPLACE src/components/FinalCTA.tsx
 * ============================================================
 *
 * CE QUI CHANGE
 *
 * Les liens WhatsApp et telephone pointaient vers +33 6 00 00 00 00,
 * un numero inexistant. Un visiteur qui cliquait tombait dans le
 * vide, et tu ne pouvais pas le savoir.
 *
 * Desormais les coordonnees viennent de src/config/contact.ts, et
 * les boutons ne s'affichent que si un vrai numero y est renseigne.
 * Tant que le champ est vide, le bouton disparait proprement.
 *
 * L'adresse e-mail remplace le bouton WhatsApp tant que celui-ci
 * n'est pas configure : le visiteur garde toujours un second moyen
 * de contact a cote du bouton principal.
 *
 * 22 SEPTEMBRE 2026 : LE CALENDRIER EST DANS LE BLOC
 *
 * Le bouton « Reserver un appel strategique » menait a la page contact,
 * ou il fallait encore ecrire un message et attendre une reponse. Le
 * calendrier est desormais ici, a droite du titre : le visiteur arrive
 * au moment de decider et reserve sans changer de page. WhatsApp et le
 * telephone restent a gauche pour ceux qui preferent parler tout de
 * suite.
 */

export function FinalCTA() {
  return (
    /*
      Le troisieme temps de respiration de la page.

      Hero noir, videos noires, cassure claire, puis retour au noir pour
      les expertises et la methode. Si le CTA final restait noir lui
      aussi, la page se terminerait exactement comme elle a commence, et
      rien ne signalerait au visiteur qu'il est arrive au moment de
      decider.

      Un bleu profond monte du bas. Ce n'est pas un aplat bleu — le
      brief est clair, le bleu reste un accent — mais une lueur qui
      teinte le noir. Assez pour que la section se detache, pas assez
      pour crier.
    */
    <section
      className="rule relative overflow-hidden"
      style={{
        background:
          "radial-gradient(125% 130% at 50% 135%, #1D4ED8 0%, #101c3d 42%, #0a0d18 68%, #090909 100%)",
      }}
    >
      {/*
        L'iris revient en fond, en bas de page.

        Il ouvre le site dans le hero et le referme ici : la page boucle
        sur la marque. C'est le meme fichier SVG, deja en cache, donc il
        ne coute rien de plus a charger.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -bottom-40 hidden w-[520px] select-none opacity-[0.18] md:block"
      >
        <style>{`
          @keyframes uv-cta-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .uv-cta-iris { animation: uv-cta-spin 150s linear infinite; }
          @media (prefers-reduced-motion: reduce) { .uv-cta-iris { animation: none; } }
        `}</style>
        <img
          src="/brand/icon/ultravision-icon-blue.svg"
          alt=""
          width={512}
          height={512}
          className="uv-cta-iris h-auto w-full"
          draggable={false}
        />
      </div>

      <div className="shell relative grid gap-12 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-center lg:gap-16 lg:py-32">
        <div>
          <Reveal>
            <p className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-accent">
              Prochaine étape
            </p>
          </Reveal>

          <h2 className="display mt-8 max-w-3xl text-4xl sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
            <MaskReveal delay={80}>Parlons de votre croissance</MaskReveal>
            <MaskReveal delay={170}>sur les douze prochains mois.</MaskReveal>
          </h2>

          <Reveal delay={280}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              30 minutes, sans engagement. Choisissez votre créneau : vous repartez avec une lecture
              claire de votre positionnement, de votre tunnel d&apos;acquisition et des leviers
              prioritaires.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              {hasWhatsapp ? (
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center rounded-full border border-hairline px-7 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent-hover"
                >
                  WhatsApp
                </a>
              ) : (
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex h-12 items-center rounded-full border border-hairline px-7 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent-hover"
                >
                  Nous écrire
                </a>
              )}

              {hasPhone && (
                <a
                  href={telUrl}
                  className="inline-flex h-12 items-center px-2 text-xs font-medium tracking-[0.14em] uppercase text-muted-foreground transition-colors hover:text-foreground"
                >
                  {phoneDisplay()}
                </a>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div id="rendez-vous" className="scroll-mt-32">
            <BookingCalendar />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
