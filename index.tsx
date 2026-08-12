import { createFileRoute, Link } from "@tanstack/react-router";
import { MaskReveal, Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { Conviction } from "@/components/Conviction";
import { IrisBackdrop } from "@/components/IrisBackdrop";
import { VideoShowcase } from "@/components/work/VideoShowcase";
import { CONTACT, hasWhatsapp, whatsappUrl } from "@/config/contact";
import { useState } from "react";

/**
 * ULTRA VISION — page d'accueil.
 *
 * ============================================================
 *  CE FICHIER REMPLACE src/routes/index.tsx
 * ============================================================
 *
 * CE QUI CHANGE PAR RAPPORT A LA VERSION PRECEDENTE
 *
 * 1. La section <VideoShowcase /> est ajoutee juste apres le Hero,
 *    avant le bandeau de logos clients. Le visiteur voit une vraie
 *    realisation des le premier scroll.
 *
 * 2. La section <Projects /> a ete supprimee. C'etait une liste de
 *    texte citant Nordhaus, Meridian, Atelier Vaste et Kairos
 *    Capital, qui n'existent pas, avec des resultats chiffres tout
 *    aussi imaginaires. VideoShowcase la remplace avec de vrais
 *    projets.
 *
 * 3. Les statistiques sont passees en marqueurs STAT_01 a STAT_04.
 *    Les chiffres precedents (+214 %, 47 marques, 12 M€, 4,9/5)
 *    etaient inventes. Remplace-les par tes vrais chiffres quand tu
 *    les auras, et le compteur anime se remettra en route.
 *
 * 4. La section <Testimonials /> est desactivee. Les trois
 *    temoignages signes Claire Aubert, Marc Delvaux et Sofia
 *    Bennani etaient fictifs. Publier de faux temoignages clients
 *    est une pratique commerciale trompeuse. Le code est conserve
 *    plus bas : il suffira de le reactiver avec de vrais retours.
 *
 * 5. L'adresse e-mail des donnees structurees passe de
 *    studio@ultravision.fr (inventee) a contact@ultravisionagency.com.
 *    Le telephone +33600000000 a ete retire plutot qu'invente.
 */

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
          email: "contact@ultravisionagency.com",
          areaServed: "FR",
          address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
        }),
      },
    ],
  }),
});

const CLIENTS = ["Africa Beauty", "Scultbody", "Ehab"];

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

/**
 * Statistiques.
 *
 * Remplace 'STAT_01' par ta vraie valeur, par exemple '+214 %'.
 * Tant qu'une valeur commence par STAT_, elle s'affiche en grise
 * avec la mention « à compléter ». Impossible de publier un faux
 * chiffre par accident.
 */
const STATS: { value: string; label: string }[] = [
  { value: "STAT_01", label: "Croissance moyenne du pipeline" },
  { value: "STAT_02", label: "Marques accompagnées" },
  { value: "STAT_03", label: "Chiffre d'affaires généré" },
  { value: "STAT_04", label: "Satisfaction client" },
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
      {/* La preuve visuelle arrive des le premier scroll. */}
      <VideoShowcase />
      {/* La seule rupture claire de la page. Elle casse le tunnel noir. */}
      <Conviction />
      <Clients />
      <Poles />
      <Method />
      <Why />
      <Stats />
      {/* <Testimonials /> — réactiver avec de vrais témoignages clients. */}
      <Faq />
      <FinalCTA />
    </>
  );
}

/**
 * Le hero.
 *
 * CE QUI A CHANGE
 *
 * Le logo a disparu d'ici. Il est deja dans la navigation, trois cents
 * pixels plus haut. L'afficher deux fois ne renforcait pas la marque,
 * ca signalait juste que la page n'avait rien d'autre a montrer.
 *
 * A sa place, l'iris de la marque en tres grand, coupe par le bord
 * droit, en rotation lente. Le titre redevient le sujet.
 *
 * La ligne de villes en bas ancre l'agence dans le reel. C'est un
 * detail, mais c'est ce genre de detail qui separe un site d'agence
 * d'un gabarit.
 */
function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden">
      <IrisBackdrop />

      <div className="shell relative w-full pt-40 pb-20 lg:pt-44 lg:pb-24">
        <Reveal>
          <p className="text-[0.7rem] font-medium tracking-[0.22em] uppercase text-accent">
            Creative growth agency
          </p>
        </Reveal>

        <h1 className="display mt-9 max-w-5xl text-[2.5rem] leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[5rem]">
          <MaskReveal delay={80}>Nous concevons des marques</MaskReveal>
          <MaskReveal delay={170}>
            <span>et des </span>
            <span className="text-[#5c5c5a]">systèmes de croissance</span>
          </MaskReveal>
          <MaskReveal delay={260}>qui font la différence.</MaskReveal>
        </h1>

        <Reveal delay={380}>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Branding, technologie, intelligence artificielle et acquisition, réunis dans une seule
            équipe.
          </p>
        </Reveal>

        <Reveal delay={460}>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center rounded-full bg-foreground px-7 text-xs font-medium tracking-[0.14em] uppercase text-background transition-colors duration-300 hover:bg-accent-hover"
            >
              Prendre rendez-vous
            </Link>
            {hasWhatsapp ? (
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center rounded-full border border-hairline px-7 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent-hover"
              >
                Parler sur WhatsApp
              </a>
            ) : (
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex h-12 items-center rounded-full border border-hairline px-7 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent-hover"
              >
                Nous écrire
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={560}>
          <div className="mt-20 flex flex-wrap gap-x-10 gap-y-2 border-t border-hairline pt-6 text-[0.68rem] tracking-[0.16em] uppercase text-[#5c5c5a]">
            {CONTACT.locations.split("—").map((v) => (
              <span key={v.trim()}>{v.trim()}</span>
            ))}
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
          {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((c, i) => (
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
          {STATS.map((s, i) => {
            const pending = s.value.startsWith("STAT_");
            return (
              <Reveal key={s.label} delay={i * 70}>
                <div>
                  <p
                    className={`display text-5xl lg:text-6xl ${pending ? "text-[#3a3a3a]" : ""}`}
                  >
                    {s.value}
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">{s.label}</p>
                  {pending && (
                    <p className="mt-1 text-[0.65rem] tracking-[0.12em] uppercase text-[#5a5a5a]">
                      à compléter
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
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
