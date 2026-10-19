/**
 * ULTRA VISION — date de compatibilite du Worker.
 *
 * ============================================================
 *  CE SCRIPT S'EXECUTE TOUT SEUL VIA `npm run deploy`.
 * ============================================================
 *
 * CE QU'IL CORRIGE
 *
 * Le build ecrit dans `.output/server/wrangler.json` une date de
 * compatibilite qui peut tomber le lendemain. Cloudflare raisonne en
 * heure universelle et refuse alors TOUT le deploiement :
 *
 *   « Can't set compatibility date in the future: 2026-10-20 »
 *
 * Constate le 19 octobre 2026, peu apres minuit a Marrakech : le site
 * etait construit, mais rien n'est parti en ligne.
 *
 * Le script ramene la date a aujourd'hui (UTC) si elle la depasse. Une
 * date passee n'est jamais modifiee.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";

const CONFIG = ".output/server/wrangler.json";

if (!existsSync(CONFIG)) {
  console.error(`\n[fix-compat-date] ECHEC : ${CONFIG} introuvable — lance le build d'abord.\n`);
  process.exit(1);
}

const config = JSON.parse(readFileSync(CONFIG, "utf8"));
const today = new Date().toISOString().slice(0, 10);

if (config.compatibility_date && config.compatibility_date > today) {
  console.log(`[fix-compat-date] ${config.compatibility_date} -> ${today}`);
  config.compatibility_date = today;
  writeFileSync(CONFIG, JSON.stringify(config, null, 2));
}
