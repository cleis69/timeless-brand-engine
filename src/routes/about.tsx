import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — A Senior Studio for Ambitious Companies | Ultra Vision" },
      {
        name: "description",
        content:
          "Ultra Vision is a twelve-person studio of senior strategists, designers, engineers and media buyers working across Paris, Dubai and Casablanca.",
      },
      { property: "og:title", content: "About | Ultra Vision" },
      {
        property: "og:description",
        content: "Twelve senior specialists. No juniors, no layers, no handoffs.",
      },
    ],
  }),
  component: About,
});

const PRINCIPLES = [
  {
    n: "01",
    title: "Taste is a business asset",
    copy: "Restraint signals confidence. Companies that look considered are trusted faster and negotiated with less.",
  },
  {
    n: "02",
    title: "Strategy before surface",
    copy: "We don't open the design tool until we can explain, in one sentence, why a buyer should choose you.",
  },
  {
    n: "03",
    title: "Senior hands only",
    copy: "The people in the pitch are the people doing the work. No account layer, no pass-down to juniors.",
  },
  {
    n: "04",
    title: "Accountable to revenue",
    copy: "Impressions are not results. Every engagement is measured against pipeline, cost per call and closed business.",
  },
];

const TEAM = [
  { name: "Adam Reyes", role: "Founder & Creative Director" },
  { name: "Clara Vondt", role: "Brand Strategy Lead" },
  { name: "Youssef Amrani", role: "Head of Engineering" },
  { name: "Ines Delacroix", role: "Director of Paid Media" },
  { name: "Marek Solan", role: "AI & Automation Lead" },
  { name: "Nora Haddad", role: "Head of Film & Photography" },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A small studio built for consequential work."
        intro="Ultra Vision was founded on a simple frustration: the companies with the most at stake were being served by the least experienced people. We built the opposite of that."
      />

      <section className="rule">
        <div className="shell grid gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <Reveal>
            <p className="display text-3xl leading-snug lg:text-4xl">
              Twelve senior specialists across strategy, design, engineering, film and media —
              working from Paris, Dubai and Casablanca for clients in thirty-one countries.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                We deliberately stay small. A studio of twelve can hold every detail of six serious
                engagements in its head; an agency of two hundred cannot. That constraint is why our
                work ships faster and holds together better.
              </p>
              <p>
                Our clients are established businesses — manufacturers, wealth firms, health
                technology, energy, professional services — usually between €5M and €500M in
                revenue, and usually at a moment where the brand no longer matches the ambition.
              </p>
              <p>
                We take on a limited number of programmes each quarter, and we say no often. It's
                the only way to promise senior attention and mean it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="rule bg-secondary">
        <div className="shell py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">Principles</p>
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} delay={i * 70}>
                <div className="rule pt-6">
                  <span className="text-xs tracking-[0.2em] text-muted-foreground">{p.n}</span>
                  <h2 className="display mt-6 text-3xl lg:text-4xl">{p.title}</h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {p.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="rule">
        <div className="shell py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">The team</p>
            <h2 className="display mt-6 max-w-2xl text-5xl lg:text-6xl">
              The people who do the work.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 60}>
                <div className="bg-background p-8 lg:p-10">
                  <div className="aspect-[4/5] w-full bg-secondary" />
                  <h3 className="mt-6 text-lg font-medium">{m.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
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
