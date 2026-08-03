import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Measured Growth Work | Ultra Vision" },
      {
        name: "description",
        content:
          "Brand, web and acquisition programmes for manufacturers, wealth firms and health technology companies — with the numbers behind them.",
      },
      { property: "og:title", content: "Case Studies | Ultra Vision" },
      {
        property: "og:description",
        content: "Selected work and the commercial results it produced.",
      },
    ],
  }),
  component: CaseStudies,
});

const CASES = [
  {
    client: "Nordhaus",
    sector: "Industrial Manufacturing · Germany",
    year: "2026",
    title: "A 68-year-old manufacturer, repositioned for enterprise buyers",
    challenge:
      "Nordhaus was winning on engineering and losing on perception. Procurement teams treated them as a commodity supplier and negotiated accordingly.",
    work: ["Repositioning", "Identity system", "Website", "Sales enablement", "CRM"],
    results: [
      { v: "+214%", l: "Qualified pipeline" },
      { v: "+40%", l: "Average contract value" },
      { v: "9 wks", l: "From kickoff to launch" },
    ],
  },
  {
    client: "Meridian",
    sector: "Private Wealth · Switzerland",
    year: "2025",
    title: "A wealth practice that finally looks like the money it manages",
    challenge:
      "A referral-only firm with no digital presence needed to attract a younger generation of clients without diluting an institutional reputation.",
    work: ["Brand identity", "Editorial website", "Content engine", "Paid search"],
    results: [
      { v: "€41M", l: "AUM sourced online" },
      { v: "3.1x", l: "Inbound consultations" },
      { v: "18 mo", l: "Payback in month four" },
    ],
  },
  {
    client: "Luma Medical",
    sector: "Health Technology · France",
    year: "2025",
    title: "From twelve disconnected tools to one AI-driven revenue system",
    challenge:
      "Leads arrived across five channels and died in inboxes. Sales spent more time on admin than on conversations.",
    work: ["AI automation", "CRM implementation", "Paid media", "Video"],
    results: [
      { v: "−63%", l: "Cost per booked call" },
      { v: "2 FTE", l: "Of admin removed" },
      { v: "100%", l: "Lead response under 5 min" },
    ],
  },
  {
    client: "Volta Group",
    sector: "Renewable Energy · Spain",
    year: "2024",
    title: "A category story strong enough to raise a Series B",
    challenge:
      "Strong technology, invisible narrative. Investors and installers couldn't articulate what made Volta different.",
    work: ["Narrative", "Brand film", "Website", "Investor materials"],
    results: [
      { v: "€28M", l: "Series B closed" },
      { v: "+7.4%", l: "Site conversion rate" },
      { v: "1.2M", l: "Brand film views" },
    ],
  },
];

function CaseStudies() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="The work, and the numbers behind it."
        intro="We only publish work we can defend with data. Each programme below started with a commercial constraint — not a design brief."
      />

      <section className="rule">
        <div className="shell space-y-px bg-hairline">
          {CASES.map((c, i) => (
            <Reveal key={c.client} delay={i * 60}>
              <article className="bg-background py-16 lg:py-20">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <p className="text-sm font-semibold tracking-[0.22em] uppercase">{c.client}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.sector} · {c.year}
                  </p>
                </div>

                <h2 className="display mt-8 max-w-4xl text-4xl lg:text-6xl">{c.title}</h2>

                <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
                  <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {c.challenge}
                  </p>
                  <ul className="flex flex-wrap gap-2 lg:justify-end">
                    {c.work.map((w) => (
                      <li
                        key={w}
                        className="rounded-full border border-border px-4 py-2 text-xs tracking-[0.12em] uppercase text-muted-foreground"
                      >
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rule mt-12 grid gap-8 pt-10 sm:grid-cols-3">
                  {c.results.map((r) => (
                    <div key={r.l}>
                      <p className="display text-5xl lg:text-6xl">{r.v}</p>
                      <p className="mt-3 text-sm text-muted-foreground">{r.l}</p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
