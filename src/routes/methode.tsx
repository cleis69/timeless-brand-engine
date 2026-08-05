import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";

const URL = "https://timeless-brand-engine.lovable.app";

export const Route = createFileRoute("/methode")({
  component: Methode,
  head: () => ({
    meta: [
      { title: "Notre méthode — Diagnostic, stratégie, exécution | ULTRA VISION" },
      {
        name: "description",
        content:
          "Quatre étapes, des livrables datés et un pilotage par la donnée commerciale : la méthode de travail d'ULTRA VISION.",
      },
      { property: "og:title", content: "Notre méthode — ULTRA VISION" },
      {
        property: "og:description",
        content: "Diagnostic, stratégie, design & build, croissance. Une méthode sans zone grise.",
      },
      { property: "og:url", content: `${URL}/methode` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${URL}/methode` }],
  }),
});

const STEPS = [
  {
    n: "01",
    title: "Diagnostic",
    duration: "Semaines 1 à 2",
    text: "Audit de la marque, du tunnel, du CRM et des données média. Entretiens avec la direction et les commerciaux.",
    deliverables: ["Audit écrit", "Cartographie du tunnel", "Priorisation des leviers"],
  },
  {
    n: "02",
    title: "Stratégie",
    duration: "Semaines 2 à 4",
    text: "Positionnement, message, architecture d'offre et plan d'acquisition chiffré avec objectifs par canal.",
    deliverables: ["Plateforme de marque", "Plan média chiffré", "Feuille de route 12 mois"],
  },
  {
    n: "03",
    title: "Design & Build",
    duration: "Semaines 4 à 10",
    text: "Identité, site, applications, automatisations et contenus produits en cycles courts avec validations hebdomadaires.",
    deliverables: ["Identité complète", "Site ou application", "Contenus et automatisations"],
  },
  {
    n: "04",
    title: "Croissance",
    duration: "En continu",
    text: "Campagnes, tests créatifs, optimisation du taux de conversion et revue mensuelle avec la direction.",
    deliverables: ["Tableau de bord unique", "Revue mensuelle", "Itérations créatives"],
  },
];

const PRINCIPLES = [
  {
    t: "Un seul interlocuteur",
    d: "Un directeur de projet senior porte votre dossier de bout en bout.",
  },
  { t: "Livrables datés", d: "Chaque semaine, quelque chose se voit. Aucun effet tunnel." },
  { t: "Décisions documentées", d: "Les arbitrages sont écrits, justifiés et consultables." },
  { t: "Transfert de compétences", d: "Vos équipes savent opérer ce que nous construisons." },
];

function Methode() {
  return (
    <>
      <PageHero
        eyebrow="Notre méthode"
        title="Une méthode d'ingénieur appliquée à un métier créatif."
        intro="Nous travaillons avec des étapes claires, des livrables datés et des indicateurs partagés. Vous savez à tout moment où en est le projet et ce qu'il produit."
      />

      <section className="rule bg-background">
        <div className="shell py-20 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-2">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 70}>
                <article className="surface-card h-full p-8 lg:p-10">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs tracking-[0.2em] text-accent">{s.n}</span>
                    <span className="text-xs text-muted-foreground">{s.duration}</span>
                  </div>
                  <h2 className="display mt-6 text-3xl sm:text-4xl">{s.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  <ul className="mt-8 space-y-3 text-sm">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-3 border-t border-hairline pt-3">
                        <span className="text-accent">—</span>
                        <span className="text-muted-foreground">{d}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="rule bg-surface">
        <div className="shell grid gap-14 py-24 lg:grid-cols-[1fr_1.2fr] lg:py-32">
          <Reveal>
            <div>
              <p className="eyebrow">Principes</p>
              <h2 className="display mt-6 text-4xl sm:text-5xl">
                Ce sur quoi nous ne transigeons jamais.
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.t} delay={i * 70}>
                <div className="border-t border-hairline pt-6">
                  <h3 className="text-base font-medium">{p.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
