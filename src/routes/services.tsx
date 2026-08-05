import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";

const URL = "https://timeless-brand-engine.lovable.app";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Services — Branding, Web, IA & Acquisition | ULTRA VISION" },
      {
        name: "description",
        content:
          "Branding, sites et applications, agents IA et automatisation, Meta / Google / TikTok Ads, production photo et vidéo. Les cinq pôles d'ULTRA VISION.",
      },
      { property: "og:title", content: "Services — ULTRA VISION" },
      {
        property: "og:description",
        content:
          "Cinq pôles d'expertise : branding, web & applications, IA & automatisation, acquisition, création de contenu.",
      },
      { property: "og:url", content: `${URL}/services` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${URL}/services` }],
  }),
});

const POLES = [
  {
    n: "01",
    title: "Branding",
    intro:
      "Un territoire de marque qui justifie vos prix et rend vos concurrents interchangeables.",
    items: [
      "Plateforme de marque et positionnement",
      "Identité visuelle et logotype",
      "Charte graphique complète",
      "Naming et messages clés",
      "Déclinaisons print et digitales",
    ],
  },
  {
    n: "02",
    title: "Web & Applications",
    intro: "Des produits digitaux rapides, sobres et conçus autour d'un seul objectif : convertir.",
    items: [
      "Sites vitrines et corporate",
      "Applications web sur mesure",
      "Landing pages de campagne",
      "Design system et composants",
      "Performance et accessibilité",
    ],
  },
  {
    n: "03",
    title: "IA & Automatisation",
    intro: "Vos tâches répétitives disparaissent, votre équipe se concentre sur la vente.",
    items: [
      "Agents IA de qualification",
      "Automatisation des workflows",
      "Mise en place et migration CRM",
      "Scoring et relances automatiques",
      "Reporting consolidé",
    ],
  },
  {
    n: "04",
    title: "Acquisition",
    intro: "Un pilotage au rendez-vous qualifié, avec une lecture claire du coût réel.",
    items: [
      "Meta Ads",
      "Google Ads",
      "TikTok Ads",
      "Lead generation B2B et B2C",
      "Tracking, CRO et tableaux de bord",
    ],
  },
  {
    n: "05",
    title: "Création de contenu",
    intro: "Des visuels qui soutiennent le prix que vous demandez.",
    items: [
      "Direction artistique",
      "Production photo",
      "Production vidéo",
      "Motion design",
      "Contenus sociaux récurrents",
    ],
  },
];

const TIERS = [
  {
    name: "Sprint",
    price: "à partir de 20 000 €",
    text: "Identité ou site premium livré en 6 à 8 semaines, périmètre fermé.",
  },
  {
    name: "Programme",
    price: "à partir de 8 000 € / mois",
    text: "Marque, production de contenu et acquisition pilotées sur 6 à 12 mois.",
  },
  {
    name: "Partenariat",
    price: "sur mesure",
    text: "Équipe dédiée intégrée à votre direction, engagement sur les indicateurs.",
  },
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Cinq pôles qui couvrent l'intégralité de votre chaîne de croissance."
        intro="De la plateforme de marque au coût par rendez-vous, tout est construit par la même équipe. Vous gardez un interlocuteur unique et une seule feuille de route."
      />

      <section className="rule bg-background">
        <div className="shell py-20 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-2">
            {POLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <article className="surface-card h-full p-8 lg:p-10">
                  <span className="text-xs tracking-[0.2em] text-accent">{p.n}</span>
                  <h2 className="display mt-6 text-3xl sm:text-4xl">{p.title}</h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {p.intro}
                  </p>
                  <ul className="mt-8 space-y-3 text-sm">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3 border-t border-hairline pt-3">
                        <span className="text-accent">—</span>
                        <span className="text-muted-foreground">{it}</span>
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
        <div className="shell py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">Modalités</p>
            <h2 className="display mt-6 max-w-3xl text-4xl sm:text-5xl">
              Trois formats d&apos;engagement, un seul niveau d&apos;exigence.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {TIERS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="surface-card flex h-full flex-col justify-between p-8">
                  <div>
                    <h3 className="display text-2xl">{t.name}</h3>
                    <p className="mt-2 text-sm text-accent-hover">{t.price}</p>
                    <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                  </div>
                  <Link to="/contact" className="link-underline mt-10 text-sm">
                    Demander un devis
                  </Link>
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
