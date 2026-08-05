import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="rule bg-background">
      <div className="shell py-20">
        <div className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="min-w-0">
            <Logo className="h-8" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Agence créative, technologique et média. Nous construisons des marques et des systèmes
              d&apos;acquisition pour les entreprises ambitieuses.
            </p>
            <a
              href="https://wa.me/33600000000"
              className="link-underline mt-6 inline-block text-sm font-medium"
            >
              Écrire sur WhatsApp
            </a>
          </div>

          <FooterCol
            title="Agence"
            links={[
              { to: "/services", label: "Services" },
              { to: "/realisations", label: "Réalisations" },
              { to: "/methode", label: "Notre méthode" },
              { to: "/a-propos", label: "À propos" },
              { to: "/blog", label: "Blog" },
            ]}
          />

          <div>
            <p className="eyebrow">Expertises</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>Branding &amp; identité</li>
              <li>Sites &amp; applications</li>
              <li>IA &amp; automatisation</li>
              <li>Meta, Google &amp; TikTok Ads</li>
              <li>Photo, vidéo &amp; motion</li>
              <li>CRM &amp; lead generation</li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:studio@ultravision.fr" className="link-underline">
                  studio@ultravision.fr
                </a>
              </li>
              <li>
                <a href="tel:+33600000000" className="link-underline">
                  +33 6 00 00 00 00
                </a>
              </li>
              <li>Paris — Dubaï — Casablanca</li>
              <li>
                <Link to="/contact" className="link-underline text-foreground">
                  Demander un devis
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule mt-16 flex flex-col gap-4 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ULTRA VISION. Tous droits réservés.</p>
          <p className="tracking-[0.18em] uppercase">Creative growth agency</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
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
