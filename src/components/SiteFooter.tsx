import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="rule bg-background">
      <div className="shell py-20">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold tracking-[0.28em] uppercase">Ultra</span>
              <span className="display text-xl italic">Vision</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A growth studio for ambitious companies. Brand, product and acquisition — engineered
              as one system.
            </p>
            <a
              href="https://wa.me/33600000000"
              className="link-underline mt-6 inline-block text-sm font-medium"
            >
              WhatsApp us directly
            </a>
          </div>

          <FooterCol
            title="Studio"
            links={[
              { to: "/services", label: "Services" },
              { to: "/case-studies", label: "Case Studies" },
              { to: "/about", label: "About" },
              { to: "/blog", label: "Journal" },
            ]}
          />

          <div>
            <p className="eyebrow">Capabilities</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>Branding &amp; Identity</li>
              <li>Websites &amp; Web Apps</li>
              <li>AI Automation</li>
              <li>Paid Media</li>
              <li>Film &amp; Photography</li>
              <li>CRM &amp; Lead Gen</li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:studio@ultravision.co" className="link-underline">
                  studio@ultravision.co
                </a>
              </li>
              <li>
                <a href="tel:+33600000000" className="link-underline">
                  +33 6 00 00 00 00
                </a>
              </li>
              <li>Paris — Dubai — Casablanca</li>
            </ul>
          </div>
        </div>

        <div className="rule mt-16 flex flex-col gap-4 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ultra Vision. All rights reserved.</p>
          <p className="tracking-[0.18em] uppercase">Built for companies that intend to win</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="link-underline transition-colors hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
