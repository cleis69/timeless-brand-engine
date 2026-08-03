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
  component: CaseStudies;
});

function CaseStudies() {
  return null;
}
