import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Branding, AI Automation & Paid Growth | Ultra Vision" },
      {
        name: "description",
        content:
          "Branding, custom websites, AI automation, paid media, content, film, CRM and lead generation — delivered by one senior team.",
      },
      { property: "og:title", content: "Services | Ultra Vision" },
      {
        property: "og:description",
        content:
          "Ten disciplines, one accountable team: brand, web, AI, paid media, content and revenue operations.",
      },
    ],
  }),
  component: Services,
});

const GROUPS = [
  {
    label: "Brand",
    items: [
      {
        title: "Branding & Identity",
        copy: "Positioning, naming, verbal identity, visual systems, guidelines and rollout. The work that lets you raise prices without losing deals.",
        deliverables: ["Positioning strategy", "Identity system", "Brand book", "Launch assets"],
      },
      {
        title: "Content Creation",
        copy: "A monthly editorial engine: thought leadership, social, newsletters and sales collateral written with a real point of view.",
        deliverables: ["Content strategy", "Editorial calendar", "Social systems", "Sales decks"],
      },
      {
        title: "Video Production",
        copy: "Brand films, founder stories, product explainers and high-volume performance creative — directed, shot and edited in-house.",
        deliverables: ["Brand film", "Ad creative library", "Case study films", "Motion系统"],
      },
      {
        title: "Photography",
        copy: "Campaign, product, portrait and environmental photography that gives your brand a library it can live on for years.",
        deliverables: ["Art direction", "Production", "Retouching", "Asset library"],
      },
    ],
  },
  {
    label: "Build",
    items: [
      {
        title: "Custom Websites",
        copy: "Editorial, fast, conversion-engineered websites. Designed pixel by pixel, built by senior engineers, measured against pipeline.",
        deliverables: ["UX architecture", "Design system", "Development", "SEO foundation"],
      },
      {
        title: "Custom Web Applications",
        copy: "Client portals, dashboards, quoting tools and internal platforms built to production standards with real security.",
        deliverables: ["Product discovery", "Architecture", "Build & QA", "Ongoing support"],
      },
      {
        title: "AI Automation",
        copy: "Agents that qualify inbound, summarise calls, draft proposals and keep your CRM honest — quietly removing hours every week.",
        deliverables: ["Workflow audit", "Agent design", "Integrations", "Team enablement"],
      },
    ],
  },
  {
    label: "Grow",
    items: [
      {
        title: "Meta, Google & TikTok Ads",
        copy: "Full-funnel paid media: creative volume, clean measurement, offer testing and weekly optimisation against cost per qualified call.",
        deliverables: ["Account architecture", "Creative sprints", "Tracking setup", "Weekly reporting"],
      },
      {
        title: "Lead Generation",
        copy: "Outbound sequences, inbound capture and referral loops designed to fill a calendar with the right conversations.",
        deliverables: ["ICP definition", "Offer design", "Sequences", "Booking systems"],
      },
      {
        title: "CRM Implementation",
        copy: "Pipelines, lead scoring, automations and dashboards so revenue becomes a process instead of a personality.",
        deliverables: ["CRM setup", "Data migration", "Automation", "Sales training"],
      },
    ],
  },
];

const ENGAGEMENTS = [
  {
    title: "Sprint",
    price: "from €25,000",
    copy: "A single, sharply scoped outcome — a repositioning, a website, an automation layer.",
  },
  {
    title: "Programme",
    price: "€80,000 – €250,000",
    copy: "Brand, build and acquisition delivered together across six to twelve months.",
  },
  {
    title: "Partner",
    price: "monthly retainer",
    copy: "Your senior growth team on standing call: media, content, product and iteration.",
  },
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything your growth depends on, under one roof."
        intro="Most companies buy marketing in fragments — an agency here, a freelancer there, a developer somewhere else. We assemble the whole system and stay accountable for the number at the end of it."
      />

      {GROUPS.map((group) => (
        <section key={group.label} className="rule">
          <div className="shell py-20 lg:py-28">
            <Reveal>
              <p className="eyebrow">{group.label}</p>
            </Reveal>
            <div className="mt-12 space-y-px bg-hairline">
              {group.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <article className="grid gap-8 bg-background py-10 md:grid-cols-[1fr_1.4fr_1fr] lg:gap-12">
                    <h2 className="display text-3xl lg:text-4xl">{item.title}</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
                    <ul className="space-y-2 text-xs tracking-[0.12em] uppercase text-muted-foreground">
                      {item.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="rule bg-secondary">
        <div className="shell py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">Engagements</p>
            <h2 className="display mt-6 max-w-2xl text-5xl lg:text-6xl">
              Three ways to work together.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-hairline lg:grid-cols-3">
            {ENGAGEMENTS.map((e, i) => (
              <Reveal key={e.title} delay={i * 70}>
                <div className="h-full bg-secondary p-8 lg:p-10">
                  <h3 className="display text-4xl">{e.title}</h3>
                  <p className="mt-3 text-sm font-medium">{e.price}</p>
                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{e.copy}</p>
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
