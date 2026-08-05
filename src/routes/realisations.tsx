import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { Counter } from "@/components/Counter";

const URL = "https://timeless-brand-engine.lovable.app";

export const Route = createFileRoute("/realisations")({
  component: Realisations,
  head: () => ({
    meta: [
      { title: "Réalisations — Études de cas | ULTRA VISION" },
      {
        name: "description",
        content:
          "Immobilier, SaaS, architecture, finance : des projets de marque, de site et d'acquisition avec des résultats commerciaux mesurés.",
      },
      { property: "og:title", content: "Réalisations — ULTRA VISION" },
      {
        property: "og:description",
        content: "Études de cas et résultats mesurés de nos accompagnements.",
      },
      { property: "og:url", content: `${URL}/realisations` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${URL}/realisations` }],
  }),
});

const CASES = [
  {
    client: "Nordhaus",
    sector: "Immobilier premium — Paris",
    scope: ["Plateforme de marque", "Site & CRM", "Photo & vidéo"],
    summary:
      "Repositionnement complet d'un promoteur haut de gamme et refonte du parcours de prise de rendez-vous.",
    metrics: [
      { v: "+214 %", l: "Pipeline qualifié" },
      { v: "−38 %", l: "Coût par lead" },
      { v: "9 sem.", l: "Délai de livraison" },
    ],
  },
  {
    client: "Meridian",
    sector: "SaaS B2B — Lyon",
    scope: ["Landing pages", "Google & Meta Ads", "CRO"],
    summary:
      "Refonte du tunnel de démonstration et industrialisation des campagnes payantes multi-marchés.",
    metrics: [
      { v: "÷2,8", l: "Coût par démo" },
      { v: "+62 %", l: "Taux de conversion" },
      { v: "4 pays", l: "Déploiement" },
    ],
  },
  {
    client: "Atelier Vaste",
    sector: "Architecture — Bordeaux",
    scope: ["Identité", "Direction artistique", "Production"],
    summary:
      "Identité éditoriale et bibliothèque visuelle permettant de porter des honoraires supérieurs au marché.",
    metrics: [
      { v: "11", l: "Projets signés en 6 mois" },
      { v: "+27 %", l: "Honoraires moyens" },
      { v: "180", l: "Assets produits" },
    ],
  },
  {
    client: "Kairos Capital",
    sector: "Finance — Genève",
    scope: ["Agents IA", "Automatisation", "CRM"],
    summary:
      "Qualification automatisée des demandes entrantes et unification du reporting commercial.",
    metrics: [
      { v: "38 %", l: "Temps commercial libéré" },
      { v: "< 2 min", l: "Temps de réponse" },
      { v: "1 trim.", l: "Retour sur investissement" },
    ],
  },
];

function Realisations() {
  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title="Des projets jugés sur leurs résultats commerciaux."
        intro="Nous sélectionnons peu de clients par an afin de garantir un niveau d'exécution constant. Voici quelques accompagnements représentatifs."
      />

      <section className="rule bg-background">
        <div className="shell py-16 lg:py-24">
          <div className="grid gap-6">
            {CASES.map((c, i) => (
              <Reveal key={c.client} delay={i * 60}>
                <article className="surface-card grid gap-10 p-8 lg:grid-cols-[1fr_1fr] lg:p-12">
                  <div className="min-w-0">
                    <p className="eyebrow">{c.sector}</p>
                    <h2 className="display mt-5 text-4xl sm:text-5xl">{c.client}</h2>
                    <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {c.summary}
                    </p>
                    <ul className="mt-8 flex flex-wrap gap-2">
                      {c.scope.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-hairline px-3 py-1 text-xs text-muted-foreground"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid gap-8 sm:grid-cols-3 lg:content-center">
                    {c.metrics.map((m) => (
                      <div key={m.l} className="border-t border-hairline pt-5">
                        <p className="display text-3xl">{m.v}</p>
                        <p className="mt-2 text-xs text-muted-foreground">{m.l}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="rule bg-surface">
        <div className="shell grid gap-12 py-20 sm:grid-cols-3 lg:py-24">
          <Reveal>
            <div>
              <p className="display text-5xl">
                <Counter to={47} />
              </p>
              <p className="mt-3 text-sm text-muted-foreground">Marques accompagnées</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <p className="display text-5xl">
                <Counter to={12} suffix=" M€" />
              </p>
              <p className="mt-3 text-sm text-muted-foreground">Chiffre d&apos;affaires généré</p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div>
              <p className="display text-5xl">
                <Counter to={93} suffix=" %" />
              </p>
              <p className="mt-3 text-sm text-muted-foreground">Clients reconduits</p>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
