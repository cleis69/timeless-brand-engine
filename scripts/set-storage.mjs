/**
 * ULTRA VISION — branchement du stockage des candidatures casting.
 *
 * ============================================================
 *  CE SCRIPT S'EXECUTE TOUT SEUL VIA `npm run deploy`.
 * ============================================================
 *
 * CE QU'IL FAIT
 *
 * Il declare, dans le `wrangler.json` regenere a chaque construction,
 * le seau R2 ou la page /casting range les photos. Meme raison d'etre
 * que set-custom-domains.mjs : une modification manuelle de ce fichier
 * serait ecrasee au deploiement suivant.
 *
 * POURQUOI IL VERIFIE D'ABORD QUE LE SEAU EXISTE
 *
 * Cloudflare refuse TOUT le deploiement si wrangler.json cite un seau
 * inexistant. Tant que R2 n'est pas active sur le compte, declarer la
 * liaison d'office bloquerait donc la mise en ligne du site entier —
 * pour une seule page.
 *
 * Le script demande a Cloudflare si le seau existe :
 *   - oui : la liaison est declaree, les candidatures fonctionnent ;
 *   - non : il previent et continue. Le site part en ligne, la page
 *     /casting affiche « ouverture tres bientot » et renvoie vers
 *     WhatsApp.
 *
 * ------------------------------------------------------------
 *  POUR OUVRIR LES CANDIDATURES, UNE FOIS
 *
 *  1. Tableau de bord Cloudflare -> R2 -> activer R2.
 *     (Gratuit jusqu'a 10 Go, mais Cloudflare demande une carte.)
 *  2. npx wrangler r2 bucket create ultravision-casting
 *  3. npm run deploy
 * ------------------------------------------------------------
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const CONFIG = ".output/server/wrangler.json";

/** Doivent rester identiques a CASTING.binding dans src/config/casting.ts. */
const BINDING = "CASTING";
const BUCKET = "ultravision-casting";

if (!existsSync(CONFIG)) {
  console.error(`\n[set-storage] ECHEC : ${CONFIG} introuvable — lance le build d'abord.\n`);
  process.exit(1);
}

let exists = false;
try {
  execSync(`npx wrangler r2 bucket info ${BUCKET}`, { stdio: "ignore" });
  exists = true;
} catch {
  exists = false;
}

if (!exists) {
  console.warn(
    `\n[set-storage] Seau R2 « ${BUCKET} » introuvable : le site part SANS stockage casting.` +
      `\n              La page /casting renverra vers WhatsApp. Voir l'en-tete de ce script.\n`,
  );
  process.exit(0);
}

const config = JSON.parse(readFileSync(CONFIG, "utf8"));
config.r2_buckets = [{ binding: BINDING, bucket_name: BUCKET }];
writeFileSync(CONFIG, `${JSON.stringify(config, null, 2)}\n`, "utf8");

console.log(`[set-storage] seau R2 branche : ${BUCKET} -> ${BINDING}`);
