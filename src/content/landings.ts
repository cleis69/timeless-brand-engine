import type { ServiceSlug } from "@/content/services";
import type { SectorSlug } from "@/content/sectors";

/**
 * UltraVision Agency — les pages d'offre.
 *
 * Une page de service decrit un metier (Meta Ads, generation de leads).
 * Une page d'offre repond a une demande telle qu'on la formule a un
 * moteur ou a un assistant : « une agence qui fait les videos ET les
 * publicites a Marrakech », « des leads d'acheteurs immobiliers a
 * Marrakech ». Elle assemble des services existants, sans fait nouveau.
 *
 * Ce fichier ne contient que ce qui sert a les relier au reste du site :
 * le pied de page, le sitemap, llms.txt, et les pages de service et de
 * secteur qui y menent. Le contenu de chaque page vit dans sa route.
 */

export type Landing = {
  path: string;
  /** Nom court : liens, pied de page. */
  name: string;
  /** Une phrase, reprise dans les cartes et dans llms.txt. */
  text: string;
  /** Les memes, en anglais (pied de page de la version /en). */
  nameEn: string;
  textEn: string;
  /** Pages de service qui y renvoient. */
  services: ServiceSlug[];
  /** Pages de secteur qui y renvoient. */
  sectors: SectorSlug[];
};

export const LANDINGS: Landing[] = [
  {
    path: "/agence-video-publicitaire-meta-ads-marrakech",
    name: "Vidéo publicitaire et Meta Ads",
    text: "Une seule équipe écrit, tourne et monte vos vidéos publicitaires, puis les diffuse sur Facebook et Instagram, pilotées au coût par lead.",
    nameEn: "Video ads and Meta Ads",
    textEn:
      "One team writes, shoots and edits your video ads, then runs them on Facebook and Instagram, managed on cost per lead.",
    services: ["production-video-photo", "meta-ads"],
    sectors: ["beaute-bien-etre", "restauration-hospitality"],
  },
  {
    path: "/generation-leads-immobiliers-marrakech",
    name: "Leads immobiliers",
    text: "Google Search, Meta Ads, landing page et CRM : un dispositif complet pour recevoir des demandes d'acheteurs qualifiées, au Maroc et à l'étranger.",
    nameEn: "Real estate leads",
    textEn:
      "Google Search, Meta Ads, a landing page and a CRM: a complete set-up for receiving enquiries from qualified buyers, in Morocco and abroad.",
    services: ["generation-de-leads", "google-ads"],
    sectors: ["immobilier"],
  },
  {
    path: "/marketing-hotels-riads-marrakech",
    name: "Hôtels et riads",
    text: "Vidéos des lieux, site avec réservation intégrée et publicité pour obtenir des réservations en direct, comme pour Le Petit Hôtel du Flouka.",
    nameEn: "Hotels and riads",
    textEn:
      "Videos of the property, a website with built-in booking, and advertising to win direct bookings, as for Le Petit Hôtel du Flouka.",
    services: ["creation-site-web"],
    sectors: ["restauration-hospitality"],
  },
];

export const landingsForService = (slug: ServiceSlug) =>
  LANDINGS.filter((l) => l.services.includes(slug));

export const landingsForSector = (slug: SectorSlug) =>
  LANDINGS.filter((l) => l.sectors.includes(slug));
