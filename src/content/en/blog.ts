import type { ArticlesEn } from "./types";
import { ARTICLES_EN_1 } from "./blog-1";
import { ARTICLES_EN_2 } from "./blog-2";
import { ARTICLES_EN_3 } from "./blog-3";

/** Tous les articles traduits. Cles : slugs francais (identifiants). */
export const ARTICLES_EN: ArticlesEn = { ...ARTICLES_EN_1, ...ARTICLES_EN_2, ...ARTICLES_EN_3 };
