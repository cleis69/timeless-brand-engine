import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import {
  CONTACT,
  hasPhone,
  hasWhatsapp,
  phoneDisplay,
  telUrl,
  whatsappUrl,
} from "@/config/contact";
import { EASE_RESPOND, MOTION } from "@/config/motion";

/**
 * ULTRA VISION — page Contact.
 *
 * ============================================================
 *  CE FICHIER REMPLACE src/routes/contact.tsx
 * ============================================================
 *
 * LES COORDONNEES FAUSSES QUI ETAIENT EN LIGNE
 *
 *   wa.me/33600000000        -> numero inexistant
 *   tel:+33600000000         -> numero inexistant
 *   studio@ultravision.fr    -> adresse inexistante
 *   « Paris — Dubai — Casablanca » -> deux villes sur trois inventees
 *
 * Un visiteur qui clique sur un numero mort ne recommence pas. C'est
 * la seule page du site ou une erreur coute une affaire immediatement.
 *
 * Tout vient desormais de src/config/contact.ts, comme sur le reste du
 * site : une seule source, aucune divergence possible entre les pages.
 * Les gardes `hasPhone` et `hasWhatsapp` masquent purement et
 * simplement un moyen de contact non renseigne, plutot que d'afficher
 * un lien mort.
 *
 * LES TRANCHES DE BUDGET ONT ETE REFAITES
 *
 * Elles allaient de « moins de 20 000 € » a « plus de 100 000 € ».
 * Avec une grille qui demarre a 490 €, un prospect ne se reconnaissait
 * dans aucune case et refermait la page. Les tranches suivent
 * maintenant les formules reelles.
 *
 * L'ENVOI DU FORMULAIRE
 *
 * Il n'est toujours pas relie a un service d'envoi : le message
 * s'affiche mais rien ne part. C'est signale ci-dessous, et c'est la
 * seule chose qui reste a brancher sur cette page.
 */

const URL = "https://timeless-brand-engine.lovable.app";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Parlons de votre projet | ULTRA VISION" },
      {
        name: "description",
        content:
          "Écrivez-nous sur WhatsApp, par email ou via le formulaire. Réponse sous 24 heures ouvrées.",
      },
      { property: "og:title", content: "Contact — ULTRA VISION" },
      {
        property: "og:description",
        content: "WhatsApp, email ou formulaire : réponse sous 24 heures ouvrées.",
      },
      { property: "og:url", content: `${URL}/contact` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${URL}/contact` }],
  }),
});

/*
  Tranches alignees sur la grille tarifaire reelle.
  La premiere doit toujours correspondre a l'essai : c'est elle qui dit
  au petit budget qu'il a le droit d'etre la.
*/
const BUDGETS = [
  "Un essai — 490 €",
  "500 à 1 500 € / mois",
  "1 500 à 3 000 € / mois",
  "Plus de 3 000 € / mois",
  "Je ne sais pas encore",
];

const NEEDS = [
  "Vidéos publicitaires",
  "Diffusion & media buying",
  "Site ou landing page",
  "Identité de marque",
  "Photo",
  "CRM & automatisation",
];

function Contact() {
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [needs, setNeeds] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (n: string) =>
    setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]));

  /** Style commun aux pastilles de choix. */
  const chip = (on: boolean) => ({
    borderColor: on ? "#3B82F6" : "#262626",
    backgroundColor: on ? "rgba(59,130,246,.12)" : "transparent",
    color: on ? "#93C5FD" : "#8a8a8a",
    transition: `all ${MOTION.respond}ms ${EASE_RESPOND}`,
  });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Dites-nous ce que vous voulez vendre."
        accent="ce que vous voulez vendre"
        intro="Quelques lignes suffisent. Nous revenons vers vous sous 24 heures ouvrées avec un créneau et un premier angle de travail."
      />

      <section className="rule bg-background">
        <div className="shell grid gap-12 py-14 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:py-20">
          {/* ---------------- Le formulaire ---------------- */}
          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="rounded-3xl p-7 sm:p-9"
              style={{ backgroundColor: "#0B1020", border: "1px solid #16203a" }}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Nom et prénom" name="name" />
                <Field label="Entreprise" name="company" />
                <Field label="Email professionnel" name="email" type="email" />
                <Field label="Téléphone" name="phone" type="tel" required={false} />
              </div>

              <fieldset className="mt-9">
                <legend className="eyebrow" style={{ color: "#60A5FA" }}>
                  Ce dont vous avez besoin
                </legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {NEEDS.map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => toggle(n)}
                      aria-pressed={needs.includes(n)}
                      className="rounded-full border px-4 py-2 text-xs"
                      style={chip(needs.includes(n))}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-9">
                <legend className="eyebrow" style={{ color: "#60A5FA" }}>
                  Budget envisagé
                </legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {BUDGETS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      aria-pressed={budget === b}
                      className="rounded-full border px-4 py-2 text-xs"
                      style={chip(budget === b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-[0.74rem] text-[#5c5c5a]">
                  Hors budget publicitaire versé aux plateformes.
                </p>
              </fieldset>

              <div className="mt-9">
                <label htmlFor="message" className="eyebrow" style={{ color: "#60A5FA" }}>
                  Votre projet
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-4 w-full resize-none rounded-xl px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: "#070A14",
                    border: "1px solid #16203a",
                    transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#3B82F6")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#16203a")}
                  placeholder="Ce que vous vendez, à qui, et ce qui bloque aujourd'hui."
                />
              </div>

              <button
                type="submit"
                className="mt-9 inline-flex h-12 items-center rounded-full px-7 text-xs font-medium tracking-[0.14em] uppercase"
                style={{
                  backgroundColor: "#2563EB",
                  color: "#fff",
                  transition: `background-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                }}
              >
                Envoyer la demande
              </button>

              {sent && (
                <div
                  className="mt-6 rounded-xl p-4"
                  style={{
                    backgroundColor: "rgba(59,130,246,.1)",
                    border: "1px solid rgba(96,165,250,.3)",
                  }}
                >
                  <p className="text-sm text-[#93C5FD]">
                    Merci, votre demande est notée. Nous revenons vers vous sous 24 heures
                    ouvrées.
                  </p>
                  {/*
                    A RETIRER UNE FOIS L'ENVOI BRANCHE.
                    Tant que le formulaire n'est relie a aucun service, ce
                    message serait un mensonge s'il restait seul : le
                    visiteur croirait sa demande partie. On lui donne donc
                    une voie qui fonctionne vraiment.
                  */}
                  <p className="mt-2 text-[0.78rem] text-[#8792ad]">
                    Pour une réponse immédiate, écrivez-nous directement sur WhatsApp ou à{" "}
                    {CONTACT.email}.
                  </p>
                </div>
              )}
            </form>
          </Reveal>

          {/* ---------------- Les voies directes ---------------- */}
          <Reveal delay={100}>
            <div className="space-y-9">
              <div>
                <p className="eyebrow" style={{ color: "#60A5FA" }}>
                  Voie rapide
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  {hasWhatsapp && (
                    <a
                      href={whatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-7 text-xs font-medium tracking-[0.14em] uppercase"
                      style={{
                        border: "1px solid #16203a",
                        backgroundColor: "#0B1020",
                        transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                      }}
                    >
                      <img
                        src="/brand/platforms/whatsapp.svg"
                        alt=""
                        aria-hidden="true"
                        style={{ height: 16, width: "auto" }}
                      />
                      Écrire sur WhatsApp
                    </a>
                  )}

                  {hasPhone && (
                    <a
                      href={telUrl}
                      className="inline-flex h-12 items-center justify-center rounded-full px-7 text-xs font-medium tracking-[0.14em] uppercase"
                      style={{
                        border: "1px solid #16203a",
                        backgroundColor: "#0B1020",
                        transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}`,
                      }}
                    >
                      {phoneDisplay()}
                    </a>
                  )}
                </div>
              </div>

              <div className="border-t border-hairline pt-8">
                <p className="eyebrow" style={{ color: "#60A5FA" }}>
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="link-underline mt-4 inline-block text-sm"
                >
                  {CONTACT.email}
                </a>
              </div>

              <div className="border-t border-hairline pt-8">
                <p className="eyebrow" style={{ color: "#60A5FA" }}>
                  Où nous sommes
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {CONTACT.locations}
                  <br />
                  Nous travaillons principalement pour des entreprises françaises.
                </p>
              </div>

              <div className="border-t border-hairline pt-8">
                <p className="eyebrow" style={{ color: "#60A5FA" }}>
                  Délai de réponse
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  24 heures ouvrées. Sur WhatsApp, généralement dans la journée.
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
      <label htmlFor={name} className="eyebrow" style={{ color: "#60A5FA" }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-3 h-11 w-full rounded-xl px-4 text-sm outline-none"
        style={{
          backgroundColor: "#070A14",
          border: "1px solid #16203a",
          transition: `border-color ${MOTION.respond}ms ${EASE_RESPOND}`,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#3B82F6")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#16203a")}
      />
    </div>
  );
}
