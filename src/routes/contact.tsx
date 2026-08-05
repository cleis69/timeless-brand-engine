import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

const URL = "https://timeless-brand-engine.lovable.app";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Réserver un appel stratégique | ULTRA VISION" },
      {
        name: "description",
        content:
          "Réservez un appel stratégique de 30 minutes, écrivez-nous sur WhatsApp ou demandez un devis. Réponse sous 24 heures ouvrées.",
      },
      { property: "og:title", content: "Contact — ULTRA VISION" },
      {
        property: "og:description",
        content: "Appel stratégique, WhatsApp ou devis : parlons de votre croissance.",
      },
      { property: "og:url", content: `${URL}/contact` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${URL}/contact` }],
  }),
});

const BUDGETS = ["< 20 000 €", "20 – 50 000 €", "50 – 100 000 €", "> 100 000 €"];
const NEEDS = [
  "Branding",
  "Site web",
  "Application",
  "IA & automatisation",
  "Acquisition",
  "Photo & vidéo",
];

function Contact() {
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [needs, setNeeds] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (n: string) =>
    setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]));

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Réservez un appel stratégique de 30 minutes."
        intro="Décrivez votre situation en quelques lignes. Nous revenons vers vous sous 24 heures ouvrées avec un créneau et un premier angle de travail."
      />

      <section className="rule bg-background">
        <div className="shell grid gap-16 py-16 lg:grid-cols-[1.3fr_1fr] lg:py-24">
          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="surface-card p-8 lg:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Nom et prénom" name="name" />
                <Field label="Entreprise" name="company" />
                <Field label="Email professionnel" name="email" type="email" />
                <Field label="Téléphone" name="phone" type="tel" required={false} />
              </div>

              <fieldset className="mt-10">
                <legend className="eyebrow">Vos besoins</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {NEEDS.map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => toggle(n)}
                      className={`rounded-full border px-4 py-2 text-xs transition-colors duration-300 ${
                        needs.includes(n)
                          ? "border-accent text-accent-hover"
                          : "border-hairline text-muted-foreground hover:border-foreground"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-10">
                <legend className="eyebrow">Budget envisagé</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {BUDGETS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`rounded-full border px-4 py-2 text-xs transition-colors duration-300 ${
                        budget === b
                          ? "border-accent text-accent-hover"
                          : "border-hairline text-muted-foreground hover:border-foreground"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-10">
                <label htmlFor="message" className="eyebrow">
                  Votre projet
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-4 w-full resize-none rounded-lg border border-hairline bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  placeholder="Contexte, objectifs, échéance…"
                />
              </div>

              <button
                type="submit"
                className="mt-10 inline-flex h-12 items-center rounded-full bg-foreground px-7 text-xs font-medium tracking-[0.14em] uppercase text-background transition-colors duration-300 hover:bg-accent-hover"
              >
                Envoyer la demande
              </button>

              {sent && (
                <p className="mt-6 text-sm text-accent-hover">
                  Merci, votre demande est bien notée. Nous revenons vers vous sous 24 heures
                  ouvrées.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-10">
              <div>
                <p className="eyebrow">Voie rapide</p>
                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href="https://wa.me/33600000000"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-hairline px-7 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent-hover"
                  >
                    Écrire sur WhatsApp
                  </a>
                  <a
                    href="tel:+33600000000"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-hairline px-7 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent-hover"
                  >
                    +33 6 00 00 00 00
                  </a>
                </div>
              </div>

              <div className="border-t border-hairline pt-8">
                <p className="eyebrow">Email</p>
                <a href="mailto:studio@ultravision.fr" className="link-underline mt-4 inline-block">
                  studio@ultravision.fr
                </a>
              </div>

              <div className="border-t border-hairline pt-8">
                <p className="eyebrow">Bureaux</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Paris — Dubaï — Casablanca
                  <br />
                  Interventions en France et à l&apos;international.
                </p>
              </div>

              <div className="border-t border-hairline pt-8">
                <p className="eyebrow">Disponibilité</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Nous ouvrons deux nouveaux accompagnements par mois afin de préserver le niveau
                  d&apos;exécution.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-4 h-11 w-full rounded-lg border border-hairline bg-background px-4 text-sm outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
