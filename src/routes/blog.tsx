import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/components/FinalCTA";

const URL = "https://timeless-brand-engine.lovable.app";

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => ({
    meta: [
      { title: "Blog — Marque, acquisition et IA | ULTRA VISION" },
      {
        name: "description",
        content:
          "Analyses sur le branding premium, la conversion, l'automatisation par l'IA et l'acquisition payante, écrites par l'équipe ULTRA VISION.",
      },
      { property: "og:title", content: "Blog — ULTRA VISION" },
      {
        property: "og:description",
        content: "Nos analyses sur la marque, l'acquisition et l'intelligence artificielle.",
      },
      { property: "og:url", content: `${URL}/blog` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${URL}/blog` }],
  }),
});

const POSTS = [
  {
    date: "Juin 2026",
    cat: "Marque",
    title: "Pourquoi une marque premium coûte moins cher en acquisition",
    excerpt:
      "La prime de marque se lit directement dans le coût par lead. Analyse de douze comptes publicitaires sur dix-huit mois.",
    read: "8 min",
  },
  {
    date: "Mai 2026",
    cat: "IA",
    title: "Agents IA : ce qui fonctionne réellement en qualification commerciale",
    excerpt:
      "Trois architectures testées en production, leurs coûts, leurs limites et les cas où un humain reste indispensable.",
    read: "11 min",
  },
  {
    date: "Avril 2026",
    cat: "Acquisition",
    title: "Sortir du coût par clic : piloter au rendez-vous signé",
    excerpt:
      "Comment relier dépense média, CRM et chiffre d'affaires dans un tableau de bord réellement utilisé par la direction.",
    read: "9 min",
  },
  {
    date: "Mars 2026",
    cat: "Web",
    title: "Le site de dix pages qui remplace un catalogue de cinquante",
    excerpt:
      "Réduire la surface d'un site augmente presque toujours la conversion. Méthode de réduction éditoriale.",
    read: "7 min",
  },
  {
    date: "Février 2026",
    cat: "Contenu",
    title: "Produire douze mois de contenu en trois jours de tournage",
    excerpt:
      "Notre protocole de production photo et vidéo pour alimenter les campagnes sans repartir de zéro chaque mois.",
    read: "6 min",
  },
];

function Blog() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ce que nous apprenons en construisant, écrit sans détour."
        intro="Pas de contenu générique : uniquement des analyses issues de projets réels, de budgets réels et de résultats mesurés."
      />

      <section className="rule bg-background">
        <div className="shell py-16 lg:py-24">
          <div className="border-t border-hairline">
            {POSTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <article className="group grid gap-4 border-b border-hairline py-10 transition-colors duration-500 hover:bg-surface md:grid-cols-[10rem_1fr_5rem] md:items-start md:gap-10 md:px-4">
                  <div className="text-xs tracking-[0.16em] uppercase text-muted-foreground">
                    <p>{p.date}</p>
                    <p className="mt-2 text-accent">{p.cat}</p>
                  </div>
                  <div className="min-w-0">
                    <h2 className="display text-2xl sm:text-3xl">{p.title}</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {p.excerpt}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground md:text-right">{p.read}</p>
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
