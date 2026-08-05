import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";

const URL = "https://timeless-brand-engine.lovable.app";

export const Route = createFileRoute("/a-propos")({
  component: APropos,
  head: () => ({
    meta: [
      { title: "À propos — L'agence ULTRA VISION" },
      {
        name: "description",
        content:
          "Une équipe de seniors en branding, développement, IA et acquisition, basée à Paris, Dubaï et Casablanca.",
      },
      { property: "og:title", content: "À propos — ULTRA VISION" },
      {
        property: "og:description",
        content: "Uniquement des seniors. Peu de clients. Un niveau d'exécution constant.",
      },
      { property: "og:url", content: `${URL}/a-propos` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${URL}/a-propos` }],
  }),
});

const VALUES = [
  {
    t: "Sobriété",
    d: "Nous retirons avant d'ajouter. Ce qui reste doit servir la marque ou la conversion.",
  },
  {
    t: "Exigence",
    d: "Chaque livrable passe une revue de direction artistique avant d'arriver chez vous.",
  },
  {
    t: "Clarté",
    d: "Des devis lisibles, des périmètres écrits, aucun coût de dernière minute.",
  },
  {
    t: "Résultat",
    d: "Un projet réussi est un projet qui remplit un agenda commercial.",
  },
];

const TEAM = [
  { role: "Direction artistique", count: "3" },
  { role: "Design produit & UI", count: "3" },
  { role: "Développement", count: "4" },
  { role: "IA & automatisation", count: "2" },
  { role: "Acquisition & data", count: "3" },
  { role: "Production photo & vidéo", count: "3" },
];

function APropos() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Une agence construite pour les dirigeants qui détestent perdre du temps."
        intro="ULTRA VISION réunit dix-huit spécialistes en branding, développement, intelligence artificielle et acquisition. Nous acceptons un nombre limité de projets par an."
      />

      <section className="rule bg-background">
        <div className="shell grid gap-16 py-20 lg:grid-cols-2 lg:py-28">
          <Reveal>
            <div>
              <h2 className="display text-4xl sm:text-5xl">Notre parti pris</h2>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                La plupart des entreprises n&apos;ont pas un problème de créativité, mais un
                problème de cohérence : une marque qui dit une chose, un site qui en dit une autre,
                des campagnes qui parlent à personne. Nous réalignons l&apos;ensemble.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Nos équipes créatives et média travaillent dans la même pièce, sur les mêmes
                objectifs. C&apos;est la seule façon de faire d&apos;une belle marque une marque
                rentable.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 70}>
                <div className="border-t border-hairline pt-6">
                  <h3 className="text-base font-medium">{v.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="rule bg-surface">
        <div className="shell py-24 lg:py-32">
          <Reveal>
            <p className="eyebrow">L&apos;équipe</p>
            <h2 className="display mt-6 max-w-2xl text-4xl sm:text-5xl">
              Dix-huit spécialistes, aucun profil junior sur votre projet.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((t, i) => (
              <Reveal key={t.role} delay={i * 60}>
                <div className="surface-card flex items-baseline justify-between p-6">
                  <span className="text-sm text-muted-foreground">{t.role}</span>
                  <span className="display text-3xl">{t.count}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-14 text-sm text-muted-foreground">Paris — Dubaï — Casablanca</p>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
