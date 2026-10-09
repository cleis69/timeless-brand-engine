import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/FinalCTA";
import { Reveal } from "@/components/Reveal";
import {
  ArrowLink,
  CardGrid,
  FactList,
  FaqList,
  LinkCards,
  Section,
  SectionIntro,
} from "@/components/page/Blocks";
import { WorkGrid } from "@/components/work/WorkGrid";
import { CASE_STUDIES, casePath, findWork, isFilm, type WorkItem } from "@/components/work/work.data";
import { BRAND, SOCIAL, withBrand } from "@/config/brand";
import { CONTACT, hasWhatsapp, whatsappUrl } from "@/config/contact";
import { PACKS, dirham, euro } from "@/config/pricing";
import { POLES, SERVICES, servicePath } from "@/content/services";
import { SECTORS, sectorPath } from "@/content/sectors";
import { ARTICLES_SORTED } from "@/content/blog";
import { orgRef, pageHead } from "@/lib/seo";

/**
 * UltraVision Agency — la page pilier.
 *
 * ============================================================
 *  LA PAGE QUI REPOND A « QU'EST-CE QU'ULTRAVISION AGENCY ? »
 * ============================================================
 *
 * Elle est ecrite pour etre lue par une personne ET extraite par un
 * moteur. D'ou sa structure :
 *
 *  1. La definition, des le premier paragraphe, en une phrase qui reste
 *     vraie hors contexte (src/config/brand.ts).
 *  2. Une fiche « En bref » balisee en liste de definitions : nom,
 *     categorie, siege, zone, metiers, equipe, prix, delai.
 *  3. Les services, les secteurs, l'approche, les preuves — chacun avec
 *     un lien vers sa page detaillee.
 *  4. Les questions qu'on pose a un assistant, avec leurs reponses.
 *
 * Marrakech y est nommee la ou c'est une information — le siege, la zone
 * de tournage — et nulle part ailleurs. Une ville repetee a chaque
 * paragraphe ne renseigne personne ; elle signale une page ecrite pour
 * un robot.
 *
 * AUCUN FAIT NOUVEAU ICI : tout vient des tarifs, de l'equipe, des
 * realisations et de la FAQ deja publies.
 */

const PATH = "/agence-marketing-digital-marrakech";

const ESSAI = PACKS.find((p) => p.id === "essai")!;
const PRODUCTION = PACKS.find((p) => p.id === "production")!;

const FAQ = [
  {
    q: "Qu'est-ce qu'UltraVision Agency ?",
    a: `${BRAND.definition} ${BRAND.summary}`,
  },
  {
    q: "Où est basée UltraVision Agency ?",
    a: "À Marrakech, au Maroc. L'agence intervient aussi à Casablanca, Rabat, Tanger et Agadir : le tournage se déplace dans ces villes sans frais supplémentaires.",
  },
  {
    q: "Quels services propose UltraVision Agency ?",
    a: `${SERVICES.map((s) => s.name).join(", ")}. Et, pour les projets qui ne rentrent dans aucune formule, un accompagnement 360 sur devis : diagnostic, stratégie, production et croissance.`,
  },
  {
    q: "Avec quelles entreprises travaillez-vous ?",
    a: "Principalement avec des dirigeants et des entreprises francophones installés au Maroc : immobilier, beauté et bien-être, restauration et hospitality, mais aussi services et marques haut de gamme.",
  },
  {
    q: "Combien coûte une première campagne ?",
    a: `L'essai coûte ${dirham(ESSAI.price)} (≈ ${euro(ESSAI.price)}) : une vidéo publicitaire livrée en 7 jours et 14 jours de diffusion pilotée. Les accompagnements mensuels démarrent à ${dirham(PRODUCTION.price)} par mois. Tous les prix sont publiés sur la page tarifs.`,
  },
  {
    q: "Comment démarrer avec l'agence ?",
    a: "Réservez un appel de 30 minutes depuis la page contact, ou écrivez-nous sur WhatsApp. Nous revenons vers vous sous 24 heures ouvrées avec un créneau et un premier angle de travail.",
  },
];

export const Route = createFileRoute("/agence-marketing-digital-marrakech")({
  head: () =>
    pageHead({
      path: PATH,
      title: withBrand(`Agence de marketing digital à ${BRAND.city}`),
      description:
        "UltraVision Agency, Creative Growth Agency basée à Marrakech : vidéo, Meta, Google et TikTok Ads, sites web, CRM et IA, réunis dans une seule équipe.",
      breadcrumbs: [{ name: `L'agence à ${BRAND.city}`, path: PATH }],
      about: orgRef,
      mainEntity: orgRef,
      faq: FAQ,
    }),
  component: Pilier,
});

/*
  Les films montres ici : les trois etudes de cas filmees et un film de
  lieu. Les cartes « Etude de cas », plus bas, ne gardent que les films
  (isFilm) : la section annonce « Tout est tourne et monte en interne »,
  ce qui ne vaut pas pour un site. Les etudes de cas de sites (Find
  Estate, dont les photos sont celles des annonces Airbnb du client)
  restent sur /realisations et sur les pages secteur et service.
*/
const WORKS = ["africa-beauty", "all-in-kech", "scultbody", "institut-beaute"]
  .map(findWork)
  .filter((w): w is WorkItem => !!w);

function Pilier() {
  const facts = [
    { label: "Nom", value: BRAND.name },
    { label: "Catégorie", value: `${BRAND.category} — ${BRAND.categoryFr}` },
    { label: "Siège", value: `${BRAND.city}, ${BRAND.country}` },
    { label: "Zone d'intervention", value: CONTACT.locations.replaceAll(" — ", ", ") },
    { label: "Métiers", value: "Marque, contenu vidéo et photo, publicité, sites web, CRM et IA" },
    {
      label: "Équipe",
      value:
        "Quatre personnes : fondateur, direction artistique, community management, media buying",
    },
    { label: "Langue de travail", value: "Français" },
    {
      label: "Tarifs",
      value: `Publics — essai vidéo à ${dirham(ESSAI.price)}, diffusion comprise`,
    },
    { label: "Délai", value: "Première vidéo livrée en 7 jours" },
  ];

  return (
    <>
      <PageHero
        eyebrow={`Agence de marketing digital — ${BRAND.city}`}
        title="Une agence de marketing digital à Marrakech qui fait vendre ce qu'elle crée."
        accent="qui fait vendre ce qu'elle crée"
        intro={`${BRAND.definition} ${BRAND.summary}`}
        breadcrumbs={[{ name: `L'agence à ${BRAND.city}`, path: PATH }]}
      />

      {/* ---------------- En bref ---------------- */}
      <Section>
        <SectionIntro
          eyebrow="En bref"
          title={`${BRAND.name}, en neuf lignes.`}
          text="L'essentiel, pour vous faire une idée en trente secondes — ou pour le citer."
        />
        <FactList facts={facts} />
        <Reveal delay={200}>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            Contact :{" "}
            <a href={`mailto:${CONTACT.email}`} className="link-underline text-foreground">
              {CONTACT.email}
            </a>
            {hasWhatsapp && (
              <>
                {" "}
                ·{" "}
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-foreground"
                >
                  WhatsApp
                </a>
              </>
            )}
            {SOCIAL.map((n) => (
              <span key={n.network}>
                {" "}
                ·{" "}
                <a
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="link-underline text-foreground"
                >
                  {n.network} {n.handle}
                </a>
              </span>
            ))}
          </p>
        </Reveal>
      </Section>

      {/* ---------------- Ce que fait l'agence ---------------- */}
      <Section surface>
        <SectionIntro
          eyebrow="Ce que fait l'agence"
          title="Quatre pôles, huit services, une seule équipe."
          text="La marque, les contenus, la publicité et les outils de conversion sont construits ensemble : c'est ce qui distingue une Creative Growth Agency d'une agence qui ne fait que l'un ou l'autre."
        />
        <LinkCards
          items={POLES.flatMap((p) =>
            p.services.map((slug) => {
              const s = SERVICES.find((x) => x.slug === slug)!;
              return {
                to: servicePath(s.slug),
                eyebrow: p.title,
                title: s.name,
                text: s.description,
              };
            }),
          )}
        />
        <div className="mt-10">
          <ArrowLink to="/methode">Stratégie digitale et accompagnement 360</ArrowLink>
        </div>
      </Section>

      {/* ---------------- Pour quelles entreprises ---------------- */}
      <Section>
        <SectionIntro
          eyebrow="Pour qui"
          title="Des entreprises installées au Maroc, et leurs clients."
          text="La grande majorité de nos clients sont des dirigeants francophones installés au Maroc. Trois secteurs concentrent l'essentiel de nos réalisations ; nous accompagnons aussi des entreprises de services et des marques haut de gamme."
        />
        <LinkCards
          items={SECTORS.map((s) => ({
            to: sectorPath(s.slug),
            eyebrow: "Secteur",
            title: s.name,
            text: s.description,
          }))}
        />
      </Section>

      {/* ---------------- L'approche ---------------- */}
      <Section surface>
        <SectionIntro eyebrow="Notre approche" title="Quatre règles, sur chaque projet." />
        <CardGrid
          items={[
            {
              title: "La même équipe crée et diffuse",
              text: "Ceux qui écrivent et tournent vos vidéos sont ceux qui pilotent leur diffusion. Personne à qui renvoyer la responsabilité quand les résultats ne viennent pas.",
            },
            {
              title: "Un pilotage au rendez-vous, pas au clic",
              text: "Nous nous engageons sur des rendez-vous qualifiés, pas sur des impressions.",
            },
            {
              title: "Des prix publics",
              text: "Chaque prestation a un prix publié, et ce qui n'est jamais compris est écrit avant la signature.",
            },
            {
              title: "Tout vous appartient",
              text: "Fichiers sources, comptes publicitaires ouverts à votre nom, données de campagne : si nous arrêtons, vous repartez avec tout.",
            },
          ]}
        />
      </Section>

      {/* ---------------- Les preuves ---------------- */}
      <Section>
        <SectionIntro
          eyebrow="Réalisations"
          title="Ce que nous avons produit."
          text="Tout est tourné et monté en interne. Les chiffres affichés sont ceux relevés dans les gestionnaires de publicités."
        />
        <div className="mt-10">
          <WorkGrid items={WORKS} />
        </div>
        <LinkCards
          items={CASE_STUDIES.filter(isFilm).map((w) => ({
            to: casePath(w.slug),
            eyebrow: "Étude de cas",
            title: w.caseStudy.client,
            text: w.caseStudy.headline,
          }))}
        />
        <div className="mt-10">
          <ArrowLink to="/realisations">Toutes les réalisations</ArrowLink>
        </div>
      </Section>

      {/* ---------------- Marrakech ---------------- */}
      <Section surface>
        <SectionIntro
          eyebrow={`Basés à ${BRAND.city}`}
          title="Une agence sur place, pas un prestataire à distance."
        />
        <CardGrid
          items={[
            {
              title: "Nous tournons sur place",
              text: "À Marrakech, et dans les autres villes où nous intervenons — Casablanca, Rabat, Tanger, Agadir — sans frais de déplacement supplémentaires.",
            },
            {
              title: "Nous répondons vite",
              text: "Réponse sous 24 heures ouvrées, dans la journée sur WhatsApp. Un appel de 30 minutes se réserve en ligne.",
            },
            {
              title: "Nous travaillons en français",
              text: "Avec les standards de production auxquels nos clients sont habitués.",
            },
            {
              title: "Vous savez qui fait quoi",
              text: "Une équipe restreinte et nommée. Ceux qui vous vendent le projet sont ceux qui l'exécutent.",
            },
          ]}
        />
        <div className="mt-10">
          <ArrowLink to="/a-propos">Rencontrer l&apos;équipe</ArrowLink>
        </div>
      </Section>

      {/* ---------------- Ressources ---------------- */}
      <Section>
        <SectionIntro
          eyebrow="Ressources"
          title="Prix, budgets et méthode, expliqués."
          text="Les réponses détaillées aux questions qu'on nous pose avant de commencer."
        />
        <LinkCards
          items={ARTICLES_SORTED.slice(0, 6).map((a) => ({
            to: `/blog/${a.slug}`,
            eyebrow: a.category,
            title: a.title,
            text: a.excerpt,
          }))}
        />
        <div className="mt-10">
          <ArrowLink to="/blog">Tous les articles</ArrowLink>
        </div>
      </Section>

      {/* ---------------- FAQ ---------------- */}
      <Section surface>
        <FaqList faq={FAQ} />
      </Section>

      <FinalCTA />
    </>
  );
}
