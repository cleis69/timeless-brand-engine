import { A_LA_CARTE, PACKS, formatDirham, formatEuro } from "@/config/pricing";
import type { PolesEn, ServicesEn } from "./types";

/*
  LES PRIX CITES DANS LES TEXTES — memes helpers que services.ts.

  Lus dans pricing.ts au chargement, par le libelle FRANCAIS : si un prix
  change la-bas, les phrases anglaises qui le citent changent avec lui.
*/

const carte = (label: string) => {
  for (const g of A_LA_CARTE) {
    const it = g.items.find((i) => i.label === label);
    if (it) return it.price;
  }
  throw new Error(`[services EN] Prestation introuvable dans pricing.ts : ${label}`);
};

const pack = (id: string) => {
  const p = PACKS.find((x) => x.id === id);
  if (!p) throw new Error(`[services EN] Formule introuvable dans pricing.ts : ${id}`);
  return p.price;
};

/** « MAD 4,300 (≈ €390) » */
const both = (eur: number) => `${formatDirham(eur, "en")} (≈ ${formatEuro(eur, "en")})`;

const VIDEO = carte("Vidéo publicitaire");
const PHOTO = carte("Série photo");
const MEDIA = carte("Media buying");
const COMPTES = carte("Ouverture des comptes publicitaires");
const LANDING = carte("Landing page de conversion");
const VITRINE = carte("Site vitrine");
const SEO_TECH = carte("Référencement technique");
const IDENTITE = carte("Identité visuelle");
const POSITION = carte("Positionnement & message");
const CRM = carte("CRM et automatisation des leads");
const ESSAI = pack("essai");
const ACQUISITION = pack("acquisition");

/** Budget publicitaire de depart, tel qu'annonce sur /tarifs. */
const AD_BUDGET = `${formatDirham(800, "en")} to ${formatDirham(1500, "en")} per month (${formatEuro(800, "en")} to ${formatEuro(1500, "en")})`;

/** Les huit services, en anglais. Cles : slugs francais (identifiants). */
export const SERVICES_EN: ServicesEn = {
  /* ---------------------------------------------------------------- 01 */
  "production-video-photo": {
    name: "Video & photo production",
    serviceType: "Video ad production and photography",
    title: "Video ad and photo production in Marrakech",
    description:
      "Vertical video ads, photo series and written content, filmed and edited in-house by UltraVision Agency in Marrakech. Your first video delivered in 7 days.",
    eyebrow: "Video & photo production",
    h1: "Video ads and photos made to sell, not just to please.",
    accent: "made to sell",
    intro:
      "Video and photo production is UltraVision Agency's core business. We find the sales angle, write the script, film on location — in Marrakech and in the other cities where we work — then edit vertical formats ready for Instagram, Facebook, TikTok and YouTube Shorts. Everything is produced in-house, from writing to the final cut.",
    includes: [
      "Finding the sales angle and writing the script",
      "On-location filming: art direction, lighting, extras",
      "Editing, subtitles and on-screen graphics",
      "Vertical formats for Reels, Stories, TikTok and ads",
      "Variations to test several hooks",
      "Photo series: a half-day shoot, 20 retouched images",
      "Long-form content: podcast episodes and vlogs",
      "Community management: editorial line, calendar, publishing, moderation",
    ],
    useCases: [
      {
        title: "Launching an ad campaign",
        text: "One video per sales angle, delivered with its variations, so you quickly learn what triggers enquiries.",
      },
      {
        title: "Feeding your social channels every month",
        text: "Four videos a month: the pace that lets you replace a hook before it wears out.",
      },
      {
        title: "Showing a place or a product",
        text: "A property, a beauty salon, a restaurant: the place becomes the subject, filmed for a phone screen.",
      },
      {
        title: "Building a brand presence",
        text: "Photo series, podcasts and vlogs for the content that builds trust over time.",
      },
    ],
    process: [
      {
        title: "The angle",
        text: "We find what makes your customers buy, then write it as a short script: a hook, a proof, an offer.",
      },
      {
        title: "The shoot",
        text: "A small crew films on location, vertical from the first shot: the frame is composed for the phone, not cropped afterwards.",
      },
      {
        title: "The edit",
        text: "Pacing, subtitles, graphics. AI helps us sort footage and draft subtitles; the angle, the faces and the final cut remain human.",
      },
      {
        title: "Distribution",
        text: "Videos are delivered ready for Meta, TikTok and Google. We can also manage their distribution and tell you which one sells.",
      },
    ],
    faq: [
      {
        q: "How much does a video ad cost at UltraVision Agency?",
        a: `A video ad costs ${both(VIDEO)} per video: angle, script, filming, editing and vertical formats. The trial at ${both(ESSAI)} includes the video and 14 days of managed distribution. Full details are published on the pricing page.`,
      },
      {
        q: "How long does it take to deliver a video?",
        a: "Seven days for a video ad, from approval of the angle to delivery of the vertical formats.",
      },
      {
        q: "Do you film outside Marrakech?",
        a: "Yes. We film in Marrakech, Casablanca, Rabat, Tangier and Agadir, with no extra travel costs.",
      },
      {
        q: "Are actors and locations included?",
        a: "No. Actors, models, extras and paid filming locations are quoted separately, before the shoot.",
      },
      {
        q: "How much does a photo shoot cost?",
        a: `A photo series costs ${both(PHOTO)}: a half-day shoot and 20 retouched images.`,
      },
    ],
  },

  /* ---------------------------------------------------------------- 02 */
  "meta-ads": {
    name: "Meta Ads",
    serviceType: "Meta Ads campaign management (Facebook and Instagram)",
    title: "Meta Ads agency in Marrakech",
    description:
      "Facebook and Instagram campaigns managed on cost per lead by UltraVision Agency in Marrakech: videos produced in-house, accounts in your name, monthly report.",
    eyebrow: "Meta Ads — Facebook & Instagram",
    h1: "Meta Ads campaigns managed on cost per lead, not per click.",
    accent: "on cost per lead",
    intro:
      "Meta Ads is the advertising platform for Facebook and Instagram. UltraVision Agency runs the videos it produces itself, structures your ad accounts and conversions, then reallocates budgets every week to bring down the cost per lead and per appointment. The agency is based in Marrakech and runs campaigns for businesses established in Morocco, including those selling to customers abroad.",
    includes: [
      "Opening or taking over the ad account, pixel and conversions",
      "Campaigns structured by funnel stage: awareness, proof, offer",
      "Distribution of your videos, in several hook variations",
      "Creative testing and budget allocation every week",
      "Tracking of cost per lead and per appointment",
      "Monthly report with commentary",
    ],
    useCases: [
      {
        title: "Generating appointment requests",
        text: "Lead form or landing page: every enquiry lands in your CRM, with its source.",
      },
      {
        title: "Reaching customers abroad",
        text: "Particularly for real estate: targeting a foreign market, with subtitles in the target language.",
      },
      {
        title: "Making a venue known",
        text: "Salon, beauty clinic, leisure venue: a local audience and a hook built on the offer.",
      },
      {
        title: "Retargeting people who have already watched",
        text: "People who watched your videos are shown the proof, then the offer.",
      },
    ],
    process: [
      {
        title: "Audit and set-up",
        text: "Accounts, pixel, conversion events: we check what is being measured before spending anything.",
      },
      {
        title: "Videos and hooks",
        text: "Four angles tested side by side: proof, emotion, offer, urgency.",
      },
      {
        title: "Launch and testing",
        text: "Budget moves towards the creatives that produce enquiries, not likes.",
      },
      {
        title: "Management",
        text: "Weekly optimisation, budget allocation and a monthly report with commentary.",
      },
    ],
    faq: [
      {
        q: "What advertising budget should I plan for on Meta?",
        a: `Allow ${AD_BUDGET} to get started, depending on your sector. This budget is paid directly to Meta from your account: it is never included in our fees.`,
      },
      {
        q: "How much does Meta Ads campaign management cost?",
        a: `Management is billed at ${both(MEDIA)} per month per platform. The Production and Acquisition plans include it, along with the videos.`,
      },
      {
        q: "Is the ad account in my name?",
        a: "Yes. Ad accounts are opened in your name, with full admin access. If we stop working together, you leave with everything.",
      },
      {
        q: "How do you measure results?",
        a: "On cost per lead and per appointment, not per click. A dashboard links spend, leads and appointments, and we comment on it every month.",
      },
    ],
  },

  /* ---------------------------------------------------------------- 03 */
  "google-ads": {
    name: "Google Ads",
    serviceType: "Google Ads campaign management",
    title: "Google Ads agency in Marrakech",
    description:
      "Google Ads campaigns to capture people already searching for your service: account structure, conversion tracking and cost-per-lead management, from Marrakech.",
    eyebrow: "Google Ads — existing demand",
    h1: "Google Ads: be found at the moment people search for you.",
    accent: "at the moment people search for you",
    intro:
      "Google Ads puts you at the top of the results when someone is already searching for what you sell. Where Meta and TikTok create demand with video, Google captures it at the moment of the search. UltraVision Agency structures your campaigns, sets up conversion tracking and manages bids on cost per lead, alongside your video campaigns.",
    includes: [
      "Opening or taking over the Google Ads account and conversion tracking",
      "Choosing which searches to buy, and which to exclude",
      "Ad copywriting",
      "A dedicated landing page when the offer calls for one",
      "Bid and budget allocation every week",
      "Monthly report with commentary",
    ],
    useCases: [
      {
        title: "A service people search for on Google",
        text: "When your customers type a specific request, your ad appears at the right moment.",
      },
      {
        title: "Complementing a video campaign",
        text: "People reached by your videos often end up searching for your name: Google secures that last click.",
      },
      {
        title: "Knowing what pays",
        text: "Every form and every contact is attributed to the search that produced it.",
      },
    ],
    process: [
      {
        title: "Demand",
        text: "We list what your customers actually type, and what is not worth paying for.",
      },
      {
        title: "Structure and tracking",
        text: "Account, conversions, landing page: everything needed to measure.",
      },
      {
        title: "Launch",
        text: "Ads, bids and budgets calibrated to the target cost per lead.",
      },
      {
        title: "Management",
        text: "Weekly optimisation and a monthly report with commentary.",
      },
    ],
    faq: [
      {
        q: "Google Ads or Meta Ads: which should I choose?",
        a: "They do different jobs. Google captures demand that already exists; Meta and TikTok create it with video. The Acquisition plan combines all three to cover the whole customer journey.",
      },
      {
        q: "How much does Google Ads management cost?",
        a: `${both(MEDIA)} per month, excluding the advertising budget paid to Google. Setting up the account and conversion tracking costs ${both(COMPTES)}.`,
      },
      {
        q: "Do I need a landing page?",
        a: `Often, yes: a page dedicated to one offer converts better than a general homepage. We build it in 5 days, for ${both(LANDING)}.`,
      },
    ],
  },

  /* ---------------------------------------------------------------- 04 */
  "tiktok-ads": {
    name: "TikTok Ads",
    serviceType: "TikTok Ads campaign management",
    title: "TikTok Ads agency in Marrakech",
    description:
      "TikTok ads shot for the vertical format and managed by UltraVision Agency in Marrakech: tested hooks, distribution and tracking of the cost per result.",
    eyebrow: "TikTok Ads",
    h1: "TikTok Ads: videos shot for the feed, not cropped to fit it.",
    accent: "shot for the feed",
    intro:
      "TikTok rewards videos that look like content, not like advertising. UltraVision Agency films vertically from the start, writes hooks designed for the first few seconds and manages distribution on TikTok Ads, often alongside Meta.",
    includes: [
      "Setting up the TikTok Ads account, pixel and conversions",
      "Vertical videos shot for TikTok, with subtitles",
      "Several hooks tested side by side",
      "Weekly budget management",
      "Refreshing videos before they wear out",
      "Monthly report with commentary",
    ],
    useCases: [
      {
        title: "Showing a product in a few seconds",
        text: "Beauty, cosmetics, hairdressing, leisure: the trades where the result is visible straight away.",
      },
      {
        title: "Testing hooks",
        text: "Every video comes in several variations; the ones that hold attention get the budget.",
      },
      {
        title: "Extending a Meta campaign",
        text: "The same angles, adapted to TikTok's codes, to widen the audience.",
      },
    ],
    process: [
      {
        title: "The hooks",
        text: "The first three seconds decide everything: we write several.",
      },
      {
        title: "Vertical filming",
        text: "Framing, pacing and on-screen text designed for the phone from the first shot.",
      },
      {
        title: "Launch and testing",
        text: "Several videos run side by side; the budget follows those that deliver results.",
      },
      {
        title: "Refreshing",
        text: "A hook wears out in a few weeks: we replace it before costs start to climb.",
      },
    ],
    faq: [
      {
        q: "Do I need different videos for TikTok?",
        a: "Ideally, yes: TikTok favours videos with the platform's own pacing and codes. We film vertically from the first shot and adapt the hook to TikTok.",
      },
      {
        q: "How much does TikTok Ads management cost?",
        a: `${both(MEDIA)} per month, excluding the advertising budget paid to TikTok.`,
      },
      {
        q: "How many videos do I need per month?",
        a: "Four, to test several hooks and replace those that wear out. That is the pace of the Production plan.",
      },
    ],
  },

  /* ---------------------------------------------------------------- 05 */
  "generation-de-leads": {
    name: "Lead generation",
    serviceType: "Lead generation and customer acquisition",
    title: "Lead generation in Marrakech",
    description:
      "A complete system to generate qualified enquiries: videos, Meta, Google and TikTok campaigns, landing page and CRM. Designed and managed by UltraVision Agency.",
    eyebrow: "Lead generation",
    h1: "An appointment machine, from the video to the CRM.",
    accent: "from the video to the CRM",
    intro:
      "Lead generation means turning attention into qualified contact requests. At UltraVision Agency, it is a complete system: videos that stop the scroll, campaigns on Meta, Google and TikTok, a page that converts and a CRM that lets no enquiry slip through. We generate the enquiries and bring them together in one place; sales follow-up stays with you.",
    includes: [
      "Video ads for every stage of the funnel",
      "Meta, Google and TikTok campaigns",
      "A conversion landing page dedicated to the offer",
      "Forms, notifications and automatic follow-ups",
      "CRM: pipeline and a single place for all enquiries",
      "Dashboard: spend, leads, appointments",
    ],
    useCases: [
      {
        title: "Real estate",
        text: "Reaching buyers, including abroad, for a property, an agency or a development.",
      },
      {
        title: "Appointment-based services",
        text: "Beauty salons, hair salons, practices: every enquiry becomes a slot in the diary.",
      },
      {
        title: "Launching an offer",
        text: "One page, one offer, one campaign: you quickly find out whether the market responds.",
      },
    ],
    process: [
      {
        title: "The offer",
        text: "What we promise, to whom, and what proves it is true.",
      },
      {
        title: "Content and campaigns",
        text: "Videos for every stage of the funnel, shown where your customers are.",
      },
      {
        title: "The page and the CRM",
        text: "A page designed around the form, and every enquiry filed, notified and followed up.",
      },
      {
        title: "Management",
        text: "Weekly allocation on cost per appointment, monthly review with management.",
      },
    ],
    faq: [
      {
        q: "What is a qualified lead?",
        a: "A contact request from someone who matches your target customer and your offer — not just a click or a new follower. We manage campaigns on that basis.",
      },
      {
        q: "Who replies to the enquiries generated?",
        a: "You do. We generate the enquiries and bring them together in your CRM; the sales response stays with you.",
      },
      {
        q: "How much does a complete set-up cost?",
        a: `The Acquisition plan costs ${both(ACQUISITION)} per month, with a 3-month commitment: four videos a month, distribution on Meta, Google and TikTok, CRM, and a landing page included free.`,
      },
      {
        q: "Is the advertising budget included?",
        a: `No, never. It is paid directly to the platforms from your account. Allow ${AD_BUDGET} to get started.`,
      },
    ],
  },

  /* ---------------------------------------------------------------- 06 */
  "creation-site-web": {
    name: "Websites & applications",
    serviceType: "Website, landing page and web application development",
    title: "Website design in Marrakech",
    description:
      "Fast showcase websites, landing pages and web apps built for conversion, optimised for Google and readable by AI assistants. By UltraVision Agency in Marrakech.",
    eyebrow: "Websites & applications",
    h1: "Fast, understated websites designed for conversion.",
    accent: "designed for conversion",
    intro:
      "UltraVision Agency designs showcase websites, landing pages and web applications for businesses that want to turn visits into enquiries. Every site is built for speed, designed for the phone first, optimised for Google and structured to be understood by AI assistants such as ChatGPT and Perplexity.",
    includes: [
      "Conversion landing pages, each dedicated to one offer",
      "Showcase websites of up to 5 pages, responsive and optimised for speed",
      "Web applications: bookings, appointment scheduling, advanced forms",
      "Technical SEO: structure, tags, structured data, Search Console",
      "Monthly SEO and AI search visibility (GEO)",
      "CRM connection, conversion tracking and dashboards",
    ],
    useCases: [
      {
        title: "Receiving enquiries",
        text: "One landing page per offer, connected to your campaigns and your CRM.",
      },
      {
        title: "Presenting a high-end business",
        text: "A showcase site that tells a story, like those of a chef or a bespoke furniture showroom.",
      },
      {
        title: "Booking online",
        text: "Bookings built into the site, for a restaurant or a private service.",
      },
      {
        title: "Being cited by AI",
        text: "A structure and content designed for ChatGPT, Perplexity and Google's AI Overviews.",
      },
    ],
    process: [
      {
        title: "Scoping",
        text: "What the site needs to achieve — a call, a booking, a quote — and for whom.",
      },
      {
        title: "Design and content",
        text: "Copy, photos and videos planned together, before the first line of code.",
      },
      {
        title: "Development",
        text: "A fast site, easy to read on a phone and easy for search engines to read.",
      },
      {
        title: "Launch and follow-up",
        text: "Search Console, conversion tracking, then measured improvements.",
      },
    ],
    faq: [
      {
        q: "How much does a showcase website cost?",
        a: `From ${both(VITRINE)} for a site of up to 5 pages. A conversion landing page costs ${both(LANDING)}.`,
      },
      {
        q: "What are the timescales?",
        a: "Five days for a landing page, three weeks for a showcase website.",
      },
      {
        q: "Is SEO included?",
        a: `Technical SEO is a separate service, at ${both(SEO_TECH)}: structure, tags, structured data and Search Console. Monthly SEO and AI search visibility are offered separately.`,
      },
    ],
  },

  /* ---------------------------------------------------------------- 07 */
  branding: {
    name: "Branding & identity",
    serviceType: "Branding, visual identity and positioning",
    title: "Branding and visual identity in Marrakech",
    description:
      "Positioning, key messages, logo and visual identity, art direction: a brand that reads in three seconds and is ready for advertising. By UltraVision Agency.",
    eyebrow: "Branding & identity",
    h1: "A brand that reads in three seconds and makes something happen.",
    accent: "makes something happen",
    intro:
      "For UltraVision Agency, an identity does not live in a brand guidelines document: it lives in whatever carries it out into the world. Branding covers positioning, key messages, visual identity and art direction — designed from the outset for video, social media and advertising.",
    includes: [
      "Positioning and framing the offer",
      "Angles and key messages",
      "Logo and visual identity: colour palette, typefaces, usage guidelines",
      "Photo and video art direction",
      "Motion design",
    ],
    useCases: [
      {
        title: "Launching a brand",
        text: "A name that already exists, an offer to clarify: we set out what the brand promises and how it shows itself.",
      },
      {
        title: "Repositioning an offer",
        text: "When the message no longer matches what you sell, or who you sell it to.",
      },
      {
        title: "Preparing a campaign",
        text: "Before filming: knowing what to say, to whom, and how to show it.",
      },
    ],
    process: [
      {
        title: "Listening",
        text: "Your offer, your customers, your competitors, and what you cannot say.",
      },
      {
        title: "Positioning",
        text: "A promise, angles and key messages, written down in black and white.",
      },
      {
        title: "Identity",
        text: "Logo, colour palette, typefaces and usage guidelines, tested on real formats.",
      },
      {
        title: "Putting it into circulation",
        text: "The brand carries through the videos, social media, the website and the ads.",
      },
    ],
    faq: [
      {
        q: "How much does a visual identity cost?",
        a: `${both(IDENTITE)} for the logo, colour palette, typefaces and usage guidelines. Positioning and key messages cost ${both(POSITION)}.`,
      },
      {
        q: "Why link the brand to advertising?",
        a: "Because a brand is judged by what it makes happen. We build image and performance together, never in two silos.",
      },
      {
        q: "Who leads the art direction?",
        a: "Julien, the agency's art director: a photographer and videographer for more than ten years, and an interior architect by training.",
      },
    ],
  },

  /* ---------------------------------------------------------------- 08 */
  "crm-ia-automatisation": {
    name: "CRM, AI & automation",
    serviceType: "CRM integration, artificial intelligence and sales automation",
    title: "CRM, AI and automation in Marrakech",
    description:
      "CRM set-up, lead and follow-up automation, AI agents and dashboards: no enquiry lost between the click and the call. By UltraVision Agency in Marrakech.",
    eyebrow: "CRM, AI & automation",
    h1: "No enquiry lost between the click and the call.",
    accent: "between the click and the call",
    intro:
      "A campaign that generates enquiries is pointless if they get lost. UltraVision Agency sets up or connects your CRM, automates incoming leads, notifications and follow-ups, and introduces artificial intelligence tools where they save time without harming your relationship with your customers.",
    includes: [
      "Setting up or connecting the CRM: pipeline, stages, forms",
      "Lead automation: notifications, assignment, follow-ups",
      "AI agents for your sales processes",
      "Conversion tracking and dashboards",
      "A single dashboard: media spend, leads, appointments, signed revenue",
    ],
    useCases: [
      {
        title: "Bringing enquiries together",
        text: "Forms from the website and from ads: everything arrives in one place, with its source.",
      },
      {
        title: "Following up without thinking about it",
        text: "Follow-ups go out on their own, at the right time, and nobody is forgotten.",
      },
      {
        title: "Managing by the numbers",
        text: "A dashboard links spend, leads, appointments and signed revenue.",
      },
    ],
    process: [
      {
        title: "Mapping",
        text: "The path of an enquiry, from the click to the signature, and where it gets lost today.",
      },
      {
        title: "Set-up",
        text: "CRM, forms, pipeline stages, access rights.",
      },
      {
        title: "Automation",
        text: "Notifications, follow-ups and repetitive tasks handed over to the machine.",
      },
      {
        title: "Monitoring",
        text: "Dashboards and a monthly review: we fix what the numbers reveal.",
      },
    ],
    faq: [
      {
        q: "Do I need to change CRM?",
        a: "Not necessarily. We can set up a CRM or connect the one you already use. Software subscriptions remain your responsibility.",
      },
      {
        q: "How much does the set-up cost?",
        a: `${both(CRM)} for the CRM and lead automation: pipeline, forms, notifications and follow-ups.`,
      },
      {
        q: "How do you use artificial intelligence?",
        a: "Where it saves time on tasks that can be checked. Decisions that commit your brand — the angle, the promise, the customer relationship — remain human.",
      },
    ],
  },
};

export const POLES_EN: PolesEn = {
  "marque-contenu": {
    title: "Brand & Content",
    text: "An identity that reads in three seconds, and all the content that brings it to life — photo, video, motion, advertising.",
  },
  acquisition: {
    title: "Acquisition",
    text: "Campaigns managed on cost per qualified appointment, not per click.",
  },
  "web-applications": {
    title: "Web & Applications",
    text: "Fast, understated interfaces designed for conversion.",
  },
  "ia-automatisation": {
    title: "AI & Automation",
    text: "Your sales processes running smoothly, 24 hours a day.",
  },
};
