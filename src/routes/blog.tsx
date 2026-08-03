import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Notes on Brand, AI and Demand | Ultra Vision" },
      {
        name: "description",
        content:
          "Essays and field notes on positioning, premium brand building, AI automation and paid acquisition for established companies.",
      },
      { property: "og:title", content: "Journal | Ultra Vision" },
      {
        property: "og:description",
        content: "Field notes from a studio building brands and acquisition systems.",
      },
    ],
  }),
  component: Blog,
});

const FEATURED = {
  category: "Positioning",
  date: "12 July 2026",
  read: "9 min",
  title: "Why premium brands never argue about price",
  excerpt:
    "Discounting is rarely a pricing problem. It's a positioning problem that shows up at the end of the sales call. Here's the sequence we use to move a company out of comparison and into category.",
};

const POSTS = [
  {
    category: "AI",
    date: "28 June 2026",
    read: "7 min",
    title: "The five automations every sales team should have before hiring again",
    excerpt:
      "Before you add headcount, remove the work. These five workflows consistently return the most hours per euro spent.",
  },
  {
    category: "Paid Media",
    date: "9 June 2026",
    read: "6 min",
    title: "Creative volume beats targeting — and the data isn't close",
    excerpt:
      "Platform algorithms now do the targeting. The only variable you still control is how many distinct ideas you put in front of them each month.",
  },
  {
    category: "Web",
    date: "21 May 2026",
    read: "8 min",
    title: "What a €100,000 website actually buys you",
    excerpt:
      "It isn't animation. It's research, narrative, engineering discipline and a design system your team can run for five years.",
  },
  {
    category: "Brand",
    date: "3 May 2026",
    read: "5 min",
    title: "Restraint is the most underused tool in B2B branding",
    excerpt:
      "Most category leaders look calm. Most challengers look loud. Here's how to sound confident without shouting.",
  },
  {
    category: "Revenue",
    date: "14 April 2026",
    read: "10 min",
    title: "Your CRM is a strategy document — treat it like one",
    excerpt:
      "Pipeline stages encode how you believe deals are won. When the stages are vague, so is the forecast.",
  },
  {
    category: "Film",
    date: "2 April 2026",
    read: "6 min",
    title: "The brand film that pays for itself in ninety days",
    excerpt:
      "One shoot, thirty assets, three funnels. How to plan production around distribution rather than the other way round.",
  },
];

function Blog() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from inside the work."
        intro="No growth hacks. Just what we're learning while building brands, websites and acquisition systems for companies with something to lose."
      />

      <section className="rule">
        <div className="shell py-16 lg:py-20">
          <Reveal>
            <article className="group grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="flex items-center gap-4 text-xs tracking-[0.14em] uppercase text-muted-foreground">
                  <span>{FEATURED.category}</span>
                  <span>{FEATURED.date}</span>
                  <span>{FEATURED.read}</span>
                </div>
                <h2 className="display mt-8 max-w-3xl text-5xl lg:text-7xl">{FEATURED.title}</h2>
                <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
                  {FEATURED.excerpt}
                </p>
                <span className="link-underline mt-8 inline-block text-sm font-medium">
                  Read the essay
                </span>
              </div>
              <div className="aspect-[4/3] w-full bg-secondary transition-colors duration-500 group-hover:bg-accent" />
            </article>
          </Reveal>
        </div>
      </section>

      <section className="rule">
        <div className="shell py-16 lg:py-24">
          <div className="grid gap-px bg-hairline md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 60}>
                <article className="flex h-full flex-col bg-background p-8 transition-colors duration-500 hover:bg-secondary lg:p-10">
                  <div className="flex items-center gap-4 text-xs tracking-[0.14em] uppercase text-muted-foreground">
                    <span>{p.category}</span>
                    <span>{p.read}</span>
                  </div>
                  <h3 className="display mt-8 text-3xl">{p.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                  <p className="mt-8 text-xs text-muted-foreground">{p.date}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
