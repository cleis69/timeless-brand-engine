import { LAUNCH_OFFER, PACKS, formatDirham, formatEuro, withOffer } from "@/config/pricing";
import type { CarteEn, CarteGroupsEn, PacksEn } from "./types";

/*
  Les montants cites dans les textes sont lus dans pricing.ts, jamais
  tapes : si un prix change la-bas, la phrase anglaise suit.
*/
const packPrice = (id: string) => {
  const p = PACKS.find((x) => x.id === id);
  if (!p) throw new Error(`[pricing EN] Formule introuvable dans pricing.ts : ${id}`);
  return p.price;
};

/** Prix d'une video dans une formule a 4 videos, arrondi vers le bas comme en francais (372, 622). */
const perVideo = (id: string) => formatEuro(Math.round(withOffer(packPrice(id)) / 4), "en");

/** Les formules, en anglais. Cles : id (pricing.ts). */
export const PACKS_EN: PacksEn = {
  essai: {
    name: "Trial",
    forWho: "To judge the work for yourself before committing.",
    commitment: "No commitment",
    delay: "Delivered in 7 days",
    features: [
      "1 video ad",
      "Angle and script writing",
      "Filming and editing",
      "Vertical formats for Reels, Stories and Ads",
      "14 days of managed distribution",
      "Performance report at 14 days",
    ],
    cta: "Order a trial",
  },
  production: {
    name: "Production",
    forWho: "To keep one platform supplied with fresh content.",
    period: "/ month",
    commitment: "No commitment",
    features: [
      "4 video ads per month",
      "4 angles tested: proof, emotion, offer, urgency",
      "Managed distribution on one platform",
      "Weekly campaign optimisation",
      "Monthly report with commentary",
      "A single point of contact",
    ],
    equivalent: `that's ${perVideo("production")} per video, distribution included`,
    cta: "Start production",
  },
  acquisition: {
    name: "Acquisition",
    forWho: "To build a machine that books appointments.",
    period: "/ month",
    commitment: "3-month commitment",
    features: [
      "4 video ads per month",
      "Multichannel distribution: Meta, Google and TikTok",
      "Full set-up of ad accounts and tracking",
      "Lead automation into your CRM",
      "Weekly optimisation and budget allocation",
      "Monthly report and review with management",
    ],
    equivalent: `that's ${perVideo("acquisition")} per video, distribution and funnel included`,
    bonus: "Conversion landing page included free",
    cta: "Book a call",
  },
};

/** Les prestations a l'unite. Cles : libelle francais. */
export const CARTE_EN: CarteEn = {
  "Vidéo publicitaire": {
    label: "Video ad",
    detail: "Angle, script, filming, editing, vertical formats.",
  },
  "Vidéo supplémentaire dans un pack": {
    label: "Extra video in a plan",
    detail: "Beyond the 4 monthly videos included.",
  },
  "Série photo": {
    label: "Photo series",
    detail: "A half-day shoot, 20 retouched images.",
  },
  "Épisode de podcast": {
    label: "Podcast episode",
    detail: "Studio set, two to three cameras, editing, graphics, vertical clips.",
  },
  "Vlog format long": {
    label: "Long-form vlog",
    detail: "One day of filming, narrative edit, 8 to 12 minutes.",
  },
  "Landing page de conversion": {
    label: "Conversion landing page",
    detail: "A page dedicated to one offer, designed around the form.",
  },
  "Site vitrine": {
    label: "Showcase website",
    detail: "Up to 5 pages, responsive, optimised for speed.",
  },
  "Référencement technique": {
    label: "Technical SEO",
    detail: "Structure, tags, structured data, Search Console.",
  },
  "Suivi SEO mensuel": {
    label: "Monthly SEO",
    detail: "Keywords, content, link building, ranking report.",
    unit: "/ month",
  },
  "Visibilité sur les IA (GEO)": {
    label: "AI search visibility (GEO)",
    detail: "Being cited by ChatGPT, Perplexity and Google's AI Overviews.",
  },
  "Identité visuelle": {
    label: "Visual identity",
    detail: "Logo, colour palette, typefaces, usage guidelines.",
  },
  "Positionnement & message": {
    label: "Positioning & messaging",
    detail: "Framing the offer, angles, key messages.",
  },
  "Ouverture des comptes publicitaires": {
    label: "Ad account set-up",
    detail: "Meta, Google, TikTok: accounts, pixels, conversions.",
  },
  "CRM et automatisation des leads": {
    label: "CRM and lead automation",
    detail: "Pipeline, forms, notifications, follow-ups.",
  },
  "Media buying": {
    label: "Media buying",
    detail: "Monthly management of your campaigns, with your videos.",
    unit: "/ month / platform",
  },
  "Community management": {
    label: "Community management",
    detail: "Editorial line, calendar, publishing, moderation.",
    unit: "/ month",
  },
};

export const CARTE_GROUPS_EN: CarteGroupsEn = {
  Production: "Production",
  "Contenu long": "Long-form content",
  "Web & conversion": "Web & conversion",
  Marque: "Brand",
  "Acquisition & outils": "Acquisition & tools",
};

/** Ce qui n'est jamais compris, dans l'ordre de NOT_INCLUDED. */
export const NOT_INCLUDED_EN: { label: string; detail: string }[] = [
  {
    label: "The advertising budget",
    detail: `It is paid directly to the platforms, never through us. Allow ${formatEuro(800, "en")} to ${formatEuro(1500, "en")} per month (about ${formatDirham(800, "en")} to ${formatDirham(1500, "en")}) to get started.`,
  },
  {
    label: "External talent and locations",
    detail: "Actors, models, extras, paid filming locations.",
  },
  {
    label: "Software subscriptions",
    detail: "CRM, automation tools, hosting if you switch providers.",
  },
  {
    label: "Replying to enquiries",
    detail:
      "We generate the enquiries and bring them together in one place. Sales follow-up stays with you.",
  },
];

/** Le bloc « au-dela de ces formules ». Vide = repli sur le francais. */
export const CUSTOM_EN: { title: string; text: string; points: string[]; cta: string } | null = {
  title: "Beyond these plans",
  text: "Entering a new market, launching a product, a six-month programme, large filming volumes: these projects fit no box, and it would be dishonest to price them before understanding the problem.",
  points: [
    "A first 30-minute conversation, with no commitment",
    "A proposal priced line by line within 5 days",
    "A fixed price, with no revision during the project",
  ],
  cta: "Request a proposal",
};

export const LAUNCH_OFFER_EN = {
  badge: `-${LAUNCH_OFFER.percent}% on your first order`,
  until: "Launch offer, valid until 31 December 2026.",
};

export const MAD_NOTE_EN =
  "converted at the current commercial rate; the euro amount on the quote is binding";
