import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="glow-blue -top-40 left-1/4 h-[26rem] w-[26rem] opacity-60" aria-hidden />
      <div className="shell relative pt-36 pb-20 lg:pt-48 lg:pb-28">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-8 max-w-5xl text-[2.75rem] sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {intro}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
