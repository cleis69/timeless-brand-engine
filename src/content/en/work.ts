import type { SitesEn, StatLabelsEn, WorksEn } from "./types";

/**
 * UltraVision Agency — les realisations en anglais.
 *
 * Superposition de TEXTE uniquement : videos, chiffres, dates, outils et
 * adresses restent dans work.data.ts et sites.data.ts. Un titre n'est
 * traduit que s'il est generique (« Agent immobilier ») ; un nom de
 * client reste tel quel. Les chiffres cites dans les resumes sont ceux
 * du francais, reecrits au format anglais, jamais modifies.
 */

/** Films, en anglais. Cles : slugs (work.data.ts). */
export const WORKS_EN: WorksEn = {
  "salon-coiffure": {
    title: "Hair salon",
    category: "ADVERTISING • META & TIKTOK",
    description:
      "Vertical film shot in the salon, focused on the craft and the result. Fast-paced edit for the feed.",
  },
  "agent-immobilier": {
    title: "Estate agent",
    category: "ADVERTISING • META",
    description:
      "International lead generation: filmed on location, subtitled in the language of the target market.",
  },
  cosmetique: {
    title: "Cosmetics",
    category: "ADVERTISING • META & TIKTOK",
    description:
      "Product film shot in real conditions, from application to everyday use. Vertical format, no voice-over.",
  },
  "all-in-kech": {
    category: "ADVERTISING • REAL ESTATE",
    description:
      "Tour of a triplex in Marrakech for the agency All In Kech, presented to camera. Vertical format, filmed on location.",
    caseStudy: {
      headline: "All In Kech: a triplex tour in Marrakech, filmed in vertical format.",
      seoTitle: "All In Kech: filmed property tour",
      seoDescription:
        "Case study: for the real estate agency All In Kech, UltraVision Agency filmed a triplex tour in Marrakech, presented to camera, in vertical format.",
      summary:
        "For the real estate agency All In Kech, UltraVision Agency filmed on location in Marrakech a tour of a triplex, presented to camera, in vertical format for social media and advertising.",
      location: "Marrakech",
    },
  },
  "hotel-bord-de-lac": {
    category: "FILM • HOSPITALITY",
    description:
      "Presentation film for a small hotel on the shore of Lake Lalla Takerkoust, near Marrakech: the terrace, the restaurant, the view over the lake.",
    caseStudy: {
      headline:
        "Le Petit Hôtel du Flouka: a lakeside hotel, filmed from the terrace to the restaurant.",
      seoTitle: "Le Petit Hôtel du Flouka: hotel film",
      seoDescription:
        "Case study: for Le Petit Hôtel du Flouka, at Lake Lalla Takerkoust near Marrakech, UltraVision Agency shot and edited a presentation film of the hotel.",
      summary:
        "For Le Petit Hôtel du Flouka, a small hotel on the shore of Lake Lalla Takerkoust, around thirty kilometres from Marrakech, UltraVision Agency shot and edited a presentation film: the terrace facing the lake, the restaurant and the atmosphere of the place.",
      location: "Lake Lalla Takerkoust, near Marrakech",
    },
  },
  "barber-shop": {
    title: "Barber shop",
    category: "ADVERTISING • META & TIKTOK",
    description:
      "Mood film shot in the shop, warm light and close-ups on the craft. Designed for local awareness.",
  },
  "promoteur-immobilier": {
    title: "Property developer",
    category: "ADVERTISING • META",
    description:
      "Presentation of a villa development still under construction, aimed at an overseas market.",
  },
  "institut-beaute": {
    title: "Beauty salon",
    category: "ADVERTISING • META & TIKTOK",
    description:
      "Guided tour of the salon, from the chair to the treatment room. The place is the subject, not the pitch.",
  },
  loisirs: {
    title: "Leisure & sport",
    category: "ADVERTISING • META & TIKTOK",
    description:
      "Film shot by day and by night to show both sides of the venue. The hook is the entry price.",
  },
  "residence-neuve": {
    title: "New residence",
    category: "ADVERTISING • META",
    description:
      "Launch of a residence: the shared spaces, the shops, the neighbourhood. A way of life before a floor plan.",
  },
  "sculpt-body-marrakech": {
    category: "ADVERTISING",
    description: "Conversion-focused ad creative, designed to feed a complete acquisition funnel.",
    caseStudy: {
      headline: "Sculpt Body Marrakech: an ad creative built to feed an acquisition funnel.",
      seoTitle: "Sculpt Body Marrakech: video advertising",
      seoDescription:
        "Sculpt Body Marrakech case study: a conversion-focused ad creative produced by UltraVision Agency. 890,000 views, €2.10 per lead, +52% conversions.",
      summary:
        "For Sculpt Body Marrakech, UltraVision Agency produced a conversion-focused ad creative, designed to feed a complete acquisition funnel. Results recorded in the ads managers: 890,000 views, a cost per lead of €2.10 and +52% conversions.",
    },
  },
  "shams-immo": {
    category: "ADVERTISING • REAL ESTATE",
    description:
      "Vertical ad film for Shams Immo, on new-build property in Marrakech. Filmed on location, presented to camera, in French.",
  },
  azwaj: {
    category: "ADVERTISING • MOBILE APP",
    description:
      "Vertical video ad for Azwaj, an iOS app of daily reminders for couples. A slice-of-life scene, in French.",
  },
  "africa-beauty": {
    category: "ADVERTISING • META & TIKTOK",
    description:
      "Ad campaign with an 80s look, shot and edited in-house. Vertical format designed for the feed.",
    caseStudy: {
      headline: "Africa Beauty: a video campaign with an 80s look.",
      seoTitle: "Africa Beauty: Meta and TikTok video campaign",
      seoDescription:
        "Africa Beauty case study: a vertical video campaign shot and edited by UltraVision Agency. 1.4 million views, 4.2% click-through rate, +38% sales.",
      summary:
        "For Africa Beauty, UltraVision Agency shot and edited in-house a vertical ad campaign with an 80s look, designed for the Instagram, Facebook and TikTok feeds. Results recorded in the ads managers: 1.4 million views, a 4.2% click-through rate and +38% sales.",
    },
  },
};

/** Sites livres, en anglais. Cles : slugs (sites.data.ts). */
export const SITES_EN: SitesEn = {
  "ideal-contemporain": {
    category: "E-COMMERCE • FURNITURE",
    description:
      "Shop for bespoke contemporary furniture in Marrakech. Catalogue, product pages and quote requests.",
    tags: ["Catalogue", "Bespoke", "Quotes"],
  },
  "raphael-anglesy": {
    category: "SHOWCASE SITE • PRIVATE CHEF",
    description:
      "Showcase site for a chef, built in seven chapters: career, private services, menu design and GM Box, with direct booking.",
    tags: ["Chapters", "Services", "Booking"],
  },
  "koozina-garden": {
    category: "SHOWCASE SITE • RESTAURANT & SHOP",
    description:
      "Restaurant and shop in Essaouira: the menu, the garden, the shop and events on a bilingual site, with built-in booking.",
    tags: ["Bilingual", "Shop", "Booking"],
  },
  rev: {
    category: "REDESIGN • REAL ESTATE",
    description:
      "Bilingual site for a real estate growth agency, and an interactive sales plan that developers can publish for their projects.",
    tags: ["Bilingual", "Sales plan", "360° tour"],
    caseStudy: {
      headline:
        "Redesign of REV — Real Estate Vision: a bilingual site and an interactive sales plan for developers.",
      seoTitle: "REV: site redesign and interactive sales plan",
      seoDescription:
        "Redesign of the site of REV, a real estate growth agency, in French and English, and an interactive sales plan for developers: units, 360° tours, 3D views.",
      summary:
        "For REV — Real Estate Vision, a real estate growth agency that works with developers, agencies and agents, UltraVision Agency redesigned the site realestatevision360.com, in French and English, then built an interactive sales plan that developers can publish and embed in their own site.",
      execution:
        "Showcase site in French and English: a home page where an iPhone scrolls through a catalogue of twenty-one vertical ads, portfolio, expertise, pricing, about, articles and contact by WhatsApp. Pages pre-rendered and served by a Cloudflare Worker, videos loaded as they approach the screen, self-hosted fonts, structured data. Interactive sales plan for developers: private area, units editable or imported from CSV, public page with statuses updated in real time, unit sheets, comparison tool, neighbourhood map, 3D views and 360° tours, presentation mode for the sales office and an embeddable version; public pages in French and English.",
    },
  },
  "find-estate": {
    category: "REDESIGN • CONCIERGE SERVICE",
    description:
      "Short-term rental concierge service in France and Dubai: owner pages, revenue estimator and enquiries sent straight to the concierge team.",
    tags: ["Redesign", "Estimator", "Forms"],
    caseStudy: {
      headline:
        "Redesign of Find Estate: the site of a short-term rental concierge service, from Lyon to Dubai.",
      seoTitle: "Find Estate: concierge website redesign",
      seoDescription:
        "Redesign of the site of Find Estate, a short-term rental concierge service in France and Dubai: revenue estimator, forms and page-by-page SEO.",
      summary:
        "For Find Estate, a short-term rental concierge service founded in Lyon in 2023 and operating in France and Dubai, UltraVision Agency built and launched a new 22-page site at find-estate.com: pages for owners, a five-step revenue estimator, forms connected to the concierge team and page-by-page SEO.",
      execution:
        "Twenty-two pages: plans for owners, a five-step revenue estimator with sourced market benchmarks, destinations, properties, reviews and contact. Every enquiry is recorded and sent by email to the concierge team, with explicit consent. Legal notice and privacy policy written for the site, self-hosted fonts. Visual redesign based on a mock-up: Cormorant Garamond and Jost, square corners; black and gold palette. Photos: those from the concierge service's Airbnb listings, selected and ordered for the site. Airbnb ratings are shown with their number of reviews, and dated on the property pages and the Reviews page.",
      location: "Lyon, Paris and Dubai",
    },
  },
  "squid-wok": {
    category: "WEBSITE • RESTAURANT",
    description:
      "Wok restaurant in Marrakech: the full menu, a basket that sends the order on WhatsApp, Glovo delivery, then search optimisation and the Google listing.",
    tags: ["WhatsApp ordering", "SEO", "Google listing"],
    caseStudy: {
      headline:
        "Squid Wok: the site of a wok restaurant in Marrakech, from the menu to ordering on WhatsApp.",
      seoTitle: "Squid Wok: restaurant website and SEO",
      seoDescription:
        "Site of Squid Wok, an Asian restaurant in Marrakech: full menu, a basket linked to WhatsApp, Glovo delivery, local SEO and a Google Business Profile.",
      summary:
        "For Squid Wok, an Asian restaurant in Marrakech (stir-fried noodles, pad thai, satay wok, to eat in, take away or delivered), UltraVision Agency designed and launched the site squidwok.com, then took on its search optimisation and its Google Business Profile.",
      execution:
        "A one-page site built for mobile: the full menu by category, chicken, beef and prawn set menus, and a basket that sends the order on WhatsApp at menu prices. Call, WhatsApp and Glovo delivery buttons always in view, a direct ordering page, opening hours and directions. Local SEO: restaurant structured data with address and opening hours, and a Google Business Profile created and linked to the site.",
      location: "Marrakech",
    },
  },
  "insider-properties": {
    category: "WEBSITE • NEW-BUILD PROPERTY",
    description:
      "Bilingual site for an off-plan buying agency in Marrakech: a selection of developments, a Marrakech page and three calculators.",
    tags: ["Bilingual", "Calculators", "Off-plan"],
    caseStudy: {
      headline:
        "INSIDER Properties: the site of an off-plan buying agency in Marrakech, in French and English.",
      seoTitle: "INSIDER Properties: off-plan property site",
      seoDescription:
        "Bilingual site of INSIDER Properties, an off-plan buying agency in Marrakech: selected developments and calculators for payments, mortgages and yield.",
      summary:
        "For INSIDER Properties, a real estate agency in Marrakech that guides buyers of off-plan developments from selection to handover of the keys, UltraVision Agency designed and launched the site insider-properties.com, in French and English.",
      execution:
        "Twenty pages published, ten in each language: home, Marrakech page, a selection of developments with the documents in their file and what remains to be confirmed, and three calculators. The first works out the payments, from reservation to handover of the keys; the second, financing through a conventional mortgage, Murabaha or Ijara, purchase costs included; the third, gross, net and after-tax rental yield. Prices are in dirhams, dated and attributed to their developer. Pages pre-rendered and served by Cloudflare, structured data and an llms.txt summary for AI assistants.",
      location: "Marrakech",
    },
  },
};

/** Libelles des chiffres. */
export const STAT_LABELS_EN: StatLabelsEn = {
  VUES: "VIEWS",
  "TAUX DE CLIC": "CLICK-THROUGH RATE",
  "COUT PAR LEAD": "COST PER LEAD",
  LEADS: "LEADS",
  VISITES: "VIEWINGS",
  CONTACTS: "CONTACTS",
  "RENDEZ-VOUS": "APPOINTMENTS",
  VENTES: "SALES",
  CONVERSIONS: "CONVERSIONS",
  RESERVATIONS: "BOOKINGS",
  INSTALLATIONS: "INSTALLS",
};
