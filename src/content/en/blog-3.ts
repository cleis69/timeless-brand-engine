import { A_LA_CARTE, PACKS, formatDirham, formatEuro } from "@/config/pricing";
import type { ArticlesEn } from "./types";

/*
 * LES PRIX CITES DANS LES ARTICLES SONT LUS DANS pricing.ts, comme en
 * francais (voir src/content/blog.ts). Seule l'ecriture change :
 * « MAD 4,300 (≈ €390) » au lieu de « 4 300 MAD (390 €) ».
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
const both = (eur: number) => `${formatDirham(eur, "en")} (≈ ${formatEuro(eur, "en")})`;
/** « MAD 8,800 to 16,500 (≈ €800 to €1,500) » */
const range = (a: number, b: number) =>
  `${formatDirham(a, "en")} to ${formatDirham(b, "en").replace("MAD ", "")} (≈ ${formatEuro(a, "en")} to ${formatEuro(b, "en")})`;

const VIDEO = carte("Vidéo publicitaire");
const MEDIA = carte("Media buying");
const VITRINE = carte("Site vitrine");
const SEO_TECH = carte("Référencement technique");
const GEO = carte("Visibilité sur les IA (GEO)");
const CRM = carte("CRM et automatisation des leads");
const OUVERTURE = carte("Ouverture des comptes publicitaires");
const ESSAI = pack("essai");
const ACQUISITION = pack("acquisition");
/** Budget publicitaire de depart, tel qu'annonce sur /tarifs (memes valeurs qu'en francais). */
const AD_BUDGET = range(800, 1500);

/** Articles du blog, en anglais (lot 3). Cles : slugs francais. */
export const ARTICLES_EN_3: ArticlesEn = {
  /* ======================================================================
   *  13. VIDEO IMMOBILIERE A MARRAKECH
   * ==================================================================== */
  "video-immobiliere-marrakech": {
    title: "Property video in Marrakech: filming a home so that it sells",
    seoTitle: "Property video in Marrakech",
    excerpt:
      "A filmed viewing answers questions before the first call. But only if it shows what buyers are looking for, and reaches the people who actually buy.",
    category: "Production",
    seo: "Property video in Marrakech: presenter-led or atmosphere tours, vertical format, subtitles for overseas buyers, targeted ads and follow-up of every enquiry.",
    takeaways: [
      "An effective property video answers a buyer's questions before the first call: the light, the space, the view, the neighbourhood and the true condition of the property.",
      "Vertical is the format of the social networks where property ads run: a home filmed vertically can be watched in full on a phone, without turning it.",
      "For a development still under construction, you film what already exists: the neighbourhood, the shops, the shared areas, the setting.",
      "For overseas buyers, the video is shot on location, subtitled in the language of the target market, then advertised in that country.",
      `At UltraVision Agency in Marrakech, an advertising video — angle, script, shoot, edit, vertical formats — costs ${both(VIDEO)} excluding tax.`,
    ],
    faq: [
      {
        q: "How much does a property video cost in Marrakech?",
        a: `At UltraVision Agency, a property advertising video — angle, script, on-location shoot, edit and vertical formats — costs ${both(VIDEO)} excluding tax. A first video with 14 days of managed advertising costs ${both(ESSAI)}, with no commitment.`,
      },
      {
        q: "Do I have to appear on camera?",
        a: "No. A tour presented by the agent or the developer builds trust: viewers know who they are talking to before they call. An atmosphere tour, with nobody on screen, suits an exceptional property where the place speaks for itself.",
      },
      {
        q: "How long should a property tour video be?",
        a: "Long enough to show the main rooms, the view and the outside, and no longer. The first few seconds decide whether the video is watched: they must show the property's strongest feature.",
      },
      {
        q: "Can we reach buyers who live abroad?",
        a: "Yes. The video is subtitled in the language of the target market, and the ad is shown to people in that country. We have set this up for an estate agent and for a property developer.",
      },
    ],
    body: [
      {
        k: "p",
        v: "In property, video does not replace the viewing: it decides who will come to it. A buyer who has seen the property on film arrives with real questions, and those it does not suit do not book a viewing for nothing.",
      },

      { k: "h2", v: "What a buyer wants to see" },
      {
        k: "ul",
        v: [
          "The light, and which way the rooms face.",
          "The space, filmed in continuous shots rather than still frames.",
          "The view and the outside: terrace, garden, pool, street.",
          "The neighbourhood: what is within walking distance, what is around.",
          "The true condition of the property, with no retouching that would disappoint at the viewing.",
        ],
      },

      { k: "h2", v: "On camera or atmosphere" },
      {
        k: "p",
        v: "There are two ways to film a tour. Presented on camera by the agent or the developer, it builds trust: you know the person before you call them. That is the format of the triplex tour in Marrakech for the agency All In Kech, and of the film shot for Shams Immo on new-build property. As an atmosphere piece, with nobody on screen, the place speaks for itself: the choice for exceptional properties and carefully designed interiors.",
      },

      { k: "h2", v: "Selling what has not been built yet" },
      {
        k: "p",
        v: "For a development under construction, there are no rooms to film yet. You film what already exists: the neighbourhood, the shops, the shared areas, the setting. That is how we shot the launch of a new residential building and the presentation of a villa development still under construction, aimed at an overseas market.",
      },

      { k: "h2", v: "The vertical format" },
      {
        k: "p",
        v: "Property ads are watched on Instagram, Facebook and TikTok, on a phone held upright. A video shot vertically fills the whole screen; a horizontal video cropped to fit loses part of the room. The framing is therefore decided at the shoot, not in the edit.",
      },

      { k: "h2", v: "Reaching overseas buyers" },
      {
        k: "p",
        v: "Some buyers of property in Marrakech live abroad. For them, the video is shot on location, subtitled in the language of the target market, and the ad is run in that country. This is the approach we used for an estate agent looking for international buyers.",
      },

      { k: "h2", v: "After the video: losing no enquiries" },
      {
        k: "p",
        v: "A video that works generates messages, calls and form submissions. Without follow-up, some of them are lost. A form connected to a CRM, with a notification and a reminder, ensures every enquiry gets an answer, all the way to the viewing.",
      },
      { k: "quote", v: "Video does not replace the viewing: it decides who will come to it." },

      { k: "h2", v: "Our prices" },
      {
        k: "p",
        v: `An advertising video — angle, script, on-location shoot in Marrakech, edit, vertical formats — costs ${both(VIDEO)} excluding tax. To judge before committing, a first video with 14 days of managed advertising costs ${both(ESSAI)}. The advertising budget, paid to the platforms, comes on top.`,
      },
    ],
  },

  /* ======================================================================
   *  14. RESERVATIONS DIRECTES : RESTAURANTS, RIADS, HOTELS
   * ==================================================================== */
  "reservations-directes-restaurant-riad-marrakech": {
    title: "Restaurant, riad, hotel in Marrakech: getting more direct bookings",
    seoTitle: "Direct bookings in Marrakech",
    excerpt:
      "Booking platforms bring in guests and take a commission on each one. A site that takes bookings, videos that make people want to come and well-targeted ads bring some of them in directly.",
    category: "Strategy",
    seo: "Restaurant, riad or hotel in Marrakech: a site with built-in booking, day and night videos, a Google profile, Instagram and ads to win more direct bookings.",
    takeaways: [
      "A direct booking comes through the venue's own website, phone, WhatsApp or social media, with no intermediary taking a commission.",
      "The website of a restaurant, riad or hotel should let guests book in a few taps on a phone, without sending them to another platform.",
      "In Marrakech, guests are both local and passing through: a website in at least two languages speaks to both.",
      "A venue filmed by day and by night shows both its faces: the calm of the afternoon and the atmosphere of the evening do not appeal to the same guests.",
      "The Google Business Profile, with its photos, opening hours, reviews and booking link, is often the first contact between a guest and a venue.",
    ],
    faq: [
      {
        q: "How do I get more direct bookings?",
        a: "By making direct booking as easy as on a platform: a fast mobile website, a visible booking button, up-to-date photos and videos, and the website link everywhere — Instagram, Google profile, WhatsApp.",
      },
      {
        q: "Should I leave the booking platforms?",
        a: "Rarely. They bring guests who do not know you yet. The aim is to get guests who already know you to book directly, and to be visible enough that others do too.",
      },
      {
        q: "How much does a restaurant website with booking cost?",
        a: `At UltraVision Agency, a showcase website of up to 5 pages costs from ${both(VITRINE)} excluding tax. The final price depends on the number of pages, the languages and the booking system chosen.`,
      },
      {
        q: "What videos should a restaurant or riad film?",
        a: "The venue by day and by night, the work in the kitchen or at the tables, the rooms and terraces, and the moments guests come for. Filmed vertically, these shots work on Instagram, in ads and on the website alike.",
      },
    ],
    body: [
      {
        k: "p",
        v: "A restaurant, riad or hotel is chosen on a screen before it is chosen in person. The question is not whether you are on the platforms, but how many guests come to you directly, and how many come through an intermediary.",
      },

      { k: "h2", v: "What a direct booking is" },
      {
        k: "p",
        v: "A direct booking comes through the venue's own website, phone, WhatsApp or social media, with no platform taking a commission. It also gives you the guest: their name, their contact details, and the chance to bring them back.",
      },

      { k: "h2", v: "The website: booking in a few taps" },
      {
        k: "ul",
        v: [
          "A booking button visible as soon as the page opens, on a phone.",
          "Booking on the website itself, without being sent to another platform.",
          "The menu, the rooms or the packages, with real photos.",
          "At least two languages, for local guests and visitors passing through.",
          "The website link on Instagram, on the Google profile and in every WhatsApp reply.",
        ],
      },
      {
        k: "p",
        v: "This is what we set up for Koozina Garden, a restaurant and shop in Essaouira, whose bilingual website presents the menu, the garden, the shop and the events, and for chef Raphaël Anglesy: in both cases, booking is built into the website.",
      },

      { k: "h2", v: "Video: by day and by night" },
      {
        k: "p",
        v: "The calm of a patio in the afternoon and the atmosphere of a terrace in the evening do not speak to the same guests. A venue filmed at both times shows both its faces: that was the approach of the film shot for a leisure venue in Marrakech, with a hook on the entry price.",
      },

      { k: "h2", v: "Instagram and advertising" },
      {
        k: "p",
        v: "Instagram is the shop window: it is where a guest checks the atmosphere before booking. Meta advertising reaches those who do not follow you yet — people living in Marrakech, people interested in the city — with a vertical video and a direct link to booking.",
      },

      { k: "h2", v: "The Google profile" },
      {
        k: "p",
        v: "For “restaurant Marrakech” or “riad Marrakech”, Google shows a map first. The Business Profile — photos, opening hours, reviews, booking link — is often the first contact with a guest. It should be kept up to date like a shop window.",
      },
      { k: "quote", v: "Every direct booking is a guest you can bring back." },

      { k: "h2", v: "What we do" },
      {
        k: "p",
        v: `We design websites with built-in booking, film venues on location and run those videos as ads. A showcase website costs from ${both(VITRINE)}, an advertising video ${both(VIDEO)}, and managing one advertising platform ${both(MEDIA)} a month, excluding tax. The advertising budget comes on top.`,
      },
    ],
  },

  /* ======================================================================
   *  15. ETRE CITE PAR CHATGPT ET LES ASSISTANTS IA
   * ==================================================================== */
  "etre-cite-par-chatgpt-entreprise-marrakech": {
    title: "Getting cited by ChatGPT when people look for a business in Marrakech",
    seoTitle: "Getting cited by ChatGPT in Marrakech",
    excerpt:
      "Ask ChatGPT or Perplexity for a good place in Marrakech and the assistant answers with three or four names. What it reads to choose them, and what a business can do to be one of them.",
    category: "Strategy",
    seo: "Getting cited by ChatGPT, Perplexity and Google's AI Overviews in Marrakech: one consistent name everywhere, pages that answer, a Google profile and reviews.",
    takeaways: [
      "ChatGPT, Perplexity, Gemini and Google's AI Overviews answer a question by citing a few businesses, chosen from the pages they find and understand.",
      "An AI assistant is more likely to cite a business whose name, city and trade are described the same way on its website, its Google profile and in directories.",
      "A page that answers a specific question in one or two clear sentences is easier to cite than a page that points to a contact form.",
      "Customer reviews and mentions on other websites count as much as the website itself: an AI assistant looks for outside confirmation.",
      "Optimising for AI assistants, known as GEO, extends search engine optimisation for Google and rests on the same foundations.",
    ],
    faq: [
      {
        q: "How do I appear in ChatGPT's answers?",
        a: "By being findable, understandable and confirmed: a website that answers your customers' questions clearly, the same name, city and trade everywhere, a verified Google profile with reviews, and mentions on other websites.",
      },
      {
        q: "What is GEO?",
        a: "GEO stands for Generative Engine Optimisation: the work that makes a business understandable and citable by assistants such as ChatGPT, Perplexity, Gemini or Google's AI Overviews. It extends search engine optimisation for Google and rests on the same foundations.",
      },
      {
        q: "Is an llms.txt file required?",
        a: "No. It is a summary of the website for the assistants that read it; Google does not use it to rank pages. Its main use is to stop a machine summarising your business badly.",
      },
      {
        q: "How much does AI visibility cost?",
        a: `At UltraVision Agency in Marrakech, AI visibility (GEO) costs ${both(GEO)} excluding tax. Ideally it builds on clean technical SEO, at ${both(SEO_TECH)}.`,
      },
    ],
    body: [
      {
        k: "p",
        v: "Some searches no longer go through a list of links. People ask an assistant for “a good riad in Marrakech”, “a dental clinic in Guéliz” or “an agency for my video ads”, and it answers with three or four names. Being in that answer takes preparation, just like the first page of Google.",
      },

      { k: "h2", v: "How an assistant chooses the businesses it cites" },
      {
        k: "p",
        v: "For a local question, the assistant searches the web, reads a few pages and writes an answer. It keeps the businesses it finds, understands, and sees confirmed by other sources. A business that cannot be found is not read, a confusing page is not understood, and a name nothing confirms comes after those several sources cite.",
      },
      {
        k: "figure",
        v: {
          type: "steps",
          caption:
            "The three conditions for being cited. Each depends on the one before: a page an assistant cannot find will never be understood.",
          steps: [
            {
              label: "Found",
              sub: "The website is open to crawlers and present in search engines.",
            },
            { label: "Understood", sub: "The name, city, trade and prices are written clearly." },
            {
              label: "Confirmed",
              sub: "The Google profile, reviews and directories say the same thing.",
            },
          ],
        },
      },

      { k: "h2", v: "One name, one city, one trade, the same everywhere" },
      {
        k: "p",
        v: "This is the foundation, and it is often where everything goes wrong. A business is called one thing on its website, another on its Google profile, a third on Instagram, with an old address in a directory. To an assistant, these may be several businesses.",
      },
      {
        k: "ul",
        v: [
          "The exact same name everywhere, with no added keyword.",
          "The same city and the same neighbourhood.",
          "The same phone number and the same website.",
          "One sentence that says what you do, repeated word for word: “Name is a Lebanese restaurant in Guéliz, Marrakech”.",
        ],
      },

      { k: "h2", v: "Pages that answer" },
      {
        k: "p",
        v: "An assistant cites sentences. “We deliver to Guéliz and Hivernage, Tuesday to Sunday” can be quoted as it stands; “delivery subject to conditions, contact us” cannot. The pages to work on are the ones that answer the questions you get on the phone: your prices, your opening hours, your neighbourhood, what is included, lead times.",
      },
      {
        k: "ul",
        v: [
          "One question per section, asked as a subheading.",
          "The answer in the first sentence, the detail afterwards.",
          "An FAQ, with the questions as people type them.",
          "Prices, when you can publish them.",
        ],
      },
      {
        k: "p",
        v: "The website must also be readable by a machine: text on the page rather than in an image, and structured data that says who you are, where you are and what you do.",
      },

      { k: "h2", v: "What others say about you" },
      {
        k: "p",
        v: "An assistant does not rely only on what a business says about itself. It looks for confirmation: reviews on the Google profile, directory listings, local press articles, partners' websites. A business that several independent sources describe the same way becomes a safe answer.",
      },
      {
        k: "ul",
        v: [
          "A verified, complete Google profile with recent reviews.",
          "The directories for your trade and Moroccan directories.",
          "Your partners' websites, when they mention you with a link.",
          "A Bing Places listing: not every assistant relies on Google.",
        ],
      },

      { k: "h2", v: "Letting assistants read the website" },
      {
        k: "p",
        v: "Some websites block assistants' crawlers without knowing it, through a security setting or an overly strict robots.txt file. Conversely, an llms.txt file at the root of the website summarises the business and its main pages for the assistants that read it. It is not a shortcut: it is a clean summary that stops a machine getting things wrong.",
      },
      {
        k: "table",
        v: {
          head: ["What an assistant looks for", "Where to give it"],
          rows: [
            [
              "Who you are",
              "A one-sentence definition, identical on the website, the Google profile and in directories",
            ],
            ["Where you are", "The city, the neighbourhood, the area served"],
            ["What you do, and at what price", "One page per service, with prices where possible"],
            ["What your customers think", "Google reviews and directory reviews"],
            ["Who confirms it", "Directories, the press, partners"],
          ],
        },
      },
      { k: "quote", v: "An assistant cites what it understands, and what others confirm." },

      { k: "h2", v: "How long does it take?" },
      {
        k: "p",
        v: "Changes to the website show up as search engines reread the pages: a few weeks. Trust, on the other hand, is built through reviews and mentions, over several months. It is the same timeline as Google SEO, and it is the same work.",
      },

      { k: "h2", v: "What we do" },
      {
        k: "p",
        v: `We have applied this method to our own website — a definition of the business, structured data, an llms.txt file, pages that answer, aligned profiles — and we put it in place for our clients. AI visibility costs ${both(GEO)} and technical SEO ${both(SEO_TECH)}, excluding tax.`,
      },
    ],
  },

  /* ======================================================================
   *  16. LEADS IMMOBILIERS : DU FORMULAIRE A LA VISITE
   * ==================================================================== */
  "leads-immobiliers-marrakech": {
    title: "Estate agencies in Marrakech: stop losing leads between the form and the viewing",
    seoTitle: "Real estate leads in Marrakech",
    excerpt:
      "A property ad that works fills a list of enquiries. What happens next decides the sales: response time, qualification, follow-ups and tracking, all the way to the viewing.",
    category: "Method",
    seo: "Estate agencies and developers in Marrakech: reply to leads fast, qualify them, follow up on WhatsApp and track every enquiry in a CRM, through to the viewing.",
    takeaways: [
      "A real estate lead is a contact request left by someone interested in a property, most often through an ad form, a phone call or a WhatsApp message.",
      "Someone who has just filled in a form still has the property in mind: replying the same day is the most profitable setting in lead follow-up.",
      "Three questions are enough to qualify a property enquiry: the plan, the budget and the timeframe.",
      "A CRM gathers every enquiry in one place, with its source, its status, the person responsible and the next action to take.",
      "Some property buyers in Marrakech live abroad: follow-up then happens on WhatsApp, in several languages, with video viewings before they travel.",
    ],
    faq: [
      {
        q: "How should I manage real estate leads?",
        a: "By keeping them all in one tool, replying the same day, qualifying each enquiry by plan, budget and timeframe, and following up on a schedule set in advance, until a viewing or a clear no.",
      },
      {
        q: "Which CRM should an estate agency use?",
        a: "The one the team actually keeps up to date. The tool matters less than the rules: every enquiry has a source, a status, a person responsible and a dated next action. The choice depends on your habits and your software budget.",
      },
      {
        q: "Why don't my Facebook property leads answer?",
        a: "Often because the reply comes too late, or because the form was too easy to fill in. An instant notification, a same-day reply and one or two qualifying questions in the form improve the quality of enquiries.",
      },
      {
        q: "How much does lead automation cost?",
        a: `At UltraVision Agency in Marrakech, setting up the CRM and lead automation costs ${both(CRM)} excluding tax. The CRM software subscription is paid directly to the vendor.`,
      },
    ],
    body: [
      {
        k: "p",
        v: "A property campaign that works produces enquiries: names, numbers, messages. Many sales are lost after that, not in the advertising. An enquiry left waiting two days, a number called back only once, a spreadsheet nobody keeps up to date: the advertising budget has paid for contacts nobody followed up.",
      },

      { k: "h2", v: "The journey of an enquiry" },
      {
        k: "figure",
        v: {
          type: "steps",
          caption:
            "The five steps between the form and the viewing. Each has an owner and a deadline; this is where the real cost of a viewing is decided.",
          steps: [
            { label: "Enquiry", sub: "Form, call or WhatsApp, logged with its source." },
            { label: "Reply", sub: "The same day, naming the property." },
            { label: "Qualification", sub: "The plan, the budget, the timeframe." },
            { label: "Follow-ups", sub: "A schedule set in advance." },
            { label: "Viewing", sub: "In person or by video." },
          ],
        },
      },

      { k: "h2", v: "Replying the same day" },
      {
        k: "p",
        v: "Someone asking about a villa may be looking at three other listings the same evening. The first agency to reply, naming the property and making a concrete offer, takes the lead. An instant notification on the agent's phone — the name, the number, the property concerned — is the most profitable setting in the whole system.",
      },

      { k: "h2", v: "Qualifying in three questions" },
      {
        k: "ul",
        v: [
          "The plan: to live in, to let, a second home.",
          "The budget, and the financing if there is any.",
          "The timeframe: this month, in six months, or just curious.",
        ],
      },
      {
        k: "p",
        v: "These three answers decide what comes next. A buyer ready within the month calls for a viewing; an investor comparing options expects figures and a file; someone who is just curious receives a selection of properties and a follow-up later. The ad form can ask one or two of these questions from the start: a few fewer enquiries, but better ones.",
      },

      { k: "h2", v: "Following up without pestering" },
      {
        k: "p",
        v: "Many people do not pick up the first time. A simple schedule: a call and a WhatsApp message the same day, a second message the next day with a video of the property, a last one a few days later with comparable properties. After that, the enquiry moves to a monthly follow-up: a property project takes time.",
      },
      {
        k: "p",
        v: "Video is a strong follow-up tool. A tour film sent on WhatsApp brings back someone who was hesitating, especially if they cannot travel.",
      },

      { k: "h2", v: "The CRM: one list, kept up to date" },
      {
        k: "table",
        v: {
          head: ["What the CRM keeps", "Why"],
          rows: [
            [
              "The source of the enquiry",
              "To know which campaign produces viewings, not just forms",
            ],
            [
              "The property concerned",
              "To reply about the right property, without making them repeat themselves",
            ],
            ["The status", "New, contacted, qualified, viewing booked, offer, lost"],
            ["The next action and its date", "To never forget a follow-up"],
            ["The agent responsible", "One enquiry, one contact person"],
          ],
        },
      },
      {
        k: "p",
        v: "The value is not the tool, it is the discipline it imposes. It is also what lets you say, after a month, how many viewings and sales each campaign produced: the only measure that really counts.",
      },

      { k: "h2", v: "Buyers who live abroad" },
      {
        k: "p",
        v: "Some buyers and investors in Marrakech do not live in Morocco. Follow-up adapts: WhatsApp rather than calls, messages in French and English, times that allow for the time difference, and a video viewing before they travel.",
      },
      {
        k: "quote",
        v: "The advertising budget buys enquiries. Follow-up turns them into viewings.",
      },

      { k: "h2", v: "What we do" },
      {
        k: "p",
        v: `We film property videos, run property campaigns and connect enquiries to a CRM, with notifications and follow-ups. The CRM and lead automation cost ${both(CRM)}, and managing one advertising platform ${both(MEDIA)} a month, excluding tax. The Acquisition package brings together the videos, advertising on Meta, Google and TikTok, and lead automation for ${both(ACQUISITION)} a month.`,
      },
    ],
  },

  /* ======================================================================
   *  17. PUBLICITE TIKTOK AU MAROC
   * ==================================================================== */
  "publicite-tiktok-maroc": {
    title: "TikTok advertising in Morocco: the budget, the videos and what works",
    seoTitle: "TikTok advertising in Morocco: the budget",
    excerpt:
      "The minimum budget TikTok requires, the budget you need to learn anything, and the kind of videos that work: what to know before launching a first TikTok campaign in Morocco.",
    category: "Pricing",
    seo: "TikTok advertising in Morocco: the minimum budget, a useful starting budget, videos that work, measuring results and campaign management prices in Marrakech.",
    takeaways: [
      "In TikTok Ads Manager, the daily budget of an ad group must be more than 20 dollars, and that of a campaign, if one is set at that level, more than 50 dollars.",
      "An ad group run for a month at the minimum budget comes to a little over 600 dollars, paid directly to TikTok.",
      "On TikTok, the ads that work look like the videos in the feed: shot vertically, with a hook in the first few seconds and text on screen.",
      "A hook wears out in a few weeks: a TikTok campaign needs new videos every month.",
      "TikTok suits businesses where the result is visible straight away: beauty, hairdressing, cosmetics, restaurants, leisure.",
    ],
    faq: [
      {
        q: "What is the minimum budget for a TikTok ad?",
        a: "In TikTok Ads Manager, the daily budget of an ad group must be more than 20 dollars, which is a little over 600 dollars over a month. If a budget is set at campaign level, it must be more than 50 dollars a day.",
      },
      {
        q: "Can you advertise on TikTok in Morocco?",
        a: "Yes. A business in Morocco creates its campaigns in TikTok Ads Manager, as anywhere else, and can target a Moroccan audience.",
      },
      {
        q: "What videos work on TikTok Ads?",
        a: "Vertical videos that look like content in the feed: a hook in the first few seconds, a person speaking to camera, text on screen and a clear offer. An ad that looks like an ad gets skipped.",
      },
      {
        q: "How much does TikTok campaign management cost?",
        a: `At UltraVision Agency in Marrakech, managing TikTok Ads costs ${both(MEDIA)} a month excluding tax, not including the advertising budget paid to TikTok. An advertising video costs ${both(VIDEO)}.`,
      },
    ],
    body: [
      {
        k: "p",
        v: "TikTok lets you show a treatment, a haircut, a dish or a night out to people who do not know you yet. Before launching a campaign, three questions: how much to plan for, which videos to film, and how to tell whether it is working.",
      },

      { k: "h2", v: "The minimum budget set by TikTok" },
      {
        k: "p",
        v: "In TikTok Ads Manager, the daily budget of an ad group must be more than 20 dollars. If you also set a budget at campaign level, it must be more than 50 dollars a day. An ad group run for a whole month at the minimum therefore comes to a little over 600 dollars, paid directly to TikTok.",
      },
      {
        k: "table",
        v: {
          head: ["Level", "Minimum daily budget", "Over a month"],
          rows: [
            ["Ad group", "More than 20 dollars", "More than 600 dollars"],
            [
              "Campaign, if a budget is set there",
              "More than 50 dollars",
              "More than 1,500 dollars",
            ],
          ],
        },
      },
      {
        k: "note",
        v: "The Moroccan press reports that 20% VAT has applied since 1 August 2026 to TikTok ads bought by advertisers in Morocco. Check it on your TikTok invoices and allow for it in the budget.",
      },

      { k: "h2", v: "The useful budget" },
      {
        k: "p",
        v: `The minimum lets you run ads, not learn from them. To know which video works, each one has to get enough views to be compared with the others. We advise starting with a single ad group, three or four videos and a budget held for at least four weeks, rather than several ad groups at the minimum that learn nothing. Across all platforms, we quote ${AD_BUDGET} of advertising budget a month to start.`,
      },

      { k: "h2", v: "The videos that work on TikTok" },
      {
        k: "ul",
        v: [
          "Shot vertically from the start, not cropped from a horizontal format.",
          "A hook in the first few seconds: a result, a question, a gesture.",
          "Text on screen and subtitles, for people watching without sound.",
          "A person speaking to camera, rather than a voiceover on images.",
          "The price or the offer stated clearly, before the end.",
        ],
      },
      {
        k: "p",
        v: "A TikTok ad that looks like an ad gets skipped. One that looks like a video from the feed — the manager showing her salon, the barber finishing a fade, the client seeing her result — gets watched.",
      },

      { k: "h2", v: "Refreshing before wear-out" },
      {
        k: "p",
        v: "The same video shown too often to the same people loses its effect within a few weeks, and the cost per result goes back up. A TikTok campaign therefore needs new videos every month, with several hooks tested in parallel: the same four-videos-a-month rhythm we also apply on Meta.",
      },

      { k: "h2", v: "TikTok or Meta?" },
      {
        k: "p",
        v: "The two are not mutually exclusive. We usually launch Meta — Facebook and Instagram — first, then TikTok with the same angles adapted to its codes, once a video has proved itself. TikTok then widens the audience of a campaign that already works.",
      },

      { k: "h2", v: "Measuring what counts" },
      {
        k: "p",
        v: "Before launching, install the TikTok pixel on the website and set up conversions: contact request, booking, purchase. Without them, TikTok optimises for views, and a campaign with lots of views may produce no customers at all.",
      },
      {
        k: "quote",
        v: "On TikTok, the video does most of the work; the budget only amplifies it.",
      },

      { k: "h2", v: "What we do" },
      {
        k: "p",
        v: `We shoot vertical videos for TikTok, open the ad account with its pixel and conversions, and manage the advertising every week. An advertising video costs ${both(VIDEO)}, opening the ad accounts ${both(OUVERTURE)}, and managing TikTok Ads ${both(MEDIA)} a month, excluding tax and excluding the budget paid to TikTok.`,
      },
    ],
  },
};
