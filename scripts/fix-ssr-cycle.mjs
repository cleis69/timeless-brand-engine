/**
 * ULTRA VISION — reparation du bundle SSR avant deploiement Cloudflare.
 *
 * ============================================================
 *  CE SCRIPT S'EXECUTE TOUT SEUL VIA `npm run deploy`.
 *  Tu n'as jamais a le lancer a la main.
 * ============================================================
 *
 * LE PROBLEME QU'IL RESOUT
 *
 * L'outil qui assemble le site (nitro/rolldown, encore en version
 * beta) produit deux fichiers qui s'appellent l'un l'autre :
 *
 *   server-XXXX.mjs   ---- a besoin de ---->  server-XXXX2.mjs
 *   server-XXXX2.mjs  ---- a besoin de ---->  server-XXXX.mjs
 *
 * C'est ce qu'on appelle une dependance circulaire. En JavaScript
 * moderne, quand deux fichiers s'attendent mutuellement, l'un des deux
 * demarre forcement avant que l'autre ait fini de se definir. Ici le
 * second appelle une fonction utilitaire (`__exportAll`) que le
 * premier n'a pas encore eu le temps de creer.
 *
 * Resultat en production : `TypeError: __exportAll is not a function`,
 * et LES DIX PAGES du site renvoient une erreur 500. Les images et les
 * videos continuent de s'afficher — ce qui rend la panne trompeuse :
 * le serveur repond, mais aucune page ne s'affiche.
 *
 * Ce bug ne se voit pas en developpement local, parce que le serveur
 * de developpement ne decoupe pas le code en fichiers separes.
 *
 * COMMENT IL LE RESOUT
 *
 * La fonction utilitaire n'a aucune raison de vivre dans un fichier
 * qui depend d'autre chose. Le script la deplace dans son propre
 * fichier, qui ne depend de rien, et redirige ceux qui l'utilisent
 * vers ce nouveau fichier. Le cercle est rompu, l'ordre de demarrage
 * redevient previsible.
 *
 * ------------------------------------------------------------
 *  SI CE SCRIPT S'ARRETE EN ERREUR UN JOUR
 *
 *  C'est voulu, et c'est une bonne nouvelle : il refuse de deployer
 *  un site casse plutot que de le mettre en ligne en silence.
 *
 *  Deux cas possibles :
 *   - « aucun cycle detecte » : la version de nitro a corrige le bug.
 *     Ce script ne sert plus a rien, on peut le retirer du deploiement.
 *   - « forme inattendue » : la version de nitro a change sa maniere
 *     de decouper le code. Il faut reexaminer la reparation.
 * ------------------------------------------------------------
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const SSR_DIR = ".output/server/_ssr";
const RUNTIME_FILE = "__rolldown-runtime.mjs";

const fail = (msg) => {
  console.error(`\n[fix-ssr-cycle] ECHEC : ${msg}\n`);
  process.exit(1);
};

if (!existsSync(SSR_DIR)) fail(`${SSR_DIR} introuvable — lance le build d'abord.`);

const files = readdirSync(SSR_DIR).filter((f) => f.endsWith(".mjs") && f !== RUNTIME_FILE);
const read = (f) => readFileSync(join(SSR_DIR, f), "utf8");
const source = new Map(files.map((f) => [f, read(f)]));

/* Un fichier importe-t-il un autre fichier du meme dossier ? */
const localImports = (code) =>
  [...code.matchAll(/^import\s+(?:[^"']*?\s+from\s+)?["']\.\/([^"']+)["'];?$/gm)].map((m) => m[1]);

/* Le fichier qui contient la region « rolldown-runtime ». */
const REGION = /\/\/#region [^\n]*rolldown-runtime[^\n]*\n([\s\S]*?)\/\/#endregion\n?/;
const holder = files.find((f) => REGION.test(source.get(f)));

if (!holder) {
  const cycles = files.filter((f) =>
    localImports(source.get(f)).some((dep) => localImports(source.get(dep) ?? "").includes(f)),
  );
  if (cycles.length === 0) {
    console.log("[fix-ssr-cycle] aucun cycle detecte — rien a faire.");
    process.exit(0);
  }
  fail(`forme inattendue : cycle entre ${cycles.join(", ")} sans region rolldown-runtime.`);
}

/* Le cycle n'existe que si le porteur depend lui-meme d'un autre chunk. */
if (localImports(source.get(holder)).length === 0) {
  console.log("[fix-ssr-cycle] aucun cycle detecte — rien a faire.");
  process.exit(0);
}

const region = source.get(holder).match(REGION)[1];
const helpers = [...region.matchAll(/^var\s+([A-Za-z_$][\w$]*)\s*=/gm)].map((m) => m[1]);
if (helpers.length === 0) fail("forme inattendue : region rolldown-runtime sans declaration `var`.");

/* Quels alias d'export du porteur correspondent a ces utilitaires ? */
const exportLine = source.get(holder).match(/^export\s*\{([^}]*)\};?$/m);
if (!exportLine) fail(`forme inattendue : aucune ligne \`export { ... }\` dans ${holder}.`);

const exported = exportLine[1]
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
  .map((s) => {
    const [local, alias = local] = s.split(/\s+as\s+/).map((x) => x.trim());
    return { local, alias };
  });

const moved = exported.filter((e) => helpers.includes(e.local));
if (moved.length === 0) fail("forme inattendue : les utilitaires ne sont pas exportes par le porteur.");

/* 1. Le nouveau fichier, qui ne depend de rien. */
const runtimeExports = moved.map((e) => `${e.local} as ${e.alias}`).join(", ");
writeFileSync(
  join(SSR_DIR, RUNTIME_FILE),
  `${region}export { ${runtimeExports} };\n`,
  "utf8",
);

/* 2. Le porteur reprend les utilitaires depuis le nouveau fichier. */
const backImport = moved.map((e) => `${e.alias} as ${e.local}`).join(", ");
writeFileSync(
  join(SSR_DIR, holder),
  source.get(holder).replace(REGION, `import { ${backImport} } from "./${RUNTIME_FILE}";\n`),
  "utf8",
);

/* 3. Les consommateurs pointent directement vers le nouveau fichier. */
const aliases = new Set(moved.map((e) => e.alias));
let redirected = 0;

for (const f of files) {
  if (f === holder) continue;
  let code = read(f);
  const before = code;

  code = code.replace(
    new RegExp(`^import\\s*\\{([^}]*)\\}\\s*from\\s*["']\\./${holder.replace(".", "\\.")}["'];?$`, "gm"),
    (whole, names) => {
      const parts = names.split(",").map((s) => s.trim()).filter(Boolean);
      const toRuntime = parts.filter((p) => aliases.has(p.split(/\s+as\s+/)[0].trim()));
      const stay = parts.filter((p) => !toRuntime.includes(p));
      if (toRuntime.length === 0) return whole;
      const lines = [`import { ${toRuntime.join(", ")} } from "./${RUNTIME_FILE}";`];
      if (stay.length > 0) lines.push(`import { ${stay.join(", ")} } from "./${holder}";`);
      return lines.join("\n");
    },
  );

  if (code !== before) {
    writeFileSync(join(SSR_DIR, f), code, "utf8");
    redirected += 1;
  }
}

/* 4. Verification : plus aucun cycle, et le nouveau fichier est autonome. */
const after = new Map(
  [...readdirSync(SSR_DIR).filter((f) => f.endsWith(".mjs"))].map((f) => [f, read(f)]),
);
if (localImports(after.get(RUNTIME_FILE)).length > 0) {
  fail(`${RUNTIME_FILE} ne devrait dependre d'aucun autre fichier.`);
}
for (const [f, code] of after) {
  for (const dep of localImports(code)) {
    if (localImports(after.get(dep) ?? "").includes(f)) fail(`cycle persistant entre ${f} et ${dep}.`);
  }
}

console.log(
  `[fix-ssr-cycle] cycle rompu : ${moved.map((e) => e.local).join(", ")} extrait de ${holder}, ${redirected} fichier(s) redirige(s).`,
);
