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
    <section className="shell pt-40 pb-20 lg:pt-52 lg:pb-28">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-8 max-w-5xl text-6xl sm:text-7xl lg:text-8xl">{title}</h1>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
      </Reveal>
    </section>
  );
}
