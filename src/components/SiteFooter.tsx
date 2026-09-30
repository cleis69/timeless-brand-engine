import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { CONTACT, hasPhone, hasWhatsapp, phoneDisplay, telUrl, whatsappUrl } from "@/config/contact";
import { BRAND, SOCIAL } from "@/config/brand";
import { SERVICES, servicePath } from "@/content/services";
import { SECTORS, sectorPath } from "@/content/sectors";

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
  return (
    <footer className="rule bg-background">
      <div className="shell py-20">
        <div className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="min-w-0">
            <Logo className="h-8" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {BRAND.name} est une {BRAND.category} basée à {BRAND.city}, au {BRAND.country} :
              marque, contenu, publicité et outils digitaux, réunis dans une seule équipe.
            </p>
            {hasWhatsapp ? (
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-6 inline-block text-sm font-medium"
              >
                Écrire sur WhatsApp
              </a>
            ) : (
              <a
                href={`mailto:${CONTACT.email}`}
                className="link-underline mt-6 inline-block text-sm font-medium"
              >
                Nous écrire
              </a>
            )}
          </div>

          <FooterCol
            title="Agence"
            links={[
              { to: "/agence-marketing-digital-marrakech", label: `L'agence à ${BRAND.city}` },
              { to: "/services", label: "Services" },
              { to: "/realisations", label: "Réalisations" },
              { to: "/tarifs", label: "Tarifs" },
              { to: "/methode", label: "Stratégie & méthode" },
              { to: "/a-propos", label: "À propos" },
              { to: "/blog", label: "Blog" },
              { to: "/casting", label: "Casting" },
            ]}
          />

          <div>
            <FooterCol
              title="Services"
              links={SERVICES.map((s) => ({ to: servicePath(s.slug), label: s.name }))}
            />
            <div className="mt-10">
              <FooterCol
                title="Secteurs"
                links={SECTORS.map((s) => ({ to: sectorPath(s.slug), label: s.name }))}
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
              <li>{CONTACT.locations}</li>
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
                <Link to="/contact" className="link-underline text-foreground">
                  Demander un devis
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule mt-16 flex flex-col gap-4 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name} — {BRAND.city}, {BRAND.country}. Tous droits
            réservés.
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
