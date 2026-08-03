import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ultra Vision — Brand, AI & Growth Studio for Ambitious Companies" },
      {
        name: "description",
        content:
          "Ultra Vision builds brands, websites, AI automation and acquisition systems for medium and large businesses. Book a discovery call.",
      },
      { property: "og:title", content: "Ultra Vision — Brand, AI & Growth Studio" },
      {
        property: "og:description",
        content:
          "Branding, custom websites, AI automation and paid acquisition, engineered as one growth system.",
      },
    ],
  }),
  component: Home,
});

const CLIENTS = [
  "NORDHAUS",
  "MERIDIAN",
  "ATELIER 9",
  "VOLTA GROUP",
  "SAISON",
  "HELIOS CAPITAL",
  "KOENIG",
  "LUMA MEDICAL",
];

const SERVICES = [
  {
    n: "01",
    title: "Branding & Identity",
    copy: "Positioning, naming, visual systems and brand governance that make premium pricing feel obvious.",
  },
  {
    n: "02",
    title: "Custom Websites",
    copy: "Bespoke, fast, editorial websites engineered for conversion — never a template, never a compromise.",
  },
  {
    n: "03",
    title: "AI Automation",
    copy: "Agents and workflows that qualify leads, draft proposals and remove hours of manual work every week.",
  },
  {
    n: "04",
    title: "Meta, Google & TikTok Ads",
    copy: "Full-funnel paid media built on creative volume, clean tracking and ruthless attention to CAC.",
  },
  {
    n: "05",
    title: "Content Creation",
    copy: "Editorial and social content produced at pace, on brand, and built around a distinct point of view.",
  },
  {
    n: "06",
    title: "Video Production",
    copy: "Brand films, product stories and performance creative shot with cinema discipline.",
  },
  {
    n: "07",
    title: "Photography",
    copy: "Campaign, product and portrait photography that gives your brand a library it can live on for years.",
  },
  {
    n: "08",
    title: "Lead Generation",
    copy: "Outbound, inbound and referral engines that fill a calendar with qualified conversations.",
  },
  {
    n: "09",
    title: "CRM Implementation",
    copy: "Pipelines, scoring, sequences and reporting so no opportunity dies in an inbox.",
  },
  {
    n: "10",
    title: "Web Applications",
    copy: "Portals, dashboards and internal tools built to production standards by senior engineers.",
  },
];

const PROJECTS = [
  {
    client: "Nordhaus",
    sector: "Industrial Manufacturing",
    title: "A 68-year-old manufacturer, repositioned for enterprise buyers",
    metric: "+214% qualified pipeline",
    year: "2026",
  },
  {
    client: "Meridian",
    sector: "Private Wealth",
    title: "A wealth practice that finally looks like the money it manages",
    metric: "€41M AUM sourced online",
    year: "2025",
  },
  {
    client: "Luma Medical",
    sector: "Health Technology",
    title: "From twelve disconnected tools to one AI-driven revenue system",
    metric: "−63% cost per booked call",
    year: "2025",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Diagnose",
    copy: "Two weeks inside your numbers, your sales calls and your market. We find the constraint before we touch the design.",
  },
  {
    n: "02",
    title: "Define",
    copy: "Positioning, offer architecture and the narrative that makes your category choose you by default.",
  },
  {
    n: "03",
    title: "Design & Build",
    copy: "Identity, website, content and automation built in parallel by one senior team — no handoffs, no agencies in the middle.",
  },
  {
    n: "04",
    title: "Deploy & Compound",
    copy: "Paid media, CRM and AI workflows go live, then we iterate weekly against pipeline — not vanity metrics.",
  },
];

const STATS = [
  { value: "€180M+", label: "Revenue influenced for clients" },
  { value: "94%", label: "Client retention beyond year one" },
  { value: "12", label: "Senior specialists, zero juniors" },
  { value: "31", label: "Countries we've shipped work in" },
];

const TESTIMONIALS = [
  {
    quote:
      "They rebuilt how we sell, not just how we look. Six months later our average contract value is up 40% and we stopped competing on price.",
    name: "Élise Marchand",
    role: "CEO, Nordhaus Group",
  },
  {
    quote:
      "The most senior team we've worked with in fifteen years. Everything they promised landed, on the week they said it would.",
    name: "David Rennick",
    role: "Managing Partner, Meridian",
  },
  {
    quote:
      "Their AI workflows quietly replaced two full-time roles of admin. The website is the best asset our company owns.",
    name: "Sofia Bennani",
    role: "COO, Luma Medical",
  },
];

const FAQS = [
  {
    q: "Who do you work with?",
    a: "Established companies — typically €5M to €500M in revenue — with a real product, a sales team, and the ambition to lead their category rather than follow it.",
  },
  {
    q: "What does an engagement cost?",
    a: "Focused projects start at €25,000. Full brand-and-growth programmes typically run €80,000 to €250,000 across six to twelve months. We scope after the discovery call, never before.",
  },
  {
    q: "How fast do you move?",
    a: "A repositioning and website programme ships in eight to twelve weeks. Paid media and AI automation often go live inside the first thirty days.",
  },
  {
    q: "Do you replace our internal team?",
    a: "No. We give your team a system they can run, and we stay on retainer where senior firepower keeps compounding the result.",
  },
  {
    q: "What happens on the discovery call?",
    a: "Thirty minutes. We review your positioning, funnel and constraints, then tell you honestly whether we're the right studio — and what we'd do first if we were.",
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="shell relative pt-44 pb-24 lg:pt-56 lg:pb-32">
        <div className="reveal">
          <p className="eyebrow">Brand · AI · Acquisition</p>
          <h1 className="display mt-10 max-w-[16ch] text-[clamp(3rem,10vw,9.5rem)]">
            Growth, designed with <span className="italic">intent</span>.
          </h1>
          <div className="rule mt-16 grid gap-10 pt-10 md:grid-cols-[1.1fr_1fr]">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Ultra Vision is a growth studio for medium and large businesses. We build the brand,
              the website, the content and the AI-driven acquisition system — as one machine, owned
              by one senior team.
            </p>
            <div className="flex flex-wrap items-start gap-4 md:justify-end">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center rounded-full bg-primary px-7 text-xs font-semibold tracking-[0.16em] uppercase text-primary-foreground transition-opacity duration-300 hover:opacity-80"
              >
                Book a discovery call
              </Link>
              <Link
                to="/case-studies"
                className="inline-flex h-12 items-center rounded-full border border-border px-7 text-xs font-semibold tracking-[0.16em] uppercase transition-colors duration-300 hover:border-foreground"
              >
                See the work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="rule overflow-hidden py-10">
        <div className="shell">
          <p className="eyebrow">Trusted by teams at</p>
        </div>
        <div className="mt-8 flex w-max marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-16 pr-16">
              {CLIENTS.map((c) => (
                <span
                  key={`${dup}-${c}`}
                  className="text-sm font-semibold tracking-[0.28em] whitespace-nowrap text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="rule">
        <div className="shell py-24 lg:py-32">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Capabilities</p>
                <h2 className="display mt-6 max-w-2xl text-5xl lg:text-7xl">
                  Ten disciplines. One accountable team.
                </h2>
              </div>
              <Link to="/services" className="link-underline text-sm font-medium">
                All services
              </Link>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={(i % 3) * 60}>
                <article className="group h-full bg-background p-8 transition-colors duration-500 hover:bg-secondary lg:p-10">
                  <span className="text-xs tracking-[0.2em] text-muted-foreground">{s.n}</span>
                  <h3 className="display mt-8 text-3xl">{s.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="rule">
        <div className="shell py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2 className="display mt-6 max-w-2xl text-5xl lg:text-7xl">
              Work that moves a P&amp;L.
            </h2>
          </Reveal>

          <div className="mt-16">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.client} delay={i * 70}>
                <Link
                  to="/case-studies"
                  className="group rule grid items-center gap-6 py-10 md:grid-cols-[1fr_2fr_auto]"
                >
                  <div>
                    <p className="text-sm font-semibold tracking-[0.2em] uppercase">{p.client}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{p.sector}</p>
                  </div>
                  <h3 className="display text-3xl transition-transform duration-500 group-hover:translate-x-2 lg:text-4xl">
                    {p.title}
                  </h3>
                  <div className="text-right">
                    <p className="text-sm font-medium">{p.metric}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{p.year}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="rule bg-secondary">
        <div className="shell py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">Method</p>
            <h2 className="display mt-6 max-w-2xl text-5xl lg:text-7xl">
              A process built to remove doubt.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="rule pt-6">
                  <span className="text-xs tracking-[0.2em] text-muted-foreground">{s.n}</span>
                  <h3 className="display mt-6 text-3xl">{s.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="rule">
        <div className="shell py-24 lg:py-28">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <p className="display text-6xl lg:text-7xl">{s.value}</p>
                <p className="mt-4 max-w-[22ch] text-sm text-muted-foreground">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="rule">
        <div className="shell py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">In their words</p>
          </Reveal>
          <div className="mt-14 grid gap-px bg-hairline lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <figure className="flex h-full flex-col justify-between bg-background p-8 lg:p-10">
                  <blockquote className="display text-2xl leading-snug lg:text-3xl">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-10 text-sm">
                    <span className="font-medium">{t.name}</span>
                    <span className="block text-muted-foreground">{t.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="rule">
        <div className="shell grid gap-14 py-24 lg:grid-cols-[1fr_1.6fr] lg:py-32">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="display mt-6 text-5xl lg:text-6xl">Before you reach out.</h2>
          </Reveal>
          <div>
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <FaqItem q={f.q} a={f.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rule">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-7 text-left"
      >
        <span className="text-lg font-medium lg:text-xl">{q}</span>
        <span
          className={`text-xl leading-none transition-transform duration-500 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-7 text-sm leading-relaxed text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}
