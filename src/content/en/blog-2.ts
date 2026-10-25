import type { ArticlesEn } from "./types";
import { A_LA_CARTE, PACKS, formatDirham, formatEuro } from "@/config/pricing";

/*
 * LES PRIX CITES DANS LES ARTICLES SONT LUS DANS pricing.ts, comme en
 * francais : memes prestations, memes formules, seule l'ecriture change
 * (« MAD 4,300 (≈ €390) »).
 */
const carte = (label: string) => {
  const it = A_LA_CARTE.flatMap((g) => g.items).find((i) => i.label === label);
  if (!it) throw new Error(`[blog-en] Prestation introuvable dans pricing.ts : ${label}`);
  return it.price;
};
const pack = (id: string) => {
  const p = PACKS.find((x) => x.id === id);
  if (!p) throw new Error(`[blog-en] Formule introuvable dans pricing.ts : ${id}`);
  return p.price;
};
/** « MAD 4,300 (≈ €390) » */
const both = (eur: number) => `${formatEuro(eur, "en")} (≈ ${formatDirham(eur, "en")})`;
/** « MAD 8,800 to 16,500 (≈ €800 to €1,500) » */
const range = (a: number, b: number) =>
  `${formatEuro(a, "en")} to ${formatEuro(b, "en")} (≈ ${formatDirham(a, "en")} to ${formatDirham(b, "en").replace("MAD ", "")})`;

const VIDEO = carte("Vidéo publicitaire");
const MEDIA = carte("Media buying");
const LANDING = carte("Landing page de conversion");
const VITRINE = carte("Site vitrine");
const SEO_TECH = carte("Référencement technique");
const ESSAI = pack("essai");
const PRODUCTION = pack("production");
const ACQUISITION = pack("acquisition");
const CM = carte("Community management");
const SEO_SUIVI = carte("Suivi SEO mensuel");
const GEO = carte("Visibilité sur les IA (GEO)");
const CRM = carte("CRM et automatisation des leads");
/** Budget publicitaire de depart, tel qu'annonce sur /tarifs. */
const AD_BUDGET = range(800, 1500);

/** Articles du blog, en anglais (lot 2). Cles : slugs francais. */
export const ARTICLES_EN_2: ArticlesEn = {
  /* ======================================================================
   *  7. META OU GOOGLE
   * ==================================================================== */
  "meta-ads-ou-google-ads": {
    title: "Meta Ads or Google Ads: where should you start?",
    seoTitle: "Meta Ads or Google Ads: where to start?",
    excerpt:
      "The two platforms do not do the same job. Google answers someone who is already searching; Meta reaches someone who was not looking for anything. The right starting point depends on one question: does your customer know they need you?",
    category: "Strategy",
    seo: "Meta Ads (Facebook, Instagram) or Google Ads: which to choose first in Morocco, depending on whether your customers already search for your service or not.",
    takeaways: [
      "Google Ads captures demand that already exists: the ad appears when someone types a search. Meta Ads creates demand: the ad appears to someone who was not looking for anything.",
      "If your customers search for your service on Google — a plumber, a clinic, a car hire — Google Ads is the first channel to open.",
      "If your product is understood by seeing it — a place, a dish, a treatment, a property — Meta Ads and a vertical video do the job better.",
      "On Google, results depend first on the keywords and the landing page. On Meta, they depend first on the video, and above all on its first few seconds.",
      "Google Ads cannot spend more than demand allows: for a local service with few searches, search volume caps the campaign before the budget does.",
    ],
    faq: [
      {
        q: "Facebook Ads or Google Ads: which is cheaper?",
        a: "Neither is cheaper in absolute terms. A click on Google often costs more than a click on Meta, but it comes from someone who is already searching. Compare the cost of a customer, not the cost of a click.",
      },
      {
        q: "Can you run Meta Ads and Google Ads at the same time?",
        a: "Yes, if the budget allows. On a tight budget, it is better to start with one platform, make it work, then open the second: two underfunded campaigns learn more slowly than one.",
      },
      {
        q: "Does Google Ads work in Morocco?",
        a: "Yes. Google Ads lets you target the whole of Morocco, a city such as Marrakech or Casablanca, or a radius around an address, and choose the languages of the people you want to reach.",
      },
      {
        q: "Do you need a website to advertise?",
        a: "For Google Ads, yes: the ad leads to a page. For Meta Ads, a form built into Facebook or a WhatsApp message is enough to start, but a dedicated page measures and converts better.",
      },
    ],
    body: [
      {
        k: "p",
        v: "It is the question that almost always follows the one about budget. And the answer is not an agency preference: the two platforms do not sell the same thing. Google sells access to someone who is searching. Meta sells the attention of someone scrolling through their feed.",
      },

      { k: "h2", v: "Two different machines" },
      {
        k: "table",
        v: {
          head: ["", "Google Ads", "Meta Ads"],
          rows: [
            [
              "When the ad appears",
              "When someone types a search",
              "While people scroll through Facebook or Instagram",
            ],
            ["What you buy", "Demand that already exists", "Attention, to create demand"],
            [
              "What drives results",
              "The keywords and the landing page",
              "The video, especially its first few seconds",
            ],
            [
              "What limits volume",
              "The number of searches",
              "The video's ability to stop the scroll",
            ],
            [
              "Ideal for",
              "Services people search for, often urgently",
              "Products and places that are best shown",
            ],
          ],
        },
      },

      { k: "h2", v: "The deciding question" },
      {
        k: "p",
        v: "Does your customer already know they need you? If so, they are searching, and Google is where they search. If not, you have to go and find them where they spend their time, and show them something they were not expecting.",
      },
      {
        k: "ul",
        v: [
          "A water leak, a car breakdown, a dentist's appointment: the need comes before the search. Google Ads first.",
          "A new restaurant, a facial, a villa under construction: nobody searches for it before seeing it. Meta Ads first.",
          "A training course, a business service, a piece of software: often both — Meta to build awareness, Google to catch those who search afterwards.",
        ],
      },

      { k: "h2", v: "The small-market trap" },
      {
        k: "p",
        v: "A Google campaign can only show when someone types the search. For a specific local service, the number of monthly searches may be low: the campaign then hits a ceiling, whatever the budget. Google's keyword planning tool gives an estimate of volumes before you invest — it is the first thing to look at.",
      },
      {
        k: "p",
        v: "In Morocco, you also need to look at the language of searches. The same request can be typed in French, in Arabic or in Darija written in Latin letters. A campaign that covers only some of them misses the rest.",
      },

      { k: "h2", v: "What to work on first" },
      {
        k: "ul",
        v: [
          "On Google: the list of searches you target, the ones you exclude, and the landing page. A perfect ad that leads to a generic home page loses most of its clicks.",
          "On Meta: the video. Broad targeting works better and better, provided the creative makes clear by itself who it is speaking to.",
        ],
      },
      { k: "quote", v: "On Google, you choose who to speak to. On Meta, the video chooses." },

      { k: "h2", v: "The order we recommend" },
      {
        k: "p",
        v: `One platform first, the one that matches how your customers find you. Once it produces enquiries at a stable cost, the second comes in to complement it. Managing each platform costs ${both(MEDIA)} per month at UltraVision Agency; the Acquisition plan brings together Meta, Google and TikTok, with the videos and enquiry tracking.`,
      },
    ],
  },

  /* ======================================================================
   *  8. LE PRIX D'UN SITE
   * ==================================================================== */
  "prix-site-internet-maroc": {
    title: "How much does a website cost in Morocco? What drives the price",
    seoTitle: "Website design prices in Morocco",
    excerpt:
      "Two quotes for “a website” can differ tenfold and describe two different things. The five elements that set the price, the lines people forget, and the questions to ask before signing.",
    category: "Pricing",
    seo: "Website design prices in Morocco: what makes a quote vary, landing page or brochure site, the costs people forget, and our Marrakech rates in dirhams.",
    takeaways: [
      "The price of a website depends mainly on five elements: the number of pages, the design, the content, the features and what is included after launch.",
      `At UltraVision Agency, in Marrakech, a brochure website of up to five pages costs ${both(VITRINE)} and a conversion landing page ${both(LANDING)}, excluding tax.`,
      "A landing page is a single page built around one offer and one action; a brochure website presents the business across several pages. For receiving traffic from an ad campaign, the landing page is the better choice.",
      "The domain name, hosting, maintenance and SEO are often billed separately: they should appear on the quote before signing.",
      "The domain name should be registered in the company's name, so that it remains the owner if it changes provider.",
    ],
    faq: [
      {
        q: "How much does a brochure website cost in Morocco?",
        a: `At UltraVision Agency, ${both(VITRINE)} excluding tax for a site of up to five pages. The price of a brochure website depends mainly on the number of pages, the content to be produced and the features requested, such as booking or several languages.`,
      },
      {
        q: "How long does it take to build a website?",
        a: "With us, five days for a landing page and three weeks for a brochure website, from the moment the copy and visuals are approved.",
      },
      {
        q: "Is SEO included in the price of a website?",
        a: `Not always, and it is worth checking on the quote. At UltraVision Agency, technical SEO — structure, tags, structured data, Search Console — is a separate service at ${both(SEO_TECH)}.`,
      },
      {
        q: "Landing page or brochure website: which should I choose?",
        a: "A landing page for a specific offer and an ad campaign; a brochure website to present the business and be found on Google. Many businesses start with the landing page, which produces enquiries faster.",
      },
    ],
    body: [
      {
        k: "p",
        v: "“A website” can mean a single page put together in two days or an online shop in three languages. Comparing two quotes without knowing what they contain is like comparing the price of a scooter and a van because both have wheels.",
      },

      { k: "h2", v: "The five elements that set the price" },
      {
        k: "ul",
        v: [
          "The number of pages. Each page has to be designed, written and laid out. Five well-made pages are worth more than fifteen empty ones.",
          "The design. Adapting a template and drawing a mock-up for your brand do not take the same work.",
          "The content. Who writes the copy, who takes the photos and videos? It is often the longest line to produce, and the one most often forgotten.",
          "The features. Booking, online payment, several languages, a customer area: each adds development and testing.",
          "What comes after. Hosting, updates, fixes, backups: a site that is no longer maintained deteriorates, even if it does not change.",
        ],
      },

      { k: "h2", v: "Landing page or brochure website?" },
      {
        k: "table",
        v: {
          head: ["", "Landing page", "Brochure website"],
          rows: [
            [
              "What it is",
              "One page, one offer, one action",
              "Several pages that present the business",
            ],
            [
              "Used to",
              "Turn campaign traffic into enquiries",
              "Be found on Google and reassure before contact",
            ],
            ["Turnaround with us", "5 days", "3 weeks"],
            ["Our price, excluding tax", both(LANDING), `${both(VITRINE)}, up to 5 pages`],
          ],
        },
      },
      {
        k: "p",
        v: "Sending ad traffic to a home page is one of the most expensive leaks in a campaign: the visitor arrives for an offer and finds a menu. A landing page gives them only one thing to do.",
      },

      { k: "h2", v: "The lines people forget" },
      {
        k: "ul",
        v: [
          "The domain name, which renews every year.",
          "Hosting, monthly or yearly depending on the provider.",
          "Maintenance: updates, backups, fixes.",
          "Technical SEO: structure, tags, structured data, registration with Google Search Console.",
          "Translations, if the site speaks to customers abroad.",
          "Photos and videos, when none exist yet.",
        ],
      },
      { k: "quote", v: "A website quote is read by what it leaves out." },

      { k: "h2", v: "Questions to ask before signing" },
      {
        k: "ul",
        v: [
          "In whose name is the domain registered? It should be in your company's name.",
          "Will I have administrator access to the site and the hosting?",
          "How many rounds of revisions on the mock-up are included?",
          "Who writes the copy, and who provides the photos?",
          "What will the site cost each year after launch?",
          "Is the site connected to an analytics tool, and who looks at it?",
        ],
      },

      { k: "h2", v: "What we do" },
      {
        k: "p",
        v: `Our prices are published: ${both(LANDING)} for a conversion landing page, ${both(VITRINE)} for a brochure website of up to five pages, ${both(SEO_TECH)} for technical SEO. Copy, photos and videos are planned together, before the first line of code — that is what makes three weeks achievable for a brochure website.`,
      },
      {
        k: "note",
        v: "When a site receives enquiries, they can go straight into a CRM, with their source. That is how you know, every month, which campaign produced which customer.",
      },
    ],
  },

  /* ======================================================================
   *  9. CHOISIR UNE AGENCE
   * ==================================================================== */
  "choisir-agence-marketing-digital-maroc": {
    title: "Choosing a digital marketing agency in Morocco: eight questions to ask",
    seoTitle: "Choosing a digital agency in Morocco",
    excerpt:
      "Agency websites all look alike: the same promises, the same logos, the same “results”. The real differences show up in the answers to a few precise questions, asked before signing.",
    category: "Strategy",
    seo: "How to choose a digital marketing agency in Morocco: the eight questions to ask before you sign, and the warning signs that should make you walk away.",
    takeaways: [
      "The ad account and the domain name should be opened in the client's name, with full administrator access: it is the first question to ask a digital marketing agency.",
      "The ad budget paid to the platforms and the agency's fees should appear on two separate lines of the quote.",
      "A serious agency measures its results in enquiries, appointments or sales, not in likes or impressions.",
      "The work an agency shows should be verifiable: a client's name, a video online, a website that exists.",
      "No agency can guarantee first place on Google: Google says so itself in its documentation.",
    ],
    faq: [
      {
        q: "How much does a digital marketing agency cost in Morocco?",
        a: `It depends on the scope: content production, ad management, website, CRM. At UltraVision Agency, in Marrakech, managing one advertising platform costs ${both(MEDIA)} per month, and the Production plan — four videos a month and their distribution — ${both(PRODUCTION)} per month. The ad budget is always on top.`,
      },
      {
        q: "Do you have to commit to an agency for several months?",
        a: "Not necessarily. A commitment of a few months is justified when the work needs time to produce results, such as structuring an acquisition funnel. To judge an agency, a no-commitment trial on a first video or a first campaign tells you more than a long contract.",
      },
      {
        q: "Can an agency guarantee first place on Google?",
        a: "No. Google itself states that no one can guarantee a number one ranking. An agency that promises it is selling something other than SEO.",
      },
      {
        q: "Is a local agency better than a remote one?",
        a: "For anything that is filmed — videos, photos, venue tours — a team on site avoids travel costs and delays. For ad management, distance matters less than responsiveness and clear reporting.",
      },
    ],
    body: [
      {
        k: "p",
        v: "A business owner looking for an agency sees one near-identical website after another: promises of growth, client logos, figures with no source. The website does not help you choose. The answers to eight questions do.",
      },

      { k: "h2", v: "1. Who owns the accounts?" },
      {
        k: "p",
        v: "The Meta or Google ad account, the domain name, the website, the source files of the videos: everything should be in your name, with full administrator access. An ad account opened in the agency's name takes its history and audiences with it the day you leave.",
      },

      { k: "h2", v: "2. Is the ad budget separate from the fees?" },
      {
        k: "p",
        v: "The ad budget is paid to the platforms; the fees pay for the agency's work. A quote that mixes the two does not tell you how much actually goes on advertising.",
      },

      { k: "h2", v: "3. What do you measure?" },
      {
        k: "p",
        v: "Likes, views and impressions are easy to measure and pay no bills. Ask which metric will sit at the top of the monthly report: the cost of an enquiry, an appointment or a sale is the only answer that links the agency's work to your revenue.",
      },

      { k: "h2", v: "4. Can I see verifiable work?" },
      {
        k: "p",
        v: "A client's name, a video online, a website that exists: real work can be checked. A testimonial without a name or a logo without a project proves nothing — and a fake testimonial is a misleading commercial practice.",
      },

      { k: "h2", v: "5. Who actually does the work?" },
      {
        k: "p",
        v: "Many agencies sell and subcontract. That is not a flaw in itself, but you should know who writes, who films, who runs the campaigns, and who answers when something goes wrong.",
      },

      { k: "h2", v: "6. What is the commitment?" },
      {
        k: "p",
        v: "Minimum term, notice period, exit conditions: everything should be in writing. A commitment of a few months can be justified; a long commitment with no chance to try first puts all the risk on the client.",
      },

      { k: "h2", v: "7. What happens if the results do not come?" },
      {
        k: "p",
        v: "Neither “we'll start again for free” nor “that's not our problem”. A serious agency has a prepared answer: what it changes, how quickly, and at what point it recommends stopping.",
      },

      { k: "h2", v: "8. Are your prices published?" },
      {
        k: "p",
        v: "A published price can be compared. A price given “after a discovery call” is negotiated, and often varies with the person you speak to. Public prices are not a guarantee of quality, but they are a guarantee of consistency.",
      },

      { k: "h2", v: "Warning signs" },
      {
        k: "ul",
        v: [
          "A guaranteed first place on Google.",
          "Bought followers or reviews, presented as a strategy.",
          "An ad account opened in the agency's name.",
          "A monthly report that talks about reach, never about enquiries.",
          "A one-year commitment before any work has been delivered.",
        ],
      },
      { k: "quote", v: "An agency is judged by what it agrees to put in writing before signing." },

      { k: "h2", v: "Our answers" },
      {
        k: "p",
        v: `Ad accounts are opened in your name. The ad budget is always separate from our fees. We manage by cost per enquiry and per appointment. Our work is online, with the clients' names. The team is small and named: those who sell the project deliver it. The Production plan has no commitment, and a first video with 14 days of managed distribution costs ${both(ESSAI)}.`,
      },
    ],
  },

  /* ======================================================================
   *  10. PRIX D'UNE AGENCE A MARRAKECH
   * ==================================================================== */
  "prix-agence-marketing-digital-marrakech": {
    title: "How much does a digital marketing agency cost in Marrakech? What you really pay for",
    seoTitle: "Marketing agency prices in Marrakech",
    excerpt:
      "An agency quote often mixes four different things: production, management, the ad budget and the tools. Separating them is the only way to compare two proposals.",
    category: "Pricing",
    seo: "Digital marketing agency prices in Marrakech: production, ad management, budget, website and CRM. Our public rates and how to read an agency quote properly.",
    takeaways: [
      "The price of a digital marketing agency is made up of four separate items: content production, campaign management, the ad budget paid to the platforms, and tools such as the website or CRM.",
      "The ad budget is not a fee: it is paid directly to Meta, Google or TikTok, and should appear on a separate line of the quote.",
      `In Marrakech, at UltraVision Agency, managing one advertising platform costs ${both(MEDIA)} per month excluding tax, and the Production plan — four videos a month and their distribution — ${both(PRODUCTION)} per month.`,
      "An agency paid as a percentage of the ad budget costs more as the budget grows, even when the work stays the same.",
      "Two agency quotes are compared on what is delivered each month, not on the total amount.",
    ],
    faq: [
      {
        q: "What does a digital marketing agency charge in Morocco?",
        a: `It depends on what is included. At UltraVision Agency, in Marrakech, an ad video costs ${both(VIDEO)}, managing one advertising platform ${both(MEDIA)} per month and social media management ${both(CM)} per month, excluding tax. The ad budget, paid to the platforms, comes on top: allow ${AD_BUDGET} per month to start.`,
      },
      {
        q: "Is the ad budget included in the agency's price?",
        a: "No, and it never should be without it being stated in writing. The budget is paid directly to Meta, Google or TikTok, from an account opened in your name; the agency's fees pay for its work.",
      },
      {
        q: "Why do some agencies charge a percentage of the budget?",
        a: "It is a common billing model in online advertising. Its drawback: the invoice grows with the budget, even when the work does not change. A flat fee per platform makes the cost predictable.",
      },
      {
        q: "Can you test an agency before committing?",
        a: `Yes, and it is the safest way to judge one. At UltraVision Agency, an ad video with 14 days of managed distribution costs ${both(ESSAI)}, with no commitment.`,
      },
    ],
    body: [
      {
        k: "p",
        v: "“How much does an agency cost?” calls for a two-part answer: what you are buying, then the price of each piece. Quotes that show a single monthly amount almost always cover several services, and separating them is what lets you compare.",
      },

      { k: "h2", v: "The four items on a quote" },
      {
        k: "table",
        v: {
          head: ["Item", "What it is", "Who receives the money"],
          rows: [
            ["Production", "Videos, photos, visuals, ad copy", "The agency"],
            ["Management", "Setting up and optimising campaigns, reporting", "The agency"],
            ["Ad budget", "Buying ad space on Meta, Google or TikTok", "The platforms"],
            [
              "Tools",
              "Website, landing page, CRM, automations",
              "The agency for the build, the software provider for the subscription",
            ],
          ],
        },
      },
      {
        k: "p",
        v: "A quote that does not separate these four lines does not tell you how much actually goes on advertising, nor what the agency charges for its own work.",
      },

      { k: "h2", v: "Flat fee or percentage of budget" },
      {
        k: "p",
        v: "Two billing models dominate campaign management. A percentage of the ad budget rises automatically with spend, even when the work stays identical. A flat fee per platform makes the cost predictable: managing a platform costs the same whether the budget is modest or large.",
      },
      {
        k: "p",
        v: "The flat fee is counted per platform because the work is not the same: managing Meta alone, or Meta, Google and TikTok, means three interfaces, three bidding logics and three sets of creatives to adapt.",
      },

      { k: "h2", v: "What is never included" },
      {
        k: "ul",
        v: [
          "The ad budget, paid directly to the platforms from your account.",
          "Paid actors, models or filming locations.",
          "Software subscriptions: CRM, automation tools, hosting.",
          "Replying to messages: the agency generates and centralises enquiries; sales follow-up stays with you.",
        ],
      },
      {
        k: "note",
        v: `To start a campaign, allow ${AD_BUDGET} of ad budget per month, on top of the fees.`,
      },

      { k: "h2", v: "How to compare two quotes" },
      {
        k: "ul",
        v: [
          "Add up what is delivered each month: number of videos, platforms managed, reports.",
          "Check that the ad budget appears on a separate line.",
          "Ask who owns the ad accounts and the source files.",
          "Read the commitment period and the exit conditions.",
        ],
      },
      { k: "quote", v: "A price can only be compared with what it contains." },

      { k: "h2", v: "Our prices, line by line" },
      {
        k: "table",
        v: {
          head: ["Service", "Price excluding tax"],
          rows: [
            ["Ad video: angle, script, filming, editing", both(VIDEO)],
            ["Management of one advertising platform", `${both(MEDIA)} per month`],
            ["Social media management", `${both(CM)} per month`],
            ["Conversion landing page", both(LANDING)],
            ["Brochure website, up to 5 pages", `from ${both(VITRINE)}`],
            ["Technical SEO", both(SEO_TECH)],
            ["CRM and lead automation", both(CRM)],
          ],
        },
      },
      {
        k: "p",
        v: `The plans group these lines together. The Production plan — four videos a month, distributed and optimised on one platform — costs ${both(PRODUCTION)} per month, with no commitment. The Acquisition plan — four videos, distribution on Meta, Google and TikTok, leads sent to your CRM — costs ${both(ACQUISITION)} per month, with a three-month commitment. The current launch offer is shown on our pricing page.`,
      },
    ],
  },

  /* ======================================================================
   *  11. COMMUNITY MANAGER A MARRAKECH
   * ==================================================================== */
  "community-manager-marrakech": {
    title: "Social media manager in Marrakech: what they do, and what they don't",
    seoTitle: "Social media manager in Marrakech: prices",
    excerpt:
      "Posting every day is not enough. What makes the difference is what gets posted, for whom, and what happens when someone replies.",
    category: "Strategy",
    seo: "Social media manager in Marrakech: editorial line, calendar, posting and moderation. What the service covers, its price, and how it differs from paid ads.",
    takeaways: [
      "A social media manager builds a brand's editorial line, plans and publishes its content, and moderates comments on Instagram, Facebook or TikTok.",
      "Social media management keeps an account alive; paid advertising brings in customers who do not follow you yet. The two complement each other but do not replace each other.",
      `At UltraVision Agency, in Marrakech, social media management costs ${both(CM)} per month excluding tax: editorial line, calendar, posting and moderation.`,
      "Content quality matters more than frequency: one video shot for the vertical format does more for an account than several generic visuals.",
      "Sales replies to private messages — prices, bookings, availability — are best handled by the business itself, which knows its customers.",
    ],
    faq: [
      {
        q: "How much does a social media manager cost in Marrakech?",
        a: `It depends on the number of networks, the volume of posts and who produces the content. At UltraVision Agency, social media management costs ${both(CM)} per month excluding tax; videos are ordered separately, at ${both(VIDEO)} each, or as part of the Production plan.`,
      },
      {
        q: "Does a social media manager reply to customers' messages?",
        a: "They moderate comments and can answer simple questions. Sales enquiries — prices, bookings, availability — are best handled by the business, or passed on to it without delay.",
      },
      {
        q: "Do I need a social media manager or advertising?",
        a: "If the brand is still little known, advertising brings in the first customers faster. If it already has an audience, social media management keeps it engaged. Most businesses need both, in that order.",
      },
      {
        q: "How many posts a week do you need?",
        a: "There is no figure that works for everyone. A pace kept up over time is better than an intense pace abandoned after a month, and one successful post is better than three posts made to fill the calendar.",
      },
    ],
    body: [
      {
        k: "p",
        v: "In Marrakech, many businesses hand their Instagram account to a friend or relative, then to a freelancer, then to an agency. The job changes hands; the question stays the same: what should you expect from a social media manager?",
      },

      { k: "h2", v: "What social media management covers" },
      {
        k: "ul",
        v: [
          "The editorial line: what the brand says, to whom, and in what tone.",
          "The calendar: what to post, when, on which network.",
          "Posting: captions, formats, tags.",
          "Moderation: replying to comments, hiding unwanted ones, passing on sales questions.",
        ],
      },

      { k: "h2", v: "What it does not include" },
      {
        k: "p",
        v: "Producing videos and photos is a separate craft: finding the angle, writing, filming, editing. A social media manager posts a video; they do not necessarily film it. Paid advertising is another craft too: setting up a Meta or TikTok campaign, tracking the cost of an enquiry and allocating budgets is the work of ad management.",
      },
      {
        k: "table",
        v: {
          head: ["", "Social media management", "Paid advertising"],
          rows: [
            ["Goal", "Keep the account alive and build loyalty", "Bring in new customers"],
            ["Who sees the content", "Mostly your followers", "People who do not know you yet"],
            [
              "What is measured",
              "Engagement, messages received",
              "Cost per enquiry, per appointment",
            ],
            ["What you pay", "Fees", "Fees and a budget paid to the platforms"],
          ],
        },
      },

      { k: "h2", v: "Frequency matters less than content" },
      {
        k: "p",
        v: "Posting a generic visual every day fills a calendar, not an order book. An account that posts less, but shows the place, the product and real customers, gives people a reason to follow, and to come back.",
      },
      {
        k: "quote",
        v: "An account is judged by what it makes people want to do, not by the number of posts.",
      },

      { k: "h2", v: "How we work" },
      {
        k: "p",
        v: `We produce the content before posting it: the videos are filmed on location, in Marrakech, in vertical format, then reused in the ads. Social media management costs ${both(CM)} per month excluding tax: editorial line, calendar, posting and moderation. Videos can be ordered individually, at ${both(VIDEO)}, or through the Production plan, at ${both(PRODUCTION)} per month for four videos distributed and managed.`,
      },
    ],
  },

  /* ======================================================================
   *  12. REFERENCEMENT GOOGLE A MARRAKECH
   * ==================================================================== */
  "referencement-google-marrakech": {
    title: "Ranking first on Google in Marrakech: what really matters",
    seoTitle: "Google SEO in Marrakech",
    excerpt:
      "On a search such as “restaurant Marrakech” or “real estate agency Marrakech”, Google first shows a map, then websites. The two are not won in the same way.",
    category: "Strategy",
    seo: "SEO in Marrakech: Google Business Profile, reviews, one page per service, technical work and links. What lifts a local business, and how long it takes.",
    takeaways: [
      "On a local search, Google often shows a map block before the websites: that block depends on the Google Business Profile, not on the website alone.",
      "Google says it ranks local results on three criteria: relevance, distance and the business's prominence, which includes the number and rating of its reviews.",
      "One page per service, naming the city and answering customers' questions — prices, timescales, process — ranks better than a home page that talks about everything.",
      "A new website takes several weeks, often several months, to establish itself on competitive searches: no one can guarantee first place on Google.",
      "Between two pages of comparable quality, links and mentions from other reputable websites, especially Moroccan ones, often make the difference.",
    ],
    faq: [
      {
        q: "How long does it take to rank first on Google?",
        a: "There is no guaranteed timescale. On a low-competition search, a few weeks may be enough; on a search such as “real estate agency Marrakech”, allow several months of regular work. An agency that guarantees first place is promising what Google itself says is impossible.",
      },
      {
        q: "Is the Google Business Profile more important than the website?",
        a: "For local searches, the Business Profile is often what appears first, with the map. The website remains essential: it is what convinces, and it is where the profile sends people.",
      },
      {
        q: "How much does SEO for a website cost in Marrakech?",
        a: `At UltraVision Agency, technical SEO — structure, tags, structured data, Search Console — costs ${both(SEO_TECH)} as a one-off, and monthly SEO follow-up — keywords, content, links, ranking report — ${both(SEO_SUIVI)} per month, excluding tax.`,
      },
      {
        q: "Should you run Google Ads in the meantime?",
        a: "It is often a sensible move. Organic SEO takes time; a Google Ads ad appears at the top of the results as soon as it goes live. Advertising brings in enquiries while SEO takes hold.",
      },
    ],
    body: [
      {
        k: "p",
        v: "Type “restaurant Marrakech” or “real estate agency Marrakech”: Google first shows a map with a few businesses, then a list of websites. These two spots are not won in the same way.",
      },

      { k: "h2", v: "The map: the Google Business Profile" },
      {
        k: "p",
        v: "The map block relies on the Google Business Profile, the one that shows the address, opening hours and reviews. Google says it ranks these results on three criteria: relevance to the search, distance from the person searching, and the business's prominence.",
      },
      {
        k: "ul",
        v: [
          "An accurate primary category: “marketing agency”, “restaurant”, “real estate agency”.",
          "Complete information that is identical everywhere: name, address or service area, phone number, website.",
          "Real photos, kept up to date.",
          "Reviews from real customers, which the business replies to.",
        ],
      },
      {
        k: "note",
        v: "Reviews that are bought or written by the business itself break Google's rules; Google can remove them and restrict the profile.",
      },

      { k: "h2", v: "The websites: one page per question" },
      {
        k: "p",
        v: "Below the map, Google ranks pages, not businesses. A home page that talks about everything rarely ranks on a specific search. A page dedicated to one service, naming the city and answering the questions a customer asks — prices, timescales, process, examples — stands a much better chance of being chosen.",
      },
      {
        k: "p",
        v: "It is also what assistants such as ChatGPT or Google's AI Overviews read: short, clear answers that make sense outside the page.",
      },

      { k: "h2", v: "The technical side: what Google should not have to guess" },
      {
        k: "ul",
        v: [
          "A website that is fast on mobile.",
          "A single address per page, on https.",
          "A title and a description written for each page.",
          "Structured data describing the business and its services.",
          "A sitemap submitted in Search Console, which also lets you track rankings.",
        ],
      },

      { k: "h2", v: "Mentions: what others say about you" },
      {
        k: "p",
        v: "Between two pages of comparable quality, Google takes into account links and mentions from other websites: a business directory, a local media outlet, a partner, a client who names their provider. One link from a reputable Moroccan website is worth more than dozens of bought links unrelated to your business.",
      },

      { k: "h2", v: "The timescale" },
      {
        k: "p",
        v: "A new website takes several weeks to be crawled, then several months to establish itself on competitive searches. Search Console lets you follow this work: the pages indexed, the searches that trigger an appearance, the average position.",
      },
      { k: "quote", v: "No one can guarantee first place. But you can leave nothing to chance." },

      { k: "h2", v: "What we do" },
      {
        k: "p",
        v: `Technical SEO — structure, tags, structured data, Search Console — costs ${both(SEO_TECH)}, as a one-off. Monthly follow-up — keywords, content, links, ranking report — costs ${both(SEO_SUIVI)} per month. To be cited by ChatGPT, Perplexity and Google's AI summaries, AI visibility costs ${both(GEO)}. Prices exclude tax.`,
      },
    ],
  },
};
