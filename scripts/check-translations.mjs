/**
 * ULTRA VISION — controle des traductions avant deploiement.
 *
 * ============================================================
 *  CE SCRIPT S'EXECUTE TOUT SEUL AU DEBUT DE `npm run deploy`.
 *  On peut aussi le lancer a la main : npm run check:translations
 * ============================================================
 *
 * Le site est bilingue. Un contenu ajoute en francais sans sa version
 * anglaise ne casse rien de visible : il retombe sur le francais dans la
 * page anglaise, ou n'a pas de page anglaise du tout. C'est precisement
 * pour ca qu'il faut un controle : personne ne le remarquerait.
 *
 * Deux verifications :
 *   1. Les contenus (articles, services, secteurs, realisations, tarifs,
 *      pages d'offre) : src/content/translation-status.ts.
 *   2. Les pages : chaque route francaise a sa route anglaise, a l'adresse
 *      que donne localePath() (src/lib/locale.ts).
 *
 * Si quelque chose manque, le script affiche la liste et ARRETE le
 * deploiement. Le site en ligne reste tel quel.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { createServer } from "vite";

const ROOT = resolve(import.meta.dirname, "..");
const SRC = join(ROOT, "src");

const server = await createServer({
  configFile: false,
  root: ROOT,
  logLevel: "error",
  resolve: { alias: { "@": SRC } },
  server: { middlewareMode: true, hmr: false, watch: null },
  appType: "custom",
  optimizeDeps: { noDiscovery: true, include: [] },
});

let missing = [];
try {
  const { missingTranslations } = await server.ssrLoadModule("/src/content/translation-status.ts");
  const { localePath } = await server.ssrLoadModule("/src/lib/locale.ts");
  missing = missingTranslations();

  /* Les routes declarees dans src/routes (francais) et src/routes/en. */
  const routesIn = (dir) =>
    readdirSync(dir)
      .filter((f) => f.endsWith(".tsx"))
      .map(
        (f) => readFileSync(join(dir, f), "utf8").match(/createFileRoute\(["']([^"']+)["']\)/)?.[1],
      )
      .filter(Boolean);

  const norm = (p) => (p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p);
  const fr = routesIn(join(SRC, "routes"))
    .map(norm)
    .filter((p) => p !== "/__root__");
  const en = new Set(routesIn(join(SRC, "routes/en")).map(norm));

  for (const p of fr) {
    /* Une route a parametre : on compare son prefixe traduit. */
    const target = p.includes("$")
      ? norm(localePath(p.replace(/\$[^/]+$/, "x"), "en")).replace(/\/[^/]+$/, "/$slug")
      : norm(localePath(p, "en"));
    if (target === p)
      missing.push(`page « ${p} » : aucune adresse anglaise dans PAGES (src/lib/locale.ts)`);
    else if (!en.has(target))
      missing.push(`page « ${p} » : route anglaise ${target} absente de src/routes/en/`);
  }
} finally {
  await server.close();
}

if (missing.length > 0) {
  console.error(
    `\n[check-translations] ECHEC : ${missing.length} element(s) sans version anglaise.\n`,
  );
  for (const m of missing) console.error(`  - ${m}`);
  console.error(
    "\nLe site est bilingue : traduisez ces elements (voir src/content/translation-status.ts),\npuis relancez le deploiement. Rien n'a ete mis en ligne.\n",
  );
  process.exit(1);
}

console.log("[check-translations] tout le contenu existe en francais et en anglais.");
