import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { CONTACT, hasPhone, hasWhatsapp, phoneDisplay, telUrl, whatsappUrl } from "@/config/contact";

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
      <div className="shell relative py-28 lg:py-40">
        <Reveal>
          <p className="eyebrow">Prochaine étape</p>
          <h2 className="display mt-8 max-w-4xl text-4xl sm:text-6xl lg:text-7xl">
            Parlons de votre croissance sur les douze prochains mois.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            30 minutes, sans engagement. Vous repartez avec une lecture claire de votre
            positionnement, de votre tunnel d&apos;acquisition et des leviers prioritaires.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center rounded-full bg-foreground px-7 text-xs font-medium tracking-[0.14em] uppercase text-background transition-colors duration-300 hover:bg-accent-hover"
            >
              Réserver un appel stratégique
            </Link>

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
    </section>
  );
}
