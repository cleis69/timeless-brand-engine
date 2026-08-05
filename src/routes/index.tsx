import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { FinalCTA } from "@/components/FinalCTA";
import { Logo } from "@/components/Logo";
import { useState } from "react";

const URL = "https://timeless-brand-engine.lovable.app";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "ULTRA VISION — Agence créative, IA & acquisition" },
      {
        name: "description",
        content:
          "Agence créative premium : branding, sites web et applications, intelligence artificielle, automatisation et acquisition payante pour entreprises ambitieuses.",
      },
      { property: "og:title", content: "ULTRA VISION — Agence créative, IA & acquisition" },
      {
        property: "og:description",
        content:
          "Branding, développement web, IA et acquisition. Nous construisons des marques et des systèmes de croissance mesurables.",
      },
      { property: "og:url", content: `${URL}/` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "ULTRA VISION",
          description:
            "Agence créative spécialisée en branding, développement web, intelligence artificielle, automatisation et acquisition de leads.",
          url: URL,
          telephone: "+33600000000",
          email: "studio@ultravision.fr",
          areaServed: "FR",
          address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
        }),
      },
    ],
  }),
});

const CLIENTS = [
  "Nordhaus",
  "Meridian",
  "Atelier Vaste",
  "Solene",
  "Kairos Capital",
  "Maison Ferrand",
  "Volta",
  "Orsay Group",
];

const POLES = [
  {
    n: "01",
    title: "Branding",
    lines: ["Identité visuelle", "Positionnement", "Charte graphique"],
    text: "Une marque lisible en trois secondes, cohérente sur chaque point de contact.",
  },
  {
    n: "02",
    title: "Web & Applications",
    lines: ["Sites web", "Applications", "Landing pages"],
    text: "Des interfaces rapides, sobres et pensées pour la conversion.",
  },
  {
    n: "03",
    title: "IA & Automatisation",
    lines: ["Agents IA", "Automatisation", "CRM"],
    text: "Vos processus commerciaux exécutés sans friction, 24 h sur 24.",
  },
  {
    n: "04",
    title: "Acquisition",
    lines: ["Meta Ads", "Google Ads", "TikTok Ads", "Lead generation"],
    text: "Un pilotage au coût par rendez-vous qualifié, pas au clic.",
  },
  {
    n: "05",
    title: "Création de contenu",
    lines: ["Photo", "Vidéo", "Motion design"],
    text: "Des assets de niveau maison de luxe, produits en interne.",
  },
];

const PROJECTS = [
  {
    client: "Nordhaus",
    sector: "Immobilier premium",
    result: "+214 % de pipeline qualifié",
    scope: "Branding · Site · CRM",
  },
  {
    client: "Meridian",
    sector: "SaaS B2B",
    result: "Coût par démo divisé par 2,8",
    scope: "Acquisition · Landing pages",
  },
  {
    client: "Atelier Vaste",
    sector: "Architecture",
    result: "11 projets signés en 6 mois",
    scope: "Identité · Photo · Vidéo",
  },
  {
    client: "Kairos Capital",
    sector: "Finance",
    result: "38 % de temps commercial libéré",
    scope: "Agents IA · Automatisation",
  },
];

const METHOD = [
  {
    n: "01",
    title: "Diagnostic",
    text: "Audit de la marque, du tunnel et des données. Nous identifions le point de friction qui coûte le plus cher.",
  },
  {
    n: "02",
    title: "Stratégie",
    text: "Positionnement, message, offre et plan d'acquisition. Un document de référence, pas une présentation.",
  },
  {
    n: "03",
    title: "Design & Build",
    text: "Identité, site, applications et contenus produits par des seniors, en cycles courts et validés.",
  },
  {
    n: "04",
    title: "Croissance",
    text: "Campagnes, automatisations et itérations mensuelles pilotées par la donnée commerciale.",
  },
];

const WHY = [
  {
    title: "Uniquement des seniors",
    text: "Aucun stagiaire sur votre projet. Les personnes qui vendent sont celles qui exécutent.",
  },
  {
    title: "Design et acquisition réunis",
    text: "La marque et la performance sont construites ensemble, jamais dans deux silos.",
  },
  {
    title: "Engagement sur les indicateurs",
    text: "Nous nous engageons sur des rendez-vous qualifiés, pas sur des impressions.",
  },
  {
    title: "Cadence tenue",
    text: "Livraisons hebdomadaires, un interlocuteur unique, des délais annoncés et respectés.",
  },
];

const STATS: { value: number; suffix: string; label: string; decimals?: number }[] = [
  { value: 214, suffix: " %", label: "Croissance moyenne du pipeline" },
  { value: 47, suffix: "", label: "Marques accompagnées" },
  { value: 12, suffix: " M€", label: "Chiffre d'affaires généré" },
  { value: 4.9, suffix: "/5", label: "Satisfaction client", decimals: 1 },
];

const TESTIMONIALS = [
  {
    quote:
      "En six mois, notre marque est passée d'anonyme à référence sur notre marché. Les rendez-vous entrants ont changé de nature.",
    name: "Claire Aubert",
    role: "Directrice générale, Nordhaus",
  },
  {
    quote:
      "L'équipe comprend le business avant de parler design. Le coût d'acquisition a été divisé par près de trois.",
    name: "Marc Delvaux",
    role: "CMO, Meridian",
  },
  {
    quote:
      "Les automatisations mises en place nous ont rendu deux jours par semaine. Investissement rentabilisé en un trimestre.",
    name: "Sofia Bennani",
    role: "Associée, Kairos Capital",
  },
];

const FAQ = [
  {
    q: "Quel est le budget d'un accompagnement ?",
    a: "Un projet de marque et de site démarre autour de 20 000 €. Les accompagnements complets, incluant acquisition, contenus et automatisation, se situent généralement entre 40 000 € et 100 000 € par an.",
  },
  {
    q: "Quels sont les délais ?",
    a: "Une identité et un site premium se livrent en 6 à 10 semaines. Les premières campagnes d'acquisition sont en ligne sous 3 semaines.",
  },
  {
    q: "Travaillez-vous avec des PME ?",
    a: "Oui, dès lors qu'il existe une ambition de croissance claire et une capacité à absorber les demandes générées.",
  },
  {
    q: "Comment mesurez-vous les résultats ?",
    a: "Un tableau de bord unique relie dépense média, leads, rendez-vous et chiffre d'affaires signé. Revue mensuelle avec la direction.",
  },
  {
    q: "Intervenez-vous hors de France ?",
    a: "Nous accompagnons des clients à Paris, Dubaï, Genève et Casablanca, en français et en anglais.",
  },
];

function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Projects />
      <Poles />
      <Method />
      <Why />
      <Stats />
      <Testimonials />
      <Faq />
      <FinalCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="glow-blue top-10 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 opacity-70"
        aria-hidden
      />
      <div className="shell relative pt-36 pb-24 lg:pt-48 lg:pb-32">
        <Reveal>
          <div className="flex justify-center lg:justify-start">
            <Logo className="h-14 sm:h-16 lg:h-20" />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-hairline bg-surface px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Agence créative • IA • Acquisition
          </div>
        </Reveal>

        <Reveal delay={160}>
          <h1 className="display mt-10 max-w-6xl text-[2.6rem] sm:text-6xl lg:text-[5.2rem]">
            Nous concevons des marques et des systèmes de croissance qui font la différence.
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            ULTRA VISION accompagne les entreprises qui souhaitent accélérer leur croissance grâce
            au branding, au développement web, à l&apos;intelligence artificielle et à des
            stratégies d&apos;acquisition performantes.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center rounded-full bg-foreground px-7 text-xs font-medium tracking-[0.14em] uppercase text-background transition-colors duration-300 hover:bg-accent-hover"
            >
              Réserver un appel stratégique
            </Link>
            <Link
              to="/realisations"
              className="inline-flex h-12 items-center rounded-full border border-hairline px-7 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent-hover"
            >
              Découvrir nos réalisations
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section className="rule overflow-hidden bg-background py-10">
      <div className="shell">
        <p className="eyebrow">Entreprises accompagnées</p>
      </div>
      <div className="mt-8 flex overflow-hidden">
        <div className="marquee flex shrink-0 items-center gap-16 pr-16">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="display shrink-0 text-2xl text-muted-foreground sm:text-3xl"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="rule bg-background">
      <div className="shell py-24 lg:py-32">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="min-w-0">
              <p className="eyebrow">Réalisations</p>
              <h2 className="display mt-6 max-w-2xl text-4xl sm:text-5xl lg:text-6xl">
                Des projets pensés pour être rentables, pas seulement remarqués.
              </h2>
            </div>
            <Link to="/realisations" className="link-underline text-sm text-muted-foreground">
              Voir tout
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 border-t border-hairline">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.client} delay={i * 60}>
              <Link
                to="/realisations"
                className="group grid gap-3 border-b border-hairline py-8 transition-colors duration-500 hover:bg-surface md:grid-cols-[1.1fr_1fr_1fr_auto] md:items-center md:gap-8 md:px-4"
              >
                <span className="display text-2xl sm:text-3xl">{p.client}</span>
                <span className="text-sm text-muted-foreground">{p.sector}</span>
                <span className="text-sm text-muted-foreground">{p.scope}</span>
                <span className="text-sm font-medium text-accent-hover">{p.result}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Poles() {
  return (
    <section className="rule bg-surface">
      <div className="shell py-24 lg:py-32">
        <Reveal>
          <p className="eyebrow">Nos expertises</p>
          <h2 className="display mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
            Cinq pôles, une seule équipe, une chaîne de valeur complète.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <article className="surface-card h-full p-8">
                <span className="text-xs tracking-[0.2em] text-accent">{p.n}</span>
                <h3 className="display mt-6 text-2xl">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  {p.lines.map((l) => (
                    <li key={l} className="flex items-center gap-3">
                      <span className="h-px w-4 bg-hairline" />
                      {l}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
          <Reveal delay={350}>
            <Link
              to="/services"
              className="surface-card flex h-full flex-col justify-between p-8 hover:text-accent-hover"
            >
              <span className="eyebrow">Détail complet</span>
              <span className="display mt-10 text-2xl">Voir tous les services →</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section className="rule bg-background">
      <div className="shell py-24 lg:py-32">
        <Reveal>
          <p className="eyebrow">Notre méthode</p>
          <h2 className="display mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
            Quatre étapes, aucune zone grise.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {METHOD.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="border-t border-hairline pt-6">
                <span className="text-xs tracking-[0.2em] text-accent">{s.n}</span>
                <h3 className="display mt-5 text-2xl">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="rule bg-surface">
      <div className="shell grid gap-16 py-24 lg:grid-cols-[1fr_1.2fr] lg:py-32">
        <Reveal>
          <div>
            <p className="eyebrow">Pourquoi ULTRA VISION</p>
            <h2 className="display mt-6 text-4xl sm:text-5xl">
              Le niveau d&apos;exigence d&apos;une équipe interne, la vitesse d&apos;un studio.
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-2">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 70}>
              <div className="border-t border-hairline pt-6">
                <h3 className="text-base font-medium">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="rule bg-background">
      <div className="shell py-24 lg:py-28">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <div>
                <p className="display text-5xl lg:text-6xl">
                  <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="mt-4 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="rule bg-surface">
      <div className="shell py-24 lg:py-32">
        <Reveal>
          <p className="eyebrow">Témoignages</p>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="surface-card flex h-full flex-col justify-between p-8">
                <blockquote className="display text-xl leading-snug sm:text-2xl">
                  « {t.quote} »
                </blockquote>
                <figcaption className="mt-10 text-sm">
                  <span className="block font-medium">{t.name}</span>
                  <span className="block text-muted-foreground">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="rule bg-background">
      <div className="shell grid gap-14 py-24 lg:grid-cols-[1fr_1.4fr] lg:py-32">
        <Reveal>
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="display mt-6 text-4xl sm:text-5xl">Questions fréquentes</h2>
          </div>
        </Reveal>
        <div className="border-t border-hairline">
          {FAQ.map((f, i) => (
            <div key={f.q} className="border-b border-hairline">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-base font-medium sm:text-lg">{f.q}</span>
                <span
                  className={`shrink-0 text-muted-foreground transition-transform duration-500 ${open === i ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-[max-height,opacity] duration-500 ${open === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
