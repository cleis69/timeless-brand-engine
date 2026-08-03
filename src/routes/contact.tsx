import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Book a Discovery Call | Ultra Vision" },
      {
        name: "description",
        content:
          "Talk to Ultra Vision by WhatsApp, phone or book a 30-minute discovery call. Honest advice on positioning, funnel and growth.",
      },
      { property: "og:title", content: "Contact | Ultra Vision" },
      {
        property: "og:description",
        content: "WhatsApp, call, or book a 30-minute discovery call with a senior partner.",
      },
    ],
  }),
  component: Contact,
});

const CHANNELS = [
  {
    label: "WhatsApp",
    value: "Fastest reply — usually under an hour",
    href: "https://wa.me/33600000000",
    cta: "Message us",
  },
  {
    label: "Phone",
    value: "+33 6 00 00 00 00",
    href: "tel:+33600000000",
    cta: "Call now",
  },
  {
    label: "Email",
    value: "studio@ultravision.co",
    href: "mailto:studio@ultravision.co",
    cta: "Write to us",
  },
];

const BUDGETS = ["€25k – €50k", "€50k – €100k", "€100k – €250k", "€250k+"];

function Contact() {
  const [budget, setBudget] = useState<string | null>(null);

  return (
    <>
      <section className="shell pt-40 pb-16 lg:pt-52 lg:pb-24">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="display mt-8 max-w-4xl text-6xl sm:text-7xl lg:text-8xl">
            Thirty minutes that will sharpen your next twelve months.
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Tell us where you are and what you're trying to reach. A senior partner replies
            personally — no forms routed into a void, no junior qualification call.
          </p>
        </Reveal>
      </section>

      <section className="rule">
        <div className="shell grid gap-px bg-hairline lg:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.label} delay={i * 60}>
              <a
                href={c.href}
                className="group flex h-full flex-col justify-between bg-background py-10 lg:px-8"
              >
                <div>
                  <p className="eyebrow">{c.label}</p>
                  <p className="display mt-6 text-3xl">{c.value}</p>
                </div>
                <span className="link-underline mt-10 inline-block self-start text-sm font-medium">
                  {c.cta}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="rule">
        <div className="shell grid gap-16 py-24 lg:grid-cols-[1fr_1.3fr] lg:py-32">
          <Reveal>
            <h2 className="display text-5xl lg:text-6xl">Book a discovery call.</h2>
            <ul className="mt-10 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <li>— A senior partner, not a salesperson.</li>
              <li>— A read on your positioning and funnel, free.</li>
              <li>— A clear recommendation, even if it isn't us.</li>
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="Full name" name="name" placeholder="Élise Marchand" />
                <Field label="Company" name="company" placeholder="Nordhaus Group" />
                <Field label="Email" name="email" type="email" placeholder="elise@company.com" />
                <Field label="Phone / WhatsApp" name="phone" placeholder="+33 6 00 00 00 00" />
              </div>

              <div>
                <label className="eyebrow">Budget range</label>
                <div className="mt-4 flex flex-wrap gap-2">
                  {BUDGETS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`rounded-full border px-5 py-2 text-xs tracking-[0.12em] uppercase transition-colors duration-300 ${
                        budget === b
                          ? "border-foreground bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-foreground"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="brief" className="eyebrow">
                  What are you trying to achieve?
                </label>
                <textarea
                  id="brief"
                  name="brief"
                  rows={4}
                  placeholder="We're repositioning ahead of a raise and need the brand and site to match."
                  className="mt-4 w-full resize-none border-b border-border bg-transparent pb-3 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-12 items-center rounded-full bg-primary px-8 text-xs font-semibold tracking-[0.16em] uppercase text-primary-foreground transition-opacity duration-300 hover:opacity-80"
              >
                Request the call
              </button>
              <p className="text-xs text-muted-foreground">
                We reply within one business day. Everything you share stays confidential.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="rule bg-secondary">
        <div className="shell grid gap-10 py-16 sm:grid-cols-3">
          {[
            { c: "Paris", a: "18 Rue de Marignan, 75008" },
            { c: "Dubai", a: "DIFC, Gate Village 4" },
            { c: "Casablanca", a: "Boulevard d'Anfa, 20050" },
          ].map((o) => (
            <div key={o.c}>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase">{o.c}</p>
              <p className="mt-3 text-sm text-muted-foreground">{o.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-4 w-full border-b border-border bg-transparent pb-3 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
      />
    </div>
  );
}
