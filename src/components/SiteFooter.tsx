import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import {
  CONTACT,
  CONTACT_TEXT,
  hasPhone,
  hasWhatsapp,
  phoneDisplay,
  telUrl,
  whatsappUrl,
} from "@/config/contact";
import { BRAND, SOCIAL } from "@/config/brand";
import { servicePath } from "@/content/services";
import { LANDINGS } from "@/content/landings";
import { sectorPath } from "@/content/sectors";
import { sectorsFor, servicesFor } from "@/content/localized";
import { localePath, useLocale, type Locale } from "@/lib/i18n";

/* Les libelles du pied de page, dans les deux langues. */
const T = {
  fr: {
    about: `${BRAND.name} est une ${BRAND.category} basée à ${BRAND.city}, au ${BRAND.country} : marque, contenu, publicité et outils digitaux, réunis dans une seule équipe.`,
    whatsapp: "Écrire sur WhatsApp",
    email: "Nous écrire",
    agency: "Agence",
    agencyIn: `L'agence à ${BRAND.city}`,
    services: "Services",
    work: "Réalisations",
    pricing: "Tarifs",
    method: "Stratégie & méthode",
    about_: "À propos",
    sectors: "Secteurs",
    quote: "Demander un devis",
    country: BRAND.country,
    rights: "Tous droits réservés.",
  },
  en: {
    about: `${BRAND.name} is a ${BRAND.category} based in ${BRAND.city}, Morocco: brand, content, advertising and digital tools, brought together in a single team.`,
    whatsapp: "Message us on WhatsApp",
    email: "Email us",
    agency: "Agency",
    agencyIn: `The agency in ${BRAND.city}`,
    services: "Services",
    work: "Work",
    pricing: "Pricing",
    method: "Strategy & method",
    about_: "About",
    sectors: "Industries",
    quote: "Request a quote",
    country: "Morocco",
    rights: "All rights reserved.",
  },
} satisfies Record<Locale, Record<string, string>>;

/**
 * UltraVision Agency — pied de page.
 *
 * ============================================================
 *  LA PHRASE QUI DIT QUI NOUS SOMMES, SUR CHAQUE PAGE
 * ============================================================
 *
 * Le paragraphe sous le logo disait « Agence creative, technologique et
 * media » : une description qu'aucun moteur ne pouvait rattacher a une
 * categorie, et sans aucune ville. C'est desormais la definition de
 * src/config/brand.ts — nom complet, categorie, ville, pays. Elle est
 * lue sur toutes les pages du site, et c'est ce qui permet a Google et
 * aux assistants IA de relier toutes ces pages a la meme entreprise.
 *
 * LES EXPERTISES SONT DES LIENS
 *
 * La colonne listait six expertises en texte simple : aucune ne menait
 * nulle part. Ce sont maintenant les huit services, chacun vers sa page,
 * puis les secteurs. Toutes les pages importantes sont ainsi a un clic
 * de n'importe quelle autre.
 *
 * LES PROFILS OFFICIELS
 *
 * Instagram et TikTok sont lies ici, avec leur identifiant visible, et
 * declares dans `sameAs` (src/config/brand.ts). Le site pointe vers les
 * comptes ; quand leur bio pointe vers le site, le lien est confirme
 * dans les deux sens.
 */

export function SiteFooter() {
  const locale = useLocale();
  const t = T[locale];
  const lp = (p: string) => localePath(p, locale);
  return (
    <footer className="rule bg-background">
      <div className="shell py-20">
        <div className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="min-w-0">
            <Logo className="h-8" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">{t.about}</p>
            {hasWhatsapp ? (
              <a
                href={whatsappUrl(CONTACT_TEXT[locale].whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-6 inline-block text-sm font-medium"
              >
                {t.whatsapp}
              </a>
            ) : (
              <a
                href={`mailto:${CONTACT.email}`}
                className="link-underline mt-6 inline-block text-sm font-medium"
              >
                {t.email}
              </a>
            )}
          </div>

          <FooterCol
            title={t.agency}
            links={[
              { to: lp("/agence-marketing-digital-marrakech"), label: t.agencyIn },
              ...LANDINGS.map((l) => ({
                to: lp(l.path),
                label: locale === "en" ? l.nameEn : l.name,
              })),
              { to: lp("/services"), label: t.services },
              { to: lp("/realisations"), label: t.work },
              { to: lp("/tarifs"), label: t.pricing },
              { to: lp("/methode"), label: t.method },
              { to: lp("/a-propos"), label: t.about_ },
              { to: lp("/blog"), label: "Blog" },
              { to: lp("/casting"), label: "Casting" },
            ]}
          />

          <div>
            <FooterCol
              title={t.services}
              links={servicesFor(locale).map((s) => ({
                to: lp(servicePath(s.slug)),
                label: s.name,
              }))}
            />
            <div className="mt-10">
              <FooterCol
                title={t.sectors}
                links={sectorsFor(locale).map((s) => ({
                  to: lp(sectorPath(s.slug)),
                  label: s.name,
                }))}
              />
            </div>
          </div>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="link-underline">
                  {CONTACT.email}
                </a>
              </li>
              {hasPhone && (
                <li>
                  <a href={telUrl} className="link-underline">
                    {phoneDisplay()}
                  </a>
                </li>
              )}
              <li>{CONTACT_TEXT[locale].locations}</li>
              {SOCIAL.map((s) => (
                <li key={s.network}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="link-underline"
                  >
                    {s.network} {s.handle}
                  </a>
                </li>
              ))}
              <li>
                <Link to={lp("/contact")} className="link-underline text-foreground">
                  {t.quote}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule mt-16 flex flex-col gap-4 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name} — {BRAND.city}, {t.country}. {t.rights}
          </p>
          <p className="tracking-[0.18em] uppercase">{BRAND.category}</p>
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
