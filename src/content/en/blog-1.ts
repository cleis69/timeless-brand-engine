import type { ArticlesEn } from "./types";
import { A_LA_CARTE, PACKS, formatDirham, formatEuro } from "@/config/pricing";

/**
 * Articles du blog, en anglais (lot 1). Cles : slugs francais.
 *
 * Les montants sont lus dans pricing.ts, exactement comme dans
 * src/content/blog.ts : un prix qui change dans la grille change ici
 * aussi. Seule l'ecriture differe (« MAD 5,400 (≈ €490) »).
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
/** « €390 (≈ MAD 4,300) » */
const both = (eur: number) => `${formatEuro(eur, "en")} (≈ ${formatDirham(eur, "en")})`;
/** « €800 to €1,500 (≈ MAD 8,800 to 16,500) » */
const range = (a: number, b: number) =>
  `${formatEuro(a, "en")} to ${formatEuro(b, "en")} (≈ ${formatDirham(a, "en")} to ${formatDirham(b, "en").replace("MAD ", "")})`;

const VIDEO = carte("Vidéo publicitaire");
const MEDIA = carte("Media buying");
const ESSAI = pack("essai");
const PRODUCTION = pack("production");
/** Budget publicitaire de depart, tel qu'annonce sur /tarifs. */
const AD_BUDGET = range(800, 1500);

export const ARTICLES_EN_1: ArticlesEn = {
  /* ======================================================================
   *  1. TOFU / MOFU / BOFU
   * ==================================================================== */
  "tofu-mofu-bofu-video-publicitaire": {
    title: "TOFU, MOFU, BOFU: why a single video cannot sell",
    seoTitle: "TOFU, MOFU, BOFU for video ads",
    excerpt:
      "Most campaigns fail for a mechanical reason: they show the same film to someone discovering the brand and to someone hesitating over a purchase. Here is how we split production into three stages.",
    category: "Strategy",
    seo: "TOFU, MOFU, BOFU applied to video advertising: which film to produce for each stage of the funnel, in what order, and with what budget to give each of them.",
    takeaways: [
      "TOFU, MOFU and BOFU are the three stages of an acquisition funnel: the top, the middle and the bottom. Each one speaks to a person who knows more about the brand than the one before.",
      "A TOFU video lasts 8 to 15 seconds, does not talk about the brand and exists only to stop the scroll. A MOFU video lasts 20 to 45 seconds and provides the proof. A BOFU video lasts 10 to 20 seconds and presents the offer.",
      "A single video cannot cover all three stages: it will be too salesy for a cold audience and too vague for an audience that is ready to buy.",
      "The recommended starting split is two TOFU videos, one MOFU and one BOFU per month, with 50 to 60% of the media budget on the top of the funnel.",
      "A funnel is built from the bottom up: BOFU speaks to an audience that already exists and pays for what comes next. Opening with TOFU means paying for attention that nothing captures.",
    ],
    faq: [
      {
        q: "What do TOFU, MOFU and BOFU mean?",
        a: "They stand for top of funnel, middle of funnel and bottom of funnel — the three stages of the conversion funnel. TOFU refers to content for people who do not know the brand, MOFU to people who know it but are hesitating, and BOFU to people who are ready to buy.",
      },
      {
        q: "How many videos do you need to cover all three stages?",
        a: "Four videos a month are enough for a complete funnel: two TOFU, one MOFU and one BOFU. The top of the funnel needs more production because a hook wears out in three to six weeks, whereas a proof video can be reused for months.",
      },
      {
        q: "Which stage should you start with when starting from scratch?",
        a: "The bottom. A BOFU video sent to an audience that already exists — website visitors, customer base, followers — delivers immediate results and funds the construction of the upper stages. It is also the quickest test of whether the product has an angle.",
      },
      {
        q: "What share of the ad budget should go to each stage?",
        a: "Once things are running: 50 to 60% on TOFU, 20 to 30% on MOFU and 20% on BOFU. Putting the whole budget on BOFU gives excellent results for three weeks, then the cost per lead doubles because the audience is exhausted.",
      },
    ],
    body: [
      {
        k: "p",
        v: "Advertisers almost always call us with the same sentence: ‘I made a video, I put money behind it, and nothing happened.’ Nine times out of ten, the video was not bad. It was on its own.",
      },
      {
        k: "p",
        v: "An ad does not take someone from not knowing you to buying. It moves them forward one notch. If you only have one notch, everyone stays where they are.",
      },

      { k: "h2", v: "The three stages, in one sentence each" },
      {
        k: "p",
        v: "TOFU, MOFU and BOFU divide the funnel into three moments. The terms stand for top, middle and bottom of funnel. Behind the acronyms there is only one question: what does the person already know about you at the moment your video appears?",
      },
      {
        k: "figure",
        v: {
          type: "funnel",
          caption:
            "The three stages of the funnel. The width represents the size of the audience reached: many people at the top, few at the bottom, but a value per person that rises at each stage.",
          levels: [
            {
              label: "TOFU — top",
              value: "8 to 15 s",
              sub: "The person does not know you. The video has to stop the thumb and raise a problem they recognise.",
              note: "Cold audience · 50 to 60% of the budget",
            },
            {
              label: "MOFU — middle",
              value: "20 to 45 s",
              sub: "They have seen you but have not decided. The video has to prove you know what you are doing.",
              note: "Audience that has already engaged · 20 to 30% of the budget",
            },
            {
              label: "BOFU — bottom",
              value: "10 to 20 s",
              sub: "They are hesitating and comparing. The video has to remove the last obstacle and prompt action.",
              note: "Warm audience · 20% of the budget",
            },
          ],
        },
      },
      {
        k: "quote",
        v: "A BOFU video shown to someone who does not know you sells nothing. It irritates.",
      },

      { k: "h2", v: "TOFU — the video that stops the thumb" },
      {
        k: "p",
        v: "At the top of the funnel, your competitor is not the other brand. It is the viewer's thumb. You have one or two seconds before they scroll on, and they did not ask for anything.",
      },
      {
        k: "p",
        v: "So a TOFU video never talks about you. It talks about a problem the person recognises immediately, or it shows something they are not used to seeing. The brand name may only appear at the end, and sometimes not at all.",
      },
      {
        k: "ul",
        v: [
          "Length: 8 to 15 seconds. Beyond that, attention drops sharply.",
          "The hook lands in the first 2 seconds, with no logo and no introduction.",
          "No industry jargon: the person does not yet know what you are talking about.",
          "One message only. Two messages in a TOFU video means no message.",
        ],
      },
      {
        k: "p",
        v: "This is the stage where volume matters most. A hook that works cannot be guessed, it has to be found — and finding it means testing several. That is why our monthly plans include four videos rather than one: four different angles on the same product, of which usually only one really stands out.",
      },

      { k: "h2", v: "MOFU — the video that proves" },
      {
        k: "p",
        v: "In the middle, the person has already seen you. They do not need to be surprised, they need to be reassured. This is the most frequently forgotten stage, and the one where the most sales are lost: the prospect understands the problem but does not yet know why it should be you rather than someone else.",
      },
      {
        k: "ul",
        v: [
          "A real demonstration of the product or service, filmed without effects.",
          "Behind the scenes, method, workshop: whatever shows that you know your trade.",
          "A customer testimonial, if and only if the customer is real and named.",
          "An honest comparison: what you do, and what you do not do.",
        ],
      },
      {
        k: "p",
        v: "The format gets longer: 20 to 45 seconds. Here we accept that the person will watch for longer, because they have already shown an interest. The targeting changes too: we are no longer addressing a cold audience, but people who have seen the TOFU video, visited the website or engaged with the account.",
      },
      {
        k: "note",
        v: "This stage is where the difference lies between an agency that delivers videos and an agency that runs the distribution. A MOFU video sent to a cold audience spends budget for nothing. The film may be excellent: shown at the wrong moment, it proves nothing to anyone.",
      },

      { k: "h2", v: "BOFU — the video that prompts action" },
      {
        k: "p",
        v: "At the bottom, the person is ready. They compare, they calculate, they put it off. Your video now has only one job: to remove the last reason not to go ahead.",
      },
      {
        k: "ul",
        v: [
          "The offer is stated clearly, with its price or its entry condition.",
          "The guarantee, the timeframe or the option to cancel is shown, not implied.",
          "A single call to action, repeated. Not three options.",
          "Short again: 10 to 20 seconds is enough.",
        ],
      },
      {
        k: "p",
        v: "This is the least creative and most profitable stage. The cost per acquisition is almost always the lowest in the account — which leads many advertisers to invest only there. That is a short-term mistake: without TOFU, the BOFU audience runs dry within a few weeks and the cost soars.",
      },

      { k: "h2", v: "How we split production" },
      {
        k: "p",
        v: "Across four videos a month, our starting split is as follows. It then shifts according to what the numbers say.",
      },
      {
        k: "figure",
        v: {
          type: "bars",
          caption:
            "Split of the media budget across four monthly videos. The top of the funnel takes more than half of the spend because it is the only stage where we are still searching.",
          unit: "Share of the monthly ad budget, excluding production.",
          bars: [
            { label: "TOFU — 2 videos", value: 55, display: "50 to 60%", highlight: true },
            { label: "MOFU — 1 video", value: 25, display: "20 to 30%" },
            { label: "BOFU — 1 video", value: 20, display: "20%" },
          ],
        },
      },
      {
        k: "p",
        v: "Two TOFU videos because that is the stage where we are still searching. One MOFU and one BOFU because those two, once found, can be reused for months: a good proof video hardly wears out, whereas a hook wears out in three to six weeks.",
      },
      {
        k: "quote",
        v: "Hooks wear out. Proof does not. That is why we produce more for the top of the funnel than for the bottom.",
      },

      { k: "h2", v: "The order in which we build" },
      {
        k: "p",
        v: "Counter-intuitively, we do not start at the top. We start at the bottom.",
      },
      {
        k: "figure",
        v: {
          type: "steps",
          caption:
            "The order of construction, the reverse of the order of reading. First we set up what converts, then what attracts.",
          steps: [
            {
              label: "Week 1 — BOFU",
              sub: "A ready audience already exists: website visitors, customer base, followers.",
            },
            {
              label: "Weeks 2 to 4 — MOFU",
              sub: "We put the proof in place while BOFU runs and brings in results.",
            },
            {
              label: "Month 2 — TOFU",
              sub: "We open the top once everything that follows is in place.",
            },
            {
              label: "Month 3 — Shift",
              sub: "The budget moves towards the top, and the bottom runs on its own.",
            },
          ],
        },
      },
      {
        k: "p",
        v: "Opening with TOFU is like pouring water into a pipe that has not been connected yet. You are paying for attention that nothing captures.",
      },

      { k: "h2", v: "The three mistakes we see most often" },
      {
        k: "ul",
        v: [
          "A single video pushed to everyone. It is bound to be too vague for the bottom and too salesy for the top.",
          "The entire budget on BOFU. Results are excellent for three weeks, then the cost per lead doubles for no apparent reason: the audience has simply been exhausted.",
          "Changing videos too quickly. A hook needs a few thousand impressions before it tells you anything. Cutting it after two days means never learning anything.",
        ],
      },

      { k: "h2", v: "What it looks like in practice" },
      {
        k: "p",
        v: "The first month is used to set up the three stages and find the hook. The following months are used to replace what wears out — which, almost always, means the top of the funnel. That is exactly the rhythm of our monthly plans: four videos, spread across the three stages, and managed distribution that decides where every euro goes.",
      },
      {
        k: "note",
        v: "If you are starting from scratch, do not try to build all three stages in the first month. A single BOFU video sent to your existing base will teach you more, and faster, than three films sent to strangers.",
      },
    ],
  },

  /* ======================================================================
   *  2. LE PRIX D'UNE VIDEO
   * ==================================================================== */
  "combien-coute-une-video-publicitaire": {
    title: "How much does a video ad cost? Prices in dirhams and euros",
    seoTitle: "Video ad prices in Morocco",
    excerpt: `Anywhere from ${range(150, 15000)} for things that go by the same name. What really changes from one quote to another, the prices charged in Marrakech, and the questions to ask before signing.`,
    category: "Pricing",
    seo: "The price of a video ad in dirhams and euros: what makes a quote vary, our rates in Marrakech, and the five questions to ask before you sign anything.",
    takeaways: [
      `The price of a video ad ranges from ${both(150)} for a simple edit to more than ${both(15000)} for a production with a full crew and actors.`,
      `For online advertising, the relevant range is ${range(400, 1200)}: writing, filming and editing with a small crew.`,
      `In Marrakech, UltraVision Agency charges ${both(VIDEO)} excluding tax and ad budget for a video ad: angle, script, filming, editing and vertical formats included.`,
      "Five factors explain most of the differences: whether there is a shoot, the time spent on writing, external contributors, the number of versions, and whether campaign management is included.",
      "The ad budget paid to the platforms is almost never included in the price of a video. It is the leading source of misunderstanding between an agency and its client.",
      "On a phone feed, an €8,000 shot and a €400 shot take up the same screen area for the same second and a half. The hook matters more than the filming budget.",
    ],
    faq: [
      {
        q: "How much does a video ad for Meta or TikTok cost?",
        a: `Allow ${range(400, 1200)} for a light production including writing, filming and editing. Below ${both(400)}, it is usually an edit made from footage you supply. Above ${both(3000)}, you are into heavy production, which is rarely justified for online advertising.`,
      },
      {
        q: "How much does a video ad cost in Morocco?",
        a: `At UltraVision Agency, in Marrakech, a video ad costs ${both(VIDEO)} excluding tax: angle, script, filming, editing and vertical formats. A first video with 14 days of managed distribution costs ${both(ESSAI)}. The ad budget paid to the platforms always comes on top.`,
      },
      {
        q: "Is the ad budget included in the price of a video?",
        a: `No, almost never. The media budget is paid directly to the platforms from your own ad account. It comes on top of the production cost. Allow ${AD_BUDGET} a month to start, depending on the sector.`,
      },
      {
        q: "What questions should you ask before signing a video quote?",
        a: "Five questions are enough: is the ad budget included, how many rounds of edits are included, who owns the source files and the ad account, who pays for actors and locations, and what happens if the video does not perform.",
      },
      {
        q: "Is a more expensive video more effective?",
        a: "Not automatically. Beyond a certain level of technical quality, the filming budget no longer shows on a phone screen. What makes the difference in performance is the advertising angle and the quality of the first two seconds.",
      },
    ],
    body: [
      {
        k: "p",
        v: "It is the first question we are asked, and also the hardest one to answer honestly, because ‘a video ad’ does not describe one thing but a family of things that have almost nothing in common.",
      },

      { k: "h2", v: "What really makes a quote vary" },
      {
        k: "ul",
        v: [
          "The shoot. A video edited from existing footage and a video filmed on location are not the same service. A shoot means a crew, a day, equipment and a location.",
          "The writing. A script arrived at after three drafts costs more than one written in a single pass — and it often sells three times better.",
          "The contributors. An actor, a model or a paid location are always added to the quote. An agency that does not mention them will bill you for them later.",
          "The versions. One video, or one video adapted into four formats, is not the same editing job.",
          "The distribution. Some prices include campaign management, others do not. This is the biggest source of misunderstanding.",
        ],
      },

      { k: "h2", v: "The three main price ranges on the market" },
      {
        k: "figure",
        v: {
          type: "bars",
          caption:
            "The three ranges on the market, at average observed prices. The middle range is the one that suits almost every online campaign.",
          unit: "Price excluding tax for one video, excluding ad budget.",
          bars: [
            { label: "Editing only, no shoot", value: 275, display: "€150 to €400" },
            {
              label: "Light production — small crew",
              value: 800,
              display: "€400 to €1,200",
              highlight: true,
            },
            { label: "Heavy production — full crew", value: 9000, display: "€3,000 to €15,000" },
          ],
        },
      },
      {
        k: "p",
        v: "For online advertising, the middle range is almost always the right one. Heavy production makes beautiful films that the algorithm treats exactly like the others — and on a feed, an €8,000 shot and a €400 shot take up the same screen area for the same second and a half.",
      },
      {
        k: "quote",
        v: "On a phone, a filming budget does not show. A good hook does.",
      },

      { k: "h2", v: "The five questions to ask before signing" },
      {
        k: "ul",
        v: [
          "Is the ad budget included? The answer is almost always no, and that is normal — but it should be in writing.",
          "How many rounds of edits are included? Two rounds is the norm. Unlimited does not exist.",
          "Who owns the source files and the ad account?",
          "Who pays for the actors, the locations and the licensed music?",
          "What happens if the video does not perform? A serious agency has a prepared answer, which is neither ‘we will redo it for free’ nor ‘that is not our problem’.",
        ],
      },

      { k: "h2", v: "What we charge" },
      {
        k: "p",
        v: "We publish our prices, line by line, on our pricing page — including what is never included. This is not transparency for its own sake: almost every breakdown between an agency and a client comes from a line nobody discussed before starting.",
      },
      {
        k: "table",
        v: {
          head: ["Service, in Marrakech", "Price excluding tax"],
          rows: [
            ["One video ad: angle, script, filming, editing", both(VIDEO)],
            ["A first video, with 14 days of managed distribution", both(ESSAI)],
            ["Four videos a month, managed distribution included", `${both(PRODUCTION)} a month`],
            ["Recommended starting ad budget, paid to the platforms", `${AD_BUDGET} a month`],
          ],
        },
      },
      {
        k: "note",
        v: "Amounts in dirhams are converted at the agency's commercial rate; quotes are issued in euros, which are binding. We film in Casablanca, Rabat, Tangier and Agadir at no extra charge.",
      },
    ],
  },

  /* ======================================================================
   *  3. POURQUOI 4 VIDEOS
   * ==================================================================== */
  "pourquoi-quatre-videos-par-mois": {
    title: "Why four videos a month, not one very good one",
    seoTitle: "Why four videos a month",
    excerpt:
      "Nobody knows in advance which hook will work — not you, not us, not the algorithm. What decides it is the number of attempts.",
    category: "Method",
    seo: "Why produce four video ads a month rather than a single one: creative fatigue, testing several angles and the logic of the platforms' delivery algorithms.",
    takeaways: [
      "A video ad that works sees its cost per result rise after three to six weeks. This is called creative fatigue, and it is unavoidable.",
      "Nobody can predict which advertising angle will work: given four equally defensible angles, experienced teams get it wrong about one time in two.",
      "Ad delivery algorithms optimise by comparing several creatives against each other. With a single video, the platform has nothing to compare and the cost stays higher.",
      "Four videos a month make it possible to test four angles, keep a reserve while the leading video wears out, and feed all three stages of the funnel.",
      "With a limited budget, a single video is still useful — but it should be treated as a test to identify an angle, not as a campaign.",
    ],
    faq: [
      {
        q: "How many video ads should you produce each month?",
        a: "Four is the threshold at which a setup becomes stable: two for the top of the funnel, one for proof, one for the offer. Below that, there is not enough material to test angles or to make up for creative fatigue.",
      },
      {
        q: "What is creative fatigue in advertising?",
        a: "It is the gradual rise in the cost per result of an ad that has performed well. It is not caused by the video getting worse but by the targeted audience having already seen it several times. It usually appears between the third and the sixth week.",
      },
      {
        q: "Is one highly polished video better than several decent ones?",
        a: "Several decent videos, in almost every case. The winning angle depends on the audience, the timing and the competition in the auctions — no expertise replaces a test, and a test requires several variants.",
      },
    ],
    body: [
      {
        k: "p",
        v: "It is the most common objection to our monthly plans: ‘I would rather have one video, but really well made.’ It is a reasonable instinct, and it is wrong, for two mechanical reasons.",
      },

      { k: "h2", v: "First reason: nobody knows in advance" },
      {
        k: "p",
        v: "For any given product, four angles are always defensible: proof, emotion, offer, urgency. When we ask a team to bet on which one will win, they get it wrong about one time in two. So do we.",
      },
      {
        k: "p",
        v: "This is not a lack of skill, it is the nature of the problem: the winning hook depends on the audience, the timing and the competition in the auctions that month. No expertise replaces a test.",
      },
      {
        k: "quote",
        v: "An agency that promises you the right hook first time is selling you a certainty it does not have.",
      },

      { k: "h2", v: "Second reason: a hook wears out" },
      {
        k: "p",
        v: "A video that performs well sees its cost per result rise after three to six weeks. It is not the video that deteriorates: it is the audience that has already seen it. The platforms call this creative fatigue, and it is unavoidable.",
      },
      {
        k: "p",
        v: "With a single video, then, you do not have an asset: you have a countdown. When it wears out, the campaign stops, and a full production cycle has to start again while nothing is running.",
      },

      { k: "h2", v: "What four videos actually make possible" },
      {
        k: "figure",
        v: {
          type: "split",
          caption:
            "What changes when you move from one video to four. The left-hand column describes a gamble, the right-hand column a system.",
          left: {
            title: "With a single video",
            items: [
              "One angle tested, chosen by guesswork",
              "No reserve when it wears out",
              "Only one stage of the funnel fed",
              "Nothing for the algorithm to compare",
              "Campaign on hold during the next production",
            ],
          },
          right: {
            title: "With four videos a month",
            items: [
              "Four angles tested in parallel",
              "A reserve ready when the first one tires",
              "All three stages fed continuously",
              "Enough for the algorithm to choose between",
              "No break in distribution",
            ],
          },
        },
      },
      {
        k: "note",
        v: "The last point is the least intuitive. Advertising platforms optimise delivery by comparing creatives against each other. With a single video, there is nothing to compare: you deprive the system of the lever it uses to bring your cost down.",
      },

      { k: "h2", v: "What if the budget does not allow it?" },
      {
        k: "p",
        v: "Then start with one, but know what you are buying: a test, not a campaign. That is exactly what our Trial plan is for — one video, two weeks of distribution, and a report. It does not claim to set up a funnel. It tells you whether the product has an angle.",
      },
    ],
  },

  /* ======================================================================
   *  4. LE FORMAT VERTICAL
   * ==================================================================== */
  "format-vertical-9-16": {
    title: "Vertical format is not a crop",
    excerpt:
      "Taking a horizontal video and cutting off the sides produces a vertical video that is technically compliant and commercially dead. What really changes when you shoot for 9:16.",
    category: "Production",
    seo: "Vertical 9:16 format in advertising: why cropping a horizontal video does not work, and how to compose shots directly for the phone screen from the start.",
    takeaways: [
      "Cropping a video shot in 16:9 to 9:16 removes around 68% of the image area, and usually the subject along with it.",
      "A video intended for vertical format is framed tighter, with the subject placed in the top third of the image.",
      "The bottom third must be left clear: it is the area where the platforms display their buttons, the account name and the ad text.",
      "Sideways camera movements do not work in vertical: a horizontal pan crosses a narrow frame in half a second.",
      "Everything must remain understandable without sound, as most views start muted.",
    ],
    faq: [
      {
        q: "Can you turn a horizontal video into a vertical one?",
        a: "Technically yes, but the result rarely converts. Cropping removes around 68% of the image, shifts the composition and often pushes the text out of frame. It only holds up if the original video was shot in high definition with deliberately loose framing, and that decision was made before the shoot.",
      },
      {
        q: "What format should a Meta, TikTok or YouTube Shorts ad use?",
        a: "9:16, or 1080 x 1920 pixels. It is the native format of Reels, Stories, TikTok and Shorts. A square or horizontal video takes up less screen area there and loses impact.",
      },
      {
        q: "Where should text go in a vertical video?",
        a: "In the top half, avoiding the bottom 20% of the image where the platforms overlay their interface. Text must stay readable without sound, since most views start muted.",
      },
    ],
    body: [
      {
        k: "p",
        v: "We regularly receive corporate videos shot in 16:9, with a request to ‘make them vertical for social media’. It can be done in ten minutes. The result almost never converts.",
      },

      { k: "h2", v: "What cropping destroys" },
      {
        k: "figure",
        v: {
          type: "bars",
          caption:
            "What remains of an image when it is moved from one format to another. Cropping 16:9 to 9:16 keeps only about a third of the original area.",
          unit: "Image area kept after cropping.",
          bars: [
            { label: "Shot directly in 9:16", value: 100, display: "100%", highlight: true },
            { label: "16:9 cropped to 9:16", value: 32, display: "about 32%" },
            { label: "16:9 cropped to 1:1", value: 56, display: "about 56%" },
          ],
        },
      },
      {
        k: "ul",
        v: [
          "The composition. A wide horizontal shot cropped to vertical loses most of its image, and usually the subject along with it.",
          "The on-screen text. Positioned for a wide frame, it falls out of the frame or ends up under the app's interface.",
          "The pace. A horizontal video is written for a screen people watch; a vertical one, for a screen people scroll.",
        ],
      },

      { k: "h2", v: "What we do differently on the shoot" },
      {
        k: "ul",
        v: [
          "Subjects are framed tighter, and centred in the top third of the image.",
          "The bottom third is left clear: that is where the platforms place their buttons, their text and the account name.",
          "Movement is vertical rather than sideways — a horizontal pan crosses a narrow frame in half a second.",
          "Everything is readable without sound. Most views start muted.",
        ],
      },
      {
        k: "quote",
        v: "A well-shot vertical video is still watchable horizontally. The reverse is almost never true.",
      },

      { k: "h2", v: "When cropping can be justified" },
      {
        k: "p",
        v: "When the original video was shot in very high definition with deliberately loose wide shots, a clean vertical frame can be taken from it. That decision is made before the shoot, not after — and it is what we do when the same content has to live on television and on phones.",
      },
    ],
  },

  /* ======================================================================
   *  5. HUMAINS + IA
   * ==================================================================== */
  "ce-que-l-ia-fait-vraiment-dans-notre-production": {
    title: "What artificial intelligence really does in our production",
    seoTitle: "AI in our video production",
    excerpt:
      "Everyone advertises AI, almost nobody says where it is used. Here is the exact list, including what we refuse to hand over to it.",
    category: "Method",
    seo: "AI and video production: where artificial intelligence saves time, where it makes the result worse, and why the filming itself always stays in human hands.",
    takeaways: [
      "Artificial intelligence saves time on four video production tasks: logging footage, subtitles, adapting approved scripts and the first sort of performance data.",
      "These four tasks have one thing in common: they are tedious, can be checked at a glance, and a mistake in them has no consequences.",
      "Four decisions remain human at UltraVision Agency: the advertising angle, the filming, the testimonials and the final edit.",
      "An AI-generated face can be spotted, and a brand caught showing people who do not exist loses more credibility than it gained in time.",
      "A fake customer testimonial is a misleading commercial practice, whatever technology is used to produce it.",
    ],
    faq: [
      {
        q: "Can AI replace a video shoot?",
        a: "For brand advertising, no. Generated faces and settings remain recognisable, and the risk to credibility outweighs the time saved. AI is, however, effective before and after the shoot: preparation, logging footage, subtitling, adaptations.",
      },
      {
        q: "Do you use AI to write ad scripts?",
        a: "To adapt an already approved angle into several short variants, yes. To find the angle itself, no: that decision requires knowing the client, their market and what they cannot say.",
      },
      {
        q: "How can you tell whether an agency uses AI honestly?",
        a: "Ask for the precise list of tasks involved, and above all the ones it refuses to hand over to AI. An agency that answers ‘we are powered by AI’ without being able to give details has probably not thought the question through.",
      },
    ],
    body: [
      {
        k: "p",
        v: "‘Powered by AI’ no longer means anything. So let us be precise: here is where it is used at our agency, and where we have decided it will not be.",
      },

      { k: "h2", v: "Where it saves time" },
      {
        k: "ul",
        v: [
          "Logging footage. Finding the usable takes in four hours of footage used to take half a day. Today it is a matter of minutes.",
          "Subtitles. Automatic transcription, then human proofreading. The gain is real and the risk is low.",
          "Script variants. Adapting an approved angle into four short versions, for testing.",
          "The first sort of performance data. Spotting what deserves a closer look in the data, before we analyse it ourselves.",
        ],
      },
      {
        k: "p",
        v: "What these four tasks have in common: they are tedious, can be checked at a glance, and a mistake in them has no consequences. These are exactly the criteria that make automation reasonable.",
      },

      { k: "h2", v: "Where we do not use it" },
      {
        k: "figure",
        v: {
          type: "split",
          caption:
            "The exact division. On the left, what we keep; on the right, what we hand over to the machine. The test is simple: can a mistake be caught at a glance?",
          left: {
            title: "Never handed over to AI",
            items: [
              "The advertising angle and the promise",
              "The filming and the faces",
              "Customer testimonials",
              "The final edit and its pace",
            ],
          },
          right: {
            title: "Handed over to AI",
            items: [
              "Logging several hours of footage",
              "Transcribing subtitles",
              "Variants of an already approved script",
              "The first sort of performance data",
            ],
          },
        },
      },
      {
        k: "ul",
        v: [
          "The advertising angle. It is the decision that determines everything else, and it requires knowing the client, their market and what they cannot say.",
          "The filming. A generated face can be spotted, and a brand caught showing people who do not exist loses more than it gained.",
          "Testimonials. Never. A fake testimonial is a misleading commercial practice, whatever the technology used.",
          "The final edit. The pace of a video ad is decided frame by frame, and that is still a craft.",
        ],
      },
      {
        k: "quote",
        v: "AI saves us hours on what is tedious. It has never given us an idea.",
      },

      { k: "h2", v: "Why we say it in this order" },
      {
        k: "p",
        v: "On our home page, the line reads ‘conceived, filmed and edited by humans, amplified by artificial intelligence’. The order is deliberate. In a market where everyone advertises AI, what is becoming rare is no longer AI — it is the human hand. What is rare should come first.",
      },
      {
        k: "note",
        v: "This page will be updated when our practices change. If you are reading this article in six months and the list seems dated, tell us: it means it is.",
      },
    ],
  },

  /* ======================================================================
   *  6. LE BUDGET META ADS
   * ==================================================================== */
  "budget-meta-ads-maroc": {
    title: "What budget for Facebook Ads and Meta Ads in Morocco? The calculation, not an average",
    seoTitle: "Facebook Ads cost in Morocco: the budget",
    excerpt:
      "Facebook and Instagram accept campaigns at a few dirhams a day. The real question is not the minimum allowed, but the minimum that is useful: the one that gives the algorithm enough results to learn.",
    category: "Pricing",
    seo: "Facebook Ads cost and budget in Morocco: how much to spend on Facebook and Instagram, in dirhams, worked out from the cost of a result and the learning phase.",
    takeaways: [
      "A Meta Ads budget is calculated from the cost of a result, not from a market average: it must allow each ad set to obtain conversions regularly.",
      "According to Meta's documentation, an ad set exits its learning phase after about 50 optimisation events over seven days. During this phase, costs are higher and less stable.",
      "The starting calculation fits on one line: the estimated cost of a result, multiplied by 50 results a week, multiplied by four weeks.",
      "A small budget spread over several campaigns learns nothing: every split by audience, city or format divides the results the algorithm receives.",
      `To start, UltraVision Agency recommends an ad budget of ${AD_BUDGET} a month, paid directly to Meta from the advertiser's account, on top of production and campaign management fees.`,
    ],
    faq: [
      {
        q: "How much does Facebook advertising cost in Morocco?",
        a: `There are two separate costs: the ad budget, paid directly to Meta from your account, and the agency's fees. To start, UltraVision Agency recommends an ad budget of ${AD_BUDGET} a month. Production and campaign management fees are published on the pricing page.`,
      },
      {
        q: "What is the minimum budget for advertising on Facebook in Morocco?",
        a: "Technically, Meta accepts very small daily budgets. For a campaign to learn, you need to aim for about 50 results a week per ad set, which most often means several thousand dirhams a month depending on the cost of a result in your sector.",
      },
      {
        q: "Is the ad budget included in an agency's fees?",
        a: "No. The ad budget is paid directly to Meta from the advertiser's account. The agency's fees pay for video production and campaign management. The two should appear as two separate lines on the quote.",
      },
      {
        q: "How long before you can judge a Meta Ads campaign?",
        a: "Two weeks at least. The first week is often spent getting out of the learning phase: judging before then means judging the algorithm while it is learning, not the ad.",
      },
      {
        q: "What if the calculated budget is more than I can spend?",
        a: "Change the optimised event rather than cutting the budget. Optimising for a more frequent event, such as a click to WhatsApp or a visit to the contact page, makes it possible to reach 50 weekly events with less money, at the cost of a less precise signal.",
      },
      {
        q: "Does VAT apply to Meta advertising in Morocco?",
        a: "Yes, since 1 October 2026. Meta adds 20% VAT to ad purchases on accounts whose country of sale is Morocco and that have no tax ID on file. A business that enters its tax ID in the payment settings is no longer charged VAT by Meta, but declares it itself under the reverse-charge mechanism. Your accountant will tell you which case applies to you.",
      },
    ],
    body: [
      {
        k: "p",
        v: "‘How much should I put into Facebook?’ The honest answer starts with another question: how much does a customer cost you, and how much do they bring in? Meta lets you launch a campaign with a few dirhams a day. That technical minimum has almost nothing to do with the useful minimum.",
      },

      { k: "h2", v: "The technical minimum and the useful minimum" },
      {
        k: "p",
        v: "A campaign launched with a tiny budget starts normally: impressions come in, a few clicks, then nothing. It is not that the ad does not work. It is that the algorithm has not received enough results to understand who to show it to.",
      },
      {
        k: "p",
        v: "Meta says so in its documentation: an ad set stays in the learning phase until it has obtained about 50 optimisation events — purchases, contact requests, sign-ups — over a seven-day period. During this phase, delivery is trial and error, and each result costs more than it will later.",
      },

      { k: "h2", v: "The calculation, in three lines" },
      {
        k: "ul",
        v: [
          "Estimate the cost of a result: a contact request, a booking, a purchase. Without any history, start from a cautious assumption, and correct it after two weeks of delivery.",
          "Multiply by 50: that is the weekly volume that allows an ad set to learn.",
          "Multiply by four weeks: you get the monthly budget that gives a campaign a real chance.",
        ],
      },
      {
        k: "table",
        v: {
          head: ["Cost of a result (example)", "50 results a week", "Budget over four weeks"],
          rows: [
            ["MAD 20 — a sign-up", "MAD 1,000", "MAD 4,000"],
            ["MAD 50 — a contact request", "MAD 2,500", "MAD 10,000"],
            ["MAD 150 — a qualified quote request", "MAD 7,500", "MAD 30,000"],
          ],
        },
      },
      {
        k: "note",
        v: "These costs are examples chosen to show the calculation, not averages for the Moroccan market. The real cost of a result depends on your sector, your offer, your area and above all your videos.",
      },
      {
        k: "p",
        v: "When the resulting budget is more than you can spend, do not lower the figure: change the event. Optimising for a more frequent action — a click to WhatsApp, a visit to the contact page — makes it possible to reach 50 events with less money. The signal is less precise, but the campaign learns, which is better than a precise campaign that never learns.",
      },

      { k: "h2", v: "Why a small budget gets spread too thin" },
      {
        k: "p",
        v: "The most common mistake is not a budget that is too small, it is a budget that is split too many ways. Four campaigns at MAD 50 a day learn nothing; a single campaign at MAD 200 a day has a chance of learning. Every split — one campaign per city, per audience, per format — divides the results the algorithm receives.",
      },
      { k: "quote", v: "Better one well-fed campaign than four starving ones." },
      {
        k: "p",
        v: "What should vary at the start is the videos, not the audiences. Four videos testing four different angles within the same campaign give Meta something to choose from, without dividing the budget.",
      },

      { k: "h2", v: "What is specific to Morocco" },
      {
        k: "ul",
        v: [
          "The payment card. Check with your bank that it is enabled for international online payments: a declined card is the most mundane reason for a campaign stopping without warning.",
          "The area. Meta lets you target a city — Marrakech, Casablanca — or a radius around your address. For a neighbourhood business, a radius of a few kilometres is better than the whole country.",
          "The foreign audience. A residence, a riad or a service for non-residents may target people living in France or Belgium: the budget must then allow for a cost that is often higher in those markets.",
          "The language. A video in French does not speak to the same audience as a video in Darija. Choosing the language is a choice of target before it is a choice of translation.",
          "VAT. Since 1 October 2026, Meta adds 20% VAT to ad purchases on accounts whose country of sale is Morocco and that have no tax ID on file. A business can enter its tax ID in the account's payment settings: Meta then stops adding the VAT, but the business declares it itself, under the reverse-charge mechanism. Either way, include it in the budget.",
        ],
      },

      { k: "h2", v: "What the ad budget does not pay for" },
      {
        k: "p",
        v: "The ad budget goes to Meta, from your account, with your card. It does not pay for the videos, the campaign management or the page that receives the enquiries. A quote that gives an ‘all-inclusive’ amount without separating these lines leaves you guessing what actually goes into advertising.",
      },

      { k: "h2", v: "What we recommend to start" },
      {
        k: "p",
        v: `For a business starting out on Meta, we recommend an ad budget of ${AD_BUDGET} a month, concentrated on a single campaign and four videos testing four angles. This budget is paid directly to Meta. Our campaign management is billed separately, at ${both(MEDIA)} a month per platform, and a video ad at ${both(VIDEO)}.`,
      },
      {
        k: "note",
        v: "The ad account is always opened in your name, with full admin access. If we stop working together, you leave with the account, its history and its audiences.",
      },
    ],
  },
};
