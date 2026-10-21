import type { Service, ServiceSlug, PoleId } from "@/content/services";
import type { Sector, SectorSlug } from "@/content/sectors";
import type { Article } from "@/content/blog";
import type { CaseStudy, Stat, WorkItem } from "@/components/work/work.data";
import type { SiteItem } from "@/components/work/sites.data";
import type { AlaCarte, Pack } from "@/config/pricing";

/**
 * UltraVision Agency — la forme des traductions anglaises.
 *
 * Une traduction ne remplace que du TEXTE. Les prix, les slugs, les
 * liens entre pages, les videos et les dates restent dans les fichiers
 * francais, qui demeurent la seule source : une traduction ne peut donc
 * jamais afficher un prix ou un chiffre different de la version
 * francaise.
 */

export type ServiceText = Partial<
  Pick<
    Service,
    | "name"
    | "serviceType"
    | "title"
    | "description"
    | "eyebrow"
    | "h1"
    | "accent"
    | "intro"
    | "includes"
    | "useCases"
    | "process"
    | "faq"
  >
>;
export type PoleText = { title: string; text: string };
export type ServicesEn = Partial<Record<ServiceSlug, ServiceText>>;
export type PolesEn = Partial<Record<PoleId, PoleText>>;

export type SectorText = Partial<
  Pick<
    Sector,
    "name" | "title" | "description" | "eyebrow" | "h1" | "accent" | "intro" | "challenges" | "faq"
  >
>;
export type SectorsEn = Partial<Record<SectorSlug, SectorText>>;

export type ArticleText = Pick<
  Article,
  "title" | "excerpt" | "category" | "seo" | "takeaways" | "faq" | "body"
> &
  Partial<Pick<Article, "seoTitle">>;
export type ArticlesEn = Record<string, ArticleText>;

export type CaseStudyText = Partial<
  Pick<
    CaseStudy,
    | "headline"
    | "seoTitle"
    | "seoDescription"
    | "summary"
    | "objective"
    | "challenge"
    | "strategy"
    | "execution"
    | "location"
  >
>;
export type WorkText = Partial<Pick<WorkItem, "title" | "category" | "description">> & {
  caseStudy?: CaseStudyText;
};
export type SiteText = Partial<Pick<SiteItem, "title" | "category" | "description" | "tags">> & {
  caseStudy?: CaseStudyText;
};
export type WorksEn = Record<string, WorkText>;
export type SitesEn = Record<string, SiteText>;
/** Libelles de chiffres : « VUES » → « VIEWS ». */
export type StatLabelsEn = Record<Stat["label"], string>;

export type PackText = Partial<
  Pick<
    Pack,
    | "name"
    | "forWho"
    | "period"
    | "commitment"
    | "delay"
    | "features"
    | "bonus"
    | "equivalent"
    | "cta"
  >
>;
export type PacksEn = Record<string, PackText>;
/** Prestation a l'unite, par libelle francais. */
export type CarteItemText = { label: string; detail: string; unit?: string };
export type CarteEn = Record<string, CarteItemText>;
/** Groupes de prestations : « Production » → « Production ». */
export type CarteGroupsEn = Record<AlaCarte["group"], string>;
